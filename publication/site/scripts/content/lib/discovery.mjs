import { spawnSync } from 'node:child_process';
import { readdir, readFile, stat } from 'node:fs/promises';
import { extname, join, relative, resolve } from 'node:path';
import { contentIngestionConfig } from '../../../content.sources.mjs';
import { normalizePath } from './normalize.mjs';

export function resolveRepositoryRoot(siteRoot, explicitRoot = process.env.MONAD_REPOSITORY_ROOT) {
  if (explicitRoot) return resolve(explicitRoot);

  const git = spawnSync('git', ['rev-parse', '--show-toplevel'], {
    cwd: siteRoot,
    encoding: 'utf8',
  });

  if (git.status === 0 && git.stdout.trim()) return resolve(git.stdout.trim());
  return resolve(siteRoot, '..', '..');
}

async function walkDirectory(directory, files) {
  const entries = await readdir(directory, { withFileTypes: true });
  entries.sort((left, right) => left.name.localeCompare(right.name));

  for (const entry of entries) {
    if (contentIngestionConfig.ignoredFileNames.includes(entry.name)) continue;
    if (entry.isDirectory() && contentIngestionConfig.ignoredDirectoryNames.includes(entry.name)) {
      continue;
    }

    const absolutePath = join(directory, entry.name);
    if (entry.isDirectory()) {
      await walkDirectory(absolutePath, files);
      continue;
    }

    if (!entry.isFile()) continue;
    const extension = extname(entry.name).toLowerCase();
    if (!contentIngestionConfig.acceptedExtensions.includes(extension)) continue;
    files.push(absolutePath);
  }
}

export async function discoverSourceFiles(repositoryRoot, source) {
  const discovered = [];
  const roots = [];

  for (const rootPath of source.canonicalRoots) {
    const absoluteRoot = resolve(repositoryRoot, rootPath);
    try {
      const rootStat = await stat(absoluteRoot);
      if (!rootStat.isDirectory()) continue;
    } catch {
      continue;
    }

    roots.push({ rootPath: normalizePath(rootPath), absoluteRoot });
    const files = [];
    await walkDirectory(absoluteRoot, files);

    for (const absolutePath of files) {
      const canonicalPath = normalizePath(relative(repositoryRoot, absolutePath));
      const excluded = (source.excludedCanonicalPrefixes ?? []).some((prefix) => {
        const normalizedPrefix = normalizePath(prefix).replace(/\/$/, '');
        return (
          canonicalPath === normalizedPrefix || canonicalPath.startsWith(`${normalizedPrefix}/`)
        );
      });
      if (excluded) continue;

      const fileStat = await stat(absolutePath);
      discovered.push({
        source,
        sourceRoot: normalizePath(rootPath),
        absoluteRoot,
        absolutePath,
        canonicalPath,
        relativePath: normalizePath(relative(absoluteRoot, absolutePath)),
        size: fileStat.size,
      });
    }
  }

  discovered.sort((left, right) => left.canonicalPath.localeCompare(right.canonicalPath));
  return { roots, files: discovered };
}

export async function readDiscoveredFile(file) {
  return readFile(file.absolutePath, 'utf8');
}
