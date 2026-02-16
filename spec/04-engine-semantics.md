# Engine Semantics

Source: `src/design-system/engine-semantic.ts`, `src/design-system/theme.ts`, `src/styles/colorblind-palettes.css`

## Overview

Poseidon.AI organizes its product around 4 engines, each with a unique color identity, semantic tone, and glow effect. The engine semantic system provides a typed mapping between engine keys and their visual properties.

## Engine Semantic Map

| Engine | Tone | Hex | CSS Token | RGB Token | Glow Class |
|---|---|---|---|---|---|
| Protect | healthy | `#14B8A6` | `var(--state-healthy)` | `var(--state-healthy-rgb)` | `icon-glow-teal` |
| Grow | primary | `#8B5CF6` | `var(--engine-grow)` | `139, 92, 246` | `icon-glow-violet` |
| Execute | warning | `#F59E0B` | `var(--state-warning)` | `var(--state-warning-rgb)` | `icon-glow-amber` |
| Govern | primary | `#3B82F6` | `var(--state-primary)` | `var(--state-primary-rgb)` | `icon-glow-blue` |

## Engine CSS Tokens

| Token | Hex | Used For |
|---|---|---|
| `--engine-dashboard` | `#00F0FF` | Dashboard accent (cyan) |
| `--engine-protect` | `#22C55E` | Protect engine badge color |
| `--engine-grow` | `#8B5CF6` | Grow engine accent |
| `--engine-execute` | `#EAB308` | Execute engine accent |
| `--engine-govern` | `#3B82F6` | Govern engine accent |

## TypeScript API

```typescript
// src/design-system/engine-semantic.ts
type EngineSemanticKey = 'Protect' | 'Grow' | 'Execute' | 'Govern';

interface EngineSemantic {
  key: EngineSemanticKey;
  tone: MissionTone;       // 'healthy' | 'warning' | 'primary'
  colorHex: string;
  colorToken: string;      // CSS var reference
  colorRgbToken: string;   // RGB for dynamic opacity
  glowClass: string;       // Icon glow CSS class
}

function getEngineSemantic(key: EngineSemanticKey): EngineSemantic;
const ENGINE_SEMANTIC_KEYS: readonly EngineSemanticKey[];
```

## Token Registry (`src/design-system/theme.ts`)

```typescript
const ENGINE_COLORS = {
  protect: { token: 'var(--engine-protect)', hex: '#14B8A6', label: 'Teal' },
  grow:    { token: 'var(--engine-grow)',    hex: '#8B5CF6', label: 'Violet' },
  execute: { token: 'var(--engine-execute)', hex: '#F59E0B', label: 'Amber' },
  govern:  { token: 'var(--engine-govern)',  hex: '#3B82F6', label: 'Blue' },
};
```

## Colorblind Adaptations

### Deuteranopia (red-green, ~1% of males)

| Token Override | Default | Deuteranopia |
|---|---|---|
| `--accent-teal` | `#14B8A6` | `#2196F3` (pure blue) |
| `--accent-red` | `#EF4444` | `#FF9800` (orange) |
| `--state-healthy` | `#14B8A6` | `#2196F3` |
| `--state-critical` | `#EF4444` | `#FF9800` |
| `--engine-protect` | `#22C55E` | `#2196F3` |

### Protanopia (red-blind, ~1% of males)

| Token Override | Default | Protanopia |
|---|---|---|
| `--accent-teal` | `#14B8A6` | `#42A5F5` |
| `--accent-red` | `#EF4444` | `#FFB300` (gold) |
| `--state-critical` | `#EF4444` | `#FFB300` |

### Tritanopia (blue-yellow, ~0.001%)

| Token Override | Default | Tritanopia |
|---|---|---|
| `--accent-cyan` | `#00F0FF` | `#EC407A` (pink) |
| `--accent-teal` | `#14B8A6` | `#E91E63` |
| `--accent-amber` | `#F59E0B` | `#FF5722` (deep orange) |

Activated via: `document.documentElement.setAttribute('data-colorblind-mode', 'deuteranopia')`

## Forbidden Engine Color Literals

These hex values MUST NOT appear as raw literals outside designated files:

| Forbidden Literal | Engine | Use Token Instead |
|---|---|---|
| `#14B8A6` | Protect | `var(--state-healthy)` or `var(--engine-protect)` |
| `#8B5CF6` | Grow | `var(--engine-grow)` |
| `#F59E0B` | Execute | `var(--state-warning)` or `var(--engine-execute)` |
| `#3B82F6` | Govern | `var(--state-primary)` or `var(--engine-govern)` |

**Allowed exception files:** `src/design-system/engine-semantic.ts`, `src/components/PolicyModelCards.tsx`, `src/components/OversightQueueTable.tsx`, `src/components/AuditLedgerTable.tsx`

## Cross-References

- [01-design-tokens.md#colors--engine-themes](01-design-tokens.md#colors--engine-themes) — token definitions
- [03-variant-system.md#engine-accent-variants](03-variant-system.md#engine-accent-variants) — CVA variant map
- [10-accessibility.md#colorblind-palettes](10-accessibility.md#colorblind-palettes) — full palette overrides
- [11-governance-and-enforcement.md](11-governance-and-enforcement.md) — enforcement of forbidden literals
