import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createMDX } from 'fumadocs-mdx/next';
import { booleanEnvironment, securityHeaders } from './security.config.mjs';

async function generatedRedirects() {
  try {
    const path = resolve(process.cwd(), '.generated', 'registry', 'redirects.json');
    const redirects = JSON.parse(await readFile(path, 'utf8'));
    if (!Array.isArray(redirects)) return [];
    return redirects.map(({ source, destination, permanent = true }) => ({
      source,
      destination,
      permanent,
    }));
  } catch {
    return [];
  }
}

const markdownRewrites = ['building-monad', 'system', 'artifacts', 'project'].flatMap((section) => [
  { source: `/${section}.md`, destination: `/llms.mdx/${section}` },
  { source: `/${section}/:path*.md`, destination: `/llms.mdx/${section}/:path*` },
]);

const development = process.env.NODE_ENV !== 'production';
const hsts = !development && booleanEnvironment(process.env.MONAD_SECURITY_HSTS, false);
const deploymentTarget = process.env.MONAD_DEPLOYMENT_TARGET ?? 'local';
const baseSecurityHeaders = securityHeaders({ development, hsts });

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: deploymentTarget === 'container' ? 'standalone' : undefined,
  outputFileTracingRoot: resolve(process.cwd(), '..', '..'),
  redirects: generatedRedirects,
  async rewrites() {
    return markdownRewrites;
  },
  async headers() {
    return [
      { source: '/:path*', headers: baseSecurityHeaders },
      {
        source: '/llms.mdx/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/editions/:edition/print',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/api/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
          { key: 'Cache-Control', value: 'no-store' },
        ],
      },
      {
        source: '/api/operations',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, follow' },
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/feeds/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=300, stale-while-revalidate=3600',
          },
        ],
      },
      {
        source: '/llms.txt',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=300, stale-while-revalidate=3600',
          },
        ],
      },
      {
        source: '/llms-full.txt',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=300, stale-while-revalidate=3600',
          },
        ],
      },
    ];
  },
};

export default createMDX()(nextConfig);
