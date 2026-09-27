import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleLayout from '@/app/components/BlogArticleLayout'
import { type ArticleMeta } from '@/lib/blog'
import { absoluteUrl } from '@/lib/site'

// ─── Article : choisir son ton IA ────────────────────────────────────────────

const ARTICLE: ArticleMeta = {
  slug: 'choisir-ton-ia',
  titre: 'Choisir le bon ton pour votre contenu IA : le guide des 8 registres',
  description:
    "Le ton n'est pas une décoration : il modifie le vocabulaire, le rythme et le niveau de familiarité. Comment choisir le bon registre pour chaque canal, et éviter le texte qui sonne robot.",
  categorie: 'Style & ton',
  datePublication: '8 janvier 2026',
  dateIso: '2026-01-08',
  auteur: 'L’équipe éditoriale ia-premium',
  tempsLecture: '6 min de lecture',
  motCle: 'ton contenu IA',
}

const REGISTRES = [
  {
    nom: 'Direct',
    usage: 'Publicité, accroche, e-mail d’ouverture',
    desc: 'Phrases courtes, verbes d’action, aucun détour. On dit ce que le produit fait et ce que le lecteur y gagne.',
  },
  {
    nom: 'Pédagogique',
    usage: 'Blog, documentation, onboarding',
    desc: 'On explique le raisonnement, pas seulement le résultat. Le lecteur comprend pourquoi, pas seulement comment.',
  },
  {
    nom: 'Analytique',
    usage: 'Études de cas, rapports, contenus B2B',
    desc: 'Vocabulaire précis, structure argumentative, aucune emphase inutile. La rigueur est l’argument.',
  },
  {
    nom: 'Chaleureux',
    usage: 'Communauté, e-mail de fidélisation, support',
    desc: 'Tu plutôt que vous, tournures naturelles, attention portée à la personne plus qu’à la fonctionnalité.',
  },
  {
    nom: 'Créatif',
    usage: 'Campagne de marque, lancement',
    desc: 'Images, rythme, surprise. Le texte cherche à se faire retenir, quitte à dire moins de choses.',
  },
  {
    nom: 'Luxueux',
    usage: 'Premium, services haut de gamme',
    desc: 'Vocabulaire sobre, phrases abouties, aucun superlatif. La retenue signale la valeur mieux que l’exagération.',
  },
  {
    nom: 'Persuasif',
    usage: 'Page de vente, e-mail de relance',
    desc: 'L’objection est traitée avant d’être levée. La structure suit le lecteur, pas le produit.',
  },
  {
    nom: 'Institutionnel',
    usage: 'Rapports annuels, communiqués, BTP',
    desc: 'Neutre, factuel, sans emphase. Ce registre ne cherche pas à convaincre mais à établir.',
  },
]

