import { DocsBody, DocsPage } from 'fumadocs-ui/page';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DocumentHeader } from '@/components/content/document-header';
import { DocumentMetadata } from '@/components/content/document-metadata';
import { DocumentRelationships } from '@/components/content/document-relationships';
import { DocumentDiscovery } from '@/components/discovery/document-discovery';
import { getMDXComponents } from '@/components/mdx';
import { SectionDiscovery } from '@/components/navigation/section-discovery';
import { publicationMetadata } from '@/lib/metadata';
import { systemSource } from '@/lib/source';

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

export default async function SystemPage({ params }: PageProps) {
  const { slug } = await params;
  const page = systemSource.getPage(slug);

  if (!page) notFound();
  const MDX = page.data.body;
  const aliases =
    'aliases' in page.data && Array.isArray(page.data.aliases) ? page.data.aliases : undefined;
  const series = 'series' in page.data ? page.data.series : undefined;
  const id = 'id' in page.data ? String(page.data.id) : undefined;
  const kind = 'kind' in page.data ? String(page.data.kind) : undefined;
  const status = 'status' in page.data ? String(page.data.status) : undefined;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocumentHeader
        title={page.data.title}
        description={page.data.description}
        id={id}
        kind={kind}
        status={status}
      />
      <DocumentMetadata
        id={id}
        kind={kind}
        family={'family' in page.data ? String(page.data.family) : undefined}
        status={status}
        canonicalPath={'canonicalPath' in page.data ? String(page.data.canonicalPath) : undefined}
        aliases={aliases}
        lifecycle={'lifecycle' in page.data ? page.data.lifecycle : undefined}
        series={series}
      />
      <DocumentDiscovery
        title={page.data.title}
        description={page.data.description}
        route={page.url}
        identifier={id}
        kind={kind}
        canonicalPath={'canonicalPath' in page.data ? String(page.data.canonicalPath) : undefined}
      />
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
      {'relationships' in page.data ? (
        <DocumentRelationships relationships={page.data.relationships} series={series} />
      ) : null}
      <SectionDiscovery currentRoute={page.url} />
    </DocsPage>
  );
}

export function generateStaticParams() {
  return systemSource.generateParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = systemSource.getPage(slug);
  if (!page) notFound();

  return publicationMetadata({
    title: page.data.title,
    description: page.data.description,
    route: page.url,
    identifier: 'id' in page.data ? String(page.data.id) : undefined,
    tags: 'tags' in page.data && Array.isArray(page.data.tags) ? page.data.tags : undefined,
  });
}
