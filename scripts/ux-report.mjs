#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const scanPath = path.join(root, 'docs', 'baselines', 'ux-audit-latest.json');
const verifyPath = path.join(root, 'docs', 'baselines', 'ux-verify-last-run.json');
const priorityPath = path.join(root, 'spec', 'ux-priority-map.json');
const outputMdPath = path.join(root, 'docs', 'baselines', 'ux-audit-latest.md');
const outputJsonPath = path.join(root, 'docs', 'baselines', 'ux-audit-latest.json');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function readJson(file, fallback) {
  if (!fs.existsSync(file)) return fallback;
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

const scan = readJson(scanPath, { scores: [], issues: [], meta: {} });
const verify = readJson(verifyPath, { ok: false, failed: 0, results: [] });
const priority = readJson(priorityPath, {
  criteriaWeights: {},
  demoImpactWeights: {},
  effortCost: {},
});

const reachMap = {
  token: 3,
  component: 2,
  shell: 2,
  page: 1,
  copy: 1,
};

function scoreIssue(issue) {
  const demoImpact = priority.demoImpactWeights?.[issue.demoImpact] ?? 1;
  const criteriaWeight = priority.criteriaWeights?.[issue.criteria] ?? 1;
  const reach = reachMap[issue.layer] ?? 1;
  const effort = priority.effortCost?.[issue.effort] ?? 2;
  return demoImpact * 4 + criteriaWeight * 3 + reach * 2 - effort;
}

const issues = (scan.issues ?? []).map((issue) => ({
  ...issue,
  priorityScore: scoreIssue(issue),
})).sort((a, b) => b.priorityScore - a.priorityScore);

const scoreMap = new Map((scan.scores ?? []).map((s) => [s.criteria, s.score]));
if (!verify.ok) {
  const currentReliability = Number(scoreMap.get('reliability') ?? 4.5);
  scoreMap.set('reliability', Number(Math.max(1, currentReliability - 0.6).toFixed(1)));
}

const mergedScores = (scan.scores ?? []).map((s) => ({
  ...s,
  score: Number(scoreMap.get(s.criteria) ?? s.score),
}));

const overall = mergedScores.length
  ? (mergedScores.reduce((acc, s) => acc + s.score, 0) / mergedScores.length)
  : 0;

const nextJson = {
  ...scan,
  scores: mergedScores,
  issues,
  summary: {
    overallScore: Number(overall.toFixed(2)),
    openIssues: issues.filter((i) => i.status === 'open').length,
    verifyOk: Boolean(verify.ok),
    verifyFailedChecks: verify.failed ?? 0,
    generatedAt: new Date().toISOString(),
  },
};

ensureDir(path.dirname(outputJsonPath));
fs.writeFileSync(outputJsonPath, JSON.stringify(nextJson, null, 2));

const md = [
  '# UX Audit Latest',
  '',
  `- Date: ${new Date().toISOString().slice(0, 10)}`,
  `- Overall Score: **${nextJson.summary.overallScore}/5.0**`,
  `- Verify: **${verify.ok ? 'PASS' : 'FAIL'}**`,
  `- Open Issues: **${nextJson.summary.openIssues}**`,
  '',
  '## Criteria Scores',
  '| Criteria | Score | Note |',
  '| --- | ---: | --- |',
  ...mergedScores.map((s) => `| ${s.criteria} | ${s.score.toFixed(1)} | ${s.note} |`),
  '',
  '## Top Open Issues (Priority Sorted)',
  '| ID | Route | Criteria | Severity | PriorityScore | Autofixable | Symptom |',
  '| --- | --- | --- | --- | ---: | --- | --- |',
  ...(issues.length
    ? issues.map(
        (i) =>
          `| ${i.id} | ${i.route} | ${i.criteria} | ${i.severity} | ${i.priorityScore} | ${i.autofixable ? 'yes' : 'no'} | ${String(i.symptom).replaceAll('|', '\\|')} |`,
      )
    : ['| - | - | - | - | - | - | No open issues |']),
  '',
  '## Verify Checks',
  '| Command | Status | Exit |',
  '| --- | --- | ---: |',
  ...((verify.results ?? []).map((r) => `| \`${r.cmd}\` | ${r.ok ? 'PASS' : 'FAIL'} | ${r.status} |`)),
  '',
].join('\n');

fs.writeFileSync(outputMdPath, md);
console.log(JSON.stringify({ ok: true, outputMdPath: path.relative(root, outputMdPath), outputJsonPath: path.relative(root, outputJsonPath) }, null, 2));
