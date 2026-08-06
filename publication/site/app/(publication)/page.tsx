import Link from 'next/link';
import { MonadMark } from '@/components/brand/monad-mark';
import { PublicationMasthead } from '@/components/brand/publication-masthead';
import { readingPaths } from '@/information-architecture.mjs';
import { siteConfig } from '@/lib/config/site';
import { activeLandingRoutes } from '@/lib/routes';

function routeMode(key: string) {
  if (key === 'building-monad') return 'Chronological';
  if (key === 'system') return 'Conceptual';
  if (key === 'artifacts') return 'Governed';
  return 'Operational';
}

export default function HomePage() {
  return (
    <main
      className="mx-auto flex w-full max-w-[var(--monad-content-max)] flex-1 flex-col px-5 py-8 sm:px-7 lg:px-10 lg:py-10"
      data-monad-section="building-monad"
    >
      <PublicationMasthead />

      <section className="grid gap-10 py-14 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-end lg:py-24">
        <div className="max-w-5xl">
          <div className="mb-7 flex items-center gap-3 text-[var(--monad-section-accent)]">
            <MonadMark className="size-10" />
            <p className="monad-kicker">{siteConfig.name}</p>
          </div>
          <h1 className="monad-display max-w-[16ch] text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.05em] sm:text-7xl lg:text-[5.7rem]">
            Building Monad in public, with the reasoning intact.
          </h1>
          <p className="mt-7 max-w-3xl text-pretty font-serif text-lg leading-8 text-fd-muted-foreground sm:text-xl">
            A durable technical publication for Monad&apos;s engineering journal, architecture,
            specifications, decisions, research, implementation evidence, and project history.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/start"
              className="rounded-full bg-[var(--monad-section-accent)] px-5 py-2.5 font-semibold text-fd-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              Choose a reading path
            </Link>
            <Link
              href="/building-monad"
              className="rounded-full border border-fd-border bg-fd-card/60 px-5 py-2.5 font-semibold transition hover:-translate-y-0.5 hover:border-[var(--monad-section-accent)]"
            >
              Read from the beginning
            </Link>
          </div>
        </div>

        <aside className="monad-surface rounded-2xl p-5" aria-label="Publication edition">
          <p className="monad-kicker text-[var(--monad-section-accent)]">Continuous edition</p>
          <p className="mt-3 font-serif text-xl font-semibold">
            Engineering record, not marketing copy.
          </p>
          <p className="mt-3 text-sm leading-6 text-fd-muted-foreground">
            The site preserves decisions, alternatives, failed approaches, repository evidence, and
            the evolving relationship between design and implementation.
          </p>
          <Link
            href="/editions"
            className="mt-5 inline-flex text-sm font-semibold text-[var(--monad-section-accent)] hover:underline"
          >
            Browse publication editions →
          </Link>
        </aside>
      </section>

      <section aria-labelledby="publication-sections" className="border-t border-fd-border pt-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="monad-kicker text-fd-muted-foreground">Information architecture</p>
            <h2
              id="publication-sections"
              className="monad-display mt-2 text-3xl font-semibold tracking-tight"
            >
              Four views of one engineering system
            </h2>
          </div>
          <Link href="/start" className="text-sm font-semibold hover:underline">
            Compare reading paths
          </Link>
        </div>
        <div className="mt-7 grid gap-5 md:grid-cols-2">
          {activeLandingRoutes.map((route) => (
            <Link
              key={route.key}
              href={route.href}
              data-monad-section={route.key}
              className="monad-home-card monad-surface group rounded-2xl p-7 transition hover:-translate-y-1 hover:border-[var(--monad-section-accent)] hover:shadow-[var(--monad-shadow-raised)]"
            >
              <div className="monad-section-rule" />
              <p className="monad-kicker mt-7 text-fd-muted-foreground">{routeMode(route.key)}</p>
              <h3 className="monad-display mt-3 text-3xl font-semibold tracking-tight group-hover:text-[var(--monad-section-accent)]">
                {route.label}
              </h3>
              <p className="mt-3 max-w-xl leading-7 text-fd-muted-foreground">
                {route.description}
              </p>
              <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[var(--monad-section-accent)]">
                Enter section <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="reading-paths" className="mt-16 border-t border-fd-border pt-10">
        <p className="monad-kicker text-fd-muted-foreground">Audience paths</p>
        <h2 id="reading-paths" className="monad-display mt-2 text-3xl font-semibold tracking-tight">
          Start with the question you are trying to answer
        </h2>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {readingPaths.map((path, index) => (
            <Link
              key={path.key}
              href={`/start#${path.key}`}
              className="rounded-xl border border-fd-border bg-fd-card/55 p-5 transition hover:-translate-y-0.5 hover:border-[var(--monad-section-accent)]"
            >
              <span className="font-mono text-xs text-fd-muted-foreground">0{index + 1}</span>
              <h3 className="mt-3 font-semibold">{path.title}</h3>
              <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">{path.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <footer className="mt-auto flex flex-wrap justify-between gap-3 border-t border-fd-border pt-16 pb-4 text-xs text-fd-muted-foreground">
        <span className="font-mono">SITE-0011 · Derived publications</span>
        <span>Web, print, PDF, EPUB, offline, and canonical-source editions.</span>
      </footer>
    </main>
  );
}
