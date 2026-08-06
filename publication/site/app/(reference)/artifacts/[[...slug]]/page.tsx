import { DocsBody, DocsPage } from 'fumadocs-ui/page';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DocumentHeader } from '@/components/content/document-header';
import { DocumentMetadata } from '@/components/content/document-metadata';
import { DocumentRelationships } from '@/components/content/document-relationships';
import { DocumentDiscovery } from '@/components/discovery/document-discovery';
import { RelationshipExplorer } from '@/components/exploration/relationship-explorer';
import { SeriesDashboard } from '@/components/exploration/series-dashboard';
import { getMDXComponents } from '@/components/mdx';
import { SectionDiscovery } from '@/components/navigation/section-discovery';
import { getExplorationManifest } from '@/lib/exploration/manifest';
import { publicationMetadata } from '@/lib/metadata';
import { artifactSource } from '@/lib/source';

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

export default async function ArtifactPage({ params }: PageProps) {
  const { slug } = await params;
  const page = artifactSource.getPage(slug);

  if (!page) notFound();
  const MDX = page.data.body;
  const exploration =
    page.data.id === 'COLLECTION-RELATIONSHIPS' || page.data.id === 'COLLECTION-SERIES'
      ? await getExplorationManifest()
      : undefined;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocumentHeader
        title={page.data.title}
        description={page.data.description}
        id={page.data.id}
        kind={page.data.kind}
        status={page.data.status}
      />
      <DocumentMetadata
        id={page.data.id}
        kind={page.data.kind}
        family={page.data.family}
        status={page.data.status}
        canonicalPath={page.data.canonicalPath}
        aliases={page.data.aliases}
        lifecycle={page.data.lifecycle}
        series={page.data.series}
      />
      <DocumentDiscovery
        title={page.data.title}
        description={page.data.description}
        route={page.url}
        identifier={page.data.id}
        kind={page.data.kind}
        publishedAt={page.data.publication?.publishedAt}
        updatedAt={page.data.publication?.updatedAt}
        canonicalPath={page.data.canonicalPath}
      />
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
      {page.data.id === 'COLLECTION-RELATIONSHIPS' && exploration ? (
        <RelationshipExplorer manifest={exploration} />
      ) : null}
      {page.data.id === 'COLLECTION-SERIES' && exploration ? (
        <SeriesDashboard series={exploration.series} />
      ) : null}
      <DocumentRelationships relationships={page.data.relationships} series={page.data.series} />
      <SectionDiscovery currentRoute={page.url} />
    </DocsPage>
  );
}

export function generateStaticParams() {
  return artifactSource.generateParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = artifactSource.getPage(slug);
  if (!page) notFound();

  return publicationMetadata({
    title: page.data.title,
    description: page.data.description,
    route: page.url,
    identifier: page.data.id,
    publishedAt: page.data.publication?.publishedAt,
    updatedAt: page.data.publication?.updatedAt,
    tags: page.data.tags,
  });
}
