import { DocumentActions } from '@/components/discovery/document-actions';
import { DocumentStructuredData } from '@/components/discovery/structured-data';
import { documentMarkdownUrl, repositoryDocumentUrl } from '@/lib/discovery/urls';

export function DocumentDiscovery({
  title,
  description,
  route,
  identifier,
  kind,
  publishedAt,
  updatedAt,
  canonicalPath,
}: {
  title: string;
  description?: string;
  route: string;
  identifier?: string;
  kind?: string;
  publishedAt?: string;
  updatedAt?: string;
  canonicalPath?: string;
}) {
  return (
    <>
      <DocumentStructuredData
        title={title}
        description={description}
        route={route}
        identifier={identifier}
        kind={kind}
        publishedAt={publishedAt}
        updatedAt={updatedAt}
        canonicalPath={canonicalPath}
      />
      <DocumentActions
        markdownUrl={documentMarkdownUrl(route)}
        sourceUrl={repositoryDocumentUrl(canonicalPath)}
      />
    </>
  );
}
