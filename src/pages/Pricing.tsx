import React from 'react';
import { Link } from '../router';
import { PageShell } from '../components/PageShell';
import { DefinitionLine } from '../components/DefinitionLine';
import { MissionActionList } from '../components/MissionActionList';
import { MissionSectionHeader } from '../components/MissionSectionHeader';
import { ProofLine } from '../components/ProofLine';
import { getRouteScreenContract } from '../contracts/route-screen-contracts';

const tiers = [
  {
    name: 'Starter',
    price: '$0',
    period: '/mo',
    features: ['Dashboard + Protect', 'Up to 3 accounts', 'Basic audit trail', 'Community support'],
    cta: 'Start free',
    accent: 'teal',
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/mo',
    features: ['All 4 engines', 'Unlimited accounts', 'Full audit + governance', 'Priority 4h SLA', 'Scenario simulator'],
    cta: 'Start 14-day trial',
    accent: 'cyan',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    features: ['Dedicated instance', 'Custom policy models', 'SOX compliance module', 'Dedicated success manager', 'SLA: 1h response'],
    cta: 'Contact sales',
    accent: 'violet',
  },
];

const kpiSparklines = {
  savings: [{ value: 85 }, { value: 110 }, { value: 125 }, { value: 140 }, { value: 155 }, { value: 168 }],
  roi: [{ value: 2.1 }, { value: 2.8 }, { value: 3.5 }, { value: 4.2 }, { value: 4.8 }, { value: 5.2 }],
  time: [{ value: 12 }, { value: 10 }, { value: 8 }, { value: 7 }, { value: 6 }, { value: 5 }],
  adoption: [{ value: 70 }, { value: 75 }, { value: 80 }, { value: 84 }, { value: 88 }, { value: 91 }],
};

export const Pricing: React.FC = () => {
  const contract = getRouteScreenContract('pricing');

  const mainContent = (
    <>
      <article className="engine-card" data-slot="plans">
        <MissionSectionHeader
          title="Plans"
          message="Transparent pricing with governance included at every tier."
          contextCue="All plans include audit trails and explainability"
        />
        <div className="entry-engine-grid">
          {tiers.map((tier) => (
            <article
              key={tier.name}
              className={`entry-engine-card${tier.highlighted ? ' entry-engine-card--highlighted' : ''}`}
            >
              <h3>{tier.name}</h3>
              <div className="entry-price">
                <strong>{tier.price}</strong>
                <span>{tier.period}</span>
              </div>
              <ul>
                {tier.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <Link className="entry-btn entry-btn--primary" to="/signup">{tier.cta}</Link>
            </article>
          ))}
        </div>
        <ProofLine
          claim="Avg savings $168/mo"
          evidence="Across Pro users in first 90 days"
          source="Customer analytics"
          basis="rolling 90d"
          sourceType="observed"
        />
      </article>

      <article className="engine-card">
        <MissionSectionHeader
          title="Value breakdown"
          message="Why governance is never paywalled."
        />
        <DefinitionLine
          metric="Governance inclusion"
          formula="govern_features_included / total_govern_features"
          unit="ratio"
          period="all plans"
          threshold="100%"
        />
        <ProofLine
          claim="Governance included"
          evidence="All plans enforce fail-closed AI safety | No hidden fees"
          source="Pricing policy"
          basis="policy"
          sourceType="policy"
        />
      </article>
    </>
  );

  const sideContent = (
    <>
      <article className="engine-card">
        <MissionSectionHeader
          title="Why Pro?"
          message="Key features that differentiate Pro from Starter."
        />
        <MissionActionList
          items={[
            { title: 'Full scenario simulator', meta: 'Grow engine', tone: 'healthy' },
            { title: 'Priority human review', meta: '4h SLA', tone: 'primary' },
            { title: 'Unlimited audit history', meta: 'Govern engine', tone: 'warning' },
          ]}
        />
      </article>

      <article className="engine-card">
        <MissionSectionHeader
          title="FAQ"
          message="Common questions about plans and billing."
        />
        <div className="entry-surface-grid">
          <article>
            <h3>Can I cancel anytime?</h3>
            <p>Yes. No lock-in. Data export available within 24h.</p>
          </article>
          <article>
            <h3>Is my data safe?</h3>
            <p>End-to-end encrypted. SOC 2 Type II certified.</p>
          </article>
        </div>
        <div className="dashboard-side-actions">
          <Link className="entry-btn entry-btn--primary" to="/signup">Start free</Link>
          <Link className="entry-btn entry-btn--ghost" to="/trust">Trust details</Link>
        </div>
      </article>
    </>
  );

  return (
    <PageShell
      slug="pricing"
      contract={contract}
      layout="dashboard"
      heroVariant="minimal"
      hero={{
        kicker: 'Pricing',
        headline: 'Transparent plans, governed by design.',
        subline: contract.oneScreenMessage,
        proofLine: {
          claim: 'ROI 5.2x',
          evidence: 'Average return across Pro customers | Savings tracked with evidence',
          source: 'Customer analytics',
        },
        freshness: new Date(Date.now() - 48 * 60 * 60 * 1000),
        kpis: [
          { label: 'Avg savings', value: '$168/mo', definition: 'Average monthly savings for Pro users', accent: 'teal', sparklineData: kpiSparklines.savings, sparklineColor: 'var(--state-healthy)' },
          { label: 'ROI', value: '5.2x', definition: 'Return on investment within first year', accent: 'cyan', sparklineData: kpiSparklines.roi, sparklineColor: '#00F0FF' },
          { label: 'Time saved', value: '5h/mo', definition: 'Average hours saved on financial decisions', accent: 'blue', sparklineData: kpiSparklines.time, sparklineColor: 'var(--state-primary)' },
          { label: 'Adoption', value: '91%', definition: 'Users who continue after trial period', accent: 'amber', sparklineData: kpiSparklines.adoption, sparklineColor: 'var(--state-warning)' },
        ],
      }}
      primaryFeed={mainContent}
      decisionRail={sideContent}
    />
  );
};

export default Pricing;
