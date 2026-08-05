import { NextResponse } from 'next/server';
import { getDiscoveryManifest } from '@/lib/discovery/manifest';
import type { DiscoveryDocument } from '@/lib/discovery/types';

const maximumLimit = 100;
const defaultLimit = 24;

function normalized(value: string | null) {
  return value?.trim().toLowerCase() ?? '';
}

function positiveInteger(value: string | null, fallback: number) {
  const parsed = Number.parseInt(value ?? '', 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

function matches(value: string | undefined, expected: string) {
  return !expected || value?.toLowerCase() === expected;
}

function queryScore(document: DiscoveryDocument, query: string) {
  if (!query) return 1;
  const terms = query.split(/\s+/).filter(Boolean);
  const id = document.id.toLowerCase();
  const title = document.title.toLowerCase();
  const description = document.description.toLowerCase();
  const tags = document.tags.join(' ').toLowerCase();
  const body = document.searchText ?? '';
  let score = 0;

  for (const term of terms) {
    let termScore = 0;
    if (id === term) termScore = Math.max(termScore, 220);
    if (id.startsWith(term)) termScore = Math.max(termScore, 170);
    if (title === term) termScore = Math.max(termScore, 150);
    if (title.includes(term)) termScore = Math.max(termScore, 110);
    if (tags.includes(term)) termScore = Math.max(termScore, 75);
    if (description.includes(term)) termScore = Math.max(termScore, 55);
    if (body.includes(term)) termScore = Math.max(termScore, 20);
    if (termScore === 0) return 0;
    score += termScore;
  }

  if (!document.synthetic) score += 8;
  if (document.status === 'published' || document.status === 'accepted') score += 4;
  return score;
}

export async function GET(request: Request) {
  const manifest = await getDiscoveryManifest();
  const url = new URL(request.url);
  const query = normalized(url.searchParams.get('q'));
  const filters = {
    surface: normalized(url.searchParams.get('surface')),
    kind: normalized(url.searchParams.get('kind')),
    status: normalized(url.searchParams.get('status')),
    family: normalized(url.searchParams.get('family')),
    series: normalized(url.searchParams.get('series')),
    tag: normalized(url.searchParams.get('tag')),
  };
  const offset = positiveInteger(url.searchParams.get('offset'), 0);
  const limit = Math.min(maximumLimit, positiveInteger(url.searchParams.get('limit'), defaultLimit));

  const ranked = manifest.documents
    .filter((document) => matches(document.surface, filters.surface))
    .filter((document) => matches(document.kind, filters.kind))
    .filter((document) => matches(document.status, filters.status))
    .filter((document) => matches(document.family, filters.family))
    .filter((document) => matches(document.series, filters.series))
    .filter(
      (document) =>
        !filters.tag || document.tags.some((tag) => tag.toLowerCase() === filters.tag),
    )
    .map((document) => ({ document, score: queryScore(document, query) }))
    .filter((entry) => entry.score > 0)
    .sort(
      (left, right) =>
        right.score - left.score ||
        left.document.id.localeCompare(right.document.id, undefined, { numeric: true }),
    );

  const results = ranked
    .slice(offset, offset + limit)
    .map(({ document, score }: { document: DiscoveryDocument; score: number }) => {
      const { searchText: _searchText, ...publicDocument } = document;
      return { ...publicDocument, score };
    });

  return NextResponse.json(
    {
      schemaVersion: manifest.schemaVersion,
      generatedAt: manifest.generatedAt,
      query,
      filters,
      total: ranked.length,
      limit,
      offset,
      facets: manifest.facets,
      results,
    },
    {
      headers: {
        'Cache-Control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=3600',
      },
    },
  );
}
