// ia-premium — Middleware : rate limiting en mémoire (anti-abus)
//
// ⚠️ RUNTIME — LIRE AVANT DE MODIFIER
// ─────────────────────────────────────
// Next.js 14.2.15 ne supporte PAS le middleware Node.js. Vérifié dans le code
// de la dépendance : `next/dist/server/config-schema.js` ne contient aucune clé
// `nodeMiddleware` (le support Node est arrivé en Next 15.2), et
// `getMiddlewareConfig()` (build/analysis/get-page-static-info.js:319) ne lit que
// `matcher`, `regions` et `unstable_allowDynamic` — le champ `runtime` y est
// IGNORÉ. Le middleware est donc TOUJOURS compilé en bundle Edge dans cette
// version, quoi qu'on exporte.
//
// Conséquence : ce fichier ne doit importer AUCUN module Node (pas de `node:*`,
// pas de Prisma, pas de `fs`, pas de `crypto` node). Tout ce qui est utilisé ici
// est un standard Web disponible sur l'Edge : Map, TextEncoder-free, et le
// global `crypto` (Web Crypto) exposé par l'Edge runtime.
//
// Le rate limiter est volontairement en mémoire (Map) : pas de store externe,
// donc pas de dépendance. Conséquence connue et assumée : l'état est par
// instance de serverless function (isolée, éphémère) — c'est un garde-fou
// anti-abus, pas un compteur d'usage exact. Un vrai comptage global demanderait
// Upstash/Redis (hors périmètre : aucune dépendance npm autorisée).

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// ─── Configuration ────────────────────────────────────────────────────────────

interface RateLimitRule {
  /** Nombre de requêtes autorisées par fenêtre. */
  limit: number
  /** Durée de la fenêtre en millisecondes. */
  windowMs: number
}

/**
 * Limites par route.
 * - `/api/generate` : strict — c'est le endpoint coûteux (moteur de génération).
 * - `/api/checkout` : anti-abus — empêche de marteler la création de sessions
 *   Stripe et de polluer la file de webhooks.
 */
const RULES: Array<{ prefix: string; rule: RateLimitRule; scope: string }> = [
  { prefix: '/api/generate', rule: { limit: 5, windowMs: 60_000 }, scope: 'generate' },
  { prefix: '/api/checkout', rule: { limit: 10, windowMs: 60_000 }, scope: 'checkout' },
]

/**
 * Chemins explicitement exclus du rate limiting.
 * Le webhook Stripe ne doit JAMAIS être bloqué : Stripe réessaie depuis ses
 * propres IP, et un 429 provoquerait des échecs de paiement en cascade.
 */
const EXCLUDED_PATHS = ['/api/checkout/webhook', '/api/health']

/**
 * Taille max de la Map avant purge. Au-delà, on purge les entrées expirées ;
 * si tout est encore valide, on repart de zéro (dégradation gracieuse plutôt
 * qu'une fuite mémoire qui tue le process).
 */
const MAX_ENTRIES = 10_000

// ─── Store en mémoire ─────────────────────────────────────────────────────────

interface Bucket {
  count: number
  resetAt: number
}

// ⚠️ Volume par instance de serverless. Un `Map` module-scope est le seul
// état partagé possible sans dépendance externe.
const buckets = new Map<string, Bucket>()

/** Purge les buckets expirés. Appelée au-delà de MAX_ENTRIES. */
function sweep(now: number): void {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) {
      buckets.delete(key)
    }
  }
  // Filet de sécurité : si tout est encore valide, on repart à zéro plutôt que
  // de laisser la Map grossir indéfiniment.
  if (buckets.size > MAX_ENTRIES) {
    buckets.clear()
  }
}

interface RateLimitResult {
  allowed: boolean
  limit: number
  remaining: number
  /** Timestamp epoch (secondes) du reset de fenêtre. */
  resetEpochSeconds: number
  /** Secondes restantes avant reset. */
  retryAfterSeconds: number
}

function checkRateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now()
  const existing = buckets.get(key)

  if (!existing || existing.resetAt <= now) {
    const resetAt = now + windowMs
    buckets.set(key, { count: 1, resetAt })
    if (buckets.size > MAX_ENTRIES) sweep(now)
    return {
      allowed: true,
      limit,
      remaining: limit - 1,
      resetEpochSeconds: Math.ceil(resetAt / 1000),
      retryAfterSeconds: Math.ceil(windowMs / 1000),
    }
  }

  existing.count += 1
  const retryAfterSeconds = Math.max(1, Math.ceil((existing.resetAt - now) / 1000))

  return {
    allowed: existing.count <= limit,
    limit,
    remaining: Math.max(0, limit - existing.count),
    resetEpochSeconds: Math.ceil(existing.resetAt / 1000),
    retryAfterSeconds,
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * IP client. Vercel expose `x-vercel-forwarded-for` (le plus fiable, non
 * spoofable par le client) ; sinon `x-forwarded-for` puis `x-real-ip`.
 */
function getClientIp(request: NextRequest): string {
  const vercelIp = request.headers.get('x-vercel-forwarded-for')
  if (vercelIp) {
    const first = vercelIp.split(',')[0]?.trim()
    if (first) return first
  }

  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    const first = forwardedFor.split(',')[0]?.trim()
    if (first) return first
  }

  return request.headers.get('x-real-ip') || 'unknown'
}

/** Corrélation de requête : on réutilise l'`x-request-id` entrant s'il est sain. */
function resolveRequestId(request: NextRequest): string {
  const candidate = request.headers.get('x-request-id')?.trim()
  if (candidate && candidate.length <= 128 && /^[A-Za-z0-9._:-]+$/.test(candidate)) {
    return candidate
  }
  const c = globalThis.crypto
  if (c && typeof c.randomUUID === 'function') {
    try {
      return c.randomUUID()
    } catch {
      /* fallback */
    }
  }
  return `rid_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`
}

function findRule(pathname: string): { prefix: string; rule: RateLimitRule; scope: string } | null {
  for (const entry of RULES) {
    // Correspondance exacte du préfixe ou de l'un de ses sous-chemins.
    if (pathname === entry.prefix || pathname.startsWith(`${entry.prefix}/`)) {
      return entry
    }
  }
  return null
}

function isExcluded(pathname: string): boolean {
  return EXCLUDED_PATHS.some((excluded) => pathname === excluded || pathname.startsWith(`${excluded}/`))
}

// ─── Middleware ───────────────────────────────────────────────────────────────

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const requestId = resolveRequestId(request)

  const matched = findRule(pathname)

  if (!matched || isExcluded(pathname)) {
    const response = NextResponse.next()
    response.headers.set('x-request-id', requestId)
    return response
  }

  const { rule, scope } = matched
  const key = `${scope}:${getClientIp(request)}`
  const result = checkRateLimit(key, rule.limit, rule.windowMs)

  // Les en-têtes de rate limit sont posés sur TOUTES les réponses de la route
  // protégée (succès comme 429) pour que le client puisse anticiper.
  const rateLimitHeaders: Record<string, string> = {
    'X-RateLimit-Limit': String(result.limit),
    'X-RateLimit-Remaining': String(result.remaining),
    'X-RateLimit-Reset': String(result.resetEpochSeconds),
    'x-request-id': requestId,
  }

  if (!result.allowed) {
    rateLimitHeaders['Retry-After'] = String(result.retryAfterSeconds)
    // Log structuré minimal — le logger complet vit côté route (runtime Node),
    // on ne peut pas l'importer ici sans casser le bundle Edge.
    console.warn(
      JSON.stringify({
        level: 'warn',
        msg: 'rate_limit.exceeded',
        requestId,
        timestamp: new Date().toISOString(),
        service: 'ia-premium',
        data: { scope, pathname, limit: result.limit, retryAfterSeconds: result.retryAfterSeconds },
      }),
    )
    return NextResponse.json(
      {
        error: 'Trop de requêtes. Réessayez dans quelques instants.',
        retryAfterSeconds: result.retryAfterSeconds,
      },
      { status: 429, headers: rateLimitHeaders },
    )
  }

  const response = NextResponse.next()
  for (const [header, value] of Object.entries(rateLimitHeaders)) {
    response.headers.set(header, value)
  }
  return response
}

export const config = {
  // Routes protégées uniquement — on n'impose pas le middleware à toutes les
  // pages publiques (latence inutile sur le HTML statique).
  matcher: ['/api/generate', '/api/checkout', '/api/checkout/:path*'],
}
