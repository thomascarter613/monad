import { readdir, readFile } from 'node:fs/promises';
import { reportsRoot } from './lib/runtime.mjs';

try {
  const names = (await readdir(reportsRoot)).filter((name) => name.endsWith('.json')).sort();
  if (names.length === 0) throw new Error('No operational reports exist.');
  for (const name of names) {
    const value = JSON.parse(await readFile(new URL(`file://${reportsRoot}/${name}`), 'utf8'));
    console.log(`\n${name}`);
    console.log(`  checked: ${value.checkedAt ?? 'unknown'}`);
    console.log(`  failures: ${value.failureCount ?? value.failures?.length ?? 0}`);
    if (value.routeCount !== undefined) console.log(`  routes: ${value.routeCount}`);
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
