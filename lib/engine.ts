// ─── Moteur enrichi — branche un vrai modèle quand une clé API existe ───────
//
// PRINCIPE : `generatePremium` (lib/generator.ts) reste le chemin par défaut et
// n'est pas modifié. Ce module l'englobe : si une clé API est configurée, il
// délègue au modèle ; sinon il appelle le moteur à templates. L'API publique
// (`/api/generate`) appellera désormais `generateWithEngine`.
//
// Le générateur de templates est conservé tel quel comme repli : le produit
// reste utilisable même si le fournisseur est momentanément indisponible.

import 'server-only'

import { callLlm, isLlmConfigured, type LlmMessage } from './llm'
import {
  generateWithProgress,
  type GenerationOptions,
  type GenerationResult,
  type ProgressStep,
} from './generator'

/** Langues supportées par la page d'essai gratuit. */
const LANGUES: Record<string, { label: string; directive: string }> = {
  fr: { label: 'français', directive: 'Rédige en français.' },
  en: { label: 'English', directive: 'Write in English.' },
  es: { label: 'español', directive: 'Redacta en español.' },
  de: { label: 'Deutsch', directive: 'Schreibe auf Deutsch.' },
  it: { label: 'italiano', directive: 'Scrivi in italiano.' },
  pt: { label: 'português', directive: 'Escreva em português.' },
  zh: { label: '中文', directive: '请用中文写作。' },
}

const CATEGORIES: Record<string, string> = {
  copywriting: 'un texte de vente (page de vente, argumentaire)',
  'social-media': 'une publication pour les réseaux sociaux (LinkedIn, Instagram, X)',
  email: 'un e-mail marketing',
  'landing-page': 'la structure et la copie d’une landing page',
  storytelling: 'un récit de marque',
  ideoque: 'des idées de contenu et un plan éditorial',
}

/**
 * Détecte la langue du sujet à partir de marqueurs lexicaux.
 * Heuristique volontairement simple et explicable : elle sert à donner au
 * modèle la bonne consigne de langue, pas à traduire.
 */
export function detectLanguage(text: string): string {
  const t = text.toLowerCase()

  // CJK
  if (/[一-鿿぀-ヿ]/.test(t)) return 'zh'

  // Germanic + anglais
  if (/\b(the|and|for|with|software|invoice|business|customers|write|create)\b/.test(t)) return 'en'
  if (/\b(und|für|mit|der|die|das|software|kunden|schreiben|erstellen)\b/.test(t)) return 'de'

  // Romantique non-français
  if (/\b(el|los|las|para|con|software|clientes|escribir|crear)\b/.test(t)) return 'es'
  if (/\b(e|per|con|il|software|clienti|scrivere|creare)\b/.test(t)) return 'it'
  if (/\b(e|para|com|software|clientes|escrever|criar)\b/.test(t)) return 'pt'

  return 'fr'
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}

function buildSystemPrompt(
  options: GenerationOptions,
  lang: string,
  targetWords: number
): string {
  const l = LANGUES[lang] ?? LANGUES.fr
  const cat = CATEGORIES[options.category] ?? 'un contenu marketing'

  return [
    l.directive,
    '',
    `Rédige ${cat} sur le sujet suivant : « ${options.prompt} ».`,
    '',
    'CONTRAINTES :',
    `- Longueur cible : environ ${targetWords} mots.`,
    options.tone && options.tone.length > 0
      ? `- Ton : ${options.tone.join(', ')}.`
      : '- Ton : direct et professionnel.',
    options.targetAudience
      ? `- Public visé : ${options.targetAudience}.`
      : '',
    '- N’invente AUCUN chiffre, AUCUNE étude, AUCUN témoignage, AUCUN nom d’entreprise.',
    '- Si une donnée est nécessaire mais inconnue, écris explicitement [à remplacer par une donnée réelle].',
    '- Style : phrases courtes, pas de cliché, pas de superlatif invérifiable.',
    '- Un seul appel à l’action, en fin de texte.',
    '- Pas de titre markdown, pas depremière ligne descriptive : uniquement le contenu.',
  ]
    .filter(Boolean)
    .join('\n')
}

/**
 * Point d'entrée unique : bascule sur le LLM si configuré, sinon sur les
 * templates. Même signature que `generateWithProgress` pour que l'appelant ne
 * change pas.
 */
export async function generateWithEngine(
  options: GenerationOptions,
  progressCallback?: (step: ProgressStep) => void
): Promise<GenerationResult> {
  if (!isLlmConfigured()) {
    return generateWithProgress(options, progressCallback ?? (() => {}))
  }

  const lang = detectLanguage(options.prompt)
  const targetWords = options.lengthWords ?? 200

  const messages: LlmMessage[] = [
    { role: 'system', content: buildSystemPrompt(options, lang, targetWords) },
    { role: 'user', content: options.prompt },
  ]

  try {
    // Marge de tokens : ~2,2 token par mot en français, arrondi au supérieur.
    const result = await callLlm(messages, Math.ceil(targetWords * 2.2))

    if (result && result.content.trim().length > 0) {
      const content = result.content.trim()
      const base = await generateWithProgress(options, progressCallback ?? (() => {}))
      return {
        ...base,
        content,
        metadata: {
          ...base.metadata,
          provider: result.provider,
          model: result.model,
          engine: 'llm',
          language: lang,
          wordCount: countWords(content),
          targetWords,
        } as GenerationResult['metadata'],
        usage: {
          ...base.usage,
          inputTokens: result.inputTokens,
          outputTokens: result.outputTokens,
          totalTokens: result.inputTokens + result.outputTokens,
        } as GenerationResult['usage'],
      }
    }
  } catch (err) {
    // Ne jamais faire échouer la requête : on replie sur les templates.
    console.error(
      '[engine] appel LLM en échec, repli sur les templates :',
      err instanceof Error ? err.message : 'erreur inconnue'
    )
  }

  return generateWithProgress(options, progressCallback ?? (() => {}))
}
