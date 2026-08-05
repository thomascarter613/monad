import { buildingMonadRSS } from '@/lib/discovery/feeds';

export const revalidate = false;

export async function GET() {
  return new Response(await buildingMonadRSS(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
