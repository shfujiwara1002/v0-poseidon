import React, { useState } from 'react';
import { Link } from '../router';
import { PageShell } from '../components/PageShell';
import { MissionActionList } from '../components/MissionActionList';
import { MissionMetadataStrip } from '../components/MissionMetadataStrip';
import { MissionSectionHeader } from '../components/MissionSectionHeader';
import { ProofLine } from '../components/ProofLine';
import { getRouteScreenContract } from '../contracts/route-screen-contracts';

const kpiSparklines = {
  recovery: [{ value: 92 }, { value: 93 }, { value: 94 }, { value: 95 }, { value: 96 }, { value: 97 }],
  latency: [{ value: 4.5 }, { value: 4.2 }, { value: 3.8 }, { value: 3.5 }, { value: 3.2 }, { value: 2.8 }],
  policy: [{ value: 98 }, { value: 98 }, { value: 99 }, { value: 99 }, { value: 100 }, { value: 100 }],
  secure: [{ value: 100 }, { value: 100 }, { value: 100 }, { value: 100 }, { value: 100 }, { value: 100 }],
};

export const Recovery: React.FC = () => {
  const contract = getRouteScreenContract('recovery');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@')) setSubmitted(true);
  };

  const mainContent = (
    <article className="engine-card" data-slot="recovery_form">
      <MissionSectionHeader
        title="Account recovery"
        message="Securely reset your password with an audit-logged process."
      />
      {!submitted ? (
        <form className="entry-form" onSubmit={handleSubmit} noValidate>
          <label>
            <span>Email address</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
            />
          </label>
          <ProofLine
            claim="Secure recovery"
            evidence="Password reset link valid for 1 hour | Audit trail created"
            source="Security policy"
            basis="per-event"
            sourceType="policy"
          />
          <button type="submit" className="entry-btn entry-btn--primary entry-btn--block">
            Send recovery link
          </button>
        </form>
      ) : (
        <div className="entry-form">
          <MissionSectionHeader
            title="Check your email"
            message="Recovery instructions have been sent."
          />
          <p>If an account exists for <strong>{email}</strong>, you'll receive a recovery link within 2 minutes.</p>
          <ProofLine
            claim="Link sent"
            evidence="Recovery event logged to audit trail"
            source="Security system"
            basis="per-event"
            sourceType="system"
          />
          <Link to="/login" className="entry-btn entry-btn--ghost entry-btn--block">
            Back to login
          </Link>
        </div>
      )}
    </article>
  );

  const sideContent = (
    <>
      <article className="engine-card">
        <MissionSectionHeader
          title="Security notes"
          message="Safety guarantees during account recovery."
        />
        <MissionMetadataStrip
          compact
          items={['Reset link expires in 1h', 'Audit-logged event', 'No data exposed']}
        />
        <MissionActionList
          items={[
            { title: 'Check spam folder', meta: 'Common fix', tone: 'primary' },
            { title: 'Try alternate email', meta: 'If registered', tone: 'warning' },
            { title: 'Contact support', meta: '4h SLA', tone: 'healthy' },
          ]}
        />
      </article>
    </>
  );

  return (
    <PageShell
      slug="recovery"
      contract={contract}
      layout="dashboard"
      heroVariant="minimal"
      hero={{
        kicker: 'Recovery',
        headline: 'Regain access securely.',
        subline: contract.oneScreenMessage,
        proofLine: {
          claim: 'Secure process',
          evidence: 'All recovery attempts are audit-logged | No data disclosed',
          source: 'Security policy',
        },
        freshness: new Date(),
        kpis: [
          { label: 'Success rate', value: '97%', definition: 'Accounts successfully recovered', accent: 'teal', sparklineData: kpiSparklines.recovery, sparklineColor: 'var(--state-healthy)' },
          { label: 'Avg time', value: '2.8m', definition: 'Median time from request to access', accent: 'blue', sparklineData: kpiSparklines.latency, sparklineColor: 'var(--state-primary)' },
          { label: 'Policy compliance', value: '100%', definition: 'Recovery attempts matching security policy', accent: 'cyan', sparklineData: kpiSparklines.policy, sparklineColor: '#00F0FF' },
          { label: 'Zero disclosure', value: '100%', definition: 'No sensitive data exposed in recovery', accent: 'amber', sparklineData: kpiSparklines.secure, sparklineColor: 'var(--state-warning)' },
        ],
      }}
      primaryFeed={mainContent}
      decisionRail={sideContent}
    />
  );
};

export default Recovery;
