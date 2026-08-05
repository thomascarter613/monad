import { getExplorationManifest } from '@/lib/exploration/manifest';

export const dynamic = 'force-static';

export async function GET() {
  const manifest = await getExplorationManifest();
  return Response.json(manifest, {
    headers: {
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}
