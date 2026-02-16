import React from 'react';
import { GlassCard } from '../../shared/GlassCard';
import { WarningBadge } from '../../shared/WarningBadge';
import { ComplianceBadge } from '../../shared/ComplianceBadge';
import { StatCard } from '../../shared/StatCard';
import { TimelineHorizontal } from '../../shared/TimelineHorizontal';
import { SlideIcon } from '../../shared/SlideIcon';
import { theme } from '../../shared/theme';
import { HeroLayoutFrame } from './HeroLayoutFrame';

export const ProtectHeroLayout: React.FC = () => {
  const factors = [
    { label: 'Location mismatch', value: 0.86 },
    { label: 'New merchant type', value: 0.72 },
    { label: 'Unusual time', value: 0.58 },
  ];

  const detailRow = (label: string, value: string) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16 }}>
      <span style={{ color: 'rgba(255,255,255,0.6)' }}>{label}</span>
      <span style={{ color: 'white', fontWeight: 600 }}>{value}</span>
    </div>
  );

  return (
    <HeroLayoutFrame
      title="Protect: Real-Time Threat Detection"
      subtitle="Every alert is explained, verified, and reviewable."
      engine="Protect"
    >
      <div style={{ gridColumn: 'span 7', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <GlassCard variant="teal" style={{ minHeight: 440, padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <WarningBadge>HIGH RISK</WarningBadge>
            <ComplianceBadge color="teal">PROTECT</ComplianceBadge>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
            <SlideIcon name="shield" size={34} glowColor="red" />
            <div>
              <div style={{ fontSize: 22, fontWeight: 600 }}>Possible unauthorized transfer</div>
              <div style={{ color: 'rgba(255,255,255,0.6)' }}>Today · 02:14 AM</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
            <StatCard label="Amount" value="$1,240" subtext="Unauthorized" accentColor={theme.accent.red} />
            <StatCard label="Risk Score" value="92" subtext="High" accentColor={theme.accent.teal} />
            <StatCard label="Confidence" value="0.86" subtext="Model v2.4" accentColor={theme.accent.cyan} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {detailRow('Merchant', 'QuickCash Transfer')}
            {detailRow('Channel', 'P2P Instant')}
            {detailRow('Account', 'Checking · 2041')}
          </div>
          <div style={{ marginTop: 18, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>Similar activity</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>QuickCash · $120 · 7 days ago</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>Venmo · $75 · 12 days ago</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>Zelle · $210 · 3 weeks ago</div>
            </div>
          </div>
          <div style={{ marginTop: 18 }}>
            <TimelineHorizontal
              segments={[
                { label: 'Detect', time: '0ms', color: theme.accent.red, active: true },
                { label: 'Explain', time: '15ms', color: theme.accent.teal },
                { label: 'Review', time: 'Pending', color: theme.accent.cyan },
              ]}
            />
          </div>
        </GlassCard>
      </div>
      <div style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <GlassCard style={{ minHeight: 440, padding: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ fontSize: 20, fontWeight: 600 }}>Explainability + Actions</div>
            <div style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>
              We flag anomalies in milliseconds and surface the top factors before you decide.
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
                        background: `linear-gradient(90deg, ${theme.accent.red} 0%, ${theme.accent.cyan} 100%)`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>
              Confidence 0.86 · Based on last 90 days · Model v2.4
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <ComplianceBadge>GOVERN‑VERIFIED</ComplianceBadge>
              <span style={{ color: theme.accent.cyan, fontSize: 14 }}>Audit ID G‑PF‑0192</span>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 6 }}>
              <div style={{ padding: '10px 16px', borderRadius: 10, background: theme.accent.teal, color: '#001018', fontWeight: 600 }}>Approve</div>
              <div style={{ padding: '10px 16px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.3)', color: 'white' }}>Dismiss as Fraud</div>
              <div style={{ padding: '10px 16px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)' }}>Request Human Review</div>
            </div>
          </div>
        </GlassCard>
      </div>
      <div style={{ gridColumn: 'span 12', display: 'flex', gap: 20 }}>
        <GlassCard style={{ flex: 1, padding: 18 }}>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Threat Feed</div>
          <div style={{ marginTop: 8, color: 'rgba(255,255,255,0.7)' }}>12 events · last 24h</div>
          <div style={{ marginTop: 6, color: 'rgba(255,255,255,0.6)' }}>2 high severity</div>
        </GlassCard>
        <GlassCard style={{ flex: 1, padding: 18 }}>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Disputes</div>
          <div style={{ marginTop: 8, color: 'rgba(255,255,255,0.7)' }}>1 open · SLA 18h</div>
          <div style={{ marginTop: 6, color: 'rgba(255,255,255,0.6)' }}>Auto-routing enabled</div>
        </GlassCard>
        <GlassCard style={{ flex: 1, padding: 18 }}>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Security Health</div>
          <div style={{ marginTop: 8, color: 'rgba(255,255,255,0.7)' }}>No drift detected</div>
          <div style={{ marginTop: 6, color: 'rgba(255,255,255,0.6)' }}>Behavioral signals stable</div>
        </GlassCard>
      </div>
    </HeroLayoutFrame>
  );
};
