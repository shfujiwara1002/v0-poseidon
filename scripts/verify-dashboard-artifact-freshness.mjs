#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const assetsDir = path.join(ROOT, 'dist', 'assets');

if (!fs.existsSync(assetsDir)) {
  console.error(`[artifact-check] Missing assets directory: ${assetsDir}`);
  process.exit(1);
}

const dashboardBundles = fs
  .readdirSync(assetsDir)
  .filter((file) => /^Dashboard-.*\.js$/i.test(file));

if (dashboardBundles.length === 0) {
  console.error('[artifact-check] No dashboard chunk found in dist/assets.');
  process.exit(1);
}

const joinedChunkSource = dashboardBundles
  .map((file) => fs.readFileSync(path.join(assetsDir, file), 'utf8'))
  .join('\n');

const requiredMarkers = [
  'dashboard-insights-card--activity',
  'activity-rail-node',
];

const forbiddenLegacyMarkers = [
  'Review Actions',
  'Check Alerts',
  'View Goals',
];

const missing = requiredMarkers.filter((marker) => !joinedChunkSource.includes(marker));
if (missing.length > 0) {
  console.error('[artifact-check] Missing required dashboard freshness markers:');
  missing.forEach((marker) => console.error(`  - ${marker}`));
  process.exit(1);
}

const staleMarkers = forbiddenLegacyMarkers.filter((marker) => joinedChunkSource.includes(marker));
if (staleMarkers.length > 0) {
  console.error('[artifact-check] Found legacy morning widget markers in dashboard chunk:');
  staleMarkers.forEach((marker) => console.error(`  - ${marker}`));
  process.exit(1);
}

console.log('[artifact-check] Dashboard artifact freshness check passed.');
