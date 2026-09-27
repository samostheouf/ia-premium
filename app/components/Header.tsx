'use client'

// En-tête sticky du site — thème sombre premium indigo/purple.
// ⚠️ Ce composant n'importe NI `stripe` NI `@/lib/stripe` : le SDK Stripe reste
// confiné aux API routes serveur. Les tarifs viennent de `@/lib/pricing`
// (constantes pures, sans dépendance).

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { Menu, Sparkles, X } from 'lucide-react'

import { NAV_LINKS } from '@/lib/site'
import LanguageSwitcher, { type LocaleOption } from './LanguageSwitcher'

export interface HeaderLink {
  label: string
  href: string
}

export interface HeaderProps {
  /**
   * Liens de navigation. Par défaut : Accueil, Tarifs, FAQ, Blog, À propos,
   * Contact (lib/site.ts → NAV_LINKS). Passer `[]` pour ne montrer que le CTA.
   */
  links?: readonly HeaderLink[]
  /** Libellé du bouton principal. */
  ctaLabel?: string
  /** Cible du bouton principal (ancre ou route). */
  ctaHref?: string
  /** Nom affiché à côté du logo. */
  brandName?: string
  /** Lien du logo. */
  brandHref?: string
  /**
   * Locales proposées. Le sélecteur de langue n'est rendu que si au moins
   * deux locales sont fournies (le site est francophone par défaut).
   */
  locales?: readonly LocaleOption[]
  /** Locale active, ex. 'FR'. */
  currentLocale?: string
  /** Callback de changement de locale (géré par la page parente). */
  onLocaleChange?: (code: string) => void
  className?: string
}

export default function Header({
  links = NAV_LINKS,
  ctaLabel = 'Acheter',
  ctaHref = '/#tarifs',
  brandName = 'IA Premium',
  brandHref = '/',
  locales,
  currentLocale = 'FR',
  onLocaleChange,
  className = '',
}: HeaderProps = {}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Fond flouté + ombre au défilement
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Referme le menu mobile à chaque navigation
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Échap ferme le menu + bloque le scroll de l'arrière-plan
  useEffect(() => {
    if (!mobileOpen) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setMobileOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const isActive = useCallback(
    (href: string) => {
      const path = href.split('#')[0]
      if (path === '' || path === '/') return pathname === '/'
      return pathname === path || pathname?.startsWith(`${path}/`)
    },
    [pathname],
  )

  const showLanguage = Boolean(locales && locales.length > 1)

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ease-out ${
        scrolled
          ? 'border-b border-white/10 bg-indigo-950/80 shadow-lg shadow-indigo-500/5 backdrop-blur-xl'
          : 'border-b border-transparent bg-indigo-950/50 backdrop-blur-md'
      } ${className}`}
    >
      <div className="container-premium flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          href={brandHref}
          className="group flex items-center gap-2.5"
          aria-label={`${brandName} — retour à l’accueil`}
        >
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30 transition-transform duration-300 group-hover:scale-110"
            aria-hidden="true"
          >
            <Sparkles className="h-4 w-4 text-white" />
          </span>
          <span className="text-xl font-bold text-white transition-colors duration-200 group-hover:text-indigo-200">
            {brandName}
          </span>
        </Link>

        {/* Navigation desktop */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Navigation principale">
          {links.map((link) => {
            const active = isActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`relative rounded-lg px-3 py-2 text-sm transition-all duration-200 ${
                  active
                    ? 'bg-white/5 text-white'
                    : 'text-indigo-200 hover:bg-white/5 hover:text-white'
                }`}
              >
                {link.label}
                {active && (
                  <span
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                    aria-hidden="true"
                  />
                )}
              </Link>
            )
          })}

          <div className="ml-2 flex items-center gap-3 border-l border-white/10 pl-3">
            <Link
              href={ctaHref}
              className="rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:from-indigo-500 hover:to-purple-500 hover:shadow-xl active:scale-[0.98]"
            >
              {ctaLabel}
            </Link>
            {showLanguage && locales ? (
              <LanguageSwitcher
                locales={locales}
                current={currentLocale}
                onChange={onLocaleChange}
              />
            ) : null}
          </div>
        </nav>

        {/* Bouton menu mobile */}
        <button
          type="button"
          onClick={() => setMobileOpen((value) => !value)}
          aria-expanded={mobileOpen}
          aria-controls="menu-mobile"
          aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          className="rounded-lg p-2.5 text-indigo-200 transition-all duration-200 hover:bg-white/5 hover:text-white active:scale-95 md:hidden"
        >
          {mobileOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Panneau mobile — inline (évite un overlay qui masque le contenu) */}
      <div
        id="menu-mobile"
        className={`overflow-hidden transition-all duration-300 ease-out md:hidden ${
          mobileOpen
            ? 'max-h-[80vh] border-b border-white/10 bg-indigo-950/95 opacity-100 backdrop-blur-xl'
            : 'max-h-0 border-b-0 opacity-0'
        }`}
      >
        <nav className="container-premium space-y-1 py-4" aria-label="Navigation mobile">
          {links.map((link) => {
            const active = isActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                aria-current={active ? 'page' : undefined}
                className={`block rounded-lg px-3 py-3 text-sm transition-colors duration-200 ${
                  active
                    ? 'border border-indigo-500/30 bg-indigo-600/20 text-white'
                    : 'text-indigo-200 hover:bg-white/5 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            )
          })}

          <div className="space-y-3 pt-3">
            <Link
              href={ctaHref}
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 text-center text-sm font-semibold text-white transition-all duration-200 active:scale-[0.98]"
            >
              {ctaLabel}
            </Link>
            {showLanguage && locales ? (
              <div className="flex justify-center pt-1">
                <LanguageSwitcher
                  locales={locales}
                  current={currentLocale}
                  onChange={onLocaleChange}
                />
              </div>
            ) : null}
          </div>
        </nav>
      </div>
    </header>
  )
}
