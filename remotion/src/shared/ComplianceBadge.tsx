import React from 'react';
import { theme } from './theme';

type BadgeColor = 'cyan' | 'teal' | 'violet' | 'amber';

interface ComplianceBadgeProps {
  children: React.ReactNode;
  color?: BadgeColor;
  style?: React.CSSProperties;
}

const colorOverrides: Partial<Record<BadgeColor, { border: string; boxShadow: string; textShadow: string }>> = {
  teal: {
    border: '1px solid rgba(20,184,166,0.6)',
    boxShadow:
      '0 0 12px rgba(20,184,166,0.55), 0 0 28px rgba(20,184,166,0.45), 0 0 52px rgba(20,184,166,0.3), inset 0 0 14px rgba(20,184,166,0.22)',
    textShadow: theme.neon.teal.sharper,
  },
  violet: {
    border: '1px solid rgba(139,92,246,0.6)',
    boxShadow:
      '0 0 12px rgba(139,92,246,0.55), 0 0 28px rgba(139,92,246,0.45), 0 0 52px rgba(139,92,246,0.3), inset 0 0 14px rgba(139,92,246,0.22)',
    textShadow: theme.neon.violet.sharper,
  },
  amber: {
    border: '1px solid rgba(245,158,11,0.6)',
    boxShadow:
      '0 0 12px rgba(245,158,11,0.55), 0 0 28px rgba(245,158,11,0.45), 0 0 52px rgba(245,158,11,0.3), inset 0 0 14px rgba(245,158,11,0.22)',
    textShadow: theme.neon.amber.sharper,
  },
};

export const ComplianceBadge: React.FC<ComplianceBadgeProps> = ({
  children,
  color = 'cyan',
  style,
}) => {
  const overrides = colorOverrides[color];
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '6px 16px',
        fontSize: theme.typographyScale.badge,
        fontFamily: theme.typography.fontMono,
        background: theme.complianceBadge.background,
        border: overrides?.border ?? theme.complianceBadge.border,
        borderRadius: 7,
        color: theme.complianceBadge.color,
        letterSpacing: '0.04em',
        textShadow: overrides?.textShadow ?? theme.complianceBadge.textShadow,
        boxShadow: overrides?.boxShadow ?? theme.complianceBadge.boxShadow,
        ...style,
      }}
    >
      {children}
    </span>
  );
};
