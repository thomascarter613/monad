'use client';

import { useEffect, useState } from 'react';
import type { BuildingMonadReadingState } from '@/lib/building-monad/types';

type ReadingProgressProps = {
  route: string;
  title: string;
  position: number;
  total: number;
  storageKey: string;
  completionThreshold: number;
};

function readState(storageKey: string): BuildingMonadReadingState {
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return { version: 1, installments: {} };
    const parsed = JSON.parse(raw) as BuildingMonadReadingState;
    if (parsed.version !== 1 || !parsed.installments) {
      return { version: 1, installments: {} };
    }
    return parsed;
  } catch {
    return { version: 1, installments: {} };
  }
}

function writeProgress(
  storageKey: string,
  route: string,
  progress: number,
  completionThreshold: number,
) {
  const state = readState(storageKey);
  const previous = state.installments[route];
  const completed = Boolean(previous?.completed || progress >= completionThreshold);
  state.lastRoute = route;
  state.installments[route] = {
    progress: Math.max(previous?.progress ?? 0, progress),
    completed,
    visitedAt: new Date().toISOString(),
  };
  window.localStorage.setItem(storageKey, JSON.stringify(state));
  window.dispatchEvent(new CustomEvent('monad-reading-state-change'));
}

export function ReadingProgress({
  route,
  title,
  position,
  total,
  storageKey,
  completionThreshold,
}: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const article = document.querySelector<HTMLElement>('[data-monad-installment]');
        if (!article) return;

        const top = article.getBoundingClientRect().top + window.scrollY;
        const height = Math.max(article.scrollHeight, window.innerHeight);
        const travelled = window.scrollY - top + window.innerHeight * 0.35;
        const available = Math.max(1, height - window.innerHeight * 0.65);
        const next = Math.min(1, Math.max(0, travelled / available));
        setProgress(next);
        writeProgress(storageKey, route, next, completionThreshold);
      });
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [completionThreshold, route, storageKey]);

  const percentage = Math.round(progress * 100);

  return (
    <div
      className="monad-reading-progress"
      role="progressbar"
      aria-label={`Reading progress for ${title}`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percentage}
    >
      <div className="monad-reading-progress__track" aria-hidden="true">
        <span style={{ width: `${percentage}%` }} />
      </div>
      <span className="sr-only">
        Installment {position} of {total}: {percentage}% read
      </span>
    </div>
  );
}
