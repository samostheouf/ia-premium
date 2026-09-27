'use client'

// Bloc d'appel à l'action réutilisable, destiné à pousser à l'achat.
// Thème sombre premium indigo/purple.
//
// ⚠️ Aucun import de `stripe` ni de `@/lib/stripe` : le SDK reste côté serveur.
// La session de paiement est créée via POST /api/checkout (lib/checkout-client).
//
// Le cas 503 (clé Stripe pas encore configurée) est traité explicitement : un
// panneau élégant invite à nous contacter au lieu d'afficher une alerte brute.

import { useState } from 'react'
import { Check, Loader2, Lock, Mail, ShieldCheck, Sparkles, TriangleAlert } from 'lucide-react'

import { PRICES, type Variant, formatPrice } from '@/lib/pricing'
import { startCheckout } from '@/lib/checkout-client'

export interface CTAProps {
  /** Titre principal. */
  title: string
  /** Texte d'appui sous le titre. */
  subtitle?: string
  /** Formule proposée. Fixe le prix et l'identifiant transmis au paiement. */
  variant?: Variant
  /** Surcharge le libellé du bouton. */
  buttonLabel?: string
  /** Libellé alternatif quand le bouton est en cours d'action. */
  loadingLabel?: string
  /** Arguments affichés sous le bouton. */
  benefits?: readonly string[]
  /** Demande un champ e-mail avant de lancer le paiement. */
  requireEmail?: boolean
  /** Adresse de contact proposée si le paiement est indisponible. */
  contactEmail?: string
  /** Lien de repli quand le paiement est indisponible. */
  fallbackHref?: string
  /** Étiquette du lien de repli. */
  fallbackLabel?: string
  /** Source d'attribution transmise à l'API. */
  source?: string
  /** Désactive complètement le bloc. */
  disabled?: boolean
  className?: string
}

type Status = 'idle' | 'loading' | 'unavailable' | 'error' | 'success'

export default function CTA({
  title,
  subtitle,
  variant = 'coffret',
  buttonLabel,
  loadingLabel = 'Préparation du paiement…',
  benefits = ['Accès immédiat après paiement', 'Paiement unique, sans abonnement', 'Support prioritaire'],
  requireEmail = false,
  contactEmail = 'contact@ia-premium.fr',
  fallbackHref = '/contact',
  fallbackLabel = 'Nous contacter',
  source = 'cta',
  disabled = false,
  className = '',
}: CTAProps) {
  const price = PRICES[variant]
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState<string | null>(null)

  const isBusy = status === 'loading'
  const isUnavailable = status === 'unavailable'
  const isPlaceholderContact = contactEmail.startsWith('[À COMPLÉTER]')

  async function handleClick() {
    if (disabled || isBusy) return

    if (requireEmail && !email.trim()) {
      setStatus('error')
      setMessage('Renseignez votre adresse e-mail pour recevoir votre accès.')
      return
    }

    setStatus('loading')
    setMessage(null)

    const result = await startCheckout({
      variant,
      customerEmail: email.trim() || undefined,
      productName: price.label,
      source,
    })

    if (result.ok) {
      setStatus('success')
      window.location.href = result.url
      return
    }

    if (result.kind === 'unavailable') {
      setStatus('unavailable')
      setMessage(result.message)
      return
    }

    setStatus('error')
    setMessage(result.message)
  }

  return (
    <section
      aria-labelledby="cta-title"
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-indigo-950 px-6 py-12 shadow-2xl shadow-indigo-950/50 sm:px-10 ${className}`}
    >
      {/* Halos décoratifs */}
      <div className="premium-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="premium-glow-purple pointer-events-none absolute inset-0"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-indigo-200">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          Offre premium
        </span>

        <h2 id="cta-title" className="mt-5 text-3xl font-bold text-white sm:text-4xl">
          {title}
        </h2>

        {subtitle ? (
          <p className="mx-auto mt-3 max-w-xl text-indigo-200/85">{subtitle}</p>
        ) : null}

        <p className="mt-6 text-4xl font-black text-white sm:text-5xl">
          {formatPrice(price.amount)}
        </p>
        <p className="mt-1 text-sm text-indigo-300/80">{price.label}</p>

        {benefits.length > 0 ? (
          <ul className="mx-auto mt-8 grid max-w-md gap-2.5 text-left">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2.5 text-sm text-indigo-100">
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" aria-hidden="true" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {requireEmail ? (
          <div className="mx-auto mt-8 max-w-md">
            <label htmlFor="cta-email" className="sr-only">
              Votre adresse e-mail
            </label>
            <input
              id="cta-email"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value)
                if (status === 'error') setStatus('idle')
              }}
              placeholder="votre@email.com"
              autoComplete="email"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-indigo-400/50 transition-colors focus:border-indigo-400/60 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
            />
          </div>
        ) : null}

        <button
          type="button"
          onClick={handleClick}
          disabled={disabled || isBusy || status === 'success'}
          aria-busy={isBusy}
          className="btn-premium mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl px-8 py-4 text-base font-semibold disabled:cursor-not-allowed"
        >
          {isBusy ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
              {loadingLabel}
            </>
          ) : status === 'success' ? (
            <>
              <Check className="h-5 w-5" aria-hidden="true" />
              Redirection vers le paiement…
            </>
          ) : (
            <>
              <Lock className="h-4 w-4" aria-hidden="true" />
              {buttonLabel ?? price.cta}
            </>
          )}
        </button>

        {/* Messages d'état — role="status" pour être lus par les lecteurs d'écran */}
        {message ? (
          <div
            role="status"
            aria-live="polite"
            className={`mt-5 flex items-start gap-3 rounded-xl border px-4 py-3.5 text-left text-sm ${
              isUnavailable
                ? 'border-amber-500/30 bg-amber-500/10 text-amber-200'
                : 'border-red-500/30 bg-red-500/10 text-red-300'
            }`}
          >
            <TriangleAlert className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
            <div>
              <p>{message}</p>
              {isUnavailable ? (
                <p className="mt-2 text-xs text-amber-200/80">
                  {isPlaceholderContact ? (
                    <>
                      Écrivez-nous via la page{' '}
                      <a href={fallbackHref} className="underline underline-offset-2">
                        {fallbackLabel.toLowerCase()}
                      </a>
                      .
                    </>
                  ) : (
                    <>
                      Écrivez-nous à{' '}
                      <a
                        href={`mailto:${contactEmail}`}
                        className="inline-flex items-center gap-1 underline underline-offset-2"
                      >
                        <Mail className="h-3 w-3" aria-hidden="true" />
                        {contactEmail}
                      </a>
                    </>
                  )}
                </p>
              ) : null}
            </div>
          </div>
        ) : null}

        {/* Réassurance */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-indigo-400/80">
          <span className="flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5 text-emerald-400/80" aria-hidden="true" />
            Paiement sécurisé par Stripe
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400/80" aria-hidden="true" />
            Aucune donnée bancaire stockée
          </span>
        </div>
      </div>
    </section>
  )
}
