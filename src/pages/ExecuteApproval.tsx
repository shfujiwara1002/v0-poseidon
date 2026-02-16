import React, { useState } from 'react';
import { Link } from '../router';
import { ActionOutcomePreview } from '../components/ActionOutcomePreview';
import { ConsentScopePanel } from '../components/ConsentScopePanel';
import { DefinitionLine } from '../components/DefinitionLine';
import { PageShell } from '../components/PageShell';
import { ExplainableInsightPanel } from '../components/ExplainabilityPanel';
import { FactorsDropdown } from '../components/FactorsDropdown';
import { GovernContractSet } from '../components/GovernContractSet';
import { MissionDataRows } from '../components/MissionDataRows';
import { MissionSectionHeader } from '../components/MissionSectionHeader';
import { ProofLine } from '../components/ProofLine';
import { getRouteScreenContract } from '../contracts/route-screen-contracts';

const actionDetail = {
  id: 'ACT-2026-0212-001',
  title: 'Consolidate streaming subscriptions',
  type: 'cancel + subscribe',
  priority: 'high',
  description: 'Cancel Netflix and Hulu, subscribe to YouTube Premium family plan.',
  expectedOutcome: 'Save $28/mo ($336/yr) with equivalent content coverage.',
  reversible: true,
  topFactors: [
    { label: 'Cost reduction', contribution: 0.92, note: '$28/mo direct savings' },
    { label: 'Content overlap', contribution: 0.88, note: '60% duplicate content' },
    { label: 'Service equivalence', contribution: 0.82, note: '95% feature parity' },
    { label: 'User disruption', contribution: 0.35, note: 'Minimal setup required' },
  ],
};

const kpiSparklines = {
  impact: [{ value: 20 }, { value: 22 }, { value: 24 }, { value: 26 }, { value: 28 }, { value: 28 }],
  confidence: [{ value: 0.88 }, { value: 0.89 }, { value: 0.90 }, { value: 0.91 }, { value: 0.92 }, { value: 0.92 }],
  rollback: [{ value: 100 }, { value: 100 }, { value: 100 }, { value: 100 }, { value: 100 }, { value: 100 }],
  sla: [{ value: 48 }, { value: 46 }, { value: 44 }, { value: 42 }, { value: 40 }, { value: 38 }],
};

export const ExecuteApproval: React.FC = () => {
  const contract = getRouteScreenContract('execute-approval');
  const [consentGranted, setConsentGranted] = useState(false);

  // Signal → Evidence → Decision order enforced
  const mainContent = (
    <>
      {/* Evidence first */}
      <ExplainableInsightPanel
        title="Action evidence"
        summary={actionDetail.description}
        topFactors={actionDetail.topFactors}
        confidence={0.92}
        recency="5 min ago"
        governMeta={{
          auditId: actionDetail.id,
          modelVersion: 'v1.5',
          explanationVersion: 'xai-1.0',
          timestamp: new Date().toISOString(),
        }}
      />

      <article className="engine-card" data-slot="action_preview">
        <MissionSectionHeader
          title="Expected outcome"
          message="Projected result of executing this action."
        />
        <p>{actionDetail.expectedOutcome}</p>
        <ActionOutcomePreview
          outcome={actionDetail.expectedOutcome}
          reversibleWindow="24h"
          sideEffects={[
            'Netflix and Hulu subscriptions cancelled',
            'YouTube Premium family plan activated',
            'Existing watch history not transferred',
          ]}
          impact="-$28/mo savings"
          reversible={actionDetail.reversible}
        />
        <ProofLine
          claim="Impact estimate"
          evidence={`$28/mo savings | ${actionDetail.reversible ? 'Fully reversible' : 'Irreversible'}`}
          source="Execute engine"
          basis="per-action"
          sourceType="model"
        />
        <DefinitionLine
          metric="Action impact"
          formula="current_cost - alternative_cost"
          unit="dollars / month"
          period="recurring"
        />
      </article>

      {/* Consent scope — must be granted before approval */}
      <ConsentScopePanel
        scope="Subscription management and payment method access"
        duration="One-time action"
        revocationPath="/settings/rights"
        dataCategories={['Subscription data', 'Payment methods', 'Usage history']}
        granted={consentGranted}
        onToggle={setConsentGranted}
      />

      {/* Approve button — disabled until consent granted */}
      <div className="mission-dual-actions">
        <button
          type="button"
          className="entry-btn entry-btn--primary"
          disabled={!consentGranted}
          title={!consentGranted ? 'Review consent scope first' : 'Approve this action'}
        >
          {consentGranted ? 'Approve & execute' : 'Review consent scope first'}
        </button>
        <Link className="entry-btn entry-btn--ghost" to="/execute">Back to queue</Link>
      </div>

      <GovernContractSet
        auditId={actionDetail.id}
        modelVersion="v1.5"
        explanationVersion="xai-1.0"
      />
    </>
  );

  const sideContent = (
    <>
      <article className="engine-card" data-slot="factors_dropdown">
        <MissionSectionHeader
          title="Decision factors"
          message="All factors contributing to this recommendation."
        />
        <FactorsDropdown
          allFactors={actionDetail.topFactors}
          whyItMatters="These factors quantify why this action was recommended. Cost reduction is the primary driver, while user disruption is minimal."
        />
      </article>

      <article className="engine-card">
        <MissionSectionHeader
          title="Risk assessment"
          message="Safety evaluation for this action."
        />
        <MissionDataRows
          items={[
            { id: 'RA-1', title: 'Rollback available', value: 'Yes', tone: 'healthy' },
            { id: 'RA-2', title: 'Side effects', value: 'Minimal', tone: 'healthy' },
            { id: 'RA-3', title: 'Time sensitivity', value: 'Before billing cycle', tone: 'warning' },
          ]}
        />
        <ProofLine
          claim="Low risk action"
          evidence="Fully reversible within 24h | Minimal side effects"
          source="Risk assessment engine"
          basis="per-action"
          sourceType="model"
        />
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
        kicker: 'Approval Gate',
        headline: actionDetail.title,
        subline: contract.oneScreenMessage,
        proofLine: {
          claim: `Priority: ${actionDetail.priority}`,
          evidence: `${actionDetail.topFactors.length} factors analyzed | Consent-gated approval`,
          source: 'Execute engine',
        },
        freshness: new Date(Date.now() - 5 * 60 * 1000),
        kpis: [
          { label: 'Monthly impact', value: '$28', definition: 'Projected monthly savings from this action', accent: 'amber', sparklineData: kpiSparklines.impact, sparklineColor: 'var(--state-warning)' },
          { label: 'Confidence', value: '0.92', definition: 'Model confidence in outcome prediction', accent: 'teal', sparklineData: kpiSparklines.confidence, sparklineColor: 'var(--state-healthy)' },
          { label: 'Rollback', value: '100%', definition: 'Full rollback capability available', accent: 'cyan', sparklineData: kpiSparklines.rollback, sparklineColor: '#00F0FF' },
          { label: 'Exec time', value: '38ms', definition: 'Expected execution duration', accent: 'blue', sparklineData: kpiSparklines.sla, sparklineColor: 'var(--state-primary)' },
        ],
      }}
      primaryFeed={mainContent}
      decisionRail={sideContent}
    />
  );
};

export default ExecuteApproval;
