import React from 'react';
import { Link } from '../router';
import { ActionOutcomePreview } from '../components/ActionOutcomePreview';
import { DefinitionLine } from '../components/DefinitionLine';
import { PageShell } from '../components/PageShell';
import { ExplainableInsightPanel } from '../components/ExplainabilityPanel';
import { FactorsDropdown } from '../components/FactorsDropdown';
import { GovernContractSet } from '../components/GovernContractSet';
import { MissionActionList } from '../components/MissionActionList';
import { MissionDataRows } from '../components/MissionDataRows';
import { MissionSectionHeader } from '../components/MissionSectionHeader';
import { MissionStatusChip } from '../components/MissionStatusChip';
import { ProofLine } from '../components/ProofLine';
import { getRouteScreenContract } from '../contracts/route-screen-contracts';

const alertDetail = {
  id: 'ALT-2026-0212-001',
  type: 'fraud',
  severity: 'critical',
  title: 'Unusual transaction pattern — Amazon UK',
  summary: 'Transaction of $1,250 at 03:00 AM from London, UK. Amount is 3x typical, location is 5,000km from usual.',
  detectedAt: '12 minutes ago',
  confidence: 0.97,
  topFactors: [
    { label: 'Amount deviation', contribution: 0.95, note: '3x typical spend at this merchant' },
    { label: 'Location anomaly', contribution: 0.92, note: '5,000km from usual location' },
    { label: 'Time-of-day risk', contribution: 0.88, note: '03:00 AM local time' },
  ],
  allFactors: [
    { label: 'Amount deviation', contribution: 0.95, note: '3x typical spend at this merchant' },
    { label: 'Location anomaly', contribution: 0.92, note: '5,000km from usual location' },
    { label: 'Time-of-day risk', contribution: 0.88, note: '03:00 AM local time' },
    { label: 'Merchant history', contribution: 0.72, note: 'First purchase at this merchant' },
    { label: 'Device fingerprint', contribution: 0.68, note: 'New device detected' },
    { label: 'Velocity check', contribution: 0.55, note: '2 transactions in 10 min window' },
  ],
  alternatives: ['Probability of legitimate: 3%', 'False positive likelihood: 2.5%'],
};

const kpiSparklines = {
  confidence: [{ value: 0.93 }, { value: 0.94 }, { value: 0.95 }, { value: 0.96 }, { value: 0.97 }, { value: 0.97 }],
  factors: [{ value: 3 }, { value: 4 }, { value: 4 }, { value: 5 }, { value: 5 }, { value: 6 }],
  similar: [{ value: 12 }, { value: 14 }, { value: 15 }, { value: 16 }, { value: 18 }, { value: 18 }],
  resolved: [{ value: 92 }, { value: 93 }, { value: 94 }, { value: 95 }, { value: 96 }, { value: 97 }],
};

