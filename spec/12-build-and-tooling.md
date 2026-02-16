# Build and Tooling

Source: `vite.config.ts`, `package.json`, `tsconfig.json`

## Overview

Poseidon.AI is built with Vite 5.2 + React 18.2 + TypeScript (strict) + Tailwind CSS 4.1. The build produces optimized, code-split bundles with manual chunk strategies, optional PWA support, and production-grade minification.

## Tech Stack

| Layer | Tool | Version |
|---|---|---|
| Build | Vite | 5.2.11 |
| Framework | React | 18.2.0 |
| Language | TypeScript | 5.4.5 (strict mode) |
| Styling | Tailwind CSS | 4.1.18 |
| Testing | Vitest | 4.0.18 |
| Animation | Framer Motion | 12.33.0 |
| Charts | Recharts | 3.7.0 |
| Icons | Lucide React | 0.563.0 |
| UI Primitives | Radix UI | Various |
| Variants | class-variance-authority | 0.7.1 |
| Class Merging | tailwind-merge | 3.4.0 |

## Vite Configuration

### Plugins

| Plugin | Condition | Purpose |
|---|---|---|
| `@vitejs/plugin-react` | Always | React JSX transform, Fast Refresh |
| `rollup-plugin-visualizer` | `V4_ENABLE_VISUALIZER=1` | Bundle analysis HTML report |
| `vite-plugin-pwa` | `V4_ENABLE_PWA=1` | Service worker, offline caching |

### Manual Chunks

```
vendor-react   → react, react-dom, scheduler, use-sync-external-store
vendor-charts  → recharts, d3-*, internmap
vendor-motion  → framer-motion, motion-dom
vendor-icons   → lucide-react
vendor-runtime → all other node_modules
```

### Build Options

| Option | Value | Purpose |
|---|---|---|
| `chunkSizeWarningLimit` | 600 KB | Warning threshold per chunk |
| `sourcemap` | `false` | No sourcemaps in production |
| `minify` | `terser` | Terser minification |
| `compress.drop_console` | `true` | Strip console.* in production |
| `compress.drop_debugger` | `true` | Strip debugger statements |

### Dev Server

| Option | Value |
|---|---|
| `port` | 5173 |
| `host` | `true` (network accessible) |

### Path Alias

```typescript
'@' → './src'
```

## PWA Configuration

Conditional via `V4_ENABLE_PWA=1` environment variable.

| Setting | Value |
|---|---|
| `registerType` | `prompt` (user chooses when to update) |
| `manifest` | `false` (uses custom `public/manifest.json`) |
| `skipWaiting` | `true` |
| `clientsClaim` | `true` |

### Workbox Caching

| Pattern | Strategy | Cache Name | Max Entries | Max Age |
|---|---|---|---|---|
| `**/*.{js,css,html,...}` | Precache | — | — | — |
| Static assets (js/css/svg/png/...) | CacheFirst | `poseidon-v1-assets` | 100 | 30 days |
| API calls (`/api/`) | NetworkFirst | `poseidon-v1-api` | 50 | 5 min |

API cache has a 5-second network timeout before falling back to cache.

## TypeScript Configuration

| Option | Value |
|---|---|
| `target` | ES2020 |
| `module` | ESNext |
| `moduleResolution` | Bundler |
| `jsx` | react-jsx |
| `strict` | true |
| `noUnusedLocals` | true |
| `noUnusedParameters` | true |
| `noFallthroughCasesInSwitch` | true |
| `isolatedModules` | true |
| `noEmit` | true |

Path alias: `@/*` → `./src/*`

Excludes test files from compilation: `src/**/*.test.ts`, `src/**/*.test.tsx`, `src/**/__tests__/**`

## Dependencies

### Runtime (17)

| Package | Version | Purpose |
|---|---|---|
| `react` | ^18.2.0 | UI framework |
| `react-dom` | ^18.2.0 | DOM rendering |
| `@radix-ui/react-dialog` | ^1.1.15 | Accessible dialog |
| `@radix-ui/react-dropdown-menu` | ^2.1.16 | Dropdown menus |
| `@radix-ui/react-popover` | ^1.1.15 | Popovers |
| `@radix-ui/react-select` | ^2.2.6 | Select inputs |
| `@radix-ui/react-slot` | ^1.2.4 | Slot composition |
| `@radix-ui/react-tabs` | ^1.2.8 | Tab panels |
| `@radix-ui/react-tooltip` | ^1.2.8 | Tooltips |
| `@tailwindcss/container-queries` | ^0.1.1 | Container query support |
| `class-variance-authority` | ^0.7.1 | CVA variant system |
| `clsx` | ^2.1.1 | Conditional class names |
| `cmdk` | ^1.1.1 | Command palette (Cmd+K) |
| `framer-motion` | ^12.33.0 | Animation library |
| `lucide-react` | ^0.563.0 | Icon library |
| `recharts` | ^3.7.0 | Chart library |
| `tailwind-merge` | ^3.4.0 | Tailwind class deduplication |

