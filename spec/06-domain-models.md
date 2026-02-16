# Domain Models

Source: `src/contracts/domain-models.ts`

## Overview

Core TypeScript types for the Poseidon V3 data layer. All engine domain types embed `GovernMeta` for audit traceability, and decision-related types embed `Factor[]` for explainability.

## Type Dependency Graph

```
GovernMeta ──────────────────┐
  │                          │
Factor ─────────────────┐    │
  │                     │    │
  ├─ DecisionObject ────┤    │
  │    │                │    │
  │    └─ ProtectAlert ─┼────┤
  │    └─ AuditRecord ──┼────┤
  │                     │    │
  ├─ ForecastScenario ──┼────┤
  ├─ GrowRecommendation ┼────┤
  ├─ ExecutableAction ───┼────┘
  │
  └─ (standalone types)
     OversightCase, PolicyModelCard, TrustScore
     AIBehaviorConfig, Integration, DataRightsRequest
     SupportCase
```

## Governance

### `GovernMeta`

| Field | Type | Description |
|---|---|---|
| `auditId` | `string` | Unique audit trail identifier |
| `modelVersion` | `string` | ML model version that produced the decision |
| `explanationVersion` | `string` | Explanation format version |
| `decisionId` | `string` | Decision identifier |
| `timestamp` | `string` | ISO timestamp |

### `GovernContractSetProps`

| Field | Type | Required | Description |
|---|---|---|---|
| `auditId` | `string` | Yes | Audit trail identifier |
| `modelVersion` | `string` | Yes | Model version |
| `explanationVersion` | `string` | No | Explanation version |
| `onRequestReview` | `() => void` | No | Human review callback |

## Lifecycle

### `ActionLifecycleState`

```
pending → approved → executing → completed
                  ↘ failed
         ↘ revoked
```

Values: `'pending' | 'approved' | 'executing' | 'completed' | 'failed' | 'revoked'`

### `DecisionObject`

| Field | Type | Description |
|---|---|---|
| `decisionId` | `string` | Unique identifier |
| `signal.type` | `string` | Signal type |
| `signal.severity` | `'critical' \| 'high' \| 'medium' \| 'low' \| 'info'` | Severity level |
| `signal.source` | `string` | Detection source |
| `signal.detectedAt` | `string` | ISO timestamp |
| `evidence.summary` | `string` | Human-readable summary |
| `evidence.confidence` | `number` | 0-1 confidence score |
| `evidence.factors` | `Factor[]` | Contributing factors |
| `evidence.modelVersion` | `string` | Model version |
| `decision.recommendation` | `string` | Recommended action |
| `decision.alternatives` | `string[]` | Alternative actions |
| `decision.reversible` | `boolean` | Can be undone? |
| `outcome?.status` | `ActionLifecycleState` | Execution status |
| `outcome?.result` | `string` | Outcome description |
| `outcome?.executedAt` | `string` | Execution timestamp |
| `auditId` | `string` | Audit identifier |
| `explanationVersion` | `string` | Explanation version |

### `Factor`

| Field | Type | Description |
|---|---|---|
| `name` | `string` | Factor name |
| `contribution` | `number` | Numeric contribution weight |
| `direction` | `'positive' \| 'negative' \| 'neutral'` | Impact direction |
| `description` | `string` | Human-readable explanation |

## Protect Engine

### `ProtectAlert`

| Field | Type | Values |
|---|---|---|
| `id` | `string` | |
| `type` | enum | `'fraud' \| 'anomaly' \| 'security' \| 'compliance'` |
| `severity` | enum | `'critical' \| 'high' \| 'medium' \| 'low'` |
| `title` | `string` | |
| `summary` | `string` | |
| `detectedAt` | `string` | ISO timestamp |
| `source` | `string` | |
| `status` | enum | `'new' \| 'investigating' \| 'resolved' \| 'dismissed'` |
| `decision?` | `DecisionObject` | |
| `governMeta` | `GovernMeta` | Required |

## Grow Engine

### `ForecastScenario`

| Field | Type | Description |
|---|---|---|
| `id` | `string` | |
| `name` | `string` | Scenario name |
| `description` | `string` | |
| `parameters` | `Record<string, number>` | Scenario parameters |
| `projectedOutcome.netWorthDelta` | `number` | |
| `projectedOutcome.savingsDelta` | `number` | |
| `projectedOutcome.riskDelta` | `number` | |
| `projectedOutcome.confidence` | `number` | 0-1 |
| `projectedOutcome.timeHorizon` | `string` | |
| `factors` | `Factor[]` | Contributing factors |
| `governMeta` | `GovernMeta` | Required |

### `GrowRecommendation`

| Field | Type | Description |
|---|---|---|
| `id` | `string` | |
| `title` | `string` | |
| `summary` | `string` | |
| `expectedImpact` | `string` | |
| `confidence` | `number` | 0-1 |
| `factors` | `Factor[]` | |
| `linkedActionId?` | `string` | Link to ExecutableAction |
| `governMeta` | `GovernMeta` | Required |

## Execute Engine

### `ExecutableAction`

