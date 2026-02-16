# {Screen Name} — {Screen ID}

> Domain: `{Domain}` | Route: `{/route}` | Govern: Yes/No

Source: `src/contracts/screen-contracts-v4.ts`, `src/pages/{PageComponent}.tsx`

## Overview

{One-paragraph description of the screen's purpose and user flow.}

## Contract Summary

| Field | Value |
|---|---|
| Screen ID | {S-V3-XXX00} |
| Domain | {Domain} |
| Route | {/route} |
| Slots | {count} |
| Widgets | {count} |
| Govern Required | Yes/No |
| Bottom Sheet | Yes/No |
| Transition To | {/next-route} |

## Required Slots

| Slot | Type | Interactive |
|---|---|---|
| `hero_message` | `hero_message` | No |
| `proof_line` | `proof_line` | No |
| `transition_cue` | `transition_cue` | No |
| ... | ... | ... |

## Required Widgets

| Widget | Category |
|---|---|
| ProofLine | Foundation |
| ... | ... |

## Universal States

All screens support: `loading`, `empty`, `partial`, `error-recoverable`, `error-permission`, `success`

## Mobile Behavior

| Property | Value |
|---|---|
| `touchTargetMin` | 44px |
| `inputFontMin` | 16px |
| `disclosureDefault` | `'collapsed'` |
| `bottomSheetEnabled` | `false` / `true` |

## Density Rules

{Description of how content density adapts across breakpoints.}

## Page Component

```typescript
// src/pages/{PageComponent}.tsx
export default function {PageComponent}() {
  return (
    <PageShell hero="...">
      {/* slot implementations */}
    </PageShell>
  );
}
```

## Cross-References

- [05-screen-contracts.md](../05-screen-contracts.md) — Full contract table
- [07-compound-components.md](../07-compound-components.md) — PageShell consumption
- [06-domain-models.md](../06-domain-models.md) — Domain types used
