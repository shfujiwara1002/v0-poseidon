# Component Registry

Source: `src/design-system/component-registry.ts` (SSoT)

---

## Status Definitions

| Status      | Meaning                        | Action Required                          |
| ----------- | ------------------------------ | ---------------------------------------- |
| `canonical` | Approved for use               | None                                     |
| `compat`    | Deprecated alias               | Migrate to the canonical name            |
| `legacy`    | Deprecated, has replacement    | Replace with the specified canonical component |
| `forbidden` | Must not be used               | Remove immediately; use the replacement  |

---

## Summary

| Status      | Count |
| ----------- | ----- |
| canonical   | 93    |
| compat      | 0     |
| legacy      | 6     |
| forbidden   | 2     |
| **Total**   | **101** |

93 canonical + 0 compat + 6 legacy + 2 forbidden = 101 total

---

## Canonical Components -- Radix UI Primitives

These are low-level primitives sourced from `src/components/ui/`.

| Name            | Source                            |
| --------------- | --------------------------------- |
| `command`       | `src/components/ui/command.tsx`    |
| `dialog`        | `src/components/ui/dialog.tsx`     |
| `dropdown-menu` | `src/components/ui/dropdown-menu.tsx` |
| `popover`       | `src/components/ui/popover.tsx`    |
| `select`        | `src/components/ui/select.tsx`     |
| `slot`          | `src/components/ui/slot.tsx`       |
| `tabs`          | `src/components/ui/tabs.tsx`       |
| `tooltip`       | `src/components/ui/tooltip.tsx`    |

---

## Canonical Components -- Domain Components

All 85 remaining canonical entries grouped by functional category.

### Navigation

| Name              | Source File                           |
| ----------------- | ------------------------------------- |
| `AppNav`          | `src/components/AppNav.tsx`           |
| `TopNav`          | `src/components/TopNav.tsx`           |
| `BottomNav`       | `src/components/BottomNav.tsx`        |
| `CommandPalette`  | `src/components/CommandPalette.tsx`    |
| `SearchBar`       | `src/components/SearchBar.tsx`        |

### Layout

| Name        | Source File                         |
| ----------- | ----------------------------------- |
| `AppShell`  | `src/components/AppShell.tsx`       |
| `PageShell` | `src/components/PageShell/PageShell.tsx` |
| `Grid`      | `src/components/Grid.tsx`           |
| `Section`   | `src/components/Section.tsx`        |

### Cards & Data Display

| Name                         | Source File                                        |
| ---------------------------- | -------------------------------------------------- |
| `Card`                       | `src/components/Card.tsx`                          |
| `StatCard`                   | `src/components/StatCard.tsx`                      |
| `ActionQueueCard`            | `src/components/ActionQueueCard.tsx`               |
| `ActionQueueItem`            | `src/components/ActionQueueItem.tsx`               |
| `AuditLogCard`               | `src/components/AuditLogCard.tsx`                  |
| `AutoSaveRuleCard`           | `src/components/AutoSaveRuleCard.tsx`              |
| `DashboardInsightsPanel`     | `src/components/DashboardInsightsPanel.tsx`        |
| `KPIContractCard`            | `src/components/KPIContractCard.tsx`               |
| `PrivacyControlCard`         | `src/components/PrivacyControlCard.tsx`            |
| `SavingsGoalCard`            | `src/components/SavingsGoalCard.tsx`               |
| `SignalEvidenceDecisionCard`  | `src/components/SignalEvidenceDecisionCard.tsx`    |
| `SignalRow`                  | `src/components/SignalRow.tsx`                      |
| `SubscriptionLeakCard`       | `src/components/SubscriptionLeakCard.tsx`          |
| `ThreatAlertCard`            | `src/components/ThreatAlertCard.tsx`               |
| `TrustIndexCard`             | `src/components/TrustIndexCard.tsx`                |
| `WellnessCard`               | `src/components/WellnessCard.tsx`                  |
| `DefinitionLine`             | `src/components/DefinitionLine.tsx`                |
| `ProofLine`                  | `src/components/ProofLine.tsx`                     |
| `FreshnessIndicator`         | `src/components/FreshnessIndicator.tsx`            |
| `ActivityRail`               | `src/components/ActivityRail.tsx`                  |
| `ActivityTimeline`           | `src/components/ActivityTimeline.tsx`              |
| `AlertsHub`                  | `src/components/AlertsHub.tsx`                     |

### Engine & Mission

