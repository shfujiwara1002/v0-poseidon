import React from 'react';
import { Link } from '../router';
import { PageShell } from '../components/PageShell';
import { DefinitionLine } from '../components/DefinitionLine';
import { MissionActionList } from '../components/MissionActionList';
import { MissionDataRows } from '../components/MissionDataRows';
import { MissionMetadataStrip } from '../components/MissionMetadataStrip';
import { MissionSectionHeader } from '../components/MissionSectionHeader';
import { ProofLine } from '../components/ProofLine';
import { getRouteScreenContract } from '../contracts/route-screen-contracts';

const complianceBadges = [
  { id: 'GDPR', regulation: 'GDPR', status: 'Compliant', tone: 'healthy' as const },
  { id: 'CCPA', regulation: 'CCPA', status: 'Compliant', tone: 'healthy' as const },
  { id: 'ECOA', regulation: 'ECOA', status: 'Compliant', tone: 'healthy' as const },
  { id: 'SOC2', regulation: 'SOC 2 Type II', status: 'Certified', tone: 'healthy' as const },
  { id: 'ISO27001', regulation: 'ISO 27001', status: 'Certified', tone: 'healthy' as const },
];

const securityArch = [
  { title: 'End-to-end encryption', detail: 'AES-256 at rest, TLS 1.3 in transit' },
  { title: 'Zero-knowledge proofs', detail: 'Sensitive data never leaves your control' },
  { title: 'Fail-closed AI governance', detail: 'AI output hidden when audit trail unavailable' },
  { title: 'Human review SLA', detail: '4-hour guaranteed response on escalations' },
];

const kpiSparklines = {
  uptime: [{ value: 99.95 }, { value: 99.97 }, { value: 99.98 }, { value: 99.99 }, { value: 99.99 }, { value: 99.99 }],
  audits: [{ value: 1100 }, { value: 1150 }, { value: 1200 }, { value: 1220 }, { value: 1240 }, { value: 1247 }],
  coverage: [{ value: 95 }, { value: 96 }, { value: 97 }, { value: 97 }, { value: 98 }, { value: 98 }],
  response: [{ value: 5 }, { value: 4.5 }, { value: 4.2 }, { value: 4 }, { value: 3.8 }, { value: 3.5 }],
};

export const TrustSecurity: React.FC = () => {
  const contract = getRouteScreenContract('trust');

  const mainContent = (
    <>
      <article className="engine-card" data-slot="compliance">
        <MissionSectionHeader
          title="Compliance certifications"
          message="Independently verified regulatory framework adherence."
          contextCue="All certifications are renewed annually"
        />
        <MissionDataRows
          items={complianceBadges.map((badge) => ({
            id: badge.id,
            title: badge.regulation,
            value: badge.status,
            detail: 'Independently verified',
            tone: badge.tone,
          }))}
        />
        <ProofLine
          claim="100% compliance"
          evidence="All 5 regulatory frameworks independently verified"
          source="Annual audit cycle"
          basis="annual"
          sourceType="audit"
        />
        <DefinitionLine
          metric="Compliance coverage"
          formula="compliant_frameworks / applicable_frameworks"
          unit="ratio"
          period="annual review"
          threshold="100%"
        />
      </article>

      <article className="engine-card" data-slot="security_arch">
        <MissionSectionHeader
          title="Security architecture"
          message="Defense-in-depth security across all data and decision layers."
        />
        <div className="entry-surface-grid">
          {securityArch.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
        <ProofLine
          claim="Zero breaches"
          evidence="No security incidents since launch"
          source="SOC 2 report"
          basis="all time"
          sourceType="audit"
        />
      </article>
    </>
  );

  const sideContent = (
    <>
      <article className="engine-card">
        <MissionSectionHeader
          title="Trust guarantees"
          message="Core commitments enforced across all AI operations."
        />
        <MissionActionList
          items={[
            { title: 'Every AI decision is auditable', meta: '1-click trace', tone: 'healthy' },
            { title: 'Human override always reachable', meta: '4h SLA', tone: 'primary' },
            { title: 'Data rights exercisable anytime', meta: 'GDPR Article 17', tone: 'warning' },
          ]}
        />
      </article>

      <article className="engine-card">
        <MissionSectionHeader
          title="Transparency"
          message="Full visibility into AI model cards and policy boundaries."
        />
        <MissionMetadataStrip
          compact
          items={['Model cards published', 'Explanation format registry', 'Policy boundaries visible']}
        />
        <div className="dashboard-side-actions">
          <Link className="entry-btn entry-btn--primary" to="/signup">Get started</Link>
          <Link className="entry-btn entry-btn--ghost" to="/pricing">See pricing</Link>
        </div>
      </article>
    </>
  );

  return (
    <PageShell
      slug="trust"
      contract={contract}
      layout="dashboard"
      heroVariant="minimal"
      hero={{
        kicker: 'Trust & Security',
        headline: 'Built on transparency, verified by audit.',
        subline: contract.oneScreenMessage,
        proofLine: {
          claim: 'Zero breaches',
          evidence: 'SOC 2 Type II certified | ISO 27001 | GDPR compliant',
          source: 'Independent audit',
        },
        freshness: new Date(Date.now() - 24 * 60 * 60 * 1000),
        kpis: [
          { label: 'Uptime', value: '99.99%', definition: 'Service availability over last 12 months', accent: 'teal', sparklineData: kpiSparklines.uptime, sparklineColor: 'var(--state-healthy)' },
          { label: 'Decisions audited', value: '1,247', definition: 'Total AI decisions with full audit trail', accent: 'blue', sparklineData: kpiSparklines.audits, sparklineColor: 'var(--state-primary)' },
          { label: 'Audit coverage', value: '98%', definition: 'Percentage of AI actions with traceable evidence', accent: 'cyan', sparklineData: kpiSparklines.coverage, sparklineColor: '#00F0FF' },
          { label: 'Response SLA', value: '3.5h', definition: 'Average human review response time', accent: 'amber', sparklineData: kpiSparklines.response, sparklineColor: 'var(--state-warning)' },
        ],
      }}
      primaryFeed={mainContent}
      decisionRail={sideContent}
    />
  );
};

export default TrustSecurity;
