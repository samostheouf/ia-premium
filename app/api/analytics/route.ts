// ia-premium — Tracking d'événements simples
//
// Principe : cet endpoint ne doit JAMAIS faire échouer l'action utilisateur.
// Un événement non persisté vaut mieux qu'une page qui casse : on répond 200
// avec `stored: false` dès que l'écriture échoue, et on log le problème.
//
// Validation stricte AVANT toute écriture sur disque :
//  - whitelist fermée des noms d'événement (pas dArborescence libre)
//  - taille maximale du payload (protection DoS / disque)
//  - types contraints sur chaque champ
//
// Stockage : JSONL append-only dans /tmp (via os.tmpdir(), qui vaut /tmp sur
// Vercel). Éphémère par nature — c'est un compteur de session/funnel, pas une
// base de données. Aucune dépendance npm : node:fs suffit.

import { NextResponse } from 'next/server';
import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createLogger, resolveRequestId, sanitize } from '@/lib/observability';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// ─── Configuration ───────────────────────────────────────────────────────────

/** Whitelist fermée : tout autre nom est rejeté. */
const ALLOWED_EVENTS = ['page_view', 'checkout_start', 'generate'] as const;
type EventName = (typeof ALLOWED_EVENTS)[number];

/** Taille max du corps JSON brut (octets). Au-delà → 413. */
const MAX_BODY_BYTES = 4 * 1024;
/** Taille max d'une chaîne de champ. */
const MAX_FIELD_LENGTH = 256;

const DATA_DIR = process.env.ANALYTICS_DIR || os.tmpdir();
const DATA_FILE = path.join(DATA_DIR, 'ia-premium-analytics.jsonl');

interface AnalyticsEvent {
  event: EventName;
  path?: string;
  variant?: string;
  category?: string;
  referrer?: string;
  sessionId?: string;
  ts: string;
  requestId: string;
}

// ─── Validation ──────────────────────────────────────────────────────────────

function isEventName(value: unknown): value is EventName {
  return typeof value === 'string' && (ALLOWED_EVENTS as readonly string[]).includes(value);
}

/** Champ texte optionnel : absent, ou chaîne tronquée à MAX_FIELD_LENGTH. */
function readOptionalString(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim().slice(0, MAX_FIELD_LENGTH);
  return trimmed.length > 0 ? trimmed : undefined;
}

function validate(body: unknown): { ok: true; event: AnalyticsEvent } | { ok: false; error: string; status: number } {
  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    return { ok: false, error: 'Corps de requête invalide (objet JSON attendu).', status: 400 };
  }

  const raw = body as Record<string, unknown>;

  if (!isEventName(raw.event)) {
    return {
      ok: false,
      error: `Événement inconnu. Valeurs acceptées : ${ALLOWED_EVENTS.join(', ')}.`,
      status: 400,
    };
  }

  return {
    ok: true,
    event: {
      event: raw.event,
      path: readOptionalString(raw.path),
      variant: readOptionalString(raw.variant),
      category: readOptionalString(raw.category),
      referrer: readOptionalString(raw.referrer),
      sessionId: readOptionalString(raw.sessionId),
      ts: new Date().toISOString(),
      requestId: '',
    },
  };
}

// ─── Stockage ────────────────────────────────────────────────────────────────

/**
 * Append JSONL. Ne lève jamais : retourne false si l'écriture est impossible
 * (répertoire absent, permissions, disque plein, filesystem read-only).
 */
async function appendEvent(event: AnalyticsEvent): Promise<boolean> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.appendFile(DATA_FILE, `${JSON.stringify(event)}\n`, 'utf8');
    return true;
  } catch {
    return false;
  }
}

// ─── Route ───────────────────────────────────────────────────────────────────

export async function POST(request: Request) {
  const requestId = resolveRequestId(request.headers.get('x-request-id'));
  const log = createLogger(requestId);

  try {
    // ── 1. Garde-fou taille AVANT de lire le corps ───────────────────────────
    // On se fie d'abord à l'en-tête (gratuit), puis au corps réel.
    const declaredLength = Number(request.headers.get('content-length'));
    if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
      return NextResponse.json(
        { error: 'Payload trop volumineux.', maxBytes: MAX_BODY_BYTES },
        { status: 413, headers: { 'x-request-id': requestId } },
      );
    }

    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json(
        { error: 'Payload trop volumineux.', maxBytes: MAX_BODY_BYTES },
        { status: 413, headers: { 'x-request-id': requestId } },
      );
    }

    // ── 2. Parsing + validation ──────────────────────────────────────────────
    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return NextResponse.json(
        { error: 'Corps de requête invalide (JSON attendu).' },
        { status: 400, headers: { 'x-request-id': requestId } },
      );
    }

    const validation = validate(parsed);
    if (!validation.ok) {
      // 400 volontaire : l'appelant est un bug front, il doit le savoir.
      // Ça ne casse rien côté utilisateur (le tracker client ignore la réponse).
      log.warn('analytics.rejected', { reason: validation.error, status: validation.status });
      return NextResponse.json(
        { error: validation.error },
        { status: validation.status, headers: { 'x-request-id': requestId } },
      );
    }

    // ── 3. Écriture best-effort ──────────────────────────────────────────────
    const event: AnalyticsEvent = { ...validation.event, requestId };
    const stored = await appendEvent(event);

    if (!stored) {
      // Stockage indisponible : on le signale dans les logs, mais on répond
      // quand même 200 pour ne jamais casser le client.
      log.warn('analytics.storage_unavailable', {
        path: DATA_FILE,
        event: event.event,
      });
    }

    return NextResponse.json(
      { ok: true, stored },
      { status: 200, headers: { 'Cache-Control': 'no-store', 'x-request-id': requestId } },
    );
  } catch (err) {
    // Filet de sécurité ultime : cette route ne doit jamais remonter une 500.
    log.error('analytics.unhandled_error', { err });
    return NextResponse.json(
      { ok: true, stored: false },
      { status: 200, headers: { 'Cache-Control': 'no-store', 'x-request-id': requestId } },
    );
  }
}

// ─── GET (lecture des compteurs, pour debug) ─────────────────────────────────

export async function GET(request: Request) {
  const requestId = resolveRequestId(request.headers.get('x-request-id'));

  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8');
    const counts: Record<string, number> = {};

    for (const line of raw.split('\n')) {
      if (!line.trim()) continue;
      try {
        // On relit chaque ligne comme un objet non validé : `sanitize` masque
        // tout ce qui ressemble à un secret avant de rendre la main.
        const parsed = JSON.parse(line) as Record<string, unknown>;
        const name = typeof parsed.event === 'string' ? parsed.event : 'unknown';
        counts[name] = (counts[name] ?? 0) + 1;
      } catch {
        /* ligne corrompue : on l'ignore et on continue */
      }
    }

    return NextResponse.json(
      { ok: true, file: DATA_FILE, total: Object.values(counts).reduce((a, b) => a + b, 0), counts },
      { status: 200, headers: { 'Cache-Control': 'no-store', 'x-request-id': requestId } },
    );
  } catch (err) {
    // Fichier absent = aucun événement sur cette instance. C'est normal.
    return NextResponse.json(
      {
        ok: true,
        stored: false,
        file: DATA_FILE,
        detail: sanitize(
          err instanceof Error ? err.message : 'Fichier indisponible',
        ) as string,
      },
      { status: 200, headers: { 'Cache-Control': 'no-store', 'x-request-id': requestId } },
    );
  }
}
