'use client'

// Fil d'Ariane réutilisable — thème sombre premium + données structurées
// schema.org/BreadcrumbList.
//
// Le composant accepte `label` (API principale) comme `name` (alias historique)
// afin de rester compatible avec les appelants existants sans les modifier.
// Marqué 'use client' : aucun état, aucun hook — l'import croisé client/serveur
// reste donc valide partout.

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

import { absoluteUrl } from '@/lib/site'
import { serializeJsonLd } from './JSONLD'

export interface BreadcrumbItem {
  /** Libellé affiché. */
  label?: string
  /** Alias de `label`, accepté pour compatibilité. */
  name?: string
  /** Chemin interne ('/pricing') ou URL absolue. */
  href: string
}

export interface BreadcrumbProps {
  items: readonly BreadcrumbItem[]
  /**
   * Variante visuelle.
   * - `dark`  : sur fond indigo/prémium (défaut,aligné sur le thème du site)
   * - `light` : sur fond clair
   */
  variant?: 'dark' | 'light'
  /** Masque l'injection du JSON-LD (utile si la page l'injecte déjà). */
  withStructuredData?: boolean
  className?: string
}

export default function Breadcrumb({
  items,
  variant = 'dark',
  withStructuredData = true,
  className = '',
}: BreadcrumbProps) {
  const isDark = variant === 'dark'

  // Normalise label/name → un seul champ, et ignore les entrées vides
  const normalized = items
    .map((item) => ({ label: item.label ?? item.name ?? '', href: item.href }))
    .filter((item) => item.label.length > 0)

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: absoluteUrl('/'),
      },
      ...normalized.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.label,
        item: absoluteUrl(item.href),
      })),
    ],
  }

  const baseLink = isDark
    ? 'text-indigo-300/80 transition-colors hover:text-white'
    : 'text-indigo-500 transition-colors hover:text-indigo-700'
  const currentClass = isDark
    ? 'font-semibold text-white'
    : 'font-semibold text-indigo-900'
  const chevronClass = isDark ? 'text-indigo-400/60' : 'text-indigo-300'

  return (
    <nav aria-label="Fil d’Ariane" className={className}>
      {withStructuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
        />
      ) : null}
      <ol className="flex flex-wrap items-center gap-1 text-sm">
        <li>
          <Link href="/" className={`inline-flex items-center gap-1.5 ${baseLink}`}>
            <Home className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Accueil</span>
          </Link>
        </li>
        {normalized.map((item, index) => (
          <li key={item.href} className="flex items-center gap-1">
            <ChevronRight className={`h-3.5 w-3.5 ${chevronClass}`} aria-hidden="true" />
            {index === normalized.length - 1 ? (
              <span className={currentClass} aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className={baseLink}>
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
