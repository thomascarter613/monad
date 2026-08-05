export type EditionFormat = 'pdf' | 'epub' | 'offline' | 'source';
export type EditionSurface = 'building-monad' | 'system' | 'artifacts' | 'project';

export type EditionDocument = {
  sequence: number;
  id: string;
  title: string;
  description: string;
  route: string;
  canonicalPath: string;
  sourceRoot: string;
  sourceHash: string;
  kind: string;
  status: string;
  family: string;
  series?: string;
  seriesPosition?: number;
  tags: string[];
  publishedAt?: string;
  updatedAt?: string;
  repository?: {
    commit?: string;
    branch?: string;
    release?: string;
    tree?: string;
    command?: string;
  };
  synthetic: boolean;
  surface: EditionSurface;
};

export type EditionManifestEntry = {
  key: string;
  title: string;
  subtitle: string;
  description: string;
  defaultVersion: string;
  selectors: {
    surfaces: EditionSurface[];
    kinds?: string[];
    statuses?: string[];
    series?: string[];
    tags?: string[];
    includeSynthetic: boolean;
  };
  formats: EditionFormat[];
  paper: {
    format: 'Letter' | 'A4' | 'A5';
    margin: { top: string; right: string; bottom: string; left: string };
  };
  documentCount: number;
  sourceDigest: string;
  documents: EditionDocument[];
  artifactNames: Record<EditionFormat | 'manifest', string>;
};

export type EditionManifest = {
  schemaVersion: 1;
  contractVersion: string;
  generatedAt: string;
  editionCount: number;
  editions: EditionManifestEntry[];
};

export type DerivedArtifact = {
  format: EditionFormat | 'article-pdf' | 'manifest' | 'checksums';
  filename: string;
  bytes: number;
  sha256: string;
};

export type DerivedPublicationManifest = {
  schemaVersion: 1;
  editionContractVersion: string;
  edition: string;
  title: string;
  version: string;
  generatedAt: string;
  sourceDateEpoch?: number;
  sourceDigest: string;
  repository: {
    commit?: string;
    dirty?: boolean;
  };
  toolchain: {
    node: string;
    bun?: string;
    playwright?: string;
    chromium?: string;
  };
  documents: EditionDocument[];
  artifacts: DerivedArtifact[];
};
