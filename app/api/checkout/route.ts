import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import {
  getStripeClient,
  PRICES,
  type Variant,
  formatPrice,
  isStripeConfigured,
} from '@/lib/stripe'
import { logSale } from '@/lib/analytics'

// ─── Validation ───────────────────────────────────────────────────────────────

function validateVariant(variant: string): variant is Variant {
  return Object.prototype.hasOwnProperty.call(PRICES, variant)
}

interface CheckoutRequest {
  variant: Variant
  customerEmail?: string
  successUrl?: string
  cancelUrl?: string
  metadata?: Record<string, string>
}

// ─── POST /api/checkout ───────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  // Vérifier configuration Stripe
  if (!isStripeConfigured()) {
    console.error('[checkout] STRIPE_SECRET_KEY manquante')
    return NextResponse.json(
      {
        error:
          'Service de paiement non configuré. Réessayez plus tard.',
        details: 'STRIPE_SECRET_KEY manquante dans l’environnement.',
      },
      { status: 503 },
    )
  }

  let body: CheckoutRequest

  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'Corps de requête invalide (JSON attendu)' },
      { status: 400 },
    )
  }

  const { variant, customerEmail, successUrl, cancelUrl, metadata = {} } = body

  // Valider la variante
  if (!variant || !validateVariant(variant)) {
    return NextResponse.json(
      {
        error: 'Variante inconnue',
        details: `Variantes valides : ${Object.keys(PRICES).join(', ')}`,
      },
      { status: 400 },
    )
  }

  const price = PRICES[variant]

  try {
    const stripe = getStripeClient()

    // ✅ Construire les URLs de retour
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    const resolvedSuccessUrl = successUrl
      ? new URL(successUrl, appUrl).toString()
      : `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`

    const resolvedCancelUrl = cancelUrl
      ? new URL(cancelUrl, appUrl).toString()
      : `${appUrl}/`

    // ✅ Créer la Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: price.label,
              description: price.description,
            },
            unit_amount: price.amount,
          },
          quantity: 1,
        },
      ],
      customer_email: customerEmail || undefined,
      success_url: resolvedSuccessUrl,
      cancel_url: resolvedCancelUrl,
      metadata: {
        variant,
        source: metadata.source || 'buy-button',
        ...metadata,
      },
      // Configuration UX
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      // Optimisation mobile
      phone_number_collection: {
        enabled: false,
      },
    })

    console.log(
      `[checkout] Session créée → variant:${variant} session:${session.id} amount:${price.amount / 100}€ email:${customerEmail || '—'}`,
    )

    return NextResponse.json({
      url: session.url,
      sessionId: session.id,
      amount: price.amount,
      currency: 'eur',
    })
  } catch (err) {
    console.error('[checkout] Erreur Stripe :', err)
    return NextResponse.json(
      {
        error: 'Erreur lors de la création de la commande',
        details: err instanceof Error ? err.message : 'Erreur inconnue',
      },
      { status: 500 },
    )
  }
}

// ─── GET /api/checkout (health) ───────────────────────────────────────────────

export async function GET() {
  const configured = isStripeConfigured()
  return NextResponse.json({
    service: 'ia-premium checkout API',
    version: '0.1.0',
    status: configured ? 'operational' : 'degraded',
    stripeConfigured: configured,
    variants: Object.entries(PRICES).map(([key, price]) => ({
      variant: key,
      label: price.label,
      price: formatPrice(price.amount),
    })),
  })
}
