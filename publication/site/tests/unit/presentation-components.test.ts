import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const siteRoot = resolve(import.meta.dirname, '../..');

function read(relativePath: string) {
  return readFileSync(resolve(siteRoot, relativePath), 'utf8');
}

describe('technical presentation component contract', () => {
  it('registers Fumadocs and Monad components centrally', () => {
    const source = read('components/mdx.tsx');
    expect(source).toContain('...EngineeringComponents');
    expect(source).toContain('...TabsComponents');
    expect(source).toContain('...AccordionComponents');
    expect(source).toContain('...FileComponents');
    expect(source).toContain('ImageZoom');
  });

  it('exports the complete initial engineering component vocabulary', () => {
    const source = read('components/engineering/index.ts');
    for (const component of [
      'Decision',
      'Constraint',
      'Experiment',
      'FailureLog',
      'ImplementationNote',
      'RepositoryAction',
      'ReaderCheckpoint',
      'Result',
      'VerificationEvidence',
      'TerminalSession',
      'ArtifactReference',
      'Timeline',
      'ArchitectureFigure',
      'SpecificationSummary',
    ]) {
      expect(source).toContain(component);
    }
  });

  it('enables the official Fumadocs files remark plugin', () => {
    const source = read('source.config.ts');
    expect(source).toContain('remarkMdxFiles');
    expect(source).toContain('remarkPlugins: [remarkMdxFiles]');
  });

  it('publishes print and responsive component styles', () => {
    const source = read('styles/engineering.css');
    expect(source).toContain('.monad-engineering-note');
    expect(source).toContain('.monad-terminal');
    expect(source).toContain('.monad-timeline');
    expect(source).toContain('@media (max-width: 40rem)');
    expect(read('styles/print.css')).toContain('.monad-engineering-note');
  });
});
