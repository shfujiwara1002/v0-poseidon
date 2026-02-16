# Content and Microcopy

Source: `src/content/microcopy-catalog.ts`, `src/services/uxTelemetry.ts`, `src/config/env.ts`

## Overview

Centralized content catalog with tone governance, UX telemetry for Web Vitals reporting, and environment configuration with feature flags. The microcopy system ensures consistent, calm messaging across the application.

---

## Microcopy Catalog

Source: `src/content/microcopy-catalog.ts`

### Catalog Keys (9)

| Key | Value | Context |
|---|---|---|
| `app_loading` | Loading Poseidon.AI | Boot splash |
| `app_boot_subtitle` | Preparing your financial command center | Boot splash |
| `command_palette_empty` | No matching commands. Try a broader keyword. | Command palette |
| `command_palette_title` | Command Palette | Command palette header |
| `search_recent_title` | Recent searches | Search bar |
| `search_no_results` | No results found for "{query}" | Search bar |
| `error_boundary_title` | Something interrupted this workflow | Error boundary |
| `error_boundary_retry` | Try again | Error boundary action |
| `error_boundary_home` | Return to dashboard | Error boundary action |

### `copy()` Helper

```typescript
export function copy(key: MicrocopyKey, vars?: Record<string, string | number>): string
```

Template interpolation with `{var}` syntax. Example:

```typescript
copy('search_no_results', { query: 'transfers' })
// → "No results found for "transfers""
```

### `MicrocopyKey` Type

```typescript
export type MicrocopyKey = keyof typeof microcopyCatalog;
```

Union of all 9 catalog key names. Provides compile-time safety for microcopy references.

### Tone Rules

- Use **calm, action-oriented** language — avoid panic/alarm phrasing
- Error messages should describe what happened, not blame the user
- Actions should be clear and forward-looking ("Try again", "Return to dashboard")
- Enforced by: `scripts/check-microcopy-tone.mjs` (see [11-governance-and-enforcement.md](11-governance-and-enforcement.md))

### Required Keys

The following 4 keys are validated by the governance script and must always be present:

1. `app_loading`
2. `command_palette_empty`
3. `search_no_results`
4. `error_boundary_title`

---

## UX Telemetry

Source: `src/services/uxTelemetry.ts`

### Overview

Reports Web Vitals metrics to a configurable endpoint. Gated behind a feature flag — disabled by default.

### Metric Types

| Metric | Full Name | Description |
|---|---|---|
| `LCP` | Largest Contentful Paint | Time until largest content element renders |
| `FID` | First Input Delay | Time from first interaction to browser response |
| `CLS` | Cumulative Layout Shift | Visual stability score |
| `INP` | Interaction to Next Paint | Responsiveness of interactions |
| `TTFB` | Time to First Byte | Server response time |

### API

```typescript
reportVitalMetric(name: VitalName, value: number, path?: string): void
```

**Prerequisites** (all must be true):
1. `env.features.uxMetrics` is `true`
2. `env.uxMetricsEndpoint` is non-empty

**Transport**: Uses `navigator.sendBeacon()` (preferred for page-unload reliability), falls back to `fetch()` with `keepalive: true`.

**Payload**:
```json
{ "name": "LCP", "value": 1234.5, "path": "/dashboard", "timestamp": 1708000000000 }
```

---

## Environment Configuration

Source: `src/config/env.ts`

### Feature Flags

| Flag | Env Var | Default | Description |
|---|---|---|---|
| `codeSplitting` | `VITE_FEATURE_CODE_SPLITTING` | `true` | Enable route-level code splitting |
| `contextAPI` | `VITE_FEATURE_CONTEXT_API` | `true` | Enable React Context providers |
| `analytics` | `VITE_ENABLE_ANALYTICS` | `false` | Enable analytics tracking |
| `performanceMonitoring` | `VITE_ENABLE_PERFORMANCE_MONITORING` | `false` | Enable performance monitoring |
| `uxMetrics` | `VITE_ENABLE_UX_METRICS` | `false` | Enable Web Vitals telemetry |

### API Configuration

| Config | Env Var | Default | Description |
|---|---|---|---|
| `apiUrl` | `VITE_API_URL` | `/api` | Backend API base URL |
| `mockApi` | `VITE_MOCK_API` | `true` | Use mock data instead of live API |
| `uxMetricsEndpoint` | `VITE_UX_METRICS_ENDPOINT` | `''` (empty) | Web Vitals reporting endpoint |

### Build Info

| Config | Env Var | Default |
|---|---|---|
| `version` | `VITE_VERSION` | `1.0.0-dev` |
| `buildEnv` | `VITE_BUILD_ENV` | `development` |

### Runtime Detection

| Property | Source | Description |
|---|---|---|
| `isDev` | `import.meta.env.DEV` | `true` in development |
| `isProd` | `import.meta.env.PROD` | `true` in production |
| `isTest` | `import.meta.env.MODE === 'test'` | `true` during tests |

In development mode, configuration is logged to the console on startup.

---

## Cross-References

- [11-governance-and-enforcement.md](11-governance-and-enforcement.md) — `check-microcopy-tone.mjs` enforcement
- [12-build-and-tooling.md](12-build-and-tooling.md) — Vite environment variable handling
- [13-hooks-and-utilities.md](13-hooks-and-utilities.md) — `useTimeContext` drives greeting microcopy
- [15-performance-budgets.md](15-performance-budgets.md) — Web Vitals reporting and Lighthouse CI
