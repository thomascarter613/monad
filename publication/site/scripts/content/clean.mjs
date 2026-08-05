import { rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
await rm(resolve(siteRoot, '.generated'), { recursive: true, force: true });
console.log('Removed the generated canonical-content projection.');
