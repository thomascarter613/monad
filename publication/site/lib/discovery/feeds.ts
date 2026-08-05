import { getBuildingMonadManifest } from '@/lib/building-monad/manifest';
import { siteConfig } from '@/lib/config/site';
import { publicEnvironment } from '@/lib/environment';

function xml(value: unknown) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function absolute(route: string) {
  return new URL(route, publicEnvironment.siteUrl).toString();
}

function feedDate(value?: string) {
  const date = value ? new Date(value) : new Date(0);
  return Number.isNaN(date.getTime()) ? new Date(0) : date;
}

export async function buildingMonadRSS() {
  const manifest = await getBuildingMonadManifest();
  const items = [...manifest.installments]
    .filter((item) => item.publishedAt)
    .sort((left, right) => feedDate(right.publishedAt).getTime() - feedDate(left.publishedAt).getTime())
    .map(
      (item) => `    <item>
      <guid isPermaLink="true">${xml(absolute(item.route))}</guid>
      <title>${xml(item.title)}</title>
      <link>${xml(absolute(item.route))}</link>
      <description>${xml(item.description)}</description>
      <pubDate>${feedDate(item.publishedAt).toUTCString()}</pubDate>
    </item>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${xml('Building Monad')}</title>
    <link>${xml(absolute('/building-monad'))}</link>
    <description>${xml('The chronological engineering narrative of the Monad project.')}</description>
    <language>${xml(siteConfig.language)}</language>
    <lastBuildDate>${new Date(manifest.generatedAt).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>\n`;
}

export async function buildingMonadAtom() {
  const manifest = await getBuildingMonadManifest();
  const updated = [...manifest.installments]
    .map((item) => item.updatedAt ?? item.publishedAt)
    .filter((value): value is string => Boolean(value))
    .sort()
    .at(-1) ?? manifest.generatedAt;
  const entries = [...manifest.installments]
    .filter((item) => item.publishedAt)
    .sort((left, right) => feedDate(right.publishedAt).getTime() - feedDate(left.publishedAt).getTime())
    .map(
      (item) => `  <entry>
    <id>${xml(absolute(item.route))}</id>
    <title>${xml(item.title)}</title>
    <link href="${xml(absolute(item.route))}" />
    <summary>${xml(item.description)}</summary>
    <published>${feedDate(item.publishedAt).toISOString()}</published>
    <updated>${feedDate(item.updatedAt ?? item.publishedAt).toISOString()}</updated>
    <author><name>${xml(siteConfig.author.name)}</name></author>
  </entry>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <id>${xml(absolute('/building-monad'))}</id>
  <title>${xml('Building Monad')}</title>
  <subtitle>${xml('The chronological engineering narrative of the Monad project.')}</subtitle>
  <link href="${xml(absolute('/building-monad'))}" />
  <link rel="self" href="${xml(absolute('/feeds/building-monad.atom.xml'))}" />
  <updated>${feedDate(updated).toISOString()}</updated>
  <author><name>${xml(siteConfig.author.name)}</name></author>
${entries}
</feed>\n`;
}
