import type {
  DocumentKind,
  DocumentStatus,
  RelationshipKind,
} from '@/lib/content/constants';

export type RelatedDocuments = Partial<Record<RelationshipKind, string[]>>;

export type DocumentRelationshipEdge = {
  kind: RelationshipKind;
  id: string;
  title: string;
  route: string;
  explicit: boolean;
};

export type DocumentRelationships = {
  outgoing: DocumentRelationshipEdge[];
  incoming: DocumentRelationshipEdge[];
};

export type DocumentLifecycle = {
  previousStatus?: DocumentStatus;
  allowedNextStatuses: DocumentStatus[];
};

export type DocumentSeries = {
  key: string;
  position?: number;
  total: number;
  previousId?: string;
  previousTitle?: string;
  previousRoute?: string;
  nextId?: string;
  nextTitle?: string;
  nextRoute?: string;
};

export type DocumentPublicationMetadata = {
  projectPhase?: string;
  publishedAt?: string;
  updatedAt?: string;
  estimatedReadingMinutes: number;
  wordCount: number;
};

export type DocumentRepositoryState = {
  commit?: string;
  branch?: string;
  release?: string;
  tree?: string;
  command?: string;
};

export type DocumentRegistryEntry = {
  id: string;
  title: string;
  description: string;
  kind: DocumentKind;
  family: string;
  status: DocumentStatus;
  lifecycle: DocumentLifecycle;
  route: string;
  aliases: string[];
  slug: string[];
  canonicalPath: string;
  sourceRoot: string;
  sourceHash: string;
  generatedPath: string;
  synthetic: boolean;
  series?: DocumentSeries;
  tags: string[];
  references: string[];
  referencedBy: string[];
  related: RelatedDocuments;
  relationships: DocumentRelationships;
  publication?: DocumentPublicationMetadata;
  repository?: DocumentRepositoryState;
};

export type ContentIssueSeverity = 'warning' | 'error';

export type ContentIssue = {
  severity: ContentIssueSeverity;
  code: string;
  message: string;
  canonicalPath?: string;
};

export type ContentRedirect = {
  source: string;
  destination: string;
  permanent: boolean;
  id: string;
};

export type ContentSeriesEntry = {
  key: string;
  total: number;
  documentCount: number;
  documents: Array<{
    id: string;
    title: string;
    route: string;
    position?: number;
    status: DocumentStatus;
  }>;
};

export type IdentifierFamilyContract = {
  key: string;
  label: string;
  patternSource: string;
  kinds: DocumentKind[];
  statuses: DocumentStatus[];
  initialStatuses: DocumentStatus[];
};

export type ContentRegistry = {
  schemaVersion: 2;
  contractVersion: string;
  generatedAt: string;
  documentCount: number;
  canonicalDocumentCount: number;
  syntheticDocumentCount: number;
  warningCount: number;
  errorCount: number;
  families: IdentifierFamilyContract[];
  series: ContentSeriesEntry[];
  redirects: ContentRedirect[];
  documents: DocumentRegistryEntry[];
  issues: ContentIssue[];
};
