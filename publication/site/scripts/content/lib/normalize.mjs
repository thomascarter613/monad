import { createHash } from 'node:crypto';
import { extname } from 'node:path';

export const DOCUMENT_IDENTIFIER_PATTERN = /\b[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)*-\d{4}\b/g;

export function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}

export function normalizePath(value) {
  return value.replaceAll('\\', '/').replace(/^\.\//, '');
}

export function slugifySegment(value) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'document';
}

export function normalizeSlugOverride(value) {
  if (Array.isArray(value)) return value.map(String).map(slugifySegment).filter(Boolean);
  if (typeof value !== 'string') return null;
  return value.split('/').map(slugifySegment).filter(Boolean);
}

export function deriveSlug(relativePath, override) {
  const overrideSlug = normalizeSlugOverride(override);
  if (overrideSlug) return overrideSlug;

  const normalized = normalizePath(relativePath);
  const extension = extname(normalized);
  const withoutExtension = extension ? normalized.slice(0, -extension.length) : normalized;
  const segments = withoutExtension.split('/').filter(Boolean);
  const leaf = segments.at(-1)?.toLowerCase();

  if (leaf && ['index', 'readme', 'article'].includes(leaf)) segments.pop();
  return segments.map(slugifySegment);
}

export function titleize(value) {
  const withoutExtension = value.replace(/\.(?:md|mdx)$/i, '');
  return withoutExtension
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase())
    .trim();
}

export function cleanHeading(value) {
  return value
    .replace(/\[(.*?)\]\([^)]*\)/g, '$1')
    .replace(/[`*_~]/g, '')
    .replace(/\s+#+\s*$/, '')
    .trim();
}

export function findFirstHeading(body) {
  const match = body.match(/^#\s+(.+)$/m);
  return match ? cleanHeading(match[1]) : null;
}

export function stripMatchingFirstHeading(body, title) {
  const match = body.match(/^#\s+(.+)\n+/m);
  if (!match || match.index === undefined) return body.trimStart();

  const heading = cleanHeading(match[1]);
  const normalizedHeading = heading.toLowerCase();
  const normalizedTitle = title.toLowerCase();
  const equivalent =
    normalizedHeading === normalizedTitle ||
    normalizedHeading.endsWith(`— ${normalizedTitle}`) ||
    normalizedHeading.endsWith(`: ${normalizedTitle}`);

  if (!equivalent) return body.trimStart();
  return `${body.slice(0, match.index)}${body.slice(match.index + match[0].length)}`.trimStart();
}

export function inferTitle(attributes, body, relativePath) {
  if (typeof attributes.title === 'string' && attributes.title.trim()) {
    return attributes.title.trim();
  }

  const heading = findFirstHeading(body);
  if (heading) return heading;

  const normalized = normalizePath(relativePath);
  const parts = normalized.split('/');
  const leaf = parts.at(-1) ?? 'Document';
  const stem = leaf.replace(/\.(?:md|mdx)$/i, '');

  if (['index', 'readme', 'article'].includes(stem.toLowerCase()) && parts.length > 1) {
    return titleize(parts.at(-2) ?? stem);
  }

  return titleize(stem);
}

export function inferDescription(attributes, body, title) {
  for (const key of ['description', 'summary', 'abstract']) {
    const value = attributes[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
  }

  const paragraphs = body
    .replace(/```[\s\S]*?```/g, '')
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(
      (paragraph) =>
        paragraph &&
        !paragraph.startsWith('#') &&
        !paragraph.startsWith('>') &&
        !paragraph.startsWith('|') &&
        !paragraph.startsWith('<!--') &&
        !/^(?:\*\*)?(?:status|date|authors?|created|updated)(?:\*\*)?\s*:/i.test(paragraph),
    );

  const first = paragraphs[0]
    ?.replace(/\[(.*?)\]\([^)]*\)/g, '$1')
    .replace(/[`*_~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!first) return `${title}, published in the Monad Engineering Log.`;
  return first.length > 220 ? `${first.slice(0, 217).trimEnd()}...` : first;
}

export function extractIdentifier(attributes, title, relativePath, body) {
  if (typeof attributes.id === 'string' && attributes.id.trim()) {
    return attributes.id.trim().toUpperCase();
  }

  const candidates = [
    normalizePath(relativePath).replace(/\.(?:md|mdx)$/i, ''),
    title,
    body.slice(0, 1500),
  ];

  for (const candidate of candidates) {
    const match = candidate.match(DOCUMENT_IDENTIFIER_PATTERN);
    if (match?.[0]) return match[0].toUpperCase();
  }

  return null;
}

export function extractIdentifiers(value) {
  return [...new Set((value.toUpperCase().match(DOCUMENT_IDENTIFIER_PATTERN) ?? []).map(String))];
}

export function normalizeStatus(value, kind, body = '') {
  let statusValue = value;
  if (typeof statusValue !== 'string' || !statusValue.trim()) {
    const bodyMatch = body.match(
      /^(?:\*\*)?status(?:\*\*)?\s*:\s*([A-Za-z][A-Za-z -]*)$/im,
    );
    statusValue = bodyMatch?.[1] ?? '';
  }
  const normalized = typeof statusValue === 'string'
    ? statusValue.trim().toLowerCase().replaceAll(' ', '-')
    : '';
  const aliases = {
    approved: 'accepted',
    implemented: 'active',
    complete: 'published',
    completed: 'published',
    final: 'published',
  };
  const resolved = aliases[normalized] ?? normalized;
  const valid = new Set([
    'draft',
    'proposed',
    'accepted',
    'active',
    'deprecated',
    'superseded',
    'published',
    'archived',
  ]);

  if (valid.has(resolved)) return resolved;
  if (kind === 'decision') return 'proposed';
  return 'draft';
}

