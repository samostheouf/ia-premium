'use client'

// Analytics interne, minimaliste et respectueux de la vie privée.
//
// ⚠️ Aucun traceur tiers. Ni Google Analytics, ni Meta Pixel, ni Hotjar, ni
// aucun script chargé depuis un domaine externe. Le composant se limite à :
//   1. des événements internes (clics CTA, ouvertures de FAQ, navigation)
//   2. un envoi facultatif vers NOTRE PROPRE endpoint (/api/analytics)
//
// Rien n'est stocké dans un cookie, aucun identifiant publicitaire n'est
// généré, aucun fingerprint n'est calculé. L'envoi est bloqué tant que
// l'utilisateur n'a pas accepté les cookies de mesure (voir CookieConsent),
// et un consentement « refusé » coupe définitivement tout envoi.

import { useCallback, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

/** Clé de stockage du consentement (partagée avec CookieConsent). */
export const ANALYTICS_CONSENT_KEY = 'ia-premium-consent'

/** Enveloppes consentements reconnues par le composant. */
export type ConsentValue = 'accepted' | 'refused' | 'partial' | 'unknown'

export interface AnalyticsEvent {
  /** Nom de l'événement, ex. 'cta_click', 'faq_open'. */
  name: string
  /** Catégorie libre, ex. 'engagement', 'checkout'. */
  category?: string
  /** Valeur numérique facultative (montant, position…). */
  value?: number
  /** Attributs additionnels (chaînes uniquement, aucune donnée personnelle). */
  props?: Record<string, string | number | boolean>
}

export interface AnalyticsProps {
  /** Désactive complètement la collecte. */
  enabled?: boolean
  /**
   * Endpoint recevant les événements.
   * Par défaut : '/api/analytics' (notre propre route, premier partie).
   * Passer '' pour n'effectuer aucun envoi réseau du tout.
   */
  endpoint?: string
  /** Log les événements dans la console (développement). */
  debug?: boolean
  /** Suivi automatique des changements de page. */
  trackPageViews?: boolean
  /** Clé de stockage du consentement. */
  consentKey?: string
}

/**
 * Vocabulaire d'événements accepté par la route POST /api/analytics.
 * La route applique une whitelist fermée : un nom hors de cette liste est
 * rejeté en 400. Aligner nos noms dessus évite des envois perdu en silence.
 */
export const TRACKED_EVENTS = ['page_view', 'checkout_start', 'generate'] as const
export type TrackedEvent = (typeof TRACKED_EVENTS)[number]

interface WireEvent {
  event: string
  path: string
  category?: string
  variant?: string
  ts: string
}

/** Le chemin de la route API, utilisé si aucun endpoint n'est passé en prop. */
export const DEFAULT_ANALYTICS_ENDPOINT = '/api/analytics'

/** Lit le consentement stocké. Absent = pas encore de choix = refus par défaut. */
function readConsent(key: string): ConsentValue {
  if (typeof window === 'undefined') return 'unknown'
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return 'unknown'
    const parsed = JSON.parse(raw) as { analytics?: string }
    const value = parsed?.analytics
    if (
      value === 'accepted' ||
      value === 'refused' ||
      value === 'partial' ||
      value === 'unknown'
    ) {
      return value
    }
    return 'unknown'
  } catch {
    return 'unknown'
  }
}

/** Le consentement « refusé » coupe tout envoi. */
function canSend(consent: ConsentValue): boolean {
  return consent === 'accepted' || consent === 'partial'
}

export default function Analytics({
  enabled = true,
  endpoint = DEFAULT_ANALYTICS_ENDPOINT,
  debug = false,
  trackPageViews = true,
  consentKey = ANALYTICS_CONSENT_KEY,
}: AnalyticsProps = {}) {
  const pathname = usePathname()
  // Les props sont souvent des littéraux inline : on les lit via une ref pour
  // éviter de ré-instancier les callbacks à chaque rendu.
  const config = useRef({ endpoint, debug })
  config.current = { endpoint, debug }

  const send = useCallback(
    (event: AnalyticsEvent) => {
      if (typeof window === 'undefined' || !enabled) return
      if (config.current.debug) {
        console.info('[analytics]', event.name, event)
      }
      const url = config.current.endpoint
      if (!url || !canSend(readConsent(consentKey))) return

      const payload: WireEvent = {
        event: event.name,
        path: window.location.pathname,
        category: event.category,
        variant:
          typeof event.props?.variant === 'string' ? event.props.variant : undefined,
        ts: new Date().toISOString(),
      }

      // sendBeacon survit à la fermeture de l'onglet, contrairement à fetch.
      const body = JSON.stringify(payload)
      if (navigator.sendBeacon) {
        navigator.sendBeacon(url, new Blob([body], { type: 'application/json' }))
        return
      }
      void fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        keepalive: true,
      }).catch(() => {
        /* Silencieux : l'analytics ne doit jamais impacter l'expérience. */
      })
    },
    [enabled, consentKey],
  )

  // Expose un émetteur global pour les clics CTA, sans réécrire chaque handler.
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return
    const w = window as Window & { __iaPremiumTrack?: (event: AnalyticsEvent) => void }
    w.__iaPremiumTrack = send
    return () => {
      delete w.__iaPremiumTrack
    }
  }, [send, enabled])

  // Suivi des navigations (une vue par page, sans identifiant persistant)
  useEffect(() => {
    if (!enabled || !trackPageViews || !pathname) return
    send({ name: 'page_view', category: 'navigation', props: { path: pathname } })
  }, [enabled, trackPageViews, pathname, send])

  return null
}

// ─── Helpers typés pour les appels depuis les composants ─────────────────────

/**
 * Enregistre un clic sur un bouton d'achat.
 * Nom d'événement aligné sur la whitelist de /api/analytics.
 */
export function trackCtaClick(variant: string, value?: number): void {
  if (typeof window === 'undefined') return
  const w = window as Window & { __iaPremiumTrack?: (event: AnalyticsEvent) => void }
  w.__iaPremiumTrack?.({
    name: 'checkout_start',
    category: 'checkout',
    value,
    props: { variant },
  })
}

/**
 * Enregistre une génération de contenu.
 * La route /api/analytics n'accepte que page_view, checkout_start et generate :
 * tout autre nom serait rejeté, on ne l'envoie donc pas.
 */
export function trackGenerate(variant: string): void {
  if (typeof window === 'undefined') return
  const w = window as Window & { __iaPremiumTrack?: (event: AnalyticsEvent) => void }
  w.__iaPremiumTrack?.({ name: 'generate', category: 'engagement', props: { variant } })
}
