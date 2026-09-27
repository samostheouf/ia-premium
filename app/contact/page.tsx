import type { Metadata } from 'next'
import { Mail, MapPin, Clock, MessageCircle, LifeBuoy, AlertTriangle, ExternalLink } from 'lucide-react'
import PageShell, { ArticleSection, SubHeading, Callout } from '@/app/components/PageShell'
import ContactForm from '@/app/components/ContactForm'
import { COMPANY, absoluteUrl } from '@/lib/site'

// ─── Contact ─────────────────────────────────────────────────────────────────

const DELAIS = [
  {
    formule: 'Accès Unitaire — 49,90 €',
    delai: '48 h ouvrées',
    detail: 'Du lundi au vendredi, 9 h – 18 h (heure de Paris).',
  },
  {
    formule: 'Pack 5 — 199,90 €',
    delai: '24 h ouvrées',
    detail: 'Support prioritaire, y compris pour les questions de facturation.',
  },
  {
    formule: 'Coffret Illimité — 499,90 €',
    delai: '12 h ouvrées',
    detail: 'Priorité absolue, y compris pour les demandes de remboursement.',
  },
]

export const metadata: Metadata = {
  title: 'Contact — Parler à l’équipe | ia-premium',
  description:
    'Contactez l’équipe ia-premium : formulaire de contact, coordonnées, délais de réponse selon votre formule et sur les demandes de remboursement.',
  alternates: { canonical: absoluteUrl('/contact') },
  openGraph: {
    title: 'Contact — équipe ia-premium',
    description: 'Une question sur le moteur, une facture ou un remboursement ? Écrivez-nous.',
    url: absoluteUrl('/contact'),
    type: 'website',
    locale: 'fr_FR',
  },
}

