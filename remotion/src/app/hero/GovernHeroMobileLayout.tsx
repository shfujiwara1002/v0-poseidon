import React from 'react';
import { GlassCard } from '../../shared/GlassCard';
import { ComplianceBadge } from '../../shared/ComplianceBadge';
import { SlideIcon } from '../../shared/SlideIcon';
import { theme } from '../../shared/theme';
import { HeroLayoutFrame } from './HeroLayoutFrame';
import { PhoneFrame } from './PhoneFrame';

export const GovernHeroMobileLayout: React.FC = () => {
  return (
    <HeroLayoutFrame title="Govern (Mobile)" subtitle="Trust by design" variant="mobile">
      <div style={{ gridColumn: 'span 12', display: 'flex', justifyContent: 'center' }}>
        <PhoneFrame title="Govern">
          <GlassCard variant="blue" style={{ padding: 16 }}>
            <div style={{ fontWeight: 600 }}>Trust Index</div>
            <div style={{ color: theme.accent.cyan, fontSize: 24, fontWeight: 700, marginTop: 6 }}>92/100</div>
            <div style={{ opacity: 0.7, marginTop: 6 }}>Transparency · Oversight · Audit</div>
          </GlassCard>
          <GlassCard style={{ padding: 16 }}>
            <div style={{ fontWeight: 600 }}>Audit Ledger</div>
            <div style={{ opacity: 0.7, marginTop: 6 }}>G-PF-0192 · Protect · Open</div>
            <div style={{ opacity: 0.7 }}>G-GR-0821 · Grow · Reviewed</div>
            <div style={{ opacity: 0.7 }}>G-EX-0417 · Execute · Approved</div>
          </GlassCard>
          <GlassCard style={{ padding: 16 }}>
            <div style={{ fontWeight: 600 }}>Oversight + Consent</div>
            <div style={{ opacity: 0.7, marginTop: 6 }}>3 reviews · SLA 24h</div>
            <div style={{ opacity: 0.7 }}>2 revocations · last 24h</div>
          </GlassCard>
          <GlassCard style={{ padding: 16 }}>
            <div style={{ fontWeight: 600 }}>Policy</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 6 }}>
              <ComplianceBadge>EU AI Act</ComplianceBadge>
              <ComplianceBadge color="amber">CFPB</ComplianceBadge>
              <ComplianceBadge color="violet">NIST RMF</ComplianceBadge>
            </div>
          </GlassCard>
          <GlassCard style={{ padding: 16 }}>
            <div style={{ fontWeight: 600 }}>Explainability Registry</div>
            <div style={{ opacity: 0.7, marginTop: 6 }}>4 models current</div>
            <div style={{ opacity: 0.7 }}>No drift detected</div>
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
