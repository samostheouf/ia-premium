// ia-premium — Webhook Stripe
//
// Points de vigilance (tous traités ci-dessous) :
//  1. Le corps de la requête doit être lu en TEXTE BRUT (`request.text()`) et
//     jamais en JSON : la signature Stripe porte sur les octets exacts envoyés.
//     Un `request.json()` avant `constructEvent` invalide la vérification.
//  2. Signature vérifiée via `stripe.webhooks.constructEvent` → 400 si invalide.
//  3. Idempotence : Stripe réessaie un webhook tant qu'il n'a pas reçu de 2xx.
//     Déduplication par `event.id` via un Set en mémoire (borné).
//  4. Réponse 200 rapide : le traitement est synchrone et borné, on ne fait
//     aucun appel réseau sortant (Stripe exige un 2xx en < 20 s).
//  5. Dégradation propre : sans STRIPE_SECRET_KEY ou STRIPE_WEBHOOK_SECRET → 503.

import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { getStripeClient, isStripeConfigured, PRICES, type Variant } from '@/lib/stripe';
import { BoundedSet, createLogger, resolveRequestId } from '@/lib/observability';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Événements déjà traités, par `event.id`.
 * Set borné (FIFO) : sur serverless l'état est par instance — c'est le meilleur
 * compromis sans base externe. Une redélivraison sur la même instance est donc
 * toujours absorbée ; entre deux instances, le switch est idempotent par
 * construction (on ne fait que logger une vente déjà enregistrée).
 */
const processedEvents = new BoundedSet(1000);

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getWebhookSecret(): string | undefined {
  return process.env.STRIPE_WEBHOOK_SECRET || process.env.STRIPE_WEBHOOK_SIGNING_SECRET;
}

/** Narration d'un objet Stripe en champs sûrs, pour le log. */
function describeSession(session: Stripe.Checkout.Session) {
  return {
    sessionId: session.id,
    amountTotal: session.amount_total,
    currency: session.currency,
    paymentStatus: session.payment_status,
    variant: session.metadata?.variant,
  };
}

function isKnownVariant(value: string | undefined): value is Variant {
  return typeof value === 'string' && Object.prototype.hasOwnProperty.call(PRICES, value);
}

// ─── Traitement des événements ───────────────────────────────────────────────

function handleCheckoutCompleted(
  event: Stripe.Event,
  session: Stripe.Checkout.Session,
  log: ReturnType<typeof createLogger>,
): void {
  const variant = session.metadata?.variant;

  if (!isKnownVariant(variant)) {
    // Session créée hors de /api/checkout (ou metadata perdue) : on le signale
    // mais on ne casse rien — l'argent est quand même encaissé.
    log.warn('webhook.checkout_completed_unknown_variant', {
      eventId: event.id,
      sessionId: session.id,
      receivedVariant: variant,
      amountTotal: session.amount_total,
    });
    return;
  }

  // `logSale` ne persiste qu'en mémoire runtime : c'est le comportement voulu
  // en l'absence de base de données. L'email est masqué par le sanitizer.
  log.info('webhook.checkout_completed', {
    eventId: event.id,
    // `variant` est validé plus haut ; il est posé APRÈS describeSession()
    // pour rester la source de vérité (describeSession renvoie le metadata brut).
    ...describeSession(session),
    variant,
    amountCents: PRICES[variant].amount,
  });
}

function handlePaymentFailed(
  event: Stripe.Event,
  intent: Stripe.PaymentIntent,
  log: ReturnType<typeof createLogger>,
): void {
  log.warn('webhook.payment_failed', {
    eventId: event.id,
    paymentIntentId: intent.id,
    amount: intent.amount,
    currency: intent.currency,
    declineCode: intent.last_payment_error?.decline_code,
    // `message` peut contenir des détails du schéma de carte → sanitizé.
    errorMessage: intent.last_payment_error?.message,
  });
}

// ─── Route ───────────────────────────────────────────────────────────────────

