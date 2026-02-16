/**
 * Font-size gate — enforces minimum font sizes across the deck.
 *
 * Two severity tiers:
 *   ERROR (build blocker):  V2 slides (src/v2/) + chart components (src/shared/charts/)
 *                           + shared layout components (SlideHeader, StatCard, etc.)
 *   INFO  (advisory only):  Demo screens, visuals, cinematic, camera, live-ui
 *                           (these render inside scaled containers — small fonts are expected)
 *
 * Checks TWO patterns:
 *   1. CSS inline styles:  fontSize: <number>
 *   2. SVG attributes:     fontSize="<number>"
 *
 * Safe patterns (not flagged):
 *   - fontSize: Math.max(v2Policy.typography.<token>, <fallback>)
 *
 * Usage:  node scripts/check-font-sizes.mjs [--verbose] [--info]
 *         --verbose: show passing lines too
 *         --info:    also show advisory-only violations (demo screens, visuals, etc.)
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { resolve, relative, extname } from 'path';

// ─── Config ────────────────────────────────────────────────
const MIN_FONT_SIZE = 16;  // Updated for 6-tier typography system (sizeXXS = 16px for footer)

// Directories to scan
const SCAN_DIRS = [
  'src/v2',
  'src/shared',
];

// Only .tsx and .ts
const EXTENSIONS = new Set(['.tsx', '.ts']);

// Files to skip entirely (non-visual config)
const SKIP_FILES = new Set([
  'slideLayouts.ts',
  'theme.ts',
  'copy.ts',
  'backgroundPresets.ts',
  'types.ts',
  'authorityDarkGlassStyle.ts',
]);

// Subdirectories that are INFO-only (advisory, not blocking)
// These contain demo screen UIs, visual assets, and animation components
// that render inside scaled containers where small fonts are expected.
const INFO_ONLY_DIRS = [
  'src/shared/screens/',
  'src/shared/visuals/',
  'src/shared/cinematic/',
  'src/shared/camera/',
  'src/shared/live-ui/',
];

// ─── Detection patterns ────────────────────────────────────
const CSS_FONT_SIZE_RE = /fontSize:\s*(\d+)/g;
const SVG_FONT_SIZE_RE = /fontSize="(\d+)"/g;
const POLICY_GUARD_RE = /fontSize:\s*Math\.max\(\s*v2Policy\.typography\.\w+/;
const LAYOUT_TOKEN_FONT_RE = /fontSize:\s*(?:layout|slideLayouts)\.\w+/g;

// ─── CLI flags ─────────────────────────────────────────────
const verbose = process.argv.includes('--verbose');
const showInfo = process.argv.includes('--info');

// ─── Helpers ───────────────────────────────────────────────
function collectFiles(dirs) {
  const files = new Set();
  for (const dir of dirs) {
    const abs = resolve(process.cwd(), dir);
    try { walk(abs, files); } catch { /* dir may not exist */ }
  }
  return [...files].sort();
}

function walk(dir, acc) {
  for (const entry of readdirSync(dir)) {
    const full = resolve(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      walk(full, acc);
    } else if (EXTENSIONS.has(extname(entry)) && !SKIP_FILES.has(entry)) {
      acc.add(full);
    }
  }
}

function isInfoOnly(relPath) {
  return INFO_ONLY_DIRS.some(prefix => relPath.startsWith(prefix));
}

// ─── Main ──────────────────────────────────────────────────
const files = collectFiles(SCAN_DIRS);
const errors = [];    // build blockers (V2 slides, charts, shared components)
const infos = [];     // advisory (demo screens, visuals, etc.)
const warnings = [];  // unresolvable layout token references

for (const filePath of files) {
  const rel = relative(process.cwd(), filePath);
  const source = readFileSync(filePath, 'utf8');
  const lines = source.split('\n');
  const infoOnly = isInfoOnly(rel);

  lines.forEach((line, idx) => {
    const lineNum = idx + 1;
    const trimmed = line.trim();

    // Skip comments
    if (trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('/*')) return;

    // ── CSS fontSize: <number> ──
    let match;
    CSS_FONT_SIZE_RE.lastIndex = 0;
    while ((match = CSS_FONT_SIZE_RE.exec(line)) !== null) {
      const value = parseInt(match[1], 10);
      if (POLICY_GUARD_RE.test(line)) {
        if (verbose) console.log(`  ✓ ${rel}:${lineNum} — guarded (${value})`);
        continue;
      }
      if (value < MIN_FONT_SIZE) {
        const entry = { file: rel, line: lineNum, value, type: 'css', snippet: trimmed.substring(0, 90) };
        if (infoOnly) infos.push(entry); else errors.push(entry);
      }
    }

    // ── SVG fontSize="<number>" ──
    SVG_FONT_SIZE_RE.lastIndex = 0;
    while ((match = SVG_FONT_SIZE_RE.exec(line)) !== null) {
      const value = parseInt(match[1], 10);
      if (value < MIN_FONT_SIZE) {
        const entry = { file: rel, line: lineNum, value, type: 'svg', snippet: trimmed.substring(0, 90) };
        if (infoOnly) infos.push(entry); else errors.push(entry);
      }
    }

    // ── Layout token references (unresolvable) ──
    LAYOUT_TOKEN_FONT_RE.lastIndex = 0;
    while ((match = LAYOUT_TOKEN_FONT_RE.exec(line)) !== null) {
      if (!POLICY_GUARD_RE.test(line)) {
        warnings.push({ file: rel, line: lineNum, snippet: trimmed.substring(0, 90) });
      }
    }
  });
}

// ─── Report ────────────────────────────────────────────────
console.log(`\n🔍 Font-size gate (minimum: ${MIN_FONT_SIZE}px)`);
console.log(`   Scanned ${files.length} files across ${SCAN_DIRS.join(', ')}\n`);

// Warnings (layout tokens — manual review needed)
if (warnings.length > 0) {
  console.warn(`⚠  ${warnings.length} warning(s) — layout token fontSize (verify manually):`);
  for (const w of warnings) {
    console.warn(`   ${w.file}:${w.line}  ${w.snippet}`);
  }
  console.warn('');
}

// Info (advisory — demo screens, etc.)
if (showInfo && infos.length > 0) {
  console.log(`ℹ  ${infos.length} advisory note(s) — demo screens / visuals (not blocking):`);
  for (const f of infos) {
    const tag = f.type === 'svg' ? '[SVG]' : '[CSS]';
    console.log(`   ${tag} ${f.file}:${f.line}  fontSize ${f.value}px`);
  }
  console.log('');
} else if (infos.length > 0) {
  console.log(`ℹ  ${infos.length} advisory note(s) in demo screens/visuals (use --info to show)\n`);
}

// Errors (build blockers)
if (errors.length > 0) {
  console.error(`✗  ${errors.length} violation(s) in slide/chart files (BUILD BLOCKED):\n`);
  for (const f of errors) {
    const tag = f.type === 'svg' ? '[SVG]' : '[CSS]';
    console.error(`   ${tag} ${f.file}:${f.line}  fontSize ${f.value}px < ${MIN_FONT_SIZE}px`);
    console.error(`       ${f.snippet}`);
  }
  console.error(`\n💡 Fix: Use fontSize >= ${MIN_FONT_SIZE}, or wrap: Math.max(v2Policy.typography.metaMinPx, value)`);
  process.exit(1);
}

console.log(`✅ Font-size gate passed — all slide/chart values >= ${MIN_FONT_SIZE}px.\n`);
