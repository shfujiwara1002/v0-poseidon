#!/usr/bin/env node
/**
 * ux-visual-diff.mjs — Compare latest screenshots against baseline.
 *
 * Comparison strategy (ordered by reliability):
 * 1. Byte-level buffer comparison — exact binary diff ratio of PNG files.
 *    Fast, zero-dependency, catches any pixel or metadata change.
 * 2. File-size heuristic — fallback when buffer read fails.
 *
 * Strict mode (--strict): exits non-zero if any diff is at error level.
 * Local mode (default): always exits 0; results are informational.
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const latestDir = path.join(root, 'docs', 'baselines', 'screenshots', 'latest');
const baselineDir = path.join(root, 'docs', 'baselines', 'screenshots', 'baseline');
const outPath = path.join(root, 'docs', 'baselines', 'ux-visual-diff-last-run.json');
const configPath = path.join(root, 'spec', 'ux-visual-baseline.json');

const strict = process.argv.includes('--strict');

const ensureDir = (dir) => fs.mkdirSync(dir, { recursive: true });
ensureDir(path.dirname(outPath));

function writeResult(result) {
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result, null, 2));
}

if (!fs.existsSync(configPath)) {
  writeResult({ ok: false, reason: 'missing-config', diffs: [] });
  process.exit(1);
}

if (!fs.existsSync(latestDir)) {
  writeResult({ ok: true, skipped: true, reason: 'no-latest-captures', diffs: [] });
  process.exit(0);
}

if (!fs.existsSync(baselineDir)) {
  fs.cpSync(latestDir, baselineDir, { recursive: true });
  writeResult({ ok: true, bootstrap: true, reason: 'baseline-created', diffs: [] });
  process.exit(0);
}

/**
 * Compare two PNG files byte-by-byte.
 * Returns a ratio 0..1 of differing bytes / max file length.
 * Falls back to file-size ratio if buffer read fails.
 */
function compareFiles(latestPath, baselinePath) {
  try {
    const latestBuf = fs.readFileSync(latestPath);
    const baselineBuf = fs.readFileSync(baselinePath);

    const maxLen = Math.max(latestBuf.length, baselineBuf.length);
    if (maxLen === 0) return { ratio: 0, method: 'buffer' };

    // If lengths differ significantly, that alone is meaningful
    const minLen = Math.min(latestBuf.length, baselineBuf.length);
    let diffBytes = Math.abs(latestBuf.length - baselineBuf.length);

    // Compare overlapping region byte-by-byte
    for (let i = 0; i < minLen; i++) {
      if (latestBuf[i] !== baselineBuf[i]) diffBytes++;
    }

    return { ratio: diffBytes / maxLen, method: 'buffer' };
  } catch {
    // Fallback: file-size heuristic
    try {
      const latestStat = fs.statSync(latestPath);
      const baselineStat = fs.statSync(baselinePath);
      const max = Math.max(latestStat.size, baselineStat.size, 1);
      const diff = Math.abs(latestStat.size - baselineStat.size) / max;
      return { ratio: diff, method: 'size-fallback' };
    } catch {
      return { ratio: 1, method: 'error' };
    }
  }
}

const latestFiles = fs.readdirSync(latestDir).filter((f) => f.endsWith('.png'));
const cfg = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const diffs = latestFiles.map((file) => {
  const latestPath = path.join(latestDir, file);
  const baselinePath = path.join(baselineDir, file);

  if (!fs.existsSync(baselinePath)) {
    return { file, changeRatio: 1, level: 'error', method: 'missing-baseline', reason: 'missing-baseline-file' };
  }

  const { ratio, method } = compareFiles(latestPath, baselinePath);
  const changeRatio = Number(ratio.toFixed(4));

  let level;
  if (changeRatio >= cfg.diffThresholds.error) {
    level = 'error';
  } else if (changeRatio >= cfg.diffThresholds.warn) {
    level = 'warn';
  } else {
    level = 'ok';
  }

  return { file, changeRatio, level, method };
});

const errorCount = diffs.filter((d) => d.level === 'error').length;
const warnCount = diffs.filter((d) => d.level === 'warn').length;

const result = {
  ok: strict ? errorCount === 0 : true,
  strict,
  bootstrap: false,
  summary: { total: diffs.length, ok: diffs.length - errorCount - warnCount, warn: warnCount, error: errorCount },
  diffs,
};

writeResult(result);

if (strict && errorCount > 0) {
  console.error(`Visual diff FAILED: ${errorCount} error-level regression(s) detected.`);
  process.exit(1);
}
