/**
 * ia-premium — Moteur de génération de contenu premium
 *
 * Contenu de qualité supérieure : pas de commodité, pas de promesses
 * fantaisistes, résultats exploitables immédiatement.
 *
 * Architecture :
 *  - Templates premium par type de contenu (copywriting, réseaux sociaux,
 *    email marketing, landing page, storytelling)
 *  - Formats de sortie flexibles (texte brut, JSON structuré, markdown)
 *  - Callback de progression pour l'UX (étapes génératives)
 *  - Approche "humaine + cadrage" : le contenu est bâti comme un copywriter
 *    senior le ferait, pas comme une complétion statistique.
 */

// ─── Types & interfaces ───────────────────────────────────────────────────────

/** Catégorie de contenu premium générable */
export type ContentCategory =
  | "copywriting"
  | "social-media"
  | "email"
  | "landing-page"
  | "storytelling"
  | "ideoque"

/** Format de sortie */
export type OutputFormat = "plain" | "markdown" | "json"

/** Étape de progression générative */
export interface ProgressStep {
  stage: number;
  label: string;
  weight: number; // poids relatif dans la barre de progression (0-100)
  detail?: string;
}

/** Résultat de génération enrichi */
export interface GenerationResult {
  id: string;
  category: ContentCategory;
  format: OutputFormat;
  content: string;
  metadata: GenerationMetadata;
  prompt: string;
  usage: GenerationUsage;
  createdAt: string;
}

/** Métadonnées d'une génération */
export interface GenerationMetadata {
  tone: string[];
  targetAudience: string;
  intent: string;
  estimatedReadTimeSeconds: number;
  suggestedUses: string[];
  keywords: string[];
}

/** Métriques d'utilisation simulées (statistiquement plausibles) */
export interface GenerationUsage {
  tokensInput: number;
  tokensOutput: number;
  modelsConsidered: number;
}

/** Options de génération */
export interface GenerationOptions {
  /** Type de contenu à produire */
  category: ContentCategory;
  /** Format de sortie */
  format?: OutputFormat;
  /** Brief du contenu (sujet, angle, contraintes) */
  prompt: string;
  /** Ton(s) recherché(s) */
  tone?: string[];
  /** Public cible */
  targetAudience?: string;
  /** Longueur approximative en mots */
  lengthWords?: number;
  /** Appel de retour de progression (optionnel, pour l'UX) */
  onProgress?: (step: ProgressStep) => void;
  /** Variante de personnalité pour le générateur (creative, direct, luxury…) */
  personality?: ContentPersonality;
}

/** Personnalité du générateur — influence le style sans mentir sur les capacités */
export type ContentPersonality =
  | "creative"
  | "direct"
  | "luxury"
  | "analytical"
  | "persuasive"

// ─── Modèle client (simulateur premium) ─────────────────────────────────────

/**
 * Modèle client premium.
 *
 * En production, ce serait un appel à un LLM (GPT-4o, Claude, modèle
 * open-source fine-tuné). Ici, le simulateur produit du contenu de
 * qualité — structuré, cohérent, sans le classicisme "en tant qu'IA…".
 *
 * Le simulateur est intentionnellement limité : il ne promet pas de
 * perfection, il livre du contenu utilisable avec un travail humain
 * de polish. C'est le positionnement premium.
 */
class PremiumContentModel {
  /** Génère du contenu pour une catégorie et un brief donnés */
  generate(
    category: ContentCategory,
    prompt: string,
    options: Pick<GenerationOptions, "tone" | "targetAudience" | "lengthWords" | "personality">,
    progress: (step: ProgressStep) => void,
  ): { content: string; metadata: GenerationMetadata; usage: GenerationUsage } {
    const personality = options.personality ?? "direct";
    const tone = options.tone ?? this.defaultTone(category);
    const targetAudience = options.targetAudience ?? "professionnels du contenu";
    const lengthWords = options.lengthWords ?? 200;

    // Étapes génératives simulées (alignées sur un vrai pipeline LLM)
    const stages: ProgressStep[] = [
      { stage: 1, label: "Analyse du brief & cadrage", weight: 15, detail: "Interprétation des intentions" },
      { stage: 2, label: "Construction du squelette", weight: 25, detail: "Architecture du contenu" },
      { stage: 3, label: "Rédaction — passage 1", weight: 30, detail: "Réalisation du premier jet" },
      { stage: 4, label: "Affinement & ton", weight: 20, detail: "Polish stylistique" },
      { stage: 5, label: "Validation & métadonnées", weight: 10, detail: "Finalisation" },
    ];

    let accumulated = 0;
    for (const s of stages) {
      // Simuler un délai minimal pour que le callback soit visible en UX
      accumulated += s.weight;
      progress({ ...s, weight: accumulated });
      // pause microscopique non 블로quante — la vraie implémentation ne pause pas
    }

    const template = TEMPLATES[category];
    if (!template) {
      throw new Error(`Catégorie de contenu inconnue : ${category}`);
    }

    const rendered = this.renderTemplate(template, {
      prompt,
      tone,
      targetAudience,
      length: lengthWords,
      personality,
    });

    const words = this.countWords(rendered.content);
    const metadata = {
      tone,
      targetAudience,
      intent: this.inferIntent(category, prompt),
      estimatedReadTimeSeconds: Math.ceil(words / 200 * 60), // 200 mots/min
      suggestedUses: this.suggestUses(category, prompt),
      keywords: this.extractKeywords(rendered.content),
    };

    const usage = {
      tokensInput: Math.round(prompt.length / 4 * 1.3), // approx UTF-8 tokens
      tokensOutput: Math.round(rendered.content.length / 4 * 1.3),
      modelsConsidered: 3, // le modèle "choisit" entre plusieurs approches
    };

    return { content: rendered.content, metadata, usage };
  }

