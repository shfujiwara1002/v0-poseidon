import React from 'react';
import { GlassCard } from '../../shared/GlassCard';
import { ComplianceBadge } from '../../shared/ComplianceBadge';
import { StatCard } from '../../shared/StatCard';
import { ChartLine } from '../../shared/charts/ChartLine';
import { theme } from '../../shared/theme';
import { HeroLayoutFrame } from './HeroLayoutFrame';

export const GrowHeroLayout: React.FC = () => {
  const data = [1200, 1380, 1120, 1450, 1520, 1480, 1620];
  const upper = data.map((v) => v + 220);
  const lower = data.map((v) => v - 220);
  const drivers = [
    { label: 'Salary variance', value: 0.74 },
    { label: 'Subscriptions', value: 0.58 },
    { label: 'Seasonal utilities', value: 0.42 },
  ];

  return (
    <HeroLayoutFrame
      title="Grow: Forecasts You Can Trust"
      subtitle="Clear drivers, transparent confidence."
      engine="Grow"
    >
      <div style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <GlassCard variant="violet" style={{ minHeight: 440, padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{ fontSize: 22, fontWeight: 600 }}>30-Day Outlook</div>
            <ComplianceBadge color="violet">GROW</ComplianceBadge>
          </div>
          <div style={{ marginBottom: 16 }}>
            <ChartLine
              data={data}
              confidenceUpper={upper}
              confidenceLower={lower}
              showConfidenceBand
              showDotGrid
              width={700}
              height={220}
              color={theme.accent.violet}
              style={{ opacity: 0.9 }}
            />
          </div>
          <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
            <StatCard label="End Balance" value="$2,480" subtext="+3.1%" accentColor={theme.accent.violet} />
            <StatCard label="Cash Buffer" value="16 days" subtext="Goal 21" accentColor={theme.accent.teal} />
            <StatCard label="Net Worth" value="+2.4%" subtext="MoM" accentColor={theme.accent.cyan} />
          </div>
          <div style={{ color: 'rgba(255,255,255,0.7)' }}>What changed: subscriptions increased 8% this month.</div>
        </GlassCard>
      </div>
      <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <GlassCard style={{ minHeight: 440, padding: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ fontSize: 20, fontWeight: 600 }}>Drivers + Action</div>
            <div style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>
              We show what’s moving the forecast and how to improve it.
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {drivers.map((driver) => (
                <div key={driver.label} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)' }}>{driver.label}</div>
                  <div style={{ height: 6, borderRadius: 999, background: 'rgba(255,255,255,0.12)' }}>
                    <div
                      style={{
                        height: 6,
                        width: `${driver.value * 100}%`,
                        borderRadius: 999,
                        background: `linear-gradient(90deg, ${theme.accent.violet} 0%, ${theme.accent.cyan} 100%)`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>
              Confidence 0.79 · Based on last 180 days · Model v1.9
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <ComplianceBadge color="violet">GOVERN-VERIFIED</ComplianceBadge>
              <span style={{ color: theme.accent.cyan, fontSize: 14 }}>Audit ID G-GR-0821</span>
            </div>
            <div style={{ padding: '10px 16px', borderRadius: 10, background: theme.accent.violet, color: '#0b061a', fontWeight: 600 }}>
              Improve Forecast
            </div>
          </div>
        </GlassCard>
      </div>
      <div style={{ gridColumn: 'span 12', display: 'flex', gap: 20 }}>
        <GlassCard style={{ flex: 1, padding: 18 }}>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Goal Progress</div>
          <div style={{ marginTop: 8, color: 'rgba(255,255,255,0.7)' }}>Emergency fund 65%</div>
          <div style={{ marginTop: 6, color: 'rgba(255,255,255,0.6)' }}>Retirement 42%</div>
        </GlassCard>
        <GlassCard style={{ flex: 1, padding: 18 }}>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Forecast Risk</div>
          <div style={{ marginTop: 8, color: 'rgba(255,255,255,0.7)' }}>Low · Confidence 0.79</div>
          <div style={{ marginTop: 6, color: 'rgba(255,255,255,0.6)' }}>Scenario drift: none</div>
        </GlassCard>
        <GlassCard style={{ flex: 1, padding: 18 }}>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Upcoming Recurrings</div>
          <div style={{ marginTop: 8, color: 'rgba(255,255,255,0.7)' }}>$420 next 14 days</div>
          <div style={{ marginTop: 6, color: 'rgba(255,255,255,0.6)' }}>Top: utilities, rent</div>
        </GlassCard>
      </div>
    </HeroLayoutFrame>
  );
};
