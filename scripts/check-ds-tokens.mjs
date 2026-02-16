#!/usr/bin/env node
/**
 * Design System v2 -- Token Compliance Scanner
 *
 * Scans all .tsx files in src/design-system/components/ and detects:
 *   - Hardcoded hex colors (#xxx, #xxxxxx, #xxxxxxxx)
 *   - Hardcoded rgb(), rgba(), hsl(), hsla() values
 *   - Hardcoded animation durations in JS style objects
 *
 * Tailwind classes (inside className / clsx / cn / twMerge strings) are
 * intentionally excluded -- only raw style-object / inline-style usage
 * counts as a violation.
 *
 * Exit 0 = clean, Exit 1 = violations found.
 */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

/* ── configuration ──────────────────────────────────────────────── */

const ROOT = process.cwd();
const COMPONENTS_DIR = path.join(
  ROOT,
  'src',
  'design-system',
  'components',
);

/**
 * Hex colour patterns -- 3, 4, 6, or 8-digit hex codes preceded by a
 * non-word char (to avoid matching inside identifiers like 0xDEAD).
 * We capture the whole `#xxx` / `#xxxxxx` token.
 */
const HEX_RE = /(?<![&\w])#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;

/**
 * rgb / rgba / hsl / hsla function calls.
 */
const COLOR_FN_RE = /\b(?:rgba?|hsla?)\s*\([^)]*\)/gi;

/**
 * Hardcoded duration values inside JS-style objects:
 *   duration: 0.3          (number literal)
 *   duration: '0.3s'       (string literal)
 *   transition: '...'      (string literal with timing keywords)
 */
const DURATION_KEY_RE =
  /\b(?:duration|animationDuration|transitionDuration)\s*:\s*(?:'[^']*'|"[^"]*"|[\d.]+)/g;

const TRANSITION_INLINE_RE =
  /\btransition\s*:\s*(?:'[^']*'|"[^"]*")/g;

/* ── helpers ────────────────────────────────────────────────────── */

/**
 * Decide whether a line is "inside a className context" -- i.e.
 * it is primarily a Tailwind class list and should be ignored.
 *
 * Heuristic: the line contains className=, clsx(, cn(, or twMerge(
 * before any style assignment, or the line is purely a template-
 * literal class string.
 */
function isClassNameContext(line) {
  const t = line.trim();
  return (
    /className\s*=/.test(t) ||
    /\bcn\(/.test(t) ||
    /\bclsx\(/.test(t) ||
    /\btwMerge\(/.test(t)
  );
}

/**
 * Returns true when a line is a JS / TS comment.
 */
function isComment(line) {
  const t = line.trim();
  return t.startsWith('//') || t.startsWith('*') || t.startsWith('/*');
}

/**
 * Returns true when a line is a Tailwind arbitrary-value usage inside a
 * className string, e.g.:
 *   'bg-[oklch(0.18_0.02_250)]'
 *   'text-[#14B8A6]'
 *
 * These patterns appear inside brackets preceded by a Tailwind utility
 * prefix and are valid design-system usage when set via CSS custom
 * properties or explicit engine maps.
 */
function isTailwindArbitraryValue(line) {
  // Lines dominated by Tailwind arbitrary-value syntax
  return /\w+-\[.*\]/.test(line) && isClassNameContext(line);
}

/**
 * Returns true when a hex match is inside a Tailwind arbitrary-value
 * bracket on the same line (e.g. `bg-[#14B8A6]`).
 */
function hexInsideTailwindBracket(line, matchIndex) {
  // Walk backwards from the match looking for an opening `[` that is
  // preceded by a Tailwind utility prefix character (a-z or -)
  const before = line.slice(0, matchIndex);
  const bracketIdx = before.lastIndexOf('[');
  if (bracketIdx === -1) return false;
  // Check that the bracket is preceded by a utility-class dash, e.g. `bg-[`
  return bracketIdx > 0 && /[a-z]-$/.test(before.slice(0, bracketIdx));
}

/* ── scanner ────────────────────────────────────────────────────── */

function collectTsxFiles(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectTsxFiles(full));
    } else if (entry.name.endsWith('.tsx')) {
      results.push(full);
    }
  }
  return results;
}

/**
 * @typedef {{ file: string, line: number, kind: string, snippet: string }} Violation
 */

function scanFile(filePath) {
  /** @type {Violation[]} */
  const violations = [];
  const source = fs.readFileSync(filePath, 'utf8');
  const lines = source.split(/\r?\n/);
  const relPath = path.relative(ROOT, filePath);

  for (let i = 0; i < lines.length; i++) {
    const lineNum = i + 1;
    const line = lines[i];

    // Skip comments
    if (isComment(line)) continue;

    // Skip pure className / Tailwind lines
    if (isTailwindArbitraryValue(line)) continue;

    /* -- hex colours ------------------------------------------------ */
    if (!isClassNameContext(line)) {
      let match;
      HEX_RE.lastIndex = 0;
      while ((match = HEX_RE.exec(line)) !== null) {
        // Skip if inside a Tailwind bracket on the same line
        if (hexInsideTailwindBracket(line, match.index)) continue;
        violations.push({
          file: relPath,
          line: lineNum,
          kind: 'hardcoded-color',
          snippet: match[0],
        });
      }
    }

    /* -- rgb / rgba / hsl / hsla ------------------------------------ */
    if (!isClassNameContext(line)) {
      let match;
      COLOR_FN_RE.lastIndex = 0;
      while ((match = COLOR_FN_RE.exec(line)) !== null) {
        violations.push({
          file: relPath,
          line: lineNum,
          kind: 'hardcoded-color-fn',
          snippet: match[0],
        });
      }
    }

    /* -- hardcoded animation durations in style objects -------------- */
    let match;
    DURATION_KEY_RE.lastIndex = 0;
    while ((match = DURATION_KEY_RE.exec(line)) !== null) {
      violations.push({
        file: relPath,
        line: lineNum,
        kind: 'hardcoded-duration',
        snippet: match[0],
      });
    }

    TRANSITION_INLINE_RE.lastIndex = 0;
    while ((match = TRANSITION_INLINE_RE.exec(line)) !== null) {
      violations.push({
        file: relPath,
        line: lineNum,
        kind: 'hardcoded-transition',
        snippet: match[0],
      });
    }
  }

  return violations;
}

/* ── main ───────────────────────────────────────────────────────── */

const files = collectTsxFiles(COMPONENTS_DIR);

if (files.length === 0) {
  console.log('[ds-tokens] No .tsx files found in', path.relative(ROOT, COMPONENTS_DIR));
  process.exit(0);
}

/** @type {Violation[]} */
const allViolations = [];

for (const file of files) {
  allViolations.push(...scanFile(file));
}

/* -- report --------------------------------------------------------- */
console.log(
  `[ds-tokens] scanned ${files.length} .tsx file(s) in src/design-system/components/`,
);

if (allViolations.length === 0) {
  console.log('[ds-tokens] all files pass token compliance.');
  process.exit(0);
}

console.error(`\n[ds-tokens] ${allViolations.length} violation(s) found:\n`);

/** @type {Map<string, Violation[]>} */
const byFile = new Map();
for (const v of allViolations) {
  if (!byFile.has(v.file)) byFile.set(v.file, []);
  byFile.get(v.file).push(v);
}

for (const [file, violations] of byFile) {
  console.error(`  ${file}`);
  for (const v of violations) {
    console.error(`    L${v.line}  [${v.kind}]  ${v.snippet}`);
  }
}

console.error('');
process.exit(1);
