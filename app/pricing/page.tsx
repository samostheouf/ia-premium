import type { Metadata } from 'next'
import { Check, Minus, HelpCircle, Sparkles, CreditCard, Zap, Infinity as InfinityIcon } from 'lucide-react'
import PageShell, { ArticleSection, SubHeading, BulletList, CtaBand } from '@/app/components/PageShell'
import PricingBuyButton from '@/app/components/PricingBuyButton'
import { absoluteUrl } from '@/lib/site'

// ─── Tarifs ──────────────────────────────────────────────────────────────────

const PLANS = [
  {
    id: 'unit' as const,
    nom: 'Accès Unitaire',
    prix: '49,90 €',
    baseline: 'Paiement unique',
    description:
      'L’accès complet au moteur de génération premium, sans limite de production. Idéal pour un·e créateur, un·e freelance ou une petite équipe qui veut produire régulièrement.',
    features: [
      'Générations illimitées',
      'Toutes les catégories de contenu',
      'Tous les formats de sortie',
      'Tous les tons disponibles',
      'Accès immédiat après paiement',
      'Support par e-mail sous 48 h',
    ],
  },
  {
    id: 'pack' as const,
    nom: 'Pack 5 — Licence Équipe',
    prix: '199,90 €',
    baseline: '5 crédits · paiement unique',
    description:
      'Cinq crédits de génération premium à partager entre cinq collaborateurs. Le format le plus juste pour une équipe ou une agence qui veut tester la qualité en volume avant de s’engager.',
    features: [
      '5 crédits de génération premium',
      'Jusqu’à 5 utilisateurs',
      'Formats flexibles (texte, Markdown, JSON)',
      'Support prioritaire sous 24 h',
      'Accès immédiat après paiement',
      'Générations additionnelles facturées au crédit',
    ],
  },
  {
    id: 'coffret' as const,
    nom: 'Coffret Illimité — Accès à vie',
    prix: '499,90 €',
    baseline: 'Paiement unique · accès à vie',
    description:
      'La formule la plus rentable : accès illimité à vie, toutes les fonctionnalités avancées et les mises à jour futures. C’est le choix de ceux qui produisent du contenu en continu.',
    features: [
      'Accès illimité à vie',
      'Toutes les fonctionnalités avancées',
      'Mises à jour futures incluses',
      'Support prioritaire sous 12 h',
      'Exports de lots et archivage',
      'Aucun abonnement, aucun renouvellement',
    ],
  },
]

/** Tableau comparatif : true = inclus, false = non inclus, string = nuance. */
type CellValue = boolean | string

const COMPARATIF: { label: string; values: [CellValue, CellValue, CellValue] }[] = [
  { label: 'Prix', values: ['49,90 €', '199,90 €', '499,90 €'] },
  { label: 'Prix par génération', values: ['Illimité', '40 € / crédit', 'Illimité'] },
  { label: 'Type de licence', values: ['Individuelle', 'Équipe (5 postes)', 'Individuelle étendue'] },
  { label: 'Nombre d’utilisateurs', values: ['1', '5', '1'] },
  { label: 'Générations incluses', values: ['Illimitées', '5 crédits', 'Illimitées'] },
  { label: 'Catégories de contenu', values: [true, true, true] },
  { label: 'Formats de sortie', values: ['Tous', 'Tous', 'Tous + export de lots'] },
  { label: 'Tons et registres', values: [true, true, true] },
  { label: 'Mises à jour futures', values: [false, false, true] },
  { label: 'Délai de réponse du support', values: ['48 h ouvrées', '24 h ouvrées', '12 h ouvrées'] },
  { label: 'Support prioritaire', values: [false, true, true] },
  { label: 'Archivage des productions', values: [false, false, true] },
  { label: 'Abonnement récurrent', values: [false, false, false] },
  { label: 'Garantie satisfaction', values: ['14 jours', '14 jours', '14 jours'] },
  { label: 'Paiement sécurisé Stripe', values: [true, true, true] },
]

