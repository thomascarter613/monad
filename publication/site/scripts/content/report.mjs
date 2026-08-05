import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const registryPath = resolve(siteRoot, '.generated', 'registry', 'documents.json');

try {
  const registry = JSON.parse(await readFile(registryPath, 'utf8'));
  console.log(`Documents: ${registry.documentCount}`);
  console.log(`Warnings:  ${registry.warningCount}`);
  console.log(`Errors:    ${registry.errorCount}`);
  console.log('');

  for (const document of registry.documents) {
    const marker = document.synthetic ? 'generated' : document.kind;
    console.log(`${document.id.padEnd(26)} ${marker.padEnd(18)} ${document.route}`);
  }
} catch (error) {
  console.error('No generated registry exists. Run `bun run content:sync` first.');
  if (process.env.DEBUG) console.error(error);
  process.exitCode = 1;
}
