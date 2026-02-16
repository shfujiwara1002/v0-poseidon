import { useState, useEffect } from 'react';

/**
 * SSR-safe media query hook.
 * Returns `true` when the query matches.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener('change', onChange);
    // Sync on mount in case SSR initial value differs
    setMatches(mql.matches);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** True below 1024px (mobile/tablet — bottom nav visible) */
export function useIsMobile(): boolean {
  return !useMediaQuery('(min-width: 1024px)');
}

/** True at 1024px+ (desktop — top nav visible) */
export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1024px)');
}

/** True at 768px+ (tablet and up) */
export function useIsTablet(): boolean {
  return useMediaQuery('(min-width: 768px)');
}
