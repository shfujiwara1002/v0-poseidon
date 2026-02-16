/**
 * @deprecated — CSS-variable-based theme aliases.
 * Kept for 16 assets/icons/charts that reference this module.
 * New code should use src/design-system/theme.ts tokens or
 * src/shared/theme.ts for hardcoded values.
 */
export const theme = {
  accent: {
    cyan: 'var(--accent-cyan)',
    teal: 'var(--accent-teal)',
    violet: 'var(--accent-violet)',
    amber: 'var(--accent-amber)',
    blue: 'var(--accent-blue)',
    red: 'var(--accent-red)',
    gold: 'var(--accent-gold)',
  },
  semantic: {
    threat: 'var(--engine-protect)',
    growth: 'var(--engine-grow)',
    execute: 'var(--engine-execute)',
    govern: 'var(--engine-govern)',
  },
  glass: {
    glassBorder: 'var(--glass-border)',
    glassBg: 'var(--glass-bg)',
    glassOverlay: 'linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0))',
    glassShadow: 'var(--glass-shadow)',
    glassInsetHighlight: 'var(--glass-inset)',
    glassEdge: 'var(--glass-edge)',
    glassBackdrop: 'var(--glass-backdrop)',
  },
  typography: {
    fontUi: 'var(--font-body)',
    fontHeader: 'var(--font-display)',
    fontMono: 'var(--font-mono)',
    fallbackCjk: "'Noto Sans JP', sans-serif",
    numericFeatureSettings: '"tnum" 1, "lnum" 1',
    numericVariant: 'tabular-nums lining-nums',
  },
  typographyScale: {
    body: '14px',
    cardTitle: '16px',
    meta: '11px',
    badge: '12px',
  },
  background: {
    deepNavy: 'var(--bg)',
  },
};
