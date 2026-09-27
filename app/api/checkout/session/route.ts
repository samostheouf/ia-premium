import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getStripeClient, isStripeConfigured, PRICES } from '@/lib/stripe'

// ─── GET /api/checkout/session ────────────────────────────────────────────────
// Récupère les détails d'une session Stripe à partir de son ID.
// Utilisé par /checkout/success/page.tsx pour afficher les détails de l'achat.

export async function GET(request: NextRequest) {
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
    console.error('[checkout/session] STRIPE_SECRET_KEY manquante')
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
    const lineItems =
      session.amount_total && session.lines
        ? session.lines.data.map((line) => ({
            name: line.description || line.price?.product?.name || 'Produit',
            amount: line.amount_total ? line.amount_total / 100 : 0,
            quantity: line.quantity || 1,
          }))
        : []

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
    console.error('[checkout/session] Erreur lors de la récupération:', err)
    return NextResponse.json(
      {
        error: 'Impossible de récupérer la session',
        details: err instanceof Error ? err.message : 'Erreur inconnue',
      },
      { status: 500 },
    )
  }
}
