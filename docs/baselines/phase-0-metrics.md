# Phase 0 Baselines

Captured: 2026-02-14

## Test Suite

| Metric | Value |
|---|---|
| Test files | 13 |
| Tests passed | 184 / 184 |
| Duration | ~3.3s |

## Design System Checks

| Check | Status |
|---|---|
| `check:design-system:strict` | PASS |
| `check:registry-sync` | PASS |
| `check:design-token-hygiene --strict` | PASS |

## Build Output

| Metric | Raw | Gzip |
|---|---|---|
| CSS total | 144,591 B (141.2 KB) | 26,680 B (26.1 KB) |
| JS total | 918,731 B (897.0 KB) | 297,964 B (291.0 KB) |

### CSS Breakdown

| File | Raw |
|---|---|
| `index-*.css` | 143,928 B |
| `ui-core-*.css` | 663 B |

### JS Breakdown (top chunks)

| File | Raw | Gzip |
|---|---|---|
| `index-*.js` (app core) | 535,248 B | 156,240 B |
| `vendor-react-*.js` | 132,723 B | 42,750 B |
| `Protect-*.js` | 18,419 B | 6,620 B |
| `Dashboard-*.js` | 18,097 B | 6,760 B |
| `Execute-*.js` | 14,424 B | 5,040 B |
| `ui-core-*.js` | 10,581 B | 4,280 B |
| `Grow-*.js` | 10,583 B | 4,150 B |

## Registry

| Category | TS Registry | Script Registry |
|---|---|---|
| Canonical | 82 | 82 |
| Compat | 0 | 0 |
| Legacy | 4 | 4 |
| Forbidden | 2 | 2 |
| **Total** | **88** | **88** |

## Phase 5 Targets (from plan)

| Metric | Baseline | Target |
|---|---|---|
| CSS raw | 144,591 B | <= 86,755 B (>= 40% reduction) |
| CSS gzip | 26,680 B | <= 18,676 B (>= 30% reduction) |
| JS raw delta | — | < +20 KB (Radix overhead) |
