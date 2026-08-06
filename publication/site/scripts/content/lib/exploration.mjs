const STATUS_ORDER = [
  'draft',
  'proposed',
  'accepted',
  'active',
  'published',
  'deprecated',
  'superseded',
  'archived',
];

function countBy(values, selector) {
  const counts = new Map();
  for (const value of values) {
    const key = selector(value);
    if (key === undefined || key === null || key === '') continue;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([value, count]) => ({ value, count }))
    .sort((left, right) => left.value.localeCompare(right.value, undefined, { numeric: true }));
}

function surfaceForRoute(route) {
  if (route.startsWith('/building-monad')) return 'building-monad';
  if (route.startsWith('/system')) return 'system';
  if (route.startsWith('/project')) return 'project';
  return 'artifacts';
}

function statusOrder(value) {
  const index = STATUS_ORDER.indexOf(value);
  return index >= 0 ? index : STATUS_ORDER.length;
}

function compactDocument(document) {
  const incoming = document.relationships?.incoming ?? [];
  const outgoing = document.relationships?.outgoing ?? [];
  return {
    id: document.id,
    title: document.title,
    description: document.description,
    route: document.route,
    kind: document.kind,
    family: document.family,
    status: document.status,
    surface: surfaceForRoute(document.route),
    canonicalPath: document.canonicalPath,
    tags: document.tags ?? [],
    series: document.series?.key,
    seriesPosition: document.series?.position,
    seriesTotal: document.series?.total,
    publishedAt: document.publication?.publishedAt,
    updatedAt: document.publication?.updatedAt,
    relationshipCount: incoming.length + outgoing.length,
    incomingCount: incoming.length,
    outgoingCount: outgoing.length,
  };
}

function compactEdges(documents) {
  return documents.flatMap((document) =>
    (document.relationships?.outgoing ?? []).map((edge) => ({
      sourceId: document.id,
      sourceTitle: document.title,
      sourceRoute: document.route,
      targetId: edge.id,
      targetTitle: edge.title,
      targetRoute: edge.route,
      kind: edge.kind,
      explicit: edge.explicit,
    })),
  );
}

