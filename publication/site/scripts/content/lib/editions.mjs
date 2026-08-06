import {
  editionSourceDigest,
  publicationEditionContractVersion,
  publicationEditions,
} from '../../../editions.config.mjs';

function surfaceForRoute(route) {
  if (route === '/building-monad' || route.startsWith('/building-monad/')) return 'building-monad';
  if (route === '/system' || route.startsWith('/system/')) return 'system';
  if (route === '/artifacts' || route.startsWith('/artifacts/')) return 'artifacts';
  if (route === '/project' || route.startsWith('/project/')) return 'project';
  return 'publication';
}

function selectedBy(value, candidates) {
  return !candidates || candidates.length === 0 || candidates.includes(value);
}

function selectedByTags(tags, required) {
  if (!required || required.length === 0) return true;
  const values = new Set(tags ?? []);
  return required.every((tag) => values.has(tag));
}

function routeGroup(route) {
  if (route.startsWith('/building-monad')) return 0;
  if (route.startsWith('/system')) return 1;
  if (route.startsWith('/artifacts/decisions')) return 2;
  if (route.startsWith('/artifacts/specifications')) return 3;
  if (route.startsWith('/artifacts/engineering')) return 4;
  if (route.startsWith('/artifacts/research')) return 5;
  if (route.startsWith('/artifacts/knowledge')) return 6;
  if (route.startsWith('/artifacts')) return 7;
  if (route.startsWith('/project')) return 8;
  return 9;
}

function documentOrder(left, right) {
  const groupDifference = routeGroup(left.route) - routeGroup(right.route);
  if (groupDifference) return groupDifference;
  const leftSeries = left.seriesInfo?.key ?? left.series?.key ?? left.series ?? '';
  const rightSeries = right.seriesInfo?.key ?? right.series?.key ?? right.series ?? '';
  const seriesDifference = String(leftSeries).localeCompare(String(rightSeries), undefined, {
    numeric: true,
  });
  if (seriesDifference) return seriesDifference;
  const leftPosition =
    left.seriesInfo?.position ?? left.series?.position ?? Number.MAX_SAFE_INTEGER;
  const rightPosition =
    right.seriesInfo?.position ?? right.series?.position ?? Number.MAX_SAFE_INTEGER;
  return (
    leftPosition - rightPosition ||
    left.route.localeCompare(right.route, undefined, { numeric: true }) ||
    left.id.localeCompare(right.id, undefined, { numeric: true })
  );
}

function selectDocuments(documents, edition) {
  const selectors = edition.selectors;
  return documents
    .filter((document) => selectors.includeSynthetic || !document.synthetic)
    .filter((document) => selectedBy(surfaceForRoute(document.route), selectors.surfaces))
    .filter((document) => selectedBy(document.kind, selectors.kinds))
    .filter((document) => selectedBy(document.status, selectors.statuses))
    .filter((document) =>
      selectedBy(
        document.seriesInfo?.key ?? document.series?.key ?? document.series,
        selectors.series,
      ),
    )
    .filter((document) => selectedByTags(document.tags, selectors.tags))
    .sort(documentOrder);
}

export function buildEditionManifest(documents, generatedAt) {
  const editions = publicationEditions.map((edition) => {
    const selected = selectDocuments(documents, edition);
    const records = selected.map((document, index) => ({
      sequence: index + 1,
      id: document.id,
      title: document.title,
      description: document.description,
      route: document.route,
      canonicalPath: document.canonicalPath,
      sourceRoot: document.sourceRoot,
      sourceHash: document.sourceHash,
      kind: document.kind,
      status: document.status,
      family: document.family,
      series: document.seriesInfo?.key ?? document.series?.key ?? document.series,
      seriesPosition: document.seriesInfo?.position ?? document.series?.position,
      tags: document.tags ?? [],
      publishedAt: document.publication?.publishedAt,
      updatedAt: document.publication?.updatedAt,
      repository: document.repository,
      synthetic: Boolean(document.synthetic),
      surface: surfaceForRoute(document.route),
    }));
    const baseName = `${edition.key}-${edition.defaultVersion}`;
    return {
      ...edition,
      documentCount: records.length,
      sourceDigest: editionSourceDigest(records),
      documents: records,
      artifactNames: {
        pdf: `${baseName}.pdf`,
        epub: `${baseName}.epub`,
        offline: `${baseName}-offline.tar.gz`,
        source: `${baseName}-source.tar.gz`,
        manifest: `${baseName}-manifest.json`,
      },
    };
  });

  return {
    schemaVersion: 1,
    contractVersion: publicationEditionContractVersion,
    generatedAt,
    editionCount: editions.length,
    editions,
  };
}
