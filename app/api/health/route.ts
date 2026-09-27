// ia-premium — Health check enrichi
//
// Endpoint lu par l'utilisateur pour évaluer la santé du site : la réponse doit
// être CLAIRE (que fait chaque composant ?) et ACTIONNABLE (que faire quand
// ce n'est pas vert ?). Chaque sous-service expose donc `status` + `detail`
// + `remediation` (l'action corrective à mener).
//
// Runtime Node explicite : on lit process.env et on importe le moteur + Stripe.

import { NextResponse } from 'next/server';
import { isStripeConfigured, PRICES } from '@/lib/stripe';
import { generatePremium } from '@/lib/generator';
import { createLogger, resolveRequestId } from '@/lib/observability';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Timestamp de chargement du module → base de calcul de l'uptime.
// Sur Vercel (serverless), l'uptime est celui de l'instance courante, pas de
// tout le site : c'est documenté dans la réponse pour ne pas induire en erreur.
const BOOTED_AT = Date.now();

type CheckStatus = 'ok' | 'degraded' | 'down';

interface ServiceCheck {
  name: string;
  status: CheckStatus;
  detail: string;
  /** Action corrective à mener si le statut n'est pas 'ok'. */
  remediation?: string;
}

// ─── Sous-services ───────────────────────────────────────────────────────────

/**
 * Générateur de contenu : on fait un VRAI appel (smoke test) plutôt que de se
 * contenter de vérifier que le module s'importe. Le moteur est CPU pur et sans
 * dépendance externe, donc un rendu de 40 mots coûte moins d'une milliseconde —
 * c'est le seul moyen de détecter une régression de templates qui ne se verrait
 * sinon qu'à la première vraie génération utilisateur.
 */
async function checkGenerate(): Promise<ServiceCheck> {
  const startedAt = Date.now();
  try {
    const result = await generatePremium({
      category: 'copywriting',
      prompt: 'page de vente pour une formation en rédaction',
      lengthWords: 40,
    });

    const elapsedMs = Date.now() - startedAt;
    const ok = typeof result.content === 'string' && result.content.length > 0;

    return {
      name: 'generate',
      status: ok ? 'ok' : 'down',
      detail: ok
        ? `Moteur opérationnel — smoke test réussi en ${elapsedMs}ms (${result.content.length} caractères rendus, catégorie « ${result.category} »).`
        : 'Le moteur a répondu sans contenu : les templates sont probablement corrompus.',
      remediation: ok
        ? undefined
        : 'Inspecter TEMPLATES dans lib/generator.ts et redéployer.',
    };
  } catch (err) {
    return {
      name: 'generate',
      status: 'down',
      detail: `Le moteur de génération a échoué : ${err instanceof Error ? err.message : 'erreur inconnue'}.`,
      remediation:
        'Vérifier que lib/generator.ts compile (build Vercel en échec) puis redéployer.',
    };
  }
}

/** Checkout : catalogue + configuration Stripe. */
function checkCheckout(): ServiceCheck {
  const variants = Object.keys(PRICES);
  const pricesValid = variants.every((v) => PRICES[v as keyof typeof PRICES].amount > 0);

  if (!pricesValid) {
    return {
      name: 'checkout',
      status: 'down',
      detail: 'Une ou plusieurs formules ont un montant nul ou négatif dans lib/stripe.ts.',
      remediation: 'Corriger les montants dans PRICES (lib/stripe.ts) avant de vendre.',
    };
  }

  if (!isStripeConfigured()) {
    return {
      name: 'checkout',
      status: 'degraded',
      detail:
        `Catalogue des formules valide (${variants.join(', ')}), mais STRIPE_SECRET_KEY absente : la création de session de paiement renvoie 503.`,
      remediation:
        'Ajouter STRIPE_SECRET_KEY dans les variables d’environnement Vercel (sk_test_… en test, sk_live_… en production) puis redéployer.',
    };
  }

  return {
    name: 'checkout',
    status: 'ok',
    detail: `${variants.length} formules actives (${variants.join(', ')}) — Stripe configuré.`,
  };
}

/** Clé Stripe et signing secret webhook : deux risques distincts. */
function checkStripe(): ServiceCheck {
  if (!isStripeConfigured()) {
    return {
      name: 'stripe',
      status: 'degraded',
      detail: 'STRIPE_SECRET_KEY absente — mode dégradé, aucune transaction possible.',
      remediation: 'Renseigner STRIPE_SECRET_KEY dans Vercel, puis redéployer.',
    };
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    return {
      name: 'stripe',
      status: 'degraded',
      detail:
        'STRIPE_SECRET_KEY présente, mais STRIPE_WEBHOOK_SECRET absente : les ventes ne seront pas enregistrées automatiquement (POST /api/checkout/webhook renvoie 503).',
      remediation:
        'Récupérer le signing secret du webhook Stripe (Dashboard → Developers → Webhooks) et le poser dans STRIPE_WEBHOOK_SECRET.',
    };
  }

  return {
    name: 'stripe',
    status: 'ok',
    detail: 'Clé secrète et signing secret webhook présents.',
  };
}

// ─── Route ───────────────────────────────────────────────────────────────────

export async function GET(request: Request) {
  const requestId = resolveRequestId(request.headers.get('x-request-id'));
  const log = createLogger(requestId);

  const now = Date.now();
  const uptimeMs = now - BOOTED_AT;

  const checks: ServiceCheck[] = [await checkGenerate(), checkCheckout(), checkStripe()];

  const hasDown = checks.some((c) => c.status === 'down');
  const hasDegraded = checks.some((c) => c.status === 'degraded');

  // 'down' → 503 (le site ne peut pas servir sa promesse). 'degraded' → 200 :
  // le site fonctionne, une brique est inactive. On ne veut pas faire tomber un
  // monitoring à cause d'une clé Stripe absente en environnement de test.
  const overall: CheckStatus = hasDown ? 'down' : hasDegraded ? 'degraded' : 'ok';
  const httpStatus = hasDown ? 503 : 200;

  const actions = checks
    .filter((c) => c.remediation)
    .map((c) => ({ service: c.name, status: c.status, action: c.remediation }));

  if (hasDown) {
    log.error('health.degraded', { overall, down: checks.filter((c) => c.status === 'down').map((c) => c.name) });
  } else if (hasDegraded) {
    log.warn('health.degraded', { overall, degraded: checks.filter((c) => c.status === 'degraded').map((c) => c.name) });
  } else {
    log.info('health.ok');
  }

  return NextResponse.json(
    {
      status: overall,
      service: 'ia-premium',
      version: '0.1.0',
      commit: process.env.VERCEL_GIT_COMMIT_SHA ?? 'local',
      timestamp: new Date(now).toISOString(),
      region: process.env.VERCEL_REGION ?? 'unknown',
      requestId,

      // Uptime de l'instance courante (serverless = par instance, pas global).
      uptime: {
        seconds: Math.floor(uptimeMs / 1000),
        human: `${Math.floor(uptimeMs / 1000)}s`,
        bootedAt: new Date(BOOTED_AT).toISOString(),
        scope: 'instance',
        note: 'Uptime de l’instance serverless courante, pas du site complet.',
      },

      checks,

      // Récapitulatif actionnable : uniquement ce qui bloque.
      actions,
    },
    {
      status: httpStatus,
      headers: { 'Cache-Control': 'no-store', 'x-request-id': requestId },
    },
  );
}
