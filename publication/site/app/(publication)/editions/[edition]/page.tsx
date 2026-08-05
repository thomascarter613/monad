import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { EditionSummary } from '@/components/editions/edition-summary';
import { getEdition, getEditionManifest } from '@/lib/editions/manifest';
import { publicationMetadata } from '@/lib/metadata';

type PageProps = { params: Promise<{ edition: string }> };

export default async function EditionPage({ params }: PageProps) {
  const { edition: key } = await params;
  const edition = await getEdition(key);
  if (!edition) notFound();
  return <EditionSummary edition={edition} />;
}

export async function generateStaticParams() {
  const manifest = await getEditionManifest();
  return manifest.editions.map((edition) => ({ edition: edition.key }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { edition: key } = await params;
  const edition = await getEdition(key);
  if (!edition) notFound();
  return publicationMetadata({
    title: edition.title,
    description: edition.description,
    route: `/editions/${edition.key}`,
    type: 'website',
  });
}
