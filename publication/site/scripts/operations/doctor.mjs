import { execFileSync } from 'node:child_process';
import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { deploymentProfiles, operationsContractVersion } from '../../operations.config.mjs';
import { repositoryRoot, siteRoot, writeReport } from './lib/runtime.mjs';

function command(command, args = []) {
  try {
    return execFileSync(command, args, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
  } catch {
    return null;
  }
}
async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

const packageJson = JSON.parse(await readFile(resolve(siteRoot, 'package.json'), 'utf8'));
const checks = [
  {
    key: 'bun',
    required: true,
    ok: Boolean(command('bun', ['--version'])),
    value: command('bun', ['--version']),
  },
  {
    key: 'node',
    required: true,
    ok: Boolean(command('node', ['--version'])),
    value: command('node', ['--version']),
  },
  {
    key: 'git',
    required: true,
    ok: Boolean(command('git', ['--version'])),
    value: command('git', ['--version']),
  },
  {
    key: 'lockfile',
    required: true,
    ok: await exists(resolve(siteRoot, 'bun.lock')),
    value: 'publication/site/bun.lock',
  },
  {
    key: 'generated-registry',
    required: true,
    ok: await exists(resolve(siteRoot, '.generated', 'registry', 'documents.json')),
    value: '.generated/registry/documents.json',
  },
  {
    key: 'chromium',
    required: false,
    ok: Boolean(command('bunx', ['playwright', '--version'])),
    value: command('bunx', ['playwright', '--version']),
  },
  {
    key: 'docker',
    required: false,
    ok: Boolean(command('docker', ['--version'])),
    value: command('docker', ['--version']),
  },
];
const failures = checks.filter((check) => check.required && !check.ok);
const report = {
  schemaVersion: 1,
  checkedAt: new Date().toISOString(),
  operationsContractVersion,
  packageVersion: packageJson.version,
  repositoryRoot,
  siteRoot,
  deploymentProfiles,
  git: {
    commit: command('git', ['-C', repositoryRoot, 'rev-parse', 'HEAD']),
    status: command('git', ['-C', repositoryRoot, 'status', '--short']),
  },
  checks,
};
const path = await writeReport('doctor.json', report);
for (const check of checks)
  console.log(
    `${check.ok ? 'OK  ' : check.required ? 'FAIL' : 'INFO'} ${check.key}${check.value ? `: ${check.value}` : ''}`,
  );
console.log(`Report: ${path}`);
if (failures.length > 0) process.exitCode = 1;
