import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig, Easing } from 'remotion';
import { theme } from '../theme';

interface AnimatedChartLineProps {
    /** Data points for the chart */
    data: number[];
    /** Optional upper confidence band */
    confidenceUpper?: number[];
    /** Optional lower confidence band */
    confidenceLower?: number[];
    /** Chart width */
    width?: number;
    /** Chart height */
    height?: number;
    /** Line color */
    color?: string;
    /** Line thickness */
    strokeWidth?: number;
    /** Show dot grid background */
    showDotGrid?: boolean;
    /** Show confidence band */
    showConfidenceBand?: boolean;
    /** Delay before animation starts */
    delay?: number;
    /** Duration of the draw animation in frames */
    drawDuration?: number;
    /** Show data points */
    showPoints?: boolean;
    /** Enable glow effect */
    glow?: boolean;
}

/**
 * Animated line chart that draws itself over time.
 * Perfect for showing data coming alive in the video.
 */
export const AnimatedChartLine: React.FC<AnimatedChartLineProps> = ({
    data,
    confidenceUpper,
    confidenceLower,
    width = 600,
    height = 200,
    color = theme.accent.cyan,
    strokeWidth = 3,
    showDotGrid = true,
    showConfidenceBand = false,
    delay = 0,
    drawDuration = 60,
    showPoints = true,
    glow = true,
}) => {
    const frame = useCurrentFrame();
    // Animation progress
    const drawProgress = interpolate(
        frame - delay,
        [0, drawDuration],
        [0, 1],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
    );

    // Calculate chart bounds
    const padding = { top: 20, right: 20, bottom: 20, left: 20 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    const allValues = [
        ...data,
        ...(confidenceUpper ?? []),
        ...(confidenceLower ?? []),
    ];
    const minVal = Math.min(...allValues) * 0.9;
    const maxVal = Math.max(...allValues) * 1.1;

    // Convert data to points
    const getPoint = (value: number, index: number) => ({
        x: padding.left + (index / (data.length - 1)) * chartWidth,
        y: padding.top + chartHeight - ((value - minVal) / (maxVal - minVal)) * chartHeight,
    });

    const points = data.map((v, i) => getPoint(v, i));

    // Create SVG path
    const createPath = (pts: { x: number; y: number }[]) => {
        if (pts.length === 0) return '';
        return pts.reduce((path, point, i) => {
            if (i === 0) return `M ${point.x} ${point.y}`;
            // Smooth curve using quadratic bezier
            const prev = pts[i - 1];
            const cpX = (prev.x + point.x) / 2;
            return `${path} Q ${prev.x} ${prev.y} ${cpX} ${(prev.y + point.y) / 2}`;
        }, '') + ` L ${pts[pts.length - 1].x} ${pts[pts.length - 1].y}`;
    };

    const linePath = createPath(points);

    // Calculate total path length for animation
    const pathLength = points.reduce((len, point, i) => {
        if (i === 0) return 0;
        const prev = points[i - 1];
        return len + Math.sqrt((point.x - prev.x) ** 2 + (point.y - prev.y) ** 2);
    }, 0);

    // Confidence band path
    const bandPath = showConfidenceBand && confidenceUpper && confidenceLower
        ? (() => {
            const upperPoints = confidenceUpper.map((v, i) => getPoint(v, i));
            const lowerPoints = confidenceLower.map((v, i) => getPoint(v, i)).reverse();
            const allBandPoints = [...upperPoints, ...lowerPoints];
            return allBandPoints.reduce((path, point, i) => {
                if (i === 0) return `M ${point.x} ${point.y}`;
                return `${path} L ${point.x} ${point.y}`;
            }, '') + ' Z';
        })()
        : '';

    // Glow filter ID
    const glowId = `chart-glow-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <svg width={width} height={height} style={{ overflow: 'visible' }}>
            <defs>
                {glow && (
                    <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                )}
                <linearGradient id={`${glowId}-grad`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                    <stop offset="100%" stopColor={color} stopOpacity={0.05} />
                </linearGradient>
            </defs>

            {/* Dot grid background */}
            {showDotGrid && (
                <g opacity={0.3}>
                    {Array.from({ length: 7 }).map((_, row) =>
                        Array.from({ length: 10 }).map((_, col) => (
                            <circle
                                key={`${row}-${col}`}
                                cx={padding.left + (col / 9) * chartWidth}
                                cy={padding.top + (row / 6) * chartHeight}
                                r={1.5}
                                fill="rgba(255,255,255,0.3)"
                            />
                        ))
                    )}
                </g>
            )}

            {/* Confidence band */}
            {showConfidenceBand && bandPath && (
                <path
                    d={bandPath}
                    fill={`url(#${glowId}-grad)`}
                    opacity={drawProgress}
                />
            )}

            {/* Main line */}
            <path
                d={linePath}
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={pathLength}
                strokeDashoffset={pathLength * (1 - drawProgress)}
                filter={glow ? `url(#${glowId})` : undefined}
            />

            {/* Data points */}
            {showPoints &&
                points.map((point, i) => {
                    const pointProgress = interpolate(
                        drawProgress,
                        [i / points.length, Math.min(1, (i + 1) / points.length + 0.1)],
                        [0, 1],
                        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                    );

                    return (
                        <g key={i}>
                            <circle
                                cx={point.x}
                                cy={point.y}
                                r={6 * pointProgress}
                                fill={color}
                                opacity={0.3 * pointProgress}
                            />
                            <circle
                                cx={point.x}
                                cy={point.y}
                                r={4 * pointProgress}
                                fill="#000"
                                stroke={color}
                                strokeWidth={2}
                            />
                        </g>
                    );
                })}
        </svg>
    );
};

