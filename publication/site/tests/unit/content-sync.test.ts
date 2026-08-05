import { mkdtemp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { describe, expect, it } from 'vitest';
import { syncContent } from '../../scripts/content/sync.mjs';

describe('canonical content synchronization', () => {
  it('projects repository documents, relationships, and links', async () => {
    const repositoryRoot = await mkdtemp(join(tmpdir(), 'monad-content-'));
    const siteRoot = join(repositoryRoot, 'publication', 'site');
    await mkdir(join(repositoryRoot, 'journal', 'MJ-0001-foundation'), { recursive: true });
    await mkdir(join(repositoryRoot, 'adrs'), { recursive: true });
    await mkdir(join(repositoryRoot, 'architecture'), { recursive: true });
    await mkdir(join(repositoryRoot, 'specifications'), { recursive: true });
    await mkdir(siteRoot, { recursive: true });

    await writeFile(
      join(repositoryRoot, 'journal', 'MJ-0001-foundation', 'article.md'),
      `# MJ-0001 — Foundation\n\nSee [ADR-0001](../../adrs/ADR-0001-foundation.md).\n`,
    );
    await writeFile(
      join(repositoryRoot, 'adrs', 'ADR-0001-foundation.md'),
      `# ADR-0001 — Foundation\n\nStatus: Accepted\n\nThe initial decision.\n`,
    );

    const result = await syncContent({ siteRoot, repositoryRoot });
    const journal = result.registry.documents.find((document) => document.id === 'MJ-0001');
    const decision = result.registry.documents.find((document) => document.id === 'ADR-0001');

    expect(journal?.references).toContain('ADR-0001');
    expect(decision?.status).toBe('accepted');
    expect(journal?.route).toBe('/building-monad/mj-0001-foundation');

    const generated = await readFile(
      join(siteRoot, '.generated', 'content', 'building-monad', 'mj-0001-foundation.md'),
      'utf8',
    );
    expect(generated).toContain('](/artifacts/decisions/adr-0001-foundation)');
  });
});
