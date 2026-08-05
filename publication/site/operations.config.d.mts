export declare const operationsContractVersion: string;
export declare const ciPolicy: Readonly<{
  packageManager: string;
  nodeMinimum: number;
  pullRequestChecks: readonly string[];
  coverage: Readonly<Record<'branches' | 'functions' | 'lines' | 'statements', number>>;
  artifactRetentionDays: Readonly<Record<'reports' | 'previews' | 'releases', number>>;
}>;
export interface DeploymentProfile {
  readonly key: string;
  readonly title: string;
  readonly classification: string;
  readonly rootDirectory?: string;
  readonly installCommand?: string;
  readonly buildCommand?: string;
  readonly dockerfile?: string;
  readonly buildContext?: string;
  readonly healthRoute: string;
  readonly preview: boolean;
  readonly production: boolean;
  readonly notes: string;
}
export declare const deploymentProfiles: readonly Readonly<DeploymentProfile>[];
export declare const releasePolicy: Readonly<{
  tagPrefix: string;
  immutableChannel: string;
  continuousChannel: string;
  defaultEdition: string;
  requiredArtifacts: readonly string[];
  sourceDateEpoch: string;
  releaseNotes: string;
}>;
export declare function deploymentProfile(key: string): Readonly<DeploymentProfile> | undefined;
