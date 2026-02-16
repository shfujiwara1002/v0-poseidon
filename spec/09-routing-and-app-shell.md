# Routing and App Shell

Source: `src/router/lazyRoutes.ts`, `src/App.tsx`

## Overview

Poseidon.AI uses a custom hash-based router with 36 canonical lazy-loaded routes and 8 compatibility aliases. The app shell wraps all routes in a 12-provider context tree with deferred global component loading.

## Route Table

### Canonical Routes (36)

| Route | Domain | Page Component | Screen ID |
|---|---|---|---|
| `/` | Public | Landing | S-V3-PUB01 |
| `/trust` | Public | TrustSecurity | S-V3-PUB02 |
| `/pricing` | Public | Pricing | S-V3-PUB03 |
| `/signup` | Activation | Signup | S-V3-ACT01 |
| `/login` | Activation | Login | S-V3-ACT02 |
| `/recovery` | Activation | Recovery | S-V3-ACT03 |
| `/onboarding/connect` | Activation | Onboarding | S-V3-ACT04 |
| `/onboarding/goals` | Activation | Onboarding | S-V3-ACT05 |
| `/onboarding/consent` | Activation | Onboarding | S-V3-ACT06 |
| `/onboarding/complete` | Activation | Onboarding | S-V3-ACT07 |
| `/dashboard` | Core | Dashboard | S-V3-CORE01 |
| `/dashboard/alerts` | Core | AlertsHub | S-V3-CORE02 |
| `/dashboard/insights` | Core | InsightsFeed | S-V3-CORE03 |
| `/dashboard/timeline` | Core | ActivityTimelinePage | S-V3-CORE04 |
| `/dashboard/notifications` | Core | Notifications | S-V3-CORE05 |
| `/protect` | Protect | Protect | S-V3-PRT01 |
| `/protect/alert-detail` | Protect | ProtectAlertDetail | S-V3-PRT02 |
| `/protect/dispute` | Protect | ProtectDispute | S-V3-PRT03 |
| `/grow` | Grow | Grow | S-V3-GRW01 |
| `/grow/scenarios` | Grow | GrowScenarios | S-V3-GRW02 |
| `/grow/recommendations` | Grow | GrowRecommendations | S-V3-GRW03 |
| `/execute` | Execute | Execute | S-V3-EXE01 |
| `/execute/approval` | Execute | ExecuteApproval | S-V3-EXE02 |
| `/execute/history` | Execute | ExecuteHistory | S-V3-EXE03 |
| `/govern` | Govern | Govern | S-V3-GOV01 |
| `/govern/trust` | Govern | GovernTrust | S-V3-GOV01 |
| `/govern/audit` | Govern | GovernAuditLedger | S-V3-GOV02 |
| `/govern/audit-detail` | Govern | GovernAuditDetail | S-V3-GOV03 |
| `/govern/registry` | Govern | GovernRegistry | S-V3-GOV04 |
| `/govern/oversight` | Govern | GovernOversight | S-V3-GOV05 |
| `/govern/policy` | Govern | GovernPolicy | S-V3-GOV06 |
| `/settings` | Settings | Settings | S-V3-SET01 |
| `/settings/ai` | Settings | SettingsAI | S-V3-SET02 |
| `/settings/integrations` | Settings | SettingsIntegrations | S-V3-SET03 |
| `/settings/rights` | Settings | SettingsRights | S-V3-SET04 |
| `/help` | System | HelpSupport | S-V3-SYS01 |

All routes use `React.lazy()` for code splitting. The `NotFound` page (S-V3-SYS02) is the fallback for unrecognized paths.

### Compatibility Aliases (8)

| Alias | Resolves To | Purpose |
|---|---|---|
| `/protect-v2` | Protect | V2 backward compat |
| `/grow-v2` | Grow | V2 backward compat |
| `/execute-v2` | Execute | V2 backward compat |
| `/govern-v2` | Govern | V2 backward compat |
| `/engines` | Dashboard | Legacy engine hub |
| `/v3` | Dashboard | V3 shortcut |
| `/onboarding` | Onboarding | Short form |
| `/onboarding-v2` | Onboarding | V2 backward compat |

## Provider Tree

The app wraps all content in 12 nested context providers (outermost → innermost):

