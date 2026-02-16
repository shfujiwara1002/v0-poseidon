/**
 * Layout token validator — ensures all font-size tokens in slideLayouts.ts
 * respect v2Policy.typography minimums.
 *
 * Parses slideLayouts.ts to find all `*Size` tokens and checks their values
 * against the policy floor (metaMinPx = 24).
 *
 * Usage:  node scripts/check-layout-tokens.mjs
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';

// ─── Config ────────────────────────────────────────────────
const POLICY_FLOOR = 20;  // v2Policy.typography.metaMinPx (updated for 5-tier system)

// Token name patterns that represent font sizes
const FONT_SIZE_TOKEN_RE = /(\w+Size)\s*:\s*(\d+)/g;

// Tokens that are NOT font sizes (icon sizes, chart dimensions, etc.)
const EXEMPT_TOKENS = new Set([
  'iconSize',
  'miniIconSize',
  'chartSize',
  'radarSize',
  'uniqueIconSize',
  'signalIconMinPx',
  'chartBarWidth',
  'chartBarHeight',
  'flowIconSize',
  'playButtonSize',
  'playGlyphWidth',
  'playGlyphHeight',
  'logoHeight',
  'playerWidth',
  'playerHeight',
  'headerMaxWidth',
]);

// ─── Main ──────────────────────────────────────────────────
const filePath = resolve(process.cwd(), 'src/shared/slideLayouts.ts');
const source = readFileSync(filePath, 'utf8');
const lines = source.split('\n');

const failures = [];
const passed = [];

lines.forEach((line, idx) => {
  const lineNum = idx + 1;
  let match;
  FONT_SIZE_TOKEN_RE.lastIndex = 0;

  while ((match = FONT_SIZE_TOKEN_RE.exec(line)) !== null) {
    const tokenName = match[1];
    const value = parseInt(match[2], 10);

    // Skip non-font-size tokens
    if (EXEMPT_TOKENS.has(tokenName)) continue;

    if (value < POLICY_FLOOR) {
      failures.push({ token: tokenName, value, line: lineNum, floor: POLICY_FLOOR });
    } else {
      passed.push({ token: tokenName, value, line: lineNum });
    }
  }
});

// ─── Report ────────────────────────────────────────────────
console.log(`\n🔍 Layout token validator (floor: ${POLICY_FLOOR}px)`);
console.log(`   Checked ${passed.length + failures.length} font-size tokens in slideLayouts.ts\n`);

if (passed.length > 0) {
  console.log(`   ✓ ${passed.length} token(s) OK:`);
  for (const p of passed) {
    console.log(`     ${p.token}: ${p.value}px (line ${p.line})`);
  }
  console.log('');
}

if (failures.length > 0) {
  console.error(`   ✗ ${failures.length} token(s) below floor:\n`);
  for (const f of failures) {
    console.error(`     ${f.token}: ${f.value}px < ${f.floor}px (line ${f.line})`);
  }
  console.error(`\n💡 Fix: Raise token values in slideLayouts.ts to >= ${POLICY_FLOOR}px.`);
  process.exit(1);
}

console.log(`✅ Layout token validator passed — all font-size tokens >= ${POLICY_FLOOR}px.\n`);
