const LEGACY_SECTION_KEYS = new Set([
  'artifact',
  'metadata',
  'relationships',
  'compilation',
  'publication',
  'repository',
  'related',
]);

const LIST_ITEM_PATTERN = /^[-*+]\s+/;

function isListItem(value) {
  return LIST_ITEM_PATTERN.test(value);
}

function listItemText(value) {
  return value.replace(LIST_ITEM_PATTERN, '').trim();
}

function stripInlineComment(value) {
  let singleQuoted = false;
  let doubleQuoted = false;

  for (let index = 0; index < value.length; index += 1) {
    const character = value[index];
    const previous = value[index - 1];

    if (character === "'" && !doubleQuoted && previous !== '\\') singleQuoted = !singleQuoted;
    if (character === '"' && !singleQuoted && previous !== '\\') doubleQuoted = !doubleQuoted;

    if (character === '#' && !singleQuoted && !doubleQuoted) {
      const before = value[index - 1];
      if (index === 0 || /\s/.test(before ?? '')) return value.slice(0, index).trimEnd();
    }
  }

  return value;
}

function splitInlineList(value) {
  const items = [];
  let current = '';
  let quote = null;
  let depth = 0;

  for (let index = 0; index < value.length; index += 1) {
    const character = value[index];
    const previous = value[index - 1];

    if ((character === '"' || character === "'") && previous !== '\\') {
      quote = quote === character ? null : quote ?? character;
    }

    if (!quote) {
      if (character === '[' || character === '{') depth += 1;
      if (character === ']' || character === '}') depth -= 1;
      if (character === ',' && depth === 0) {
        items.push(current.trim());
        current = '';
        continue;
      }
    }

    current += character;
  }

  if (current.trim().length > 0) items.push(current.trim());
  return items;
}