function buildSupersessionChains(documents, edges) {
  const supersessionEdges = edges.filter((edge) => edge.kind === 'supersedes');
  if (supersessionEdges.length === 0) return [];

  const documentsById = new Map(documents.map((document) => [document.id, document]));
  const neighbors = new Map();
  for (const edge of supersessionEdges) {
    if (!neighbors.has(edge.sourceId)) neighbors.set(edge.sourceId, new Set());
    if (!neighbors.has(edge.targetId)) neighbors.set(edge.targetId, new Set());
    neighbors.get(edge.sourceId).add(edge.targetId);
    neighbors.get(edge.targetId).add(edge.sourceId);
  }

  const visited = new Set();
  const chains = [];
  for (const startId of [...neighbors.keys()].sort()) {
    if (visited.has(startId)) continue;
    const queue = [startId];
    const component = [];
    visited.add(startId);
    while (queue.length > 0) {
      const current = queue.shift();
      component.push(current);
      for (const neighbor of neighbors.get(current) ?? []) {
        if (visited.has(neighbor)) continue;
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }

    const componentSet = new Set(component);
    const componentEdges = supersessionEdges.filter(
      (edge) => componentSet.has(edge.sourceId) && componentSet.has(edge.targetId),
    );
    const targetIds = new Set(componentEdges.map((edge) => edge.targetId));
    const headIds = component.filter((id) => !targetIds.has(id)).sort();
    const ordered = [];
    const orderedSeen = new Set();

    function visit(id) {
      if (orderedSeen.has(id)) return;
      orderedSeen.add(id);
      ordered.push(id);
      const targets = componentEdges
        .filter((edge) => edge.sourceId === id)
        .map((edge) => edge.targetId)
        .sort();
      for (const target of targets) visit(target);
    }

    for (const headId of headIds) visit(headId);
    for (const id of component.sort()) visit(id);

    const nodes = ordered
      .map((id) => documentsById.get(id))
      .filter(Boolean)
      .map(compactDocument);
    chains.push({
      id: `supersession-${chains.length + 1}`,
      kind: nodes[0]?.kind ?? 'unknown',
      headIds,
      nodes,
      edges: componentEdges,
    });
  }

  return chains.sort((left, right) =>
    (left.headIds[0] ?? '').localeCompare(right.headIds[0] ?? '', undefined, { numeric: true }),
  );
}

function seriesProgress(series) {
  return series.map((entry) => {
    const statusCounts = countBy(entry.documents, (document) => document.status).sort(
      (left, right) => statusOrder(left.value) - statusOrder(right.value),
    );
    const completionPercent =
      entry.total > 0 ? Math.min(100, Math.round((entry.documentCount / entry.total) * 100)) : 0;
    return {
      ...entry,
      completionPercent,
      remainingCount: Math.max(0, entry.total - entry.documentCount),
      statusCounts,
    };
  });
}

function normalizeDate(value) {
  if (typeof value !== 'string' || !value.trim()) return undefined;
  const candidate = value.trim();
  const date = new Date(candidate);
  if (Number.isNaN(date.getTime())) return undefined;
  return date.toISOString().slice(0, 10);
}

function inferredPathDate(document) {
  const match = `${document.canonicalPath} ${document.title}`.match(
    /\b(20\d{2})[-_/]?(0[1-9]|1[0-2])[-_/]?([0-2]\d|3[01])\b/,
  );
  if (!match) return undefined;
  return normalizeDate(`${match[1]}-${match[2]}-${match[3]}`);
}

function buildTimeline(documents) {
  const events = [];
  const undated = [];

  for (const document of documents) {
    const publishedAt = normalizeDate(document.publication?.publishedAt);
    const updatedAt = normalizeDate(document.publication?.updatedAt);
    const inferredAt = inferredPathDate(document);
    const repository = document.repository
      ? Object.fromEntries(Object.entries(document.repository).filter(([, value]) => value))
      : undefined;

    if (publishedAt) {
      events.push({
        id: `${document.id}:published:${publishedAt}`,
        date: publishedAt,
        type: 'published',
        documentId: document.id,
        title: document.title,
        route: document.route,
        kind: document.kind,
        status: document.status,
        description: document.description,
        repository,
      });
    }

    if (updatedAt && updatedAt !== publishedAt) {
      events.push({
        id: `${document.id}:updated:${updatedAt}`,
        date: updatedAt,
        type: 'updated',
        documentId: document.id,
        title: document.title,
        route: document.route,
        kind: document.kind,
        status: document.status,
        description: document.description,
        repository,
      });
    }

    if (!publishedAt && !updatedAt && inferredAt) {
      events.push({
        id: `${document.id}:documented:${inferredAt}`,
        date: inferredAt,
        type: document.kind === 'build-log' ? 'build-log' : 'documented',
        documentId: document.id,
        title: document.title,
        route: document.route,
        kind: document.kind,
        status: document.status,
        description: document.description,
        repository,
        inferred: true,
      });
    }

    if (!publishedAt && !updatedAt && !inferredAt) {
      undated.push(compactDocument(document));
    }
  }

  events.sort(
    (left, right) =>
      right.date.localeCompare(left.date) ||
      left.documentId.localeCompare(right.documentId, undefined, { numeric: true }) ||
      left.type.localeCompare(right.type),
  );

  return {
    eventCount: events.length,
    undatedDocumentCount: undated.length,
    events,
    undated: undated.sort((left, right) =>
      left.id.localeCompare(right.id, undefined, { numeric: true }),
    ),
  };
}

export function buildExplorationManifest(registry) {
  const canonical = registry.documents.filter((document) => !document.synthetic);
  const documents = canonical
    .map(compactDocument)
    .sort((left, right) => left.id.localeCompare(right.id, undefined, { numeric: true }));
  const edges = compactEdges(canonical).sort(
    (left, right) =>
      left.sourceId.localeCompare(right.sourceId, undefined, { numeric: true }) ||
      left.kind.localeCompare(right.kind) ||
      left.targetId.localeCompare(right.targetId, undefined, { numeric: true }),
  );

  return {
    schemaVersion: 1,
    generatedAt: registry.generatedAt,
    documentCount: documents.length,
    relationshipCount: edges.length,
    connectedDocumentCount: documents.filter((document) => document.relationshipCount > 0).length,
    facets: {
      kinds: countBy(documents, (document) => document.kind),
      statuses: countBy(documents, (document) => document.status).sort(
        (left, right) => statusOrder(left.value) - statusOrder(right.value),
      ),
      families: countBy(documents, (document) => document.family),
      series: countBy(documents, (document) => document.series),
      surfaces: countBy(documents, (document) => document.surface),
      relationships: countBy(edges, (edge) => edge.kind),
    },
    documents,
    edges,
    supersessionChains: buildSupersessionChains(canonical, edges),
    series: seriesProgress(registry.series ?? []),
    timeline: buildTimeline(canonical),
  };
}
