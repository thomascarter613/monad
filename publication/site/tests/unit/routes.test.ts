import { describe, expect, it } from 'vitest';
import {
  primaryNavigation,
  publicationRoutes,
  reservedLandingRoutes,
} from '@/lib/routes';

describe('publication route contract', () => {
  it('assigns a unique public path to every route', () => {
    const paths = Object.values(publicationRoutes).map((route) => route.href);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it('never exposes reserved routes in primary navigation', () => {
    expect(primaryNavigation.every((route) => route.status === 'active')).toBe(true);
  });

  it('activates the three canonical-content surfaces', () => {
    expect(primaryNavigation.map((route) => route.href)).toEqual([
      '/building-monad',
      '/system',
      '/artifacts',
    ]);
  });

  it('keeps the project operations surface reserved', () => {
    expect(reservedLandingRoutes.map((route) => route.href)).toEqual(['/project']);
  });
});
