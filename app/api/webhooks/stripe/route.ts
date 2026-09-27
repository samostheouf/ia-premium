// ia-premium — Webhook Stripe
// Réception des événements de paiement et enregistrement des ventes.
//
// Design : idempotent via Set en mémoire (déduplication par event.id).
// Retour 200 rapide pour ne pas bloquer les retries de Stripe.

import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getStripeClient, isStripeConfigured } from '@/lib/stripe'
import { logInfo, logWarn, logError, newRequestId } from '@/lib/observability'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// ─── Idempotence ──────────────────────────────────────────────────────────────
// Set en mémoire : suffisant pour une instance serverless. En cas de cold start,
// Stripe rejouera l'événement et il sera traité à nouveau (opération idempotent
// côté écriture : append sur un fichier, aucun double débit possible).
const processedEvents = new Set<string>()
const MAX_CACHED_EVENTS = 1000

function alreadyProcessed(eventId: string): boolean {
  if (processedEvents.has(eventId)) return true
  processedEvents.add(eventId)
  // Éviction simple pour éviter la croissance illimitée du Set
  if (processedEvents.size > MAX_CACHED_EVENTS) {
    const first = processedEvents.values().next().value
    if (first) processedEvents.delete(first)
  }
  return false
}

// ─── Stockage des ventes ──────────────────────────────────────────────────────
// Écriture en JSONL sur le disque (Lambda : /tmp). Si indisponible, on log et on
// continue — le webhook ne doit JAMAIS faire échouer un paiement.
function persistSale(record: Record<string, unknown>): void {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const fs = require('fs') as typeof import('fs')
    const path = require('path') as typeof import('path')
    const dir = process.env.SALES_LOG_DIR || '/tmp'
    const file = path.join(dir, 'sales.jsonl')
    fs.mkdirSync(dir, { recursive: true })
    fs.appendFileSync(file, JSON.stringify({ ...record, ts: new Date().toISOString() }) + '\n', 'utf8')
  } catch (err) {
    logWarn('Vente non persistée sur disque', {
      reason: err instanceof Error ? err.message : 'unknown',
    })
  }
}

// ─── POST /api/webhooks/stripe ────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  const requestId = newRequestId()

  // 1. Configuration
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!isStripeConfigured() || !webhookSecret) {
    logError('Webhook non configuré', { requestId })
    return NextResponse.json(
      {
        error: 'Webhook non configuré',
        details: 'STRIPE_SECRET_KEY ou STRIPE_WEBHOOK_SECRET manquante.',
      },
      { status: 503 },
    )
  }

  // 2. Signature
  const signature = request.headers.get('stripe-signature')
  if (!signature) {
    logWarn('Signature manquante', { requestId })
    return NextResponse.json({ error: 'Signature manquante' }, { status: 400 })
  }

  // Le body doit être lu en texte brut : toute transformation casserait la
  // vérification de signature.
  const rawBody = await request.text()

  let event: Stripe.Event
  try {
    const stripe = getStripeClient()
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)
  } catch (err) {
    logError('Signature invalide', {
      requestId,
      reason: err instanceof Error ? err.message : 'unknown',
    })
    return NextResponse.json({ error: 'Signature invalide' }, { status: 400 })
  }

  // 3. Idempotence
  if (alreadyProcessed(event.id)) {
    logInfo('Événement déjà traité', { requestId, eventId: event.id, type: event.type })
    return NextResponse.json({ received: true, deduplicated: true, requestId })
  }

  // 4. Traitement
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const variant = session.metadata?.variant ?? 'unknown'
        const amount = session.amount_total ?? 0
        const currency = session.currency ?? 'eur'
        const email = session.customer_email ?? session.customer_details?.email ?? null

        persistSale({
          kind: 'sale',
          sessionId: session.id,
          variant,
          amount,
          currency,
          email,
          livemode: session.livemode,
          paymentStatus: session.payment_status,
        })

        logInfo('Vente confirmée', {
          requestId,
          eventId: event.id,
          variant,
          amount,
          currency,
          livemode: session.livemode,
        })
        break
      }

      case 'payment_intent.payment_failed': {
        const intent = event.data.object as Stripe.PaymentIntent
        logWarn('Paiement échoué', {
          requestId,
          eventId: event.id,
          intentId: intent.id,
          lastPaymentError: intent.last_payment_error?.code ?? null,
        })
        break
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge
        logInfo('Remboursement reçu', {
          requestId,
          eventId: event.id,
          chargeId: charge.id,
          refunded: charge.refunded,
          amount: charge.amount_refunded,
        })
        break
      }

      default:
        logInfo('Événement ignoré', { requestId, eventId: event.id, type: event.type })
    }
  } catch (err) {
    // On log mais on retourne 200 : Stripe ne doit pas retry indéfiniment sur une
    // erreur de logique métier. Les erreurs de signature/configuration sont
    // traitées plus haut avec des 4xx/5xx appropriés.
    logError('Erreur de traitement', {
      requestId,
      eventId: event.id,
      reason: err instanceof Error ? err.message : 'unknown',
    })
  }

  return NextResponse.json({ received: true, requestId })
}

// ─── GET : health du webhook ──────────────────────────────────────────────────

export async function GET() {
  return NextResponse.json({
    service: 'ia-premium webhook Stripe',
    status: isStripeConfigured() && process.env.STRIPE_WEBHOOK_SECRET ? 'operational' : 'degraded',
    stripeConfigured: isStripeConfigured(),
    webhookSecretConfigured: Boolean(process.env.STRIPE_WEBHOOK_SECRET),
    events: ['checkout.session.completed', 'payment_intent.payment_failed', 'charge.refunded'],
  })
}
