#!/usr/bin/env node
/**
 * Design System v2 -- Combined Quality Gate Runner
 *
 * Orchestrates all DS quality checks in one pass:
 *   1. TypeScript type checking  (npx tsc --noEmit)
 *   2. Token compliance          (node scripts/check-ds-tokens.mjs)
 *   3. Structure validation      (node scripts/check-ds-structure.mjs)
 *
 * Reports a summary table and exits 0 only if every gate passes.
 */

import { execSync } from 'node:child_process';
import process from 'node:process';

/* ── gate definitions ───────────────────────────────────────────── */

const gates = [
  {
    name: 'TypeScript type-check',
    cmd: 'npx tsc --noEmit',
  },
  {
    name: 'Token compliance',
    cmd: 'node scripts/check-ds-tokens.mjs',
  },
  {
    name: 'Component structure',
    cmd: 'node scripts/check-ds-structure.mjs',
  },
];

/* ── runner ──────────────────────────────────────────────────────── */

/**
 * @typedef {{ name: string, passed: boolean, output: string, durationMs: number }} GateResult
 */

/** @type {GateResult[]} */
const results = [];

console.log('='.repeat(60));
console.log('  Poseidon Design System v2 -- Quality Gates');
console.log('='.repeat(60));
console.log('');

for (const gate of gates) {
  const start = Date.now();
  let passed = true;
  let output = '';

  console.log(`Running: ${gate.name} ...`);

  try {
    output = execSync(gate.cmd, {
      cwd: process.cwd(),
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
    });
  } catch (/** @type {any} */ err) {
    passed = false;
    // execSync throws on non-zero exit; capture combined output
    output = (err.stdout || '') + (err.stderr || '');
  }

  const durationMs = Date.now() - start;

  results.push({ name: gate.name, passed, output: output.trim(), durationMs });

  const icon = passed ? 'PASS' : 'FAIL';
  console.log(`  ${icon}  ${gate.name}  (${durationMs}ms)\n`);
}

/* ── summary ────────────────────────────────────────────────────── */

console.log('-'.repeat(60));
console.log('  Summary');
console.log('-'.repeat(60));

const longestName = Math.max(...results.map((r) => r.name.length));

for (const r of results) {
  const status = r.passed ? 'PASS' : 'FAIL';
  const padding = ' '.repeat(longestName - r.name.length);
  console.log(`  [${status}]  ${r.name}${padding}  ${r.durationMs}ms`);
}

const totalPassed = results.filter((r) => r.passed).length;
const totalFailed = results.filter((r) => !r.passed).length;

console.log('');
console.log(
  `  ${totalPassed}/${results.length} gates passed` +
    (totalFailed > 0 ? `, ${totalFailed} failed` : ''),
);
console.log('='.repeat(60));

/* ── show failure details ──────────────────────────────────────── */

if (totalFailed > 0) {
  console.log('');
  for (const r of results.filter((r) => !r.passed)) {
    console.error(`--- ${r.name} output ---`);
    console.error(r.output);
    console.error('');
  }
  process.exit(1);
}

console.log('\nAll quality gates passed.');
process.exit(0);
