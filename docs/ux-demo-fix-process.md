# MIT QR Demo UX Fix Process

## Objective

Refine the prototype with a demo-first process that maximizes clarity, calmness, and trust in the first 30 seconds.

## Core Principles

1. Visual consistency
2. Interaction comfort
3. Product narrative clarity

## Demo-First Flow (P0)

`/ -> /dashboard -> /protect -> /execute -> /govern -> /settings`

## Execution Loop

1. Run baseline gates
2. Capture screenshots (375, 768, 1024, 1440)
3. Register findings in `spec/ux-audit.ts` format
4. Prioritize by demo impact
5. Fix from upstream to downstream
6. Re-run gates and compare screenshots

## Required Gates

```bash
npm run test:run
npm run check:design-system
npm run check:motion-policy
npm run check:a11y-structure
npm run check:cta-hierarchy
npm run check:contrast-budget
npm run build
npm run check:bundle-budget
npm run verify:pwa
npm run test:lighthouse
```

## Fix Ordering

1. Tokens/theme
2. Shared components
3. Page shell/navigation
4. Route-specific copy/layout
