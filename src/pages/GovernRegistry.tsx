import React from 'react';
import { DefinitionLine } from '../components/DefinitionLine';
import { PageShell } from '../components/PageShell';
import { GovernContractSet } from '../components/GovernContractSet';
import { MissionDataRows } from '../components/MissionDataRows';
import { MissionSectionHeader } from '../components/MissionSectionHeader';
import { ProofLine } from '../components/ProofLine';
import { getRouteScreenContract } from '../contracts/route-screen-contracts';

const explanationFormats = [
  { id: 'EF-001', name: 'SHAP-based factor decomposition', version: '1.1', engine: 'Protect', status: 'Active', tone: 'healthy' as const },
  { id: 'EF-002', name: 'Confidence band visualization', version: '1.0', engine: 'Grow', status: 'Active', tone: 'healthy' as const },
  { id: 'EF-003', name: 'Action outcome preview', version: '1.2', engine: 'Execute', status: 'Active', tone: 'healthy' as const },
  { id: 'EF-004', name: 'Natural language summary', version: '2.0', engine: 'All', status: 'Active', tone: 'healthy' as const },
  { id: 'EF-005', name: 'Counterfactual alternatives', version: '0.9', engine: 'Protect', status: 'Beta', tone: 'warning' as const },
];

const kpiSparklines = {
  formats: [{ value: 3 }, { value: 4 }, { value: 4 }, { value: 5 }, { value: 5 }, { value: 5 }],
  coverage: [{ value: 90 }, { value: 92 }, { value: 94 }, { value: 96 }, { value: 97 }, { value: 98 }],
  versions: [{ value: 8 }, { value: 9 }, { value: 10 }, { value: 11 }, { value: 12 }, { value: 12 }],
  engines: [{ value: 4 }, { value: 4 }, { value: 4 }, { value: 4 }, { value: 4 }, { value: 4 }],
};

export const GovernRegistry: React.FC = () => {
  const contract = getRouteScreenContract('govern-registry');

  const mainContent = (
    <>
      <section className="engine-section" data-slot="format_registry">
        <MissionSectionHeader
          title="Explanation format registry"
          message="Standardized formats ensuring every AI decision is human-readable."
          contextCue="Each format is versioned and auditable across engines"
        />
        <MissionDataRows
          items={explanationFormats.map((fmt) => ({
            id: fmt.id,
            title: fmt.name,
            value: `v${fmt.version}`,
            detail: `${fmt.engine} · ${fmt.status}`,
            tone: fmt.tone,
          }))}
        />
        <ProofLine
          claim="5 explanation formats"
          evidence="4 active + 1 beta | All engines covered"
          source="Registry v2.0"
          basis="all time"
          sourceType="system"
        />
        <DefinitionLine
          metric="Format coverage"
          formula="decisions_with_registered_format / total_decisions"
          unit="percentage"
          period="30 days rolling"
          threshold="95%"
        />
      </section>

      <article className="engine-card" data-slot="format_standards">
        <MissionSectionHeader
          title="Format standards"
          message="Design principles governing all explanation formats."
        />
        <div className="entry-surface-grid">
          <article>
            <h3>Human-readable</h3>
            <p>Every explanation must be understandable without technical knowledge.</p>
          </article>
          <article>
            <h3>Auditable</h3>
            <p>Every format produces a persistent, verifiable record.</p>
          </article>
          <article>
            <h3>Versioned</h3>
            <p>Format changes are tracked and backward-compatible.</p>
          </article>
        </div>
        <ProofLine
          claim="3 design principles"
          evidence="Human-readable, auditable, and versioned — enforced across all formats"
          source="Govern registry"
          basis="policy"
          sourceType="policy"
        />
      </article>

      <GovernContractSet
        auditId="GV-2026-0212-REG"
        modelVersion="v3.2"
        explanationVersion="xai-2.0"
      />
    </>
  );

  const sideContent = (
    <article className="engine-card">
      <MissionSectionHeader
        title="Registry stats"
        message="Summary of registered explanation formats."
      />
      <MissionDataRows
        items={[
          { id: 'RS-1', title: 'Total formats', value: '5', tone: 'primary' },
          { id: 'RS-2', title: 'Active', value: '4', tone: 'healthy' },
          { id: 'RS-3', title: 'Beta', value: '1', tone: 'warning' },
          { id: 'RS-4', title: 'Deprecated', value: '0', tone: 'healthy' },
        ]}
      />
      <DefinitionLine
        metric="Registry completeness"
        formula="engines_with_format / total_engines"
        unit="ratio"
        period="current"
        threshold="4/4"
      />
    </article>
  );

  return (
    <PageShell
      slug="govern"
      contract={contract}
      layout="engine"
      heroVariant="analytical"
      hero={{
        kicker: 'Explanation Registry',
        headline: 'How AI explains its decisions.',
        subline: contract.oneScreenMessage,
        proofLine: {
          claim: '5 registered formats',
          evidence: 'All standardized, versioned, and auditable',
          source: 'Govern registry',
        },
        freshness: new Date(Date.now() - 24 * 60 * 60 * 1000),
        kpis: [
          { label: 'Formats', value: '5', definition: 'Registered explanation formats', accent: 'blue', sparklineData: kpiSparklines.formats, sparklineColor: 'var(--state-primary)' },
          { label: 'Coverage', value: '98%', definition: 'Decisions using registered format', accent: 'teal', sparklineData: kpiSparklines.coverage, sparklineColor: 'var(--state-healthy)' },
          { label: 'Versions', value: '12', definition: 'Total format versions tracked', accent: 'cyan', sparklineData: kpiSparklines.versions, sparklineColor: '#00F0FF' },
          { label: 'Engines', value: '4/4', definition: 'Engines with registered formats', accent: 'amber', sparklineData: kpiSparklines.engines, sparklineColor: 'var(--state-warning)' },
        ],
      }}
      primaryFeed={mainContent}
      decisionRail={sideContent}
    />
  );
};

export default GovernRegistry;
