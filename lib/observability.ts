// ia-premium — Observabilité & logging structuré
//
// Standard library uniquement (aucune dépendance npm). Ce module doit rester
// importable depuis l'EDGE runtime (middleware.ts) : aucun import node:*,
// aucun import de fs/path/crypto — uniquement des globals disponibles partout
// (`globalThis.crypto`, `console`).
//
// Règle absolue : AUCUN secret ne doit fuiter dans les logs. Tout ce qui
// passe par `logInfo` / `logWarn` / `logError` est sanitisé avant écriture.

// ─── Types ────────────────────────────────────────────────────────────────────

export type LogLevel = 'info' | 'warn' | 'error'

/** Payload libre passé par le caller — sera deeply-sanitisé avant écriture. */
export type LogData = Record<string, unknown>

export interface LogRecord {
  level: LogLevel
  msg: string
  requestId: string
  timestamp: string
  service: string
  data?: LogData
}

export interface Logger {
  requestId: string
  info: (msg: string, data?: LogData) => void
  warn: (msg: string, data?: LogData) => void
  error: (msg: string, data?: LogData) => void
}

// ─── Constantes de sanitation ─────────────────────────────────────────────────

const SERVICE_NAME = 'ia-premium'

/** Longueur max d'une chaîne conservée dans un log. */
const MAX_STRING_LENGTH = 2000
/** Profondeur max de récursion sur les objets. */
const MAX_DEPTH = 5
/** Nombre max d'éléments conservés dans un tableau. */
const MAX_ARRAY_ITEMS = 50
/** Taille max du Set de déduplication webhook (anti-fuite mémoire). */
const MAX_KEYS = 50

/**
 * Motifs de secrets à masquer, appliqués sur TOUTE chaîne.
 * Ordre important : les motifs les plus spécifiques d'abord.
 */
const SECRET_PATTERNS: Array<[RegExp, string]> = [
  // Clés Stripe / webhooks — jamais de valeur complète en log.
  [/\b(sk|pk|rk)_(live|test)_[A-Za-z0-9]+/g, '$1_$2_***'],
  [/\bwhsec_[A-Za-z0-9]+/g, 'whsec_***'],
  // Bearer / tokens génériques.
  [/\bBearer\s+[A-Za-z0-9._\-]{8,}/gi, 'Bearer ***'],
  // JWT.
  [/\beyJ[A-Za-z0-9._-]{10,}/g, 'eyJ***'],
  // Adresses email : on garde le domaine pour rester actionnable.
  [/\b([A-Za-z0-9._%+-])[A-Za-z0-9._%+-]*(@[A-Za-z0-9.-]+\.[A-Za-z]{2,})\b/g, '$1***$2'],
]

/** Clés d'objet dont la valeur est masquée quel que soit son contenu. */
const SENSITIVE_KEY_PATTERN =
  /^(?:.*_)?(?:password|passwd|pwd|secret|token|api[-_]?key|apikey|authorization|auth|cookie|session[-_]?id|credential|private[-_]?key|client[-_]?secret)(?:_.*)?$/i

const REDACTED = '[REDACTED]'

// ─── Request ID ───────────────────────────────────────────────────────────────

/**
 * Génère un identifiant de corrélation.
 * `crypto.randomUUID` existe sur l'Edge runtime et Node ≥ 19 ; on dégrade
 * proprement si absent (Node 18, vieux runtimes, contexts sandboxés).
 */
export function newRequestId(): string {
  const c = globalThis.crypto
  if (c && typeof c.randomUUID === 'function') {
    try {
      return c.randomUUID()
    } catch {
      /* fallback ci-dessous */
    }
  }
  if (c && typeof c.getRandomValues === 'function') {
    const bytes = c.getRandomValues(new Uint8Array(16))
    let out = ''
    for (let i = 0; i < bytes.length; i++) {
      out += bytes[i].toString(16).padStart(2, '0')
    }
    return out
  }
  // Dernier recours — non cryptographique mais suffisant pour de la corrélation.
  return `rid_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`
}

// Request ID ambiant : la route l'initialise en début de handler, les helpers
// suivants l'utilisent automatiquement. Pas d'AsyncLocalStorage — ce module doit
// rester compatible Edge.
let ambientRequestId = newRequestId()

/** Définit le requestId ambiant pour la requête courante. */
export function setRequestId(requestId: string): string {
  ambientRequestId = requestId || newRequestId()
  return ambientRequestId
}

/** Retourne le requestId ambiant. */
export function getRequestId(): string {
  return ambientRequestId
}

/** Résout le requestId d'une requête entrante (header `x-request-id` prioritaire). */
export function resolveRequestId(headerValue: string | null | undefined): string {
  const candidate = typeof headerValue === 'string' ? headerValue.trim() : ''
  // On n'accepte que des tokens courts et sûrs — jamais d'injection de log.
  if (candidate && candidate.length <= 128 && /^[A-Za-z0-9._:-]+$/.test(candidate)) {
    return candidate
  }
  return newRequestId()
}

// ─── Sanitation ───────────────────────────────────────────────────────────────

