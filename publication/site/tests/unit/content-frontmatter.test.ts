import { describe, expect, it } from 'vitest';
import {
  serializeFrontmatter,
  splitFrontmatter,
} from '../../scripts/content/lib/frontmatter.mjs';

describe('canonical frontmatter support', () => {
  it('parses scalar, list, and nested relationship metadata', () => {
    const parsed = splitFrontmatter(`---
title: Example
status: accepted
tags: [architecture, core]
related:
  decisions:
    - ADR-0001
---
# Example
`);

    expect(parsed.attributes).toEqual({
      title: 'Example',
      status: 'accepted',
      tags: ['architecture', 'core'],
      related: { decisions: ['ADR-0001'] },
    });
  });

  it('emits deterministic frontmatter that can be parsed again', () => {
    const text = serializeFrontmatter({
      title: 'Example',
      tags: ['one', 'two'],
      related: { decisions: ['ADR-0001'] },
    });

    expect(splitFrontmatter(`${text}Body`).attributes).toEqual({
      title: 'Example',
      tags: ['one', 'two'],
      related: { decisions: ['ADR-0001'] },
    });
  });
});

it('accepts the repository legacy grouped frontmatter with unindented lists', () => {
  const parsed = splitFrontmatter(`---

artifact:
id: MSL-CORE-0001
type: knowledge.specification

metadata:
title: Monad Specification Language Vision
status: draft
authors:
- Monad Architecture Team
tags:
- msl
- foundational

relationships:
depends_on:
- ADR-0001
references:
- MKE-CORE-0001

compilation:
language: msl-markdown
status: bootstrap
---
# MSL-CORE-0001 — Monad Specification Language Vision
`);

  expect(parsed.attributes.id).toBe('MSL-CORE-0001');
  expect(parsed.attributes.title).toBe('Monad Specification Language Vision');
  expect(parsed.attributes.status).toBe('draft');
  expect(parsed.attributes.authors).toEqual(['Monad Architecture Team']);
  expect(parsed.attributes.tags).toEqual(['msl', 'foundational']);
  expect(parsed.attributes.relationships).toEqual({
    depends_on: ['ADR-0001'],
    references: ['MKE-CORE-0001'],
  });
  expect(parsed.attributes.compilation).toEqual({
    language: 'msl-markdown',
    status: 'bootstrap',
  });
});

it('accepts a long hyphen line as a legacy closing delimiter', () => {
  const parsed = splitFrontmatter(`---

artifact:
id: WP-MSL-0001
title: Bootstrap MSL Markdown Syntax Baseline
status: ready
------------------------------
# WP-MSL-0001 — Bootstrap MSL Markdown Syntax Baseline
`);

  expect(parsed.attributes.id).toBe('WP-MSL-0001');
  expect(parsed.attributes.title).toBe('Bootstrap MSL Markdown Syntax Baseline');
  expect(parsed.body).toContain('# WP-MSL-0001');
});


it('accepts Markdown asterisk bullets in frontmatter lists', () => {
  const parsed = splitFrontmatter(`---
id: WP-AF-0001
title: Establish the Monad Manifesto
status: Completed

produces:

* vision/manifesto.md

related:

* WP-AF-0002
* WP-AF-0003
---
# WP-AF-0001 — Establish the Monad Manifesto
`);

  expect(parsed.attributes.id).toBe('WP-AF-0001');
  expect(parsed.attributes.produces).toEqual(['vision/manifesto.md']);
  expect(parsed.attributes.related).toEqual(['WP-AF-0002', 'WP-AF-0003']);
});

it('accepts plus and hyphen bullets through the same list contract', () => {
  const parsed = splitFrontmatter(`---
id: EXAMPLE-0001
produces:
+ one.md
+ two.md
related:
- ADR-0001
---
# Example
`);

  expect(parsed.attributes.produces).toEqual(['one.md', 'two.md']);
  expect(parsed.attributes.related).toEqual(['ADR-0001']);
});
