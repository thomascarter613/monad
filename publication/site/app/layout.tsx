import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { SiteStructuredData } from '@/components/discovery/structured-data';
import { SkipLink } from '@/components/layout/skip-link';
import { siteConfig } from '@/lib/config/site';
import { publicEnvironment } from '@/lib/environment';
import './global.css';

export const metadata: Metadata = {
  metadataBase: new URL(publicEnvironment.siteUrl),
  applicationName: siteConfig.name,
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': '/feeds/building-monad.rss.xml',
      'application/atom+xml': '/feeds/building-monad.atom.xml',
      'application/epub+zip': '/editions/building-monad/epub',
    },
  },
  authors: [{ name: siteConfig.author.name }],
  creator: siteConfig.author.name,
  publisher: siteConfig.publisher,
  category: 'technology',
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    url: '/',
    images: [
      {
        url: `/social-card?${new URLSearchParams({
          title: siteConfig.name,
          section: 'Engineering Log',
        }).toString()}`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
  },
  manifest: '/manifest.webmanifest',
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8f5ee' },
    { media: '(prefers-color-scheme: dark)', color: '#1b1916' },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={siteConfig.language} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col antialiased">
        <RootProvider>
          <SiteStructuredData />
          <SkipLink />
          <div id="main-content" className="flex min-h-screen flex-1 flex-col">
            {children}
          </div>
        </RootProvider>
      </body>
    </html>
  );
}
