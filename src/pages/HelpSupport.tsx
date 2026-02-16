import React from 'react';
import { PageShell } from '../components/PageShell';
import { ActivityTimeline } from '../components/ActivityTimeline';
import { MissionActionList } from '../components/MissionActionList';
import { MissionDataRows } from '../components/MissionDataRows';
import { MissionSectionHeader } from '../components/MissionSectionHeader';
import { MissionStatusChip } from '../components/MissionStatusChip';
import { ProofLine } from '../components/ProofLine';
import { getRouteScreenContract } from '../contracts/route-screen-contracts';

const supportCases = [
  { id: 'SUP-001', title: 'Question about auto-save frequency', status: 'Resolved', priority: 'Normal', updated: '2d ago', tone: 'healthy' as const },
  { id: 'SUP-002', title: 'Data export format question', status: 'In progress', priority: 'Normal', updated: '1d ago', tone: 'primary' as const },
];

const faqItems = [
  { title: 'How does AI explain its decisions?', meta: 'Explainability', tone: 'primary' as const },
  { title: 'Can I revoke an automated action?', meta: 'Execute engine', tone: 'primary' as const },
  { title: 'How is my data protected?', meta: 'Security', tone: 'primary' as const },
  { title: 'What is the Govern Contract Set?', meta: 'Governance', tone: 'primary' as const },
  { title: 'How do I exercise my data rights?', meta: 'GDPR', tone: 'primary' as const },
];

const kpiSparklines = {
  openCases: [{ value: 3 }, { value: 2 }, { value: 2 }, { value: 1 }, { value: 1 }, { value: 1 }],
  avgResponse: [{ value: 3.5 }, { value: 3.2 }, { value: 3.0 }, { value: 2.8 }, { value: 2.5 }, { value: 2.2 }],
  satisfaction: [{ value: 92 }, { value: 93 }, { value: 94 }, { value: 95 }, { value: 96 }, { value: 97 }],
  resolved: [{ value: 20 }, { value: 22 }, { value: 24 }, { value: 26 }, { value: 28 }, { value: 30 }],
};

export const HelpSupport: React.FC = () => {
  const contract = getRouteScreenContract('help');

  const mainContent = (
    <>
      <section className="engine-section" data-slot="support_cases">
        <MissionSectionHeader
          title="Support cases"
          message="Track and manage your open support requests."
          right={<MissionStatusChip tone="primary" label={`${supportCases.filter((c) => c.status !== 'Resolved').length} open`} />}
        />
        <MissionDataRows
          items={supportCases.map((c) => ({
            id: c.id,
            title: c.title,
            value: c.status,
            detail: `${c.priority} · ${c.updated}`,
            tone: c.tone,
          }))}
        />
        <ProofLine
          claim="1 open case"
          evidence="Average response time 2.2h | 97% satisfaction"
          source="Support system"
          basis="rolling 30d"
          sourceType="system"
        />
      </section>

      <article className="engine-card">
        <MissionSectionHeader
          title="Case timeline"
          message="Recent support activity and resolution history."
        />
        <ActivityTimeline />
      </article>

      <article className="engine-card">
        <MissionSectionHeader
          title="Frequently asked"
          message="Common questions about AI governance, security, and data rights."
        />
        <MissionActionList items={faqItems} />
      </article>
    </>
  );

  const sideContent = (
    <>
      <article className="engine-card">
        <MissionSectionHeader
          title="Contact"
          message="Reach the support team through any available channel."
        />
        <MissionDataRows
          items={[
            { id: 'CT-1', title: 'In-app chat', value: 'Available', tone: 'healthy' },
            { id: 'CT-2', title: 'Email support', value: 'support@poseidon.ai', tone: 'primary' },
            { id: 'CT-3', title: 'Response SLA', value: '4h', tone: 'primary' },
          ]}
        />
        <button type="button" className="entry-btn entry-btn--primary entry-btn--block">
          Open new case
        </button>
      </article>
    </>
  );

  return (
    <PageShell
      slug="settings"
      contract={contract}
      fullWidth
      layout="engine"
      heroVariant="editorial"
      hero={{
        kicker: 'Help & Support',
        headline: 'Get answers, track cases.',
        subline: contract.oneScreenMessage,
        proofLine: {
          claim: '97% satisfaction',
          evidence: '30 cases resolved this month | Avg response 2.2h',
          source: 'Support system',
        },
        freshness: new Date(Date.now() - 30 * 60 * 1000),
        kpis: [
          { label: 'Open cases', value: '1', definition: 'Support cases awaiting resolution', accent: 'amber', sparklineData: kpiSparklines.openCases, sparklineColor: 'var(--state-warning)' },
          { label: 'Avg response', value: '2.2h', definition: 'Average first response time', accent: 'teal', sparklineData: kpiSparklines.avgResponse, sparklineColor: 'var(--state-healthy)' },
          { label: 'Satisfaction', value: '97%', definition: 'User satisfaction score', accent: 'cyan', sparklineData: kpiSparklines.satisfaction, sparklineColor: '#00F0FF' },
          { label: 'Resolved (30d)', value: '30', definition: 'Cases resolved this month', accent: 'blue', sparklineData: kpiSparklines.resolved, sparklineColor: 'var(--state-primary)' },
        ],
      }}
      primaryFeed={mainContent}
      decisionRail={sideContent}
    />
  );
};

export default HelpSupport;
