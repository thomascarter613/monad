import { pageSchema } from 'fumadocs-core/source/schema';
import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { z } from 'zod';
import {
  documentKinds,
  documentStatuses,
} from './lib/content/constants';

const relatedDocumentsSchema = z.record(z.string(), z.array(z.string())).default({});

const monadDocumentSchema = pageSchema.extend({
  id: z.string().min(1),
  kind: z.enum(documentKinds),
  status: z.enum(documentStatuses),
  canonicalPath: z.string().min(1),
  sourceRoot: z.string().min(1),
  sourceHash: z.string().regex(/^[a-f0-9]{64}$/),
  generated: z.literal(true),
  synthetic: z.boolean().default(false),
  series: z.string().optional(),
  seriesPosition: z.number().int().positive().optional(),
  tags: z.array(z.string()).default([]),
  references: z.array(z.string()).default([]),
  related: relatedDocumentsSchema,
});

export const systemDocs = defineDocs({
  dir: 'content/system',
});

export const generatedSystemDocs = defineDocs({
  dir: '.generated/content/system',
  docs: {
    schema: monadDocumentSchema,
  },
});

export const buildingMonadDocs = defineDocs({
  dir: '.generated/content/building-monad',
  docs: {
    schema: monadDocumentSchema,
  },
});

export const artifactDocs = defineDocs({
  dir: '.generated/content/artifacts',
  docs: {
    schema: monadDocumentSchema,
  },
});

export default defineConfig();
