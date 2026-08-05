import { readFile } from 'node:fs/promises';
import { join, posix } from 'node:path';
import {
  lifecycleTransitions,
  relationshipTargetKinds,
  resolveIdentifierFamily,
} from '../../../content.families.mjs';
import { normalizeStringArray, slugifySegment } from './normalize.mjs';

const RESERVED_APPLICATION_ROUTES = new Set([
  '/',
  '/start',
  '/editions',
  '/system',
  '/project',
  '/api/search',
  '/api/registry',
  '/api/navigation',
  '/api/building-monad',
  '/api/exploration',
  '/api/editions',
]);

const RELATIONSHIP_KINDS = new Set([
  'references',
  'articles',
  'decisions',
  'specifications',
  'architecture',
  'research',
  'engineering',
  'knowledge',
  'supersedes',
  'supersededBy',
]);

function issue(severity, code, message, canonicalPath) {
  return { severity, code, message, canonicalPath };
}

export async function loadPreviousRegistry(siteRoot) {
  try {
    const registry = JSON.parse(
      await readFile(join(siteRoot, '.generated', 'registry', 'documents.json'), 'utf8'),
    );
    return registry && Array.isArray(registry.documents) ? registry : null;
  } catch {
    return null;
  }
}

export function normalizeRouteAlias(value) {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.includes('?') || trimmed.includes('#')) return null;
  if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed) || trimmed.startsWith('//')) return null;

  const segments = trimmed
    .replace(/^\/+|\/+$/g, '')
    .split('/')
    .filter(Boolean)
    .map(slugifySegment);
  if (segments.length === 0) return '/';
  return `/${posix.join(...segments)}`;
}

export function collectRouteAliases(attributes, previousEntry, route, issues, canonicalPath) {
  const candidates = [
    ...normalizeStringArray(attributes.aliases),
    ...normalizeStringArray(attributes.redirect_from),
    ...normalizeStringArray(attributes.redirectFrom),
  ];

  if (previousEntry?.route && previousEntry.route !== route) candidates.push(previousEntry.route);
  if (Array.isArray(previousEntry?.aliases)) candidates.push(...previousEntry.aliases);

  const aliases = [];
  for (const candidate of candidates) {
    const normalized = normalizeRouteAlias(candidate);
    if (!normalized) {
      issues.push(
        issue(
          'warning',
          'CONTENT_ALIAS_INVALID',
          `Route alias ${JSON.stringify(candidate)} is not a valid internal pathname.`,
          canonicalPath,
        ),
      );
      continue;
    }
    if (normalized === route) continue;
    if (!aliases.includes(normalized)) aliases.push(normalized);
  }
  return aliases.sort();
}

export function validateIdentifierAndLifecycle(document, previousEntry, issues) {
  if (document.synthetic) {
    document.family = 'collection';
    document.lifecycle = {
      previousStatus: previousEntry?.status,
      allowedNextStatuses: ['published'],
    };
    return;
  }

  const family = resolveIdentifierFamily(document.id);
  document.family = family?.key ?? 'untracked';

  if (family) {
    if (!family.kinds.includes(document.kind)) {
      issues.push(
        issue(
          'error',
          'CONTENT_IDENTIFIER_KIND_MISMATCH',
          `${document.id} belongs to identifier family ${family.key}, which does not permit kind ${document.kind}.`,
          document.canonicalPath,
        ),
      );
    }
    if (!family.statuses.includes(document.status)) {
      issues.push(
        issue(
          'error',
          'CONTENT_STATUS_NOT_PERMITTED',
          `Status ${document.status} is not permitted for identifier family ${family.key}.`,
          document.canonicalPath,
        ),
      );
    }
    if (!previousEntry && !family.initialStatuses.includes(document.status)) {
      issues.push(
        issue(
          'warning',
          'CONTENT_LIFECYCLE_UNUSUAL_INITIAL_STATUS',
          `${document.id} enters the registry with status ${document.status}; expected one of ${family.initialStatuses.join(', ')}.`,
          document.canonicalPath,
        ),
      );
    }
  }

  const transitions = lifecycleTransitions[document.kind]?.[previousEntry?.status ?? document.status];
  const allowedNextStatuses = lifecycleTransitions[document.kind]?.[document.status] ?? [document.status];
  document.lifecycle = {
    previousStatus: previousEntry?.status,
    allowedNextStatuses,
  };

  if (previousEntry && previousEntry.status !== document.status) {
    const previousAllowed = lifecycleTransitions[document.kind]?.[previousEntry.status] ?? [];
    if (!previousAllowed.includes(document.status)) {
      issues.push(
        issue(
          'error',
          'CONTENT_LIFECYCLE_TRANSITION_INVALID',
          `${document.id} cannot transition from ${previousEntry.status} to ${document.status}. Allowed transitions: ${previousAllowed.join(', ') || 'none'}.`,
          document.canonicalPath,
        ),
      );
    }
  }

  if (!transitions && previousEntry?.status) {
    issues.push(
      issue(
        'warning',
        'CONTENT_LIFECYCLE_PREVIOUS_STATUS_UNKNOWN',
        `Previous status ${previousEntry.status} is not recognized for kind ${document.kind}.`,
        document.canonicalPath,
      ),
    );
  }
}

