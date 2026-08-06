import { spawn } from 'node:child_process';
import { rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { syncContent } from './content/sync.mjs';

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function run(command, args) {
  return new Promise((resolvePromise, reject) => {
    const child = spawn(command, args, {
      cwd: siteRoot,
      env: process.env,
      stdio: 'inherit',
    });

    child.on('error', reject);
    child.on('exit', (code, signal) => {
      if (signal) {
        reject(new Error(`${command} terminated by ${signal}.`));
        return;
      }
      if (code !== 0) {
        reject(new Error(`${command} exited with code ${code ?? 1}.`));
        return;
      }
      resolvePromise();
    });
  });
}

await syncContent({ siteRoot });

// Fumadocs writes import manifests beneath .source. Content synchronization can
// remove or rename projected pages, so always regenerate that manifest from the
// just-written projection. Clearing .next prevents Turbopack from retaining the
// same obsolete module graph.
await Promise.all([
  rm(resolve(siteRoot, '.source'), { recursive: true, force: true }),
  rm(resolve(siteRoot, '.next'), { recursive: true, force: true }),
]);

await run('bun', ['--bun', 'next', 'build', ...process.argv.slice(2)]);
