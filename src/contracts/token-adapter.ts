/**
 * Prototype token adapter that mirrors protected Remotion design tokens.
 * This is the explicit parity surface used by validation scripts.
 *
 * Separates engine-identity colors from state-meaning colors
 * per articulation doc requirement.
 */
export const prototypeTokenAdapter = {
  // State-meaning colors (what something MEANS)
  semantic: {
    ai: '#00F0FF',       // Cyan: AI intelligence
    human: '#F59E0B',    // Amber: Human action/approval
    growth: '#8B5CF6',   // Violet: Positive momentum
    threat: '#EF4444',   // Red: Risk/warning/blocked
    success: '#14B8A6',  // Teal: Success state
    info: '#3B82F6',     // Blue: Information
    warning: '#F59E0B',  // Amber: Caution
    error: '#EF4444',    // Red: Error state
    neutral: 'rgba(255,255,255,0.72)',
  },

  // Engine-identity colors (WHICH engine)
  engine: {
    dashboard: '#00F0FF', // Cyan
    protect: '#14B8A6',   // Teal
    grow: '#8B5CF6',      // Violet
    execute: '#F59E0B',   // Amber
    govern: '#3B82F6',    // Blue
  },

  typography: {
    fontHeader: "'Inter', 'Noto Sans JP', system-ui, sans-serif",
    fontUi: "'Inter', 'Noto Sans JP', system-ui, sans-serif",
    fontMono: "'JetBrains Mono', 'Noto Sans JP', ui-monospace, monospace",
  },
} as const;
