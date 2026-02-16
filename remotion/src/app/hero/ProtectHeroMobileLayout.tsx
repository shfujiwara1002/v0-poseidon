import React from 'react';
import { GlassCard } from '../../shared/GlassCard';
import { WarningBadge } from '../../shared/WarningBadge';
import { ComplianceBadge } from '../../shared/ComplianceBadge';
import { SlideIcon } from '../../shared/SlideIcon';
import { theme } from '../../shared/theme';
import { HeroLayoutFrame } from './HeroLayoutFrame';
import { PhoneFrame } from './PhoneFrame';

export const ProtectHeroMobileLayout: React.FC = () => {
  return (
    <HeroLayoutFrame title="Protect (Mobile)" subtitle="Real-time threat detection" variant="mobile">
      <div style={{ gridColumn: 'span 12', display: 'flex', justifyContent: 'center' }}>
        <PhoneFrame title="Protect">
          <GlassCard variant="teal" style={{ padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <WarningBadge>HIGH RISK</WarningBadge>
              <div style={{ color: theme.accent.teal, fontWeight: 600, fontSize: 14 }}>Risk 92</div>
            </div>
            <div style={{ marginTop: 10, fontWeight: 600 }}>QuickCash Transfer</div>
            <div style={{ opacity: 0.7 }}>$1,240 · 02:14 AM · Checking 2041</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 8, fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>
              <span>Location mismatch</span>
              <span>New merchant</span>
            </div>
          </GlassCard>
          <GlassCard style={{ padding: 16 }}>
            <div style={{ fontWeight: 600 }}>Explainability</div>
            <div style={{ opacity: 0.7, marginTop: 6 }}>We surface the top factors before you approve.</div>
            <div style={{ marginTop: 8, fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>Top factors: Location, Merchant, Time</div>
            <div style={{ color: theme.accent.cyan, marginTop: 8 }}>Govern-Verified</div>
            <ComplianceBadge>Audit ID G-PF-0192</ComplianceBadge>
          </GlassCard>
          <GlassCard style={{ padding: 16 }}>
            <div style={{ fontWeight: 600 }}>Actions</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
              <div style={{ padding: '8px 12px', borderRadius: 10, background: theme.accent.teal, color: '#001018', fontWeight: 600 }}>Approve</div>
              <div style={{ padding: '8px 12px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.3)' }}>Fraud</div>
              <div style={{ padding: '8px 12px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)' }}>Review</div>
            </div>
          </GlassCard>
          <GlassCard style={{ padding: 16 }}>
            <div style={{ fontWeight: 600 }}>Threat Feed</div>
            <div style={{ opacity: 0.7, marginTop: 6 }}>12 events · last 24h</div>
            <div style={{ opacity: 0.7 }}>2 high severity</div>
          </GlassCard>
          <div style={{ marginTop: 'auto', paddingTop: 8, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-around', fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <SlideIcon name="data-grid" size={14} glowColor="white" variant="simple" />
              <span>Home</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, color: theme.accent.teal }}>
              <SlideIcon name="shield" size={14} glowColor="teal" variant="simple" />
              <span>Protect</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <SlideIcon name="wave" size={14} glowColor="white" variant="simple" />
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
