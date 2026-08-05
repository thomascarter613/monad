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
import { systemSource } from '@/lib/source';

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

export default async function SystemPage({ params }: PageProps) {
  const { slug } = await params;
  const page = systemSource.getPage(slug);

  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocumentMetadata
        id={'id' in page.data ? String(page.data.id) : undefined}
        kind={'kind' in page.data ? String(page.data.kind) : undefined}
        status={'status' in page.data ? String(page.data.status) : undefined}
        canonicalPath={
          'canonicalPath' in page.data ? String(page.data.canonicalPath) : undefined
        }
      />
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
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

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
