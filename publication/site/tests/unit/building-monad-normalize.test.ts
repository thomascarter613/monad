import { describe, expect, it } from 'vitest';
import {
  normalizePublicationMetadata,
  normalizeRepositoryState,
} from '../../scripts/content/lib/normalize.mjs';

describe('Building Monad metadata normalization', () => {
  it('accepts nested publication and repository metadata', () => {
    const publication = normalizePublicationMetadata(
      {
        publication: {
          phase: 'experience',
          published: '2026-08-04',
          readingMinutes: 17,
        },
      },
      'A compact article body.',
    );
    const repository = normalizeRepositoryState({
      repository: {
        branch: 'main',
        commit: 'abcdef123456',
        command: 'bun run verify',
      },
    });

    expect(publication).toMatchObject({
      projectPhase: 'experience',
      publishedAt: '2026-08-04',
      estimatedReadingMinutes: 17,
    });
    expect(repository).toEqual({
      commit: 'abcdef123456',
      branch: 'main',
      release: undefined,
      tree: undefined,
      command: 'bun run verify',
    });
  });

  it('estimates reading time when it is not declared', () => {
    const body = Array.from({ length: 451 }, (_, index) => `word${index}`).join(' ');
    const publication = normalizePublicationMetadata({}, body, 225);
    expect(publication.estimatedReadingMinutes).toBe(3);
    expect(publication.wordCount).toBe(451);
  });
});
