import { NextRequest, NextResponse } from "next/server";
import { generateWithProgress, type GenerationResult, type GenerationOptions } from "@/lib/generator";
import type { ContentCategory, ContentPersonality, OutputFormat } from "@/lib/generator";
import { createLogger, resolveRequestId } from "@/lib/observability";

// ─── Validation ───────────────────────────────────────────────────────────────

// Retourne un simple booléen : un type predicate ne peut pas être plus spécifique
// que `Record<string, unknown>`, qui est le type d'entrée. Le cast est fait
// déjà au moment de la déstructuration, après validation.
function validateOptions(raw: Record<string, unknown>): boolean {
  if (!raw.category || !raw.prompt) {
    return false;
  }

  const validCategories: ContentCategory[] = [
    "copywriting",
    "social-media",
    "email",
    "landing-page",
    "storytelling",
    "ideoque",
  ];

  if (!validCategories.includes(raw.category as ContentCategory)) {
    return false;
  }

  // Si format est fourni, le valider
  if (raw.format !== undefined) {
    const validFormats: OutputFormat[] = ["plain", "markdown", "json"];
    if (!validFormats.includes(raw.format as OutputFormat)) {
      return false;
    }
  }

  // longueur doit être un entier positif si fourni
  if (raw.lengthWords !== undefined) {
    if (typeof raw.lengthWords !== "number" || raw.lengthWords <= 0 || raw.lengthWords > 5000) {
      return false;
    }
  }

  return true;
}

// ─── Route POST ──────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  const log = createLogger(resolveRequestId(request.headers.get("x-request-id")));

  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Corps de requête invalide (JSON attendu)" },
      { status: 400 },
    );
  }

  if (!validateOptions(body)) {
    return NextResponse.json(
      {
        error: "Options de génération invalides",
        details: "Champs requis : category (copywriting|social-media|email|landing-page|storytelling|ideoque), prompt. Le format optionnel doit être plain|markdown|json.",
      },
      { status: 400 },
    );
  }

  const {
    category,
    prompt,
    format = "plain",
    tone = [],
    targetAudience = "",
    lengthWords = 200,
    personality = "direct",
  } = body as unknown as GenerationOptions & { format: OutputFormat };

  // Sauvegarder le callback de progression dans les logs serveur (optionnel)
  const progressSteps: { stage: number; label: string; weight: number }[] = [];

  try {
    const result = await generateWithProgress(
      {
        category: category as ContentCategory,
        prompt: prompt as string,
        format,
        tone: (tone as string[]) ?? [],
        targetAudience: targetAudience as string,
        lengthWords: lengthWords as number,
        personality: personality as ContentPersonality,
      },
      (step) => {
        progressSteps.push({ stage: step.stage, label: step.label, weight: step.weight });
      },
    );

    log.info("generate.success", {
      generationId: result.id,
      category: result.category,
      format: result.format,
      outputChars: result.content.length,
      tokensOutput: result.usage.tokensOutput,
    });

    // Retourner le contenu + métadonnées + steps de progression
    return NextResponse.json({
      success: true,
      result: {
        id: result.id,
        category: result.category,
        format: result.format,
        content: result.content,
        metadata: result.metadata,
        prompt: result.prompt,
        usage: {
          tokensInput: result.usage.tokensInput,
          tokensOutput: result.usage.tokensOutput,
          modelsConsidered: result.usage.modelsConsidered,
        },
        createdAt: result.createdAt,
      },
      progress: progressSteps,
    });
  } catch (err) {
    log.error("generate.error", { err });
    return NextResponse.json(
      {
        error: "Erreur lors de la génération du contenu",
        message: err instanceof Error ? err.message : "Erreur inconnue",
      },
      { status: 500 },
    );
  }
}

// ─── Route GET (health check) ─────────────────────────────────────────────────

export async function GET() {
  return NextResponse.json({
    service: "ia-premium generate API",
    version: "0.1.0",
    status: "operational",
    capabilities: [
      "copywriting",
      "social-media",
      "email",
      "landing-page",
      "storytelling",
      "ideoque",
    ],
    formats: ["plain", "markdown", "json"],
    personalityOptions: ["creative", "direct", "luxury", "analytical", "persuasive"],
  });
}
