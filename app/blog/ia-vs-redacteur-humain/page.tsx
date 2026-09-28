import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleLayout from '@/app/components/BlogArticleLayout'
import { type ArticleMeta } from '@/lib/blog'
import { absoluteUrl } from '@/lib/site'

// ─── Article : IA vs rédacteur humain ────────────────────────────────────────

const ARTICLE: ArticleMeta = {
  slug: 'ia-vs-redacteur-humain',
  titre: 'IA ou rédacteur humain : le comparatif honnête',
  description:
    "IA ou rédacteur humain : coût, délai, qualité, cohérence. Le comparatif honnête pour choisir la bonne approche selon votre contexte, sans discours marketing.",
  categorie: 'Stratégie',
  datePublication: '18 janvier 2026',
  dateIso: '2026-01-18',
  auteur: 'L’équipe éditoriale ia-premium',
  tempsLecture: '6 min de lecture',
  motCle: 'IA ou rédacteur humain',
}

const CRITERES = [
  {
    critere: 'Coût par contenu',
    ia: 'Faible, à volume illimité',
    humain: 'Élevé, dépend de la seniority',
    verdict: 'Gagnant : IA sur le volume, humain sur la qualité rare',
  },
  {
    critere: 'Délai de première production',
    ia: 'Immédiat',
    humain: 'Plusieurs jours à plusieurs semaines',
    verdict: 'Gagnant : IA, sans discussion',
  },
  {
    critere: 'Qualité du premier jet',
    ia: 'Correcte, générique sans cadrage',
    humain: 'Brut, parfois moyen',
    verdict: 'Égalité : la qualité vient du brief, pas de l’outil',
  },
  {
    critere: 'Originalité et angle propre',
    ia: 'Limitée sans contexte',
    humain: 'Native',
    verdict: 'Gagnant : humain',
  },
  {
    critere: 'Cohérence sur 50 contenus',
    ia: 'Risque de dérive si le ton n’est pas fixé',
    humain: 'Variable selon la charge',
    verdict: 'Gagnant : IA, si la voix est paramétrée',
  },
  {
    critere: 'Subjectivité et angle éditorial',
    ia: 'Difficile à obtenir',
    humain: 'Naturel',
    verdict: 'Gagnant : humain',
  },
  {
    critere: 'Fiabilité factuelle',
    ia: 'Invente si on ne la cadre pas',
    humain: 'Vérifie par formation',
    verdict: 'Gagnant : humain sur le fond, IA encadrée possible',
  },
  {
    critere: 'Passage à l’échelle',
    ia: 'Immédiat',
    humain: 'Impossible sans recruter',
    verdict: 'Gagnant : IA',
  },
]

export function generateMetadata(): Metadata {
  return {
    title: `${ARTICLE.titre} | ia-premium`,
    description: ARTICLE.description,
    keywords: [ARTICLE.motCle, 'comparatif IA humain', 'coût rédaction IA'],
    alternates: { canonical: absoluteUrl(`/blog/${ARTICLE.slug}`) },
    openGraph: {
      title: ARTICLE.titre,
      description: ARTICLE.description,
      url: absoluteUrl(`/blog/${ARTICLE.slug}`),
      type: 'article',
      publishedTime: ARTICLE.dateIso,
      authors: [ARTICLE.auteur],
      locale: 'fr_FR',
    },
  }
}

export const dynamic = 'force-static'

