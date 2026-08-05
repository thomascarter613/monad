import { describe, expect, it } from 'vitest';
import {
  editionSourceDigest,
  publicationEditionByKey,
  publicationEditions,
  validatePublicationEditions,
} from '../../editions.config.mjs';

describe('publication editions', () => {
  it('defines unique validated profiles', () => {
    expect(validatePublicationEditions()).toHaveLength(3);
    expect(new Set(publicationEditions.map((edition) => edition.key)).size).toBe(
      publicationEditions.length,
    );
    expect(publicationEditionByKey('complete')?.selectors.surfaces).toEqual([
      'building-monad',
      'system',
      'artifacts',
      'project',
    ]);
  });

  it('produces a stable source digest', () => {
    const documents = [
      { id: 'ADR-0001', route: '/artifacts/decisions/adr-0001', sourceHash: 'a' },
      { id: 'MKE-CORE-0001', route: '/artifacts/specifications/mke-core-0001', sourceHash: 'b' },
    ];
    expect(editionSourceDigest(documents)).toBe(editionSourceDigest(documents));
    expect(editionSourceDigest(documents)).not.toBe(
      editionSourceDigest([...documents].reverse()),
    );
  });
});
