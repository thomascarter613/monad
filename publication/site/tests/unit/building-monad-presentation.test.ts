import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = process.cwd();

function read(path: string) {
  return readFileSync(resolve(root, path), 'utf8');
}

describe('Building Monad presentation contract', () => {
  it('provides a generated series API and custom index', () => {
    expect(read('app/api/building-monad/route.ts')).toContain('getBuildingMonadManifest');
    expect(read('components/building-monad/building-monad-index.tsx')).toContain('Project phase');
  });

  it('keeps reading state browser-local', () => {
    const state = read('components/building-monad/reading-state.tsx');
    expect(state).toContain('window.localStorage');
    expect(state).not.toContain('fetch(');
  });

  it('includes responsive and print-aware series styles', () => {
    const css = read('styles/building-monad.css');
    expect(css).toContain('.monad-reading-progress');
    expect(css).toContain('.monad-series-phase__installments');
    expect(css).toContain('@media print');
  });
});
