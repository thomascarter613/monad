import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createTarGzip } from './lib/archive.mjs';
import { collectDocumentAssets } from './lib/assets.mjs';
import { publicationServer } from './lib/server.mjs';

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const repositoryRoot = resolve(siteRoot, '..', '..');
const generatedManifestPath = resolve(siteRoot, '.generated', 'registry', 'editions.json');
const allowedFormats = new Set(['pdf', 'epub', 'offline', 'source']);

function argumentsFrom(argv) {
  const options = {
    edition: 'complete',
    formats: ['pdf', 'epub', 'offline', 'source'],
    articlePdfs: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === '--edition') options.edition = argv[++index];
    else if (value === '--version') options.version = argv[++index];
    else if (value === '--formats') {
      options.formats = argv[++index]
        .split(',')
        .map((entry) => entry.trim())
        .filter(Boolean);
    } else if (value === '--base-url') options.baseUrl = argv[++index];
    else if (value === '--output') options.output = argv[++index];
    else if (value === '--port') options.port = Number(argv[++index]);
    else if (value === '--article-pdfs') options.articlePdfs = true;
    else if (value === '--help' || value === '-h') options.help = true;
    else throw new Error(`Unknown publication-build option: ${value}`);
  }
  const unsupported = options.formats.filter((format) => !allowedFormats.has(format));
  if (unsupported.length > 0) {
    throw new Error(`Unsupported publication format(s): ${unsupported.join(', ')}`);
  }
  if (options.formats.length === 0) throw new Error('Select at least one publication format.');
  if (options.port !== undefined && (!Number.isInteger(options.port) || options.port < 1)) {
    throw new Error(`Invalid publication server port: ${options.port}`);
  }
  return options;
}

function usage() {
  console.log(
    `Build a reproducible Monad publication edition.\n\nUsage:\n  bun run scripts/publications/build.mjs [options]\n\nOptions:\n  --edition KEY          Edition key (default: complete)\n  --version VALUE        Output version label\n  --formats LIST         pdf,epub,offline,source\n  --article-pdfs         Also generate one PDF per document\n  --base-url URL         Use an already-running production site\n  --port NUMBER          Temporary Next.js server port\n  --output PATH          Output root (default: dist/publications)\n`,
  );
}

function sha256(body) {
  return createHash('sha256').update(body).digest('hex');
}

function safeVersion(value) {
  const normalized = String(value)
    .trim()
    .replace(/^v/, '')
    .replace(/[^a-zA-Z0-9._-]+/g, '-');
  if (!normalized) throw new Error('Edition version cannot be empty.');
  if (/^\.+$/.test(normalized)) {
    throw new Error(`Edition version cannot be a dot-only path segment: ${value}`);
  }
  return normalized;
}

function sourceTimestamp() {
  const raw = process.env.SOURCE_DATE_EPOCH;
  if (raw === undefined || raw === '') return Date.now();
  const epoch = Number(raw);
  if (!Number.isInteger(epoch) || epoch < 0) {
    throw new Error(`SOURCE_DATE_EPOCH must be a non-negative integer, received: ${raw}`);
  }
  return epoch * 1000;
}

