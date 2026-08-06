import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { operationsContractVersion } from '@/operations.config.mjs';

async function registrySummary() {
  try {
    const path = resolve(process.cwd(), '.generated', 'registry', 'documents.json');
    const value = JSON.parse(await readFile(path, 'utf8')) as {
      schemaVersion?: number;
      generatedAt?: string;
      documentCount?: number;
      canonicalDocumentCount?: number;
      warningCount?: number;
      errorCount?: number;
    };
    return {
      available: true,
      schemaVersion: value.schemaVersion,
      generatedAt: value.generatedAt,
      documentCount: value.documentCount ?? value.canonicalDocumentCount ?? 0,
      warningCount: value.warningCount ?? 0,
      errorCount: value.errorCount ?? 0,
    };
  } catch {
    return { available: false, documentCount: 0, warningCount: 0, errorCount: 0 };
  }
}

export async function operationalSnapshot() {
  const registry = await registrySummary();
  const commit =
    process.env.MONAD_BUILD_COMMIT ??
    process.env.VERCEL_GIT_COMMIT_SHA ??
    process.env.GITHUB_SHA ??
    'unknown';
  const version =
    process.env.MONAD_BUILD_VERSION ?? process.env.MONAD_EDITION_VERSION ?? 'continuous';
  const target = process.env.MONAD_DEPLOYMENT_TARGET ?? (process.env.VERCEL ? 'vercel' : 'local');
  const healthy = registry.available && registry.errorCount === 0;

  return {
    status: healthy ? 'ok' : 'degraded',
    service: 'monad-engineering-log',
    operationsContractVersion,
    version,
    channel: process.env.MONAD_BUILD_CHANNEL ?? 'development',
    commit,
    deployment: {
      target,
      region: process.env.MONAD_DEPLOYMENT_REGION ?? process.env.VERCEL_REGION ?? null,
    },
    registry,
    checkedAt: new Date().toISOString(),
  } as const;
}
