# Accessibility

Source: `src/styles/colorblind-palettes.css`, `src/styles/themes.css`, `src/styles/system/base.css`, `src/components/AriaLiveAnnouncer.tsx`

## Overview

Poseidon.AI implements accessibility features across color vision, theming, motion sensitivity, screen reader support, keyboard navigation, and touch targets. The system supports 3 colorblind palettes, 2 themes, reduced motion, centralized ARIA announcements, and 44px minimum touch targets.

## Colorblind Palettes

Three scientifically designed palettes activated via `data-colorblind-mode` attribute on `<html>`:

```javascript
document.documentElement.setAttribute('data-colorblind-mode', 'deuteranopia');
```

### Deuteranopia (Red-Green, ~1% males, 0.4% females)

| Token | Default | Deuteranopia | Rationale |
|---|---|---|---|
| `--accent-cyan` | #00F0FF | #03A9F4 | Shifted for contrast with blue |
| `--accent-teal` | #14B8A6 | #2196F3 | Green-blue → pure blue |
| `--accent-violet` | #8B5CF6 | #9C27B0 | Adjusted purple |
| `--accent-amber` | #F59E0B | #FFC107 | Enhanced luminance |
| `--accent-red` | #EF4444 | #FF9800 | Red → orange (better luminance) |
| `--engine-protect` | #14B8A6 | #2196F3 | Teal → blue |
| `--engine-grow` | #8B5CF6 | #9C27B0 | Shifted purple |
| `--engine-execute` | #F59E0B | #FFC107 | Adjusted amber |
| `--engine-govern` | #3B82F6 | #1976D2 | Darker blue |

### Protanopia (Red-Green, ~1% males, 0.01% females)

| Token | Default | Protanopia | Rationale |
|---|---|---|---|
| `--accent-cyan` | #00F0FF | #29B6F6 | Shifted for clarity |
| `--accent-teal` | #14B8A6 | #1E88E5 | Green → darker blue |
| `--accent-violet` | #8B5CF6 | #8E24AA | Adjusted purple |
| `--accent-amber` | #F59E0B | #FDD835 | Higher luminance yellow |
| `--accent-red` | #EF4444 | #FFB300 | Red → gold (high luminance) |
| `--engine-protect` | #14B8A6 | #1E88E5 | Teal → blue |
| `--engine-grow` | #8B5CF6 | #8E24AA | Shifted purple |
| `--engine-execute` | #F59E0B | #FDD835 | Bright yellow |
| `--engine-govern` | #3B82F6 | #1565C0 | Darker blue |

### Tritanopia (Blue-Yellow, ~0.001% population)

| Token | Default | Tritanopia | Rationale |
|---|---|---|---|
| `--accent-cyan` | #00F0FF | #EC407A | Blue → pink |
| `--accent-teal` | #14B8A6 | #E91E63 | Teal → pink-red |
| `--accent-violet` | #8B5CF6 | #E040FB | Bright magenta |
| `--accent-amber` | #F59E0B | #FF5722 | Yellow → deep orange |
| `--accent-red` | #EF4444 | #F44336 | Preserved red |
| `--engine-protect` | #14B8A6 | #E91E63 | Teal → pink-red |
| `--engine-grow` | #8B5CF6 | #E040FB | Bright magenta |
| `--engine-execute` | #F59E0B | #FF5722 | Deep orange |
| `--engine-govern` | #3B82F6 | #F44336 | Blue → red |

### Chart Data Colors

Each palette includes chart-specific color overrides:

| Token | Default | Deuteranopia | Protanopia | Tritanopia |
|---|---|---|---|---|
| `--chart-positive` | #22C55E | #2196F3 | #1E88E5 | #E91E63 |
| `--chart-negative` | #EF4444 | #FF9800 | #FFB300 | #F44336 |
| `--chart-neutral` | #8B5CF6 | #9C27B0 | #8E24AA | #E040FB |
| `--chart-alert` | #EAB308 | #FFC107 | #FDD835 | #FF5722 |

All colorblind palettes also override neon effects (`--neon-*`) and icon glows (`--icon-glow-*`) to match the adapted color scheme.

## Theme Support

### Dark Theme (Default)

Applied via `:root`, `[data-theme="dark"]`, or `.dark`:

| Token | Value |
|---|---|
| `--color-bg-primary` | #020410 |
| `--color-bg-secondary` | #0a0e1a |
| `--color-text-primary` | #ffffff |
| `--color-text-secondary` | #a0aec0 |
| `--color-border` | rgba(255, 255, 255, 0.1) |
| `--color-glass-bg` | rgba(255, 255, 255, 0.03) |

