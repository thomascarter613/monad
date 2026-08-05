import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { cache } from 'react';
import type { EditionManifest } from '@/lib/editions/types';

const manifestPath = resolve(process.cwd(), '.generated', 'registry', 'editions.json');

export const getEditionManifest = cache(async (): Promise<EditionManifest> => {
  const raw = await readFile(manifestPath, 'utf8');
  const parsed = JSON.parse(raw) as EditionManifest;
  if (parsed.schemaVersion !== 1) {
    throw new Error(
      `Unsupported edition manifest schema ${String(parsed.schemaVersion)}. Run bun run content:sync.`,
    );
  }
  return parsed;
});

export async function getEdition(key: string) {
  const manifest = await getEditionManifest();
  return manifest.editions.find((edition) => edition.key === key);
}
