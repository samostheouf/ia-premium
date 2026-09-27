import type { Metadata } from 'next'
import { Target, Route, Users, ShieldCheck, TrendingUp, Heart, Quote } from 'lucide-react'
import PageShell, { ArticleSection, SubHeading, BulletList, Callout, CtaBand } from '@/app/components/PageShell'
import { absoluteUrl } from '@/lib/site'

// ─── À propos ────────────────────────────────────────────────────────────────

const VALEURS = [
  {
    icone: <Target className="h-5 w-5" aria-hidden="true" />,
    titre: 'L’utilité avant la quantité',
    texte:
      'Nous mesurons la réussite d’une génération à une seule chose : est-ce que le texte est publishable en l’état, ou est-ce qu’il a fallu le réécrire ? Un contenu que l’on jette est un coût, pas un service.',
  },
  {
    icone: <ShieldCheck className="h-5 w-5" aria-hidden="true" />,
    titre: 'L’honnêteté commerciale',
    texte:
      'Les limites sont dites : le moteur ne remplace pas un relecteur professionnel sur un contenu stratégique, et le droit de rétractation s’applique avec l’exception prévue pour les contenus numériques. Une promesse tenue vaut mieux qu’une promesse flatteuse.',
  },
  {
    icone: <Route className="h-5 w-5" aria-hidden="true" />,
    titre: 'La continuité de la voix',
    texte:
      'Produire dix contenus ne sert à rien s’ils ne se ressemblent pas. Notre méthode travaille le ton, le vocabulaire et le rythme pour que chaque pièce sonne comme la vôtre, quel que soit le canal.',
  },
  {
    icone: <TrendingUp className="h-5 w-5" aria-hidden="true" />,
    titre: 'La sobriété technique',
    texte:
      'Paiement unique, pas d’abonnement, pas de reconduction tacite. Une infrastructure légère et lisible, où vous savez exactement ce que vous payez et ce que vous obtenez.',
  },
]

const METHOD_STEPS = [
  {
    etape: '01',
    titre: 'Cadrage',
    texte:
      'Tout commence par le brief : à qui s’adresse le texte, quel est l’objectif réel (informer, convaincre, fidéliser), quel est le message unique que le lecteur doit retenir. Un contenu performant commence par un cadrage précis, pas par un choix de ton.',
  },
  {
    etape: '02',
    titre: 'Architecture',
    texte:
      'Le moteur construit la structure avant d’écrire : angle d’attaque, hiérarchie d’arguments, progression de la persuasion, placement de la preuve et de l’appel à l’action. C’est cette charpente qui distingue un texte qui convertit d’un texte qui remplit.',
  },
  {
    etape: '03',
    titre: 'Rédaction',
    texte:
      'La rédaction s’effectue au niveau du paragraphe, avec un contrôle du vocabulaire, de la longueur des phrases et du rythme. Aucun remplissage : chaque phrase doit apporter une information ou faire avancer la conviction.',
  },
  {
    etape: '04',
    titre: 'Passe de relecture',
    texte:
      'Une passe finale vérifie la cohérence logique, la suppression des redondances, la conformité au ton demandé et l’absence d’affirmations non étayées. Le résultat est un texte propre, prêt à la diffusion ou à la dernière relecture humaine.',
  },
  {
    etape: '05',
    titre: 'Formatage',
    texte:
      'Le contenu est livré dans le format du canal de destination : texte brut, Markdown structuré ou JSON typé pour l’intégration à un CMS ou à une chaîne automatisée. L’objectif est de supprimer le travail de reformatage, pas de le déporter.',
  },
]

const METRICS = [
  { valeur: '3', libelle: 'formules, sans option cachée' },
  { valeur: '14 j', libelle: 'de garantie de remboursement' },
  { valeur: '0 €', libelle: 'd’abonnement ou de reconduction' },
  { valeur: '12 h', libelle: 'de délai de réponse sur le Coffret' },
]

export const metadata: Metadata = {
  title: 'À propos — Notre mission et notre méthode | ia-premium',
  description:
    'ia-premium : notre mission, la méthode en 5 étapes qui transforme un brief en contenu premium, nos valeurs et l’équipe derrière le moteur de génération.',
  alternates: { canonical: absoluteUrl('/a-propos') },
  openGraph: {
    title: 'À propos d’ia-premium — contenu premium par IA',
    description: 'Notre mission, notre méthode en 5 étapes, nos valeurs et l’équipe.',
    url: absoluteUrl('/a-propos'),
    type: 'website',
    locale: 'fr_FR',
  },
}

