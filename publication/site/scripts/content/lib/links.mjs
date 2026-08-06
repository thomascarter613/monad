import { dirname, extname, resolve } from 'node:path';
import { normalizePath } from './normalize.mjs';

const MARKDOWN_LINK_PATTERN = /(!?)\[([^\]]*)\]\(([^)\s]+)(?:\s+["'][^"']*["'])?\)/g;

function splitTarget(target) {
  const hashIndex = target.indexOf('#');
  const queryIndex = target.indexOf('?');
  const cutIndexes = [hashIndex, queryIndex].filter((index) => index >= 0);
  const cutAt = cutIndexes.length > 0 ? Math.min(...cutIndexes) : target.length;
  return {
    path: target.slice(0, cutAt),
    suffix: target.slice(cutAt),
  };
}

function isExternalTarget(target) {
  return (
    target.startsWith('#') ||
    target.startsWith('mailto:') ||
    target.startsWith('tel:') ||
    /^[a-z][a-z0-9+.-]*:/i.test(target) ||
    target.startsWith('//')
  );
}

export function rewriteDocumentLinks(document, body, routeByAbsolutePath, issues) {
  return body.replace(MARKDOWN_LINK_PATTERN, (original, imageMarker, label, rawTarget) => {
    if (isExternalTarget(rawTarget)) return original;

    const { path: targetPath, suffix } = splitTarget(rawTarget);
    if (!targetPath) return original;

    const targetAbsolutePath = targetPath.startsWith('/')
      ? resolve(document.repositoryRoot, `.${targetPath}`)
      : resolve(dirname(document.absolutePath), targetPath);

    if (imageMarker === '!') {
      issues.push({
        severity: 'warning',
        code: 'CONTENT_RELATIVE_ASSET',
        canonicalPath: document.canonicalPath,
        message:
          `Relative asset ${rawTarget} is not copied by SITE-0003. ` +
          'Move it beneath publication/site/public or wait for the media pipeline.',
      });
      return original;
    }

    const extension = extname(targetPath).toLowerCase();
    if (!['.md', '.mdx'].includes(extension)) return original;

    const targetDocument = routeByAbsolutePath.get(normalizePath(targetAbsolutePath));
    if (!targetDocument) {
      issues.push({
        severity: 'warning',
        code: 'CONTENT_BROKEN_DOCUMENT_LINK',
        canonicalPath: document.canonicalPath,
        message: `Document link ${rawTarget} does not resolve to an ingested Markdown file.`,
      });
      return original;
    }

    return `${imageMarker}[${label}](${targetDocument.route}${suffix})`;
  });
}
