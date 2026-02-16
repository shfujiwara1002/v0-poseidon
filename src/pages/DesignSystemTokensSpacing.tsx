import React from 'react';
import { Link } from '../router';

const scale: { key: string; px: number }[] = [
  { key: '1',  px: 4 },
  { key: '2',  px: 8 },
  { key: '3',  px: 12 },
  { key: '4',  px: 16 },
  { key: '5',  px: 20 },
  { key: '6',  px: 24 },
  { key: '8',  px: 32 },
  { key: '10', px: 40 },
  { key: '12', px: 48 },
];

export const DesignSystemTokensSpacing: React.FC = () => (
  <div style={{ minHeight: '100vh', padding: '48px 24px', color: 'rgba(255,255,255,0.92)' }}>
    <header style={{ maxWidth: 720, margin: '0 auto 40px' }}>
      <Link to="/design-system/tokens" style={{ fontSize: 13, opacity: 0.5, textDecoration: 'none', color: 'inherit' }}>
        Tokens
      </Link>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginTop: 8 }}>Spacing Scale</h1>
      <p style={{ fontSize: 14, opacity: 0.6, marginTop: 4 }}>
        Base-4 spatial scale used for padding, margin, and gap.
      </p>
    </header>

    <div style={{ maxWidth: 720, margin: '0 auto', display: 'grid', gap: 12 }}>
      {scale.map((s) => (
        <div key={s.key} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ width: 48, fontSize: 13, fontFamily: 'monospace', opacity: 0.5, textAlign: 'right' }}>
            sp-{s.key}
          </span>
          <div
            style={{
              width: s.px,
              height: 24,
              background: 'var(--accent-cyan)',
              borderRadius: 4,
              opacity: 0.7,
              flexShrink: 0,
            }}
          />
          <span style={{ fontSize: 13, fontFamily: 'monospace', opacity: 0.5 }}>
            {s.px}px
          </span>
        </div>
      ))}
    </div>

    <section style={{ maxWidth: 720, margin: '48px auto 0' }}>
      <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Radius Scale</h2>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        {[{ label: 'sm', value: '12px' }, { label: 'md', value: '16px' }, { label: 'lg', value: '24px' }].map((r) => (
          <div key={r.label} style={{ textAlign: 'center' }}>
            <div
              style={{
                width: 64, height: 64,
                border: '2px solid var(--accent-cyan)',
                borderRadius: r.value,
                opacity: 0.6,
              }}
            />
            <div style={{ fontSize: 12, fontFamily: 'monospace', opacity: 0.5, marginTop: 8 }}>
              {r.label} ({r.value})
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default DesignSystemTokensSpacing;
