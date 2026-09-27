// ─── Données éditoriales du blog ia-premium ──────────────────────────────────
// Métadonnées partagées entre la page index (app/blog) et les articles.
// Les articles eux-mêmes restent des pages autonomes (app/blog/<slug>/page.tsx)
// afin que chacun puisse être rendu statiquement avec ses propres metadata.

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
    slug: 'formats-sortie-ia',
    titre: 'Formats de sortie IA : texte, Markdown ou JSON pour votre chaîne de production',
    description:
      "Le bon format de sortie dépend du canal de diffusion et de votre outil en aval. Guide pratique pour choisir entre texte brut, Markdown et JSON structuré.",
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
