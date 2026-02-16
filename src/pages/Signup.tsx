import React, { useMemo, useState } from 'react';
import { Link, useRouter } from '../router';
import { PageShell } from '../components/PageShell';
import { MissionActionList } from '../components/MissionActionList';
import { MissionMetadataStrip } from '../components/MissionMetadataStrip';
import { MissionSectionHeader } from '../components/MissionSectionHeader';
import { ProofLine } from '../components/ProofLine';
import { getRouteScreenContract } from '../contracts/route-screen-contracts';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function passwordScore(password: string) {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  return score;
}

const kpiSparklines = {
  completion: [{ value: 82 }, { value: 83 }, { value: 84 }, { value: 86 }, { value: 88 }, { value: 89 }],
  speed: [{ value: 3.9 }, { value: 3.7 }, { value: 3.5 }, { value: 3.3 }, { value: 3.2 }, { value: 3.1 }],
  policy: [{ value: 95 }, { value: 96 }, { value: 96 }, { value: 97 }, { value: 98 }, { value: 98 }],
  verification: [{ value: 90 }, { value: 91 }, { value: 92 }, { value: 93 }, { value: 94 }, { value: 95 }],
};

export const Signup: React.FC = () => {
  const { navigate } = useRouter();
  const contract = getRouteScreenContract('signup');

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Founder');
  const [agree, setAgree] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const emailOk = EMAIL_RE.test(email);
  const pwScore = useMemo(() => passwordScore(password), [password]);
  const canContinue = fullName.trim().length >= 2 && emailOk && pwScore >= 2 && agree;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (!canContinue) return;
    navigate('/onboarding');
  };

  const mainContent = (
    <article className="engine-card" data-slot="signup_form">
      <MissionSectionHeader
        title="Create your studio account"
        message="Set up credentials to access the command center."
        contextCue="Use your work email to enable team invites from day one"
      />

      <form className="entry-form" onSubmit={handleSubmit} noValidate>
        <label>
          <span>Full name</span>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Aki Sato"
          />
        </label>
        <label>
          <span>Work email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
          />
        </label>
        <label>
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Use 8+ chars"
          />
          <div className="entry-strength">
            {[0, 1, 2, 3].map((i) => (
              <i key={i} className={pwScore > i ? 'is-on' : ''} />
            ))}
          </div>
        </label>
        <label>
          <span>Role</span>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option>Founder</option>
            <option>Operator</option>
            <option>Finance lead</option>
            <option>Risk manager</option>
          </select>
        </label>
        <label className="entry-check">
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
          <span>I agree to Terms and Privacy.</span>
        </label>

        {submitted && !canContinue && (
          <p className="entry-error">Complete all fields to continue.</p>
        )}

        <button type="submit" className="entry-btn entry-btn--primary entry-btn--block">
          Continue to onboarding
        </button>
      </form>
      <ProofLine
        claim="Governed signup"
        evidence="Account creation is audit-logged | Fail-closed defaults enabled"
        source="Activation telemetry"
        basis="per-event"
        sourceType="system"
      />
    </article>
  );

  const sideContent = (
    <>
      <article className="engine-card">
        <MissionSectionHeader
          title="Trust & provenance"
          message="Security guarantees applied during account creation."
        />
        <MissionMetadataStrip
          compact
          items={['Model v3.2', 'Govern fail-closed', 'Audit ownership tracked']}
        />
        <MissionActionList
          items={[
            { title: 'Use work email', meta: 'Required', tone: 'primary' },
            { title: 'Set strong password', meta: 'Min score 2', tone: 'warning' },
            { title: 'Review terms once', meta: '1 step', tone: 'healthy' },
          ]}
        />
      </article>

      <article className="engine-card">
        <MissionSectionHeader
          title="Why this flow"
          message="Design principles behind the signup experience."
        />
        <ul>
          <li><strong>Summary first:</strong> one-screen message and recommendation always above fold.</li>
          <li><strong>Evidence visible:</strong> confidence, recency, and model context in hero metadata.</li>
          <li><strong>Governed handoff:</strong> onboarding transition is explicit and auditable.</li>
        </ul>
        <div className="entry-kpi-grid">
          <article>
            <small>Audit coverage</small>
            <strong>98%</strong>
          </article>
          <article>
            <small>Median setup</small>
            <strong>3.1m</strong>
          </article>
        </div>
        <div className="dashboard-side-actions">
          <Link className="entry-btn entry-btn--ghost" to="/dashboard">Preview dashboard</Link>
          <Link className="entry-btn entry-btn--primary" to="/onboarding">Open onboarding</Link>
        </div>
      </article>
    </>
  );

  const rail = (
    <article className="engine-card mission-rail-card">
      <MissionMetadataStrip
        compact
        items={['Step 1 of 3', 'Account creation', 'Human review on critical actions']}
      />
    </article>
  );

  return (
    <PageShell
      slug="signup"
      contract={contract}
      layout="dashboard"
      heroVariant="minimal"
      hero={{
        kicker: 'Signup',
        headline: 'Create your studio account.',
        subline: contract.oneScreenMessage,
        proofLine: {
          claim: 'Confidence 0.89',
          evidence: 'Signup completion trend stable | Fail-closed defaults enabled',
          source: 'Activation telemetry',
        },
        heroAction: {
          label: 'Recommended:',
          text: 'Use your work email to enable team invites and audit ownership from day one.',
          cta: { label: 'Continue setup →', to: '/onboarding' },
        },
        freshness: new Date(Date.now() - 20 * 60 * 1000),
        kpis: [
          {
            label: 'Completion rate',
            value: '89%',
            definition: 'Users who complete signup without retries',
            accent: 'teal',
            sparklineData: kpiSparklines.completion,
            sparklineColor: 'var(--state-healthy)',
          },
          {
            label: 'Median time',
            value: '3.1m',
            definition: 'Time from first field input to onboarding handoff',
            accent: 'blue',
            sparklineData: kpiSparklines.speed,
            sparklineColor: 'var(--state-primary)',
          },
          {
            label: 'Policy clarity',
            value: '98%',
            definition: 'Users confirming terms without support intervention',
            accent: 'cyan',
            sparklineData: kpiSparklines.policy,
            sparklineColor: '#00F0FF',
          },
          {
            label: 'Verification readiness',
            value: '95%',
            definition: 'Accounts prepared for governed onboarding flow',
            accent: 'amber',
            sparklineData: kpiSparklines.verification,
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

export default Signup;
