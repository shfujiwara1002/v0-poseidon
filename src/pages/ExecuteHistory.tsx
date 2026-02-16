import React from 'react';
import { DefinitionLine } from '../components/DefinitionLine';
import { MilestonesTimeline } from '../components/MilestonesTimeline';
import { PageShell } from '../components/PageShell';
import { GovernContractSet } from '../components/GovernContractSet';
import { MissionDataRows } from '../components/MissionDataRows';
import { MissionSectionHeader } from '../components/MissionSectionHeader';
import { MissionStatusChip } from '../components/MissionStatusChip';
import { ProofLine } from '../components/ProofLine';
import { TransactionTable } from '../components/TransactionTable';
import type { TransactionColumn } from '../components/TransactionTable';
import { AuditLinkChip } from '../components/AuditLinkChip';
import { getRouteScreenContract } from '../contracts/route-screen-contracts';

interface ExecutionRecord {
  id: string;
  title: string;
  status: string;
  time: string;
  savings: string;
  auditId: string;
}

const executionHistory: ExecutionRecord[] = [
  { id: 'EH-001', title: 'Auto-save: Emergency fund +$150', status: 'completed', time: '2h ago', savings: '$150', auditId: 'GV-EXE-001' },
  { id: 'EH-002', title: 'Bill negotiation: Internet provider', status: 'completed', time: '1d ago', savings: '$240/yr', auditId: 'GV-EXE-002' },
  { id: 'EH-003', title: 'Subscription cancel: Unused SaaS', status: 'completed', time: '3d ago', savings: '$14/mo', auditId: 'GV-EXE-003' },
  { id: 'EH-004', title: 'Transfer: Savings rebalance', status: 'revoked', time: '5d ago', savings: '—', auditId: 'GV-EXE-004' },
  { id: 'EH-005', title: 'Auto-save: Surplus detected', status: 'completed', time: '7d ago', savings: '$200', auditId: 'GV-EXE-005' },
  { id: 'EH-006', title: 'Round-up: Weekly deposit', status: 'completed', time: '8d ago', savings: '$12', auditId: 'GV-EXE-006' },
  { id: 'EH-007', title: 'Bill negotiation: Phone plan', status: 'completed', time: '10d ago', savings: '$15/mo', auditId: 'GV-EXE-007' },
  { id: 'EH-008', title: 'Auto-save: Paycheck surplus', status: 'completed', time: '12d ago', savings: '$300', auditId: 'GV-EXE-008' },
  { id: 'EH-009', title: 'Subscription cancel: Duplicate cloud storage', status: 'completed', time: '14d ago', savings: '$10/mo', auditId: 'GV-EXE-009' },
  { id: 'EH-010', title: 'Transfer: Goal rebalance', status: 'completed', time: '15d ago', savings: '$500', auditId: 'GV-EXE-010' },
  { id: 'EH-011', title: 'Bill negotiation: Insurance premium', status: 'completed', time: '18d ago', savings: '$45/mo', auditId: 'GV-EXE-011' },
  { id: 'EH-012', title: 'Auto-save: End-of-month buffer', status: 'completed', time: '21d ago', savings: '$175', auditId: 'GV-EXE-012' },
];

const statusBadge = (status: string) => {
  const color = status === 'completed' ? 'var(--state-healthy)' : 'var(--state-critical)';
  const bg = status === 'completed' ? 'rgba(20,184,166,0.1)' : 'rgba(239,68,68,0.1)';
  return <span className="rounded-full px-2 py-0.5 text-xs font-medium" style={{ color, background: bg }}>{status}</span>;
};

const historyColumns: TransactionColumn<ExecutionRecord>[] = [
  { key: 'title', label: 'Action', sortable: true, mobileLabel: 'Action' },
  { key: 'status', label: 'Status', sortable: true, render: (row) => statusBadge(row.status) },
  { key: 'savings', label: 'Savings', sortable: false, mobileLabel: 'Savings' },
  { key: 'time', label: 'When', sortable: false, mobileLabel: 'When' },
];

const executionMilestones = [
  { label: 'Auto-save: Emergency fund +$150', date: '2h ago', status: 'completed' as const },
  { label: 'Bill negotiation: Internet provider', date: '1d ago', status: 'completed' as const },
  { label: 'Subscription cancel: Unused SaaS', date: '3d ago', status: 'completed' as const },
  { label: 'Transfer: Savings rebalance', date: '5d ago — revoked', status: 'upcoming' as const },
  { label: 'Auto-save: Surplus detected', date: '7d ago', status: 'completed' as const },
];

