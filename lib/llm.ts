// ─── Client LLM — branchement d'un vrai modèle sur le moteur de génération ───
//
// ÉTAT ACTUEL : ce fichier n'est PAS encore utilisé. `lib/generator.ts` est un
// moteur à templates déterministe (aucun appel réseau). Ce client existe pour
// brancher un vrai modèle, et sera activé dès qu'une clé API sera présente.
//
// POUR L'ACTIVER :
//   1. Ajouter la clé dans l'environnement Vercel :
//        OPENAI_API_KEY=sk-...        (ou ANTHROPIC_API_KEY=sk-ant-...)
//      Jamais dans le dépôt, jamais dans un NEXT_PUBLIC_*.
//   2. Le moteur bascule automatiquement : voir `isLlmConfigured()` plus bas.
//   3. Recharger les variables : npx vercel env pull
//
// Le reste de l'architecture (catégories, ton, longueur, format) est déjà en
// place dans `lib/generator.ts` et n'a pas besoin d'être modifié.

import 'server-only'

export interface LlmMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface LlmResult {
  content: string
  provider: 'openai' | 'anthropic' | 'template'
  model: string
  inputTokens: number
  outputTokens: number
}

const OPENAI_MODEL = 'gpt-4o-mini'
const ANTHROPIC_MODEL = 'claude-3-5-haiku-latest'

/**
 * Le moteur utilise-t-il un vrai modèle ?
 * `generator.ts` interroge cette fonction et bascule sur le LLM si true,
 * sinon conserve le rendu par templates.
 */
export function isLlmConfigured(): boolean {
  return Boolean(process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY)
}

/** Requête normalisée vers l'un ou l'autre fournisseur. */
interface LlmRequest {
  url: string
  headers: Record<string, string>
  body: Record<string, unknown>
  model: string
}

function buildBody(messages: LlmMessage[], maxTokens: number): LlmRequest | null {
  const openaiKey = process.env.OPENAI_API_KEY
  if (openaiKey) {
    return {
      url: 'https://api.openai.com/v1/chat/completions',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openaiKey}`,
      },
      body: {
        model: OPENAI_MODEL,
        messages,
        max_tokens: maxTokens,
        temperature: 0.7,
      },
      model: OPENAI_MODEL,
    }
  }

  const anthropicKey = process.env.ANTHROPIC_API_KEY
  if (anthropicKey) {
    // L'API Anthropic sépare le message système des messages de conversation.
    const system = messages.find((m) => m.role === 'system')?.content ?? ''
    const rest = messages.filter((m) => m.role !== 'system')
    return {
      url: 'https://api.anthropic.com/v1/messages',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicKey,
        'anthropic-version': '2023-06-01',
      },
      body: {
        model: ANTHROPIC_MODEL,
        max_tokens: maxTokens,
        system,
        messages: rest.map((m) => ({ role: m.role, content: m.content })),
      },
      model: ANTHROPIC_MODEL,
    }
  }

  return null
}

/**
 * Appelle le modèle configuré. Retourne `null` si aucune clé n'est présente —
 * l'appelant bascule alors sur le rendu par templates.
 */
export async function callLlm(
  messages: LlmMessage[],
  maxTokens = 900
): Promise<LlmResult | null> {
  // Union explicite : les deux branches ont des en-têtes différents, TS ne peut
  // pas les unifier seul à partir de l'objet littéral.
  const req: {
    url: string
    headers: Record<string, string>
    body: Record<string, unknown>
    model: string
  } | null = buildBody(messages, maxTokens)
  if (!req) return null

  const res = await fetch(req.url, {
    method: 'POST',
    headers: req.headers,
    body: JSON.stringify(req.body),
  })

  if (!res.ok) {
    const detail = await res.text()
    // Ne jamais exposer la clé ni le corps brut de l'erreur au client.
    console.error(`[llm] ${req.model} a renvoyé ${res.status}`, detail.slice(0, 300))
    return null
  }

  const data = await res.json()

  if (req.model.startsWith('gpt')) {
    return {
      content: data.choices?.[0]?.message?.content ?? '',
      provider: 'openai',
      model: req.model,
      inputTokens: data.usage?.prompt_tokens ?? 0,
      outputTokens: data.usage?.completion_tokens ?? 0,
    }
  }

  return {
    content: (data.content ?? []).map((b: { text: string }) => b.text).join(''),
    provider: 'anthropic',
    model: req.model,
    inputTokens: data.usage?.input_tokens ?? 0,
    outputTokens: data.usage?.output_tokens ?? 0,
  }
}
