import type { Metadata } from 'next'

import CheckoutButton from '@/app/components/CheckoutButton'
import {
  BASE_URL,
  HOME_FAQS,
  buildFaqPageJsonLd,
  buildMetadata,
  buildOrganizationJsonLd,
  buildWebSiteJsonLd,
  serializeJsonLd,
} from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  // `absolute` : la home ne doit PAS hériter du template '%s | IA Premium'
  // du layout, sinon le titre deviendrait « ... | IA Premium | IA Premium ».
  title: { absolute: 'IA Premium — Contenu Premium par Intelligence Artificielle' },
  description:
    "Générez des textes professionnels par IA : copywriting, emails marketing, landing pages, réseaux sociaux et storytelling. Qualité premium, paiement unique, sans abonnement.",
  path: '/',
})

// Prix affichés — repris de lib/stripe.ts (constantes dupliquées côté serveur
// pour ne pas embarquer le SDK Stripe dans le bundle).
const PRICES = {
  unit: { amount: 4990 },
  pack: { amount: 19990 },
  coffret: { amount: 49990 },
} as const;

type Variant = keyof typeof PRICES;

function formatPrice(amountCents: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(amountCents / 100);
}

const TIERS: {
  id: Variant;
  label: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  icon: string;
  highlighted: boolean;
}[] = [
  {
    id: 'unit',
    label: 'Contenu Premium — Accès unitaire',
    price: formatPrice(PRICES.unit.amount),
    description: 'Accès illimité au moteur de génération de contenu premium. Idéal pour les professionnels et créateurs.',
    features: [
      'Génération illimitée',
      'Tous les formats de sortie',
      'Tous les tons disponibles',
      'Accès immédiat après paiement',
    ],
    cta: 'Acheter 49,90€',
    icon: '⚡',
    highlighted: false,
  },
  {
    id: 'pack',
    label: 'Pack 5 — 5 générations premium',
    price: formatPrice(PRICES.pack.amount),
    description: '5 crédits de génération premium. Parfait pour tester ou pour les équipes qui veulent une licence groupée.',
    features: [
      '5 générations premium',
      'Qualité supérieure garantie',
      'Formats flexibles',
      'Support prioritaire',
    ],
    cta: 'Acquérir le pack 199,90€',
    icon: '📦',
    highlighted: false,
  },
  {
    id: 'coffret',
    label: 'Coffret Illimité — Accès à vie',
    price: formatPrice(PRICES.coffret.amount),
    description: 'Accès complet et illimité au moteur premium avec toutes les fonctionnalités avancées. Paiement unique, sans abonnement.',
    features: [
      'Accès illimité à vie',
      'Toutes fonctionnalités incluses',
      'Mises à jour futures incluses',
      'Priorité absolue',
    ],
    cta: 'Prendre l\'illimité 499,90€',
    icon: '👑',
    highlighted: true,
  },
];

const FEATURES = [
  {
    icon: '✨',
    title: 'Contenu de qualité professionnelle',
    desc: 'Résultats exploitables immédiatement, rédigés avec rigueur.',
  },
  {
    icon: '⚡',
    title: 'Génération rapide',
    desc: 'Contenu premium en quelques secondes, zéro compromis.',
  },
  {
    icon: '🎯',
    title: 'Copywriting persuasif',
    desc: 'Textes conçus pour convertir : pages de vente, emails, réseaux sociaux.',
  },
  {
    icon: '📱',
    title: 'Multi-formats de sortie',
    desc: 'Texte brut, Markdown, JSON structuré — adapté à votre workflow.',
  },
  {
    icon: '🌍',
    title: 'Ton personnalisable',
    desc: 'Créatif, direct, luxueux, analytique, persuasif — choisissez.',
  },
  {
    icon: '🔒',
    title: 'Paiement unique, sans abonnement',
    desc: 'Aucun engagement récurrent. Accès immédiat après paiement Stripe.',
  },
];

