import { describe, expect, it } from 'vitest';
import { buildExplorationManifest } from '../../scripts/content/lib/exploration.mjs';

function document(overrides: Record<string, unknown>) {
  return {
    id: 'ADR-0001',
    title: 'First decision',
    description: 'First decision description.',
    kind: 'decision',
    family: 'ADR',
    status: 'superseded',
    route: '/artifacts/decisions/adr-0001',
    canonicalPath: 'adrs/ADR-0001.md',
    synthetic: false,
    tags: [],
    relationships: { outgoing: [], incoming: [] },
    ...overrides,
  };
}

function registry(documents: unknown[], series: unknown[] = []) {
  return {
    generatedAt: '2026-08-04T00:00:00.000Z',
    documents,
    series,
  };
}

describe('artifact exploration manifest', () => {
  it('derives facets, edges, supersession chains, and series progress', () => {
    const older = document({
      relationships: {
        outgoing: [],
        incoming: [
          {
            kind: 'supersededBy',
            id: 'ADR-0002',
            title: 'Second decision',
            route: '/artifacts/decisions/adr-0002',
            explicit: true,
          },
        ],
      },
    });
    const newer = document({
      id: 'ADR-0002',
      title: 'Second decision',
      status: 'accepted',
      route: '/artifacts/decisions/adr-0002',
      canonicalPath: 'adrs/ADR-0002.md',
      publication: { publishedAt: '2026-08-04' },
      relationships: {
        incoming: [],
        outgoing: [
          {
            kind: 'supersedes',
            id: 'ADR-0001',
            title: 'First decision',
            route: '/artifacts/decisions/adr-0001',
            explicit: true,
          },
        ],
      },
    });
    const manifest = buildExplorationManifest(
      registry(
        [older, newer],
        [
          {
            key: 'ADR',
            total: 3,
            documentCount: 2,
            documents: [
              {
                id: 'ADR-0001',
                title: 'First',
                route: older.route,
                position: 1,
                status: 'superseded',
              },
              {
                id: 'ADR-0002',
                title: 'Second',
                route: newer.route,
                position: 2,
                status: 'accepted',
              },
            ],
          },
        ],
      ),
    );

    expect(manifest.documentCount).toBe(2);
    expect(manifest.relationshipCount).toBe(1);
    expect(manifest.supersessionChains).toHaveLength(1);
    expect(manifest.supersessionChains[0].nodes.map((entry) => entry.id)).toEqual([
      'ADR-0002',
      'ADR-0001',
    ]);
    expect(manifest.series[0]).toMatchObject({
      completionPercent: 67,
      remainingCount: 1,
    });
    expect(manifest.timeline.events[0]).toMatchObject({
      documentId: 'ADR-0002',
      type: 'published',
    });
  });

  it('keeps undated documents explicit', () => {
    const manifest = buildExplorationManifest(registry([document({})]));
    expect(manifest.timeline.eventCount).toBe(0);
    expect(manifest.timeline.undated.map((entry) => entry.id)).toEqual(['ADR-0001']);
  });
});
