import { describe, expect, it } from 'vitest';
import {
  buildingMonadSeries,
  resolveBuildingMonadPhase,
} from '@/building-monad.config.mjs';
import { buildBuildingMonadManifest } from '../../scripts/content/lib/building-monad.mjs';

function journalDocument(overrides: Record<string, unknown>) {
  return {
    id: 'MJ-0001',
    title: 'First installment',
    description: 'The first installment.',
    kind: 'journal-entry',
    status: 'published',
    route: '/building-monad/mj-0001',
    canonicalPath: 'journal/MJ-0001/article.md',
    synthetic: false,
    seriesPosition: 1,
    seriesInfo: { key: 'building-monad', position: 1, total: 2 },
    publication: {
      projectPhase: 'foundation',
      estimatedReadingMinutes: 8,
      wordCount: 1500,
    },
    relationships: { outgoing: [], incoming: [] },
    ...overrides,
  };
}

describe('Building Monad manifest', () => {
  it('orders installments, groups phases, and derives continuity', () => {
    const second = journalDocument({
      id: 'MJ-0002',
      title: 'Second installment',
      route: '/building-monad/mj-0002',
      canonicalPath: 'journal/MJ-0002/article.md',
      seriesPosition: 2,
      seriesInfo: { key: 'building-monad', position: 2, total: 2 },
      publication: {
        projectPhase: 'engine',
        estimatedReadingMinutes: 13,
        wordCount: 2700,
      },
      relationships: {
        outgoing: [
          {
            kind: 'decisions',
            id: 'ADR-0002',
            title: 'Coordinate native tools',
            route: '/artifacts/decisions/adr-0002',
            explicit: true,
          },
        ],
        incoming: [],
      },
    });
    const manifest = buildBuildingMonadManifest([second, journalDocument({})], '2026-08-04T00:00:00.000Z');

    expect(manifest.installments.map((entry) => entry.id)).toEqual(['MJ-0001', 'MJ-0002']);
    expect(manifest.installments[0].next?.id).toBe('MJ-0002');
    expect(manifest.installments[1].previous?.id).toBe('MJ-0001');
    expect(manifest.installments[1].artifacts[0].id).toBe('ADR-0002');
    expect(manifest.phases.map((phase) => phase.key)).toEqual(['foundation', 'engine']);
    expect(manifest.currentId).toBe('MJ-0002');
  });

  it('keeps custom project phases valid', () => {
    expect(resolveBuildingMonadPhase('prototype-lab')).toMatchObject({
      key: 'prototype-lab',
      title: 'Prototype Lab',
    });
  });

  it('publishes local reading-state policy in the shared series contract', () => {
    expect(buildingMonadSeries.storageKey).toBe('monad:building-monad:reading:v1');
    expect(buildingMonadSeries.completionThreshold).toBeGreaterThan(0.8);
    expect(buildingMonadSeries.completionThreshold).toBeLessThanOrEqual(1);
  });
});
