import { spawn } from 'node:child_process';
import { rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const executable = resolve(
  siteRoot,
  'node_modules',
  '.bin',
  process.platform === 'win32' ? 'fumadocs-mdx.cmd' : 'fumadocs-mdx',
);

await rm(resolve(siteRoot, '.source'), { recursive: true, force: true });

await new Promise((resolvePromise, reject) => {
  const child = spawn(executable, process.argv.slice(2), {
    cwd: siteRoot,
    env: process.env,
    stdio: 'inherit',
  });

  child.on('error', reject);
  child.on('exit', (code, signal) => {
    if (signal) {
      reject(new Error(`fumadocs-mdx terminated by ${signal}.`));
      return;
    }
    if (code !== 0) {
      reject(new Error(`fumadocs-mdx exited with code ${code ?? 1}.`));
      return;
    }
    resolvePromise();
  });
});
