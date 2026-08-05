import { describe, expect, it } from 'vitest';
import { booleanEnvironment, contentSecurityPolicy, securityHeaders } from '@/security.config.mjs';

describe('security response contract', () => {
  it('publishes essential browser security controls', () => {
    const headers = Object.fromEntries(securityHeaders().map(({ key, value }) => [key, value]));
    expect(headers['X-Content-Type-Options']).toBe('nosniff');
    expect(headers['X-Frame-Options']).toBe('DENY');
    expect(headers['Content-Security-Policy']).toContain("frame-ancestors 'none'");
  });
  it('only enables unsafe eval in development CSP', () => {
    expect(contentSecurityPolicy({ development: true })).toContain("'unsafe-eval'");
    expect(contentSecurityPolicy({ development: false })).not.toContain("'unsafe-eval'");
  });
  it('normalizes boolean environment values', () => {
    expect(booleanEnvironment('true')).toBe(true);
    expect(booleanEnvironment('off', true)).toBe(false);
  });
});
