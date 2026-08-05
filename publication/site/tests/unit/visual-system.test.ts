import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = process.cwd();
const tokens = readFileSync(resolve(root, 'styles/tokens.css'), 'utf8');
const base = readFileSync(resolve(root, 'styles/base.css'), 'utf8');
const print = readFileSync(resolve(root, 'styles/print.css'), 'utf8');

describe('Monad visual-system contract', () => {
  it.each([
    '--font-monad-editorial',
    '--font-monad-sans',
    '--font-monad-mono',
    '--monad-paper',
    '--monad-ink',
    '--monad-copper',
    '--monad-section-accent',
    '--monad-reading-measure',
    '--fd-layout-width',
  ])('declares %s', (token) => {
    expect(tokens).toContain(token);
  });

  it.each(['building-monad', 'system', 'artifacts', 'project', 'start'])(
    'declares a section identity for %s',
    (section) => {
      expect(tokens).toContain(`[data-monad-section='${section}']`);
    },
  );

  it('contains explicit dark-mode tokens', () => {
    expect(tokens).toMatch(/\.dark\s*\{/);
  });

  it('honors reduced-motion preferences', () => {
    expect(base).toContain('@media (prefers-reduced-motion: reduce)');
  });

  it('provides a print presentation boundary', () => {
    expect(print).toContain('@media print');
    expect(print).toContain('break-inside: avoid');
  });
});
