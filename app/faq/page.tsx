import type { Metadata } from 'next'
import { MessageCircleQuestion, Sparkles, FileText, SlidersHorizontal, ShieldCheck, Clock } from 'lucide-react'
import PageShell, { ArticleSection, CtaBand } from '@/app/components/PageShell'
import FaqAccordion, { type FaqItem } from '@/app/components/FaqAccordion'
import { absoluteUrl } from '@/lib/site'

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const FAQ_GENERATION: FaqItem[] = [
  {
    question: 'Comment fonctionne réellement la génération de contenu ?',
    answer:
      "Le moteur repose sur un modèle de langage de dernière génération affiné avec des modèles rédactionnels : briefs structurés, architectures persuasives, tests de ton et passes de relecture. Concrètement, vous fournissez un brief (cible, objectif, message clé, ton, format) et le moteur construit le texte en suivant la même méthode qu’un copywriter senior : angle d'attaque, hiérarchie d'arguments, preuves, call-to-action. Vous récupérez un texte prêt à publier ou à intégrer dans votre workflow, pas un brouillon générique.",
  },
  {
    question: 'Faut-il savoir promptner pour utiliser le moteur ?',
    answer:
      "Non. Le moteur est conçu pour être piloté par un brief structuré (produced, audience, ton, longueur, format) plutôt que par un prompt technique. Si vous savez écrire trois lignes de contexte, vous obtenez un excellent résultat. Les personnes qui découvrent l’IA obtiennent en général un texte exploitable dès la première génération, et les plus expertes gagnent en contrôle via les options avancées : ton, angle narratif, densité d’arguments.",
  },
  {
    question: 'Le contenu généré est-il vraiment exploitable en production ?',
    answer:
      "Oui, à condition de le traiter comme une base de travail plutôt que comme un livrable jetable. Les textes produits sont rédigés dans un registre professionnel, exempts de remplissage et calibrés pour l'usage visé. Ils constituent un point de départ de qualité supérieure à la moyenne du marché : la dernière passe de relecture humaine reste recommandée pour les contenus stratégiques (pages de vente, communiqués, contenus réglementés), et nous vous le disons franchement plutôt que de promettre une automatisation totale.",
  },
]

const FAQ_FORMATS: FaqItem[] = [
  {
    question: 'Quels formats de sortie sont disponibles ?',
    answer:
      "Trois formats au choix : texte brut (pour un copier-coller direct), Markdown (titres, listes et emphases structurés, idéal pour un blog ou une documentation) et JSON (champs nommés et typés, pour alimenter un CMS, un site web ou une chaîne de production automatisée). Le format s choisit au moment de la génération et s'adapte au canal de diffusion : pas de reformattage manuel fastidieux.",
  },
  {
    question: 'Puis-je réutiliser le même contenu sur plusieurs canaux ?',
    answer:
      "Oui, et c'est même l'un des principaux intérêts du moteur. Une même idée de base peut être déclinée en email d'ouverture de campagne, en post LinkedIn, en accroche de publicité et en section de landing page : chaque sortie respecte le code et les contraintes du canal (longueur, ton, structure), tout en conservant la cohérence de votre message. La licence acquise vous autorise un usage commercial illimité des contenus produits.",
  },
  {
    question: 'Quelle longueur de texte peux-je obtenir ?',
    answer:
      "De 50 mots (accroche, légende, objet d'e-mail) à plusieurs milliers de mots (guide, page de vente longue, livre blanc). Vous indiquez la longueur cible et le moteur ajuste la densité d'arguments pour la respecter : la structure s'adapte au format demandé plutôt que de produire un texte tronqué ou gavé de remplissage.",
  },
]

