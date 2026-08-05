export type DiscoveryFacet = {
  value: string;
  label: string;
  count: number;
};

export type DiscoveryDocument = {
  id: string;
  title: string;
  description: string;
  excerpt: string;
  route: string;
  canonicalPath: string;
  kind: string;
  status: string;
  family: string;
  series?: string;
  surface: string;
  tags: string[];
  synthetic: boolean;
  publishedAt?: string;
  updatedAt?: string;
  searchText?: string;
};

export type DiscoveryManifest = {
  schemaVersion: 1;
  generatedAt: string;
  documentCount: number;
  canonicalDocumentCount: number;
  facets: {
    surfaces: DiscoveryFacet[];
    kinds: DiscoveryFacet[];
    statuses: DiscoveryFacet[];
    families: DiscoveryFacet[];
    series: DiscoveryFacet[];
    tags: DiscoveryFacet[];
  };
  documents: DiscoveryDocument[];
};

export type DiscoveryResponse = {
  schemaVersion: 1;
  generatedAt: string;
  query: string;
  filters: Record<string, string>;
  total: number;
  limit: number;
  offset: number;
  facets: DiscoveryManifest['facets'];
  results: Array<DiscoveryDocument & { score: number }>;
};
