import type { Metadata } from 'next'

/**
 * ia-premium — Couche SEO
 * ─────────────────────────────────────────────────────────────────────────────
 * Source de vérité unique pour :
 *   - l'URL de base du site (jamais codée en dur ailleurs)
 *   - les mots-clés cibles FR
 *   - la construction des métadonnées Next.js (title template, OpenGraph, Twitter)
 *   - les données structurées JSON-LD (schema.org)
 *
 * ⚠️ Ce module est 100 % isomorphic : il ne dépend d'aucune API serveur
 * (ni Stripe, ni fs). Il peut donc être importé depuis un composant client.
 */

// ─── Constantes du site ───────────────────────────────────────────────────────

/** URL de base du site, sans slash final. */
export const BASE_URL: string = (
  process.env.NEXT_PUBLIC_APP_URL || 'https://ia-premium-chi.vercel.app'
).replace(/\/+$/, '')

export const SITE_NAME = 'IA Premium'
/** Langue du document (html lang). */
export const SITE_LANG = 'fr'
/** Locale OpenGraph — format schema.org avec UNDERSCORE ('fr_FR', pas 'fr-FR'). */
export const SITE_OG_LOCALE = 'fr_FR'
/** Locale hreflang/HTML — format avec tiret. */
export const SITE_LOCALE_CODE = 'fr-FR'

export const SITE_TAGLINE = 'Contenu Premium par Intelligence Artificielle'

export const SITE_DESCRIPTION =
  "Générateur de contenu premium par IA : copywriting, emails marketing, landing pages, réseaux sociaux et storytelling. Textes IA de qualité professionnelle, prêts à publier. Paiement unique, sans abonnement."

/** Image de partage par défaut (1200x630). */
export const OG_IMAGE = `${BASE_URL}/og.png`
export const OG_IMAGE_ALT =
  'IA Premium — Générateur de contenu premium par intelligence artificielle'
export const OG_IMAGE_WIDTH = 1200
export const OG_IMAGE_HEIGHT = 630

// ─── Mots-clés cibles ─────────────────────────────────────────────────────────

/**
 * Mots-clés de ciblage FR. Injectés automatiquement dans <meta keywords>
 * sur chaque page via buildMetadata() (sauf override explicite).
 */
export const TARGET_KEYWORDS: string[] = [
  'génération contenu IA',
  'copywriting IA',
  'IA premium France',
  'rédaction IA',
  'contenu marketing IA',
  'IA générative',
  'textes IA',
  'landing page IA',
  'Next.js',
  'Stripe',
]

// ─── Utilitaires de chemin ────────────────────────────────────────────────────

/** Normalise un chemin : garantit un unique slash initial, jamais de double slash. */
export function normalizePath(p: string): string {
  if (!p) return '/'
  const withLeading = p.startsWith('/') ? p : `/${p}`
  return withLeading.replace(/\/{2,}/g, '/')
}

/** Construit une URL absolue à partir d'un chemin interne. */
export function absoluteUrl(path = '/'): string {
  return `${BASE_URL}${normalizePath(path)}`
}

// ─── Construction des métadonnées ─────────────────────────────────────────────

export interface BuildMetadataInput {
  /**
   * Titre de page (sans suffixe : le template '%s | IA Premium' du layout est
   * appliqué). Passer `{ absolute: '...' }` pour neutraliser le template —
   * obligatoire sur la page d'accueil, sinon le suffixe est dupliqué.
   */
  title: string | { absolute: string; template?: string | null }
  /** Méta-description, 120–160 caractères recommandés. */
  description: string
  /** Chemin interne, ex. '/pricing' ou '/' pour la home. */
  path?: string
  /** Locale OpenGraph — par défaut 'fr_FR'. */
  locale?: string
  /** URL absolue de l'image de partage. */
  image?: string
  /** Type OpenGraph. */
  type?: 'website' | 'article' | 'profile'
  /** Override des mots-clés (sinon TARGET_KEYWORDS). */
  keywords?: string[]
  /** Désactive l'indexation (pages de confirmation, etc.). */
  noIndex?: boolean
  publishedTime?: string
  modifiedTime?: string
}

/**
 * Construit un objet Metadata Next.js complet et cohérent.
 * Toute page du site doit utiliser cette fonction plutôt qu'un littéral,
 * afin de garantir un title template, une canonical et une image OG uniques.
 */
