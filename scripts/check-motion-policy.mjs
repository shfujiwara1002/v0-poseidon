#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const ALLOWLIST_PATH = path.join(ROOT, 'scripts/motion-policy.allowlist.txt');
const targetDirs = [
  'src/styles/components',
  'src/styles/pages',
  'src/components',
];

const violations = [];
const allowlist = new Set();

const durationRegex = /animation[^;]*\s(\d+(?:\.\d+)?)s/g;
const transformRegex = /translate[XY]?\((-?\d+(?:\.\d+)?)px\)/g;
const tsDurationRegex = /duration\s*:\s*(\d+(?:\.\d+)?)/g;
const tsTranslateRegex = /\by\s*:\s*(-?\d+(?:\.\d+)?)/g;

function toRelative(filePath) {
  return path.relative(ROOT, filePath).replaceAll('\\', '/');
}

function loadAllowlist() {
  if (!fs.existsSync(ALLOWLIST_PATH)) return;
  const raw = fs.readFileSync(ALLOWLIST_PATH, 'utf8');
  raw
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .forEach((line) => allowlist.add(line));
}

function isAllowed(filePath, rule) {
  return allowlist.has(`${toRelative(filePath)}|${rule}`);
}

function scanFile(filePath) {
  const source = fs.readFileSync(filePath, 'utf8');
  const ext = path.extname(filePath);
  const lines = source.split('\n');

  const isFunctionalAnimationLine = (line) =>
    line.includes('spinner') ||
    line.includes('skeleton') ||
    line.includes('shimmer');

  let durationMatch;
  while ((durationMatch = durationRegex.exec(source)) !== null) {
    const seconds = Number(durationMatch[1]);
    if (!Number.isFinite(seconds) || seconds <= 0.22) continue;
    const offset = durationMatch.index;
    const lineIndex = source.slice(0, offset).split('\n').length - 1;
    const line = lines[lineIndex] ?? '';
    if (isFunctionalAnimationLine(line)) continue;
    if (!isAllowed(filePath, 'duration')) {
      violations.push(`${toRelative(filePath)}:${lineIndex + 1} animation duration ${Math.round(seconds * 1000)}ms exceeds 220ms`);
    }
  }

  let transformMatch;
  while ((transformMatch = transformRegex.exec(source)) !== null) {
    const px = Math.abs(Number(transformMatch[1]));
    if (Number.isFinite(px) && px > 8) {
      if (!isAllowed(filePath, 'translation')) {
        violations.push(`${toRelative(filePath)}: transform translation ${px}px exceeds 8px`);
      }
    }
  }

  if (!isAllowed(filePath, 'infinite')) {
    lines.forEach((line, index) => {
      if (line.includes('infinite') && !isFunctionalAnimationLine(line)) {
        violations.push(`${toRelative(filePath)}:${index + 1} infinite animation is not allowed for calm policy`);
      }
    });
  }

  const shouldCheckMotionTsx = ext === '.tsx' && toRelative(filePath).endsWith('src/components/MotionList.tsx');

  if (shouldCheckMotionTsx && !isAllowed(filePath, 'duration')) {
    let tsDurationMatch;
    while ((tsDurationMatch = tsDurationRegex.exec(source)) !== null) {
      const seconds = Number(tsDurationMatch[1]);
      if (Number.isFinite(seconds) && seconds > 0.22) {
        const lineIndex = source.slice(0, tsDurationMatch.index).split('\n').length;
        violations.push(`${toRelative(filePath)}:${lineIndex} framer duration ${Math.round(seconds * 1000)}ms exceeds 220ms`);
      }
    }
  }

  if (shouldCheckMotionTsx && !isAllowed(filePath, 'translation')) {
    let tsTranslateMatch;
    while ((tsTranslateMatch = tsTranslateRegex.exec(source)) !== null) {
      const px = Math.abs(Number(tsTranslateMatch[1]));
      if (Number.isFinite(px) && px > 8) {
        const lineIndex = source.slice(0, tsTranslateMatch.index).split('\n').length;
        violations.push(`${toRelative(filePath)}:${lineIndex} framer y translation ${px}px exceeds 8px`);
      }
    }
  }
}

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }
    if (/\.(css|tsx)$/.test(entry.name)) {
      scanFile(fullPath);
    }
  }
}

loadAllowlist();
targetDirs.forEach((dir) => walk(path.join(ROOT, dir)));

if (violations.length > 0) {
  console.error('Motion policy violations found:');
  violations.forEach((v) => console.error(`- ${v}`));
  process.exit(1);
}

console.log('Motion policy checks passed.');
