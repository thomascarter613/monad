import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { normalizeInternalUrl, siteRoot, withProductionServer, writeReport } from './lib/runtime.mjs';

const seedRoutes = ['/', '/start', '/search', '/building-monad', '/system', '/artifacts', '/project', '/project/operations', '/editions'];
function ignored(pathname) {
  return pathname.startsWith('/social-card') || /^\/editions\/[^/]+\/(?:print|epub)$/.test(pathname);
}

function hrefs(html) {
  return [...html.matchAll(/\shref=["']([^"'#]+(?:#[^"']*)?)["']/gi)].map((match) => match[1]);
}

async function generatedRoutes() {
  const routes = new Set(seedRoutes);
  for (const name of ['navigation.json', 'documents.json']) {
    try {
      const value = JSON.parse(await readFile(resolve(siteRoot, '.generated', 'registry', name), 'utf8'));
      const candidates = name === 'documents.json' ? value.documents : value.routes;
      for (const entry of candidates ?? []) if (entry?.route) routes.add(entry.route);
    } catch {}
  }
  return routes;
}

await withProductionServer(async (baseUrl) => {
  const queue = [...(await generatedRoutes())];
  const visited = new Set();
  const failures = [];
  const redirects = [];

  while (queue.length > 0 && visited.size < 1500) {
    const pathname = queue.shift();
    if (!pathname || visited.has(pathname)) continue;
    if (ignored(pathname)) continue;
    visited.add(pathname);
    const url = new URL(pathname, baseUrl);
    let response;
    try { response = await fetch(url, { redirect: 'manual' }); }
    catch (error) { failures.push({ route: pathname, error: error instanceof Error ? error.message : String(error) }); continue; }
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get('location');
      redirects.push({ route: pathname, status: response.status, location });
      if (location) {
        const target = normalizeInternalUrl(location, baseUrl);
        if (target && !visited.has(target.pathname)) queue.push(target.pathname);
      }
      continue;
    }
    if (response.status >= 400) { failures.push({ route: pathname, status: response.status }); continue; }
    const type = response.headers.get('content-type') ?? '';
    if (!type.includes('text/html')) continue;
    const html = await response.text();
    for (const href of hrefs(html)) {
      const target = normalizeInternalUrl(href, baseUrl);
      if (!target || visited.has(target.pathname)) continue;
      if (target.pathname.startsWith('/api/') || target.pathname.endsWith('.md')) continue;
      queue.push(target.pathname);
    }
  }

  const report = { schemaVersion: 1, checkedAt: new Date().toISOString(), baseUrl, routeCount: visited.size, redirectCount: redirects.length, failureCount: failures.length, failures, redirects };
  const path = await writeReport('links.json', report);
  console.log(`Checked ${visited.size} internal routes. Report: ${path}`);
  if (failures.length > 0) {
    for (const failure of failures) console.error(`BROKEN ${failure.route}: ${failure.status ?? failure.error}`);
    process.exitCode = 1;
  }
});
