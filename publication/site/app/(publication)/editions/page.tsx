import type { Metadata } from 'next';
import { EditionIndex } from '@/components/editions/edition-index';
import { getEditionManifest } from '@/lib/editions/manifest';
import { publicationMetadata } from '@/lib/metadata';

export default async function EditionsPage() {
  return <EditionIndex manifest={await getEditionManifest()} />;
}

export const metadata: Metadata = publicationMetadata({
  title: 'Publication Editions',
  description: 'Print, PDF, EPUB, offline, and source editions of the Monad engineering record.',
  route: '/editions',
  type: 'website',
});
