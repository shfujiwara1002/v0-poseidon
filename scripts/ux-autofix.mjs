#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const args = process.argv.slice(2);
const modeFlag = args.find((arg) => arg.startsWith('--mode='));
const modeIndex = args.indexOf('--mode');
const mode = modeFlag
  ? modeFlag.split('=')[1]
  : (modeIndex >= 0 && args[modeIndex + 1] ? args[modeIndex + 1] : 'safe');

const rulesPath = path.join(root, 'spec', 'ux-autofix-rules.json');
const reportPath = path.join(root, 'docs', 'baselines', 'ux-autofix-last-run.md');
const reportJsonPath = path.join(root, 'docs', 'baselines', 'ux-autofix-last-run.json');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function walkFiles(dir, predicate, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkFiles(full, predicate, out);
    } else if (predicate(full)) {
      out.push(full);
    }
  }
  return out;
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function relative(file) {
  return path.relative(root, file).replaceAll('\\', '/');
}

function replaceSpacingTokens(source) {
  const declRegex = /(\b(?:padding(?:-(?:top|right|bottom|left))?|margin(?:-(?:top|right|bottom|left))?|gap|row-gap|column-gap|top|right|bottom|left)\s*:\s*)([^;]+);/g;
  const map = new Map([
    ['10px', 'var(--space-2-5)'],
    ['14px', 'var(--space-3-5)'],
    ['18px', 'var(--space-4-5)'],
    ['22px', 'var(--space-5-5)'],
  ]);
  let replacements = 0;
  const next = source.replace(declRegex, (full, head, value) => {
    let v = value;
    for (const [from, to] of map.entries()) {
      const r = new RegExp(`\\b${from}\\b`, 'g');
      const count = (v.match(r) ?? []).length;
      if (count > 0) {
        replacements += count;
        v = v.replace(r, to);
      }
    }
    return `${head}${v};`;
  });
  return { source: next, replacements };
}

function replaceTrackingTokens(source) {
  const declRegex = /(letter-spacing\s*:\s*)([^;]+);/g;
  const map = [
    { re: /-0\.02em|-0\.01em/g, to: 'var(--tracking-tight)' },
    { re: /0\.01em/g, to: 'var(--tracking-normal)' },
    { re: /0\.02em/g, to: 'var(--tracking-wide)' },
    { re: /0\.0[4-6]em/g, to: 'var(--tracking-wide)' },
    { re: /0\.(?:08|09|1)em/g, to: 'var(--tracking-wider)' },
    { re: /0\.(?:12|14|16|18|2)em/g, to: 'var(--tracking-widest)' },
  ];
  let replacements = 0;
  const next = source.replace(declRegex, (full, head, value) => {
    let v = value.trim();
    if (v.startsWith('var(')) return full;
    for (const { re, to } of map) {
      const count = (v.match(re) ?? []).length;
      if (count > 0) {
        replacements += count;
        v = v.replace(re, to);
      }
    }
    return `${head}${v};`;
  });
  return { source: next, replacements };
}

function applyAppNavCtaDemotion(source) {
  const engineCorePattern = /(if \(uxMeta\.navGroup === 'engine' \|\| uxMeta\.navGroup === 'core'\) \{[\s\S]*?return \[)([\s\S]*?)(\];\s*\})/m;
  const match = source.match(engineCorePattern);
  if (!match) return { source, replacements: 0 };
  const block = match[2];
  if (!block.includes("variant: 'primary'")) return { source, replacements: 0 };
  const nextBlock = block.replaceAll("variant: 'primary'", "variant: 'minor'");
  const next = source.replace(block, nextBlock);
  return { source: next, replacements: block === nextBlock ? 0 : 1 };
}

function collectDecorativeMotionWarnings(cssFiles) {
  const warnings = [];
  const decorativeKeys = ['glow-pulse', 'bloom-pulse', 'particle-float', 'liquid-drift', 'wave-drift', 'circuit-pulse'];
  for (const file of cssFiles) {
    const source = fs.readFileSync(file, 'utf8');
    for (const key of decorativeKeys) {
      if (source.includes(key) && !source.includes('prefers-reduced-motion')) {
        warnings.push({
          rule: 'decorative-motion-guard',
          file: relative(file),
          message: `${key} appears without prefers-reduced-motion guard in file scope`,
        });
      }
    }
  }
  return warnings;
}

if (!fs.existsSync(rulesPath)) {
  console.error(`Missing rules file: ${relative(rulesPath)}`);
  process.exit(1);
}

