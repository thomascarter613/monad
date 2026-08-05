export type PublicationEditionFormat = 'pdf' | 'epub' | 'offline' | 'source';
export type PublicationEditionSurface = 'building-monad' | 'system' | 'artifacts' | 'project';

export type PublicationEditionDefinition = {
  key: string;
  title: string;
  subtitle: string;
  description: string;
  defaultVersion: string;
  selectors: {
    surfaces: PublicationEditionSurface[];
    kinds?: string[];
    statuses?: string[];
    series?: string[];
    tags?: string[];
    includeSynthetic: boolean;
  };
  formats: PublicationEditionFormat[];
  paper: {
    format: 'Letter' | 'A4' | 'A5';
    margin: { top: string; right: string; bottom: string; left: string };
  };
};

export const publicationEditionContractVersion: string;
export const publicationEditions: PublicationEditionDefinition[];
export function publicationEditionByKey(key: string): PublicationEditionDefinition | undefined;
export function editionSourceDigest(
  documents: Array<{ id: string; route: string; sourceHash: string }>,
): string;
export function validatePublicationEditions(): PublicationEditionDefinition[];
