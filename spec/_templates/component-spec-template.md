# {ComponentName}

> Status: `canonical` | `compat` | `legacy` | `forbidden`

Source: `src/components/{ComponentName}.tsx` (or `src/components/{ComponentName}/index.tsx`)

## Overview

{One-paragraph description of the component's purpose and where it's used.}

## Props

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `variant` | `'primary' \| 'secondary'` | `'primary'` | No | Visual variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Size variant |
| `children` | `ReactNode` | — | Yes | Content |
| `className` | `string` | — | No | Additional classes |

## Variants

### CVA Definition

```typescript
const componentVariants = cva('base-classes', {
  variants: {
    variant: {
      primary: '...',
      secondary: '...',
    },
    size: {
      sm: '...',
      md: '...',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});
```

### Variant Matrix

| variant \ size | sm | md | lg |
|---|---|---|---|
| primary | ... | ... | ... |
| secondary | ... | ... | ... |

## Sub-Components

{If compound component pattern:}

| Sub-Component | Purpose |
|---|---|
| `{Component}.Header` | ... |
| `{Component}.Content` | ... |
| `{Component}.Footer` | ... |

## Context Hook

```typescript
const { ... } = use{ComponentName}();
```

## Accessibility

- ARIA role: ...
- Keyboard: ...
- Screen reader: ...

## Usage

```tsx
<{ComponentName} variant="primary" size="md">
  Content
</{ComponentName}>
```

## Cross-References

- [02-component-registry.md](../02-component-registry.md) — Registry entry
- [03-variant-system.md](../03-variant-system.md) — Shared variant maps
