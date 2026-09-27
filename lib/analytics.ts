// ia-premium — Analytics & logging des ventes Stripe
import { PRICES, type Variant } from '@/lib/stripe'

// ─── Types ────────────────────────────────────────────────────────────────────

interface SaleLogEntry {
  variant: Variant
  label: string
  amountCents: number
  timestamp: string
  source?: string
}

// ─── Log en mémoire (persiste seulement le runtime) ──────────────────────────
const saleLog: SaleLogEntry[] = []

// ─── Logging des ventes ───────────────────────────────────────────────────────

/**
 * Enregistre une vente dans le log interne.
 * À utiliser après un événement `checkout.session.completed` Stripe.
 */
export function logSale(variant: Variant, source: string = 'manual'): SaleLogEntry {
  const price = PRICES[variant]
  const entry: SaleLogEntry = {
    variant,
    label: price.label,
    amountCents: price.amount,
    timestamp: new Date().toISOString(),
    source,
  }
  saleLog.push(entry)
  console.log(`[analytics] Vente enregistrée → ${variant} (${price.label}) — ${price.amount / 100}€ [source: ${source}]`)
  return entry
}

/**
 * Récupère l'historique des ventes loguées.
 */
export function getSaleLog(): SaleLogEntry[] {
  return [...saleLog]
}

/**
 * Récupère le total des ventes en centimes.
 */
export function getTotalSalesCents(): number {
  return saleLog.reduce((sum, e) => sum + e.amountCents, 0)
}

/**
 * Récupère le nombre de ventes par variant.
 */
export function getSalesByVariant(): Record<Variant, number> {
  const counts: Record<Variant, number> = {
    unit: 0,
    pack: 0,
    coffret: 0,
  }
  for (const entry of saleLog) {
    counts[entry.variant]++
  }
  return counts
}

// ─── Hook webhook Stripe (à appeler depuis le handler webhook) ───────────────

/**
 * Traite un événement Stripe `checkout.session.completed`.
 * Logue la vente si Stripe est configuré.
 */
export function handleCheckoutCompleted(session: {
  id: string
  customer_email?: string
  amount_total: number
  metadata?: Record<string, string>
}): SaleLogEntry | null {
  if (!process.env.STRIPE_SECRET_KEY) {
    console.warn('[analytics] Stripe non configuré — vente non loggée (session:', session.id, ')')
    return null
  }

  const variant = session.metadata?.variant as Variant | undefined
  const source = session.metadata?.source || 'stripe-webhook'

  if (!variant || !(variant in PRICES)) {
    console.warn('[analytics] Variante inconnue dans session:', session.id, 'metadata:', session.metadata)
    return null
  }

  const entry = logSale(variant, source)
  console.log(`[analytics] Webhook checkout.session.completed → session:${session.id} variant:${variant} email:${session.customer_email} amount:${session.amount_total / 100}€`)
  return entry
}
