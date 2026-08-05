import Link from 'next/link';
import type { EditionManifest } from '@/lib/editions/types';

export function EditionIndex({ manifest }: { manifest: EditionManifest }) {
  return (
    <main className="monad-editions mx-auto w-full max-w-[var(--monad-content-max)] flex-1 px-5 py-12 sm:px-7 lg:px-10">
      <header className="monad-editions__header">
        <p className="monad-kicker">Derived publications</p>
        <h1 className="monad-display">Editions of the Monad engineering record</h1>
        <p>
          Reproducible publication profiles turn the governed corpus into print, PDF, EPUB,
          offline, and canonical-source editions without changing the source documents.
        </p>
      </header>
      <div className="monad-editions__grid">
        {manifest.editions.map((edition) => (
          <article key={edition.key} className="monad-edition-card monad-surface">
            <p className="monad-kicker">{edition.defaultVersion}</p>
            <h2>{edition.title}</h2>
            <p className="monad-edition-card__subtitle">{edition.subtitle}</p>
            <p>{edition.description}</p>
            <dl>
              <div>
                <dt>Documents</dt>
                <dd>{edition.documentCount}</dd>
              </div>
              <div>
                <dt>Source digest</dt>
                <dd>
                  <code>{edition.sourceDigest.slice(0, 12)}</code>
                </dd>
              </div>
              <div>
                <dt>Formats</dt>
                <dd>{edition.formats.join(', ')}</dd>
              </div>
            </dl>
            <Link href={`/editions/${edition.key}`}>
              Open edition <span aria-hidden="true">→</span>
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
