# Poseidon.AI Design System Specification

Current-state reference for the Poseidon.AI design system as implemented. This is **not** a roadmap — it documents what exists today.

> **Source-of-truth hierarchy:** `src/styles/system/tokens.css` > `src/shared/theme.ts` > these spec docs.
> When a spec file conflicts with source code, the source code is authoritative.

## Spec Index

| File | Description |
|---|---|
| [00-system-overview.md](00-system-overview.md) | Architecture bird's-eye view, tech stack, design philosophy |
| [01-design-tokens.md](01-design-tokens.md) | ~198 CSS custom properties: colors, typography, effects, layout, motion |
| [02-component-registry.md](02-component-registry.md) | 101 registered components with status and categories |
| [03-variant-system.md](03-variant-system.md) | CVA definitions: tone, size, engine accent, card, button, chip |
| [04-engine-semantics.md](04-engine-semantics.md) | 4-engine color/tone/glow mappings and colorblind adaptations |
| [05-screen-contracts.md](05-screen-contracts.md) | 36 screen contracts: slots, widgets, routing, density, mobile |
| [06-domain-models.md](06-domain-models.md) | TypeScript domain types: governance, lifecycle, engine-specific |
| [07-compound-components.md](07-compound-components.md) | PageShell, Card, Section, Grid, Button compound APIs |
| [08-css-architecture.md](08-css-architecture.md) | Import chain, 39-file inventory, naming conventions |
| [09-routing-and-app-shell.md](09-routing-and-app-shell.md) | 36 routes, 12 context providers, RouteUXMeta |
| [10-accessibility.md](10-accessibility.md) | Colorblind palettes, themes, reduced motion, ARIA, focus, a11y governance |
| [11-governance-and-enforcement.md](11-governance-and-enforcement.md) | 15 governance scripts, 16 test files, CI gates, whitelists |
| [12-build-and-tooling.md](12-build-and-tooling.md) | Vite, Tailwind, PWA, chunk strategy, dependencies |
| [13-hooks-and-utilities.md](13-hooks-and-utilities.md) | 13 custom hooks: media queries, PWA, realtime, voice input |
| [14-content-and-microcopy.md](14-content-and-microcopy.md) | Microcopy catalog, UX telemetry, environment config |
| [15-performance-budgets.md](15-performance-budgets.md) | Bundle budgets, motion policy, CTA hierarchy, Lighthouse CI |

## Templates

| File | Purpose |
|---|---|
| [_templates/component-spec-template.md](_templates/component-spec-template.md) | Template for documenting a new component |
| [_templates/screen-contract-template.md](_templates/screen-contract-template.md) | Template for documenting a new screen contract |

## Cross-Reference Convention

Internal links use the format `[NN-filename.md#section-anchor]`. Example: see [01-design-tokens.md#engine-themes](01-design-tokens.md#engine-themes).

## Last Verified

2026-02-15 — 16 test files passing, `check:design-system` clean, build success.
