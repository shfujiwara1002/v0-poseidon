import React from 'react';
import { theme } from '../theme';
import { ChartGlowDefs } from '../charts/ChartGlowDefs';

interface DataPoint {
    x: number; // 0-1
    y: number; // 0-1
    color: string;
    label?: string;
    size?: number;
}

interface Band {
    startY: number; // 0-1
    endY: number;   // 0-1
    color: string;
}

interface VisualGlowingChartProps {
    width?: number;
    height?: number;
    dataPoints: DataPoint[];
    bands?: Band[];
    gridLines?: number;
    style?: React.CSSProperties;
}

export const VisualGlowingChart: React.FC<VisualGlowingChartProps> = ({
    width = 500,
    height = 300,
    dataPoints,
    bands,
    gridLines = 5,
    style,
}) => {
    return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" style={{ overflow: 'visible', ...style }}>
            <ChartGlowDefs />

            {/* Grid Background */}
            {Array.from({ length: gridLines + 1 }).map((_, i) => {
                const y = (height / gridLines) * i;
                return (
                    <line
                        key={i}
                        x1="0"
                        y1={y}
                        x2={width}
                        y2={y}
                        stroke="white"
                        strokeOpacity="0.1"
                        strokeDasharray="4 4"
                        vectorEffect="non-scaling-stroke"
                    />
                );
            })}

            {/* Bands (Zones) */}
            {bands?.map((band, i) => {
                // Invert Y because SVG 0 is top. 
                // Logic: if y=1 is top in data, then ySvg = 0.
                // If data is normalized 0-1 (0 bottom, 1 top):
                // ySvg = height * (1 - yData)

                const yTop = height * (1 - band.endY);
                const yBottom = height * (1 - band.startY);
                const h = Math.abs(yBottom - yTop);

                return (
                    <rect
                        key={i}
                        x="0"
                        y={yTop}
                        width={width}
                        height={h}
                        fill={band.color}
                        fillOpacity="0.1" // Let color carry the opacity or override
                    />
                );
            })}

            {/* Connection Lines (Spline or Polyline) - Optional, just drawing points context
          Prompt says "Glowing data points with bands", implying scatter or discrete points.
          Let's verify from reference image... looks like points on a grid.
      */}

            {/* Data Points */}
            {dataPoints.map((p, i) => {
                const cx = p.x * width;
                const cy = height * (1 - p.y);
                const r = p.size || 6;

                return (
                    <g key={i}>
                        {/* Outer Glow Halo */}
                        <circle
                            cx={cx}
                            cy={cy}
                            r={r * 3}
                            fill={p.color}
                            opacity="0.2"
                            filter="url(#soft-halo)"
                        />
                        {/* Core Glow */}
                        <circle
                            cx={cx}
                            cy={cy}
                            r={r}
                            fill={p.color}
                            stroke="white"
                            strokeWidth="2"
                            filter="url(#strong-bloom)"
                        />

                        {/* Label */}
                        {p.label && (
                            <text
                                x={cx + r + 10}
                                y={cy}
                                fill={p.color} // Match point color
                                fontFamily={theme.typography.fontHeader}
                                fontSize="14"
                                dominantBaseline="middle"
                                filter="url(#neon-glow-small)"
                                style={{ textShadow: `0 0 10px ${p.color}` }}
                            >
                                {p.label}
                            </text>
                        )}

                        {/* Drop Line */}
                        <line x1={cx} y1={cy} x2={cx} y2={height} stroke={p.color} strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
                    </g>
                );
            })}
        </svg>
    );
};
