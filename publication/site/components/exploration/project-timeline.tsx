'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { ExplorationManifest } from '@/lib/exploration/types';

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${value}T00:00:00Z`));
}

export function ProjectTimeline({ manifest }: { manifest: ExplorationManifest }) {
  const [kind, setKind] = useState('');
  const [eventType, setEventType] = useState('');
  const events = useMemo(
    () =>
      manifest.timeline.events.filter(
        (event) => (!kind || event.kind === kind) && (!eventType || event.type === eventType),
      ),
    [eventType, kind, manifest.timeline.events],
  );

  const grouped = useMemo(() => {
    const result = new Map<string, typeof events>();
    for (const event of events) {
      const year = event.date.slice(0, 4);
      const entries = result.get(year) ?? [];
      entries.push(event);
      result.set(year, entries);
    }
    return [...result.entries()].sort(([left], [right]) => right.localeCompare(left));
  }, [events]);

  return (
    <div className="monad-project-timeline" data-testid="project-timeline">
      <section className="monad-explorer__metrics" aria-label="Timeline summary">
        <div><strong>{manifest.timeline.eventCount}</strong><span>dated events</span></div>
        <div><strong>{manifest.timeline.undatedDocumentCount}</strong><span>undated documents</span></div>
        <div><strong>{manifest.facets.kinds.length}</strong><span>document kinds</span></div>
        <div><strong>{manifest.documentCount}</strong><span>registered documents</span></div>
      </section>

      <div className="monad-project-timeline__filters">
        <label>
          <span>Document kind</span>
          <select value={kind} onChange={(event) => setKind(event.target.value)}>
            <option value="">All kinds</option>
            {manifest.facets.kinds.map((facet) => (
              <option key={facet.value} value={facet.value}>{facet.value} ({facet.count})</option>
            ))}
          </select>
        </label>
        <label>
          <span>Event type</span>
          <select value={eventType} onChange={(event) => setEventType(event.target.value)}>
            <option value="">All events</option>
            <option value="published">Published</option>
            <option value="updated">Updated</option>
            <option value="documented">Documented</option>
            <option value="build-log">Build log</option>
          </select>
        </label>
      </div>

      <p aria-live="polite">Showing {events.length} dated events.</p>

      {grouped.map(([year, yearEvents]) => (
        <section key={year} className="monad-project-timeline__year">
          <h2>{year}</h2>
          <ol>
            {yearEvents.map((event) => (
              <li key={event.id}>
                <time dateTime={event.date}>{formatDate(event.date)}</time>
                <article>
                  <div>
                    <span>{event.type}{event.inferred ? ' · inferred date' : ''}</span>
                    <span>{event.kind}</span>
                    <span>{event.status}</span>
                  </div>
                  <h3><Link href={event.route}>{event.documentId} — {event.title}</Link></h3>
                  <p>{event.description}</p>
                  {event.repository ? (
                    <dl>
                      {Object.entries(event.repository).map(([key, value]) => (
                        <div key={key}><dt>{key}</dt><dd><code>{value}</code></dd></div>
                      ))}
                    </dl>
                  ) : null}
                </article>
              </li>
            ))}
          </ol>
        </section>
      ))}

      {events.length === 0 ? <p>No timeline events match the current filters.</p> : null}

      <section className="monad-project-timeline__undated" aria-labelledby="undated-documents">
        <h2 id="undated-documents">Undated documents</h2>
        <p>
          These documents remain discoverable but cannot be placed precisely in the chronology until
          publication metadata or a date-bearing canonical path is available.
        </p>
        <ul>
          {manifest.timeline.undated.map((document) => (
            <li key={document.id}>
              <Link href={document.route}>{document.id} — {document.title}</Link>
              <span>{document.kind}</span>
            </li>
          ))}
          {manifest.timeline.undated.length === 0 ? <li>All canonical documents are dated.</li> : null}
        </ul>
      </section>
    </div>
  );
}
