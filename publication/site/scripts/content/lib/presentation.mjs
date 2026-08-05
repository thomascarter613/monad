const noteComponents = new Map([
  ['DECISION', 'Decision'],
  ['CONSTRAINT', 'Constraint'],
  ['DESIGN_CONSTRAINT', 'Constraint'],
  ['EXPERIMENT', 'Experiment'],
  ['FAILURE', 'FailureLog'],
  ['FAILURE_LOG', 'FailureLog'],
  ['IMPLEMENTATION', 'ImplementationNote'],
  ['IMPLEMENTATION_NOTE', 'ImplementationNote'],
  ['ACTION', 'RepositoryAction'],
  ['REPOSITORY_ACTION', 'RepositoryAction'],
  ['CHECKPOINT', 'ReaderCheckpoint'],
  ['READER_CHECKPOINT', 'ReaderCheckpoint'],
  ['RESULT', 'Result'],
  ['EVIDENCE', 'VerificationEvidence'],
  ['VERIFICATION_EVIDENCE', 'VerificationEvidence'],
]);

function normalizeMarker(value) {
  return value.trim().toUpperCase().replaceAll('-', '_');
}

function jsxAttribute(value) {
  return JSON.stringify(value);
}

function extractTitle(lines) {
  const copy = [...lines];
  while (copy[0]?.trim() === '') copy.shift();
  const match =
    copy[0]?.match(/^\*\*Title(?::)?\*\*(?::)?\s+(.+)$/i) ??
    copy[0]?.match(/^Title:\s*(.+)$/i);
  if (!match) return { title: undefined, lines };
  copy.shift();
  while (copy[0]?.trim() === '') copy.shift();
  return { title: match[1].trim(), lines: copy };
}

export function transformSemanticBlockquotes(body) {
  const lines = body.split('\n');
  const output = [];

  for (let index = 0; index < lines.length; index += 1) {
    const markerMatch = lines[index].match(/^\s*>\s*\[!([A-Za-z_-]+)\]\s*$/);
    if (!markerMatch) {
      output.push(lines[index]);
      continue;
    }

    const marker = normalizeMarker(markerMatch[1]);
    const component = noteComponents.get(marker);
    const isFigure = marker === 'ARCHITECTURE_FIGURE' || marker === 'FIGURE';
    if (!component && !isFigure) {
      output.push(lines[index]);
      continue;
    }

    const quoted = [];
    let cursor = index + 1;
    while (cursor < lines.length) {
      const line = lines[cursor];
      const quote = line.match(/^\s*> ?(.*)$/);
      if (!quote) break;
      quoted.push(quote[1]);
      cursor += 1;
    }

    const parsed = extractTitle(quoted);
    const content = parsed.lines.join('\n').trim();
    if (isFigure && !parsed.title) {
      output.push(lines[index], ...lines.slice(index + 1, cursor));
      index = cursor - 1;
      continue;
    }

    const titleAttribute = parsed.title ? ` title=${jsxAttribute(parsed.title)}` : '';
    const componentName = isFigure ? 'ArchitectureFigure' : component;
    output.push(`<${componentName}${titleAttribute}>`, '', content, '', `</${componentName}>`);
    index = cursor - 1;
  }

  return output.join('\n');
}

function readMetaValue(meta, key) {
  const quoted = meta.match(new RegExp(`(?:^|\\s)${key}=(?:"([^"]*)"|'([^']*)')`));
  if (quoted) return quoted[1] ?? quoted[2] ?? '';
  const bare = meta.match(new RegExp(`(?:^|\\s)${key}=([^\\s]+)`));
  return bare?.[1];
}

function removeMetaKey(meta, key) {
  return meta
    .replace(new RegExp(`(?:^|\\s)${key}=(?:"[^"]*"|'[^']*'|[^\\s]+)`, 'g'), ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function transformTerminalFences(body) {
  const lines = body.split('\n');
  const output = [];

  for (let index = 0; index < lines.length; index += 1) {
    const opening = lines[index].match(/^(\s*)(`{3,}|~{3,})([A-Za-z0-9_+.-]*)\s*(.*)$/);
    if (!opening || !/(?:^|\s)terminal(?:\s|$)/.test(opening[4])) {
      output.push(lines[index]);
      continue;
    }

    const [, indent, fence, language, rawMeta] = opening;
    let cursor = index + 1;
    while (cursor < lines.length && !new RegExp(`^${indent}${fence[0]}{${fence.length},}\\s*$`).test(lines[cursor])) {
      cursor += 1;
    }

    if (cursor >= lines.length) {
      output.push(lines[index]);
      continue;
    }

    const title = readMetaValue(rawMeta, 'title') ?? 'Terminal session';
    const prompt = readMetaValue(rawMeta, 'prompt');
    const cleanedMeta = removeMetaKey(removeMetaKey(rawMeta.replace(/(?:^|\s)terminal(?=\s|$)/g, ' '), 'title'), 'prompt');
    const attributes = [
      `title=${jsxAttribute(title)}`,
      language ? `language=${jsxAttribute(language)}` : undefined,
      prompt ? `prompt=${jsxAttribute(prompt)}` : undefined,
    ]
      .filter(Boolean)
      .join(' ');
    const innerOpening = `${fence}${language}${cleanedMeta ? ` ${cleanedMeta}` : ''}`;

    output.push(`<TerminalSession ${attributes}>`, '', innerOpening);
    output.push(...lines.slice(index + 1, cursor));
    output.push(fence, '', '</TerminalSession>');
    index = cursor;
  }

  return output.join('\n');
}

export function transformDocumentPresentation(body) {
  return transformSemanticBlockquotes(transformTerminalFences(body));
}
