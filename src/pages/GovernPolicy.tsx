import React from 'react';
import { DefinitionLine } from '../components/DefinitionLine';
import { PageShell } from '../components/PageShell';
import { GovernContractSet } from '../components/GovernContractSet';
import { MissionDataRows } from '../components/MissionDataRows';
import { MissionSectionHeader } from '../components/MissionSectionHeader';
import { MissionStatusChip } from '../components/MissionStatusChip';
import { PolicyModelCards } from '../components/PolicyModelCards';
import type { ModelCard } from '../components/PolicyModelCards';
import { ProofLine } from '../components/ProofLine';
import { getRouteScreenContract } from '../contracts/route-screen-contracts';

const modelCards: ModelCard[] = [
  {
    id: 'MC-001', name: 'FraudDetectionV3.2', engine: 'protect', version: '3.2.1',
    accuracy: 99.7, limitations: ['Limited international pattern data'], lastAudit: '2026-02-01', status: 'active',
  },
  {
    id: 'MC-002', name: 'CashFlowLSTM', engine: 'grow', version: '2.1.0',
    accuracy: 96.0, limitations: ['Seasonal bias under-corrected'], lastAudit: '2026-01-15', status: 'active',
  },
  {
    id: 'MC-003', name: 'AutoSaveOptimizer', engine: 'execute', version: '1.5.2',
    accuracy: 94.0, limitations: ['Assumes regular income pattern'], lastAudit: '2026-01-28', status: 'active',
  },
  {
    id: 'MC-004', name: 'ComplianceScanner', engine: 'govern', version: '1.0.3',
    accuracy: 98.5, limitations: ['US regulations only'], lastAudit: '2026-02-05', status: 'active',
  },
];

const policyBoundaries = [
  { id: 'PB-001', title: 'No autonomous high-value transactions', value: 'Enforced', tone: 'healthy' as const },
  { id: 'PB-002', title: 'Human review on all disputes', value: 'Enforced', tone: 'healthy' as const },
  { id: 'PB-003', title: 'Fail-closed on missing audit data', value: 'Enforced', tone: 'healthy' as const },
  { id: 'PB-004', title: 'Max 30-day data retention for location', value: 'Enforced', tone: 'healthy' as const },
  { id: 'PB-005', title: 'User consent required for data sharing', value: 'Enforced', tone: 'healthy' as const },
];

const kpiSparklines = {
  models: [{ value: 3 }, { value: 3 }, { value: 4 }, { value: 4 }, { value: 4 }, { value: 4 }],
  boundaries: [{ value: 4 }, { value: 4 }, { value: 5 }, { value: 5 }, { value: 5 }, { value: 5 }],
  compliance: [{ value: 100 }, { value: 100 }, { value: 100 }, { value: 100 }, { value: 100 }, { value: 100 }],
  lastAudit: [{ value: 7 }, { value: 6 }, { value: 5 }, { value: 4 }, { value: 3 }, { value: 7 }],
};

export const GovernPolicy: React.FC = () => {
  const contract = getRouteScreenContract('govern-policy');

  const mainContent = (
    <>
      <section className="engine-section" data-slot="model_cards">
        <MissionSectionHeader
          title="Model cards"
          message="All active AI models with accuracy metrics and known limitations."
          contextCue="Click any card for full model documentation"
          right={<MissionStatusChip tone="healthy" label={`${modelCards.length} models`} />}
        />
        <PolicyModelCards models={modelCards} />
        <ProofLine
          claim={`${modelCards.length} models registered`}
          evidence="All audited within 30 days | No deprecated models active"
          source="Model registry"
          basis="current"
          sourceType="system"
        />
        <DefinitionLine
          metric="Model audit freshness"
          formula="days_since_last_audit"
          unit="days"
          period="per model"
          threshold="< 30"
        />
      </section>

      <section className="engine-section" data-slot="policy_boundaries">
        <MissionSectionHeader
          title="Policy boundaries"
          message="Enforced guardrails limiting AI decision authority."
        />
        <MissionDataRows items={policyBoundaries} />
        <ProofLine
          claim="All boundaries enforced"
          evidence="5/5 policy boundaries active | 0 violations"
          source="Policy engine"
          basis="all time"
          sourceType="policy"
        />
        <DefinitionLine
          metric="Boundary compliance"
          formula="enforced_boundaries / total_boundaries"
          unit="ratio"
          period="all time"
          threshold="100%"
        />
      </section>

      <GovernContractSet
        auditId="GV-2026-0212-POL"
        modelVersion="v3.2"
        explanationVersion="xai-1.1"
      />
    </>
  );

  const sideContent = (
    <article className="engine-card">
      <MissionSectionHeader
        title="Policy health"
        message="Aggregate policy enforcement metrics."
      />
      <MissionDataRows
        items={[
          { id: 'PH-1', title: 'Active policies', value: '14', tone: 'primary' },
          { id: 'PH-2', title: 'Violations (30d)', value: '0', tone: 'healthy' },
          { id: 'PH-3', title: 'Last review', value: '7 days ago', tone: 'primary' },
        ]}
      />
      <DefinitionLine
        metric="Violation rate"
        formula="policy_violations / total_decisions"
        unit="percentage"
        period="30 days rolling"
        threshold="0%"
      />
    </article>
  );

  return (
    <PageShell
      slug="govern"
      contract={contract}
      layout="engine"
      heroVariant="analytical"
      hero={{
        kicker: 'Policy & Models',
        headline: 'Model cards and policy boundaries.',
        subline: contract.oneScreenMessage,
        proofLine: {
          claim: '4 models, 5 boundaries',
          evidence: 'All models audited | All boundaries enforced',
          source: 'Govern policy engine',
        },
        freshness: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        kpis: [
          { label: 'Models', value: '4', definition: 'Active AI models across engines', accent: 'blue', sparklineData: kpiSparklines.models, sparklineColor: 'var(--state-primary)' },
          { label: 'Boundaries', value: '5', definition: 'Active policy boundaries', accent: 'teal', sparklineData: kpiSparklines.boundaries, sparklineColor: 'var(--state-healthy)' },
          { label: 'Compliance', value: '100%', definition: 'All models within policy bounds', accent: 'cyan', sparklineData: kpiSparklines.compliance, sparklineColor: '#00F0FF' },
          { label: 'Last audit', value: '7d', definition: 'Days since last policy audit', accent: 'amber', sparklineData: kpiSparklines.lastAudit, sparklineColor: 'var(--state-warning)' },
        ],
      }}
      primaryFeed={mainContent}
      decisionRail={sideContent}
    />
  );
};

export default GovernPolicy;
