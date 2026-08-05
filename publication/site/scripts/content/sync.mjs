import { dirname, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  contentIngestionConfig,
  publicationContentSources,
} from '../../content.sources.mjs';
import { discoverSourceFiles, readDiscoveredFile, resolveRepositoryRoot } from './lib/discovery.mjs';
import { splitFrontmatter } from './lib/frontmatter.mjs';
import { rewriteDocumentLinks } from './lib/links.mjs';
import {
  deriveSlug,
  extractIdentifier,
  extractIdentifiers,
  inferDescription,
  inferSeries,
  inferSeriesPosition,
  inferTitle,
  joinRoute,
  normalizePath,
  normalizeRelated,
  normalizeStatus,
  normalizeStringArray,
  sha256,
  stripMatchingFirstHeading,
} from './lib/normalize.mjs';
import {
  createSyntheticIndexes,
  generatedRelativePath,
  writeProjection,
} from './lib/projection.mjs';

const currentFile = fileURLToPath(import.meta.url);
const defaultSiteRoot = resolve(dirname(currentFile), '..', '..');

function issue(severity, code, message, canonicalPath) {
  return { severity, code, message, canonicalPath };
}

function registryEntry(document) {
  return {
    id: document.id,
    title: document.title,
    description: document.description,
    kind: document.kind,
    status: document.status,
    route: document.route,
    slug: document.slug,
    canonicalPath: document.canonicalPath,
    sourceRoot: document.sourceRoot,
    sourceHash: document.sourceHash,
    generatedPath: document.generatedPath,
    synthetic: document.synthetic,
    series: document.series,
    seriesPosition: document.seriesPosition,
    tags: document.tags,
    references: document.references,
    related: document.related,
  };
}

function assertUnique(documents, issues) {
  const byId = new Map();
  const byRoute = new Map();
  const byGeneratedPath = new Map();

  for (const document of documents) {
    for (const [value, map, code, label] of [
      [document.id, byId, 'CONTENT_DUPLICATE_ID', 'identifier'],
      [document.route, byRoute, 'CONTENT_DUPLICATE_ROUTE', 'route'],
      [document.generatedPath, byGeneratedPath, 'CONTENT_DUPLICATE_OUTPUT', 'generated path'],
    ]) {
      const previous = map.get(value);
      if (previous) {
        issues.push(
          issue(
            'error',
            code,
            `Duplicate ${label} ${value}; first used by ${previous.canonicalPath}.`,
            document.canonicalPath,
          ),
        );
      } else {
        map.set(value, document);
      }
    }
  }
}

async function normalizeDocument(repositoryRoot, discovered, issues) {
  if (discovered.size > contentIngestionConfig.maximumDocumentBytes) {
    issues.push(
      issue(
        'error',
        'CONTENT_DOCUMENT_TOO_LARGE',
        `Document is ${discovered.size} bytes; maximum is ${contentIngestionConfig.maximumDocumentBytes}.`,
        discovered.canonicalPath,
      ),
    );
    return null;
  }

  let sourceText;
  try {
    sourceText = await readDiscoveredFile(discovered);
  } catch (error) {
    issues.push(
      issue(
        'error',
        'CONTENT_READ_FAILED',
        error instanceof Error ? error.message : String(error),
        discovered.canonicalPath,
      ),
    );
    return null;
  }

  let parsed;
  try {
    parsed = splitFrontmatter(sourceText);
  } catch (error) {
    issues.push(
      issue(
        'error',
        'CONTENT_FRONTMATTER_INVALID',
        error instanceof Error ? error.message : String(error),
        discovered.canonicalPath,
      ),
    );
    return null;
  }

  const title = inferTitle(parsed.attributes, parsed.body, discovered.relativePath);
  const description = inferDescription(parsed.attributes, parsed.body, title);
  let identifier = extractIdentifier(
    parsed.attributes,
    title,
    discovered.relativePath,
    parsed.body,
  );

  if (!identifier) {
    identifier = `UNTRACKED-${sha256(discovered.canonicalPath).slice(0, 10).toUpperCase()}`;
    issues.push(
      issue(
        'warning',
        discovered.source.idRequired ? 'CONTENT_REQUIRED_ID_INFERRED' : 'CONTENT_ID_INFERRED',
        `No document identifier was found; using stable generated identifier ${identifier}.`,
        discovered.canonicalPath,
      ),
    );
  }

  const slug = deriveSlug(discovered.relativePath, parsed.attributes.slug);
  const route = joinRoute(discovered.source.routeBase, slug);
  const body = stripMatchingFirstHeading(parsed.body, title);
  if (!body.trim()) {
    issues.push(
      issue('warning', 'CONTENT_EMPTY_BODY', 'Document has no body content.', discovered.canonicalPath),
    );
  }

  const document = {
    id: identifier,
    title,
    description,
    kind: discovered.source.kind,
    status: normalizeStatus(parsed.attributes.status, discovered.source.kind, parsed.body),
    route,
    slug,
    canonicalPath: discovered.canonicalPath,
    sourceRoot: discovered.sourceRoot,
    sourceHash: sha256(sourceText),
    generatedPath: '',
    synthetic: false,
    series: inferSeries(parsed.attributes, identifier, discovered.source.key),
    seriesPosition: inferSeriesPosition(parsed.attributes, identifier),
    tags: normalizeStringArray(parsed.attributes.tags),
    references: [],
    related: normalizeRelated(parsed.attributes.related),
    body,
    source: discovered.source,
    relativePath: discovered.relativePath,
    absolutePath: discovered.absolutePath,
    repositoryRoot,
  };
  document.generatedPath = generatedRelativePath(document);
  return document;
}

