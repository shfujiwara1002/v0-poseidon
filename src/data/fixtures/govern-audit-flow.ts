/**
 * Govern Audit Flow — deterministic fixture for the
 * Decision → Audit → Review chain.
 *
 * Used by: GOV01 (trust dashboard), GOV02 (audit ledger), GOV03 (audit detail),
 *          GOV04 (registry), GOV05 (oversight), GOV06 (policy)
 */
import type {
  AuditRecord,
  TrustScore,
  OversightCase,
  PolicyModelCard,
  DecisionObject,
  GovernMeta,
} from '../../contracts/domain-models';

// ─── Trust Score ─────────────────────────────────────────────────────────────

export const trustScore: TrustScore = {
  overall: 97,
  components: {
    accuracy: 96,
    transparency: 98,
    fairness: 94,
    compliance: 100,
  },
  trend: 'up',
  lastUpdated: '2026-02-12T08:00:00.000Z',
};

export const trustScoreHistory: TrustScore[] = [
  { overall: 94, components: { accuracy: 93, transparency: 96, fairness: 91, compliance: 100 }, trend: 'stable', lastUpdated: '2026-01-12T08:00:00.000Z' },
  { overall: 95, components: { accuracy: 94, transparency: 97, fairness: 92, compliance: 100 }, trend: 'up', lastUpdated: '2026-01-19T08:00:00.000Z' },
  { overall: 95, components: { accuracy: 95, transparency: 97, fairness: 92, compliance: 100 }, trend: 'stable', lastUpdated: '2026-01-26T08:00:00.000Z' },
  { overall: 96, components: { accuracy: 95, transparency: 98, fairness: 93, compliance: 100 }, trend: 'up', lastUpdated: '2026-02-02T08:00:00.000Z' },
  { overall: 97, components: { accuracy: 96, transparency: 98, fairness: 94, compliance: 100 }, trend: 'up', lastUpdated: '2026-02-09T08:00:00.000Z' },
  trustScore,
];

// ─── Audit Records ───────────────────────────────────────────────────────────

const makeGovernMeta = (id: string, mv: string, ev: string, did: string, ts: string): GovernMeta => ({
  auditId: id, modelVersion: mv, explanationVersion: ev, decisionId: did, timestamp: ts,
});

const makeDecision = (did: string, type: string, sev: 'critical' | 'high' | 'medium' | 'low' | 'info', source: string, summary: string, conf: number, rec: string, aid: string): DecisionObject => ({
  decisionId: did,
  signal: { type, severity: sev, source, detectedAt: '2026-02-12T03:00:00.000Z' },
  evidence: { summary, confidence: conf, factors: [], modelVersion: 'v3.2' },
  decision: { recommendation: rec, alternatives: [], reversible: true },
  auditId: aid,
  explanationVersion: '1.1',
});

