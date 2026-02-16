import React from 'react';
import { theme } from './theme';
import { LiquidGlassLayer } from './LiquidGlassLayer';

type GlassCardVariant = 'teal' | 'violet' | 'gold' | 'blue' | 'red' | undefined;
type GlassQuality = 'baseline' | 'premium';
type LiquidGlassMode = 'off' | 'subtle' | 'standard' | 'premium';

interface GlassCardProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  variant?: GlassCardVariant;
  liquidGlass?: boolean | LiquidGlassMode;
  className?: string;
  tone?: 'default' | 'dark';
  glassQuality?: GlassQuality;
  flexContent?: boolean;
  /** Control content overflow. Default 'hidden'. Use 'visible' for charts with axis labels. */
  overflow?: 'hidden' | 'visible';
  debugId?: string;
}

const variantBorderColor: Record<NonNullable<GlassCardVariant>, string> = {
  teal: theme.accent.teal,
  violet: theme.accent.violet,
  gold: theme.accent.gold,
  blue: theme.accent.blue,
  red: theme.accent.red,
};

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  variant,
  liquidGlass = 'subtle',
  tone = 'default',
  glassQuality = 'baseline',
  flexContent,
  overflow = 'hidden',
  debugId,
}) => {
  const liquidGlassMode: LiquidGlassMode =
    liquidGlass === true
      ? 'standard'
      : liquidGlass === false
        ? 'off'
        : liquidGlass;

  const isDark = tone === 'dark';
  const usePremiumDark = isDark && glassQuality === 'premium';
  const premium = theme.glassPremium;
  const borderLeft = variant ? `3px solid ${variantBorderColor[variant]}` : undefined;
  const background = usePremiumDark
    ? premium.bgGradient
    : isDark
      ? 'rgba(6,10,20,0.16)'
      : theme.glass.glassBg;
  const backgroundImage = usePremiumDark ? premium.overlay : isDark ? 'none' : theme.glass.glassOverlay;
  const border = usePremiumDark
    ? `1px solid ${premium.border}`
    : isDark
      ? '1px solid rgba(255,255,255,0.12)'
      : `1px solid ${theme.glass.glassBorder}`;
  const boxShadow = usePremiumDark
    ? premium.shadow
    : isDark
    ? '0 24px 70px rgba(0,0,0,0.7)'
    : `${theme.glass.glassShadow} ${theme.glass.glassInsetHighlight} ${theme.glass.glassEdge}`;
  const sheenOpacity = usePremiumDark ? 0.2 : isDark ? 0.03 : 0.10;
  const rimOpacity = usePremiumDark ? 0.36 : isDark ? 0.25 : 0.30;
  const insetShadow = usePremiumDark
    ? `${premium.insetHighlight}, ${premium.edge}`
    : isDark
    ? 'inset 0 1px 0 0 rgba(255,255,255,0.16), inset 0 -1px 0 0 rgba(0,0,0,0.45), inset 0 0 20px rgba(0,0,0,0.25)'
    : theme.glass.glassInsetHighlight + ', ' + theme.glass.glassEdge;
  const backdrop = usePremiumDark ? premium.backdrop : theme.glass.glassBackdrop;
  const fallbackBorder = usePremiumDark ? premium.border : theme.glass.glassBorder;

  return (
    <div
      data-debug-id={debugId}
      style={{
        position: 'relative',
        overflow,
        background,
        backgroundImage,
        backdropFilter: backdrop,
        WebkitBackdropFilter: backdrop,
        border,
        borderLeft: borderLeft ?? `1px solid ${fallbackBorder}`,
        boxShadow,
        borderRadius: theme.radius.lg,
        padding: 20,
        ...(flexContent ? { display: 'flex', flexDirection: 'column' as const } : {}),
        ...style,
      }}
    >
      {/* Effects wrapper — always clips to card bounds (sheen extends beyond inset) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          borderRadius: theme.radius.lg,
          pointerEvents: 'none',
        }}
      >
        {/* Sheen div (components.css ::before) */}
        <div
          style={{
            position: 'absolute',
            inset: '-45% -25% 35% -25%',
            background: usePremiumDark ? premium.sheen : theme.glass.glassSheen,
            opacity: sheenOpacity,
          }}
        />
        {/* Rim-light div (components.css ::after) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: usePremiumDark ? premium.rimLight : theme.glass.glassRimLight,
            mixBlendMode: 'screen',
            opacity: rimOpacity,
            borderRadius: theme.radius.lg,
          }}
        />
        {/* Inset highlight (glass edge) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: theme.radius.lg,
            boxShadow: insetShadow,
          }}
        />
        {liquidGlassMode !== 'off' && <LiquidGlassLayer mode={liquidGlassMode} />}
      </div>
      <div style={{
        position: 'relative',
        zIndex: 1,
        ...(flexContent ? { flex: 1, display: 'flex', flexDirection: 'column' as const } : {}),
      }}>{children}</div>
    </div>
  );
};
