import {
  buildingMonadExperienceVersion,
  buildingMonadPhases,
  buildingMonadSeries,
  resolveBuildingMonadPhase,
} from '../../../building-monad.config.mjs';

function installmentSort(left, right) {
  const leftPosition = left.seriesInfo?.position ?? left.seriesPosition ?? Number.MAX_SAFE_INTEGER;
  const rightPosition =
    right.seriesInfo?.position ?? right.seriesPosition ?? Number.MAX_SAFE_INTEGER;
  return (
    leftPosition - rightPosition || left.id.localeCompare(right.id, undefined, { numeric: true })
  );
}

function introducedArtifacts(document) {
  const relevantKinds = new Set([
    'decisions',
    'specifications',
    'architecture',
    'engineering',
    'research',
    'knowledge',
    'references',
  ]);
  const seen = new Set();
  const artifacts = [];

  for (const edge of document.relationships?.outgoing ?? []) {
    if (!relevantKinds.has(edge.kind) || seen.has(edge.id)) continue;
    seen.add(edge.id);
    artifacts.push({
      id: edge.id,
      title: edge.title,
      route: edge.route,
      relationship: edge.kind,
      explicit: edge.explicit,
    });
  }

  return artifacts.sort((left, right) =>
    left.id.localeCompare(right.id, undefined, { numeric: true }),
  );
}

function compactRepositoryState(value) {
  if (!value) return undefined;
  const repository = Object.fromEntries(
    Object.entries(value).filter(([, entry]) => typeof entry === 'string' && entry.trim()),
  );
  return Object.keys(repository).length > 0 ? repository : undefined;
}

export function buildBuildingMonadManifest(documents, generatedAt) {
  const journalDocuments = documents
    .filter((document) => !document.synthetic && document.kind === 'journal-entry')
    .sort(installmentSort);
  const declaredSeries = journalDocuments.find((document) => document.seriesInfo)?.seriesInfo;
  const total = Math.max(declaredSeries?.total ?? 0, journalDocuments.length);

  const installments = journalDocuments.map((document, index) => {
    const phase = resolveBuildingMonadPhase(document.publication?.projectPhase);
    const position = document.seriesInfo?.position ?? document.seriesPosition ?? index + 1;
    return {
      id: document.id,
      title: document.title,
      description: document.description,
      route: document.route,
      status: document.status,
      phase: phase.key,
      phaseTitle: phase.title,
      position,
      total,
      estimatedReadingMinutes: document.publication?.estimatedReadingMinutes ?? 1,
      wordCount: document.publication?.wordCount ?? 0,
      publishedAt: document.publication?.publishedAt,
      updatedAt: document.publication?.updatedAt,
      canonicalPath: document.canonicalPath,
      repository: compactRepositoryState(document.repository),
      artifacts: introducedArtifacts(document),
      previous:
        index > 0
          ? {
              id: journalDocuments[index - 1].id,
              title: journalDocuments[index - 1].title,
              route: journalDocuments[index - 1].route,
            }
          : undefined,
      next:
        index < journalDocuments.length - 1
          ? {
              id: journalDocuments[index + 1].id,
              title: journalDocuments[index + 1].title,
              route: journalDocuments[index + 1].route,
            }
          : undefined,
    };
  });

  const phaseMap = new Map();
  for (const phase of buildingMonadPhases) {
    phaseMap.set(phase.key, { ...phase, installments: [] });
  }
  for (const installment of installments) {
    const phase = resolveBuildingMonadPhase(installment.phase);
    const existing = phaseMap.get(phase.key) ?? { ...phase, installments: [] };
    existing.installments.push(installment.id);
    phaseMap.set(phase.key, existing);
  }

  const phases = [...phaseMap.values()]
    .filter((phase) => phase.installments.length > 0)
    .sort((left, right) => left.order - right.order || left.title.localeCompare(right.title));
  const published = installments.filter((installment) =>
    ['published', 'active', 'accepted'].includes(installment.status),
  );
  const current = published.at(-1) ?? installments.at(-1);

  return {
    schemaVersion: 1,
    experienceVersion: buildingMonadExperienceVersion,
    generatedAt,
    series: buildingMonadSeries,
    installmentCount: installments.length,
    publishedCount: published.length,
    total,
    currentId: current?.id,
    currentRoute: current?.route,
    phases,
    installments,
  };
}
