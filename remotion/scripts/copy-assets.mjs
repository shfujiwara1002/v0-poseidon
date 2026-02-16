#!/usr/bin/env node
/**
 * Copy docs/assets into remotion/public/assets so staticFile() can resolve them.
 * Run from remotion/: node scripts/copy-assets.mjs
 */

import { cpSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const remotionRoot = join(__dirname, '..');
const publicDir = join(remotionRoot, 'public');
const assetsDest = join(publicDir, 'assets');
const assetsSource = join(remotionRoot, '..', 'docs', 'assets');

if (!existsSync(assetsSource)) {
  console.warn('copy-assets: docs/assets not found, skipping');
  process.exit(0);
}

mkdirSync(publicDir, { recursive: true });
mkdirSync(assetsDest, { recursive: true });
cpSync(assetsSource, assetsDest, { recursive: true });
console.log('copy-assets: copied docs/assets -> remotion/public/assets');
