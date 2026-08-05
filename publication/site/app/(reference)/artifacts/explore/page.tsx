import { DocsPage } from 'fumadocs-ui/page';
import { ArtifactExplorer } from '@/components/exploration/artifact-explorer';
import { getExplorationManifest } from '@/lib/exploration/manifest';
import { publicationMetadata } from '@/lib/metadata';

export const metadata = publicationMetadata({
  title: 'Artifact Explorer',
  description: 'Filter and inspect the governed Monad corpus and its document relationships.',
  route: '/artifacts/explore',
});

export default async function ArtifactExplorerPage() {
  const manifest = await getExplorationManifest();

  return (
    <DocsPage toc={[]} full>
      <header className="monad-article-header">
        <div className="monad-article-header__eyebrow monad-kicker">
          <span>Registry-backed exploration</span>
          <span aria-hidden="true">/</span>
          <span>Schema {manifest.schemaVersion}</span>
        </div>
        <h1 className="monad-article-title">Artifact Explorer</h1>
        <p className="monad-article-description">
          Search, filter, and inspect the governed Monad corpus without losing the connection to
          canonical repository sources.
        </p>
      </header>
      <ArtifactExplorer manifest={manifest} />
    </DocsPage>
  );
}
