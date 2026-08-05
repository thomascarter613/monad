import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { cache } from 'react';
import type { DiscoveryManifest } from '@/lib/discovery/types';

const manifestPath = resolve(process.cwd(), '.generated', 'registry', 'discovery.json');

export const getDiscoveryManifest = cache(async (): Promise<DiscoveryManifest> => {
  const parsed = JSON.parse(await readFile(manifestPath, 'utf8')) as DiscoveryManifest;
  if (parsed.schemaVersion !== 1) {
    throw new Error(`Unsupported discovery schema ${String(parsed.schemaVersion)}.`);
  }
  return parsed;
});
