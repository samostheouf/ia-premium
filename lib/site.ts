// ─── Configuration globale du site ia-premium ────────────────────────────────
// Fichier volontairement SANS import de Stripe : il est importé par des pages
// serveur ET par des composants client.

export const SITE = {
  name: 'ia-premium',
  tagline: 'Contenu Premium par Intelligence Artificielle',
  url: 'https://ia-premium-chi.vercel.app',
  locale: 'fr_FR',
  lang: 'fr',
  /** Date de dernière révision des documents juridiques (format lisible FR). */
  legalUpdated: '12 janvier 2026',
} as const

/**
 * Coordonnées de l'éditeur.
 *
 * ⚠️  Ces champs sont des PLACEHOLDERS VOLONTAIRES. Ils doivent être complétés
 * avec les informations réelles de la société (SIREN, SIRET, RCS, TVA, adresse
 * du siège, email de contact) AVANT toute mise en production / mise en ligne
 * commerciale. Aucune donnée d'une société réelle n'est inventée ici.
 */
export const COMPANY = {
  raisonSociale: '[À COMPLÉTER] — raison sociale',
  formeJuridique: '[À COMPLÉTER] — forme juridique (SASU, SARL, EI…)',
  capitalSocial: '[À COMPLÉTER] — capital social',
  siren: '[À COMPLÉTER] — numéro SIREN',
  siret: '[À COMPLÉTER] — numéro SIRET (siège)',
  rcs: '[À COMPLÉTER] — RCS et ville d\u2019immatriculation',
  tva: '[À COMPLÉTER] — numéro de TVA intracommunautaire',
  naf: '[À COMPLÉTER] — code NAF/APE',
  adresseSiege: '[À COMPLÉTER] — adresse complète du siège social',
  codePostalSiege: '[À COMPLÉTER] — code postal',
  villeSiege: '[À COMPLÉTER] — ville',
  paysSiege: 'France',
  telephone: '[À COMPLÉTER] — numéro de téléphone',
  email: '[À COMPLÉTER] — adresse e-mail de contact',
  emailLabel: 'adresse e-mail de contact',
  directeurPublication: '[À COMPLÉTER] — nom du directeur de la publication',
  assureur: '[À COMPLÉTER] — assurance responsabilité civile professionnelle',
  numeroPolice: '[À COMPLÉTER] — numéro de police',
  hebergeur: {
    nom: 'Vercel Inc.',
    adresse: '340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis',
    site: 'https://vercel.com',
  },
  prestatairePaiement: 'Stripe Inc.',
} as const

/** true si les informations légales sont encore des placeholders. */
export const LEGAL_PLACEHOLDERS_REMAINING = true

export const NAV_LINKS = [
  { href: '/', label: 'Accueil' },
  { href: '/pricing', label: 'Tarifs' },
  { href: '/faq', label: 'FAQ' },
  { href: '/blog', label: 'Blog' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/contact', label: 'Contact' },
] as const

export const LEGAL_LINKS = [
  { href: '/cgv', label: 'Conditions générales de vente' },
  { href: '/mentions-legales', label: 'Mentions légales' },
  { href: '/politique-confidentialite', label: 'Politique de confidentialité' },
  { href: '/politique-cookies', label: 'Politique cookies' },
  { href: '/conditions-remboursement', label: 'Conditions de remboursement' },
] as const

export function absoluteUrl(path: string): string {
  return `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`
}
