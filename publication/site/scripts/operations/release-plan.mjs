import { execFileSync } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { releasePolicy } from '../../operations.config.mjs';
import { repositoryRoot, siteRoot } from './lib/runtime.mjs';

const options = {
  edition: releasePolicy.defaultEdition,
  version: process.env.MONAD_EDITION_VERSION ?? 'continuous',
  allowDirty: false,
};
for (let i = 2; i < process.argv.length; i += 1) {
  const value = process.argv[i];
  if (value === '--edition') options.edition = process.argv[++i];
  else if (value === '--version') options.version = process.argv[++i];
  else if (value === '--allow-dirty') options.allowDirty = true;
  else throw new Error(`Unknown release-plan option: ${value}`);
}
function git(args) {
  return execFileSync('git', args, { cwd: repositoryRoot, encoding: 'utf8' }).trim();
}
const status = git(['status', '--porcelain']);
if (status && !options.allowDirty)
  throw new Error(
    'Release plan requires a clean Git worktree. Use --allow-dirty only for diagnostics.',
  );
const editions = JSON.parse(
  await readFile(resolve(siteRoot, '.generated', 'registry', 'editions.json'), 'utf8'),
);
const edition = editions.editions.find((entry) => entry.key === options.edition);
if (!edition) throw new Error(`Unknown edition: ${options.edition}`);
const commit = git(['rev-parse', 'HEAD']);
const timestamp = git(['show', '-s', '--format=%ct', commit]);
const plan = {
  schemaVersion: 1,
  plannedAt: new Date().toISOString(),
  edition: edition.key,
  version: options.version,
  documentCount: edition.documentCount,
  sourceDigest: edition.sourceDigest,
  commit,
  sourceDateEpoch: Number(timestamp),
  tag: `${releasePolicy.tagPrefix}${options.version}`,
  command: `SOURCE_DATE_EPOCH=${timestamp} bun run publication:build -- --edition ${edition.key} --version ${options.version} --article-pdfs`,
};
await mkdir(resolve(siteRoot, '.artifacts', 'operations'), { recursive: true });
const path = resolve(siteRoot, '.artifacts', 'operations', 'release-plan.json');
await writeFile(path, `${JSON.stringify(plan, null, 2)}\n`);
console.log(JSON.stringify(plan, null, 2));
console.log(`\nPlan: ${path}`);
