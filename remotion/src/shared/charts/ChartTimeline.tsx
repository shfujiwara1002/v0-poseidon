import React from 'react';
import { theme } from '../theme';
import { ChartGlowDefs } from './ChartGlowDefs';

interface ChartTimelineProps {
    phases: {
        label: string;
        value?: string;
        color: string;
        progress?: number;    // 0-1, for partial completion
        icon?: string;        // SVG icon path
    }[];
    width?: number;
    height?: number;
    showConnectors?: boolean;
    showProgress?: boolean;
    style?: React.CSSProperties;
}

export const ChartTimeline: React.FC<ChartTimelineProps> = ({
    phases,
    width = 600,
    height = 100,
    showConnectors = true,
    showProgress = true,
    style
}) => {
    // Left: 180px, Right: 160px padding to accommodate larger labels and prevent overlap
    const trackWidth = width - 340;
    const startX = 180;
    const centerY = 35; // Fixed position to vertically center content (was height / 2)
    const gap = trackWidth / (phases.length - 1);

    return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" style={{ overflow: 'visible', ...style }}>
            <ChartGlowDefs />

            {/* Base Track Gradient */}
            <defs>
                <linearGradient id="timeline-track-grad" x1="0" y1="0" x2="1" y2="0">
                    {phases.map((p, i) => (
                        <stop key={i} offset={`${(i / (phases.length - 1)) * 100}%`} stopColor={p.color} stopOpacity="0.5" />
                    ))}
                </linearGradient>
            </defs>

            {/* Track Line / Connectors */}
            {phases.map((p, i) => {
                if (i === phases.length - 1) return null;
                const x1 = startX + i * gap;
                const x2 = startX + (i + 1) * gap;

                return (
                    <g key={`track-${i}`}>
                        {/* Dashed background connector */}
                        {showConnectors && (
                            <line
                                x1={x1} y1={centerY} x2={x2} y2={centerY}
                                stroke={p.color} strokeWidth="1" strokeDasharray="6 4"
                                opacity="0.4"
                            />
                        )}
                        {/* Progress fill */}
                        {showProgress && p.progress !== undefined && p.progress > 0 && (
                            <line
                                x1={x1} y1={centerY} x2={x1 + (gap * p.progress)} y2={centerY}
                                stroke={p.color} strokeWidth="2"
                                filter="url(#neon-glow-small)"
                            />
                        )}
                    </g>
                );
            })}

            {/* Nodes & Labels */}
            {phases.map((p, i) => {
                const x = startX + i * gap;
                return (
                    <g key={i}>
                        {/* Node Halo - 2 tiers larger */}
                        <circle cx={x} cy={centerY} r={14} fill={theme.background.deepNavy} stroke={p.color} strokeWidth="3" filter="url(#neon-glow-small)" />

                        {/* Inner Dot for completed - 2 tiers larger */}
                        {(p.progress === 1 || p.progress === undefined) && (
                            <circle cx={x} cy={centerY} r={6} fill={p.color} />
                        )}

                        {/* Label */}
                        <text
                            x={x}
                            y={centerY + 48}
                            fill="white"
                            fillOpacity="0.9"
                            fontFamily={theme.typography.fontUi}
                            fontSize={theme.typographyScale.sizeS}
                            fontWeight="600"
                            textAnchor="middle"
                            style={{
                                fontVariantNumeric: theme.typography.numericVariant,
                                fontFeatureSettings: theme.typography.numericFeatureSettings,
                            }}
                        >
                            {p.label}
                        </text>

                        {/* Value Sublabel */}
                        {p.value && (
                            <text
                                x={x}
                                y={centerY + 78}
                                fill={p.color}
                                fontFamily={theme.typography.fontMono}
                                fontSize={theme.typographyScale.sizeXS}
                                textAnchor="middle"
                                style={{
                                    fontVariantNumeric: theme.typography.numericVariant,
                                    fontFeatureSettings: theme.typography.numericFeatureSettings,
                                }}
                            >
                                {p.value}
                            </text>
                        )}
                    </g>
                );
            })}
        </svg>
    );
};
