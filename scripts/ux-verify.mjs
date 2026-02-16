#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const outputPath = path.join(root, 'docs', 'baselines', 'ux-verify-last-run.json');

const checks = [
  ['npm', ['run', 'test:run']],
  ['npm', ['run', 'check:design-system']],
  ['npm', ['run', 'check:motion-policy']],
  ['npm', ['run', 'check:a11y-structure']],
  ['npm', ['run', 'check:cta-hierarchy']],
  ['npm', ['run', 'check:contrast-budget']],
  ['npm', ['run', 'build']],
  ['npm', ['run', 'check:bundle-budget']],
  ['npm', ['run', 'verify:pwa']],
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function run(cmd, args) {
  const result = spawnSync(cmd, args, {
    cwd: root,
    encoding: 'utf8',
    shell: process.platform === 'win32',
  });
  return {
    cmd: [cmd, ...args].join(' '),
    ok: result.status === 0,
    status: result.status ?? 1,
    stdout: (result.stdout ?? '').trim().slice(-2000),
    stderr: (result.stderr ?? '').trim().slice(-2000),
  };
}

const results = checks.map(([cmd, args]) => run(cmd, args));
const failed = results.filter((r) => !r.ok);
const summary = {
  ok: failed.length === 0,
  timestamp: new Date().toISOString(),
  total: results.length,
  failed: failed.length,
  results,
};

ensureDir(path.dirname(outputPath));
fs.writeFileSync(outputPath, JSON.stringify(summary, null, 2));
console.log(JSON.stringify(summary, null, 2));
if (!summary.ok) process.exit(1);
