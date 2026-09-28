import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleLayout from '@/app/components/BlogArticleLayout'
import { type ArticleMeta } from '@/lib/blog'
import { absoluteUrl } from '@/lib/site'

// ─── Article : rédiger un e-mail marketing avec l'IA ─────────────────────────

const ARTICLE: ArticleMeta = {
  slug: 'rediger-email-marketing-ia',
  titre: 'Rédiger un e-mail marketing avec l’IA : le guide complet',
  description:
    'Comment rédiger un e-mail marketing avec l’IA : structure qui convertit, objet qui survit au tri, formulation des objections, et relecture avant envoi. Guide praticien.',
  categorie: 'E-mail marketing',
  datePublication: '15 janvier 2026',
  dateIso: '2026-01-15',
  auteur: 'L’équipe éditoriale ia-premium',
  tempsLecture: '7 min de lecture',
  motCle: 'rédiger un e-mail marketing',
}

const BLOCS = [
  {
    etape: 'Objet',
    part: 'Le premier filtre : rien ne sera lu s’il échoue',
    regle:
      'Formulez une curiosité précise, pas une promesse creuse. « 3 chiffres sur votre coût de rédaction », pas « nos nouveautés ». Évitez l’alarme artificielle et les points d’exclamation multiples.',
  },
  {
    etape: 'Pré-en-tête',
    part: 'La suite de l’objet, pas sa répétition',
    regle:
      'Il complète ou il précise ce que l’objet a annoncé. Si votre pré-en-tête répète votre objet mot pour mot, supprimez-le : la répétition se paie en fatigue à l’ouverture.',
  },
  {
    etape: 'Ouverture',
    part: 'Trois lignes qui décident de la suite',
    regle:
      'Deux phrases qui nament la situation du destinataire et annoncent ce qu’il va obtenir. Aucune formule de politesse, aucun « nous sommes ravis de vous contacter ».',
  },
  {
    etape: 'Corps',
    part: 'L’essentiel du travail persuasif',
    regle:
      'Un seul argument par e-mail. Des paragraphes de deux à trois lignes, séparés par des blancs. Un exemple concret plutôt qu’une caractéristique. La preuve avant l’affirmation.',
  },
  {
    etape: 'Appel à l’action',
    part: 'L’unique élément qui déclenche le clic',
    regle:
      'Un seul bouton, un seul libellé, formulé comme le bénéfice du lecteur et non comme l’action technique. « Voir les 3 modèles » plutôt que « En savoir plus ».',
  },
]

