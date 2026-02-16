import React, { CSSProperties } from 'react';
import { theme } from './theme';

type NeonColor = 'cyan' | 'violet' | 'amber' | 'blue' | 'red' | 'teal';
type ElementTag = 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3';

interface NeonTextProps {
  color: NeonColor;
  deep?: boolean;
  sharper?: boolean;
  gradient?: boolean;
  as?: ElementTag;
  style?: CSSProperties;
  children: React.ReactNode;
}

const neonShadows: Record<NeonColor, { standard: string; deep: string; sharper: string }> = {
  cyan: theme.neon.cyan,
  violet: theme.neon.violet,
  amber: theme.neon.amber,
  blue: theme.neon.blue,
  red: theme.neon.red,
  teal: theme.neon.teal,
};

const gradientMap: Record<NeonColor, string> = {
  cyan: theme.gradientText.cyan,
  violet: theme.gradientText.violet,
  amber: theme.gradientText.amber,
  blue: 'linear-gradient(90deg, #93c5fd 0%, #3b82f6 100%)',
  red: 'linear-gradient(90deg, #fca5a5 0%, #ef4444 100%)',
  teal: 'linear-gradient(90deg, #5eead4 0%, #14b8a6 100%)',
};

export const NeonText: React.FC<NeonTextProps> = ({
  color,
  deep = false,
  sharper: _sharper = false,
  gradient = false,
  as: Tag = 'span',
  style,
  children,
}) => {
  const variant = deep ? 'deep' : 'sharper';
  const shadow = neonShadows[color][variant];

  if (gradient) {
    return (
      <Tag
        style={{
          background: gradientMap[color],
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          WebkitTextFillColor: 'transparent',
          textShadow: theme.gradientTextShadow,
          ...style,
        }}
      >
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      style={{
        color: theme.accent[color],
        textShadow: shadow,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
};
