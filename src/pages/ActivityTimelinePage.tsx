import React from 'react';
import { Link } from '../router';
import { PageShell } from '../components/PageShell';
import { GovernContractSet } from '../components/GovernContractSet';
import { ActivityTimeline } from '../components/ActivityTimeline';
import { MissionDataRows } from '../components/MissionDataRows';
import { MissionSectionHeader } from '../components/MissionSectionHeader';
import { ProofLine } from '../components/ProofLine';
import { DefinitionLine } from '../components/DefinitionLine';
import { getRouteScreenContract } from '../contracts/route-screen-contracts';

const recentActions = [
  { id: 'TA-001', title: 'Subscription cancelled — Netflix', value: '-$15.99/mo', detail: 'Execute · 2h ago', tone: 'healthy' as const },
  { id: 'TA-002', title: 'Fraud alert resolved — Amazon', value: 'Cleared', detail: 'Protect · 4h ago', tone: 'primary' as const },
  { id: 'TA-003', title: 'Savings transfer — Emergency fund', value: '+$500', detail: 'Execute · 8h ago', tone: 'healthy' as const },
  { id: 'TA-004', title: 'Forecast updated — 30d horizon', value: '+2.1%', detail: 'Grow · 12h ago', tone: 'primary' as const },
  { id: 'TA-005', title: 'Policy review completed', value: 'Clean', detail: 'Govern · 1d ago', tone: 'healthy' as const },
  { id: 'TA-006', title: 'Anomaly investigation started', value: 'In progress', detail: 'Protect · 1d ago', tone: 'warning' as const },
];

const kpiSparklines = {
  actions: [{ value: 12 }, { value: 14 }, { value: 16 }, { value: 18 }, { value: 20 }, { value: 22 }],
  engines: [{ value: 3 }, { value: 4 }, { value: 4 }, { value: 4 }, { value: 4 }, { value: 4 }],
  success: [{ value: 95 }, { value: 96 }, { value: 97 }, { value: 98 }, { value: 98 }, { value: 99 }],
  audited: [{ value: 100 }, { value: 100 }, { value: 100 }, { value: 100 }, { value: 100 }, { value: 100 }],
};

export const ActivityTimelinePage: React.FC = () => {
  const contract = getRouteScreenContract('activity-timeline');

  const mainContent = (
    <>
      <section className="engine-section">
        <MissionSectionHeader
          title="Recent actions"
          message="All 22 actions this week are fully traceable."
          contextCue="Inspect full audit record for any entry"
        />
        <MissionDataRows items={recentActions} />
        <ProofLine
          claim="22 actions this week"
          evidence="Across all 4 engines | 99% success rate"
          source="Activity log"
          basis="7 days rolling"
          sourceType="audit"
        />
      </section>

      <article className="engine-card">
        <MissionSectionHeader title="Timeline view" />
        <ActivityTimeline />
        <DefinitionLine
          metric="Action traceability"
          formula="count(audited) / count(total)"
          unit="percentage"
          period="all time"
          threshold="> 99%"
        />
      </article>

      <GovernContractSet
        auditId="GV-2026-0212-TL01"
        modelVersion="v3.2"
        explanationVersion="xai-1.1"
      />
    </>
  );

  const sideContent = (
    <article className="engine-card">
      <MissionSectionHeader
        title="Activity summary"
        message="Breakdown by engine for the last 7 days."
      />
      <MissionDataRows
        items={[
          { id: 'AS-1', title: 'Protect actions', value: '8', tone: 'primary' },
          { id: 'AS-2', title: 'Grow updates', value: '5', tone: 'healthy' },
          { id: 'AS-3', title: 'Execute completions', value: '6', tone: 'warning' },
          { id: 'AS-4', title: 'Govern reviews', value: '3', tone: 'primary' },
        ]}
      />
      <div className="engine-actions" style={{ marginTop: 16 }}>
        <Link to="/govern/audit" className="entry-btn entry-btn--ghost">
          Full audit ledger →
        </Link>
      </div>
    </article>
  );

  return (
    <PageShell
      slug="protect"
      contract={contract}
      layout="engine"
      heroVariant="editorial"
      hero={{
        kicker: 'Activity Timeline',
        headline: 'Chronological action trace.',
        subline: contract.oneScreenMessage,
        proofLine: {
          claim: 'Full traceability',
          evidence: 'Every action linked to engine + audit ID | 100% coverage',
          source: 'Cross-engine log',
        },
        freshness: new Date(Date.now() - 5 * 60 * 1000),
        kpis: [
          { label: 'Actions (7d)', value: '22', delta: '+10%', definition: 'Total actions across engines this week', accent: 'teal', sparklineData: kpiSparklines.actions, sparklineColor: 'var(--state-healthy)' },
          { label: 'Engines active', value: '4/4', definition: 'All engines reporting activity', accent: 'blue', sparklineData: kpiSparklines.engines, sparklineColor: 'var(--state-primary)' },
          { label: 'Success rate', value: '99%', delta: '+1%', definition: 'Actions completed without rollback', accent: 'cyan', sparklineData: kpiSparklines.success, sparklineColor: '#00F0FF' },
          { label: 'Audit coverage', value: '100%', definition: 'All actions have audit trail', accent: 'amber', sparklineData: kpiSparklines.audited, sparklineColor: 'var(--state-warning)' },
        ],
      }}
      primaryFeed={mainContent}
      decisionRail={sideContent}
    />
  );
};

export default ActivityTimelinePage;
