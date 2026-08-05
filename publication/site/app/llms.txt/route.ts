import { getAllPublicationPages } from '@/lib/discovery/pages';
import { siteConfig } from '@/lib/config/site';
import { publicEnvironment } from '@/lib/environment';

export const revalidate = false;

export function GET() {
  const sections = new Map<string, Array<{ title: string; url: string; description?: string }>>();
  for (const { key, label, page } of getAllPublicationPages()) {
    const values = sections.get(`${key}\u0000${label}`) ?? [];
    values.push({ title: page.data.title, url: page.url, description: page.data.description });
    sections.set(`${key}\u0000${label}`, values);
  }

  const lines = [
    `# ${siteConfig.name}`,
    '',
    `> ${siteConfig.description}`,
    '',
    `Canonical origin: ${publicEnvironment.siteUrl}`,
    'Full corpus: /llms-full.txt',
    'Page Markdown: append `.md` to a document URL.',
    '',
    '## Publication utilities',
    '',
    '- [Choose a reading path](/start)',
    '- [Search the governed corpus](/search)',
    '- [Building Monad RSS](/feeds/building-monad.rss.xml)',
    '- [Building Monad Atom](/feeds/building-monad.atom.xml)',
    '',
  ];

  for (const [compound, pages] of sections) {
    const [, label] = compound.split('\u0000');
    lines.push(`## ${label}`, '');
    for (const page of pages.sort((left, right) => left.url.localeCompare(right.url))) {
      const description = page.description ? `: ${page.description}` : '';
      lines.push(`- [${page.title}](${page.url})${description}`);
    }
    lines.push('');
  }

  return new Response(`${lines.join('\n').trim()}\n`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}