export const auditRecords: AuditRecord[] = [
  {
    id: 'AUD-001',
    auditId: 'GV-2026-0212-001',
    timestamp: '2026-02-12T03:00:47.000Z',
    engine: 'protect',
    screenId: 'S-V3-PRT02',
    action: 'fraud_detected',
    decision: makeDecision('DEC-FRD-001', 'fraud', 'critical', 'FraudDetectionV3.2', 'Transaction flagged as fraudulent — $1,250 Amazon UK', 0.97, 'Block transaction', 'GV-2026-0212-001'),
    complianceFlags: { gdprCompliant: true, ecoaCompliant: true, ccpaCompliant: true },
    governMeta: makeGovernMeta('GV-2026-0212-001', 'v3.2', '1.1', 'DEC-FRD-001', '2026-02-12T03:00:47.000Z'),
  },
  {
    id: 'AUD-002',
    auditId: 'GV-2026-0212-002',
    timestamp: '2026-02-12T02:45:00.000Z',
    engine: 'protect',
    screenId: 'S-V3-PRT01',
    action: 'anomaly_flagged',
    decision: makeDecision('DEC-ANM-002', 'anomaly', 'high', 'BehavioralAnalyticsV2.1', 'Unusual login pattern — 3 failed attempts from new IP', 0.89, 'Require MFA verification', 'GV-2026-0212-002'),
    complianceFlags: { gdprCompliant: true, ecoaCompliant: true, ccpaCompliant: true },
    governMeta: makeGovernMeta('GV-2026-0212-002', 'v2.1', '1.0', 'DEC-ANM-002', '2026-02-12T02:45:00.000Z'),
  },
  {
    id: 'AUD-003',
    auditId: 'GV-2026-0212-EXE-001',
    timestamp: '2026-02-12T08:00:00.000Z',
    engine: 'execute',
    screenId: 'S-V3-EXE02',
    action: 'auto_save_proposed',
    decision: makeDecision('DEC-ACT-001', 'savings_opportunity', 'info', 'AutoSaveOptimizerV1.5', 'Cash flow surplus of $150 detected', 0.91, 'Auto-save to Emergency Fund', 'GV-2026-0212-EXE-001'),
    complianceFlags: { gdprCompliant: true, ecoaCompliant: true, ccpaCompliant: true },
    governMeta: makeGovernMeta('GV-2026-0212-EXE-001', 'v1.5', '1.0', 'DEC-ACT-001', '2026-02-12T08:00:00.000Z'),
  },
  {
    id: 'AUD-004',
    auditId: 'GV-2026-0211-GRW-001',
    timestamp: '2026-02-11T10:00:00.000Z',
    engine: 'grow',
    screenId: 'S-V3-GRW02',
    action: 'forecast_generated',
    decision: makeDecision('DEC-GRW-001', 'forecast', 'info', 'CashFlowLSTMV2.1', 'Aggressive savings scenario projects +$2,400 net worth in 12 months', 0.87, 'Present scenario to user', 'GV-2026-0211-GRW-001'),
    complianceFlags: { gdprCompliant: true, ecoaCompliant: true, ccpaCompliant: true },
    governMeta: makeGovernMeta('GV-2026-0211-GRW-001', 'v2.1', '1.0', 'DEC-GRW-001', '2026-02-11T10:00:00.000Z'),
  },
  {
    id: 'AUD-005',
    auditId: 'GV-2026-0211-EXE-002',
    timestamp: '2026-02-11T14:00:00.000Z',
    engine: 'execute',
    screenId: 'S-V3-EXE02',
    action: 'bill_negotiation_proposed',
    decision: makeDecision('DEC-ACT-002', 'cost_reduction', 'info', 'AutoSaveOptimizerV1.5', 'Internet bill 23% above market average', 0.85, 'Negotiate rate reduction', 'GV-2026-0211-EXE-002'),
    complianceFlags: { gdprCompliant: true, ecoaCompliant: true, ccpaCompliant: true },
    governMeta: makeGovernMeta('GV-2026-0211-EXE-002', 'v1.5', '1.0', 'DEC-ACT-002', '2026-02-11T14:00:00.000Z'),
  },
  {
    id: 'AUD-006',
    auditId: 'GV-2026-0210-GOV-001',
    timestamp: '2026-02-10T06:00:00.000Z',
    engine: 'govern',
    screenId: 'S-V3-GOV06',
    action: 'policy_review',
    decision: makeDecision('DEC-GOV-001', 'compliance_check', 'info', 'ComplianceScannerV1.0.3', 'All 5 policy boundaries verified and enforced', 1.0, 'No action required', 'GV-2026-0210-GOV-001'),
    complianceFlags: { gdprCompliant: true, ecoaCompliant: true, ccpaCompliant: true },
    governMeta: makeGovernMeta('GV-2026-0210-GOV-001', 'v1.0.3', '1.0', 'DEC-GOV-001', '2026-02-10T06:00:00.000Z'),
  },
];

// ─── Oversight Cases ─────────────────────────────────────────────────────────

