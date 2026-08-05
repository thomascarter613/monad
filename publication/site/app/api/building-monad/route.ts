import { NextResponse } from 'next/server';
import { getBuildingMonadManifest } from '@/lib/building-monad/manifest';

export const dynamic = 'force-static';

export async function GET() {
  const manifest = await getBuildingMonadManifest();
  return NextResponse.json(manifest, {
    headers: {
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}
