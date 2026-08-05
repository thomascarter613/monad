import { remarkMdxFiles } from 'fumadocs-core/mdx-plugins/remark-mdx-files';
import { pageSchema } from 'fumadocs-core/source/schema';
import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { z } from 'zod';
import {
  documentKinds,
  documentStatuses,
  relationshipKinds,
} from './lib/content/constants';

const relatedDocumentsSchema = z.record(z.string(), z.array(z.string())).default({});

const relationshipEdgeSchema = z.object({
  kind: z.enum(relationshipKinds),
  id: z.string().min(1),
  title: z.string().min(1),
  route: z.string().startsWith('/'),
  explicit: z.boolean(),
});

const relationshipsSchema = z.object({
  outgoing: z.array(relationshipEdgeSchema).default([]),
  incoming: z.array(relationshipEdgeSchema).default([]),
});

const lifecycleSchema = z.object({
  previousStatus: z.enum(documentStatuses).optional(),
  allowedNextStatuses: z.array(z.enum(documentStatuses)).default([]),
});

const seriesSchema = z.object({
  key: z.string().min(1),
  position: z.number().int().positive().optional(),
  total: z.number().int().positive(),
  previousId: z.string().optional(),
  previousTitle: z.string().optional(),
  previousRoute: z.string().startsWith('/').optional(),
  nextId: z.string().optional(),
  nextTitle: z.string().optional(),
  nextRoute: z.string().startsWith('/').optional(),
});

const publicationMetadataSchema = z.object({
  projectPhase: z.string().optional(),
  publishedAt: z.string().optional(),
  updatedAt: z.string().optional(),
  estimatedReadingMinutes: z.number().int().positive(),
  wordCount: z.number().int().nonnegative(),
});

const repositoryStateSchema = z.object({
  commit: z.string().optional(),
  branch: z.string().optional(),
  release: z.string().optional(),
  tree: z.string().optional(),
  command: z.string().optional(),
});

const monadDocumentSchema = pageSchema.extend({
  id: z.string().min(1),
  kind: z.enum(documentKinds),
  family: z.string().min(1),
  status: z.enum(documentStatuses),
  lifecycle: lifecycleSchema,
  canonicalPath: z.string().min(1),
  sourceRoot: z.string().min(1),
  sourceHash: z.string().regex(/^[a-f0-9]{64}$/),
  generated: z.literal(true),
  synthetic: z.boolean().default(false),
  aliases: z.array(z.string()).default([]),
  series: seriesSchema.optional(),
  tags: z.array(z.string()).default([]),
  references: z.array(z.string()).default([]),
  referencedBy: z.array(z.string()).default([]),
  related: relatedDocumentsSchema,
  relationships: relationshipsSchema,
  publication: publicationMetadataSchema.optional(),
  repository: repositoryStateSchema.optional(),
});

export const systemDocs = defineDocs({
  dir: 'content/system',
  docs: {
    postprocess: { includeProcessedMarkdown: true },
  },
});

export const generatedSystemDocs = defineDocs({
  dir: '.generated/content/system',
  docs: {
    schema: monadDocumentSchema,
    postprocess: { includeProcessedMarkdown: true },
  },
});

export const buildingMonadDocs = defineDocs({
  dir: '.generated/content/building-monad',
  docs: {
    schema: monadDocumentSchema,
    postprocess: { includeProcessedMarkdown: true },
  },
});

export const artifactDocs = defineDocs({
  dir: '.generated/content/artifacts',
  docs: {
    schema: monadDocumentSchema,
    postprocess: { includeProcessedMarkdown: true },
  },
});

export const projectDocs = defineDocs({
  dir: '.generated/content/project',
  docs: {
    schema: monadDocumentSchema,
    postprocess: { includeProcessedMarkdown: true },
  },
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkMdxFiles],
  },
});
