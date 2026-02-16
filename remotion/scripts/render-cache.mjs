/**
 * render-cache.mjs — SHA-256 based incremental rendering cache.
 *
 * Computes a composite hash of each slide's source file plus shared
 * design-system files.  If the hash matches the cached value the slide
 * does not need re-rendering.
 *
 * Cache file: remotion/out/.render-cache.json
 */

import { createHash } from 'crypto';
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const remotionDir = join(__dirname, '..');
const CACHE_FILE = join(remotionDir, 'out', '.render-cache.json');

/** Recursively collect all files under a directory (deterministic sort). */
function collectFiles(dir) {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectFiles(full));
    } else {
      results.push(full);
    }
  }
  return results.sort();
}

/** All shared files that can affect any slide's rendering. */
function getSharedFiles() {
  const sharedDir = join(remotionDir, 'src', 'shared');
  const rootFile = join(remotionDir, 'src', 'Root.tsx');
  return [...collectFiles(sharedDir), rootFile];
}

// ── helpers ──────────────────────────────────────────────────

function loadCache() {
  if (!existsSync(CACHE_FILE)) return {};
  try {
    return JSON.parse(readFileSync(CACHE_FILE, 'utf8'));
  } catch {
    return {};
  }
}

function saveCache(cache) {
  mkdirSync(dirname(CACHE_FILE), { recursive: true });
  writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2) + '\n');
}

function hashFile(filePath) {
  try {
    const content = readFileSync(filePath);
    return createHash('sha256').update(content).digest('hex');
  } catch {
    return 'missing';
  }
}

function computeSlideHash(sourceFile) {
  const parts = [];
  // Slide source file
  parts.push(hashFile(join(remotionDir, sourceFile)));
  // All shared design-system files (auto-discovered)
  for (const sf of getSharedFiles()) {
    parts.push(hashFile(sf));
  }
  return createHash('sha256').update(parts.join(':')).digest('hex');
}

// ── public API ───────────────────────────────────────────────

/**
 * Returns true if the slide needs re-rendering (source changed or no cache entry).
 */
export function needsRender(compositionId, sourceFile) {
  const cache = loadCache();
  const currentHash = computeSlideHash(sourceFile);
  const pngPath = join(remotionDir, 'out', `v3-${compositionId}.png`);
  // Also re-render if the output PNG is missing
  if (!existsSync(pngPath)) return true;
  return cache[compositionId] !== currentHash;
}

/**
 * Stores the current hash so subsequent calls to needsRender return false.
 */
export function updateHash(compositionId, sourceFile) {
  const cache = loadCache();
  cache[compositionId] = computeSlideHash(sourceFile);
  saveCache(cache);
}

/**
 * Removes all cached hashes, forcing a full re-render.
 */
export function clearCache() {
  saveCache({});
}
