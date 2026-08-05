import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { cache } from 'react';
import type { ExplorationManifest } from '@/lib/exploration/types';

const manifestPath = resolve(process.cwd(), '.generated', 'registry', 'exploration.json');

export const getExplorationManifest = cache(async (): Promise<ExplorationManifest> => {
  const raw = await readFile(manifestPath, 'utf8');
  const parsed = JSON.parse(raw) as ExplorationManifest;
  if (parsed.schemaVersion !== 1) {
    throw new Error(
      `Unsupported exploration manifest schema ${String(parsed.schemaVersion)}. Run bun run content:sync.`,
    );
  }
  return parsed;
});
