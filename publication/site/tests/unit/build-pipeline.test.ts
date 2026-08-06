import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

function read(path: string) {
  return readFileSync(path, 'utf8');
}

describe('build pipeline regeneration', () => {
  it('routes production builds through the deterministic build script', () => {
    const packageJson = JSON.parse(read('package.json'));
    expect(packageJson.scripts.build).toBe('bun run scripts/build.mjs');
    expect(packageJson.scripts.typegen).toBe('bun run scripts/typegen.mjs');
  });

  it('clears stale Fumadocs and Turbopack state after content synchronization', () => {
    const source = read('scripts/build.mjs');
    expect(source).toContain("await syncContent({ siteRoot })");
    expect(source).toContain("resolve(siteRoot, '.source')");
    expect(source).toContain("resolve(siteRoot, '.next')");
    expect(source.indexOf('await syncContent')).toBeLessThan(source.indexOf("resolve(siteRoot, '.source')"));
  });
});
