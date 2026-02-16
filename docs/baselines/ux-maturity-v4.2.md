# UX Maturity v4.2 Baseline

Last updated: 2026-02-15

## 12-Criteria Score Snapshot

| Criterion | Score (5.0) | Evidence |
| --- | --- | --- |
| First 5 Seconds | 4.6 | Boot fallback value statement + clear hero value copy |
| One Clear CTA | 4.5 | Engine/core AppNav suppresses primary actions |
| Hero Differentiation | 4.6 | Variant-specific structure (`focused` header, `analytical` table) |
| Navigation Confidence | 4.8 | Breadcrumb + BackButton + route loading indicator |
| Calm Interaction | 4.6 | Motion policy checks + reduced-motion support |
| Performance Reality | 4.5 | Lazy global UI + split chunks + bundle budget checks |
| Trust Cues | 5.0 | ProofLine + govern/audit surfaces |
| Copy Clarity | 4.7 | concise hero/value lines and microcopy checks |
| State Design | 4.6 | loading/error/success and empty-state affordances |
| Accessibility | 4.7 | smoke + structure checks + focus/landmark guards |
| Demo Reliability | 5.0 | SW wiring verification + offline behavior |
| Memorable Moment | 4.5 | controlled visual identity with calm motion |

## Quality Gates

- `npm run test:run`
- `npm run check:design-system`
- `npm run check:motion-policy`
- `npm run check:bundle-budget`
- `npm run test:a11y:smoke`
- `npm run check:a11y-structure`
- `npm run check:cta-hierarchy`
- `npm run check:contrast-budget`
- `npm run check:microcopy-tone`
- `npm run test:lighthouse` (CI required, local optional)