const kpiSparklines = {
  total: [{ value: 18 }, { value: 20 }, { value: 22 }, { value: 24 }, { value: 26 }, { value: 28 }],
  success: [{ value: 96 }, { value: 97 }, { value: 97 }, { value: 98 }, { value: 99 }, { value: 99 }],
  revoked: [{ value: 2 }, { value: 2 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }],
  savings: [{ value: 120 }, { value: 135 }, { value: 150 }, { value: 168 }, { value: 185 }, { value: 198 }],
};

export const ExecuteHistory: React.FC = () => {
  const contract = getRouteScreenContract('execute-history');

  const mainContent = (
    <>
      <section className="engine-section">
        <MissionSectionHeader
          title="Execution history"
          message="Complete record of all executed actions with audit links."
          contextCue="Select any entry to view its audit trail"
          right={<MissionStatusChip tone="healthy" label={`${executionHistory.length} shown`} />}
        />
        <TransactionTable columns={historyColumns} data={executionHistory} pageSize={8} />
        <ProofLine
          claim="99% success rate"
          evidence="28 executions | 1 revocation | All audit-linked"
          source="Execute engine"
          basis="30 days rolling"
          sourceType="system"
        />
        <DefinitionLine
          metric="Success rate"
          formula="completed / (completed + failed)"
          unit="percentage"
          period="30 days rolling"
          threshold="> 95%"
        />
      </section>

      <article className="engine-card">
        <MissionSectionHeader
          title="Audit links"
          message="Direct links to audit records for each execution."
        />
        <div className="engine-item-list">
          {executionHistory.slice(0, 3).map((item) => (
            <AuditLinkChip key={item.id} auditId={item.auditId} to="/govern/audit-detail" />
          ))}
        </div>
      </article>

      <article className="engine-card">
        <MissionSectionHeader
          title="Revocation controls"
          message="Options for reversing executed actions."
        />
        <MissionDataRows
          items={[
            { id: 'RC-1', title: 'Auto-revert window', value: '24 hours', tone: 'primary' },
            { id: 'RC-2', title: 'Manual revoke', value: 'Available', tone: 'healthy' },
            { id: 'RC-3', title: 'Escalation path', value: 'Govern → Human review', tone: 'warning' },
          ]}
        />
        <DefinitionLine
          metric="Revert window"
          formula="max(action_type_window, 24h)"
          unit="hours"
          period="per-action"
        />
      </article>

      <GovernContractSet
        auditId="GV-2026-0212-HIST"
        modelVersion="v1.5"
        explanationVersion="xai-1.0"
      />
    </>
  );

  const sideContent = (
    <>
      <article className="engine-card">
        <MissionSectionHeader
          title="Period summary"
          message="Execution metrics for the current billing period."
        />
        <MissionDataRows
          items={[
            { id: 'PS-1', title: 'This month', value: '12 actions', tone: 'primary' },
            { id: 'PS-2', title: 'Savings realized', value: '$198', tone: 'healthy' },
            { id: 'PS-3', title: 'Avg execution time', value: '42ms', tone: 'primary' },
          ]}
        />
        <ProofLine
          claim="$198 realized savings"
          evidence="12 successful executions this period"
          source="Execute engine"
          basis="current billing period"
          sourceType="system"
        />
      </article>

      <article className="engine-card">
        <MissionSectionHeader
          title="Recent milestones"
          message="Latest execution outcomes at a glance."
        />
        <MilestonesTimeline milestones={executionMilestones} accentColor="var(--engine-execute)" />
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
        kicker: 'Execution History',
        headline: 'Full action trace with revocation.',
        subline: contract.oneScreenMessage,
        proofLine: {
          claim: '28 executions tracked',
          evidence: 'Every action linked to audit record | Revocation available',
          source: 'Execute engine',
        },
        freshness: new Date(Date.now() - 2 * 60 * 60 * 1000),
        kpis: [
          { label: 'Total actions', value: '28', definition: 'Executed actions in last 30 days', accent: 'amber', sparklineData: kpiSparklines.total, sparklineColor: 'var(--state-warning)' },
          { label: 'Success rate', value: '99%', definition: 'Actions completed without issues', accent: 'teal', sparklineData: kpiSparklines.success, sparklineColor: 'var(--state-healthy)' },
          { label: 'Revocations', value: '1', definition: 'Actions rolled back by user', accent: 'cyan', sparklineData: kpiSparklines.revoked, sparklineColor: '#00F0FF' },
          { label: 'Savings', value: '$198', definition: 'Total realized savings this month', accent: 'blue', sparklineData: kpiSparklines.savings, sparklineColor: 'var(--state-primary)' },
        ],
      }}
      primaryFeed={mainContent}
      decisionRail={sideContent}
    />
  );
};

export default ExecuteHistory;
