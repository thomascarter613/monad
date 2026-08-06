import { describe, expect, it } from 'vitest';
import { createGeneratedDocument } from '../../scripts/content/lib/projection.mjs';

const baseDocument = {
  id: 'ADR-0001',
  title: 'Projection Boundary',
  description: 'A generated projection fixture.',
  kind: 'decision',
  family: 'ADR',
  status: 'accepted',
  lifecycle: { allowedNextStatuses: ['superseded'] },
  canonicalPath: 'engineering/adrs/ADR-0001-projection-boundary.md',
  sourceRoot: 'engineering/adrs',
  sourceHash: 'a'.repeat(64),
  synthetic: false,
  aliases: [],
  seriesInfo: { key: 'ADR', position: 1, total: 1 },
  tags: [],
  references: [],
  referencedBy: [],
  related: {},
  relationships: { outgoing: [], incoming: [] },
  body: '# Projection Boundary\n\nThe canonical file remains authoritative.',
};

describe('MDX projection validity', () => {
  it('uses an MDX-safe JSX comment instead of an HTML comment', () => {
    const output = createGeneratedDocument(baseDocument);
    expect(output).toContain('{/* Generated from engineering/adrs/ADR-0001-projection-boundary.md.');
    expect(output).not.toContain('<!--');
  });

  it('uses the same safe comment syntax for synthetic pages', () => {
    const output = createGeneratedDocument({
      ...baseDocument,
      id: 'COLLECTION-ARTIFACTS',
      synthetic: true,
      canonicalPath: '@generated/collection-artifacts',
    });
    expect(output).toContain('{/* Generated registry/index page.');
    expect(output).not.toContain('<!--');
  });
});
