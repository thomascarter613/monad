export type NavigationRouteRecord = {
  key: string;
  title: string;
  route: string;
  description: string;
  mode: string;
  parent: string | null;
  order: number;
  available: boolean;
  documentCount: number;
};

export type NavigationReadingPathStep = {
  title: string;
  route: string;
  rationale: string;
  available: boolean;
};

export type NavigationReadingPath = {
  key: string;
  title: string;
  audience: string;
  description: string;
  steps: NavigationReadingPathStep[];
};

export type NavigationManifest = {
  schemaVersion: 1;
  informationArchitectureVersion: string;
  generatedAt: string;
  routePolicy: Record<string, string | boolean>;
  routes: NavigationRouteRecord[];
  readingPaths: NavigationReadingPath[];
};
