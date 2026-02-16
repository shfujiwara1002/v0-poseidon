import React from 'react';
import { Link } from '../router';
import { PageShell } from '../components/PageShell';
import { ExplainableInsightPanel } from '../components/ExplainabilityPanel';
import { FactorsDropdown } from '../components/FactorsDropdown';
import { GovernContractSet } from '../components/GovernContractSet';
import { MissionSectionHeader } from '../components/MissionSectionHeader';
import { ProofLine } from '../components/ProofLine';
import { getRouteScreenContract } from '../contracts/route-screen-contracts';

interface Insight {
  id: string;
  title: string;
  summary: string;
  confidence: number;
  recency: string;
  engine: string;
  topFactors: Array<{ label: string; contribution: number; note?: string }>;
  allFactors: Array<{ label: string; contribution: number; note?: string }>;
  whyItMatters: string;
  auditId: string;
  actionRoute: string;
  actionLabel: string;
}

const insights: Insight[] = [
  {
    id: 'INS-001',
    title: 'Subscription consolidation opportunity',
    summary: 'Three overlapping services detected. Consolidating could save $140/mo with minimal disruption.',
    confidence: 0.89,
    recency: '5 min ago',
    engine: 'Grow',
    topFactors: [
      { label: 'Service overlap', contribution: 0.92, note: '3 duplicates found' },
      { label: 'Cost impact', contribution: 0.88, note: '$140/mo potential' },
      { label: 'Usage frequency', contribution: 0.45, note: 'Low usage on 2 services' },
    ],
    allFactors: [
      { label: 'Service overlap', contribution: 0.92 },
      { label: 'Cost impact', contribution: 0.88 },
      { label: 'Usage frequency', contribution: 0.45 },
      { label: 'Contract flexibility', contribution: 0.72 },
      { label: 'Feature coverage', contribution: 0.65 },
      { label: 'Migration effort', contribution: -0.22 },
    ],
    whyItMatters: 'Consolidating reduces recurring costs while maintaining the same service coverage.',
    auditId: 'GV-2026-0212-INS1',
    actionRoute: '/execute',
    actionLabel: 'Create action →',
  },
  {
    id: 'INS-002',
    title: 'Cash flow anomaly — vendor charge pattern',
    summary: 'Recurring vendor charges increased 23% over 60 days without corresponding service changes.',
    confidence: 0.84,
    recency: '15 min ago',
    engine: 'Protect',
    topFactors: [
      { label: 'Charge variance', contribution: 0.87, note: '+23% increase' },
      { label: 'Historical baseline', contribution: 0.81 },
      { label: 'Pattern deviation', contribution: 0.76 },
    ],
    allFactors: [
      { label: 'Charge variance', contribution: 0.87 },
      { label: 'Historical baseline', contribution: 0.81 },
      { label: 'Pattern deviation', contribution: 0.76 },
      { label: 'Vendor category risk', contribution: 0.55 },
      { label: 'Similar user reports', contribution: 0.42 },
    ],
    whyItMatters: 'Unexplained charge increases may indicate unauthorized billing changes.',
    auditId: 'GV-2026-0212-INS2',
    actionRoute: '/protect/alert-detail',
    actionLabel: 'Investigate →',
  },
  {
    id: 'INS-003',
    title: 'Optimal save-day identified',
    summary: 'Based on income pattern, transferring surplus on the 3rd yields 12% higher savings rate.',
    confidence: 0.91,
    recency: '1h ago',
    engine: 'Execute',
    topFactors: [
      { label: 'Income timing', contribution: 0.94 },
      { label: 'Buffer adequacy', contribution: 0.82 },
      { label: 'Expense clustering', contribution: 0.68 },
    ],
    allFactors: [
      { label: 'Income timing', contribution: 0.94 },
      { label: 'Buffer adequacy', contribution: 0.82 },
      { label: 'Expense clustering', contribution: 0.68 },
      { label: 'Interest optimization', contribution: 0.56 },
      { label: 'Risk of overdraft', contribution: -0.15 },
    ],
    whyItMatters: 'Timing transfers to income patterns maximizes savings yield while maintaining safety buffer.',
    auditId: 'GV-2026-0212-INS3',
    actionRoute: '/execute',
    actionLabel: 'Schedule transfer →',
  },
];

