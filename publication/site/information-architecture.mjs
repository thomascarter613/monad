/**
 * Public information architecture for the Monad Engineering Log.
 *
 * This module is framework-independent so it can be consumed by both the
 * repository ingestion pipeline and the Next.js application.
 */
export const informationArchitectureVersion = '2026-08-04.3';

export const routePolicy = Object.freeze({
  canonicalOriginEnvironmentVariable: 'NEXT_PUBLIC_SITE_URL',
  casing: 'lowercase-kebab-case',
  trailingSlash: false,
  includeDatesInCanonicalRoutes: false,
  includeVersionsInCanonicalRoutes: false,
  preservePreviousRoutesAsPermanentRedirects: true,
  routeIdentityPrinciple:
    'Document identifiers are durable identity; routes are stable reader-facing locations.',
});

export const publicationSections = Object.freeze([
  Object.freeze({
    key: 'start',
    title: 'Start',
    shortTitle: 'Start',
    route: '/start',
    description: 'Choose a reading path based on what you need to understand or accomplish.',
    mode: 'guide',
    primaryNavigation: true,
    order: 10,
    children: [],
  }),
  Object.freeze({
    key: 'building-monad',
    title: 'Building Monad',
    shortTitle: 'Building Monad',
    route: '/building-monad',
    description: 'The chronological engineering narrative, preserving decisions and context.',
    mode: 'narrative',
    primaryNavigation: true,
    order: 20,
    children: [],
  }),
  Object.freeze({
    key: 'system',
    title: 'Understand Monad',
    shortTitle: 'System',
    route: '/system',
    description: 'Stable conceptual and architectural documentation for understanding Monad.',
    mode: 'reference',
    primaryNavigation: true,
    order: 30,
    children: [
      Object.freeze({ key: 'architecture', title: 'Architecture', route: '/system/architecture' }),
    ],
  }),
  Object.freeze({
    key: 'artifacts',
    title: 'Engineering Artifacts',
    shortTitle: 'Artifacts',
    route: '/artifacts',
    description: 'Normative specifications, durable decisions, research, and engineering evidence.',
    mode: 'registry',
    primaryNavigation: true,
    order: 40,
    children: [
      Object.freeze({ key: 'decisions', title: 'Decisions', route: '/artifacts/decisions' }),
      Object.freeze({
        key: 'specifications',
        title: 'Specifications',
        route: '/artifacts/specifications',
      }),
      Object.freeze({
        key: 'engineering',
        title: 'Engineering Records',
        route: '/artifacts/engineering',
      }),
      Object.freeze({ key: 'research', title: 'Research', route: '/artifacts/research' }),
      Object.freeze({
        key: 'knowledge',
        title: 'Knowledge Records',
        route: '/artifacts/knowledge',
      }),
      Object.freeze({ key: 'explore', title: 'Artifact Explorer', route: '/artifacts/explore' }),
      Object.freeze({ key: 'registry', title: 'Document Registry', route: '/artifacts/registry' }),
      Object.freeze({
        key: 'relationships',
        title: 'Relationships',
        route: '/artifacts/relationships',
      }),
      Object.freeze({ key: 'series', title: 'Series', route: '/artifacts/series' }),
    ],
  }),
  Object.freeze({
    key: 'project',
    title: 'Project',
    shortTitle: 'Project',
    route: '/project',
    description: 'Current state, roadmap signals, release history, and the operational build log.',
    mode: 'operations',
    primaryNavigation: true,
    order: 50,
    children: [
      Object.freeze({ key: 'status', title: 'Current Status', route: '/project/status' }),
      Object.freeze({ key: 'roadmap', title: 'Roadmap', route: '/project/roadmap' }),
      Object.freeze({ key: 'timeline', title: 'Project Timeline', route: '/project/timeline' }),
      Object.freeze({
        key: 'operations',
        title: 'Publication Operations',
        route: '/project/operations',
      }),
      Object.freeze({ key: 'releases', title: 'Releases', route: '/project/releases' }),
      Object.freeze({ key: 'build-log', title: 'Build Log', route: '/project/build-log' }),
    ],
  }),
]);

