import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = process.cwd();

async function text(path: string) {
  return readFile(resolve(root, path), 'utf8');
}

describe('SITE-0011 derived-publication contract', () => {
  it('registers all output commands and the EPUB exporter', async () => {
    const pkg = JSON.parse(await text('package.json'));
    expect(pkg.dependencies['fumadocs-epub']).toBeTruthy();
    expect(pkg.scripts['publication:build']).toContain('scripts/publications/build.mjs');
    expect(pkg.scripts['publication:pdf']).toContain('--formats pdf');
    expect(pkg.scripts['publication:epub']).toContain('--formats epub');
  });

  it('provides print, edition, API, and export routes', async () => {
    for (const path of [
      'app/(publication)/editions/page.tsx',
      'app/(publication)/editions/[edition]/page.tsx',
      'app/(publication)/editions/[edition]/print/page.tsx',
      'app/(publication)/editions/[edition]/epub/route.ts',
      'app/api/editions/route.ts',
    ]) {
      await expect(text(path)).resolves.toBeTruthy();
    }
  });
});
