import type { Metadata } from 'next'
import Link from 'next/link'
import { RotateCcw, Clock, Check, X, AlertTriangle, Scale, CreditCard, Mail, FileText } from 'lucide-react'
import PageShell, { ArticleSection, SubHeading, Callout, NumberedList, CtaBand } from '@/app/components/PageShell'
import { COMPANY, SITE, absoluteUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Conditions de remboursement | ia-premium',
  description:
    "Politique de remboursement d'ia-premium : droit de rétractation de 14 jours, exception applicable aux contenus numériques, cas de remboursement, pièces à fournir, délais de traitement et modalités de restitution.",
  alternates: { canonical: absoluteUrl('/conditions-remboursement') },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Conditions de remboursement — ia-premium',
    description:
      '14 jours, exception contenu numérique expliquée, délais et modalités de remboursement.',
    url: absoluteUrl('/conditions-remboursement'),
    type: 'website',
    locale: 'fr_FR',
  },
}

const CAS_REMBOURSEMENT = [
  {
    cas: "Vous n'avez généré aucun contenu",
    eligible: true,
    detail:
      "Le remboursement intégral de votre commande vous est accordé, sans avoir à motiver votre demande. C'est le cas le plus courant et le plus simple.",
  },
  {
    cas: 'Le Service ne fonctionne pas ou reste inaccessible',
    eligible: true,
    detail:
      "Un défaut technique récurrent non résolu, ou une impossibilité d'accéder au moteur malgré une commande valide, ouvre droit à remboursement intégral, y compris si des contenus ont été générés.",
  },
  {
    cas: 'La qualité ne correspond pas à ce qui est décrit sur le Site',
    eligible: true,
    detail:
      "Si le niveau de finition obtenu ne correspond pas aux caractéristiques annoncées (registre professionnel, structure, absence de remplissage), vous pouvez demander un remboursement ou un avoir. L'exception de rétractation ne vous prive pas de ce droit, qui relève de la garantie de conformité.",
  },
  {
    cas: 'Erreur lors de la commande (mauvaise formule, double achat)',
    eligible: true,
    detail:
      "Un achat de la mauvaise formule ou un double achat est remboursé intégralement, sur simple demande, sans condition de génération.",
  },
  {
    cas: 'Vous avez généré des contenus et souhaitez vous rétracter',
    eligible: false,
    detail:
      "L'exception prévue par l'article L.221-28 12° du Code de la consommation s'applique : la valeur du Service vous a été fournie et ne peut être rendue. Ce cas est détaillé ci-dessous et ne peut donner lieu à remboursement.",
  },
  {
    cas: "Le résultat ne vous plaît pas (goût, ton, angle)"
    , eligible: false,
    detail:
      "Il ne s'agit ni d'un défaut de conformité, ni d'un manquement du Vendeur : le brief, le ton et la qualité attendue relèvent de votre appréciation éditoriale. Ce cas n'ouvre pas droit à remboursement.",
  },
  {
    cas: 'Vous avez obtenu un remboursement pour ce même achat',
    eligible: false,
    detail:
      "Une même commande ne peut faire l'objet que d'une seule demande de remboursement, afin d'éviter les doubles remboursements.",
  },
  {
    cas: 'La demande est formulée après le délai de 14 jours',
    eligible: false,
    detail:
      "Passé le délai légal, seules les demandes relatives à un défaut de conformité du Service, à un vice caché ou à une erreur de facturation restent examinables.",
  },
]

const DELAI_TRAITEMENT = [
  { etape: 'Demande', detail: "Vous nous transmettez votre demande depuis la page contact." },
  { etape: 'Vérification', detail: "Nous vérifions l'éligibilité et les informations de la commande sous 2 jours ouvrés." },
  { etape: 'Décision', detail: "Nous vous communiquons la décision et le cas échéant le justificatif de refus." },
  { etape: 'Remboursement', detail: "Le montant est restitué sur votre moyen de paiement d'origine sous 5 jours ouvrés." },
  { etape: 'Banque', detail: "Le délai d'apparition sur votre compte dépend de votre établissement bancaire, généralement 5 à 10 jours ouvrés supplémentaires." },
]