| Order | Provider | Source | Purpose |
|---|---|---|---|
| 1 | `ErrorBoundary` | `src/components/ErrorBoundary` | Global error catch |
| 2 | `ThemeProvider` | `src/contexts/ThemeContext` | Dark/light theme |
| 3 | `NotificationProvider` | `src/contexts/NotificationContext` | Notification state |
| 4 | `SearchProvider` | `src/contexts/SearchContext` | Global search |
| 5 | `UIProvider` | `src/contexts/UIContext` | UI state (modals, panels) |
| 6 | `EngineProvider` | `src/contexts/EngineContext` | Active engine state |
| 7 | `AutonomyProvider` | `src/contexts/AutonomyContext` | AI autonomy levels |
| 8 | `AgentExecutionProvider` | `src/contexts/AgentExecutionContext` | Agent execution state |
| 9 | `IntentProvider` | `src/contexts/IntentContext` | User intent tracking |
| 10 | `InvestorProfileProvider` | `src/contexts/InvestorProfileContext` | Investor profile data |
| 11 | `ExpertModeProvider` | `src/contexts/ExpertModeContext` | Expert mode toggle |
| 12 | `AriaAnnouncerProvider` | `src/components/AriaLiveAnnouncer` | Screen reader announcements |

## Global Components

### Always Rendered (2)

| Component | Source | Lazy |
|---|---|---|
| `ToastContainer` | `src/components/Toast` | No |
| `NotificationToast` | `src/components/NotificationToast` | No |

### Deferred (idle-loaded, 5)

Loaded via `requestIdleCallback` (fallback: 250ms `setTimeout`):

| Component | Source |
|---|---|
| `OfflineBanner` | `src/components/OfflineBanner` |
| `AIChatbot` | `src/components/AIChatbot` |
| `SystemStatus` | `src/components/SystemStatus` |
| `PWAInstallPrompt` | `src/components/PWAInstallPrompt` |
| `UpdateNotification` | `src/components/UpdateNotification` |

### On-Demand (1)

| Component | Trigger |
|---|---|
| `CommandPalette` | Loaded on first open, stays mounted after |

## AppShell

The `AppShell` component wraps page content and receives route-aware props:

```typescript
<AppShell
  className={isKnownRoute ? 'app-shell--entry' : undefined}
  ambientEffects={!isKnownRoute}
  showTopNav={!isKnownRoute}
  showEngineTabs={false}
  showBottomNav={false}
>
```

## Suspense Boundary

All lazy-loaded page components are wrapped in a single `Suspense` boundary with `LoadingSpinner size="large"` as fallback. Deferred global components use `Suspense fallback={null}` (no visible loading state).

## TypeScript Types

```typescript
// All valid route paths
export type RoutePath = keyof typeof routes;
```

The `routes` object is typed `as const`, providing compile-time exhaustive route checking.

### `RouteUXMeta`

Each route can carry UX metadata for navigation, cognitive load budgeting, and demo prioritization:

```typescript
interface RouteUXMeta {
  intent: 'monitor' | 'investigate' | 'approve' | 'audit' | 'configure';
  primaryActionLabel: string;
  primaryActionPath: string;
  navGroup: 'public' | 'core' | 'engine' | 'settings';
  cognitiveLoad: 'low' | 'medium' | 'high';
  demoPriority?: 'P0' | 'P1' | 'P2';
  ctaBudget?: number;
  first5sMessage?: string;
}
```

| Field | Purpose |
|---|---|
| `intent` | User's primary intent when visiting this route |
| `primaryActionLabel` | Label for the main CTA button |
| `primaryActionPath` | Navigation target for the main CTA |
| `navGroup` | Which nav section this route belongs to |
| `cognitiveLoad` | Expected cognitive effort (drives density) |
| `demoPriority` | Priority for demo flow ordering (P0 = must show) |
| `ctaBudget` | Max primary CTAs allowed on this screen |
| `first5sMessage` | First impression message for key screens |

## Cross-References

- [05-screen-contracts.md](05-screen-contracts.md) — Screen ID → route mapping
- [07-compound-components.md](07-compound-components.md) — PageShell consumed by each route
- [12-build-and-tooling.md](12-build-and-tooling.md) — Code splitting and chunk strategy
- [13-hooks-and-utilities.md](13-hooks-and-utilities.md) — Custom hooks used by routes and App Shell
