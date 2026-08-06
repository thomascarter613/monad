import Link from 'next/link';
import type {
  DocumentRelationships as DocumentRelationshipSet,
  DocumentSeries,
} from '@/lib/content/types';

type DocumentRelationshipsProps = {
  relationships?: DocumentRelationshipSet;
  series?: DocumentSeries;
};

function relationLabel(value: string) {
  return value.replace(/([a-z])([A-Z])/g, '$1 $2').replaceAll('-', ' ');
}

export function DocumentRelationships({
  relationships,
  series,
}: DocumentRelationshipsProps) {
  const outgoing = relationships?.outgoing ?? [];
  const incoming = relationships?.incoming ?? [];
  const hasSeriesNavigation = Boolean(series?.previousId || series?.nextId);
  if (outgoing.length === 0 && incoming.length === 0 && !hasSeriesNavigation) return null;

  return (
    <aside
      className="monad-surface mt-14 rounded-2xl p-5 sm:p-7"
      aria-labelledby="document-connections"
    >
      <h2 id="document-connections" className="text-xl font-semibold tracking-tight">
        Document connections
      </h2>

      {hasSeriesNavigation ? (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {series?.previousId ? (
            <Link
              className="rounded-xl border p-4 transition hover:border-[var(--monad-section-accent)]"
              href={series.previousRoute ?? '#'}
            >
              <span className="block text-xs text-fd-muted-foreground">Previous in series</span>
              <span className="mt-1 block text-sm">
                <span className="font-mono">{series.previousId}</span>
                {series.previousTitle ? ` — ${series.previousTitle}` : ''}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {series?.nextId ? (
            <Link
              className="rounded-xl border p-4 text-right transition hover:border-[var(--monad-section-accent)]"
              href={series.nextRoute ?? '#'}
            >
              <span className="block text-xs text-fd-muted-foreground">Next in series</span>
              <span className="mt-1 block text-sm">
                <span className="font-mono">{series.nextId}</span>
                {series.nextTitle ? ` — ${series.nextTitle}` : ''}
              </span>
            </Link>
          ) : null}
        </div>
      ) : null}

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        {outgoing.length > 0 ? (
          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wide">Outgoing</h3>
            <ul className="mt-3 space-y-2">
              {outgoing.map((edge) => (
                <li key={`${edge.kind}:${edge.id}`}>
                  <Link
                    className="block rounded-lg border px-3 py-2 hover:border-[var(--monad-section-accent)]"
                    href={edge.route}
                  >
                    <span className="text-xs capitalize text-fd-muted-foreground">
                      {relationLabel(edge.kind)}
                    </span>
                    <span className="mt-0.5 block text-sm">
                      <span className="font-mono">{edge.id}</span> — {edge.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        {incoming.length > 0 ? (
          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wide">Incoming</h3>
            <ul className="mt-3 space-y-2">
              {incoming.map((edge) => (
                <li key={`${edge.kind}:${edge.id}`}>
                  <Link
                    className="block rounded-lg border px-3 py-2 hover:border-[var(--monad-section-accent)]"
                    href={edge.route}
                  >
                    <span className="text-xs capitalize text-fd-muted-foreground">
                      {relationLabel(edge.kind)}
                    </span>
                    <span className="mt-0.5 block text-sm">
                      <span className="font-mono">{edge.id}</span> — {edge.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </aside>
  );
}
