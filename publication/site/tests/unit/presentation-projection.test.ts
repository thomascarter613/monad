import { describe, expect, it } from 'vitest';
import {
  transformDocumentPresentation,
  transformSemanticBlockquotes,
  transformTerminalFences,
} from '../../scripts/content/lib/presentation.mjs';

describe('presentation projection', () => {
  it('converts semantic GitHub-readable blockquotes into MDX components', () => {
    const source = [
      '> [!DECISION]',
      '> **Title:** Keep canonical Markdown outside the site',
      '>',
      '> The repository remains the source of truth.',
    ].join('\n');

    expect(transformSemanticBlockquotes(source)).toContain(
      '<Decision title="Keep canonical Markdown outside the site">',
    );
    expect(transformSemanticBlockquotes(source)).toContain(
      'The repository remains the source of truth.',
    );
  });

  it('keeps unknown blockquote markers unchanged', () => {
    const source = '> [!UNKNOWN]\n> Remains a blockquote.';
    expect(transformSemanticBlockquotes(source)).toBe(source);
  });

  it('wraps terminal-marked fences without changing their code', () => {
    const source = [
      '```console terminal title="Inspect Monad" prompt="$"',
      '$ monad inspect',
      'Repository: monad',
      '```',
    ].join('\n');
    const result = transformTerminalFences(source);

    expect(result).toContain(
      '<TerminalSession title="Inspect Monad" language="console" prompt="$">',
    );
    expect(result).toContain('```console');
    expect(result).toContain('$ monad inspect');
    expect(result).toContain('</TerminalSession>');
  });

  it('composes terminal and semantic transforms', () => {
    const source = '> [!RESULT]\n> The command completed.\n\n```bash terminal\necho ok\n```';
    const result = transformDocumentPresentation(source);
    expect(result).toContain('<Result>');
    expect(result).toContain('<TerminalSession');
  });
});
