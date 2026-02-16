import React, { useState } from 'react';
import { Link, useRouter } from '../router';
import { PageShell } from '../components/PageShell';
import { MissionActionList } from '../components/MissionActionList';
import { MissionMetadataStrip } from '../components/MissionMetadataStrip';
import { MissionSectionHeader } from '../components/MissionSectionHeader';
import { ProofLine } from '../components/ProofLine';
import { getRouteScreenContract } from '../contracts/route-screen-contracts';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const kpiSparklines = {
  success: [{ value: 96 }, { value: 96.5 }, { value: 97 }, { value: 97.2 }, { value: 97.5 }, { value: 97.8 }],
  speed: [{ value: 2.1 }, { value: 2.0 }, { value: 1.9 }, { value: 1.8 }, { value: 1.8 }, { value: 1.7 }],
  sessions: [{ value: 4200 }, { value: 4350 }, { value: 4500 }, { value: 4600 }, { value: 4700 }, { value: 4800 }],
  mfa: [{ value: 88 }, { value: 89 }, { value: 90 }, { value: 91 }, { value: 92 }, { value: 93 }],
};

export const Login: React.FC = () => {
  const { navigate } = useRouter();
  const contract = getRouteScreenContract('login');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const emailOk = EMAIL_RE.test(email);
  const canContinue = emailOk && password.length >= 8;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (!canContinue) return;
    navigate('/dashboard');
  };

  const mainContent = (
    <article className="engine-card" data-slot="login_form">
      <MissionSectionHeader
        title="Sign in to your account"
        message="Authenticate to access your command center session."
      />

      <form className="entry-form" onSubmit={handleSubmit} noValidate>
        <label>
          <span>Email</span>
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
            placeholder="Enter your password"
          />
        </label>

        {submitted && !canContinue && (
          <p className="entry-error">Enter a valid email and password (8+ chars).</p>
        )}

        <button type="submit" className="entry-btn entry-btn--primary entry-btn--block">
          Sign in
        </button>

        <div className="mission-dual-actions">
          <Link className="entry-link-minor" to="/recovery">Forgot password?</Link>
          <Link className="entry-link-minor" to="/signup">Create account</Link>
        </div>
      </form>
      <ProofLine
        claim="Secure session"
        evidence="Encrypted | MFA active | Audit-logged"
        source="Authentication engine"
        basis="per-session"
        sourceType="system"
      />
    </article>
  );

  const sideContent = (
    <article className="engine-card">
      <MissionSectionHeader
        title="Session security"
        message="Security measures active for all authentication events."
      />
      <MissionMetadataStrip
        compact
        items={['Encrypted session', 'Fail-closed defaults', 'Audit-logged']}
      />
      <MissionActionList
        items={[
          { title: 'Use work email', meta: 'Recommended', tone: 'primary' },
          { title: 'MFA enabled', meta: 'Active', tone: 'healthy' },
          { title: 'Session timeout', meta: '30min', tone: 'warning' },
        ]}
      />
    </article>
  );

  const rail = (
    <article className="engine-card mission-rail-card">
      <MissionMetadataStrip
        compact
        items={['Secure login', 'Human review on critical actions']}
      />
    </article>
  );

  return (
    <PageShell
      slug="login"
      contract={contract}
      layout="dashboard"
      heroVariant="minimal"
      hero={{
        kicker: 'Login',
        headline: 'Welcome back.',
        subline: contract.oneScreenMessage,
        proofLine: {
          claim: 'Secure session',
          evidence: 'Encrypted | MFA active | Audit-logged',
          source: 'Authentication engine',
        },
        freshness: new Date(Date.now() - 5 * 60 * 1000),
        kpis: [
          { label: 'Login success', value: '97.8%', definition: 'Successful authentication rate', accent: 'teal', sparklineData: kpiSparklines.success, sparklineColor: 'var(--state-healthy)' },
          { label: 'Median time', value: '1.7s', definition: 'Average login completion time', accent: 'blue', sparklineData: kpiSparklines.speed, sparklineColor: 'var(--state-primary)' },
          { label: 'Active sessions', value: '4,800', definition: 'Concurrent authenticated sessions', accent: 'cyan', sparklineData: kpiSparklines.sessions, sparklineColor: '#00F0FF' },
          { label: 'MFA adoption', value: '93%', definition: 'Users with multi-factor authentication', accent: 'amber', sparklineData: kpiSparklines.mfa, sparklineColor: 'var(--state-warning)' },
        ],
      }}
      rail={rail}
      primaryFeed={mainContent}
      decisionRail={sideContent}
    />
  );
};

export default Login;