export function generateMetadata(): Metadata {
  return {
    title: `${ARTICLE.titre} | ia-premium`,
    description: ARTICLE.description,
    keywords: [
      ARTICLE.motCle,
      'e-mail marketing IA',
      'subject line français',
      'séquence e-mail',
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

export default function ArticleRedigerEmailMarketingIa() {
  return (
    <BlogArticleLayout article={ARTICLE}>
      <p className="text-lg leading-relaxed text-gray-600">
        L’e-mail marketing est le format où l’IA est à la fois la plus utile et la plus dangereuse.
        Elle produit un texte parfait en huit secondes, et c’est précisément le problème : en huit
        secondes, personne n’a décidé de ce qu’il voulait dire. Le travail ne consiste pas à
        générer, mais à savoir quoi générer, et dans quel ordre.
      </p>

      <h2 className="pt-4 text-2xl font-black" style={{ color: '#1e1b4b' }}>
        Les cinq blocs d’un e-mail qui convertit
      </h2>
      <p>
        Un e-mail performant n’est pas un long texte bien écrit. C’est une structure où chaque
        bloc joue un rôle précis, et où rien n’est présent par habitude. Voici le découpage que nous
        appliquons systématiquement.
      </p>

      <div className="not-prose my-6 grid gap-3">
        {BLOCS.map((bloc) => (
          <div
            key={bloc.etape}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <h3 className="text-base font-bold" style={{ color: '#1e1b4b' }}>
              {bloc.etape}
            </h3>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-indigo-600">
              {bloc.part}
            </p>
            <p className="mt-2.5 text-sm leading-relaxed text-gray-600">{bloc.regle}</p>
          </div>
        ))}
      </div>

      <h2 className="pt-4 text-2xl font-black" style={{ color: '#1e1b4b' }}>
        L’objet : écrire dix avant d’en garder un
      </h2>
      <p>
        L’objet est le seul élément qui décide si le reste sera lu. Sa mécanique est simple à
        décrire, difficile à exécuter : il doit créer une curiosité précise, pas annoncer une
        intention. « Réduire son temps de rédaction de moitié » est un objet. « L’article du mois »
        n’en est pas un, parce qu’il ne donne aucune raison de cliquer plutôt que de lire autre chose.
      </p>
      <p>
        La méthode qui fonctionne consiste à écrire dix objets, puis à en supprimer neuf. Cette
        étape paraît absurde si l’on produit un e-mail par semaine, et rentable si l’on en produit
        quarante. Le tri fait le travail de sélection que le jugement seul ne fait pas à l’échelle :
        parmi dix formulations, une seule porte une information que les neuf autres n’ont pas.
      </p>

      <h2 className="pt-4 text-2xl font-black" style={{ color: '#1e1b4b' }}>
        L’ouverture : nommer la situation, pas se présenter
      </h2>
      <p>
        La faute la plus fréquente dans les e-mails générés par IA est l’ouverture polie. « Nous
        sommes ravis de vous retrouver », « j’espère que vous allez bien », « dans un monde en
        constante évolution » : ces phrases ne transmettent aucune information et coûtent trois
        lignes d’attention sur l’écran le plus cher de votre acquisition.
      </p>
      <p>
        Remplacez-les par une nomination de la situation du destinataire. « Vous avez embauché
        votre troisième alternant ce mois-ci. » est une ouverture efficace parce qu’elle montre que
        l’e-mail a été écrit pour quelqu’un. C’est un travail que l’IA fait très bien lorsqu’on
        lui fournit la situation exacte — et très mal lorsqu’on ne la fournit pas.
      </p>

      <h2 className="pt-4 text-2xl font-black" style={{ color: '#1e1b4b' }}>
        Le corps : une idée, un exemple, une objection traitée
      </h2>
      <p>
        La structure qui tient le mieux sur mobile est la structure courte : un paragraphe, un
        blanc, un autre paragraphe. Les blocs de dix lignes sont illisibles sur téléphone et
        abaissent structurellement le taux de lecture.
      </p>
      <p>
        Sur le fond, l’erreur récurrente est l’énumération de caractéristiques. « Notre solution
        propose la planification, le suivi, le reporting et l’intégration » décrit le produit. « Vous
        n’avez plus besoin de consolider trois fichiers chaque lundi matin » décrit le lecteur. La
        deuxième version se vend ; la première se parcourt.
      </p>
      <p>
        Insérez systématiquement une objection. Les trois objections les plus fréquentes — le prix,
        le temps de mise en œuvre, la crainte de la dépendance — doivent chacune recevoir une réponse
        explicite dans le corps de l’e-mail. Notre article sur{' '}
        <Link href="/blog/rediger-email-marketing-ia" className="font-semibold text-indigo-700 underline">
          la rédaction d’e-mails qui convertissent
        </Link>{' '}
        montre comment les répartir sur plusieurs envois plutôt que de les compressioner.
      </p>

      <h2 className="pt-4 text-2xl font-black" style={{ color: '#1e1b4b' }}>
        L’appel à l’action : un bouton, un libellé, une promesse
      </h2>
      <p>
        La plupart des e-mails ont deux ou trois appels à l’action, ce qui transforme le bouton en
        dilemme. Le lecteur qui hésite ne choisit pas. Réduisez à un seul lien, et formulez son
        libellé du point de vue du destinataire. « Voir les 3 modèles » indique ce qu’il va
        obtenir ; « En savoir plus » l’oblige à deviner.
      </p>
      <p>
        La formulation du bouton doit rester cohérente avec la promesse de l’objet. Si l’objet
        annonce un chiffre, le bouton doit le rappeler. Une rupture entre l’attente créée et
        la proposition finale est la cause la plus fréquente d’un clic et d’un départ.
      </p>

      <h2 className="pt-4 text-2xl font-black" style={{ color: '#1e1b4b' }}>
        La relecture avant envoi
      </h2>
      <p>
        Avant toute mise en production, quatre vérifications prennent moins de dix minutes. Lisez
        l’objet seul : est-il compréhensible hors contexte ? Lisez l’ouverture seule : décrit-elle
        le destinataire ? Comptez les appels à l’action : y en a-t-il plus d’un ? Cherchez les
        formulations invérifiables : « les clients nous Bombardent de questions », « à la pointe de »,
        « depuis longtemps ». Ces quatre points captent l’essentiel des défauts des e-mails
        générés.
      </p>
      <p>
        Pour industrialiser cette production sans perdre la cohérence de voix entre deux envois,
        notre article sur{' '}
        <Link href="/blog/formats-sortie-ia" className="font-semibold text-indigo-700 underline">
          les formats de sortie
        </Link>{' '}
        explique comment traiter une série d’e-mails comme un seul chantier. Et pour appliquer cette
        méthode à un volume réel, la page{' '}
        <Link href="/pricing" className="font-semibold text-indigo-700 underline">
          tarifs
        </Link>{' '}
        détaille les formules et la garantie de 14 jours.
      </p>
    </BlogArticleLayout>
  )
}
