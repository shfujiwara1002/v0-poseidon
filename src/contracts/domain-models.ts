// ─── Domain Models ────────────────────────────────────────────────────────────
// Core types for the Poseidon V3 data layer.

// ─── Governance ───────────────────────────────────────────────────────────────

export interface GovernMeta {
  auditId: string;
  modelVersion: string;
  explanationVersion: string;
  decisionId: string;
  timestamp: string;
}

export interface GovernContractSetProps {
  auditId: string;
  modelVersion: string;
  explanationVersion?: string;
  onRequestReview?: () => void;
}

// ─── Lifecycle ────────────────────────────────────────────────────────────────

export type ActionLifecycleState =
  | 'pending'
  | 'approved'
  | 'executing'
  | 'completed'
  | 'failed'
  | 'revoked';

export interface DecisionObject {
  decisionId: string;
  signal: {
    type: string;
    severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
    source: string;
    detectedAt: string;
  };
  evidence: {
    summary: string;
    confidence: number;
    factors: Factor[];
    modelVersion: string;
  };
  decision: {
    recommendation: string;
    alternatives: string[];
    reversible: boolean;
  };
  outcome?: {
    status: ActionLifecycleState;
    result?: string;
    executedAt?: string;
  };
  auditId: string;
  explanationVersion: string;
}

export interface Factor {
  name: string;
  contribution: number;
  direction: 'positive' | 'negative' | 'neutral';
  description: string;
}

// ─── Protect ──────────────────────────────────────────────────────────────────

export interface ProtectAlert {
  id: string;
  type: 'fraud' | 'anomaly' | 'security' | 'compliance';
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  summary: string;
  detectedAt: string;
  source: string;
  status: 'new' | 'investigating' | 'resolved' | 'dismissed';
  decision?: DecisionObject;
  governMeta: GovernMeta;
}

// ─── Grow ─────────────────────────────────────────────────────────────────────

export interface ForecastScenario {
  id: string;
  name: string;
  description: string;
  parameters: Record<string, number>;
  projectedOutcome: {
    netWorthDelta: number;
    savingsDelta: number;
    riskDelta: number;
    confidence: number;
    timeHorizon: string;
  };
  factors: Factor[];
  governMeta: GovernMeta;
}

export interface GrowRecommendation {
  id: string;
  title: string;
  summary: string;
  expectedImpact: string;
  confidence: number;
  factors: Factor[];
  linkedActionId?: string;
  governMeta: GovernMeta;
}

// ─── Execute ──────────────────────────────────────────────────────────────────

export interface ExecutableAction {
  id: string;
  actionId: string;
  title: string;
  description: string;
  type: 'transfer' | 'invest' | 'save' | 'cancel' | 'adjust';
  priority: 'urgent' | 'high' | 'normal' | 'low';
  status: ActionLifecycleState;
  expectedOutcome: {
    description: string;
    impact: string;
    reversible: boolean;
    sideEffects: string[];
  };
  consentRequired: boolean;
  consentScope?: {
    dataCategories: string[];
    duration: string;
    revocationPath: string;
  };
  factors: Factor[];
  createdAt: string;
  executedAt?: string;
  governMeta: GovernMeta;
}

// ─── Govern / Audit ───────────────────────────────────────────────────────────

export interface AuditRecord {
  id: string;
  auditId: string;
  timestamp: string;
  engine: 'protect' | 'grow' | 'execute' | 'govern';
  screenId: string;
  action: string;
  decision: DecisionObject;
  userFeedback?: {
    correct: boolean;
    comment?: string;
  };
  complianceFlags: {
    gdprCompliant: boolean;
    ecoaCompliant: boolean;
    ccpaCompliant: boolean;
  };
  governMeta: GovernMeta;
}

export interface TrustScore {
  overall: number;
  components: {
    accuracy: number;
    transparency: number;
    fairness: number;
    compliance: number;
  };
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
}

export interface OversightCase {
  id: string;
  requestedAt: string;
  requestedBy: string;
  reason: string;
  relatedAuditId: string;
  status: 'pending' | 'in-review' | 'resolved' | 'escalated';
  slaDeadline: string;
  assignedTo?: string;
  resolution?: string;
}

export interface PolicyModelCard {
  modelId: string;
  name: string;
  version: string;
  description: string;
  limitations: string[];
  dataUsed: string[];
  fairnessMetrics: Record<string, number>;
  lastAuditDate: string;
  policyBoundaries: string[];
}

// ─── Settings ─────────────────────────────────────────────────────────────────

export interface AIBehaviorConfig {
  delegationLevel: 'manual' | 'suggest' | 'auto-with-approval' | 'autonomous';
  riskThreshold: number;
  notificationPreferences: {
    criticalAlerts: boolean;
    recommendations: boolean;
    weeklyDigest: boolean;
  };
}

export interface Integration {
  id: string;
  name: string;
  provider: string;
  status: 'connected' | 'disconnected' | 'error';
  connectedAt?: string;
  scope: string[];
  revocable: boolean;
}

export interface DataRightsRequest {
  id: string;
  type: 'export' | 'delete' | 'revoke';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  requestedAt: string;
  completedAt?: string;
  categories: string[];
  format?: 'json' | 'csv' | 'pdf';
  downloadUrl?: string;
}

// ─── System ───────────────────────────────────────────────────────────────────

export interface SupportCase {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'urgent' | 'high' | 'normal' | 'low';
  createdAt: string;
  updatedAt: string;
  timeline: Array<{
    timestamp: string;
    action: string;
    actor: string;
  }>;
}
