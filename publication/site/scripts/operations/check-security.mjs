import { withProductionServer, writeReport } from './lib/runtime.mjs';

const required = {
  'content-security-policy': (value) =>
    value.includes("default-src 'self'") && value.includes("frame-ancestors 'none'"),
  'referrer-policy': (value) => value === 'strict-origin-when-cross-origin',
  'x-content-type-options': (value) => value === 'nosniff',
  'x-frame-options': (value) => value === 'DENY',
  'permissions-policy': (value) => value.includes('camera=()') && value.includes('microphone=()'),
};

await withProductionServer(async (baseUrl) => {
  const checks = [];
  const failures = [];
  for (const route of ['/', '/system', '/api/health']) {
    const response = await fetch(new URL(route, baseUrl), { redirect: 'manual' });
    const record = { route, status: response.status, headers: {} };
    if (response.status >= 400 && route !== '/api/health') {
      failures.push(`${route} returned ${response.status}`);
    }
    for (const [name, validate] of Object.entries(required)) {
      const value = response.headers.get(name) ?? '';
      record.headers[name] = value;
      if (!value || !validate(value)) failures.push(`${route} has invalid ${name}`);
    }
    if (response.headers.has('x-powered-by')) failures.push(`${route} exposes X-Powered-By`);
    checks.push(record);
  }
  const api = await fetch(new URL('/api/operations', baseUrl));
  if ((api.headers.get('x-robots-tag') ?? '').toLowerCase() !== 'noindex, follow') {
    failures.push('/api/operations must publish X-Robots-Tag: noindex, follow');
  }
  const report = {
    schemaVersion: 1,
    checkedAt: new Date().toISOString(),
    baseUrl,
    failures,
    checks,
  };
  const path = await writeReport('security.json', report);
  console.log(`Security contract checked. Report: ${path}`);
  if (failures.length > 0) {
    failures.forEach((failure) => {
      console.error(`SECURITY ${failure}`);
    });
    process.exitCode = 1;
  }
});
