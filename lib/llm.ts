// ─── Client LLM — branchement d'un vrai modèle sur le moteur de génération ───
//
// ÉTAT ACTUEL : ce fichier n'est PAS encore utilisé. `lib/generator.ts` est un
// moteur à templates déterministe (aucun appel réseau). Ce client existe pour
// brancher un vrai modèle, et sera activé dès qu'une clé API sera présente.
//
// POUR L'ACTIVER :
//   1. Ajouter UNE clé dans l'environnement Vercel (par ordre de préférence) :
//        XAI_API_KEY=xai-...          → Grok       (recommandé : crédits)
//        OPENAI_API_KEY=sk-...        → GPT-4o mini
//        ANTHROPIC_API_KEY=sk-ant-... → Claude Haiku
//      Jamais dans le dépôt, jamais dans un NEXT_PUBLIC_*.
//   2. Le moteur bascule automatiquement : voir `isLlmConfigured()` plus bas.
//      Si plusieurs clés sont présentes, xAI est prioritaire.
//   3. Recharger les variables : npx vercel env pull
//
// ⚠️ Une clé collée en clair dans une conversation est compromise. La révoquer
// et la régénérer avant tout déploiement. La poser via une commande qui
// masque la saisie (`npx vercel env add XAI_API_KEY production` en mode caché).
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
  provider: 'xai' | 'openai' | 'anthropic' | 'template'
  model: string
  inputTokens: number
  outputTokens: number
}

// `grok-4.7` n'existe pas : c'est un numéro erroné recopié depuis un exemple de
// la doc. La référence officielle courante est grok-4.6.
const XAI_MODEL = 'grok-4.6'
const OPENAI_MODEL = 'gpt-4o-mini'
const ANTHROPIC_MODEL = 'claude-3-5-haiku-latest'

/**
 * Le moteur utilise-t-il un vrai modèle ?
 * `generator.ts` interroge cette fonction et bascule sur le LLM si true,
 * sinon conserve le rendu par templates.
 */
export function isLlmConfigured(): boolean {
  return Boolean(
    process.env.XAI_API_KEY ||
      process.env.OPENAI_API_KEY ||
      process.env.ANTHROPIC_API_KEY
  )
}

/** Requête normalisée vers l'un ou l'autre fournisseur. */
interface LlmRequest {
  url: string
  headers: Record<string, string>
  body: Record<string, unknown>
  model: string
  /** Forme de la réponse : xAI Responses API ou Chat Completions. */
  api: 'responses' | 'chat'
}

function buildBody(messages: LlmMessage[], maxTokens: number): LlmRequest | null {
  // xAI en priorité : c'est le fournisseur avec lequel le compte est configuré,
  // et son API est compatible OpenAI (même corps, endpoint différent).
  const xaiKey = process.env.XAI_API_KEY
  if (xaiKey) {
    return {
      // API Responses : endpoint recommandé par xAI, compatible OpenAI.
      // `store: false` est OBLIGATOIRE ici : par défaut xAI conserve la
      // conversation 30 jours sur ses serveurs. Un produit qui traite du
      // contenu client ne doit pas laisser de copie chez le fournisseur.
      url: 'https://api.x.ai/v1/responses',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${xaiKey}`,
      },
      body: {
        model: XAI_MODEL,
        input: messages,
        max_output_tokens: maxTokens,
        temperature: 0.7,
        store: false,
      },
      model: XAI_MODEL,
      api: 'responses' as const,
    }
  }

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
      api: 'chat' as const,
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
      api: 'chat' as const,
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
  // `buildBody` renvoie déjà `LlmRequest | null` : on ne redéclare pas le type
  // ici, sinon cette annotation locale masquerait le discriminant `api`.
  const req = buildBody(messages, maxTokens)
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

  // ─── API Responses (xAI) ───────────────────────────────────────────────────
  // La réponse est un tableau `output` dont chaque bloc contient des
  // `content` de type `output_text`. Il n'y a pas de `choices`.
  if (req.api === 'responses') {
    const blocks = Array.isArray(data.output) ? data.output : []
    const text = blocks
      .flatMap((b: { content?: unknown }) =>
        Array.isArray(b.content) ? b.content : []
      )
      .filter((c: { type?: string }) => c?.type === 'output_text')
      .map((c: { text?: string }) => c.text ?? '')
      .join('')

    return {
      content: text,
      provider: 'xai',
      model: req.model,
      inputTokens: data.usage?.input_tokens ?? 0,
      outputTokens: data.usage?.output_tokens ?? 0,
    }
  }

  // ─── Chat Completions (OpenAI) ─────────────────────────────────────────────
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