function relationRecords(document) {
  const records = [];
  for (const targetId of document.references ?? []) {
    records.push({ kind: 'references', targetId, explicit: false });
  }

  for (const [kind, targetIds] of Object.entries(document.related ?? {})) {
    if (!RELATIONSHIP_KINDS.has(kind)) continue;
    for (const targetId of targetIds) {
      records.push({ kind, targetId: String(targetId).toUpperCase(), explicit: true });
    }
  }

  const deduplicated = new Map();
  for (const record of records) {
    const key = `${record.kind}:${record.targetId}`;
    const existing = deduplicated.get(key);
    if (!existing || record.explicit) deduplicated.set(key, record);
  }
  return [...deduplicated.values()];
}

function detectSupersessionCycles(documentsById, issues) {
  const visiting = new Set();
  const visited = new Set();

  function visit(document, stack) {
    if (visited.has(document.id)) return;
    if (visiting.has(document.id)) {
      const cycleStart = stack.indexOf(document.id);
      const cycle = [...stack.slice(cycleStart), document.id];
      issues.push(
        issue(
          'error',
          'CONTENT_SUPERSESSION_CYCLE',
          `Supersession cycle detected: ${cycle.join(' -> ')}.`,
          document.canonicalPath,
        ),
      );
      return;
    }

    visiting.add(document.id);
    const targets = document.relationships?.outgoing
      ?.filter((edge) => edge.kind === 'supersedes')
      .map((edge) => documentsById.get(edge.id))
      .filter(Boolean) ?? [];
    for (const target of targets) visit(target, [...stack, document.id]);
    visiting.delete(document.id);
    visited.add(document.id);
  }

  for (const document of documentsById.values()) visit(document, []);
}

