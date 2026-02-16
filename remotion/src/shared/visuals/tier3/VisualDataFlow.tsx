import React, { useMemo } from 'react';
import { random, useCurrentFrame } from 'remotion';
import { theme } from '../../theme';
import { ChartGlowDefs } from '../../charts/ChartGlowDefs';

interface VisualDataFlowProps {
  width?: number;
  height?: number;
  color?: string;
  nodes?: number;
  flowDirection?: 'horizontal' | 'vertical' | 'radial';
  style?: React.CSSProperties;
}

export const VisualDataFlow: React.FC<VisualDataFlowProps> = ({
  width = 800,
  height = 400,
  color = theme.accent.cyan,
  nodes = 8,
  flowDirection = 'horizontal',
  style,
}) => {
  const frame = useCurrentFrame();

  const nodePositions = useMemo(() => {
    const positions: Array<{ x: number; y: number; seed: number }> = [];
    for (let i = 0; i < nodes; i++) {
      const seed = i * 77;
      if (flowDirection === 'radial') {
        const angle = (i / nodes) * Math.PI * 2;
        const r = 80 + random(seed) * (Math.min(width, height) / 2 - 100);
        positions.push({
          x: width / 2 + Math.cos(angle) * r,
          y: height / 2 + Math.sin(angle) * r,
          seed,
        });
      } else if (flowDirection === 'vertical') {
        positions.push({
          x: width * 0.2 + random(seed) * width * 0.6,
          y: (i / (nodes - 1)) * height * 0.8 + height * 0.1,
          seed,
        });
      } else {
        positions.push({
          x: (i / (nodes - 1)) * width * 0.8 + width * 0.1,
          y: height * 0.2 + random(seed) * height * 0.6,
          seed,
        });
      }
    }
    return positions;
  }, [width, height, nodes, flowDirection]);

  // Generate bezier curves between sequential nodes
  const connections = useMemo(() => {
    const conns: Array<{ from: number; to: number; path: string }> = [];
    for (let i = 0; i < nodePositions.length - 1; i++) {
      const from = nodePositions[i];
      const to = nodePositions[i + 1];
      const midX = (from.x + to.x) / 2;
      const midY = (from.y + to.y) / 2;
      const offsetX = (random(from.seed + 50) - 0.5) * 60;
      const offsetY = (random(from.seed + 51) - 0.5) * 60;
      const path = `M ${from.x} ${from.y} Q ${midX + offsetX} ${midY + offsetY} ${to.x} ${to.y}`;
      conns.push({ from: i, to: i + 1, path });
    }
    // Radial: connect last to first
    if (flowDirection === 'radial' && nodePositions.length > 2) {
      const from = nodePositions[nodePositions.length - 1];
      const to = nodePositions[0];
      const midX = (from.x + to.x) / 2;
      const midY = (from.y + to.y) / 2;
      conns.push({ from: nodePositions.length - 1, to: 0, path: `M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}` });
    }
    return conns;
  }, [nodePositions, flowDirection]);

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={style}>
      <ChartGlowDefs />

      {/* Connection paths */}
      {connections.map((conn, i) => {
        const pulseProgress = ((frame + i * 20) % 90) / 90;
        const pulseOpacity = Math.sin(pulseProgress * Math.PI) * 0.6;
        return (
          <g key={`conn-${i}`}>
            {/* Static faint path */}
            <path d={conn.path} stroke={color} strokeWidth="1" opacity="0.15" fill="none" />
            {/* Animated glow path */}
            <path
              d={conn.path}
              stroke={color}
              strokeWidth="2"
              strokeDasharray={`${width} ${width}`}
              strokeDashoffset={width * (1 - pulseProgress * 2)}
              opacity={pulseOpacity}
              filter="url(#neon-glow)"
              fill="none"
            />
          </g>
        );
      })}

      {/* Nodes */}
      {nodePositions.map((node, i) => {
        const pulse = (Math.sin(frame / 15 + node.seed) + 1) / 2;
        return (
          <g key={`node-${i}`}>
            <circle cx={node.x} cy={node.y} r={6} fill={color} opacity={0.4} />
            <circle cx={node.x} cy={node.y} r={3} fill="white" opacity={0.8 + pulse * 0.2} filter="url(#neon-glow)" />
            <circle cx={node.x} cy={node.y} r={12 * pulse} stroke={color} strokeWidth="1" opacity={0.5 - pulse * 0.4} fill="none" />
          </g>
        );
      })}
    </svg>
  );
};
