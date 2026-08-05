import { titleize } from './normalize.mjs';

function surfaceForRoute(route) {
  if (route === '/building-monad' || route.startsWith('/building-monad/')) return 'building-monad';
  if (route === '/system' || route.startsWith('/system/')) return 'system';
  if (route === '/artifacts' || route.startsWith('/artifacts/')) return 'artifacts';
  if (route === '/project' || route.startsWith('/project/')) return 'project';
  return 'publication';
}

function stripMarkdown(value) {
  return String(value ?? '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/~~~[\s\S]*?~~~/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^\s{0,3}#{1,6}\s+/gm, '')
    .replace(/^\s{0,3}>\s?/gm, '')
    .replace(/[`*_~|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function excerpt(value, maximum = 260) {
  const text = stripMarkdown(value);
  if (text.length <= maximum) return text;
  const slice = text.slice(0, maximum + 1);
  const boundary = slice.lastIndexOf(' ');
  return `${slice.slice(0, boundary > maximum * 0.65 ? boundary : maximum).trim()}…`;
}

function countBy(values, selector) {
  const counts = new Map();
  for (const value of values) {
    const selected = selector(value);
    if (!selected) continue;
    const entries = Array.isArray(selected) ? selected : [selected];
    for (const entry of entries) counts.set(entry, (counts.get(entry) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([value, count]) => ({ value, label: titleize(value), count }))
    .sort((left, right) => right.count - left.count || left.label.localeCompare(right.label));
}

export function buildDiscoveryManifest(documents, generatedAt) {
  const entries = documents
    .map((document) => {
      const surface = surfaceForRoute(document.route);
      const plainBody = stripMarkdown(document.body);
      const series = document.seriesInfo?.key ?? document.series;
      const tags = [...new Set(document.tags ?? [])].sort();
      const searchable = [
        document.id,
        document.title,
        document.description,
        document.kind,
        document.status,
        document.family,
        series,
        surface,
        ...tags,
        plainBody,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return {
        id: document.id,
        title: document.title,
        description: document.description,
        excerpt: excerpt(document.body || document.description),
        route: document.route,
        canonicalPath: document.canonicalPath,
        kind: document.kind,
        status: document.status,
        family: document.family,
        series,
        surface,
        tags,
        synthetic: Boolean(document.synthetic),
        publishedAt: document.publication?.publishedAt,
        updatedAt: document.publication?.updatedAt,
        searchText: searchable,
      };
    })
    .sort((left, right) => left.id.localeCompare(right.id, undefined, { numeric: true }));

  return {
    schemaVersion: 1,
    generatedAt,
    documentCount: entries.length,
    canonicalDocumentCount: entries.filter((entry) => !entry.synthetic).length,
    facets: {
      surfaces: countBy(entries, (entry) => entry.surface),
      kinds: countBy(entries, (entry) => entry.kind),
      statuses: countBy(entries, (entry) => entry.status),
      families: countBy(entries, (entry) => entry.family),
      series: countBy(entries, (entry) => entry.series),
      tags: countBy(entries, (entry) => entry.tags),
    },
    documents: entries,
  };
}
