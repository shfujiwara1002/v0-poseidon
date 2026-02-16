import React from 'react';
import { GlassCard } from '../../shared/GlassCard';
import { ComplianceBadge } from '../../shared/ComplianceBadge';
import { EnginePill } from '../../shared/EnginePill';
import { theme } from '../../shared/theme';
import { HeroLayoutFrame } from './HeroLayoutFrame';

export const GovernHeroLayout: React.FC = () => {
  const metricRow = (label: string, value: number, color: string) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
      <div style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>
        {label}
      </div>
      <div style={{ fontSize: 20, fontWeight: 700, color }}>{value}</div>
      <div style={{ height: 6, borderRadius: 999, background: 'rgba(255,255,255,0.12)' }}>
        <div style={{ height: 6, width: `${value}%`, borderRadius: 999, background: color }} />
      </div>
    </div>
  );

  const factorBar = (label: string, value: number) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{label}</div>
      <div style={{ height: 6, borderRadius: 999, background: 'rgba(255,255,255,0.12)' }}>
        <div style={{ height: 6, width: `${value * 100}%`, borderRadius: 999, background: `linear-gradient(90deg, ${theme.accent.blue} 0%, ${theme.accent.cyan} 100%)` }} />
      </div>
    </div>
  );

  const auditRow = (id: string, engine: 'Protect' | 'Grow' | 'Execute' | 'Govern', action: string, time: string, status: string) => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '110px 1fr 1.2fr 100px 100px',
        gap: 12,
        alignItems: 'center',
        padding: '10px 0',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        fontSize: 13,
      }}
    >
      <div style={{ color: 'rgba(255,255,255,0.7)' }}>{id}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <EnginePill status={engine} />
        <span style={{ color: 'rgba(255,255,255,0.6)' }}>{engine}</span>
      </div>
      <div style={{ color: 'rgba(255,255,255,0.6)' }}>{action}</div>
      <div style={{ color: 'rgba(255,255,255,0.6)' }}>{time}</div>
      <div style={{ color: 'rgba(255,255,255,0.75)' }}>{status}</div>
    </div>
  );

  return (
    <HeroLayoutFrame
      title="Govern 2.0: Trust by Design"
      subtitle="Every decision is explainable, reviewable, and logged."
      engine="Govern"
    >
      <div style={{ gridColumn: 'span 7', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <GlassCard variant="blue" style={{ minHeight: 170, padding: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ fontSize: 20, fontWeight: 600 }}>Trust Index</div>
            <ComplianceBadge>GOVERN</ComplianceBadge>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12 }}>
            <div style={{ fontSize: 38, fontWeight: 700, color: theme.accent.cyan }}>92</div>
            <div style={{ color: 'rgba(255,255,255,0.6)' }}>/100 · stable</div>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.6)', marginTop: 8 }}>No material drift detected in the last 24h.</div>
          <div style={{ display: 'flex', gap: 16, marginTop: 14 }}>
            {metricRow('Transparency', 96, theme.accent.cyan)}
            {metricRow('Oversight', 88, theme.accent.blue)}
            {metricRow('Audit Coverage', 98, theme.accent.teal)}
          </div>
        </GlassCard>

        <GlassCard style={{ minHeight: 240, padding: 20 }}>
          <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Audit Ledger</div>
          <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr 1.2fr 100px 100px', gap: 12, fontSize: 11, color: 'rgba(255,255,255,0.5)', paddingBottom: 6 }}>
            <div>Audit ID</div>
            <div>Engine</div>
            <div>Action</div>
            <div>Time</div>
            <div>Status</div>
          </div>
          {auditRow('G‑PF‑0192', 'Protect', 'Flag unauthorized transfer', '02:14', 'Open')}
          {auditRow('G‑GR‑0821', 'Grow', 'Update forecast drivers', '08:32', 'Reviewed')}
          {auditRow('G‑EX‑0417', 'Execute', 'Approve bill negotiation', '09:05', 'Approved')}
          {auditRow('G‑GV‑1103', 'Govern', 'Model card updated', '09:18', 'Logged')}
        </GlassCard>
      </div>

      <div style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <GlassCard style={{ minHeight: 200, padding: 20 }}>
          <div style={{ fontSize: 18, fontWeight: 600 }}>Audit Detail</div>
          <div style={{ color: 'rgba(255,255,255,0.7)', marginTop: 6 }}>G‑PF‑0192 · Protect · High risk</div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 10 }}>
            <ComplianceBadge>GOVERN‑VERIFIED</ComplianceBadge>
            <span style={{ color: theme.accent.cyan, fontSize: 13 }}>Confidence 0.86</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
            {factorBar('Policy mismatch', 0.82)}
            {factorBar('Consent absent', 0.68)}
            {factorBar('Risk threshold exceeded', 0.54)}
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>View full audit log</div>
        </GlassCard>

        <GlassCard style={{ minHeight: 110, padding: 18 }}>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Human Oversight</div>
          <div style={{ color: 'rgba(255,255,255,0.7)', marginTop: 6 }}>3 pending · SLA 24h</div>
          <div style={{ color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>1 high‑risk review due in 3h</div>
        </GlassCard>

        <GlassCard style={{ minHeight: 110, padding: 18 }}>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Consent Center</div>
          <div style={{ color: 'rgba(255,255,255,0.7)', marginTop: 6 }}>2 revocations · last 24h</div>
          <div style={{ color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>All access logs healthy</div>
        </GlassCard>
      </div>

      <div style={{ gridColumn: 'span 6', display: 'flex', flexDirection: 'column' }}>
        <GlassCard style={{ minHeight: 150, padding: 18 }}>
          <div style={{ fontSize: 18, fontWeight: 600 }}>Explainability Registry</div>
          <div style={{ color: 'rgba(255,255,255,0.7)', marginTop: 6 }}>Protect‑Alert‑V3 · Summary + Factors + Counterfactual</div>
          <div style={{ color: 'rgba(255,255,255,0.6)', marginTop: 6 }}>Grow‑Forecast‑V2 · Summary + Drivers + Confidence</div>
          <div style={{ color: 'rgba(255,255,255,0.6)', marginTop: 6 }}>Execute‑Action‑V1 · Summary + Consent + Audit</div>
        </GlassCard>
      </div>
      <div style={{ gridColumn: 'span 6', display: 'flex', flexDirection: 'column' }}>
        <GlassCard style={{ minHeight: 150, padding: 18 }}>
          <div style={{ fontSize: 18, fontWeight: 600 }}>Policy & Model Cards</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 8 }}>
            <ComplianceBadge>EU AI Act</ComplianceBadge>
            <ComplianceBadge color="amber">CFPB</ComplianceBadge>
            <ComplianceBadge color="violet">NIST RMF</ComplianceBadge>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.7)', marginTop: 10 }}>Risk‑Detect‑v4 · 99.2% precision</div>
          <div style={{ color: 'rgba(255,255,255,0.6)', marginTop: 6 }}>Forecast‑v1.9 · 87% confidence range</div>
        </GlassCard>
      </div>
      <div style={{ gridColumn: 'span 12', display: 'flex', gap: 20 }}>
        <GlassCard style={{ flex: 1, padding: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Oversight Queue</div>
          <div style={{ marginTop: 6, color: 'rgba(255,255,255,0.7)' }}>3 pending · SLA 24h</div>
        </GlassCard>
        <GlassCard style={{ flex: 1, padding: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Explainability Registry</div>
          <div style={{ marginTop: 6, color: 'rgba(255,255,255,0.7)' }}>4 models current</div>
        </GlassCard>
        <GlassCard style={{ flex: 1, padding: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Policy Coverage</div>
          <div style={{ marginTop: 6, color: 'rgba(255,255,255,0.7)' }}>100% compliant</div>
        </GlassCard>
      </div>
    </HeroLayoutFrame>
  );
};
