import type { Metadata } from 'next';
import { findPublicationSection } from '@/information-architecture.mjs';
import { siteConfig } from '@/lib/config/site';

export type PublicationMetadataInput = {
  title: string;
  description?: string;
  route: string;
  type?: 'website' | 'article';
  identifier?: string;
  publishedAt?: string;
  updatedAt?: string;
  tags?: string[];
};

function socialCard(input: PublicationMetadataInput) {
  const section = findPublicationSection(input.route)?.shortTitle ?? siteConfig.shortName;
  const parameters = new URLSearchParams({ title: input.title, section });
  if (input.identifier) parameters.set('id', input.identifier);
  return {
    url: `/social-card?${parameters.toString()}`,
    width: 1200,
    height: 630,
    alt: `${input.title} — ${siteConfig.name}`,
  };
}

export function publicationMetadata(input: PublicationMetadataInput): Metadata {
  const { title, route, type = 'article', publishedAt, updatedAt, tags } = input;
  const description = input.description ?? siteConfig.description;
  const image = socialCard(input);
  const openGraph =
    type === 'article'
      ? {
          type: 'article' as const,
          siteName: siteConfig.name,
          title,
          description,
          url: route,
          images: [image],
          publishedTime: publishedAt,
          modifiedTime: updatedAt ?? publishedAt,
          tags,
        }
      : {
          type: 'website' as const,
          siteName: siteConfig.name,
          title,
          description,
          url: route,
          images: [image],
        };

  return {
    title,
    description,
    keywords: tags,
    alternates: {
      canonical: route,
    },
    openGraph,
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image.url],
    },
  };
}
