import { mkdir, mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
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
    expect(decision?.referencedBy).toContain('MJ-0001');
    expect(result.registry.schemaVersion).toBe(2);
    expect(decision?.status).toBe('accepted');
    expect(journal?.route).toBe('/building-monad/mj-0001-foundation');

    const generated = await readFile(
      join(siteRoot, '.generated', 'content', 'building-monad', 'mj-0001-foundation.mdx'),
      'utf8',
    );
    expect(generated).toContain('](/artifacts/decisions/adr-0001-foundation)');

    const navigation = JSON.parse(
      await readFile(join(siteRoot, '.generated', 'registry', 'navigation.json'), 'utf8'),
    );
    expect(navigation.schemaVersion).toBe(1);
    expect(navigation.routes.some((route: { route: string }) => route.route === '/project')).toBe(
      true,
    );

    const artifactsMeta = JSON.parse(
      await readFile(join(siteRoot, '.generated', 'content', 'artifacts', 'meta.json'), 'utf8'),
    );
    expect(artifactsMeta.pages).toContain('---Normative---');
  });

  it('classifies engineering/adrs as decisions and excludes them from engineering records', async () => {
    const repositoryRoot = await mkdtemp(join(tmpdir(), 'monad-content-adr-layout-'));
    const siteRoot = join(repositoryRoot, 'publication', 'site');
    await mkdir(join(repositoryRoot, 'engineering', 'adrs'), { recursive: true });
    await mkdir(join(repositoryRoot, 'engineering', 'notes'), { recursive: true });
    await mkdir(siteRoot, { recursive: true });

    await writeFile(
      join(repositoryRoot, 'engineering', 'adrs', 'ADR-0001-foundation.md'),
      `# ADR-0001 — Foundation

Status: Accepted

Decision body.
`,
    );
    await writeFile(
      join(repositoryRoot, 'engineering', 'notes', 'ENG-0001-note.md'),
      `# ENG-0001 — Note

Engineering body.
`,
    );

    const result = await syncContent({ siteRoot, repositoryRoot });
    const decision = result.registry.documents.find((document) => document.id === 'ADR-0001');
    const engineering = result.registry.documents.find((document) => document.id === 'ENG-0001');

    expect(decision?.kind).toBe('decision');
    expect(decision?.route).toBe('/artifacts/decisions/adr-0001-foundation');
    expect(engineering?.kind).toBe('engineering');
    expect(result.registry.documents.filter((document) => document.id === 'ADR-0001')).toHaveLength(
      1,
    );
  });

  it('accepts legacy grouped frontmatter and avoids README identifier collisions', async () => {
    const repositoryRoot = await mkdtemp(join(tmpdir(), 'monad-content-legacy-'));
    const siteRoot = join(repositoryRoot, 'publication', 'site');
    await mkdir(join(repositoryRoot, 'specifications', 'MSC', 'core'), { recursive: true });
    await mkdir(siteRoot, { recursive: true });

    await writeFile(
      join(repositoryRoot, 'specifications', 'MSC', 'core', 'MSC-CORE-0001.md'),
      `---

artifact:
id: MSC-CORE-0001
type: knowledge.specification

metadata:
title: Compiler Vision
status: draft
authors:
- Monad Architecture Team

relationships:
depends_on:
- ADR-0001

compilation:
language: msl-markdown
status: bootstrap
---
# MSC-CORE-0001 — Compiler Vision

Body.
`,
    );
    await writeFile(
      join(repositoryRoot, 'specifications', 'MSC', 'core', 'README.md'),
      `# MSC-CORE — Compiler Core

| ID | Title |
|---|---|
| MSC-CORE-0001 | Compiler Vision |
`,
    );

    const result = await syncContent({ siteRoot, repositoryRoot });
    expect(result.registry.errorCount).toBe(0);
    expect(
      result.registry.documents.filter((document) => document.id === 'MSC-CORE-0001'),
    ).toHaveLength(1);
    expect(
      result.registry.documents.some(
        (document) =>
          document.canonicalPath === 'specifications/MSC/core/README.md' &&
          document.id.startsWith('UNTRACKED-'),
      ),
    ).toBe(true);
  });
});

// SITE-0006 presentation contract: canonical title headings are removed from generated bodies
// because the application renders one governed article header for every document.
