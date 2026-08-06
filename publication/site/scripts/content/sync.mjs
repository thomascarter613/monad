import { dirname, normalize, resolve } from 'node:path';
import { buildingMonadSeries } from '../../building-monad.config.mjs';
import { fileURLToPath } from 'node:url';
import {
  contentContractVersion,
  serializableIdentifierFamilies,
} from '../../content.families.mjs';
import {
  contentIngestionConfig,
  publicationContentSources,
} from '../../content.sources.mjs';
import { discoverSourceFiles, readDiscoveredFile, resolveRepositoryRoot } from './lib/discovery.mjs';
import { splitFrontmatter } from './lib/frontmatter.mjs';
import {
  buildRelationshipGraph,
  collectRouteAliases,
  loadPreviousRegistry,
  validateAliases,
  validateIdentifierAndLifecycle,
  validateSeries,
} from './lib/governance.mjs';
import { rewriteDocumentLinks } from './lib/links.mjs';
import {
  deriveSlug,
  extractIdentifier,
  extractIdentifiers,
  inferDescription,
  inferSeries,
  inferSeriesPosition,
  inferSeriesTotal,
  inferTitle,
  joinRoute,
  normalizePath,
  normalizePublicationMetadata,
  normalizeRelated,
  normalizeRepositoryState,
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
    family: document.family,
    status: document.status,
    lifecycle: document.lifecycle,
    route: document.route,
    aliases: document.aliases ?? [],
    slug: document.slug,
    canonicalPath: document.canonicalPath,
    sourceRoot: document.sourceRoot,
    sourceHash: document.sourceHash,
    generatedPath: document.generatedPath,
    synthetic: document.synthetic,
    series: document.seriesInfo,
    tags: document.tags,
    references: document.references,
    referencedBy: document.referencedBy ?? [],
    related: document.related,
    relationships: document.relationships ?? { outgoing: [], incoming: [] },
    publication: document.publication,
    repository: document.repository,
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

async function normalizeDocument(repositoryRoot, discovered, previousById, issues) {
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

  const previousEntry = previousById.get(identifier);
  const document = {
    id: identifier,
    title,
    description,
    kind: discovered.source.kind,
    status: normalizeStatus(parsed.attributes.status, discovered.source.kind, parsed.body),
    family: 'untracked',
    lifecycle: { allowedNextStatuses: [] },
    route,
    aliases: [],
    slug,
    canonicalPath: discovered.canonicalPath,
    sourceRoot: discovered.sourceRoot,
    sourceHash: sha256(sourceText),
    generatedPath: '',
    synthetic: false,
    series: inferSeries(parsed.attributes, identifier, discovered.source.key),
    seriesPosition: inferSeriesPosition(parsed.attributes, identifier),
    seriesTotal: inferSeriesTotal(parsed.attributes),
    seriesInfo: undefined,
    tags: normalizeStringArray(parsed.attributes.tags),
    references: [
      ...new Set([
        ...normalizeStringArray(parsed.attributes.references),
        ...normalizeStringArray(parsed.attributes.relationships?.references),
        ...normalizeStringArray(parsed.attributes.relationships?.depends_on),
        ...normalizeStringArray(parsed.attributes.relationships?.enables),
        ...normalizeStringArray(parsed.attributes.related),
      ].map((entry) => entry.toUpperCase())),
    ].sort(),
    referencedBy: [],
    related: normalizeRelated(parsed.attributes.related, parsed.attributes),
    relationships: { outgoing: [], incoming: [] },
    publication:
      discovered.source.kind === 'journal-entry'
        ? normalizePublicationMetadata(
            parsed.attributes,
            parsed.body,
            buildingMonadSeries.wordsPerMinute,
          )
        : undefined,
    repository:
      discovered.source.kind === 'journal-entry'
        ? normalizeRepositoryState(parsed.attributes)
        : undefined,
    body,
    source: discovered.source,
    relativePath: discovered.relativePath,
    absolutePath: discovered.absolutePath,
    repositoryRoot,
    attributes: parsed.attributes,
  };
  document.aliases = collectRouteAliases(
    parsed.attributes,
    previousEntry,
    route,
    issues,
    discovered.canonicalPath,
  );
  validateIdentifierAndLifecycle(document, previousEntry, issues);
  document.generatedPath = generatedRelativePath(document);
  return document;
}

function sortIssues(issues) {
  issues.sort((left, right) => {
    const severityOrder = left.severity === right.severity ? 0 : left.severity === 'error' ? -1 : 1;
    const pathOrder = (left.canonicalPath ?? '').localeCompare(right.canonicalPath ?? '');
    return severityOrder || pathOrder || left.code.localeCompare(right.code);
  });
}

export async function syncContent(options = {}) {
  const siteRoot = resolve(options.siteRoot ?? defaultSiteRoot);
  const repositoryRoot = resolveRepositoryRoot(siteRoot, options.repositoryRoot);
  const write = options.write ?? true;
  const strict = options.strict ?? false;
  const issues = [];
  const documents = [];
  const previousRegistry = await loadPreviousRegistry(siteRoot);
  const previousById = new Map(
    (previousRegistry?.documents ?? [])
      .filter((document) => !document.synthetic)
      .map((document) => [document.id, document]),
  );

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
      const document = await normalizeDocument(repositoryRoot, discovered, previousById, issues);
      if (document) documents.push(document);
    }
  }

  const routeByAbsolutePath = new Map(
    documents.map((document) => [normalizePath(normalize(document.absolutePath)), document]),
  );
  const knownIdentifiers = new Set(documents.map((document) => document.id));

  for (const document of documents) {
    document.body = rewriteDocumentLinks(document, document.body, routeByAbsolutePath, issues);
    const bodyReferences = extractIdentifiers(document.body).filter(
      (identifier) => identifier !== document.id && knownIdentifiers.has(identifier),
    );
    document.references = [...new Set([...document.references, ...bodyReferences])].sort();
  }

  const series = validateSeries(documents, issues);
  buildRelationshipGraph(documents, issues);

  // Build a provisional synthetic set so aliases are validated against every
  // public route, including generated registry and collection pages.
  const provisionalSynthetic = createSyntheticIndexes(documents, publicationContentSources, {
    series,
    issues,
  });
  const provisionalDocuments = [...documents, ...provisionalSynthetic];
  assertUnique(provisionalDocuments, issues);
  const redirects = validateAliases(provisionalDocuments, issues);
  sortIssues(issues);

  // Rebuild governance indexes after validation so their human-readable
  // counts and issue lists reflect the final diagnostics.
  const syntheticDocuments = createSyntheticIndexes(documents, publicationContentSources, {
    series,
    issues,
  });
  for (const synthetic of syntheticDocuments) {
    validateIdentifierAndLifecycle(synthetic, undefined, issues);
  }
  const allDocuments = [...documents, ...syntheticDocuments];

  const errorCount = issues.filter((entry) => entry.severity === 'error').length;
  const warningCount = issues.filter((entry) => entry.severity === 'warning').length;
  const registry = {
    schemaVersion: 2,
    contractVersion: contentContractVersion,
    generatedAt: new Date().toISOString(),
    documentCount: allDocuments.length,
    canonicalDocumentCount: documents.length,
    syntheticDocumentCount: syntheticDocuments.length,
    warningCount,
    errorCount,
    families: serializableIdentifierFamilies(),
    series,
    redirects,
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
    `${mode}: ${registry.canonicalDocumentCount ?? registry.documentCount} canonical document(s), ` +
      `${registry.series?.length ?? 0} series, ${registry.redirects?.length ?? 0} redirect(s), ` +
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