export default function AProposPage() {
  return (
    <PageShell
      title="Écrire comme un copywriter senior, à la vitesse d’un moteur"
      description="ia-premium est né d’un constat simple : l’IA écrit vite, mais écrit rarement bien. Notre travail consiste à fermer l’écart entre les deux."
      breadcrumb={[{ name: 'À propos', href: '/a-propos' }]}
      eyebrow="À propos"
    >
      {/* ── MISSION ─────────────────────────────────────────────────────── */}
      <ArticleSection title="Notre mission" icon={<Target className="h-5 w-5" aria-hidden="true" />}>
        <p>
          Produire du contenu ne devrait pas être le maillon faible d’une entreprise. Les PME, les
          indépendants et les associations ont besoin de publier régulièrement — pages de vente,
          e-mails, réseaux sociaux, contenus éditoriaux — mais n’ont ni les heures ni l’équipe
          rédactionnelle pour le faire à un niveau professionnel.
        </p>
        <p>
          Notre mission est de fermer l’écart entre la vitesse d’une machine et la qualité d’un
          rédacteur expérimenté. Concrètement, nous avons construit un moteur qui ne se contente pas
          de produire des phrases : il applique une méthode de rédaction — cadrage, architecture,
          rédaction, relecture, formatage — celle qu’un copywriter senior mettrait du temps à
          appliquer à chaque commande.
        </p>
        <p>
          Le résultat est un texte prêt à travailler, pas un texte à jeter. Et parce que nous savons
          que la qualité se constate sur l’usage, nous l’annonçons clairement : la garantie de 14
          jours existe pour que vous puissiez le vérifier vous-même.
        </p>

        <Callout tone="info" title="Pourquoi ce projet existe">
          <p>
            Après avoir passé des années à produire du contenu pour des clients, nous avons
            constaté que la majorité des outils d’IA disponibles délivaient un texte générique que
            personne ne pouvait publier tel quel. Le problème n’était pas la génération : c’était
            l’absence de méthode, de cadrage et de contrôle du ton. C’est précisément ce que nous
            avons corrigé.
          </p>
        </Callout>
      </ArticleSection>

      {/* ── MÉTHODE ─────────────────────────────────────────────────────── */}
      <ArticleSection
        title="Notre méthode : cinq étapes, pas une boîte noire"
        icon={<Route className="h-5 w-5" aria-hidden="true" />}
      >
        <p className="mb-6">
          Le moteur suit un processus en cinq étapes inspirés de la pratique professionnelle du
          copywriting. Chaque étape a un rôle précis — c’est cette discipline, et non la puissance
          brute du modèle, qui fait la différence dans le texte final.
        </p>

        <ol className="space-y-4">
          {METHOD_STEPS.map((step) => (
            <li
              key={step.etape}
              className="flex gap-4 rounded-2xl border border-gray-200 bg-gray-50/60 p-5"
            >
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-black text-white"
                style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' }}
                aria-hidden="true"
              >
                {step.etape}
              </span>
              <div>
                <h3 className="text-base font-bold" style={{ color: '#1e1b4b' }}>
                  {step.titre}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{step.texte}</p>
              </div>
            </li>
          ))}
        </ol>
      </ArticleSection>

      {/* ── VALEURS ─────────────────────────────────────────────────────── */}
      <ArticleSection title="Ce à quoi nous tenons" icon={<Heart className="h-5 w-5" aria-hidden="true" />}>
        <div className="grid gap-4 sm:grid-cols-2">
          {VALEURS.map((valeur) => (
            <div
              key={valeur.titre}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-colors hover:border-indigo-200"
            >
              <span className="inline-flex items-center justify-center rounded-xl bg-indigo-50 p-2.5 text-indigo-600">
                {valeur.icone}
              </span>
              <h3 className="mt-3 text-base font-bold" style={{ color: '#1e1b4b' }}>
                {valeur.titre}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{valeur.texte}</p>
            </div>
          ))}
        </div>
      </ArticleSection>

      {/* ── ÉQUIPE ──────────────────────────────────────────────────────── */}
      <ArticleSection title="L’équipe" icon={<Users className="h-5 w-5" aria-hidden="true" />}>
        <p>
          ia-premium est un projet conduit par une petite équipe de profils complémentaires :
          rédaction et copywriting d’un côté, développement et ingénierie de modèles de l’autre.
          Cette double casquette est ce qui nous permet de juger un texte à la fois sur sa qualité
          rédactionnelle et sur la façon dont il a été produit.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            {
              role: 'Direction éditoriale',
              nom: '[À COMPLÉTER] — nom et prénom',
              texte:
                'Définit la méthode, la ligne éditoriale et la relecture qualité. Arbitre les compromis entre vitesse et exigence rédactionnelle.',
            },
            {
              role: 'Ingénierie IA',
              nom: '[À COMPLÉTER] — nom et prénom',
              texte:
                'Conçoit les pipelines de génération, l’architecture des briefs et les mécanismes de contrôle du ton et des formats de sortie.',
            },
            {
              role: 'Relation client',
              nom: '[À COMPLÉTER] — nom et prénom',
              texte:
                'Assure le support, traite les demandes de remboursement et remonte les attendus des utilisateurs vers la production.',
            },
          ].map((membre) => (
            <div
              key={membre.role}
              className="rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm"
            >
              <span
                className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl text-white"
                style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' }}
                aria-hidden="true"
              >
                <Users className="h-6 w-6" />
              </span>
              <p
                className="mt-3 text-xs font-bold uppercase tracking-wide text-indigo-600"
              >
                {membre.role}
              </p>
              <p className="mt-1 text-sm font-semibold" style={{ color: '#1e1b4b' }}>
                {membre.nom}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-gray-500">{membre.texte}</p>
            </div>
          ))}
        </div>

        <p className="mt-4 text-xs text-gray-400">
          Les identités de l’équipe sont volontairement laissées en placeholders : elles doivent
          être renseignées avec les informations réelles de l’éditeur avant publication.
        </p>
      </ArticleSection>

      {/* ── CHIFFRES ────────────────────────────────────────────────────── */}
      <ArticleSection title="Le service en quatre chiffres" icon={<TrendingUp className="h-5 w-5" aria-hidden="true" />}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((metric) => (
            <div
              key={metric.libelle}
              className="rounded-2xl p-5 text-center"
              style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #faf5ff 100%)' }}
            >
              <p className="text-3xl font-black" style={{ color: '#1e1b4b' }}>
                {metric.valeur}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-gray-600">{metric.libelle}</p>
            </div>
          ))}
        </div>
      </ArticleSection>

      {/* ── CITATION ────────────────────────────────────────────────────── */}
      <ArticleSection title="Ce que nous ne faisons pas" icon={<Quote className="h-5 w-5" aria-hidden="true" />}>
        <blockquote className="rounded-2xl border-l-4 border-indigo-500 bg-indigo-50/50 p-6">
          <p className="text-base italic leading-relaxed text-gray-700">
            « Le meilleur contenu généré par IA n’est pas celui qui ressemble le plus à un humain
            qui écrit. C’est celui qui respecte votre audience, votre ton et vos contraintes
            réelles. »
          </p>
          <footer className="mt-3 text-sm font-semibold" style={{ color: '#1e1b4b' }}>
            L’équipe ia-premium
          </footer>
        </blockquote>

        <SubHeading>Et si ce n’est pas ce que vous cherchez ?</SubHeading>
        <p>Nous préférons le dire : le moteur ne remplace ni un rédacteur pour un contenu stratégique, ni une relecture juridique ou réglementaire, ni une production filmée ou illustrée. Son terrain est le texte : contenu éditorial, marketing, e-mails, pages de vente, réseaux sociaux. Pour le reste, nous préférons vous orienter vers le bon prestataire.</p>
        <BulletList
          items={[
            'Vous avez besoin d’un contenu réglementé ou juridique : consultez un juriste, pas un moteur de génération.',
            'Vous cherchez une production photo, vidéo ou musicale : nous ne prétendons pas couvrir ce périmètre.',
            'Vous voulez un texte parfaitement conforme à une charte de marque très spécifique : c’est faisable, mais cela demande de fournir vos exemples de référence.',
          ]}
        />
      </ArticleSection>

      <CtaBand
        title="Jugez-nous sur un texte, pas sur une promesse"
        description="Le meilleur moyen de nous évaluer reste de produire un contenu avec le moteur et de voir s’il tient la route dans votre publication. La garantie de 14 jours existe précisément pour ça."
        secondaryLabel="Lire la FAQ"
        secondaryHref="/faq"
      />
    </PageShell>
  )
}
