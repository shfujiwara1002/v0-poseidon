import React from 'react';
import { Link } from '../router';
import { IconShield, IconGrowth, IconLightning, IconGovernance } from '../assets/icons';
import { PageShell } from '../components/PageShell';
import { MissionActionList } from '../components/MissionActionList';
import { MissionMetadataStrip } from '../components/MissionMetadataStrip';
import { MissionSectionHeader } from '../components/MissionSectionHeader';
import { ProofLine } from '../components/ProofLine';
import { getRouteScreenContract } from '../contracts/route-screen-contracts';

const engineCards = [
  {
    key: 'protect',
    title: 'Protect',
    description: 'Risk alerts with explainable cause and clear owner actions.',
    icon: <IconShield size={16} />,
    cta: '/protect',
  },
  {
    key: 'grow',
    title: 'Grow',
    description: 'Forecasts with confidence bands and decision-ready drivers.',
    icon: <IconGrowth size={16} />,
    cta: '/grow',
  },
  {
    key: 'execute',
    title: 'Execute',
    description: 'Human-approved queue with fail-closed rollback controls.',
    icon: <IconLightning size={16} />,
    cta: '/execute',
  },
  {
    key: 'govern',
    title: 'Govern',
    description: 'Audit ledger, policy compliance, and transparent oversight.',
    icon: <IconGovernance size={16} />,
    cta: '/govern',
  },
];

const kpiSparklines = {
  confidence: [{ value: 0.88 }, { value: 0.89 }, { value: 0.9 }, { value: 0.91 }, { value: 0.92 }, { value: 0.92 }],
  coverage: [{ value: 93 }, { value: 94 }, { value: 95 }, { value: 96 }, { value: 97 }, { value: 98 }],
  latency: [{ value: 18 }, { value: 16 }, { value: 15 }, { value: 14 }, { value: 13 }, { value: 12 }],
  readiness: [{ value: 82 }, { value: 84 }, { value: 86 }, { value: 88 }, { value: 90 }, { value: 91 }],
};

export const Landing: React.FC = () => {
  const contract = getRouteScreenContract('landing');

  const mainContent = (
    <>
      <article className="engine-card" data-slot="engine_surfaces">
        <MissionSectionHeader
          title="Mission surfaces"
          message="Four engines working together for safer financial decisions."
          contextCue="Each engine provides explainable, auditable AI assistance"
        />
        <div className="entry-engine-grid">
          {engineCards.map((card) => (
            <article key={card.key} className="entry-engine-card">
              <div className="entry-engine-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <Link className="entry-link-minor" to={card.cta}>
                Open {card.title}
              </Link>
            </article>
          ))}
        </div>
        <ProofLine
          claim="4 engines integrated"
          evidence="Cross-engine trust composite | Evidence-backed decisions"
          source="Mission control"
          basis="real-time"
          sourceType="system"
        />
      </article>

      <article className="engine-card">
        <MissionSectionHeader
          title="Activation flow"
          message="Three steps to full command center access."
        />
        <section className="entry-flow-rail">
          <div>
            <span>01</span>
            <strong>Signup</strong>
          </div>
          <div>
            <span>02</span>
            <strong>Onboarding</strong>
          </div>
          <div>
            <span>03</span>
            <strong>Activate Studio</strong>
          </div>
        </section>
        <div className="dashboard-side-actions">
          <Link className="entry-btn entry-btn--primary" to="/signup">Create account</Link>
          <Link className="entry-btn entry-btn--ghost" to="/dashboard">Open dashboard</Link>
        </div>
      </article>
    </>
  );

  const sideContent = (
    <>
      <article className="engine-card">
        <MissionSectionHeader
          title="Live Trust Pulse"
          message="Real-time cross-engine health metrics."
          right={<span>Model v3.2</span>}
        />
        <div className="entry-kpi-grid">
          <article>
            <small>Confidence</small>
            <strong>0.92</strong>
          </article>
          <article>
            <small>Updated</small>
            <strong>2h</strong>
          </article>
          <article>
            <small>Coverage</small>
            <strong>98%</strong>
          </article>
          <article>
            <small>SLA</small>
            <strong>24h</strong>
          </article>
        </div>
        <div className="entry-meter-stack">
          <div><label>Healthy systems</label><i className="entry-meter--88" /></div>
          <div><label>Action readiness</label><i className="entry-meter--81" /></div>
          <div><label>Govern coverage</label><i className="entry-meter--94" /></div>
        </div>
      </article>

      <article className="engine-card">
        <MissionSectionHeader
          title="Next best actions"
          message="Recommended steps to get started."
        />
        <MissionActionList
          items={[
            { title: 'Start with signup', meta: '2 min', tone: 'primary' },
            { title: 'Complete onboarding in one pass', meta: '3 steps', tone: 'warning' },
            { title: 'Review dashboard recommendations', meta: 'Ready', tone: 'healthy' },
          ]}
        />
      </article>
    </>
  );

  const rail = (
    <article className="engine-card mission-rail-card">
      <MissionMetadataStrip
        compact
        items={['Audit-ready defaults', 'Model + policy visible', 'Human review always available']}
      />
    </article>
  );

  return (
    <PageShell
      slug="landing"
      contract={contract}
      layout="dashboard"
      heroVariant="minimal"
      hero={{
        kicker: 'Poseidon.AI',
        headline: 'Safer satisfying money decisions, in one place.',
        subline: 'Four AI engines — Protect, Grow, Execute, Govern — working together so you stay in control.',
        proofLine: {
          claim: 'Confidence 0.92',
          evidence: 'Cross-engine trust composite | 98% coverage',
          source: 'Mission control snapshot',
        },
        heroAction: {
          label: 'Recommended:',
          text: 'Create your account and complete onboarding to unlock full command center controls.',
          cta: { label: 'Start free →', to: '/signup' },
        },
        freshness: new Date(Date.now() - 2 * 60 * 60 * 1000),
        kpis: [
          {
            label: 'Trust confidence',
            value: '0.92',
            definition: 'Composite confidence across Protect, Grow, Execute, and Govern',
            accent: 'teal',
            sparklineData: kpiSparklines.confidence,
            sparklineColor: 'var(--state-healthy)',
          },
          {
            label: 'Coverage',
            value: '98%',
            definition: 'Percent of critical financial workflows with traceable evidence',
            accent: 'cyan',
            sparklineData: kpiSparklines.coverage,
            sparklineColor: '#00F0FF',
          },
          {
            label: 'Decision latency',
            value: '12m',
            definition: 'Median time from signal to reviewed recommendation',
            accent: 'blue',
            sparklineData: kpiSparklines.latency,
            sparklineColor: 'var(--state-primary)',
          },
          {
            label: 'Activation readiness',
            value: '91%',
            definition: 'Likelihood of completing setup in one guided session',
            accent: 'amber',
            sparklineData: kpiSparklines.readiness,
            sparklineColor: 'var(--state-warning)',
          },
        ],
      }}
      rail={rail}
      primaryFeed={mainContent}
      decisionRail={sideContent}
    />
  );
};

export default Landing;
