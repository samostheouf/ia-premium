import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleLayout from '@/app/components/BlogArticleLayout'
import { type ArticleMeta } from '@/lib/blog'
import { absoluteUrl } from '@/lib/site'

// ─── Article : prompts d'écriture commerciale ─────────────────────────────────

const ARTICLE: ArticleMeta = {
  slug: 'prompts-ecriture-commerciale',
  titre: '15 prompts d’écriture commerciale pour obtenir des textes qui vendent',
  description:
    'Une sélection de prompts d’écriture commerciale testés en production : cadrage, objections, preuves, ton, relances. Avec la logique derrière chaque prompt et les erreurs à éviter.',
  categorie: 'Prompting',
  datePublication: '14 janvier 2026',
  dateIso: '2026-01-14',
  auteur: 'L’équipe éditoriale ia-premium',
  tempsLecture: '8 min de lecture',
  motCle: 'prompts écriture commerciale',
}

const PROMPTS = [
  {
    numero: '01',
    nom: 'Le prompt de cadrage',
    corps:
      'Décris la situation du lecteur, ce qu’il a déjà essayé, la raison pour laquelle cela n’a pas fonctionné, et ce qu’il perd à rester dans cet état. N’écris pas encore le texte.',
  },
  {
    numero: '02',
    nom: 'Le prompt d’angle',
    corps:
      'Propose cinq angles d’attaque différents pour ce sujet. Pour chacun : la promesse, la personne à qui elle s’adresse, et l’objection qu’elle lève. N’en développe aucun.',
  },
  {
    numero: '03',
    nom: 'Le prompt d’objections',
    corps:
      'Liste les huit objections qui empêchent ce lecteur d’agir, de la plus banale à la plus relevante. Pour chacune, donne la réponse en deux phrases maximum.',
  },
  {
    numero: '04',
    nom: 'Le prompt de hiérarchie',
    corps:
      'Construis le plan de cette page : quel bloc ouvre le texte, quels arguments viennent ensuite, où se place la preuve, où se place le prix. Un titre par bloc, pas de rédaction.',
  },
  {
    numero: '05',
    nom: 'Le prompt de preuve',
    corps:
      'Transforme chaque affirmation de ce texte en preuve vérifiable. Marque [PREUVE MANQUANTE] partout où tu ne peux pas la fournir, plutôt que d’inventer un exemple.',
  },
  {
    numero: '06',
    nom: 'Le prompt de ton',
    corps:
      'Réécris ce paragraphe avec un ton [registre]. Conserve exactement les informations, retire uniquement les adjectifs et les formules qui ne servent pas ce registre.',
  },
  {
    numero: '07',
    nom: 'Le prompt de resserrement',
    corps:
      'Réduis ce texte de 30 % sans supprimer aucune information factuelle. Coupe les répétitions, les transitions mécaniques et les nominalisations. Ne réécris pas le sens.',
  },
  {
    numero: '08',
    nom: 'Le prompt de première ligne',
    corps:
      'Écris dix premières lignes possibles pour cette page. Mélange les approches : une question, un constat chiffré, une scène, une phrase contre-intuitive. Ne choisis pas, je le ferai.',
  },
  {
    numero: '09',
    nom: 'Le prompt de relance e-mail',
    corps:
      'Écris une relance qui part du désaccord : « vous n’avez peut-être pas besoin de… ». Ton direct, une seule idée, un appel à l’action unique, 80 mots maximum.',
  },
  {
    numero: '10',
    nom: 'Le prompt de sans-égoïste',
    corps:
      'Repère les cinq formulations de ce texte qui parlent de nous au lieu de parler au lecteur. Réécris-les en plaçant le bénéfice lecteur en premier.',
  },
  {
    numero: '11',
    nom: 'Le prompt de listing',
    corps:
      'Transforme ce paragraphe en liste de six points. Chaque point tient en une ligne et apporte une information distincte. Supprime les connecteurs.',
  },
  {
    numero: '12',
    nom: 'Le prompt de réseaux sociaux',
    corps:
      'Adapte ce texte en publication LinkedIn : 1 200 caractères, première ligne qui donne envie de cliquer sur « voir plus », un seul exemple concret, un call to action discret.',
  },
  {
    numero: '13',
    nom: 'Le prompt de FAQ',
    corps:
      'Génère cinq questions que poserait un lecteur sceptique après avoir lu la page, puis la réponse à chacune en trois phrases. Commence par la question, pas par la réponse.',
  },
  {
    numero: '14',
    nom: 'Le prompt de passage en FAQ',
    corps:
      'Transforme ce texte en page FAQ : une question en H2 par objection, la réponse en 80 à 120 mots, aucune formule d’introduction, aucune conclusion.',
  },
  {
    numero: '15',
    nom: 'Le prompt de relecture critique',
    corps:
      'Relis ce texte comme un lecteur pressé et sceptique. Signale chaque passage où tu décrocherais, chaque affirmation invérifiable, chaque promesse que le texte ne tient pas.',
  },
]

