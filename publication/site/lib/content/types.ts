import type {
  DocumentKind,
  DocumentStatus,
  RelationshipKind,
} from '@/lib/content/constants';

export type RelatedDocuments = Partial<Record<RelationshipKind, string[]>>;

export type DocumentRegistryEntry = {
  id: string;
  title: string;
  description: string;
  kind: DocumentKind;
  status: DocumentStatus;
  route: string;
  slug: string[];
  canonicalPath: string;
  sourceRoot: string;
  sourceHash: string;
  generatedPath: string;
  synthetic: boolean;
  series?: string;
  seriesPosition?: number;
  tags: string[];
  references: string[];
  related: RelatedDocuments;
};

export type ContentIssueSeverity = 'warning' | 'error';

export type ContentIssue = {
  severity: ContentIssueSeverity;
  code: string;
  message: string;
  canonicalPath?: string;
};

export type ContentRegistry = {
  schemaVersion: 1;
  generatedAt: string;
  documentCount: number;
  warningCount: number;
  errorCount: number;
  documents: DocumentRegistryEntry[];
  issues: ContentIssue[];
};
