import Link from 'next/link';
import type { ReactNode } from 'react';
import { getRegistryDocument } from '@/lib/content/registry';
import { EngineeringIcon } from './icons';

type ArtifactReferenceProps = {
  id: string;
  children?: ReactNode;
  compact?: boolean;
};

export async function ArtifactReference({ id, children, compact = false }: ArtifactReferenceProps) {
  const document = await getRegistryDocument(id);

  if (!document) {
    return (
      <span className="monad-artifact-reference monad-artifact-reference--missing" title="Unknown artifact">
        <EngineeringIcon name="artifact" />
        <code>{children ?? id}</code>
      </span>
    );
  }

  return (
    <Link
      className="monad-artifact-reference"
      data-compact={compact ? '' : undefined}
      href={document.route}
      title={`${document.kind}: ${document.title}`}
    >
      <EngineeringIcon name="artifact" />
      <span>
        <code>{children ?? document.id}</code>
        {!compact ? <small>{document.title}</small> : null}
      </span>
    </Link>
  );
}

type ArtifactReferencesProps = {
  ids: string[];
  title?: string;
};

export function ArtifactReferences({ ids, title = 'Related artifacts' }: ArtifactReferencesProps) {
  return (
    <aside className="monad-artifact-references" aria-label={title}>
      <p className="monad-artifact-references__title">{title}</p>
      <div className="monad-artifact-references__items">
        {ids.map((id) => (
          <ArtifactReference key={id} id={id} />
        ))}
      </div>
    </aside>
  );
}
