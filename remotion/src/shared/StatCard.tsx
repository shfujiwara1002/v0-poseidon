import React from 'react';
import { theme } from './theme';
import { GlassCard } from './GlassCard';
import { SlideIcon, IconGlowColor } from './SlideIcon';

interface StatCardProps {
  label: string;
  value: string;
  subtext?: string;
  icon?: string;
  style?: React.CSSProperties;
  cardStyle?: React.CSSProperties;
  size?: 'sm' | 'md' | 'lg' | 'slide' | 'enforced' | 'compact';
  accentColor?: string;
  iconGlowColor?: IconGlowColor;
  showIcon?: boolean;
  tone?: 'default' | 'dark';
  liquidGlass?: boolean | 'off' | 'subtle' | 'standard';
  debugId?: string;
}

const sizeMap = {
  sm: {
    labelSize: 16,
    valueSize: theme.typographyScale.cardTitle,
    subtextSize: theme.typographyScale.footnote,
  },
  compact: {
    labelSize: 14,
    valueSize: 50,
    subtextSize: 16,
  },
  md: {
    labelSize: theme.typographyScale.label,
    valueSize: theme.typographyScale.cardTitle,
    subtextSize: theme.typographyScale.label,
  },
  lg: {
    labelSize: theme.typographyScale.label,
    valueSize: theme.typographyScale.cardTitle,
    subtextSize: theme.typographyScale.label,
  },
  slide: {
    labelSize: theme.typographyScale.label,
    valueSize: theme.typographyScale.cardTitle,
    subtextSize: theme.typographyScale.body,
  },
  enforced: {
    labelSize: theme.typographyScale.label,
    valueSize: theme.typographyScale.cardTitle,
    subtextSize: theme.typographyScale.body,
  },
} as const;

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subtext,
  icon,
  style,
  cardStyle,
  size = 'enforced',
  accentColor,
  iconGlowColor,
  showIcon = true,
  tone = 'default',
  liquidGlass = 'subtle',
  debugId,
}) => {
  const config = sizeMap[size];
  const valueColor = accentColor || '#ffffff';
  const valueTextShadow = accentColor
    ? `0 0 1px ${accentColor}, 0 0 3px ${accentColor}, 0 0 8px ${accentColor}E6, 0 0 16px ${accentColor}80, 0 0 28px ${accentColor}33`
    : theme.neon.cyan.sharper;

  return (
    <GlassCard
      debugId={debugId}
      tone={tone}
      liquidGlass={liquidGlass}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        minWidth: 130,
        textAlign: 'center',
        padding: '20px 24px',
        ...cardStyle,
        ...style,
      }}
    >
      {showIcon && icon && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <SlideIcon name={icon} size={24} glowColor={iconGlowColor || 'cyan'} />
        </div>
      )}
      <div
        style={{
          fontFamily: theme.typography.fontUi,
          fontSize: config.labelSize,
          color: 'rgba(255,255,255,0.7)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: theme.typography.fontHeader,
          fontSize: config.valueSize,
          fontWeight: 700,
          color: valueColor,
          textShadow: valueTextShadow,
          fontVariantNumeric: theme.typography.numericVariant,
          fontFeatureSettings: theme.typography.numericFeatureSettings,
        }}
      >
        {value}
      </div>
      {subtext && (
        <div
          style={{
            fontFamily: theme.typography.fontUi,
            fontSize: config.subtextSize,
            color: 'rgba(255,255,255,0.6)',
            marginTop: 4,
          }}
        >
          {subtext}
        </div>
      )}
    </GlassCard>
  );
};
