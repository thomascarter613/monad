import type { DocumentKind, DocumentStatus, RelationshipKind } from '@/lib/content/constants';

export type ExplorationFacet = {
  value: string;
  count: number;
};

export type ExplorationDocument = {
  id: string;
  title: string;
  description: string;
  route: string;
  kind: DocumentKind;
  family: string;
  status: DocumentStatus;
  surface: 'building-monad' | 'system' | 'artifacts' | 'project';
  canonicalPath: string;
  tags: string[];
  series?: string;
  seriesPosition?: number;
  seriesTotal?: number;
  publishedAt?: string;
  updatedAt?: string;
  relationshipCount: number;
  incomingCount: number;
  outgoingCount: number;
};

export type ExplorationEdge = {
  sourceId: string;
  sourceTitle: string;
  sourceRoute: string;
  targetId: string;
  targetTitle: string;
  targetRoute: string;
  kind: RelationshipKind;
  explicit: boolean;
};

export type SupersessionChain = {
  id: string;
  kind: string;
  headIds: string[];
  nodes: ExplorationDocument[];
  edges: ExplorationEdge[];
};

export type ExplorationSeries = {
  key: string;
  total: number;
  documentCount: number;
  completionPercent: number;
  remainingCount: number;
  statusCounts: ExplorationFacet[];
  documents: Array<{
    id: string;
    title: string;
    route: string;
    position?: number;
    status: DocumentStatus;
  }>;
};

export type TimelineEvent = {
  id: string;
  date: string;
  type: 'published' | 'updated' | 'documented' | 'build-log';
  documentId: string;
  title: string;
  route: string;
  kind: DocumentKind;
  status: DocumentStatus;
  description: string;
  inferred?: boolean;
  repository?: Record<string, string>;
};

export type ExplorationManifest = {
  schemaVersion: 1;
  generatedAt: string;
  documentCount: number;
  relationshipCount: number;
  connectedDocumentCount: number;
  facets: {
    kinds: ExplorationFacet[];
    statuses: ExplorationFacet[];
    families: ExplorationFacet[];
    series: ExplorationFacet[];
    surfaces: ExplorationFacet[];
    relationships: ExplorationFacet[];
  };
  documents: ExplorationDocument[];
  edges: ExplorationEdge[];
  supersessionChains: SupersessionChain[];
  series: ExplorationSeries[];
  timeline: {
    eventCount: number;
    undatedDocumentCount: number;
    events: TimelineEvent[];
    undated: ExplorationDocument[];
  };
};
