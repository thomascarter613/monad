import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#f8f5ee',
    theme_color: '#9a5c31',
    categories: ['documentation', 'developer tools', 'engineering'],
  };
}
