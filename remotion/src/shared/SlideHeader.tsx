import React from 'react';
import { theme } from './theme';

type SlideHeaderProps = {
  badge?: string;
  title: string;
  titleNode?: React.ReactNode;
  subtitle?: string;
  subtitleHighlight?: string;
  titleColor?: string;
  align?: 'left' | 'center';
  maxWidth?: number | string;
  badgeVariant?: 'compliance' | 'warning';
  subtitleHighlightColor?: string;
  subtitleHighlightShadow?: string;
  badgeTheme?: {
    background: string;
    border: string;
    color: string;
    boxShadow: string;
    textShadow: string;
  };
  headerStyle?: React.CSSProperties;
  badgeStyle?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
  subtitleNode?: React.ReactNode;
  subtitleStyle?: React.CSSProperties;
  debugId?: string;
  debugBadgeId?: string;
  debugTitleId?: string;
  debugSubtitleId?: string;
};

export const SlideHeader: React.FC<SlideHeaderProps> = ({
  badge,
  title,
  titleNode,
  subtitle,
  subtitleHighlight,
  titleColor,
  align = 'left',
  maxWidth = '100%',
  badgeVariant = 'compliance',
  subtitleHighlightColor = '#34D399',
  subtitleHighlightShadow = '0 0 6px rgba(52,211,153,0.8), 0 0 16px rgba(52,211,153,0.6), 0 0 32px rgba(52,211,153,0.45)',
  badgeTheme,
  headerStyle,
  badgeStyle,
  titleStyle,
  subtitleNode,
  subtitleStyle,
  debugId,
  debugBadgeId,
  debugTitleId,
  debugSubtitleId,
}) => {
  const badgeTokens =
    badgeTheme ?? (badgeVariant === 'warning' ? theme.warningBadge : theme.complianceBadge);
  const isCentered = align === 'center';

  const renderSubtitle = () => {
    if (!subtitle) {
      return null;
    }
    if (!subtitleHighlight) {
      return subtitle;
    }
    const parts = subtitle.split(subtitleHighlight);
    if (parts.length !== 2) {
      return subtitle;
    }
    return (
      <>
        {parts[0]}
        <span
          style={{
            color: subtitleHighlightColor,
            textShadow: subtitleHighlightShadow,
          }}
        >
          {subtitleHighlight}
        </span>
        {parts[1]}
      </>
    );
  };

  return (
    <div
      data-debug-id={debugId}
      style={{
        width: '100%',
        maxWidth,
        marginBottom: theme.spacing.space6,
        textAlign: align,
        ...headerStyle,
      }}
    >
      {badge ? (
        <div
          data-debug-id={debugBadgeId}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px 20px',
            borderRadius: 999,
            background: badgeTokens.background,
            backgroundImage:
              'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 100%)',
            border: badgeTokens.border,
            color: badgeTokens.color,
            boxShadow: `0 10px 28px rgba(0,0,0,0.36), ${badgeTokens.boxShadow}, inset 0 1px 0 rgba(255,255,255,0.20)`,
            textShadow: badgeTokens.textShadow,
            backdropFilter: theme.glass.glassBackdrop,
            WebkitBackdropFilter: theme.glass.glassBackdrop,
            fontFamily: theme.typography.fontMono,
            fontSize: theme.typographyScale.badge,
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: theme.spacing.space3,
            ...badgeStyle,
          }}
        >
          {badge}
        </div>
      ) : null}
      <h1
        data-debug-id={debugTitleId}
        style={{
          fontFamily: theme.typography.fontHeader,
          fontSize: theme.typographyScale.title,
          fontWeight: 700,
          margin: 0,
          color: titleColor ?? theme.accent.teal,
          lineHeight: 1.02,
          letterSpacing: '-0.01em',
          textShadow: `${theme.textCrisp}, 0 0 10px rgba(255,255,255,0.10), 0 0 20px rgba(0,240,255,0.08)`,
          fontVariantNumeric: theme.typography.numericVariant,
          fontFeatureSettings: theme.typography.numericFeatureSettings,
          ...(isCentered ? { marginLeft: 'auto', marginRight: 'auto' } : {}),
          ...titleStyle,
        }}
      >
        {titleNode ?? title}
      </h1>
      {subtitle || subtitleNode ? (
        <h2
          data-debug-id={debugSubtitleId}
          style={{
            fontFamily: theme.typography.fontUi,
            fontSize: theme.typographyScale.subtitle,
            fontWeight: 500,
            color: 'rgba(255,255,255,0.9)',
            marginTop: theme.spacing.space3,
            lineHeight: 1.16,
            maxWidth: isCentered ? 1540 : 1700,
            ...(isCentered ? { marginLeft: 'auto', marginRight: 'auto' } : {}),
            ...subtitleStyle,
          }}
        >
          {subtitleNode ?? renderSubtitle()}
        </h2>
      ) : null}
    </div>
  );
};
