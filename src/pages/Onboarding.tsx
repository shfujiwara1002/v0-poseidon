import React, { useMemo, useState } from 'react';
import { Link } from '../router';
import { PageShell } from '../components/PageShell';
import { MissionActionList } from '../components/MissionActionList';
import { MissionMetadataStrip } from '../components/MissionMetadataStrip';
import { MissionSectionHeader } from '../components/MissionSectionHeader';
import { ProofLine } from '../components/ProofLine';
import { getRouteScreenContract } from '../contracts/route-screen-contracts';

const onboardingSteps = [
  {
    title: 'Connect accounts',
    summary: 'Link cards and banks with read-only defaults.',
    trust: 'Confidence 0.94 | Updated now | Model v3.2',
    readiness: 'Data scope verified',
  },
  {
    title: 'Set guardrails',
    summary: 'Define budget caps and risk boundaries.',
    trust: 'Confidence 0.91 | Updated now | Policy G-ON-002',
    readiness: 'Policy constraints active',
  },
  {
    title: 'Approve automation',
    summary: 'Enable only reviewed actions.',
    trust: 'Confidence 0.90 | Updated now | Human review on',
    readiness: 'Execution gating locked',
  },
];

const kpiSparklines = {
  progress: [{ value: 33 }, { value: 38 }, { value: 44 }, { value: 52 }, { value: 66 }, { value: 100 }],
  trust: [{ value: 0.89 }, { value: 0.9 }, { value: 0.91 }, { value: 0.92 }, { value: 0.93 }, { value: 0.94 }],
  policy: [{ value: 84 }, { value: 86 }, { value: 88 }, { value: 90 }, { value: 93 }, { value: 96 }],
  readiness: [{ value: 72 }, { value: 76 }, { value: 81 }, { value: 85 }, { value: 90 }, { value: 94 }],
};

