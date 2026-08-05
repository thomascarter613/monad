import { getEditionManifest } from '@/lib/editions/manifest';

export const revalidate = false;

export async function GET() {
  return Response.json(await getEditionManifest(), {
    headers: {
      'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}
