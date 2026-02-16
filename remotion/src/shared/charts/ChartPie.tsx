import React from 'react';
import { theme } from '../theme';
import { ChartGlowDefs } from './ChartGlowDefs';

interface ChartPieProps {
    data: { value: number; label: string; color: string }[];
    size?: number;
    innerRadius?: number;        // 0-1 fraction (default 0.6)
    sliceGap?: number;           // degrees gap between slices (default 2)
    showLabels?: boolean;
    showPercentages?: boolean;
    centerLabel?: string;        // text in donut center
    centerValue?: string;        // large value in center
    showGlow?: boolean;
    showOuterRing?: boolean;     // decorative outer ring
    style?: React.CSSProperties;
}

// Helper to convert polar to cartesian
const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

export const ChartPie: React.FC<ChartPieProps> = ({
    data,
    size = 300,
    innerRadius = 0.6, // fraction of radius
    sliceGap = 2,      // degrees
    showLabels = true,
    showPercentages = true,
    centerLabel,
    centerValue,
    showGlow = true,
    showOuterRing = true,
    style
}) => {
    const total = data.reduce((acc, cur) => acc + cur.value, 0);
    const radius = size / 2;
    const center = size / 2;
    const innerR = radius * innerRadius;

    let startAngle = 0;

    return (
        <svg width={size + 200} height={size + 100} viewBox={`-100 -50 ${size + 200} ${size + 100}`} fill="none" style={{ overflow: 'visible', ...style }}>
            <ChartGlowDefs />

            {/* Center Content */}
            {innerRadius > 0 && (centerValue || centerLabel) && (
                <g transform={`translate(${center}, ${center})`}>
                    {/* Frosted Glass Background */}
                    <circle cx="0" cy="0" r={innerR * 0.85} fill={theme.glass.glassBg} filter="url(#frost-overlay)" opacity="0.5" />
                    <circle cx="0" cy="0" r={innerR * 0.85} stroke={theme.glass.glassBorder} strokeWidth="1" />

                    <text
                        y="-5"
                        fill="white"
                        fontFamily={theme.typography.fontHeader}
                        fontSize="32"
                        textAnchor="middle"
                        filter="url(#neon-glow-small)"
                        style={{
                            fontVariantNumeric: theme.typography.numericVariant,
                            fontFeatureSettings: theme.typography.numericFeatureSettings,
                        }}
                    >
                        {centerValue}
                    </text>
                    <text
                        y="20"
                        fill="white"
                        fillOpacity="0.6"
                        fontFamily={theme.typography.fontUi}
                        fontSize="24"
                        textAnchor="middle"
                        style={{
                            fontVariantNumeric: theme.typography.numericVariant,
                            fontFeatureSettings: theme.typography.numericFeatureSettings,
                        }}
                    >
                        {centerLabel}
                    </text>
                </g>
            )}

            {/* Outer Ring Decoration */}
            {showOuterRing && (
                <circle cx={center} cy={center} r={radius + 8} stroke="white" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="4 8" />
            )}

            {/* Slices */}
            {data.map((slice, i) => {
                const sliceAngle = (slice.value / total) * 360;

                // Adjust for gap
                // We actually want to shrink the slice from both sides by half the gap
                // Effective angle for drawing:
                const drawStartAngle = startAngle + (sliceGap / 2);
                const drawEndAngle = startAngle + sliceAngle - (sliceGap / 2);

                // Midpoint for labels
                const midAngle = startAngle + (sliceAngle / 2);

                startAngle += sliceAngle;

                // Check for full circle case (not handled by this simple gap logic well, assume data > 1 items for now)

                // Create Donut Slice Path
                // 1. Move to start of outer arc
                const startOuter = polarToCartesian(center, center, radius, drawEndAngle);
                const endOuter = polarToCartesian(center, center, radius, drawStartAngle);
                const startInner = polarToCartesian(center, center, innerR, drawEndAngle);
                const endInner = polarToCartesian(center, center, innerR, drawStartAngle);

                const largeArcFlag = (drawEndAngle - drawStartAngle) <= 180 ? "0" : "1";

                const pathCmd = [
                    "M", startOuter.x, startOuter.y,
                    "A", radius, radius, 0, largeArcFlag, 0, endOuter.x, endOuter.y,
                    "L", endInner.x, endInner.y,
                    "A", innerR, innerR, 0, largeArcFlag, 1, startInner.x, startInner.y,
                    "Z"
                ].join(" ");

                // Label calculations
                const labelRadius = radius + 30;
                const labelPos = polarToCartesian(center, center, labelRadius, midAngle);
                const labelAnchor = labelPos.x > center ? "start" : "end";
                // Leader line
                const sliceEdge = polarToCartesian(center, center, radius + 2, midAngle);
                const elbow = polarToCartesian(center, center, radius + 15, midAngle);

                return (
                    <g key={i}>
                        {/* Slice Base */}
                        <path d={pathCmd} fill={slice.color} fillOpacity="0.8" stroke="none" filter={showGlow ? "url(#neon-glow-small)" : undefined} />

                        {/* Inner Gradient Shade (simulated by radial overlay? or darker stroke) */}
                        <path d={pathCmd} fill={`url(#radial-heat)`} fillOpacity="0.4" style={{ mixBlendMode: 'overlay' }} />

                        {/* Rim Highlight */}
                        <path d={pathCmd} stroke="white" strokeOpacity="0.2" strokeWidth="1" fill="none" />

                        {/* Labels */}
                        {showLabels && (
                            <g>
                                <polyline
                                    points={`${sliceEdge.x},${sliceEdge.y} ${elbow.x},${elbow.y} ${labelPos.x},${labelPos.y}`}
                                    fill="none"
                                    stroke={slice.color}
                                    strokeWidth="1"
                                    opacity="0.6"
                                />
                                <text
                                    x={labelPos.x + (labelPos.x > center ? 5 : -5)}
                                    y={labelPos.y}
                                    fill={slice.color}
                                    fontFamily={theme.typography.fontMono}
                                    fontSize="24"
                                    dominantBaseline="middle"
                                    textAnchor={labelAnchor}
                                    style={{
                                        fontVariantNumeric: theme.typography.numericVariant,
                                        fontFeatureSettings: theme.typography.numericFeatureSettings,
                                    }}
                                >
                                    {slice.label}
                                </text>
                                {showPercentages && (
                                    <text
                                        x={labelPos.x + (labelPos.x > center ? 5 : -5)}
                                        y={labelPos.y + 12}
                                        fill="white"
                                        fillOpacity="0.6"
                                        fontFamily={theme.typography.fontMono}
                                        fontSize="24"
                                        dominantBaseline="middle"
                                        textAnchor={labelAnchor}
                                        style={{
                                            fontVariantNumeric: theme.typography.numericVariant,
                                            fontFeatureSettings: theme.typography.numericFeatureSettings,
                                        }}
                                    >
                                        {Math.round((slice.value / total) * 100)}%
                                    </text>
                                )}
                            </g>
                        )}
                    </g>
                );
            })}
        </svg>
    );
};
