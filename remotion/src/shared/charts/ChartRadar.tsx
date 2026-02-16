import React from 'react';
import { theme } from '../theme';
import { ChartGlowDefs } from './ChartGlowDefs';

interface ChartRadarProps {
    axes: { label: string; value: number; maxValue: number; color?: string }[];
    width?: number;
    height?: number;
    rings?: number;           // Number of concentric rings (default 4)
    showLabels?: boolean;
    showValues?: boolean;
    fillColor?: string;       // Area fill color
    fillOpacity?: number;
    strokeColor?: string;
    style?: React.CSSProperties;
    /** Secondary data series (overlay) — backward-compatible, omit to keep single series */
    secondaryAxes?: { label: string; value: number; maxValue: number }[];
    secondaryFillColor?: string;
    secondaryFillOpacity?: number;
    secondaryStrokeColor?: string;
}

// Helper: Get coordinates for a point on the radar
const getRadarPoint = (center: { x: number, y: number }, radius: number, angleIndex: number, totalAngles: number, valueRatio: number) => {
    const angle = (Math.PI * 2 * angleIndex) / totalAngles - Math.PI / 2; // -PI/2 to start at top
    // Distance from center
    const dist = radius * valueRatio;
    return {
        x: center.x + dist * Math.cos(angle),
        y: center.y + dist * Math.sin(angle)
    };
};

export const ChartRadar: React.FC<ChartRadarProps> = ({
    axes,
    width = 300,
    height = 300,
    rings = 4,
    showLabels = true,
    showValues = true,
    fillColor = theme.accent.teal,
    fillOpacity = 0.2,
    strokeColor = theme.accent.teal,
    style,
    secondaryAxes,
    secondaryFillColor = 'rgba(255,255,255,0.06)',
    secondaryFillOpacity = 0.12,
    secondaryStrokeColor = 'rgba(255,255,255,0.3)',
}) => {
    const cx = width / 2;
    const cy = height / 2;
    // Leave room for labels
    const radius = Math.min(width, height) / 2 - 40;
    const totalAxes = axes.length;

    // Generate Polygon Points (Data)
    const points = axes.map((axis, i) =>
        getRadarPoint({ x: cx, y: cy }, radius, i, totalAxes, Math.min(1, Math.max(0, axis.value / axis.maxValue)))
    );
    const polyString = points.map(p => `${p.x},${p.y}`).join(' ');

    return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" style={{ overflow: 'visible', ...style }}>
            <ChartGlowDefs />

            {/* Concentric Rings (Grid) */}
            {Array.from({ length: rings }).map((_, r) => {
                const ratio = (r + 1) / rings;
                const ringPoints = axes.map((_, i) =>
                    getRadarPoint({ x: cx, y: cy }, radius, i, totalAxes, ratio)
                );
                const ringPoly = ringPoints.map(p => `${p.x},${p.y}`).join(' ');

                return (
                    <polygon
                        key={`ring-${r}`}
                        points={ringPoly}
                        fill="none"
                        stroke="white"
                        strokeWidth="1"
                        strokeOpacity={0.06 + (r * 0.03)} // Brighter outwards
                    />
                );
            })}

            {/* Axis Lines */}
            {axes.map((axis, i) => {
                const end = getRadarPoint({ x: cx, y: cy }, radius, i, totalAxes, 1);
                return (
                    <line
                        key={`axis-${i}`}
                        x1={cx} y1={cy} x2={end.x} y2={end.y}
                        stroke="white"
                        strokeOpacity="0.08"
                        strokeWidth="1"
                    />
                );
            })}

            {/* Data Polygon Area */}
            <polygon
                points={polyString}
                fill={fillColor}
                fillOpacity={fillOpacity}
                stroke="none"
                filter="url(#neon-glow-small)"
            />
            {/* Stroke Outline */}
            <polygon
                points={polyString}
                fill="none"
                stroke={strokeColor}
                strokeWidth="2"
                filter="url(#neon-glow-small)"
            />

            {/* Secondary Data Series (optional overlay) */}
            {secondaryAxes && secondaryAxes.length === axes.length && (() => {
                const secPoints = secondaryAxes.map((axis, i) =>
                    getRadarPoint({ x: cx, y: cy }, radius, i, totalAxes, Math.min(1, Math.max(0, axis.value / axis.maxValue)))
                );
                const secPoly = secPoints.map(p => `${p.x},${p.y}`).join(' ');
                return (
                    <>
                        <polygon
                            points={secPoly}
                            fill={secondaryFillColor}
                            fillOpacity={secondaryFillOpacity}
                            stroke="none"
                        />
                        <polygon
                            points={secPoly}
                            fill="none"
                            stroke={secondaryStrokeColor}
                            strokeWidth="1.5"
                            strokeDasharray="6 4"
                        />
                        {secPoints.map((p, i) => (
                            <circle key={`sec-${i}`} cx={p.x} cy={p.y} r={2.5} fill={secondaryStrokeColor} stroke="none" />
                        ))}
                    </>
                );
            })()}

            {/* Vertices & Labels */}
            {points.map((p, i) => {
                const axis = axes[i];
                // Label Position (pushed out slightly)
                const labelPos = getRadarPoint({ x: cx, y: cy }, radius + 28, i, totalAxes, 1);

                return (
                    <g key={i}>
                        {/* Data Point Dot */}
                        <circle cx={p.x} cy={p.y} r={3} fill={axis.color || strokeColor} stroke="white" strokeWidth="1" filter="url(#neon-glow-small)" />

                        {/* Axis Label */}
                        {showLabels && (
                            <text
                                x={labelPos.x}
                                y={labelPos.y}
                                fill="white"
                                fillOpacity="0.7"
                                fontFamily={theme.typography.fontMono}
                                fontSize="24"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                style={{
                                    fontVariantNumeric: theme.typography.numericVariant,
                                    fontFeatureSettings: theme.typography.numericFeatureSettings,
                                }}
                            >
                                {axis.label}
                            </text>
                        )}

                        {/* Value Label (next to dot) */}
                        {showValues && (
                            <text
                                x={p.x + (p.x > cx ? 10 : -10)}
                                y={p.y + (p.y > cy ? 10 : -10)}
                                fill={axis.color || strokeColor}
                                fontFamily={theme.typography.fontMono}
                                fontSize="24"
                                textAnchor={p.x > cx ? "start" : "end"}
                                dominantBaseline="middle"
                                style={{
                                    fontVariantNumeric: theme.typography.numericVariant,
                                    fontFeatureSettings: theme.typography.numericFeatureSettings,
                                }}
                            >
                                {axis.value}%
                            </text>
                        )}
                    </g>
                );
            })}
        </svg>
    );
};
