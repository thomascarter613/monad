import Link from 'next/link';
import type { EditionManifestEntry } from '@/lib/editions/types';

export function EditionSummary({ edition }: { edition: EditionManifestEntry }) {
  return (
    <main className="monad-edition-summary mx-auto w-full max-w-[var(--monad-content-max)] flex-1 px-5 py-12 sm:px-7 lg:px-10">
      <nav aria-label="Breadcrumb">
        <Link href="/editions">Editions</Link> / {edition.title}
      </nav>
      <header>
        <p className="monad-kicker">{edition.defaultVersion} edition</p>
        <h1 className="monad-display">{edition.title}</h1>
        <p className="monad-edition-summary__subtitle">{edition.subtitle}</p>
        <p>{edition.description}</p>
      </header>
      <section className="monad-edition-summary__actions" aria-label="Edition outputs">
        <a href={`/editions/${edition.key}/print`}>Print preview</a>
        <a href={`/editions/${edition.key}/epub`}>Download EPUB</a>
        <code>bun run publication:build -- --edition {edition.key}</code>
      </section>
      <section>
        <h2>Edition contents</h2>
        <ol className="monad-edition-summary__contents">
          {edition.documents.map((document) => (
            <li key={document.id}>
              <span>{String(document.sequence).padStart(2, '0')}</span>
              <div>
                <Link href={document.route}>
                  {document.id} — {document.title}
                </Link>
                <small>
                  {document.kind} · {document.status} · {document.canonicalPath}
                </small>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
