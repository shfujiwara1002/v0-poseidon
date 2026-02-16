import React from 'react';
import { AuditLedgerTable } from '../components/AuditLedgerTable';
import { DefinitionLine } from '../components/DefinitionLine';
import { PageShell } from '../components/PageShell';
import { GovernContractSet } from '../components/GovernContractSet';
import { MissionDataRows } from '../components/MissionDataRows';
import { MissionSectionHeader } from '../components/MissionSectionHeader';
import { MissionStatusChip } from '../components/MissionStatusChip';
import { ProofLine } from '../components/ProofLine';
import { mockAuditLogs } from '../services/mockGovern';
import { getRouteScreenContract } from '../contracts/route-screen-contracts';

const kpiSparklines = {
  total: [{ value: 1100 }, { value: 1150 }, { value: 1180 }, { value: 1210 }, { value: 1230 }, { value: 1247 }],
  compliant: [{ value: 99.5 }, { value: 99.6 }, { value: 99.7 }, { value: 99.8 }, { value: 99.9 }, { value: 100 }],
  feedback: [{ value: 280 }, { value: 300 }, { value: 315 }, { value: 328 }, { value: 335 }, { value: 342 }],
  engines: [{ value: 4 }, { value: 4 }, { value: 4 }, { value: 4 }, { value: 4 }, { value: 4 }],
};

export const GovernAuditLedger: React.FC = () => {
  const contract = getRouteScreenContract('govern-audit');

  const handleFeedback = () => {
    // Prototype: no-op
  };

  const mainContent = (
    <>
      <section className="engine-section" data-slot="audit_table">
        <MissionSectionHeader
          title="Audit ledger"
          message="Every AI decision, fully traceable with compliance flags."
          contextCue="Click any row to view full decision reconstruction"
          right={<MissionStatusChip tone="primary" label="1,247 entries" />}
        />
        <AuditLedgerTable
          entries={mockAuditLogs}
          onFeedback={handleFeedback}
        />
        <ProofLine
          claim="Complete audit trail"
          evidence="1,247 decisions audited | 100% compliance rate"
          source="Govern engine"
          basis="all time"
          sourceType="system"
        />
        <DefinitionLine
          metric="Audit coverage"
          formula="audited_decisions / total_ai_decisions"
          unit="percentage"
          period="all time"
          threshold="100%"
        />
      </section>

      <article className="engine-card">
        <MissionSectionHeader
          title="Compliance summary"
          message="Regulatory framework adherence across all entries."
        />
        <MissionDataRows
          items={[
            { id: 'CS-1', title: 'GDPR', value: 'Compliant', tone: 'healthy' },
            { id: 'CS-2', title: 'CCPA', value: 'Compliant', tone: 'healthy' },
            { id: 'CS-3', title: 'ECOA', value: 'Compliant', tone: 'healthy' },
          ]}
        />
        <DefinitionLine
          metric="Compliance rate"
          formula="compliant_decisions / total_decisions"
          unit="percentage"
          period="30 days rolling"
          threshold="100%"
        />
      </article>

      <GovernContractSet
        auditId="GV-2026-0212-LDGR"
        modelVersion="v3.2"
        explanationVersion="xai-1.1"
      />
    </>
  );

  const sideContent = (
    <article className="engine-card">
      <MissionSectionHeader
        title="Filter"
        message="Refine the audit ledger view."
      />
      <MissionDataRows
        items={[
          { id: 'F-1', title: 'Engine', value: 'All', tone: 'primary' },
          { id: 'F-2', title: 'Period', value: 'Last 30d', tone: 'primary' },
          { id: 'F-3', title: 'Status', value: 'All', tone: 'primary' },
        ]}
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
        kicker: 'Audit Ledger',
        headline: 'Every AI decision, fully traceable.',
        subline: contract.oneScreenMessage,
        proofLine: {
          claim: '1,247 decisions audited',
          evidence: '100% compliance | All engines covered',
          source: 'Govern engine',
        },
        freshness: new Date(Date.now() - 15 * 60 * 1000),
        kpis: [
          { label: 'Total entries', value: '1,247', definition: 'Audit records in ledger', accent: 'blue', sparklineData: kpiSparklines.total, sparklineColor: 'var(--state-primary)' },
          { label: 'Compliance', value: '100%', definition: 'Entries meeting all regulatory requirements', accent: 'teal', sparklineData: kpiSparklines.compliant, sparklineColor: 'var(--state-healthy)' },
          { label: 'User feedback', value: '342', definition: 'Entries with user correctness feedback', accent: 'cyan', sparklineData: kpiSparklines.feedback, sparklineColor: '#00F0FF' },
          { label: 'Engines', value: '4/4', definition: 'All engines contributing to audit', accent: 'amber', sparklineData: kpiSparklines.engines, sparklineColor: 'var(--state-warning)' },
        ],
      }}
      primaryFeed={mainContent}
      decisionRail={sideContent}
    />
  );
};

export default GovernAuditLedger;
