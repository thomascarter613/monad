import { publicationSections } from '@/information-architecture.mjs';

export type PublicationRouteStatus = 'active' | 'reserved';

export type PublicationRoute = {
  key: string;
  label: string;
  href: `/${string}` | '/';
  description: string;
  status: PublicationRouteStatus;
  navigation: boolean;
};

const sectionByKey = new Map(publicationSections.map((section) => [section.key, section]));

function routeFromSection(key: string): PublicationRoute {
  const section = sectionByKey.get(key);
  if (!section) throw new Error(`Unknown publication section: ${key}`);
  return {
    key: section.key,
    label: section.shortTitle,
    href: section.route,
    description: section.description,
    status: 'active',
    navigation: section.primaryNavigation,
  };
}

export const publicationRoutes = {
  home: {
    key: 'home',
    label: 'Home',
    href: '/',
    description: 'The entry point to the Monad Engineering Log.',
    status: 'active',
    navigation: false,
  },
  start: routeFromSection('start'),
  buildingMonad: routeFromSection('building-monad'),
  system: routeFromSection('system'),
  artifacts: routeFromSection('artifacts'),
  project: routeFromSection('project'),
  editions: {
    key: 'editions',
    label: 'Editions',
    href: '/editions',
    description: 'Print, PDF, EPUB, offline, and source editions.',
    status: 'active',
    navigation: false,
  },
  search: {
    key: 'search',
    label: 'Search',
    href: '/search',
    description: 'Search and filter the governed publication corpus.',
    status: 'active',
    navigation: false,
  },
} as const satisfies Record<string, PublicationRoute>;

export const primaryNavigation = Object.values(publicationRoutes).filter(
  (route) => route.status === 'active' && route.navigation,
);

export const activeLandingRoutes = [
  publicationRoutes.buildingMonad,
  publicationRoutes.system,
  publicationRoutes.artifacts,
  publicationRoutes.project,
] as const;

export const reservedLandingRoutes: readonly PublicationRoute[] = [];
