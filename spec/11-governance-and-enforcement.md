# Governance and Enforcement

Source: `scripts/*.mjs`, `src/design-system/__tests__/`, `src/contracts/__tests__/`, `src/pages/__tests__/`, `src/components/__tests__/`, `src/__tests__/`

## Overview

The design system is enforced through 15 governance scripts, 16 test files, and npm commands that gate CI builds. Rules cover inline style bans, engine color literal bans, shell requirements, component registry compliance, CSS token hygiene, accessibility structure, bundle budgets, motion policy, CTA hierarchy, contrast budgets, microcopy tone, and PWA validation.

---

## Governance Scripts

### Design System Scripts (6)

#### 1. `check-design-system-usage.mjs`

**Purpose**: Validates component and style usage across all reachable source files.

| Rule | Type | Description |
|---|---|---|
| `[inline-style]` | Error | Bans `style={{}}` in components/pages not in exception list |
| `[engine-color]` | Error | Bans literal engine hex colors (#14B8A6, #8B5CF6, #F59E0B, #3B82F6) |
| `[shell]` | Error | Active pages must use `CommandCenterShell`, `EnginePageShell`, or `PageShell` |
| `[registry]` | Error | Imported components must exist in registry; legacy/forbidden imports fail |
| `[compat]` | Warning/Error | Compat-status components warn (strict mode: error) |

Flags: `--strict` (compat warnings become errors)

#### 2. `check-design-token-hygiene.mjs`

**Purpose**: Enforces token usage in page CSS files within contract selector scopes.

| Rule | Type | Description |
|---|---|---|
| `[engine-color]` | Error | Bans hex engine color literals in contract selectors |
| `[font-family]` | Warning | Direct font-family values; prefer `var(--font-*)` |
| `[font-size]` | Warning | Direct rem values; prefer `var(--font-size-*)` |

Scans CSS selectors matching prefixes: `.mission-`, `.dashboard-`, `.engine-`, `.entry-`

Flags: `--strict` (warnings become errors)

#### 3. `check-page-visual-system.mjs`

**Purpose**: Tracks style regression against baselines for all page components.

| Rule | Type | Description |
|---|---|---|
| Style regression | Error | `style={{}}` count exceeds baseline |
| Utility regression | Error | Tailwind utility className count exceeds baseline |
| Shell missing | Error | Active pages must use a shell component |

Maintains per-page baselines (inline style count + utility class count). Strict mode requires zero styles/utilities for active pages.

#### 4. `generate-registry-json.mjs`

**Purpose**: Generates `scripts/design-system-registry.gen.json` from `component-registry.ts`.

Parses: `canonicalNames`, `compatEntries`, `legacyEntries`, `forbiddenEntries`

Flags: `--check` (verify JSON is in sync with source)

#### 5. `verify-dashboard-artifact-freshness.mjs`

**Purpose**: Verifies dashboard build artifacts are current after builds. Checks for required markers (`dashboard-insights-card--activity`, `activity-rail-node`) and forbids legacy markers (`"Review Actions"`, `"Check Alerts"`, `"View Goals"`).

#### 6. `design-system-config.mjs`

**Purpose**: Shared configuration constants consumed by other scripts.

Exports:

| Export | Type | Description |
|---|---|---|
| `COMPONENT_REGISTRY` | Object (101 entries) | Full registry with status per component |
| `STYLE_EXCEPTION_FILES` | Set (19 files) | Files allowed to use `style={{}}` |
| `ACTIVE_PAGES` | Set (34 pages) | All active page component names |
| `FORBIDDEN_ENGINE_COLOR_LITERALS` | Array (4) | `['#14B8A6', '#8B5CF6', '#F59E0B', '#3B82F6']` |
| `ENGINE_COLOR_LITERAL_ALLOWED_FILES` | Set (4 files) | Files allowed to use engine hex literals |
| `TOKEN_HYGIENE_TARGET_PREFIXES` | Array (4) | `['.mission-', '.dashboard-', '.engine-', '.entry-']` |

---

### Accessibility Scripts (3)

#### 7. `a11y-smoke.mjs`

**Purpose**: Validates critical accessibility landmarks and ARIA attributes are present in core UI components.

| Rule | Type | Description |
|---|---|---|
| Main content landmark | Error | AppShell must expose `<main id="main-content">` |
| CommandPalette dialog | Error | Must have `role="dialog"` and `aria-modal="true"` |
| AIChatbot dialog | Error | Must have `role="dialog"` and `aria-modal="true"` |
| PageShell primary feed | Error | Must render as region landmark |
| AppNav skip link | Error | Must expose skip link with "Skip to content" text |

#### 8. `check-a11y-structure.mjs`

**Purpose**: Validates semantic HTML structure and heading hierarchy for accessibility compliance.

| Rule | Type | Description |
|---|---|---|
| Main content landmark | Error | AppShell must expose `<main id="main-content">` |
| Skip link presence | Error | AppNav must include skip link text |
| Primary feed labeling | Error | PageShell primary feed must be labeled by hero heading via `aria-labelledby` |
| Hero heading (×5) | Error | All 5 hero variants (Command, Focused, Analytical, Editorial, Minimal) must render `<h1>` with shared heading ID |

#### 9. `check-contrast-budget.mjs`

**Purpose**: Validates color token alpha values meet minimum contrast thresholds.

| Rule | Type | Description |
|---|---|---|
| Muted token alpha | Error | `--muted` must be rgba with alpha ≥ 0.68 |
| Muted-2 token alpha | Error | `--muted-2` must be rgba with alpha ≥ 0.58 |
| Focus ring token | Error | `--state-focus-ring` token must be defined |

Token file: `src/styles/system/tokens.css`

---

### Performance Scripts (3)

#### 10. `check-bundle-budget.mjs`

**Purpose**: Enforces CSS and JavaScript bundle size limits.

| Rule | Type | Description |
|---|---|---|
| CSS raw size | Error | Combined CSS ≤ 175 KB uncompressed |
| CSS gzip size | Error | Combined CSS ≤ 32 KB gzipped |
| Index JS raw size | Error | `index-*.js` ≤ 130 KB uncompressed |
| Index JS gzip size | Error | `index-*.js` ≤ 45 KB gzipped |

Limits overridable via `BUDGET_CSS_RAW_MAX`, `BUDGET_CSS_GZIP_MAX`, `BUDGET_INDEX_JS_RAW_MAX`, `BUDGET_INDEX_JS_GZIP_MAX` env vars.

See [15-performance-budgets.md](15-performance-budgets.md) for full details.

#### 11. `check-motion-policy.mjs`

**Purpose**: Enforces calm motion policy with duration, translation, and infinite animation limits.

| Rule | Type | Description |
|---|---|---|
| Animation duration | Error | Durations > 220ms (except functional: spinner/skeleton/shimmer) |
| Transform translation | Error | `translate[XY]()` pixel values > 8px |
| Infinite animation | Error | Infinite animations (non-functional, non-allowlisted) |
| Framer duration | Error | Framer Motion `duration` > 220ms |
| Framer translation | Error | Framer Motion `y` property > 8px |

Allowlist: `scripts/motion-policy.allowlist.txt` (34 entries, format: `file|rule`)

See [15-performance-budgets.md](15-performance-budgets.md) for full details.

#### 12. `lighthouse-ci.mjs`

**Purpose**: Runs Lighthouse CI automated auditing.

Uses local `lhci` binary or falls back to `npx @lhci/cli autorun`. Skips locally if not in CI and `lhci` not installed. Config: `lighthouserc.json`.

See [15-performance-budgets.md](15-performance-budgets.md) for thresholds and audited routes.

---

### Content & UX Scripts (2)

#### 13. `check-cta-hierarchy.mjs`

**Purpose**: Enforces single primary CTA per page and prevents primary CTAs in engine/core nav groups.

| Rule | Type | Description |
|---|---|---|
| Engine/core nav groups | Error | AppNav must special-case `'engine'` or `'core'` nav groups |
| Engine/core primary CTAs | Error | Engine/core AppNav must NOT expose `variant: 'primary'` actions |
| Hero primary CTA limit | Error | Each hero variant ≤ 1 `entry-btn entry-btn--primary` |

See [15-performance-budgets.md](15-performance-budgets.md) for full details.

#### 14. `check-microcopy-tone.mjs`

**Purpose**: Enforces consistent microcopy using centralized catalog and prevents hardcoded strings.

| Rule | Type | Description |
|---|---|---|
| Catalog file presence | Error | `src/content/microcopy-catalog.ts` must exist |
| Required keys | Error | Catalog must contain: `app_loading`, `command_palette_empty`, `search_no_results`, `error_boundary_title` |
| SearchBar hardcoded string | Error | Must use `copy()` helper, not hardcoded strings |
| CommandPalette hardcoded string | Error | Must use `copy()` helper, not hardcoded strings |
| ErrorBoundary tone | Error | Must use calm, action-oriented copy from catalog |

See [14-content-and-microcopy.md](14-content-and-microcopy.md) for catalog details.

---

### Infrastructure Scripts (1)

#### 15. `verify-pwa.mjs`

**Purpose**: Validates Progressive Web App configuration.

| Rule | Type | Description |
|---|---|---|
| Service worker file | Error | `public/sw.js` must exist and implement `fetch` handler |
| Service worker registration | Error | `src/hooks/usePWA.ts` must register `/sw.js` |
| Manifest reference | Error | `index.html` must include `rel="manifest"` link |
| Dist service worker | Error | After build, `dist/sw.js` must exist |

---

## Style Exception Whitelist

19 files are permitted to use `style={{}}`:

| File | Reason |
|---|---|
| `src/components/ProofLine.tsx` | Dynamic positioning |
| `src/components/SavingsGoalCard.tsx` | Progress bar width |
| `src/components/Sparkline.tsx` | SVG dimensions |
| `src/components/CashFlowChart.tsx` | Chart dimensions |
| `src/components/EngineHealthStrip.tsx` | Progress indicators |
| `src/components/ExplainabilityPanel.tsx` | Dynamic layout |
| `src/components/SignalRow.tsx` | Signal strength bar |
| `src/components/DataRightsPanel.tsx` | Dynamic content |
| `src/components/RiskScoreDial.tsx` | SVG rotation |
| `src/components/FactorsDropdown.tsx` | Dynamic positioning |
| `src/components/ForecastBandChart.tsx` | Chart dimensions |
| `src/components/TrustIndexCard.tsx` | Score display |
| `src/components/PolicyModelCards.tsx` | Dynamic layout |
| `src/components/OversightQueueTable.tsx` | Table layout |
| `src/components/AuditLedgerTable.tsx` | Table layout |
| `src/pages/GovernTrust.tsx` | Trust visualization |
| `src/pages/Notifications.tsx` | Notification layout |
| `src/pages/AlertsHub.tsx` | Alert layout |
| `src/pages/ActivityTimelinePage.tsx` | Timeline layout |

## Engine Color Literal Allowed Files

4 files may use engine hex literals directly:

| File | Reason |
|---|---|
| `src/design-system/engine-semantic.ts` | Canonical color definitions |
| `src/components/PolicyModelCards.tsx` | Chart color mapping |
| `src/components/OversightQueueTable.tsx` | Status color mapping |
| `src/components/AuditLedgerTable.tsx` | Audit entry colors |

---

## npm Commands

### Design System

| Command | Script | Mode |
|---|---|---|
| `npm run check:design-system` | `check-design-system-usage.mjs --strict` + `check-design-token-hygiene.mjs --strict` | Strict |
| `npm run check:design-system:usage` | `check-design-system-usage.mjs` | Normal |
| `npm run check:design-system:tokens` | `check-design-token-hygiene.mjs` | Normal |
| `npm run check:design-system:strict` | Both scripts with `--strict` | Strict |
| `npm run check:visual-system` | `check-page-visual-system.mjs` | Normal |
| `npm run check:visual-system:strict` | `check-page-visual-system.mjs --strict` | Strict |
| `npm run generate:registry` | `generate-registry-json.mjs` | Generate |
| `npm run check:registry-sync` | `generate-registry-json.mjs --check` | Verify |
| `npm run check:contracts` | `vitest run src/contracts/__tests__/screen-contracts.test.tsx` | Test |

### Accessibility

| Command | Script | Mode |
|---|---|---|
| `npm run test:a11y:smoke` | `a11y-smoke.mjs` | Smoke |
| `npm run check:a11y-structure` | `check-a11y-structure.mjs` | Normal |
| `npm run check:contrast-budget` | `check-contrast-budget.mjs` | Normal |

### Performance

| Command | Script | Mode |
|---|---|---|
| `npm run check:bundle-budget` | `check-bundle-budget.mjs` | Normal |
| `npm run check:motion-policy` | `check-motion-policy.mjs` | Normal |
| `npm run test:lighthouse` | `lighthouse-ci.mjs` | CI |

### Content & UX

| Command | Script | Mode |
|---|---|---|
| `npm run check:cta-hierarchy` | `check-cta-hierarchy.mjs` | Normal |
| `npm run check:microcopy-tone` | `check-microcopy-tone.mjs` | Normal |

### Infrastructure

| Command | Script | Mode |
|---|---|---|
| `npm run verify:pwa` | `verify-pwa.mjs` | Normal |
| `npm run verify:dashboard-artifacts` | `verify-dashboard-artifact-freshness.mjs` | Normal |

---

## Test Inventory

### Test Files (16)

#### Design System Tests (1 file)

| File | Tests | Category |
|---|---|---|
| `src/design-system/__tests__/design-system-enforcement.test.ts` | ~50 | Registry, tokens, engine colors, inline styles |

#### Contract Tests (2 files)

| File | Tests | Category |
|---|---|---|
| `src/contracts/__tests__/screen-contracts.test.tsx` | ~60 | 36 screen contracts, slots, widgets, routing |
| `src/contracts/__tests__/screen-contracts-v4.test.tsx` | ~30 | V4 contract validation |

#### Flow Tests (4 files)

| File | Tests | Category |
|---|---|---|
| `src/__tests__/flows/protect-decision.test.tsx` | ~8 | PRT02 signal → evidence → decision order |
| `src/__tests__/flows/execute-approval.test.tsx` | ~7 | EXE02 consent-gated approval |
| `src/__tests__/flows/govern-audit.test.tsx` | ~14 | GOV01 → GOV02 → GOV03 audit chain |
| `src/__tests__/flows/rights-exercise.test.tsx` | ~6 | SET04 export/delete with DELETE confirmation |

#### Page Tests (2 files)

| File | Tests | Category |
|---|---|---|
| `src/pages/__tests__/visual-system-all-pages.test.tsx` | ~20 | Page shell usage, visual system compliance |
| `src/pages/__tests__/DashboardInsights.test.tsx` | ~5 | Dashboard insights page |

#### Component Tests (7 files)

| File | Tests | Category |
|---|---|---|
| `src/components/__tests__/Button.test.tsx` | ~9 | Button variants, sizes, loading, disabled |
| `src/components/__tests__/DashboardInsightsPanel.test.tsx` | ~2 | Morning/evening variants |
| `src/components/__tests__/GlassCard.test.tsx` | ~9 | Glass card variants, tones |
| `src/components/__tests__/GovernContractSet.test.tsx` | ~3 | All sub-components, fallback cases |
| `src/components/__tests__/PageShellKPIGrid.test.tsx` | ~3 | KPI grid layout for 0/3/5 cards |
| `src/components/__tests__/PageShellSemantics.test.tsx` | ~2 | Region rendering, aria-labelledby |
| `src/components/__tests__/HeroVariants.snapshot.test.tsx` | ~3 | Hero variant markers, structure differentiation |

### Test Categories

| Category | Coverage |
|---|---|
| Screen contract validation | All 36 screens emit required `data-slot` DOM nodes |
| Component registry compliance | All imported components have valid registry entries |
| Inline style enforcement | No unauthorized `style={{}}` usage |
| Engine color literal ban | No hex engine colors outside allowed files |
| Shell requirement | All active pages use PageShell or equivalent |
| Token hygiene | No raw font/color values in contract CSS |
| Flow tests | Critical user journeys (protect, execute, govern, rights) |
| Component rendering | Button, GlassCard, PageShell, Hero variants |

---

## Enforcement Flow

```
Source Change
  → npm run check:design-system (strict)
    → check-design-system-usage.mjs --strict
      → Inline style scan
      → Engine color literal scan
      → Shell requirement scan
      → Registry compliance scan
    → check-design-token-hygiene.mjs --strict
      → CSS token scan in contract selectors
  → npm run check:a11y-structure
    → Landmark structure validation
    → Hero heading hierarchy
  → npm run check:cta-hierarchy
    → CTA budget validation
  → npm run check:microcopy-tone
    → Catalog key validation
    → Hardcoded string detection
  → npm run check:motion-policy
    → Duration/translation/infinite animation limits
  → npm run check:contrast-budget
    → Muted alpha and focus ring validation
  → npm run test:run
    → design-system-enforcement.test.ts
    → screen-contracts.test.tsx + v4
    → visual-system-all-pages.test.tsx
    → Flow tests (protect, execute, govern, rights)
    → Component tests (7 files)
  → npm run build
    → npm run check:bundle-budget
    → npm run verify:pwa
    → npm run verify:dashboard-artifacts
```

---

## Cross-References

- [02-component-registry.md](02-component-registry.md) — Registry entries and status definitions
- [04-engine-semantics.md](04-engine-semantics.md) — Forbidden engine color literals
- [05-screen-contracts.md](05-screen-contracts.md) — Screen contract test coverage
- [08-css-architecture.md](08-css-architecture.md) — Token hygiene target prefixes
- [10-accessibility.md](10-accessibility.md) — Colorblind palettes, ARIA requirements
- [14-content-and-microcopy.md](14-content-and-microcopy.md) — Microcopy catalog and tone rules
- [15-performance-budgets.md](15-performance-budgets.md) — Bundle budgets, motion policy, Lighthouse CI, CTA hierarchy, contrast budget
