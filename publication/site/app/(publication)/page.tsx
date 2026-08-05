import Link from 'next/link';
import { MonadMark } from '@/components/brand/monad-mark';
import { siteConfig } from '@/lib/config/site';
import { activeLandingRoutes, reservedLandingRoutes } from '@/lib/routes';

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-[var(--monad-content-max)] flex-1 flex-col px-6 py-16 lg:px-10 lg:py-24">
      <div className="max-w-4xl">
        <div className="mb-7 flex items-center gap-3 text-fd-primary">
          <MonadMark className="size-10" />
          <p className="font-mono text-sm tracking-[0.18em] uppercase">
            {siteConfig.name}
          </p>
        </div>
        <h1 className="text-balance text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">
          Building Monad in public, with the reasoning intact.
        </h1>
        <p className="mt-7 max-w-3xl text-pretty text-lg leading-8 text-fd-muted-foreground sm:text-xl">
          A durable technical publication for Monad&apos;s engineering journal, architecture,
          specifications, decisions, experiments, and implementation history.
        </p>
      </div>

      <section aria-labelledby="available-sections" className="mt-14">
        <h2 id="available-sections" className="sr-only">
          Available publication sections
        </h2>
        <div className="grid gap-5 md:grid-cols-2">
          {activeLandingRoutes.map((route) => (
            <Link
              key={route.key}
              href={route.href}
              className="group rounded-2xl border bg-fd-card p-7 transition hover:-translate-y-0.5 hover:border-fd-primary/50 hover:shadow-lg"
            >
              <p className="font-mono text-xs tracking-[0.16em] text-fd-muted-foreground uppercase">
                Available now
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight group-hover:text-fd-primary">
                {route.label}
              </h3>
              <p className="mt-3 leading-7 text-fd-muted-foreground">{route.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="planned-sections" className="mt-12 border-t pt-8">
        <h2 id="planned-sections" className="text-sm font-semibold tracking-wide uppercase">
          Reserved publication surfaces
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-fd-muted-foreground">
          These routes are part of the information architecture but remain intentionally unlinked until
          their content adapters and page experiences are implemented.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          {reservedLandingRoutes.map((route) => (
            <span
              key={route.key}
              className="rounded-full border bg-fd-muted/40 px-3 py-1.5 font-mono text-xs text-fd-muted-foreground"
              title={route.description}
            >
              {route.href}
            </span>
          ))}
        </div>
      </section>

      <footer className="mt-auto pt-20 text-sm text-fd-muted-foreground">
        SITE-0003 · Canonical content discovery and ingestion
      </footer>
    </main>
  );
}
