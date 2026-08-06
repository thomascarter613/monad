import { describe, expect, it } from 'vitest';
import { parsePublicEnvironment } from '@/lib/environment';

describe('parsePublicEnvironment', () => {
  it('provides a local development URL by default', () => {
    expect(parsePublicEnvironment({})).toEqual({
      siteUrl: 'http://localhost:3000',
      repositoryUrl: undefined,
    });
  });

  it('accepts explicit public URLs', () => {
    expect(
      parsePublicEnvironment({
        NEXT_PUBLIC_SITE_URL: 'https://docs.example.com',
        NEXT_PUBLIC_REPOSITORY_URL: 'https://github.com/example/monad',
      }),
    ).toEqual({
      siteUrl: 'https://docs.example.com',
      repositoryUrl: 'https://github.com/example/monad',
    });
  });

  it('treats an empty repository URL as unset', () => {
    expect(
      parsePublicEnvironment({
        NEXT_PUBLIC_SITE_URL: 'https://docs.example.com',
        NEXT_PUBLIC_REPOSITORY_URL: '',
      }),
    ).toEqual({
      siteUrl: 'https://docs.example.com',
      repositoryUrl: undefined,
    });
  });

  it('rejects malformed URLs with an actionable message', () => {
    expect(() => parsePublicEnvironment({ NEXT_PUBLIC_SITE_URL: 'not-a-url' })).toThrow(
      /Invalid public environment configuration/,
    );
  });
});
