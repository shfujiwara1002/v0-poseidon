import React, { CSSProperties } from 'react';
import { staticFile } from 'remotion';
import { theme } from './theme';

export type IconGlowColor =
  | 'cyan'
  | 'teal'
  | 'violet'
  | 'amber'
  | 'blue'
  | 'gold'
  | 'red'
  | 'emerald'
  | 'pink'
  | 'lime'
  | 'white';

interface SlideIconProps {
  name: string;
  size?: number;
  glowColor?: IconGlowColor;
  style?: CSSProperties;
  variant?: 'simple' | 'signal' | 'glass' | 'neon';
  /** 'mask' = single-color via CSS mask (default). 'native' = full SVG with gradients/filters preserved. */
  renderMode?: 'mask' | 'native';
  /** Container shape: 'circle' (default) or 'squircle' (Apple HIG rounded-rect, 22% radius). */
  containerShape?: 'circle' | 'squircle';
}

const colorHexMap: Record<IconGlowColor, string> = {
  cyan: theme.accent.cyan,
  teal: theme.accent.teal,
  violet: theme.accent.violet,
  amber: theme.accent.amber,
  blue: theme.accent.blue,
  red: theme.accent.red,
  gold: theme.accent.gold,
  emerald: theme.accent.emerald,
  pink: theme.accent.pink,
  lime: theme.accent.lime,
  white: 'white',
};

export const SlideIcon: React.FC<SlideIconProps> = ({
  name,
  size = 32,
  glowColor = 'cyan',
  style,
  variant = 'signal', // Default to signal with squircle container
  renderMode = 'mask',
  containerShape = 'squircle',
}) => {
  const base = name.endsWith('.svg') ? name.slice(0, -4) : name;
  const fileName = base.startsWith('icon-') ? `${base}.svg` : `icon-${base}.svg`;
  const src = staticFile(`assets/svg/icons/${fileName}`);
  const color = colorHexMap[glowColor];

  const containerSize = size * 1.15; // Container is larger than icon
  const borderRadius = containerShape === 'squircle' ? '22%' : '50%';
  const maskCommon = {
    maskImage: `url(${src})`,
    WebkitMaskImage: `url(${src})`,
    maskSize: 'contain',
    WebkitMaskSize: 'contain',
    maskRepeat: 'no-repeat',
    WebkitMaskRepeat: 'no-repeat',
    maskPosition: 'center',
    WebkitMaskPosition: 'center',
  } as const;

  if (variant === 'simple') {
    if (renderMode === 'native') {
      return (
        <img
          src={src}
          style={{
            width: size,
            height: size,
            objectFit: 'contain',
            filter: `drop-shadow(0 0 3px ${color}66)`,
            ...style,
          }}
        />
      );
    }
    return (
      <div
        style={{
          width: size,
          height: size,
          backgroundColor: color,
          boxShadow: `0 0 1px ${color}AA, 0 0 6px ${color}66`,
          ...maskCommon,
          ...style,
        }}
      />
    );
  }

  if (variant === 'signal') {
    const glyphSize = Math.max(18, size * 0.92);
    return (
      <div
        style={{
          width: size,
          height: size,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius,
          border: `1px solid ${color}5C`,
          background: 'rgba(6,14,24,0.4)',
          boxShadow: `0 0 8px ${color}2E`,
          ...style,
        }}
      >
        {renderMode === 'native' ? (
          <img
            src={src}
            style={{
              width: glyphSize,
              height: glyphSize,
              objectFit: 'contain',
              filter: `drop-shadow(0 0 2px ${color}66)`,
            }}
          />
        ) : (
          <div
            style={{
              width: glyphSize,
              height: glyphSize,
              backgroundColor: color,
              boxShadow: `0 0 1px ${color}AA, 0 0 4px ${color}66`,
              ...maskCommon,
            }}
          />
        )}
      </div>
    );
  }

  // Glass / Neon variant (default)
  const iconRenderSize = Math.min(containerSize - 10, size * 1.42);

  return (
    <div
      style={{
        position: 'relative',
        width: containerSize,
        height: containerSize,
        minWidth: containerSize,
        minHeight: containerSize,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      {/* 1. Back Glow (Ambient) */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius,
        background: `radial-gradient(circle, ${color}20 0%, transparent 72%)`,
        opacity: 0.35,
        filter: 'blur(6px)',
      }} />

      {/* 2. Glass Container Ring */}
      <div style={{
        position: 'absolute',
        inset: 4,
        borderRadius,
        border: `1px solid ${color}66`,
        background: 'rgba(255,255,255,0.02)',
        boxShadow: `inset 0 0 6px ${color}14`,
        backdropFilter: 'blur(2px)',
      }} />

      {/* 3. The Icon Itself */}
      {renderMode === 'native' ? (
        <img
          src={src}
          style={{
            position: 'relative',
            width: iconRenderSize,
            height: iconRenderSize,
            objectFit: 'contain',
            filter: `drop-shadow(0 0 3px ${color}66)`,
            zIndex: 2,
          }}
        />
      ) : (
        <div
          style={{
            position: 'relative',
            width: iconRenderSize,
            height: iconRenderSize,
            backgroundColor: color,
            boxShadow: `0 0 1px ${color}66, 0 0 8px ${color}28`,
            ...maskCommon,
            zIndex: 2,
          }}
        />
      )}

      {/* 4. Top Highlights */}
      <div style={{
        position: 'absolute',
        top: '12%',
        left: '24%',
        width: '52%',
        height: '34%',
        borderRadius,
        background: 'linear-gradient(180deg, rgba(255,255,255,0.32) 0%, transparent 100%)',
        opacity: 0.14,
        pointerEvents: 'none',
      }} />
    </div>
  );
};
