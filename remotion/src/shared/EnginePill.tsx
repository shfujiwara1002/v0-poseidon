import React from 'react';
import { theme } from './theme';
import { SlideIcon, type IconGlowColor } from './SlideIcon';

interface EnginePillProps {
  status: 'Protect' | 'Grow' | 'Execute' | 'Govern';
  active?: boolean;
  accentColor?: string;
}

const iconMap = {
  Protect: 'shield',
  Grow: 'wave',
  Execute: 'gear',
  Govern: 'govern-core',
} as const;

const glowMap = {
  Protect: 'red',
  Grow: 'violet',
  Execute: 'amber',
  Govern: 'cyan',
} as const satisfies Record<EnginePillProps['status'], IconGlowColor>;

export const EnginePill: React.FC<EnginePillProps> = ({ status, active = true, accentColor }) => {
  const defaultColor = {
    Protect: theme.semantic.threat,
    Grow: theme.semantic.growth,
    Execute: theme.accent.amber,
    Govern: theme.accent.cyan,
  }[status];

  const color = accentColor ?? defaultColor;

  // Per-engine inner glow colors for dark/deep/sharp aesthetic
  const innerGlowMap: Record<string, string> = {
    Protect: 'rgba(239,68,68,0.25)',
    Grow: 'rgba(139,92,246,0.25)',
    Execute: 'rgba(245,158,11,0.25)',
    Govern: 'rgba(0,240,255,0.25)',
  };
  const innerGlow = innerGlowMap[status] ?? 'rgba(0,240,255,0.25)';
  const borderGlow = defaultColor;

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '10px 20px',
        borderRadius: 9999,
        background: theme.glass.glassBg,
        backgroundImage: theme.glass.glassOverlay,
        backdropFilter: theme.glass.glassBackdrop,
        WebkitBackdropFilter: theme.glass.glassBackdrop,
        border: `1px solid ${active ? borderGlow + '55' : 'rgba(255,255,255,0.1)'}`,
        boxShadow: active
          ? `0 0 8px ${innerGlow}, 0 0 20px ${innerGlow}, inset 0 0 16px ${innerGlow}, inset 0 1px 0 rgba(255,255,255,0.2)`
          : theme.glass.glassInsetHighlight,
        opacity: active ? 1 : 0.5,
      }}
    >
      <SlideIcon name={iconMap[status]} size={20} glowColor={glowMap[status]} />
      <span
        style={{
          fontFamily: theme.typography.fontUi,
          fontSize: theme.typographyScale.label,
          color,
        }}
      >
        {status}
      </span>
    </div>
  );
};
