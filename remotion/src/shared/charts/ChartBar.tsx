import React from 'react';
import { theme } from '../theme';
import { ChartGlowDefs } from './ChartGlowDefs';

interface ChartBarProps {
    data: { value: number; label: string; color?: string }[];
    width?: number;
    height?: number;
    color?: string; // Default color if data[i].color not set
    showReflection?: boolean;
    showScanlines?: boolean;
    barRadius?: number;            // NEW: top corner radius (default 4)
    showValueLabels?: boolean;     // NEW
    valueFormat?: (v: number) => string;  // NEW: "$10K", "1,000", etc.
    showGrid?: boolean;            // NEW
    showAxisLabels?: boolean;      // NEW: show category labels below bars (default true)
    barGap?: number;               // NEW: fraction 0-1 (default 0.4)
    style?: React.CSSProperties;
}

export const ChartBar: React.FC<ChartBarProps> = ({
    data,
    width = 400,
    height = 200,
    color = theme.accent.cyan,
    showReflection = true,
    showScanlines = true,
    barRadius = 4,
    showValueLabels = true,
    valueFormat = (v) => v.toLocaleString(),
    showGrid = true,
    showAxisLabels = true,
    barGap = 0.4,
    style
}) => {
    // Layout Calcs
    const max = Math.max(...data.map(d => d.value));
    const range = max * 1.1; // 10% headroom

    const totalBars = data.length;
    // Calculate bar width with gap strategy
    // Total width = (barWidth * N) + (gapWidth * (N-1))
    // gapWidth = barWidth * barGap
    // W = N*bw + (N-1)*bw*gap = bw * (N + (N-1)*gap)
    // bw = W / (N + (N-1)*gap)

    // Simplification for consistent spacing:
    // Slot width = W / N. Bar width = Slot width * (1 - gapFraction)
    const slotWidth = width / totalBars;
    const barWidth = slotWidth * (1 - barGap);
    const sidePadding = (slotWidth - barWidth) / 2;

    return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" style={{ overflow: 'visible', ...style }}>
            <ChartGlowDefs />

            {/* Background Grid */}
            {showGrid && (
                <g opacity="1">
                    {[0, 0.25, 0.5, 0.75, 1].map(ratio => {
                        const y = height * (1 - ratio); // Invert since 0 is bottom for bars logically
                        if (y > height) return null; // Skip bottom if out of bounds? No, 1-1 = 0 (top). 1-0 = 1 (bottom).
                        // Let's stick to ratio from top for drawing lines
                        const lineY = height * ratio;
                        return (
                            <line
                                key={`h-${ratio}`}
                                x1="0" y1={lineY} x2={width} y2={lineY}
                                stroke={theme.glass.glassBorder}
                                strokeWidth="1"
                                strokeOpacity={ratio === 1 ? "0.25" : "0.08"}
                            />
                        );
                    })}
                </g>
            )}

            {/* Definitions for Vertical Gradient per bar color is tricky in SVG without unique IDs.
                We can reuse one if they are all same color, or use 'currentColor' trick if supported,
                or generate unique IDs. Given limited number of bars, we can just inline style or use specific gradients if known colors.
                Actually, we can use <linearGradient> with explicit stops for each color if needed, or better:
                Use a mask or opacity gradient on top of a solid color rect.
                
                Lets use the Opacity Gradient "bar-reflection-gradient" (white to transparent) on a colored rect for reflections.
                For the pillar itself, we want bottom-faded (dark) to top (bright).
            */}

            {data.map((d, i) => {
                const barColor = d.color || color;
                const barHeight = (d.value / range) * height;
                const x = (i * slotWidth) + sidePadding;
                const y = height - barHeight;

                // Unique ID for this bar's gradient
                const gradId = `bar-grad-${i}`;

                return (
                    <g key={i}>
                        <defs>
                            <linearGradient id={gradId} x1="0" y1="1" x2="0" y2="0">
                                <stop offset="0%" stopColor={barColor} stopOpacity="0.2" />
                                <stop offset="100%" stopColor={barColor} stopOpacity="0.9" />
                            </linearGradient>
                        </defs>

                        {/* REFLECTION */}
                        {showReflection && (
                            <g opacity="0.4">
                                {/* Reflection geometry: same rect flipped */}
                                <rect
                                    x={x} y={height} width={barWidth} height={barHeight * 0.4}
                                    fill={barColor}
                                    mask="url(#bar-reflection-mask)" // We need a mask for the fade out
                                    opacity="0.2"
                                />
                                {/* Since we didn't define a mask, use a gradient fill rect on top? 
                                    Or just fill with `bar-reflection-gradient` which is white->transparent, 
                                    and composite it? 
                                    Easier: Rect filled with barColor, and an overlay Rect filled with white-transparent gradient but 
                                    that makes it white.
                                    
                                    Correct approach without complex masks:
                                    Fill with barColor. Mask with gradient from white to black.
                                    Or: Use a linearGradient from barColor(alpha=0.2) to barColor(alpha=0).
                                */}
                                <rect
                                    x={x} y={height} width={barWidth} height={barHeight * 0.3}
                                    fill={`url(#bar-reflection-gradient-colored-${i})`}
                                />
                                <defs>
                                    <linearGradient id={`bar-reflection-gradient-colored-${i}`} x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor={barColor} stopOpacity="0.2" />
                                        <stop offset="100%" stopColor={barColor} stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                            </g>
                        )}

                        {/* CORE PILLAR */}
                        {/* 1. Glass Background (full column width maybe? No, keep to bar width for cleanliness) */}
                        <rect x={x} y={y} width={barWidth} height={barHeight} rx={barRadius} fill={barColor} fillOpacity="0.03" />

                        {/* 2. Main Gradient Fill */}
                        <rect x={x} y={y} width={barWidth} height={barHeight} rx={barRadius} fill={`url(#${gradId})`} stroke="none" />

                        {/* 3. Scanlines */}
                        {showScanlines && (
                            <rect x={x} y={y} width={barWidth} height={barHeight} rx={barRadius} fill="url(#holo-scanlines)" fillOpacity="0.15" />
                        )}

                        {/* 4. Highlight Edge (Left) */}
                        <rect x={x} y={y} width={1} height={barHeight} fill="white" fillOpacity="0.15" />

                        {/* 5. Top Cap Glow */}
                        <rect x={x} y={y} width={barWidth} height={2} fill="white" filter="url(#neon-glow-small)" fillOpacity="0.8" />

                        {/* LABELS */}
                        {/* Value Top */}
                        {showValueLabels && (
                            <text
                                x={x + barWidth / 2}
                                y={y - 12}
                                fill="white"
                                fontFamily={theme.typography.fontHeader}
                                fontSize="24"
                                textAnchor="middle"
                                filter="url(#neon-glow-small)"
                                style={{
                                    fontVariantNumeric: theme.typography.numericVariant,
                                    fontFeatureSettings: theme.typography.numericFeatureSettings,
                                }}
                            >
                                {valueFormat(d.value)}
                            </text>
                        )}

                        {/* Category Bottom */}
                        {showAxisLabels && (
                        <text
                            x={x + barWidth / 2}
                            y={height + 20}
                            fill="white"
                            fillOpacity="0.6"
                            fontFamily={theme.typography.fontMono}
                            fontSize="24"
                            textAnchor="middle"
                            style={{
                                fontVariantNumeric: theme.typography.numericVariant,
                                fontFeatureSettings: theme.typography.numericFeatureSettings,
                            }}
                        >
                            {d.label}
                        </text>
                        )}
                    </g>
                );
            })}
        </svg>
    );
};
