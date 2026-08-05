import type { ReactNode } from 'react';
import { EngineeringIcon } from './icons';

type TimelineProps = {
  title?: string;
  children: ReactNode;
};

export function Timeline({ title = 'Timeline', children }: TimelineProps) {
  return (
    <section className="monad-timeline" aria-label={title}>
      <header className="monad-timeline__header">
        <EngineeringIcon name="timeline" />
        <h3>{title}</h3>
      </header>
      <ol className="monad-timeline__events">{children}</ol>
    </section>
  );
}

type TimelineEventProps = {
  date?: string;
  label?: string;
  status?: 'complete' | 'current' | 'planned' | 'blocked';
  children: ReactNode;
};

export function TimelineEvent({ date, label, status = 'complete', children }: TimelineEventProps) {
  return (
    <li className="monad-timeline-event" data-status={status}>
      <span className="monad-timeline-event__marker" aria-hidden="true" />
      <div className="monad-timeline-event__content">
        <p className="monad-timeline-event__meta">
          {date ? <time>{date}</time> : null}
          {label ? <strong>{label}</strong> : null}
          <span>{status}</span>
        </p>
        <div>{children}</div>
      </div>
    </li>
  );
}