export const readingPaths = Object.freeze([
  Object.freeze({
    key: 'builder',
    title: "Builder's Path",
    audience: 'Readers who want to follow Monad from first principles through implementation.',
    description:
      'Read the project as a chronological engineering narrative, then inspect the durable artifacts created along the way.',
    steps: Object.freeze([
      Object.freeze({
        title: 'Begin with Building Monad',
        route: '/building-monad',
        rationale:
          'Establish the project context and follow the decisions in the order they occurred.',
      }),
      Object.freeze({
        title: 'Inspect the system model',
        route: '/system',
        rationale: 'Convert the narrative into a stable mental model of Monad.',
      }),
      Object.freeze({
        title: 'Verify the governing artifacts',
        route: '/artifacts',
        rationale: 'Read the specifications and ADRs that make the narrative durable.',
      }),
      Object.freeze({
        title: 'Check current project state',
        route: '/project/status',
        rationale: 'See what exists now and what remains unresolved.',
      }),
    ]),
  }),
  Object.freeze({
    key: 'architect',
    title: "Architect's Path",
    audience: 'Architects and senior engineers evaluating boundaries, tradeoffs, and contracts.',
    description:
      'Start with the stable system model, then move through decisions, specifications, and their relationship graph.',
    steps: Object.freeze([
      Object.freeze({
        title: 'System overview',
        route: '/system',
        rationale: 'Learn the vocabulary and major boundaries.',
      }),
      Object.freeze({
        title: 'Architecture',
        route: '/system/architecture',
        rationale: 'Study views, components, and system constraints.',
      }),
      Object.freeze({
        title: 'Decisions',
        route: '/artifacts/decisions',
        rationale: 'Review accepted tradeoffs and supersession history.',
      }),
      Object.freeze({
        title: 'Specifications',
        route: '/artifacts/specifications',
        rationale: 'Read the normative contracts.',
      }),
      Object.freeze({
        title: 'Relationship graph',
        route: '/artifacts/relationships',
        rationale: 'Trace dependencies and reverse references.',
      }),
    ]),
  }),
  Object.freeze({
    key: 'implementer',
    title: "Implementer's Path",
    audience: 'Contributors implementing, testing, or extending Monad.',
    description:
      'Move from normative behavior into implementation evidence and the current operational workstream.',
    steps: Object.freeze([
      Object.freeze({
        title: 'Specifications',
        route: '/artifacts/specifications',
        rationale: 'Start from required behavior and constraints.',
      }),
      Object.freeze({
        title: 'Engineering records',
        route: '/artifacts/engineering',
        rationale: 'Study implementation plans, experiments, and verification evidence.',
      }),
      Object.freeze({
        title: 'Build log',
        route: '/project/build-log',
        rationale: 'See the operational sequence and current work.',
      }),
      Object.freeze({
        title: 'Project status',
        route: '/project/status',
        rationale: 'Confirm active capabilities and open gaps.',
      }),
    ]),
  }),
  Object.freeze({
    key: 'historian',
    title: "Historian's Path",
    audience: 'Readers reconstructing how and why Monad evolved.',
    description:
      'Combine the chronological publication with decisions, research, and build evidence to preserve causality.',
    steps: Object.freeze([
      Object.freeze({
        title: 'Building Monad',
        route: '/building-monad',
        rationale: 'Follow the chronological narrative.',
      }),
      Object.freeze({
        title: 'Decision records',
        route: '/artifacts/decisions',
        rationale: 'Identify the points where alternatives became commitments.',
      }),
      Object.freeze({
        title: 'Research',
        route: '/artifacts/research',
        rationale: 'Review evidence and explorations that informed choices.',
      }),
      Object.freeze({
        title: 'Build log',
        route: '/project/build-log',
        rationale: 'Correlate decisions with implementation events.',
      }),
    ]),
  }),
]);

export function findPublicationSection(pathname) {
  const normalized = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
  return (
    [...publicationSections]
      .filter((section) => section.route !== '/start' || normalized === '/start')
      .sort((left, right) => right.route.length - left.route.length)
      .find(
        (section) =>
          normalized === section.route ||
          (section.route !== '/' && normalized.startsWith(`${section.route}/`)),
      ) ?? null
  );
}

export function publicRouteCatalog() {
  return publicationSections.flatMap((section) => [
    {
      key: section.key,
      title: section.title,
      route: section.route,
      description: section.description,
      mode: section.mode,
      parent: null,
      order: section.order,
    },
    ...section.children.map((child, index) => ({
      key: `${section.key}.${child.key}`,
      title: child.title,
      route: child.route,
      description: section.description,
      mode: section.mode,
      parent: section.key,
      order: section.order * 100 + index,
    })),
  ]);
}
