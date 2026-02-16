# Screen Contracts

Source: `src/contracts/screen-contract.ts`, `src/contracts/screen-contracts-v4.ts`, `src/contracts/route-screen-contracts.ts`

## Overview

Every page in Poseidon.AI is governed by a typed `ScreenContract` that specifies its required slots, widgets, transition targets, density rules, and mobile behavior. Tests validate that rendered pages emit all required `data-slot` DOM nodes.

## Screen ID Taxonomy

9 domains, 36 screens:

| Domain | Prefix | Count | IDs |
|---|---|---|---|
| Public | PUB | 3 | S-V3-PUB01 through PUB03 |
| Activation | ACT | 7 | S-V3-ACT01 through ACT07 |
| Core | CORE | 5 | S-V3-CORE01 through CORE05 |
| Protect | PRT | 3 | S-V3-PRT01 through PRT03 |
| Grow | GRW | 3 | S-V3-GRW01 through GRW03 |
| Execute | EXE | 3 | S-V3-EXE01 through EXE03 |
| Govern | GOV | 6 | S-V3-GOV01 through GOV06 |
| Settings | SET | 4 | S-V3-SET01 through SET04 |
| System | SYS | 2 | S-V3-SYS01 through SYS02 |

## Required Slot Types

13 slot types used across screen contracts:

| Slot | Usage | Interactive |
|---|---|---|
| `hero_message` | All 36 screens (except SYS02) | No |
| `proof_line` | 35 screens | No |
| `transition_cue` | All 36 screens | No |
| `kpi_grid` | CORE01, GRW01, GOV01 | No |
| `primary_feed` | CORE01-02, CORE04-05, PRT01, EXE01, EXE03 | No |
| `decision_rail` | PRT02-03, EXE02 | Yes |
| `govern_controls` | CORE01-03, PRT01-03, GRW01-03, EXE01-03, GOV01-06 | No |
| `explainable_panel` | CORE03, PRT02, EXE02, GOV03 | No |
| `consent_scope` | ACT04, ACT06, EXE02, SET04 | Yes |
| `action_preview` | PRT02, GRW02-03, EXE02 | Yes |
| `factors_dropdown` | CORE03, PRT02, GRW03, EXE02, GOV03 | Yes |
| `audit_table` | GOV02 | No |
| `oversight_queue` | GOV05 | No |

Standard 7 slots: `hero_message`, `proof_line`, `kpi_grid`, `primary_feed`, `decision_rail`, `govern_controls`, `transition_cue`

## Required Widget Types

25 widget types grouped by category:

| Category | Widgets |
|---|---|
| Foundation (7) | ProofLine, DefinitionLine, MissionSectionHeader, MissionStatusChip, MissionActionList, MissionMetadataStrip, EngineIconBadge |
| Dashboard (2) | DashboardInsightsPanel, KPIContractCard |
| Governance (4) | GovernVerifiedBadge, AuditLinkChip, HumanReviewCTA, GovernContractSet |
| Explainability (4) | ExplainableInsightPanel, FactorsDropdown, ActionOutcomePreview, ConsentScopePanel |
| Data Display (8) | SignalRow, RiskScoreDial, ForecastBandChart, ScenarioControls, ActionQueueCard, StatusTimeline, TrustIndexCard, AuditLedgerTable, OversightQueueTable, PolicyModelCards, DataRightsPanel |

Govern contract widgets (auto-included on govern-required screens): GovernVerifiedBadge, AuditLinkChip, HumanReviewCTA

## Universal Screen States

All screens support 6 states: `loading`, `empty`, `partial`, `error-recoverable`, `error-permission`, `success`

## Mobile Behavior

| Property | Default | Description |
|---|---|---|
| `touchTargetMin` | 44px | Minimum interactive element size |
| `inputFontMin` | 16px | Prevents iOS zoom on focus |
| `disclosureDefault` | `'collapsed'` | Summary-first density |
| `bottomSheetEnabled` | `false` | Override for PRT02, EXE02, GOV03 |

## Full Contract Table

