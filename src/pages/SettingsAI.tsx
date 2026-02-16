import React from 'react';
import { DefinitionLine } from '../components/DefinitionLine';
import { PageShell } from '../components/PageShell';
import { MissionDataRows } from '../components/MissionDataRows';
import { MissionSectionHeader } from '../components/MissionSectionHeader';
import { MissionStatusChip } from '../components/MissionStatusChip';
import { ProofLine } from '../components/ProofLine';
import { useAutonomy } from '../contexts/AutonomyContext';
import { getRouteScreenContract } from '../contracts/route-screen-contracts';

const delegationLevels = [
  { label: 'Manual', description: 'AI suggests, you decide and execute everything.' },
  { label: 'Collaborative', description: 'AI recommends actions, you approve before execution.' },
  { label: 'Auto with approval', description: 'AI executes low-risk actions, asks for high-risk.' },
  { label: 'Autonomous', description: 'AI handles routine decisions within your guardrails.' },
];

const kpiSparklines = {
  delegation: [{ value: 1 }, { value: 1 }, { value: 2 }, { value: 2 }, { value: 2 }, { value: 2 }],
  threshold: [{ value: 0.8 }, { value: 0.8 }, { value: 0.85 }, { value: 0.85 }, { value: 0.9 }, { value: 0.9 }],
  overrides: [{ value: 5 }, { value: 4 }, { value: 3 }, { value: 3 }, { value: 2 }, { value: 2 }],
  accuracy: [{ value: 94 }, { value: 95 }, { value: 95 }, { value: 96 }, { value: 96 }, { value: 96 }],
};

export const SettingsAI: React.FC = () => {
  const contract = getRouteScreenContract('settings-ai');
  const { autonomyLevel, setAutonomyLevel } = useAutonomy();

  const mainContent = (
    <>
      <article className="engine-card" data-slot="delegation_level">
        <MissionSectionHeader
          title="Delegation level"
          message="Controls how much decision-making authority the AI has."
          contextCue="Higher levels mean more automation with guardrails"
          right={<MissionStatusChip tone="warning" label={delegationLevels[autonomyLevel].label} />}
        />
        <DefinitionLine
          metric="Delegation level"
          formula="user_selected_autonomy_tier"
          unit="tier (0-3)"
          period="current"
        />
        <div className="settings-option-grid">
          {delegationLevels.map((level, idx) => (
            <button
              key={level.label}
              type="button"
              className={['settings-option', autonomyLevel === idx ? 'is-active' : null].filter(Boolean).join(' ')}
              onClick={() => setAutonomyLevel(idx as 0 | 1 | 2 | 3)}
            >
              <strong>{level.label}</strong>
              <span>{level.description}</span>
            </button>
          ))}
        </div>
        <ProofLine
          claim={`Current: ${delegationLevels[autonomyLevel].label}`}
          evidence="Change takes effect immediately | All actions remain audited"
          source="AI policy engine"
          basis="real-time"
          sourceType="policy"
        />
      </article>

      <article className="engine-card" data-slot="risk_thresholds">
        <MissionSectionHeader
          title="Risk thresholds"
          message="Confidence boundaries that gate AI decision authority."
        />
        <MissionDataRows
          items={[
            { id: 'RT-1', title: 'Auto-execute threshold', value: '0.90', detail: 'Actions below this confidence require approval', tone: 'primary' },
            { id: 'RT-2', title: 'Alert threshold', value: '0.70', detail: 'Signals above this trigger notifications', tone: 'warning' },
            { id: 'RT-3', title: 'Escalation threshold', value: '0.95', detail: 'Decisions above this flagged for review', tone: 'critical' },
          ]}
        />
        <DefinitionLine
          metric="Auto-execute threshold"
          formula="min_confidence_for_autonomous_action"
          unit="probability (0-1)"
          period="current"
          threshold="> 0.90"
        />
      </article>

      <article className="engine-card">
        <MissionSectionHeader
          title="Notification preferences"
          message="Configure which AI events trigger alerts."
        />
        <MissionDataRows
          items={[
            { id: 'NP-1', title: 'Critical alerts', value: 'Enabled', tone: 'healthy' },
            { id: 'NP-2', title: 'Recommendations', value: 'Enabled', tone: 'healthy' },
            { id: 'NP-3', title: 'Weekly digest', value: 'Enabled', tone: 'healthy' },
          ]}
        />
        <ProofLine
          claim="3 notification channels active"
          evidence="Critical alerts always on | Others configurable"
          source="Notification engine"
          basis="current"
          sourceType="system"
        />
      </article>
    </>
  );

  const sideContent = (
    <article className="engine-card">
      <MissionSectionHeader
        title="AI behavior stats"
        message="How the AI has performed under current settings."
      />
      <MissionDataRows
        items={[
          { id: 'ABS-1', title: 'Manual overrides (30d)', value: '2', tone: 'primary' },
          { id: 'ABS-2', title: 'Auto-executed (30d)', value: '18', tone: 'healthy' },
          { id: 'ABS-3', title: 'Recommendation accuracy', value: '96%', tone: 'healthy' },
        ]}
      />
      <DefinitionLine
        metric="Override rate"
        formula="manual_overrides / total_recommendations"
        unit="percentage"
        period="30 days rolling"
        threshold="< 10%"
      />
    </article>
  );

  return (
    <PageShell
      slug="settings"
      contract={contract}
      fullWidth
      layout="engine"
      heroVariant="editorial"
      hero={{
        kicker: 'AI Settings',
        headline: 'Control how AI assists your decisions.',
        subline: contract.oneScreenMessage,
        proofLine: {
          claim: `Delegation: ${delegationLevels[autonomyLevel].label}`,
          evidence: 'All changes audit-logged | Fail-closed defaults preserved',
          source: 'AI policy engine',
        },
        freshness: new Date(Date.now() - 30 * 60 * 1000),
        kpis: [
          { label: 'Delegation', value: delegationLevels[autonomyLevel].label, definition: 'Current AI autonomy level', accent: 'amber', sparklineData: kpiSparklines.delegation, sparklineColor: 'var(--state-warning)' },
          { label: 'Risk threshold', value: '0.90', definition: 'Minimum confidence for auto-execution', accent: 'teal', sparklineData: kpiSparklines.threshold, sparklineColor: 'var(--state-healthy)' },
          { label: 'Overrides (30d)', value: '2', definition: 'Times you overrode AI recommendation', accent: 'cyan', sparklineData: kpiSparklines.overrides, sparklineColor: '#00F0FF' },
          { label: 'Accuracy', value: '96%', definition: 'AI recommendation accuracy over 30 days', accent: 'blue', sparklineData: kpiSparklines.accuracy, sparklineColor: 'var(--state-primary)' },
        ],
      }}
      primaryFeed={mainContent}
      decisionRail={sideContent}
    />
  );
};

export default SettingsAI;
