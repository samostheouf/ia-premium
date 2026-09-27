import type { Metadata } from 'next'
import Link from 'next/link'
import { Cookie, Shield, Check, X, Clock, MousePointerClick, Settings, Eye, Globe } from 'lucide-react'
import PageShell, { ArticleSection, SubHeading, Callout, CtaBand } from '@/app/components/PageShell'
import { COMPANY, SITE, absoluteUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Politique cookies | ia-premium',
  description:
    "Politique cookies d'ia-premium : cookies strictement nécessaires, cookies de mesure d’audience soumis à consentement, finalités, durées de conservation, modalités de gestion du consentement et de retrait.",
  alternates: { canonical: absoluteUrl('/politique-cookies') },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Politique cookies — ia-premium',
    description:
      'Quels cookies utilisons, pourquoi, combien de temps, et comment accepter, refuser ou retirer votre consentement.',
    url: absoluteUrl('/politique-cookies'),
    type: 'website',
    locale: 'fr_FR',
  },
}

const COOKIES_NECESSAIRES = [
  {
    nom: 'ia_premium_consent',
    finalite: "Mémoriser votre choix d'accepter, de refuser ou de personnaliser les cookies.",
    duree: '12 mois',
    type: 'Consentement',
  },
  {
    nom: 'ia_premium_session',
    finalite: "Maintenir votre session ouverte et assurer la sécurisation de l'accès au Service.",
    duree: 'Session',
    type: 'Nécessaire',
  },
  {
    nom: 'stripe_*',
    finalite: "Sécuriser et faire fonctionner le parcours de paiement. Ces cookies sont déposés par le prestataire de paiement.",
    duree: 'Jusqu’à 24 mois',
    type: 'Nécessaire',
  },
]

const COOKIES_MESURE = [
  {
    nom: 'ia_premium_analytics_id',
    finalite:
      "Mesurer l'audience du Site de façon agrégée (pages consultées, provenance) afin d'améliorer le service.",
    duree: '13 mois',
    type: 'Mesure d’audience',
  },
  {
    nom: '_vercel_insights',
    finalite:
      "Recueillir des statistiques d'utilisation anonymisées et agrégées, sans identification des visiteurs.",
    duree: '13 mois',
    type: 'Mesure d’audience',
  },
]

