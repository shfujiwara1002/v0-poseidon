import React from 'react';
import { Link } from '../router';
import { ActionOutcomePreview } from '../components/ActionOutcomePreview';
import { ContributionChart } from '../components/ContributionChart';
import { DefinitionLine } from '../components/DefinitionLine';
import { PageShell } from '../components/PageShell';
import { FactorsDropdown } from '../components/FactorsDropdown';
import { GovernContractSet } from '../components/GovernContractSet';
import { MissionActionList } from '../components/MissionActionList';
import { MissionDataRows } from '../components/MissionDataRows';
import { MissionSectionHeader } from '../components/MissionSectionHeader';
import { MissionStatusChip } from '../components/MissionStatusChip';
import { ProofLine } from '../components/ProofLine';
import { ScenarioControls } from '../components/ScenarioControls';
import { ScenarioSimulator } from '../components/ScenarioSimulator';
import { getRouteScreenContract } from '../contracts/route-screen-contracts';

const scenarios = [
  { id: 'SC-001', name: 'Aggressive savings', delta: '+$2,400/yr', confidence: '0.87', risk: 'Medium', tone: 'healthy' as const },
  { id: 'SC-002', name: 'Moderate growth', delta: '+$1,200/yr', confidence: '0.92', risk: 'Low', tone: 'primary' as const },
  { id: 'SC-003', name: 'Conservative hold', delta: '+$400/yr', confidence: '0.96', risk: 'Minimal', tone: 'healthy' as const },
];

const scenarioFactors = [
  { label: 'Income stability', contribution: 0.94, note: 'Monthly salary detected' },
  { label: 'Expense variance', contribution: 0.78, note: '15% monthly fluctuation' },
  { label: 'Savings rate impact', contribution: 0.85, note: 'Direct effect on projection' },
  { label: 'Market conditions', contribution: 0.62, note: 'Low interest rate environment' },
  { label: 'Seasonal patterns', contribution: 0.55, note: 'Holiday spending detected' },
];

const scenarioImpactByMonth = [
  { month: 'Sep', amount: 100 },
  { month: 'Oct', amount: 150 },
  { month: 'Nov', amount: 120 },
  { month: 'Dec', amount: 80 },
  { month: 'Jan', amount: 180 },
  { month: 'Feb', amount: 200 },
  { month: 'Mar', amount: 220 },
  { month: 'Apr', amount: 250 },
  { month: 'May', amount: 280 },
  { month: 'Jun', amount: 300 },
  { month: 'Jul', amount: 320 },
  { month: 'Aug', amount: 340 },
];

const kpiSparklines = {
  scenarios: [{ value: 2 }, { value: 3 }, { value: 3 }, { value: 3 }, { value: 3 }, { value: 3 }],
  bestDelta: [{ value: 1800 }, { value: 2000 }, { value: 2100 }, { value: 2200 }, { value: 2300 }, { value: 2400 }],
  confidence: [{ value: 0.85 }, { value: 0.86 }, { value: 0.87 }, { value: 0.88 }, { value: 0.89 }, { value: 0.89 }],
  horizon: [{ value: 30 }, { value: 30 }, { value: 30 }, { value: 30 }, { value: 30 }, { value: 30 }],
};

