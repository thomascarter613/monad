import { stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import { publicationContentSources } from '../../content.sources.mjs';
import { discoverSourceFiles, resolveRepositoryRoot } from './lib/discovery.mjs';
import { syncContent } from './sync.mjs';

async function snapshot(repositoryRoot) {
  const entries = [];
  for (const source of publicationContentSources) {
    const discovery = await discoverSourceFiles(repositoryRoot, source);
    for (const file of discovery.files) {
      const fileStat = await stat(file.absolutePath);
      entries.push(`${file.canonicalPath}:${fileStat.size}:${fileStat.mtimeMs}`);
    }
  }
  return entries.sort().join('|');
}

export async function startContentWatcher({ siteRoot, interval = 900 } = {}) {
  const resolvedSiteRoot = resolve(siteRoot ?? process.cwd());
  const repositoryRoot = resolveRepositoryRoot(resolvedSiteRoot);
  let previous = await snapshot(repositoryRoot);
  let syncing = false;

  const timer = setInterval(async () => {
    if (syncing) return;
    try {
      const current = await snapshot(repositoryRoot);
      if (current === previous) return;
      syncing = true;
      await syncContent({ siteRoot: resolvedSiteRoot, repositoryRoot });
      previous = current;
      console.log('Canonical Monad content changed; projection synchronized.');
    } catch (error) {
      console.error('Canonical-content synchronization failed:');
      console.error(error instanceof Error ? error.message : String(error));
    } finally {
      syncing = false;
    }
  }, interval);

  return () => clearInterval(timer);
}

if (process.argv[1]?.endsWith('/watch.mjs')) {
  await syncContent({ siteRoot: process.cwd() });
  await startContentWatcher({ siteRoot: process.cwd() });
  console.log('Watching canonical Monad content. Press Ctrl+C to stop.');
}