export function generateMetadata(): Metadata {
  return {
    title: `${ARTICLE.titre} | ia-premium`,
    description: ARTICLE.description,
    keywords: [
      ARTICLE.motCle,
      'prompt rédaction IA',
      'prompt copywriting',
      'instruction IA',
    ],
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

export default function ArticlePromptsEcritureCommerciale() {
  return (
    <BlogArticleLayout article={ARTICLE}>
      <p className="text-lg leading-relaxed text-gray-600">
        Un prompt n’est pas une formule magique qu’on recopie depuis une liste. C’est une
        instruction de travail. La différence entre « écris une page de vente » et une consigne qui
        décrit le lecteur, ses objections et la structure attendue se voit immédiatement dans le
        texte obtenu. Voici quinze prompts que nous utilisons réellement, avec la logique qui les
        sous-tend.
      </p>

      <h2 className="pt-4 text-2xl font-black" style={{ color: '#1e1b4b' }}>
        La règle qui rend un prompt efficace
      </h2>
      <p>
        Un prompt efficace répond à trois questions : qu’est-ce que la machine ne sait pas, qu’est-ce
        qu’elle ne doit surtout pas faire, et sous quelle forme vous voulez recevoir le résultat.
        Tout le reste — longueur, ton, mots-clés — vient après, et ne sert qu’à habiller une
        consigne qui a déjà fait le travail difficile.
      </p>
      <p>
        Le symptôme d’un prompt faible est facile à reconnaître : le modèle produit un texte
        générique. La cause n’est presque jamais le modèle. C’est que vous lui avez demandé un
        texte sans lui avoir donné de matière. Un prompt qui ne contient aucune information
        spécifique sur votre offre, votre client ou vos contraintes ne peut pas produire autre chose
        que du remplissage.
      </p>

      <h2 className="pt-4 text-2xl font-black" style={{ color: '#1e1b4b' }}>
        Les 15 prompts, par étape de production
      </h2>
      <p>
        Ils ne sont pas interchangeables et ne s’utilisent pas dans le désordre. Les premiers
        servent à ouvrir le travail, les derniers à le finir. Les traiter comme une chaîne, et non
        comme une banque de formulations, est ce qui change le résultat.
      </p>

      <div className="not-prose my-6 grid gap-3">
        {PROMPTS.map((prompt) => (
          <div
            key={prompt.numero}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <h3 className="text-base font-bold" style={{ color: '#1e1b4b' }}>
              {prompt.numero} — {prompt.nom}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              <span className="font-semibold text-indigo-700">«&nbsp;{prompt.corps}&nbsp;»</span>
            </p>
          </div>
        ))}
      </div>

      <h2 className="pt-4 text-2xl font-black" style={{ color: '#1e1b4b' }}>
        Trois usages que ces prompts corrigent immédiatement
      </h2>
      <p>
        Le prompt de cadrage (01) est le plus rentable du lot, et le plus souvent omis. Exiger la
        description de la situation du lecteur avant toute rédaction oblige à trancher ce que la
        page doit défendre. Un brief qui reste vague après cet exercice ne mérite pas d’être
        généré : il n’y a rien à écrire.
      </p>
      <p>
        Le prompt de preuve (05) est le garde-fou anti-hallucination le plus simple qui soit. En
        demandant explicitement de marquer les endroits sans preuve plutôt que d’inventer un
        exemple, on obtient un texte honnête et, en prime, la liste exacte des informations à
        fournir avant publication. C’est aussi ce qui distingue un article utile d’un texte
        promotionnel : la trace de ce qui n’est pas démontré.
      </p>
      <p>
        Enfin, le prompt de relecture critique (15) joue un rôle qu’aucune génération ne peut
        remplacer. Un modèle ne relit pas ce qu’il vient d’écrire : il continue. Exiger une
        lecture adverse, avec sortie explicite des points de décrochage, transforme un contrôle
        qualité Tedieux en une liste de corrections directement applicable.
      </p>

      <h2 className="pt-4 text-2xl font-black" style={{ color: '#1e1b4b' }}>
        Comment les articuler dans un brief réutilisable
      </h2>
      <p>
        La bonne utilisation n’est pas de copier-coller un de ces prompts dans un champs de saisie,
        mais de les convertir en sections d’un brief permanent. Le cadrage, l’angle, la hiérarchie
        et les objections deviennent des champs que vous remplissez une fois par offre. Le reste
        devient de l’exécution, reproductible d’un contenu à l’autre.
      </p>
      <p>
        C’est exactement le principe que nous détaille notre article sur{' '}
        <Link href="/blog/choisir-ton-ia" className="font-semibold text-indigo-700 underline">
          le brief créatif structuré
        </Link>
        {' : '}
        le prompt n’a de valeur que s’il s’insère dans un cadre qui le précède. Et pour rester
        cohérent d’un texte à l’autre, notre guide sur{' '}
        <Link href="/blog/copywriting-ia-premium" className="font-semibold text-indigo-700 underline">
          la voix de marque appliquée à l’IA
        </Link>{' '}
        explique comment fournir vos propres exemples comme référence de style.
      </p>
      <p>
        Enfin, ces prompts ne valent que si le rendu est directement exploitable. Notre article sur{' '}
        <Link href="/blog/formats-sortie-ia" className="font-semibold text-indigo-700 underline">
          les formats de sortie
        </Link>{' '}
        montre comment choisir entre texte brut, Markdown et JSON selon la destination, pour éviter
        le reformatage manuel après coup. La page{' '}
        <Link href="/pricing" className="font-semibold text-indigo-700 underline">
          tarifs
        </Link>{' '}
        détaille les formules qui exécutent cette chaîne de bout en bout.
      </p>
    </BlogArticleLayout>
  )
}
