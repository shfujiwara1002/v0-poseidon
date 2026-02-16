#!/usr/bin/env node
/**
 * Design System v2 -- Component Structure Validator
 *
 * Scans every sub-directory under src/design-system/components/ (at all
 * nesting levels: primitives/Button, composition/Card, etc.) and verifies:
 *
 *   1. A .tsx implementation file exists
 *   2. A .schema.ts Zod schema file exists
 *   3. An index.ts barrel export exists
 *   4. The main .tsx file is <= 150 lines
 *
 * Empty category directories (ai/, effects/, etc.) are silently skipped --
 * only directories that contain at least one file are validated.
 *
 * Exit 0 = all pass, Exit 1 = violations found.
 */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

/* ── configuration ──────────────────────────────────────────────── */

const ROOT = process.cwd();
const COMPONENTS_DIR = path.join(
  ROOT,
  'src',
  'design-system',
  'components',
);

const MAX_IMPLEMENTATION_LINES = 150;

/* ── helpers ────────────────────────────────────────────────────── */

/**
 * Recursively discover "leaf" component directories -- any directory
 * that directly contains at least one file (not just sub-dirs).
 */
function findComponentDirs(dir) {
  /** @type {string[]} */
  const results = [];
  if (!fs.existsSync(dir)) return results;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (!entry.isDirectory()) continue;

    const children = fs.readdirSync(full, { withFileTypes: true });
    const hasFiles = children.some((c) => c.isFile());
    const hasSubDirs = children.some((c) => c.isDirectory());

    if (hasFiles) {
      results.push(full);
    }
    if (hasSubDirs) {
      results.push(...findComponentDirs(full));
    }
  }
  return results;
}

function countLines(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  return content.split(/\r?\n/).length;
}

/* ── validator ──────────────────────────────────────────────────── */

/**
 * @typedef {{ dir: string, issues: string[] }} ComponentResult
 */

function validateComponent(dir) {
  const componentName = path.basename(dir);
  const relDir = path.relative(ROOT, dir);
  const files = fs.readdirSync(dir);

  /** @type {string[]} */
  const issues = [];

  /* ---- 1. .tsx implementation file -------------------------------- */
  const tsxFiles = files.filter((f) => f.endsWith('.tsx'));
  const mainTsx = tsxFiles.find((f) => f === `${componentName}.tsx`);
  if (!mainTsx && tsxFiles.length === 0) {
    issues.push('missing .tsx implementation file');
  } else if (!mainTsx) {
    issues.push(
      `no ${componentName}.tsx found (has: ${tsxFiles.join(', ')})`,
    );
  }

  /* ---- 2. .schema.ts Zod schema ---------------------------------- */
  const schemaFile = files.find(
    (f) => f === `${componentName}.schema.ts`,
  );
  if (!schemaFile) {
    const anySchema = files.find((f) => f.endsWith('.schema.ts'));
    if (anySchema) {
      issues.push(
        `expected ${componentName}.schema.ts but found ${anySchema}`,
      );
    } else {
      issues.push('missing .schema.ts file');
    }
  }

  /* ---- 3. index.ts barrel export ---------------------------------- */
  const indexFile = files.find((f) => f === 'index.ts' || f === 'index.tsx');
  if (!indexFile) {
    issues.push('missing index.ts barrel export');
  }

  /* ---- 4. line-count budget --------------------------------------- */
  const implPath = mainTsx
    ? path.join(dir, mainTsx)
    : tsxFiles.length > 0
      ? path.join(dir, tsxFiles[0])
      : null;

  if (implPath) {
    const lines = countLines(implPath);
    if (lines > MAX_IMPLEMENTATION_LINES) {
      issues.push(
        `${path.basename(implPath)} has ${lines} lines (max ${MAX_IMPLEMENTATION_LINES})`,
      );
    }
  }

  return { dir: relDir, issues };
}

/* ── main ───────────────────────────────────────────────────────── */

const componentDirs = findComponentDirs(COMPONENTS_DIR);

if (componentDirs.length === 0) {
  console.log(
    '[ds-structure] No component directories found in',
    path.relative(ROOT, COMPONENTS_DIR),
  );
  process.exit(0);
}

/** @type {ComponentResult[]} */
const results = componentDirs.map(validateComponent);
const passing = results.filter((r) => r.issues.length === 0);
const failing = results.filter((r) => r.issues.length > 0);

/* -- report --------------------------------------------------------- */
console.log(
  `[ds-structure] checked ${results.length} component(s): ` +
    `${passing.length} pass, ${failing.length} fail`,
);

if (failing.length === 0) {
  console.log('[ds-structure] all components pass structure validation.');
  process.exit(0);
}

console.error(`\n[ds-structure] ${failing.length} component(s) with issues:\n`);

for (const result of failing) {
  console.error(`  ${result.dir}/`);
  for (const issue of result.issues) {
    console.error(`    - ${issue}`);
  }
}

console.error('');
process.exit(1);
