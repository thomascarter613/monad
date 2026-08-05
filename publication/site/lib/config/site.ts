import { informationArchitectureVersion, routePolicy } from '@/information-architecture.mjs';
import { publicationRoutes } from '@/lib/routes';

export const siteConfig = {
  name: 'Monad Engineering Log',
  shortName: 'Monad',
  description:
    'The architecture, decisions, specifications, implementation history, and engineering narrative of Monad.',
  language: 'en',
  locale: 'en-US',
  author: {
    name: 'Thomas Carter',
  },
  publisher: 'Monad',
  informationArchitectureVersion,
  routePolicy,
  routes: publicationRoutes,
} as const;

export type SiteConfig = typeof siteConfig;
