// ia-premium — Client de paiement (CLIENT-SAFE)
//
// ⚠️ Ce module n'importe NI `stripe` NI `@/lib/stripe`. Il appelle simplement
// la route API /api/checkout, qui, elle, reste confinée au serveur.
//
// Le résultat est typé en union discriminée : le cas 503 (« Stripe pas encore
// configuré ») est traité comme un état normal et attendu, pas comme une panne,
// afin que l'UI puisse afficher un message clair plutôt qu'une alerte brute.

import { type Variant } from './pricing'

export interface CheckoutStartParams {
  variant: Variant
  /** E-mail du client, facultatif. */
  customerEmail?: string
  /** Libellé produit transmis en métadonnée. */
  productName?: string
  /** Origine du clic, pour l'attribution dans les logs serveur. */
  source?: string
}

export type CheckoutResult =
  /** Session créée : rediriger vers `url`. */
  | { ok: true; url: string; sessionId?: string; amount?: number }
  /** 503 : la clé Stripe n'est pas encore configurée sur l'environnement. */
  | { ok: false; kind: 'unavailable'; message: string }
  /** 4xx : requête invalide (variante inconnue, JSON malformé…). */
  | { ok: false; kind: 'invalid'; message: string }
  /** 5xx inattendu ou erreur réseau. */
  | { ok: false; kind: 'error'; message: string }

/**
 * Message affiché quand le service de paiement n'est pas encore actif.
 * Volontairement rassurant : l'utilisateur a bien voulu payer, l'échec
 * vient de la configuration de la plateforme, pas de son action.
 */
export const CHECKOUT_UNAVAILABLE_MESSAGE =
  'Le paiement par carte arrive très bientôt. Votre accès est prêt : écrivez-nous et nous vous l’activons sous 24 h.'

/** Lance une session Checkout et normalise la réponse en union discriminée. */
export async function startCheckout(
  params: CheckoutStartParams,
  signal?: AbortSignal,
): Promise<CheckoutResult> {
  let response: Response

  try {
    response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        variant: params.variant,
        customerEmail: params.customerEmail,
        metadata: { productName: params.productName, source: params.source ?? 'cta' },
      }),
      signal,
    })
  } catch {
    return {
      ok: false,
      kind: 'error',
      message: 'Connexion impossible. Vérifiez votre réseau et réessayez.',
    }
  }

  // 503 = Stripe non configuré : état attendu, message dédié.
  if (response.status === 503) {
    let message = CHECKOUT_UNAVAILABLE_MESSAGE
    try {
      const data = (await response.json()) as { error?: string }
      if (data?.error && data.error !== 'Service de paiement non configuré. Réessayez plus tard.') {
        message = data.error
      }
    } catch {
      // Corps non JSON : on garde le message par défaut.
    }
    return { ok: false, kind: 'unavailable', message }
  }

  if (!response.ok) {
    let message = 'Impossible de créer la commande. Réessayez dans un instant.'
    try {
      const data = (await response.json()) as { error?: string }
      if (data?.error) message = data.error
    } catch {
      // Corps non JSON : on garde le message par défaut.
    }
    return { ok: false, kind: 'error', message }
  }

  let data: { url?: string; sessionId?: string; amount?: number }
  try {
    data = (await response.json()) as typeof data
  } catch {
    return {
      ok: false,
      kind: 'error',
      message: 'Réponse inattendue du service de paiement. Réessayez.',
    }
  }

  if (!data.url) {
    return {
      ok: false,
      kind: 'error',
      message: 'Aucune URL de paiement reçue. Réessayez dans un instant.',
    }
  }

  return { ok: true, url: data.url, sessionId: data.sessionId, amount: data.amount }
}
