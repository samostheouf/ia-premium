// ia-premium — Constantes tarifaires partagées (CLIENT-SAFE)
//
// ⚠️ Ce module n'importe NI `stripe` NI `@/lib/stripe` : il peut donc être
// importé sans risque depuis n'importe quel composant client (Header, CTA…)
// sans embarquer le SDK Stripe dans le bundle navigateur.
//
// `lib/stripe.ts` reste la source de vérité côté serveur (API routes) et
// reprend ces mêmes montants. Si un tarif change, modifier les deux fichiers.

export const PRICES = {
  unit: {
    id: 'price_unit_premium',
    label: 'Contenu Premium — Accès unitaire',
    shortLabel: 'Accès unitaire',
    description:
      'Accès illimité au moteur de génération de contenu premium. Templates copywriting, réseaux sociaux, email, landing page, storytelling.',
    amount: 4990, // 49,90 €
    cta: 'Acheter 49,90 €',
  },
  pack: {
    id: 'price_pack_5',
    label: 'Pack 5 — 5 générations premium',
    shortLabel: 'Pack 5 générations',
    description:
      '5 crédits de génération premium. Idéal pour les équipes qui veulent tester sans engagement illimité.',
    amount: 19990, // 199,90 €
    cta: 'Acquérir le pack — 199,90 €',
  },
  coffret: {
    id: 'price_coffret_illimite',
    label: 'Coffret Illimité — Accès à vie',
    shortLabel: 'Coffret illimité',
    description:
      'Accès complet et illimité au moteur premium, avec toutes les fonctionnalités avancées. Paiement unique, pas d’abonnement.',
    amount: 49990, // 499,90 €
    cta: 'Prendre l’illimité — 499,90 €',
  },
} as const

export type Variant = keyof typeof PRICES

/** Tous les identifiants de variante, dans l’ordre d’affichage. */
export const VARIANTS: readonly Variant[] = ['unit', 'pack', 'coffret'] as const

/** Formate un montant en centimes en euros à la française. */
export function formatPrice(amountCents: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(amountCents / 100)
}

/** Devine la variante à partir d'un montant (utile pour les logs d'événements). */
export function variantFromAmount(amountCents: number): Variant | null {
  for (const variant of VARIANTS) {
    if (PRICES[variant].amount === amountCents) return variant
  }
  return null
}
