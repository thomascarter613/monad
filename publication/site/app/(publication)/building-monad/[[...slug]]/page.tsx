import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DocsBody, DocsPage } from 'fumadocs-ui/page';
import { ArtifactIntroductions } from '@/components/building-monad/artifact-introductions';
import { BuildingMonadIndex } from '@/components/building-monad/building-monad-index';
import { ReadingProgress } from '@/components/building-monad/reading-progress';
import { RepositoryState } from '@/components/building-monad/repository-state';
import { SeriesContext } from '@/components/building-monad/series-context';
import { SeriesNavigation } from '@/components/building-monad/series-navigation';
import { DocumentHeader } from '@/components/content/document-header';
import { DocumentDiscovery } from '@/components/discovery/document-discovery';
import { DocumentMetadata } from '@/components/content/document-metadata';
import { DocumentRelationships } from '@/components/content/document-relationships';
import { getMDXComponents } from '@/components/mdx';
import { SectionDiscovery } from '@/components/navigation/section-discovery';
import { getBuildingMonadManifest } from '@/lib/building-monad/manifest';
import { publicationMetadata } from '@/lib/metadata';
import { buildingMonadSource } from '@/lib/source';

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

export default async function BuildingMonadPage({ params }: PageProps) {
  const { slug } = await params;
  if (!slug || slug.length === 0) return <BuildingMonadIndex />;

  const page = buildingMonadSource.getPage(slug);
  if (!page || page.data.synthetic) notFound();
  const manifest = await getBuildingMonadManifest();
  const installment = manifest.installments.find((entry) => entry.id === page.data.id);
  if (!installment) notFound();
  const MDX = page.data.body;

  return (
    <>
      <ReadingProgress
        route={installment.route}
        title={installment.title}
        position={installment.position}
        total={installment.total}
        storageKey={manifest.series.storageKey}
        completionThreshold={manifest.series.completionThreshold}
      />
      <div data-monad-installment={installment.id}>
        <DocsPage toc={page.data.toc} full={page.data.full}>
          <SeriesContext installment={installment} />
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
            publishedAt={installment.publishedAt}
            updatedAt={installment.updatedAt}
            canonicalPath={page.data.canonicalPath}
          />
          <DocsBody>
            <MDX components={getMDXComponents()} />
          </DocsBody>
          <RepositoryState installment={installment} />
          <ArtifactIntroductions artifacts={installment.artifacts} />
          <DocumentRelationships
            relationships={page.data.relationships}
            series={page.data.series}
          />
          <SeriesNavigation installment={installment} />
          <SectionDiscovery currentRoute={page.url} />
        </DocsPage>
      </div>
    </>
  );
}

export function generateStaticParams() {
  return buildingMonadSource.generateParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!slug || slug.length === 0) {
    return publicationMetadata({
      title: 'Building Monad',
      description:
        'The chronological engineering narrative documenting how Monad is designed, governed, and implemented.',
      route: '/building-monad',
      type: 'website',
    });
  }

  const page = buildingMonadSource.getPage(slug);
  if (!page || page.data.synthetic) notFound();

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
