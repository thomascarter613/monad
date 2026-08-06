import { describe, expect, it } from 'vitest';
import { createNavigationManifest } from '../../scripts/content/lib/projection.mjs';

type NavigationDocument = {
  id: string;
  route: string;
  synthetic: boolean;
};

function document(route: string, synthetic = false): NavigationDocument {
  return {
    id: route.toUpperCase(),
    route,
    synthetic,
  };
}

describe('generated navigation manifest', () => {
  it('records route availability and canonical counts independently', () => {
    const manifest = createNavigationManifest(
      [
        document('/building-monad/mj-0001'),
        document('/artifacts/specifications/mke-core-0001'),
        document('/project/status', true),
      ],
      '2026-08-04T00:00:00.000Z',
    );

    expect(manifest.schemaVersion).toBe(1);
    expect(manifest.routes.find((entry) => entry.route === '/system')?.available).toBe(true);
    expect(manifest.routes.find((entry) => entry.route === '/building-monad')?.documentCount).toBe(1);
    expect(manifest.routes.find((entry) => entry.route === '/project/status')?.documentCount).toBe(0);
    expect(manifest.readingPaths.find((entry) => entry.key === 'builder')?.steps[0].available).toBe(
      false,
    );
  });
});
