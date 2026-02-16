import React, { useState } from 'react';
import { Link } from '../router';
import { ActionQueueCard } from '../components/ActionQueueCard';
import { AutoSaveRuleCard } from '../components/AutoSaveRuleCard';
import { DefinitionLine } from '../components/DefinitionLine';
import { PageShell } from '../components/PageShell';
import { ExplainableInsightPanel } from '../components/ExplainabilityPanel';
import { GovernContractSet } from '../components/GovernContractSet';
import { MissionActionList } from '../components/MissionActionList';
import { MissionDataRows } from '../components/MissionDataRows';
import { MissionEmptyState } from '../components/MissionEmptyState';
import { MissionEvidencePanel } from '../components/MissionEvidencePanel';
import { MissionSectionHeader } from '../components/MissionSectionHeader';
import { MissionStatusChip } from '../components/MissionStatusChip';
import { ProofLine } from '../components/ProofLine';
import { ScoreRing } from '../components/ScoreRing';
import {
  executeAction,
  mockActions,
  mockAutoSaveRules,
  mockBillNegotiations,
} from '../services/mockExecute';
import { getRouteScreenContract } from '../contracts/route-screen-contracts';
import { useUI } from '../contexts/UIContext';
import type { Action, AutoSaveRule } from '../services/mockExecute';

const kpiSparklines = {
  queued: [{ value: 8 }, { value: 7 }, { value: 6 }, { value: 5 }, { value: 5 }, { value: 5 }],
  success: [{ value: 98.5 }, { value: 98.8 }, { value: 99.0 }, { value: 99.0 }, { value: 99.1 }, { value: 99.1 }],
  latency: [{ value: 52 }, { value: 50 }, { value: 49 }, { value: 48 }, { value: 47 }, { value: 47 }],
  rollback: [{ value: 100 }, { value: 100 }, { value: 100 }, { value: 100 }, { value: 100 }, { value: 100 }],
};