interface AnimatedBarChartProps {
    data: Array<{ label: string; value: number; color?: string }>;
    width?: number;
    height?: number;
    delay?: number;
    stagger?: number;
    barWidth?: number;
    gap?: number;
}

/**
 * Animated bar chart with staggered bar growth.
 */
export const AnimatedBarChart: React.FC<AnimatedBarChartProps> = ({
    data,
    width = 400,
    height = 200,
    delay = 0,
    stagger = 8,
    barWidth = 40,
    gap = 20,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const maxValue = Math.max(...data.map((d) => d.value));
    const padding = { top: 20, bottom: 30 };
    const chartHeight = height - padding.top - padding.bottom;

    return (
        <svg width={width} height={height}>
            {data.map((item, i) => {
                const barDelay = delay + i * stagger;
                const growProgress = spring({
                    frame: frame - barDelay,
                    fps,
                    config: { damping: 12, stiffness: 100 },
                });

                const barHeight = (item.value / maxValue) * chartHeight * growProgress;
                const x = (width - data.length * barWidth - (data.length - 1) * gap) / 2 + i * (barWidth + gap);
                const y = padding.top + chartHeight - barHeight;
                const color = item.color ?? theme.accent.cyan;

                return (
                    <g key={i}>
                        {/* Bar */}
                        <rect
                            x={x}
                            y={y}
                            width={barWidth}
                            height={barHeight}
                            fill={color}
                            rx={4}
                            style={{
                                filter: `drop-shadow(0 0 10px ${color}66)`,
                            }}
                        />
                        {/* Label */}
                        <text
                            x={x + barWidth / 2}
                            y={height - 10}
                            fill="rgba(255,255,255,0.7)"
                            fontSize={12}
                            textAnchor="middle"
                            opacity={growProgress}
                        >
                            {item.label}
                        </text>
                        {/* Value */}
                        <text
                            x={x + barWidth / 2}
                            y={y - 8}
                            fill="white"
                            fontSize={14}
                            fontWeight={600}
                            textAnchor="middle"
                            opacity={growProgress}
                        >
                            {Math.round(item.value * growProgress)}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
};