export async function syncContent(options = {}) {
  const siteRoot = resolve(options.siteRoot ?? defaultSiteRoot);
  const repositoryRoot = resolveRepositoryRoot(siteRoot, options.repositoryRoot);
  const write = options.write ?? true;
  const strict = options.strict ?? false;
  const issues = [];
  const documents = [];

  for (const source of publicationContentSources) {
    const discovery = await discoverSourceFiles(repositoryRoot, source);
    if (discovery.roots.length === 0) {
      issues.push(
        issue(
          'warning',
          'CONTENT_SOURCE_ROOT_MISSING',
          `None of the configured roots exist: ${source.canonicalRoots.join(', ')}.`,
        ),
      );
    }

    for (const discovered of discovery.files) {
      const document = await normalizeDocument(repositoryRoot, discovered, issues);
      if (document) documents.push(document);
    }
  }

  const routeByAbsolutePath = new Map(
    documents.map((document) => [normalizePath(normalize(document.absolutePath)), document]),
  );
  const knownIdentifiers = new Set(documents.map((document) => document.id));

  for (const document of documents) {
    document.body = rewriteDocumentLinks(document, document.body, routeByAbsolutePath, issues);
    document.references = extractIdentifiers(document.body).filter(
      (identifier) => identifier !== document.id && knownIdentifiers.has(identifier),
    );
  }

  const syntheticDocuments = createSyntheticIndexes(documents, publicationContentSources);
  const allDocuments = [...documents, ...syntheticDocuments];
  assertUnique(allDocuments, issues);

  issues.sort((left, right) => {
    const pathOrder = (left.canonicalPath ?? '').localeCompare(right.canonicalPath ?? '');
    return pathOrder || left.code.localeCompare(right.code);
  });

  const errorCount = issues.filter((entry) => entry.severity === 'error').length;
  const warningCount = issues.filter((entry) => entry.severity === 'warning').length;
  const registry = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    documentCount: allDocuments.length,
    warningCount,
    errorCount,
    documents: allDocuments.map(registryEntry).sort((left, right) => left.route.localeCompare(right.route)),
    issues,
  };

  if (errorCount > 0 || (strict && warningCount > 0)) {
    const error = new Error(
      `Content ingestion failed with ${errorCount} error(s) and ${warningCount} warning(s).`,
    );
    error.registry = registry;
    throw error;
  }

  if (write) await writeProjection(siteRoot, allDocuments, registry);
  return { siteRoot, repositoryRoot, registry, documents: allDocuments };
}

function printRegistry(registry, mode) {
  for (const entry of registry.issues) {
    const location = entry.canonicalPath ? ` ${entry.canonicalPath}` : '';
    const marker = entry.severity === 'error' ? 'ERROR' : 'WARN ';
    console.log(`${marker} ${entry.code}${location}: ${entry.message}`);
  }

  console.log(
    `${mode}: ${registry.documentCount} projected document(s), ` +
      `${registry.warningCount} warning(s), ${registry.errorCount} error(s).`,
  );
}

function parseArguments(argv) {
  return {
    write: !argv.includes('--check'),
    strict: argv.includes('--strict'),
  };
}

const invokedDirectly = process.argv[1] && resolve(process.argv[1]) === currentFile;
if (invokedDirectly) {
  const options = parseArguments(process.argv.slice(2));
  try {
    const result = await syncContent(options);
    printRegistry(result.registry, options.write ? 'Content synchronized' : 'Content validated');
  } catch (error) {
    if (error?.registry) printRegistry(error.registry, 'Content rejected');
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
