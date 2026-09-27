import Link from 'next/link'
import { CalendarDays, Clock, User, ArrowLeft, ArrowRight } from 'lucide-react'
import Header from './Header'
import Footer from './Footer'
import Breadcrumb from './Breadcrumb'
import { ARTICLES, type ArticleMeta } from '@/lib/blog'

// ─── Layout d'article de blog ────────────────────────────────────────────────
// Composant serveur. Chaque article (app/blog/<slug>/page.tsx) passe son
// contenu via `children` et ses métadonnées via `article`.

export default function BlogArticleLayout({
  article,
  children,
}: {
  article: ArticleMeta
  children: React.ReactNode
}) {
  const currentIndex = ARTICLES.findIndex((item) => item.slug === article.slug)
  const previous = currentIndex > 0 ? ARTICLES[currentIndex - 1] : undefined
  const next =
    currentIndex >= 0 && currentIndex < ARTICLES.length - 1 ? ARTICLES[currentIndex + 1] : undefined

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* EN-TÊTE */}
        <header className="bg-premium-gradient relative overflow-hidden px-4 pb-14 pt-28 sm:px-6 lg:px-8">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.35)_0%,transparent_55%)]"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-3xl text-center">
            <Breadcrumb
              items={[
                { name: 'Blog', href: '/blog' },
                { name: article.categorie, href: '/blog' },
              ]}
              variant="dark"
              className="mb-8 flex justify-center"
            />
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-indigo-200 backdrop-blur">
              {article.categorie}
            </span>
            <h1 className="mt-5 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl">
              {article.titre}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-indigo-200/90">
              {article.description}
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-indigo-300/80">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                <time dateTime={article.dateIso}>{article.datePublication}</time>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {article.tempsLecture}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" aria-hidden="true" />
                {article.auteur}
              </span>
            </div>
          </div>
        </header>

        {/* CORPS */}
        <article className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="space-y-6 text-[17px] leading-[1.8] text-gray-700">{children}</div>

            {/* Sommaire des autres articles */}
            <nav
              aria-label="Navigation entre les articles"
              className="mt-16 grid gap-4 border-t border-gray-200 pt-10 sm:grid-cols-2"
            >
              {previous ? (
                <Link
                  href={`/blog/${previous.slug}`}
                  className="group rounded-2xl border border-gray-200 bg-white p-5 transition-colors hover:border-indigo-300"
                >
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400">
                    <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                    Article précédent
                  </span>
                  <span
                    className="mt-2 block text-sm font-bold leading-snug transition-colors group-hover:text-indigo-700"
                    style={{ color: '#1e1b4b' }}
                  >
                    {previous.titre}
                  </span>
                </Link>
              ) : (
                <span aria-hidden="true" />
              )}
              {next ? (
                <Link
                  href={`/blog/${next.slug}`}
                  className="group rounded-2xl border border-gray-200 bg-white p-5 text-right transition-colors hover:border-indigo-300 sm:col-start-2"
                >
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400">
                    Article suivant
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <span
                    className="mt-2 block text-sm font-bold leading-snug transition-colors group-hover:text-indigo-700"
                    style={{ color: '#1e1b4b' }}
                  >
                    {next.titre}
                  </span>
                </Link>
              ) : null}
            </nav>

            {/* CTA */}
            <div
              className="relative mt-12 overflow-hidden rounded-3xl px-6 py-12 text-center shadow-xl sm:px-10"
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
                <h2 className="text-2xl font-black text-white">
                  Appliquez la méthode sur votre prochain brief
                </h2>
                <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-indigo-200">
                  Le moteur met en pratique exactement ce que cet article décrit : cadrage,
                  architecture persuasive, contrôle du ton, passe de relecture.
                </p>
                <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link
                    href="/pricing"
                    className="w-full rounded-xl px-7 py-3.5 text-sm font-bold text-indigo-900 shadow-lg transition-transform duration-200 hover:scale-[1.02] sm:w-auto"
                    style={{ background: 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%)' }}
                  >
                    Voir les offres
                  </Link>
                  <Link
                    href="/blog"
                    className="w-full rounded-xl border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-white/20 sm:w-auto"
                  >
                    Retour au blog
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
