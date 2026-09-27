/**
 * Test unitaire du moteur de génération premium.
 *
 * Ce module peut être exécuté directement avec Node pour vérifier
 * que le moteur produit du contenu cohérent sans erreur.
 *
 * Usage : npx tsx tests/generator.test.ts
 */

import { ContentCategory, generatePremium, generatePremiumFormatted } from "../lib/generator";

async function runTests() {
  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, message: string) {
    if (condition) {
      passed++;
      console.log(`  ✓ ${message}`);
    } else {
      failed++;
      console.error(`  ✗ ÉCHEC : ${message}`);
    }
  }

  console.log("── Tests du moteur de génération premium ──\n");

  // ── Test 1 : Génération copywriting ────────────────────────────────
  console.log("1. Copywriting — page de vente");
  try {
    const r1 = await generatePremium({
      category: "copywriting",
      prompt: "Service de conseil en stratégie pour PME",
      tone: ["direct", "sûr"],
      targetAudience: "PDG de PME",
      lengthWords: 150,
    });

    assert(
      typeof r1.content === "string" && r1.content.length > 50,
      "Contenu copywriting produit (longueur suffisante)",
    );
    assert(
      r1.metadata.tone.includes("direct") || r1.metadata.tone.includes("sûr"),
      "Ton respecté",
    );
    assert(
      r1.metadata.estimatedReadTimeSeconds > 0,
      "Temps de lecture estimé",
    );
    assert(
      r1.metadata.keywords.length > 0,
      "Mots-clés extraits",
    );
    assert(
      r1.metadata.suggestedUses.length > 0,
      "Utilisations suggérées",
    );
    // Vérifier qu'il n'y a pas de clichés IA
    const clichePatterns = [
      /en tant qu'ia/i,
      /je suis une/i,
      /en tant qu'assistant/i,
      /en tant que modèle/i,
      /il est important de souligner/i,
      /il est primordial de/i,
    ];
    for (const pattern of clichePatterns) {
      assert(!pattern.test(r1.content), `Pas de cliché IA détecté (${pattern})`);
    }
    console.log(`   Contenu (extrait) :\n   "${r1.content.slice(0, 120)}…\n"`);
  } catch (err) {
    failed++;
    console.error(`  ✗ ÉCHEC : ${err}\n`);
  }

  // ── Test 2 : Social media ───────────────────────────────────────────
  console.log("2. Réseaux sociaux — post LinkedIn");
  try {
    const r2 = await generatePremium({
      category: "social-media",
      prompt: "L'importance de la stratégie de contenu pour les marques",
      tone: ["engagant"],
      targetAudience: "Marketeurs",
      lengthWords: 100,
    });

    assert(
      r2.content.length > 30,
      "Contenu réseaux sociaux produit",
    );
    // Un post doit avoir une structure (pas un seul paragraphe sans contexte)
    const sections = r2.content.split(/\n\n+/);
    assert(sections.length >= 2, "Structure multi-sections présente");
  } catch (err) {
    failed++;
    console.error(`  ✗ ÉCHEC : ${err}\n`);
  }

  // ── Test 3 : Email marketing ────────────────────────────────────────
  console.log("3. Email marketing");
  try {
    const r3 = await generatePremium({
      category: "email",
      prompt: "Nouveau service de conseil en stratégie",
      tone: ["personnel", "valeur"],
      targetAudience: "Clients existants",
      lengthWords: 120,
    });

    assert(
      r3.content.length > 40,
      "Contenu email produit",
    );
    // Un email devrait avoir un opening et un closing
    assert(
      /^(objet|subject|sujet|ce qui|bonjour|je reviens|un point)/i.test(r3.content.slice(0, 30)),
      "Opening crédible présent",
    );
  } catch (err) {
    failed++;
    console.error(`  ✗ ÉCHEC : ${err}\n`);
  }

  // ── Test 4 : Landing page ───────────────────────────────────────────
  console.log("4. Landing page");
  try {
    const r4 = await generatePremium({
      category: "landing-page",
      prompt: "Plateforme de gestion de contenu premium pour créateurs",
      tone: ["convaincant", "bénéfice-first"],
      targetAudience: "Créateurs de contenu",
      lengthWords: 200,
    });

    assert(
      r4.content.length > 80,
      "Contenu landing page produit",
    );
    // Devrait avoir au moins 2 sections distinctes (hero + bénéfices ou CTA)
    const lines = r4.content.split("\n");
    assert(
      lines.length > 3,
      "Plusieurs lignes/sections présentes",
    );
  } catch (err) {
    failed++;
    console.error(`  ✗ ÉCHEC : ${err}\n`);
  }

  // ── Test 5 : Format JSON ────────────────────────────────────────────
  console.log("5. Format de sortie JSON");
  try {
    const { output } = await generatePremiumFormatted({
      category: "storytelling",
      prompt: "L'histoire d'un créateur qui a trouvé sa voix",
      format: "json",
      tone: ["immersif"],
      lengthWords: 100,
    });

    const parsed = JSON.parse(output);
    assert(
      typeof parsed === "object" && parsed.id !== undefined,
      "Sortie JSON valide et parsable",
    );
    assert(
      parsed.content.length > 30,
      "Contenu présent dans la sortie JSON",
    );
  } catch (err) {
    failed++;
    console.error(`  ✗ ÉCHEC : ${err}\n`);
  }

  // ── Test 6 : Toutes les catégories ──────────────────────────────────
  console.log("6. Couverture de toutes les catégories");
  const categories: ContentCategory[] = [
    "copywriting",
    "social-media",
    "email",
    "landing-page",
    "storytelling",
    "ideoque",
  ];

  for (const cat of categories) {
    try {
      const r = await generatePremium({
        category: cat,
        prompt: `Contenu sur un sujet ${cat}`,
        lengthWords: 50,
      });
      assert(
        r.content.length > 20,
        `Catégorie "${cat}" produit du contenu`,
      );
    } catch (err) {
      failed++;
      console.error(`  ✗ ÉCHEC catégorie ${cat}: ${err}\n`);
    }
  }

  // ── Test 7 : Callback de progression ────────────────────────────────
  console.log("7. Callback de progression");
  try {
    const steps: { stage: number; label: string }[] = [];
    await generatePremium({
      category: "copywriting",
      prompt: "Test de progression",
      lengthWords: 50,
      onProgress: (step) => {
        steps.push({ stage: step.stage, label: step.label });
      },
    });

    assert(
      steps.length === 5,
      `5 étapes de progression reçues (reçues: ${steps.length})`,
    );
    assert(
      steps[0].stage === 1 && steps[0].label.includes("Analyse"),
      "Étape 1 : Analyse du brief",
    );
    assert(
      steps[4].stage === 5 && steps[4].label.includes("Validation"),
      "Étape 5 : Validation",
    );
    console.log(`   Étapes : ${steps.map((s) => s.label).join(" → ")}`);
  } catch (err) {
    failed++;
    console.error(`  ✗ ÉCHEC : ${err}\n`);
  }

  // ── Résultats ──────────────────────────────────────────────────────
  console.log(`\n── Résultats : ${passed} passés, ${failed} échoués ──`);
  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error("Erreur critique :", err);
  process.exit(1);
});
