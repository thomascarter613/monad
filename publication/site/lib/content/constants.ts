export const documentKinds = [
  'journal-entry',
  'architecture',
  'decision',
  'specification',
  'collection-index',
] as const;

export type DocumentKind = (typeof documentKinds)[number];

export const documentStatuses = [
  'draft',
  'proposed',
  'accepted',
  'active',
  'deprecated',
  'superseded',
  'published',
  'archived',
] as const;

export type DocumentStatus = (typeof documentStatuses)[number];

export const relationshipKinds = [
  'articles',
  'decisions',
  'specifications',
  'architecture',
  'research',
  'engineering',
  'knowledge',
  'supersedes',
  'supersededBy',
] as const;

export type RelationshipKind = (typeof relationshipKinds)[number];
