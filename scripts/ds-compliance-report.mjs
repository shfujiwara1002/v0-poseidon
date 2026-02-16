#!/usr/bin/env node
/**
 * Design System v2 -- HTML Compliance Report Generator
 *
 * Runs every quality gate, collects results, and writes a self-contained
 * HTML report to dist/ds-compliance-report.html.
 *
 * The report contains:
 *   - Summary statistics
 *   - Token compliance results (per-file pass/fail)
 *   - Component structure results (per-component pass/fail + line counts)
 *   - Effect preset coverage (which presets are referenced in components)
 *   - TypeScript type-check status
 *
 * Styled with inline CSS in a dark theme consistent with the Poseidon
 * design language.
 */

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import process from 'node:process';

/* ── paths ──────────────────────────────────────────────────────── */

const ROOT = process.cwd();
const COMPONENTS_DIR = path.join(ROOT, 'src', 'design-system', 'components');
const TOKENS_DIR = path.join(ROOT, 'src', 'design-system', 'tokens');
const DIST_DIR = path.join(ROOT, 'dist');
const OUTPUT_PATH = path.join(DIST_DIR, 'ds-compliance-report.html');

/* ── utility ────────────────────────────────────────────────────── */

function esc(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function collectFiles(dir, ext) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectFiles(full, ext));
    } else if (entry.name.endsWith(ext)) {
      results.push(full);
    }
  }
  return results;
}

function findComponentDirs(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (!entry.isDirectory()) continue;
    const children = fs.readdirSync(full, { withFileTypes: true });
    const hasFiles = children.some((c) => c.isFile());
    const hasSubDirs = children.some((c) => c.isDirectory());
    if (hasFiles) results.push(full);
    if (hasSubDirs) results.push(...findComponentDirs(full));
  }
  return results;
}

function countLines(filePath) {
  return fs.readFileSync(filePath, 'utf8').split(/\r?\n/).length;
}

