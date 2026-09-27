// ia-premium — Configuration Stripe
import Stripe from 'stripe'

// ─── Prix des produits (en centimes EUR) ─────────────────────────────────────
export const PRICES = {
  unit: {
    id: 'price_unit_premium',
    label: 'Contenu Premium — Accès unitaire',
    description: 'Accès illimité au moteur de génération de contenu premium. Templates copywriting, réseaux sociaux, email, landing page, storytelling, idéoque.',
    amount: 4990, // 49.90€
    interval: null,
  },
  pack: {
    id: 'price_pack_5',
    label: 'Pack 5 — 5 générations premium',
    description: '5 crédits de génération premium. Idéal pour les équipes qui veulent tester sans engagement illimité.',
    amount: 19990, // 199.90€
    interval: null,
  },
  coffret: {
    id: 'price_coffret_illimite',
    label: 'Coffret Illimité — Accès à vie',
    description: 'Accès complet et illimité au moteur premium, avec toutes les fonctionnalités avancées. Paiement unique, pas d\'abonnement.',
    amount: 49990, // 499.90€
    interval: null,
  },
} as const

export type Variant = keyof typeof PRICES

// ─── Client Stripe ────────────────────────────────────────────────────────────
let stripeInstance: Stripe | null = null

function getStripe(): Stripe {
  if (!stripeInstance) {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) {
      throw new Error('STRIPE_SECRET_KEY manquante — impossible d\'initialiser Stripe')
    }
    stripeInstance = new Stripe(key, {
      apiVersion: '2024-06-20',
      typescript: true,
    })
  }
  return stripeInstance
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Transforme un montant en centimes pour Stripe (int) */
export function toStripeAmount(amountCents: number): number {
  return Math.round(amountCents)
}

/** Formatteur de prix pour affichage */
export function formatPrice(amountCents: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(amountCents / 100)
}

/** Vérifie que Stripe est configuré */
export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY)
}

/** Récupère le client Stripe (throw si non configuré) */
export function getStripeClient(): Stripe {
  return getStripe()
}