export function buildMetadata({
  title,
  description,
  path = '/',
  locale = SITE_OG_LOCALE,
  image = OG_IMAGE,
  type = 'website',
  keywords = TARGET_KEYWORDS,
  noIndex = false,
  publishedTime,
  modifiedTime,
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path)

  return {
    title,
    description,
    keywords,
    authors: [{ name: SITE_NAME, url: BASE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale,
      type,
      images: [
        {
          url: image,
          width: OG_IMAGE_WIDTH,
          height: OG_IMAGE_HEIGHT,
          alt: OG_IMAGE_ALT,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}

// ─── Données structurées JSON-LD ─────────────────────────────────────────────

/**
 * Sérialise un objet JSON-LD pour injection dans un <script type="application/ld+json">.
 * Neutralise les séquences '</script>' afin d'éviter toute injection HTML.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
}

export interface ProductJsonLdInput {
  name: string
  description: string
  /** Prix en euros (nombre décimal, pas centimes). */
  price: number
  image?: string
  url?: string
  currency?: string
  category?: string
  /**
   * Note moyenne sur 5. Ne fournit cette valeur que si elle est réelle et vérifiable
   * — Google sanctionne les avis auto-déclarés ou inexistants.
   */
  rating?: number
  reviewCount?: number
}

/** JSON-LD schema.org/Product pour les offres ia-premium. */
export function buildProductJsonLd({
  name,
  description,
  price,
  image = OG_IMAGE,
  url = BASE_URL,
  currency = 'EUR',
  category = 'Logiciel de rédaction par IA',
  rating,
  reviewCount,
}: ProductJsonLdInput) {
  // aggregateRating uniquement si des données réelles existent (0 fabrication).
  const hasRealRating =
    typeof rating === 'number' && typeof reviewCount === 'number' && reviewCount > 0

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image,
    url,
    brand: { '@type': 'Brand', name: SITE_NAME },
    category,
    offers: {
      '@type': 'Offer',
      price: price.toFixed(2),
      priceCurrency: currency,
      availability: 'https://schema.org/InStock',
      url,
      seller: { '@type': 'Organization', name: SITE_NAME },
    },
    ...(hasRealRating
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: rating,
            reviewCount,
          },
        }
      : {}),
  }
}

/** JSON-LD schema.org/Organization — identité de l'éditeur. */
export function buildOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: SITE_NAME,
    legalName: SITE_NAME,
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/og.png`,
      width: OG_IMAGE_WIDTH,
      height: OG_IMAGE_HEIGHT,
    },
    image: OG_IMAGE,
    description: SITE_DESCRIPTION,
    slogan: SITE_TAGLINE,
    knowsLanguage: ['fr-FR'],
    areaServed: { '@type': 'Country', name: 'France' },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'contact@ia-premium.fr',
      availableLanguage: ['French'],
      url: `${BASE_URL}/contact`,
    },
  }
}

export interface FaqItem {
  question: string
  answer: string
}

/** JSON-LD schema.org/FAQPage —balises riches Google (résultats étendus). */
export function buildFaqPageJsonLd(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/** JSON-LD schema.org/WebSite — diversify le lien interne du site. */
export function buildWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: BASE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    inLanguage: SITE_LOCALE_CODE,
    publisher: { '@id': `${BASE_URL}/#organization` },
  }
}

export interface BreadcrumbItem {
  name: string
  /** Chemin interne ('/pricing') ou URL absolue. */
  url: string
}

/** JSON-LD schema.org/BreadcrumbList —fil d'Ariane structuré. */
export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: BASE_URL,
      },
      ...items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.name,
        item: item.url.startsWith('http') ? item.url : absoluteUrl(item.url),
      })),
    ],
  }
}

// ─── FAQ de la page d'accueil ─────────────────────────────────────────────────

/**
 * Questions réelles, alignées sur le produit et les CGV ia-premium.
 * Utilisées à la fois pour l'affichage et pour le JSON-LD FAQPage :
 * une seule source de vérité garantit la cohérence des données structurées.
 */
export const HOME_FAQS: FaqItem[] = [
  {
    question: "Qu'est-ce qu'IA Premium exactement ?",
    answer:
      "IA Premium est un moteur de génération de contenu professionnel propulsé par intelligence artificielle. Il produit des textes prêts à publier : textes de vente, pages de destination, emails marketing, posts pour les réseaux sociaux et récits de marque. Le résultat est rédigé dans un ton professionnel et directement exploitable, sans relecture fastidieuse.",
  },
  {
    question: 'Quels types de contenu puis-je générer ?',
    answer:
      "Six catégories sont couvertes : copywriting (textes de vente et argumentaires), email marketing, landing pages, réseaux sociaux, storytelling et idéoque. Chaque contenu est exportable en texte brut, en Markdown ou en JSON structuré, ce qui permet de l'intégrer directement à votre site, à votre CRM ou à votre outil d'emailing.",
  },
  {
    question: 'Combien coûte le service ? Existe-t-il un abonnement ?',
    answer:
      "Il n'y a aucun abonnement. Le paiement est unique et sans engagement récurrent. Trois formules sont proposées : l'accès unitaire à 49,90 €, le Pack 5 générations premium à 199,90 € et le Coffret Illimité à 499,90 €, qui donne un accès complet et illimité à vie, mises à jour futures comprises.",
  },
  {
    question: 'Puis-je choisir le ton et le public cible ?',
    answer:
      "Oui. Le générateur accepte plusieurs registres : créatif, direct, luxueux, analytique ou persuasif. Vous précisez également votre public cible, l'intention du texte (information, persuasion, conversion) et la longueur approximative souhaitée en mots. Le contenu s'adapte ainsi à votre charte éditoriale.",
  },
  {
    question: 'Comment se passe le paiement et quand ai-je accès ?',
    answer:
      "Le paiement s'effectue via Stripe, prestataire certifié PCI DSS niveau 1, qui héberge le traitement de la carte sans qu'aucune donnée bancaire ne transite par nos serveurs. L'accès est ouvert immédiatement après la confirmation du paiement : aucune validation manuelle, aucun délai.",
  },
  {
    question: 'Mes données et mes contenus sont-ils confidentiels ?',
    answer:
      "Vos saisies ne sont ni revendues ni partagées à des tiers à des fins publicitaires. Elles sont traitées uniquement pour produire le contenu que vous demandez. Conformément au RGPD, vous pouvez demander l'accès, la rectification ou l'effacement de vos données à tout moment depuis la page Contact, et découvrir le détail de notre traitement dans la Politique de confidentialité.",
  },
]
