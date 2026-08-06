import type { Metadata } from 'next';
import Link from 'next/link';
import { MonadMark } from '@/components/brand/monad-mark';
import { PublicationMasthead } from '@/components/brand/publication-masthead';
import { readingPaths } from '@/information-architecture.mjs';
import { publicationMetadata } from '@/lib/metadata';

export const metadata: Metadata = publicationMetadata({
  title: 'Start',
  description: 'Choose an audience-specific path through the Monad Engineering Log.',
  route: '/start',
  type: 'website',
});

export default function StartPage() {
  return (
    <main
      className="mx-auto flex w-full max-w-[var(--monad-content-max)] flex-1 flex-col px-5 py-8 sm:px-7 lg:px-10 lg:py-10"
      data-monad-section="start"
    >
      <PublicationMasthead />
      <header className="max-w-4xl py-14 lg:py-20">
        <div className="mb-6 flex items-center gap-3 text-[var(--monad-section-accent)]">
          <MonadMark className="size-9" />
          <p className="monad-kicker">Reading guide</p>
        </div>
        <h1 className="monad-display text-balance text-5xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-7xl">
          Choose the path that matches your purpose.
        </h1>
        <p className="mt-6 max-w-3xl text-pretty font-serif text-lg leading-8 text-fd-muted-foreground">
          Monad can be read as a build narrative, a system reference, a governed artifact set, or an
          operational project record. These paths provide a deliberate starting sequence without
          changing the canonical organization of the documents.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        {readingPaths.map((path, pathIndex) => (
          <article
            id={path.key}
            key={path.key}
            className="monad-reading-path monad-surface rounded-2xl p-6 sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="monad-kicker text-[var(--monad-section-accent)]">{path.audience}</p>
                <h2 className="monad-display mt-3 text-3xl font-semibold tracking-tight">
                  {path.title}
                </h2>
              </div>
              <span className="font-mono text-sm text-fd-muted-foreground">0{pathIndex + 1}</span>
            </div>
            <p className="mt-3 leading-7 text-fd-muted-foreground">{path.description}</p>
            <ol className="mt-7 space-y-5 border-t border-fd-border pt-6">
              {path.steps.map((step, index) => (
                <li key={`${path.key}-${step.route}`} className="flex gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-fd-border font-mono text-xs">
                    {index + 1}
                  </span>
                  <div>
                    <Link
                      className="font-semibold hover:text-[var(--monad-section-accent)]"
                      href={step.route}
                    >
                      {step.title}
                    </Link>
                    <p className="mt-1 text-sm leading-6 text-fd-muted-foreground">
                      {step.rationale}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>

      <footer className="mt-12 border-t border-fd-border pt-8 pb-4 text-sm text-fd-muted-foreground">
        Reading paths are presentation-layer guides. Canonical document identity and source location
        remain unchanged.
      </footer>
    </main>
  );
}
