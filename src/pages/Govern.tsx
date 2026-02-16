import React, { useState } from 'react';
import { Lock, Scale, Search, Users } from 'lucide-react';
import { Link } from '../router';
import { AuditLinkChip } from '../components/AuditLinkChip';
import { AuditLogCard } from '../components/AuditLogCard';
import { CategoryScoreBar } from '../components/CategoryScoreBar';
import type { CategoryScore } from '../components/CategoryScoreBar';
import { PageShell } from '../components/PageShell';
import { GovernVerifiedBadge } from '../components/GovernVerifiedBadge';
import { HumanReviewCTA } from '../components/HumanReviewCTA';
import { MissionActionList } from '../components/MissionActionList';
import { MissionDataRows } from '../components/MissionDataRows';
import { MissionSectionHeader } from '../components/MissionSectionHeader';
import { MissionStatusChip } from '../components/MissionStatusChip';
import { PrivacyControlCard } from '../components/PrivacyControlCard';
import { ProofLine } from '../components/ProofLine';
import { ScoreRing } from '../components/ScoreRing';
import {
  mockAuditLogs,
  mockDataExports,
  mockGovernStats,
  mockPrivacyControls,
} from '../services/mockGovern';
import type { PrivacyControl } from '../services/mockGovern';
import { getRouteScreenContract } from '../contracts/route-screen-contracts';
import { useUI } from '../contexts/UIContext';

const kpiSparklines = {
  coverage: [{ value: 95 }, { value: 96 }, { value: 97 }, { value: 97 }, { value: 98 }, { value: 98 }],
  exceptions: [{ value: 3 }, { value: 3 }, { value: 2 }, { value: 2 }, { value: 1 }, { value: 1 }],
  latency: [{ value: 55 }, { value: 52 }, { value: 50 }, { value: 49 }, { value: 48 }, { value: 47 }],
  policy: [{ value: 100 }, { value: 100 }, { value: 100 }, { value: 100 }, { value: 100 }, { value: 100 }],
};

const complianceItems = [
  { id: 'CMP-1', regulation: 'GDPR', status: 'Compliant', tone: 'healthy' as const },
  { id: 'CMP-2', regulation: 'CCPA', status: 'Compliant', tone: 'healthy' as const },
  { id: 'CMP-3', regulation: 'ECOA', status: 'Compliant', tone: 'healthy' as const },
  { id: 'CMP-4', regulation: 'SOX', status: 'In review', tone: 'warning' as const },
];

const complianceCategories: CategoryScore[] = [
  { name: 'Data Privacy', score: 98, icon: Lock, color: 'var(--state-healthy)' },
  { name: 'Fair Lending', score: 94, icon: Scale, color: 'var(--state-healthy)' },
  { name: 'AML/KYC', score: 92, icon: Search, color: 'var(--state-healthy)' },
  { name: 'Consumer Protection', score: 100, icon: Users, color: 'var(--state-healthy)' },
];

