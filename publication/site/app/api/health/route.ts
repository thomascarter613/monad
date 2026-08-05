import { operationalSnapshot } from '@/lib/operations/build-info';

export const dynamic = 'force-dynamic';

export async function GET() {
  const snapshot = await operationalSnapshot();
  return Response.json(snapshot, {
    status: snapshot.status === 'ok' ? 200 : 503,
    headers: {
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}
