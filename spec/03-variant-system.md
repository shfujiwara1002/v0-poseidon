# Variant System

Source: `src/design-system/variants.ts`, `src/lib/utils.ts`, component CVA definitions

## Overview

The design system uses [class-variance-authority (CVA)](https://cva.style/docs) for type-safe CSS variant composition. Shared variant maps are defined centrally in `variants.ts` and consumed by component-level CVA definitions.

**Utility:** `cn()` from `src/lib/utils.ts` combines `clsx` (conditional classes) with `tailwind-merge` (conflict resolution).

```typescript
import { cn } from '@/lib/utils';
cn('px-4 py-2', isActive && 'bg-white/10', className);
```

## Shared Variant Maps

### Tone Variants

| Tone | Tailwind Classes |
|---|---|
| `healthy` | `text-[var(--state-healthy)] border-[var(--state-healthy)]` |
| `warning` | `text-[var(--state-warning)] border-[var(--state-warning)]` |
| `critical` | `text-[var(--state-critical)] border-[var(--state-critical)]` |
| `primary` | `text-[var(--state-primary)] border-[var(--state-primary)]` |
| `neutral` | `text-[var(--text-secondary)] border-white/10` |

Type: `Tone = 'healthy' | 'warning' | 'critical' | 'primary' | 'neutral'`

### Engine Accent Variants

| Engine | Tailwind Classes |
|---|---|
| `protect` | `text-[var(--engine-protect)] border-[var(--engine-protect)]` |
| `grow` | `text-[var(--engine-grow)] border-[var(--engine-grow)]` |
| `execute` | `text-[var(--engine-execute)] border-[var(--engine-execute)]` |
| `govern` | `text-[var(--engine-govern)] border-[var(--engine-govern)]` |

Type: `EngineAccent = 'protect' | 'grow' | 'execute' | 'govern'`

### Size Variants

| Size | Tailwind Classes |
|---|---|
| `sm` | `text-sm px-3 py-1.5` |
| `md` | `text-sm px-4 py-2` |
| `lg` | `text-base px-5 py-2.5` |

Type: `Size = 'sm' | 'md' | 'lg'`

## Card CVA (`variants.ts`)

Base class: `rounded-2xl border bg-[var(--surface-primary)] p-4 transition-colors`

| Axis | Values | Default |
|---|---|---|
| `tone` | healthy, warning, critical, primary, neutral | `neutral` |
| `variant` | default, elevated, glass, outline | `default` |

**Tone classes:** Each adds `border-[var(--state-{tone})]/20`; neutral uses `border-white/10`.

**Variant classes:**

| Variant | Additional Classes |
|---|---|
| `default` | *(none)* |
| `elevated` | `shadow-lg` |
| `glass` | `backdrop-blur-xl bg-[var(--surface-primary)]/60` |
| `outline` | `bg-transparent` |

Type: `CardVariants = VariantProps<typeof cardVariants>`

## Card Component CVA (`Card/Card.tsx`)

The Card compound component has its own extended CVA:

Base class: `engine-card`

| Axis | Values | Default |
|---|---|---|
| `tone` | healthy, warning, critical, primary, neutral | `neutral` |
| `variant` | default, alert, action, insight, audit, rule, control, metric, stat, kpi, glass | `default` |

**Compound variants** (variant + tone combinations):

| Variant | Tone | Additional Class |
|---|---|---|
| `action` | `critical` | `signal-evidence-card--critical` |
| `action` | `warning` | `signal-evidence-card--warning` |
| `action` | `primary` | `signal-evidence-card--primary` |
| `action` | `healthy` | `signal-evidence-card--healthy` |

## Chip CVA (`variants.ts`)

Base class: `inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium`

| Tone | Classes |
|---|---|
| `healthy` | `bg-[var(--state-healthy)]/10 text-[var(--state-healthy)]` |
| `warning` | `bg-[var(--state-warning)]/10 text-[var(--state-warning)]` |
| `critical` | `bg-[var(--state-critical)]/10 text-[var(--state-critical)]` |
| `primary` | `bg-[var(--state-primary)]/10 text-[var(--state-primary)]` |
| `neutral` | `bg-white/5 text-[var(--text-secondary)]` |

Default: `neutral`. Type: `ChipVariants = VariantProps<typeof chipVariants>`

## Button CVA (`variants.ts`)

Base class: `inline-flex items-center justify-center whitespace-nowrap rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)] disabled:pointer-events-none disabled:opacity-50`

### Variant Axis

| Variant | Classes |
|---|---|
| `primary` | `bg-[var(--accent-cyan)] text-[#04141a] hover:bg-[var(--accent-cyan)]/90` |
| `secondary` | `bg-white/10 text-[var(--text-primary)] hover:bg-white/15` |
| `ghost` | `text-[var(--text-secondary)] hover:bg-white/5 hover:text-[var(--text-primary)]` |
| `destructive` | `bg-[var(--state-critical)]/10 text-[var(--state-critical)] hover:bg-[var(--state-critical)]/20` |
| `outline` | `border border-white/10 bg-transparent text-[var(--text-primary)] hover:bg-white/5` |

### Size Axis

| Size | Classes |
|---|---|
| `sm` | `h-8 px-3 text-sm` |
| `md` | `h-10 px-4 text-sm` |
| `lg` | `h-12 px-6 text-base` |
| `icon` | `h-10 w-10` |

Defaults: `variant='primary'`, `size='md'`. Type: `ButtonVariants = VariantProps<typeof buttonVariants>`

## Button Component (`Button.tsx`)

The Button component uses a separate, simpler variant system (not from `variants.ts`):

| Variant | Classes |
|---|---|
| `primary` | Gradient from `#1ae3c7` to `#00c6ff`, text `#04141a`, font-semibold, neon shadow |
| `ghost` | `border-white/10 bg-white/[0.02] text-white/70` |
| `soft` | `bg-accent-teal/10 border-accent-teal/30 text-white` |

| Size | Classes |
|---|---|
| `md` | `px-4 py-2.5 text-base` |
| `lg` | `px-6 py-3.5 text-lg` |

> **Note:** Two parallel button variant systems exist — the generic CVA in `variants.ts` (5 variants × 4 sizes) and the component-specific one in `Button.tsx` (3 variants × 2 sizes). Components should use whichever is appropriate for their context.

## Type Exports Summary

| Export | Source | Type |
|---|---|---|
| `Tone` | `variants.ts` | `'healthy' \| 'warning' \| 'critical' \| 'primary' \| 'neutral'` |
| `EngineAccent` | `variants.ts` | `'protect' \| 'grow' \| 'execute' \| 'govern'` |
| `Size` | `variants.ts` | `'sm' \| 'md' \| 'lg'` |
| `CardVariants` | `variants.ts` | `VariantProps<typeof cardVariants>` |
| `ChipVariants` | `variants.ts` | `VariantProps<typeof chipVariants>` |
| `ButtonVariants` | `variants.ts` | `VariantProps<typeof buttonVariants>` |

## Cross-References

- [01-design-tokens.md](01-design-tokens.md) — CSS custom properties consumed by variant classes
- [04-engine-semantics.md](04-engine-semantics.md) — engine accent color mappings
- [07-compound-components.md](07-compound-components.md) — how compound components use these CVA definitions
