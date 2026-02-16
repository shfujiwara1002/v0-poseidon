# Performance Budgets

Source: `scripts/check-bundle-budget.mjs`, `scripts/check-motion-policy.mjs`, `scripts/check-cta-hierarchy.mjs`, `scripts/check-contrast-budget.mjs`, `scripts/lighthouse-ci.mjs`, `lighthouserc.json`

## Overview

Performance is governed by five enforcement systems: bundle size budgets, motion policy, CTA hierarchy, contrast budgets, and Lighthouse CI. All are enforced via npm scripts and can gate CI builds.

---

## Bundle Size Budgets

Source: `scripts/check-bundle-budget.mjs`

### Limits

| Asset | Raw Max | Gzip Max |
|---|---|---|
| CSS (all combined) | 185 KB | 32 KB |
| Index JS (`index-*.js`) | 130 KB | 45 KB |

### Environment Overrides

| Env Var | Default | Description |
|---|---|---|
| `BUDGET_CSS_RAW_MAX` | 185000 | CSS raw byte limit |
| `BUDGET_CSS_GZIP_MAX` | 32000 | CSS gzip byte limit |
| `BUDGET_INDEX_JS_RAW_MAX` | 130000 | Index JS raw byte limit |
| `BUDGET_INDEX_JS_GZIP_MAX` | 45000 | Index JS gzip byte limit |

**Requires**: `dist/assets/` from a prior `npm run build`.

**Command**: `npm run check:bundle-budget`

---

## Motion Policy

Source: `scripts/check-motion-policy.mjs`, `scripts/motion-policy.allowlist.txt`

### Rules

| Rule | Limit | Scope | Exceptions |
|---|---|---|---|
| Animation duration | max 220ms | CSS & TSX | Functional animations (spinner, skeleton, shimmer) |
| Transform translation | max 8px | CSS & TSX `translate[XY]()` | Allowlisted files |
| Infinite animations | Forbidden | CSS `animation` / Framer `repeat: Infinity` | Functional animations + allowlist |
| Framer duration | max 220ms | `MotionList.tsx` and other Framer Motion files | Allowlisted |
| Framer translation | max 8px | Framer `y` property | Allowlisted |

### Scan Targets

- `src/styles/components/`
- `src/styles/pages/`
- `src/components/`

### Allowlist

Source: `scripts/motion-policy.allowlist.txt`

Format: `<workspace-relative-file>|<rule>` where `rule` is `duration`, `translation`, or `infinite`.

Example entries:
```
src/styles/components/animations.css|duration
src/styles/components/animations.css|translation
src/styles/components/animations.css|infinite
src/styles/components/effects.css|duration
```

Currently 34 allowlist entries across CSS and TSX files.

**Command**: `npm run check:motion-policy`

---

## CTA Hierarchy

Source: `scripts/check-cta-hierarchy.mjs`

### Rules

| Rule | Type | Description |
|---|---|---|
| Engine/core nav special-case | Error | `AppNav` must special-case `'engine'` or `'core'` nav groups |
| Engine/core primary CTAs | Error | Engine/core `AppNav` must NOT expose `variant: 'primary'` actions |
| Hero primary CTA limit | Error | Each hero variant can have at most 1 `entry-btn entry-btn--primary` |

### Checked Files

- `src/components/AppNav.tsx` — Nav group handling
- `src/components/PageShell/variants/Hero*.tsx` — 5 hero variant files

**Command**: `npm run check:cta-hierarchy`

---

## Contrast Budget

Source: `scripts/check-contrast-budget.mjs`

### Thresholds

| Token | Requirement | Purpose |
|---|---|---|
| `--muted` | rgba alpha ≥ 0.68 | Muted text must meet contrast minimum |
| `--muted-2` | rgba alpha ≥ 0.58 | Secondary muted text contrast minimum |
| `--state-focus-ring` | Must be defined | Focus ring token required for keyboard navigation |

**Token file**: `src/styles/system/tokens.css`

**Command**: `npm run check:contrast-budget`

---

## Lighthouse CI

Source: `scripts/lighthouse-ci.mjs`, `lighthouserc.json`

### Assertion Thresholds

| Metric | Level | Threshold |
|---|---|---|
| Performance score | Warning | ≥ 0.8 (80%) |
| Accessibility score | Error | ≥ 0.9 (90%) |
| Largest Contentful Paint | Warning | ≤ 4000ms |
| Cumulative Layout Shift | Error | ≤ 0.1 |

### Audited Routes (6)

| Route | Page |
|---|---|
| `/dashboard` | Dashboard |
| `/protect` | Protect |
| `/grow` | Grow |
| `/execute` | Execute |
| `/govern` | Govern |
| `/settings` | Settings |

### Configuration

| Setting | Value |
|---|---|
| `numberOfRuns` | 1 |
| `startServerCommand` | `npm run preview -- --host 0.0.0.0 --port 4173` |
| `startServerReadyPattern` | `"Local"` |

### Execution

- Uses local `node_modules/.bin/lhci` if available
- Falls back to `npx @lhci/cli autorun`
- Skips locally if `lhci` not installed and `CI` env var is not set

**Command**: `npm run test:lighthouse`

---

## Cross-References

- [01-design-tokens.md](01-design-tokens.md) — Motion duration tokens, muted alpha values, focus ring token
- [08-css-architecture.md](08-css-architecture.md) — CSS file sizes within budget
- [10-accessibility.md](10-accessibility.md) — Contrast requirements, focus ring
- [11-governance-and-enforcement.md](11-governance-and-enforcement.md) — Script registry and npm commands
- [12-build-and-tooling.md](12-build-and-tooling.md) — Vite build producing `dist/assets/`
- [14-content-and-microcopy.md](14-content-and-microcopy.md) — UX telemetry for Web Vitals
