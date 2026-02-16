import React from 'react';
import { theme } from '../theme';
import { ChartGlowDefs } from './ChartGlowDefs';

interface ChartFunnelProps {
    stages: { label: string; value: number; color: string }[];
    width?: number;
    height?: number;
    showPercentages?: boolean;
    style?: React.CSSProperties;
}

export const ChartFunnel: React.FC<ChartFunnelProps> = ({
    stages,
    width = 400,
    height = 300,
    showPercentages = true,
    style
}) => {
    const maxVal = Math.max(...stages.map(s => s.value));
    const stageHeight = (height - (stages.length - 1) * 4) / stages.length; // 4px gap
    const gap = 4;

    return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" style={{ overflow: 'visible', ...style }}>
            <ChartGlowDefs />

            {stages.map((stage, i) => {
                const y = i * (stageHeight + gap);

                // Width based on value logic
                // Simple trapezoid: Top width proportional to this value, Bottom width proportional to next value?
                // Or Top=Current, Bottom=Current (rects)? Or centered? 
                // Classic funnel: Top edge = width * (value / max), Bottom edge = width * (nextValue / max)
                // BUT for visual stack, usually centered trapezoids.

                // Let's do trapezoids centered.

                // Width of top edge
                const topW = (stage.value / maxVal) * width;
                const topX = (width - topW) / 2;

                // Width of bottom edge - either same as top (rect) or interpolate to next stage?
                // Visual funnel usually interpolates to next stage for continuous flow.
                // If last stage, bottom width can be same as top or slightly smaller.
                const bottomW = (stage.value / maxVal) * width * 0.9; // Slight taper within the block itself for style?
                // Actually let's match top of next block for continuity?
                // No, separated blocks look better with independent "flow" feel. 
                // Let's make each block a trapezoid that tapers slightly.

                const bottomX = (width - bottomW) / 2;

                const path = `
                    M ${topX},${y} 
                    L ${topX + topW},${y} 
                    L ${bottomX + bottomW},${y + stageHeight} 
                    L ${bottomX},${y + stageHeight} 
                    Z
                `;

                return (
                    <g key={i}>
                        {/* Funnel Block */}
                        <path
                            d={path}
                            fill={stage.color}
                            fillOpacity="0.15"
                            stroke={stage.color}
                            strokeWidth="1"
                            strokeOpacity="0.5"
                            filter="url(#neon-glow-small)"
                        />

                        {/* Labels (Centered) */}
                        <text
                            x={width / 2}
                            y={y + stageHeight / 2 - 5}
                            fill="white"
                            fontFamily={theme.typography.fontUi}
                            fontSize="24"
                            textAnchor="middle"
                            style={{
                                fontVariantNumeric: theme.typography.numericVariant,
                                fontFeatureSettings: theme.typography.numericFeatureSettings,
                            }}
                        >
                            {stage.label}
                        </text>

                        <text
                            x={width / 2}
                            y={y + stageHeight / 2 + 12}
                            fill="white"
                            fontFamily={theme.typography.fontMono}
                            fontSize="24"
                            fontWeight="bold"
                            textAnchor="middle"
                            style={{
                                fontVariantNumeric: theme.typography.numericVariant,
                                fontFeatureSettings: theme.typography.numericFeatureSettings,
                            }}
                        >
                            {stage.value.toLocaleString()}
                        </text>

                        {/* Conversion Check (Right Side) */}
                        {showPercentages && i < stages.length - 1 && (
                            <g transform={`translate(${width - 40}, ${y + stageHeight})`}>
                                <text
                                    x="0"
                                    y="4"
                                    fill="white"
                                    fillOpacity="0.5"
                                    fontFamily={theme.typography.fontMono}
                                    fontSize="24"
                                    style={{
                                        fontVariantNumeric: theme.typography.numericVariant,
                                        fontFeatureSettings: theme.typography.numericFeatureSettings,
                                    }}
                                >
                                    {Math.round((stages[i + 1].value / stage.value) * 100)}%
                                </text>
                            </g>
                        )}
                    </g>
                );
            })}
        </svg>
    );
};
