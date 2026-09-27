import { notFound } from 'next/navigation'
import { getStripeClient, isStripeConfigured } from '@/lib/stripe'

// ─── Page de succès après paiement Stripe ─────────────────────────────────────

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const params = await searchParams
  const sessionId = params.session_id

  if (!sessionId) {
    notFound()
  }

  // Récupérer les détails de la session Stripe
  let session: {
    id: string
    payment_status: string
    amount_total: number | null
    currency: string
    customer_email: string | null
    metadata: Record<string, string> | null
    created: number | null
  } | null = null

  let error: string | null = null

  if (isStripeConfigured()) {
    try {
      const stripe = getStripeClient()
      session = await stripe.checkout.sessions.retrieve(sessionId)
    } catch (err) {
      console.error('[checkout/success] Erreur récupération session:', err)
      error = 'Impossible de charger les détails de votre commande. Réessayez ou contactez le support.'
    }
  } else {
    error = 'Service de paiement non configuré.'
  }

  const paid =
    session?.payment_status === 'paid' ||
    session?.payment_status === 'authorized'

  const amount =
    session?.amount_total ? (session.amount_total / 100).toFixed(2) : '0.00'
  const variantLabel = session?.metadata?.variant_display || 'Produit premium'

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center space-y-6">
        {/* En-tête de succès */}
        {paid ? (
          <>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <svg
                className="w-8 h-8 text-emerald-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <div>
              <h1 className="text-3xl font-light text-white tracking-tight">
                Paiement confirmé
              </h1>
              <p className="mt-2 text-gray-300 text-sm">
                Merci pour votre achat — votre accès premium est activé.
              </p>
            </div>

            {/* Détails de la commande */}
            <div className="mt-8 rounded-xl bg-white/5 border border-white/10 p-6 text-left space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400 uppercase tracking-wider">
                  Référence
                </span>
                <span className="text-sm text-gray-300 font-mono">
                  {session?.id || '—'}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400 uppercase tracking-wider">
                  Produit
                </span>
                <span className="text-sm text-gray-300">{variantLabel}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400 uppercase tracking-wider">
                  Montant
                </span>
                <span className="text-sm text-gray-300">{amount} €</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400 uppercase tracking-wider">
                  Email
                </span>
                <span className="text-sm text-gray-300 truncate max-w-[200px]">
                  {session?.customer_email || '—'}
                </span>
              </div>
            </div>

            {/* Prochaines étapes */}
            <div className="mt-8 p-5 rounded-xl bg-white/5 border border-white/10">
              <h2 className="text-sm text-gray-200 font-medium mb-3">
                Vos prochaines étapes
              </h2>
              <ol className="text-sm text-gray-400 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">→</span>
                  <span>
                    Consultez votre{' '}
                    <a
                      href="/dashboard"
                      className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2"
                    >
                      dashboard
                    </a>{' '}
                    pour accéder à vos générations.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">→</span>
                  <span>
                    Un email de confirmation a été envoyé à{' '}
                    <span className="text-gray-200">
                      {session?.customer_email || 'votre adresse'}
                    </span>
                    .
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">→</span>
                  <span>
                    Vous pouvez maintenant utiliser le moteur premium pour
                    créer du contenu de qualité.
                  </span>
                </li>
              </ol>
            </div>

            {/* Lien retour */}
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 mt-8 rounded-lg border border-white/10 bg-white/5 px-6 py-3 text-sm text-gray-300 hover:bg-white/10 hover:border-white/20 transition-all"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Retour à l'accueil
            </a>
          </>
        ) : (
          <div className="space-y-4">
            <h1 className="text-2xl font-light text-white">
              Paiement en attente
            </h1>

            {error ? (
              <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-6 text-left">
                <p className="text-sm text-amber-300">{error}</p>
              </div>
            ) : (
              <p className="text-gray-300 text-sm">
                Votre commande est en cours de traitement. Vérifiez votre email
                ou retournez à l'accueil.
              </p>
            )}

            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 mt-6 rounded-lg border border-white/10 bg-white/5 px-6 py-3 text-sm text-gray-300 hover:bg-white/10 transition-all"
            >
              Retour à l'accueil
            </a>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 text-xs text-gray-500">
          paiement sécurisé par Stripe · ia-premium © 2024
        </footer>
      </div>
    </div>
  )
}

// ─── Generate static params (SEO) ─────────────────────────────────────────────

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const params = await searchParams
  return {
    title: params.session_id ? 'Paiement confirmé — ia-premium' : 'Commande réussie',
    description: 'Votre accès premium ia-premium a été activé avec succès.',
  }
}