// ─── Données structurées (Organization + WebSite + FAQPage) ──────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [buildOrganizationJsonLd(), buildWebSiteJsonLd(), buildFaqPageJsonLd(HOME_FAQS)],
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        // Contenu statique issu de lib/seo.ts — aucune donnée utilisateur.
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden px-4 pt-24 pb-16 sm:px-6 lg:px-8 premium-bg-gradient">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(99,102,241,0.25)_0%,_transparent_50%)] pointer-events-none" />
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm backdrop-blur mb-6">
            <span className="text-indigo-300 font-semibold">IA PREMIUM</span>
            <span className="bg-indigo-500/30 text-indigo-200 px-2 py-0.5 rounded-full text-xs font-bold">Nouveau</span>
          </div>
          <h1 className="mt-4 text-4xl sm:text-6xl font-black tracking-tight leading-[0.95] text-white">
            Contenu Premium
            <br />
            <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              par Intelligence Artificielle
            </span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-indigo-200/80 max-w-2xl mx-auto">
            Un moteur de génération premium. Copywriting, réseaux sociaux, emails, landing pages, storytelling.
            <span className="block mt-1 text-white font-semibold">Qualité professionnelle, résultats exploitables.</span>
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 text-xs text-indigo-300/80">
            <span className="bg-white/10 border border-white/10 rounded-full px-3 py-1.5">✨ Contenu premium</span>
            <span className="bg-white/10 border border-white/10 rounded-full px-3 py-1.5">⚡ Génération rapide</span>
            <span className="bg-white/10 border border-white/10 rounded-full px-3 py-1.5">🎯 Copywriting persuasif</span>
            <span className="bg-white/10 border border-white/10 rounded-full px-3 py-1.5">🔒 Paiement unique</span>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="tarifs" className="px-4 sm:px-6 lg:px-8 pb-16 scroll-mt-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-black" style={{ color: '#1e1b4b' }}>Trois niveaux de premium</h2>
            <p className="mt-2 text-gray-500 max-w-xl mx-auto">
              Choisissez le niveau qui correspond à votre usage. Paiement unique, pas d&rsquo;abonnement.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`relative rounded-2xl p-6 border-2 transition-all ${
                  tier.highlighted
                    ? 'border-purple-500 bg-purple-50/50 shadow-xl shadow-purple-500/10 scale-[1.02] z-10'
                    : 'border-gray-200 bg-white hover:border-indigo-200 hover:shadow-lg'
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                    Meilleure valeur
                  </div>
                )}
                <div className="text-center mb-6">
                  <div className="text-3xl mb-2">{tier.icon}</div>
                  <h3 className="text-xl font-bold" style={{ color: '#1e1b4b' }}>{tier.label}</h3>
                  <p className="mt-1 text-gray-500 text-sm">{tier.description}</p>
                </div>

                <div className="text-center mb-6">
                  <div className="text-4xl font-black" style={{ color: '#1e1b4b' }}>{tier.price}</div>
                  <p className="text-xs text-gray-400 mt-1">Paiement unique — sans abonnement</p>
                </div>

                <ul className="space-y-3 mb-6 text-left">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm" style={{ color: '#4b5563' }}>
                      <span className="text-purple-500 mt-0.5 flex-shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <CheckoutButton variant={tier.id} label={tier.cta} className="w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20" style={{ backgroundColor: '#f9fafb' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black" style={{ color: '#1e1b4b' }}>Pourquoi ia-premium ?</h2>
            <p className="mt-2 text-gray-500">Une approche « humaine + cadrage » : le contenu est bâti comme un copywriter senior le ferait.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="p-5 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-2xl">{f.icon}</span>
                <h3 className="mt-3 text-lg font-bold" style={{ color: '#1e1b4b' }}>{f.title}</h3>
                <p className="mt-1 text-sm" style={{ color: '#6b7280' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — le contenu visible correspond au JSON-LD FAQPage */}
      <section id="faq" className="px-4 sm:px-6 lg:px-8 pb-20 scroll-mt-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-10" style={{ color: '#1e1b4b' }}>
            Questions fréquentes
          </h2>
          <div className="space-y-3">
            {HOME_FAQS.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-gray-200 bg-white px-5 py-4 hover:border-indigo-200 transition-colors"
              >
                <summary className="cursor-pointer font-semibold list-none flex items-center justify-between gap-4" style={{ color: '#1e1b4b' }}>
                  {faq.question}
                  <span className="text-indigo-500 transition-transform group-open:rotate-45 text-xl leading-none" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-4 sm:px-6 lg:px-8 py-8 border-t" style={{ borderColor: '#e5e7eb', backgroundColor: '#fff' }}>
        <div className="max-w-5xl mx-auto text-center text-sm" style={{ color: '#9ca3af' }}>
          © ia-premium — Contenu premium par IA. Paiement sécurisé par Stripe.
        </div>
      </footer>
    </main>
  );
}