function runCmd(cmd) {
  try {
    const out = execSync(cmd, {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    return { passed: true, output: out.trim() };
  } catch (/** @type {any} */ err) {
    return {
      passed: false,
      output: ((err.stdout || '') + (err.stderr || '')).trim(),
    };
  }
}

/* ── data collection ────────────────────────────────────────────── */

// 1. TypeScript type-check
console.log('Running tsc --noEmit ...');
const tscResult = runCmd('npx tsc --noEmit');

// 2. Token compliance (inline scan -- same logic as check-ds-tokens.mjs)
console.log('Scanning token compliance ...');

const HEX_RE = /(?<![&\w])#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;
const COLOR_FN_RE = /\b(?:rgba?|hsla?)\s*\([^)]*\)/gi;
const DURATION_KEY_RE =
  /\b(?:duration|animationDuration|transitionDuration)\s*:\s*(?:'[^']*'|"[^"]*"|[\d.]+)/g;
const TRANSITION_INLINE_RE = /\btransition\s*:\s*(?:'[^']*'|"[^"]*")/g;

function isClassNameContext(line) {
  const t = line.trim();
  return /className\s*=/.test(t) || /\bcn\(/.test(t) || /\bclsx\(/.test(t) || /\btwMerge\(/.test(t);
}

function isComment(line) {
  const t = line.trim();
  return t.startsWith('//') || t.startsWith('*') || t.startsWith('/*');
}

function hexInsideTailwindBracket(line, idx) {
  const before = line.slice(0, idx);
  const bIdx = before.lastIndexOf('[');
  if (bIdx === -1) return false;
  return bIdx > 0 && /[a-z]-$/.test(before.slice(0, bIdx));
}

function isTailwindArbitraryValue(line) {
  return /\w+-\[.*\]/.test(line) && isClassNameContext(line);
}

const tsxFiles = collectFiles(COMPONENTS_DIR, '.tsx');

/** @type {Map<string, { line: number, kind: string, snippet: string }[]>} */
const tokenViolationsByFile = new Map();

for (const filePath of tsxFiles) {
  const relPath = path.relative(ROOT, filePath);
  const source = fs.readFileSync(filePath, 'utf8');
  const lines = source.split(/\r?\n/);
  /** @type {{ line: number, kind: string, snippet: string }[]} */
  const violations = [];

  for (let i = 0; i < lines.length; i++) {
    const lineNum = i + 1;
    const line = lines[i];
    if (isComment(line)) continue;
    if (isTailwindArbitraryValue(line)) continue;

    if (!isClassNameContext(line)) {
      let m;
      HEX_RE.lastIndex = 0;
      while ((m = HEX_RE.exec(line)) !== null) {
        if (hexInsideTailwindBracket(line, m.index)) continue;
        violations.push({ line: lineNum, kind: 'hardcoded-color', snippet: m[0] });
      }
      COLOR_FN_RE.lastIndex = 0;
      while ((m = COLOR_FN_RE.exec(line)) !== null) {
        violations.push({ line: lineNum, kind: 'hardcoded-color-fn', snippet: m[0] });
      }
    }

    let m;
    DURATION_KEY_RE.lastIndex = 0;
    while ((m = DURATION_KEY_RE.exec(line)) !== null) {
      violations.push({ line: lineNum, kind: 'hardcoded-duration', snippet: m[0] });
    }
    TRANSITION_INLINE_RE.lastIndex = 0;
    while ((m = TRANSITION_INLINE_RE.exec(line)) !== null) {
      violations.push({ line: lineNum, kind: 'hardcoded-transition', snippet: m[0] });
    }
  }

  tokenViolationsByFile.set(relPath, violations);
}

// 3. Component structure validation
console.log('Validating component structure ...');

const componentDirs = findComponentDirs(COMPONENTS_DIR);

/** @type {{ name: string, relDir: string, issues: string[], lineCount: number | null, hasTsx: boolean, hasSchema: boolean, hasIndex: boolean }[]} */
const structureResults = [];

for (const dir of componentDirs) {
  const name = path.basename(dir);
  const relDir = path.relative(ROOT, dir);
  const files = fs.readdirSync(dir);

  const tsxList = files.filter((f) => f.endsWith('.tsx'));
  const mainTsx = tsxList.find((f) => f === `${name}.tsx`);
  const schemaFile = files.find((f) => f === `${name}.schema.ts`);
  const indexFile = files.find((f) => f === 'index.ts' || f === 'index.tsx');

  const hasTsx = !!mainTsx || tsxList.length > 0;
  const hasSchema = !!schemaFile;
  const hasIndex = !!indexFile;

  const issues = [];
  if (!mainTsx && tsxList.length === 0) issues.push('missing .tsx');
  else if (!mainTsx) issues.push(`no ${name}.tsx (has: ${tsxList.join(', ')})`);
  if (!schemaFile) issues.push('missing .schema.ts');
  if (!indexFile) issues.push('missing index.ts');

  const implPath = mainTsx ? path.join(dir, mainTsx) : tsxList.length > 0 ? path.join(dir, tsxList[0]) : null;
  let lineCount = null;
  if (implPath) {
    lineCount = countLines(implPath);
    if (lineCount > 150) issues.push(`${lineCount} lines (max 150)`);
  }

  structureResults.push({ name, relDir, issues, lineCount, hasTsx, hasSchema, hasIndex });
}

// 4. Effect preset coverage
console.log('Checking effect preset coverage ...');

const EFFECT_PRESETS = ['minimal', 'glass', 'neon', 'aurora', 'terminal'];

/** @type {Map<string, Set<string>>} */
const presetUsage = new Map();
for (const preset of EFFECT_PRESETS) presetUsage.set(preset, new Set());

const allDsFiles = [
  ...collectFiles(COMPONENTS_DIR, '.tsx'),
  ...collectFiles(COMPONENTS_DIR, '.ts'),
  ...collectFiles(path.join(ROOT, 'src', 'design-system', 'providers'), '.tsx'),
  ...collectFiles(path.join(ROOT, 'src', 'design-system', 'css'), '.css'),
];

for (const filePath of allDsFiles) {
  const relPath = path.relative(ROOT, filePath);
  const source = fs.readFileSync(filePath, 'utf8');
  for (const preset of EFFECT_PRESETS) {
    // Match preset references like 'neon', "neon", effect-preset="neon", etc.
    const re = new RegExp(`['"\`]${preset}['"\`]|${preset}`, 'g');
    if (re.test(source)) {
      presetUsage.get(preset).add(relPath);
    }
  }
}

/* ── HTML generation ────────────────────────────────────────────── */

console.log('Generating HTML report ...');

const now = new Date().toISOString().replace('T', ' ').replace(/\.\d+Z$/, ' UTC');
const totalTokenFiles = tsxFiles.length;
const tokenCleanFiles = [...tokenViolationsByFile.entries()].filter(([, v]) => v.length === 0).length;
const tokenViolatingFiles = totalTokenFiles - tokenCleanFiles;
const totalTokenViolations = [...tokenViolationsByFile.values()].reduce((sum, v) => sum + v.length, 0);

const structurePassing = structureResults.filter((r) => r.issues.length === 0).length;
const structureFailing = structureResults.length - structurePassing;

const presetsCovered = EFFECT_PRESETS.filter((p) => presetUsage.get(p).size > 0).length;

const overallPass = tscResult.passed && tokenViolatingFiles === 0 && structureFailing === 0;

function badge(pass) {
  return pass
    ? '<span class="badge pass">PASS</span>'
    : '<span class="badge fail">FAIL</span>';
}

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Poseidon DS v2 -- Compliance Report</title>
<style>
  :root {
    --bg-primary: oklch(0.13 0.02 255);
    --bg-surface: oklch(0.18 0.02 250 / 0.6);
    --bg-elevated: oklch(0.22 0.02 250);
    --border: oklch(1 0 0 / 0.08);
    --text-primary: oklch(0.96 0.01 250);
    --text-secondary: oklch(0.72 0.02 250);
    --text-muted: oklch(0.55 0.02 250);
    --accent-cyan: oklch(0.82 0.14 195);
    --accent-green: oklch(0.72 0.18 155);
    --accent-red: oklch(0.65 0.22 25);
    --accent-amber: oklch(0.78 0.16 85);
    --accent-violet: oklch(0.62 0.22 285);
    --radius: 12px;
    --font: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: var(--font);
    background: var(--bg-primary);
    color: var(--text-primary);
    line-height: 1.6;
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  h1 {
    font-size: 1.75rem;
    font-weight: 700;
    background: linear-gradient(135deg, var(--accent-cyan), var(--accent-violet));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 0.25rem;
  }
  .subtitle { color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 2rem; }
  h2 {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--accent-cyan);
    margin: 2rem 0 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .card {
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1.25rem;
    margin-bottom: 1rem;
    backdrop-filter: blur(12px);
  }
  .summary-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
  }
  .stat-card {
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1.25rem;
    text-align: center;
  }
  .stat-card .value {
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.2;
  }
  .stat-card .label {
    font-size: 0.8rem;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-top: 0.25rem;
  }
  .stat-card.pass .value { color: var(--accent-green); }
  .stat-card.fail .value { color: var(--accent-red); }
  .stat-card.info .value { color: var(--accent-cyan); }
  .stat-card.warn .value { color: var(--accent-amber); }
  .overall-pass {
    border-left: 4px solid var(--accent-green);
    background: oklch(0.72 0.18 155 / 0.08);
  }
  .overall-fail {
    border-left: 4px solid var(--accent-red);
    background: oklch(0.65 0.22 25 / 0.08);
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.875rem;
  }
  th {
    text-align: left;
    padding: 0.625rem 0.75rem;
    font-weight: 600;
    color: var(--text-secondary);
    border-bottom: 1px solid var(--border);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  td {
    padding: 0.5rem 0.75rem;
    border-bottom: 1px solid oklch(1 0 0 / 0.04);
    vertical-align: top;
  }
  tr:hover td {
    background: oklch(1 0 0 / 0.02);
  }
  .badge {
    display: inline-block;
    padding: 0.15rem 0.6rem;
    border-radius: 999px;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .badge.pass {
    background: oklch(0.72 0.18 155 / 0.15);
    color: var(--accent-green);
    border: 1px solid oklch(0.72 0.18 155 / 0.3);
  }
  .badge.fail {
    background: oklch(0.65 0.22 25 / 0.15);
    color: var(--accent-red);
    border: 1px solid oklch(0.65 0.22 25 / 0.3);
  }
  .badge.warn {
    background: oklch(0.78 0.16 85 / 0.15);
    color: var(--accent-amber);
    border: 1px solid oklch(0.78 0.16 85 / 0.3);
  }
  .badge.info {
    background: oklch(0.82 0.14 195 / 0.15);
    color: var(--accent-cyan);
    border: 1px solid oklch(0.82 0.14 195 / 0.3);
  }
  .mono {
    font-family: var(--mono);
    font-size: 0.8rem;
    color: var(--text-secondary);
  }
  .violation-detail {
    font-family: var(--mono);
    font-size: 0.75rem;
    color: var(--accent-red);
    margin-top: 0.25rem;
  }
  .preset-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 0.75rem;
  }
  .preset-card {
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 1rem;
  }
  .preset-card .name {
    font-weight: 600;
    font-size: 0.95rem;
    text-transform: capitalize;
    margin-bottom: 0.25rem;
  }
  .preset-card .count {
    font-size: 0.8rem;
    color: var(--text-secondary);
  }
  .preset-card.covered { border-left: 3px solid var(--accent-green); }
  .preset-card.uncovered { border-left: 3px solid var(--accent-red); opacity: 0.7; }
  .footer {
    margin-top: 3rem;
    text-align: center;
    font-size: 0.75rem;
    color: var(--text-muted);
    padding: 1.5rem 0;
    border-top: 1px solid var(--border);
  }
  code {
    font-family: var(--mono);
    font-size: 0.8em;
    background: oklch(1 0 0 / 0.05);
    padding: 0.1em 0.35em;
    border-radius: 4px;
  }
</style>
</head>
<body>
<h1>Poseidon Design System v2</h1>
<p class="subtitle">Compliance Report &mdash; ${esc(now)}</p>

<!-- Overall status -->
<div class="card ${overallPass ? 'overall-pass' : 'overall-fail'}" style="margin-bottom:2rem;">
  <strong style="font-size:1.1rem;">${overallPass ? 'All quality gates passed' : 'Some quality gates failed'}</strong>
</div>

<!-- Summary stats -->
<div class="summary-grid">
  <div class="stat-card ${tscResult.passed ? 'pass' : 'fail'}">
    <div class="value">${tscResult.passed ? 'OK' : 'ERR'}</div>
    <div class="label">TypeScript</div>
  </div>
  <div class="stat-card ${tokenViolatingFiles === 0 ? 'pass' : 'fail'}">
    <div class="value">${tokenCleanFiles}/${totalTokenFiles}</div>
    <div class="label">Token-clean files</div>
  </div>
  <div class="stat-card ${structureFailing === 0 ? 'pass' : 'fail'}">
    <div class="value">${structurePassing}/${structureResults.length}</div>
    <div class="label">Structure pass</div>
  </div>
  <div class="stat-card info">
    <div class="value">${presetsCovered}/${EFFECT_PRESETS.length}</div>
    <div class="label">Effect presets covered</div>
  </div>
  <div class="stat-card ${totalTokenViolations === 0 ? 'pass' : 'warn'}">
    <div class="value">${totalTokenViolations}</div>
    <div class="label">Token violations</div>
  </div>
</div>

<!-- Token compliance -->
<h2>Token Compliance</h2>
<div class="card">
  <table>
    <thead><tr><th>File</th><th>Status</th><th>Violations</th></tr></thead>
    <tbody>
${[...tokenViolationsByFile.entries()]
  .map(([file, violations]) => {
    const pass = violations.length === 0;
    const details = violations
      .slice(0, 5)
      .map(
        (v) =>
          `<div class="violation-detail">L${v.line} [${esc(v.kind)}] ${esc(v.snippet)}</div>`,
      )
      .join('');
    const more = violations.length > 5 ? `<div class="violation-detail">... +${violations.length - 5} more</div>` : '';
    return `      <tr>
        <td class="mono">${esc(file)}</td>
        <td>${badge(pass)}</td>
        <td>${pass ? '<span style="color:var(--text-muted)">--</span>' : `${violations.length} issue(s)${details}${more}`}</td>
      </tr>`;
  })
  .join('\n')}
    </tbody>
  </table>
</div>

<!-- Structure compliance -->
<h2>Component Structure</h2>
<div class="card">
  <table>
    <thead><tr><th>Component</th><th>.tsx</th><th>.schema.ts</th><th>index.ts</th><th>Lines</th><th>Status</th></tr></thead>
    <tbody>
${structureResults
  .map((r) => {
    const linesStr = r.lineCount !== null
      ? `<span style="color:${r.lineCount > 150 ? 'var(--accent-red)' : 'var(--text-secondary)'}">${r.lineCount}</span>`
      : '<span style="color:var(--text-muted)">--</span>';
    const pass = r.issues.length === 0;
    return `      <tr>
        <td><strong>${esc(r.name)}</strong><br><span class="mono" style="font-size:0.7rem">${esc(r.relDir)}</span></td>
        <td>${r.hasTsx ? badge(true) : badge(false)}</td>
        <td>${r.hasSchema ? badge(true) : badge(false)}</td>
        <td>${r.hasIndex ? badge(true) : badge(false)}</td>
        <td style="text-align:right">${linesStr}</td>
        <td>${badge(pass)}${!pass ? `<div class="violation-detail">${r.issues.map(esc).join('<br>')}</div>` : ''}</td>
      </tr>`;
  })
  .join('\n')}
    </tbody>
  </table>
</div>

<!-- Effect preset coverage -->
<h2>Effect Preset Coverage</h2>
<div class="card">
  <div class="preset-grid">
${EFFECT_PRESETS.map((preset) => {
    const refs = presetUsage.get(preset);
    const covered = refs.size > 0;
    return `    <div class="preset-card ${covered ? 'covered' : 'uncovered'}">
      <div class="name">${esc(preset)}</div>
      <div class="count">${covered ? `Referenced in ${refs.size} file(s)` : 'No references found'}</div>
      ${covered ? badge(true) : badge(false)}
    </div>`;
  }).join('\n')}
  </div>
</div>

<!-- TypeScript -->
<h2>TypeScript Type-Check</h2>
<div class="card">
  <p>${badge(tscResult.passed)} <code>tsc --noEmit</code></p>
  ${!tscResult.passed ? `<pre style="margin-top:1rem;font-family:var(--mono);font-size:0.75rem;color:var(--accent-red);max-height:300px;overflow:auto;white-space:pre-wrap;">${esc(tscResult.output.slice(0, 4000))}</pre>` : ''}
</div>

<div class="footer">
  Generated by <strong>ds-compliance-report.mjs</strong> &mdash; Poseidon Design System v2
</div>
</body>
</html>`;

/* ── write ──────────────────────────────────────────────────────── */

if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR, { recursive: true });
}

fs.writeFileSync(OUTPUT_PATH, html, 'utf8');

const relOutput = path.relative(ROOT, OUTPUT_PATH);
console.log(`\n[ds-report] Written to ${relOutput}`);
console.log(`[ds-report] Overall: ${overallPass ? 'PASS' : 'FAIL'}`);

process.exit(overallPass ? 0 : 1);
