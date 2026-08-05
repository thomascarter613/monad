'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { DiscoveryFacet, DiscoveryResponse } from '@/lib/discovery/types';

type Filters = {
  surface: string;
  kind: string;
  status: string;
  series: string;
};

const emptyFilters: Filters = { surface: '', kind: '', status: '', series: '' };

function FacetSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: DiscoveryFacet[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="monad-search-field">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">All</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label} ({option.count})
          </option>
        ))}
      </select>
    </label>
  );
}

export function SearchWorkspace({ initialQuery = '' }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [response, setResponse] = useState<DiscoveryResponse>();
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');

  const requestUrl = useMemo(() => {
    const parameters = new URLSearchParams({ limit: '60' });
    if (query.trim()) parameters.set('q', query.trim());
    for (const key of ['surface', 'kind', 'status', 'series'] as const) {
      const value = filters[key];
      if (value) parameters.set(key, value);
    }
    return `/api/discovery?${parameters.toString()}`;
  }, [query, filters]);

  useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setState('loading');
      try {
        const result = await fetch(requestUrl, { signal: controller.signal });
        if (!result.ok) throw new Error(`Search failed with ${result.status}.`);
        setResponse((await result.json()) as DiscoveryResponse);
        setState('ready');
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error(error);
        setState('error');
      }
    }, 180);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [requestUrl]);

  function updateFilter(key: keyof Filters, value: string) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  return (
    <section className="monad-search-workspace" aria-labelledby="publication-search-heading">
      <div className="monad-search-query">
        <label htmlFor="publication-search">Search the publication</label>
        <input
          id="publication-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Identifier, concept, decision, component…"
          autoComplete="off"
        />
        <p>
          Search is ranked across titles, identifiers, descriptions, tags, and projected document
          text. Filters are derived from the governed registry.
        </p>
      </div>

      {response ? (
        <div className="monad-search-facets" aria-label="Search filters">
          <FacetSelect
            label="Surface"
            value={filters.surface}
            options={response.facets.surfaces}
            onChange={(value) => updateFilter('surface', value)}
          />
          <FacetSelect
            label="Kind"
            value={filters.kind}
            options={response.facets.kinds}
            onChange={(value) => updateFilter('kind', value)}
          />
          <FacetSelect
            label="Status"
            value={filters.status}
            options={response.facets.statuses}
            onChange={(value) => updateFilter('status', value)}
          />
          <FacetSelect
            label="Series"
            value={filters.series}
            options={response.facets.series}
            onChange={(value) => updateFilter('series', value)}
          />
          <button
            type="button"
            className="monad-search-reset"
            onClick={() => {
              setQuery('');
              setFilters(emptyFilters);
            }}
          >
            Reset
          </button>
        </div>
      ) : null}

      <div className="monad-search-summary" aria-live="polite">
        {state === 'loading' ? 'Updating results…' : null}
        {state === 'error' ? 'Search is temporarily unavailable.' : null}
        {state === 'ready' && response
          ? `${response.total} ${response.total === 1 ? 'document' : 'documents'} found.`
          : null}
      </div>

      {response && state !== 'error' ? (
        <ol className="monad-search-results">
          {response.results.map((result) => (
            <li key={result.route}>
              <Link href={result.route}>
                <span className="monad-search-result__identity">
                  {result.id} · {result.kind} · {result.status}
                </span>
                <strong>{result.title}</strong>
                <span>{result.excerpt || result.description}</span>
                <small>
                  {result.surface}
                  {result.series ? ` · ${result.series}` : ''} · {result.canonicalPath}
                </small>
              </Link>
            </li>
          ))}
        </ol>
      ) : null}
    </section>
  );
}
