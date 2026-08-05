import { NextResponse } from 'next/server';
import { getContentRegistry } from '@/lib/content/registry';


export async function GET(request: Request) {
  const registry = await getContentRegistry();
  const url = new URL(request.url);
  const kind = url.searchParams.get('kind');
  const status = url.searchParams.get('status');
  const series = url.searchParams.get('series');
  const query = url.searchParams.get('q')?.trim().toLowerCase();

  const documents = registry.documents.filter((document) => {
    if (kind && document.kind !== kind) return false;
    if (status && document.status !== status) return false;
    if (series && document.series?.key !== series) return false;
    if (
      query &&
      ![document.id, document.title, document.description, document.canonicalPath]
        .join(' ')
        .toLowerCase()
        .includes(query)
    ) {
      return false;
    }
    return true;
  });

  return NextResponse.json({
    schemaVersion: registry.schemaVersion,
    contractVersion: registry.contractVersion,
    generatedAt: registry.generatedAt,
    count: documents.length,
    documents,
  });
}
