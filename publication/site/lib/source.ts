import {
  artifactDocs,
  buildingMonadDocs,
  generatedSystemDocs,
  projectDocs,
  systemDocs,
} from 'collections/server';
import { loader } from 'fumadocs-core/source';

export const systemSource = loader(
  {
    foundation: systemDocs.toFumadocsSource(),
    canonical: generatedSystemDocs.toFumadocsSource(),
  },
  {
    baseUrl: '/system',
  },
);

export const buildingMonadSource = loader({
  baseUrl: '/building-monad',
  source: buildingMonadDocs.toFumadocsSource(),
});

export const artifactSource = loader({
  baseUrl: '/artifacts',
  source: artifactDocs.toFumadocsSource(),
});

export const projectSource = loader({
  baseUrl: '/project',
  source: projectDocs.toFumadocsSource(),
});

export const searchableSources = [
  { key: 'system', source: systemSource },
  { key: 'building-monad', source: buildingMonadSource },
  { key: 'artifacts', source: artifactSource },
  { key: 'project', source: projectSource },
] as const;
