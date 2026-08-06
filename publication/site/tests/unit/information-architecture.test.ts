import { describe, expect, it } from 'vitest';
import {
  findPublicationSection,
  publicationSections,
  publicRouteCatalog,
  readingPaths,
  routePolicy,
} from '@/information-architecture.mjs';

describe('information architecture contract', () => {
  it('defines unique public section and child routes', () => {
    const routes = publicRouteCatalog().map((entry) => entry.route);
    expect(new Set(routes).size).toBe(routes.length);
  });

  it('maps nested routes to their owning publication section', () => {
    expect(findPublicationSection('/artifacts/specifications/mke/core')?.key).toBe('artifacts');
    expect(findPublicationSection('/project/build-log/bld-0001')?.key).toBe('project');
    expect(findPublicationSection('/start')?.key).toBe('start');
  });

  it('provides deliberate audience reading paths', () => {
    expect(readingPaths.map((path) => path.key)).toEqual([
      'builder',
      'architect',
      'implementer',
      'historian',
    ]);
    expect(readingPaths.every((path) => path.steps.length >= 4)).toBe(true);
  });

  it('keeps identity separate from public location', () => {
    expect(routePolicy.routeIdentityPrinciple).toMatch(/identifiers are durable identity/i);
    expect(publicationSections.map((section) => section.key)).toEqual([
      'start',
      'building-monad',
      'system',
      'artifacts',
      'project',
    ]);
  });
});
