import { gzipSync } from 'node:zlib';

function octal(value, length) {
  const encoded = value.toString(8);
  if (encoded.length > length - 1) throw new Error(`Tar numeric field overflow: ${value}`);
  return encoded.padStart(length - 1, '0') + '\0';
}

function byteLength(value) {
  return Buffer.byteLength(value, 'utf8');
}

function splitTarName(name) {
  const normalized = String(name).replace(/^\/+/, '').replaceAll('\\', '/');
  if (!normalized || normalized.includes('\0')) throw new Error(`Invalid tar path: ${name}`);
  if (byteLength(normalized) <= 100) return { name: normalized, prefix: '' };

  const separators = [...normalized.matchAll(/\//g)].map((match) => match.index ?? -1).reverse();
  for (const index of separators) {
    const prefix = normalized.slice(0, index);
    const basename = normalized.slice(index + 1);
    if (byteLength(prefix) <= 155 && byteLength(basename) <= 100) {
      return { name: basename, prefix };
    }
  }
  throw new Error(`Tar path cannot be represented by the USTAR format: ${normalized}`);
}

function writeString(header, value, offset, length) {
  const body = Buffer.from(value, 'utf8');
  if (body.length > length) throw new Error(`Tar field exceeds ${length} bytes: ${value}`);
  body.copy(header, offset);
}

function tarHeader(pathname, size, mtime, mode = 0o644) {
  const header = Buffer.alloc(512, 0);
  const path = splitTarName(pathname);
  writeString(header, path.name, 0, 100);
  writeString(header, octal(mode, 8), 100, 8);
  writeString(header, octal(0, 8), 108, 8);
  writeString(header, octal(0, 8), 116, 8);
  writeString(header, octal(size, 12), 124, 12);
  writeString(header, octal(Math.floor(mtime / 1000), 12), 136, 12);
  header.fill(0x20, 148, 156);
  header[156] = '0'.charCodeAt(0);
  writeString(header, 'ustar\0', 257, 6);
  writeString(header, '00', 263, 2);
  writeString(header, 'Monad', 265, 32);
  writeString(header, 'Monad', 297, 32);
  if (path.prefix) writeString(header, path.prefix, 345, 155);
  const checksum = header.reduce((sum, byte) => sum + byte, 0);
  writeString(header, octal(checksum, 8), 148, 8);
  return header;
}

export function createTarGzip(entries, { mtime = Date.now() } = {}) {
  const chunks = [];
  const names = new Set();
  for (const entry of [...entries].sort((left, right) => left.name.localeCompare(right.name))) {
    const name = String(entry.name).replaceAll('\\', '/');
    if (names.has(name)) throw new Error(`Duplicate archive entry: ${name}`);
    names.add(name);
    const body = Buffer.isBuffer(entry.body) ? entry.body : Buffer.from(entry.body);
    chunks.push(tarHeader(name, body.length, mtime, entry.mode));
    chunks.push(body);
    const remainder = body.length % 512;
    if (remainder) chunks.push(Buffer.alloc(512 - remainder));
  }
  chunks.push(Buffer.alloc(1024));
  // Modern Node writes a stable zero gzip timestamp; USTAR member timestamps are normalized above.
  return gzipSync(Buffer.concat(chunks), { level: 9 });
}
