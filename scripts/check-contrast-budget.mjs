#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const tokenFile = path.join(root, 'src/styles/system/tokens.css');
const source = fs.readFileSync(tokenFile, 'utf8');

const failures = [];

const alphaChecks = [
  { token: '--muted', minAlpha: 0.68 },
  { token: '--muted-2', minAlpha: 0.58 },
];

for (const check of alphaChecks) {
  const match = source.match(new RegExp(`${check.token}:\\s*rgba\\([^\\)]*,\\s*([0-9.]+)\\);`));
  if (!match) {
    failures.push(`${check.token} must be defined as rgba(..., alpha).`);
    continue;
  }
  const alpha = Number(match[1]);
  if (!Number.isFinite(alpha) || alpha < check.minAlpha) {
    failures.push(`${check.token} alpha ${alpha} is below minimum ${check.minAlpha}.`);
  }
}

if (!source.includes('--state-focus-ring')) {
  failures.push('Focus ring token must be present.');
}

if (failures.length > 0) {
  console.error('Contrast budget checks failed:');
  failures.forEach((line) => console.error(`- ${line}`));
  process.exit(1);
}

console.log('Contrast budget checks passed.');
