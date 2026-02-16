import React from 'react';
import { Link } from '../router';
import { PageShell } from '../components/PageShell';
import { MissionActionList } from '../components/MissionActionList';
import { MissionEmptyState } from '../components/MissionEmptyState';
import { MissionSectionHeader } from '../components/MissionSectionHeader';
import { ProofLine } from '../components/ProofLine';
import { getRouteScreenContract } from '../contracts/route-screen-contracts';

const kpiSparklines = {
  recovery: [{ value: 90 }, { value: 91 }, { value: 92 }, { value: 93 }, { value: 94 }, { value: 95 }],
  routeHealth: [{ value: 98 }, { value: 98 }, { value: 99 }, { value: 99 }, { value: 99 }, { value: 99 }],
  navCoverage: [{ value: 86 }, { value: 88 }, { value: 90 }, { value: 92 }, { value: 93 }, { value: 94 }],
  fallback: [{ value: 100 }, { value: 100 }, { value: 100 }, { value: 100 }, { value: 100 }, { value: 100 }],
};

export const NotFound: React.FC = () => {
  const attemptedPath = typeof window !== 'undefined' ? window.location.pathname : '/unknown';
  const contract = getRouteScreenContract('landing');

  return (
    <PageShell
      slug="not-found"
      contract={contract}
      layout="dashboard"
      heroVariant="minimal"
      hero={{
        kicker: 'Fallback route',
        headline: 'That page is not available.',
        subline: `No screen is mapped for ${attemptedPath}.`,
        proofLine: {
          claim: 'Routing guard',
          evidence: 'Fallback shell engaged | Navigation remains available',
          source: 'Client router',
        },
        heroAction: {
          label: 'Recommended:',
          text: 'Return to dashboard and continue from the latest mission state.',
          cta: { label: 'Open dashboard →', to: '/dashboard' },
        },
        freshness: new Date(),
        kpis: [
          {
            label: 'Recovery readiness',
            value: '95%',
            definition: 'Users who recover from missing routes in one click',
            accent: 'teal',
            sparklineData: kpiSparklines.recovery,
            sparklineColor: 'var(--state-healthy)',
          },
          {
            label: 'Route health',
            value: '99%',
            definition: 'Mapped routes resolving without fallback',
            accent: 'blue',
            sparklineData: kpiSparklines.routeHealth,
            sparklineColor: 'var(--state-primary)',
          },
          {
            label: 'Navigation coverage',
            value: '94%',
            definition: 'Key workflows reachable from top navigation',
            accent: 'cyan',
            sparklineData: kpiSparklines.navCoverage,
            sparklineColor: '#00F0FF',
          },
          {
            label: 'Fallback uptime',
            value: '100%',
            definition: 'Not-found recovery shell availability',
            accent: 'amber',
            sparklineData: kpiSparklines.fallback,
            sparklineColor: 'var(--state-warning)',
          },
        ],
      }}
      primaryFeed={(
        <article className="engine-card">
          <MissionSectionHeader
            title="Recovery options"
            message="The requested route does not match any registered screen."
          />
          <MissionEmptyState
            title="Route not found"
            description={`The requested path "${attemptedPath}" is not currently registered.`}
            action={<Link className="entry-btn entry-btn--primary" to="/dashboard">Return to dashboard</Link>}
          />
          <ProofLine
            claim="Routing guard active"
            evidence="Fallback shell engaged | Navigation intact | No data exposed"
            source="Client router"
            basis="per-event"
            sourceType="system"
          />
        </article>
      )}
      decisionRail={(
        <article className="engine-card">
          <MissionSectionHeader
            title="Next best actions"
            message="Suggested navigation targets based on common workflows."
          />
          <MissionActionList
            items={[
              { title: 'Open dashboard', meta: 'Primary', tone: 'primary' },
              { title: 'Review protect alerts', meta: 'Safety', tone: 'warning' },
              { title: 'Return to landing', meta: 'Navigation', tone: 'healthy' },
            ]}
          />
        </article>
      )}
    />
  );
};

export default NotFound;

