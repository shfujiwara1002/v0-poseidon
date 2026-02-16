#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

const checks = [
  {
    file: 'public/sw.js',
    test: (s) => s.includes("self.addEventListener('fetch'"),
    message: 'public/sw.js must exist and implement fetch handler.',
  },
  {
    file: 'src/hooks/usePWA.ts',
    test: (s) => s.includes("register('/sw.js'") || s.includes('register("/sw.js"'),
    message: 'usePWA must register /sw.js explicitly.',
  },
  {
    file: 'index.html',
    test: (s) => s.includes('rel="manifest"') && s.includes('/manifest.json'),
    message: 'index.html must reference manifest.json.',
  },
];

const failures = [];

for (const check of checks) {
  const filePath = path.join(root, check.file);
  if (!fs.existsSync(filePath)) {
    failures.push(`${check.file}: missing file`);
    continue;
  }

  const source = fs.readFileSync(filePath, 'utf8');
  if (!check.test(source)) {
    failures.push(`${check.file}: ${check.message}`);
  }
}

const distSw = path.join(root, 'dist/sw.js');
if (fs.existsSync(path.join(root, 'dist'))) {
  if (!fs.existsSync(distSw)) {
    failures.push('dist/sw.js missing after build. Ensure public/sw.js is copied to dist.');
  }
}

if (failures.length > 0) {
  console.error('PWA verification failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('PWA verification passed.');