export const Govern: React.FC = () => {
  const contract = getRouteScreenContract('govern');
  const { addNotification } = useUI();
  const [controls, setControls] = useState<PrivacyControl[]>(mockPrivacyControls);

  const handleToggleControl = (category: string) => {
    let updatedState = false;
    setControls((prev) =>
      prev.map((item) => {
        if (item.category !== category) return item;
        updatedState = !item.enabled;
        return { ...item, enabled: updatedState };
      }),
    );
    addNotification({
      type: 'success',
      message: `${category} control ${updatedState ? 'enabled' : 'disabled'}.`,
    });
  };

  const handleFeedback = () => {
    // Prototype: no-op callback
  };

  const mainContent = (
    <>
      {/* Compliance score ring — visual summary */}
      <article className="engine-card">
        <ScoreRing
          score={mockGovernStats.complianceRate}
          label="Compliance Score"
          subtitle="/ 100"
          statusText={mockGovernStats.complianceRate >= 95 ? 'Excellent' : 'Review needed'}
          color="var(--accent-blue)"
          gradientEnd="#60A5FA"
          size="lg"
        />
        <p className="mt-2 text-center text-xs" style={{ color: 'var(--muted-2)' }}>
          Last audit: 2 days ago
        </p>
      </article>

      {/* Compliance category breakdown */}
      <article className="engine-card">
        <MissionSectionHeader
          title="Compliance categories"
          message="Score breakdown by regulatory area."
        />
        <CategoryScoreBar categories={complianceCategories} iconAccent="var(--accent-blue)" />
      </article>

      <section className="engine-section">
        <MissionSectionHeader
          title="Audit log"
          right={<MissionStatusChip tone="primary" label={`${mockGovernStats.totalDecisions.toLocaleString()} decisions`} />}
        />
        <div className="engine-item-list">
          {mockAuditLogs.map((log) => (
            <div key={log.id}>
              <AuditLogCard log={log} onProvideFeedback={handleFeedback} />
              <ProofLine
                claim={`Accuracy ${log.decision.model.accuracy}%`}
                evidence={`GDPR: ${log.complianceFlags.gdprCompliant ? '✓' : '✗'} | ECOA: ${log.complianceFlags.ecoaCompliant ? '✓' : '✗'}`}
                source="Govern engine"
              />
            </div>
          ))}
        </div>

        <div className="mission-dual-actions">
          <GovernVerifiedBadge auditId="GV-2026-0211-GOV1" modelVersion="v3.2" />
          <AuditLinkChip auditId="audit-full-2026-02" />
        </div>
      </section>

      <article className="engine-card">
        <MissionSectionHeader
          title="Compliance status"
          right={<MissionStatusChip tone="healthy" label={`${mockGovernStats.complianceRate}%`} />}
        />
        <MissionDataRows
          items={complianceItems.map((item) => ({
            id: item.id,
            title: item.regulation,
            value: item.status,
            detail: 'Govern policy scan',
            tone: item.tone,
          }))}
        />
        <ProofLine
          claim="Compliance scan"
          evidence={`${mockGovernStats.totalDecisions.toLocaleString()} decisions reviewed | ${mockGovernStats.userFeedbackCount} feedbacks`}
          source="Govern engine"
        />
      </article>

      <article className="engine-card">
        <MissionSectionHeader title="Human oversight queue" />
        <HumanReviewCTA />
      </article>
    </>
  );

  const sideContent = (
    <>
      <section className="engine-section">
        <MissionSectionHeader
          title="Privacy controls"
          right={<MissionStatusChip tone="primary" label={`${controls.filter((item) => item.enabled).length}/${controls.length} active`} />}
        />
        <div className="engine-item-list">
          {controls.map((control) => (
            <PrivacyControlCard key={control.category} control={control} onToggle={handleToggleControl} />
          ))}
        </div>
      </section>

      <article className="engine-card">
        <MissionSectionHeader title="Data rights (GDPR)" />
        <MissionDataRows
          items={[
            { id: 'DR-1', title: 'Export my data', value: 'Ready', detail: 'JSON/CSV available', tone: 'primary' },
            { id: 'DR-2', title: 'Restrict processing', value: 'Manual', detail: 'Consent workflow', tone: 'warning' },
            { id: 'DR-3', title: 'Delete my data', value: 'Protected', detail: 'Human approval required', tone: 'critical' },
          ]}
        />
        <MissionSectionHeader title="Recent exports" />
        <MissionDataRows
          items={mockDataExports.map((item) => ({
            id: item.id,
            title: `${item.format.toUpperCase()} export`,
            value: item.status,
            detail: item.requestedAt.toLocaleDateString('en-US'),
            tone: item.status === 'completed' ? 'healthy' : 'warning',
          }))}
        />
      </article>

      <article className="engine-card">
        <MissionSectionHeader title="Next best actions" />
        <MissionActionList
          items={[
            { title: 'Review SOX compliance gap', meta: 'Priority', tone: 'critical' },
            { title: 'Audit latest model update', meta: 'Scheduled', tone: 'primary' },
            { title: 'Update consent scope', meta: 'Monthly task', tone: 'warning' },
          ]}
        />
        <div className="mission-dual-actions">
          <Link className="entry-btn entry-btn--ghost" to="/dashboard">Return to dashboard</Link>
        </div>
      </article>
    </>
  );

  return (
    <PageShell
      slug="govern"
      contract={contract}
      layout="engine"
      heroVariant="analytical"
      hero={{
        kicker: 'Govern Engine',
        engineBadge: 'Govern',
        headline: 'Full audit trail. Every AI decision explained.',
        subline: 'Audit logs, compliance status, and privacy controls — all verifiable.',
        valueStatement: `${mockGovernStats.totalDecisions.toLocaleString()} decisions audited. ${mockGovernStats.complianceRate}% compliant. ${controls.filter((c) => c.enabled).length}/${controls.length} privacy controls active.`,
        proofLine: {
          claim: 'Confidence 0.97',
          evidence: `${mockGovernStats.totalDecisions.toLocaleString()} decisions audited | ${mockGovernStats.complianceRate}% compliance`,
          source: 'Govern engine',
        },
        heroAction: {
          label: 'Recommended:',
          text: 'Review open policy exceptions before the next compliance window.',
          cta: { label: 'Tune settings →', to: '/settings' },
        },
        freshness: new Date(Date.now() - 8 * 60 * 1000),
        kpis: [
          { label: 'Audit coverage', value: '98%', definition: 'Percentage of AI decisions with full audit trail', accent: 'blue', sparklineData: kpiSparklines.coverage, sparklineColor: 'var(--state-primary)' },
          { label: 'Open exceptions', value: '1', definition: 'Unresolved policy exceptions requiring review', accent: 'amber', sparklineData: kpiSparklines.exceptions, sparklineColor: 'var(--state-warning)' },
          { label: 'Trace latency', value: '47ms', definition: 'Time to generate explanation for any decision', accent: 'cyan', sparklineData: kpiSparklines.latency, sparklineColor: '#00F0FF' },
          { label: 'Policy match', value: '100%', definition: 'Decisions aligned with current policy set', accent: 'teal', sparklineData: kpiSparklines.policy, sparklineColor: 'var(--state-healthy)' },
        ],
      }}
      primaryFeed={mainContent}
      decisionRail={sideContent}
    />
  );
};

export default Govern;