const FAQ_TONS: FaqItem[] = [
  {
    question: 'Comment fonctionne le choix du ton ?',
    answer:
      "Le ton n'est pas une case à cocher cosmétique : il modifie le vocabulaire, la longueur des phrases, le rythme et le degré de familiarité. Vous choisissez un registre (créatif, direct, luxueux, analytique, pédagogique, persuasif, chaleureux) et le moteur ajuste la diction en conséquence. C'est ce réglage qui fait la différence entre un texte qui ressemble à une publicité et un texte qui ressemble à la voix de votre marque.",
  },
  {
    question: 'Puis-je imposer un ton qui ressemble à ma marque ?',
    answer:
      "Oui, et c'est le meilleur usage du moteur. En fournissant des exemples de votre communication existante (page, e-mail, post), le moteur calibre le vocabulaire, les tournures et le rythme sur votre propre voix. La cohérence de marque reste ainsi intacte d'un canal à l'autre, ce qui est exactement ce qu'un outil générique ne sait pas faire.",
  },
  {
    question: 'Puis-je corriger ou réécrire un passage après génération ?',
    answer:
      "Oui, et c'est la démarche recommandée. Vous pouvez demander une réécriture ciblée d'un paragraphe, un changement de ton sur une section précise, un raccourcissement, ou une variante A/B d'un accroche. Le moteur travaille à la granularité du paragraphe comme du document complet, ce qui permet d'affiner un texte sans repartir de zéro.",
  },
]

const FAQ_GARANTIE: FaqItem[] = [
  {
    question: 'Que couvre exactement la garantie ?',
    answer:
      "Nous garantissons deux choses. La première est la disponibilité : l'accès au moteur fonctionne et vos générations aboutissent normalement. La seconde est la constance de la qualité : le niveau de finition reste celui décrit sur cette page : registre professionnel, structure cohérente, absence de remplissage. Si ce n’est pas le cas, nous reprenons le dossier — nous préservons votre accès ou nous vous remboursons intégralement. La garantie de remboursement de 14 jours complète ce dispositif.",
  },
  {
    question: 'Puis-je être remboursé si le résultat ne me convient pas ?',
    answer:
      "Oui : vous disposez de 14 jours après l'achat pour demander le remboursement intégral, sans avoir à motiver votre demande. En revanche, nous appliquons l'exception légale prévue pour les contenus numériques : si vous avez effectivement généré du contenu avec le moteur, le droit de rétractation ne s'applique pas, car la valeur du service vous a déjà été fournie et ne peut pas être rendue. Cette règle est annoncée à l’achat et détaillée dans nos conditions de remboursement — nous préférons l'expliquer plutôt que la passer sous silence.",
  },
  {
    question: "Combien de temps faut-il pour obtenir un remboursement ?",
    answer:
      "Le remboursement est traité sous 5 jours ouvrés après réception de votre demande via la page contact. Le montant est restitué sur le moyen de paiement d'origine (carte bancaire), selon le délai de traitement de votre banque — généralement 5 à 10 jours ouvrés supplémentaires. Aucun frais de traitement ne vous est facturé.",
  },
  {
    question: 'Mes données et mes briefs sont-ils confidentiels ?',
    answer:
      "Oui. Vos briefs sont utilisés uniquement pour produire le contenu demandé et ne sont ni revendus ni partagés à des tiers à des fins commerciales. Ils sont traités conformément au RGPD et conservés pendant la durée nécessaire au service, puis supprimés. Les paiements sont gérés par Stripe, prestataire certifié PCI DSS niveau 1 : aucune donnée de carte ne transite par nos serveurs. Le détail des durées de conservation figure dans notre politique de confidentialité.",
  },
]

