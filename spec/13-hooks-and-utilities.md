# Hooks and Utilities

Source: `src/hooks/`, `src/lib/utils.ts`

## Overview

13 custom hooks (16 exports including derived helpers) + 1 utility function. All hooks are barrel-exported from `src/hooks/index.ts`.

## Hook Inventory

| Hook | Source | Category | Returns |
|---|---|---|---|
| `useAriaAnnouncer` | Re-export from `AriaLiveAnnouncer` | a11y | `{ announce }` |
| `useColorblindMode` | `useColorblindMode.ts` | a11y | `{ mode, setMode, isActive }` |
| `useCommandPalette` | `useCommandPalette.ts` | navigation | `{ isOpen, open, close, toggle }` |
| `useExpertMode` | Re-export from `ExpertModeContext` | navigation | context value |
| `useFocusTrap` | `useFocusTrap.ts` | a11y | `void` (effect-only) |
| `useFreshness` | `useFreshness.ts` | data | `{ label, isStale }` |
| `useMediaQuery` | `useMediaQuery.ts` | responsive | `boolean` |
| `useIsMobile` | `useMediaQuery.ts` | responsive | `boolean` (< 1024px) |
| `useIsDesktop` | `useMediaQuery.ts` | responsive | `boolean` (≥ 1024px) |
| `useIsTablet` | `useMediaQuery.ts` | responsive | `boolean` (≥ 768px) |
| `usePWA` | `usePWA.ts` | platform | PWA state & methods |
| `useQuery` | `useQuery.ts` | data | `QueryState<T> & { refetch }` |
| `useMutation` | `useQuery.ts` | data | `MutationState<T> & { mutate, reset }` |
| `useRealtimeUpdates` | `useRealtimeUpdates.ts` | data | `{ data, isLoading, error, lastUpdate, refresh, isLive, connectionState }` |
| `useReducedMotionSafe` | `useReducedMotionSafe.ts` | a11y | `boolean` |
| `useTimeContext` | `useTimeContext.ts` | data | `{ period, greeting, isMorningBriefing, isEveningReview }` |
| `useVoiceInput` | `useVoiceInput.ts` | input | `{ isListening, transcript, startListening, stopListening, isSupported, error }` |

---

## Hooks by Category

### Accessibility (4 hooks)

#### `useAriaAnnouncer`

Re-exported from `src/components/AriaLiveAnnouncer`. Provides ARIA live region announcements for screen readers.

```tsx
const { announce } = useAriaAnnouncer();
announce('Item saved successfully', 'polite');
```

#### `useColorblindMode`

```tsx
() => { mode: ColorblindMode, setMode: (mode: ColorblindMode) => void, isActive: boolean }
```

Manages colorblind mode settings (deuteranopia, protanopia, tritanopia). Applies `data-colorblind-mode` attribute to the document and persists preference in `localStorage`.

#### `useFocusTrap`

```tsx
(containerRef: RefObject<HTMLElement>, active: boolean, triggerRef?: RefObject<HTMLElement>) => void
```

Traps keyboard focus within a container element (modal/dialog). Prevents Tab from escaping the container. Restores focus to `triggerRef` element on close.

#### `useReducedMotionSafe`

```tsx
() => boolean
```

Returns `true` when the user prefers reduced motion via `(prefers-reduced-motion: reduce)` media query. Built on `useMediaQuery`.

---

### Responsive (4 exports from 1 hook)

#### `useMediaQuery`

```tsx
(query: string) => boolean
```

SSR-safe media query hook. Returns `true` when the query matches and updates on viewport changes via `matchMedia` listener.

#### Derived helpers

| Helper | Query | Returns `true` when |
|---|---|---|
| `useIsMobile()` | `(max-width: 1023px)` | Viewport < 1024px |
| `useIsDesktop()` | `(min-width: 1024px)` | Viewport ≥ 1024px |
| `useIsTablet()` | `(min-width: 768px)` | Viewport ≥ 768px |

---

### Data (5 hooks)

#### `useFreshness`

```tsx
(timestamp: Date | null) => { label: string, isStale: boolean }
```

Computes human-readable freshness labels ("Just now", "5m ago", "2h ago") and staleness status (stale when > 5 minutes). Updates every second.

#### `useQuery`

```tsx
<T>(key: string, queryFn: () => Promise<T>, options?: UseQueryOptions<T>) => QueryState<T> & { refetch: () => void }
```

Handles GET-like async data fetching with optional auto-refetch intervals, retry logic, and lifecycle callbacks (`onSuccess`, `onError`).

#### `useMutation`

```tsx
<T, V>(mutationFn: (variables: V) => Promise<T>, options?: UseMutationOptions<T, V>) => MutationState<T> & { mutate: (variables: V) => Promise<T>, reset: () => void }
```

Handles POST/PUT/DELETE mutations with error handling and lifecycle callbacks.

#### `useRealtimeUpdates`

```tsx
<T>(fetchFn: () => Promise<T>, options?: UseRealtimeUpdatesOptions) => UseRealtimeUpdatesReturn<T>
```

Real-time data hook with WebSocket transport and polling fallback. Connects to WebSocket when URL is provided; falls back to polling on disconnection.

Returns: `{ data, isLoading, error, lastUpdate, refresh, isLive, connectionState }`

#### `useTimeContext`

```tsx
() => { period: TimePeriod, greeting: string, isMorningBriefing: boolean, isEveningReview: boolean }
```

Returns current time-of-day context. `TimePeriod` is `'morning' | 'afternoon' | 'evening' | 'night'`. Includes localized greetings. Updates hourly.

---

### Navigation (2 hooks)

#### `useCommandPalette`

```tsx
() => { isOpen: boolean, open: () => void, close: () => void, toggle: () => void }
```

Manages command palette state with global keyboard listener: Cmd+K (Mac) / Ctrl+K (Windows/Linux).

#### `useExpertMode`

Re-exported from `src/contexts/ExpertModeContext`. Provides access to expert mode toggle state for advanced UI features.

---

### Input (1 hook)

#### `useVoiceInput`

```tsx
(language?: string) => { isListening: boolean, transcript: string, startListening: () => void, stopListening: () => void, isSupported: boolean, error: string | null }
```

Web Speech API wrapper for speech-to-text. Supports language selection (defaults to `'en-US'`), interim results, and browser-specific error handling. `isSupported` is `false` when the browser lacks SpeechRecognition.

---

### Platform (1 hook)

#### `usePWA`

```tsx
() => { isInstalled: boolean, isInstallable: boolean, isOffline: boolean, hasUpdate: boolean, promptInstall: () => Promise<void>, applyUpdate: () => void }
```

Manages PWA lifecycle: detects installation status, handles `beforeinstallprompt` events, monitors online/offline status, registers service worker, checks for updates.

---

## Utility: `cn()`

Source: `src/lib/utils.ts`

```tsx
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

Combines `clsx` (conditional class names) with `tailwind-merge` (resolves Tailwind class conflicts). Used throughout components for merging prop-based class overrides.

---

## Cross-References

- [09-routing-and-app-shell.md](09-routing-and-app-shell.md) — `useCommandPalette` consumed by App Shell
- [10-accessibility.md](10-accessibility.md) — `useFocusTrap`, `useReducedMotionSafe`, `useAriaAnnouncer`, `useColorblindMode`
- [12-build-and-tooling.md](12-build-and-tooling.md) — `usePWA` for PWA support
- [14-content-and-microcopy.md](14-content-and-microcopy.md) — `useTimeContext` drives greeting microcopy
