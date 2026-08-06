import {
  artifactSource,
  buildingMonadSource,
  projectSource,
  systemSource,
} from '@/lib/source';

export const publicationPageSources = [
  { key: 'building-monad', label: 'Building Monad', source: buildingMonadSource },
  { key: 'system', label: 'System', source: systemSource },
  { key: 'artifacts', label: 'Artifacts', source: artifactSource },
  { key: 'project', label: 'Project', source: projectSource },
] as const;

export type PublicationPage = {
  url: string;
  slugs: string[];
  data: {
    title: string;
    description?: string;
    synthetic?: boolean;
    getText: (mode: 'processed') => Promise<string>;
    [key: string]: unknown;
  };
};

export function getAllPublicationPages() {
  return publicationPageSources.flatMap(({ key, label, source }) =>
    source.getPages().map((page) => ({ key, label, page: page as unknown as PublicationPage })),
  );
}

export function getPublicationPage(section: string, slug?: string[]) {
  const selected = publicationPageSources.find((entry) => entry.key === section);
  if (!selected) return undefined;
  const page = selected.source.getPage(slug);
  return page ? { ...selected, page: page as unknown as PublicationPage } : undefined;
}
