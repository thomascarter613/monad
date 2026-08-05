import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page';
import { DocumentMetadata } from '@/components/content/document-metadata';
import { getMDXComponents } from '@/components/mdx';
import { artifactSource } from '@/lib/source';

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

export default async function ArtifactPage({ params }: PageProps) {
  const { slug } = await params;
  const page = artifactSource.getPage(slug);

  if (!page) notFound();
  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocumentMetadata
        id={page.data.id}
        kind={page.data.kind}
        status={page.data.status}
        canonicalPath={page.data.canonicalPath}
      />
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
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

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