  private defaultTone(category: ContentCategory): string[] {
    const map: Record<ContentCategory, string[]> = {
      copywriting: ["persuasif", "direct", "sûr"],
      "social-media": ["engagant", "concis", "authenticité"],
      email: ["personnel", "valeur", "appel à l'action"],
      "landing-page": ["convaincant", "bénéfice-first", "clair"],
      storytelling: ["immersif", "émotionnel", "scénique"],
      ideoque: ["stratégique", "original", "brandant"],
    };
    return map[category] ?? ["équilibré"];
  }

  private inferIntent(category: ContentCategory, prompt: string): string {
    const lower = prompt.toLowerCase();
    if (lower.includes("vendre") || lower.includes("conversion"))
      return "conversion / vente";
    if (lower.includes("notre") || lower.includes("nous") || lower.includes("brand"))
      return "renforcement de marque";
    if (lower.includes("comment") || lower.includes("guide") || lower.includes("tutoriel"))
      return "éducation / autorité";
    if (lower.includes("événement") || lower.includes("annonce") || lower.includes("lancement"))
      return "annonce / lancement";
    return "engagement & valeur";
  }

  private suggestUses(category: ContentCategory, prompt: string): string[] {
    const map: Record<ContentCategory, string[]> = {
      copywriting: ["Page produit", "Section hero", "Fiche service", "Brochure"],
      "social-media": ["Post LinkedIn", "Thread Twitter", "Caption Instagram", "Newsletter snippet"],
      email: ["Email transactionnel", "Séquence d'onboarding", "Newsletter", "Relance"],
      "landing-page": ["Landing de lancement", "Page de vente", "Page de capture", "micro-site"],
      storytelling: ["À propos", "Cas client", "Speech fondateur", "Vidéo brand"],
      ideoque: ["Pitch deck", "Concept store", "Naming projet", "Positionnement market"],
    };
    return map[category] ?? ["Usage générique"];
  }

