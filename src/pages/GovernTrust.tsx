import React from 'react';
import { Link } from '../router';
import { DefinitionLine } from '../components/DefinitionLine';
import { PageShell } from '../components/PageShell';
import { GovernContractSet } from '../components/GovernContractSet';
import { MissionDataRows } from '../components/MissionDataRows';
import { MissionSectionHeader } from '../components/MissionSectionHeader';
import { MissionStatusChip } from '../components/MissionStatusChip';
import { ProofLine } from '../components/ProofLine';
import { TrustIndexCard } from '../components/TrustIndexCard';
import { getRouteScreenContract } from '../contracts/route-screen-contracts';

const trustComponents = [
  { label: 'Accuracy', score: 96, trend: 'up' as const },
  { label: 'Transparency', score: 98, trend: 'up' as const },
  { label: 'Fairness', score: 94, trend: 'stable' as const },
  { label: 'Compliance', score: 100, trend: 'stable' as const },
];

const kpiSparklines = {
  trust: [{ value: 92 }, { value: 93 }, { value: 94 }, { value: 95 }, { value: 96 }, { value: 97 }],
  accuracy: [{ value: 94 }, { value: 94.5 }, { value: 95 }, { value: 95.5 }, { value: 96 }, { value: 96 }],
  transparency: [{ value: 95 }, { value: 96 }, { value: 96 }, { value: 97 }, { value: 98 }, { value: 98 }],
  decisions: [{ value: 1100 }, { value: 1150 }, { value: 1180 }, { value: 1210 }, { value: 1230 }, { value: 1247 }],
};

export const GovernTrust: React.FC = () => {
  const contract = getRouteScreenContract('govern-trust');

  const mainContent = (
    <>
      <article className="engine-card">
        <MissionSectionHeader
          title="Trust Index"
          message="Composite trust score across all AI dimensions."
          right={<MissionStatusChip tone="healthy" label="97 / 100" />}
        />
        <TrustIndexCard
          score={97}
          trend="up"
          components={trustComponents}
          updatedAt="2h ago"
        />
        <ProofLine
          claim="Trust score 97/100"
          evidence="Composite of accuracy, transparency, fairness, and compliance"
          source="Trust engine"
          basis="real-time composite"
          sourceType="model"
        />
        <DefinitionLine
          metric="Trust index"
          formula="weighted_avg(accuracy, transparency, fairness, compliance)"
          unit="score (0-100)"
          period="real-time"
          threshold="> 90"
        />
      </article>

      <section className="engine-section">
        <MissionSectionHeader
          title="Trust components"
          message="Individual scores for each trust dimension."
        />
        <MissionDataRows
          items={trustComponents.map((tc, i) => ({
            id: `TC-${i + 1}`,
            title: tc.label,
            value: `${tc.score}%`,
            detail: `Trend: ${tc.trend}`,
            tone: tc.score >= 90 ? 'healthy' as const : 'warning' as const,
          }))}
        />
        <ProofLine
          claim="All components healthy"
          evidence="No component below 94% threshold"
          source="Quarterly trust review"
          basis="quarterly"
          sourceType="system"
        />
      </section>

      <article className="engine-card">
        <MissionSectionHeader
          title="KPI contract cards"
          message="Key performance indicators for trust governance."
        />
        <MissionDataRows
          items={[
            { id: 'KPI-1', title: 'Decisions reviewed', value: '1,247', detail: 'Total AI decisions audited', tone: 'primary' },
            { id: 'KPI-2', title: 'User feedback', value: '342', detail: 'Correctness signals received', tone: 'primary' },
            { id: 'KPI-3', title: 'Policy exceptions', value: '1', detail: 'Open exceptions requiring review', tone: 'warning' },
            { id: 'KPI-4', title: 'Model versions', value: '4', detail: 'Active models across engines', tone: 'primary' },
          ]}
        />
        <DefinitionLine
          metric="Decision coverage"
          formula="audited_decisions / total_decisions"
          unit="percentage"
          period="30 days rolling"
          threshold="100%"
        />
      </article>

      <GovernContractSet
        auditId="GV-2026-0212-TRUST"
        modelVersion="v3.2"
        explanationVersion="xai-1.1"
      />
    </>
  );

  const sideContent = (
    <article className="engine-card">
      <MissionSectionHeader
        title="Quick actions"
        message="Navigate to trust governance surfaces."
      />
      <div className="dashboard-side-actions">
        <Link className="entry-btn entry-btn--primary" to="/govern/audit">View audit ledger</Link>
        <Link className="entry-btn entry-btn--ghost" to="/govern/oversight">Oversight queue</Link>
      </div>
    </article>
  );

  return (
    <PageShell
      slug="govern"
      contract={contract}
      layout="engine"
      heroVariant="analytical"
      hero={{
        kicker: 'Trust Dashboard',
        headline: 'Composite trust across all engines.',
        subline: contract.oneScreenMessage,
        proofLine: {
          claim: 'Trust score 97/100',
          evidence: '4 components above threshold | Trend improving',
          source: 'Trust engine',
        },
        freshness: new Date(Date.now() - 2 * 60 * 60 * 1000),
        kpis: [
          { label: 'Trust index', value: '97', definition: 'Composite trust score across all dimensions', accent: 'blue', sparklineData: kpiSparklines.trust, sparklineColor: 'var(--state-primary)' },
          { label: 'Accuracy', value: '96%', definition: 'Cross-engine model prediction accuracy', accent: 'teal', sparklineData: kpiSparklines.accuracy, sparklineColor: 'var(--state-healthy)' },
          { label: 'Transparency', value: '98%', definition: 'Decisions with complete explanation', accent: 'cyan', sparklineData: kpiSparklines.transparency, sparklineColor: '#00F0FF' },
          { label: 'Decisions', value: '1,247', definition: 'Total AI decisions in audit ledger', accent: 'amber', sparklineData: kpiSparklines.decisions, sparklineColor: 'var(--state-warning)' },
        ],
      }}
      primaryFeed={mainContent}
      decisionRail={sideContent}
    />
  );
};

export default GovernTrust;