export default function ConditionsRemboursementPage() {
  return (
    <PageShell
      title="Conditions de remboursement"
      description="Notre politique de remboursement est écrite pour être lue sans détour : ce qui est remboursable, ce qui ne l’est pas, pourquoi, et dans quel délai. Le droit de rétractation de 14 jours s’applique, sous réserve d’une exception que nous préférons expliquer plutôt que taire."
      breadcrumb={[{ name: 'Conditions de remboursement', href: '/conditions-remboursement' }]}
      eyebrow="Document juridique"
      width="prose"
      updatedAt={SITE.legalUpdated}
    >
      <Callout tone="info" title="Les deux règles à retenir">
        <ul className="mt-2 space-y-1.5">
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" strokeWidth={3} aria-hidden="true" />
            <span>
              <strong className="font-bold">14 jours</strong> pour demander le remboursement
              intégral, sans motif, si vous n’avez pas généré de contenu.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" aria-hidden="true" />
            <span>
              Si vous avez <strong className="font-bold">généré des contenus</strong>, le droit de
              rétractation ne s’applique pas — c’est la loi sur les contenus numériques. Le
              remboursement reste possible en cas de défaut de conformité, d’inaccessibilité du
              service ou d’erreur de commande.
            </span>
          </li>
        </ul>
      </Callout>

      <div className="mt-8">
        <ArticleSection
          title="1. Principe général : 14 jours pour changer d’avis"
          icon={<RotateCcw className="h-5 w-5" aria-hidden="true" />}
        >
          <p>
            Conformément aux articles L.221-18 et suivants du Code de la consommation, vous
            disposez d’un délai de <strong className="font-bold">quatorze (14) jours</strong> à
            compter de la réception de la confirmation de commande pour exercer votre droit de
            rétractation, sans avoir à motiver votre demande ni à acquitter de frais.
          </p>
          <p>
            Pour les formules <strong>Accès Unitaire (49,90 €)</strong>,{' '}
            <strong>Pack 5 (199,90 €)</strong> et <strong>Coffret Illimité (499,90 €)</strong>, ce
            délai court à compter de la date d’effectuation de la commande. Le point de départ est la
            date à laquelle la commande est réputée acceptée et le paiement confirmé.
          </p>
          <p>
            Passé ce délai, la relation contractuelle demeure : l’accès au moteur reste ouvert et
            vous conservez tous les droits attachés à votre formule. Aucun prélèvement automatique
            n’intervient par la suite, aucun renouvellement n’est mis en place.
          </p>
        </ArticleSection>

        <ArticleSection
          title="2. L’exception applicable aux contenus numériques"
          icon={<AlertTriangle className="h-5 w-5" aria-hidden="true" />}
        >
          <p>
            Le droit de rétractation s’exerce sur les contrats de fourniture de contenu numérique,
            sauf exception prévue par la loi. L’article L.221-28 12° du Code de la consommation
            dispose que ce droit ne s’applique pas à la fourniture d’un contenu numérique qui n’est
            pas fourni sur un support matériel et dont l’exécution a commencé après accord préalable
            exprès du consommateur et renoncement exprès à son droit de rétractation.
          </p>
          <p>
            Concrètement, cela signifie qu’une fois que vous avez <strong className="font-bold">
            utilisé le moteur pour produire un contenu</strong>, la prestation a été exécutée : nous
            ne pouvons pas la défaire. Le droit de rétractation ne peut donc plus s’exercer. C’est
            une règle du droit de la consommation, et non une clause commerciale que nous avons
            librement écrite pour nous protéger.
          </p>
          <p>Nous ne nous en cachons pas, et nous ne vous le cachons pas non plus :</p>
          <ul className="ml-1 space-y-2.5">
            {[
              'Cette exception est rappelée explicitement dans nos conditions générales de vente et sur cette page, avant tout paiement.',
              'Elle porte uniquement sur le droit de rétractation. Elle ne nous prive d’aucune garantie de conformité légale, et ne nous autorise pas à refuser un remboursement pour un service défectueux.',
              'Nous appliquons volontairement un standard de remboursement plus favorable que le minimum légal : l’exception ne s’applique pas si le Service n’a jamais fonctionné, si le niveau de qualité obtenu ne correspond pas à nos descriptions, ou s’il s’agit d’une erreur de commande.',
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
          <Callout tone="warning" title="La règle en une phrase">
            <p>
              <strong className="font-bold">
                Pas de contenu généré = remboursement garanti sous 14 jours. Contenu généré =
                pas de rétractation, mais une garantie de conformité qui reste entièrement
                applicable.
              </strong>
            </p>
          </Callout>
        </ArticleSection>

        <ArticleSection
          title="3. Cas de remboursement"
          icon={<Scale className="h-5 w-5" aria-hidden="true" />}
        >
          <p>
            Pour vous éviter toute ambiguïté, voici l’intégralité des situations dans lesquelles une
            demande est acceptée ou refusée. En cas de situation non listée, votre demande est
            examinée au cas par cas : contactez-nous, nous ne refusons jamais une demande sans vous
            en expliquer le motif.
          </p>
          <div className="space-y-3">
            {CAS_REMBOURSEMENT.map((item) => (
              <div
                key={item.cas}
                className={`rounded-2xl border p-4 ${
                  item.eligible
                    ? 'border-emerald-200 bg-emerald-50/60'
                    : 'border-gray-200 bg-gray-50/60'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                      item.eligible ? 'bg-emerald-500' : 'bg-gray-400'
                    }`}
                    aria-hidden="true"
                  >
                    {item.eligible ? (
                      <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                    ) : (
                      <X className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                    )}
                  </span>
                  <div>
                    <p className="text-sm font-bold" style={{ color: '#1e1b4b' }}>
                      {item.cas}{' '}
                      <span
                        className={`ml-1 text-xs font-semibold ${
                          item.eligible ? 'text-emerald-700' : 'text-gray-500'
                        }`}
                      >
                        ({item.eligible ? 'remboursé' : 'non remboursé'})
                      </span>
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">{item.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ArticleSection>

        <ArticleSection
          title="4. Comment demander un remboursement"
          icon={<Mail className="h-5 w-5" aria-hidden="true" />}
        >
          <p>
            La demande s’effectue par écrit, depuis la{' '}
            <Link href="/contact" className="font-semibold text-indigo-700 underline">
              page contact
            </Link>{' '}
            ou par e-mail à l’adresse de contact indiquée ci-dessous. Aucune pièce justificative
            n’est exigée pour une demande de rétractation de droit commun : une simple demande
            exprimant la volonté de se rétracter suffit.
          </p>
          <SubHeading>Informations à nous transmettre</SubHeading>
          <NumberedList
            items={[
              'Votre nom et prénom.',
              'L’adresse e-mail associée à la commande.',
              'Le numéro de commande, au format ia-premium-XXXX, présent sur votre facture.',
              'La formule concernée (Accès Unitaire, Pack 5 ou Coffret Illimité) et la date d’achat.',
              'Le motif de votre demande, en une ou deux phrases, lorsqu’il s’agit d’un défaut de conformité ou d’un dysfonctionnement.',
            ]}
          />
          <p>
            Pour les demandes relatives à un défaut de conformité, nous pouvons vous demander une
            description précise du problème rencontré et, le cas échéant, une capture d’écran. Cela
            nous permet de corriger réellement la cause plutôt que de traiter le symptôme.
          </p>
          <SubHeading>Coordonnées</SubHeading>
          <p>
            Adresse e-mail :{' '}
            {COMPANY.email.startsWith('[À COMPLÉTER]') ? (
              <span className="font-mono text-[13px] text-amber-700 underline decoration-amber-400 underline-offset-2">
                {COMPANY.email}
              </span>
            ) : (
              <a href={`mailto:${COMPANY.email}`} className="font-semibold text-indigo-700 underline">
                {COMPANY.email}
              </a>
            )}{' '}
            — à compléter avec l’adresse réelle de l’éditeur. Courrier : {COMPANY.adresseSiege}.
          </p>
        </ArticleSection>

        <ArticleSection
          title="5. Délais de traitement"
          icon={<Clock className="h-5 w-5" aria-hidden="true" />}
        >
          <p>
            Le remboursement est traité dans un délai de <strong className="font-bold">5 jours
            ouvrés</strong> à compter de la réception de votre demande. Le parcours complet :
          </p>
          <ol className="space-y-3">
            {DELAI_TRAITEMENT.map((item, index) => (
              <li key={item.etape} className="flex gap-3">
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' }}
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <div>
                  <p className="text-sm font-bold" style={{ color: '#1e1b4b' }}>
                    {item.etape}
                  </p>
                  <p className="text-sm text-gray-600">{item.detail}</p>
                </div>
              </li>
            ))}
          </ol>
          <Callout tone="info" title="À quoi correspondent ces délais ?">
            <p>
              Le délai de 5 jours ouvrés est le nôtre : c’est le délai sous lequel nous nous
              engageons à traiter votre demande. Le délai supplémentaire de 5 à 10 jours ouvrés
              ensuite, il est celui de votre établissement bancaire pour faire apparaître le
              remboursement sur votre relevé — il ne dépend pas de nous. Aucun frais de traitement
              ne vous est facturé.
            </p>
          </Callout>
        </ArticleSection>

        <ArticleSection
          title="6. Modalités de restitution"
          icon={<CreditCard className="h-5 w-5" aria-hidden="true" />}
        >
          <p>
            Le remboursement s’effectue par le même moyen de paiement que celui utilisé lors du
            règlement initial, conformément à l’article L.221-34 du Code de la consommation.
          </p>
          <ul className="ml-1 space-y-2">
            {[
              'Carte bancaire : le montant est recrédité sur la même carte. Aucun avoir, aucun bon de réduction, aucun report de durée ne se substitue au remboursement, sauf accord exprès de votre part.',
              'Frais de livraison : sans objet, le Service étant un contenu numérique, aucun frais de port n’a été facturé.',
              'Arrêt de l’accès : le remboursement entraîne la fermeture de votre accès au Service, sans que cela puisse affecter les contenus déjà produits, que vous conservez.',
              'Avoir alternatif : si vous préférez conserver l’accès plutôt qu’être remboursé, nous pouvons vous proposer un avoir ou une formule supérieure. Ce choix vous appartient entièrement.',
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
        </ArticleSection>

        <ArticleSection
          title="7. Une demande refusée ?"
          icon={<X className="h-5 w-5" aria-hidden="true" />}
        >
          <p>
            Si votre demande est refusée, nous vous en indiquons le motif précis, ainsi que le fondement
            juridique de ce refus. Vous disposez alors des recours suivants :
          </p>
          <ul className="ml-1 space-y-2">
            {[
              'Contester le refus en nous transmettant tout élément nouveau susceptible de modifier notre appréciation.',
              'Saisir gratuitement un médiateur de la consommation, conformément aux articles L.616-1 et R.616-1 du Code de la consommation.',
              'Introduire une réclamation auprès de la CNIL si vos données personnelles sont en cause.',
              'Saisir le juge compétent, le consommateur conservant le bénéfice de la règle protectrice lui garantissant la compétence du tribunal de son lieu de résidence.',
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
          <p>
            La plateforme européenne de règlement en ligne des litiges est accessible à l’adresse{' '}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-indigo-700 underline"
            >
              ec.europa.eu/consumers/odr
            </a>
            .
          </p>
        </ArticleSection>

        <ArticleSection
          title="8. Dispositions complémentaires"
          icon={<FileText className="h-5 w-5" aria-hidden="true" />}
        >
          <p>
            La présente politique de remboursement complète les{' '}
            <Link href="/cgv" className="font-semibold text-indigo-700 underline">
              conditions générales de vente
            </Link>{' '}
            d’ia-premium, qui demeurent applicables pour tout ce qui n’est pas traité ici. En cas de
            divergence d’interprétation, la garantie légale de conformité et le droit de rétractation
            prévus par le Code de la consommation prévalent sur toute disposition commerciale.
          </p>
          <p>
            Le droit applicable est le droit français. La présente politique est susceptible
            d’évoluer : la version applicable à une commande est celle en vigueur à la date de
            cette commande.
          </p>
        </ArticleSection>
      </div>

      <CtaBand
        title="Une question sur votre situation ?"
        description="Individuellement, chaque cas de remboursement se juge au regard des faits. Écrivez-nous avec votre numéro de commande : nous vous répondons sous 48 h ouvrées et vous disons franchement si vous êtes éligible."
        primaryLabel="Demander un remboursement"
        primaryHref="/contact"
        secondaryLabel="Lire les CGV"
        secondaryHref="/cgv"
      />
    </PageShell>
  )
}