  private extractKeywords(content: string): string[] {
    const stopWords = new Set([
      "le", "la", "les", "un", "une", "des", "de", "du", "ce", "cette", "ces",
      "est", "sont", "que", "qui", "et", "ou", "mais", "donc", "car", "si",
      "en", "dans", "sur", "avec", "sans", "pour", "par", "comme", "son", "sa",
    ]);
    const words = content
      .toLowerCase()
      .replace(/[^\wéèêëàâäîïôöùûüç\s'-]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 2 && !stopWords.has(w));
    const freq: Record<string, number> = {};
    for (const w of words) freq[w] = (freq[w] ?? 0) + 1;
    return Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([k]) => k);
  }

  private countWords(text: string): number {
    return text.trim().split(/\s+/).filter(Boolean).length;
  }

  /**
   * Render une template avec le brief et les options.
   * Simule ici la transformation prompt→contenu ; en production,
   * remplacer par un appel LLM avec la template comme système prompt.
   */
  private renderTemplate(
    template: PremiumTemplate,
    ctx: {
      prompt: string;
      tone: string[];
      targetAudience: string;
      length: number;
      personality: ContentPersonality;
    },
  ): { content: string; structure: string[] } {
    const p = ctx.personality;
    const structure = template.structure;

    // Construction d'un contenu cohérent à partir de la structure
    // et du brief. Chaque section est rendue avec le ton et l'intention.
    const sections: string[] = structure.map((section, idx) => {
      const sectionContent = this.renderSection(section, ctx, idx);
      return sectionContent;
    });

    const raw = sections.join("\n\n");

    // Adaptation par personnalité
    const adapted = this.applyPersonality(raw, p, ctx.tone);

    return { content: adapted, structure };
  }

  private renderSection(
    section: TemplateSection,
    ctx: {
      prompt: string;
      tone: string[];
      targetAudience: string;
      length: number;
      personality: ContentPersonality;
    },
    idx: number,
  ): string {
    // Pour les vraies templates, cette méthode serait déléguée au LLM.
    // Ici, générer du contenu premium crédible à partir des variables.
    const topic = this.extractTopic(ctx.prompt);
    const isFirst = idx === 0;
    const isLast = idx === section.structure.length - 1;

    return section.render(this, {
      topic,
      tone: ctx.tone.join(", "),
      audience: ctx.targetAudience,
      length: ctx.length,
      personality: ctx.personality,
      position: isFirst ? "opening" : isLast ? "closing" : "body",
      index: idx,
    });
  }

  /**
   * Extrait le sujet principal du prompt (premier verbe/nom substantif utile).
   */
  private extractTopic(prompt: string): string {
    const cleaned = prompt.replace(/^(écris|réécris|génère|crée|fais|donne|produit|écris-moi|je veux|je cherche|j'ai besoin)\s*/i, "").trim();
    if (cleaned.length < 10) return prompt.trim();
    return cleaned.length > 60 ? cleaned.slice(0, 60) + "…" : cleaned;
  }

  /**
   * Applique les marqueurs de personnalité au texte brut.
   */
  private applyPersonality(content: string, personality: ContentPersonality, tone: string[]): string {
    // La personnalité influence le style, mais sans sur-génériciser.
    // En production, le LLM recevrait ces instructions dans le système prompt.
    switch (personality) {
      case "luxury":
        return this.enhanceLuxury(content);
      case "direct":
        return content; // déjà court et sûr par défaut
      case "creative":
        return this.enhanceCreative(content);
      case "analytical":
        return this.enhanceAnalytical(content);
      case "persuasive":
        return this.enhancePersuasive(content);
      default:
        return content;
    }
  }

  private enhanceLuxury(text: string): string {
    // Marqueurs de luxe : précision, retenue, absence de surenchère.
    // Remplace les verbs génériques par des formulations plus élégante.
    let t = text;
    t = t.replace(/\b(très|super|extra)\s+/gi, "");
    t = t.replace(/\b(assez)\s+/gi, "");
    t = t.replace(/\b(bon)\s+/gi, (m) => (Math.random() > 0.5 ? "solide" : "considérable"));
    return t;
  }

  private enhanceCreative(text: string): string {
    let t = text;
    // Injecte des images et des ruptures stylistiques controlées
    t = t.replace(/\b(c'est|cela est)\s+/gi, "Voici");
    return t;
  }

  private enhanceAnalytical(text: string): string {
    let t = text;
    // Renforce la structure et les références factuelles
    if (!t.includes("—") && Math.random() > 0.3) {
      t = t.replace(/([.]*)\s*$/, (m) => {
        const markers = ["Premièrement", "En premier lieu", "Il convient de noter que"];
        const pick = markers[Math.floor(Math.random() * markers.length)];
        return ` — ${pick}, `;
      });
    }
    return t;
  }

  private enhancePersuasive(text: string): string {
    let t = text;
    // Marqueurs de persuasion éthique : bénéfice, preuve implicite, appel à l'action
    if (!t.includes("vous")) {
      t = t.replace(/([.!?]?)\s*$/, (m) => {
        const ctas = [
          "Découvrez comment cela s'applique à votre contexte.",
          "C'est le moment de transformer cette idée en action.",
          "La question n'est pas de savoir si, mais comment.",
        ];
        const pick = ctns[Math.floor(Math.random() * ctns.length)];
        return ` ${pick}`;
      });
    }
    return t;
  }

  // ─── Templates premium ────────────────────────────────────────────────────
}

// ─── Templates de contenu premium ────────────────────────────────────────────

/** Section d'une template */
export interface TemplateSection {
  label: string;
  weight: number; // poids dans la structure globale (0-100)
  /** Render function — reçoit le contexte et retourne le contenu de la section */
  render: (
    model: PremiumContentModel,
    ctx: {
      topic: string;
      tone: string;
      audience: string;
      length: number;
      personality: ContentPersonality;
      position: "opening" | "body" | "closing";
      index: number;
    },
  ) => string;
}

/** Template complète pour une catégorie */
export interface PremiumTemplate {
  name: string;
  structure: TemplateSection[];
  /** Système prompt à utiliser en production (LLM) — reçoit le contexte au moment de l'usage */
  systemPromptHint: (ctx: {
    tone: string[];
    audience: string;
    length: number;
    topic: string;
  }) => string;
  qualityNote: string; // note de qualité pour l'équipe (pas montrée au client)
}

/**
 * Bibliothèque de templates premium.
 *
 * Chaque template est conçue comme un copywriter senior la construirait :
 * - Structure intentionnelle (pas de remplissage)
 * - Progression narrative ou logique
 * - Place pour l'appel à l'action au bon moment
 * - Absence de clichés IA ("en tant qu'IA langage…", "il est important de…")
 */
const TEMPLATES: Record<ContentCategory, PremiumTemplate> = {
  copywriting: {
    name: "Copywriting concentré",
    qualityNote: "Structure bénéfice-first, appel à l'action tardif mais présent, pas de promesse irréaliste.",
    systemPromptHint: ({ tone, audience, length, topic }) =>
      `Tu es un copywriter senior. Ton client te donne un brief et tu rédiges du contenu de vente concentré, sans remplissage ni promesses exagérées. Ton: ${tone.join(", ")}. Public cible: ${audience}. Longueur cible: ~${length} mots. Sujet: ${topic}.`,
    structure: [
      {
        label: "Accroche (hook)",
        weight: 20,
        render: (model, ctx) => {
          const t = ctx.topic;
          const openers = [
            `On parle souvent de ${t}, mais on oublie le point de départ :`,
            `La plupart abordent ${t} par la théorie. On va par les résultats.`,
            `Pour ceux qui cherchent à avancer sur ${t}, voici ce qui fait la différence.`,
            `${t} : pas de théorie, juste ce qui fonctionne.`,
          ];
          return openers[Math.floor(Math.random() * openers.length)];
        },
      },
      {
        label: "Problème / contexte",
        weight: 15,
        render: (model, ctx) => {
          const t = ctx.topic;
          const problemes = [
            `Le vrai défi avec ${t}, ce n'est pas le manque d'options—c'est le bruit autour. Trop de voix, pas assez de signal.`,
            `Quand on cherche à agir sur ${t}, on se heurte à un obstacle constant : les solutions génériques qui ne correspondent pas à la réalité du terrain.`,
            `Ceux qui ont affronté ${t} directement savent que la difficulté n'est pas technique—elle est contextuelle.`,
          ];
          return problemes[Math.floor(Math.random() * problemes.length)];
        },
      },
      {
        label: "Proposition / distinction",
        weight: 25,
        render: (model, ctx) => {
          const t = ctx.topic;
          const propositions = [
            `Ce qu'on propose ici, c'est une approche de ${t} qui part des cas concrets et remonte vers le principe. Pas l'inverse.`,
            `La proposition n'est pas de faire plus, mais de faire le bon choix sur ${t} du premier coup.`,
            `Sur ${t}, la valeur ne vient pas de la quantité d'information—elle vient de la précision.`,
          ];
          return propositions[Math.floor(Math.random() * propositions.length)];
        },
      },
      {
        label: "Preuve / credibilité",
        weight: 15,
        render: (model, ctx) => {
          const t = ctx.topic;
          return [
            `Ce n'est pas une approche théorique sur ${t}. Elle a été testée dans des situations où l'erreur coûte cher.`,
            `Ce qui compte sur ${t}, ce n'est pas l'ambition de la méthode mais sa reproductibilité.`,
            `Ce qui donne de la valeur à cette approche de ${t}, c'est qu'elle fonctionne même quand les conditions ne sont pas idéales.`,
          ][Math.floor(Math.random() * 3)];
        },
      },
      {
        label: "Appel à l'action (closing)",
        weight: 25,
        render: (model, ctx) => {
          const t = ctx.topic;
          const ctas = [
            `Si ${t} est sur votre radar, ne laissez pas la prochaine vague passez. Contactez-nous pour une conversation sans engagement.`,
            `La prochaine étape sur ${t} n'est pas de lire plus—c'est de tester. On peut vous montrer comment, sans pression.`,
            `Pour aller plus loin sur ${t}, il n'y a qu'une question à se poser : êtes-vous prêt à commencer ? Si oui, c'est là que ça commence.`,
          ];
          return ctas[Math.floor(Math.random() * ctas.length)];
        },
      },
    ],
  },

  "social-media": {
    name: "Post réseaux sociaux engageant",
    qualityNote: "Pas de clickbait. Structure : observation → insight → invitation. Adapté LinkedIn/Twitter.",
    systemPromptHint: ({ tone, audience, length, topic }) =>
      `Rédige un post réseaux sociaux (LinkedIn/Twitter) sur ${topic}. Ton: ${tone.join(", ")}. Public: ${audience}. Longueur: ~${length} mots. Pas de cliché IA, pas de "je suis passionné", pas de "mon voyage". Sois direct et utile.`,
    structure: [
      {
        label: "Observation (hook ligne 1)",
        weight: 25,
        render: (model, ctx) => {
          const t = ctx.topic;
          const lines = [
            `Ce que personne ne dit sur ${t}, c'est que :`,
            `J'ai passé du temps à observer ${t}. Voici ce qui m'a frappé.`,
            `${t} : on en parle beaucoup, mais on en fait trop peu.`,
            `La tendance sur ${t}, c'est de... Bref.`,
          ];
          return lines[Math.floor(Math.random() * lines.length)];
        },
      },
      {
        label: "Insight / valeur",
        weight: 40,
        render: (model, ctx) => {
          const t = ctx.topic;
          const insights = [
            `Le point clé : avec ${t}, le résultat ne dépend pas de la méthode la plus récente, mais de la méthode la plus adaptée à votre contexte.`,
            `Sur ${t}, ce qui change tout n'est pas la théorie. C'est la répétition avec intention.`,
            `Ceux qui avancent sur ${t} ne sont pas les plus brillants—ce sont les plus déterminés à appliquer.`,
            `La différence sur ${t}, entre ceux qui stagnent et ceux qui progressent : ils ont choisi de prioriser.`,
          ];
          return insights[Math.floor(Math.random() * insights.length)];
        },
      },
      {
        label: "Invitation / conclusion",
        weight: 20,
        render: (model, ctx) => {
          const t = ctx.topic;
          const closes = [
            `Et vous, vous avez quelle approche sur ${t} ? Je suis curieux d'avoir votre perspective.`,
            `Ce que je retiens sur ${t}, c'est que... Et si on en parlait en commentaire ?`,
            `Si ${t} vous parle, dites-le moi. Je continue d'explorer ce sujet.`,
          ];
          return closes[Math.floor(Math.random() * closes.length)];
        },
      },
      {
        label: "Hashtags / tags (optionnel)",
        weight: 15,
        render: (model, ctx) => {
          const t = ctx.topic;
          return `#${t.replace(/\s+/g, "")} #contenuPremium #stratégie`;
        },
      },
    ],
  },

  email: {
    name: "Email marketing — valeur avant vente",
    qualityNote: "Structure: contexte personnel → valeur concrète → CTA sous-tension. Pas de subject line clickbaity.",
    systemPromptHint: ({ tone, audience, length, topic }) =>
      `Rédige un email marketing de qualité sur ${topic}.Ton: ${tone.join(", ")}. Destinataire: ${audience}. Longueur: ~${length} mots. Subject line honnête. Valeur avant demande.`,
    structure: [
      {
        label: "Subject line",
        weight: 10,
        render: (model, ctx) => {
          const t = ctx.topic;
          const subjects = [
            `Ce qui change la donne sur ${t}`,
            `${t} — une perspective différente`,
            `Sur ${t}, j'ai changé d'avis`,
            `Petit point sur ${t}`,
          ];
          return subjects[Math.floor(Math.random() * subjects.length)];
        },
      },
      {
        label: "Opening — contexte",
        weight: 20,
        render: (model, ctx) => {
          const t = ctx.topic;
          const opens = [
            `Je reviens vers vous sur ${t}. Pas pour de la théorie, mais pour quelque chose de concret.`,
            `Un point rapide sur ${t}, puis je vous laisse.`,
            `Ce matin, en réfléchissant à ${t}, j'ai identifié quelque chose qui mérite votre attention.`,
          ];
          return opens[Math.floor(Math.random() * opens.length)];
        },
      },
      {
        label: "Valeur / insight principal",
        weight: 35,
        render: (model, ctx) => {
          const t = ctx.topic;
          const values = [
            `Voici le point : sur ${t}, la plupart des approches partent du mauvais endroit. Elles commencent par la solution avant de comprendre le problème. L'inverse marche mieux.`,
            `Sur ${t}, j'ai remarqué que ceux qui ont des résultats ne se concentrent pas sur tout. Ils choisissent un angle et ils le suivent jusqu'au bout.`,
            `Ce qui rend ${t} difficile, ce n'est pas le sujet lui-même. C'est qu'on a tendance à vouloir résoudre trop de choses en même temps.`,
          ];
          return values[Math.floor(Math.random() * values.length)];
        },
      },
      {
        label: "Appel à l'action (sous-tension)",
        weight: 20,
        render: (model, ctx) => {
          const t = ctx.topic;
          const ctas = [
            `Si ${t} est pertinent pour vous, on peut échanger. Pas de vente, juste une conversation pour voir si c'est aligné.`,
            `Je serais intéressé d'avoir votre avis sur ${t}. Si vous avez 15 minutes, on peut en discuter.`,
            `Pas de pression, mais si ${t} vous intéresse, répondez à cet email. Je vous envoie plus de détails.`,
          ];
          return ctas[Math.floor(Math.random() * ctas.length)];
        },
      },
      {
        label: "Closing",
        weight: 15,
        render: (model, ctx) => {
          return `Bonnes réflexions,`;
        },
      },
    ],
  },

  "landing-page": {
    name: "Landing page premium",
    qualityNote: "Structure hero→bénéfices→preuve→CTA. Pas de commodité. Pas de promesse exagérée. Positions de confiance.",
    systemPromptHint: ({ tone, audience, length, topic }) =>
      `Rédige les sections hero, bénéfices, preuve sociale et CTA pour une landing page premium sur ${topic}. Ton: ${tone.join(", ")}. Public: ${audience}. Valeurs réelles, pas d'exagération.`,
    structure: [
      {
        label: "Hero section (headline + sous-titre)",
        weight: 20,
        render: (model, ctx) => {
          const t = ctx.topic;
          const headlines = [
            `${t} : la méthode qui change la donne`,
            `Ce que ${t} devrait être`,
            `Pour ceux qui veulent sortir de l'ordinaire sur ${t}`,
            `${t}, enfin abordé sérieusement`,
          ];
          const subtitles = [
            `Pas de promesses, pas de bruit. Juste une approche qui fonctionne.`,
            `Une vision de ${t} qui va au-delà du conventionnel.`,
            `Pour les professionnels qui refusent les compromis sur ${t}.`,
            `Ce n'est pas pour tout le monde. Si ${t} est votre priorité, c'est pour vous.`,
          ];
          return `${headlines[Math.floor(Math.random() * headlines.length)]}\n\n${subtitles[Math.floor(Math.random() * subtitles.length)]}`;
        },
      },
      {
        label: "Bénéfices principaux",
        weight: 25,
        render: (model, ctx) => {
          const t = ctx.topic;
          const bens = [
            `Ce que vous obtenez avec cette approche de ${t} : une clarté qui manque la plupart du temps.`,
            `Travailler avec cette méthode sur ${t}, c'est gagner du temps et de la précision — deux rares simultanément.`,
            `Sur ${t}, l'approche change tout : moins de bruit, plus de signal.`,
          ];
          return bens[Math.floor(Math.random() * bens.length)];
        },
      },
      {
        label: "Preuve / différenciation",
        weight: 20,
        render: (model, ctx) => {
          const t = ctx.topic;
          const diffs = [
            `Ce qui distingue cette approche de ${t}, c'est qu'elle part des résultats, pas de la théorie.`,
            `Ce n'est pas la méthode la plus populaire sur ${t}. C'est celle qui donne les meilleurs résultats dans les situations réelles.`,
            `Ce qui fait la différence sur ${t}, ce n'est pas l'innovation pour l'innovation—c'est l'attention aux détails qui comptent vraiment.`,
          ];
          return diffs[Math.floor(Math.random() * diffs.length)];
        },
      },
      {
        label: "Section FAQ minimale",
        weight: 10,
        render: (model, ctx) => {
          const t = ctx.topic;
          return `Q : Combien de temps pour voir des résultats sur ${t} ?\nR : Ça dépend du point de départ. Ce que je peux dire, c'est que les premiers signaux arrivent plus vite qu'avec les approches conventionnelles.\n\nQ : Est-ce fait pour moi ?\nR : Si ${t} est une priorité pour vous et que vous êtes prêt à investir, probablement oui.`;
        },
      },
      {
        label: "CTA final",
        weight: 25,
        render: (model, ctx) => {
          const t = ctx.topic;
          const ctas = [
            `Prêt à aborder ${t} différemment ? Commencez ici.`,
            `Si vous êtes sérieux sur ${t}, c'est le moment.`,
            `La prochaine étape sur ${t} est entre vos mains. Cliquez pour prendre les vôtres.`,
          ];
          return ctas[Math.floor(Math.random() * ctas.length)];
        },
      },
    ],
  },

  storytelling: {
    name: "Storytelling narrative premium",
    qualityNote: "Structure scène → conflit → résolution émotionnelle. Place pour le lecteur. Pas de morale forcée.",
    systemPromptHint: ({ tone, audience, length, topic }) =>
      `Rédige un récit (storytelling) sur ${topic}. Ton: ${tone.join(", ")}. Public: ${audience}. Longueur: ~${length} mots. Structure: scène immersive, conflit, résolution avec résonance émotionnelle.`,
    structure: [
      {
        label: "Scène d'ouverture",
        weight: 25,
        render: (model, ctx) => {
          const t = ctx.topic;
          const scenes = [
            `Il était une fois, dans un contexte où ${t} comptait vraiment, qu'une décision devait être prise.`,
            `Tout a commencé par un instantané : ${t}, dans toute sa complexité, posé devant nous comme un puzzle.`,
            `Ce qui s'est passé ensuite, sur ${t}, n'était pas prévisible. Mais en retrospect, c'était logique.`,
          ];
          return scenes[Math.floor(Math.random() * scenes.length)];
        },
      },
      {
        label: "Conflit / tension",
        weight: 30,
        render: (model, ctx) => {
          const t = ctx.topic;
          const conflicts = [
            `Le problème, c'était que ${t} ne rendait pas les choses simples. Il les rendait plus claires, ce qui est différent.`,
            `Entre ce qu'on voulait faire sur ${t} et ce qui était possible, il y avait un écart. Un écart qui a fallu combler.`,
            `Ce qui rendait ${t} difficile, ce n'était pas l'obstacle technique. C'était l'incertitude de ne pas savoir si on était sur la bonne voie.`,
          ];
          return conflicts[Math.floor(Math.random() * conflicts.length)];
        },
      },
      {
        label: "Résolution / insight",
        weight: 25,
        render: (model, ctx) => {
          const t = ctx.topic;
          const resolutions = [
            `Et c'est là que a clicked : sur ${t}, la réponse n'était pas dans faire plus, mais dans faire mieux ce qui était déjà en place.`,
            `Ce qu'on a appris sur ${t}, c'est que la clé n'était pas dans la complexité, mais dans la précision.`,
            `Sur ${t}, la solution n'est pas toujours évidente. Mais elle est toujours là, si on est prêt à chercher.`,
          ];
          return resolutions[Math.floor(Math.random() * resolutions.length)];
        },
      },
      {
        label: "Résonance finale",
        weight: 20,
        render: (model, ctx) => {
          const t = ctx.topic;
          const finais = [
            `Ce qui reste de cette histoire sur ${t}, ce n'est pas la leçon. C'est la conviction que c'est possible.`,
            `Et si on en retient une chose sur ${t}, c'est que les meilleures approches ne sont pas les plus sophistiquées. Elles sont les plus honnêtes.`,
            `Si cette histoire sur ${t} vous parle, c'est peut-être que vous avez votre propre version à raconter.`,
          ];
          return finais[Math.floor(Math.random() * finais.length)];
        },
      },
    ],
  },

  ideoque: {
    name: "Idéoque — contenu signature",
    qualityNote: "Contenu qui porte une idée forte et originale. Pas de consensus, pas de compromis. Pour les marques qui ont une position claire.",
    systemPromptHint: ({ tone, audience, length, topic }) =>
      `Rédige un contenu 'ideoque' — une idée forte, originale, qui porte une position claire sur ${topic}. Ton: ${tone.join(", ")}. Public: ${audience}. Longueur: ~${length} mots. Pas de compromis, pas de consensus market.`,
    structure: [
      {
        label: "Thèse d'ouverture",
        weight: 25,
        render: (model, ctx) => {
          const t = ctx.topic;
          const thesises = [
            `Voici une idée qui va contre le marché sur ${t}, mais qui a du sens.`,
            `Ce n'est pas ce qu'on attend de ${t}. C'est ce qui devrait être.`,
            `Sur ${t}, le consensus c'est confortable. La vérité, elle, est différente.`,
          ];
          return thesises[Math.floor(Math.random() * thesises.length)];
        },
      },
      {
        label: "Argumentation — pourquoi",
        weight: 30,
        render: (model, ctx) => {
          const t = ctx.topic;
          const args = [
            `Pourquoi cette idée sur ${t} est powerful : parce qu'elle ne part pas des conventions. Elle part des faits.`,
            `Ce qui rend cette perspective sur ${t} différente, c'est qu'elle refuse de s'adapter au marché pour être acceptée. Elle force le marché à s'adapter.`,
            `Ce n'est pas une idée de market sur ${t}. C'est une idée de fond. La différence est importante.`,
          ];
          return args[Math.floor(Math.random() * args.length)];
        },
      },
      {
        label: "Implication — pour le lecteur",
        weight: 25,
        render: (model, ctx) => {
          const t = ctx.topic;
          const implications = [
            `Si cette idée sur ${t} est vraie, alors tout ce qu'on a fait jusqu'ici doit être réexaminé.`,
            `Ce qui change si cette idée sur ${t} est acceptée, c'est que plus personne ne peut continuer comme avant.`,
            `Ce n'est pas une idée qui se contente d'être entendue sur ${t}. C'est une idée qui transforme.`,
          ];
          return implications[Math.floor(Math.random() * implications.length)];
        },
      },
      {
        label: "Clôture — appel à la pensée",
        weight: 20,
        render: (model, ctx) => {
          const t = ctx.topic;
          const closes = [
            `La question n'est pas de savoir si cette idée sur ${t} est confortable. C'est de savoir si elle est vraie.`,
            `Ce qui est en jeu avec ${t}, ce n'est pas une préférence. C'est une orientation.`,
            `Et vous, vous êtes d'accord avec cette idée sur ${t} ? Ou vous êtes toujours dans le consensus ?`,
          ];
          return closes[Math.floor(Math.random() * closes.length)];
        },
      },
    ],
  },
};

// ─── Export de l'interface publique ───────────────────────────────────────────

/**
 * Génère du contenu premium.
 *
 * @param options - options de génération (catégorie, prompt, ton, etc.)
 * @returns promesse résolue avec le résultat enrichi
 *
 * @example
 * ```ts
 * const result = await generatePremium({
 *   category: "copywriting",
 *   prompt: " page de vente pour un service de conseil en stratégie",
 *   tone: ["direct", "sûr"],
 *   targetAudience: "PDG de PME",
 *   lengthWords: 250,
 *   onProgress: (step) => console.log(step.label),
 * });
 * ```
 */
export async function generatePremium(options: GenerationOptions): Promise<GenerationResult> {
  // Validation stricte en entrée
  if (!options.category) throw new Error("category est requis");
  if (!options.prompt || typeof options.prompt !== "string") throw new Error("prompt doit être une chaîne non vide");

  const model = new PremiumContentModel();
  const t0 = Date.now();

  const { content, metadata, usage } = model.generate(
    options.category,
    options.prompt,
    {
      tone: options.tone,
      targetAudience: options.targetAudience,
      lengthWords: options.lengthWords,
      personality: options.personality,
    },
    options.onProgress ?? (() => {}),
  );

  // Générer un ID unique
  const id = generateId();

  const result: GenerationResult = {
    id,
    category: options.category,
    format: options.format ?? "plain",
    content,
    metadata,
    prompt: options.prompt,
    usage,
    createdAt: new Date().toISOString(),
  };

  return result;
}

/**
 * Génère du contenu et le sérialise dans le format demandé.
 */
export async function generatePremiumFormatted(
  options: GenerationOptions & { format: OutputFormat },
): Promise<{ result: GenerationResult; output: string }> {
  const result = await generatePremium(options);

  let output: string;
  switch (options.format) {
    case "json":
      output = JSON.stringify(result, null, 2);
      break;
    case "markdown":
      output = renderMarkdown(result);
      break;
    case "plain":
    default:
      output = result.content;
      break;
  }

  return { result, output };
}

// ─── Helpers internes ────────────────────────────────────────────────────────

function generateId(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let id = "gen_";
  for (let i = 0; i < 16; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

function renderMarkdown(result: GenerationResult): string {
  const formatCategory = result.category
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  const meta = [
    `**Catégorie:** ${formatCategory}`,
    `**Public cible:** ${result.metadata.targetAudience}`,
    `**Ton:** ${result.metadata.tone.join(", ")}`,
    `**Intent:** ${result.metadata.intent}`,
    `**Lecture:** ~${result.metadata.estimatedReadTimeSeconds}s`,
    `**Mots-clés:** ${result.metadata.keywords.join(", ")}`,
  ].join("\n");

  const suggested = result.metadata.suggestedUses.length
    ? `\n\n**Utilisations suggérées:** ${result.metadata.suggestedUses.join(", ")}`
    : "";

  return `# Contenu Premium — ${formatCategory}

${result.content}

---

## Métadonnées${suggested}

${meta}`;
}

/**
 * Version asynchrone avec callback de progression.
 * Le simulateur actuel est synchrone, mais l'API expose cette interface
 * pour rester compatible avec une implémentation LLM future.
 */
export async function generateWithProgress(
  options: GenerationOptions,
  progressCallback: (step: ProgressStep) => void,
): Promise<GenerationResult> {
  return generatePremium({ ...options, onProgress: progressCallback });
}
