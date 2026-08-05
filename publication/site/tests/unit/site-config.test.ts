import { describe, expect, it } from 'vitest';
import { siteConfig } from '@/lib/config/site';

describe('siteConfig', () => {
  it('defines the publication identity in one canonical object', () => {
    expect(siteConfig.name).toBe('Monad Engineering Log');
    expect(siteConfig.language).toBe('en');
    expect(siteConfig.author.name).toBe('Thomas Carter');
  });
});
