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
