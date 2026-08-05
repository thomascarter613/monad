import { rm } from 'node:fs/promises';

const generatedDirectories = [
  '.next',
  '.source',
  '.generated',
  'coverage',
  'playwright-report',
  'test-results',
];

await Promise.all(
  generatedDirectories.map((directory) =>
    rm(new URL(`../${directory}`, import.meta.url), { force: true, recursive: true }),
  ),
);
