import type { MetadataRoute } from 'next';
import { publicRouteCatalog } from '@/information-architecture.mjs';
import { getContentRegistry } from '@/lib/content/registry';
import { getAllPublicationPages } from '@/lib/discovery/pages';
import { getEditionManifest } from '@/lib/editions/manifest';
import { publicEnvironment } from '@/lib/environment';

function absolute(route: string) {
  return new URL(route, publicEnvironment.siteUrl).toString();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [registry, editions] = await Promise.all([getContentRegistry(), getEditionManifest()]);
  const entries = new Map<string, MetadataRoute.Sitemap[number]>();

  for (const route of [
    '/',
    '/start',
    '/search',
    '/editions',
    ...publicRouteCatalog().map((entry) => entry.route),
  ]) {
    entries.set(route, {
      url: absolute(route),
      changeFrequency: route === '/' || route === '/project/status' ? 'weekly' : 'monthly',
      priority: route === '/' ? 1 : route.split('/').filter(Boolean).length === 1 ? 0.8 : 0.65,
    });
  }

  for (const edition of editions.editions) {
    const route = `/editions/${edition.key}`;
    entries.set(route, {
      url: absolute(route),
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  }

  for (const { page } of getAllPublicationPages()) {
    const data = page.data as typeof page.data & {
      publication?: { publishedAt?: string; updatedAt?: string };
    };
    entries.set(page.url, {
      url: absolute(page.url),
      lastModified:
        data.publication?.updatedAt ?? data.publication?.publishedAt ?? registry.generatedAt,
      changeFrequency: page.url.startsWith('/building-monad/') ? 'monthly' : 'weekly',
      priority: 0.72,
    });
  }

  for (const document of registry.documents) {
    entries.set(document.route, {
      url: absolute(document.route),
      lastModified:
        document.publication?.updatedAt ??
        document.publication?.publishedAt ??
        registry.generatedAt,
      changeFrequency: document.kind === 'journal-entry' ? 'monthly' : 'weekly',
      priority: document.synthetic ? 0.55 : 0.75,
    });
  }

  return [...entries.values()].sort((left, right) => left.url.localeCompare(right.url));
}
