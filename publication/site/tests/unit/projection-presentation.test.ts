import { describe, expect, it } from 'vitest';
import { stripLeadingTitleHeading } from '../../scripts/content/lib/projection.mjs';

describe('generated document presentation', () => {
  it('removes a matching leading level-one title', () => {
    expect(stripLeadingTitleHeading('# Building Monad\n\nBody text.', 'Building Monad')).toBe(
      'Body text.',
    );
  });

  it('preserves a nonmatching level-one heading', () => {
    const body = '# A different heading\n\nBody text.';
    expect(stripLeadingTitleHeading(body, 'Building Monad')).toBe(body);
  });

  it('normalizes lightweight Markdown emphasis while matching', () => {
    expect(
      stripLeadingTitleHeading('# **Monad System Model**\n\nBody.', 'Monad System Model'),
    ).toBe('Body.');
  });
});
