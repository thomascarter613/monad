/**
 * Versioned governance contract for Monad publication identifiers and lifecycle.
 *
 * This file is intentionally framework-independent. It is consumed by the
 * repository ingestion scripts and emitted into the generated registry.
 */
export const contentContractVersion = '2026-08-04.2';

const governedStatuses = [
  'draft',
  'proposed',
  'accepted',
  'active',
  'deprecated',
  'superseded',
  'published',
  'archived',
];

export const identifierFamilies = Object.freeze([
  Object.freeze({
    key: 'journal',
    label: 'Building Monad Journal',
    pattern: /^MJ-\d{4}$/,
    patternSource: '^MJ-\\d{4}$',
    kinds: ['journal-entry'],
    statuses: ['draft', 'published', 'archived'],
    initialStatuses: ['draft', 'published'],
  }),
  Object.freeze({
    key: 'decision',
    label: 'Architecture Decision Record',
    pattern: /^ADR-\d{4}$/,
    patternSource: '^ADR-\\d{4}$',
    kinds: ['decision'],
    statuses: ['proposed', 'accepted', 'deprecated', 'superseded', 'archived'],
    initialStatuses: ['proposed', 'accepted'],
  }),
  Object.freeze({
    key: 'architecture',
    label: 'Architecture Record',
    pattern: /^(?:ARCH|ARC)(?:-[A-Z0-9]+)*-\d{4}$/,
    patternSource: '^(?:ARCH|ARC)(?:-[A-Z0-9]+)*-\\d{4}$',
    kinds: ['architecture'],
    statuses: governedStatuses,
    initialStatuses: ['draft', 'proposed', 'published'],
  }),
  Object.freeze({
    key: 'engineering',
    label: 'Engineering Record',
    pattern: /^(?:ENG|ELOG|VER|TEST)(?:-[A-Z0-9]+)*-\d{4}$/,
    patternSource: '^(?:ENG|ELOG|VER|TEST)(?:-[A-Z0-9]+)*-\\d{4}$',
    kinds: ['engineering'],
    statuses: governedStatuses,
    initialStatuses: ['draft', 'active', 'published'],
  }),
  Object.freeze({
    key: 'research',
    label: 'Research Record',
    pattern: /^(?:RES|RSR)(?:-[A-Z0-9]+)*-\d{4}$/,
    patternSource: '^(?:RES|RSR)(?:-[A-Z0-9]+)*-\\d{4}$',
    kinds: ['research'],
    statuses: governedStatuses,
    initialStatuses: ['draft', 'active', 'published'],
  }),
  Object.freeze({
    key: 'knowledge',
    label: 'Knowledge Record',
    pattern: /^(?:KNOW|KNO|KB)(?:-[A-Z0-9]+)*-\d{4}$/,
    patternSource: '^(?:KNOW|KNO|KB)(?:-[A-Z0-9]+)*-\\d{4}$',
    kinds: ['knowledge'],
    statuses: governedStatuses,
    initialStatuses: ['draft', 'active', 'published'],
  }),
  Object.freeze({
    key: 'build-log',
    label: 'Build Log Record',
    pattern: /^(?:BLD|BUILD|LOG)(?:-[A-Z0-9]+)*-\d{4}$/,
    patternSource: '^(?:BLD|BUILD|LOG)(?:-[A-Z0-9]+)*-\\d{4}$',
    kinds: ['build-log'],
    statuses: ['draft', 'active', 'published', 'archived'],
    initialStatuses: ['draft', 'active', 'published'],
  }),
  Object.freeze({
    key: 'specification',
    label: 'Monad Governed Artifact',
    pattern:
      /^(?!ADR-|MJ-|ARCH-|ARC-|ENG-|ELOG-|VER-|TEST-|RES-|RSR-|KNOW-|KNO-|KB-|BLD-|BUILD-|LOG-)[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)*-\d{4}$/,
    patternSource:
      '^(?!ADR-|MJ-|ARCH-|ARC-|ENG-|ELOG-|VER-|TEST-|RES-|RSR-|KNOW-|KNO-|KB-|BLD-|BUILD-|LOG-)[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)*-\\d{4}$',
    kinds: ['specification', 'engineering', 'research', 'knowledge', 'build-log'],
    statuses: governedStatuses,
    initialStatuses: ['draft', 'proposed', 'accepted', 'active', 'published'],
  }),
]);

const governedLifecycle = Object.freeze({
  draft: ['draft', 'proposed', 'accepted', 'active', 'published', 'archived'],
  proposed: ['draft', 'proposed', 'accepted', 'active', 'published', 'archived'],
  accepted: ['accepted', 'active', 'deprecated', 'superseded', 'archived'],
  active: ['active', 'deprecated', 'superseded', 'published', 'archived'],
  deprecated: ['deprecated', 'active', 'superseded', 'archived'],
  superseded: ['superseded', 'archived'],
  published: ['published', 'deprecated', 'superseded', 'archived'],
  archived: ['archived'],
});

export const lifecycleTransitions = Object.freeze({
  'journal-entry': Object.freeze({
    draft: ['draft', 'published', 'archived'],
    published: ['published', 'archived'],
    archived: ['archived'],
  }),
  architecture: governedLifecycle,
  decision: Object.freeze({
    proposed: ['proposed', 'accepted', 'archived'],
    accepted: ['accepted', 'deprecated', 'superseded', 'archived'],
    deprecated: ['deprecated', 'superseded', 'archived'],
    superseded: ['superseded', 'archived'],
    archived: ['archived'],
  }),
  specification: governedLifecycle,
  engineering: governedLifecycle,
  research: governedLifecycle,
  knowledge: governedLifecycle,
  'build-log': governedLifecycle,
  'collection-index': Object.freeze({
    published: ['published'],
  }),
});

export const relationshipTargetKinds = Object.freeze({
  articles: ['journal-entry'],
  decisions: ['decision'],
  specifications: ['specification'],
  architecture: ['architecture'],
  research: ['research'],
  engineering: ['engineering'],
  knowledge: ['knowledge'],
});

export function resolveIdentifierFamily(identifier) {
  if (typeof identifier !== 'string') return null;
  return identifierFamilies.find((family) => family.pattern.test(identifier)) ?? null;
}

export function serializableIdentifierFamilies() {
  return identifierFamilies.map(({ pattern, ...family }) => family);
}
