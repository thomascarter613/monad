/**
 * Operational contract for the Monad documentation platform.
 * Framework-independent so CI, deployment scripts, tests, and the site can share it.
 */
export const operationsContractVersion = '2026-08-04.1';

export const ciPolicy = Object.freeze({
  packageManager: 'bun@1.3.14',
  nodeMinimum: 22,
  pullRequestChecks: Object.freeze([
    'content validation',
    'formatting and linting',
    'type checking',
    'unit coverage',
    'production build',
    'browser smoke and accessibility tests',
    'internal-link validation',
    'security-header validation',
  ]),
  coverage: Object.freeze({ branches: 85, functions: 90, lines: 90, statements: 90 }),
  artifactRetentionDays: Object.freeze({ reports: 14, previews: 7, releases: 30 }),
});

export const deploymentProfiles = Object.freeze([
  Object.freeze({
    key: 'vercel',
    title: 'Vercel',
    classification: 'managed-primary',
    rootDirectory: 'publication/site',
    installCommand: 'bun install --frozen-lockfile',
    buildCommand: 'bun run build',
    healthRoute: '/api/health',
    preview: true,
    production: true,
    notes: 'Recommended when the repository is connected to Vercel or the opt-in GitHub deployment workflows are configured.',
  }),
  Object.freeze({
    key: 'container',
    title: 'Standalone OCI container',
    classification: 'portable-primary',
    dockerfile: 'publication/site/deployment/container/Dockerfile',
    buildContext: '.',
    healthRoute: '/api/health',
    preview: true,
    production: true,
    notes: 'Provider-independent Next.js standalone image suitable for a container platform or a single host.',
  }),
]);

export const releasePolicy = Object.freeze({
  tagPrefix: 'docs-v',
  immutableChannel: 'tagged',
  continuousChannel: 'continuous',
  defaultEdition: 'complete',
  requiredArtifacts: Object.freeze(['pdf', 'epub', 'offline', 'source', 'manifest', 'checksums']),
  sourceDateEpoch: 'Git commit timestamp for the release commit',
  releaseNotes: 'GitHub release notes plus the generated publication manifest and checksums',
});

export function deploymentProfile(key) {
  return deploymentProfiles.find((profile) => profile.key === key);
}
