import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('artifact exploration contract', () => {
  it('publishes its generated API, routes, and visual layer', () => {
    const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
    const globalCss = readFileSync('app/global.css', 'utf8');
    const projection = readFileSync('scripts/content/lib/projection.mjs', 'utf8');

    expect(packageJson.scripts['content:report:exploration']).toContain('--exploration');
    expect(globalCss).toContain("@import '../styles/exploration.css'");
    expect(projection).toContain("'COLLECTION-ARTIFACT_EXPLORER'");
    expect(projection).toContain("'COLLECTION-PROJECT_TIMELINE'");
    expect(projection).toContain("'exploration.json'");
  });
});
