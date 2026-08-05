import type { BuildingMonadInstallment } from '@/lib/building-monad/types';

type SeriesContextProps = {
  installment: BuildingMonadInstallment;
};

function displayDate(value: string) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeZone: 'UTC',
  }).format(parsed);
}

export function SeriesContext({ installment }: SeriesContextProps) {
  return (
    <aside className="monad-installment-context" aria-label="Series position">
      <span className="monad-kicker">Building Monad</span>
      <span>
        Installment {installment.position} of {installment.total}
      </span>
      <span aria-hidden="true">/</span>
      <span>{installment.phaseTitle}</span>
      <span aria-hidden="true">/</span>
      <span>{installment.estimatedReadingMinutes} min read</span>
      {installment.publishedAt ? (
        <>
          <span aria-hidden="true">/</span>
          <time dateTime={installment.publishedAt}>{displayDate(installment.publishedAt)}</time>
        </>
      ) : null}
    </aside>
  );
}