export default function PolitiqueCookiesPage() {
  return (
    <PageShell
      title="Politique cookies"
      description="Les cookies sont de petits fichiers déposés sur votre appareil lors de la navigation. Cette page explique précisément lesquels nous utilisons, pourquoi, combien de temps, et comment gérer vos préférences à tout moment."
      breadcrumb={[{ name: 'Politique cookies', href: '/politique-cookies' }]}
      eyebrow="Document juridique"
      width="prose"
      updatedAt={SITE.legalUpdated}
    >
      <Callout tone="info" title="Notre position en deux lignes">
        <ul className="mt-2 space-y-1.5">
          {[
            'Aucun cookie publicitaire, aucun cookie de reciblage, aucun traceur tiers à des fins de profilage.',
            'Les cookies de mesure d’audience ne sont déposés qu’après votre consentement explicite, que vous pouvez retirer à tout moment.',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" strokeWidth={3} aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Callout>

      <div className="mt-8">
        <ArticleSection
          title="1. Qu’est-ce qu’un cookie ?"
          icon={<Cookie className="h-5 w-5" aria-hidden="true" />}
        >
          <p>
            Un cookie est un petit fichier texte déposé par un site web sur le terminal de
            l’utilisateur (ordinateur, tablette, smartphone) lorsqu’il consulte ce site. Il permet de
            conserver des informations ou de suivre l’utilisation du site.
          </p>
          <p>
            D’autres technologies peuvent jouer un rôle similaire : les localStorage et sessionStorage
            du navigateur, ou les pixels invisibles. Nous les traitons dans cette page au même titre
            que les cookies, lorsqu’ils servent à la même finalité : c’est la raison pour laquelle
            votre choix de consentement s’applique à l’ensemble de ces traceurs.
          </p>
        </ArticleSection>

        <ArticleSection
          title="2. Ce que nous n’utilisons pas"
          icon={<Shield className="h-5 w-5" aria-hidden="true" />}
        >
          <p>
            Nous nous efforçons de limiter le recours aux traceurs au strict nécessaire. Voici ce
            que nous n’utilisons <strong className="font-bold">pas</strong> :
          </p>
          <ul className="ml-1 space-y-2">
            {[
              'Aucun cookie publicitaire ni de reciblage (publicité comportementale).',
              'Aucun réseau social pixel (Facebook, LinkedIn, TikTok, etc.) intégrés à des fins de suivi.',
              'Aucun traceur de collecte de données à large échelle revendu à des tiers.',
              'Aucune technique de pistage du lecteur entre différents sites à des fins publicitaires.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <X className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" strokeWidth={3} aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </ArticleSection>

        <ArticleSection
          title="3. Cookies strictement nécessaires"
          icon={<Shield className="h-5 w-5" aria-hidden="true" />}
        >
          <p>
            Ces cookies sont indispensables au fonctionnement du Site et ne peuvent pas être
            désactivés : ils ne sont pas soumis à consentement, conformément à l’article 82 de la loi
            Informatique et Libertés. Leur dépôt ne nécessite pas votre accord préalable, car ils ne
            permettent pas de vous suivre à travers d’autres sites.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-left text-sm">
              <caption className="sr-only">Cookies strictement nécessaires</caption>
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th scope="col" className="py-3 pr-4 font-bold" style={{ color: '#1e1b4b' }}>
                    Nom
                  </th>
                  <th scope="col" className="px-3 py-3 font-bold" style={{ color: '#1e1b4b' }}>
                    Finalité
                  </th>
                  <th scope="col" className="px-3 py-3 font-bold" style={{ color: '#1e1b4b' }}>
                    Durée
                  </th>
                </tr>
              </thead>
              <tbody>
                {COOKIES_NECESSAIRES.map((item) => (
                  <tr key={item.nom} className="border-b border-gray-100 align-top">
                    <th scope="row" className="py-3 pr-4 font-mono text-xs font-semibold text-gray-700">
                      {item.nom}
                    </th>
                    <td className="px-3 py-3 text-gray-600">{item.finalite}</td>
                    <td className="px-3 py-3 text-gray-600">{item.duree}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ArticleSection>

        <ArticleSection
          title="4. Cookies de mesure d’audience"
          icon={<MousePointerClick className="h-5 w-5" aria-hidden="true" />}
        >
          <p>
            Ces cookies nous permettent de comprendre comment le Site est utilisé : pages les plus
            consultées, parcours de navigation, sources de trafic. Ils sont déposés{' '}
            <strong className="font-bold">uniquement après votre consentement</strong>, recueilli via
            le bandeau qui s’affiche lors de votre première visite. Vous pouvez refuser ce consentement
            sans que cela affecte votre navigation.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-left text-sm">
              <caption className="sr-only">Cookies de mesure d’audience soumis à consentement</caption>
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th scope="col" className="py-3 pr-4 font-bold" style={{ color: '#1e1b4b' }}>
                    Nom
                  </th>
                  <th scope="col" className="px-3 py-3 font-bold" style={{ color: '#1e1b4b' }}>
                    Finalité
                  </th>
                  <th scope="col" className="px-3 py-3 font-bold" style={{ color: '#1e1b4b' }}>
                    Durée
                  </th>
                </tr>
              </thead>
              <tbody>
                {COOKIES_MESURE.map((item) => (
                  <tr key={item.nom} className="border-b border-gray-100 align-top">
                    <th scope="row" className="py-3 pr-4 font-mono text-xs font-semibold text-gray-700">
                      {item.nom}
                    </th>
                    <td className="px-3 py-3 text-gray-600">{item.finalite}</td>
                    <td className="px-3 py-3 text-gray-600">{item.duree}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Callout tone="success" title="Ces données sont agrégées">
            <p>
              Les statistiques collectées ne permettent pas de vous identifier
              individuellement et ne sont pas utilisées à des fins publicitaires. Vous pouvez
              refuser ces cookies et continuer à utiliser le Site sans aucune restriction
              fonctionnelle.
            </p>
          </Callout>
        </ArticleSection>

        <ArticleSection
          title="5. Gestion de votre consentement"
          icon={<Settings className="h-5 w-5" aria-hidden="true" />}
        >
          <p>
            Lors de votre première visite, un bandeau vous permet d’accepter, de refuser ou de
            personnaliser les cookies non nécessaires. Votre choix est mémorisé et ne vous est plus
            demandé.
          </p>
          <p>
            Conformément à l’article 82 de la loi Informatique et Libertés, ce consentement est{' '}
            <strong className="font-bold">libre, spécifique, éclairé et révocable</strong>. Vous
            pouvez le retirer à tout moment, sans que cela remette en cause la licéité du traitement
            effectué avant ce retrait, comme l’exige l’article 7.3 du RGPD.
          </p>
          <SubHeading>Retirer votre consentement</SubHeading>
          <p>Deux moyens sont à votre disposition, à tout moment :</p>
          <ul className="ml-1 space-y-2">
            {[
              'Depuis le bandeau : si celui-ci est encore affiché sur votre session, un bouton permet de modifier votre choix.',
              'Depuis votre navigateur : effacer les cookies du site dans les réglages de votre navigateur, puis recharger la page pour que le bandeau s’affiche à nouveau.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-gray-600">
            Important : le retrait du consentement n’emporte pas annulation rétroactive des
            traitements déjà effectués, conformément à l’article 7.3 du RGPD. Il signifie
            simplement qu’aucun nouveau traceur non nécessaire ne sera déposé à l’avenir.
          </p>
        </ArticleSection>

        <ArticleSection
          title="6. Durées de conservation"
          icon={<Clock className="h-5 w-5" aria-hidden="true" />}
        >
          <p>
            Les cookies de mesure d’audience sont conservés{' '}
            <strong className="font-bold">13 mois maximum</strong> à compter de leur dépôt, dans la
            limite fixée par les recommandations de la Commission nationale de l’informatique et des
            libertés (CNIL) pour les cookies de mesure d’audience n’excédant pas le seuil de
            l’exemption.
          </p>
          <p>
            Le cookie de mémorisation du consentement est conservé 12 mois : au-delà, il est
            considéré comme expiré et votre choix vous est de nouveau demandé. Les cookies de
            session sont supprimés à la fermeture du navigateur.
          </p>
        </ArticleSection>

        <ArticleSection
          title="7. Destinataires et transferts"
          icon={<Globe className="h-5 w-5" aria-hidden="true" />}
        >
          <p>
            Les cookies de mesure d’audience sont exploités par notre infrastructure d’hébergement{' '}
            ({COMPANY.hebergeur.nom}) et par nos prestataires d’analyse, agissant en qualité de
            sous-traitants au sens de l’article 28 du RGPD. Ces prestataires sont liés par des
            clauses contractuelles imposant la confidentialité et la protection des données.
          </p>
          <p>
            Certains de ces prestataires étant établis hors de l’Union européenne, les transferts
            sont encadrés par les instruments prévus au chapitre V du RGPD, notamment les clauses
            contractuelles types de la Commission européenne. Le détail figure dans notre{' '}
            <Link href="/politique-confidentialite" className="font-semibold text-indigo-700 underline">
              politique de confidentialité
            </Link>
            .
          </p>
        </ArticleSection>

        <ArticleSection
          title="8. Cookies de tiers et contenu intégré"
          icon={<Eye className="h-5 w-5" aria-hidden="true" />}
        >
          <p>
            Si des contenus provenant de plateformes tierces étaient intégrés sur le Site (par exemple
            une vidéo, une carte ou un contenu social), ces services tiers pourraient déposer leurs
            propres cookies, sur lesquels nous n’exerçons aucun contrôle. Nous n’intégrons à ce jour
            aucun contenu tiers de ce type sur nos pages.
          </p>
          <p>
            Les seuls cookies déposés par un tiers le sont dans le cadre du parcours de paiement
            sécurisé, par le prestataire de paiement. Ils sont soumis à la même obligation de
            sécurité et ne sont utilisés qu’à cette fin.
          </p>
        </ArticleSection>

        <ArticleSection
          title="9. Modifier la présente politique"
          icon={<Settings className="h-5 w-5" aria-hidden="true" />}
        >
          <p>
            La présente politique peut être mise à jour pour tenir compte de changements techniques,
            réglementaires ou de notre organisation. La date de dernière mise à jour figure en haut
            de page. En cas de modification substantielle affecting les traceurs utilisés, une
            nouvelle demande de consentement vous sera présentée.
          </p>
        </ArticleSection>
      </div>

      <CtaBand
        title="Une question sur vos données ?"
        description="Le retrait du consentement est gratuit et immédiat. Pour toute question sur les cookies ou l’exercice de vos droits RGPD, écrivez-nous : nous répondons sous 48 h ouvrées."
        primaryLabel="Nous contacter"
        primaryHref="/contact"
        secondaryLabel="Lire la politique de confidentialité"
        secondaryHref="/politique-confidentialite"
      />
    </PageShell>
  )
}
