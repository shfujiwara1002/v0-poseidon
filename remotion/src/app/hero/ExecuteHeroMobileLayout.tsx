import React from 'react';
import { GlassCard } from '../../shared/GlassCard';
import { ComplianceBadge } from '../../shared/ComplianceBadge';
import { SlideIcon } from '../../shared/SlideIcon';
import { theme } from '../../shared/theme';
import { HeroLayoutFrame } from './HeroLayoutFrame';
import { PhoneFrame } from './PhoneFrame';

export const ExecuteHeroMobileLayout: React.FC = () => {
  return (
    <HeroLayoutFrame title="Execute (Mobile)" subtitle="Consent-first automation" variant="mobile">
      <div style={{ gridColumn: 'span 12', display: 'flex', justifyContent: 'center' }}>
        <PhoneFrame title="Execute">
          <GlassCard variant="gold" style={{ padding: 16 }}>
            <div style={{ fontWeight: 600 }}>Negotiate Comcast bill</div>
            <div style={{ opacity: 0.7, marginTop: 6 }}>Savings: $18/mo</div>
            <div style={{ opacity: 0.7 }}>Current: $138 → $120</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 8, fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>
              <span>One-time action</span>
              <span>Consent required</span>
            </div>
          </GlassCard>
          <GlassCard style={{ padding: 16 }}>
            <div style={{ fontWeight: 600 }}>Explainability</div>
            <div style={{ opacity: 0.7, marginTop: 6 }}>Price vs market · Usage stability · Payment history</div>
            <div style={{ opacity: 0.7, marginTop: 6 }}>Confidence 0.82</div>
            <div style={{ color: theme.accent.cyan, marginTop: 8 }}>Govern-Verified</div>
            <ComplianceBadge color="amber">Audit ID G-EX-0417</ComplianceBadge>
          </GlassCard>
          <GlassCard style={{ padding: 16 }}>
            <div style={{ fontWeight: 600 }}>Actions</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
              <div style={{ padding: '8px 12px', borderRadius: 10, background: theme.accent.amber, color: '#1a0d00', fontWeight: 600 }}>Approve</div>
              <div style={{ padding: '8px 12px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.3)' }}>Cancel</div>
              <div style={{ padding: '8px 12px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)' }}>Review</div>
            </div>
          </GlassCard>
          <GlassCard style={{ padding: 16 }}>
            <div style={{ fontWeight: 600 }}>Automation Queue</div>
            <div style={{ opacity: 0.7, marginTop: 6 }}>5 pending approvals</div>
            <div style={{ opacity: 0.7 }}>Savings $240/mo</div>
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
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <SlideIcon name="wave" size={14} glowColor="white" variant="simple" />
              <span>Grow</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, color: theme.accent.amber }}>
              <SlideIcon name="signal-beam" size={14} glowColor="amber" variant="simple" />
              <span>Execute</span>
            </div>
          </div>
        </PhoneFrame>
      </div>
    </HeroLayoutFrame>
  );
};
