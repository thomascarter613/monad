import type { MetadataRoute } from 'next';
import { publicEnvironment } from '@/lib/environment';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/llms.mdx/'],
    },
    sitemap: new URL('/sitemap.xml', publicEnvironment.siteUrl).toString(),
    host: publicEnvironment.siteUrl,
  };
}