export function normalizeOptionalString(value) {
  if (typeof value !== 'string') return undefined;
  const normalized = value.trim();
  return normalized || undefined;
}

export function normalizePublicationMetadata(attributes, body, wordsPerMinute = 225) {
  const publication =
    attributes.publication && typeof attributes.publication === 'object' && !Array.isArray(attributes.publication)
      ? attributes.publication
      : {};
  const projectPhase = normalizeOptionalString(
    attributes.projectPhase ??
      attributes.project_phase ??
      attributes.phase ??
      publication.phase,
  );
  const publishedAt = normalizeOptionalString(
    attributes.publishedAt ??
      attributes.published_at ??
      attributes.published ??
      attributes.date ??
      publication.publishedAt ??
      publication.published,
  );
  const updatedAt = normalizeOptionalString(
    attributes.updatedAt ??
      attributes.updated_at ??
      attributes.updated ??
      publication.updatedAt ??
      publication.updated,
  );
  const explicitReadingTime =
    attributes.readingMinutes ??
    attributes.reading_minutes ??
    attributes.readingTime ??
    attributes.reading_time ??
    publication.readingMinutes ??
    publication.readingTime;
  const numericReadingTime = Number(explicitReadingTime);
  const wordCount = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_`~|\[\](){}]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  const estimatedReadingMinutes =
    Number.isFinite(numericReadingTime) && numericReadingTime > 0
      ? Math.max(1, Math.round(numericReadingTime))
      : Math.max(1, Math.ceil(wordCount / Math.max(1, wordsPerMinute)));

  return {
    projectPhase,
    publishedAt,
    updatedAt,
    estimatedReadingMinutes,
    wordCount,
  };
}

export function normalizeRepositoryState(attributes) {
  const nested =
    attributes.repository && typeof attributes.repository === 'object' && !Array.isArray(attributes.repository)
      ? attributes.repository
      : {};
  const commit = normalizeOptionalString(
    nested.commit ?? attributes.repositoryCommit ?? attributes.repository_commit ?? attributes.commit,
  );
  const branch = normalizeOptionalString(
    nested.branch ?? attributes.repositoryBranch ?? attributes.repository_branch ?? attributes.branch,
  );
  const release = normalizeOptionalString(
    nested.release ?? nested.tag ?? attributes.repositoryRelease ?? attributes.repository_release ?? attributes.release,
  );
  const tree = normalizeOptionalString(
    nested.tree ?? nested.path ?? attributes.repositoryTree ?? attributes.repository_tree,
  );
  const command = normalizeOptionalString(
    nested.command ?? attributes.repositoryCommand ?? attributes.repository_command,
  );

  if (!commit && !branch && !release && !tree && !command) return undefined;
  return { commit, branch, release, tree, command };
}

export function normalizeStringArray(value) {
  if (Array.isArray(value)) {
    return [...new Set(value.map(String).map((entry) => entry.trim()).filter(Boolean))];
  }
  if (typeof value === 'string') {
    return [...new Set(value.split(',').map((entry) => entry.trim()).filter(Boolean))];
  }
  return [];
}

export function normalizeRelated(value, attributes = {}) {
  const result = {};
  const relationshipAliases = {
    superseded_by: 'supersededBy',
    supersededBy: 'supersededBy',
    supersedes: 'supersedes',
    articles: 'articles',
    decisions: 'decisions',
    specifications: 'specifications',
    architecture: 'architecture',
    research: 'research',
    engineering: 'engineering',
    knowledge: 'knowledge',
  };

  if (value && typeof value === 'object' && !Array.isArray(value)) {
    for (const [key, entries] of Object.entries(value)) {
      const normalizedKey = relationshipAliases[key] ?? key;
      const normalized = normalizeStringArray(entries).map((entry) => entry.toUpperCase());
      if (normalized.length > 0) result[normalizedKey] = normalized;
    }
  }

  for (const [attributeKey, normalizedKey] of Object.entries(relationshipAliases)) {
    const normalized = normalizeStringArray(attributes[attributeKey]).map((entry) => entry.toUpperCase());
    if (normalized.length === 0) continue;
    result[normalizedKey] = [...new Set([...(result[normalizedKey] ?? []), ...normalized])];
  }

  return result;
}

export function inferSeries(attributes, identifier, sourceKey) {
  if (typeof attributes.series === 'string' && attributes.series.trim()) {
    return attributes.series.trim();
  }
  if (sourceKey === 'building-monad') return 'building-monad';
  if (!identifier || identifier.startsWith('UNTRACKED-')) return undefined;
  return identifier.replace(/-\d{4}$/, '');
}

export function inferSeriesPosition(attributes, identifier) {
  const explicit = attributes.seriesPosition ?? attributes.series_position ?? attributes.position;
  if (Number.isInteger(explicit) && explicit > 0) return explicit;
  if (typeof explicit === 'string' && /^\d+$/.test(explicit)) return Number(explicit);
  const match = identifier?.match(/-(\d{4})$/);
  return match ? Number(match[1]) : undefined;
}

export function inferSeriesTotal(attributes) {
  const explicit = attributes.seriesTotal ?? attributes.series_total;
  if (Number.isInteger(explicit) && explicit > 0) return explicit;
  if (typeof explicit === 'string' && /^\d+$/.test(explicit) && Number(explicit) > 0) {
    return Number(explicit);
  }
  return undefined;
}

export function joinRoute(base, slug) {
  const suffix = slug.join('/');
  return suffix ? `${base}/${suffix}` : base;
}
