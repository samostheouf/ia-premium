import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleLayout from '@/app/components/BlogArticleLayout'
import { type ArticleMeta } from '@/lib/blog'
import { absoluteUrl } from '@/lib/site'

// ─── Article : la structure d'une landing page qui convertit ────────────────

const ARTICLE: ArticleMeta = {
  slug: 'structure-landing-page-conversion',
  titre: 'Structure d’une landing page qui convertit : l’anatomie complète',
  description:
    'La structure d’une landing page qui convertit ne dépend pas du design mais de l’ordre des blocs. Promesse, preuve, objections, risque, appel à l’action : le découpage qui change le taux de conversion.',
  categorie: 'Landing pages',
  datePublication: '20 janvier 2026',
  dateIso: '2026-01-20',
  auteur: 'L’équipe éditoriale ia-premium',
  tempsLecture: '8 min de lecture',
  motCle: 'structure d’une landing page',
}

const BLOCS = [
  {
    etape: 'Promesse',
    part: 'La phrase que le visiteur lit en trois secondes',
    regle:
      'Une seule phrase, une seule cible, un seul résultat mesurable. « Vos quizzes en ligne en trois jours, sans developpeur. » Elle doit pouvoir être répétée telle quelle par un vendeur au téléphone.',
  },
  {
    etape: 'Sous-promesse',
    part: 'Pourquoi cette promesse est crédible',
    regle:
      'En dessous de la promesse, une phrase qui lève le doute principal : le prix de départ, la garantie, le délai, ou le nombre de clients déjà passés par là. Une seule réponse, pas cinq.',
  },
  {
    etape: 'Mécanisme',
    part: 'Comment le résultat est obtenu',
    regle:
      'Trois étapes numérotées qui expliquent le fonctionnement réel. C’est le bloc le plus souvent absent, et c’est celui qui fait la différence entre une page de vendas et une page qui regarde ses visiteurs partir.',
  },
  {
    etape: 'Preuve',
    part: 'La démonstration plutôt que l’affirmation',
    regle:
      'Un témoignage nommé, une capture datée, un chiffre vérifiable, un avant-après. Précisez toujours la situation et la durée. « 2 400 joueurs inscrits » vaut mieux que « des milliers de joueurs ».',
  },
  {
    etape: 'Objections',
    part: 'Les trois reasons de ne pas cliquer',
    regle:
      'Prix, temps, risque de se tromper. Traitez-les dans des encadrés courts, avec des réponses concrètes et chiffrées. Une objection laissée sans réponse revient toujours dans le tunnel, plus loin, sous une forme plus coûteuse.',
  },
  {
    etape: 'Risque',
    part: 'La suppression de la dernière hésitation',
    regle:
      'Garantie, essai, annulation sans justification, absence d’engagement. Formulez la garantie du point de vue du lecteur : ce qu’il perd, et non ce que vous offrez.',
  },
  {
    etape: 'Appel à l’action',
    part: 'Un bouton, un libellé, une répétition',
    regle:
      'Le même appel à l’action revient après chaque bloc majeur, pas seulement en bas de page. Le libellé annonce le contenu du clic, jamais l’action technique : « Voir les 4 formules » et non « En savoir plus ».',
  },
  {
    etape: 'Urgence réelle',
    part: 'La raison de finir maintenant',
    regle:
      'Une contrainte que vous contrôlez réellement : places limitées, date de bascule de tarif, clôture d’un cohort. Une urgence artificielle détruit la confiance acquise par les six blocs précédents.',
  },
]