| Field | Type | Values |
|---|---|---|
| `id` | `string` | |
| `actionId` | `string` | |
| `title` | `string` | |
| `description` | `string` | |
| `type` | enum | `'transfer' \| 'invest' \| 'save' \| 'cancel' \| 'adjust'` |
| `priority` | enum | `'urgent' \| 'high' \| 'normal' \| 'low'` |
| `status` | `ActionLifecycleState` | Current lifecycle state |
| `expectedOutcome.description` | `string` | |
| `expectedOutcome.impact` | `string` | |
| `expectedOutcome.reversible` | `boolean` | |
| `expectedOutcome.sideEffects` | `string[]` | |
| `consentRequired` | `boolean` | |
| `consentScope?.dataCategories` | `string[]` | |
| `consentScope?.duration` | `string` | |
| `consentScope?.revocationPath` | `string` | |
| `factors` | `Factor[]` | |
| `createdAt` | `string` | |
| `executedAt?` | `string` | |
| `governMeta` | `GovernMeta` | Required |

## Govern Engine

### `AuditRecord`

| Field | Type | Description |
|---|---|---|
| `id` | `string` | |
| `auditId` | `string` | |
| `timestamp` | `string` | |
| `engine` | `'protect' \| 'grow' \| 'execute' \| 'govern'` | Source engine |
| `screenId` | `string` | Screen where action occurred |
| `action` | `string` | Action description |
| `decision` | `DecisionObject` | Full decision record |
| `userFeedback?.correct` | `boolean` | Was AI correct? |
| `userFeedback?.comment` | `string` | |
| `complianceFlags.gdprCompliant` | `boolean` | |
| `complianceFlags.ecoaCompliant` | `boolean` | |
| `complianceFlags.ccpaCompliant` | `boolean` | |
| `governMeta` | `GovernMeta` | Required |

### `TrustScore`

| Field | Type | Description |
|---|---|---|
| `overall` | `number` | 0-100 composite score |
| `components.accuracy` | `number` | |
| `components.transparency` | `number` | |
| `components.fairness` | `number` | |
| `components.compliance` | `number` | |
| `trend` | `'up' \| 'down' \| 'stable'` | |
| `lastUpdated` | `string` | |

### `OversightCase`

| Field | Type | Description |
|---|---|---|
| `id` | `string` | |
| `requestedAt` | `string` | |
| `requestedBy` | `string` | |
| `reason` | `string` | |
| `relatedAuditId` | `string` | Links to AuditRecord |
| `status` | `'pending' \| 'in-review' \| 'resolved' \| 'escalated'` | |
| `slaDeadline` | `string` | |
| `assignedTo?` | `string` | |
| `resolution?` | `string` | |

### `PolicyModelCard`

| Field | Type | Description |
|---|---|---|
| `modelId` | `string` | |
| `name` | `string` | |
| `version` | `string` | |
| `description` | `string` | |
| `limitations` | `string[]` | Known limitations |
| `dataUsed` | `string[]` | Training data sources |
| `fairnessMetrics` | `Record<string, number>` | Bias measurements |
| `lastAuditDate` | `string` | |
| `policyBoundaries` | `string[]` | Operating constraints |

## Settings

### `AIBehaviorConfig`

| Field | Type | Values |
|---|---|---|
| `delegationLevel` | enum | `'manual' \| 'suggest' \| 'auto-with-approval' \| 'autonomous'` |
| `riskThreshold` | `number` | 0-1 |
| `notificationPreferences.criticalAlerts` | `boolean` | |
| `notificationPreferences.recommendations` | `boolean` | |
| `notificationPreferences.weeklyDigest` | `boolean` | |

### `Integration`

| Field | Type | Values |
|---|---|---|
| `id` | `string` | |
| `name` | `string` | |
| `provider` | `string` | |
| `status` | enum | `'connected' \| 'disconnected' \| 'error'` |
| `connectedAt?` | `string` | |
| `scope` | `string[]` | Permission scopes |
| `revocable` | `boolean` | |

### `DataRightsRequest`

| Field | Type | Values |
|---|---|---|
| `id` | `string` | |
| `type` | enum | `'export' \| 'delete' \| 'revoke'` |
| `status` | enum | `'pending' \| 'processing' \| 'completed' \| 'failed'` |
| `requestedAt` | `string` | |
| `completedAt?` | `string` | |
| `categories` | `string[]` | Data categories affected |
| `format?` | enum | `'json' \| 'csv' \| 'pdf'` |
| `downloadUrl?` | `string` | |

## System

### `SupportCase`

| Field | Type | Values |
|---|---|---|
| `id` | `string` | |
| `title` | `string` | |
| `description` | `string` | |
| `status` | enum | `'open' \| 'in-progress' \| 'resolved' \| 'closed'` |
| `priority` | enum | `'urgent' \| 'high' \| 'normal' \| 'low'` |
| `createdAt` | `string` | |
| `updatedAt` | `string` | |
| `timeline` | `Array<{ timestamp, action, actor }>` | Activity log |

## Cross-References

- [05-screen-contracts.md](05-screen-contracts.md) — screens that consume these domain models
- [07-compound-components.md](07-compound-components.md) — Card and Section components that render this data
