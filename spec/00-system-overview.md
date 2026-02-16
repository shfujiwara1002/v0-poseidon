# System Overview

## What is Poseidon.AI?

Poseidon.AI is a personal financial AI platform organized around four autonomous engines — **Protect**, **Grow**, **Execute**, **Govern** — each with dedicated screens, color semantics, and governance contracts. The design system provides the visual, structural, and enforcement foundations for the entire application.

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Build | Vite | 5.2 |
| Framework | React | 18.2 |
| Language | TypeScript | 5.4 (strict) |
| Styling | Tailwind CSS | 4.1 |
| Variants | class-variance-authority | 0.7 |
| Animation | Framer Motion | 12.x |
| Charts | Recharts | 3.7 |
| Icons | Lucide React | 0.563 |
| UI Primitives | Radix UI | Latest |
| Testing | Vitest | 4.0 |

## Architecture Layers

```
┌─────────────────────────────────────────────┐
│  Routes (36 canonical + 8 compat aliases)   │  09-routing
├─────────────────────────────────────────────┤
│  Screen Contracts (36 screens, 9 domains)   │  05-screen-contracts
├─────────────────────────────────────────────┤
│  Pages (34 active page components)          │  08-css-architecture
├─────────────────────────────────────────────┤
│  Compound Components (PageShell, Card, etc) │  07-compound-components
├─────────────────────────────────────────────┤
│  Component Registry (101 entries)           │  02-component-registry
├─────────────────────────────────────────────┤
│  Hooks & Utilities (13 custom hooks)        │  13-hooks
├─────────────────────────────────────────────┤
│  CVA Variant System (tone, size, engine)    │  03-variant-system
├─────────────────────────────────────────────┤
│  Engine Semantics (4 engines)               │  04-engine-semantics
├─────────────────────────────────────────────┤
│  Domain Models (14 TypeScript types)        │  06-domain-models
├─────────────────────────────────────────────┤
│  Design Tokens (~198 CSS custom properties) │  01-design-tokens
├─────────────────────────────────────────────┤
│  CSS Architecture (39 files, ~7.5K lines)   │  08-css-architecture
├─────────────────────────────────────────────┤
│  Content & Microcopy (9 catalog keys)       │  14-content
├─────────────────────────────────────────────┤
│  Governance (15 scripts, 16 test files)     │  11-governance
├─────────────────────────────────────────────┤
│  Performance Budgets (bundle, motion, a11y) │  15-performance
└─────────────────────────────────────────────┘
```

## 4-Engine Model

| Engine | Color | Hex | Domain | Purpose |
|---|---|---|---|---|
| **Protect** | Teal | #14B8A6 | Financial security | Monitor threats, alert on risks |
| **Grow** | Violet | #8B5CF6 | Wealth building | Forecast, simulate, recommend |
| **Execute** | Amber | #F59E0B | Action execution | Queue, approve, execute financial actions |
| **Govern** | Blue | #3B82F6 | Oversight | Audit, verify, enforce compliance |

Each engine has: dedicated color token, CSS glow effects, colorblind adaptations, semantic tone mapping, and screen contracts.

## Design Philosophy

- **Dark-mode default** — Deep navy backgrounds (#020410), glass morphism cards, neon accents
- **Mobile-first** — 44px touch targets, 16px minimum input font, responsive tokens
- **Glass morphism** — `backdrop-blur` + semi-transparent surfaces for depth
- **Engine-semantic colors** — Colors convey domain meaning, not just decoration
- **Mission control vocabulary** — UI classes use `.mission-*`, `.dashboard-*` prefixes
- **Contract-driven** — Every screen has a typed contract specifying required slots and widgets

## Key Numbers

| Metric | Count |
|---|---|
| CSS custom properties | ~198 |
| Component registry entries | 101 (93 canonical, 6 legacy, 2 forbidden) |
| Screen contracts | 36 |
| Canonical routes | 36 + 8 compat aliases |
| Domain models | 14 TypeScript types |
| CSS files | 39 (+ 2 imported via App.tsx) |
| Total CSS lines | ~7,516 |
| CVA variant definitions | 6 (card, button, chip, tone, engine, size) |
| Colorblind palettes | 3 (deuteranopia, protanopia, tritanopia) |
| Context providers | 12 |
| Custom hooks | 13 (a11y, responsive, data, navigation, input, platform) |
| Governance scripts | 15 |
| Test files | 16 |
| Compound components | 5 (PageShell, Card, Section, Grid, Button) |
| Microcopy catalog keys | 9 |
| Active pages | 34 |

## Key Conventions

1. **Screen contracts** — Every page declares required slots, widgets, transitions, and mobile behavior via typed `ScreenContract`
2. **Govern contract** — 21 screens require GovernVerifiedBadge + AuditLinkChip + HumanReviewCTA
3. **Component registry** — Single source of truth for component status (canonical/compat/legacy/forbidden)
4. **Token-first styling** — CSS custom properties > hardcoded values; enforced by governance scripts
5. **Engine-semantic colors** — Engine colors come from `engine-semantic.ts`, never hardcoded hex literals
6. **Shell requirement** — All active pages must wrap content in PageShell (or legacy CommandCenterShell/EnginePageShell)
7. **Lazy loading** — All page components use `React.lazy()` with Suspense fallback

## Spec Files

| File | Description |
|---|---|
| [00-system-overview.md](00-system-overview.md) | This file — architecture bird's-eye view |
| [01-design-tokens.md](01-design-tokens.md) | ~198 CSS custom properties |
| [02-component-registry.md](02-component-registry.md) | 101 entries with status and categories |
| [03-variant-system.md](03-variant-system.md) | CVA definitions and composition rules |
| [04-engine-semantics.md](04-engine-semantics.md) | 4-engine color/tone/glow mappings |
| [05-screen-contracts.md](05-screen-contracts.md) | 36 screens, slots, widgets, routing |
| [06-domain-models.md](06-domain-models.md) | TypeScript domain types |
| [07-compound-components.md](07-compound-components.md) | PageShell, Card, Section, Grid, Button |
| [08-css-architecture.md](08-css-architecture.md) | Import chain, 39-file inventory, naming |
| [09-routing-and-app-shell.md](09-routing-and-app-shell.md) | 36 routes, 12 providers, RouteUXMeta |
| [10-accessibility.md](10-accessibility.md) | Colorblind, themes, motion, ARIA, focus, a11y governance |
| [11-governance-and-enforcement.md](11-governance-and-enforcement.md) | 15 scripts, 16 test files, CI gates, whitelists |
| [12-build-and-tooling.md](12-build-and-tooling.md) | Vite, Tailwind, PWA, chunks, deps |
| [13-hooks-and-utilities.md](13-hooks-and-utilities.md) | 13 custom hooks, cn() utility |
| [14-content-and-microcopy.md](14-content-and-microcopy.md) | Microcopy catalog, UX telemetry, env config |
| [15-performance-budgets.md](15-performance-budgets.md) | Bundle budgets, motion policy, Lighthouse CI |

## Cross-References

All spec files use the convention `[NN-filename.md#section](NN-filename.md#section)` for cross-references.

Source-of-truth hierarchy: **`tokens.css`** > **`theme.ts`** > **spec docs**. When in doubt, the source code is authoritative.
