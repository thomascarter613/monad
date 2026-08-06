import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const registryPath = resolve(siteRoot, '.generated', 'registry', 'documents.json');
const navigationPath = resolve(siteRoot, '.generated', 'registry', 'navigation.json');
const buildingMonadPath = resolve(siteRoot, '.generated', 'registry', 'building-monad.json');
const explorationPath = resolve(siteRoot, '.generated', 'registry', 'exploration.json');
const discoveryPath = resolve(siteRoot, '.generated', 'registry', 'discovery.json');
const editionsPath = resolve(siteRoot, '.generated', 'registry', 'editions.json');
const flags = new Set(process.argv.slice(2));

function printSummary(registry) {
  console.log(`Contract:    ${registry.contractVersion ?? 'legacy'}`);
  console.log(`Documents:   ${registry.canonicalDocumentCount ?? registry.documentCount}`);
  console.log(`Generated:   ${registry.syntheticDocumentCount ?? 0}`);
  console.log(`Series:      ${registry.series?.length ?? 0}`);
  console.log(`Redirects:   ${registry.redirects?.length ?? 0}`);
  console.log(`Warnings:    ${registry.warningCount}`);
  console.log(`Errors:      ${registry.errorCount}`);
  console.log('');
}

try {
  const registry = JSON.parse(await readFile(registryPath, 'utf8'));
  if (flags.has('--json')) {
    console.log(JSON.stringify(registry, null, 2));
    process.exit(0);
  }

  printSummary(registry);

  if (flags.has('--issues')) {
    for (const issue of registry.issues) {
      const location = issue.canonicalPath ? ` ${issue.canonicalPath}` : '';
      console.log(`${issue.severity.toUpperCase().padEnd(7)} ${issue.code}${location}`);
      console.log(`        ${issue.message}`);
    }
    process.exit(0);
  }

  if (flags.has('--series')) {
    for (const series of registry.series ?? []) {
      console.log(`${series.key} (${series.documentCount}/${series.total})`);
      for (const document of series.documents) {
        console.log(
          `  ${String(document.position ?? '-').padStart(4)} ${document.id} ${document.route}`,
        );
      }
    }
    process.exit(0);
  }

  if (flags.has('--relationships')) {
    for (const document of registry.documents.filter((entry) => !entry.synthetic)) {
      const outgoing = document.relationships?.outgoing ?? [];
      const incoming = document.relationships?.incoming ?? [];
      if (outgoing.length === 0 && incoming.length === 0) continue;
      console.log(`${document.id}`);
      for (const edge of outgoing) console.log(`  -> ${edge.kind.padEnd(14)} ${edge.id}`);
      for (const edge of incoming) console.log(`  <- ${edge.kind.padEnd(14)} ${edge.id}`);
    }
    process.exit(0);
  }

  if (flags.has('--building-monad')) {
    const manifest = JSON.parse(await readFile(buildingMonadPath, 'utf8'));
    console.log(`Building Monad experience: ${manifest.experienceVersion}`);
    console.log(`Installments: ${manifest.installmentCount}/${manifest.total}`);
    console.log(`Published:    ${manifest.publishedCount}`);
    console.log(`Current:      ${manifest.currentId ?? 'none'}`);
    console.log('');
    for (const phase of manifest.phases) {
      console.log(`${phase.title} (${phase.installments.length})`);
      for (const id of phase.installments) {
        const installment = manifest.installments.find((entry) => entry.id === id);
        if (!installment) continue;
        console.log(
          `  ${String(installment.position).padStart(4)} ${installment.id} ${String(installment.estimatedReadingMinutes).padStart(3)} min ${installment.route}`,
        );
      }
    }
    process.exit(0);
  }

  if (flags.has('--exploration')) {
    const exploration = JSON.parse(await readFile(explorationPath, 'utf8'));
    console.log(`Exploration schema: ${exploration.schemaVersion}`);
    console.log(`Documents:          ${exploration.documentCount}`);
    console.log(`Connected:          ${exploration.connectedDocumentCount}`);
    console.log(`Relationships:      ${exploration.relationshipCount}`);
    console.log(`Supersession:       ${exploration.supersessionChains.length} chain(s)`);
    console.log(`Timeline:           ${exploration.timeline.eventCount} dated event(s)`);
    console.log(`Undated:            ${exploration.timeline.undatedDocumentCount} document(s)`);
    console.log('');
    for (const series of exploration.series) {
      console.log(
        `${series.key.padEnd(24)} ${String(series.documentCount).padStart(4)}/${String(series.total).padEnd(4)} ${String(series.completionPercent).padStart(3)}%`,
      );
    }
    process.exit(0);
  }

  if (flags.has('--discovery')) {
    const discovery = JSON.parse(await readFile(discoveryPath, 'utf8'));
    console.log(`Discovery schema:   ${discovery.schemaVersion}`);
    console.log(`Documents:          ${discovery.documentCount}`);
    console.log(`Canonical:          ${discovery.canonicalDocumentCount}`);
    console.log('');
    for (const [name, values] of Object.entries(discovery.facets)) {
      console.log(`${name}:`);
      for (const value of values.slice(0, 12)) {
        console.log(`  ${String(value.count).padStart(4)} ${value.value}`);
      }
    }
    process.exit(0);
  }

  if (flags.has('--editions')) {
    const manifest = JSON.parse(await readFile(editionsPath, 'utf8'));
    console.log(`Edition contract: ${manifest.contractVersion}`);
    console.log(`Editions:         ${manifest.editionCount}`);
    console.log('');
    for (const edition of manifest.editions) {
      console.log(
        `${edition.key.padEnd(18)} ${String(edition.documentCount).padStart(4)} document(s)  ${edition.sourceDigest.slice(0, 12)}`,
      );
      console.log(`  ${edition.title}`);
      console.log(`  formats: ${edition.formats.join(', ')}`);
    }
    process.exit(0);
  }

  if (flags.has('--navigation')) {
    const navigation = JSON.parse(await readFile(navigationPath, 'utf8'));
    console.log(`Information architecture: ${navigation.informationArchitectureVersion}`);
    console.log('');
    for (const route of navigation.routes) {
      const marker = route.available ? 'active' : 'empty ';
      console.log(
        `${marker} ${route.route.padEnd(34)} ${String(route.documentCount).padStart(4)} canonical`,
      );
    }
    console.log('');
    for (const path of navigation.readingPaths) {
      console.log(path.title);
      for (const [index, step] of path.steps.entries()) {
        console.log(`  ${index + 1}. ${step.available ? '✓' : '·'} ${step.route} — ${step.title}`);
      }
    }
    process.exit(0);
  }

  for (const document of registry.documents) {
    const marker = document.synthetic ? 'generated' : document.kind;
    const family = document.family ? `/${document.family}` : '';
    console.log(
      `${document.id.padEnd(26)} ${(marker + family).padEnd(28)} ${document.status.padEnd(11)} ${document.route}`,
    );
  }
} catch (error) {
  console.error('No generated registry exists. Run `bun run content:sync` first.');
  if (process.env.DEBUG) console.error(error);
  process.exitCode = 1;
}
