import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleLayout from '@/app/components/BlogArticleLayout'
import { type ArticleMeta } from '@/lib/blog'
import { absoluteUrl } from '@/lib/site'

// ─── Article : formats de sortie IA ──────────────────────────────────────────

const ARTICLE: ArticleMeta = {
  slug: 'formats-sortie-ia',
  titre: 'Formats de sortie IA : texte, Markdown ou JSON pour votre chaîne de production',
  description:
    "Le bon format de sortie dépend du canal de diffusion et de votre outil en aval. Guide pratique pour choisir entre texte brut, Markdown structuré et JSON typé.",
  categorie: 'Formats & intégration',
  datePublication: '8 janvier 2026',
  dateIso: '2026-01-08',
  auteur: 'L’équipe éditoriale ia-premium',
  tempsLecture: '6 min de lecture',
  motCle: 'formats de sortie IA',
}

export function generateMetadata(): Metadata {
  return {
    title: `${ARTICLE.titre} | ia-premium`,
    description: ARTICLE.description,
    keywords: [ARTICLE.motCle, 'sortie JSON IA', 'Markdown', 'intégration CMS', 'automatisation'],
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

export default function ArticleFormatsSortieIa() {
  return (
    <BlogArticleLayout article={ARTICLE}>
      <p className="text-lg leading-relaxed text-gray-600">
        La plupart des outils de génération renvoient du texte brut. C’est suffisant pour un e-mail,
        insuffisant pour tout le reste. Dès qu’un contenu doit rejoindre un site, une newsletter ou
        un outil de production, la question du format de sortie cesse d’être un détail technique :
        elle détermine le nombre d’heures de reformatage qui vous attendent.
      </p>

      <h2 className="pt-4 text-2xl font-black" style={{ color: '#1e1b4b' }}>
        Texte brut : quand il suffit
      </h2>
      <p>
        Le texte brut reste le bon choix pour les contenus qui vont être lus puis retravaillés
        directement par un humain : un e-mail, une accroche, une légende, une note interne. Il n’y a
        rien à structurer, et toute mise en forme risquerait d’imposer une contrainte inutile.
      </p>
      <p>
        Son avantage principal est la vitesse de lecture et de copie. Son limite apparaît dès que le
        contenu doit être découpé : un paragraphe de texte brut ne distingue pas le sous-titre du
        corps du texte, ce qui rend toute extraction automatique fiable.
      </p>

      <h2 className="pt-4 text-2xl font-black" style={{ color: '#1e1b4b' }}>
        Markdown : la structure qui survit au transfert
      </h2>
      <p>
        Markdown ajoute une information de structure — titres, listes, emphases, blocs de citation —
        qui reste lisible dans n’importe quel éditeur de texte tout en étant exploitable par un
        moteur de rendu. C’est le format de transition idéal entre la production éditoriale et la
        publication web.
      </p>
      <p>
        Concrètement, Markdown évite le travail de mise en forme manuelle pour un article de blog
        ou une page de documentation. Les titres deviennent des niveaux, les listes restent des
        listes, et le contenu peut alimenter directement un générateur de site statique ou une
        documentation technique sans intervention.
      </p>
      <p>
        Un point de vigilance : le Markdown n’exprime pas la hiérarchie sémantique d’un CMS. Si
        votre site distingue un chapô d’un corps, ou si votre design impose une structure SEO
        particulière, il faudra une passe d’adaptation — plus légère qu’un reformatage complet, mais
        pas nulle.
      </p>

      <h2 className="pt-4 text-2xl font-black" style={{ color: '#1e1b4b' }}>
        JSON : quand le contenu alimente une machine
      </h2>
      <p>
        JSON est le format de l’automatisation. Là où le texte brut est destiné à l’œil humain et le
        Markdown à l’éditeur, le JSON est destiné au programme : champs nommés, types explicites,
        hiérarchie stable. C’est ce qui permet à un contenu généré d’alimenter un CMS, une
        newsletter, une fiche produit ou une chaîne de publication sans intervention humaine.
      </p>
      <p>
        L’avantage décisif est la prévisibilité. Un champ nommé <code>title</code> sera toujours un
        titre, quel que soit le contenu produit ; un champ <code>body</code> contiendra toujours le
        corps du texte. La logique en aval n’a pas à deviner, et la validation devient possible :
        on peut vérifier qu’aucun champ obligatoire ne manque avant de publier.
      </p>
      <p>
        La contrepartie est la rigueur requise. Un JSON mal formé casse la chaîne, et un schéma mal
        conçu produit des données inutilisables. C’est pourquoi le format JSON n’a de sens que si
        votre structure de destination est définie avant la génération — pas après.
      </p>

      <h2 className="pt-4 text-2xl font-black" style={{ color: '#1e1b4b' }}>
        Comment choisir en pratique
      </h2>
      <p>
        La décision se prend en une question : que va-t-il advenir du texte une fois généré ? S’il
        va être relu et retravaillé par une personne, texte brut. S’il va être publié sur un site ou
        une documentation, Markdown. S’il va déclencher une chaîne automatisée, JSON.
      </p>
      <p>
        Dans la plupart des productions réelles, les trois cohabitent : le même brief produit une
        version Markdown pour le blog, une version JSON pour le CMS, et une version texte pour
        tester dans un e-mail. C’est précisément l’intérêt de proposer le format comme un paramètre
        de génération plutôt que comme un choix unique : le contenu reste le même, seule sa
        enveloppe change.
      </p>

      <h2 className="pt-4 text-2xl font-black" style={{ color: '#1e1b4b' }}>
        L’erreur courante : choisir le format trop tard
      </h2>
      <p>
        Le piège typique est de générer en texte brut « au cas où », puis de vouloir structurer le
        contenu une fois la production terminée. À ce moment, il n’y a plus d’information de
        structure à récupérer : il ne reste qu’à la reconstituer à la main, ce qui est précisément
        le travail que le format devait éviter.
      </p>
      <p>
        La bonne séquence est donc inverse : définir la destination, choisir le format, puis
        générer. Pour aller plus loin sur la méthode de rédaction qui précède cette étape, notre
        article sur{' '}
        <Link href="/blog/copywriting-ia-premium" className="font-semibold text-indigo-700 underline">
          le copywriting IA premium
        </Link>{' '}
        détaille le cadrage et l’architecture qui conditionnent la qualité du contenu final.
      </p>
    </BlogArticleLayout>
  )
}
