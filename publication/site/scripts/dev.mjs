import { spawn } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { syncContent } from './content/sync.mjs';
import { startContentWatcher } from './content/watch.mjs';

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
await syncContent({ siteRoot });
const stopWatcher = await startContentWatcher({ siteRoot });

const child = spawn('bun', ['--bun', 'next', 'dev', ...process.argv.slice(2)], {
  cwd: siteRoot,
  stdio: 'inherit',
  env: process.env,
});

function stop(signal) {
  stopWatcher();
  if (!child.killed) child.kill(signal);
}

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => stop(signal));
}

child.on('exit', (code, signal) => {
  stopWatcher();
  if (signal) process.kill(process.pid, signal);
  else process.exit(code ?? 0);
});
