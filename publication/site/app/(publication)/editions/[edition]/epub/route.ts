import { exportEpub } from 'fumadocs-epub';
import { authorizeEditionExport, editionExportPolicy } from '@/lib/editions/access';
import { createEditionSource } from '@/lib/editions/catalog';
import { getEdition } from '@/lib/editions/manifest';
import { siteConfig } from '@/lib/config/site';

export const revalidate = false;

type RouteProps = { params: Promise<{ edition: string }> };

export async function GET(request: Request, { params }: RouteProps) {
  const policy = editionExportPolicy();
  const rejected = authorizeEditionExport(request, policy);
  if (rejected) return rejected;
  const { edition: key } = await params;
  const edition = await getEdition(key);
  if (!edition) return new Response('Edition not found.', { status: 404 });

  const buffer = await exportEpub({
    source: createEditionSource(edition) as never,
    getMarkdown: async (page: { data: { getText: (mode: 'processed') => Promise<string> } }) =>
      page.data.getText('processed'),
    title: edition.title,
    author: siteConfig.author.name,
    description: edition.description,
    language: siteConfig.language,
    publisher: siteConfig.publisher,
    publicDir: './public',
    css: `
      body { font-family: Georgia, serif; line-height: 1.55; color: #211f1b; }
      h1, h2, h3 { line-height: 1.15; page-break-after: avoid; }
      pre, code { font-family: ui-monospace, monospace; }
      pre { white-space: pre-wrap; padding: 0.75rem; border: 1px solid #aaa; }
      a { color: #74401f; }
      table { border-collapse: collapse; width: 100%; }
      th, td { border: 1px solid #aaa; padding: 0.35rem; }
    `,
  });

  return new Response(new Uint8Array(buffer), {
    headers: {
      'Content-Type': 'application/epub+zip',
      'Content-Disposition': `attachment; filename="${edition.artifactNames.epub}"`,
      'Cache-Control': policy.secret
        ? 'private, no-store'
        : 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}
