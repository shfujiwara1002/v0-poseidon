import React from 'react';
import { AbsoluteFill } from 'remotion';
import { theme } from './shared/theme';
import { copy } from './shared/copy';
import { EnginePill } from './shared/EnginePill';

export const Demo30s: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: theme.aurora.baseGradient,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: theme.typography.fontHeader,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: '-12% -8% -6% -8%',
          background: theme.aurora.layers,
          opacity: theme.aurora.auroraOpacity,
          filter: `blur(${theme.aurora.auroraBlur}px) saturate(1.25)`,
          mixBlendMode: 'screen',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `${theme.vignette.topVignette}, ${theme.vignette.bottomVignette}`,
          opacity: theme.vignette.vignetteOpacity,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 32,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: theme.typography.text5xl,
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '-0.02em',
            textShadow: theme.neon.cyan.standard,
          }}
        >
          {copy.demo30s.title}
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: theme.typography.text2xl,
            color: 'rgba(255,255,255,0.9)',
          }}
        >
          {copy.demo30s.subtitle}
        </p>
        <div
          style={{
            padding: '24px 48px',
            borderRadius: 12,
            border: `1px solid ${theme.glass.glassBorder}`,
            background: theme.glass.glassBg,
            boxShadow: theme.glass.glassInsetHighlight,
            fontFamily: theme.typography.fontMono,
            fontSize: theme.typography.text2xl,
            color: theme.accent.cyan,
            textShadow: theme.neon.cyan.standard,
          }}
        >
          {copy.demo30s.flow}
        </div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          {(copy.demo30s.flow.split(' → ').map((s) => s.trim()) as Array<'Protect' | 'Grow' | 'Execute' | 'Govern'>).map((label) => (
            <EnginePill key={label} status={label} active />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
