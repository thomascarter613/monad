'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { ExplorationManifest } from '@/lib/exploration/types';

type RelationshipExplorerProps = {
  manifest: ExplorationManifest;
};

export function RelationshipExplorer({ manifest }: RelationshipExplorerProps) {
  const connected = manifest.documents.filter((document) => document.relationshipCount > 0);
  const [selectedId, setSelectedId] = useState(
    [...connected].sort((left, right) => right.relationshipCount - left.relationshipCount)[0]?.id ?? '',
  );
  const [relationshipKind, setRelationshipKind] = useState('');

  const selected = manifest.documents.find((document) => document.id === selectedId);
  const incoming = useMemo(
    () =>
      manifest.edges.filter(
        (edge) =>
          edge.targetId === selectedId && (!relationshipKind || edge.kind === relationshipKind),
      ),
    [manifest.edges, relationshipKind, selectedId],
  );
  const outgoing = useMemo(
    () =>
      manifest.edges.filter(
        (edge) =>
          edge.sourceId === selectedId && (!relationshipKind || edge.kind === relationshipKind),
      ),
    [manifest.edges, relationshipKind, selectedId],
  );

  return (
    <section className="monad-relationship-explorer" aria-labelledby="relationship-explorer-title">
      <div className="monad-explorer-heading">
        <div>
          <p className="monad-kicker">Interactive relationship view</p>
          <h2 id="relationship-explorer-title">Inspect a document neighborhood</h2>
        </div>
        <div className="monad-relationship-explorer__controls">
          <label>
            <span>Document</span>
            <select value={selectedId} onChange={(event) => setSelectedId(event.target.value)}>
              {connected.map((document) => (
                <option key={document.id} value={document.id}>
                  {document.id} — {document.title}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Relationship</span>
            <select
              value={relationshipKind}
              onChange={(event) => setRelationshipKind(event.target.value)}
            >
              <option value="">All relationships</option>
              {manifest.facets.relationships.map((facet) => (
                <option key={facet.value} value={facet.value}>
                  {facet.value} ({facet.count})
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {selected ? (
        <div className="monad-relationship-map">
          <section>
            <h3>Incoming</h3>
            <ul>
              {incoming.map((edge) => (
                <li key={`${edge.kind}:${edge.sourceId}`}>
                  <Link href={edge.sourceRoute}>{edge.sourceId}</Link>
                  <span>{edge.kind}</span>
                </li>
              ))}
              {incoming.length === 0 ? <li>No matching incoming relationships.</li> : null}
            </ul>
          </section>
          <section className="monad-relationship-map__center">
            <span>{selected.kind}</span>
            <strong className="font-mono">{selected.id}</strong>
            <h3>{selected.title}</h3>
            <p>{selected.status}</p>
            <Link href={selected.route}>Open document</Link>
          </section>
          <section>
            <h3>Outgoing</h3>
            <ul>
              {outgoing.map((edge) => (
                <li key={`${edge.kind}:${edge.targetId}`}>
                  <span>{edge.kind}</span>
                  <Link href={edge.targetRoute}>{edge.targetId}</Link>
                </li>
              ))}
              {outgoing.length === 0 ? <li>No matching outgoing relationships.</li> : null}
            </ul>
          </section>
        </div>
      ) : (
        <p>No connected documents have been discovered.</p>
      )}

      <section className="monad-supersession" aria-labelledby="supersession-title">
        <div className="monad-explorer-heading">
          <div>
            <p className="monad-kicker">Lifecycle lineage</p>
            <h2 id="supersession-title">Supersession chains</h2>
          </div>
          <p>{manifest.supersessionChains.length} chain(s)</p>
        </div>
        {manifest.supersessionChains.length > 0 ? (
          <ol>
            {manifest.supersessionChains.map((chain) => (
              <li key={chain.id}>
                <span className="monad-supersession__kind">{chain.kind}</span>
                <ol>
                  {chain.nodes.map((node, index) => (
                    <li key={node.id}>
                      {index > 0 ? <span aria-hidden="true">←</span> : null}
                      <Link href={node.route}>
                        <span className="font-mono">{node.id}</span>
                        <span>{node.status}</span>
                      </Link>
                    </li>
                  ))}
                </ol>
              </li>
            ))}
          </ol>
        ) : (
          <p>No supersession relationships have been registered.</p>
        )}
      </section>
    </section>
  );
}
