'use client'

// Bouton d'achat client — appelle l'API /api/checkout sans jamais importer le
// SDK Stripe ni lib/stripe.ts (les prix sont des constantes locales, en centimes).
// Même comportement que le BuyButton local de app/page.tsx.

import { useState } from 'react'
import { Lock, Loader2 } from 'lucide-react'

export type PlanVariant = 'unit' | 'pack' | 'coffret'

const AMOUNTS: Record<PlanVariant, number> = {
  unit: 4990,
  pack: 19990,
  coffret: 49990,
}

const LABELS: Record<PlanVariant, string> = {
  unit: 'Acheter — 49,90 €',
  pack: 'Acquérir le Pack 5 — 199,90 €',
  coffret: 'Prendre l’Illimité — 499,90 €',
}

export default function PricingBuyButton({
  variant,
  className = '',
}: {
  variant: PlanVariant
  className?: string
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleClick() {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ variant, metadata: { source: `pricing-${variant}` } }),
      })
      const data = (await response.json()) as { url?: string; error?: string }
      if (data.url) {
        window.location.href = data.url
        return
      }
      setError(data.error ?? 'Impossible de créer la session de paiement. Réessayez dans un instant.')
      setLoading(false)
    } catch {
      setError('Erreur réseau. Vérifiez votre connexion et réessayez.')
      setLoading(false)
    }
  }

  return (
    <div className={className}>
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)' }}
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Redirection vers le paiement…
          </>
        ) : (
          <>
            <Lock className="h-4 w-4" aria-hidden="true" />
            {LABELS[variant]}
          </>
        )}
      </button>
      {error ? (
        <p role="alert" className="mt-2 text-center text-xs font-medium text-red-600">
          {error}
        </p>
      ) : (
        <p className="mt-2 text-center text-xs text-gray-400">
          {AMOUNTS[variant] === 49990
            ? 'Paiement unique — accès à vie, sans abonnement.'
            : 'Paiement unique — aucun abonnement, aucun engagement récurrent.'}
        </p>
      )}
    </div>
  )
}