| Name                    | Source File                                     |
| ----------------------- | ----------------------------------------------- |
| `EngineHealthStrip`     | `src/components/EngineHealthStrip.tsx`           |
| `EngineIconBadge`       | `src/components/EngineIconBadge.tsx`             |
| `EngineTabs`            | `src/components/EngineTabs.tsx`                  |
| `MissionStatusChip`     | `src/components/MissionStatusChip.tsx`           |
| `MissionSectionHeader`  | `src/components/MissionSectionHeader.tsx`        |
| `MissionDataRows`       | `src/components/MissionDataRows.tsx`             |
| `MissionActionList`     | `src/components/MissionActionList.tsx`           |
| `MissionMetricTiles`    | `src/components/MissionMetricTiles.tsx`          |
| `MissionEvidencePanel`  | `src/components/MissionEvidencePanel.tsx`        |
| `MissionEmptyState`     | `src/components/MissionEmptyState.tsx`           |
| `MissionMetadataStrip`  | `src/components/MissionMetadataStrip.tsx`        |
| `MissionToggle`         | `src/components/MissionToggle.tsx`               |

### Governance

| Name                    | Source File                                     |
| ----------------------- | ----------------------------------------------- |
| `GovernContractSet`     | `src/components/GovernContractSet.tsx`           |
| `GovernFooter`          | `src/components/GovernFooter.tsx`                |
| `GovernVerifiedBadge`   | `src/components/GovernVerifiedBadge.tsx`         |
| `AuditChip`             | `src/components/AuditChip.tsx`                   |
| `AuditLinkChip`         | `src/components/AuditLinkChip.tsx`               |
| `AuditLedgerTable`      | `src/components/AuditLedgerTable.tsx`            |
| `OversightQueueTable`   | `src/components/OversightQueueTable.tsx`         |
| `PolicyModelCards`      | `src/components/PolicyModelCards.tsx`             |
| `HumanReviewCTA`        | `src/components/HumanReviewCTA.tsx`              |

### Explainability

| Name                       | Source File                                        |
| -------------------------- | -------------------------------------------------- |
| `ExplainableInsightPanel`  | `src/components/ExplainabilityPanel.tsx`            |
| `FactorsDropdown`          | `src/components/FactorsDropdown.tsx`                |
| `ActionOutcomePreview`     | `src/components/ActionOutcomePreview.tsx`           |
| `ConsentScopePanel`        | `src/components/ConsentScopePanel.tsx`              |
| `DataRightsPanel`          | `src/components/DataRightsPanel.tsx`                |

### Input & Forms

| Name                 | Source File                                    |
| -------------------- | ---------------------------------------------- |
| `ChatInput`          | `src/components/ChatInput.tsx`                 |
| `VoiceInput`         | `src/components/VoiceInput.tsx`                |
| `FilterPanel`        | `src/components/FilterPanel.tsx`               |
| `ScenarioControls`   | `src/components/ScenarioControls.tsx`          |
| `ScenarioSimulator`  | `src/components/ScenarioSimulator.tsx`         |
| `SettingsPanel`      | `src/components/SettingsPanel.tsx`             |

### Charts & Visualization

| Name                | Source File                                   |
| ------------------- | --------------------------------------------- |
| `CashFlowChart`     | `src/components/CashFlowChart.tsx`            |
| `ForecastBandChart`  | `src/components/ForecastBandChart.tsx`        |
| `RiskScoreDial`     | `src/components/RiskScoreDial.tsx`            |
| `Sparkline`         | `src/components/Sparkline.tsx`                |

### Feedback & Status

| Name                   | Source File                                      |
| ---------------------- | ------------------------------------------------ |
| `BootSplash`           | `src/components/BootSplash.tsx`                  |
| `Button`               | `src/components/Button.tsx`                      |
| `Toast`                | `src/components/Toast.tsx`                       |
| `NotificationToast`    | `src/components/NotificationToast.tsx`           |
| `LoadingSpinner`       | `src/components/LoadingSpinner.tsx`              |
| `Skeleton`             | `src/components/Skeleton.tsx`                    |
| `ErrorBoundary`        | `src/components/ErrorBoundary.tsx`               |
| `ScreenStateHandler`   | `src/components/ScreenStateHandler.tsx`          |
| `SystemStatus`         | `src/components/SystemStatus.tsx`                |
| `OfflineBanner`        | `src/components/OfflineBanner.tsx`               |
| `UpdateNotification`   | `src/components/UpdateNotification.tsx`          |
| `PWAInstallPrompt`     | `src/components/PWAInstallPrompt.tsx`            |
| `AriaLiveAnnouncer`    | `src/components/AriaLiveAnnouncer.tsx`           |

### AI & Chat

| Name           | Source File                              |
| -------------- | ---------------------------------------- |
| `AIChatbot`    | `src/components/AIChatbot.tsx`           |
| `ChatMessage`  | `src/components/ChatMessage.tsx`         |

