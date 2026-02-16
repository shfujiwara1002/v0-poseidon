import React, { useState } from 'react';
import { Link } from '../router';
import { PageShell } from '../components/PageShell';
import { GovernContractSet } from '../components/GovernContractSet';
import { ExplainableInsightPanel } from '../components/ExplainabilityPanel';
import { MissionDataRows } from '../components/MissionDataRows';
import { MissionSectionHeader } from '../components/MissionSectionHeader';
import { MissionStatusChip } from '../components/MissionStatusChip';
import { ProofLine } from '../components/ProofLine';
import { DefinitionLine } from '../components/DefinitionLine';
import { SignalRow, SignalGroup } from '../components/SignalRow';
import { getRouteScreenContract } from '../contracts/route-screen-contracts';

interface Alert {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  source: string;
  time: string;
  score: string;
  summary: string;
  factors: Array<{ label: string; contribution: number }>;
}

const alerts: Alert[] = [
  {
    id: 'ALT-001', severity: 'critical', title: 'Unusual login from new device',
    source: 'Protect', time: '12m ago', score: '0.96',
    summary: 'Login detected from unrecognized device in a new geographic location. Risk pattern matches known credential theft vectors.',
    factors: [{ label: 'Device fingerprint', contribution: 0.42 }, { label: 'Geo anomaly', contribution: 0.35 }, { label: 'Session timing', contribution: 0.23 }],
  },
  {
    id: 'ALT-002', severity: 'high', title: 'Recurring charge spike detected',
    source: 'Protect', time: '1h ago', score: '0.91',
    summary: 'Monthly recurring charges increased 23% compared to 90-day baseline without corresponding service changes.',
    factors: [{ label: 'Charge variance', contribution: 0.55 }, { label: 'Pattern deviation', contribution: 0.30 }, { label: 'Vendor risk', contribution: 0.15 }],
  },
  {
    id: 'ALT-003', severity: 'medium', title: 'Budget threshold approaching',
    source: 'Grow', time: '3h ago', score: '0.84',
    summary: 'Current spending trajectory will breach the monthly budget threshold within 5 days at current rate.',
    factors: [{ label: 'Spending rate', contribution: 0.50 }, { label: 'Budget remaining', contribution: 0.30 }, { label: 'Historical pattern', contribution: 0.20 }],
  },
  {
    id: 'ALT-004', severity: 'low', title: 'New savings opportunity identified',
    source: 'Grow', time: '6h ago', score: '0.78',
    summary: 'Surplus cash detected in checking account. Transferring to savings could yield additional $12/mo in interest.',
    factors: [{ label: 'Cash surplus', contribution: 0.60 }, { label: 'Rate differential', contribution: 0.25 }, { label: 'Timing', contribution: 0.15 }],
  },
  {
    id: 'ALT-005', severity: 'medium', title: 'Action queue requires approval',
    source: 'Execute', time: '8h ago', score: '0.82',
    summary: 'Three pending actions awaiting user approval before execution window closes in 16 hours.',
    factors: [{ label: 'Time urgency', contribution: 0.45 }, { label: 'Action count', contribution: 0.35 }, { label: 'Impact', contribution: 0.20 }],
  },
];

const severityTone: Record<string, 'critical' | 'warning' | 'primary' | 'healthy'> = {
  critical: 'critical',
  high: 'warning',
  medium: 'primary',
  low: 'healthy',
};

const kpiSparklines = {
  active: [{ value: 8 }, { value: 7 }, { value: 6 }, { value: 5 }, { value: 5 }, { value: 5 }],
  resolved: [{ value: 12 }, { value: 14 }, { value: 16 }, { value: 18 }, { value: 20 }, { value: 22 }],
  mttr: [{ value: 45 }, { value: 40 }, { value: 35 }, { value: 32 }, { value: 28 }, { value: 25 }],
  fp: [{ value: 8 }, { value: 7 }, { value: 6 }, { value: 5 }, { value: 4 }, { value: 3 }],
};