const FAQ_TARIFAIRE = [
  {
    q: 'Quelle différence entre « Accès Unitaire » et « Pack 5 » ?',
    a: "L'Accès Unitaire vous donne un accès illimité au moteur pour un seul utilisateur : vous pouvez produire autant de contenus que vous le souhaitez, sans compteur. Le Pack 5 achète 5 crédits de génération à partager entre cinq collaborateurs : c'est la formule adaptée aux équipes qui veulent tester la qualité sur un volume défini, avec un support prioritaire. Si vous produisez seul et régulièrement, l'Accès Unitaire est plus rentable que le Pack 5.",
  },
  {
    q: 'Le Coffret Illimité est-il vraiment « à vie » ?',
    a: "Oui. Le Coffret à 499,90 € est un paiement unique, sans abonnement ni renouvellement automatique. Vous gardez l'accès au moteur et à toutes ses fonctionnalités, y compris celles ajoutées ultérieurement, tant que le service est exploité. Il n'y a pas de reconduction tacite : aucun montant ne sera jamais prélevé de votre compte sans nouvelle commande de votre part.",
  },
  {
    q: 'Y a-t-il des frais cachés ou un engagement récurrent ?',
    a: "Non. Le prix affiché est le prix payé : 49,90 €, 199,90 € ou 499,90 € TTC. Aucune commission, aucun frais de dossier, aucun abonnement mensuel, aucun prélèvement automatique ultérieur. Seule exception : le Pack 5, où des générations au-delà des 5 crédits inclus sont facturées au crédit à la commande — jamais par reconduction.",
  },
  {
    q: 'Puis-je changer de formule après l’achat ?',
    a: "Oui. Vous pouvez acheter une formule supérieure à tout moment : le montant déjà payé pour l'Accès Unitaire vous sera déduit du prix de la nouvelle formule lors d'un changement effectué dans les 30 jours. Un remboursement intégral reste possible pendant 14 jours, dans les conditions décrites dans nos conditions de remboursement.",
  },
  {
    q: 'Comment fonctionne la garantie de 14 jours ?',
    a: "Vous disposez de 14 jours à compter de la date d'achat pour demander le remboursement intégral de votre commande, sans avoir à motiver votre demande. Le seul motif de refus possible est la génération effective de contenus avec le moteur : voir le détail de l'exception applicable aux contenus numériques dans nos conditions de remboursement, qui est un point d'honnêteté que nous assumons.",
  },
  {
    q: 'Quels moyens de paiement acceptez-vous ?',
    a: "Le paiement est traité par Stripe, prestataire de paiement certifié PCI DSS niveau 1. Nous acceptons les principales cartes bancaires (Visa, Mastercard, American Express), ainsi que les moyens de paiement proposés par Stripe selon votre pays. Aucune donnée de carte ne transite ni n'est stockée sur nos serveurs.",
  },
  {
    q: 'Proposez-vous des tarifs pour les entreprises ou l’éducation ?',
    a: "Oui, nous étudions les volumes importants et les licences multi-sièges au cas par cas. Écrivez-nous via la page contact en précisant votre volume de générations et le nombre de postes concernés : nous revenons vers vous avec une proposition écrite sous 48 h ouvrées.",
  },
]

export const metadata: Metadata = {
  title: 'Tarifs — 49,90 €, 199,90 € et 499,90 € | ia-premium',
  description:
    'Découvrez les trois formules ia-premium : Accès Unitaire 49,90 €, Pack 5 à 199,90 € et Coffret Illimité à 499,90 €. Paiement unique, sans abonnement, comparaison détaillée et FAQ tarifaire.',
  alternates: { canonical: absoluteUrl('/pricing') },
  openGraph: {
    title: 'Tarifs ia-premium — contenu premium par IA',
    description:
      'Trois formules, un seul paiement, aucun abonnement. Comparaison détaillée et FAQ tarifaire.',
    url: absoluteUrl('/pricing'),
    type: 'website',
    locale: 'fr_FR',
  },
}

