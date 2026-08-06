'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type {
  BuildingMonadInstallment,
  BuildingMonadReadingState,
} from '@/lib/building-monad/types';

type ReadStateProps = {
  storageKey: string;
  installments: BuildingMonadInstallment[];
};

function loadState(storageKey: string): BuildingMonadReadingState {
  try {
    const value = window.localStorage.getItem(storageKey);
    if (!value) return { version: 1, installments: {} };
    const parsed = JSON.parse(value) as BuildingMonadReadingState;
    return parsed.version === 1 && parsed.installments ? parsed : { version: 1, installments: {} };
  } catch {
    return { version: 1, installments: {} };
  }
}

function useReadingState(storageKey: string) {
  const [state, setState] = useState<BuildingMonadReadingState>({
    version: 1,
    installments: {},
  });

  useEffect(() => {
    const update = () => setState(loadState(storageKey));
    update();
    window.addEventListener('storage', update);
    window.addEventListener('monad-reading-state-change', update);
    return () => {
      window.removeEventListener('storage', update);
      window.removeEventListener('monad-reading-state-change', update);
    };
  }, [storageKey]);

  return state;
}

export function ContinueReading({ storageKey, installments }: ReadStateProps) {
  const state = useReadingState(storageKey);
  const target = useMemo(() => {
    const last = installments.find((installment) => installment.route === state.lastRoute);
    if (last && !state.installments[last.route]?.completed) return last;
    return (
      installments.find((installment) => !state.installments[installment.route]?.completed) ??
      installments.at(-1)
    );
  }, [installments, state]);

  if (!target) return null;
  const record = state.installments[target.route];
  const progress = Math.round((record?.progress ?? 0) * 100);

  return (
    <Link className="monad-continue-reading" href={target.route}>
      <span className="monad-kicker">{record ? 'Continue reading' : 'Begin the series'}</span>
      <strong>
        {target.id} — {target.title}
      </strong>
      <span>
        Installment {target.position} of {target.total}
        {record && !record.completed ? ` · ${progress}% read` : ''}
      </span>
    </Link>
  );
}

export function ReadingStatusSummary({ storageKey, installments }: ReadStateProps) {
  const state = useReadingState(storageKey);
  const completed = installments.filter(
    (installment) => state.installments[installment.route]?.completed,
  ).length;

  return (
    <div className="monad-series-reading-summary" aria-live="polite">
      <span className="monad-series-reading-summary__value">{completed}</span>
      <span>of {installments.length} installments read on this device</span>
    </div>
  );
}

type InstallmentReadStatusProps = {
  storageKey: string;
  route: string;
};

export function InstallmentReadStatus({ storageKey, route }: InstallmentReadStatusProps) {
  const state = useReadingState(storageKey);
  const record = state.installments[route];
  if (!record) return <span className="monad-installment-card__read-state">Unread</span>;
  if (record.completed) {
    return <span className="monad-installment-card__read-state">Read</span>;
  }
  return (
    <span className="monad-installment-card__read-state">
      {Math.round(record.progress * 100)}% read
    </span>
  );
}
