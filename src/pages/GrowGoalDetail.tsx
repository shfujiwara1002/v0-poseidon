import React from 'react';
import { Target, Edit3 } from 'lucide-react';
import { Link } from '../router';
import { ContributionChart } from '../components/ContributionChart';
import type { ContributionDataPoint } from '../components/ContributionChart';
import { DefinitionLine } from '../components/DefinitionLine';
import { MilestonesTimeline } from '../components/MilestonesTimeline';
import type { Milestone } from '../components/MilestonesTimeline';
import { MissionSectionHeader } from '../components/MissionSectionHeader';
import { PageShell } from '../components/PageShell';
import { ProofLine } from '../components/ProofLine';
import { ScoreRing } from '../components/ScoreRing';
import { GovernContractSet } from '../components/GovernContractSet';
import { getRouteScreenContract } from '../contracts/route-screen-contracts';
import { mockSavingsGoals } from '../services/mockGrow';

// Use first goal as detail view
const goal = mockSavingsGoals[0];
const progressPct = Math.round((goal.current / goal.target) * 100);
const remaining = goal.target - goal.current;
const monthsRemaining = Math.ceil(remaining / goal.aiRecommendation.monthlyContribution);

const contributionData: ContributionDataPoint[] = [
  { month: 'Mar', amount: 2800 }, { month: 'Apr', amount: 3200 },
  { month: 'May', amount: 2500 }, { month: 'Jun', amount: 3500 },
  { month: 'Jul', amount: 3000 }, { month: 'Aug', amount: 3200 },
  { month: 'Sep', amount: 2900 }, { month: 'Oct', amount: 3400 },
  { month: 'Nov', amount: 3100 }, { month: 'Dec', amount: 3600 },
  { month: 'Jan', amount: 3300 }, { month: 'Feb', amount: 3500 },
];

const milestones: Milestone[] = [
  { label: 'Started', date: 'Jan 2025', status: 'completed' },
  { label: '25% reached', date: 'Aug 2025', status: progressPct >= 25 ? 'completed' : 'upcoming' },
  { label: '50% reached', date: 'Mar 2026', status: progressPct >= 50 ? 'completed' : progressPct >= 25 ? 'upcoming' : 'future' },
  { label: '75% target', date: 'Nov 2026', status: progressPct >= 75 ? 'completed' : progressPct >= 50 ? 'upcoming' : 'future' },
  { label: 'Goal reached', date: goal.deadline.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }), status: progressPct >= 100 ? 'completed' : 'future' },
];

const kpiSparklines = {
  progress: [{ value: 10 }, { value: 15 }, { value: 20 }, { value: 22 }, { value: 25 }, { value: 29 }],
  contrib: [{ value: 2800 }, { value: 3200 }, { value: 2500 }, { value: 3500 }, { value: 3000 }, { value: 3200 }],
  pace: [{ value: 85 }, { value: 88 }, { value: 90 }, { value: 92 }, { value: 91 }, { value: 93 }],
  months: [{ value: 36 }, { value: 33 }, { value: 30 }, { value: 28 }, { value: 26 }, { value: monthsRemaining }],
};

export const GrowGoalDetail: React.FC = () => {
  const contract = getRouteScreenContract('grow');

  const mainContent = (
    <>
      {/* Progress ring */}
      <article className="engine-card">
        <ScoreRing
          score={progressPct}
          label={goal.name}
          subtitle={`$${goal.current.toLocaleString()} / $${goal.target.toLocaleString()}`}
          statusText={`On track — ${monthsRemaining} months remaining`}
          color="var(--accent-violet)"
          size="lg"
        />
        <ProofLine
          claim={`${progressPct}% complete`}
          evidence={`$${remaining.toLocaleString()} remaining | $${goal.aiRecommendation.monthlyContribution}/mo contribution`}
          source="Grow goal tracker"
          sourceType="model"
        />
      </article>

      {/* Contribution chart */}
      <article className="engine-card">
        <MissionSectionHeader
          title="Monthly contributions"
          message="Track your savings contributions over time."
        />
        <ContributionChart
          data={contributionData}
          targetMonthly={goal.aiRecommendation.monthlyContribution}
          accentColor="var(--engine-grow)"
        />
        <DefinitionLine
          metric="Target contribution"
          formula="remaining / months_to_deadline"
          unit="USD/month"
          period="per-goal"
        />
      </article>

      <GovernContractSet
        auditId="GV-2026-0212-GRW-GOAL"
        modelVersion="v3.2"
        explanationVersion="xai-1.1"
      />
    </>
  );

  const sideContent = (
    <>
      {/* AI recommendation */}
      <article className="engine-card" style={{ borderLeft: '3px solid var(--accent-violet)' }}>
        <MissionSectionHeader
          title="AI recommendation"
          message={`Increasing monthly savings by $200 would move your target date ${monthsRemaining > 3 ? 'forward by ~2 months' : 'is already optimized'}.`}
        />
        <ProofLine
          claim="Optimization available"
          evidence={`Current: $${goal.aiRecommendation.monthlyContribution}/mo | Suggested: $${goal.aiRecommendation.monthlyContribution + 200}/mo`}
          source="Grow engine"
          sourceType="model"
        />
      </article>

      {/* Milestones */}
      <article className="engine-card">
        <MissionSectionHeader title="Milestones" />
        <MilestonesTimeline milestones={milestones} accentColor="var(--accent-violet)" />
      </article>

      {/* Actions */}
      <article className="engine-card">
        <MissionSectionHeader title="Actions" />
        <div className="mission-dual-actions">
          <Link className="entry-btn entry-btn--primary" to="/grow">Adjust goal</Link>
          <Link className="entry-btn entry-btn--ghost" to="/execute">Add funds</Link>
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
        kicker: 'Goal Detail',
        engineBadge: 'Grow',
        headline: `${goal.name}: ${progressPct}% complete.`,
        subline: `$${remaining.toLocaleString()} remaining. Projected completion in ${monthsRemaining} months at current pace.`,
        valueStatement: `Contributing $${goal.aiRecommendation.monthlyContribution}/mo toward $${goal.target.toLocaleString()} target.`,
        proofLine: {
          claim: `Progress ${progressPct}%`,
          evidence: `$${goal.current.toLocaleString()} saved | $${goal.aiRecommendation.monthlyContribution}/mo pace`,
          source: 'Grow goal tracker',
        },
        heroAction: {
          label: 'Recommended:',
          text: 'Increase monthly contribution to accelerate your timeline.',
          cta: { label: 'Send to Execute →', to: '/execute' },
        },
        freshness: new Date(Date.now() - 10 * 60 * 1000),
        kpis: [
          { label: 'Progress', value: `${progressPct}%`, definition: 'Current vs target savings', accent: 'violet', sparklineData: kpiSparklines.progress, sparklineColor: 'var(--engine-grow)' },
          { label: 'Monthly avg', value: `$${goal.aiRecommendation.monthlyContribution}`, definition: 'Average monthly contribution', accent: 'teal', sparklineData: kpiSparklines.contrib, sparklineColor: 'var(--state-healthy)' },
          { label: 'On-track score', value: '93%', definition: 'Likelihood of reaching goal on time', accent: 'cyan', sparklineData: kpiSparklines.pace, sparklineColor: '#00F0FF' },
          { label: 'Months left', value: String(monthsRemaining), definition: 'Estimated months to goal completion', accent: 'amber', sparklineData: kpiSparklines.months, sparklineColor: 'var(--state-warning)' },
        ],
      }}
      primaryFeed={mainContent}
      decisionRail={sideContent}
    />
  );
};

export default GrowGoalDetail;