export const Onboarding: React.FC = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const activeStep = onboardingSteps[stepIndex];

  const baseContract = getRouteScreenContract('onboarding', { onboardingStepIndex: stepIndex });
  const completionContract = getRouteScreenContract('onboarding', { onboardingCompleted: true });

  const shellContract = useMemo(() => {
    if (stepIndex < onboardingSteps.length - 1) {
      return baseContract;
    }

    return {
      ...baseContract,
      transitionCue: completionContract.transitionCue,
      transitionTo: completionContract.transitionTo,
    };
  }, [baseContract, completionContract, stepIndex]);

  const mainContent = (
    <article className="engine-card" data-slot="onboarding_flow">
      <MissionSectionHeader
        title="Setup flow"
        message="Complete each step to activate governed workflows."
      />

      <div className="entry-onboard-grid">
        <aside className="entry-step-rail">
          {onboardingSteps.map((step, idx) => (
            <button
              key={step.title}
              type="button"
              className={`entry-step-item${idx === stepIndex ? ' is-active' : ''}${idx < stepIndex ? ' is-done' : ''}`}
              onClick={() => setStepIndex(idx)}
            >
              <span>{idx < stepIndex ? '✓' : idx + 1}</span>
              <div>
                <strong>{step.title}</strong>
                <small>{step.summary}</small>
              </div>
            </button>
          ))}
        </aside>

        <section className="entry-onboard-main">
          <div
            className="entry-progress-bar"
            role="progressbar"
            aria-valuenow={stepIndex + 1}
            aria-valuemin={1}
            aria-valuemax={onboardingSteps.length}
            aria-label="Onboarding progress"
          >
            {onboardingSteps.map((_, idx) => (
              <div
                key={`progress-${idx}`}
                className={`entry-progress-segment${idx <= stepIndex ? ' entry-progress-segment--filled' : ''}${idx === stepIndex ? ' entry-progress-segment--active' : ''}`}
              />
            ))}
          </div>
          <header>
            <p className="entry-kicker">Step {stepIndex + 1} of {onboardingSteps.length}</p>
            <h1>{activeStep.title}</h1>
            <p className="entry-subline">{activeStep.summary}</p>
          </header>

          <ProofLine
            claim={`Step ${stepIndex + 1} validated`}
            evidence={activeStep.trust}
            source="Onboarding governance flow"
            basis="per-step"
            sourceType="system"
          />

          <div className="entry-surface-grid">
            <article>
              <h3>Summary first</h3>
              <p>Primary signals and one next action stay visible above the fold.</p>
            </article>
            <article>
              <h3>Details on demand</h3>
              <p>Factors and policy context expand only when requested.</p>
            </article>
            <article>
              <h3>Govern ready</h3>
              <p>Audit and human review remain attached to every risky recommendation.</p>
            </article>
          </div>

          <footer className="entry-onboard-actions">
            <button
              type="button"
              className="entry-btn entry-btn--ghost"
              onClick={() => setStepIndex((prev) => Math.max(0, prev - 1))}
            >
              Back
            </button>
            {stepIndex < onboardingSteps.length - 1 ? (
              <button
                type="button"
                className="entry-btn entry-btn--primary"
                onClick={() => setStepIndex((prev) => Math.min(onboardingSteps.length - 1, prev + 1))}
              >
                Next step
              </button>
            ) : (
              <Link className="entry-btn entry-btn--primary" to="/dashboard">
                Finish setup
              </Link>
            )}
          </footer>
        </section>
      </div>
    </article>
  );

  const sideContent = (
    <>
      <article className="engine-card">
        <MissionSectionHeader
          title="Step status"
          message="Current progress and readiness indicators."
        />
        <MissionMetadataStrip
          compact
          items={[
            `Step ${stepIndex + 1} / ${onboardingSteps.length}`,
            activeStep.readiness,
            'Human review on',
          ]}
        />
        <MissionActionList
          items={[
            { title: activeStep.title, meta: 'Current', tone: 'primary' },
            { title: 'Complete all steps', meta: 'Required', tone: 'warning' },
            { title: 'Launch dashboard', meta: 'Final', tone: 'healthy' },
          ]}
        />
      </article>

      <article className="engine-card">
        <MissionSectionHeader
          title="Operational context"
          message="Governance metrics for the current onboarding session."
        />
        <div className="entry-kpi-grid">
          <article>
            <small>Policy coverage</small>
            <strong>96%</strong>
          </article>
          <article>
            <small>Rollback ready</small>
            <strong>100%</strong>
          </article>
          <article>
            <small>Ownership</small>
            <strong>Tracked</strong>
          </article>
          <article>
            <small>Audit link</small>
            <strong>Live</strong>
          </article>
        </div>
      </article>
    </>
  );

  const rail = (
    <article className="engine-card mission-rail-card">
      <MissionMetadataStrip
        compact
        items={['Guided setup', 'Contract-driven flow', 'Transition to dashboard enforced']}
      />
    </article>
  );

  return (
    <PageShell
      slug="onboarding"
      contract={shellContract}
      layout="dashboard"
      heroVariant="minimal"
      hero={{
        kicker: 'Onboarding',
        headline: 'Activate decision-ready workflows.',
        subline: shellContract.oneScreenMessage,
        proofLine: {
          claim: `Confidence ${(0.94 - stepIndex * 0.02).toFixed(2)}`,
          evidence: activeStep.trust,
          source: 'Onboarding governance flow',
        },
        heroAction: {
          label: 'Recommended:',
          text: stepIndex < onboardingSteps.length - 1
            ? 'Finish all steps before enabling autonomous execution.'
            : 'Finalize setup and open the dashboard with governed defaults.',
          cta: {
            label: stepIndex < onboardingSteps.length - 1 ? 'Continue setup →' : 'Open dashboard →',
            to: stepIndex < onboardingSteps.length - 1 ? '/onboarding' : '/dashboard',
          },
        },
        freshness: new Date(),
        kpis: [
          {
            label: 'Progress',
            value: `${Math.round(((stepIndex + 1) / onboardingSteps.length) * 100)}%`,
            definition: 'Completion ratio across required setup steps',
            accent: 'blue',
            sparklineData: kpiSparklines.progress,
            sparklineColor: 'var(--state-primary)',
          },
          {
            label: 'Flow trust',
            value: (0.94 - stepIndex * 0.02).toFixed(2),
            definition: 'Confidence that current setup stage is validated',
            accent: 'teal',
            sparklineData: kpiSparklines.trust,
            sparklineColor: 'var(--state-healthy)',
          },
          {
            label: 'Policy sync',
            value: `${86 + stepIndex * 5}%`,
            definition: 'Coverage of required policy defaults for activation',
            accent: 'cyan',
            sparklineData: kpiSparklines.policy,
            sparklineColor: '#00F0FF',
          },
          {
            label: 'Readiness',
            value: `${80 + stepIndex * 7}%`,
            definition: 'Operational readiness to transition into dashboard mode',
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

export default Onboarding;
