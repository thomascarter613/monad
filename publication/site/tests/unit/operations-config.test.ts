import { describe, expect, it } from 'vitest';
import {
  ciPolicy,
  deploymentProfile,
  deploymentProfiles,
  releasePolicy,
} from '@/operations.config.mjs';

describe('operations contract', () => {
  it('defines managed and portable production profiles', () => {
    expect(deploymentProfiles.map((profile) => profile.key)).toEqual(['vercel', 'container']);
    expect(deploymentProfile('container')?.dockerfile).toContain('Dockerfile');
  });
  it('keeps CI coverage aligned with Vitest thresholds', () => {
    expect(ciPolicy.coverage).toEqual({ branches: 85, functions: 90, lines: 90, statements: 90 });
  });
  it('uses a namespaced immutable documentation tag', () => {
    expect(releasePolicy.tagPrefix).toBe('docs-v');
    expect(releasePolicy.requiredArtifacts).toContain('checksums');
  });
});
