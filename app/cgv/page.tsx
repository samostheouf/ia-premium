import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Store,
  ShoppingCart,
  CreditCard,
  KeyRound,
  RotateCcw,
  ShieldCheck,
  Scale,
  FileText,
  Database,
  Gavel,
} from 'lucide-react'
import PageShell, { ArticleSection, SubHeading, BulletList, Callout, LegalField, CtaBand } from '@/app/components/PageShell'
import { COMPANY, SITE, absoluteUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Conditions générales de vente (CGV) | ia-premium',
  description:
    "Conditions générales de vente d'ia-premium : identification du vendeur, produits et prix, paiement Stripe, livraison et accès digital, droit de rétractation 14 jours et exception contenu numérique, garantie, responsabilité, données personnelles, droit applicable et litiges.",
  alternates: { canonical: absoluteUrl('/cgv') },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Conditions générales de vente — ia-premium',
    description:
      'CGV complètes : produits, paiement, rétractation, exception contenu numérique, garantie, litiges.',
    url: absoluteUrl('/cgv'),
    type: 'website',
    locale: 'fr_FR',
  },
}

export default function CgvPage() {
  return (
    <PageShell
      title="Conditions générales de vente"
      description="Les conditions qui encadrent l’achat et l’utilisation des accès ia-premium. Rédigées pour être lues, en particulier sur le droit de rétractation et l’exception applicable aux contenus numériques."
      breadcrumb={[{ name: 'CGV', href: '/cgv' }]}
      eyebrow="Document juridique"
      width="prose"
      updatedAt={SITE.legalUpdated}
    >
      <Callout tone="warning" title="À lire avant toute commande">
        <p>
          Les champs signalés par la mention{' '}
          <span className="font-mono text-[12px] font-semibold text-amber-800">[À COMPLÉTER]</span>{' '}
          sont des placeholders. Ils doivent être remplacés par les informations réelles de
          l’éditeur (raison sociale, SIREN, RCS, adresse, e-mail) dans le fichier{' '}
          <code className="rounded bg-amber-100 px-1">lib/site.ts</code> avant toute mise en ligne
          commerciale. Aucune donnée d’une société réelle n’a été inventée.
        </p>
      </Callout>

      <div className="mt-8">
        <ArticleSection title="Article 1 — Identification du vendeur" icon={<Store className="h-5 w-5" aria-hidden="true" />}>
          <p>
            Les présentes conditions générales de vente régissent l’ensemble des ventes de contenu
            numérique conclues sur le site {SITE.url} (ci-après « le Site »), édité par :
          </p>
          <div className="space-y-2 rounded-xl border border-gray-200 bg-gray-50/60 p-5">
            <LegalField label="Dénomination sociale" value={COMPANY.raisonSociale} />
            <LegalField label="Forme juridique" value={COMPANY.formeJuridique} />
            <LegalField label="Capital social" value={COMPANY.capitalSocial} />
            <LegalField label="Siège social" value={COMPANY.adresseSiege} />
            <LegalField label="Code postal / Ville" value={`${COMPANY.codePostalSiege} ${COMPANY.villeSiege} — ${COMPANY.paysSiege}`} />
            <LegalField label="Numéro SIREN" value={COMPANY.siren} />
            <LegalField label="Numéro SIRET (siège)" value={COMPANY.siret} />
            <LegalField label="RCS" value={COMPANY.rcs} />
            <LegalField label="Code NAF / APE" value={COMPANY.naf} />
            <LegalField label="TVA intracommunautaire" value={COMPANY.tva} />
            <LegalField label="Téléphone" value={COMPANY.telephone} />
            <LegalField label="Adresse e-mail" value={COMPANY.email} />
          </div>
          <p>
            L’éditeur est ci-après désigné « le Vendeur ». Le Vendeur commercialise des accès
            numériques à un moteur de génération de contenu assisted par intelligence artificielle
            (ci-après « le Service »).
          </p>
          <p>
            Les purchases en ligne sont conclusion exclusively par voie électronique. Le Vendeur
            se réserve le droit d’annuler toute commande dont le prix n’a pas été réglé, et se réserve le droit
            d’annuler toute commande présentant un caractère anormal ou frauduleux.
          </p>
        </ArticleSection>

        <ArticleSection
          title="Article 2 — Produits et spécifications"
          icon={<ShoppingCart className="h-5 w-5" aria-hidden="true" />}
        >
          <p>
            Le Vendeur commercialise trois formules d’accès au Service, chacune correspondant à un
            niveau de droits d’utilisation :
          </p>
          <ul className="ml-1 space-y-3">
            <li className="rounded-xl border border-gray-200 bg-gray-50/60 p-4">
              <span className="font-bold" style={{ color: '#1e1b4b' }}>
                Accès Unitaire — 49,90 € TTC
              </span>
              <p className="mt-1 text-sm text-gray-600">
                Accès illimité au moteur pour un seul utilisateur : toutes les catégories de
                contenu, tous les formats de sortie, tous les tons. Support par e-mail sous 48 h
                ouvrées.
              </p>
            </li>
            <li className="rounded-xl border border-gray-200 bg-gray-50/60 p-4">
              <span className="font-bold" style={{ color: '#1e1b4b' }}>
                Pack 5 — 199,90 € TTC
              </span>
              <p className="mt-1 text-sm text-gray-600">
                Cinq crédits de génération premium, partageables entre cinq collaborateurs au
                maximum. Support prioritaire sous 24 h ouvrées.
              </p>
            </li>
            <li className="rounded-xl border border-gray-200 bg-gray-200 bg-gray-50/60 p-4">
              <span className="font-bold" style={{ color: '#1e1b4b' }}>
                Coffret Illimité — 499,90 € TTC
              </span>
              <p className="mt-1 text-sm text-gray-600">
                Accès illimité à vie, toutes les fonctionnalités avancées, mises à jour futures
                incluses, archivage des productions. Support prioritaire sous 12 h ouvrées.
              </p>
            </li>
          </ul>
          <p>
            Les caractéristiques détaillées de chaque formule figurent sur la page{' '}
            <Link href="/pricing" className="font-semibold text-indigo-700 underline">
              Tarifs
            </Link>
            , qui fait partie des présentes conditions.
          </p>
          <p>
            Le Service est fourni « en l’état ». Le Vendeur s’engage à fournir un Service fonctionnel
            et diligent, mais ne garantit pas que le contenu généré corresponde exactement aux
            attentes de l’Utilisateur : s’agissant d’un outil de production rédactionnelle, une
            relecture humaine demeure nécessaire, en particulier pour les contenus stratégiques,
            réglementés ou engageants juridiquement.
          </p>
        </ArticleSection>

        <ArticleSection title="Article 3 — Prix" icon={<CreditCard className="h-5 w-5" aria-hidden="true" />}>
          <p>
            Les prix sont indiqués en euros, toutes taxes comprises (TTC), et correspondent au
            montant facturé. Les frais de livraison ne s’appliquent pas : le Service étant un contenu
            numérique, aucun frais de port n’est facturé.
          </p>
          <p>
            Le Vendeur se réserve le droit de modifier ses prix à tout moment. Les nouvelles prix ne
            s’appliquent qu’aux commandes passées après leur entrée en vigueur ; une commande déjà
            passée est facturée au prix en vigueur au moment de la commande.
          </p>
          <p>
            Aucun frais caché, aucune commission et aucun frais de dossier ne sont facturés. Le
            Vendeur ne pratique ni abonnement, ni reconduction tacite, ni prélèvement automatique
            ultérieur, à l’exception des générations additionnelles du Pack 5, qui sont facturées au
            crédit lors d’une nouvelle commande et jamais par reconduction.
          </p>
          <p>
            Le taux de TVA applicable est celui en vigueur au jour de la commande. Toute
            modification du taux de TVA applicable pourra être répercutée sur les prix affichés,
            sans que cela constitue une modification des prix au sens de l’article 3.
          </p>
        </ArticleSection>

        <ArticleSection
          title="Article 4 — Commande et paiement"
          icon={<CreditCard className="h-5 w-5" aria-hidden="true" />}
        >
          <SubHeading>4.1 — Processus de commande</SubHeading>
          <p>
            La commande s’effectue exclusivement via le Site. L’Utilisateur choisit une formule,
            clique sur le bouton d’achat correspondant et est redirigé vers une page de paiement
            hébergée par {COMPANY.prestatairePaiement} (ci-après « le Prestataire de paiement »). La
            commande n’est réputée acceptée qu’après règlement effectif du prix par le Prestataire
            de paiement.
          </p>

          <SubHeading>4.2 — Moyens de paiement</SubHeading>
          <p>
            Le paiement est traité exclusivement par le Prestataire de paiement, prestataire certifié
            PCI DSS niveau 1. Les moyens acceptés sont ceux proposés par le Prestataire de paiement à
            l’Utilisateur (notamment les principales cartes bancaires, et selon le pays, les
            moyen de paiement additionnels proposés par Stripe).
          </p>
          <p>
            Aucune donnée de carte bancaire ne transitent par les serveurs du Vendeur, qui n’a à
            aucun moment accès aux numéros de carte. Les données de paiement sont traitées
            exclusivement par le Prestataire de paiement, conformément à sa propre politique de
            confidentialité et aux normes PCI DSS.
          </p>

          <SubHeading>4.3 — Défaut de paiement</SubHeading>
          <p>
            En cas d’échec du paiement, la commande est réputée non définitive et l’Utilisateur
            n’obtient aucun accès au Service. Le Vendeur se réserve le droit de suspendre puis de
            résilier tout compte en cas de tentative de fraude ou d’impayé répété.
          </p>

          <SubHeading>4.4 — Facture</SubHeading>
          <p>
            Une facture est générée automatiquement par le Prestataire de paiement à la validation
            du paiement et demeure accessible par l’Utilisateur dans son espace client ou par
            transmission sur simple demande addressed à l’adresse e-mail de contact.
          </p>
        </ArticleSection>

        <ArticleSection
          title="Article 5 — Livraison et accès au contenu numérique"
          icon={<KeyRound className="h-5 w-5" aria-hidden="true" />}
        >
          <p>
            Le Service étant un contenu numérique fourni par voie électronique, la « livraison »
            s’entend comme la mise à disposition de l’accès au moteur. La livraison est immédiate :
            l’accès est ouvert dès la confirmation du paiement par le Prestataire de paiement.
          </p>
          <p>
            Le Vendeur s’engage à faire en sorte que la mise à disposition de l’accès ne soit empêchée par
            une cause tenant à son organisation, et à en informer l’Utilisateur dans les meilleurs
            délais. Aucun délai de livraison maximal ne peut donc être imposé au Vendeur pour ce
            type de produit.
          </p>
          <p>
            L’Utilisateur est seul responsable de la conservation de ses identifiants d’accès et de
            toute utilisation faite de son compte. Toute génération effectuée avec son compte est
            réputée effectuée par l’Utilisateur lui-même.
          </p>
        </ArticleSection>

        <ArticleSection
          title="Article 6 — Droit de rétractation de 14 jours et exception contenu numérique"
          icon={<RotateCcw className="h-5 w-5" aria-hidden="true" />}
        >
          <p>
            Conformément aux articles L.221-18 et suivants du Code de la consommation, l’Utilisateur
            dispose d’un délai de <strong className="font-bold">14 jours</strong> à compter de la
            réception de sonbons confirmation de commande pour exercer son droit de rétractation,
            sans motif ni pénalité.
          </p>

          <Callout tone="warning" title="Exception applicable aux contenus numériques — à lire attentivement">
            <p>
              L’article L.221-28 du Code de la consommation stipule que le droit de rétractation ne
              s’applique pas à la fourniture d’un contenu numérique non fourni sur un support
              matériel dont l’exécution a commencé après accord préalable exprès du consommateur et
              renoncement exprès à son droit de rétractation.
            </p>
            <p className="mt-2">
              <strong className="font-bold">En pratique :</strong> si vous avez effectivement
              généré du contenu avec le Service, le Vendeur est en droit de refuser votre demande de
              rétractation, car la valeur du Service vous a déjà été entièrement fournie et ne peut
              pas être rendue. Dans ce cas, seul le défaut de conformité du Service ouvre droit à
              remboursement (voir article 7).
            </p>
            <p className="mt-2">
              En revanche, si vous n’avez généré aucun contenu, le Vendremise le remboursement
              intégral sans condition et sans avoir à motiver votre demande.
            </p>
          </Callout>

          <SubHeading>6.1 — Modalités d’exercice</SubHeading>
          <p>
            L’Utilisateur exerce son droit de rétractation en adressant au Vendeur, avant l’expiration
            du délai de 14 jours, une demande écrite (e-mail ou courrier) indiquant son intention de
            se rétracter, accompagnée le cas échéant de son nom, de son adresse e-mail et du numéro
            de commande.
          </p>
          <BulletList
            items={[
              'Par e-mail à l’adresse de contact indiquée à l’article 1.',
              'Par courrier postal à l’adresse du siège social indiquée à l’article 1.',
              'La date de réception de la demande fait foi pour le décompte du délai.',
            ]}
          />

          <SubHeading>6.2 — Effets du retractation</SubHeading>
          <p>
            En cas de rétractation, le Vendeur rembourse l’ensemble des sommes payées au titre de la
            commande, dans un délai de quatorze (14) jours suivant la réception de la demande. Le
            remboursement s’effectue par le même moyen de paiement que celui utilisé lors du
            paiement initial.
          </p>
          <p>
            Conformément à l’article L.221-34 du Code de la consommation, les frais de retour ne sont
            pas à la charge de l’Utilisateur lorsqu’il se retracte alors qu’il n’a pas généré de
            contenu et n’a pas ainsi fourni au Vendeur un service dont la valeur aurait été
            immédiatement appréciable.
          </p>
        </ArticleSection>

        <ArticleSection title="Article 7 — Garantie et remboursement" icon={<ShieldCheck className="h-5 w-5" aria-hidden="true" />}>
          <SubHeading>7.1 — Garantie de conformité légale</SubHeading>
          <p>
            Indépendamment de l’exception de rétractation ci-dessus, le Vendeur garantit la conformité
            du Service aux caractéristiques mentionnées à l’article 2, conformément aux
            dispositions des articles L.217-3 et suivants du Code de la consommation et L.164-1 et
            suivants du Code civil.
          </p>
          <p>
            Si le Service ne présente pas la conformité attendue, l’Utilisateur peut, à son choix :
            obtenir la réparation du Service (remise en état ou remplacement si le Service est
            numérique et ne peut être remis en état), ou une réduction de prix, ou la résolution de
            la vente avec remboursement intégral, selon la nature du manquement et de la gravité de
            celui-ci.
          </p>

          <SubHeading>7.2 — Conditions de la politique commerciale de remboursement</SubHeading>
          <p>
            En sus des garanties légales, le Vendeur applique une politique commerciale de
            remboursement encadrée par l’exception contenu numérique : remboursement intégral pendant
            14 jours dès lors qu’aucun contenu n’a été généré avec le Service.
          </p>
          <p>
            Les modalités complètes — cas de remboursement, pièces à fournir, délais de traitement
            et moyens de restitution — sont détaillées dans notre{' '}
            <Link href="/conditions-remboursement" className="font-semibold text-indigo-700 underline">
              politique de remboursement
            </Link>
            , qui fait partie des présentes conditions.
          </p>

          <SubHeading>7.3 — Exclusion de garantie</SubHeading>
          <p>
            La garantie ne couvre pas : les interruptions de service résultant de causes
           RAINusepostérieures à la livraison, les contenus générés par le Service, ni le traitement
            d’un brief incomplet ou inadapté à l’usage recherché par l’Utilisateur.
          </p>
        </ArticleSection>

        <ArticleSection
          title="Article 8 — Responsabilité"
          icon={<Scale className="h-5 w-5" aria-hidden="true" />}
        >
          <p>
            Le Vendeur s’engage à fournir le Service avec diligence. Sa responsabilité ne saurait
            être engagée à lmbito de : (i) l’utilisation faite du Service par l’Utilisateur ;
            (ii) la publication d’un contenu généré par le Service ; (iii) la perte de données résultant d’une
            mauvaise utilisation du Service ou d’un manquement de l’Utilisateur à ses obligations de
            sauvegarde ; (iv) les défaillances de tiers, notamment du Prestataire de paiement ou d’un
            fournisseur de réseaux ; (v) les cas de force majeure.
          </p>
          <p>
            L’Utilisateur demeure seul responsable du contrôle et de la validation des contenus
            générés avant toute publication, diffusion ou usage commercial. En particulier, les
            contenus générés ne doivent pas être utilisés pour énoncer des informations fausses,
            diffamatoires, discriminatoires ou contraires à l’ordre public.
          </p>
          <p>
            Conformément à l’article 1231-1 du Code civil, sauf stipulation contraire ou faute
            lourde ou intentionnelle, la responsabilité du Vendeur est limitée au montant total
            effectivement payé par l’Utilisateur au titre de la commande concernée.
          </p>
        </ArticleSection>

        <ArticleSection
          title="Article 9 — Données personnelles et confidentialité"
          icon={<Database className="h-5 w-5" aria-hidden="true" />}
        >
          <p>
            Le traitement des données à caractère personnel est régi par le Règlement Général sur la
            Protection des Données (RGPD — Règlement UE 2016/679) et par la loi Informatique et
            Libertés. Le Vendeur est responsable de traitement pour les données collectées dans le
            cadre de la vente et de l’utilisation du Service.
          </p>
          <p>
            Les finalités, bases légales, durées de conservation, destinataires et modalités
            d’exercice de vos droits sont décrits en détail dans notre{' '}
            <Link href="/politique-confidentialite" className="font-semibold text-indigo-700 underline">
              politique de confidentialité
            </Link>
            , qui fait partie des présentes conditions.
          </p>
          <p>
            Le Vendeur ne vend pas vos données à des tiers à des fins commerciales. Vos briefs et vos
            productions sont utilisés uniquement pour fournir le Service et ne sont pas utilisés pour
            entraîner ou améliorer des modèles tiers.
          </p>
        </ArticleSection>

        <ArticleSection
          title="Article 10 — Propriété intellectuelle"
          icon={<FileText className="h-5 w-5" aria-hidden="true" />}
        >
          <p>
            L’ensemble des éléments du Site — textes, illustrations, identité visuelle, logiciel,
            marque et nom — reste la propriété exclusive du Vendeur. Toute reproduction ou
            représentation, totale ou partielle, sans autorisation écrite préalable, est interdite.
          </p>
          <p>
            L’accès au Service confère à l’Utilisateur une licence d’utilisation non exclusive,
            non cessible et non transmissible, limitée à la durée de son accès. L’Utilisateur peut
            utiliser librement les contenus générés par le Service, y compris à des fins
            commerciales, cette licence portant sur les contenus produits et non sur le moteur
            lui-même.
          </p>
          <p>
            L’Utilisateur garantit disposer des droits nécessaires sur les briefs qu’il transmet au
            Service et garantit le Vendeur contre tout recours de tiers à ce titre.
          </p>
        </ArticleSection>

        <ArticleSection
          title="Article 11 — Modification des conditions"
          icon={<FileText className="h-5 w-5" aria-hidden="true" />}
        >
          <p>
            Le Vendeur se réserve le droit de modifier les présentes conditions à tout moment. La
            version applicable est celle en vigueur au jour de la commande. Les Utilisateurs sont
            informés des modifications substantielles par le moyen de leur choix (e-mail ou
            notification dans leur espace client).
          </p>
        </ArticleSection>

        <ArticleSection
          title="Article 12 — Droit applicable et juridiction compétente"
          icon={<Gavel className="h-5 w-5" aria-hidden="true" />}
        >
          <p>
            Les présentes conditions sont régies par le droit français. En cas de différend, une
            solution amiable sera recherchée dans un délai de trente (30) jours à compter de la
            première réclamation écrite, avant toute action judiciaire.
          </p>
          <p>
            À défaut d’accord amiable, l’Utilisateur a la possibilité de recourir gratuitement à un
            médiateur de la consommation. Conformément aux articles L.616-1 et R.616-1 du Code de la
            consommation, tout consommateur a le droit de recourir gratuitement à un médiateur de la
            consommation en vue de la résolution amiable d’un litige l’opposant au Vendeur.
          </p>
          <p>
            Conformément à l’article L.612-1 du Code de la consommation, tout consommateur a le droit
            de recourir gratuitement à un médiateur de la consommation en vue de la résolution
            amiable d’un litige l’opposant au Vendeur. Les coordonnées du médiateur compétent sont
            indiquées sur la page{' '}
            <Link href="/mentions-legales" className="font-semibold text-indigo-700 underline">
              Mentions légales
            </Link>
            .
          </p>
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
            . Conformément à l’article 14 du Règlement (UE) n° 524/2013, le Vendeur s’engage à y
            répondre dans le cadre de son activité de médiation.
          </p>
          <p>
            À défaut de résolution amiable ou de médiation aboutie, les tribunaux français
            compétents seront seuls saisis, sans préjudice des règles protectrices applicables au
            consommateur (forum) : le consommateur conserve le bénéfice du droit d’agir devant la
            juridiction de son lieu de résidence.
          </p>
        </ArticleSection>
      </div>

      <CtaBand
        title="Une question sur ces conditions ?"
        description="Notre équipe explique chaque point sans détour, y compris sur le droit de rétractation et l’exception contenu numérique. Écrivez-nous, nous répondons sous 48 h ouvrées."
        primaryLabel="Nous contacter"
        primaryHref="/contact"
        secondaryLabel="Lire la FAQ"
        secondaryHref="/faq"
      />
    </PageShell>
  )
}
