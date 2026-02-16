# CSS Architecture

Source: `src/styles/index.css`, `src/styles/**/*.css`

## Overview

The CSS architecture is a modular, 39-file system organized into 5 layers with explicit import ordering. Tailwind CSS 4.1 provides utilities; custom CSS handles domain-specific components and page layouts. Two additional files (`themes.css`, `colorblind-palettes.css`) are imported separately in `App.tsx`.

## Import Chain

All CSS is imported through `src/styles/index.css` (except theme/colorblind files):

```
tailwind.css                     ← Tailwind CSS base
  └── system/tokens.css          ← 198 custom properties
  └── system/base.css            ← Reset, sr-only, focus-visible
    └── layouts/app-shell.css    ← App shell structure
    └── layouts/layout-primitives.css ← Stack, cluster, sidebar
    └── layouts/grid.css         ← Responsive grid system
      └── components/ (18 files) ← Component styles
        └── pages/ (11 files)    ← Page-specific styles
```

Separate imports in `App.tsx`:
- `src/styles/themes.css` — Dark/light theme overrides
- `src/styles/colorblind-palettes.css` — 3 colorblind palettes

## File Inventory

### Entry (1 file)

| File | Lines | Purpose |
|---|---|---|
| `index.css` | 46 | Import orchestrator |

### System Layer (2 files, 455 lines)

| File | Lines | Purpose |
|---|---|---|
| `system/tokens.css` | 350 | CSS custom properties: typography, colors, effects, layout, motion, z-index |
| `system/base.css` | 105 | Global reset, `.sr-only`, `.sr-only-focusable`, `:focus-visible`, `skip-to-content` |

### Layout Layer (3 files, 151 lines)

| File | Lines | Purpose |
|---|---|---|
| `layouts/app-shell.css` | 35 | `.app-shell` container, sidebar/content structure |
| `layouts/layout-primitives.css` | 38 | Stack, cluster, sidebar layout primitives |
| `layouts/grid.css` | 78 | `.mission-grid`, responsive container query grid |

### Component Layer (19 files, ~2,358 lines)

| File | Lines | Purpose |
|---|---|---|
| `components/navigation.css` | 186 | Top nav, sidebar nav, nav items |
| `components/button.css` | 113 | Button variants, icon buttons |
| `components/glass-card.css` | 62 | Glass morphism card effects |
| `components/badges.css` | 120 | Status badges, engine badges, chips |
| `components/stat-card.css` | 73 | KPI/stat card styles |
| `components/lists.css` | 154 | List items, action lists, data rows |
| `components/domain-cards.css` | 149 | Engine-specific domain cards |
| `components/onboarding.css` | 94 | Onboarding flow styles |
| `components/misc-components.css` | 191 | Miscellaneous component styles |
| `components/forms.css` | 161 | Form inputs, labels, validation |
| `components/tabs-table.css` | 81 | Tabs and table styles |
| `components/feedback.css` | 160 | Toast, alerts, notifications |
| `components/overlays.css` | 109 | Modal, dialog, bottom sheet overlays |
| `components/auth-ui.css` | 61 | Login, signup, recovery forms |
| `components/mobile-nav.css` | 110 | Bottom nav, mobile-specific navigation |
| `components/effects.css` | 99 | Neon glows, gradients, visual effects |
| `components/animations.css` | 73 | @keyframes, transition presets |
| `components/responsive.css` | 304 | Breakpoint overrides, container queries |
| `components/boot-splash.css` | 33 | Boot splash loading screen styles |

### Page Layer (11 files, 3,917 lines)

| File | Lines | Purpose |
|---|---|---|
| `pages/entry-screens.css` | 711 | Landing, signup, login, public pages |
| `pages/dashboard.css` | 366 | Dashboard layout, widgets |
| `pages/mission.css` | 334 | Mission section, evidence, metadata |
| `pages/component-shells.css` | 312 | PageShell, hero, KPI grid |
| `pages/dashboard-v3.css` | 622 | V3 dashboard enhancements |
| `pages/engine-page.css` | 243 | Engine page layouts |
| `pages/engine-semantics.css` | 287 | Engine-semantic color classes |
| `pages/chatbot.css` | 534 | AI chatbot interface |
| `pages/command-palette.css` | 108 | Command palette (Cmd+K) |
| `pages/pwa-offline.css` | 251 | PWA offline fallback |
| `pages/disclosure-sheet.css` | 149 | Mobile disclosure/bottom sheet |

### Theme Files (2 files, 290 lines — imported in App.tsx)

| File | Lines | Purpose |
|---|---|---|
| `themes.css` | 67 | Dark (default) and light theme variable overrides |
| `colorblind-palettes.css` | 223 | Deuteranopia, protanopia, tritanopia adaptations |

### Tailwind Entry (1 file)

| File | Lines | Purpose |
|---|---|---|
| `tailwind.css` | 60 | Tailwind CSS v4 entry with `@import "tailwindcss"` |

## Total

**39 files**, ~7,516 lines of CSS (excluding Tailwind-generated output).

## Naming Conventions

### Class Prefixes

| Prefix | Domain | Example |
|---|---|---|
| `.mission-` | Mission/Section components | `.mission-section`, `.mission-grid` |
| `.dashboard-` | Dashboard layout/widgets | `.dashboard-insights`, `.dashboard-kpi` |
| `.engine-` | Engine-specific variants | `.engine-card`, `.engine-page` |
| `.entry-` | Public/activation pages | `.entry-hero`, `.entry-form` |

These prefixes are enforced by the token hygiene script (`check-design-token-hygiene.mjs`).

### Component Classes

- BEM-like: `.component-name__element--modifier`
- Domain vocabulary: uses "mission control" metaphor throughout
- State classes: `.is-active`, `.is-loading`, `.is-expanded`

### Utility Usage

Tailwind utilities are used in JSX via `className`. Custom CSS handles:
- Complex animations and @keyframes
- Multi-property state transitions
- Container query responsive rules
- Glass morphism effects requiring multiple properties

## Token Hygiene Rules

Within classes matching contract prefixes (`.mission-`, `.dashboard-`, `.engine-`, `.entry-`):

1. **No engine color literals** — Use `var(--engine-*)` tokens, not hex values
2. **No direct font-family** — Use `var(--font-*)` tokens
3. **No rem font-size literals** — Use `var(--font-size-*)` tokens

Enforced by: `scripts/check-design-token-hygiene.mjs`

## Cross-References

- [01-design-tokens.md](01-design-tokens.md) — CSS custom property definitions
- [03-variant-system.md](03-variant-system.md) — CVA variant classes that complement CSS
- [04-engine-semantics.md](04-engine-semantics.md) — Engine color token usage rules
- [10-accessibility.md](10-accessibility.md) — Colorblind palettes and theme switching
- [11-governance-and-enforcement.md](11-governance-and-enforcement.md) — Token hygiene enforcement
