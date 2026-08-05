/**
 * Presentation contract for the Building Monad chronological publication.
 *
 * This file is framework-independent so the ingestion pipeline and the
 * Next.js application share one vocabulary for project phases and reading
 * progress behavior.
 */
export const buildingMonadExperienceVersion = '2026-08-04';

export const buildingMonadSeries = Object.freeze({
  key: 'building-monad',
  title: 'Building Monad',
  description:
    'The chronological engineering narrative documenting how Monad is designed, governed, and implemented.',
  route: '/building-monad',
  wordsPerMinute: 225,
  completionThreshold: 0.92,
  storageKey: 'monad:building-monad:reading:v1',
});

export const buildingMonadPhases = Object.freeze([
  Object.freeze({
    key: 'orientation',
    title: 'Orientation',
    shortTitle: 'Orientation',
    description: 'The problem, product thesis, vocabulary, and boundaries that make Monad necessary.',
    order: 10,
  }),
  Object.freeze({
    key: 'foundation',
    title: 'Foundation',
    shortTitle: 'Foundation',
    description: 'Repository identity, governing principles, manifests, and the first durable system boundaries.',
    order: 20,
  }),
  Object.freeze({
    key: 'kernel',
    title: 'Kernel and Runtime',
    shortTitle: 'Kernel',
    description: 'The executable core, lifecycle, state model, and runtime contracts.',
    order: 30,
  }),
  Object.freeze({
    key: 'language',
    title: 'Specification Language',
    shortTitle: 'Language',
    description: 'The models, schemas, and languages used to describe repositories and desired systems.',
    order: 40,
  }),
  Object.freeze({
    key: 'engine',
    title: 'Engine and Generation',
    shortTitle: 'Engine',
    description: 'Planning, compilation, generation, reconciliation, and deterministic repository evolution.',
    order: 50,
  }),
  Object.freeze({
    key: 'experience',
    title: 'CLI and Human Experience',
    shortTitle: 'Experience',
    description: 'Interactive configuration, terminal interfaces, workflows, and contributor experience.',
    order: 60,
  }),
  Object.freeze({
    key: 'intelligence',
    title: 'AI Context and Intelligence',
    shortTitle: 'Intelligence',
    description: 'Context persistence, retrieval, agents, reasoning boundaries, and AI-optional operation.',
    order: 70,
  }),
  Object.freeze({
    key: 'governance',
    title: 'Governance and Assurance',
    shortTitle: 'Governance',
    description: 'Validation, policy, provenance, security, testing, and evidence of correctness.',
    order: 80,
  }),
  Object.freeze({
    key: 'operations',
    title: 'Operations and Ecosystem',
    shortTitle: 'Operations',
    description: 'Release, deployment, extension, integration, and long-term ecosystem operation.',
    order: 90,
  }),
]);

export function normalizeBuildingMonadPhase(value) {
  if (typeof value !== 'string' || !value.trim()) return 'foundation';
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'foundation';
}

export function resolveBuildingMonadPhase(value) {
  const key = normalizeBuildingMonadPhase(value);
  const known = buildingMonadPhases.find((phase) => phase.key === key);
  if (known) return known;

  const title = key
    .split('-')
    .filter(Boolean)
    .map((part) => `${part[0]?.toUpperCase() ?? ''}${part.slice(1)}`)
    .join(' ');

  return Object.freeze({
    key,
    title: title || 'Foundation',
    shortTitle: title || 'Foundation',
    description: 'A project phase declared by the canonical Building Monad article.',
    order: 500,
  });
}