export async function POST(request: Request) {
  const requestId = resolveRequestId(request.headers.get('x-request-id'));
  const log = createLogger(requestId);

  // ── 0. Configuration ──────────────────────────────────────────────────────
  const webhookSecret = getWebhookSecret();
  if (!isStripeConfigured() || !webhookSecret) {
    const missing = [
      !isStripeConfigured() ? 'STRIPE_SECRET_KEY' : null,
      !webhookSecret ? 'STRIPE_WEBHOOK_SECRET' : null,
    ].filter(Boolean);

    log.error('webhook.not_configured', { missing });

    return NextResponse.json(
      {
        error: 'Webhook non configuré.',
        missing,
        remediation:
          'Définir STRIPE_SECRET_KEY et STRIPE_WEBHOOK_SECRET dans l’environnement, puis redéployer.',
      },
      { status: 503, headers: { 'Cache-Control': 'no-store', 'x-request-id': requestId } },
    );
  }

  // ── 1. Signature (en-tête + corps brut) ────────────────────────────────────
  const signature = request.headers.get('stripe-signature');
  if (!signature) {
    log.warn('webhook.missing_signature');
    return NextResponse.json(
      { error: 'En-tête stripe-signature manquant.' },
      { status: 400, headers: { 'Cache-Control': 'no-store', 'x-request-id': requestId } },
    );
  }

  // ⚠️ Lecture en texte brut : indispensable pour constructEvent.
  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    event = getStripeClient().webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    log.warn('webhook.invalid_signature', {
      error: err instanceof Error ? err.message : 'Signature invalide',
    });
    // 400 : Stripe doit savoir que la requête est mauvaise et non rejouable.
    return NextResponse.json(
      { error: 'Signature webhook invalide.' },
      { status: 400, headers: { 'Cache-Control': 'no-store', 'x-request-id': requestId } },
    );
  }

  // ── 2. Idempotence ─────────────────────────────────────────────────────────
  if (processedEvents.has(event.id)) {
    log.info('webhook.duplicate_ignored', { eventId: event.id, type: event.type });
    // 200 immédiat : la répétition est un succès du point de vue de Stripe.
    return NextResponse.json(
      { received: true, duplicate: true },
      { status: 200, headers: { 'Cache-Control': 'no-store', 'x-request-id': requestId } },
    );
  }
  processedEvents.add(event.id);

  // ── 3. Dispatch ────────────────────────────────────────────────────────────
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        handleCheckoutCompleted(
          event,
          event.data.object as Stripe.Checkout.Session,
          log,
        );
        break;
      }

      case 'payment_intent.payment_failed': {
        handlePaymentFailed(
          event,
          event.data.object as Stripe.PaymentIntent,
          log,
        );
        break;
      }

      default: {
        // Événement non traité : acquitté sans bruit.
        log.info('webhook.unhandled_event', { eventId: event.id, type: event.type });
      }
    }
  } catch (err) {
    // On log, mais on répond quand même 200 : Stripe ne doit pas boucler sur
    // un handler de log. Le Set garantit qu'on ne retente pas l'event.id.
    log.error('webhook.handler_error', { eventId: event.id, type: event.type, err });
  }

  return NextResponse.json(
    { received: true },
    { status: 200, headers: { 'Cache-Control': 'no-store', 'x-request-id': requestId } },
  );
}

/** GET : diagnostic de l'état du webhook (sans rien modifier). */
export async function GET() {
  const webhookSecret = getWebhookSecret();
  const configured = isStripeConfigured() && Boolean(webhookSecret);

  return NextResponse.json(
    {
      service: 'ia-premium stripe webhook',
      configured,
      stripeConfigured: isStripeConfigured(),
      webhookSecretConfigured: Boolean(webhookSecret),
      // Nombre d'événements traités par CETTE instance (le Set est par instance).
      processedInThisInstance: processedEvents.size,
      handledEvents: ['checkout.session.completed', 'payment_intent.payment_failed'],
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'no-store',
        ...(configured ? {} : { 'x-webhook-degraded': 'true' }),
      },
    },
  );
}
