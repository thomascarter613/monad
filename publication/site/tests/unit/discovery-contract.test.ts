import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = resolve(import.meta.dirname, '..', '..');

function text(path: string) {
  return readFileSync(resolve(root, path), 'utf8');
}

describe('SITE-0010 discovery contract', () => {
  it('enables processed Markdown for every Fumadocs collection', () => {
    expect(text('source.config.ts').match(/includeProcessedMarkdown: true/g)).toHaveLength(5);
  });

  it('publishes explicit AI, feed, and metadata routes', () => {
    expect(text('app/llms.txt/route.ts')).toContain('text/plain');
    expect(text('app/llms-full.txt/route.ts')).toContain('getPageMarkdown');
    expect(text('app/sitemap.ts')).toContain('MetadataRoute.Sitemap');
    expect(text('app/robots.ts')).toContain('MetadataRoute.Robots');
    expect(text('app/feeds/building-monad.rss.xml/route.ts')).toContain('application/rss+xml');
    expect(text('app/feeds/building-monad.atom.xml/route.ts')).toContain('application/atom+xml');
  });

  it('rewrites page .md URLs into the internal Markdown renderer', () => {
    const config = text('next.config.mjs');
    expect(config).toContain("source: `/${section}/:path*.md`");
    expect(config).toContain('destination: `/llms.mdx/${section}/:path*`');
  });
});
