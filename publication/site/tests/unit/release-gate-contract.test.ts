import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = resolve(import.meta.dirname, '..', '..');

function text(path: string) {
  return readFileSync(resolve(root, path), 'utf8');
}

describe('STAB-0007 release gate contract', () => {
  it('uses the Biome 2.5 preset and parses Tailwind directives', () => {
    const config = JSON.parse(text('biome.json'));
    expect(config.linter.rules.preset).toBe('recommended');
    expect(config.linter.rules.recommended).toBeUndefined();
    expect(config.css.parser.tailwindDirectives).toBe(true);
  });

  it('documents intentional native image and JSON-LD exceptions locally', () => {
    expect(text('components/mdx.tsx')).toContain(
      'biome-ignore lint/performance/noImgElement',
    );
    expect(text('components/discovery/structured-data.tsx')).toContain(
      'biome-ignore lint/security/noDangerouslySetInnerHtml',
    );
  });

  it('uses semantic roles for labelled interface groups', () => {
    expect(text('components/building-monad/building-monad-index.tsx')).toContain(
      'role="group" aria-label="Series status"',
    );
    expect(text('components/discovery/search-workspace.tsx')).toContain(
      'role="group" aria-label="Search filters"',
    );
  });
});
