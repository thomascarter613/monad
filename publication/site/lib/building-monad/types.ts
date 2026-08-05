export type BuildingMonadRepositoryState = {
  commit?: string;
  branch?: string;
  release?: string;
  tree?: string;
  command?: string;
};

export type BuildingMonadArtifact = {
  id: string;
  title: string;
  route: string;
  relationship: string;
  explicit: boolean;
};

export type BuildingMonadNavigationTarget = {
  id: string;
  title: string;
  route: string;
};

export type BuildingMonadInstallment = {
  id: string;
  title: string;
  description: string;
  route: string;
  status: string;
  phase: string;
  phaseTitle: string;
  position: number;
  total: number;
  estimatedReadingMinutes: number;
  wordCount: number;
  publishedAt?: string;
  updatedAt?: string;
  canonicalPath: string;
  repository?: BuildingMonadRepositoryState;
  artifacts: BuildingMonadArtifact[];
  previous?: BuildingMonadNavigationTarget;
  next?: BuildingMonadNavigationTarget;
};

export type BuildingMonadPhase = {
  key: string;
  title: string;
  shortTitle: string;
  description: string;
  order: number;
  installments: string[];
};

export type BuildingMonadManifest = {
  schemaVersion: 1;
  experienceVersion: string;
  generatedAt: string;
  series: {
    key: string;
    title: string;
    description: string;
    route: string;
    wordsPerMinute: number;
    completionThreshold: number;
    storageKey: string;
  };
  installmentCount: number;
  publishedCount: number;
  total: number;
  currentId?: string;
  currentRoute?: string;
  phases: BuildingMonadPhase[];
  installments: BuildingMonadInstallment[];
};

export type BuildingMonadReadRecord = {
  progress: number;
  completed: boolean;
  visitedAt: string;
};

export type BuildingMonadReadingState = {
  version: 1;
  lastRoute?: string;
  installments: Record<string, BuildingMonadReadRecord>;
};
