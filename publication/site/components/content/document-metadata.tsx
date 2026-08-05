type DocumentMetadataProps = {
  id?: string;
  kind?: string;
  status?: string;
  canonicalPath?: string;
};

function label(value: string) {
  return value.replaceAll('-', ' ');
}

export function DocumentMetadata({
  id,
  kind,
  status,
  canonicalPath,
}: DocumentMetadataProps) {
  if (!id && !kind && !status && !canonicalPath) return null;

  return (
    <div className="mb-8 flex flex-wrap items-center gap-2 text-xs text-fd-muted-foreground">
      {id ? (
        <span className="rounded-md border bg-fd-muted px-2 py-1 font-mono text-fd-foreground">
          {id}
        </span>
      ) : null}
      {kind ? <span className="rounded-md border px-2 py-1 capitalize">{label(kind)}</span> : null}
      {status ? <span className="rounded-md border px-2 py-1 capitalize">{label(status)}</span> : null}
      {canonicalPath ? (
        <span className="min-w-0 truncate rounded-md border px-2 py-1 font-mono" title={canonicalPath}>
          {canonicalPath}
        </span>
      ) : null}
    </div>
  );
}
