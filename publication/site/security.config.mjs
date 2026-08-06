export const securityContractVersion = '2026-08-04.1';

function normalize(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase();
}

export function booleanEnvironment(value, fallback = false) {
  if (value === undefined || value === '') return fallback;
  return ['1', 'true', 'yes', 'on'].includes(normalize(value));
}

export function contentSecurityPolicy({ development = false, httpsOnly = false } = {}) {
  const directives = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${development ? " 'unsafe-eval'" : ''}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    `connect-src 'self'${development ? ' ws: wss:' : ''}`,
    "worker-src 'self' blob:",
    "media-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "manifest-src 'self'",
  ];
  if (httpsOnly) directives.push('upgrade-insecure-requests');
  return `${directives.join('; ')};`;
}

export function securityHeaders({ development = false, hsts = false } = {}) {
  const headers = [
    {
      key: 'Content-Security-Policy',
      value: contentSecurityPolicy({ development, httpsOnly: hsts }),
    },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'X-Frame-Options', value: 'DENY' },
    {
      key: 'Permissions-Policy',
      value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()',
    },
    { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
    { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
    { key: 'X-Permitted-Cross-Domain-Policies', value: 'none' },
  ];
  if (hsts) {
    headers.push({
      key: 'Strict-Transport-Security',
      value: 'max-age=63072000; includeSubDomains; preload',
    });
  }
  return headers;
}