| Screen ID | Domain | Route | Slots | Widgets | Govern | Transition To | BottomSheet |
|---|---|---|---|---|---|---|---|
| S-V3-PUB01 | Public | `/` | 3 | 3 | No | /signup | No |
| S-V3-PUB02 | Public | `/trust` | 3 | 2 | No | /signup | No |
| S-V3-PUB03 | Public | `/pricing` | 3 | 3 | No | /signup | No |
| S-V3-ACT01 | Activation | `/signup` | 3 | 2 | No | /onboarding/connect | No |
| S-V3-ACT02 | Activation | `/login` | 3 | 2 | No | /dashboard | No |
| S-V3-ACT03 | Activation | `/recovery` | 3 | 2 | No | /login | No |
| S-V3-ACT04 | Activation | `/onboarding/connect` | 4 | 4 | No | /onboarding/goals | No |
| S-V3-ACT05 | Activation | `/onboarding/goals` | 3 | 3 | No | /onboarding/consent | No |
| S-V3-ACT06 | Activation | `/onboarding/consent` | 4 | 4 | No | /onboarding/complete | No |
| S-V3-ACT07 | Activation | `/onboarding/complete` | 3 | 2 | No | /dashboard | No |
| S-V3-CORE01 | Core | `/dashboard` | 6 | 9 | Yes | /protect | No |
| S-V3-CORE02 | Core | `/dashboard/alerts` | 5 | 6 | Yes | /protect/alert-detail | No |
| S-V3-CORE03 | Core | `/dashboard/insights` | 6 | 7 | Yes | /execute | No |
| S-V3-CORE04 | Core | `/dashboard/timeline` | 4 | 3 | No | /govern/audit | No |
| S-V3-CORE05 | Core | `/dashboard/notifications` | 3 | 2 | No | /settings | No |
| S-V3-PRT01 | Protect | `/protect` | 5 | 8 | Yes | /protect/alert-detail | No |
| S-V3-PRT02 | Protect | `/protect/alert-detail` | 8 | 9 | Yes | /protect/dispute | Yes |
| S-V3-PRT03 | Protect | `/protect/dispute` | 5 | 6 | Yes | /dashboard | No |
| S-V3-GRW01 | Grow | `/grow` | 5 | 8 | Yes | /grow/scenarios | No |
| S-V3-GRW02 | Grow | `/grow/scenarios` | 5 | 8 | Yes | /grow/recommendations | No |
| S-V3-GRW03 | Grow | `/grow/recommendations` | 6 | 8 | Yes | /execute | No |
| S-V3-EXE01 | Execute | `/execute` | 5 | 8 | Yes | /execute/approval | No |
| S-V3-EXE02 | Execute | `/execute/approval` | 9 | 10 | Yes | /execute/history | Yes |
| S-V3-EXE03 | Execute | `/execute/history` | 5 | 8 | Yes | /govern/audit | No |
| S-V3-GOV01 | Govern | `/govern` | 5 | 8 | Yes | /govern/audit | No |
| S-V3-GOV02 | Govern | `/govern/audit` | 5 | 7 | Yes | /govern/audit-detail | No |
| S-V3-GOV03 | Govern | `/govern/audit-detail` | 6 | 7 | Yes | /govern/oversight | Yes |
| S-V3-GOV04 | Govern | `/govern/registry` | 4 | 6 | Yes | /govern/policy | No |
| S-V3-GOV05 | Govern | `/govern/oversight` | 5 | 6 | Yes | /dashboard | No |
| S-V3-GOV06 | Govern | `/govern/policy` | 4 | 7 | Yes | /dashboard | No |
| S-V3-SET01 | Settings | `/settings` | 3 | 2 | No | /settings/ai | No |
| S-V3-SET02 | Settings | `/settings/ai` | 3 | 3 | No | /settings/integrations | No |
| S-V3-SET03 | Settings | `/settings/integrations` | 3 | 3 | No | /settings/rights | No |
| S-V3-SET04 | Settings | `/settings/rights` | 4 | 4 | No | /dashboard | No |
| S-V3-SYS01 | System | `/help` | 3 | 3 | No | /dashboard | No |
| S-V3-SYS02 | System | *(not-found)* | 2 | 1 | No | /dashboard | No |

## Govern-Required Screens

21 screens require the govern contract (GovernVerifiedBadge + AuditLinkChip + HumanReviewCTA):

CORE01-03, PRT01-03, GRW01-03, EXE01-03, GOV01-06

## Bottom-Sheet Screens

3 screens enable mobile bottom sheet: **PRT02**, **EXE02**, **GOV03**

## Route Mapping

### Canonical Routes (36)

