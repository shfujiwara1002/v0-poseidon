import React from 'react';
import { GlassCard } from '../../shared/GlassCard';
import { ComplianceBadge } from '../../shared/ComplianceBadge';
import { StatCard } from '../../shared/StatCard';
import { TimelineHorizontal } from '../../shared/TimelineHorizontal';
import { theme } from '../../shared/theme';
import { HeroLayoutFrame } from './HeroLayoutFrame';

export const ExecuteHeroLayout: React.FC = () => {
  const factors = [
    { label: 'Price vs. market', value: 0.71 },
    { label: 'Usage stability', value: 0.56 },
    { label: 'Payment history', value: 0.44 },
  ];

  return (
    <HeroLayoutFrame
      title="Execute: Consent-First Automation"
      subtitle="You approve. We execute. Govern verifies."
      engine="Execute"
    >
      <div style={{ gridColumn: 'span 7', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <GlassCard variant="gold" style={{ minHeight: 440, padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ fontSize: 22, fontWeight: 600 }}>Negotiate Comcast bill</div>
            <ComplianceBadge color="amber">EXECUTE</ComplianceBadge>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 16 }}>
            Estimated savings: <span style={{ color: theme.accent.amber, fontWeight: 600 }}>$18/mo</span>
          </div>
          <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
            <StatCard label="Current Bill" value="$138/mo" subtext="Comcast" accentColor={theme.accent.amber} />
            <StatCard label="Projected" value="$120/mo" subtext="After negotiation" accentColor={theme.accent.cyan} />
            <StatCard label="Timeline" value="5-7 days" subtext="One-time" accentColor={theme.accent.violet} />
          </div>
          <TimelineHorizontal
            segments={[
              { label: 'Recommend', time: 'Now', color: theme.accent.amber, active: true },
              { label: 'Approve', time: 'Today', color: theme.accent.cyan },
              { label: 'Execute', time: '5-7 days', color: theme.accent.violet },
            ]}
          />
          <div style={{ marginTop: 16, fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>
            Consent summary: “We will negotiate this bill once. You can revoke at any time.”
          </div>
        </GlassCard>
      </div>
      <div style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <GlassCard style={{ minHeight: 440, padding: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ fontSize: 20, fontWeight: 600 }}>Explainability + Consent</div>
            <div style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>
              Every action is explained before it’s approved.
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {factors.map((factor) => (
                <div key={factor.label} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)' }}>{factor.label}</div>
                  <div style={{ height: 6, borderRadius: 999, background: 'rgba(255,255,255,0.12)' }}>
                    <div
                      style={{
                        height: 6,
                        width: `${factor.value * 100}%`,
                        borderRadius: 999,
                        background: `linear-gradient(90deg, ${theme.accent.amber} 0%, ${theme.accent.cyan} 100%)`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>
              Confidence 0.82 · Based on last 12 months · Model v2.1
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <ComplianceBadge color="amber">GOVERN-VERIFIED</ComplianceBadge>
              <span style={{ color: theme.accent.cyan, fontSize: 14 }}>Audit ID G-EX-0417</span>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 6 }}>
              <div style={{ padding: '10px 16px', borderRadius: 10, background: theme.accent.amber, color: '#1a0d00', fontWeight: 600 }}>
                Approve Action
              </div>
              <div style={{ padding: '10px 16px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.3)', color: 'white' }}>
                Cancel
              </div>
              <div style={{ padding: '10px 16px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)' }}>
                Request Human Review
              </div>
            </div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>Revoke consent</div>
          </div>
        </GlassCard>
      </div>
      <div style={{ gridColumn: 'span 12', display: 'flex', gap: 20 }}>
        <GlassCard style={{ flex: 1, padding: 18 }}>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Automation Queue</div>
          <div style={{ marginTop: 8, color: 'rgba(255,255,255,0.7)' }}>5 pending approvals</div>
          <div style={{ marginTop: 6, color: 'rgba(255,255,255,0.6)' }}>Savings $240/mo</div>
        </GlassCard>
        <GlassCard style={{ flex: 1, padding: 18 }}>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Consent Log</div>
          <div style={{ marginTop: 8, color: 'rgba(255,255,255,0.7)' }}>12 actions · last 30 days</div>
          <div style={{ marginTop: 6, color: 'rgba(255,255,255,0.6)' }}>Revocations: 0</div>
        </GlassCard>
        <GlassCard style={{ flex: 1, padding: 18 }}>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Savings To Date</div>
          <div style={{ marginTop: 8, color: 'rgba(255,255,255,0.7)' }}>$1,240 YTD</div>
          <div style={{ marginTop: 6, color: 'rgba(255,255,255,0.6)' }}>ROI 8x</div>
        </GlassCard>
      </div>
    </HeroLayoutFrame>
  );
};
