import React, { useState } from 'react';
import { Link } from '../router';
import { DefinitionLine } from '../components/DefinitionLine';
import { NetWorthHero } from '../components/NetWorthHero';
import { PageShell } from '../components/PageShell';
import { ExplainableInsightPanel } from '../components/ExplainabilityPanel';
import { ForecastBandChart } from '../components/ForecastBandChart';
import { GovernContractSet } from '../components/GovernContractSet';
import { MissionActionList } from '../components/MissionActionList';
import { MissionDataRows } from '../components/MissionDataRows';
import { MissionMetricTiles } from '../components/MissionMetricTiles';
import { MissionSectionHeader } from '../components/MissionSectionHeader';
import { MissionStatusChip } from '../components/MissionStatusChip';
import { ProofLine } from '../components/ProofLine';
import { SavingsGoalCard } from '../components/SavingsGoalCard';
import { ScoreRing } from '../components/ScoreRing';
import { ScenarioSimulator } from '../components/ScenarioSimulator';
import { getRouteScreenContract } from '../contracts/route-screen-contracts';
import {
  generateCashFlowForecast,
  mockGrowStats,
  mockSavingsGoals,
} from '../services/mockGrow';

const kpiSparklines = {
  forecast: [{ value: 4.2 }, { value: 5.1 }, { value: 5.8 }, { value: 6.0 }, { value: 6.5 }, { value: 6.8 }],
  runway: [{ value: 18 }, { value: 19 }, { value: 19 }, { value: 20 }, { value: 21 }, { value: 21 }],
  confidence: [{ value: 0.85 }, { value: 0.86 }, { value: 0.87 }, { value: 0.88 }, { value: 0.88 }, { value: 0.89 }],
  goalFit: [{ value: 70 }, { value: 75 }, { value: 78 }, { value: 82 }, { value: 85 }, { value: 88 }],
};