export default function PricingPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_TARIFAIRE.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  return (
    <PageShell
      title="Des tarifs simples, sans abonnement"
      description="Trois formules, un seul paiement. Vous choisissez le niveau qui correspond à votre volume de production — et vous n’avez jamais de reconduction automatique."
      breadcrumb={[{ name: 'Tarifs', href: '/pricing' }]}
      eyebrow="Tarifs"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── GRILLE DES 3 OFFRES ─────────────────────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-3">
        {PLANS.map((plan) => {
          const featured = plan.id === 'coffret'
          return (
            <article
              key={plan.id}
              className={`relative flex flex-col rounded-2xl border-2 p-6 transition-all duration-200 ${
                featured
                  ? 'border-indigo-500 bg-indigo-50/40 shadow-xl shadow-indigo-500/10 lg:-translate-y-3'
                  : 'border-gray-200 bg-white hover:border-indigo-300 hover:shadow-lg'
              }`}
            >
              {featured ? (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-1 text-xs font-bold text-white shadow-lg">
                  Meilleure valeur
                </span>
              ) : null}

              <header className="text-center">
                <h2 className="text-lg font-bold" style={{ color: '#1e1b4b' }}>
                  {plan.nom}
                </h2>
                <p className="mt-4 text-4xl font-black tracking-tight" style={{ color: '#1e1b4b' }}>
                  {plan.prix}
                </p>
                <p className="mt-1 text-xs font-medium text-gray-400">{plan.baseline}</p>
                <p className="mt-4 text-sm leading-relaxed text-gray-600">{plan.description}</p>
              </header>

              <ul className="my-6 flex-1 space-y-2.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600"
                      strokeWidth={3}
                      aria-hidden="true"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <PricingBuyButton variant={plan.id} />
            </article>
          )
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-gray-500">
        <span className="inline-flex items-center gap-1.5">
          <CreditCard className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" /> Paiement
          sécurisé Stripe (PCI DSS)
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Zap className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" /> Accès immédiat après
          paiement
        </span>
        <span className="inline-flex items-center gap-1.5">
          <InfinityIcon className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" /> Aucun
          abonnement
        </span>
      </div>

      {/* ── TABLEAU COMPARATIF ──────────────────────────────────────────── */}
      <ArticleSection
        title="Comparatif détaillé des formules"
        icon={<HelpCircle className="h-5 w-5" aria-hidden="true" />}
      >
        <SubHeading>Ce que couvre chaque formule</SubHeading>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <caption className="sr-only">
              Comparaison des trois formules ia-premium : Accès Unitaire, Pack 5 et Coffret Illimité
            </caption>
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th scope="col" className="w-[34%] py-3 pr-4 font-bold" style={{ color: '#1e1b4b' }}>
                  Fonctionnalité
                </th>
                {PLANS.map((plan) => (
                  <th
                    key={plan.id}
                    scope="col"
                    className={`px-3 py-3 text-center font-bold ${
                      plan.id === 'coffret' ? 'text-indigo-700' : ''
                    }`}
                    style={plan.id === 'coffret' ? undefined : { color: '#1e1b4b' }}
                  >
                    {plan.nom}
                    <span className="mt-1 block text-xs font-medium text-gray-400">{plan.prix}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARATIF.map((row, rowIndex) => (
                <tr
                  key={row.label}
                  className={`border-b border-gray-100 ${rowIndex % 2 === 1 ? 'bg-gray-50/60' : ''}`}
                >
                  <th scope="row" className="py-3 pr-4 font-medium text-gray-700">
                    {row.label}
                  </th>
                  {row.values.map((value, colIndex) => (
                    <td
                      key={`${row.label}-${colIndex}`}
                      className={`px-3 py-3 text-center ${
                        colIndex === 2 ? 'bg-indigo-50/40' : ''
                      }`}
                    >
                      {typeof value === 'string' ? (
                        <span className="font-semibold text-gray-700">{value}</span>
                      ) : value ? (
                        <Check
                          className="mx-auto h-4 w-4 text-emerald-600"
                          strokeWidth={3}
                          aria-label="Inclus"
                        />
                      ) : (
                        <Minus
                          className="mx-auto h-4 w-4 text-gray-300"
                          aria-label="Non inclus"
                        />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-gray-400">
          Prix indiqués TTC. Toutes les formules sont des paiements uniques : aucun renouvellement
          automatique n’est mis en place.
        </p>
      </ArticleSection>

      {/* ── FAQ TARIFAIRE ────────────────────────────────────────────────── */}
      <ArticleSection title="Questions fréquentes sur les tarifs" icon={<HelpCircle className="h-5 w-5" aria-hidden="true" />}>
        <div className="space-y-3">
          {FAQ_TARIFAIRE.map((item) => (
            <details
              key={item.q}
              className="group rounded-xl border border-gray-200 bg-white open:border-indigo-200 open:bg-indigo-50/30"
            >
              <summary className="cursor-pointer list-none px-5 py-4 text-sm font-bold text-gray-800 transition-colors hover:text-indigo-700">
                <span className="flex items-start justify-between gap-4">
                  {item.q}
                  <span
                    className="mt-0.5 shrink-0 text-indigo-500 transition-transform duration-200 group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className="border-t border-gray-100 px-5 py-4 text-sm leading-relaxed text-gray-600">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </ArticleSection>

      <ArticleSection title="Comment choisir en 30 secondes ?" icon={<Sparkles className="h-5 w-5" aria-hidden="true" />}>
        <BulletList
          items={[
            'Vous produisez seul·e et régulièrement ? Prenez l’Accès Unitaire à 49,90 € : le meilleur rapport prix/souplesse.',
            'Vous êtes une équipe de 2 à 5 personnes et vous voulez tester ? Le Pack 5 à 199,90 € vous laisse le volume nécessaire pour décider.',
            'Vous publiez plusieurs fois par semaine et votre contenu est au cœur de votre activité ? Le Coffret à 499,90 € est le seul choix rationnel.',
            'Vous hésitez encore ? Prenez l’Accès Unitaire : la garantie de 14 jours vous permet de tester la qualité réelle avant tout autre investissement.',
          ]}
        />
      </ArticleSection>

      <CtaBand
        title="Prêt à produire votre premier contenu premium ?"
        description="Accès immédiat après paiement, facture disponible, et une garantie de 14 jours pour vous rassurer. Aucune carte bancaire ne sera débitée au-delà du montant affiché."
        secondaryLabel="Lire la FAQ"
        secondaryHref="/faq"
      />
    </PageShell>
  )
}
