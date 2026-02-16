/**
 * Optimize PNG assets using macOS sips.
 * Compresses oversized logo PNGs to reasonable sizes.
 *
 * Usage: node scripts/optimize-assets.mjs [--dry-run]
 */

import { execSync } from 'child_process';
import { statSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const assetsDir = join(rootDir, 'public', 'assets', 'png');
const dryRun = process.argv.includes('--dry-run');

const targets = [
  { file: 'logo-trident-only.png', maxWidth: 1024 },
  { file: 'logo-print.png', maxWidth: 1024 },
];

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

console.log(`\n=== Asset Optimization ===\n`);

let totalSaved = 0;

for (const { file, maxWidth } of targets) {
  const filePath = join(assetsDir, file);
  if (!existsSync(filePath)) {
    console.log(`  SKIP  ${file} (not found)`);
    continue;
  }

  const before = statSync(filePath).size;
  console.log(`  ${file}: ${formatBytes(before)}`);

  if (dryRun) {
    console.log(`    [dry-run] Would resize to max ${maxWidth}px width`);
    continue;
  }

  try {
    // Resize to max width while preserving aspect ratio
    execSync(`sips --resampleWidth ${maxWidth} "${filePath}" --out "${filePath}"`, {
      stdio: 'pipe',
    });

    const after = statSync(filePath).size;
    const saved = before - after;
    totalSaved += saved;
    console.log(`    -> ${formatBytes(after)} (saved ${formatBytes(saved)}, ${((saved / before) * 100).toFixed(0)}%)`);
  } catch (err) {
    console.error(`    FAILED: ${err.message}`);
  }
}

if (!dryRun && totalSaved > 0) {
  console.log(`\nTotal saved: ${formatBytes(totalSaved)}`);
}

console.log(`\n=== Done ===\n`);
