import { describe, expect, it } from 'vitest';
import { buildEditionManifest } from '../../scripts/content/lib/editions.mjs';

function document(id: string, route: string, position: number) {
  return {
    id,
    title: id,
    description: `${id} description`,
    route,
    canonicalPath: `${id}.md`,
    sourceRoot: route.split('/')[1],
    sourceHash: id.toLowerCase(),
    kind: route.startsWith('/building-monad') ? 'journal-entry' : 'specification',
    status: 'published',
    family: id.split('-').slice(0, -1).join('-'),
    seriesInfo: { key: id.startsWith('MJ-') ? 'building-monad' : 'MKE-CORE', position },
    tags: [],
    synthetic: false,
  };
}

describe('edition manifest compiler', () => {
  it('selects surfaces and preserves deterministic series order', () => {
    const manifest = buildEditionManifest(
      [
        document('MKE-CORE-0002', '/artifacts/specifications/mke-core-0002', 2),
        document('MJ-0001', '/building-monad/mj-0001', 1),
        document('MKE-CORE-0001', '/artifacts/specifications/mke-core-0001', 1),
      ],
      '2026-08-04T00:00:00.000Z',
    );
    expect(
      manifest.editions.find((edition) => edition.key === 'building-monad')?.documents,
    ).toHaveLength(1);
    expect(
      manifest.editions
        .find((edition) => edition.key === 'reference')
        ?.documents.map((entry: { id: string }) => entry.id),
    ).toEqual(['MKE-CORE-0001', 'MKE-CORE-0002']);
  });
});
