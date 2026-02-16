import React from 'react';
import { Link } from '../router';

interface ComponentEntry {
  name: string;
  description: string;
  usage: string;
}

const primitives: ComponentEntry[] = [
  { name: 'Surface',  description: 'Glass/solid card container that responds to effect presets.', usage: '<Surface variant="elevated">...</Surface>' },
  { name: 'Button',   description: 'Primary action trigger with engine-color accent support.',    usage: '<Button variant="primary" engine="protect">Save</Button>' },
  { name: 'Badge',    description: 'Status indicator chip with state-color tones.',               usage: '<Badge tone="healthy">Active</Badge>' },
  { name: 'Input',    description: 'Text input with validation states and label slot.',            usage: '<Input label="Email" error="Required" />' },
  { name: 'Toggle',   description: 'Binary switch control for settings and permissions.',          usage: '<Toggle checked={on} onChange={setOn} />' },
  { name: 'Progress', description: 'Determinate and indeterminate progress indicator.',            usage: '<Progress value={72} max={100} />' },
  { name: 'Tooltip',  description: 'Contextual hover overlay anchored to trigger element.',        usage: '<Tooltip content="Details">Hover me</Tooltip>' },
  { name: 'Skeleton', description: 'Loading placeholder with pulse animation.',                    usage: '<Skeleton width={200} height={20} />' },
  { name: 'Toast',    description: 'Non-blocking notification with auto-dismiss.',                 usage: 'toast({ title: "Saved", tone: "healthy" })' },
  { name: 'Dialog',   description: 'Modal overlay for confirmations and focused workflows.',       usage: '<Dialog open={show} onClose={close}>...</Dialog>' },
];

export const DesignSystemComponents: React.FC = () => (
  <div style={{ minHeight: '100vh', padding: '48px 24px', color: 'rgba(255,255,255,0.92)' }}>
    <header style={{ maxWidth: 720, margin: '0 auto 40px' }}>
      <Link to="/design-system" style={{ fontSize: 13, opacity: 0.5, textDecoration: 'none', color: 'inherit' }}>
        Design System
      </Link>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginTop: 8 }}>Component Catalog</h1>
      <p style={{ fontSize: 15, opacity: 0.6, marginTop: 4 }}>
        10 primitive components forming the base layer of the Poseidon UI.
      </p>
    </header>

    <div style={{ maxWidth: 720, margin: '0 auto', display: 'grid', gap: 16 }}>
      {primitives.map((c, i) => (
        <div
          key={c.name}
          style={{
            background: 'var(--ds-surface-bg)',
            border: '1px solid var(--ds-surface-border)',
            borderRadius: 'var(--ds-border-radius-surface, 16px)',
            backdropFilter: 'var(--ds-backdrop-filter)',
            boxShadow: 'var(--ds-surface-shadow)',
            padding: '20px 24px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <h2 style={{ fontSize: 16, fontWeight: 600 }}>{c.name}</h2>
            <span style={{ fontSize: 11, fontFamily: 'monospace', opacity: 0.35 }}>#{i + 1}</span>
          </div>
          <p style={{ fontSize: 14, opacity: 0.7, margin: '6px 0 10px' }}>{c.description}</p>
          <code
            style={{
              display: 'block', fontSize: 12, fontFamily: "'JetBrains Mono', monospace",
              padding: '8px 12px', borderRadius: 8,
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)',
              whiteSpace: 'pre-wrap', wordBreak: 'break-all',
            }}
          >
            {c.usage}
          </code>
        </div>
      ))}
    </div>

    <div style={{ maxWidth: 720, margin: '32px auto 0', textAlign: 'center' }}>
      <Link to="/design-system/tokens" className="entry-btn entry-btn--ghost">
        Browse Tokens
      </Link>
    </div>
  </div>
);

export default DesignSystemComponents;
