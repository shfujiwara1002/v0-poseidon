#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

const requiredFiles = [
  'src/content/microcopy-catalog.ts',
  'src/components/SearchBar.tsx',
  'src/components/CommandPalette.tsx',
  'src/components/ErrorBoundary.tsx',
];

const requiredKeys = [
  'app_loading',
  'command_palette_empty',
  'search_no_results',
  'error_boundary_title',
];

const failures = [];

for (const rel of requiredFiles) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) {
    failures.push(`${rel}: missing`);
  }
}

const catalogPath = path.join(root, 'src/content/microcopy-catalog.ts');
if (fs.existsSync(catalogPath)) {
  const catalogSource = fs.readFileSync(catalogPath, 'utf8');
  requiredKeys.forEach((key) => {
    if (!catalogSource.includes(`${key}:`)) {
      failures.push(`src/content/microcopy-catalog.ts: missing key ${key}`);
    }
  });
}

const phraseChecks = [
  {
    file: 'src/components/SearchBar.tsx',
    disallow: 'No results found for "{query}"',
    reason: 'Use copy() helper instead of inline hardcoded microcopy.',
  },
  {
    file: 'src/components/CommandPalette.tsx',
    disallow: 'No commands found',
    reason: 'Use copy() helper instead of inline hardcoded microcopy.',
  },
  {
    file: 'src/components/ErrorBoundary.tsx',
    disallow: 'An Error Occurred',
    reason: 'Use calm, action-oriented tone from microcopy catalog.',
  },
];

for (const check of phraseChecks) {
  const source = fs.readFileSync(path.join(root, check.file), 'utf8');
  if (source.includes(check.disallow)) {
    failures.push(`${check.file}: ${check.reason}`);
  }
}

if (failures.length > 0) {
  console.error('Microcopy tone checks failed:');
  failures.forEach((line) => console.error(`- ${line}`));
  process.exit(1);
}

console.log('Microcopy tone checks passed.');
