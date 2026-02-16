#!/usr/bin/env node
import { spawnSync } from 'node:child_process';

const steps = [
  ['node', ['scripts/ux-scan.mjs']],
  ['node', ['scripts/ux-autofix.mjs', '--mode', 'safe']],
  ['node', ['scripts/ux-verify.mjs']],
  ['node', ['scripts/ux-report.mjs']],
];

for (const [cmd, args] of steps) {
  const result = spawnSync(cmd, args, {
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });
  if ((result.status ?? 1) !== 0) {
    process.exit(result.status ?? 1);
  }
}
