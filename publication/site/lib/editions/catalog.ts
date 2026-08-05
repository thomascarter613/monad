import type { PublicationPage } from '@/lib/discovery/pages';
import { getAllPublicationPages } from '@/lib/discovery/pages';
import type { EditionManifestEntry } from '@/lib/editions/types';

export type EditionPublicationPage = {
  key: string;
  label: string;
  page: PublicationPage;
};

export function getEditionPages(edition: EditionManifestEntry): EditionPublicationPage[] {
  const pagesByRoute = new Map(
    getAllPublicationPages().map((entry) => [entry.page.url, entry as EditionPublicationPage]),
  );

  return edition.documents.flatMap((document) => {
    const selected = pagesByRoute.get(document.route);
    return selected ? [selected] : [];
  });
}

/**
 * Create the minimal Fumadocs source contract required by `fumadocs-epub`.
 * The generated page tree preserves the deterministic order in the edition manifest.
 */
export function createEditionSource(edition: EditionManifestEntry) {
  const pages = getEditionPages(edition).map((entry) => entry.page);
  const pagesByUrl = new Map(pages.map((page) => [page.url, page]));
  const children = pages.map((page) => ({
    type: 'page' as const,
    $id: page.url,
    name: page.data.title,
    url: page.url,
  }));

  return {
    getPages: () => pages,
    getPageTree: () => ({
      type: 'root' as const,
      name: edition.title,
      children,
    }),
    getNodePage: (node: { url: string }) => pagesByUrl.get(node.url),
  };
}
