import { describe, expect, it } from 'vitest';
import {
  deriveSlug,
  extractIdentifier,
  inferSeriesPosition,
  normalizeStatus,
} from '../../scripts/content/lib/normalize.mjs';

describe('canonical document normalization', () => {
  it('uses a parent article directory as its stable route slug', () => {
    expect(deriveSlug('MJ-0001-building-monad/article.md')).toEqual(['mj-0001-building-monad']);
  });

  it('finds an identifier in a parent directory before linked references', () => {
    expect(
      extractIdentifier(
        {},
        'Building Monad',
        'MJ-0001-building-monad/article.md',
        'See ADR-0001 for context.',
      ),
    ).toBe('MJ-0001');
  });

  it('recognizes conventional ADR status lines', () => {
    expect(normalizeStatus(undefined, 'decision', 'Status: Accepted')).toBe('accepted');
  });
});

it('does not assign an enumerated identifier to README index documents', () => {
  expect(
    extractIdentifier(
      {},
      'MSC-CORE — Monad Specification Compiler Core',
      'MSC/core/README.md',
      '| MSC-CORE-0001 | Vision |\n| MSC-CORE-0002 | Pipeline |',
    ),
  ).toBeNull();
});

it('does not adopt a current work packet reference as the identity of a status document', () => {
  expect(
    extractIdentifier(
      {},
      'Project Status',
      'PROJECT-STATUS.md',
      'CURRENT WORK PACKET\n\nWP-AF-0004\n\nACTIVE TASK\n\nWrite glossary',
    ),
  ).toBeNull();
});

it('still accepts an explicit leading body identity declaration', () => {
  expect(
    extractIdentifier(
      {},
      'Architecture Record',
      'architecture-record.md',
      'Document ID: ARCH-CORE-0007\n\n# Architecture Record',
    ),
  ).toBe('ARCH-CORE-0007');
});

describe('series position inference', () => {
  it('does not publish a 0000 template placeholder as series position zero', () => {
    expect(inferSeriesPosition({}, 'SERIES-CATEGORY-0000')).toBeUndefined();
  });

  it('rejects an explicit zero position while retaining positive positions', () => {
    expect(inferSeriesPosition({ position: 0 }, 'SERIES-CATEGORY-0000')).toBeUndefined();
    expect(inferSeriesPosition({ position: '0' }, 'SERIES-CATEGORY-0000')).toBeUndefined();
    expect(inferSeriesPosition({ position: 4 }, 'WP-AF-0004')).toBe(4);
  });
});
