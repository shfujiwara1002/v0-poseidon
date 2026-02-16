import React from 'react';
import { Link } from '../router';

const samples: { label: string; size: number; weight: number; family: string }[] = [
  { label: 'Display',   size: 32, weight: 700, family: 'Inter, system-ui, sans-serif' },
  { label: 'Headline',  size: 24, weight: 700, family: 'Inter, system-ui, sans-serif' },
  { label: 'Title',     size: 20, weight: 600, family: 'Inter, system-ui, sans-serif' },
  { label: 'Subtitle',  size: 16, weight: 600, family: 'Inter, system-ui, sans-serif' },
  { label: 'Body',      size: 15, weight: 400, family: 'Inter, system-ui, sans-serif' },
  { label: 'Body Bold', size: 15, weight: 600, family: 'Inter, system-ui, sans-serif' },
  { label: 'Caption',   size: 13, weight: 400, family: 'Inter, system-ui, sans-serif' },
  { label: 'Overline',  size: 11, weight: 600, family: 'Inter, system-ui, sans-serif' },
  { label: 'Mono',      size: 13, weight: 400, family: "'JetBrains Mono', monospace" },
];

export const DesignSystemTokensTypography: React.FC = () => (
  <div style={{ minHeight: '100vh', padding: '48px 24px', color: 'rgba(255,255,255,0.92)' }}>
    <header style={{ maxWidth: 720, margin: '0 auto 40px' }}>
      <Link to="/design-system/tokens" style={{ fontSize: 13, opacity: 0.5, textDecoration: 'none', color: 'inherit' }}>
        Tokens
      </Link>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginTop: 8 }}>Typography Scale</h1>
    </header>

    <div style={{ maxWidth: 720, margin: '0 auto', display: 'grid', gap: 24 }}>
      {samples.map((s) => (
        <div
          key={s.label}
          style={{
            background: 'var(--ds-surface-bg)',
            border: '1px solid var(--ds-surface-border)',
            borderRadius: 'var(--ds-border-radius-surface, 16px)',
            padding: '16px 20px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
            <span style={{ fontSize: 12, opacity: 0.5, fontFamily: 'monospace' }}>{s.label}</span>
            <span style={{ fontSize: 11, opacity: 0.4, fontFamily: 'monospace' }}>
              {s.size}px / {s.weight}
            </span>
          </div>
          <p style={{ fontSize: s.size, fontWeight: s.weight, fontFamily: s.family, lineHeight: 1.3, margin: 0 }}>
            The quick brown fox jumps
          </p>
          <p style={{ fontSize: 11, opacity: 0.35, fontFamily: 'monospace', marginTop: 6 }}>
            {s.family}
          </p>
        </div>
      ))}
    </div>
  </div>
);

export default DesignSystemTokensTypography;
