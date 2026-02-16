/**
 * Execute Approval Flow — deterministic fixture for the
 * Action → Consent → Approval → Execution chain.
 *
 * Used by: EXE01 (action list), EXE02 (approval gate), EXE03 (history),
 *          GOV02 (audit ledger)
 */
import type {
  ExecutableAction,
  AuditRecord,
  DecisionObject,
  Factor,
  GovernMeta,
} from '../../contracts/domain-models';

// ─── Shared factors ──────────────────────────────────────────────────────────

const autoSaveFactors: Factor[] = [
  { name: 'Income stability', contribution: 0.40, direction: 'positive', description: 'Consistent monthly income for 12+ months' },
  { name: 'Spending trend', contribution: 0.25, direction: 'positive', description: 'Monthly spending decreased 8% over 3 months' },
  { name: 'Surplus amount', contribution: 0.20, direction: 'positive', description: '$150 surplus identified after all obligations' },
  { name: 'Emergency fund gap', contribution: 0.15, direction: 'positive', description: 'Current fund at 72% of 6-month target' },
];

const billNegotiationFactors: Factor[] = [
  { name: 'Rate comparison', contribution: 0.45, direction: 'positive', description: 'Current rate 23% above market average' },
  { name: 'Loyalty tenure', contribution: 0.25, direction: 'positive', description: '3+ year customer — eligible for retention offer' },
  { name: 'Competitor offers', contribution: 0.20, direction: 'positive', description: '2 competitors offering 15-20% lower rates' },
  { name: 'Usage pattern', contribution: 0.10, direction: 'neutral', description: 'Consistent usage — no plan downgrade option' },
];

// ─── Govern meta ─────────────────────────────────────────────────────────────

const autoSaveGovernMeta: GovernMeta = {
  auditId: 'GV-2026-0212-EXE-001',
  modelVersion: 'v1.5',
  explanationVersion: '1.0',
  decisionId: 'DEC-ACT-001',
  timestamp: '2026-02-12T08:00:00.000Z',
};

// ─── Actions ─────────────────────────────────────────────────────────────────

