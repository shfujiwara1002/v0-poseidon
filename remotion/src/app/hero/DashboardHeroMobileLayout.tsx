import React from 'react';
import { GlassCard } from '../../shared/GlassCard';
import { StatCard } from '../../shared/StatCard';
import { ComplianceBadge } from '../../shared/ComplianceBadge';
import { theme } from '../../shared/theme';
import { HeroLayoutFrame } from './HeroLayoutFrame';
import { PhoneFrame } from './PhoneFrame';

export const DashboardHeroMobileLayout: React.FC = () => {
  return (
    <HeroLayoutFrame title="Dashboard (Mobile)" subtitle="Unified command" variant="mobile">
      <div style={{ gridColumn: 'span 12', display: 'flex', justifyContent: 'center' }}>
        <PhoneFrame title="Dashboard">
          <GlassCard style={{ padding: 16 }}>
            <div style={{ fontWeight: 600 }}>System Pulse</div>
            <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
              <StatCard label="Net Worth" value="$142k" subtext="+2.4%" accentColor={theme.accent.cyan} />
              <StatCard label="Cash Flow" value="+$1,240" subtext="30d" accentColor={theme.accent.teal} />
            </div>
            <div style={{ marginTop: 8, fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>Alerts: 2 high priority</div>
          </GlassCard>
          <GlassCard style={{ padding: 16 }}>
            <div style={{ fontWeight: 600 }}>AI Insight</div>
            <div style={{ opacity: 0.7, marginTop: 6 }}>Subscriptions up 8%. Consolidate to restore buffer.</div>
            <ComplianceBadge>GOVERN-VERIFIED</ComplianceBadge>
            <div style={{ marginTop: 8, fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>Audit ID G-DB-014</div>
          </GlassCard>
          <GlassCard style={{ padding: 16 }}>
            <div style={{ fontWeight: 600 }}>Activity</div>
            <div style={{ opacity: 0.7, marginTop: 6 }}>Protect alert · Execute savings · Grow forecast</div>
            <div style={{ opacity: 0.7, marginTop: 4 }}>Upcoming bills: $620</div>
          </GlassCard>
        </PhoneFrame>
      </div>
    </HeroLayoutFrame>
  );
};
