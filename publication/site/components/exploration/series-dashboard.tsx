import Link from 'next/link';
import type { ExplorationSeries } from '@/lib/exploration/types';

export function SeriesDashboard({ series }: { series: ExplorationSeries[] }) {
  return (
    <section className="monad-series-dashboard" aria-labelledby="series-dashboard-title">
      <div className="monad-explorer-heading">
        <div>
          <p className="monad-kicker">Publication completeness</p>
          <h2 id="series-dashboard-title">Series dashboard</h2>
        </div>
        <p>{series.length} governed series</p>
      </div>
      {series.length > 0 ? (
        <div className="monad-series-dashboard__grid">
          {series.map((entry) => (
            <article key={entry.key}>
              <header>
                <div>
                  <h3 className="font-mono">{entry.key}</h3>
                  <p>{entry.documentCount} of {entry.total} documents</p>
                </div>
                <strong>{entry.completionPercent}%</strong>
              </header>
              <div
                className="monad-series-dashboard__progress"
                role="progressbar"
                aria-label={`${entry.key} completion`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={entry.completionPercent}
              >
                <span style={{ inlineSize: `${entry.completionPercent}%` }} />
              </div>
              <ul className="monad-series-dashboard__statuses">
                {entry.statusCounts.map((status) => (
                  <li key={status.value}><span>{status.value}</span><strong>{status.count}</strong></li>
                ))}
              </ul>
              <ol className="monad-series-dashboard__documents">
                {entry.documents.map((document) => (
                  <li key={document.id}>
                    <span>{document.position ?? '·'}</span>
                    <Link href={document.route}>{document.id}</Link>
                    <span>{document.status}</span>
                  </li>
                ))}
              </ol>
              {entry.remainingCount > 0 ? (
                <p className="monad-series-dashboard__remaining">
                  {entry.remainingCount} declared position{entry.remainingCount === 1 ? '' : 's'} remain.
                </p>
              ) : (
                <p className="monad-series-dashboard__complete">Declared series complete.</p>
              )}
            </article>
          ))}
        </div>
      ) : (
        <p>No governed series have been discovered.</p>
      )}
    </section>
  );
}