export const executeActions: ExecutableAction[] = [
  {
    id: 'ACT-001',
    actionId: 'ACT-001',
    title: 'Auto-save surplus to Emergency Fund',
    description: 'Move $150 surplus from checking to Emergency Fund based on cash flow analysis.',
    type: 'save',
    priority: 'normal',
    status: 'pending',
    expectedOutcome: {
      description: '+$150 to Emergency Fund (now at 74% of target)',
      impact: 'Medium',
      reversible: true,
      sideEffects: ['Checking balance reduced by $150'],
    },
    consentRequired: true,
    consentScope: {
      dataCategories: ['transaction_history', 'account_balances'],
      duration: '30 days',
      revocationPath: '/settings/rights',
    },
    factors: autoSaveFactors,
    createdAt: '2026-02-12T08:00:00.000Z',
    governMeta: autoSaveGovernMeta,
  },
  {
    id: 'ACT-002',
    actionId: 'ACT-002',
    title: 'Negotiate internet bill reduction',
    description: 'Contact ISP for rate reduction — current plan 23% above market average.',
    type: 'adjust',
    priority: 'high',
    status: 'pending',
    expectedOutcome: {
      description: 'Projected savings: $18/month ($216/year)',
      impact: 'High',
      reversible: true,
      sideEffects: ['May require 12-month contract renewal'],
    },
    consentRequired: true,
    consentScope: {
      dataCategories: ['billing_history', 'service_plans'],
      duration: '7 days',
      revocationPath: '/settings/rights',
    },
    factors: billNegotiationFactors,
    createdAt: '2026-02-11T14:00:00.000Z',
    governMeta: {
      auditId: 'GV-2026-0211-EXE-002',
      modelVersion: 'v1.5',
      explanationVersion: '1.0',
      decisionId: 'DEC-ACT-002',
      timestamp: '2026-02-11T14:00:00.000Z',
    },
  },
  {
    id: 'ACT-003',
    actionId: 'ACT-003',
    title: 'Cancel unused gym membership',
    description: 'No gym visits detected in 60 days. Cancel to save $49/month.',
    type: 'cancel',
    priority: 'normal',
    status: 'approved',
    expectedOutcome: {
      description: 'Save $49/month ($588/year)',
      impact: 'Medium',
      reversible: true,
      sideEffects: ['Re-enrollment may require initiation fee'],
    },
    consentRequired: false,
    factors: [
      { name: 'Usage frequency', contribution: 0.60, direction: 'negative', description: '0 visits in 60 days' },
      { name: 'Cost impact', contribution: 0.30, direction: 'positive', description: '$49/month savings' },
      { name: 'Alternative options', contribution: 0.10, direction: 'neutral', description: 'Free park running available' },
    ],
    createdAt: '2026-02-10T10:00:00.000Z',
    governMeta: {
      auditId: 'GV-2026-0210-EXE-003',
      modelVersion: 'v1.5',
      explanationVersion: '1.0',
      decisionId: 'DEC-ACT-003',
      timestamp: '2026-02-10T10:00:00.000Z',
    },
  },
  {
    id: 'ACT-004',
    actionId: 'ACT-004',
    title: 'Round-up micro-invest',
    description: 'Round up daily purchases and invest spare change in index fund.',
    type: 'invest',
    priority: 'low',
    status: 'executing',
    expectedOutcome: {
      description: 'Estimated $45/month in micro-investments',
      impact: 'Low',
      reversible: true,
      sideEffects: ['Small daily checking deductions'],
    },
    consentRequired: false,
    factors: [
      { name: 'Spending volume', contribution: 0.50, direction: 'positive', description: '~30 transactions/month' },
      { name: 'Market conditions', contribution: 0.30, direction: 'neutral', description: 'Index fund tracking S&P 500' },
      { name: 'Risk tolerance', contribution: 0.20, direction: 'positive', description: 'User risk profile: moderate' },
    ],
    createdAt: '2026-02-08T12:00:00.000Z',
    executedAt: '2026-02-08T12:05:00.000Z',
    governMeta: {
      auditId: 'GV-2026-0208-EXE-004',
      modelVersion: 'v1.5',
      explanationVersion: '1.0',
      decisionId: 'DEC-ACT-004',
      timestamp: '2026-02-08T12:00:00.000Z',
    },
  },
  {
    id: 'ACT-005',
    actionId: 'ACT-005',
    title: 'Transfer to high-yield savings',
    description: 'Move $500 from checking to high-yield savings at 4.8% APY.',
    type: 'transfer',
    priority: 'urgent',
    status: 'completed',
    expectedOutcome: {
      description: '+$24/year in interest',
      impact: 'Medium',
      reversible: true,
      sideEffects: [],
    },
    consentRequired: false,
    factors: [
      { name: 'Interest differential', contribution: 0.60, direction: 'positive', description: '4.8% vs 0.5% current APY' },
      { name: 'Liquidity need', contribution: 0.40, direction: 'neutral', description: 'No upcoming large expenses' },
    ],
    createdAt: '2026-02-06T09:00:00.000Z',
    executedAt: '2026-02-06T09:01:00.000Z',
    governMeta: {
      auditId: 'GV-2026-0206-EXE-005',
      modelVersion: 'v1.5',
      explanationVersion: '1.0',
      decisionId: 'DEC-ACT-005',
      timestamp: '2026-02-06T09:00:00.000Z',
    },
  },
];

// ─── Decision for primary action (auto-save) ────────────────────────────────

export const autoSaveDecision: DecisionObject = {
  decisionId: 'DEC-ACT-001',
  signal: {
    type: 'savings_opportunity',
    severity: 'info',
    source: 'AutoSaveOptimizerV1.5',
    detectedAt: '2026-02-12T07:55:00.000Z',
  },
  evidence: {
    summary: 'Cash flow analysis detected $150 surplus. Emergency fund at 72% of target.',
    confidence: 0.91,
    factors: autoSaveFactors,
    modelVersion: 'v1.5',
  },
  decision: {
    recommendation: 'Auto-save $150 to Emergency Fund',
    alternatives: ['Save $100 instead', 'Invest in index fund', 'Skip this month'],
    reversible: true,
  },
  auditId: 'GV-2026-0212-EXE-001',
  explanationVersion: '1.0',
};

// ─── Audit record for the auto-save action ───────────────────────────────────

export const executeAuditRecord: AuditRecord = {
  id: 'AUD-EXE-001',
  auditId: 'GV-2026-0212-EXE-001',
  timestamp: '2026-02-12T08:00:00.000Z',
  engine: 'execute',
  screenId: 'S-V3-EXE02',
  action: 'auto_save_proposed',
  decision: autoSaveDecision,
  complianceFlags: {
    gdprCompliant: true,
    ecoaCompliant: true,
    ccpaCompliant: true,
  },
  governMeta: autoSaveGovernMeta,
};
