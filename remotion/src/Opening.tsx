import React from 'react';
import { AbsoluteFill } from 'remotion';
import { theme } from './shared/theme';
import { copy } from './shared/copy';
import { EnginePill } from './shared/EnginePill';
import { IconTrident } from './shared/icons/IconTrident';

export const Opening: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: theme.aurora.baseGradient,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: theme.typography.fontHeader,
      }}
    >
      {/* Aurora layer — reduced opacity for darker "black + cyan" impression */}
      <div
        style={{
          position: 'absolute',
          inset: '-12% -8% -6% -8%',
          background: theme.aurora.layers,
          opacity: 0.3,
          filter: `blur(${theme.aurora.auroraBlur}px) saturate(1.25)`,
          mixBlendMode: 'screen',
          pointerEvents: 'none',
        }}
      />
      {/* Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `${theme.vignette.topVignette}, ${theme.vignette.bottomVignette}`,
          opacity: theme.vignette.vignetteOpacity,
          pointerEvents: 'none',
        }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32, position: 'relative', zIndex: 1 }}>
        {/* 3-bars logo in cyan with glow */}
        <IconTrident size={120} color={theme.accent.cyan} neon style={{ filter: theme.iconGlow.default }} />
        <h1
          style={{
            margin: 0,
            fontSize: theme.typography.text6xl,
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '-0.02em',
            textShadow: theme.neon.cyan.standard,
          }}
        >
          {copy.opening.title}
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: theme.typography.text2xl,
            color: theme.accent.cyan,
            textShadow: theme.neon.cyan.standard,
          }}
        >
          {copy.opening.subtitle}
        </p>
        <p style={{ margin: 0, fontSize: theme.typography.textXl, color: 'rgba(255,255,255,0.8)' }}>
          {copy.opening.tagline}
        </p>
        <div style={{ display: 'flex', gap: 16, marginTop: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          {(copy.opening.engines as readonly string[]).map((label) => (
            <EnginePill
              key={label}
              status={label as 'Protect' | 'Grow' | 'Execute' | 'Govern'}
              active
            />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
