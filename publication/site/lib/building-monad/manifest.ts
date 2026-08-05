import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { cache } from 'react';
import type {
  BuildingMonadInstallment,
  BuildingMonadManifest,
} from '@/lib/building-monad/types';

const manifestPath = resolve(process.cwd(), '.generated', 'registry', 'building-monad.json');

export const getBuildingMonadManifest = cache(async (): Promise<BuildingMonadManifest> => {
  const raw = await readFile(manifestPath, 'utf8');
  const parsed = JSON.parse(raw) as BuildingMonadManifest;
  if (parsed.schemaVersion !== 1) {
    throw new Error(
      `Unsupported Building Monad manifest schema ${String(parsed.schemaVersion)}. Run bun run content:sync.`,
    );
  }
  return parsed;
});

export const getBuildingMonadInstallment = cache(
  async (identifier: string): Promise<BuildingMonadInstallment | undefined> => {
    const manifest = await getBuildingMonadManifest();
    return manifest.installments.find(
      (installment) => installment.id.toUpperCase() === identifier.toUpperCase(),
    );
  },
);
