import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { publicationServer } from '../../publications/lib/server.mjs';

export const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
export const repositoryRoot = resolve(siteRoot, '..', '..');
export const reportsRoot = resolve(siteRoot, '.artifacts', 'operations');

export async function withProductionServer(callback, options = {}) {
  const server = await publicationServer({
    siteRoot,
    baseUrl: options.baseUrl ?? process.env.MONAD_OPERATIONS_BASE_URL,
    port: options.port ?? Number(process.env.MONAD_OPERATIONS_PORT ?? 4327),
  });
  try {
    return await callback(server.baseUrl);
  } finally {
    await server.close();
  }
}

export async function writeReport(filename, body) {
  const path = resolve(reportsRoot, filename);
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, `${JSON.stringify(body, null, 2)}\n`);
  return path;
}

export function normalizeInternalUrl(value, baseUrl) {
  const url = new URL(value, baseUrl);
  if (url.origin !== new URL(baseUrl).origin) return null;
  url.hash = '';
  url.search = '';
  return url;
}
