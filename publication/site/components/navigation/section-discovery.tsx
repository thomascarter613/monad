import Link from 'next/link';
import { findPublicationSection, publicationSections } from '@/information-architecture.mjs';

type SectionDiscoveryProps = {
  currentRoute: string;
};

export function SectionDiscovery({ currentRoute }: SectionDiscoveryProps) {
  const current = findPublicationSection(currentRoute);
  const alternatives = publicationSections.filter(
    (section) => section.key !== 'start' && section.key !== current?.key,
  );

  return (
    <aside
      className="monad-section-discovery monad-surface mt-12 rounded-2xl p-5 sm:p-7"
      aria-labelledby="continue-exploring"
    >
      <p className="font-mono text-xs tracking-[0.14em] text-fd-muted-foreground uppercase">
        Across the publication
      </p>
      <h2 id="continue-exploring" className="mt-2 text-xl font-semibold tracking-tight">
        Continue exploring Monad
      </h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {alternatives.slice(0, 4).map((section) => (
          <Link
            key={section.key}
            href={section.route}
            data-monad-section={section.key}
            className="rounded-xl border bg-fd-card p-4 transition hover:-translate-y-0.5 hover:border-[var(--monad-section-accent)] hover:bg-fd-accent/40"
          >
            <span className="font-semibold">{section.title}</span>
            <span className="mt-1 block text-sm leading-6 text-fd-muted-foreground">
              {section.description}
            </span>
          </Link>
        ))}
      </div>
    </aside>
  );
}
