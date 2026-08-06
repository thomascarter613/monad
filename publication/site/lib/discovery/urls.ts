import { publicEnvironment } from '@/lib/environment';

export function documentMarkdownUrl(route: string) {
  return `${route}.md`;
}

export function repositoryDocumentUrl(canonicalPath?: string) {
  if (
    !canonicalPath ||
    canonicalPath.startsWith('@generated') ||
    !publicEnvironment.repositoryUrl
  ) {
    return undefined;
  }
  const repository = publicEnvironment.repositoryUrl.replace(/\/$/, '');
  return `${repository}/blob/main/${canonicalPath.split('/').map(encodeURIComponent).join('/')}`;
}