export const oversightCases: OversightCase[] = [
  {
    id: 'OV-001',
    requestedAt: '2026-02-12T03:15:00.000Z',
    requestedBy: 'user',
    reason: 'Dispute: Transaction block — I was traveling to London.',
    relatedAuditId: 'GV-2026-0212-001',
    status: 'in-review',
    slaDeadline: '2026-02-12T07:15:00.000Z',
    assignedTo: 'Risk team',
  },
  {
    id: 'OV-002',
    requestedAt: '2026-02-11T16:00:00.000Z',
    requestedBy: 'system',
    reason: 'Escalation: High-value auto-save exceeds daily threshold.',
    relatedAuditId: 'GV-2026-0212-EXE-001',
    status: 'pending',
    slaDeadline: '2026-02-12T16:00:00.000Z',
  },
  {
    id: 'OV-003',
    requestedAt: '2026-02-09T10:00:00.000Z',
    requestedBy: 'compliance_officer',
    reason: 'Policy exception: SOX compliance gap in audit trail.',
    relatedAuditId: 'GV-2026-0210-GOV-001',
    status: 'in-review',
    slaDeadline: '2026-02-12T10:00:00.000Z',
    assignedTo: 'Compliance lead',
  },
  {
    id: 'OV-004',
    requestedAt: '2026-02-05T12:00:00.000Z',
    requestedBy: 'user',
    reason: 'Dispute: False positive fraud alert on recurring payment.',
    relatedAuditId: 'GV-2026-0205-001',
    status: 'resolved',
    slaDeadline: '2026-02-05T16:00:00.000Z',
    assignedTo: 'Risk team',
    resolution: 'Alert overturned — recurring payment whitelisted.',
  },
];

// ─── Model Cards ─────────────────────────────────────────────────────────────

export const modelCards: PolicyModelCard[] = [
  {
    modelId: 'MDL-001',
    name: 'FraudDetectionV3.2',
    version: '3.2.1',
    description: 'Real-time fraud detection using behavioral analysis and device fingerprinting.',
    limitations: ['Limited international pattern data', 'May flag travel-related transactions'],
    dataUsed: ['Transaction history', 'Location data', 'Device fingerprints', 'Merchant category'],
    fairnessMetrics: { demographicParity: 0.98, equalOpportunity: 0.96, predictiveParity: 0.97 },
    lastAuditDate: '2026-02-01',
    policyBoundaries: ['No autonomous blocking above $5,000', 'Human review for disputed transactions'],
  },
  {
    modelId: 'MDL-002',
    name: 'CashFlowLSTM',
    version: '2.1.0',
    description: 'LSTM-based cash flow forecasting with seasonal decomposition.',
    limitations: ['Seasonal bias under-corrected', 'Requires 6 months of transaction history'],
    dataUsed: ['Transaction history', 'Income records', 'Bill schedules'],
    fairnessMetrics: { demographicParity: 0.95, equalOpportunity: 0.94 },
    lastAuditDate: '2026-01-15',
    policyBoundaries: ['Forecasts capped at 12-month horizon', 'Confidence bands required for all projections'],
  },
  {
    modelId: 'MDL-003',
    name: 'AutoSaveOptimizer',
    version: '1.5.2',
    description: 'Identifies savings opportunities from surplus cash flow analysis.',
    limitations: ['Assumes regular income pattern', 'Does not account for irregular expenses'],
    dataUsed: ['Account balances', 'Transaction patterns', 'Savings goals'],
    fairnessMetrics: { demographicParity: 0.97, equalOpportunity: 0.95 },
    lastAuditDate: '2026-01-28',
    policyBoundaries: ['Max auto-save: $500/day', 'User approval required for first-time actions'],
  },
  {
    modelId: 'MDL-004',
    name: 'ComplianceScanner',
    version: '1.0.3',
    description: 'Continuous compliance monitoring across GDPR, CCPA, and ECOA regulations.',
    limitations: ['US regulations only', 'EU GDPR coverage limited to Article 22 scope'],
    dataUsed: ['Audit records', 'Policy configurations', 'User consent records'],
    fairnessMetrics: { demographicParity: 1.0, equalOpportunity: 1.0 },
    lastAuditDate: '2026-02-05',
    policyBoundaries: ['Fail-closed on missing audit data', 'All policy changes require dual approval'],
  },
];