| Route | Screen ID | Page Component |
|---|---|---|
| `/` | S-V3-PUB01 | Landing |
| `/trust` | S-V3-PUB02 | TrustSecurity |
| `/pricing` | S-V3-PUB03 | Pricing |
| `/signup` | S-V3-ACT01 | Signup |
| `/login` | S-V3-ACT02 | Login |
| `/recovery` | S-V3-ACT03 | Recovery |
| `/onboarding/connect` | S-V3-ACT04 | Onboarding |
| `/onboarding/goals` | S-V3-ACT05 | Onboarding |
| `/onboarding/consent` | S-V3-ACT06 | Onboarding |
| `/onboarding/complete` | S-V3-ACT07 | Onboarding |
| `/dashboard` | S-V3-CORE01 | Dashboard |
| `/dashboard/alerts` | S-V3-CORE02 | AlertsHub |
| `/dashboard/insights` | S-V3-CORE03 | InsightsFeed |
| `/dashboard/timeline` | S-V3-CORE04 | ActivityTimelinePage |
| `/dashboard/notifications` | S-V3-CORE05 | Notifications |
| `/protect` | S-V3-PRT01 | Protect |
| `/protect/alert-detail` | S-V3-PRT02 | ProtectAlertDetail |
| `/protect/dispute` | S-V3-PRT03 | ProtectDispute |
| `/grow` | S-V3-GRW01 | Grow |
| `/grow/scenarios` | S-V3-GRW02 | GrowScenarios |
| `/grow/recommendations` | S-V3-GRW03 | GrowRecommendations |
| `/execute` | S-V3-EXE01 | Execute |
| `/execute/approval` | S-V3-EXE02 | ExecuteApproval |
| `/execute/history` | S-V3-EXE03 | ExecuteHistory |
| `/govern` | S-V3-GOV01 | Govern |
| `/govern/trust` | S-V3-GOV01 | GovernTrust |
| `/govern/audit` | S-V3-GOV02 | GovernAuditLedger |
| `/govern/audit-detail` | S-V3-GOV03 | GovernAuditDetail |
| `/govern/registry` | S-V3-GOV04 | GovernRegistry |
| `/govern/oversight` | S-V3-GOV05 | GovernOversight |
| `/govern/policy` | S-V3-GOV06 | GovernPolicy |
| `/settings` | S-V3-SET01 | Settings |
| `/settings/ai` | S-V3-SET02 | SettingsAI |
| `/settings/integrations` | S-V3-SET03 | SettingsIntegrations |
| `/settings/rights` | S-V3-SET04 | SettingsRights |
| `/help` | S-V3-SYS01 | HelpSupport |

### Compatibility Aliases (8)

| Alias | Resolves To |
|---|---|
| `/protect-v2` | `/protect` |
| `/grow-v2` | `/grow` |
| `/execute-v2` | `/execute` |
| `/govern-v2` | `/govern` |
| `/engines` | `/dashboard` |
| `/v3` | `/dashboard` |
| `/onboarding` | `/onboarding/connect` |
| `/onboarding-v2` | `/onboarding/connect` |

## TypeScript API

```typescript
// Build a contract for a screen ID
getScreenContractV4(screenId: ScreenId): ScreenContract

// Get contract by route slug
getRouteScreenContract(slug: RouteScreenSlug, ctx?: OnboardingContext): ScreenContract

// Get contract by URL path (handles compat aliases)
getScreenContractByRoute(route: string): ScreenContract | undefined

// Resolve compat alias to canonical route
resolveRoute(route: string): string

// Get all govern-required screens
getGovernRequiredScreens(): ScreenId[]
```

## Companion Type: `RouteUXMeta`

Each route can carry a `RouteUXMeta` object alongside its screen contract. This metadata governs navigation intent, cognitive load, CTA budget, and demo priority. See [09-routing-and-app-shell.md#routeuxmeta](09-routing-and-app-shell.md#routeuxmeta) for the full type definition.

## Cross-References

- [07-compound-components.md#pageshell](07-compound-components.md#pageshell) — PageShell consumes ScreenContract
- [06-domain-models.md](06-domain-models.md) — domain types rendered in screen widgets
- [09-routing-and-app-shell.md](09-routing-and-app-shell.md) — route definitions, lazy loading, and `RouteUXMeta`
- [11-governance-and-enforcement.md](11-governance-and-enforcement.md) — screen contract test coverage