export const ProtectAlertDetail: React.FC = () => {
  const contract = getRouteScreenContract('protect-alert-detail');

  // Critical rule: Signal → Evidence → Decision order enforced.
  // Decision controls NEVER above ExplainableInsightPanel.
  const mainContent = (
    <>
      {/* 1. Signal */}
      <section className="engine-section">
        <MissionSectionHeader
          title="Signal"
          message="Initial threat detection signal with severity classification."
          contextCue="Review evidence below before deciding"
          right={<MissionStatusChip tone="critical" label={alertDetail.severity} />}
        />
        <MissionDataRows
          items={[
            { id: 'SIG-TYPE', title: 'Alert type', value: alertDetail.type, tone: 'critical' },
            { id: 'SIG-TIME', title: 'Detected', value: alertDetail.detectedAt, tone: 'primary' },
            { id: 'SIG-CONF', title: 'Confidence', value: `${(alertDetail.confidence * 100).toFixed(0)}%`, tone: 'warning' },
          ]}
        />
        <ProofLine
          claim={`Confidence ${alertDetail.confidence}`}
          evidence={alertDetail.summary}
          source="FraudDetectionV3.2"
          basis="per-event"
          sourceType="model"
        />
        <DefinitionLine
          metric="Fraud confidence"
          formula="SHAP(features) x ensemble_weight"
          unit="score (0-1)"
          period="per-event"
          threshold="> 0.80"
        />
      </section>

      {/* 2. Evidence (ExplainableInsightPanel) */}
      <ExplainableInsightPanel
        title="Evidence analysis"
        summary={alertDetail.summary}
        topFactors={alertDetail.topFactors}
        allFactors={alertDetail.allFactors}
        confidence={alertDetail.confidence}
        recency={alertDetail.detectedAt}
        governMeta={{
          auditId: alertDetail.id,
          modelVersion: 'v3.2',
          explanationVersion: 'xai-1.1',
          timestamp: new Date().toISOString(),
        }}
      />

      {/* 3. Decision controls (BELOW evidence — rule enforced) */}
      <article className="engine-card" data-slot="action_preview">
        <MissionSectionHeader
          title="Recommended actions"
          message="Choose an action based on the evidence above."
        />
        <MissionActionList
          items={[
            { title: 'Block transaction immediately', meta: 'High confidence match', tone: 'critical' },
            { title: 'Freeze card for 24h review', meta: 'Containment option', tone: 'warning' },
            { title: 'Escalate to human review', meta: 'SLA 4h', tone: 'primary' },
          ]}
        />
        <ActionOutcomePreview
          outcome="Transaction will be blocked and merchant notified. Cardholder receives fraud alert."
          reversibleWindow="24h"
          sideEffects={[
            'Pending charges from this merchant will be held',
            'Automatic dispute case opened if confirmed',
          ]}
          impact="-$1,250 blocked"
        />
        <div className="mission-dual-actions">
          <button type="button" className="entry-btn entry-btn--primary">Block & investigate</button>
          <Link className="entry-btn entry-btn--ghost" to="/protect/dispute">Open dispute</Link>
        </div>
      </article>

      <GovernContractSet
        auditId={alertDetail.id}
        modelVersion="v3.2"
        explanationVersion="xai-1.1"
      />
    </>
  );

  const sideContent = (
    <>
      <article className="engine-card" data-slot="factors_dropdown">
        <MissionSectionHeader
          title="Contributing factors"
          message="All factors that contributed to this alert classification."
        />
        <FactorsDropdown
          allFactors={alertDetail.allFactors}
          whyItMatters="Each factor represents a deviation from your behavioral baseline. Higher contribution means stronger signal for fraud classification."
        />
      </article>

      <article className="engine-card">
        <MissionSectionHeader
          title="Alternative outcomes"
          message="Other possible interpretations of this signal."
        />
        <MissionDataRows
          items={alertDetail.alternatives.map((alt, i) => ({
            id: `ALT-${i}`,
            title: alt,
            value: '',
            tone: 'primary' as const,
          }))}
        />
      </article>

      <article className="engine-card">
        <MissionSectionHeader
          title="Similar past cases"
          message="Historical alerts with matching patterns."
        />
        <MissionDataRows
          items={[
            { id: 'PAST-1', title: 'Amazon UK fraud — Jan 2026', value: 'Blocked', tone: 'critical' },
            { id: 'PAST-2', title: 'Unusual overseas charge — Dec 2025', value: 'Cleared', tone: 'healthy' },
            { id: 'PAST-3', title: 'Late-night transaction — Nov 2025', value: 'Blocked', tone: 'critical' },
          ]}
        />
        <ProofLine
          claim="18 similar cases resolved"
          evidence="97% resolution accuracy on matching patterns"
          source="Pattern matching engine"
          basis="6 months history"
          sourceType="model"
        />
      </article>
    </>
  );

  return (
    <PageShell
      slug="protect"
      contract={contract}
      layout="engine"
      heroVariant="focused"
      hero={{
        kicker: 'Alert Detail',
        headline: alertDetail.title,
        subline: contract.oneScreenMessage,
        proofLine: {
          claim: `Confidence ${alertDetail.confidence}`,
          evidence: `${alertDetail.allFactors.length} contributing factors | ${alertDetail.severity} severity`,
          source: 'FraudDetectionV3.2',
        },
        freshness: new Date(Date.now() - 12 * 60 * 1000),
        kpis: [
          { label: 'Confidence', value: '97%', definition: 'Model confidence in fraud classification', accent: 'teal', sparklineData: kpiSparklines.confidence, sparklineColor: 'var(--state-healthy)' },
          { label: 'Factors', value: '6', definition: 'Contributing factors in explanation', accent: 'cyan', sparklineData: kpiSparklines.factors, sparklineColor: '#00F0FF' },
          { label: 'Similar cases', value: '18', definition: 'Historical cases with matching pattern', accent: 'blue', sparklineData: kpiSparklines.similar, sparklineColor: 'var(--state-primary)' },
          { label: 'Resolution rate', value: '97%', definition: 'Similar alerts resolved correctly', accent: 'amber', sparklineData: kpiSparklines.resolved, sparklineColor: 'var(--state-warning)' },
        ],
      }}
      primaryFeed={mainContent}
      decisionRail={sideContent}
    />
  );
};

export default ProtectAlertDetail;
