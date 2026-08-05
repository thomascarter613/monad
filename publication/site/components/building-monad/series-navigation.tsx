import Link from 'next/link';
import type { BuildingMonadInstallment } from '@/lib/building-monad/types';

type SeriesNavigationProps = {
  installment: BuildingMonadInstallment;
};

export function SeriesNavigation({ installment }: SeriesNavigationProps) {
  return (
    <nav className="monad-series-navigation" aria-label="Building Monad installment navigation">
      <div className="monad-series-navigation__position">
        <span className="monad-kicker">Series continuity</span>
        <strong>
          {installment.position} of {installment.total}
        </strong>
        <span>{installment.phaseTitle}</span>
      </div>
      <div className="monad-series-navigation__links">
        {installment.previous ? (
          <Link href={installment.previous.route} rel="prev">
            <span>Previous installment</span>
            <strong>
              {installment.previous.id} — {installment.previous.title}
            </strong>
          </Link>
        ) : (
          <div className="monad-series-navigation__boundary">
            <span>Previous installment</span>
            <strong>Beginning of the series</strong>
          </div>
        )}
        {installment.next ? (
          <Link href={installment.next.route} rel="next">
            <span>Next installment</span>
            <strong>
              {installment.next.id} — {installment.next.title}
            </strong>
          </Link>
        ) : (
          <div className="monad-series-navigation__boundary">
            <span>Next installment</span>
            <strong>Current end of the published series</strong>
          </div>
        )}
      </div>
    </nav>
  );
}