export default function ContactPage() {
  const emailIsPlaceholder = COMPANY.email.startsWith('[À COMPLÉTER]')

  return (
    <PageShell
      title="Écrivez-nous"
      description="Une question sur le moteur, un souci technique, une demande de facture ou de remboursement ? Le formulaire ci-dessous est le plus rapide — nous répondons à toutes les demandes."
      breadcrumb={[{ name: 'Contact', href: '/contact' }]}
      eyebrow="Contact"
    >
      <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
        {/* ── FORMULAIRE ───────────────────────────────────────────────── */}
        <div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-xl text-white"
                style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' }}
                aria-hidden="true"
              >
                <MessageCircle className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-lg font-bold" style={{ color: '#1e1b4b' }}>
                  Formulaire de contact
                </h2>
                <p className="text-sm text-gray-500">Réponse sous 48 h ouvrées.</p>
              </div>
            </div>
            <ContactForm />
          </div>

          <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50/70 p-6">
            <h3 className="text-sm font-bold" style={{ color: '#1e1b4b' }}>
              Avant d’écrire : vérifiez ces deux pages
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>
                La{' '}
                <a href="/faq" className="font-semibold text-indigo-700 underline">
                  FAQ
                </a>{' '}
                couvre le fonctionnement, les formats de sortie, les tons et la garantie.
              </li>
              <li>
                Les{' '}
                <a href="/conditions-remboursement" className="font-semibold text-indigo-700 underline">
                  conditions de remboursement
                </a>{' '}
                précisent le délai de 14 jours et l’exception applicable aux contenus numériques.
              </li>
            </ul>
          </div>
        </div>

        {/* ── COORDONNÉES ──────────────────────────────────────────────── */}
        <aside className="space-y-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2.5 text-base font-bold" style={{ color: '#1e1b4b' }}>
              <Mail className="h-4 w-4 text-indigo-600" aria-hidden="true" />
              Coordonnées
            </h2>

            <dl className="mt-5 space-y-4 text-sm">
              <div>
                <dt className="font-semibold" style={{ color: '#1e1b4b' }}>
                  Adresse e-mail
                </dt>
                <dd className="mt-0.5 text-gray-600">
                  {emailIsPlaceholder ? (
                    <span className="font-mono text-[13px] text-amber-700 underline decoration-amber-400 underline-offset-2">
                      {COMPANY.email}
                    </span>
                  ) : (
                    <a
                      href={`mailto:${COMPANY.email}`}
                      className="text-indigo-700 underline underline-offset-2"
                    >
                      {COMPANY.email}
                    </a>
                  )}
                </dd>
              </div>

              <div>
                <dt className="font-semibold" style={{ color: '#1e1b4b' }}>
                  Téléphone
                </dt>
                <dd className="mt-0.5 text-gray-600">{COMPANY.telephone}</dd>
              </div>

              <div>
                <dt className="flex items-center gap-1.5 font-semibold" style={{ color: '#1e1b4b' }}>
                  <MapPin className="h-3.5 w-3.5 text-indigo-600" aria-hidden="true" />
                  Siège social
                </dt>
                <dd className="mt-0.5 text-gray-600">
                  {COMPANY.raisonSociale}
                  <br />
                  {COMPANY.adresseSiege}
                  <br />
                  {COMPANY.codePostalSiege} {COMPANY.villeSiege}
                </dd>
              </div>
            </dl>

            {emailIsPlaceholder ? (
              <p className="mt-5 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-800">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                Les coordonnées de contact sont des placeholders à compléter dans{' '}
                <code className="rounded bg-amber-100 px-1">lib/site.ts</code> avant la mise en
                production.
              </p>
            ) : null}
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2.5 text-base font-bold" style={{ color: '#1e1b4b' }}>
              <Clock className="h-4 w-4 text-indigo-600" aria-hidden="true" />
              Délais de réponse
            </h2>
            <ul className="mt-4 space-y-3">
              {DELAIS.map((item) => (
                <li
                  key={item.formule}
                  className="rounded-xl border border-gray-200 bg-gray-50/60 p-3.5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold" style={{ color: '#1e1b4b' }}>
                      {item.formule}
                    </span>
                    <span className="shrink-0 rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-bold text-indigo-700">
                      {item.delai}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-gray-500">{item.detail}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-gray-400">
              Les demandes de remboursement sont traitées selon un calendrier propre, détaillé dans
              nos conditions de remboursement : 5 jours ouvrés après réception de la demande.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2.5 text-base font-bold" style={{ color: '#1e1b4b' }}>
              <LifeBuoy className="h-4 w-4 text-indigo-600" aria-hidden="true" />
              Besoin d’une réponse juridique ?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              Pour toute question relative à vos droits, à l’exécution du contrat ou à la
              protection de vos données, les documents suivants font foi et sont rédigés pour être
              lus :
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                { href: '/cgv', label: 'Conditions générales de vente' },
                { href: '/conditions-remboursement', label: 'Conditions de remboursement' },
                { href: '/politique-confidentialite', label: 'Politique de confidentialité' },
                { href: '/mentions-legales', label: 'Mentions légales' },
              ].map((doc) => (
                <li key={doc.href}>
                  <a
                    href={doc.href}
                    className="inline-flex items-center gap-1.5 font-semibold text-indigo-700 underline underline-offset-2"
                  >
                    {doc.label}
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <div className="mt-12">
        <ArticleSection title="Questions fréquentes avant de contacter le support" icon={<LifeBuoy className="h-5 w-5" aria-hidden="true" />}>
          <SubHeading>« Comment fonctionne le moteur ? »</SubHeading>
          <p>
            Vous fournissez un brief (cible, objectif, message clé, ton, format) et le moteur
            construit le texte en suivant la méthode d’un copywriter senior : cadrage, architecture,
            réécriture au niveau du paragraphe, passe de relecture, puis formatage. La réponse
            détaillée est dans la{' '}
            <a href="/faq" className="font-semibold text-indigo-700 underline">
              FAQ
            </a>
            .
          </p>

          <SubHeading>« Puis-je me faire rembourser ? »</SubHeading>
          <p>
            Vous disposez de 14 jours après l’achat, sans avoir à motiver votre demande. En
            revanche, l’exception prévue par le Code de la consommation pour les contenus numériques
            s’applique : si vous avez généré du contenu avec le moteur, le droit de rétractation ne
            s’applique pas. C’est indiqué clairement au moment de l’achat et détaillé dans nos{' '}
            <a href="/conditions-remboursement" className="font-semibold text-indigo-700 underline">
              conditions de remboursement
            </a>
            .
          </p>

          <SubHeading>« Mes briefs sont-ils réutilisés ailleurs ? »</SubHeading>
          <p>
            Non. Vos briefs servent exclusivement à produire le contenu demandé. Ils ne sont ni
            revendus ni partagés à des tiers à des fins commerciales, et ils sont supprimés à
            l’issue de leur durée de conservation. Le détail figure dans notre{' '}
            <a href="/politique-confidentialite" className="font-semibold text-indigo-700 underline">
              politique de confidentialité
            </a>
            .
          </p>

          <Callout tone="success" title="Nous répondons à toutes les demandes">
            <p>
              Y compris aux questions présentes dans la FAQ et aux questions sur la facturation. Pour
              nous aider à vous répondre plus vite, précisez le numéro de commande (format{' '}
              <code className="rounded bg-emerald-100 px-1">ia-premium-XXXX</code>) et la formule
              concernée.
            </p>
          </Callout>
        </ArticleSection>
      </div>
    </PageShell>
  )
}