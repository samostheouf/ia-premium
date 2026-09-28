import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleLayout from '@/app/components/BlogArticleLayout'
import { type ArticleMeta } from '@/lib/blog'
import { absoluteUrl } from '@/lib/site'

// ─── Article : erreurs de copie commerciale ──────────────────────────────────

const ARTICLE: ArticleMeta = {
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
}

const ERREURS = [
 {
 numero: '1',
 nom: 'La formulation invérifiable',
 symptome: '« Solution innovante », « à la pointe de », « depuis longtemps »',
 pourquoi: 'Le lecteur ne peut pas mesurer une qualité abstraite, donc il ne vous croit pas. Pire, il lit la formulation comme un signal de faiblesse.',
 correction:
 'Remplacez par un fait daté ou chiffré, ou supprimez. Si vous ne pouvez pas quantifier, ne l’affirmez pas.',
 },
 {
 numero: '2',
 nom: 'La promesse sans mesure',
 symptome: '« Gérez vos contenus plus efficacement »',
 pourquoi: 'Le « plus efficacement » ne se compare à rien. Aucun résultat attendu n’est attendu, donc aucune décision n’est possible.',
 correction:
 'Ancrez la promesse sur une unité de temps, de volume ou d’argent. « Dix contenus par semaine au lieu de deux » se discute ; « plus efficacement » ne se discute pas.',
 },
 {
 numero: '3',
 nom: 'Le jargon technique non traduit',
 symptome: '« Pipeline d’orchestration », « synchronisation asynchrone »',
 pourquoi: 'Votre interlocuteur est un décideur, pas un ingénieur. Le jargon crée une distance et signale que vous parlez à quelqu’un d’autre qu’à lui.',
 correction:
 'Traduisez en bénéfice. Vos contenus se mettent à jour tout seuls entre vos outils, plutôt que synchronisation asynchrone en temps réel.',
 },
 {
 numero: '4',
 nom: 'Les appels à l’action multiples',
 symptome: 'Trois boutons ou plus dans la même section',
 pourquoi: 'Un choix multiple transforme l’action en délibération. Le visiteur qui hésite ne choisit pas — il sort.',
 correction:
 'Un seul appel à l’action par page, répété à trois endroits stratégiques. Le placement se joue au moment où la tension est la plus forte : après les bénéfices, après les objections, après le prix.',
 },
 {
 numero: '5',
 nom: 'Le superlatif sans preuve',
 symptome: '« Le meilleur outil du marché », « leader »',
 pourquoi: 'Dans une catégorie où tout le monde revendique la première place, le superlatif ne distingue plus personne. Il devient un bruit de fond.',
 correction:
 'Comparez sur un critère précis et vérifiable. « Le seul qui sort aussi du JSON exploitable » bat « le plus avancé » parce qu’il est contrôlable.',
 },
 {
 numero: '6',
 nom: 'Lrizona de la structure',
 symptome: 'Un bloc de texte de quinze lignes sans respiration',
 pourquoi: 'Sur mobile, un paragraphe long est un mur. Le lecteur abandonne avant la fin, et le reste du message n’existe plus.',
 correction:
 'Deux à trois lignes par paragraphe, séparés par un blanc. Un argument par section. Le blanc n’est pas de la place perdue, c’est ce qui rend le texte lisible.',
 },
 {
 numero: '7',
 nom: 'Le silence sur l’objection principale',
 symptome: 'La page se termine sur le prix, sans traitement du frein',
 pourquoi: 'L’objection non traitée ne devient pas une question, elle devient un départ silencieux. Vous ne saurez jamais qu’elle existait.',
 correction:
 'Traitez les trois objections réelles — prix, temps, confiance — dans le corps de la page. Une section entière, pas une ligne en bas.',
 },
 {
 numero: '8',
 nom: 'L’uniformité du ton',
 symptome: 'Le même registre sur une page de vente et un e-mail de bienvenue',
 pourquoi: 'Le ton doit s’adapter au moment de la décision. Un e-mail de bienvenue qui vend comme une page d’atterrissage fatigue.',
 correction:
 'Paramétrez le registre par canal : un e-mail de bienvenue et une page de vente n’appellent pas le même ton. Fixez le registre une fois, appliquez-le partout.',
 },
]