export function generateMetadata(): Metadata {
  return {
    title: `${ARTICLE.titre} | ia-premium`,
    description: ARTICLE.description,
    keywords: [ARTICLE.motCle, 'ton rédaction IA', 'style rédactionnel', 'registre'],
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

export default function ArticleChoisirTonIa() {
  return (
    <BlogArticleLayout article={ARTICLE}>
      <p className="text-lg leading-relaxed text-gray-600">
        Le ton est le paramètre le plus sous-estimé de la production de contenu. Beaucoup
        d’utilisateur choisissent « ton professionnel » par défaut, obtiennent un texte neutre, et
        concluent que l’IA écrit mal. Le problème n’est presque jamais la qualité de la rédaction :
        c’est que le texte a été écrit dans le mauvais registre pour le mauvais canal.
      </p>

      <h2 className="pt-4 text-2xl font-black" style={{ color: '#1e1b4b' }}>
        Ce que le ton change réellement
      </h2>
      <p>
        Le ton n’est pas un habillage : c’est un ensemble de décisions concrètes. Il modifie le
        vocabulaire — un texte luxueux évite « super », un texte direct évite «PRA ». Il modifie la
        longueur des phrases : plus le registre est luxueux, plus les phrases sont longues et
        syntaxiquement abouties. Il modifie la position du lecteur : un texte chaleureux parle à
        quelqu’un, un texte analytique parle de quelque chose.
      </p>
      <p>
        Ces décisions se traduisent par des marqueurs repérables. Un lecteur qui croise douze
        phrases de longueur identique perçoit une monotonie même si chacune est correcte. Inversement,
        un texte qui varie le rythme paraît immédiatement plus humain, non par un ajout d’émotion, mais par un
        travail sur la longueur.
      </p>

      <h2 className="pt-4 text-2xl font-black" style={{ color: '#1e1b4b' }}>
        Les huit registres et leur usage
      </h2>
      <p>
        Voici les registres que nous retrouvons le plus souvent en production, avec l’usage pour
        lequel chacun fonctionne le mieux.
      </p>

      <div className="not-prose my-6 grid gap-3 sm:grid-cols-2">
        {REGISTRES.map((registre) => (
          <div
            key={registre.nom}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <h3 className="text-base font-bold" style={{ color: '#1e1b4b' }}>
              {registre.nom}
            </h3>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-indigo-600">
              {registre.usage}
            </p>
            <p className="mt-2.5 text-sm leading-relaxed text-gray-600">{registre.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="pt-4 text-2xl font-black" style={{ color: '#1e1b4b' }}>
        La règle du canal
      </h2>
      <p>
        Un même produit appelle des registres différents selon le canal. Une page de vente et un
        e-mail de fidélisation ne s’adressent pas au même lecteur, dans le même état d’esprit, au
        même moment : le premier est en-train de décider, le second est déjà client. Leur donner le
        même ton est une erreur de ciblage, pas de style.
      </p>
      <p>
        Le corollaire pratique : ne jamais demander un texte « neutre ». Le neutre n’est pas un ton,
        c’est l’absence de décision. Demandez plutôt « quel âge a le lecteur », « que sait-il
        déjà », « qu’est-ce qui l’arrête aujourd’hui ». Ces trois questions déterminent le registre
        bien plus sûrement qu’un adjectif.
      </p>

      <h2 className="pt-4 text-2xl font-black" style={{ color: '#1e1b4b' }}>
        Caler le ton sur votre marque
      </h2>
      <p>
        Le réglage le plus puissant n’est pas un nom de registre, mais un exemple. En fournissant
        deux ou trois passages de votre communication existante — un e-mail, une page, un post —
        vous fixez la voix : le vocabulaire que vous employez, les tournures que vous évitez, le
        niveau de familiarité assumé. Le texte produit s’inscrit alors dans la continuité de ce que
        vous publiez déjà, ce qui est exactement ce qu’un outil générique ne réussit pas.
      </p>
      <p>
        Ce calibrage se vérifie concrètement : confrontez le résultat à un contenu que vous avez
        vous-même écrit. Si un lecteur externe ne voit pas la différence de nature, le ton est juste.
        S’il voit un changement net, le ton est à reprendre — et c’est à ce moment qu’une
        réécriture ciblée d’un paragraphe est plus efficace qu’une régénération complète.
      </p>

      <h2 className="pt-4 text-2xl font-black" style={{ color: '#1e1b4b' }}>
        Le test des trois relectures
      </h2>
      <p>
        Avant de publier, faites lire le texte par trois personnes différentes et posez-leur la même
        question : « à qui ce texte s’adresse-t-il ? ». Si les trois réponses convergent, le ton
        est juste. Si elles divergent, le texte n’a pas de ton — il a des mots. C’est le test le
        plus rapide pour détecter un registre défaillant, et il ne coûte qu’un café.
      </p>
      <p>
        Pour aller plus loin sur la cohérence de voix d’un bout à l’autre de votre communication,
        notre article sur{' '}
        <Link href="/blog/copywriting-ia-premium" className="font-semibold text-indigo-700 underline">
          le copywriting IA premium
        </Link>{' '}
        explique pourquoi la méthode compte autant que le réglage.
      </p>
    </BlogArticleLayout>
  )
}
