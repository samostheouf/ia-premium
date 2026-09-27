import { NextResponse } from 'next/server'

// ─── POST /api/contact ────────────────────────────────────────────────────────
// Réception des messages du formulaire de contact (app/contact).
// Le message est journalisé côté serveur (aucune donnée n'est stockée en base).
// Brancher un transactional e-mail (Resend, Postmark, SMTP) ici le cas échéant.

interface ContactPayload {
  nom?: unknown
  email?: unknown
  sujet?: unknown
  message?: unknown
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const MAX_LENGTHS = { nom: 120, email: 200, sujet: 200, message: 5000 } as const

/** Anti-spam minimal : 5 messages par IP toutes les 10 minutes. */
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX = 5

const rateLimit = new Map<string, { start: number; count: number }>()

function asString(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

export async function POST(request: Request) {
  let body: ContactPayload
  try {
    body = (await request.json()) as ContactPayload
  } catch {
    return NextResponse.json({ error: 'Corps de requête invalide (JSON attendu)' }, { status: 400 })
  }

  const nom = asString(body.nom, MAX_LENGTHS.nom)
  const email = asString(body.email, MAX_LENGTHS.email)
  const sujet = asString(body.sujet, MAX_LENGTHS.sujet) || 'Demande via le site'
  const message = asString(body.message, MAX_LENGTHS.message)

  const invalid: string[] = []
  if (nom.length < 2) invalid.push('nom')
  if (!EMAIL_RE.test(email)) invalid.push('email')
  if (message.length < 20) invalid.push('message')

  if (invalid.length > 0) {
    return NextResponse.json(
      { error: 'Champs invalides ou manquants', fields: invalid },
      { status: 422 },
    )
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'inconnue'
  const now = Date.now()
  const bucket = rateLimit.get(ip)
  const isFreshWindow = !bucket || now - bucket.start >= RATE_LIMIT_WINDOW_MS

  if (!isFreshWindow && bucket.count >= RATE_LIMIT_MAX) {
    return NextResponse.json(
      { error: 'Trop de messages envoyés. Réessayez dans quelques minutes.' },
      { status: 429 },
    )
  }

  rateLimit.set(
    ip,
    isFreshWindow
      ? { start: now, count: 1 }
      : { start: bucket.start, count: bucket.count + 1 },
  )

  console.log('[contact] Nouveau message', {
    ip,
    nom,
    email,
    sujet,
    message: message.slice(0, 500),
  })

  return NextResponse.json({ ok: true }, { status: 200 })
}
