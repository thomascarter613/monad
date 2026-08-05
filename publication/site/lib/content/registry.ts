import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { cache } from 'react';
import type { ContentRegistry, DocumentRegistryEntry } from '@/lib/content/types';

const registryPath = resolve(process.cwd(), '.generated', 'registry', 'documents.json');

export const getContentRegistry = cache(async (): Promise<ContentRegistry> => {
  const raw = await readFile(registryPath, 'utf8');
  const parsed = JSON.parse(raw) as ContentRegistry;
  if (parsed.schemaVersion !== 2) {
    throw new Error(
      `Unsupported content registry schema ${String(parsed.schemaVersion)}. Run bun run content:sync.`,
    );
  }
  return parsed;
});

export const getRegistryDocument = cache(
  async (identifier: string): Promise<DocumentRegistryEntry | undefined> => {
    const registry = await getContentRegistry();
    return registry.documents.find(
      (document) => document.id.toUpperCase() === identifier.toUpperCase(),
    );
  },
);
