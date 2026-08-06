import { describe, expect, it } from 'vitest';
import {
  buildRelationshipGraph,
  normalizeRouteAlias,
  validateAliases,
  validateIdentifierAndLifecycle,
  validateSeries,
} from '../../scripts/content/lib/governance.mjs';

type TestRelationshipEdge = {
  kind: string;
  id: string;
  title: string;
  route: string;
  explicit: boolean;
};

type TestDocument = {
  id: string;
  title: string;
  description: string;
  kind: string;
  status: string;
  route: string;
  aliases: string[];
  canonicalPath: string;
  synthetic: boolean;
  related: Record<string, string[]>;
  references: string[];
  series: string;
  seriesPosition: number;
  relationships: {
    outgoing: TestRelationshipEdge[];
    incoming: TestRelationshipEdge[];
  };
};

function document(overrides: Partial<TestDocument>): TestDocument {
  return {
    id: 'ADR-0001',
    title: 'Example',
    description: 'Example',
    kind: 'decision',
    status: 'accepted',
    route: '/artifacts/decisions/adr-0001',
    aliases: [],
    canonicalPath: 'adrs/ADR-0001.md',
    synthetic: false,
    related: {},
    references: [],
    series: 'ADR',
    seriesPosition: 1,
    relationships: {
      outgoing: [],
      incoming: [],
    },
    ...overrides,
  };
}

describe('content governance', () => {
  it('normalizes route aliases and rejects external values', () => {
    expect(normalizeRouteAlias('/Old Route/ADR-0001')).toBe('/old-route/adr-0001');
    expect(normalizeRouteAlias('https://example.com/old')).toBeNull();
  });

  it('validates identifier families and lifecycle transitions', () => {
    const issues: Array<Record<string, unknown>> = [];
    const current = document({ status: 'proposed' });
    validateIdentifierAndLifecycle(current, { status: 'accepted' }, issues);
    expect(issues.some((issue) => issue.code === 'CONTENT_LIFECYCLE_TRANSITION_INVALID')).toBe(
      true,
    );
  });

  it('builds reverse references and supersession inverses', () => {
    const issues: Array<Record<string, unknown>> = [];
    const oldDecision = document({ id: 'ADR-0001', status: 'superseded' });
    const newDecision = document({
      id: 'ADR-0002',
      route: '/artifacts/decisions/adr-0002',
      canonicalPath: 'adrs/ADR-0002.md',
      seriesPosition: 2,
      related: { supersedes: ['ADR-0001'] },
    });
    buildRelationshipGraph([oldDecision, newDecision], issues);

    expect(newDecision.relationships.outgoing[0]).toMatchObject({
      kind: 'supersedes',
      id: 'ADR-0001',
    });
    expect(oldDecision.relationships.incoming[0]).toMatchObject({
      kind: 'supersededBy',
      id: 'ADR-0002',
    });
  });

  it('rejects duplicate series positions and alias ownership', () => {
    const issues: Array<Record<string, unknown>> = [];
    const first = document({ aliases: ['/old-decision'] });
    const second = document({
      id: 'ADR-0002',
      route: '/artifacts/decisions/adr-0002',
      canonicalPath: 'adrs/ADR-0002.md',
      aliases: ['/old-decision'],
    });

    validateSeries([first, second], issues);
    validateAliases([first, second], issues);

    expect(issues.some((issue) => issue.code === 'CONTENT_SERIES_POSITION_DUPLICATE')).toBe(true);
    expect(issues.some((issue) => issue.code === 'CONTENT_ALIAS_DUPLICATE')).toBe(true);
  });
});
