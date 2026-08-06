import { createHash } from 'node:crypto';

export const publicationEditionContractVersion = '2026-08-04';

export const publicationEditions = [
  {
    key: 'building-monad',
    title: 'Building Monad',
    subtitle: 'The chronological engineering narrative',
    description: 'The complete Building Monad serial, ordered by installment and project phase.',
    defaultVersion: 'continuous',
    selectors: {
      surfaces: ['building-monad'],
      includeSynthetic: false,
    },
    formats: ['pdf', 'epub', 'offline', 'source'],
    paper: {
      format: 'Letter',
      margin: { top: '0.72in', right: '0.7in', bottom: '0.72in', left: '0.7in' },
    },
  },
  {
    key: 'reference',
    title: 'Monad Engineering Reference',
    subtitle: 'Architecture, decisions, specifications, and evidence',
    description:
      'A governed reference edition containing the system model and durable engineering artifacts.',
    defaultVersion: 'continuous',
    selectors: {
      surfaces: ['system', 'artifacts'],
      includeSynthetic: false,
    },
    formats: ['pdf', 'epub', 'offline', 'source'],
    paper: {
      format: 'Letter',
      margin: { top: '0.68in', right: '0.66in', bottom: '0.72in', left: '0.74in' },
    },
  },
  {
    key: 'complete',
    title: 'Monad Engineering Log',
    subtitle: 'Complete governed publication edition',
    description:
      'The complete governed Monad corpus: narrative, system reference, artifacts, and project record.',
    defaultVersion: 'continuous',
    selectors: {
      surfaces: ['building-monad', 'system', 'artifacts', 'project'],
      includeSynthetic: false,
    },
    formats: ['pdf', 'epub', 'offline', 'source'],
    paper: {
      format: 'Letter',
      margin: { top: '0.68in', right: '0.64in', bottom: '0.72in', left: '0.72in' },
    },
  },
];

export function publicationEditionByKey(key) {
  return publicationEditions.find((edition) => edition.key === key);
}

export function editionSourceDigest(documents) {
  const material = documents
    .map((document) => `${document.id}\0${document.route}\0${document.sourceHash}`)
    .join('\n');
  return createHash('sha256').update(material).digest('hex');
}

export function validatePublicationEditions() {
  const keys = new Set();
  for (const edition of publicationEditions) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(edition.key)) {
      throw new Error(`Invalid publication edition key: ${edition.key}`);
    }
    if (keys.has(edition.key)) throw new Error(`Duplicate publication edition key: ${edition.key}`);
    keys.add(edition.key);
    if (!Array.isArray(edition.selectors?.surfaces) || edition.selectors.surfaces.length === 0) {
      throw new Error(`Edition ${edition.key} must select at least one publication surface.`);
    }
  }
  return publicationEditions;
}

validatePublicationEditions();
