import React from 'react';
import { DefinitionLine } from '../components/DefinitionLine';
import { PageShell } from '../components/PageShell';
import { GovernContractSet } from '../components/GovernContractSet';
import { HumanReviewCTA } from '../components/HumanReviewCTA';
import { MissionDataRows } from '../components/MissionDataRows';
import { MissionSectionHeader } from '../components/MissionSectionHeader';
import { MissionStatusChip } from '../components/MissionStatusChip';
import { OversightQueueTable } from '../components/OversightQueueTable';
import type { OversightCase } from '../components/OversightQueueTable';
import { ProofLine } from '../components/ProofLine';
import { getRouteScreenContract } from '../contracts/route-screen-contracts';

const oversightCases: OversightCase[] = [
  {
    id: 'OV-001',
    title: 'Dispute: Transaction block — Amazon UK',
    type: 'dispute',
    status: 'in_review',
    assignee: 'Risk team',
    slaDeadline: new Date(Date.now() + 2 * 60 * 60 * 1000),
    engine: 'protect',
    priority: 'high',
  },
  {
    id: 'OV-002',
    title: 'Escalation: High-value auto-save',
    type: 'escalation',
    status: 'pending',
    assignee: '',
    slaDeadline: new Date(Date.now() + 3.5 * 60 * 60 * 1000),
    engine: 'execute',
    priority: 'medium',
  },
  {
    id: 'OV-003',
    title: 'Policy exception: SOX compliance',
    type: 'policy_exception',
    status: 'in_review',
    assignee: 'Compliance lead',
    slaDeadline: new Date(Date.now() + 24 * 60 * 60 * 1000),
    engine: 'govern',
    priority: 'medium',
  },
];

const recentResolutions = [
  { id: 'RES-001', title: 'Dispute resolved — False positive cleared', value: 'Overturned', detail: '2d ago', tone: 'healthy' as const },
  { id: 'RES-002', title: 'Escalation resolved — Auto-save approved', value: 'Upheld', detail: '4d ago', tone: 'primary' as const },
  { id: 'RES-003', title: 'Policy review — ECOA gap addressed', value: 'Resolved', detail: '1w ago', tone: 'healthy' as const },
];

const kpiSparklines = {
  open: [{ value: 5 }, { value: 4 }, { value: 4 }, { value: 3 }, { value: 3 }, { value: 3 }],
  avgSla: [{ value: 3.8 }, { value: 3.5 }, { value: 3.2 }, { value: 3.0 }, { value: 2.8 }, { value: 2.6 }],
  resolved: [{ value: 15 }, { value: 17 }, { value: 19 }, { value: 21 }, { value: 23 }, { value: 25 }],
  overturned: [{ value: 10 }, { value: 9 }, { value: 8 }, { value: 8 }, { value: 7 }, { value: 7 }],
};

export const GovernOversight: React.FC = () => {
  const contract = getRouteScreenContract('govern-oversight');

  const mainContent = (
    <>
      <section className="engine-section" data-slot="oversight_queue">
        <MissionSectionHeader
          title="Oversight queue"
          message="Active escalations requiring human review before resolution."
          contextCue="Sort by priority or SLA to triage cases"
          right={<MissionStatusChip tone="warning" label={`${oversightCases.length} open`} />}
        />
        <OversightQueueTable
          cases={oversightCases}
          onAssign={() => {/* prototype no-op */}}
        />
        <ProofLine
          claim={`${oversightCases.length} open cases`}
          evidence="All within SLA window | Human reviewer assigned"
          source="Oversight system"
          basis="real-time"
          sourceType="system"
        />
        <DefinitionLine
          metric="SLA compliance"
          formula="cases_within_sla / total_open_cases"
          unit="percentage"
          period="current"
          threshold="100%"
        />
      </section>

      <section className="engine-section">
        <MissionSectionHeader
          title="Recent resolutions"
          message="Completed oversight cases from the past 30 days."
        />
        <MissionDataRows items={recentResolutions} />
        <ProofLine
          claim="25 resolved in 30 days"
          evidence="7% overturn rate | Avg resolution 2.6h"
          source="Oversight system"
          basis="rolling 30d"
          sourceType="system"
        />
      </section>

      <article className="engine-card">
        <MissionSectionHeader
          title="Request review"
          message="Submit a new case for human oversight review."
        />
        <HumanReviewCTA sla="SLA: 4h" caseType="review" />
      </article>

      <GovernContractSet
        auditId="GV-2026-0212-OVR"
        modelVersion="v3.2"
        explanationVersion="xai-1.1"
      />
    </>
  );

  const sideContent = (
    <article className="engine-card">
      <MissionSectionHeader
        title="SLA performance"
        message="Oversight resolution metrics for the last 30 days."
      />
      <MissionDataRows
        items={[
          { id: 'SLA-1', title: 'Avg resolution', value: '2.6h', tone: 'healthy' },
          { id: 'SLA-2', title: 'SLA breaches (30d)', value: '0', tone: 'healthy' },
          { id: 'SLA-3', title: 'Overturn rate', value: '7%', tone: 'primary' },
        ]}
      />
      <DefinitionLine
        metric="Resolution time"
        formula="sum(resolution_time) / resolved_count"
        unit="hours"
        period="30 days rolling"
        threshold="< 4h"
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
        kicker: 'Human Oversight',
        headline: 'Every escalation tracked to resolution.',
        subline: contract.oneScreenMessage,
        proofLine: {
          claim: '3 open cases',
          evidence: 'All within SLA | 0 breaches in 30 days',
          source: 'Oversight system',
        },
        freshness: new Date(Date.now() - 30 * 60 * 1000),
        kpis: [
          { label: 'Open cases', value: '3', definition: 'Escalations awaiting resolution', accent: 'amber', sparklineData: kpiSparklines.open, sparklineColor: 'var(--state-warning)' },
          { label: 'Avg SLA', value: '2.6h', definition: 'Average time to resolution', accent: 'teal', sparklineData: kpiSparklines.avgSla, sparklineColor: 'var(--state-healthy)' },
          { label: 'Resolved (30d)', value: '25', definition: 'Cases resolved in last 30 days', accent: 'blue', sparklineData: kpiSparklines.resolved, sparklineColor: 'var(--state-primary)' },
          { label: 'Overturn rate', value: '7%', definition: 'AI decisions overturned by human review', accent: 'cyan', sparklineData: kpiSparklines.overturned, sparklineColor: '#00F0FF' },
        ],
      }}
      primaryFeed={mainContent}
      decisionRail={sideContent}
    />
  );
};

export default GovernOversight;
