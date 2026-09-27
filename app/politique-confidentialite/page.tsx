import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Shield,
  Database,
  Target,
  Scale,
  Clock,
  Users,
  Eye,
  Cookie,
  Lock,
  Mail,
  Globe,
  FileText,
  Check,
} from 'lucide-react'
import PageShell, { ArticleSection, SubHeading, Callout, LegalField, CtaBand } from '@/app/components/PageShell'
import { COMPANY, SITE, absoluteUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Politique de confidentialité (RGPD) | ia-premium',
  description:
    "Politique de confidentialité d'ia-premium conforme au RGPD : responsable du traitement, données collectées, finalités, bases légales, durées de conservation, destinataires, transferts hors UE, sécurité, cookies et droits d'accès, rectification, effacement, limitation, portabilité et opposition.",
  alternates: { canonical: absoluteUrl('/politique-confidentialite') },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Politique de confidentialité — ia-premium',
    description:
      'Comment vos données personnelles sont collectées, utilisées, conservées et supprimées, et comment exercer vos droits RGPD.',
    url: absoluteUrl('/politique-confidentialite'),
    type: 'website',
    locale: 'fr_FR',
  },
}

const CATEGORIES = [
  {
    titre: 'Données d’identification et de contact',
    icone: <Users className="h-5 w-5" aria-hidden="true" />,
    items: [
      'Adresse e-mail (communiquée lors de la commande ou via le formulaire de contact).',
      'Nom et prénom (uniquement si vous les communiquez dans le formulaire de contact).',
      'Objet et contenu du message transmis via le formulaire de contact.',
    ],
  },
  {
    titre: 'Données de commande et de facturation',
    icone: <FileText className="h-5 w-5" aria-hidden="true" />,
    items: [
      'Référence de la commande, formule souscrite, montant et date de paiement.',
      'Adresse de facturation, lorsqu’elle est fournie lors du paiement.',
      'Historique des transactions demandé au prestataire de paiement.',
      'Aucun numéro de carte bancaire : les données de paiement sont traitées exclusivement par le prestataire de paiement.',
    ],
  },
  {
    titre: 'Données d’utilisation du Service',
    icone: <Database className="h-5 w-5" aria-hidden="true" />,
    items: [
      'Briefs soumis au moteur de génération et contenus produits en réponse.',
      'Paramètres de génération sélectionnés (ton, format de sortie, catégorie de contenu, longueur).',
      'Horodatage des générations et volume de crédits consommé.',
    ],
  },
  {
    titre: 'Données de connexion et de navigation',
    icone: <Globe className="h-5 w-5" aria-hidden="true" />,
    items: [
      'Adresse IP, type de navigateur, système d’exploitation et résolution d’écran.',
      'Pages visitées, pages de référence et horodatage des visites.',
      'Identifiants de session et événements de mesure d’audience, sous réserve de votre consentement.',
    ],
  },
]

const FINALITES = [
  {
    finalite: 'Exécution du contrat',
    base: 'Article 6.1.b RGPD',
    detail:
      'Traiter votre commande, ouvrir votre accès au moteur, fournir le Service et répondre à vos demandes liées à votre achat.',
  },
  {
    finalite: 'Facturation et comptabilité',
    base: 'Article 6.1.b et 6.1.c RGPD',
    detail:
      'Émettre les factures, assurer le suivi des paiements et respecter nos obligations comptables et fiscales légales.',
  },
  {
    finalite: 'Sécurité et prévention de la fraude',
    base: 'Article 6.1.f RGPD (intérêt légitime)',
    detail:
      'Sécuriser le Site, détecter les tentatives de fraude et les abus, et protéger l’intégrité de nos systèmes.',
  },
  {
    finalite: 'Amélioration et mesure d’audience',
    base: 'Article 6.1.f RGPD (intérêt légitime)',
    detail:
      'Analyser l’usage du Site de façon agrégée afin d’en améliorer la fiabilité et la pertinence. Vous pouvez vous opposer à ce traitement à tout moment.',
  },
  {
    finalite: 'Cookies et mesure d’audience',
    base: 'Article 6.1.a RGPD (consentement)',
    detail:
      'Déposer des cookies de mesure d’audience et publicité, uniquement après votre consentement recueilli via le bandeau dédié.',
  },
  {
    finalite: 'Communication commerciale',
    base: 'Article 6.1.a RGPD (consentement)',
    detail:
      'Vous adresser la lettre d’information à laquelle vous vous êtes inscrit. Vous pouvez vous désinscrire à tout moment, sans que cela remette en cause la licéité du traitement antérieur.',
  },
  {
    finalite: 'Réponse aux demandes',
    base: 'Article 6.1.b RGPD',
    detail:
      'Traiter les demandes d’accès, de rectification, d’effacement, de limitation, de portabilité et d’opposition, ainsi que les demandes de remboursement.',
  },
]

