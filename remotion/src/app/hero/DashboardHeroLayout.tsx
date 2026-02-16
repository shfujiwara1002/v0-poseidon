import React from 'react';
import { GlassCard } from '../../shared/GlassCard';
import { StatCard } from '../../shared/StatCard';
import { EnginePill } from '../../shared/EnginePill';
import { ComplianceBadge } from '../../shared/ComplianceBadge';
import { ChartLine } from '../../shared/charts/ChartLine';
import { theme } from '../../shared/theme';
import { HeroLayoutFrame } from './HeroLayoutFrame';

export const DashboardHeroLayout: React.FC = () => {
  const trend = [1200, 1320, 1180, 1460, 1550, 1480, 1620];
  const upper = trend.map((v) => v + 220);
  const lower = trend.map((v) => v - 220);

  return (
    <HeroLayoutFrame
      title="Dashboard: Unified Financial Command"
      subtitle="Live KPIs, Govern-verified insights, and action-ready context."
      engine="Dashboard"
    >
      <div style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <GlassCard style={{ minHeight: 340, padding: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ fontSize: 20, fontWeight: 600 }}>System Pulse</div>
            <ComplianceBadge>GOVERN-VERIFIED</ComplianceBadge>
          </div>
          <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
            <StatCard label="Net Worth" value="$142k" subtext="+2.4% MoM" accentColor={theme.accent.cyan} />
            <StatCard label="Cash Flow" value="+$1,240" subtext="30-day" accentColor={theme.accent.teal} />
            <StatCard label="Alerts" value="2" subtext="High priority" accentColor={theme.accent.red} />
          </div>
          <ChartLine
            data={trend}
            confidenceUpper={upper}
            confidenceLower={lower}
            showConfidenceBand
            showDotGrid
            width={650}
            height={180}
            color={theme.accent.cyan}
          />
          <div style={{ display: 'flex', gap: 10, marginTop: 12, flexWrap: 'wrap' }}>
            <EnginePill status="Protect" />
            <EnginePill status="Grow" />
            <EnginePill status="Execute" />
            <EnginePill status="Govern" />
          </div>
        </GlassCard>
      </div>

      <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <GlassCard style={{ minHeight: 340, padding: 20 }}>
          <div style={{ fontSize: 18, fontWeight: 600 }}>AI Insight</div>
          <div style={{ color: 'rgba(255,255,255,0.75)', marginTop: 8, lineHeight: 1.5 }}>
            Subscriptions increased 8% this month. Triton recommends consolidating two services to restore your cash buffer.
          </div>
          <div style={{ marginTop: 12, color: theme.accent.cyan, fontSize: 14 }}>
            Audit ID G-DB-014 · Confidence 0.88
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 16, flexWrap: 'wrap' }}>
            <div style={{ padding: '10px 16px', borderRadius: 10, background: theme.accent.teal, color: '#001018', fontWeight: 600 }}>
              Review Plan
            </div>
            <div style={{ padding: '10px 16px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.3)', color: 'white' }}>
              View Details
            </div>
          </div>
        </GlassCard>
      </div>

      <div style={{ gridColumn: 'span 12', display: 'flex', gap: 20 }}>
        <GlassCard style={{ flex: 1, padding: 18 }}>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Recent Activity</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8, color: 'rgba(255,255,255,0.7)' }}>
            <div>02:14 · Protect flagged unauthorized transfer</div>
            <div>08:32 · Grow forecast updated · Confidence 0.79</div>
            <div>09:05 · Execute negotiated Comcast bill</div>
          </div>
        </GlassCard>
        <GlassCard style={{ flex: 1, padding: 18 }}>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Action Queue</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8, color: 'rgba(255,255,255,0.7)' }}>
            <div>2 high-priority approvals</div>
            <div>3 automation proposals</div>
            <div>Audit coverage 98%</div>
          </div>
        </GlassCard>
        <GlassCard style={{ flex: 1, padding: 18 }}>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Upcoming Bills</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8, color: 'rgba(255,255,255,0.7)' }}>
            <div>$620 due next 7 days</div>
            <div>Subscriptions up 8%</div>
            <div>Buffer impact: -$120</div>
          </div>
        </GlassCard>
      </div>
    </HeroLayoutFrame>
  );
};