/** Masque les secrets connus dans une chaîne. */
export function sanitizeString(input: string): string {
  let out = input
  for (const [pattern, replacement] of SECRET_PATTERNS) {
    out = out.replace(pattern, replacement)
  }
  if (out.length > MAX_STRING_LENGTH) {
    out = `${out.slice(0, MAX_STRING_LENGTH)}…[tronqué ${input.length} car.]`
  }
  return out
}

function looksLikeSecretString(value: string): boolean {
  return /^(?:sk|pk|rk)_(?:live|test)_|^whsec_|^eyJ/.test(value)
}

/**
 * Sanitise une valeur récursivement.
 * - masque les clés sensibles et les patterns de secrets
 * - borne la profondeur, la taille des tableaux et la longueur des chaînes
 * - gère les cycles par détection devisited-ness simple (profondeur)
 */
export function sanitize(value: unknown, depth = 0, keyHint?: string): unknown {
  if (keyHint && SENSITIVE_KEY_PATTERN.test(keyHint)) {
    return REDACTED
  }

  if (value === null || value === undefined) return value

  if (typeof value === 'string') {
    return looksLikeSecretString(value) ? '***' : sanitizeString(value)
  }

  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : String(value)
  }

  if (typeof value === 'boolean') return value

  if (typeof value === 'bigint') return value.toString()

  if (typeof value === 'function') return '[Function]'

  if (typeof value === 'symbol') return value.toString()

  if (value instanceof Date) return value.toISOString()

  if (value instanceof Error) {
    return {
      name: value.name,
      message: sanitizeString(value.message),
      stack: typeof value.stack === 'string' ? sanitizeString(value.stack.slice(0, 1000)) : undefined,
    }
  }

  if (depth >= MAX_DEPTH) return '[Profondeur maximale atteinte]'

  if (Array.isArray(value)) {
    const items = value.slice(0, MAX_ARRAY_ITEMS).map((item) => sanitize(item, depth + 1))
    if (value.length > MAX_ARRAY_ITEMS) {
      items.push(`…[${value.length - MAX_ARRAY_ITEMS} élément(s) omis]`)
    }
    return items
  }

  if (typeof value === 'object') {
    const out: LogData = {}
    for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
      out[key] = sanitize(val, depth + 1, key)
    }
    return out
  }

  return String(value)
}

// ─── Écriture des logs ───────────────────────────────────────────────────────

function emit(level: LogLevel, msg: string, data?: LogData): LogRecord {
  const record: LogRecord = {
    level,
    msg: sanitizeString(String(msg)),
    requestId: ambientRequestId,
    timestamp: new Date().toISOString(),
    service: SERVICE_NAME,
  }

  if (data !== undefined) {
    const clean = sanitize(data) as LogData
    if (clean && typeof clean === 'object' && Object.keys(clean).length > 0) {
      record.data = clean
    }
  }

  // Une seule ligne JSON : lisible par Vercel Logs / Datadog / Loki, et
  // grep-able depuis le shell.
  const line = JSON.stringify(record)
  if (level === 'error') {
    console.error(line)
  } else if (level === 'warn') {
    console.warn(line)
  } else {
    console.log(line)
  }

  return record
}

/** Log d'information. */
export function logInfo(msg: string, data?: LogData): LogRecord {
  return emit('info', msg, data)
}

/** Log d'avertissement (dégradation, configuration manquante…). */
export function logWarn(msg: string, data?: LogData): LogRecord {
  return emit('warn', msg, data)
}

/** Log d'erreur. */
export function logError(msg: string, data?: LogData): LogRecord {
  return emit('error', msg, data)
}

/**
 * Crée un logger lié à un requestId — à utiliser dans une route pour que
 * tous les logs d'un même handler partagent le même identifiant.
 *
 * @example
 * const requestId = resolveRequestId(request.headers.get('x-request-id'))
 * const log = createLogger(requestId)
 * log.info('checkout.start', { variant })
 */
export function createLogger(requestId: string): Logger {
  const id = requestId || newRequestId()
  setRequestId(id)
  return {
    requestId: id,
    info: (msg: string, data?: LogData) => {
      setRequestId(id)
      return emit('info', msg, data)
    },
    warn: (msg: string, data?: LogData) => {
      setRequestId(id)
      return emit('warn', msg, data)
    },
    error: (msg: string, data?: LogData) => {
      setRequestId(id)
      return emit('error', msg, data)
    },
  }
}

/**
 * Garde un nombre fini d'éléments en mémoire (Set borné FIFO) — utilisé par
 * le webhook Stripe pour la déduplication par `event.id` sans fuite mémoire.
 */
export class BoundedSet {
  private readonly items = new Set<string>()

  constructor(private readonly maxSize: number = MAX_KEYS) {}

  has(value: string): boolean {
    return this.items.has(value)
  }

  add(value: string): void {
    if (this.items.has(value)) return
    this.items.add(value)
    while (this.items.size > this.maxSize) {
      const oldest = this.items.values().next()
      if (oldest.done) break
      this.items.delete(oldest.value)
    }
  }

  get size(): number {
    return this.items.size
  }

  clear(): void {
    this.items.clear()
  }
}