export const AlertsHub: React.FC = () => {
  const contract = getRouteScreenContract('alerts-hub');
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(alerts[0]);

  const mainContent = (
    <>
      <section className="engine-section">
        <MissionSectionHeader
          title="Priority alerts"
          message="Alerts sorted by severity and confidence score."
          contextCue="Open alert to see evidence and take action"
          right={<MissionStatusChip tone="critical" label={`${alerts.filter((a) => a.severity === 'critical').length} critical`} />}
        />
        <MissionDataRows
          items={alerts.map((alert) => ({
            id: alert.id,
            title: alert.title,
            value: alert.score,
            detail: `${alert.source} · ${alert.time}`,
            tone: severityTone[alert.severity] ?? 'primary',
            onClick: () => setSelectedAlert(alert),
          }))}
        />
        <ProofLine
          claim={`${alerts.length} active alerts`}
          evidence="Priority-sorted by confidence score | All engines reporting"
          source="Cross-engine composite"
          basis="real-time"
          sourceType="model"
        />
      </section>

      <article className="engine-card">
        <MissionSectionHeader title="Signal breakdown" />
        <SignalGroup>
          <SignalRow icon="●" label="Protect signals" value="3 active" color="teal" />
          <SignalRow icon="●" label="Grow signals" value="1 active" color="violet" />
          <SignalRow icon="●" label="Execute signals" value="1 active" color="amber" />
          <SignalRow icon="●" label="Govern signals" value="0 active" color="blue" />
        </SignalGroup>
      </article>

      <GovernContractSet
        auditId="GV-2026-0212-ALT1"
        modelVersion="v3.2"
        explanationVersion="xai-1.1"
      />
    </>
  );

  const sideContent = (
    <>
      {selectedAlert && (
        <article className="engine-card">
          <MissionSectionHeader
            title={selectedAlert.title}
            message={`${selectedAlert.source} engine · ${selectedAlert.time}`}
          />
          <ExplainableInsightPanel
            title="Alert evidence"
            summary={selectedAlert.summary}
            topFactors={selectedAlert.factors}
            confidence={parseFloat(selectedAlert.score)}
            recency={selectedAlert.time}
            governMeta={{
              auditId: `GV-2026-0212-${selectedAlert.id}`,
              modelVersion: 'v3.2',
              explanationVersion: 'xai-1.1',
              timestamp: new Date().toISOString(),
            }}
          />
          <div className="engine-actions" style={{ marginTop: 16 }}>
            <Link to="/protect/alert-detail" className="entry-btn entry-btn--primary">
              Investigate →
            </Link>
          </div>
        </article>
      )}

      <article className="engine-card">
        <MissionSectionHeader title="Alert policy" />
        <DefinitionLine
          metric="Severity scoring"
          formula="SHAP(features) × confidence"
          unit="score (0-1)"
          period="per-event"
        />
        <MissionDataRows
          items={[
            { id: 'AP-1', title: 'Critical → immediate', value: 'Active', tone: 'critical' },
            { id: 'AP-2', title: 'High → 1h review', value: 'Active', tone: 'warning' },
            { id: 'AP-3', title: 'Medium → daily digest', value: 'Active', tone: 'primary' },
            { id: 'AP-4', title: 'Low → weekly summary', value: 'Active', tone: 'healthy' },
          ]}
        />
      </article>
    </>
  );

  return (
    <PageShell
      slug="protect"
      contract={contract}
      layout="engine"
      heroVariant="editorial"
      hero={{
        kicker: 'Alerts Hub',
        headline: 'Priority-sorted signal board.',
        subline: contract.oneScreenMessage,
        proofLine: {
          claim: `${alerts.length} active alerts`,
          evidence: 'Cross-engine priority ranking | Real-time',
          source: 'Signal composite',
        },
        freshness: new Date(Date.now() - 3 * 60 * 1000),
        kpis: [
          { label: 'Active alerts', value: '5', delta: '−2 from last week', definition: 'Unresolved alerts across all engines', accent: 'amber', sparklineData: kpiSparklines.active, sparklineColor: 'var(--state-warning)' },
          { label: 'Resolved (7d)', value: '22', delta: '+6', definition: 'Alerts resolved in the last 7 days', accent: 'teal', sparklineData: kpiSparklines.resolved, sparklineColor: 'var(--state-healthy)' },
          { label: 'MTTR', value: '25m', delta: '▼ 42%', definition: 'Mean time to resolve alerts', accent: 'cyan', sparklineData: kpiSparklines.mttr, sparklineColor: '#00F0FF' },
          { label: 'False positive', value: '3%', delta: '▼ from 8%', definition: 'Rate of incorrectly flagged alerts', accent: 'blue', sparklineData: kpiSparklines.fp, sparklineColor: 'var(--state-primary)' },
        ],
      }}
      primaryFeed={mainContent}
      decisionRail={sideContent}
    />
  );
};

export default AlertsHub;