### Dev (17)

| Package | Version | Purpose |
|---|---|---|
| `@tailwindcss/postcss` | ^4.1.18 | Tailwind PostCSS plugin |
| `@testing-library/jest-dom` | ^6.9.1 | DOM matchers |
| `@testing-library/react` | ^16.3.2 | React testing utilities |
| `@types/react` | ^18.2.66 | React type definitions |
| `@types/react-dom` | ^18.2.22 | React DOM type definitions |
| `@vitejs/plugin-react` | ^4.2.1 | Vite React plugin |
| `@vitest/ui` | ^4.0.18 | Vitest browser UI |
| `autoprefixer` | ^10.4.24 | CSS vendor prefixes |
| `jsdom` | ^28.0.0 | DOM environment for tests |
| `postcss` | ^8.5.6 | CSS processing |
| `rollup-plugin-visualizer` | ^6.0.5 | Bundle visualization |
| `tailwindcss` | ^4.1.18 | Utility CSS framework |
| `terser` | ^5.46.0 | JS minification |
| `typescript` | ^5.4.5 | Type checking |
| `vite` | ^5.2.11 | Build tool |
| `vite-plugin-pwa` | ^1.2.0 | PWA support |
| `vitest` | ^4.0.18 | Test runner |

## npm Scripts

| Script | Command | Purpose |
|---|---|---|
| `dev` | `vite` | Development server |
| `build` | `vite build` | Production build |
| `preview` | `vite preview` | Preview production build |
| `test` | `vitest` | Watch mode tests |
| `test:run` | `vitest run` | Single-run tests |
| `test:ui` | `vitest --ui` | Browser test UI |
| `test:coverage` | `vitest run --coverage` | Coverage report |
| `analyze` | `vite build --mode analyze` | Bundle analysis |

### Governance & Quality (see [11-governance-and-enforcement.md](11-governance-and-enforcement.md))

| Script | Command | Purpose |
|---|---|---|
| `check:design-system` | Both usage + token scripts `--strict` | Full design system check |
| `check:design-system:usage` | `check-design-system-usage.mjs` | Component/style usage |
| `check:design-system:tokens` | `check-design-token-hygiene.mjs` | CSS token hygiene |
| `check:visual-system` | `check-page-visual-system.mjs` | Visual system baselines |
| `generate:registry` | `generate-registry-json.mjs` | Generate registry JSON |
| `check:registry-sync` | `generate-registry-json.mjs --check` | Verify registry sync |
| `check:contracts` | `vitest run` screen-contracts | Screen contract tests |
| `test:a11y:smoke` | `a11y-smoke.mjs` | A11y smoke tests |
| `check:a11y-structure` | `check-a11y-structure.mjs` | Semantic HTML structure |
| `check:contrast-budget` | `check-contrast-budget.mjs` | Color contrast thresholds |
| `check:cta-hierarchy` | `check-cta-hierarchy.mjs` | CTA budget enforcement |
| `check:microcopy-tone` | `check-microcopy-tone.mjs` | Microcopy catalog validation |
| `check:bundle-budget` | `check-bundle-budget.mjs` | Bundle size budgets |
| `check:motion-policy` | `check-motion-policy.mjs` | Animation constraints |
| `verify:pwa` | `verify-pwa.mjs` | PWA configuration |
| `verify:dashboard-artifacts` | `verify-dashboard-artifact-freshness.mjs` | Build artifact freshness |
| `test:lighthouse` | `lighthouse-ci.mjs` | Lighthouse CI audits |

## Cross-References

- [08-css-architecture.md](08-css-architecture.md) — CSS file structure and import chain
- [09-routing-and-app-shell.md](09-routing-and-app-shell.md) — Code splitting via lazy routes
- [11-governance-and-enforcement.md](11-governance-and-enforcement.md) — Governance npm commands and enforcement flow
- [13-hooks-and-utilities.md](13-hooks-and-utilities.md) — Custom hooks (`usePWA`, etc.)
- [14-content-and-microcopy.md](14-content-and-microcopy.md) — Environment configuration and feature flags
- [15-performance-budgets.md](15-performance-budgets.md) — Bundle budgets and Lighthouse CI thresholds
