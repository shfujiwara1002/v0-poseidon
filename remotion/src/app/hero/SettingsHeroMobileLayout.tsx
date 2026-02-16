import React from 'react';
import { GlassCard } from '../../shared/GlassCard';
import { ComplianceBadge } from '../../shared/ComplianceBadge';
import { theme } from '../../shared/theme';
import { HeroLayoutFrame } from './HeroLayoutFrame';
import { PhoneFrame } from './PhoneFrame';

export const SettingsHeroMobileLayout: React.FC = () => {
  return (
    <HeroLayoutFrame title="Settings (Mobile)" subtitle="Privacy + AI control" variant="mobile">
      <div style={{ gridColumn: 'span 12', display: 'flex', justifyContent: 'center' }}>
        <PhoneFrame title="Settings">
          <GlassCard style={{ padding: 16 }}>
            <div style={{ fontWeight: 600 }}>AI Behavior</div>
            <div style={{ opacity: 0.7, marginTop: 6 }}>Delegation: Assisted</div>
            <div style={{ opacity: 0.7 }}>Risk: Balanced</div>
            <div style={{ color: theme.accent.cyan, marginTop: 8 }}>Govern-Verified</div>
          </GlassCard>
          <GlassCard style={{ padding: 16 }}>
            <div style={{ fontWeight: 600 }}>Consent & Rights</div>
            <div style={{ opacity: 0.7, marginTop: 6 }}>2 revocations · last 24h</div>
            <ComplianceBadge>EU AI Act</ComplianceBadge>
          </GlassCard>
          <GlassCard style={{ padding: 16 }}>
            <div style={{ fontWeight: 600 }}>Notifications</div>
            <div style={{ opacity: 0.7, marginTop: 6 }}>Protect + Grow + Execute alerts on</div>
          </GlassCard>
          <GlassCard style={{ padding: 16 }}>
            <div style={{ fontWeight: 600 }}>Integrations</div>
            <div style={{ opacity: 0.7, marginTop: 6 }}>Chase · Fidelity · Coinbase</div>
            <div style={{ opacity: 0.7 }}>3 active connections</div>
          </GlassCard>
        </PhoneFrame>
      </div>
    </HeroLayoutFrame>
  );
};
