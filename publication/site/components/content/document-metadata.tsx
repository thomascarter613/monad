import type { DocumentLifecycle, DocumentSeries } from '@/lib/content/types';

type DocumentMetadataProps = {
  id?: string;
  kind?: string;
  family?: string;
  status?: string;
  canonicalPath?: string;
  aliases?: string[];
  lifecycle?: DocumentLifecycle;
  series?: DocumentSeries;
};

function label(value: string) {
  return value.replaceAll('-', ' ');
}

export function DocumentMetadata({
  id,
  kind,
  family,
  status,
  canonicalPath,
  aliases = [],
  lifecycle,
  series,
}: DocumentMetadataProps) {
  if (!id && !kind && !status && !canonicalPath) return null;

  return (
    <div className="monad-metadata-strip space-y-3 text-xs text-fd-muted-foreground">
      <div className="flex flex-wrap items-center gap-2">
        {id ? (
          <span className="monad-metadata-chip monad-metadata-chip--identity font-mono">{id}</span>
        ) : null}
        {kind ? <span className="monad-metadata-chip capitalize">{label(kind)}</span> : null}
        {family && family !== 'untracked' ? (
          <span className="monad-metadata-chip">family: {label(family)}</span>
        ) : null}
        {status ? <span className="monad-metadata-chip capitalize">{label(status)}</span> : null}
        {series ? (
          <span className="monad-metadata-chip">
            {series.key}
            {series.position
              ? ` · ${series.position} of ${series.total}`
              : ` · ${series.total} documents`}
          </span>
        ) : null}
        {canonicalPath ? (
          <span
            className="monad-metadata-chip min-w-0 max-w-full truncate font-mono"
            title={canonicalPath}
          >
            {canonicalPath}
          </span>
        ) : null}
      </div>
      {aliases.length > 0 || lifecycle?.previousStatus ? (
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {aliases.length > 0 ? <span>Aliases: {aliases.join(', ')}</span> : null}
          {lifecycle?.previousStatus && lifecycle.previousStatus !== status ? (
            <span>
              Lifecycle: {lifecycle.previousStatus} → {status}
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
