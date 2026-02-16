import React from 'react';
import { Link } from '../router';

const sections = [
  { title: 'Colors',     path: '/design-system/tokens/colors',     description: 'Engine, accent, state, surface, and glass color tokens' },
  { title: 'Typography', path: '/design-system/tokens/typography', description: 'Font families, size scale, weight, and line-height' },
  { title: 'Spacing',    path: '/design-system/tokens/spacing',    description: 'Spatial scale from 4px to 48px' },
  { title: 'Motion',     path: '/design-system/tokens/motion',     description: 'Duration, easing, and animation entry tokens' },
];

export const DesignSystemTokens: React.FC = () => (
  <div style={{ minHeight: '100vh', padding: '48px 24px', color: 'rgba(255,255,255,0.92)' }}>
    <header style={{ maxWidth: 720, margin: '0 auto 40px' }}>
      <Link to="/design-system" style={{ fontSize: 13, opacity: 0.5, textDecoration: 'none', color: 'inherit' }}>
        Design System
      </Link>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginTop: 8 }}>Design Tokens</h1>
      <p style={{ fontSize: 15, opacity: 0.6, marginTop: 4 }}>
        Primitive values that drive every surface, color, and motion in the system.
      </p>
    </header>

    <div style={{ maxWidth: 720, margin: '0 auto', display: 'grid', gap: 16 }}>
      {sections.map((s) => (
        <Link
          key={s.path}
          to={s.path}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <div
            style={{
              background: 'var(--ds-surface-bg)',
              border: '1px solid var(--ds-surface-border)',
              borderRadius: 'var(--ds-border-radius-surface, 16px)',
              backdropFilter: 'var(--ds-backdrop-filter)',
              boxShadow: 'var(--ds-surface-shadow)',
              padding: '20px 24px',
              transition: 'border-color 200ms',
            }}
          >
            <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>{s.title}</h2>
            <p style={{ fontSize: 13, opacity: 0.6 }}>{s.description}</p>
          </div>
        </Link>
      ))}
    </div>

    <div style={{ maxWidth: 720, margin: '32px auto 0', textAlign: 'center' }}>
      <Link to="/design-system/components" className="entry-btn entry-btn--ghost">
        Browse Components
      </Link>
    </div>
  </div>
);

export default DesignSystemTokens;
