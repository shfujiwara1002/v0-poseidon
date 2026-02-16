import React, { useReducer, useMemo, useCallback } from 'react';
import { Link } from '../router';
import { ActionOutcomePreview } from '../components/ActionOutcomePreview';
import { AuditLinkChip } from '../components/AuditLinkChip';
import { Button } from '../components/Button';
import { DefinitionLine } from '../components/DefinitionLine';
import { PageShell } from '../components/PageShell';
import { ExplainableInsightPanel } from '../components/ExplainabilityPanel';
import { GovernContractSet } from '../components/GovernContractSet';
import { GovernVerifiedBadge } from '../components/GovernVerifiedBadge';
import { HumanReviewCTA } from '../components/HumanReviewCTA';
import { MissionActionList } from '../components/MissionActionList';
import { MissionDataRows } from '../components/MissionDataRows';
import { MissionMetricTiles } from '../components/MissionMetricTiles';
import { MissionSectionHeader } from '../components/MissionSectionHeader';
import { MissionStatusChip } from '../components/MissionStatusChip';
import { ProofLine } from '../components/ProofLine';
import { RiskScoreDial } from '../components/RiskScoreDial';
import { ScoreRing } from '../components/ScoreRing';
import { SignalRow, SignalGroup } from '../components/SignalRow';
import { SubscriptionLeakCard } from '../components/SubscriptionLeakCard';
import { ThreatAlertCard } from '../components/ThreatAlertCard';
import { TrustIndexCard } from '../components/TrustIndexCard';
import { getRouteScreenContract } from '../contracts/route-screen-contracts';
import { useUI } from '../contexts/UIContext';
import {
  mockProtectStats,
  mockSubscriptionLeaks,
  mockThreats,
} from '../services/mockProtect';
import type { ThreatAlert } from '../services/mockProtect';

// ── State machine ────────────────────────────────────────────

type ThreatAction = 'idle' | 'previewing_block' | 'previewing_approve';

interface ProtectState {
  threats: ThreatAlert[];
  focusedThreatId: string | null;
  pendingAction: ThreatAction;
}

type ProtectEvent =
  | { type: 'FOCUS_THREAT'; id: string }
  | { type: 'PREVIEW_BLOCK'; id: string }
  | { type: 'PREVIEW_APPROVE'; id: string }
  | { type: 'CONFIRM_ACTION' }
  | { type: 'CANCEL_PREVIEW' };

function protectReducer(state: ProtectState, event: ProtectEvent): ProtectState {
  switch (event.type) {
    case 'FOCUS_THREAT':
      return { ...state, focusedThreatId: event.id, pendingAction: 'idle' };
    case 'PREVIEW_BLOCK':
      return { ...state, focusedThreatId: event.id, pendingAction: 'previewing_block' };
    case 'PREVIEW_APPROVE':
      return { ...state, focusedThreatId: event.id, pendingAction: 'previewing_approve' };
    case 'CONFIRM_ACTION': {
      const newStatus = state.pendingAction === 'previewing_block' ? 'blocked' : 'approved';
      return {
        ...state,
        threats: state.threats.map((t) =>
          t.id === state.focusedThreatId ? { ...t, status: newStatus } : t,
        ),
        pendingAction: 'idle',
      };
    }
    case 'CANCEL_PREVIEW':
      return { ...state, pendingAction: 'idle' };
    default:
      return state;
  }
}

// ── Static data ──────────────────────────────────────────────

const statusRows = [
  { key: 'Card misuse', status: 'Escalated', score: '0.96', tone: 'critical' as const },
  { key: 'Vendor anomaly', status: 'Investigating', score: '0.91', tone: 'warning' as const },
  { key: 'Chargeback wave', status: 'Monitored', score: '0.88', tone: 'primary' as const },
];

const quickActions = [
  { title: 'Freeze risky merchant rules', meta: 'Immediate containment | Confidence 0.96 | Model v3.2', tone: 'critical' as const },
  { title: 'Open review with evidence pack', meta: 'SLA 24h | Confidence 0.91 | Model v3.2', tone: 'warning' as const },
  { title: 'Notify finance owner', meta: 'High severity protocol | Confidence 0.88 | Model v3.2', tone: 'primary' as const },
];

