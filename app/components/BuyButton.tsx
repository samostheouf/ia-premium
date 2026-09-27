import { PRICES, type Variant, formatPrice } from '@/lib/stripe'

interface BuyButtonProps {
  /** Identifiant unique du produit (utilisé pour le tracking) */
  productId: string
  /** Nom affiché du produit */
  productName: string
  /** Variante de prix : 'unit' (49.90€), 'pack' (199.90€), 'coffret' (499.90€) */
  variant: Variant
  /** URL de prévisualisation optionnelle */
  previewUrl?: string
  /** Nombre de développeurs pour affichage (optionnel) */
  developers?: number
}

const VARIANT_LABELS: Record<Variant, string> = {
  unit: 'Contenu Premium',
  pack: 'Pack 5 — 5 générations',
  coffret: 'Coffret Illimité — Accès à vie',
}

const VARIANT_BENEFITS: Record<Variant, string[]> = {
  unit: [
    'Accès illimité au moteur de génération',
    'Toutes les catégories de contenu',
    'Formats texte, markdown, JSON',
  ],
  pack: [
    '5 crédits de génération premium',
    'Mêmes modèles que l'accès unitaire',
    'Idéal pour tester sans engagement',
  ],
  coffret: [
    'Accès complet et illimité',
    'Toutes les fonctionnalités avancées',
    'Paiement unique — pas d\'abonnement',
    'Priorité de support',
  ],
}

export default function BuyButton({
  productId,
  productName,
  variant,
  previewUrl,
  developers = 0,
}: BuyButtonProps) {
  const price = PRICES[variant]
  const label = VARIANT_LABELS[variant]

  // ─── State ──────────────────────────────────────────────────────────────────
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [showBenefits, setShowBenefits] = useState(false)

  // ─── Checkout handler ───────────────────────────────────────────────────────
  const handleCheckout = async () => {
    if (!email) {
      setError('Veuillez entrer votre email')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          variant,
          email,
          productId,
          productName,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Erreur lors de la création de la commande')
      }

      if (data.url) {
        setSuccess(true)
        // Redirection après bref délai pour feedback visuel
        setTimeout(() => {
          window.location.href = data.url
        }, 800)
      } else {
        throw new Error(data.error || 'Aucune URL de paiement reçue')
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Une erreur est survenue. Réessayez ou contactez le support.',
      )
      setLoading(false)
    }
  }

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* ── En-tête variante ── */}
      <div className="space-y-1">
        <h3 className="text-lg font-medium text-white">{productName}</h3>
        <p className="text-sm text-gray-400">{label}</p>
      </div>

      {/* ── Badge tarifaire ── */}
      <div className="flex items-center justify-between rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-3">
        <span className="text-sm text-gray-400">Tarif</span>
        <span className="text-2xl font-light text-white">
          {formatPrice(price.amount)}
        </span>
      </div>

      {/* ── Description variante ── */}
      <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
        {price.description}
      </p>

      {/* ── Avantages (expandable) ── */}
      {variant === 'coffret' && (
        <div className="border border-gray-700 rounded-lg bg-gray-800/30">
          <button
            type="button"
            onClick={() => setShowBenefits(!showBenefits)}
            className="w-full flex items-center justify-between px-4 py-3 text-sm text-gray-300 hover:bg-gray-800/50 transition-colors"
          >
            <span>Ce que vous obtenez</span>
            <svg
              className={`w-4 h-4 transition-transform ${showBenefits ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {showBenefits && (
            <ul className="px-4 pb-3 space-y-1.5 text-xs text-gray-400">
              {VARIANT_BENEFITS[variant].map((benefit, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">✓</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* ── Champ email ── */}
      <input
        type="email"
        placeholder="votre@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-label="Email pour la commande"
        className="w-full rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
      />

      {/* ── Message d'erreur ── */}
      {error && (
        <div
          className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3"
          role="alert"
        >
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {/* ── Bouton achat ── */}
      <button
        onClick={handleCheckout}
        disabled={loading || !email || success}
        aria-label={`Acheter ${productName} — ${formatPrice(price.amount)}`}
        className={`relative flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-semibold text-white transition-all duration-200 overflow-hidden ${
          success
            ? 'bg-emerald-500 shadow-lg shadow-emerald-500/20 cursor-default'
            : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5 active:scale-[0.98]"
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {success ? (
          <>
            <svg className="h-5 w-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Paiement confirmé — redirection...</span>
          </>
        ) : loading ? (
          <>
            <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span>Préparation du paiement...</span>
          </>
        ) : (
          <>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            <span>Acheter — {formatPrice(price.amount)}</span>
          </>
        )}
        {!success && !loading && (
          <span className="absolute inset-0 bg-white/10 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
        )}
      </button>

      {/* ── Aperçu produit ── */}
      {previewUrl && (
        <div className="relative">
          <button
            type="button"
            onMouseEnter={() => setShowPreview(true)}
            onMouseLeave={() => setShowPreview(false)}
            onClick={() => setShowPreview(!showPreview)}
            className="w-full text-xs text-gray-500 hover:text-indigo-400 transition-colors flex items-center justify-center gap-1"
          >
            {showPreview ? 'Masquer' : 'Voir l\'aperçu'}
          </button>
          {showPreview && (
            <div className="absolute left-1/2 -translate-x-1/2 bottom-8 z-10 w-72 rounded-lg border border-gray-700 bg-gray-800 shadow-2xl p-1">
              <img
                src={previewUrl}
                alt={productName}
                width={288}
                height={162}
                className="w-full rounded object-cover"
                loading="lazy"
              />
            </div>
          )}
        </div>
      )}

      {/* ── Barre de confiance ── */}
      <div className="flex items-center justify-center gap-4 pt-1 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Paiement Stripe sécurisé
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 2.21-.9 4-2 5.19c.57.4 1.2.64 1.86.64c2.69 0 5-2.32 5-5.5c0-2.21-1.13-4-2.87-4.9c.5-1.77.8-3.64.8-5.5c0-4.58-3.58-8.25-8.25-8.25S3 5.42 3 10c0 1.86.4 3.64.8 5.5C4.13 14 3 15.79 3 18c0 4.58 3.58 8.25 8.25 8.25c1.86 0 3.64-.4 5.5-.8c-.9 1.52-2.41 2.5-4.23 2.5c-1.52 0-2.8-1.02-3.22-2.38c-.66-.12-1.3-.2-1.96-.2c-2.69 0-5 2.31-5 5c0 1.67.63 3.22 1.66 4.34C5.5 22 7.5 23 10 23c3.53 0 6.56-.63 9.16-1.74c.93-.44 1.79-1.05 2.48-1.83c.9-.91 1.42-2.06 1.42-3.34c0-2.07-.95-3.88-2.34-5.07C16.8 12.5 14.8 12 12 11z" />
          </svg>
          Crypté
        </span>
      </div>

      {/* ── Développeurs (si présent) ── */}
      {developers > 0 && (
        <div className="flex items-center justify-center gap-2 pt-1 text-xs text-emerald-400">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>{developers} {developers > 1 ? 'développeurs' : 'développeur'}</span>
        </div>
      )}
    </div>
  )
}