const CONSERVATION = [
  {
    donnees: 'Données de compte et d’accès au Service',
    duree: 'Durée de la relation contractuelle, puis 3 mois après la dernière connexion',
  },
  {
    donnees: 'Données de commande et factures',
    duree: '10 ans à compter de la date de la facture (obligation légale comptable et fiscale)',
  },
  {
    donnees: 'Briefs et contenus générés',
    duree: 'Durée de l’accès au Service, puis suppression ou anonymisation dans les 30 jours',
  },
  {
    donnees: 'Messages du formulaire de contact',
    duree: '3 ans à compter du dernier échange',
  },
  {
    donnees: 'Données de connexion (logs serveur)',
    duree: '12 mois maximum',
  },
  {
    donnees: 'Cookies de mesure d’audience',
    duree: '13 mois maximum, dans la limite de la durée de conservation recommandée par la CNIL',
  },
  {
    donnees: 'Newsletter',
    duree: 'Jusqu’au retrait du consentement, puis suppression immédiate',
  },
]

const DROITS = [
  {
    droit: "Droit d'accès (article 15)",
    detail:
      'Obtenir la confirmation que vos données sont traitées et en recevoir une copie exploitable.',
  },
  {
    droit: 'Droit de rectification (article 16)',
    detail: 'Faire corriger des données inexactes ou incomplètes.',
  },
  {
    droit: "Droit à l'effacement (article 17)",
    detail: 'Demander l’effacement de vos données lorsque les conditions sont réunies.',
  },
  {
    droit: 'Droit à la limitation du traitement (article 18)',
    detail: 'Demander que le traitement soit suspendu, le cas échéant, le temps d’un examen.',
  },
  {
    droit: 'Droit à la portabilité (article 20)',
    detail:
      'Recevoir vos données dans un format structuré et couramment utilisé, pour les transférer à un autre responsable de traitement.',
  },
  {
    droit: "Droit d'opposition (article 21)",
    detail:
      'Vous opposer, pour des motifs tenant à votre situation particulière, à un traitement fondé sur l’intérêt légitime ou à la prospection.',
  },
  {
    droit: 'Droit de retirer votre consentement (article 7.3)',
    detail:
      'Retirer à tout moment votre consentement, sans que cela ne remette en cause la licéité du traitement effectué auparavant.',
  },
  {
    droit: 'Directives relatives au sort après votre décès (article 13)',
    detail:
      'Définir le sort de vos données après votre décès (conservation, effacement ou transmission).',
  },
]

