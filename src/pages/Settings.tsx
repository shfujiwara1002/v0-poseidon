import React, { useState } from 'react';
import { Bell, Mail, Smartphone, Shield, Fingerprint } from 'lucide-react';
import { Link } from '../router';
import { DefinitionLine } from '../components/DefinitionLine';
import { PageShell } from '../components/PageShell';
import { MissionDataRows } from '../components/MissionDataRows';
import { MissionSectionHeader } from '../components/MissionSectionHeader';
import { MissionToggle } from '../components/MissionToggle';
import { ProofLine } from '../components/ProofLine';
import { SettingsPanel } from '../components/SettingsPanel';
import { getRouteScreenContract } from '../contracts/route-screen-contracts';

const kpiSparklines = {
  policies: [{ value: 12 }, { value: 12 }, { value: 13 }, { value: 13 }, { value: 14 }, { value: 14 }],
  seats: [{ value: 6 }, { value: 6 }, { value: 7 }, { value: 7 }, { value: 8 }, { value: 8 }],
  muted: [{ value: 4 }, { value: 3 }, { value: 3 }, { value: 3 }, { value: 2 }, { value: 2 }],
  backups: [{ value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }],
};

export const Settings: React.FC = () => {
  const contract = getRouteScreenContract('settings');
  const [notifications, setNotifications] = useState({ push: true, email: true, sms: false });
  const [security, setSecurity] = useState({ twoFactor: true, biometric: false });

  const mainContent = (
    <>
      {/* Notification preferences */}
      <article className="engine-card">
        <MissionSectionHeader
          title="Notification preferences"
          message="Control how you receive alerts and updates."
        />
        <MissionToggle
          checked={notifications.push}
          onChange={(v) => setNotifications((p) => ({ ...p, push: v }))}
          label="Push notifications"
          description="Receive real-time alerts on your device."
        />
        <MissionToggle
          checked={notifications.email}
          onChange={(v) => setNotifications((p) => ({ ...p, email: v }))}
          label="Email notifications"
          description="Daily digest and critical alerts via email."
        />
        <MissionToggle
          checked={notifications.sms}
          onChange={(v) => setNotifications((p) => ({ ...p, sms: v }))}
          label="SMS notifications"
          description="High-priority security alerts via text message."
        />
      </article>

      {/* Security settings */}
      <article className="engine-card">
        <MissionSectionHeader
          title="Security"
          message="Authentication and access controls."
        />
        <MissionToggle
          checked={security.twoFactor}
          onChange={(v) => setSecurity((p) => ({ ...p, twoFactor: v }))}
          label="Two-factor authentication"
          description="Adds an extra layer of security to your account. Recommended."
        />
        <MissionToggle
          checked={security.biometric}
          onChange={(v) => setSecurity((p) => ({ ...p, biometric: v }))}
          label="Biometric login"
          description="Use fingerprint or face recognition to sign in."
        />
      </article>

      <article className="engine-card" data-slot="preferences">
        <MissionSectionHeader
          title="Preferences"
          message="General application settings and display options."
        />
        <SettingsPanel />
        <ProofLine
          claim="All settings audit-logged"
          evidence="Changes tracked with timestamps | Revert available"
          source="Settings engine"
          basis="real-time"
          sourceType="system"
        />
      </article>

      <article className="engine-card">
        <MissionSectionHeader
          title="Quick navigation"
          message="Jump to specialized settings surfaces."
        />
        <MissionDataRows
          items={[
            { id: 'QN-1', title: 'AI delegation', value: 'Configure', detail: 'Autonomy levels and risk thresholds', tone: 'primary' },
            { id: 'QN-2', title: 'Integrations', value: 'Manage', detail: 'Connected accounts and data sources', tone: 'primary' },
            { id: 'QN-3', title: 'Data rights', value: 'Review', detail: 'Export, delete, or restrict your data', tone: 'primary' },
          ]}
        />
        <div className="mission-dual-actions">
          <Link className="entry-btn entry-btn--primary" to="/settings/ai">AI settings</Link>
          <Link className="entry-btn entry-btn--ghost" to="/settings/integrations">Integrations</Link>
          <Link className="entry-btn entry-btn--ghost" to="/settings/rights">Data rights</Link>
        </div>
      </article>

      <DefinitionLine
        metric="Configuration health"
        formula="configured_policies / recommended_policies"
        unit="percentage"
        period="current"
        threshold="100%"
      />
    </>
  );

  return (
    <PageShell
      slug="settings"
      contract={contract}
      layout="engine"
      fullWidth
      heroVariant="editorial"
      hero={{
        kicker: 'Settings',
        headline: 'Policies, team access, and AI controls.',
        subline: 'Adjust delegation levels, manage integrations, and review data rights.',
        proofLine: {
          claim: 'Confidence 0.93',
          evidence: '14 active policies | All consent tracked',
          source: 'Policy engine',
        },
        heroAction: {
          label: 'Recommended:',
          text: 'Run setup health-check after changing policy or team access rules.',
          cta: { label: 'Open onboarding →', to: '/onboarding' },
        },
        freshness: new Date(Date.now() - 20 * 60 * 1000),
        kpis: [
          { label: 'Active policies', value: '14', definition: 'Configured and enforced policy rules', accent: 'blue', sparklineData: kpiSparklines.policies, sparklineColor: 'var(--state-primary)' },
          { label: 'Team seats', value: '8', definition: 'Licensed team members with active access', accent: 'teal', sparklineData: kpiSparklines.seats, sparklineColor: 'var(--state-healthy)' },
          { label: 'Alerts muted', value: '2', definition: 'Temporarily suppressed alert categories', accent: 'amber', sparklineData: kpiSparklines.muted, sparklineColor: 'var(--state-warning)' },
          { label: 'Backups', value: 'Daily', definition: 'Automatic configuration backup frequency', accent: 'cyan', sparklineData: kpiSparklines.backups, sparklineColor: '#00F0FF' },
        ],
      }}
      primaryFeed={mainContent}
    />
  );
};

export default Settings;
