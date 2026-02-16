import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig, Easing } from 'remotion';
import { theme } from '../theme';

interface AnimatedProgressBarProps {
    /** Target value (0-1) */
    value: number;
    /** Label text */
    label?: string;
    /** Width of the bar */
    width?: number;
    /** Height of the bar */
    height?: number;
    /** Bar color */
    color?: string;
    /** Background color */
    backgroundColor?: string;
    /** Delay before animation starts */
    delay?: number;
    /** Duration of the fill animation */
    duration?: number;
    /** Show percentage text */
    showPercentage?: boolean;
    /** Enable glow effect */
    glow?: boolean;
    /** Border radius */
    borderRadius?: number;
}

/**
 * Animated progress bar that fills from 0 to target value.
 */
export const AnimatedProgressBar: React.FC<AnimatedProgressBarProps> = ({
    value,
    label,
    width = 300,
    height = 8,
    color = theme.accent.cyan,
    backgroundColor = 'rgba(255,255,255,0.12)',
    delay = 0,
    duration = 45,
    showPercentage = false,
    glow = true,
    borderRadius = 999,
}) => {
    const frame = useCurrentFrame();

    // Animation progress
    const fillProgress = interpolate(
        frame - delay,
        [0, duration],
        [0, value],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
    );

    // Reveal animation
    const reveal = interpolate(
        frame - delay,
        [0, 15],
        [0, 1],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    return (
        <div style={{ opacity: reveal }}>
            {/* Label row */}
            {(label || showPercentage) && (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: 6,
                        fontSize: 14,
                        fontFamily: theme.typography.fontUi,
                    }}
                >
                    {label && (
                        <span style={{ color: 'rgba(255,255,255,0.75)' }}>{label}</span>
                    )}
                    {showPercentage && (
                        <span style={{ color: color, fontWeight: 600 }}>
                            {Math.round(fillProgress * 100)}%
                        </span>
                    )}
                </div>
            )}

            {/* Bar container */}
            <div
                style={{
                    width,
                    height,
                    backgroundColor,
                    borderRadius,
                    overflow: 'hidden',
                    position: 'relative',
                }}
            >
                {/* Fill */}
                <div
                    style={{
                        width: `${fillProgress * 100}%`,
                        height: '100%',
                        background: `linear-gradient(90deg, ${color} 0%, ${color}ee 100%)`,
                        borderRadius,
                        boxShadow: glow ? `0 0 15px ${color}66, 0 0 30px ${color}33` : undefined,
                        transition: 'none',
                    }}
                />

                {/* Shimmer effect */}
                {glow && fillProgress > 0 && (
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: `${fillProgress * 100}%`,
                            height: '100%',
                            background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)`,
                            backgroundSize: '200% 100%',
                            backgroundPosition: `${((frame - delay) % 60) / 60 * 200}% 0`,
                        }}
                    />
                )}
            </div>
        </div>
    );
};

interface AnimatedFactorBarsProps {
    factors: Array<{
        label: string;
        value: number;
        color?: string;
    }>;
    delay?: number;
    stagger?: number;
    width?: number;
    barHeight?: number;
}

/**
 * Staggered animated factor bars for explainability visualization.
 */
export const AnimatedFactorBars: React.FC<AnimatedFactorBarsProps> = ({
    factors,
    delay = 0,
    stagger = 10,
    width = 350,
    barHeight = 6,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {factors.map((factor, i) => {
                const factorDelay = delay + i * stagger;
                const reveal = spring({
                    frame: frame - factorDelay,
                    fps,
                    config: { damping: 12, stiffness: 100 },
                });

                const fillProgress = interpolate(
                    frame - factorDelay - 10,
                    [0, 40],
                    [0, factor.value],
                    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
                );

                const color = factor.color ?? theme.accent.cyan;

                return (
                    <div
                        key={factor.label}
                        style={{
                            opacity: reveal,
                            transform: `translateX(${interpolate(reveal, [0, 1], [-20, 0])}px)`,
                        }}
                    >
                        {/* Label and value */}
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: 4,
                                fontSize: 13,
                                fontFamily: theme.typography.fontUi,
                            }}
                        >
                            <span style={{ color: 'rgba(255,255,255,0.75)' }}>{factor.label}</span>
                            <span style={{ color, fontWeight: 600 }}>
                                {(fillProgress * 100).toFixed(0)}%
                            </span>
                        </div>

                        {/* Bar */}
                        <div
                            style={{
                                width,
                                height: barHeight,
                                backgroundColor: 'rgba(255,255,255,0.12)',
                                borderRadius: 999,
                                overflow: 'hidden',
                            }}
                        >
                            <div
                                style={{
                                    width: `${fillProgress * 100}%`,
                                    height: '100%',
                                    background: `linear-gradient(90deg, ${theme.accent.red} 0%, ${color} 100%)`,
                                    borderRadius: 999,
                                    boxShadow: `0 0 10px ${color}66`,
                                }}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

interface AnimatedCounterProps {
    /** Target value */
    value: number;
    /** Prefix (e.g., "$") */
    prefix?: string;
    /** Suffix (e.g., "k") */
    suffix?: string;
    /** Decimal places */
    decimals?: number;
    /** Delay before animation */
    delay?: number;
    /** Duration of count animation */
    duration?: number;
    /** Font size */
    fontSize?: number;
    /** Color */
    color?: string;
    /** Show as percentage */
    asPercentage?: boolean;
}

/**
 * Animated counter that counts up to a target value.
 */
export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
    value,
    prefix = '',
    suffix = '',
    decimals = 0,
    delay = 0,
    duration = 45,
    fontSize = 32,
    color = 'white',
    asPercentage = false,
}) => {
    const frame = useCurrentFrame();

    const countProgress = interpolate(
        frame - delay,
        [0, duration],
        [0, 1],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
    );

    const currentValue = value * countProgress;
    const displayValue = asPercentage
        ? `${(currentValue * 100).toFixed(decimals)}%`
        : currentValue.toFixed(decimals);

    const reveal = interpolate(
        frame - delay,
        [0, 10],
        [0, 1],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    return (
        <span
            style={{
                fontSize,
                fontWeight: 700,
                color,
                fontFamily: theme.typography.fontHeader,
                opacity: reveal,
                transform: `scale(${interpolate(reveal, [0, 1], [0.8, 1])})`,
                display: 'inline-block',
            }}
        >
            {prefix}{displayValue}{suffix}
        </span>
    );
};

interface AnimatedStatProps {
    label: string;
    value: string | number;
    subtext?: string;
    color?: string;
    delay?: number;
    animate?: boolean;
}

/**
 * Animated stat card with label, value, and subtext.
 */
export const AnimatedStat: React.FC<AnimatedStatProps> = ({
    label,
    value,
    subtext,
    color = theme.accent.cyan,
    delay = 0,
    animate = true,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const reveal = spring({
        frame: frame - delay,
        fps,
        config: { damping: 12, stiffness: 120 },
    });

    // If value is a number, animate it
    const numericValue = typeof value === 'number' ? value : parseFloat(value.replace(/[^0-9.-]/g, ''));
    const isNumeric = !isNaN(numericValue) && animate;

    const displayValue = isNumeric
        ? interpolate(
            frame - delay,
            [0, 45],
            [0, numericValue],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
        )
        : value;

    // Extract prefix/suffix from original value
    const valueStr = String(value);
    const prefix = valueStr.match(/^[^0-9.-]*/)?.[0] ?? '';
    const suffix = valueStr.match(/[^0-9.-]*$/)?.[0] ?? '';

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                opacity: reveal,
                transform: `translateY(${interpolate(reveal, [0, 1], [15, 0])}px)`,
            }}
        >
            <div
                style={{
                    fontSize: 12,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.6)',
                    fontFamily: theme.typography.fontUi,
                }}
            >
                {label}
            </div>
            <div
                style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color,
                    fontFamily: theme.typography.fontHeader,
                    textShadow: `0 0 20px ${color}66`,
                }}
            >
                {isNumeric
                    ? `${prefix}${Math.round(displayValue as number)}${suffix}`
                    : displayValue}
            </div>
            {subtext && (
                <div
                    style={{
                        fontSize: 13,
                        color: 'rgba(255,255,255,0.5)',
                        fontFamily: theme.typography.fontUi,
                    }}
                >
                    {subtext}
                </div>
            )}
        </div>
    );
};
