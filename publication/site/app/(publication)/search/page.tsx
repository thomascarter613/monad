import { PublicationMasthead } from '@/components/brand/publication-masthead';
import { SearchWorkspace } from '@/components/discovery/search-workspace';
import { publicationMetadata } from '@/lib/metadata';

export const metadata = publicationMetadata({
  title: 'Search Monad',
  description: 'Search and filter the governed Monad Engineering Log corpus.',
  route: '/search',
  type: 'website',
});

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  return (
    <main className="monad-publication-shell monad-search-page">
      <PublicationMasthead />
      <header className="monad-search-header">
        <p className="monad-kicker">Publication discovery</p>
        <h1 id="publication-search-heading">Search Monad without losing document context.</h1>
        <p>
          Combine text relevance with governed metadata to locate narrative entries, decisions,
          specifications, architecture records, evidence, and project history.
        </p>
      </header>
      <SearchWorkspace initialQuery={q ?? ''} />
    </main>
  );
}
