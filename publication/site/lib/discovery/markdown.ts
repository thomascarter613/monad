import type { PublicationPage } from '@/lib/discovery/pages';

function metadataLine(label: string, value: unknown) {
  return typeof value === 'string' && value.trim() ? `- ${label}: ${value.trim()}` : undefined;
}

export async function getPageMarkdown(page: PublicationPage) {
  const processed = await page.data.getText('processed');
  const data = page.data as typeof page.data & {
    id?: string;
    kind?: string;
    status?: string;
    canonicalPath?: string;
    publication?: { publishedAt?: string; updatedAt?: string };
  };
  const metadata = [
    metadataLine('URL', page.url),
    metadataLine('Identifier', data.id),
    metadataLine('Kind', data.kind),
    metadataLine('Status', data.status),
    metadataLine('Canonical source', data.canonicalPath),
    metadataLine('Published', data.publication?.publishedAt),
    metadataLine('Updated', data.publication?.updatedAt),
  ].filter(Boolean);

  return [
    `# ${page.data.title}`,
    '',
    page.data.description ? `> ${page.data.description}` : undefined,
    metadata.length > 0 ? metadata.join('\n') : undefined,
    '',
    processed.trim(),
  ]
    .filter((entry) => entry !== undefined)
    .join('\n')
    .trim()
    .concat('\n');
}
