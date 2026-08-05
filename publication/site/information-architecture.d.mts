export type PublicationChildSection = Readonly<{
  key: string;
  title: string;
  route: `/${string}`;
}>;

export type PublicationSection = Readonly<{
  key: string;
  title: string;
  shortTitle: string;
  route: `/${string}`;
  description: string;
  mode: 'guide' | 'narrative' | 'reference' | 'registry' | 'operations';
  primaryNavigation: boolean;
  order: number;
  children: readonly PublicationChildSection[];
}>;

export type ReadingPathStep = Readonly<{
  title: string;
  route: `/${string}`;
  rationale: string;
}>;

export type ReadingPath = Readonly<{
  key: string;
  title: string;
  audience: string;
  description: string;
  steps: readonly ReadingPathStep[];
}>;

export const informationArchitectureVersion: string;
export const routePolicy: Readonly<{
  canonicalOriginEnvironmentVariable: string;
  casing: string;
  trailingSlash: boolean;
  includeDatesInCanonicalRoutes: boolean;
  includeVersionsInCanonicalRoutes: boolean;
  preservePreviousRoutesAsPermanentRedirects: boolean;
  routeIdentityPrinciple: string;
}>;
export const publicationSections: readonly PublicationSection[];
export const readingPaths: readonly ReadingPath[];
export function findPublicationSection(pathname: string): PublicationSection | null;
export function publicRouteCatalog(): Array<{
  key: string;
  title: string;
  route: `/${string}`;
  description: string;
  mode: string;
  parent: string | null;
  order: number;
}>;
