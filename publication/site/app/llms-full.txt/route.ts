import { siteConfig } from '@/lib/config/site';
import { getPageMarkdown } from '@/lib/discovery/markdown';
import { getAllPublicationPages } from '@/lib/discovery/pages';

export const revalidate = false;

export async function GET() {
  const pages = getAllPublicationPages().filter(({ page }) => !page.data.synthetic);
  const content = await Promise.all(pages.map(({ page }) => getPageMarkdown(page)));
  const preamble = `# ${siteConfig.name}: Full Publication Corpus\n\n${siteConfig.description}\n`;

  return new Response(`${preamble}\n${content.join('\n---\n\n')}`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}