export const Grow: React.FC = () => {
  const [forecastDays, setForecastDays] = useState(30);
  const contract = getRouteScreenContract('grow');
  const cashFlowData = generateCashFlowForecast(forecastDays);
  const currentBalance = cashFlowData[0]?.balance || 0;
  const projectedBalance = cashFlowData[cashFlowData.length - 1]?.balance || 0;
  const balanceChange = projectedBalance - currentBalance;
  const endConfidence = cashFlowData[cashFlowData.length - 1]?.confidence || 0;

  const mainContent = (
    <>
      {/* Net worth hero — visual summary */}
      <article className="engine-card">
        <NetWorthHero
          total={`$${projectedBalance.toLocaleString()}`}
          change={`${balanceChange >= 0 ? '+' : ''}$${Math.abs(balanceChange).toLocaleString()} (${((balanceChange / Math.max(currentBalance, 1)) * 100).toFixed(1)}%)`}
          trend={balanceChange >= 0 ? 'up' : 'down'}
          period={`${forecastDays}d projection`}
          glowColor="var(--engine-grow)"
        />
      </article>

      <article className="engine-card">
        <MissionSectionHeader
          title="Cash flow forecast"
          message="Historical data with forward projection and confidence bands."
          contextCue="Run a scenario to test your plan"
          right={(
            <MissionStatusChip
              tone={balanceChange >= 0 ? 'healthy' : 'warning'}
              label={`${forecastDays}d horizon`}
            />
          )}
        />

        <div className="grow-forecast-controls">
          {[7, 30, 90].map((days) => (
            <button
              key={days}
              type="button"
              className={forecastDays === days ? 'entry-btn entry-btn--primary' : 'entry-btn entry-btn--ghost'}
              onClick={() => setForecastDays(days)}
            >
              {days}d
            </button>
          ))}
        </div>

        <ForecastBandChart
          data={cashFlowData}
          height={320}
          historicalCount={Math.min(5, forecastDays)}
        />

        <ProofLine
          claim={`${forecastDays}-day forecast`}
          evidence={`Projected ${balanceChange >= 0 ? '+' : ''}$${Math.abs(balanceChange).toLocaleString()} | Confidence ${endConfidence}%`}
          source="CashFlowLSTM v2.1"
          basis={`${forecastDays} days forward`}
          sourceType="model"
        />

        <DefinitionLine
          metric="Forecast confidence"
          formula="ensemble(LSTM, ARIMA, seasonal)"
          unit="percentage"
          period={`${forecastDays} days rolling`}
          threshold="> 80%"
        />

        <MissionMetricTiles
          items={[
            {
              id: 'GROW-CONF',
              label: 'Confidence',
              value: `${endConfidence}%`,
              tone: 'healthy',
            },
            { id: 'GROW-RISK', label: 'Risk period', value: 'None', tone: 'primary' },
            { id: 'GROW-ACC', label: 'Accuracy', value: `${mockGrowStats.forecastAccuracy}%`, tone: 'primary' },
            { id: 'GROW-BAL', label: 'Projected', value: `$${projectedBalance.toLocaleString()}`, tone: balanceChange >= 0 ? 'healthy' : 'warning' },
          ]}
        />
      </article>

      <section className="engine-section">
        <MissionSectionHeader
          title="Scenario analysis"
          message="Test how changes in income or expenses affect your forecast."
        />
        <ScenarioSimulator />
      </section>

      <GovernContractSet
        auditId="GV-2026-0212-GRW1"
        modelVersion="v3.2"
        explanationVersion="xai-1.1"
      />
    </>
  );

  const sideContent = (
    <>
      <article className="engine-card">
        <MissionSectionHeader
          title="Forecast methodology"
          message="How predictions are generated and validated."
        />
        <ExplainableInsightPanel
          title="Forecast model"
          summary={`Ensemble of LSTM, ARIMA, and seasonal models trained on ${forecastDays * 3} days of historical data. Confidence bands widen as forecast horizon extends.`}
          topFactors={[
            { label: 'Income regularity', contribution: 0.92, note: 'Monthly salary detected' },
            { label: 'Expense variance', contribution: 0.78, note: '±15% monthly fluctuation' },
            { label: 'Seasonal patterns', contribution: 0.65, note: 'Utility costs cycle detected' },
          ]}
          confidence={endConfidence / 100}
          recency="Updated 12m ago"
          governMeta={{
            auditId: 'GV-2026-0212-GRW1',
            modelVersion: 'v3.2',
            explanationVersion: 'xai-1.1',
            timestamp: new Date().toISOString(),
          }}
        />
      </article>

      {/* Goal progress ring — visual summary */}
      <article className="engine-card">
        <ScoreRing
          score={Math.round((mockGrowStats.goalsOnTrack / Math.max(mockGrowStats.totalGoals, 1)) * 100)}
          label="Goal Progress"
          subtitle="% on track"
          statusText={`${mockGrowStats.goalsOnTrack} of ${mockGrowStats.totalGoals} goals on track`}
          color="var(--accent-violet)"
          size="md"
        />
      </article>

      <section className="engine-section">
        <MissionSectionHeader
          title="Savings goals"
          message="Progress toward active financial goals."
          right={<MissionStatusChip tone="healthy" label={`${mockGrowStats.goalsOnTrack}/${mockGrowStats.totalGoals} on track`} />}
        />
        <div className="engine-item-list">
          {mockSavingsGoals.map((goal) => (
            <SavingsGoalCard key={goal.id} goal={goal} />
          ))}
        </div>
      </section>

      <article className="engine-card">
        <MissionSectionHeader
          title="Forecast drivers"
          message="Key factors influencing the current projection."
        />
        <MissionDataRows
          items={[
            { id: 'DRV-1', title: 'Salary variance', value: '+3.2%', tone: 'healthy' },
            { id: 'DRV-2', title: 'Subscription costs', value: '-1.8%', tone: 'critical' },
            { id: 'DRV-3', title: 'Seasonal utilities', value: '-0.9%', tone: 'warning' },
          ]}
        />
        <DefinitionLine
          metric="Driver impact"
          formula="delta(category) / total_cashflow"
          unit="percentage"
          period="30 days rolling"
        />
      </article>

      <article className="engine-card">
        <MissionSectionHeader
          title="Next best actions"
          message="Recommended steps to improve financial trajectory."
        />
        <MissionActionList
          items={[
            { title: 'Adopt +$500/mo save scenario', meta: 'Runway +4 days', tone: 'healthy' },
            { title: 'Rebalance recurring spend', meta: 'Impact medium', tone: 'warning' },
            { title: 'Lock monthly cap policy', meta: 'Guardrail sync', tone: 'primary' },
          ]}
        />
        <div className="mission-dual-actions">
          <Link className="entry-btn entry-btn--ghost" to="/govern">Open audit trail</Link>
        </div>
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
        kicker: 'Grow Engine',
        engineBadge: 'Grow',
        headline: 'Forecast outcomes with confidence.',
        subline: contract.oneScreenMessage,
        valueStatement: `${forecastDays}-day projection: ${balanceChange >= 0 ? '+' : ''}$${Math.abs(balanceChange).toLocaleString()} at ${endConfidence}% confidence. ${mockGrowStats.goalsOnTrack}/${mockGrowStats.totalGoals} goals on track.`,
        proofLine: {
          claim: `Confidence ${(endConfidence / 100).toFixed(2)}`,
          evidence: `CashFlowLSTM model v2.1 | ${mockGrowStats.forecastAccuracy}% historical accuracy`,
          source: 'Grow engine',
        },
        heroAction: {
          label: 'Recommended:',
          text: 'Apply the top growth scenario before your next billing cycle.',
          cta: { label: 'Send to Execute →', to: '/execute' },
        },
        freshness: new Date(Date.now() - 12 * 60 * 1000),
        kpis: [
          { label: 'Forecast delta', value: '+6.8%', delta: '+2.1% MoM', definition: 'Projected balance change vs. 30-day baseline', accent: 'teal', sparklineData: kpiSparklines.forecast, sparklineColor: 'var(--state-healthy)' },
          { label: 'Cash runway', value: '21d', delta: '+3d', definition: 'Days of expenses covered by current balance', accent: 'violet', sparklineData: kpiSparklines.runway, sparklineColor: 'var(--engine-grow)' },
          { label: 'Plan confidence', value: (endConfidence / 100).toFixed(2), definition: 'Statistical confidence of primary forecast path', accent: 'cyan', sparklineData: kpiSparklines.confidence, sparklineColor: '#00F0FF' },
          { label: 'Goal fit', value: 'High', definition: 'Alignment of current trajectory with active savings goals', accent: 'blue', sparklineData: kpiSparklines.goalFit, sparklineColor: 'var(--state-primary)' },
        ],
      }}
      primaryFeed={mainContent}
      decisionRail={sideContent}
    />
  );
};

export default Grow;
