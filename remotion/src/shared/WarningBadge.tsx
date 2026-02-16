import React from 'react';
import { theme } from './theme';

interface WarningBadgeProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const WarningBadge: React.FC<WarningBadgeProps> = ({ children, style }) => {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '10px 20px',
        background: theme.warningBadge.background,
        border: theme.warningBadge.border,
        borderRadius: 8,
        fontFamily: theme.typography.fontHeader,
        fontWeight: 600,
        fontSize: 24,
        color: theme.warningBadge.color,
        textShadow: theme.warningBadge.textShadow,
        boxShadow: theme.warningBadge.boxShadow,
        ...style,
      }}
    >
      {children}
    </span>
  );
};
