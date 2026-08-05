import { describe, expect, it } from 'vitest';
import { primaryNavigation, publicationRoutes, reservedLandingRoutes } from '@/lib/routes';

describe('publication route contract', () => {
  it('assigns a unique public path to every route', () => {
    const paths = Object.values(publicationRoutes).map((route) => route.href);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it('exposes only active routes in primary navigation', () => {
    expect(primaryNavigation.every((route) => route.status === 'active')).toBe(true);
    expect(reservedLandingRoutes).toEqual([]);
  });

  it('activates the complete public information architecture', () => {
    expect(primaryNavigation.map((route) => route.href)).toEqual([
      '/start',
      '/building-monad',
      '/system',
      '/artifacts',
      '/project',
    ]);
  });
});
