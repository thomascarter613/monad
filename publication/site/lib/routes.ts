export type PublicationRouteStatus = 'active' | 'reserved';

export type PublicationRoute = {
  key: string;
  label: string;
  href: `/${string}` | '/';
  description: string;
  status: PublicationRouteStatus;
  navigation: boolean;
};

export const publicationRoutes = {
  home: {
    key: 'home',
    label: 'Home',
    href: '/',
    description: 'The entry point to the Monad Engineering Log.',
    status: 'active',
    navigation: false,
  },
  buildingMonad: {
    key: 'building-monad',
    label: 'Building Monad',
    href: '/building-monad',
    description: 'The chronological engineering narrative and serial publication.',
    status: 'active',
    navigation: true,
  },
  system: {
    key: 'system',
    label: 'System',
    href: '/system',
    description: 'Stable reference documentation for understanding Monad.',
    status: 'active',
    navigation: true,
  },
  artifacts: {
    key: 'artifacts',
    label: 'Artifacts',
    href: '/artifacts',
    description: 'Specifications, decisions, research, and engineering records.',
    status: 'active',
    navigation: true,
  },
  project: {
    key: 'project',
    label: 'Project',
    href: '/project',
    description: 'Project status, roadmap, releases, and build history.',
    status: 'reserved',
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
] as const;

export const reservedLandingRoutes = [publicationRoutes.project] as const;
