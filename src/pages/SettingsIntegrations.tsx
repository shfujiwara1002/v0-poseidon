import React from 'react';
import { DefinitionLine } from '../components/DefinitionLine';
import { PageShell } from '../components/PageShell';
import { MissionDataRows } from '../components/MissionDataRows';
import { MissionSectionHeader } from '../components/MissionSectionHeader';
import { MissionStatusChip } from '../components/MissionStatusChip';
import { ProofLine } from '../components/ProofLine';
import { getRouteScreenContract } from '../contracts/route-screen-contracts';

const integrations = [
  { id: 'INT-001', name: 'Chase Bank', provider: 'Plaid', status: 'Connected', connectedAt: 'Jan 15, 2026', scope: 'Transactions, Balances', tone: 'healthy' as const },
  { id: 'INT-002', name: 'Savings Account', provider: 'Plaid', status: 'Connected', connectedAt: 'Jan 15, 2026', scope: 'Transactions, Balances', tone: 'healthy' as const },
  { id: 'INT-003', name: 'Credit Card', provider: 'Plaid', status: 'Connected', connectedAt: 'Jan 20, 2026', scope: 'Transactions', tone: 'healthy' as const },
  { id: 'INT-004', name: 'Investment Account', provider: 'Plaid', status: 'Disconnected', connectedAt: '—', scope: '—', tone: 'warning' as const },
];

const kpiSparklines = {
  connected: [{ value: 2 }, { value: 2 }, { value: 3 }, { value: 3 }, { value: 3 }, { value: 3 }],
  scopes: [{ value: 4 }, { value: 4 }, { value: 5 }, { value: 5 }, { value: 5 }, { value: 5 }],
  uptime: [{ value: 99.8 }, { value: 99.9 }, { value: 99.9 }, { value: 100 }, { value: 100 }, { value: 100 }],
  lastSync: [{ value: 5 }, { value: 4 }, { value: 3 }, { value: 2 }, { value: 2 }, { value: 1 }],
};

export const SettingsIntegrations: React.FC = () => {
  const contract = getRouteScreenContract('settings-integrations');

  const mainContent = (
    <>
      <section className="engine-section" data-slot="connected_accounts">
        <MissionSectionHeader
          title="Connected accounts"
          message="Manage your connected financial accounts and data sources."
          contextCue="All connections use read-only access by default"
          right={<MissionStatusChip tone="healthy" label={`${integrations.filter((i) => i.status === 'Connected').length} connected`} />}
        />
        {integrations.map((integration) => (
          <article key={integration.id} className="engine-card">
            <MissionDataRows
              items={[
                { id: `${integration.id}-name`, title: integration.name, value: integration.status, tone: integration.tone },
                { id: `${integration.id}-prov`, title: 'Provider', value: integration.provider, tone: 'primary' },
                { id: `${integration.id}-scope`, title: 'Data scope', value: integration.scope, tone: 'primary' },
                { id: `${integration.id}-date`, title: 'Connected', value: integration.connectedAt, tone: 'primary' },
              ]}
            />
            {integration.status === 'Connected' && (
              <button type="button" className="entry-btn entry-btn--ghost">Revoke access</button>
            )}
            {integration.status === 'Disconnected' && (
              <button type="button" className="entry-btn entry-btn--primary">Connect</button>
            )}
          </article>
        ))}
        <ProofLine
          claim="3 of 4 accounts connected"
          evidence="Read-only access | Revocable anytime"
          source="Integration manager"
          basis="current"
          sourceType="system"
        />
        <DefinitionLine
          metric="Connection coverage"
          formula="connected_accounts / configured_accounts"
          unit="ratio"
          period="current"
          threshold="100%"
        />
      </section>
    </>
  );

  const sideContent = (
    <article className="engine-card">
      <MissionSectionHeader
        title="Integration health"
        message="Sync and uptime metrics for connected accounts."
      />
      <MissionDataRows
        items={[
          { id: 'IH-1', title: 'Last sync', value: '1m ago', tone: 'healthy' },
          { id: 'IH-2', title: 'Sync frequency', value: 'Every 15m', tone: 'primary' },
          { id: 'IH-3', title: 'Data freshness', value: '100%', tone: 'healthy' },
        ]}
      />
      <DefinitionLine
        metric="Data freshness"
        formula="synced_accounts / total_connected"
        unit="percentage"
        period="real-time"
        threshold="100%"
      />
    </article>
  );

  return (
    <PageShell
      slug="settings"
      contract={contract}
      fullWidth
      layout="engine"
      heroVariant="editorial"
      hero={{
        kicker: 'Integrations',
        headline: 'Manage connected accounts.',
        subline: contract.oneScreenMessage,
        proofLine: {
          claim: '3 accounts connected',
          evidence: 'Read-only access | All revocable | Plaid secured',
          source: 'Integration manager',
        },
        freshness: new Date(Date.now() - 1 * 60 * 1000),
        kpis: [
          { label: 'Connected', value: '3', definition: 'Active account connections', accent: 'teal', sparklineData: kpiSparklines.connected, sparklineColor: 'var(--state-healthy)' },
          { label: 'Data scopes', value: '5', definition: 'Active data access scopes', accent: 'blue', sparklineData: kpiSparklines.scopes, sparklineColor: 'var(--state-primary)' },
          { label: 'Uptime', value: '100%', definition: 'Connection uptime over 30 days', accent: 'cyan', sparklineData: kpiSparklines.uptime, sparklineColor: '#00F0FF' },
          { label: 'Last sync', value: '1m', definition: 'Time since last data synchronization', accent: 'amber', sparklineData: kpiSparklines.lastSync, sparklineColor: 'var(--state-warning)' },
        ],
      }}
      primaryFeed={mainContent}
      decisionRail={sideContent}
    />
  );
};

export default SettingsIntegrations;
