import type { Metadata } from 'next'
import Link from 'next/link'
import { Scale, Building2, Globe, Mail, FileText, Shield, Gavel, HardDrive } from 'lucide-react'
import PageShell, { ArticleSection, SubHeading, Callout, LegalField, CtaBand } from '@/app/components/PageShell'
import { COMPANY, SITE, absoluteUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Mentions légales | ia-premium',
  description:
    "Mentions légales d'ia-premium, conformément à la loi pour la confiance dans l'économie numérique (LCEN) : éditeur du site, hébergeur, directeur de la publication, propriété intellectuelle, assurance et droit applicable.",
  alternates: { canonical: absoluteUrl('/mentions-legales') },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Mentions légales — ia-premium',
    description: 'Éditeur, hébergeur, propriété intellectuelle et droit applicable.',
    url: absoluteUrl('/mentions-legales'),
    type: 'website',
    locale: 'fr_FR',
  },
}

export default function MentionsLegalesPage() {
  return (
    <PageShell
      title="Mentions légales"
      description="Informations légales relatives à l’édition et à l’hébergement du site ia-premium, publiées en application de la loi pour la confiance dans l’économie numérique."
      breadcrumb={[{ name: 'Mentions légales', href: '/mentions-legales' }]}
      eyebrow="Document juridique"
      width="prose"
      updatedAt={SITE.legalUpdated}
    >
      <Callout tone="warning" title="Champs à compléter avant publication">
        <p>
          Les mentions signalées par{' '}
          <span className="font-mono text-[12px] font-semibold text-amber-800">[À COMPLÉTER]</span>{' '}
          sont des placeholders à remplacer par les informations réelles de l’éditeur dans{' '}
          <code className="rounded bg-amber-100 px-1">lib/site.ts</code>. Les obligations légales
          des articles 6-III de la LCEN et L.111-1 du Code des relations entre le public et
          l’administration imposent de publier des informations exactes : un site commercial ne
          peut pas être mis en ligne avec des mentions non renseignées.
        </p>
      </Callout>

      <div className="mt-8">
        <ArticleSection
          title="1. Éditeur du site"
          icon={<Building2 className="h-5 w-5" aria-hidden="true" />}
        >
          <p>Le site {SITE.url} est édité par :</p>
          <div className="space-y-2 rounded-xl border border-gray-200 bg-gray-50/60 p-5">
            <LegalField label="Dénomination sociale" value={COMPANY.raisonSociale} />
            <LegalField label="Forme juridique" value={COMPANY.formeJuridique} />
            <LegalField label="Capital social" value={COMPANY.capitalSocial} />
            <LegalField label="Siège social" value={COMPANY.adresseSiege} />
            <LegalField
              label="Code postal et ville"
              value={`${COMPANY.codePostalSiege} ${COMPANY.villeSiege} — ${COMPANY.paysSiege}`}
            />
            <LegalField label="Numéro SIREN" value={COMPANY.siren} />
            <LegalField label="Numéro SIRET (siège)" value={COMPANY.siret} />
            <LegalField label="RCS et ville d’immatriculation" value={COMPANY.rcs} />
            <LegalField label="Code NAF / APE" value={COMPANY.naf} />
            <LegalField label="TVA intracommunautaire" value={COMPANY.tva} />
            <LegalField label="Téléphone" value={COMPANY.telephone} />
            <LegalField label="Adresse e-mail" value={COMPANY.email} />
          </div>
          <p>
            L’éditeur est ci-après désigné « l’Éditeur ». Il commercialise des accès numériques à
            un moteur de génération de contenu assisté par intelligence artificielle.
          </p>
        </ArticleSection>

        <ArticleSection
          title="2. Directeur de la publication"
          icon={<FileText className="h-5 w-5" aria-hidden="true" />}
        >
          <p>
            Conformément à l’article 6-III de la loi n° 2004-575 du 21 juin 2004 pour la confiance
            dans l’économie numérique, l’identité du directeur de la publication est la suivante :
          </p>
          <div className="space-y-2 rounded-xl border border-gray-200 bg-gray-50/60 p-5">
            <LegalField label="Directeur de la publication" value={COMPANY.directeurPublication} />
            <LegalField label="Adresse de contact" value={COMPANY.adresseSiege} />
          </div>
        </ArticleSection>

        <ArticleSection title="3. Hébergeur" icon={<Globe className="h-5 w-5" aria-hidden="true" />}>
          <p>Le Site est hébergé par :</p>
          <div className="space-y-2 rounded-xl border border-gray-200 bg-gray-50/60 p-5">
            <LegalField label="Raison sociale" value={COMPANY.hebergeur.nom} />
            <LegalField label="Adresse" value={COMPANY.hebergeur.adresse} />
          </div>
          <p>
            Site officiel :{' '}
            <a
              href={COMPANY.hebergeur.site}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-indigo-700 underline"
            >
              {COMPANY.hebergeur.site.replace('https://', '')}
            </a>
            . L’hébergement est réalisé au sein de l’Union européenne ou dans un pays offrant un
            niveau adéquat de protection des données, dans le respect du RGPD.
          </p>
          <p>
            Prestataire de paiement : {COMPANY.prestatairePaiement}, certifié PCI DSS niveau 1. Le
            Site n’héberge aucune donnée de carte bancaire et n’a à aucun moment accès aux numéros de
            carte saisis par les utilisateurs.
          </p>
        </ArticleSection>

        <ArticleSection
          title="4. Propriété intellectuelle"
          icon={<FileText className="h-5 w-5" aria-hidden="true" />}
        >
          <p>
            L’ensemble des éléments composant le Site — structure générale, textes, illustrations,
            identité visuelle, logo, nom commercial, code source, bases de données et documents de
            toute nature — reste la propriété exclusive de l’Éditeur ou de ses cessionnaires
            autorisés. Ces éléments sont protégés par les dispositions du Code de la propriété
            intellectuelle et par les traités internationaux relatifs au droit d’auteur.
          </p>
          <p>
            Toute reproduction, représentation, modification, publication, adaptation, exploitation,
            transmission ou dénaturation, totale ou partielle, de tout ou partie des éléments du
            Site, par quelque procédé que ce soit et sur quelque support que ce soit, est
            interdite sans autorisation écrite préalable de l’Éditeur. Une telle utilisation non
            autorisée serait constitutive de contrefaçon au sens des articles L.335-2 et suivants du
            Code de la propriété intellectuelle.
          </p>
          <p>
            La marque et le nom « {SITE.name} » ainsi que l’identité visuelle associée sont la
            propriété de l’Éditeur. Leur reproduction, totale ou partielle, sur quelque support et
            dans quelque format que ce soit, est interdite sans autorisation préalable.
          </p>
          <SubHeading>Licence d’utilisation concédée à l’Utilisateur</SubHeading>
          <p>
            L’accès au Service constitutive une licence d'utilisation non exclusive, non cessible,
            non transmissible et limitée dans le temps, concédée à l’Utilisateur pour ses besoins
            propres. Cette licence porte sur l’accès au moteur, et n’emporte aucune cession de
            droit de propriété intellectuelle sur le Site ou ses composants.
          </p>
          <p>
            Les contenus générés par le Service à la suite d’une commande sont, en revanche,
            librement utilisables par l’Utilisateur, y compris à des fins commerciales. L’Éditeur
            renonce à exercise tout droit sur ces contenus, sous réserve du respect des droits de
            tiers et des mentions légales relatives aux contenus générés.
          </p>
        </ArticleSection>

        <ArticleSection
          title="5. Responsabilité éditoriale et contenu généré"
          icon={<Shield className="h-5 w-5" aria-hidden="true" />}
        >
          <p>
            Les contenus publiés sur le Site — articles de blog, pages d’information, textes
            commerciaux — sont rédigés sous la responsabilité éditoriale de l’Éditeur. Ils sont
            fournis à titre informatif et ne constituent ni un conseil juridique, ni un conseil
            fiscal, ni un conseil médical, ni une recommandation en investissement.
          </p>
          <p>
            Les contenus générés par le Service à la demande d’un Utilisateur sont produits sous
            la seule responsabilité de cet Utilisateur. L’Éditeur ne peut être tenu responsable
            d’un usage notamment :
          </p>
          <ul className="ml-1 space-y-2">
            {[
              'diffamatoire, injurieux ou discriminatoire ;',
              'contraxignant à l’ordre public ou aux bonnes mœurs ;',
              'constituant une violation de la vie privée ou du droit à l’image de tiers ;',
              'portant atteinte aux droits de propriété intellectuelle d’un tiers ;',
              'diffamant une personne physique ou morale identifiée ;',
              'contenant de fausses informations ou des affirmations non étayées.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p>
            L’Utilisateur demeure seul responsable de la vérification des faits, de la relecture et
            de la validation des contenus qu’il publie ou diffuse.
          </p>
        </ArticleSection>

        <ArticleSection
          title="6. Données personnelles"
          icon={<Shield className="h-5 w-5" aria-hidden="true" />}
        >
          <p>
            Le traitement des données à caractère personnel est régi par la loi n° 78-17 du 6 janvier
            1978 relative à l’informatique, aux fichiers et aux libertés, et par le Règlement
            Général sur la Protection des Données (RGPD — Règlement UE 2016/679).
          </p>
          <p>
            L’Éditeur est responsable de traitement pour les données collectées dans le cadre de
            l’utilisation du Site. Les finalités, bases légales, durées de conservation,
            destinataires et droits des personnes sont décrits de manière détaillée dans notre{' '}
            <Link href="/politique-confidentialite" className="font-semibold text-indigo-700 underline">
              politique de confidentialité
            </Link>
            .
          </p>
          <p>
            Exercice des droits : les demandes relatives aux données personnelles peuvent être
            adressées à l’Éditeur aux coordonnées indiquées à l’article 1. L’Éditeur répond dans un
            délai d’un mois à compter de la réception de la demande.
          </p>
        </ArticleSection>

        <ArticleSection
          title="7. Cookies et traceurs"
          icon={<HardDrive className="h-5 w-5" aria-hidden="true" />}
        >
          <p>
            Le Site peut déposer des cookies et traceurs sur l’équipement des utilisateurs, sous
            réserve de leur consentement préalable pour les cookies non nécessaires. Les
            utilisateurs peuvent à tout moment accepter, refuser ou modifier leurs préférences.
          </p>
          <p>
            La liste détaillée des cookies utilisés, leurs finalités et leur durée de conservation
            figure dans notre{' '}
            <Link href="/politique-cookies" className="font-semibold text-indigo-700 underline">
              politique cookies
            </Link>
            .
          </p>
        </ArticleSection>

        <ArticleSection
          title="8. Médiation de la consommation et litiges"
          icon={<Gavel className="h-5 w-5" aria-hidden="true" />}
        >
          <p>
            Conformément aux articles L.616-1 et R.616-1 du Code de la consommation, tout consommateur
            a le droit de recourir gratuitement à un médiateur de la consommation en vue de la
            résolution amiable d’un litige l’opposant à l’Éditeur.
          </p>
          <p>
            Les coordonnées du médiateur auquel l’Éditeur adhère seront précisées sur la présente
            page dès la conclusion de son adhésion, en application de l’article L.612-1 du Code de la
            consommation.
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
            .
          </p>
        </ArticleSection>

        <ArticleSection
          title="9. Droit applicable et juridiction"
          icon={<Scale className="h-5 w-5" aria-hidden="true" />}
        >
          <p>
            Les présentes mentions légales sont régies par le droit français. En cas de litige, et
            à défaut de résolution amiable ou de médiation aboutie, les tribunaux français
            compétents seront saisis. Le consommateur conserve toutefois le bénéfice des règles
            protectrices qui lui garantissent la compétence du tribunal de son lieu de résidence.
          </p>
        </ArticleSection>

        <ArticleSection
          title="10. Contact"
          icon={<Mail className="h-5 w-5" aria-hidden="true" />}
        >
          <p>Pour toute demande relative au Site, adressez-vous à :</p>
          <div className="space-y-2 rounded-xl border border-gray-200 bg-gray-50/60 p-5">
            <LegalField label="Raison sociale" value={COMPANY.raisonSociale} />
            <LegalField label="Adresse postale" value={COMPANY.adresseSiege} />
            <LegalField label="Adresse e-mail" value={COMPANY.email} />
            <LegalField label="Téléphone" value={COMPANY.telephone} />
          </div>
          <p>
            Un formulaire de contact en ligne est également disponible sur la page{' '}
            <Link href="/contact" className="font-semibold text-indigo-700 underline">
              Contact
            </Link>
            .
          </p>
        </ArticleSection>
      </div>

      <CtaBand
        title="Une question juridique sur vos données ?"
        description="Notre équipe répond aux demandes d’accès, de rectification et d’effacement sous un mois, comme le prévoit le RGPD. Écrivez-nous : la réponse est gratuite et sans engagement."
        primaryLabel="Nous écrire"
        primaryHref="/contact"
        secondaryLabel="Lire nos CGV"
        secondaryHref="/cgv"
      />
    </PageShell>
  )
}
