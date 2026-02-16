import React, { useMemo } from 'react';
import { random, useCurrentFrame } from 'remotion';
import { theme } from '../../theme';
import { ChartGlowDefs } from '../../charts/ChartGlowDefs';

interface VisualParticleFieldProps {
  width?: number;
  height?: number;
  color?: string;
  count?: number;
  minSize?: number;
  maxSize?: number;
  glowRatio?: number;
  filterType?: string;
  style?: React.CSSProperties;
}

export const VisualParticleField: React.FC<VisualParticleFieldProps> = ({
  width = 1920,
  height = 1080,
  color = theme.accent.cyan,
  count = 60,
  minSize = 1,
  maxSize = 3,
  glowRatio = 0.2,
  filterType = 'neon-glow',
  style,
}) => {
  const frame = useCurrentFrame();

  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      x: random(i * 31) * width,
      y: random(i * 37) * height,
      r: minSize + random(i * 43) * (maxSize - minSize),
      speed: 0.3 + random(i * 53) * 1.5,
      phase: random(i * 67) * Math.PI * 2,
      hasGlow: random(i * 73) > (1 - glowRatio),
    }));
  }, [width, height, count, minSize, maxSize, glowRatio]);

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={style}>
      <ChartGlowDefs />
      {particles.map((p, i) => {
        const opacity = (Math.sin(frame / 20 * p.speed + p.phase) + 1) / 2 * 0.6 + 0.1;
        return (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={p.r}
            fill={p.hasGlow ? 'white' : color}
            opacity={opacity}
            filter={p.hasGlow ? `url(#${filterType})` : undefined}
          />
        );
      })}
    </svg>
  );
};
