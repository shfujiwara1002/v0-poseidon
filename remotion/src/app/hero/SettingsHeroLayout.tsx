import React from 'react';
import { GlassCard } from '../../shared/GlassCard';
import { ComplianceBadge } from '../../shared/ComplianceBadge';
import { theme } from '../../shared/theme';
import { HeroLayoutFrame } from './HeroLayoutFrame';

const settingRow = (label: string, value: string) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, color: 'rgba(255,255,255,0.75)' }}>
    <span>{label}</span>
    <span style={{ color: 'white', fontWeight: 600 }}>{value}</span>
  </div>
);

export const SettingsHeroLayout: React.FC = () => {
  return (
    <HeroLayoutFrame
      title="Settings: Privacy & AI Control"
      subtitle="Governed access, human sovereignty, and transparent AI behavior."
      engine="Settings"
    >
      <div style={{ gridColumn: 'span 7', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <GlassCard style={{ minHeight: 300, padding: 22 }}>
          <div style={{ fontSize: 20, fontWeight: 600 }}>AI Behavior</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
            {settingRow('Delegation Mode', 'Assisted')}
            {settingRow('Risk Tolerance', 'Balanced')}
            {settingRow('Explainability', 'Summary + Factors')}
            {settingRow('Auto-Approve Threshold', 'Never')}
          </div>
          <div style={{ marginTop: 16, color: theme.accent.cyan, fontSize: 14 }}>Govern-Verified · Audit ID G-ST-208</div>
        </GlassCard>
      </div>

      <div style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <GlassCard style={{ minHeight: 300, padding: 22 }}>
          <div style={{ fontSize: 18, fontWeight: 600 }}>Consent & Data Rights</div>
          <div style={{ marginTop: 10, color: 'rgba(255,255,255,0.7)' }}>2 revocations · last 24h</div>
          <div style={{ marginTop: 16, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <ComplianceBadge>EU AI Act</ComplianceBadge>
            <ComplianceBadge color="amber">CFPB</ComplianceBadge>
            <ComplianceBadge color="violet">NIST RMF</ComplianceBadge>
          </div>
          <div style={{ marginTop: 16, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <div style={{ padding: '10px 14px', borderRadius: 10, background: theme.accent.blue, color: '#04121f', fontWeight: 600 }}>
              Manage Consent
            </div>
            <div style={{ padding: '10px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.3)' }}>Export Data</div>
          </div>
        </GlassCard>
      </div>

      <div style={{ gridColumn: 'span 12', display: 'flex', gap: 20 }}>
        <GlassCard style={{ flex: 1, padding: 18 }}>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Notifications</div>
          <div style={{ marginTop: 8, color: 'rgba(255,255,255,0.7)' }}>Protect + Grow + Execute alerts on.</div>
          <div style={{ marginTop: 6, color: 'rgba(255,255,255,0.6)' }}>Digest: daily summary</div>
        </GlassCard>
        <GlassCard style={{ flex: 1, padding: 18 }}>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Integrations</div>
          <div style={{ marginTop: 8, color: 'rgba(255,255,255,0.7)' }}>Chase · Fidelity · Coinbase</div>
          <div style={{ marginTop: 6, color: 'rgba(255,255,255,0.6)' }}>3 active connections</div>
        </GlassCard>
        <GlassCard style={{ flex: 1, padding: 18 }}>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Audit Trails</div>
          <div style={{ marginTop: 8, color: 'rgba(255,255,255,0.7)' }}>Retention 10 years</div>
          <div style={{ marginTop: 6, color: 'rgba(255,255,255,0.6)' }}>Exportable on demand</div>
        </GlassCard>
      </div>
    </HeroLayoutFrame>
  );
};
