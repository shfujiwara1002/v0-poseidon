# Calm Motion Guide

## Goal
Keep motion supportive, not distracting. All UI motion should reduce cognitive load and avoid stress.

## Rules
- Default duration: `<= 220ms`.
- Default displacement: `<= 8px` for enter/exit transitions.
- Avoid infinite animation except explicit utility surfaces (spinner/skeleton/realtime status).
- Respect `prefers-reduced-motion: reduce` in every animated component.
- Use opacity + slight translate instead of large movement or bouncy spring effects.

## Implementation Helpers
- Hook: `src/hooks/useReducedMotionSafe.ts`
- Shared card motion: `src/components/MotionCard.tsx`
- Policy check: `npm run check:motion-policy`
- Allowlist: `scripts/motion-policy.allowlist.txt`

## Review Checklist
- Does this interaction need motion, or can it be static?
- Is the transition understandable within one glance?
- Is reduced-motion behavior tested manually?
- Are durations and translations within policy bounds?

## Rollout Note
Current allowlist entries represent legacy patterns. Reduce allowlist entries phase-by-phase as files are modernized.
