import React from 'react';
import { useCurrentFrame } from 'remotion';
import { theme } from '../../theme';
import { ChartGlowDefs } from '../../charts/ChartGlowDefs';

interface VisualWaveformProps {
  width?: number;
  height?: number;
  color?: string;
  waves?: number;
  amplitude?: number;
  frequency?: number;
  filterType?: string;
  style?: React.CSSProperties;
}

export const VisualWaveform: React.FC<VisualWaveformProps> = ({
  width = 800,
  height = 200,
  color = theme.accent.cyan,
  waves = 3,
  amplitude = 40,
  frequency = 3,
  filterType = 'neon-glow',
  style,
}) => {
  const frame = useCurrentFrame();
  const centerY = height / 2;

  const generateWavePath = (waveIndex: number) => {
    const points: string[] = [];
    const phaseOffset = (frame / 30 + waveIndex * 0.7) * Math.PI;
    const freqMult = 1 + waveIndex * 0.3;
    const ampMult = 1 - waveIndex * 0.2;

    for (let x = 0; x <= width; x += 4) {
      const y = centerY + Math.sin((x / width) * Math.PI * 2 * frequency * freqMult + phaseOffset) * amplitude * ampMult;
      points.push(`${x},${y}`);
    }
    return points.join(' ');
  };

  const generateAreaPath = (waveIndex: number) => {
    const pointsStr = generateWavePath(waveIndex);
    return `${pointsStr} L ${width},${height} L 0,${height} Z`;
  };

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible', ...style }}>
      <ChartGlowDefs />
      {Array.from({ length: waves }).map((_, i) => (
        <g key={i}>
          {/* Area fill */}
          <path
            d={generateAreaPath(i)}
            fill={color}
            opacity={0.05 + (waves - i) * 0.03}
          />
          {/* Wave line */}
          <polyline
            points={generateWavePath(i)}
            fill="none"
            stroke={color}
            strokeWidth={2 - i * 0.5}
            opacity={0.4 - i * 0.1}
            filter={i === 0 ? `url(#${filterType})` : undefined}
          />
        </g>
      ))}
    </svg>
  );
};
