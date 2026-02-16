#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const checks = [
  {
    file: 'src/components/AppShell.tsx',
    rule: /<main id="main-content">/,
    message: 'AppShell must expose <main id="main-content"> landmark.',
  },
  {
    file: 'src/components/CommandPalette.tsx',
    rule: /role="dialog"[\s\S]*aria-modal="true"/,
    message: 'CommandPalette must be an accessible modal dialog.',
  },
  {
    file: 'src/components/AIChatbot.tsx',
    rule: /role="dialog"[\s\S]*aria-modal="true"/,
    message: 'AIChatbot must be an accessible modal dialog.',
  },
  {
    file: 'src/components/PageShell/PageShell.tsx',
    rule: /data-slot="primary_feed"[\s\S]*role="region"/,
    message: 'PageShell primary feed must render as region.',
  },
  {
    file: 'src/components/AppNav.tsx',
    rule: /Skip to content/,
    message: 'AppNav must expose a skip link for app routes.',
  },
];

const failures = [];

for (const check of checks) {
  const filePath = path.resolve(process.cwd(), check.file);
  const source = fs.readFileSync(filePath, 'utf8');
  if (!check.rule.test(source)) {
    failures.push(`${check.file}: ${check.message}`);
  }
}

if (failures.length > 0) {
  console.error('A11y smoke checks failed:\n');
  failures.forEach((line) => console.error(`- ${line}`));
  process.exit(1);
}

console.log('A11y smoke checks passed.');

