# UX Audit Initial Baseline (2026-02-15)

This file is the first operational baseline for demo-first UX triage.

Source of truth (machine-readable):
- `docs/baselines/ux-audit-initial-2026-02-15.json`

## Demo Flow (P0)

1. `/`
2. `/dashboard`
3. `/protect`
4. `/execute`
5. `/govern`
6. `/settings`

## Current Score Snapshot

| Criterion | Score |
| --- | --- |
| First 5 seconds | 4.6 |
| One clear CTA | 4.5 |
| Hero differentiation | 4.6 |
| Navigation confidence | 4.8 |
| Calm interaction | 4.6 |
| Performance reality | 4.5 |
| Trust cues | 5.0 |
| Copy clarity | 4.7 |
| State design | 4.6 |
| Accessibility | 4.7 |
| Demo reliability | 5.0 |
| Memorable moment | 4.5 |

## Open Issues (Initial)

| ID | Route | Criteria | Severity | Status |
| --- | --- | --- | --- | --- |
| UX-001 | `/dashboard` | oneCta | P1 | open |
| UX-002 | `/protect` | heroDiff | P1 | open |
| UX-003 | `/` | performance | P1 | open |
| UX-004 | `/govern` | calm | P2 | open |
| UX-005 | `/settings` | a11y | P2 | open |

## How to use in daily triage

1. Update issue status in JSON after each PR.
2. Attach screenshot paths in `beforeShot` / `afterShot`.
3. Recompute scores after each wave and overwrite this baseline file.
