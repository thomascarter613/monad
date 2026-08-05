import { describe, expect, it } from 'vitest';
import {
  deriveSlug,
  extractIdentifier,
  normalizeStatus,
} from '../../scripts/content/lib/normalize.mjs';

describe('canonical document normalization', () => {
  it('uses a parent article directory as its stable route slug', () => {
    expect(deriveSlug('MJ-0001-building-monad/article.md')).toEqual([
      'mj-0001-building-monad',
    ]);
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
