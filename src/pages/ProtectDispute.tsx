import React, { useState } from 'react';
import { Link } from '../router';
import { DefinitionLine } from '../components/DefinitionLine';
import { PageShell } from '../components/PageShell';
import { GovernContractSet } from '../components/GovernContractSet';
import { HumanReviewCTA } from '../components/HumanReviewCTA';
import { MissionSectionHeader } from '../components/MissionSectionHeader';
import { ProofLine } from '../components/ProofLine';
import { getRouteScreenContract } from '../contracts/route-screen-contracts';

const kpiSparklines = {
  open: [{ value: 3 }, { value: 2 }, { value: 2 }, { value: 1 }, { value: 1 }, { value: 1 }],
  sla: [{ value: 3.8 }, { value: 3.5 }, { value: 3.2 }, { value: 3.0 }, { value: 2.8 }, { value: 2.5 }],
  resolved: [{ value: 88 }, { value: 90 }, { value: 92 }, { value: 93 }, { value: 95 }, { value: 96 }],
  overturned: [{ value: 12 }, { value: 11 }, { value: 10 }, { value: 9 }, { value: 8 }, { value: 7 }],
};

export const ProtectDispute: React.FC = () => {
  const contract = getRouteScreenContract('protect-dispute');
  const [reason, setReason] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reason.trim().length > 10) setSubmitted(true);
  };

  const mainContent = (
    <>
      <article className="engine-card">
        <MissionSectionHeader
          title="Dispute a decision"
          message="Challenge any AI decision with full audit trail."
          contextCue="All disputes receive human review within SLA"
        />
        {!submitted ? (
          <form className="entry-form" onSubmit={handleSubmit} noValidate>
            <label>
              <span>Related alert</span>
              <input value="ALT-2026-0212-001 — Unusual transaction pattern" readOnly />
            </label>
            <label>
              <span>Reason for dispute</span>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Explain why you believe this decision was incorrect..."
                rows={4}
              />
            </label>
            <ProofLine
              claim="Human review"
              evidence="Disputes are escalated to a human reviewer within SLA"
              source="Governance policy"
              basis="per-dispute"
              sourceType="policy"
            />
            <button type="submit" className="entry-btn entry-btn--primary entry-btn--block">
              Submit dispute
            </button>
          </form>
        ) : (
          <div className="entry-form">
            <MissionSectionHeader
              title="Dispute submitted"
              message="Your dispute has been logged and assigned to a human reviewer."
            />
            <ProofLine
              claim="SLA: 4 hours"
              evidence="Dispute DIS-2026-0212-001 created | Audit trail active"
              source="Governance system"
              basis="per-dispute"
              sourceType="system"
            />
            <Link to="/protect" className="entry-btn entry-btn--ghost entry-btn--block">
              Back to Protect
            </Link>
          </div>
        )}
      </article>

      <article className="engine-card">
        <MissionSectionHeader
          title="Escalation"
          message="Human review is always available for any AI decision."
        />
        <HumanReviewCTA caseType="dispute" slaTarget="4h" />
        <DefinitionLine
          metric="Dispute SLA"
          formula="time(submitted, first_review)"
          unit="hours"
          period="per-dispute"
          threshold="< 4h"
        />
      </article>

      <GovernContractSet
        auditId="GV-2026-0212-DIS1"
        modelVersion="v3.2"
        explanationVersion="xai-1.1"
      />
    </>
  );

  const sideContent = (
    <article className="engine-card">
      <MissionSectionHeader
        title="Dispute process"
        message="Three-step resolution with full audit trail."
      />
      <div className="entry-surface-grid">
        <article>
          <h3>1. Submit</h3>
          <p>Provide reason and evidence for your dispute.</p>
        </article>
        <article>
          <h3>2. Review</h3>
          <p>Human reviewer evaluates within SLA window.</p>
        </article>
        <article>
          <h3>3. Resolution</h3>
          <p>Decision upheld or overturned with full audit.</p>
        </article>
      </div>
      <ProofLine
        claim="7% overturn rate"
        evidence="AI decisions overturned by human review in last 30 days"
        source="Dispute analytics"
        basis="30 days rolling"
        sourceType="system"
      />
    </article>
  );

  return (
    <PageShell
      slug="protect"
      contract={contract}
      layout="engine"
      heroVariant="focused"
      hero={{
        kicker: 'Dispute',
        headline: 'Challenge any AI decision.',
        subline: contract.oneScreenMessage,
        proofLine: {
          claim: 'Human sovereignty',
          evidence: 'Every dispute gets human review | 4h SLA guaranteed',
          source: 'Governance policy',
        },
        freshness: new Date(),
        kpis: [
          { label: 'Open disputes', value: '1', definition: 'Disputes awaiting review', accent: 'amber', sparklineData: kpiSparklines.open, sparklineColor: 'var(--state-warning)' },
          { label: 'Avg resolution', value: '2.5h', definition: 'Average time to resolve disputes', accent: 'teal', sparklineData: kpiSparklines.sla, sparklineColor: 'var(--state-healthy)' },
          { label: 'Resolved rate', value: '96%', definition: 'Disputes resolved within SLA', accent: 'blue', sparklineData: kpiSparklines.resolved, sparklineColor: 'var(--state-primary)' },
          { label: 'Overturned', value: '7%', definition: 'AI decisions overturned by review', accent: 'cyan', sparklineData: kpiSparklines.overturned, sparklineColor: '#00F0FF' },
        ],
      }}
      primaryFeed={mainContent}
      decisionRail={sideContent}
    />
  );
};

export default ProtectDispute;
