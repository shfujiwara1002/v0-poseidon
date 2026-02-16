import React from 'react';
import { random, useCurrentFrame } from 'remotion';
import { theme } from '../../theme';
import { ChartGlowDefs } from '../../charts/ChartGlowDefs';

interface VisualHexMeshProps {
    width?: number;
    height?: number;
    color?: string;
    scale?: number;
    filterType?: string;
    fillThreshold?: number;
    style?: React.CSSProperties;
}

export const VisualHexMesh: React.FC<VisualHexMeshProps> = ({
    width = 800,
    height = 450,
    color = theme.accent.cyan,
    scale = 40,
    filterType = 'neon-glow',
    fillThreshold = 0.85,
    style,
}) => {
    const frame = useCurrentFrame();

    // Hexagon math
    const hexRadius = scale;
    const hexHeight = Math.sqrt(3) * hexRadius;
    const hexWidth = 2 * hexRadius;
    const horizDist = hexWidth * 0.75;
    const vertDist = hexHeight;

    const rows = Math.ceil(height / vertDist) + 1;
    const cols = Math.ceil(width / horizDist) + 1;

    const getHexPoints = (cx: number, cy: number, r: number) => {
        let points = "";
        for (let i = 0; i < 6; i++) {
            const angle_deg = 60 * i;
            const angle_rad = Math.PI / 180 * angle_deg;
            const x = cx + r * Math.cos(angle_rad);
            const y = cy + r * Math.sin(angle_rad);
            points += `${x},${y} `;
        }
        return points;
    };

    const hexes: Array<{ x: number; y: number; isFilled: boolean; pulseSpeed: number; pulsePhase: number; seed: number }> = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const x = c * horizDist;
            const y = r * vertDist + (c % 2 === 1 ? vertDist / 2 : 0);

            // Random attributes based on position
            const seed = r * 100 + c;
            const isVisible = random(seed) > 0.4;
            const isFilled = random(seed + 1) > fillThreshold;
            const pulseSpeed = 0.5 + random(seed + 2) * 2;
            const pulsePhase = random(seed + 3) * Math.PI * 2;

            if (isVisible) {
                hexes.push({ x, y, isFilled, pulseSpeed, pulsePhase, seed });
            }
        }
    }

    return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={style}>
            <ChartGlowDefs />

            {hexes.map((hex, i) => {
                const opacity = (Math.sin(frame / 30 * hex.pulseSpeed + hex.pulsePhase) + 1) / 2; // 0 to 1
                const finalOpacity = hex.isFilled ? 0.6 * opacity : 0.15;
                const strokeWidth = hex.isFilled ? 0 : 1;

                return (
                    <polygon
                        key={i}
                        points={getHexPoints(hex.x, hex.y, hexRadius - 2)}
                        stroke={color}
                        strokeWidth={strokeWidth}
                        fill={hex.isFilled ? color : 'none'}
                        opacity={finalOpacity}
                        filter={hex.isFilled ? `url(#${filterType})` : undefined}
                    />
                );
            })}

            {/* Connecting Lines for "Active" nodes */}
            {/* Only connecting a few random neighbors to Simulate network traffic */}
            {hexes.filter(h => h.isFilled).map((h, i) => {
                if (i % 3 !== 0) return null; // Reduce density
                // Connect to next "filled" hex if close enough
                const next = hexes.find((n, j) => j > i && n.isFilled && Math.hypot(n.x - h.x, n.y - h.y) < hexRadius * 3);
                if (!next) return null;

                return (
                    <line
                        key={`line-${i}`}
                        x1={h.x} y1={h.y} x2={next.x} y2={next.y}
                        stroke={color}
                        strokeWidth="1"
                        opacity="0.4"
                        strokeDasharray="4 4"
                    />
                )
            })}
        </svg>
    );
};