const rules = readJson(rulesPath).rules ?? [];
const cssFiles = walkFiles(path.join(root, 'src', 'styles'), (f) => f.endsWith('.css'));
const tsxFiles = [
  ...walkFiles(path.join(root, 'src', 'components'), (f) => f.endsWith('.tsx')),
  ...walkFiles(path.join(root, 'src', 'pages'), (f) => f.endsWith('.tsx')),
];

const changedFiles = new Map();
const skippedRules = [];
const warnings = [];
let changes = 0;
let failures = 0;

for (const rule of rules) {
  const severity = rule.severity ?? 'manual';
  if (mode === 'safe' && severity !== 'safe') {
    skippedRules.push(rule.id);
    if (rule.id === 'decorative-motion-guard') {
      warnings.push(...collectDecorativeMotionWarnings(cssFiles));
    }
    continue;
  }

  try {
    if (rule.id === 'css-spacing-tokenization') {
      for (const file of cssFiles) {
        const source = fs.readFileSync(file, 'utf8');
        const result = replaceSpacingTokens(source);
        if (result.replacements > 0 && result.source !== source) {
          fs.writeFileSync(file, result.source);
          changes += result.replacements;
          changedFiles.set(relative(file), (changedFiles.get(relative(file)) ?? 0) + result.replacements);
        }
      }
    } else if (rule.id === 'css-letter-spacing-tokenization') {
      for (const file of cssFiles) {
        const source = fs.readFileSync(file, 'utf8');
        const result = replaceTrackingTokens(source);
        if (result.replacements > 0 && result.source !== source) {
          fs.writeFileSync(file, result.source);
          changes += result.replacements;
          changedFiles.set(relative(file), (changedFiles.get(relative(file)) ?? 0) + result.replacements);
        }
      }
    } else if (rule.id === 'engine-core-nav-cta-demotion') {
      const file = path.join(root, 'src', 'components', 'AppNav.tsx');
      const source = fs.readFileSync(file, 'utf8');
      const result = applyAppNavCtaDemotion(source);
      if (result.replacements > 0 && result.source !== source) {
        fs.writeFileSync(file, result.source);
        changes += result.replacements;
        changedFiles.set(relative(file), (changedFiles.get(relative(file)) ?? 0) + result.replacements);
      }
    } else {
      // Safe mode intentionally avoids unknown rule handlers.
      skippedRules.push(rule.id);
    }
  } catch (error) {
    failures += 1;
    warnings.push({
      rule: rule.id,
      file: '-',
      message: `Failed to apply rule: ${String(error)}`,
    });
  }
}

// Guarded informational scan for icon-only buttons missing aria-label.
const iconButtonWarnings = [];
for (const file of tsxFiles) {
  const source = fs.readFileSync(file, 'utf8');
  const lines = source.split('\n');
  lines.forEach((line, index) => {
    if (line.includes('btn-icon') && line.includes('<button') && !line.includes('aria-label=')) {
      iconButtonWarnings.push({
        rule: 'known-icon-button-aria',
        file: relative(file),
        message: `Possible icon-only button missing aria-label at line ${index + 1}`,
      });
    }
  });
}
warnings.push(...iconButtonWarnings);

const changedList = [...changedFiles.entries()]
  .map(([file, count]) => ({ file, count }))
  .sort((a, b) => b.count - a.count);

const summary = {
  mode,
  changedCount: changes,
  failedCount: failures,
  changedFiles: changedList,
  skippedRules,
  warnings,
  timestamp: new Date().toISOString(),
};

ensureDir(path.dirname(reportPath));
fs.writeFileSync(reportJsonPath, JSON.stringify(summary, null, 2));

const md = [
  '# UX Autofix Last Run',
  '',
  `- Mode: \`${mode}\``,
  `- Timestamp: ${summary.timestamp}`,
  `- Changed items: **${changes}**`,
  `- Failed rules: **${failures}**`,
  `- Changed files: **${changedList.length}**`,
  '',
  '## Changed Files',
  ...(changedList.length
    ? changedList.map((item) => `- \`${item.file}\`: ${item.count}`)
    : ['- None']),
  '',
  '## Skipped Rules',
  ...(skippedRules.length ? skippedRules.map((id) => `- \`${id}\``) : ['- None']),
  '',
  '## Warnings',
  ...(warnings.length
    ? warnings.map((w) => `- [${w.rule}] \`${w.file}\`: ${w.message}`)
    : ['- None']),
  '',
].join('\n');

fs.writeFileSync(reportPath, md);
console.log(JSON.stringify(summary, null, 2));