export const Execute: React.FC = () => {
  const [actions, setActions] = useState<Action[]>(mockActions);
  const [rules, setRules] = useState<AutoSaveRule[]>(mockAutoSaveRules);
  const [selectedAction, setSelectedAction] = useState<Action | null>(null);
  const { addNotification } = useUI();
  const contract = getRouteScreenContract('execute');

  const handleApprove = async (id: string) => {
    setActions((prev) => prev.map((item) => (item.id === id ? { ...item, status: 'executing' } : item)));
    const result = await executeAction(id);
    setActions((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: result.success ? 'completed' : 'failed' } : item,
      ),
    );
    addNotification({
      type: result.success ? 'success' : 'error',
      message: result.success
        ? 'Action executed successfully. Audit trail updated.'
        : 'Action failed. Review evidence before retrying.',
    });
  };

  const handleDecline = (id: string) => {
    setActions((prev) => prev.map((item) => (item.id === id ? { ...item, status: 'declined' } : item)));
    addNotification({ type: 'info', message: 'Action declined. Queue has been updated.' });
  };

  const handleDefer = (_id: string) => {
    // Intentionally no-op in prototype.
  };

  const handleToggleRule = (id: string) => {
    setRules((prev) => prev.map((rule) => (rule.id === id ? { ...rule, enabled: !rule.enabled } : rule)));
  };

  const pendingActions = actions.filter((item) => item.status === 'pending');
  const totalPotentialSavings = pendingActions.reduce((sum, item) => sum + item.estimatedImpact.savings, 0);
  const sortedPending = [...pendingActions].sort((a, b) => {
    const rank: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3 };
    return (rank[a.priority] ?? 3) - (rank[b.priority] ?? 3);
  });

  const mainContent = (
    <>
      {pendingActions.length > 0 ? (
        <MissionEvidencePanel
          className="engine-card"
          title="Potential savings from pending actions"
          summary={`Total annual savings if all actions are approved: $${totalPotentialSavings.toLocaleString()}`}
          meta={`${pendingActions.length} pending`}
          tone="healthy"
        />
      ) : null}

      <section className="engine-section">
        <MissionSectionHeader
          title="Action queue"
          message="Actions ranked by impact, confidence, and urgency."
          contextCue="Review action details and approve"
          right={<MissionStatusChip tone="warning" label={`${pendingActions.length} pending`} />}
        />

        <DefinitionLine
          metric="Queue ranking"
          formula="impact x confidence x urgency_weight"
          unit="composite score"
          period="per-action"
        />

        <div className="engine-item-list">
          {sortedPending.length > 0 ? (
            sortedPending.map((action) => (
              <div
                key={action.id}
                onClick={() => setSelectedAction(action)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') setSelectedAction(action); }}
              >
                <ActionQueueCard
                  action={action}
                  onApprove={handleApprove}
                  onDecline={handleDecline}
                  onDefer={handleDefer}
                />
                <ProofLine
                  claim={`${action.priority} priority`}
                  evidence={`${action.type} | Impact: $${action.estimatedImpact.savings}/yr | Risk: ${action.estimatedImpact.riskLevel}`}
                  source="Execute engine"
                  basis="per-action"
                  sourceType="model"
                />
              </div>
            ))
          ) : (
            <MissionEmptyState
              title="No pending actions"
              description="All queued actions are completed or acknowledged."
            />
          )}
        </div>
      </section>

      <article className="engine-card">
        <MissionSectionHeader
          title="Bill negotiations"
          message="Identified opportunities to reduce recurring charges."
        />
        <MissionActionList
          items={mockBillNegotiations.map((negotiation) => ({
            title: `${negotiation.provider}: $${negotiation.currentRate} → $${negotiation.marketRate}`,
            meta: `$${negotiation.expectedSavings.monthly}/mo · ${negotiation.expectedSavings.confidence}% confidence`,
            tone: 'primary',
          }))}
        />
        <ProofLine
          claim={`${mockBillNegotiations.length} negotiation opportunity`}
          evidence={`$${mockBillNegotiations.reduce((s, n) => s + n.expectedSavings.annual, 0)}/yr potential savings`}
          source="Execute engine"
          basis="market rate comparison"
          sourceType="observed"
        />
      </article>

      <GovernContractSet
        auditId="GV-2026-0212-EXE1"
        modelVersion="v3.2"
        explanationVersion="xai-1.1"
      />
    </>
  );

  const completedActions = actions.filter((a) => a.status === 'completed');

  const sideContent = (
    <>
      {/* Execution success ring — visual summary */}
      <article className="engine-card">
        <ScoreRing
          score={completedActions.length > 0 ? Math.round((completedActions.length / Math.max(actions.length, 1)) * 100) : 99}
          label="Success Rate"
          subtitle="%"
          statusText={`${completedActions.length} completed this cycle`}
          color="var(--accent-gold)"
          size="md"
        />
      </article>

      {/* Recent executions timeline */}
      <article className="engine-card">
        <MissionSectionHeader
          title="Recent executions"
          message="Latest completed actions and outcomes."
        />
        <MissionDataRows
          items={completedActions.slice(0, 3).map((a) => ({
            id: a.id,
            title: a.title,
            value: `$${a.estimatedImpact.savings}/yr`,
            detail: a.status,
            tone: 'healthy' as const,
          }))}
        />
      </article>

      {selectedAction && (
        <article className="engine-card">
          <MissionSectionHeader
            title={selectedAction.title}
            message={`${selectedAction.sourceEngine} engine · ${selectedAction.priority} priority`}
          />
          <ExplainableInsightPanel
            title="Action rationale"
            summary={selectedAction.aiRecommendation}
            topFactors={[
              { label: 'Impact', contribution: selectedAction.estimatedImpact.savings / 500, note: `$${selectedAction.estimatedImpact.savings}/yr` },
              { label: 'Risk level', contribution: selectedAction.estimatedImpact.riskLevel === 'none' ? 0.1 : selectedAction.estimatedImpact.riskLevel === 'low' ? 0.3 : 0.6 },
              { label: 'Execution speed', contribution: 1 - selectedAction.estimatedImpact.timeToExecute / 30 },
            ]}
            confidence={0.91}
            recency="Just now"
            governMeta={{
              auditId: `GV-2026-0212-${selectedAction.id}`,
              modelVersion: 'v3.2',
              explanationVersion: 'xai-1.1',
              timestamp: new Date().toISOString(),
            }}
          />
        </article>
      )}

      <section className="engine-section">
        <MissionSectionHeader
          title="Automation rules"
          message="Configured auto-execution rules with guardrails."
          right={<MissionStatusChip tone="primary" label={`${rules.filter((rule) => rule.enabled).length} active`} />}
        />
        <div className="engine-item-list">
          {rules.map((rule) => (
            <AutoSaveRuleCard key={rule.id} rule={rule} onToggle={handleToggleRule} />
          ))}
        </div>
      </section>

      <article className="engine-card">
        <MissionSectionHeader
          title="Next best actions"
          message="Recommended steps to maximize execution impact."
        />
        <MissionActionList
          items={[
            { title: 'Approve top-ranked action', meta: 'Savings starts this cycle', tone: 'healthy' },
            { title: 'Run safe-mode execution', meta: 'Rollback in one click', tone: 'warning' },
            { title: 'Escalate risky action', meta: 'Send to Govern review', tone: 'critical' },
          ]}
        />
        <div className="mission-dual-actions">
          <Link className="entry-btn entry-btn--ghost" to="/govern">Open audit trail</Link>
        </div>
      </article>
    </>
  );

  return (
    <PageShell
      slug="execute"
      contract={contract}
      layout="engine"
      heroVariant="analytical"
      hero={{
        kicker: 'Execute Engine',
        engineBadge: 'Execute',
        headline: 'Review, approve, and track every action.',
        subline: 'High-impact actions ranked by savings. Approve to execute, or decline safely.',
        valueStatement: `${pendingActions.length} actions queued. $${totalPotentialSavings.toLocaleString()}/yr potential savings. 100% rollback coverage.`,
        proofLine: {
          claim: 'Confidence 0.91',
          evidence: 'All actions require human approval | 100% rollback coverage',
          source: 'Execute engine',
        },
        heroAction: {
          label: 'Recommended:',
          text: 'Approve the highest-impact queued action to lock in savings.',
          cta: { label: 'Open govern trace →', to: '/govern' },
        },
        freshness: new Date(Date.now() - 4 * 60 * 1000),
        kpis: [
          { label: 'Queued actions', value: String(pendingActions.length), definition: 'Actions awaiting human approval', accent: 'amber', sparklineData: kpiSparklines.queued, sparklineColor: 'var(--state-warning)' },
          { label: 'Success rate', value: '99.1%', definition: 'Completed actions without rollback in last 30 days', accent: 'teal', sparklineData: kpiSparklines.success, sparklineColor: 'var(--state-healthy)' },
          { label: 'Avg latency', value: '47ms', definition: 'Mean execution time from approval to completion', accent: 'cyan', sparklineData: kpiSparklines.latency, sparklineColor: '#00F0FF' },
          { label: 'Rollback ready', value: '100%', definition: 'Percentage of actions with automated undo capability', accent: 'blue', sparklineData: kpiSparklines.rollback, sparklineColor: 'var(--state-primary)' },
        ],
      }}
      primaryFeed={mainContent}
      decisionRail={sideContent}
    />
  );
};

export default Execute;
