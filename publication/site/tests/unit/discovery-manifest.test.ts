import { describe, expect, it } from 'vitest';
import { buildDiscoveryManifest } from '../../scripts/content/lib/search-discovery.mjs';

describe('publication discovery manifest', () => {
  it('builds searchable governed facets without changing document identity', () => {
    const manifest = buildDiscoveryManifest(
      [
        {
          id: 'ADR-0001',
          title: 'Projection Boundary',
          description: 'Keeps canonical Markdown independent from the site.',
          body: '# Projection Boundary\n\nThe generated projection is disposable.',
          route: '/artifacts/decisions/adr-0001-projection-boundary',
          canonicalPath: 'adrs/ADR-0001-projection-boundary.md',
          kind: 'decision',
          status: 'accepted',
          family: 'ADR',
          tags: ['projection'],
          synthetic: false,
          seriesInfo: { key: 'ADR' },
        },
      ],
      '2026-08-04T00:00:00.000Z',
    );

    expect(manifest.schemaVersion).toBe(1);
    expect(manifest.documents[0].id).toBe('ADR-0001');
    expect(manifest.documents[0].searchText).toContain('disposable');
    expect(manifest.facets.statuses[0]).toMatchObject({ value: 'accepted', count: 1 });
  });
});
