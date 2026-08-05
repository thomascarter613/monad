import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { cache } from 'react';
import type { NavigationManifest } from '@/lib/navigation/types';

const navigationPath = resolve(process.cwd(), '.generated', 'registry', 'navigation.json');

export const getNavigationManifest = cache(async (): Promise<NavigationManifest> => {
  const raw = await readFile(navigationPath, 'utf8');
  const parsed = JSON.parse(raw) as NavigationManifest;
  if (parsed.schemaVersion !== 1) {
    throw new Error(
      `Unsupported navigation manifest schema ${String(parsed.schemaVersion)}. Run bun run content:sync.`,
    );
  }
  return parsed;
});
