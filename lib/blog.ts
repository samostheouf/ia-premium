// ─── Données éditoriales du blog ia-premium ──────────────────────────────────
// Métadonnées partagées entre la page index (app/blog) et les articles.
// Les articles eux-mêmes restent des pages autonomes (app/blog/<slug>/page.tsx)
// afin que chacun puisse être rendu statiquement avec ses propres metadata.
//
// ⚠️ CETTE LISTE DOIT ÊTRE SYNCHRONISÉE avec le contenu de app/blog/*/page.tsx.
// Tout article présent sur disque mais absent ici est invisible : ni index,
// ni sitemap, ni navigation. Pour ajouter un article, ajouter son entrée ici
// (ordre : dateIso décroissant) en plus de créer son fichier page.tsx.

export interface ArticleMeta {
  slug: string
  titre: string
  description: string
  categorie: string
  datePublication: string
  dateIso: string
  auteur: string
  tempsLecture: string
  motCle: string
}

export const ARTICLES: ArticleMeta[] = [
  {
    slug: 'structure-landing-page-conversion',
    titre: 'Structure d’une landing page qui convertit : l’anatomie complète',
    description:
      "La structure d’une landing page qui convertit ne dépend pas du design mais de l’ordre des blocs. Promesse, preuve, objections, risque, appel à l’action : le découpage qui change le taux de conversion.",
    categorie: 'Landing pages',
    datePublication: '20 janvier 2026',
    dateIso: '2026-01-20',
    auteur: 'L’équipe éditoriale ia-premium',
    tempsLecture: '8 min de lecture',
    motCle: 'structure d’une landing page',
  },
  {
    slug: 'erreurs-copie-commerciale',
    titre: '8 erreurs de copie commerciale qui font perdre des ventes',
    description:
      "Les 8 erreurs de copie commerciale les plus fréquentes, et comment les corriger : formulations invérifiables,_superflu, jargon, CTA multiples, promesses creuses.",
    categorie: 'Copywriting',
    datePublication: '19 janvier 2026',
    dateIso: '2026-01-19',
    auteur: 'L’équipe éditoriale ia-premium',
    tempsLecture: '7 min de lecture',
    motCle: 'erreurs de copie commerciale',
  },
  {
    slug: 'ia-vs-redacteur-humain',
    titre: 'IA ou rédacteur humain : le comparatif honnête',
    description:
      "IA ou rédacteur humain : coût, délai, qualité, cohérence. Le comparatif honnête pour choisir la bonne approche selon votre contexte, sans discours marketing.",
    categorie: 'Stratégie',
    datePublication: '18 janvier 2026',
    dateIso: '2026-01-18',
    auteur: 'L’équipe éditoriale ia-premium',
    tempsLecture: '6 min de lecture',
    motCle: 'IA ou rédacteur humain',
  },
  {
    slug: 'rediger-email-marketing-ia',
    titre: 'Rédiger un e-mail marketing avec l’IA : le guide complet',
    description:
      "Comment rédiger un e-mail marketing avec l’IA : structure qui convertit, objet qui survit au tri, formulation des objections, et relecture avant envoi. Guide praticien.",
    categorie: 'E-mail marketing',
    datePublication: '15 janvier 2026',
    dateIso: '2026-01-15',
    auteur: 'L’équipe éditoriale ia-premium',
    tempsLecture: '7 min de lecture',
    motCle: 'rédiger un e-mail marketing',
  },
  {
    slug: 'prompts-ecriture-commerciale',
    titre: '15 prompts d’écriture commerciale pour obtenir des textes qui vendent',
    description:
      "Une sélection de prompts d’écriture commerciale testés en production : cadrage, objections, preuves, ton, relances. Avec la logique derrière chaque prompt et les erreurs à éviter.",
    categorie: 'Prompting',
    datePublication: '14 janvier 2026',
    dateIso: '2026-01-14',
    auteur: 'L’équipe éditoriale ia-premium',
    tempsLecture: '8 min de lecture',
    motCle: 'prompts écriture commerciale',
  },
  {
    slug: 'choisir-ton-ia',
    titre: 'Choisir le bon ton pour votre contenu IA : le guide des 8 registres',
    description:
      "Le ton n'est pas une décoration : il modifie le vocabulaire, le rythme et le niveau de familiarité. Comment choisir le bon registre pour chaque canal, et éviter le texte qui sonne robot.",
    categorie: 'Style & ton',
    datePublication: '8 janvier 2026',
    dateIso: '2026-01-08',
    auteur: 'L’équipe éditoriale ia-premium',
    tempsLecture: '6 min de lecture',
    motCle: 'ton contenu IA',
  },
  {
    slug: 'copywriting-ia-premium',
    titre: 'Copywriting IA premium : passer du texte plausible au texte qui vend',
    description:
      "Pourquoi la plupart des textes générés par IA ne se vendent pas, et comment la méthode de cadrage, d'architecture et de relecture change le résultat. Le guide complet du copywriting IA premium.",
    categorie: 'Copywriting',
    datePublication: '8 janvier 2026',
    dateIso: '2026-01-08',
    auteur: 'L’équipe éditoriale ia-premium',
    tempsLecture: '7 min de lecture',
    motCle: 'copywriting IA premium',
  },
  {
    slug: 'formats-sortie-ia',
    titre: 'Formats de sortie IA : texte, Markdown ou JSON pour votre chaîne de production',
    description:
      "Le bon format de sortie dépend du canal de diffusion et de votre outil en aval. Guide pratique pour choisir entre texte brut, Markdown structuré et JSON typé.",
    categorie: 'Formats & intégration',
    datePublication: '8 janvier 2026',
    dateIso: '2026-01-08',
    auteur: 'L’équipe éditoriale ia-premium',
    tempsLecture: '6 min de lecture',
    motCle: 'formats de sortie IA',
  },
]

export function getArticle(slug: string): ArticleMeta | undefined {
  return ARTICLES.find((article) => article.slug === slug)
}
