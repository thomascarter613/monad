import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { SiteIdentity } from '@/components/brand/site-identity';
import { publicEnvironment } from '@/lib/environment';
import { primaryNavigation } from '@/lib/routes';

export function baseOptions(): BaseLayoutProps {
  const links: NonNullable<BaseLayoutProps['links']> = primaryNavigation.map((route) => ({
    text: route.label,
    url: route.href,
    active: 'nested-url',
  }));

  return {
    nav: {
      title: <SiteIdentity />,
    },
    links,
    githubUrl: publicEnvironment.repositoryUrl,
  };
}
