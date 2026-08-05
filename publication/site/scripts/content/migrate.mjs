import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { serializeFrontmatter } from './lib/frontmatter.mjs';
import { syncContent } from './sync.mjs';

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');

function suggestedMetadata(document) {
  const attributes = document.attributes ?? {};
  const suggestion = {};
  if (!attributes.id) suggestion.id = document.id;
  if (!attributes.title) suggestion.title = document.title;
  if (!attributes.status) suggestion.status = document.status;
  if (!attributes.series && document.series) suggestion.series = document.series;
  if (
    attributes.series_position === undefined &&
    attributes.seriesPosition === undefined &&
    document.seriesPosition
  ) {
    suggestion.series_position = document.seriesPosition;
  }
  if (
    attributes.series_total === undefined &&
    attributes.seriesTotal === undefined &&
    document.seriesTotal
  ) {
    suggestion.series_total = document.seriesTotal;
  }
  if (!attributes.aliases && document.aliases?.length > 0) suggestion.aliases = document.aliases;
  return suggestion;
}

function renderPlan(entries) {
  const lines = [
    '# Monad canonical frontmatter migration plan',
    '',
    'This report is advisory. It does not modify canonical documents.',
    '',
    `Documents with suggested additions: ${entries.length}`,
    '',
  ];

  for (const entry of entries) {
    lines.push(
      `## ${entry.document.id} — ${entry.document.title}`,
      '',
      `Canonical path: \`${entry.document.canonicalPath}\``,
      '',
      'Suggested missing metadata:',
      '',
      '```yaml',
      serializeFrontmatter(entry.suggestion).replace(/^---\n|\n---\n$/g, '').trim(),
      '```',
      '',
    );
  }

  if (entries.length === 0) lines.push('No missing governed metadata was detected.', '');
  return lines.join('\n');
}

const check = process.argv.includes('--check');
try {
  const result = await syncContent({ write: false });
  const entries = result.documents
    .filter((document) => !document.synthetic)
    .map((document) => ({ document, suggestion: suggestedMetadata(document) }))
    .filter(({ suggestion }) => Object.keys(suggestion).length > 0);

  const outputRoot = join(siteRoot, '.generated', 'migrations');
  await mkdir(outputRoot, { recursive: true });
  await writeFile(join(outputRoot, 'frontmatter-plan.md'), renderPlan(entries), 'utf8');
  await writeFile(
    join(outputRoot, 'frontmatter-plan.json'),
    `${JSON.stringify(
      entries.map(({ document, suggestion }) => ({
        id: document.id,
        canonicalPath: document.canonicalPath,
        suggestion,
      })),
      null,
      2,
    )}\n`,
    'utf8',
  );

  console.log(`Frontmatter migration plan: ${entries.length} document(s) need metadata additions.`);
  console.log('See .generated/migrations/frontmatter-plan.md.');
  if (check && entries.length > 0) process.exitCode = 1;
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