function gitValue(args) {
  try {
    return execFileSync('git', args, {
      cwd: repositoryRoot,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
  } catch {
    return undefined;
  }
}

function within(root, candidate) {
  const value = resolve(candidate);
  const base = resolve(root);
  return value === base || value.startsWith(`${base}${sep}`);
}

async function loadEdition(key) {
  const manifest = JSON.parse(await readFile(generatedManifestPath, 'utf8'));
  const edition = manifest.editions.find((entry) => entry.key === key);
  if (!edition) {
    throw new Error(
      `Unknown edition ${key}. Available: ${manifest.editions.map((entry) => entry.key).join(', ')}`,
    );
  }
  return { contractVersion: manifest.contractVersion, edition };
}

async function canonicalEntries(edition) {
  const entries = [];
  for (const document of edition.documents) {
    const source = resolve(repositoryRoot, document.canonicalPath);
    if (!within(repositoryRoot, source)) {
      throw new Error(`Canonical document escapes the repository: ${document.canonicalPath}`);
    }
    const body = await readFile(source);
    entries.push({ name: document.canonicalPath, body });
  }
  entries.push(...(await collectDocumentAssets(repositoryRoot, edition.documents)));
  entries.push({
    name: 'README.md',
    body: `# ${edition.title}\n\n${edition.description}\n\nSource digest: \`${edition.sourceDigest}\`\n\nDocuments are copied from their canonical repository paths.\n`,
  });
  entries.push({ name: 'edition.json', body: `${JSON.stringify(edition, null, 2)}\n` });
  return entries;
}

async function selfContainedHtml(page, edition) {
  const routeMap = Object.fromEntries(
    edition.documents.map((document) => [document.route, `#document-${document.id.toLowerCase()}`]),
  );
  return page.evaluate(async (routes) => {
    const styles = [];
    for (const sheet of Array.from(document.styleSheets)) {
      try {
        styles.push(
          Array.from(sheet.cssRules)
            .map((rule) => rule.cssText)
            .join('\n'),
        );
      } catch {}
    }
    for (const image of Array.from(document.images)) {
      if (!image.src || image.src.startsWith('data:')) continue;
      try {
        const response = await fetch(image.src);
        const blob = await response.blob();
        const dataUrl = await new Promise((resolveData, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolveData(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
        image.src = String(dataUrl);
      } catch {}
    }
    for (const anchor of Array.from(document.querySelectorAll('a[href]'))) {
      const target = new URL(anchor.href, location.href);
      if (target.origin === location.origin && routes[target.pathname]) {
        anchor.href = routes[target.pathname];
      }
    }
    document
      .querySelectorAll(
        'script, link[rel="stylesheet"], link[rel="preload"], link[rel="modulepreload"]',
      )
      .forEach((node) => {
        node.remove();
      });
    const style = document.createElement('style');
    style.textContent = styles.join('\n');
    document.head.append(style);
    return `<!doctype html>\n${document.documentElement.outerHTML}`;
  }, routeMap);
}

function verifyArtifactSignature(format, body, filename) {
  if (
    (format === 'pdf' || format === 'article-pdf') &&
    !body.subarray(0, 5).equals(Buffer.from('%PDF-'))
  ) {
    throw new Error(`Invalid PDF signature: ${filename}`);
  }
  if (format === 'epub' && !(body[0] === 0x50 && body[1] === 0x4b)) {
    throw new Error(`Invalid EPUB ZIP signature: ${filename}`);
  }
  if ((format === 'offline' || format === 'source') && !(body[0] === 0x1f && body[1] === 0x8b)) {
    throw new Error(`Invalid gzip signature: ${filename}`);
  }
  if (format === 'manifest') JSON.parse(body.toString('utf8'));
}

async function artifactRecord(format, path, outputRoot) {
  const body = await readFile(path);
  const filename = relative(outputRoot, path).split(sep).join('/');
  verifyArtifactSignature(format, body, filename);
  return {
    format,
    filename,
    bytes: body.length,
    sha256: sha256(body),
  };
}

async function preparePage(browser, url, selector) {
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'load' });
  await page.locator(selector).waitFor();
  await page.evaluate(async () => {
    if ('fonts' in document) await document.fonts.ready;
  });
  return page;
}

async function main() {
  const options = argumentsFrom(process.argv.slice(2));
  if (options.help) return usage();
  const { contractVersion, edition } = await loadEdition(options.edition);
  const version = safeVersion(
    options.version ?? process.env.MONAD_EDITION_VERSION ?? edition.defaultVersion,
  );
  const outputRoot = resolve(siteRoot, options.output ?? 'dist/publications', edition.key, version);
  await rm(outputRoot, { recursive: true, force: true });
  await mkdir(outputRoot, { recursive: true });
  const timestamp = sourceTimestamp();
  const baseName = `${edition.key}-${version}`;
  const artifacts = [];
  const formats = new Set(options.formats);

  const sourceEntries = await canonicalEntries(edition);
  if (formats.has('source')) {
    const path = join(outputRoot, `${baseName}-source.tar.gz`);
    await writeFile(path, createTarGzip(sourceEntries, { mtime: timestamp }));
    artifacts.push(await artifactRecord('source', path, outputRoot));
  }

  const needsServer = ['pdf', 'epub', 'offline'].some((format) => formats.has(format));
  const needsBrowser = formats.has('pdf') || formats.has('offline');
  let server;
  let browser;
  let chromiumVersion;
  try {
    if (needsServer) {
      server = await publicationServer({
        siteRoot,
        baseUrl: options.baseUrl,
        port: options.port,
      });
    }
    if (needsBrowser) {
      const { chromium } = await import('@playwright/test');
      browser = await chromium.launch();
      chromiumVersion = browser.version();
    }

    if (formats.has('pdf')) {
      const page = await preparePage(
        browser,
        `${server.baseUrl}/editions/${edition.key}/print`,
        '.monad-edition-print',
      );
      const path = join(outputRoot, `${baseName}.pdf`);
      await page.pdf({
        path,
        format: edition.paper.format,
        margin: edition.paper.margin,
        printBackground: true,
        preferCSSPageSize: true,
        tagged: true,
        outline: true,
        displayHeaderFooter: true,
        headerTemplate: `<div style="font-size:8px;width:100%;padding:0 0.55in;color:#555;display:flex;justify-content:space-between"><span>${edition.title}</span><span>${version}</span></div>`,
        footerTemplate:
          '<div style="font-size:8px;width:100%;padding:0 0.55in;color:#555;text-align:center"><span class="pageNumber"></span> / <span class="totalPages"></span></div>',
      });
      await page.close();
      artifacts.push(await artifactRecord('pdf', path, outputRoot));

      if (options.articlePdfs) {
        const articleRoot = join(outputRoot, 'articles');
        await mkdir(articleRoot, { recursive: true });
        for (const document of edition.documents) {
          const article = await preparePage(
            browser,
            `${server.baseUrl}/editions/${edition.key}/print?document=${encodeURIComponent(document.id)}`,
            '.monad-edition-print__document',
          );
          const articlePath = join(articleRoot, `${document.id.toLowerCase()}-${version}.pdf`);
          await article.pdf({
            path: articlePath,
            format: edition.paper.format,
            margin: edition.paper.margin,
            printBackground: true,
            preferCSSPageSize: true,
            tagged: true,
            outline: true,
          });
          await article.close();
          artifacts.push(await artifactRecord('article-pdf', articlePath, outputRoot));
        }
      }
    }

    if (formats.has('epub')) {
      const response = await fetch(`${server.baseUrl}/editions/${edition.key}/epub`, {
        headers: process.env.MONAD_EDITION_EXPORT_SECRET
          ? { Authorization: `Bearer ${process.env.MONAD_EDITION_EXPORT_SECRET}` }
          : {},
      });
      if (!response.ok) {
        throw new Error(`EPUB export failed: ${response.status} ${await response.text()}`);
      }
      const path = join(outputRoot, `${baseName}.epub`);
      await writeFile(path, Buffer.from(await response.arrayBuffer()));
      artifacts.push(await artifactRecord('epub', path, outputRoot));
    }

    if (formats.has('offline')) {
      const page = await preparePage(
        browser,
        `${server.baseUrl}/editions/${edition.key}/print`,
        '.monad-edition-print',
      );
      const html = await selfContainedHtml(page, edition);
      await page.close();
      const entries = [
        { name: 'index.html', body: html },
        ...sourceEntries,
        { name: 'README.txt', body: `${edition.title}\n\nOpen index.html in a modern browser.\n` },
      ];
      const path = join(outputRoot, `${baseName}-offline.tar.gz`);
      await writeFile(path, createTarGzip(entries, { mtime: timestamp }));
      artifacts.push(await artifactRecord('offline', path, outputRoot));
    }
  } finally {
    if (browser) await browser.close();
    if (server) await server.close();
  }

  const repositoryCommit = gitValue(['rev-parse', 'HEAD']);
  const repositoryStatus = gitValue(['status', '--porcelain']);
  const manifest = {
    schemaVersion: 1,
    editionContractVersion: contractVersion,
    edition: edition.key,
    title: edition.title,
    version,
    generatedAt: new Date(timestamp).toISOString(),
    sourceDateEpoch: process.env.SOURCE_DATE_EPOCH
      ? Number(process.env.SOURCE_DATE_EPOCH)
      : undefined,
    sourceDigest: edition.sourceDigest,
    repository: {
      commit: repositoryCommit,
      dirty: repositoryStatus === undefined ? undefined : repositoryStatus.length > 0,
    },
    toolchain: {
      node: process.version,
      bun: process.versions.bun,
      playwright: '1.62.1',
      chromium: chromiumVersion,
    },
    documents: edition.documents,
    artifacts,
  };
  const manifestPath = join(outputRoot, `${baseName}-manifest.json`);
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  artifacts.push(await artifactRecord('manifest', manifestPath, outputRoot));
  const sums = artifacts
    .sort((left, right) => left.filename.localeCompare(right.filename))
    .map((artifact) => `${artifact.sha256}  ${artifact.filename}`)
    .join('\n');
  await writeFile(join(outputRoot, 'SHA256SUMS.txt'), `${sums}\n`);
  console.log(`Built ${edition.title} ${version}`);
  console.log(`Output: ${outputRoot}`);
  for (const artifact of artifacts) {
    console.log(`  ${artifact.format.padEnd(12)} ${artifact.filename}`);
  }
}

await main();
