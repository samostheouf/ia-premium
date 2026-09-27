import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getStripeClient, isStripeConfigured, PRICES } from '@/lib/stripe'
import { createLogger, resolveRequestId } from '@/lib/observability'

// ─── GET /api/checkout/session ────────────────────────────────────────────────
// Récupère les détails d'une session Stripe à partir de son ID.
// Utilisé par /checkout/success/page.tsx pour afficher les détails de l'achat.

export async function GET(request: NextRequest) {
  const log = createLogger(resolveRequestId(request.headers.get('x-request-id')))
  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get('session_id')

  if (!sessionId) {
    return NextResponse.json(
      { error: 'ID de session manquant' },
      { status: 400 },
    )
  }

  // Vérifier que Stripe est configuré
  if (!isStripeConfigured()) {
    log.warn('checkout.session.stripe_not_configured', { endpoint: '/api/checkout/session' })
    return NextResponse.json(
      {
        error: 'Service de paiement non configuré.',
      },
      { status: 503 },
    )
  }

  try {
    const stripe = getStripeClient()

    // Récupérer la session Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    // Si la session n'existe pas
    if (!session) {
      return NextResponse.json(
        { error: 'Session introuvable' },
        { status: 404 },
      )
    }

    // Vérifier le statut de paiement
    const paid =
      session.payment_status === 'paid' ||
      session.payment_status === 'authorized'

    // Construction de la réponse
    // `lines` n'existe pas sur une Checkout Session : les articles sont dans
    // `line_items`, qui doit être récupéré via l'API avec expand.
    let lineItems: Array<{ name: string; amount: number; quantity: number }> = []

    if (session.amount_total) {
      try {
        const full = await stripe.checkout.sessions.retrieve(session.id, {
          expand: ['line_items.data.price.product'],
        })
        const items = full.line_items?.data ?? []
        lineItems = items.map((line) => {
          const product = line.price?.product
          // `product` peut être un Product supprimé (DeletedProduct) : on ne lit
          // `name` que sur un vrai Product.
          const productName =
            typeof product === 'object' && product !== null && 'name' in product
              ? (product.name as string)
              : null
          return {
            name: line.description || productName || 'Produit',
            amount: line.amount_total ? line.amount_total / 100 : 0,
            quantity: line.quantity || 1,
          }
        })
      } catch (err) {
        // Non bloquant : on renvoie la session sans le détail des articles.
        console.error('[checkout/session] line_items indisponibles:', err)
      }
    }

    return NextResponse.json({
      sessionId: session.id,
      status: session.payment_status,
      paid,
      amount: session.amount_total ? session.amount_total / 100 : 0,
      currency: session.currency || 'eur',
      customerEmail: session.customer_email,
      customerId: session.customer as string | undefined,
      createdAt: session.created ? new Date(session.created * 1000).toISOString() : null,
      lineItems,
      metadata: session.metadata,
      url: session.url,
    })
  } catch (err) {
    log.error('checkout.session.retrieve_error', { sessionId, err })
    return NextResponse.json(
      {
        error: 'Impossible de récupérer la session',
        details: err instanceof Error ? err.message : 'Erreur inconnue',
      },
      { status: 500 },
    )
  }
}