const CATEGORIES: { titre: string; icone: React.ReactNode; id: string; items: FaqItem[] }[] = [
  {
    titre: 'Fonctionnement et qualité de la génération',
    icone: <Sparkles className="h-5 w-5" aria-hidden="true" />,
    id: 'faq-generation',
    items: FAQ_GENERATION,
  },
  {
    titre: 'Formats de sortie et réutilisation',
    icone: <FileText className="h-5 w-5" aria-hidden="true" />,
    id: 'faq-formats',
    items: FAQ_FORMATS,
  },
  {
    titre: 'Tons, registres et personnalisation',
    icone: <SlidersHorizontal className="h-5 w-5" aria-hidden="true" />,
    id: 'faq-tons',
    items: FAQ_TONS,
  },
  {
    titre: 'Garantie, remboursement et confidentialité',
    icone: <ShieldCheck className="h-5 w-5" aria-hidden="true" />,
    id: 'faq-garantie',
    items: FAQ_GARANTIE,
  },
]

const ALL_FAQ = CATEGORIES.flatMap((category) => category.items)

export const metadata: Metadata = {
  title: 'FAQ — Questions fréquentes | ia-premium',
  description:
    'Réponses aux 10 questions les plus fréquentes sur la génération de contenu IA : fonctionnement, formats de sortie (texte, Markdown, JSON), tons et registres, garantie et remboursement, confidentialité.',
  alternates: { canonical: absoluteUrl('/faq') },
  openGraph: {
    title: 'FAQ ia-premium — génération de contenu IA',
    description:
      'Fonctionnement, formats, tons, garantie : toutes les réponses aux questions fréquentes sur notre moteur de contenu premium.',
    url: absoluteUrl('/faq'),
    type: 'website',
    locale: 'fr_FR',
  },
}

export default function FaqPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: ALL_FAQ.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

  return (
    <PageShell
      title="Questions fréquentes"
      description="Tout ce qu’il faut savoir avant de lancer votre première génération : fonctionnement du moteur, formats de sortie, réglage du ton, garantie et remboursement."
      breadcrumb={[{ name: 'FAQ', href: '/faq' }]}
      eyebrow="FAQ"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mb-10 flex items-center justify-center gap-3 rounded-2xl border border-indigo-200 bg-indigo-50/60 px-5 py-4">
        <MessageCircleQuestion className="h-5 w-5 shrink-0 text-indigo-600" aria-hidden="true" />
        <p className="text-sm text-gray-700">
          <span className="font-bold" style={{ color: '#1e1b4b' }}>
            {ALL_FAQ.length} questions
          </span>
          <span className="text-gray-500">
            {' '}
            — réponses complètes, sans formulation commerciale. Vous ne trouvez pas la vôtre ?{' '}
          </span>
          <a href="/contact" className="font-semibold text-indigo-700 underline">
            Écrivez-nous
          </a>
          .
        </p>
      </div>

      <div className="space-y-12">
        {CATEGORIES.map((category) => (
          <ArticleSection
            key={category.id}
            title={category.titre}
            icon={category.icone}
            id={category.id}
          >
            <FaqAccordion items={category.items} idPrefix={category.id} />
          </ArticleSection>
        ))}
      </div>

      <ArticleSection
        title="Délais et support"
        icon={<Clock className="h-5 w-5" aria-hidden="true" />}
      >
        <p>
          Le support répond sous 48 h ouvrées pour la formule Accès Unitaire, sous 24 h pour le Pack
          5 et sous 12 h pour le Coffret Illimité. Le service est assuré du lundi au vendredi, de
          9 h à 18 h (heure de Paris). Les demandes de remboursement sont traitées selon les
          conditions détaillées dans notre{' '}
          <a href="/conditions-remboursement" className="font-semibold text-indigo-700 underline">
            politique de remboursement
          </a>
          .
        </p>
      </ArticleSection>

      <CtaBand
        title="Une question reste sans réponse ?"
        description="Écrivez-nous : nous répondons sous 48 h ouvrées, et votre question alimente directement cette FAQ si elle revient souvent."
        primaryLabel="Poser ma question"
        primaryHref="/contact"
        secondaryLabel="Voir les tarifs"
        secondaryHref="/pricing"
      />
    </PageShell>
  )
}