export const GrowScenarios: React.FC = () => {
  const contract = getRouteScreenContract('grow-scenarios');

  const mainContent = (
    <>
      <section className="engine-section">
        <MissionSectionHeader
          title="Scenario comparison"
          message="Pre-built scenarios ranked by expected outcome and confidence."
          contextCue="Adjust parameters below to create custom scenarios"
          right={<MissionStatusChip tone="healthy" label={`${scenarios.length} scenarios`} />}
        />
        <MissionDataRows
          items={scenarios.map((s) => ({
            id: s.id,
            title: s.name,
            value: s.delta,
            detail: `Confidence ${s.confidence} · Risk: ${s.risk}`,
            tone: s.tone,
          }))}
        />
        <ProofLine
          claim="Best outcome: +$2,400/yr"
          evidence="Aggressive savings with medium risk | Model v2.1"
          source="Scenario engine"
          basis="12 months projection"
          sourceType="model"
        />
        <DefinitionLine
          metric="Scenario delta"
          formula="projection(scenario) - projection(baseline)"
          unit="dollars / year"
          period="12 months forward"
        />
      </section>

      <article className="engine-card">
        <MissionSectionHeader
          title="Scenario controls"
          message="Adjust parameters to model custom scenarios."
        />
        <ScenarioControls />
      </article>

      <article className="engine-card" data-slot="action_preview">
        <MissionSectionHeader
          title="Quick simulator"
          message="Run a one-off simulation with preset parameters."
        />
        <ScenarioSimulator />
      </article>

      <article className="engine-card">
        <MissionSectionHeader
          title="Recommended path"
          message="Best-fit scenario based on your risk profile and goals."
        />
        <MissionActionList
          items={[
            { title: 'Adopt moderate growth scenario', meta: '+$1,200/yr at low risk', tone: 'healthy' },
            { title: 'Set budget cap guardrail', meta: 'Limits downside', tone: 'primary' },
            { title: 'Send to Execute for approval', meta: 'Next step', tone: 'warning' },
          ]}
        />
        <ActionOutcomePreview
          outcome="Moderate growth scenario applied: expected +$1,200/yr in savings with low risk exposure."
          reversibleWindow="Any time"
          sideEffects={[
            'Monthly budget caps may be adjusted',
            'Auto-save rules updated to match scenario',
          ]}
          impact="+$1,200/yr"
        />
        <div className="mission-dual-actions">
          <Link className="entry-btn entry-btn--primary" to="/execute">Send to Execute</Link>
          <Link className="entry-btn entry-btn--ghost" to="/grow/recommendations">View recommendations</Link>
        </div>
      </article>

      <GovernContractSet
        auditId="GV-2026-0212-SC01"
        modelVersion="v2.1"
        explanationVersion="xai-1.0"
      />
    </>
  );

  const sideContent = (
    <>
      <article className="engine-card">
        <MissionSectionHeader
          title="Monthly impact projection"
          message="Estimated savings accumulation under the moderate growth scenario."
        />
        <ContributionChart
          data={scenarioImpactByMonth}
          targetMonthly={200}
          accentColor="var(--engine-grow)"
        />
        <ProofLine
          claim="$2,540 projected annual accumulation"
          evidence="Based on moderate growth scenario parameters"
          source="Scenario engine"
          basis="12 months forward"
          sourceType="model"
        />
      </article>

      <article className="engine-card" data-slot="factors_dropdown">
        <MissionSectionHeader
          title="Scenario factors"
          message="Variables that influence projection outcomes."
        />
        <FactorsDropdown
          allFactors={scenarioFactors}
          whyItMatters="These factors determine how scenario parameters translate into projected outcomes. Higher contribution means the factor has more influence on the final result."
        />
      </article>

      <article className="engine-card">
        <MissionSectionHeader
          title="Scenario parameters"
          message="Current assumptions used across all scenarios."
        />
        <MissionDataRows
          items={[
            { id: 'SP-1', title: 'Forecast horizon', value: '12 months', tone: 'primary' },
            { id: 'SP-2', title: 'Risk tolerance', value: 'Moderate', tone: 'warning' },
            { id: 'SP-3', title: 'Income stability', value: 'High', tone: 'healthy' },
            { id: 'SP-4', title: 'Expense variability', value: 'Low', tone: 'healthy' },
          ]}
        />
        <DefinitionLine
          metric="Risk tolerance"
          formula="user_preference x portfolio_variance"
          unit="categorical"
          period="user-defined"
        />
      </article>
    </>
  );

  return (
    <PageShell
      slug="grow"
      contract={contract}
      layout="engine"
      heroVariant="focused"
      hero={{
        kicker: 'Scenario Planner',
        headline: 'Compare outcomes with confidence.',
        subline: contract.oneScreenMessage,
        proofLine: {
          claim: '3 scenarios analyzed',
          evidence: 'Each with confidence bands and risk assessment',
          source: 'CashFlowLSTM v2.1',
        },
        freshness: new Date(Date.now() - 10 * 60 * 1000),
        kpis: [
          { label: 'Scenarios', value: '3', definition: 'Active scenarios under comparison', accent: 'violet', sparklineData: kpiSparklines.scenarios, sparklineColor: 'var(--engine-grow)' },
          { label: 'Best delta', value: '+$2.4k', definition: 'Best projected annual improvement', accent: 'teal', sparklineData: kpiSparklines.bestDelta, sparklineColor: 'var(--state-healthy)' },
          { label: 'Confidence', value: '0.89', definition: 'Average confidence across scenarios', accent: 'cyan', sparklineData: kpiSparklines.confidence, sparklineColor: '#00F0FF' },
          { label: 'Horizon', value: '12mo', definition: 'Projection time horizon', accent: 'blue', sparklineData: kpiSparklines.horizon, sparklineColor: 'var(--state-primary)' },
        ],
      }}
      primaryFeed={mainContent}
      decisionRail={sideContent}
    />
  );
};

export default GrowScenarios;
