import Link from 'next/link'
import Header from './Header'
import Footer from './Footer'
import Breadcrumb, { type BreadcrumbItem } from './Breadcrumb'

// ─── Shell de page partagée ──────────────────────────────────────────────────
// Composant serveur (aucun état, aucun hook). Le Header et le Footer qu'il
// monte sont eux-mêmes marqués 'use client' : l'import croisé client/serveur
// reste donc valide depuis n'importe quelle page.

interface PageShellProps {
  title: string
  description: string
  breadcrumb: BreadcrumbItem[]
  eyebrow?: string
  children: React.ReactNode
  /** Largeur du conteneur de contenu : 'prose' pour les pages légales, 'wide' par défaut. */
  width?: 'prose' | 'wide'
  /** Affiche la date de dernière mise à jour sous le titre. */
  updatedAt?: string
}

export default function PageShell({
  title,
  description,
  breadcrumb,
  eyebrow,
  children,
  width = 'wide',
  updatedAt,
}: PageShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* HERO */}
        <section className="bg-premium-gradient relative overflow-hidden px-4 pb-16 pt-28 sm:px-6 lg:px-8">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.35)_0%,transparent_55%)]"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-4xl text-center">
            <Breadcrumb items={breadcrumb} variant="dark" className="mb-8 flex justify-center" />
            {eyebrow ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-indigo-200 backdrop-blur">
                {eyebrow}
              </span>
            ) : null}
            <h1 className="mt-5 text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">
              {title}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-indigo-200/90 sm:text-lg">
              {description}
            </p>
            {updatedAt ? (
              <p className="mt-4 text-xs text-indigo-300/70">Dernière mise à jour : {updatedAt}</p>
            ) : null}
          </div>
        </section>

        {/* CONTENU */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className={width === 'prose' ? 'mx-auto max-w-3xl' : 'mx-auto max-w-5xl'}>
            {children}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

// ─── Blocs réutilisables pour le corps des pages ─────────────────────────────

export function ArticleSection({
  title,
  icon,
  children,
  id,
}: {
  title: string
  icon?: React.ReactNode
  children: React.ReactNode
  id?: string
}) {
  return (
    <section
      id={id}
      className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <h2 className="flex items-start gap-3 text-xl font-bold sm:text-2xl" style={{ color: '#1e1b4b' }}>
        {icon ? <span className="mt-0.5 shrink-0 text-indigo-600">{icon}</span> : null}
        <span>{title}</span>
      </h2>
      <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-gray-600">{children}</div>
    </section>
  )
}

export function SubHeading({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h3 id={id} className="pt-2 text-base font-bold sm:text-lg" style={{ color: '#1e1b4b' }}>
      {children}
    </h3>
  )
}

export function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="ml-1 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function NumberedList({ items }: { items: readonly string[] }) {
  return (
    <ol className="ml-1 list-decimal space-y-2 pl-5 marker:font-bold marker:text-indigo-600">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ol>
  )
}

export function Callout({
  tone = 'info',
  title,
  children,
}: {
  tone?: 'info' | 'warning' | 'success'
  title: string
  children: React.ReactNode
}) {
  const tones = {
    info: 'border-indigo-200 bg-indigo-50/70',
    warning: 'border-amber-200 bg-amber-50/70',
    success: 'border-emerald-200 bg-emerald-50/70',
  } as const

  return (
    <div className={`rounded-xl border p-5 ${tones[tone]}`}>
      <p className="text-sm font-bold" style={{ color: '#1e1b4b' }}>
        {title}
      </p>
      <div className="mt-2 text-sm leading-relaxed text-gray-700">{children}</div>
    </div>
  )
}

export function LegalField({ label, value }: { label: string; value: string }) {
  const isPlaceholder = value.startsWith('[À COMPLÉTER]')
  return (
    <p className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
      <span className="font-semibold" style={{ color: '#1e1b4b' }}>
        {label} :
      </span>
      <span
        className={
          isPlaceholder
            ? 'font-mono text-[13px] text-amber-700 underline decoration-amber-400 underline-offset-2'
            : 'text-gray-600'
        }
      >
        {value}
      </span>
    </p>
  )
}

export function CtaBand({
  title,
  description,
  primaryLabel = 'Découvrir les offres',
  primaryHref = '/pricing',
  secondaryLabel,
  secondaryHref,
}: {
  title: string
  description: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
}) {
  return (
    <div
      className="relative mt-16 overflow-hidden rounded-3xl px-6 py-14 text-center shadow-xl sm:px-12"
      style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)' }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(circle at 20% 20%, rgba(129,140,248,0.5) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(192,132,252,0.4) 0%, transparent 50%)',
        }}
        aria-hidden="true"
      />
      <div className="relative">
        <h2 className="text-2xl font-black text-white sm:text-3xl">{title}</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-indigo-200 sm:text-base">
          {description}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href={primaryHref}
            className="w-full rounded-xl px-8 py-3.5 text-sm font-bold text-indigo-900 shadow-lg transition-transform duration-200 hover:scale-[1.02] sm:w-auto"
            style={{ background: 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%)' }}
          >
            {primaryLabel}
          </Link>
          {secondaryLabel && secondaryHref ? (
            <Link
              href={secondaryHref}
              className="w-full rounded-xl border border-white/25 bg-white/10 px-8 py-3.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-white/20 sm:w-auto"
            >
              {secondaryLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  )
}
