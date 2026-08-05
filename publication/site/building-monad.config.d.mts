export type BuildingMonadPhaseContract = {
  readonly key: string;
  readonly title: string;
  readonly shortTitle: string;
  readonly description: string;
  readonly order: number;
};

export declare const buildingMonadExperienceVersion: string;
export declare const buildingMonadSeries: Readonly<{
  key: string;
  title: string;
  description: string;
  route: string;
  wordsPerMinute: number;
  completionThreshold: number;
  storageKey: string;
}>;
export declare const buildingMonadPhases: readonly BuildingMonadPhaseContract[];
export declare function normalizeBuildingMonadPhase(value: unknown): string;
export declare function resolveBuildingMonadPhase(value: unknown): BuildingMonadPhaseContract;
