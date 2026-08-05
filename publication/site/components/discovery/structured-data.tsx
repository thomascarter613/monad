import { siteConfig } from '@/lib/config/site';
import { publicEnvironment } from '@/lib/environment';

function safeJson(value: unknown) {
  return JSON.stringify(value).replaceAll('<', '\\u003c');
}

export function SiteStructuredData() {
  const origin = publicEnvironment.siteUrl.replace(/\/$/, '');
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${origin}/#website`,
        url: origin,
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: siteConfig.language,
        publisher: { '@id': `${origin}/#organization` },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${origin}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Organization',
        '@id': `${origin}/#organization`,
        name: siteConfig.publisher,
        url: origin,
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(graph) }} />;
}

export function DocumentStructuredData({
  title,
  description,
  route,
  identifier,
  kind,
  publishedAt,
  updatedAt,
  canonicalPath,
}: {
  title: string;
  description?: string;
  route: string;
  identifier?: string;
  kind?: string;
  publishedAt?: string;
  updatedAt?: string;
  canonicalPath?: string;
}) {
  const url = new URL(route, publicEnvironment.siteUrl).toString();
  const value = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: title,
    description,
    url,
    mainEntityOfPage: url,
    identifier,
    articleSection: kind,
    datePublished: publishedAt,
    dateModified: updatedAt ?? publishedAt,
    author: { '@type': 'Person', name: siteConfig.author.name },
    publisher: { '@type': 'Organization', name: siteConfig.publisher },
    isPartOf: { '@id': `${publicEnvironment.siteUrl}/#website` },
    keywords: [identifier, kind, canonicalPath].filter(Boolean),
    inLanguage: siteConfig.language,
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(value) }} />;
}