const kpiSparklines = {
  alert: [{ value: 5 }, { value: 4 }, { value: 6 }, { value: 3 }, { value: 4 }, { value: 2 }, { value: 3 }, { value: 3 }],
  fp: [{ value: 18 }, { value: 16 }, { value: 15 }, { value: 14 }, { value: 13 }, { value: 12 }, { value: 11 }, { value: 12 }],
  recovery: [{ value: 45 }, { value: 40 }, { value: 35 }, { value: 32 }, { value: 28 }, { value: 25 }, { value: 20 }, { value: 18 }],
  blocked: [{ value: 8 }, { value: 9 }, { value: 11 }, { value: 12 }, { value: 14 }, { value: 15 }, { value: 17 }, { value: 18 }],
};

const protectTrustComponents = [
  { label: 'Detection', score: 94, trend: 'stable' as const },
  { label: 'FP control', score: 88, trend: 'up' as const },
  { label: 'Response time', score: 91, trend: 'stable' as const },
  { label: 'Containment', score: 96, trend: 'up' as const },
];

// ── Component ────────────────────────────────────────────────

export const Protect: React.FC = () => {
  const [state, dispatch] = useReducer(protectReducer, {
    threats: mockThreats,
    focusedThreatId: mockThreats[0]?.id ?? null,
    pendingAction: 'idle',
  });
  const { addNotification } = useUI();
  const contract = getRouteScreenContract('protect');

  // Derived
  const pendingCount = useMemo(
    () => state.threats.filter((t) => t.status === 'pending').length,
    [state.threats],
  );
  const criticalCount = useMemo(
    () => state.threats.filter((t) => t.severity === 'critical').length,
    [state.threats],
  );
  const compositeScore = useMemo(
    () => state.threats.length > 0
      ? state.threats.reduce((sum, t) => sum + t.aiExplanation.confidence, 0) / (state.threats.length * 100)
      : 0,
    [state.threats],
  );
  const riskBand = compositeScore >= 0.9 ? 'critical' : compositeScore >= 0.75 ? 'high' : compositeScore >= 0.5 ? 'medium' : 'low';
  const wasteTotal = useMemo(
    () => mockSubscriptionLeaks.reduce((sum, leak) => sum + leak.estimatedWaste, 0),
    [],
  );
  const activeSignals = useMemo(() => ({
    fraud: state.threats.filter((t) => t.type === 'fraud').length,
    spending: state.threats.filter((t) => t.type === 'unusual_spending').length,
    overdraft: state.threats.filter((t) => t.type === 'overdraft').length,
    subscriptions: mockSubscriptionLeaks.length,
  }), [state.threats]);

  const focusedThreat = useMemo(
    () => state.threats.find((t) => t.id === state.focusedThreatId) ?? null,
    [state.threats, state.focusedThreatId],
  );

  // Handlers
  const handleBlock = useCallback((id: string) => {
    dispatch({ type: 'PREVIEW_BLOCK', id });
  }, []);

  const handleApprove = useCallback((id: string) => {
    dispatch({ type: 'PREVIEW_APPROVE', id });
  }, []);

  const handleConfirm = useCallback(() => {
    dispatch({ type: 'CONFIRM_ACTION' });
    const message = state.pendingAction === 'previewing_block'
      ? 'Threat blocked. Protection controls active. Audit trail updated.'
      : 'Alert resolved. Model feedback recorded. Audit trail updated.';
    addNotification({ type: 'success', message });
  }, [state.pendingAction, addNotification]);

  const handleCancel = useCallback(() => {
    dispatch({ type: 'CANCEL_PREVIEW' });
  }, []);

  // ── Primary feed ─────────────────────────────────────────

  const primaryFeed = (
    <>
      {/* 1. Threat triage queue */}
      <section className="engine-section">
        <MissionSectionHeader
          title="Threat triage queue"
          message="Sorted by severity and confidence. Select to inspect evidence."
          contextCue="Tap a threat to see SHAP evidence and decide"
          right={pendingCount > 0 ? <MissionStatusChip tone="critical" label={`${pendingCount} pending`} /> : undefined}
        />
        <div className="engine-item-list">
          {state.threats.map((threat) => (
            <div
              key={threat.id}
              onClick={() => dispatch({ type: 'FOCUS_THREAT', id: threat.id })}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') dispatch({ type: 'FOCUS_THREAT', id: threat.id }); }}
            >
              <ThreatAlertCard
                alert={threat}
                onApprove={handleApprove}
                onBlock={handleBlock}
                summaryMaxLinesDesktop={contract.density.maxSummaryLinesDesktop}
                summaryMaxLinesMobile={contract.density.maxSummaryLinesMobile}
                detailsDefault={contract.density.detailsDefault}
              />
              <ProofLine
                claim={`Confidence ${(threat.aiExplanation.confidence / 100).toFixed(2)}`}
                evidence={`Top SHAP: ${threat.aiExplanation.shapValues[0]?.feature ?? 'N/A'} (${Math.abs(threat.aiExplanation.shapValues[0]?.shapValue ?? 0).toFixed(2)})`}
                source={`FP rate ${threat.aiExplanation.falsePositiveRate}%`}
                basis="per-event"
                sourceType="model"
              />
            </div>
          ))}
        </div>
        <DefinitionLine
          metric="Risk score"
          formula="SHAP(features) x confidence"
          unit="score (0-1)"
          period="per-event"
          threshold="> 0.70 = actionable"
        />
      </section>

      {/* 2. Signal intelligence */}
      <article className="engine-card">
        <MissionSectionHeader
          title="Signal intelligence"
          message="Live signal decomposition. Model v3.2."
        />
        <SignalGroup>
          <SignalRow icon="●" label="Fraud signals" value={`${activeSignals.fraud} active`} color="red" />
          <SignalRow icon="●" label="Spending anomalies" value={`${activeSignals.spending} active`} color="amber" />
          <SignalRow icon="●" label="Overdraft risk" value={`${activeSignals.overdraft} active`} color="teal" />
          <SignalRow icon="●" label="Subscription leaks" value={`${activeSignals.subscriptions} detected`} color="violet" />
        </SignalGroup>
        <ProofLine
          claim="Signal ensemble active"
          evidence={`4 categories | ${state.threats.length} threat models | Real-time`}
          source="Protect signal pipeline v3.2"
          sourceType="model"
        />
        <DefinitionLine
          metric="Signal strength"
          formula="max(category_signals)"
          unit="count"
          period="real-time"
        />
      </article>

      {/* 3. Protection performance */}
      <article className="engine-card">
        <MissionSectionHeader
          title="Protection performance"
          message="Aggregate containment metrics across all threat models."
        />
        <MissionMetricTiles
          items={[
            { id: 'PRO-STAT-1', label: 'Protected', value: `$${mockProtectStats.totalProtected.toLocaleString()}`, tone: 'healthy' },
            { id: 'PRO-STAT-2', label: 'Blocked', value: String(mockProtectStats.threatsBlocked), tone: 'critical' },
            { id: 'PRO-STAT-3', label: 'Saved (mo)', value: `$${mockProtectStats.savingsThisMonth}`, tone: 'primary' },
            { id: 'PRO-STAT-4', label: 'Accuracy', value: `${mockProtectStats.accuracy}%`, tone: 'healthy' },
          ]}
        />
        <ProofLine
          claim={`${mockProtectStats.threatsBlocked} threats blocked`}
          evidence={`$${mockProtectStats.totalProtected.toLocaleString()} protected | ${mockProtectStats.accuracy}% accuracy | Model v3.2`}
          source="Protect engine containment"
          basis="30d rolling"
          sourceType="model"
        />
        <DefinitionLine
          metric="Protection rate"
          formula="blocked / (blocked + missed)"
          unit="percentage"
          period="30d rolling"
          threshold="> 90%"
        />
      </article>

      {/* 4. Subscription leak detection */}
      <section className="engine-section">
        <MissionSectionHeader
          title="Subscription leak detection"
          message="Detected unused or overpriced subscriptions."
          right={(
            <MissionStatusChip
              tone="warning"
              label={`$${wasteTotal.toLocaleString()}/yr waste`}
            />
          )}
        />
        <div className="engine-item-list">
          {mockSubscriptionLeaks.slice(0, 2).map((leak) => (
            <SubscriptionLeakCard key={leak.id} leak={leak} />
          ))}
        </div>
        <ProofLine
          claim={`${mockSubscriptionLeaks.length} leaks detected`}
          evidence={`$${wasteTotal.toLocaleString()}/yr estimated waste | Trailing 12mo analysis`}
          source="Protect subscription monitor"
          sourceType="model"
        />
        <DefinitionLine
          metric="Waste estimate"
          formula="monthly_charge x months_unused"
          unit="USD/year"
          period="trailing 12mo"
        />
      </section>

      {/* 5. Govern footer */}
      <GovernContractSet
        auditId="GV-2026-0212-PRT1"
        modelVersion="v3.2"
        explanationVersion="xai-2.1"
      />
      <div className="govern-footer">
        <GovernVerifiedBadge
          auditId="GV-2026-0212-PRT1"
          modelVersion="v3.2"
          explanationVersion="xai-2.1"
        />
        <AuditLinkChip auditId="GV-2026-0212-PRT1" />
        <HumanReviewCTA caseType="dispute" />
      </div>
    </>
  );

  // ── Decision rail ────────────────────────────────────────

  const decisionRail = (
    <>
      {/* 0. Security score ring — visual summary */}
      <article className="engine-card">
        <ScoreRing
          score={mockProtectStats.accuracy}
          label="Security Score"
          subtitle={`/ 100`}
          statusText={mockProtectStats.accuracy >= 90 ? 'Excellent Protection' : 'Review Recommended'}
          color="var(--accent-teal)"
          size="lg"
        />
      </article>

      {/* 1. Composite risk */}
      <article className="engine-card">
        <MissionSectionHeader
          title="Composite risk"
          message="Weighted average across all active threat models."
        />
        <RiskScoreDial
          score={compositeScore}
          band={riskBand}
          trend="down"
          trendDelta="-0.03"
        />
        <ProofLine
          claim={`Risk ${compositeScore.toFixed(2)} — ${riskBand}`}
          evidence={`Weighted across ${state.threats.length} models | Threshold < 0.70`}
          source="Protect threat ensemble v3.2"
          sourceType="model"
        />
        <DefinitionLine
          metric="Composite risk"
          formula="weighted_avg(threat_confidences)"
          unit="0–1"
          period="real-time"
          threshold="< 0.70"
        />
      </article>

      {/* 2. Threat evidence panel */}
      {focusedThreat ? (
        <article className="engine-card">
          <MissionSectionHeader
            title={`Alert: ${focusedThreat.transaction.merchant}`}
            message={`${focusedThreat.type} · ${focusedThreat.severity} severity`}
          />
          <ExplainableInsightPanel
            title="Threat evidence"
            summary={focusedThreat.aiExplanation.reason}
            topFactors={focusedThreat.aiExplanation.shapValues.slice(0, 3).map((s) => ({
              label: s.feature,
              contribution: Math.abs(s.shapValue),
              note: s.explanation,
            }))}
            confidence={focusedThreat.aiExplanation.confidence / 100}
            recency="Just now"
            governMeta={{
              auditId: `GV-2026-0212-${focusedThreat.id}`,
              modelVersion: 'v3.2',
              explanationVersion: 'xai-2.1',
              timestamp: new Date().toISOString(),
            }}
          />
          {state.pendingAction !== 'idle' && (
            <>
              {state.pendingAction === 'previewing_block' ? (
                <ActionOutcomePreview
                  outcome="Transaction blocked. Merchant rule updated. Future transactions from this merchant will be flagged."
                  reversibleWindow="24h"
                  sideEffects={[
                    'Merchant flagged for future transactions',
                    'Finance owner notified via alert',
                    'Audit trail entry created',
                  ]}
                  impact={`$${focusedThreat.transaction.amount.toLocaleString()} blocked`}
                  reversible
                />
              ) : (
                <ActionOutcomePreview
                  outcome="Transaction approved. Alert resolved. Model will incorporate this feedback to reduce future false positives."
                  reversibleWindow="N/A"
                  sideEffects={[
                    'Model updated with approval feedback',
                    'False positive rate may adjust',
                    'Audit trail entry created',
                  ]}
                  reversible={false}
                />
              )}
              <div className="mission-dual-actions">
                <Button variant="primary" onClick={handleConfirm}>
                  {state.pendingAction === 'previewing_block' ? 'Confirm block' : 'Confirm approve'}
                </Button>
                <Button variant="ghost" onClick={handleCancel}>Cancel</Button>
              </div>
            </>
          )}
          <ProofLine
            claim={`Confidence ${(focusedThreat.aiExplanation.confidence / 100).toFixed(2)}`}
            evidence={`Top: ${focusedThreat.aiExplanation.shapValues[0]?.feature ?? 'N/A'} | FP rate ${focusedThreat.aiExplanation.falsePositiveRate}%`}
            source={`Model v3.2 | ${focusedThreat.severity} severity`}
            sourceType="model"
          />
        </article>
      ) : (
        <article className="engine-card">
          <MissionSectionHeader
            title="Threat evidence"
            message="Select a threat from the triage queue to inspect its SHAP evidence and decide."
          />
        </article>
      )}

      {/* 3. Investigation status board */}
      <article className="engine-card">
        <MissionSectionHeader
          title="Active investigations"
          message="Ongoing investigations and their model confidence scores."
        />
        <MissionDataRows
          items={statusRows.map((row) => ({
            id: `PRO-ROW-${row.key}`,
            title: row.key,
            value: row.score,
            detail: row.status,
            tone: row.tone,
          }))}
        />
        <ProofLine
          claim="3 active investigations"
          evidence="Card misuse 0.96 | Vendor anomaly 0.91 | Chargeback 0.88"
          source="Protect investigation pipeline"
          sourceType="model"
        />
        <DefinitionLine
          metric="Investigation score"
          formula="model_confidence x severity_weight"
          unit="0–1"
          period="per-case"
          threshold="> 0.90 = auto-escalate"
        />
      </article>

      {/* 4. Containment actions */}
      <article className="engine-card">
        <MissionSectionHeader
          title="Recommended containment"
          message="Ranked by severity and confidence."
        />
        <MissionActionList items={quickActions} />
        <ProofLine
          claim="3 actions recommended"
          evidence="Prioritized by severity x confidence | Model v3.2"
          source="Protect action ranker"
          sourceType="model"
        />
        <DefinitionLine
          metric="Action priority"
          formula="severity_weight x confidence"
          unit="rank"
          period="real-time"
        />
        <div className="mission-dual-actions">
          <Link className="entry-btn entry-btn--ghost" to="/execute">Open action queue</Link>
          <Link className="entry-btn entry-btn--ghost" to="/govern">Audit trail</Link>
        </div>
      </article>

      {/* 5. Protect sub-trust */}
      <article className="engine-card">
        <MissionSectionHeader
          title="Protect engine trust"
          message="Sub-component confidence breakdown."
        />
        <TrustIndexCard
          score={92}
          trend="stable"
          components={protectTrustComponents}
          updatedAt="2 hours ago"
        />
        <ProofLine
          claim="Protect trust 92/100"
          evidence="4 sub-components | All above threshold | Detection 94, FP 88, Response 91, Containment 96"
          source="Protect trust composite"
          sourceType="model"
        />
        <DefinitionLine
          metric="Sub-trust index"
          formula="weighted_mean(sub_components)"
          unit="0–100"
          period="rolling 30d"
          threshold="> 85"
        />
      </article>
    </>
  );

  // ── Render ───────────────────────────────────────────────

  return (
    <PageShell
      slug="protect"
      contract={contract}
      layout="engine"
      heroVariant="focused"
      hero={{
        kicker: 'Protect Engine',
        engineBadge: 'Protect',
        headline: `${pendingCount} pending threats. Composite risk: ${compositeScore.toFixed(2)} (${riskBand}).`,
        subline: `${criticalCount} critical alerts require triage. Model v3.2 | FP < 5% | ${mockProtectStats.accuracy}% accuracy.`,
        valueStatement: `$${mockProtectStats.totalProtected.toLocaleString()} protected this cycle. ${mockProtectStats.threatsBlocked} threats contained.`,
        proofLine: {
          claim: `Composite risk ${compositeScore.toFixed(2)} — ${riskBand}`,
          evidence: `${state.threats.length} active models | Weighted confidence | Guardrail < 0.70`,
          source: 'Protect threat ensemble v3.2',
        },
        heroAction: {
          label: 'Triage priority:',
          text: `Resolve ${criticalCount} critical alerts before 24h SLA.`,
          cta: { label: 'Begin triage', to: '#threat-triage' },
        },
        freshness: new Date(Date.now() - 5 * 60 * 1000),
        kpis: [
          {
            label: 'Pending threats',
            value: String(pendingCount),
            definition: 'Active threats awaiting triage. Threshold: 0 pending within 24h SLA.',
            accent: 'teal',
            sparklineData: kpiSparklines.alert,
            sparklineColor: 'var(--state-healthy)',
          },
          {
            label: 'False positive rate',
            value: '-12%',
            delta: 'MoM',
            definition: 'Month-over-month false positive rate change. Target: < 5%.',
            accent: 'cyan',
            sparklineData: kpiSparklines.fp,
            sparklineColor: '#00F0FF',
          },
          {
            label: 'Mean resolution',
            value: '18m',
            definition: 'Mean time to resolve flagged threat. Target: < 30m.',
            accent: 'blue',
            sparklineData: kpiSparklines.recovery,
            sparklineColor: 'var(--state-primary)',
          },
          {
            label: 'Value protected',
            value: `$${mockProtectStats.totalProtected.toLocaleString()}`,
            delta: '+$4.2k',
            definition: 'Total value of prevented fraudulent transactions this cycle.',
            accent: 'amber',
            sparklineData: kpiSparklines.blocked,
            sparklineColor: 'var(--state-warning)',
          },
        ],
      }}
      primaryFeed={primaryFeed}
      decisionRail={decisionRail}
    />
  );
};

export default Protect;
