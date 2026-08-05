import { notFound } from 'next/navigation';
import { getPageMarkdown } from '@/lib/discovery/markdown';
import { getAllPublicationPages, getPublicationPage } from '@/lib/discovery/pages';

export const revalidate = false;

type RouteProps = {
  params: Promise<{ section: string; slug?: string[] }>;
};

export async function GET(_request: Request, { params }: RouteProps) {
  const { section, slug } = await params;
  const selected = getPublicationPage(section, slug);
  if (!selected) return notFound();

  return new Response(await getPageMarkdown(selected.page), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Content-Disposition': 'inline',
      'Content-Language': 'en',
      'X-Robots-Tag': 'noindex, follow',
      'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}

export function generateStaticParams() {
  return getAllPublicationPages().map(({ key, page }) => ({
    section: key,
    slug: page.slugs,
  }));
}