const kpiSparklines = {
  generated: [{ value: 8 }, { value: 10 }, { value: 12 }, { value: 14 }, { value: 15 }, { value: 16 }],
  acted: [{ value: 5 }, { value: 6 }, { value: 7 }, { value: 8 }, { value: 9 }, { value: 10 }],
  accuracy: [{ value: 85 }, { value: 86 }, { value: 87 }, { value: 88 }, { value: 89 }, { value: 89 }],
  impact: [{ value: 120 }, { value: 130 }, { value: 140 }, { value: 150 }, { value: 155 }, { value: 160 }],
};

export const InsightsFeed: React.FC = () => {
  const contract = getRouteScreenContract('insights-feed');

  const mainContent = (
    <>
      <section className="engine-section">
        <MissionSectionHeader
          title="Active insights"
          message="Each insight verified by Govern engine."
          contextCue="Act on this insight to execute a recommendation"
        />
        <div className="engine-item-list">
          {insights.map((insight) => (
            <div key={insight.id} className="insight-card-wrapper">
              <ExplainableInsightPanel
                title={insight.title}
                summary={insight.summary}
                topFactors={insight.topFactors}
                allFactors={insight.allFactors}
                confidence={insight.confidence}
                recency={insight.recency}
                governMeta={{
                  auditId: insight.auditId,
                  modelVersion: 'v3.2',
                  explanationVersion: 'xai-1.1',
                  timestamp: new Date().toISOString(),
                }}
                actions={(
                  <Link to={insight.actionRoute} className="entry-btn entry-btn--primary">
                    {insight.actionLabel}
                  </Link>
                )}
              />
              <FactorsDropdown
                allFactors={insight.allFactors}
                whyItMatters={insight.whyItMatters}
                initialVisible={3}
              />
              <ProofLine
                claim={`Insight ${insight.id}`}
                evidence={`${insight.engine} engine · ${Math.round(insight.confidence * 100)}% confidence`}
                source="Cross-engine analysis"
                basis="rolling 90d"
                sourceType="model"
              />
            </div>
          ))}
        </div>
      </section>

      <GovernContractSet
        auditId="GV-2026-0212-FEED"
        modelVersion="v3.2"
        explanationVersion="xai-1.1"
      />
    </>
  );

  const sideContent = (
    <article className="engine-card">
      <MissionSectionHeader
        title="Insight sources"
        message="All insights are cross-engine verified."
      />
      <ProofLine
        claim="3 engines contributing"
        evidence="Protect + Grow + Execute"
        source="Real-time"
        sourceType="model"
      />
    </article>
  );

  return (
    <PageShell
      slug="protect"
      contract={contract}
      layout="engine"
      heroVariant="editorial"
      hero={{
        kicker: 'AI Insights',
        headline: 'Evidence-backed recommendations.',
        subline: contract.oneScreenMessage,
        proofLine: {
          claim: '16 insights this month',
          evidence: 'Cross-engine analysis with explainable factors | Each verified by Govern',
          source: 'Insight composite',
        },
        freshness: new Date(Date.now() - 15 * 60 * 1000),
        kpis: [
          { label: 'Generated', value: '16', delta: '+4', definition: 'Insights generated this month', accent: 'cyan', sparklineData: kpiSparklines.generated, sparklineColor: '#00F0FF' },
          { label: 'Acted on', value: '10', delta: '63%', definition: 'Insights that led to user actions', accent: 'teal', sparklineData: kpiSparklines.acted, sparklineColor: 'var(--state-healthy)' },
          { label: 'Accuracy', value: '89%', delta: '+4%', definition: 'User-confirmed insight relevance', accent: 'blue', sparklineData: kpiSparklines.accuracy, sparklineColor: 'var(--state-primary)' },
          { label: 'Impact', value: '$160', delta: '+$40', definition: 'Estimated monthly savings from acted insights', accent: 'amber', sparklineData: kpiSparklines.impact, sparklineColor: 'var(--state-warning)' },
        ],
      }}
      primaryFeed={mainContent}
      decisionRail={sideContent}
    />
  );
};

export default InsightsFeed;