export default function ArticleIaVsRedacteurHumain() {
  return (
    <BlogArticleLayout article={ARTICLE}>
      <p className="text-lg leading-relaxed text-gray-600">
        La question n’a pas de réponse universelle, et c’est précisément le problème des réponses
        universelles. Certains sites comparent un humain senior payé 4 000 € la journée à une
        génération automatique gratuite, et concluent que l’IA a gagné. C’est une comparaison
        entre deux choses qui ne font pas le même travail. Comparons plutôt ce que chacun produit,
        sur les tâches qui existent réellement dans une agence ou en freelance.
      </p>

      <h2 className="pt-4 text-2xl font-black" style={{ color: '#1e1b4b' }}>
        Le comparatif critère par critère
      </h2>
      <p>
        Voici huit critères observés en production, sur des contenus de type blog, e-mail et page de
        vente. Aucune de ces lignes ne prétend à l’exhaustivité : elles servent à orienter, pas à
        décider à votre place.
      </p>

      <div className="not-prose my-6 grid gap-3">
        {CRITERES.map((item) => (
          <div
            key={item.critere}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <h3 className="text-base font-bold" style={{ color: '#1e1b4b' }}>
              {item.critere}
            </h3>
            <div className="mt-2 grid gap-2 text-sm sm:grid-cols-2">
              <p className="rounded-lg bg-indigo-50 px-3 py-2 leading-relaxed text-gray-700">
                <span className="font-semibold text-indigo-700">IA :</span> {item.ia}
              </p>
              <p className="rounded-lg bg-gray-50 px-3 py-2 leading-relaxed text-gray-700">
                <span className="font-semibold text-gray-600">Humain :</span> {item.humain}
              </p>
            </div>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-indigo-600">
              {item.verdict}
            </p>
          </div>
        ))}
      </div>

      <h2 className="pt-4 text-2xl font-black" style={{ color: '#1e1b4b' }}>
        Le vrai terrain de comparaison n’est pas l’écriture
      </h2>
      <p>
        L’erreur de cadrage la plus fréquente est de comparer l’IA à la rédaction. Mais dans une
        majorité de cas, l’écriture n’est pas le goulot d’étranglement. Le goulot, c’est la
        décision : quoi dire, à qui, avec quel angle. Un rédacteur humain passe souvent 70 % de son
        temps à cadrer, relationaliser et vérifier — et 30 % à taper. Sur ces 30 %, l’IA fait le
        travail à un coût marginal proche de zéro.
      </p>
      <p>
        Concrètement, sur une page de vente, la partie la plus difficile n’est pas la rédaction du
        corps : c’est l’angle, l’ordre des arguments et la réponse à l’objection principale. C’est
        aussi ce que l’IA fait le moins bien spontanément. Notre article sur le{' '}
        <Link
          href="/blog/structure-landing-page-conversion"
          className="font-semibold text-indigo-700 underline"
        >
          cadrage d’une landing page
        </Link>{' '}
        montre pourquoi la structure se décide avant l’écriture.
      </p>

      <h2 className="pt-4 text-2xl font-black" style={{ color: '#1e1b4b' }}>
        Quand l’IA se trompe
      </h2>
      <p>
        Le risque principal n’est pas le style robot. C’est la fabrication. Sans cadrage explicite,
        un modèle inventera un chiffre, une étude ou un cas client — et le texte sera parfaitement
        rédigé, donc publishable, donc dangereux. C’est le défaut que nous traitons en priorité chez
        ia-premium : aucune donnée n’est produite, aucun chiffre n’est estimé, aucune référence n’est
        inventée. Ce que le moteur ne sait pas, il ne le comble pas.
      </p>
      <p>
        Le second risque est la dérive de voix. Sur une série de contenus, sans paramétrage de ton,
        le texte se homogénéise jusqu’à devenir indifférenciable. Notre article sur la{' '}
        <Link
          href="/blog/copywriting-ia-premium"
          className="font-semibold text-indigo-700 underline"
        >
          cohérence de voix
        </Link>{' '}
        traite ce point : la voix se paramètre, elle ne se découvre pas en relisant.
      </p>

      <h2 className="pt-4 text-2xl font-black" style={{ color: '#1e1b4b' }}>
        La combinaison qui fonctionne
      </h2>
      <p>
        Dans la plupart des organisations, la répartition efficace est la suivante : l’humain cadre
        et décide, l’IA exécute et produit les variantes, l’humain relit ce qui est sensible. Sur un article de blog
        long, cela revient à environ une heure de décision et de relecture, contre trois à cinq
        heures pour un cycle complet sans outil.
      </p>
      <p>
        À l’inverse, un travail de repositionnement de marque, un texte de crise, ou un contenu à
        forte charge éditoriale resteront humaines. Ce ne sont pas les textes où l’IA est faible —
        ce sont ceux où une incohérence apparente serait un risque réputationnel.
      </p>
      <p>
        Notre page de{' '}
        <Link href="/pricing" className="font-semibold text-indigo-700 underline">
          tarifs
        </Link>{' '}
        positionne l’outil sur le premier terrain : produire vite et à volume, avec un cadrage
        explicite. Elle n’a pas vocation à remplacer un rédacteur de marque — elle l’a à faire
        produire davantage.
      </p>
    </BlogArticleLayout>
  )
}
