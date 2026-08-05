/**
 * Canonical Monad content sources.
 *
 * Paths are relative to the repository root, never the publication site.
 * The generated collection and prefix control only the disposable Fumadocs
 * projection under publication/site/.generated/content.
 */
export const publicationContentSources = Object.freeze([
  Object.freeze({
    key: 'building-monad',
    title: 'Building Monad',
    description:
      'The chronological engineering narrative documenting how Monad is designed and built.',
    kind: 'journal-entry',
    canonicalRoots: ['journal'],
    generatedCollection: 'building-monad',
    generatedPrefix: '',
    routeBase: '/building-monad',
    idRequired: false,
    order: 10,
  }),
  Object.freeze({
    key: 'architecture',
    title: 'Architecture',
    description:
      'Architecture descriptions, models, principles, boundaries, and system views.',
    kind: 'architecture',
    canonicalRoots: ['architecture'],
    generatedCollection: 'system',
    generatedPrefix: 'architecture',
    routeBase: '/system/architecture',
    idRequired: false,
    order: 20,
  }),
  Object.freeze({
    key: 'decisions',
    title: 'Architecture Decisions',
    description:
      'Durable architectural and engineering decisions recorded as ADRs.',
    kind: 'decision',
    canonicalRoots: ['adrs'],
    generatedCollection: 'artifacts',
    generatedPrefix: 'decisions',
    routeBase: '/artifacts/decisions',
    idRequired: true,
    order: 30,
  }),
  Object.freeze({
    key: 'specifications',
    title: 'Specifications',
    description:
      'Normative specifications that define Monad capabilities, contracts, and behavior.',
    kind: 'specification',
    canonicalRoots: ['specifications'],
    generatedCollection: 'artifacts',
    generatedPrefix: 'specifications',
    routeBase: '/artifacts/specifications',
    idRequired: true,
    order: 40,
  }),
]);

export const contentIngestionConfig = Object.freeze({
  schemaVersion: 1,
  acceptedExtensions: ['.md', '.mdx'],
  ignoredDirectoryNames: [
    '.git',
    '.monad',
    '.next',
    '.source',
    'node_modules',
    'target',
    'dist',
    'build',
    'out',
  ],
  ignoredFileNames: ['.DS_Store'],
  maximumDocumentBytes: 2_000_000,
});
