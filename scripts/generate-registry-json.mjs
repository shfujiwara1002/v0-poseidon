#!/usr/bin/env node

/**
 * generate-registry-json.mjs
 *
 * Reads the canonical component registry from
 *   src/design-system/component-registry.ts
 * and writes a JSON snapshot to
 *   scripts/design-system-registry.gen.json
 *
 * The generated JSON is used by design-system-config.mjs as the
 * single source of truth for component statuses.
 *
 * Usage:
 *   node scripts/generate-registry-json.mjs          # generate
 *   node scripts/generate-registry-json.mjs --check   # verify in sync
 */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const SOURCE_PATH = path.join(ROOT, 'src', 'design-system', 'component-registry.ts');
const OUTPUT_PATH = path.join(ROOT, 'scripts', 'design-system-registry.gen.json');
const CHECK_MODE = process.argv.includes('--check');

const source = fs.readFileSync(SOURCE_PATH, 'utf8');

// --- Parse canonical names from `const canonicalNames = [ ... ] as const;` ---
const canonicalBlock = source.match(/const\s+canonicalNames\s*=\s*\[([\s\S]*?)\]\s*as\s*const/);
if (!canonicalBlock) {
  console.error('Could not find canonicalNames array in component-registry.ts');
  process.exit(1);
}
const canonicalNames = [...canonicalBlock[1].matchAll(/'([^']+)'/g)].map((m) => m[1]);

// --- Parse named entry blocks (compat, legacy, forbidden) ---
function parseEntryBlock(varName) {
  const re = new RegExp(
    `const\\s+${varName}\\s*:\\s*Record[\\s\\S]*?=\\s*\\{([\\s\\S]*?)\\};`,
  );
  const match = source.match(re);
  if (!match) return {};

  const block = match[1];
  const entries = {};
  const entryRe = /(\w+)\s*:\s*\{([^}]*)\}/g;
  let m;
  while ((m = entryRe.exec(block)) !== null) {
    const name = m[1];
    const body = m[2];
    const replacement = body.match(/replacement:\s*'([^']*)'/)?.[1] ?? null;
    const note = body.match(/note:\s*'([^']*)'/)?.[1] ?? null;
    entries[name] = { replacement, note };
  }
  return entries;
}

const compatEntries = parseEntryBlock('compatEntries');
const legacyEntries = parseEntryBlock('legacyEntries');
const forbiddenEntries = parseEntryBlock('forbiddenEntries');

// --- Build registry object ---
const registry = {};

for (const name of canonicalNames) {
  registry[name] = { status: 'canonical' };
}
for (const [name, meta] of Object.entries(compatEntries)) {
  registry[name] = { status: 'compat', ...meta };
}
for (const [name, meta] of Object.entries(legacyEntries)) {
  registry[name] = { status: 'legacy', ...meta };
}
for (const [name, meta] of Object.entries(forbiddenEntries)) {
  registry[name] = { status: 'forbidden', ...meta };
}

const json = JSON.stringify(registry, null, 2) + '\n';

if (CHECK_MODE) {
  let existing = '';
  try {
    existing = fs.readFileSync(OUTPUT_PATH, 'utf8');
  } catch {
    console.error(`[registry-sync] ${OUTPUT_PATH} does not exist. Run: npm run generate:registry`);
    process.exit(1);
  }

  if (existing !== json) {
    console.error('[registry-sync] design-system-registry.gen.json is out of date.');
    console.error('Run: npm run generate:registry');
    process.exit(1);
  }

  console.log('[registry-sync] design-system-registry.gen.json is in sync.');
  process.exit(0);
}

fs.writeFileSync(OUTPUT_PATH, json);
console.log(`[generate-registry] wrote ${Object.keys(registry).length} entries to ${path.relative(ROOT, OUTPUT_PATH)}`);