export function generateMetadata(): Metadata {
 return {
 title: `${ARTICLE.titre} | ia-premium`,
 description: ARTICLE.description,
 keywords: [ARTICLE.motCle, 'copie commerciale', 'rédaction persuasive'],
 alternates: { canonical: absoluteUrl(`/blog/${ARTICLE.slug}`) },
 openGraph: {
 title: ARTICLE.titre,
 description: ARTICLE.description,
 url: absoluteUrl(`/blog/${ARTICLE.slug}`),
 type: 'article',
 publishedTime: ARTICLE.dateIso,
 authors: [ARTICLE.auteur],
 locale: 'fr_FR',
 },
 }
}

export const dynamic = 'force-static'

export default function ArticleErreursCopieCommerciale() {
 return (
 <BlogArticleLayout article={ARTICLE}>
 <p className="text-lg leading-relaxed text-gray-600">
 Une copie commerciale ratée ne ressemble pas à une copie mal écrite. Elle ressemble à une
 copie correcte qui ne produit aucune décision. Le texte est fluide, la grammaire est
 respectée, et pourtant personne ne clique. Les huit erreurs qui suivent sont celles que
 nous retrouvons le plus souvent — d’abord dans les textes générés sans cadrage, ensuite
 dans ceux écrits à la main dans l’urgence.
 </p>

 <div className="not-prose my-6 grid gap-3">
 {ERREURS.map((e) => (
 <div key={e.numero} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
 <div className="flex items-baseline gap-3">
 <span className="font-mono text-sm font-bold text-indigo-600">{e.numero}</span>
 <h3 className="text-base font-bold" style={{ color: '#1e1b4b' }}>{e.nom}</h3>
 </div>
 <p className="mt-2 text-sm leading-relaxed text-gray-600">
 <span className="font-semibold text-gray-700">Symptôme : </span>
 {e.symptome}
 </p>
 <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
 <span className="font-semibold text-gray-700">Pourquoi : </span>
 {e.pourquoi}
 </p>
 <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
 <span className="font-semibold text-indigo-700">Correction : </span>
 {e.correction}
 </p>
 </div>
 ))}
 </div>

 <h2 className="pt-4 text-2xl font-black" style={{ color: '#1e1b4b' }}>
 L’erreur commune : la description au lieu du bénéfice
 </h2>
 <p>
 Les huit erreurs ci-dessus en contiennent une qui les résume toutes. La description
 explique ce que le produit est ; le bénéfice explique ce que le produit change. « Notre
 moteur produit du contenu en six catégories » décrit. « Vous n’avez plus à reformuler
 trois fois le même brief » décrit ce qui vous attend.
 </p>
 <p>
 La distinction n’est pas stylistique, elle est logique. Le lecteur ne cherche pas à acheter
 une catégorie de contenu. Il cherche à résoudre un problème qu’il a déjà. Partir de son
 problème plutôt que de votre produit est la seule inversion qui change la conversion.
 </p>

 <h2 className="pt-4 text-2xl font-black" style={{ color: '#1e1b4b' }}>
 Comment repérer ces erreurs automatiquement
 </h2>
 <p>
 Trois vérifications couvrent l’essentiel des défauts, et prennent moins de cinq minutes
 sur une page. Cherchez les superlatifs non suivis d’un chiffre. Comptez les appels à
 l’action : s’il y en a plus d’un par section, le problème est structurel. Relisez la
 première phrase de chaque paragraphe : si elle commence par « notre » plutôt que par «
 vous », l’angle est à reprendre.
 </p>
 <p>
 Ces trois gestes sont mécaniques. C’est exactement ce qui les rend fiables : ils ne
 dépendent ni du temps disponible ni de la fatigue en fin de journée. Notre article sur la{' '}
 <Link href="/blog/choisir-ton-ia" className="font-semibold text-indigo-700 underline">
 structuration du brief
 </Link>{' '}
 explique comment les intégrer en amont plutôt qu’en relecture.
 </p>
 </BlogArticleLayout>
 )
}
