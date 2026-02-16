import { useMediaQuery } from './useMediaQuery';

/**
 * Centralized reduced-motion helper for calm UX decisions.
 */
export function useReducedMotionSafe(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

