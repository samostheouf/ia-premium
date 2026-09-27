'use client'

// Bandeau de consentement cookies — conforme RGPD.
//
// Principes retenus :
//  - Refuser est aussi simple et aussi visible qu'accepter (symétrie).
//  - Aucun cookie ni traceur n'est déposé avant un choix explicite.
//  - Le refus est aussi simple que l'acceptation, et bloque toute
//    collecte de mesure (cf. Analytics).
//  - Le choix est modifiable à tout moment via le lien « Cookies » du footer.

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Cookie } from 'lucide-react'

import { ANALYTICS_CONSENT_KEY } from './Analytics'

/** Valeurs possibles du consentement « mesure d'audience ». */
export type ConsentValue = 'accepted' | 'refused' | 'partial' | 'unknown'

export interface CookiePreferences {
  /** Strictement nécessaires au fonctionnement du site. Non refusables. */
  essential: true
  /** Mesure d'audience anonyme, premier partie. */
  analytics: ConsentValue
  /** Date du dernier choix, au format ISO. */
  updatedAt: string
}

export interface CookieConsentProps {
  /** Clé de stockage du consentement (partagée avec Analytics). */
  storageKey?: string
  /** Lien vers la politique cookies. */
  policyHref?: string
  /** Lien vers la politique de confidentialité. */
  privacyHref?: string
  /** Masque le panneau (utile si la page gère déjà le consentement). */
  className?: string
}

const DEFAULT_KEY = ANALYTICS_CONSENT_KEY

export default function CookieConsent({
  storageKey = DEFAULT_KEY,
  policyHref = '/politique-cookies',
  privacyHref = '/politique-confidentialite',
  className = '',
}: CookieConsentProps = {}) {
  const [visible, setVisible] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)

  // Le panneau n'apparaît qu'après le montage : évite un clignotement SSR et
  // garantit qu'un choix déjà fait n'est jamais redemandé.
  useEffect(() => {
    try {
      if (!window.localStorage.getItem(storageKey)) {
        setVisible(true)
      }
    } catch {
      // Navigateur en mode privé / stockage bloqué : on n'affiche rien plutôt
      // que deemand une décision qu'on ne pourra pas mémoriser.
    }
  }, [storageKey])

  function save(value: ConsentValue) {
    const preferences: CookiePreferences = {
      essential: true,
      analytics: value,
      updatedAt: new Date().toISOString(),
    }
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(preferences))
    } catch {
      // Stockage indisponible : la décision s'applique pour la session en cours.
    }
    setVisible(false)
  }

  // Échap ferme le panneau avec un refus (comportement RGPD(expected)).
  useEffect(() => {
    if (!visible) return
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') save('refused')
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  })

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      className={`fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6 ${className}`}
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-indigo-800/50 bg-indigo-950/95 shadow-2xl shadow-indigo-500/10 backdrop-blur-xl">
        <div className="p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <Cookie className="h-7 w-7 flex-shrink-0 text-indigo-400" aria-hidden="true" />
            <div className="flex-1">
              <h2 id="cookie-consent-title" className="text-base font-bold text-white sm:text-lg">
                Cookies et mesure d’audience
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-indigo-200">
                Nous utilisons uniquement des cookies <strong>strictement nécessaires</strong> au
                fonctionnement du site, et — uniquement si vous l’autorisez — une mesure d’audience
                anonyme et interne. Aucun traceur publicitaire, aucun service tiers, aucune revente
                de données. Vous pouvez refuser sans aucune conséquence sur l’accès au service.
              </p>

              <button
                type="button"
                onClick={() => setDetailsOpen((open) => !open)}
                aria-expanded={detailsOpen}
                className="mt-3 text-sm text-indigo-400 underline underline-offset-2 transition-colors hover:text-white"
              >
                {detailsOpen ? 'Masquer le détail' : 'Voir le détail des cookies'}
              </button>

              {detailsOpen ? (
                <div className="mt-4 space-y-3 rounded-xl bg-indigo-900/50 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-white">Nécessaires</p>
                      <p className="text-xs text-indigo-300">
                        Mémorise votre choix de consentement. Indispensable pour ne pas vous
                        redemander à chaque visite.
                      </p>
                    </div>
                    <span className="mt-0.5 shrink-0 rounded-full bg-indigo-600/40 px-2.5 py-1 text-xs font-semibold text-white">
                      Toujours actif
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-white">Mesure d’audience</p>
                      <p className="text-xs text-indigo-300">
                        Comptage de pages vues et de clics, sans cookie publicitaire ni
                        identifiant persistant. Envoyé à notre propre serveur, ou pas du tout si
                        vous refusez.
                      </p>
                    </div>
                    <span className="mt-0.5 shrink-0 rounded-full bg-indigo-800 px-2.5 py-1 text-xs font-semibold text-indigo-200">
                      Facultatif
                    </span>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => save('accepted')}
              className="btn-premium rounded-lg px-4 py-2.5 text-sm"
            >
              Tout accepter
            </button>
            <button
              type="button"
              onClick={() => save('refused')}
              className="btn-ghost rounded-lg px-4 py-2.5 text-sm"
            >
              Tout refuser
            </button>
            <Link
              href={policyHref}
              className="rounded-lg px-4 py-2.5 text-sm text-indigo-300 transition-colors hover:text-white"
            >
              Politique cookies
            </Link>
            <Link
              href={privacyHref}
              className="rounded-lg px-4 py-2.5 text-sm text-indigo-300 transition-colors hover:text-white"
            >
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
