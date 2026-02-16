import React from 'react';
import { GlassCard } from '../../shared/GlassCard';
import { ComplianceBadge } from '../../shared/ComplianceBadge';
import { ChartLine } from '../../shared/charts/ChartLine';
import { SlideIcon } from '../../shared/SlideIcon';
import { theme } from '../../shared/theme';
import { HeroLayoutFrame } from './HeroLayoutFrame';
import { PhoneFrame } from './PhoneFrame';

export const GrowHeroMobileLayout: React.FC = () => {
  const data = [1200, 1380, 1120, 1450, 1520, 1480, 1620];
  const upper = data.map((v) => v + 220);
  const lower = data.map((v) => v - 220);

  return (
    <HeroLayoutFrame title="Grow (Mobile)" subtitle="Forecasts you can trust" variant="mobile">
      <div style={{ gridColumn: 'span 12', display: 'flex', justifyContent: 'center' }}>
        <PhoneFrame title="Grow">
          <GlassCard variant="violet" style={{ padding: 16 }}>
            <div style={{ fontWeight: 600 }}>30-Day Outlook</div>
            <ChartLine
              data={data}
              confidenceUpper={upper}
              confidenceLower={lower}
              showConfidenceBand
              width={300}
              height={120}
              color={theme.accent.violet}
              style={{ marginTop: 10 }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>
              <span>End balance</span>
              <span>$2,480</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>
              <span>Cash buffer</span>
              <span>16 days</span>
            </div>
          </GlassCard>
          <GlassCard style={{ padding: 16 }}>
            <div style={{ fontWeight: 600 }}>Drivers</div>
            <div style={{ opacity: 0.7, marginTop: 6 }}>Salary variance · Subscriptions · Utilities</div>
            <div style={{ opacity: 0.7, marginTop: 6 }}>Confidence 0.79 · Model v1.9</div>
            <div style={{ color: theme.accent.cyan, marginTop: 8 }}>Govern-Verified</div>
            <ComplianceBadge color="violet">Audit ID G-GR-0821</ComplianceBadge>
          </GlassCard>
          <GlassCard style={{ padding: 16 }}>
            <div style={{ fontWeight: 600 }}>Action</div>
            <div style={{ opacity: 0.7, marginTop: 6 }}>Reduce subscriptions by $24/mo</div>
            <div style={{ padding: '8px 12px', borderRadius: 10, background: theme.accent.violet, color: '#0b061a', fontWeight: 600, marginTop: 10 }}>
              Improve Forecast
            </div>
          </GlassCard>
          <GlassCard style={{ padding: 16 }}>
            <div style={{ fontWeight: 600 }}>Goal Progress</div>
            <div style={{ opacity: 0.7, marginTop: 6 }}>Emergency fund 65%</div>
            <div style={{ opacity: 0.7 }}>Retirement 42%</div>
          </GlassCard>
          <div style={{ marginTop: 'auto', paddingTop: 8, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-around', fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <SlideIcon name="data-grid" size={14} glowColor="white" variant="simple" />
              <span>Home</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <SlideIcon name="shield" size={14} glowColor="white" variant="simple" />
              <span>Protect</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, color: theme.accent.violet }}>
              <SlideIcon name="wave" size={14} glowColor="violet" variant="simple" />
              <span>Grow</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <SlideIcon name="signal-beam" size={14} glowColor="white" variant="simple" />
              <span>Execute</span>
            </div>
          </div>
        </PhoneFrame>
      </div>
    </HeroLayoutFrame>
  );
};
