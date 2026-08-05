import { NextResponse } from 'next/server';
import { getNavigationManifest } from '@/lib/navigation/manifest';

export const dynamic = 'force-static';

export async function GET() {
  const manifest = await getNavigationManifest();
  return NextResponse.json(manifest, {
    headers: {
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}