export default function PolitiqueConfidentialitePage() {
  return (
    <PageShell
      title="Politique de confidentialité"
      description="Comment vos données personnelles sont collectées, utilisées, conservées et supprimées — et comment exercer vos droits, conformément au RGPD."
      breadcrumb={[{ name: 'Politique de confidentialité', href: '/politique-confidentialite' }]}
      eyebrow="Document juridique"
      width="prose"
      updatedAt={SITE.legalUpdated}
    >
      <Callout tone="info" title="En résumé, en trois points">
        <ul className="mt-2 space-y-1.5">
          {[
            'Nous ne vendons pas vos données et ne les partageons jamais à des fins commerciales.',
            'Vos briefs servent uniquement à produire le contenu demandé, puis sont supprimés.',
            'Vous pouvez demander l’accès, la rectification, l’effacement, la portabilité et l’opposition à tout moment, gratuitement.',
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
          title="1. Responsable du traitement"
          icon={<Users className="h-5 w-5" aria-hidden="true" />}
        >
          <p>
            Le responsable du traitement des données à caractère personnel collectées via le Site{' '}
            {SITE.url} est l’éditeur du Site :
          </p>
          <div className="space-y-2 rounded-xl border border-gray-200 bg-gray-50/60 p-5">
            <LegalField label="Dénomination sociale" value={COMPANY.raisonSociale} />
            <LegalField label="Siège social" value={COMPANY.adresseSiege} />
            <LegalField label="SIREN" value={COMPANY.siren} />
            <LegalField label="Adresse e-mail" value={COMPANY.email} />
            <LegalField label="Téléphone" value={COMPANY.telephone} />
          </div>
          <SubHeading>Contact « données personnelles »</SubHeading>
          <p>
            Toute demande relative à la protection des données peut être adressée à l’adresse
            e-mail ci-dessus, en indiquant l’objet « Données personnelles », ou par courrier au
            siège social. En cas de désaccord sur la manière dont nous traitons vos données, vous
            pouvez introduire une réclamation auprès de la CNIL (3 place de Fontenoy, TSA 80715,
            75334 Paris Cedex 07 ; {''}
            <a
              href="https://www.cnil.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-indigo-700 underline"
            >
              www.cnil.fr
            </a>
            ).
          </p>
          <p>
            Le Site n’est pas destiné à des mineurs de moins de 15 ans. L’éditeur ne collecte pas
            sciemment de données concernant des mineurs de moins de 15 ans ; s’il constatait qu’un
            compte a été créé par un mineur, il procéderait à sa suppression sans délai.
          </p>
        </ArticleSection>

        <ArticleSection
          title="2. Données collectées"
          icon={<Database className="h-5 w-5" aria-hidden="true" />}
        >
          <p>
            Nous ne collectons aucune donnée par le simple fait de visiter le Site, à l’exception des
            données techniques strictement nécessaires à la fourniture du service (adresse IP,
            journaux de connexion). Les catégories de données collectées sont les suivantes :
          </p>

          <div className="space-y-5">
            {CATEGORIES.map((categorie) => (
              <div key={categorie.titre}>
                <h3
                  className="flex items-center gap-2 text-base font-bold"
                  style={{ color: '#1e1b4b' }}
                >
                  <span className="text-indigo-600">{categorie.icone}</span>
                  {categorie.titre}
                </h3>
                <ul className="ml-1 mt-2 space-y-2">
                  {categorie.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <SubHeading>Ce que nous ne collectons pas</SubHeading>
          <ul className="ml-1 space-y-2">
            {[
              'Aucune donnée dite « sensible » au sens de l’article 9 du RGPD (origine, opinions politiques ou religieuses, santé, orientation sexuelle, données biométriques) ne doit nous être communiquée. Si vous nous transmettez de telles données, nous les supprimerons sans les traiter.',
              'Aucun numéro de carte bancaire : les données de paiement sont traitées par le prestataire de paiement et ne transitent jamais par nos serveurs.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </ArticleSection>

        <ArticleSection
          title="3. Finalités et bases légales des traitements"
          icon={<Target className="h-5 w-5" aria-hidden="true" />}
        >
          <p>
            Chaque traitement repose sur une base légale identifiée, conformément à l’article 6 du
            RGPD. La table ci-dessous récapitule les finalités poursuivies, leur base légale et leur
            portée.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <caption className="sr-only">
                Correspondance entre les finalités poursuivies et les bases légales des traitements
              </caption>
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th scope="col" className="py-3 pr-4 font-bold" style={{ color: '#1e1b4b' }}>
                    Finalité
                  </th>
                  <th scope="col" className="px-3 py-3 font-bold" style={{ color: '#1e1b4b' }}>
                    Base légale
                  </th>
                  <th scope="col" className="px-3 py-3 font-bold" style={{ color: '#1e1b4b' }}>
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {FINALITES.map((item) => (
                  <tr key={item.finalite} className="border-b border-gray-100 align-top">
                    <th scope="row" className="py-3 pr-4 font-semibold text-gray-700">
                      {item.finalite}
                    </th>
                    <td className="px-3 py-3 text-xs text-gray-500">{item.base}</td>
                    <td className="px-3 py-3 text-gray-600">{item.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ArticleSection>

        <ArticleSection
          title="4. Durées de conservation"
          icon={<Clock className="h-5 w-5" aria-hidden="true" />}
        >
          <p>
            Les données sont conservées pendant la durée strictement nécessaire à la finalité
          poursuivie. Les durées applicables sont les suivantes :
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-left text-sm">
              <caption className="sr-only">Durées de conservation des données personnelles</caption>
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th scope="col" className="py-3 pr-4 font-bold" style={{ color: '#1e1b4b' }}>
                    Catégorie de données
                  </th>
                  <th scope="col" className="px-3 py-3 font-bold" style={{ color: '#1e1b4b' }}>
                    Durée de conservation
                  </th>
                </tr>
              </thead>
              <tbody>
                {CONSERVATION.map((item) => (
                  <tr key={item.donnees} className="border-b border-gray-100 align-top">
                    <th scope="row" className="py-3 pr-4 font-semibold text-gray-700">
                      {item.donnees}
                    </th>
                    <td className="px-3 py-3 text-gray-600">{item.duree}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-gray-600">
            À l’expiration de ces durées, les données sont supprimées ou anonymisées de manière
            irréversible. La conservation de nature comptable et fiscale est justifiée par nos
            obligations légales et ne peut pas être raccourcie à la demande du client.
          </p>
        </ArticleSection>

        <ArticleSection
          title="5. Destinataires des données"
          icon={<Users className="h-5 w-5" aria-hidden="true" />}
        >
          <p>
            Vos données sont traitées par le personnel habilité de l’éditeur et peuvent être
            communiquées aux catégories de destinataires suivantes :
          </p>
          <ul className="ml-1 space-y-2">
            {[
              `Hébergement : ${COMPANY.hebergeur.nom}, pour l’hébergement technique du Site.`,
              `Paiement : ${COMPANY.prestatairePaiement}, pour le traitement sécurisé des transactions. Le prestataire de paiement agit en qualité de sous-traitant au sens de l’article 28 du RGPD.`,
              'Sous-traitants techniques : prestataires de services assurant la délivrance du Service et la sécurité du Site.',
              'Autorités administratives et judiciaires : en cas d’obligation légale, de réquisition ou de demande d’une autorité compétente.',
              'Défense : dans le cadre d’une procédure contentieuse, lorsque la communication est nécessaire à la défense de nos droits.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Callout tone="success" title="Aucun transfert commercial de vos données">
            <p>
              Nous ne vendons pas vos données à des tiers et ne les mettons pas à disposition de
              partenaires publicitaires. Vos briefs et les contenus générés ne sont jamais utilisés
              pour entraîner ou améliorer des modèles tiers.
            </p>
          </Callout>
        </ArticleSection>

        <ArticleSection
          title="6. Transferts en dehors de l’Union européenne"
          icon={<Globe className="h-5 w-5" aria-hidden="true" />}
        >
          <p>
            Certains de nos prestataires sont établis hors de l’Union européenne. Lorsqu’un transfert
            de données personnelles vers un pays tiers est réalisé, il est encadré par l’un des
            instruments prévus par le chapitre V du RGPD :
          </p>
          <ul className="ml-1 space-y-2">
            {[
              'Les clauses contractuelles types (CCT) adoptées par la Commission européenne en application de l’article 46.1 du RGPD.',
              'Un niveau adéquat de protection reconnu par la Commission européenne, le cas échéant.',
              'Des garanties supplémentaires appropriées, notamment des mesures techniques et organisationnelles renforcées.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-gray-600">
            Vous pouvez obtenir, sur demande adressée à notre contact « données personnelles », les
            informations relatives aux transferts réalisés et aux garanties correspondantes.
          </p>
        </ArticleSection>

        <ArticleSection
          title="7. Sécurité des données"
          icon={<Lock className="h-5 w-5" aria-hidden="true" />}
        >
          <p>
            Nous mettons en œuvre les mesures techniques et organisationnelles appropriées pour
            protéger vos données contre la perte, l’accès non autorisé, la divulgation, la
            modification ou la destruction :
          </p>
          <ul className="ml-1 space-y-2">
            {[
              'Chiffrement des échanges entre votre navigateur et nos serveurs (TLS/SSL).',
              'Chiffrement au repos des données sensibles et des secrets de configuration.',
              'Hébergement sur une infrastructure offrant des garanties de disponibilité et de résilience.',
              'Traitement des paiements par un prestataire certifié PCI DSS niveau 1, sans stockage de données de carte chez nous.',
              'Accès aux données restreint aux personnes habilitées, selon le principe du moindre privilège.',
              'Protection de l’accès à l’espace personnel par un mot de passe et limitation des tentatives de connexion.',
              'Journalisation des accès et des événements de sécurité.',
              'Sauvegardes régulières des données nécessaires à la fourniture du Service.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-gray-600">
            En cas de violation de données susceptible d’engendrer un risque élevé pour vos droits
            et libertés, nous en informons l’autorité de contrôle compétente dans les 72 heures
            suivant sa connaissance, conformément à l’article 33 du RGPD, et vous en informons dans
            la mesure où la loi l’autorise.
          </p>
        </ArticleSection>

        <ArticleSection title="8. Vos droits" icon={<Scale className="h-5 w-5" aria-hidden="true" />}>
          <p>
            Conformément aux articles 15 à 22 du RGPD, vous disposez des droits suivants sur vos
            données à caractère personnel :
          </p>
          <div className="space-y-3">
            {DROITS.map((item) => (
              <div
                key={item.droit}
                className="rounded-xl border border-gray-200 bg-gray-50/60 p-4"
              >
                <p className="text-sm font-bold" style={{ color: '#1e1b4b' }}>
                  {item.droit}
                </p>
                <p className="mt-1 text-sm text-gray-600">{item.detail}</p>
              </div>
            ))}
          </div>

          <SubHeading>Comment exercer vos droits</SubHeading>
          <p>
            Adressez votre demande à notre contact « données personnelles » (voir article 1), par
            e-mail de préférence. Précisez l’objet « Données personnelles », l’adresse e-mail associée
            à votre compte et le droit concerné. Pour toute demande d’accès à vos briefs et contenus,
            le numéro de commande facilite le traitement.
          </p>
          <ul className="ml-1 space-y-2">
            {[
              'Délai de réponse : un mois à compter de la réception de la demande.',
              'Aucun frais : l’exercice de vos droits est gratuit.',
              'Preuve d’identité : en cas de doute raisonnable sur votre identité, nous pouvons vous demander une pièce justificative, uniquement pour les besoins de la vérification.',
              'Refus : en cas de refus, nous vous en indiquons les motifs et vous informons de votre droit d’introduire une réclamation auprès de la CNIL.',
              'Réclamations : vous pouvez introduire une réclamation auprès de la CNIL à tout moment.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </ArticleSection>

        <ArticleSection
          title="9. Cookies et traceurs"
          icon={<Cookie className="h-5 w-5" aria-hidden="true" />}
        >
          <p>
            Le Site utilise des cookies et traceurs nécessaires à son fonctionnement, ainsi que des
            cookies de mesure d’audience soumis à consentement. Le détail des cookies utilisés, de
            leurs finalités et de leur durée de conservation figure dans notre{' '}
            <Link href="/politique-cookies" className="font-semibold text-indigo-700 underline">
              politique cookies
            </Link>
            .
          </p>
          <p>
            Vos préférences peuvent être modifiées à tout moment depuis le bandeau de consentement
            ou depuis les réglages de votre navigateur. Le refus des cookies non nécessaires ne
            compromet pas l’accès au Site, mais peut limiter certaines fonctionnalités.
          </p>
        </ArticleSection>

        <ArticleSection
          title="10. Modification de la politique"
          icon={<FileText className="h-5 w-5" aria-hidden="true" />}
        >
          <p>
            La présente politique peut être mise à jour pour tenir compte des évolutions
            legislationnelles, techniques ou organisationnelles. La date de dernière mise à jour est
            indiquée en haut de page. En cas de modification substantielle, les utilisateurs
            concernés sont informés par e-mail ou par une notification dans leur espace personnel.
          </p>
        </ArticleSection>

        <ArticleSection
          title="11. Nous contacter"
          icon={<Mail className="h-5 w-5" aria-hidden="true" />}
        >
          <p>
            Pour toute question relative à la protection de vos données personnelles, à l’exercice
            de vos droits ou à la présente politique, écrivez-nous :
          </p>
          <div className="space-y-2 rounded-xl border border-gray-200 bg-gray-50/60 p-5">
            <LegalField label="Responsable du traitement" value={COMPANY.raisonSociale} />
            <LegalField label="Adresse postale" value={COMPANY.adresseSiege} />
            <LegalField label="Adresse e-mail" value={COMPANY.email} />
          </div>
          <p>
            Vous pouvez également utiliser le{' '}
            <Link href="/contact" className="font-semibold text-indigo-700 underline">
              formulaire de contact
            </Link>{' '}
            en indiquant l’objet « Données personnelles ». Nous nous engageons à répondre dans un
            délai d’un mois, et signalons un délai de réponse plus court lorsqu’il est possible.
          </p>
          <Callout tone="info" title="Autorité de contrôle">
            <p>
              Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés,
              vous pouvez saisir la Commission nationale de l’informatique et des libertés (CNIL) :
              3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07 —{' '}
              <a
                href="https://www.cnil.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-indigo-700 underline"
              >
                www.cnil.fr
              </a>
              .
            </p>
          </Callout>
        </ArticleSection>
      </div>

      <CtaBand
        title="Exercer un droit prend moins d’un mois"
        description="Accès, rectification, effacement, portabilité, opposition : écrivez-nous, c’est gratuit et sans justification. Nous répondons à chaque demande."
        primaryLabel="Nous contacter"
        primaryHref="/contact"
        secondaryLabel="Lire nos CGV"
        secondaryHref="/cgv"
      />
    </PageShell>
  )
}