export function generateMetadata(): Metadata {
  return {
    title: `${ARTICLE.titre} | ia-premium`,
    description: ARTICLE.description,
    keywords: [
      ARTICLE.motCle,
      'landing page qui convertit',
      'anatomie landing page',
      'taux de conversion landing page',
      'structure page de vente',
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

export default function ArticleStructureLandingPageConversion() {
  return (
    <BlogArticleLayout article={ARTICLE}>
      <p className="text-lg leading-relaxed text-gray-600">
        La plupart des landing pages qui ne convertissent pas ne sont pas mal écrites. Elles sont
        mal ordonnées. Le visiteur lit six blocs dans le désordre, ne trouve ni la raison de vous
        croire ni la réponse à son doute principal, et repart. Le texte peut être excellent : si
        la promesse arrive après la biographie de l’entreprise, personne ne l’a lue.
      </p>
      <p>
        Structurer une page de vente, c’est donc décider de l’ordre des réponses avant d’écrire
        la première phrase. On part de la question que se pose le visiteur à chaque seconde, et on
        place la bonne réponse au bon endroit. Ce guide donne le découpage complet, bloc par bloc,
        avec la règle qui s’applique à chacun.
      </p>

      <h2 className="pt-4 text-2xl font-black" style={{ color: '#1e1b4b' }}>
        Pourquoi la structure pèse plus que le style
      </h2>
      <p>
        Un visiteur ne lit pas une page de vente, il la scanne. Son regard suit un trajet en zigzag :
        titre, image, paragraphe court, bouton, remontée, lien, nouveau départ. Chaque bloc
        récupère une partie de cette attention, et la loses immédiatement s’il ne répond pas à une
        question précise. Un texte écrit dans un ordre qui ne suit pas ce trajet ne sera
        pas lu, quelle que soit sa qualité rédactionnelle.
      </p>
      <p>
        La conséquence pratique est simple : on n’écrit pas les blocs dans l’ordre où ils
        semblent logiques pour l’entreprise, mais dans l’ordre où ils rassurent le lecteur. L’entreprise
        commence par son histoire ; le lecteur commence par son problème. Pour la construction des
        plans et des promesses, notre article sur{' '}
        <Link href="/blog/choisir-ton-ia" className="font-semibold text-indigo-700 underline">
          la structuration d’un brief créatif
        </Link>{' '}
        montre comment formaliser cet ordre avant d’écrire.
      </p>

      <h2 className="pt-4 text-2xl font-black" style={{ color: '#1e1b4b' }}>
        Les huit blocs, dans l’ordre
      </h2>
      <p>
        Voici le squelette que nous appliquons sur les pages de vente, les pages d’inscription et
        les pages de pré-lancement. Rien n’est obligatoire, mais chaque bloc absent supprime une
        raison de passer à l’action, et ces raisons se compensent rarement.
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
        La promesse : une phrase capable d’être répétée
      </h2>
      <p>
        La promesse est le seul bloc que tout le monde lit. Elle doit tenir en une phrase, désigner
        un résultat observable et viser une personne précise. Le test est brutal mais efficace :
        votre vendeur devrait pouvoir la répéter de mémoire au téléphone, et un visiteur venu
        d’une autre page devrait la comprendre sans contexte. Si la phrase contient « et », elle
        contient probablement deux promesses, donc aucune.
      </p>
      <p>
        La sous-promesse fait le travail que la promesse laisse à faire. Elle donne la raison
        précise de croire : un délai, un tarif de départ, un chiffre, une garantie. « Dès 4,90 €,
        annulable à tout moment. » tient en une ligne et supprime le doute du risque avant même
        que le visiteur ait lu la suite.
      </p>

      <h2 className="pt-4 text-2xl font-black" style={{ color: '#1e1b4b' }}>
        Le mécanisme : le bloc que tout le monde oublie
      </h2>
      <p>
        Les pages qui bloquent le plus souvent après l’introduction sautent directement aux
        témoignages. Elles perdent la partie la plus persuasive de l’argumentaire. Le visiteur qui
        achète n’est pas convaincu que le résultat est possible ; il est inquiet de savoir comment
        vous l’obtiendrez, et cette inquiétude se transforme en non-décision.
      </p>
      <p>
        Trois étapes numérotées suffisent. « Vous décrivez votre sujet. L’IA produit une trame
        structurée. Vous relisez et publiez. » Ce découpage a une contrepartie en production de
        contenu : sans mechanism réel, la page devient une promesse invérifiable, ce qui amplifie
        le risque de discussions après achat. Les formats et la structuration des sorties font
        partie de ce travail amont, comme le détaille notre article sur les{' '}
        <Link href="/blog/formats-sortie-ia" className="font-semibold text-indigo-700 underline">
          formats de sortie IA
        </Link>
        .
      </p>

      <h2 className="pt-4 text-2xl font-black" style={{ color: '#1e1b4b' }}>
        La preuve : une situation, une durée, un chiffre
      </h2>
      <p>
        Un témoignage générique ne prouve rien. « Service excellent, je recommande. » ne peut pas
        être récité par un prospect pressé, et n’aide personne à se projeter. Une preuve efficace
        nomme la situation de départ, l’action menée et le résultat obtenu, avec un repère
        temporel : « après six semaines, de 4 à 11 demandes de démo par mois ».
      </p>
      <p>
        Privilégiez la précision aux adjectifs. Une capture d’écran datée vaut mieux qu’un adjectif
        comme « spectaculaire », parce qu’elle se vérifie en deux secondes. Et remplacez toute
        formulation invérifiable : « des milliers d’utilisateurs » devient « 3 100 comptes créés
        entre janvier et mars ».
      </p>

      <h2 className="pt-4 text-2xl font-black" style={{ color: '#1e1b4b' }}>
        Les objections : trois blocs, jamais un paragraphe
      </h2>
      <p>
        Les trois objections qui reviennent presque toujours sont le prix, le temps nécessaire et
        la crainte de se tromper. Chacune mérite un bloc dédié, en tête et non en pied de page,
        formulé du point de vue de celui qui hésite : « Combien de temps par semaine ? » en titre
        d’encadré vaut mieux que « Notre solution est simple ».
      </p>
      <p>
        Traitez les objections sur la page et non dans la FAQ uniquement. Une FAQ suppose que le
        visiteur sache quoi chercher ; l’objection non traitée, elle, est sentie au moment précis
        de la décision. Si vous préparez ces réponses par écrit une seule fois, elles servent
        ensuite aux e-mails de relance et aux échanges commerciaux : c’est le même travail
        d’argumentation, réutilisé.
      </p>

      <h2 className="pt-4 text-2xl font-black" style={{ color: '#1e1b4b' }}>
        Le risque et l’urgence : deux blocs à ne pas confondre
      </h2>
      <p>
        La réduction du risque répond à une peur, l’urgence à une question de calendrier. Les
        deux sont indispensables, et l’erreur classique consiste à transformer l’un en l’autre.
        Une garantie de remboursement de quatorze jours est une réduction de risque solide. Un
        « ne manquez pas cette offre » répété trois fois n’est qu’une pression, et elle se lit
        comme telle.
      </p>
      <p>
        N’utilisez une urgence réelle que si vous pouvez la justifier. Places limitées sur un
        cohort, date de hausse de tarif, dernière session de l’année : ces bornes sont crédibles
        parce qu’elles existent. Une urgence fabriquée détruit le peu de confiance construite par la
        preuve, et l’effet se voit dans le taux de rebond des jours suivants.
      </p>

      <h2 className="pt-4 text-2xl font-black" style={{ color: '#1e1b4b' }}>
        Les tests qui changent vraiment quelque chose
      </h2>
      <p>
        Une fois la structure posée, trois tests suffisent à faire progresser le taux de
        conversion. Le premier consiste à remplacer l’image d’ambiance par une démonstration réelle :
        le gain vient presque toujours de la crédibilité, pas du design. Le deuxième consiste à
        remonter le bloc preuve juste après la promesse, avant le mécanisme. Le troisième consiste
        à formuler les titres d’encadrés d’objections comme des questions.
      </p>
      <p>
        Ces trois tests sont rapides, réversibles, et ne demandent aucune refonte graphique. Pour
        produire les textes de tous ces blocs à partir d’un plan unique, notre article sur le{' '}
        <Link href="/blog/rediger-email-marketing-ia" className="font-semibold text-indigo-700 underline">
          travail par lots sur plusieurs canaux
        </Link>{' '}
        explique comment éviter de repartir d’une page blanche à chaque variante. Et pour appliquer
        cette structure à un volume réel de pages, la page{' '}
        <Link href="/pricing" className="font-semibold text-indigo-700 underline">
          tarifs
        </Link>{' '}
        détaille les formules et la garantie de 14 jours.
      </p>
    </BlogArticleLayout>
  )
}
