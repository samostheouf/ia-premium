'use client'

/**
 * ia-premium — Bouton d'achat de la page d'accueil
 * ─────────────────────────────────────────────────────────────────────────────
 * Isolé dans son propre fichier client : la page d'accueil (app/page.tsx)
 * reste un Server Component, ce qui permet d'y injecter directement les
 * données structurées JSON-LD et les métadonnées SEO.
 *
 * ⚠️ Aucun import de lib/stripe ici : le SDK Stripe reste confiné au serveur.
 * L'URL de paiement est créée via la route API /api/checkout.
 */
interface CheckoutButtonProps {
  variant: 'unit' | 'pack' | 'coffret'
  label: string
  className?: string
}

export default function CheckoutButton({ variant, label, className = '' }: CheckoutButtonProps) {
  const handleClick = async () => {
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ variant }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert(data.error || 'Impossible de créer le paiement. Réessayez.')
      }
    } catch {
      alert('Erreur réseau. Réessayez.')
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`text-white font-bold px-6 py-3 rounded-xl text-base transition-all w-full ${className}`}
      style={{
        background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.background = 'linear-gradient(135deg, #4338ca 0%, #4f46e5 100%)'
        e.currentTarget.style.transform = 'translateY(-1px)'
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(99,102,241,0.4)'
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {label}
    </button>
  )
}
