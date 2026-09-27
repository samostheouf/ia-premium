import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock, CalendarDays, User, PenLine } from 'lucide-react'
import PageShell, { ArticleSection, CtaBand } from '@/app/components/PageShell'
import { ARTICLES } from '@/lib/blog'
import { absoluteUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Blog — Guides pratiques sur le contenu IA premium | ia-premium',
  description:
    'Guides, méthodes et retours d’expérience sur la génération de contenu IA premium : copywriting, choix du ton, formats de sortie et intégration dans votre chaîne de production.',
  alternates: { canonical: absoluteUrl('/blog') },
  openGraph: {
    title: 'Blog ia-premium — le contenu IA en pratique',
    description: 'Méthodes et guides pour produire du contenu IA réellement exploitable.',
    url: absoluteUrl('/blog'),
    type: 'website',
    locale: 'fr_FR',
  },
}

export default function BlogIndexPage() {
  const [principal, ...autres] = ARTICLES

  return (
    <PageShell
      title="Le blog"
      description="Des guides concrets sur la production de contenu IA : ce qui marche, ce qui ne marche pas, et pourquoi. Sans jargon, sans promesse creuse."
      breadcrumb={[{ name: 'Blog', href: '/blog' }]}
      eyebrow="Blog"
    >
      {/* ── ARTICLE PRINCIPAL ──────────────────────────────────────────── */}
      <article className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-indigo-300 hover:shadow-xl">
        <div
          className="h-1.5 w-full"
          style={{ background: 'linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%)' }}
          aria-hidden="true"
        />
        <div className="p-7 sm:p-9">
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
            <span className="rounded-full bg-indigo-50 px-3 py-1 font-bold text-indigo-700">
              À la une
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
              <time dateTime={principal.dateIso}>{principal.datePublication}</time>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {principal.tempsLecture}
            </span>
          </div>

          <h2 className="mt-4 text-2xl font-black leading-tight sm:text-3xl" style={{ color: '#1e1b4b' }}>
            <Link href={`/blog/${principal.slug}`} className="transition-colors hover:text-indigo-700">
              {principal.titre}
            </Link>
          </h2>
          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-gray-600">
            {principal.description}
          </p>

          <Link
            href={`/blog/${principal.slug}`}
            className="mt-6 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
            style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)' }}
          >
            Lire l’article
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </article>

      {/* ── AUTRES ARTICLES ────────────────────────────────────────────── */}
      {autres.length > 0 ? (
        <div className="mt-10">
          <h2 className="text-xl font-bold" style={{ color: '#1e1b4b' }}>
            Derniers articles
          </h2>
          <div className="mt-5 grid gap-6 md:grid-cols-2">
            {autres.map((article) => (
              <article
                key={article.slug}
                className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-indigo-300 hover:shadow-lg"
              >
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
                  <span className="rounded-full bg-purple-50 px-3 py-1 font-bold text-purple-700">
                    {article.categorie}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                    <time dateTime={article.dateIso}>{article.datePublication}</time>
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-bold leading-snug" style={{ color: '#1e1b4b' }}>
                  <Link
                    href={`/blog/${article.slug}`}
                    className="transition-colors hover:text-indigo-700"
                  >
                    {article.titre}
                  </Link>
                </h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-gray-600">
                  {article.description}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="inline-flex items-center gap-1.5 text-xs text-gray-400">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    {article.tempsLecture}
                  </span>
                  <Link
                    href={`/blog/${article.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-700 transition-colors hover:text-indigo-900"
                  >
                    Lire
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : null}

      <ArticleSection
        title="Comment sont écrits ces articles"
        icon={<PenLine className="h-5 w-5" aria-hidden="true" />}
      >
        <p>
          Nous publions ce que nous observons dans l’usage réel du moteur, pas ce qui ferait vendre
          l’outil. Concrètement, chaque article part d’un problème que nos utilisateurs ont rencontré
          — un brief qui ne donne rien, un ton incohérent, une intégration qui casse — et de la
          correction qui a fonctionné.
        </p>
        <p>
          Nous ne publions pas de contenu promotionnel déguisé en conseil. Si un article ne peut pas
          être résumé en une phrase qui sert réellement le lecteur, il n’est pas publié.
        </p>
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50/60 p-4">
          <User className="h-5 w-5 shrink-0 text-indigo-600" aria-hidden="true" />
          <p className="text-sm text-gray-600">
            Une question qui mériterait un article ? Envoyez-la via la{' '}
            <Link href="/contact" className="font-semibold text-indigo-700 underline">
              page contact
            </Link>{' '}
            : si elle revient souvent, elle devient le prochain guide.
          </p>
        </div>
      </ArticleSection>

      <CtaBand
        title="Préférez produire plutôt que lire ?"
        description="Le blog explique la méthode ; le moteur l’applique. Testez sur un brief réel et comparez avec ce que vous commanderiez aujourd’hui à un freelance."
        primaryLabel="Voir les offres"
        secondaryLabel="Découvrir la méthode"
        secondaryHref="/a-propos"
      />
    </PageShell>
  )
}
