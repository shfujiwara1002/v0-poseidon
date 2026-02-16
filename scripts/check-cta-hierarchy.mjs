#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const failures = [];

function read(file) {
  return fs.readFileSync(path.join(root, file), 'utf8');
}

const appNav = read('src/components/AppNav.tsx');

if (!appNav.includes("if (uxMeta.navGroup === 'engine' || uxMeta.navGroup === 'core')")) {
  failures.push('AppNav must special-case engine/core nav groups.');
}

const engineGroupBlock = appNav.match(
  /if \(uxMeta\.navGroup === 'engine' \|\| uxMeta\.navGroup === 'core'\) \{([\s\S]*?)\n\s*\}/,
);
if (!engineGroupBlock) {
  failures.push('Unable to locate AppNav engine/core action block.');
} else if (engineGroupBlock[1].includes("variant: 'primary'")) {
  failures.push('Engine/core AppNav must not expose primary CTA actions.');
}

const heroFiles = [
  'src/components/PageShell/variants/HeroCommand.tsx',
  'src/components/PageShell/variants/HeroFocused.tsx',
  'src/components/PageShell/variants/HeroAnalytical.tsx',
  'src/components/PageShell/variants/HeroEditorial.tsx',
  'src/components/PageShell/variants/HeroMinimal.tsx',
];

for (const file of heroFiles) {
  const source = read(file);
  const primaryCount = (source.match(/entry-btn entry-btn--primary/g) ?? []).length;
  if (primaryCount > 1) {
    failures.push(`${file}: hero must expose at most one primary CTA.`);
  }
}

if (failures.length > 0) {
  console.error('CTA hierarchy checks failed:');
  failures.forEach((line) => console.error(`- ${line}`));
  process.exit(1);
}

console.log('CTA hierarchy checks passed.');
