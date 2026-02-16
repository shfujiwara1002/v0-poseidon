#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import {
  FORBIDDEN_ENGINE_COLOR_LITERALS,
  TOKEN_HYGIENE_TARGET_PREFIXES,
} from './design-system-config.mjs';

const ROOT = process.cwd();
const STRICT = process.argv.includes('--strict');

// Scan all CSS files in pages/ that were previously part of entry-flow.css
const PAGES_DIR = path.join(ROOT, 'src', 'styles', 'pages');
const cssFiles = fs.readdirSync(PAGES_DIR)
  .filter((f) => f.endsWith('.css'))
  .map((f) => path.join(PAGES_DIR, f));

let totalLines = 0;
const violations = [];
const warnings = [];

function selectorTargetsContract(selector) {
  const normalized = selector.trim();
  if (!normalized.startsWith('.')) {
    return false;
  }
  return TOKEN_HYGIENE_TARGET_PREFIXES.some((prefix) => normalized.includes(prefix));
}

for (const filePath of cssFiles) {
  const relativePath = path.relative(ROOT, filePath);
  const source = fs.readFileSync(filePath, 'utf8');
  const lines = source.split(/\r?\n/);
  totalLines += lines.length;

  const blockStack = [];

  for (let i = 0; i < lines.length; i += 1) {
    const lineNumber = i + 1;
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed.includes('{')) {
      const selector = trimmed.split('{')[0].trim();
      const target = selectorTargetsContract(selector);
      blockStack.push(target);
    }

    const inTargetBlock = blockStack.some(Boolean);

    if (inTargetBlock) {
      for (const literal of FORBIDDEN_ENGINE_COLOR_LITERALS) {
        if (trimmed.includes(literal)) {
          violations.push(`[engine-color] ${relativePath}:${lineNumber} uses ${literal} in contract selector.`);
        }
      }

      if (/font-family:\s*'[^']+'/.test(trimmed) && !trimmed.includes('var(--font-')) {
        warnings.push(`[font-family] ${relativePath}:${lineNumber} uses direct family. Prefer var(--font-*).`);
      }

      if (/font-size:\s*[0-9.]+rem/.test(trimmed)) {
        warnings.push(`[font-size] ${relativePath}:${lineNumber} uses rem literal. Prefer var(--font-size-*).`);
      }
    }

    if (trimmed.includes('}')) {
      blockStack.pop();
    }
  }
}

console.log(`[token-hygiene] scanned ${totalLines} lines across ${cssFiles.length} page CSS files`);

if (warnings.length > 0) {
  const preview = warnings.slice(0, 25);
  console.log(`[token-hygiene] warnings (${warnings.length}):`);
  preview.forEach((warning) => console.log(`  - ${warning}`));
  if (warnings.length > preview.length) {
    console.log(`  - ... ${warnings.length - preview.length} more`);
  }
}

if (violations.length > 0) {
  console.error('[token-hygiene] violations:');
  violations.forEach((violation) => console.error(`  - ${violation}`));
  process.exit(1);
}

if (STRICT && warnings.length > 0) {
  console.error('[token-hygiene] strict mode treats warnings as failures.');
  process.exit(1);
}

console.log('[token-hygiene] checks passed.');
