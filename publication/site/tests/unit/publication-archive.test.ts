import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { createTarGzip } from '../../scripts/publications/lib/archive.mjs';

function digest(value: Buffer) {
  return createHash('sha256').update(value).digest('hex');
}

describe('derived-publication archives', () => {
  it('are byte-stable for identical entries and timestamps', () => {
    const entries = [
      { name: 'README.md', body: 'Monad\n' },
      {
        name: `specifications/${'long-directory/'.repeat(6)}MKE-CORE-0001.md`,
        body: '# Specification\n',
      },
    ];
    const first = createTarGzip(entries, { mtime: 1_785_826_800_000 });
    const second = createTarGzip([...entries].reverse(), { mtime: 1_785_826_800_000 });
    expect(digest(first)).toBe(digest(second));
  });

  it('rejects duplicate archive entries', () => {
    expect(() =>
      createTarGzip([
        { name: 'same.txt', body: 'one' },
        { name: 'same.txt', body: 'two' },
      ]),
    ).toThrow(/Duplicate archive entry/);
  });
});