function parseScalar(rawValue) {
  const value = stripInlineComment(rawValue.trim());

  if (value === '') return '';
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (value === 'null' || value === '~') return null;
  if (/^-?\d+(?:\.\d+)?$/.test(value)) return Number(value);

  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    if (value.startsWith('"')) {
      try {
        return JSON.parse(value);
      } catch {
        return value.slice(1, -1);
      }
    }

    return value.slice(1, -1).replaceAll("''", "'");
  }

  if (value.startsWith('[') && value.endsWith(']')) {
    const inner = value.slice(1, -1).trim();
    if (inner === '') return [];
    return splitInlineList(inner).map(parseScalar);
  }

  if (value.startsWith('{') && value.endsWith('}')) {
    try {
      return JSON.parse(value);
    } catch {
      const result = {};
      for (const entry of splitInlineList(value.slice(1, -1))) {
        const separator = entry.indexOf(':');
        if (separator < 0) continue;
        const key = entry.slice(0, separator).trim().replace(/^['"]|['"]$/g, '');
        result[key] = parseScalar(entry.slice(separator + 1));
      }
      return result;
    }
  }

  return value;
}

function significantLines(raw) {
  return raw
    .split(/\r?\n/)
    .map((text, lineNumber) => ({
      text,
      lineNumber: lineNumber + 1,
      indent: text.match(/^\s*/)?.[0].length ?? 0,
      trimmed: text.trim(),
    }))
    .filter((line) => line.trimmed !== '' && !line.trimmed.startsWith('#'));
}

function parseBlock(lines, startIndex, indent) {
  const first = lines[startIndex];
  const arrayMode = first?.indent === indent && isListItem(first.trimmed);
  const container = arrayMode ? [] : {};
  let index = startIndex;

  while (index < lines.length) {
    const line = lines[index];
    if (line.indent < indent) break;
    if (line.indent > indent) {
      throw new Error(`Unexpected indentation at frontmatter line ${line.lineNumber}.`);
    }

    if (arrayMode) {
      if (!isListItem(line.trimmed)) {
        throw new Error(`Expected a list item at frontmatter line ${line.lineNumber}.`);
      }

      const itemText = listItemText(line.trimmed);
      if (itemText === '') {
        const next = lines[index + 1];
        if (!next || next.indent <= indent) {
          container.push(null);
          index += 1;
          continue;
        }
        const nested = parseBlock(lines, index + 1, next.indent);
        container.push(nested.value);
        index = nested.nextIndex;
        continue;
      }

      const mappingSeparator = itemText.indexOf(':');
      if (mappingSeparator > 0) {
        const item = {};
        const key = itemText.slice(0, mappingSeparator).trim();
        const value = itemText.slice(mappingSeparator + 1).trim();
        item[key] = value === '' ? null : parseScalar(value);
        container.push(item);
      } else {
        container.push(parseScalar(itemText));
      }

      index += 1;
      continue;
    }

    const separator = line.trimmed.indexOf(':');
    if (separator <= 0) {
      throw new Error(`Expected "key: value" at frontmatter line ${line.lineNumber}.`);
    }

    const key = line.trimmed.slice(0, separator).trim();
    const rawValue = line.trimmed.slice(separator + 1).trim();

    if (rawValue !== '') {
      container[key] = parseScalar(rawValue);
      index += 1;
      continue;
    }

    const next = lines[index + 1];
    if (!next || next.indent <= indent) {
      container[key] = null;
      index += 1;
      continue;
    }

    const nested = parseBlock(lines, index + 1, next.indent);
    container[key] = nested.value;
    index = nested.nextIndex;
  }

  return { value: container, nextIndex: index };
}

function hasLegacyFlatStructure(lines) {
  for (let index = 0; index < lines.length - 1; index += 1) {
    const line = lines[index];
    const separator = line.trimmed.indexOf(':');
    if (separator <= 0 || line.trimmed.slice(separator + 1).trim() !== '') continue;
    const next = lines[index + 1];
    if (next.indent === line.indent) return true;
  }
  return false;
}

function parseLegacyFlatFrontmatter(lines) {
  const root = {};
  let currentSection = null;
  let index = 0;

  const targetFor = () => {
    if (!currentSection) return root;
    if (!root[currentSection] || typeof root[currentSection] !== 'object' || Array.isArray(root[currentSection])) {
      root[currentSection] = {};
    }
    return root[currentSection];
  };

  while (index < lines.length) {
    const line = lines[index];
    if (isListItem(line.trimmed)) {
      throw new Error(`List item has no owning key at frontmatter line ${line.lineNumber}.`);
    }

    const separator = line.trimmed.indexOf(':');
    if (separator <= 0) {
      throw new Error(`Expected "key: value" at frontmatter line ${line.lineNumber}.`);
    }

    const key = line.trimmed.slice(0, separator).trim();
    const rawValue = line.trimmed.slice(separator + 1).trim();
    const next = lines[index + 1];

    if (rawValue !== '') {
      targetFor()[key] = parseScalar(rawValue);
      index += 1;
      continue;
    }

    if (next && isListItem(next.trimmed) && next.indent >= line.indent) {
      const values = [];
      let listIndex = index + 1;
      while (listIndex < lines.length) {
        const item = lines[listIndex];
        if (!isListItem(item.trimmed) || item.indent < line.indent) break;
        values.push(parseScalar(listItemText(item.trimmed)));
        listIndex += 1;
      }
      targetFor()[key] = values;
      index = listIndex;
      continue;
    }

    if (LEGACY_SECTION_KEYS.has(key)) {
      currentSection = key;
      if (next && next.indent > line.indent) {
        const nested = parseBlock(lines, index + 1, next.indent);
        root[key] = nested.value;
        index = nested.nextIndex;
      } else {
        root[key] = root[key] && typeof root[key] === 'object' ? root[key] : {};
        index += 1;
      }
      continue;
    }

    if (next && next.indent > line.indent) {
      const nested = parseBlock(lines, index + 1, next.indent);
      targetFor()[key] = nested.value;
      index = nested.nextIndex;
      continue;
    }

    targetFor()[key] = null;
    index += 1;
  }

  return root;
}

export function parseFrontmatter(raw) {
  const lines = significantLines(raw);
  if (lines.length === 0) return {};
  if (hasLegacyFlatStructure(lines)) return parseLegacyFlatFrontmatter(lines);
  return parseBlock(lines, 0, lines[0].indent).value;
}

function objectValue(value) {
  return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
}

/**
 * Promote the repository's established grouped frontmatter fields into the
 * canonical ingestion view while preserving the original group objects.
 */
export function normalizeFrontmatterAttributes(attributes) {
  const artifact = objectValue(attributes.artifact);
  const metadata = objectValue(attributes.metadata);
  const publication = objectValue(attributes.publication);
  const repository = objectValue(attributes.repository);

  return {
    ...attributes,
    ...artifact,
    ...metadata,
    publication,
    repository,
    relationships: objectValue(attributes.relationships),
    compilation: objectValue(attributes.compilation),
  };
}

export function splitFrontmatter(source) {
  const normalized = source.replaceAll('\r\n', '\n');
  if (!normalized.startsWith('---\n')) {
    return { attributes: {}, body: normalized, rawFrontmatter: null };
  }

  const closingMatch = normalized.slice(4).match(/^-{3,}\s*$/m);
  if (!closingMatch || closingMatch.index === undefined) {
    throw new Error('Frontmatter begins with --- but has no closing delimiter.');
  }

  const closingStart = 4 + closingMatch.index;
  const closingEnd = closingStart + closingMatch[0].length;
  const rawFrontmatter = normalized.slice(4, closingStart);
  const body = normalized.slice(closingEnd).replace(/^\n+/, '');

  return {
    attributes: normalizeFrontmatterAttributes(parseFrontmatter(rawFrontmatter)),
    body,
    rawFrontmatter,
  };
}

function yamlScalar(value) {
  if (value === undefined) return null;
  if (typeof value === 'string') return JSON.stringify(value);
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (value === null) return 'null';
  return JSON.stringify(value);
}

export function serializeFrontmatter(attributes) {
  const lines = ['---'];
  for (const [key, value] of Object.entries(attributes)) {
    if (value === undefined) continue;
    lines.push(`${key}: ${yamlScalar(value)}`);
  }
  lines.push('---', '');
  return lines.join('\n');
}