### Mobile

| Name               | Source File                                  |
| ------------------ | -------------------------------------------- |
| `MobileDisclosure` | `src/components/MobileDisclosure.tsx`        |
| `BottomSheet`      | `src/components/BottomSheet.tsx`             |
| `BottomNav`        | `src/components/BottomNav.tsx`               |
| `AdaptiveCardGrid` | `src/components/AdaptiveCardGrid.tsx`        |

---

## Legacy Components

| Name                | Replacement                          | Note                                                         |
| ------------------- | ------------------------------------ | ------------------------------------------------------------ |
| `CommandCenterShell` | `PageShell`                         | Deprecated shell wrapper. Use PageShell variants directly.   |
| `EnginePageShell`   | `PageShell`                          | Deprecated engine shell wrapper. Use PageShell variants directly. |
| `DashboardStats`    | `MissionMetricTiles`                 | Legacy dashboard summary card system.                        |
| `EngineStatusCard`  | `EngineHealthStrip`                  | Legacy card-per-engine visual grammar.                       |
| `GlassCard`         | `engine-card` / `dashboard-main-card` | Deprecated visual primitive from pre mission-control era.    |
| `OnboardingStep`    | Onboarding page shell sections       | Legacy standalone onboarding surface.                        |

---

## Forbidden Components

| Name              | Replacement                            | Note                                      |
| ----------------- | -------------------------------------- | ----------------------------------------- |
| `ProtectV2Card`   | Protect page canonical components      | Deprecated V2 card archetype.             |
| `LegacyHeroStrip` | CommandCenterShell hero contract       | Deprecated standalone hero implementation. |

---

## Style Exception Whitelist

All 16 entries from `src/design-system/style-exceptions.ts`.

| File                                   | Kind                          | Reason                                                                        |
| -------------------------------------- | ----------------------------- | ----------------------------------------------------------------------------- |
| `src/components/ProofLine.tsx`         | `css-var-injection`           | Proof accent color is a slot-level CSS variable.                              |
| `src/components/SavingsGoalCard.tsx`   | `css-var-injection`           | Progress fill is driven by CSS variable percentage.                           |
| `src/components/Sparkline.tsx`         | `svg-or-chart-prop`           | Chart width and height are passed through runtime numeric props.              |
| `src/components/CashFlowChart.tsx`     | `svg-or-chart-prop`           | Recharts tooltip and axis styles require object props for controlled rendering. |
| `src/components/EngineHealthStrip.tsx` | `css-var-injection`           | Engine confidence progress width is injected via CSS variable.                |
| `src/components/DataRightsPanel.tsx`   | `css-var-injection`           | Dynamic toggle/progress styling via CSS variable.                             |
| `src/components/RiskScoreDial.tsx`     | `svg-or-chart-prop`           | SVG arc rotation and stroke-dasharray require runtime numeric props.          |
| `src/components/FactorsDropdown.tsx`   | `css-var-injection`           | Factor contribution bar width driven by CSS variable percentage.              |
| `src/components/ForecastBandChart.tsx` | `svg-or-chart-prop`           | Recharts area/line styles require object props for band rendering.            |
| `src/components/TrustIndexCard.tsx`    | `css-var-injection`           | Trust score gauge and trend indicator driven by CSS variable.                 |
| `src/components/PolicyModelCards.tsx`  | `css-var-injection`           | Model status indicator colors injected via CSS variable.                      |
| `src/components/OversightQueueTable.tsx` | `css-var-injection`         | Queue priority and status indicator colors via CSS variable.                  |
| `src/components/AuditLedgerTable.tsx`  | `css-var-injection`           | Audit severity indicator colors via CSS variable.                             |
| `src/pages/Notifications.tsx`          | `css-var-injection`           | Notification badge count position via CSS variable.                           |
| `src/pages/AlertsHub.tsx`             | `css-var-injection`           | Alert severity color indicator via CSS variable.                              |
| `src/pages/ActivityTimelinePage.tsx`   | `css-var-injection`           | Timeline connector height via CSS variable.                                   |

---

## Registry Sync Mechanism

| Item       | Value                                      |
| ---------- | ------------------------------------------ |
| SSoT       | `src/design-system/component-registry.ts`  |
| Generated  | `scripts/design-system-registry.gen.json`  |
| Generate   | `npm run generate:registry`                |
| Verify     | `npm run check:registry-sync`              |

---

## Cross-References

- [03-variant-system.md](03-variant-system.md) -- CVA variants used by these components
- [07-compound-components.md](07-compound-components.md) -- detailed API for compound components
- [11-governance-and-enforcement.md](11-governance-and-enforcement.md) -- how registry is enforced
