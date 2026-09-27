import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(
    {
      status: 'ok',
      service: 'ia-premium',
      timestamp: new Date().toISOString(),
      region: process.env.VERCEL_REGION ?? 'unknown',
    },
    {
      status: 200,
      headers: { 'Cache-Control': 'no-store' },
    }
  );
}