export function buildRelationshipGraph(documents, issues) {
  const canonicalDocuments = documents.filter((document) => !document.synthetic);
  const documentsById = new Map(canonicalDocuments.map((document) => [document.id, document]));

  for (const document of documents) {
    document.relationships = { outgoing: [], incoming: [] };
    document.referencedBy = [];
  }

  for (const document of canonicalDocuments) {
    for (const relation of relationRecords(document)) {
      if (relation.targetId === document.id) {
        issues.push(
          issue(
            'error',
            'CONTENT_RELATION_SELF_REFERENCE',
            `${document.id} cannot relate to itself with relationship ${relation.kind}.`,
            document.canonicalPath,
          ),
        );
        continue;
      }

      const target = documentsById.get(relation.targetId);
      if (!target) {
        const severity = relation.kind === 'supersedes' || relation.kind === 'supersededBy'
          ? 'error'
          : 'warning';
        issues.push(
          issue(
            severity,
            'CONTENT_RELATION_TARGET_MISSING',
            `${document.id} declares ${relation.kind} -> ${relation.targetId}, but the target is not in the publication registry.`,
            document.canonicalPath,
          ),
        );
        continue;
      }

      const expectedKinds = relationshipTargetKinds[relation.kind];
      if (expectedKinds && !expectedKinds.includes(target.kind)) {
        issues.push(
          issue(
            'warning',
            'CONTENT_RELATION_KIND_MISMATCH',
            `${relation.kind} normally targets ${expectedKinds.join(' or ')}, but ${target.id} is ${target.kind}.`,
            document.canonicalPath,
          ),
        );
      }

      if (
        (relation.kind === 'supersedes' || relation.kind === 'supersededBy') &&
        document.kind !== target.kind
      ) {
        issues.push(
          issue(
            'error',
            'CONTENT_SUPERSESSION_KIND_MISMATCH',
            `${document.id} and ${target.id} must have the same kind to participate in supersession.`,
            document.canonicalPath,
          ),
        );
        continue;
      }

      const outgoing = {
        kind: relation.kind,
        id: target.id,
        title: target.title,
        route: target.route,
        explicit: relation.explicit,
      };
      const incomingKind = relation.kind === 'supersedes'
        ? 'supersededBy'
        : relation.kind === 'supersededBy'
          ? 'supersedes'
          : relation.kind;
      const incoming = {
        kind: incomingKind,
        id: document.id,
        title: document.title,
        route: document.route,
        explicit: relation.explicit,
      };
      document.relationships.outgoing.push(outgoing);
      target.relationships.incoming.push(incoming);
    }
  }

  for (const document of canonicalDocuments) {
    document.relationships.outgoing.sort((left, right) =>
      left.kind.localeCompare(right.kind) || left.id.localeCompare(right.id));
    document.relationships.incoming.sort((left, right) =>
      left.kind.localeCompare(right.kind) || left.id.localeCompare(right.id));
    document.referencedBy = document.relationships.incoming
      .filter((edge) => edge.kind === 'references')
      .map((edge) => edge.id);

    const supersedes = document.relationships.outgoing.filter((edge) => edge.kind === 'supersedes');
    if (supersedes.length > 0 && !['accepted', 'active', 'published'].includes(document.status)) {
      issues.push(
        issue(
          'warning',
          'CONTENT_SUPERSESSION_SOURCE_STATUS',
          `${document.id} supersedes another document but has status ${document.status}.`,
          document.canonicalPath,
        ),
      );
    }
    for (const edge of supersedes) {
      const target = documentsById.get(edge.id);
      if (target && !['deprecated', 'superseded', 'archived'].includes(target.status)) {
        issues.push(
          issue(
            'warning',
            'CONTENT_SUPERSESSION_TARGET_STATUS',
            `${target.id} is superseded by ${document.id} but still has status ${target.status}.`,
            target.canonicalPath,
          ),
        );
      }
    }
  }

  detectSupersessionCycles(documentsById, issues);
}

export function validateAliases(documents, issues) {
  const canonicalRoutes = new Map(documents.map((document) => [document.route, document]));
  const aliases = new Map();
  const redirects = [];

  for (const document of documents.filter((entry) => !entry.synthetic)) {
    const accepted = [];
    for (const alias of document.aliases ?? []) {
      if (RESERVED_APPLICATION_ROUTES.has(alias) || alias.startsWith('/api/') || alias.startsWith('/_next/')) {
        issues.push(
          issue(
            'error',
            'CONTENT_ALIAS_RESERVED_ROUTE',
            `Alias ${alias} is reserved by the publication application.`,
            document.canonicalPath,
          ),
        );
        continue;
      }
      const canonicalCollision = canonicalRoutes.get(alias);
      if (canonicalCollision && canonicalCollision.id !== document.id) {
        issues.push(
          issue(
            'error',
            'CONTENT_ALIAS_CANONICAL_COLLISION',
            `Alias ${alias} collides with canonical route for ${canonicalCollision.id}.`,
            document.canonicalPath,
          ),
        );
        continue;
      }
      const aliasCollision = aliases.get(alias);
      if (aliasCollision && aliasCollision.id !== document.id) {
        issues.push(
          issue(
            'error',
            'CONTENT_ALIAS_DUPLICATE',
            `Alias ${alias} is already owned by ${aliasCollision.id}.`,
            document.canonicalPath,
          ),
        );
        continue;
      }
      aliases.set(alias, document);
      accepted.push(alias);
      redirects.push({ source: alias, destination: document.route, permanent: true, id: document.id });
    }
    document.aliases = accepted.sort();
  }

  redirects.sort((left, right) => left.source.localeCompare(right.source));
  return redirects;
}

