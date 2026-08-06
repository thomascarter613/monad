import { readFile, stat } from 'node:fs/promises';
import { dirname, normalize, resolve, sep } from 'node:path';

const imagePattern = /!\[[^\]]*\]\(([^)\s]+)(?:\s+[^)]*)?\)/g;
const htmlImagePattern = /<(?:img|source)[^>]+(?:src|srcset)=["']([^"']+)["'][^>]*>/gi;

function safeInside(root, candidate) {
  const normalizedRoot = resolve(root) + sep;
  const normalizedCandidate = resolve(candidate);
  return normalizedCandidate === resolve(root) || normalizedCandidate.startsWith(normalizedRoot);
}

export async function collectDocumentAssets(repositoryRoot, documents) {
  const assets = new Map();
  for (const document of documents) {
    const sourcePath = resolve(repositoryRoot, document.canonicalPath);
    let body;
    try {
      body = await readFile(sourcePath, 'utf8');
    } catch {
      continue;
    }
    const references = [];
    for (const match of body.matchAll(imagePattern)) references.push(match[1]);
    for (const match of body.matchAll(htmlImagePattern)) references.push(match[1].split(/\s+/)[0]);
    for (const reference of references) {
      if (/^(?:https?:|data:|#|\/)/i.test(reference)) continue;
      let decoded;
      try {
        decoded = decodeURIComponent(reference.split(/[?#]/, 1)[0]);
      } catch {
        continue;
      }
      const sourceAsset = normalize(resolve(dirname(sourcePath), decoded));
      if (!safeInside(repositoryRoot, sourceAsset)) continue;
      try {
        if (!(await stat(sourceAsset)).isFile()) continue;
        const relative = sourceAsset
          .slice(resolve(repositoryRoot).length + 1)
          .split(sep)
          .join('/');
        if (!assets.has(relative)) assets.set(relative, await readFile(sourceAsset));
      } catch {}
    }
  }
  return [...assets.entries()].map(([name, body]) => ({ name, body }));
}
