import Link from 'next/link';
import {
  ContinueReading,
  InstallmentReadStatus,
  ReadingStatusSummary,
} from '@/components/building-monad/reading-state';
import { getBuildingMonadManifest } from '@/lib/building-monad/manifest';
import type { BuildingMonadInstallment } from '@/lib/building-monad/types';

function displayDate(value: string) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeZone: 'UTC',
  }).format(parsed);
}

function InstallmentCard({
  installment,
  storageKey,
  current,
}: {
  installment: BuildingMonadInstallment;
  storageKey: string;
  current: boolean;
}) {
  return (
    <article className="monad-installment-card" data-current={current || undefined}>
      <div className="monad-installment-card__meta">
        <span className="font-mono">{installment.id}</span>
        <span>{installment.estimatedReadingMinutes} min</span>
        {installment.publishedAt ? (
          <time dateTime={installment.publishedAt}>{displayDate(installment.publishedAt)}</time>
        ) : null}
        <InstallmentReadStatus storageKey={storageKey} route={installment.route} />
      </div>
      <h3>
        <Link href={installment.route}>{installment.title}</Link>
      </h3>
      <p>{installment.description}</p>
      <div className="monad-installment-card__footer">
        <span>
          Installment {installment.position} of {installment.total}
        </span>
        <span>
          {installment.artifacts.length} connected artifact
          {installment.artifacts.length === 1 ? '' : 's'}
        </span>
      </div>
    </article>
  );
}

export async function BuildingMonadIndex() {
  const manifest = await getBuildingMonadManifest();
  const current = manifest.installments.find(
    (installment) => installment.id === manifest.currentId,
  );

  return (
    <main className="monad-series-index">
      <header className="monad-series-hero">
        <div className="monad-series-hero__copy">
          <p className="monad-kicker">The Monad Engineering Log</p>
          <h1>Building Monad</h1>
          <p>{manifest.series.description}</p>
          <section className="monad-series-hero__metrics" aria-label="Series status">
            <span>
              <strong>{manifest.installmentCount}</strong> installments
            </span>
            <span>
              <strong>{manifest.phases.length}</strong> project phases
            </span>
            <span>
              <strong>{manifest.publishedCount}</strong> published or active
            </span>
          </section>
        </div>
        <div className="monad-series-hero__actions">
          <ContinueReading
            storageKey={manifest.series.storageKey}
            installments={manifest.installments}
          />
          <ReadingStatusSummary
            storageKey={manifest.series.storageKey}
            installments={manifest.installments}
          />
          <nav className="monad-series-feeds" aria-label="Subscribe to Building Monad">
            <a href="/feeds/building-monad.rss.xml">RSS</a>
            <a href="/feeds/building-monad.atom.xml">Atom</a>
          </nav>
        </div>
      </header>

      {current ? (
        <section
          className="monad-current-installment"
          aria-labelledby="current-installment-heading"
        >
          <div>
            <p className="monad-kicker">Current edge of the narrative</p>
            <h2 id="current-installment-heading">
              {current.id} — {current.title}
            </h2>
            <p>{current.description}</p>
          </div>
          <Link href={current.route}>Read the current installment</Link>
        </section>
      ) : null}

      <section className="monad-series-principles" aria-labelledby="series-principles-heading">
        <div>
          <p className="monad-kicker">How to read this series</p>
          <h2 id="series-principles-heading">Chronology first; durable artifacts beside it</h2>
        </div>
        <div>
          <p>
            Each installment records the problem visible at that moment, the alternatives
            considered, the decision made, and the repository state that followed.
          </p>
          <p>
            Specifications, ADRs, architecture records, and implementation evidence remain linked as
            independent governed documents rather than being hidden inside the narrative.
          </p>
        </div>
      </section>

      <div className="monad-series-phases">
        {manifest.phases.map((phase) => {
          const installments = phase.installments
            .map((id) => manifest.installments.find((installment) => installment.id === id))
            .filter((installment): installment is BuildingMonadInstallment => Boolean(installment));
          return (
            <section className="monad-series-phase" id={`phase-${phase.key}`} key={phase.key}>
              <header>
                <div>
                  <p className="monad-kicker">Project phase</p>
                  <h2>{phase.title}</h2>
                </div>
                <p>{phase.description}</p>
              </header>
              <div className="monad-series-phase__installments">
                {installments.map((installment) => (
                  <InstallmentCard
                    current={installment.id === manifest.currentId}
                    installment={installment}
                    key={installment.id}
                    storageKey={manifest.series.storageKey}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {manifest.installmentCount === 0 ? (
        <section className="monad-series-empty">
          <h2>No installments have been ingested yet</h2>
          <p>
            Add canonical Markdown under <code>journal/</code>, then run{' '}
            <code>bun run content:sync</code>.
          </p>
        </section>
      ) : null}
    </main>
  );
}
