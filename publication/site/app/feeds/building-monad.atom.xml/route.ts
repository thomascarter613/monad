import { buildingMonadAtom } from '@/lib/discovery/feeds';

export const revalidate = false;

export async function GET() {
  return new Response(await buildingMonadAtom(), {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
