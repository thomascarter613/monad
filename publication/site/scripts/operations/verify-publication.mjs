import { createHash } from 'node:crypto';
import { readdir, readFile, stat } from 'node:fs/promises';
import { basename, dirname, resolve } from 'node:path';
import { siteRoot } from './lib/runtime.mjs';

const target = resolve(siteRoot, process.argv[2] ?? 'dist/publications');
const checksumFiles = [];
async function walk(path) {
  for (const entry of await readdir(path, { withFileTypes: true })) {
    const child = resolve(path, entry.name);
    if (entry.isDirectory()) await walk(child);
    else if (entry.name === 'SHA256SUMS.txt') checksumFiles.push(child);
  }
}
await walk(target);
if (checksumFiles.length === 0) throw new Error(`No SHA256SUMS.txt files found beneath ${target}`);
const failures = [];
for (const checksumPath of checksumFiles) {
  const body = await readFile(checksumPath, 'utf8');
  for (const line of body.split(/\r?\n/).filter(Boolean)) {
    const match = line.match(/^([a-f0-9]{64}) {2}(.+)$/);
    if (!match) {
      failures.push(`${checksumPath}: malformed line ${line}`);
      continue;
    }
    const file = resolve(dirname(checksumPath), match[2]);
    try {
      const bytes = await readFile(file);
      const actual = createHash('sha256').update(bytes).digest('hex');
      if (actual !== match[1]) failures.push(`${file}: expected ${match[1]}, received ${actual}`);
      if ((await stat(file)).size === 0) failures.push(`${file}: empty artifact`);
    } catch (error) {
      failures.push(`${file}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  console.log(`Verified ${basename(dirname(checksumPath))}/${basename(checksumPath)}`);
}
if (failures.length > 0) {
  failures.forEach((failure) => {
    console.error(failure);
  });
  process.exitCode = 1;
}
