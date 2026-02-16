#!/usr/bin/env node
import { existsSync } from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const localLhciBin = path.resolve(process.cwd(), 'node_modules/.bin/lhci');
if (!existsSync(localLhciBin) && process.env.CI !== 'true') {
  console.warn('Skipping Lighthouse locally: node_modules/.bin/lhci not found.');
  process.exit(0);
}

const run = existsSync(localLhciBin)
  ? spawnSync(localLhciBin, ['autorun'], {
      stdio: 'inherit',
      shell: process.platform === 'win32',
    })
  : spawnSync('npx', ['--yes', '@lhci/cli', 'autorun'], {
      stdio: 'inherit',
      shell: process.platform === 'win32',
    });

if (run.error) {
  console.error('Failed to execute Lighthouse CI:', run.error.message);
  process.exit(1);
}

process.exit(run.status ?? 1);