### Light Theme

Applied via `[data-theme="light"]` or `.light`:

| Token | Value |
|---|---|
| `--color-bg-primary` | #f7fafc |
| `--color-bg-secondary` | #ffffff |
| `--color-text-primary` | #1a202c |
| `--color-text-secondary` | #4a5568 |
| `--color-border` | rgba(0, 0, 0, 0.1) |
| `--color-glass-bg` | rgba(255, 255, 255, 0.8) |

Theme transitions use `transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease` on all elements.

## Reduced Motion

Global `prefers-reduced-motion` media query is respected via CSS custom properties:

```css
/* In tokens.css */
--motion-duration-fast: 120ms;
--motion-duration-base: 200ms;
--motion-duration-slow: 320ms;
```

Components using Framer Motion should check `useReducedMotion()`.

## Screen Reader Support

### AriaLiveAnnouncer

Centralized screen reader announcement system via React Context:

```typescript
// Provider creates two hidden ARIA live regions
<AriaAnnouncerProvider>
  <div role="status" aria-live="polite" className="sr-only" />
  <div role="alert" aria-live="assertive" className="sr-only" />
  {children}
</AriaAnnouncerProvider>

// Consumer hook
const { announce } = useAriaAnnouncer();
announce('Portfolio updated successfully', 'polite');
announce('Critical alert detected', 'assertive');
```

Messages are cleared after 1000ms to allow re-announcement of identical text.

### SR Utilities

Defined in `system/base.css`:

| Class | Purpose |
|---|---|
| `.sr-only` | Visually hidden, screen reader accessible |
| `.sr-only-focusable` | Hidden until focused (skip links) |

## Keyboard Navigation

### Skip-to-Content

A skip link is provided for keyboard users, styled with `.sr-only-focusable` (visible on focus).

### Focus Indicators

Global `:focus-visible` styling:

```css
:focus-visible {
  outline: 3px solid var(--accent-violet);
  outline-offset: 2px;
}
```

Uses `var(--accent-violet)` (#8B5CF6) for high-contrast focus rings.

## Touch Targets

| Property | CSS Token | Value |
|---|---|---|
| Minimum touch target | `--touch-min` | 44px |
| Minimum input font size | — | 16px (prevents iOS zoom) |

The 44px minimum is enforced by screen contracts via `touchTargetMin` mobile behavior.

## Accessibility Governance

Three scripts enforce accessibility standards at build time:

| Script | npm Command | Checks |
|---|---|---|
| `a11y-smoke.mjs` | `npm run test:a11y:smoke` | Main landmark, dialog roles, region landmark, skip link |
| `check-a11y-structure.mjs` | `npm run check:a11y-structure` | Landmark structure, heading hierarchy, primary feed labeling |
| `check-contrast-budget.mjs` | `npm run check:contrast-budget` | `--muted` alpha ≥ 0.68, `--muted-2` alpha ≥ 0.58, `--state-focus-ring` defined |

See [11-governance-and-enforcement.md](11-governance-and-enforcement.md) for full script documentation.

## Accessibility Hooks

| Hook | Purpose |
|---|---|
| `useAriaAnnouncer` | ARIA live region announcements for screen readers |
| `useFocusTrap` | Traps focus within modals/dialogs, restores on close |
| `useReducedMotionSafe` | Returns `true` when user prefers reduced motion |
| `useColorblindMode` | Manages colorblind mode selection and `data-colorblind-mode` attribute |

See [13-hooks-and-utilities.md](13-hooks-and-utilities.md) for full hook APIs.

## Cross-References

- [01-design-tokens.md](01-design-tokens.md) — Motion and color tokens
- [04-engine-semantics.md](04-engine-semantics.md) — Engine color colorblind adaptations
- [05-screen-contracts.md](05-screen-contracts.md) — Mobile behavior (touchTargetMin, inputFontMin)
- [08-css-architecture.md](08-css-architecture.md) — Theme and colorblind CSS file locations
- [11-governance-and-enforcement.md](11-governance-and-enforcement.md) — A11y governance scripts
- [13-hooks-and-utilities.md](13-hooks-and-utilities.md) — useFocusTrap, useReducedMotionSafe, useAriaAnnouncer, useColorblindMode
- [15-performance-budgets.md](15-performance-budgets.md) — Contrast budget enforcement