export function validateSeries(documents, issues) {
  const groups = new Map();
  for (const document of documents.filter((entry) => !entry.synthetic && entry.series)) {
    if (!groups.has(document.series)) groups.set(document.series, []);
    groups.get(document.series).push(document);
  }

  const seriesRegistry = [];
  for (const [key, members] of [...groups.entries()].sort(([left], [right]) => left.localeCompare(right))) {
    const positioned = members.filter((member) => Number.isInteger(member.seriesPosition));
    const positionOwners = new Map();
    const explicitTotals = new Set(
      members.filter((member) => Number.isInteger(member.seriesTotal)).map((member) => member.seriesTotal),
    );

    for (const member of positioned) {
      const previous = positionOwners.get(member.seriesPosition);
      if (previous) {
        issues.push(
          issue(
            'error',
            'CONTENT_SERIES_POSITION_DUPLICATE',
            `Series ${key} position ${member.seriesPosition} is used by both ${previous.id} and ${member.id}.`,
            member.canonicalPath,
          ),
        );
      } else {
        positionOwners.set(member.seriesPosition, member);
      }
    }

    if (explicitTotals.size > 1) {
      issues.push(
        issue(
          'error',
          'CONTENT_SERIES_TOTAL_CONFLICT',
          `Series ${key} declares conflicting totals: ${[...explicitTotals].sort((a, b) => a - b).join(', ')}.`,
        ),
      );
    }

    const maxPosition = positioned.reduce((max, member) => Math.max(max, member.seriesPosition), 0);
    const explicitTotal = [...explicitTotals][0];
    const total = explicitTotal ?? (maxPosition || members.length);

    if (explicitTotal && maxPosition > explicitTotal) {
      issues.push(
        issue(
          'error',
          'CONTENT_SERIES_POSITION_EXCEEDS_TOTAL',
          `Series ${key} contains position ${maxPosition}, exceeding declared total ${explicitTotal}.`,
        ),
      );
    }

    if (positioned.length > 0) {
      const missing = [];
      for (let position = 1; position <= maxPosition; position += 1) {
        if (!positionOwners.has(position)) missing.push(position);
      }
      if (missing.length > 0) {
        issues.push(
          issue(
            'warning',
            'CONTENT_SERIES_POSITION_GAP',
            `Series ${key} is missing position${missing.length === 1 ? '' : 's'} ${missing.join(', ')}.`,
          ),
        );
      }
    }

    const ordered = [...members].sort((left, right) => {
      const leftPosition = left.seriesPosition ?? Number.MAX_SAFE_INTEGER;
      const rightPosition = right.seriesPosition ?? Number.MAX_SAFE_INTEGER;
      return leftPosition - rightPosition || left.id.localeCompare(right.id);
    });

    for (let index = 0; index < ordered.length; index += 1) {
      const member = ordered[index];
      member.seriesInfo = {
        key,
        position: member.seriesPosition,
        total,
        previousId: ordered[index - 1]?.id,
        previousTitle: ordered[index - 1]?.title,
        previousRoute: ordered[index - 1]?.route,
        nextId: ordered[index + 1]?.id,
        nextTitle: ordered[index + 1]?.title,
        nextRoute: ordered[index + 1]?.route,
      };
    }

    seriesRegistry.push({
      key,
      total,
      documentCount: members.length,
      documents: ordered.map((member) => ({
        id: member.id,
        title: member.title,
        route: member.route,
        position: member.seriesPosition,
        status: member.status,
      })),
    });
  }

  return seriesRegistry;
}
