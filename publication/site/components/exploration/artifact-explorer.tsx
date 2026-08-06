'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { ExplorationDocument, ExplorationManifest } from '@/lib/exploration/types';

type ArtifactExplorerProps = {
  manifest: ExplorationManifest;
};

function matches(document: ExplorationDocument, query: string) {
  if (!query) return true;
  const haystack = [
    document.id,
    document.title,
    document.description,
    document.kind,
    document.family,
    document.status,
    document.series,
    document.canonicalPath,
    ...document.tags,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  return haystack.includes(query.toLowerCase());
}

function optionLabel(value: string) {
  return value.replaceAll('-', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function ArtifactExplorer({ manifest }: ArtifactExplorerProps) {
  const [query, setQuery] = useState('');
  const [kind, setKind] = useState('');
  const [status, setStatus] = useState('');
  const [series, setSeries] = useState('');
  const [surface, setSurface] = useState('');
  const [connectedOnly, setConnectedOnly] = useState(false);
  const [selectedId, setSelectedId] = useState<string | undefined>(
    manifest.documents.find((document) => document.relationshipCount > 0)?.id ??
      manifest.documents[0]?.id,
  );

  const filtered = useMemo(
    () =>
      manifest.documents.filter(
        (document) =>
          matches(document, query) &&
          (!kind || document.kind === kind) &&
          (!status || document.status === status) &&
          (!series || document.series === series) &&
          (!surface || document.surface === surface) &&
          (!connectedOnly || document.relationshipCount > 0),
      ),
    [connectedOnly, kind, manifest.documents, query, series, status, surface],
  );

  const selected = manifest.documents.find((document) => document.id === selectedId) ?? filtered[0];
  const incoming = selected ? manifest.edges.filter((edge) => edge.targetId === selected.id) : [];
  const outgoing = selected ? manifest.edges.filter((edge) => edge.sourceId === selected.id) : [];

  function clearFilters() {
    setQuery('');
    setKind('');
    setStatus('');
    setSeries('');
    setSurface('');
    setConnectedOnly(false);
  }

  return (
    <div className="monad-explorer" data-testid="artifact-explorer">
      <section className="monad-explorer__metrics" aria-label="Corpus summary">
        <div>
          <strong>{manifest.documentCount}</strong>
          <span>documents</span>
        </div>
        <div>
          <strong>{manifest.relationshipCount}</strong>
          <span>relationships</span>
        </div>
        <div>
          <strong>{manifest.connectedDocumentCount}</strong>
          <span>connected</span>
        </div>
        <div>
          <strong>{manifest.series.length}</strong>
          <span>series</span>
        </div>
      </section>

      <form className="monad-explorer__filters" onSubmit={(event) => event.preventDefault()}>
        <label className="monad-explorer__search">
          <span>Search the corpus</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Identifier, title, tag, path…"
          />
        </label>
        <label>
          <span>Kind</span>
          <select value={kind} onChange={(event) => setKind(event.target.value)}>
            <option value="">All kinds</option>
            {manifest.facets.kinds.map((facet) => (
              <option key={facet.value} value={facet.value}>
                {optionLabel(facet.value)} ({facet.count})
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Status</span>
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="">All statuses</option>
            {manifest.facets.statuses.map((facet) => (
              <option key={facet.value} value={facet.value}>
                {optionLabel(facet.value)} ({facet.count})
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Series</span>
          <select value={series} onChange={(event) => setSeries(event.target.value)}>
            <option value="">All series</option>
            {manifest.facets.series.map((facet) => (
              <option key={facet.value} value={facet.value}>
                {facet.value} ({facet.count})
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Surface</span>
          <select value={surface} onChange={(event) => setSurface(event.target.value)}>
            <option value="">All surfaces</option>
            {manifest.facets.surfaces.map((facet) => (
              <option key={facet.value} value={facet.value}>
                {optionLabel(facet.value)} ({facet.count})
              </option>
            ))}
          </select>
        </label>
        <label className="monad-explorer__checkbox">
          <input
            type="checkbox"
            checked={connectedOnly}
            onChange={(event) => setConnectedOnly(event.target.checked)}
          />
          <span>Connected documents only</span>
        </label>
        <button type="button" className="monad-explorer__clear" onClick={clearFilters}>
          Clear filters
        </button>
      </form>

      <p className="monad-explorer__result-count" aria-live="polite">
        Showing {filtered.length} of {manifest.documentCount} documents.
      </p>

      <div className="monad-explorer__workspace">
        <ol className="monad-explorer__results" aria-label="Matching documents">
          {filtered.map((document) => (
            <li key={document.id}>
              <button
                type="button"
                className="monad-explorer-card"
                data-selected={selected?.id === document.id || undefined}
                onClick={() => setSelectedId(document.id)}
              >
                <span className="monad-explorer-card__identity">
                  <span className="font-mono">{document.id}</span>
                  <span>{document.status}</span>
                </span>
                <strong>{document.title}</strong>
                <span className="monad-explorer-card__description">{document.description}</span>
                <span className="monad-explorer-card__meta">
                  {document.kind} · {document.relationshipCount} connection
                  {document.relationshipCount === 1 ? '' : 's'}
                </span>
              </button>
            </li>
          ))}
          {filtered.length === 0 ? (
            <li className="monad-explorer__empty">No documents match the current filters.</li>
          ) : null}
        </ol>

        <aside className="monad-explorer__inspector" aria-label="Selected document">
          {selected ? (
            <>
              <p className="monad-kicker">Selected artifact</p>
              <h2>{selected.title}</h2>
              <p className="font-mono text-sm">{selected.id}</p>
              <p>{selected.description}</p>
              <dl>
                <div>
                  <dt>Kind</dt>
                  <dd>{selected.kind}</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>{selected.status}</dd>
                </div>
                <div>
                  <dt>Family</dt>
                  <dd>{selected.family}</dd>
                </div>
                <div>
                  <dt>Series</dt>
                  <dd>{selected.series ?? 'None'}</dd>
                </div>
                <div>
                  <dt>Source</dt>
                  <dd>
                    <code>{selected.canonicalPath}</code>
                  </dd>
                </div>
              </dl>
              <Link className="monad-explorer__open" href={selected.route}>
                Open canonical page
              </Link>

              <section className="monad-explorer__neighbors">
                <h3>Relationship neighborhood</h3>
                {incoming.length === 0 && outgoing.length === 0 ? (
                  <p>No validated incoming or outgoing relationships.</p>
                ) : null}
                {outgoing.length > 0 ? (
                  <div>
                    <h4>Outgoing</h4>
                    <ul>
                      {outgoing.map((edge) => (
                        <li key={`${edge.kind}:${edge.targetId}`}>
                          <span>{edge.kind}</span>
                          <Link href={edge.targetRoute}>{edge.targetId}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {incoming.length > 0 ? (
                  <div>
                    <h4>Incoming</h4>
                    <ul>
                      {incoming.map((edge) => (
                        <li key={`${edge.kind}:${edge.sourceId}`}>
                          <span>{edge.kind}</span>
                          <Link href={edge.sourceRoute}>{edge.sourceId}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </section>
            </>
          ) : (
            <p>No document selected.</p>
          )}
        </aside>
      </div>
    </div>
  );
}
