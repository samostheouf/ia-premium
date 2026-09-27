'use client'

// Pied de page global — thème sombre premium indigo/purple.
// Client-safe (le formulaire d'inscription garde son état localement) afin
// d'être importable aussi bien depuis une page serveur que depuis un Client
// Component.

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Check, Lock, Mail, ShieldCheck, Sparkles, TriangleAlert } from 'lucide-react'

import { COMPANY, LEGAL_LINKS, NAV_LINKS, SITE } from '@/lib/site'
import { PRICES, VARIANTS, formatPrice } from '@/lib/pricing'

export interface FooterLink {
  label: string
  href: string
}

export interface FooterProps {
  /** Liens produits. Par défaut : les trois formules depuis lib/pricing. */
  productLinks?: readonly FooterLink[]
  /** Liens de navigation. Par défaut : NAV_LINKS. */
  navLinks?: readonly FooterLink[]
  /** Liens légaux. Par défaut : LEGAL_LINKS (CGV, mentions, confidentialité…). */
  legalLinks?: readonly FooterLink[]
  /** Adresse de contact affichée. */
  contactEmail?: string
  /** Masque le formulaire d'inscription à la newsletter. */
  showNewsletter?: boolean
  className?: string
}

export default function Footer({
  productLinks,
  navLinks = NAV_LINKS,
  legalLinks = LEGAL_LINKS,
  contactEmail = COMPANY.email,
  showNewsletter = true,
  className = '',
}: FooterProps = {}) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  // Le tableau produit est dérivé des tarifs : une seule source de vérité.
  const defaultProductLinks: readonly FooterLink[] = VARIANTS.map((variant) => ({
    label: `${PRICES[variant].shortLabel} — ${formatPrice(PRICES[variant].amount)}`,
    href: '/#tarifs',
  }))
  const products = productLinks ?? defaultProductLinks

  function handleNewsletter(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
    setEmail('')
  }

  const isPlaceholderEmail = contactEmail.startsWith('[À COMPLÉTER]')

  return (
    <footer className={`relative border-t border-white/5 bg-indigo-950 ${className}`}>
      <div className="premium-hairline absolute inset-x-0 top-0 h-px" aria-hidden="true" />

      <div className="container-premium">
        <div className="grid grid-cols-2 gap-8 py-14 md:grid-cols-4 lg:grid-cols-5">
          {/* Marque + newsletter */}
          <div className="col-span-2">
            <Link href="/" className="mb-4 flex items-center gap-2.5">
              <span
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600"
                aria-hidden="true"
              >
                <Sparkles className="h-3.5 w-3.5 text-white" />
              </span>
              <span className="text-lg font-bold text-white">IA Premium</span>
            </Link>

            <p className="max-w-xs text-sm leading-relaxed text-indigo-300/80">
              Moteur de génération de contenu premium : copywriting, réseaux sociaux, emails,
              landing pages et storytelling. Paiement unique, sans abonnement.
            </p>

            {showNewsletter ? (
              <form onSubmit={handleNewsletter} className="mt-6 max-w-sm">
                <label htmlFor="footer-newsletter" className="mb-2 block text-sm font-medium text-white">
                  Recevoir les conseils rédaction
                </label>
                {submitted ? (
                  <p
                    className="flex items-center gap-2 rounded-lg border border-emerald-500/25 bg-emerald-500/10 px-3 py-2.5 text-sm text-emerald-300"
                    role="status"
                  >
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    Merci, votre inscription est enregistrée.
                  </p>
                ) : (
                  <div className="flex gap-2">
                    <input
                      id="footer-newsletter"
                      type="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="votre@email.com"
                      aria-label="Votre adresse e-mail"
                      className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-indigo-400/50 transition-colors focus:border-indigo-500/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                    />
                    <button
                      type="submit"
                      aria-label="S’inscrire à la newsletter"
                      className="rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-3 py-2.5 text-white shadow-lg shadow-indigo-500/20 transition-all duration-200 hover:from-indigo-500 hover:to-purple-500 active:scale-[0.98]"
                    >
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                )}
              </form>
            ) : null}
          </div>

          {/* Produits */}
          <div>
            <h2 className="mb-4 text-sm font-semibold text-white">Nos offres</h2>
            <ul className="space-y-2.5">
              {products.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="link-underline inline-block text-sm text-indigo-300/70 transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h2 className="mb-4 text-sm font-semibold text-white">Navigation</h2>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-underline inline-block text-sm text-indigo-300/70 transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Légal + contact */}
          <div>
            <h2 className="mb-4 text-sm font-semibold text-white">Informations légales</h2>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-underline inline-block text-sm text-indigo-300/70 transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact */}
        <div className="border-t border-white/5 py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-sm text-indigo-300/80">
              <Mail className="h-4 w-4 text-indigo-400" aria-hidden="true" />
              {isPlaceholderEmail ? (
                <span className="inline-flex items-center gap-1.5 text-amber-300/90">
                  <TriangleAlert className="h-3.5 w-3.5" aria-hidden="true" />
                  Adresse de contact à compléter
                </span>
              ) : (
                <a
                  href={`mailto:${contactEmail}`}
                  className="link-underline transition-colors hover:text-white"
                >
                  {contactEmail}
                </a>
              )}
            </div>

            <p className="flex items-center gap-2 text-xs text-indigo-400/80">
              <Lock className="h-3.5 w-3.5 text-emerald-400/80" aria-hidden="true" />
              Paiement sécurisé par Stripe — aucune donnée bancaire stockée
            </p>
          </div>
        </div>

        {/* Réassurance + copyright */}
        <div className="flex flex-col items-center gap-4 border-t border-white/5 py-6 sm:flex-row sm:justify-between">
          <p className="text-xs text-indigo-400/75">
            © {new Date().getFullYear()} {SITE.name}. Tous droits réservés.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-indigo-400/75">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400/80" aria-hidden="true" />
              Conforme RGPD
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-indigo-500/40 sm:block" aria-hidden="true" />
            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-emerald-400/80" aria-hidden="true" />
              Paiement unique, sans abonnement
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
