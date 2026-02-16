import React, { useMemo } from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig, Easing } from 'remotion';
import { theme } from '../theme';

interface ProgressiveRevealProps {
    children: React.ReactNode;
    /** Start revealing at this frame */
    startAt: number;
    /** Full reveal duration */
    duration?: number;
    /** Reveal direction */
    direction?: 'up' | 'down' | 'left' | 'right' | 'center' | 'radial';
    /** Add fog/mist effect */
    fog?: boolean;
    /** Fog color */
    fogColor?: string;
    /** Scale during reveal */
    scaleFrom?: number;
}

/**
 * Progressive reveal effect with fog/mist.
 * Content emerges from obscurity as the viewer approaches.
 */
export const ProgressiveReveal: React.FC<ProgressiveRevealProps> = ({
    children,
    startAt,
    duration = 30,
    direction = 'up',
    fog = true,
    fogColor = 'rgba(0,0,0,0.9)',
    scaleFrom = 0.95,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const timeProgress = interpolate(
        frame,
        [startAt, startAt + duration],
        [0, 1],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
    );
    const springProgress = spring({
        frame: frame - startAt,
        fps,
        config: { damping: 15, stiffness: 80 },
    });
    const progress = Math.max(timeProgress, springProgress);

    const opacity = interpolate(progress, [0, 1], [0, 1]);
    const scale = interpolate(progress, [0, 1], [scaleFrom, 1]);
    const blur = interpolate(progress, [0, 0.5, 1], [10, 3, 0]);

    // Direction-based transform
    const getTransform = () => {
        const distance = interpolate(progress, [0, 1], [30, 0]);
        switch (direction) {
            case 'up':
                return `translateY(${distance}px)`;
            case 'down':
                return `translateY(${-distance}px)`;
            case 'left':
                return `translateX(${distance}px)`;
            case 'right':
                return `translateX(${-distance}px)`;
            case 'center':
            case 'radial':
                return `scale(${scale})`;
            default:
                return '';
        }
    };

    // Fog gradient based on direction
    const getFogGradient = () => {
        const fogOpacity = interpolate(progress, [0, 0.7, 1], [0.95, 0.3, 0]);
        switch (direction) {
            case 'up':
                return `linear-gradient(to top, transparent 0%, ${fogColor.replace(')', `,${fogOpacity})`)} 100%)`;
            case 'down':
                return `linear-gradient(to bottom, transparent 0%, ${fogColor.replace(')', `,${fogOpacity})`)} 100%)`;
            case 'left':
                return `linear-gradient(to left, transparent 0%, ${fogColor.replace(')', `,${fogOpacity})`)} 100%)`;
            case 'right':
                return `linear-gradient(to right, transparent 0%, ${fogColor.replace(')', `,${fogOpacity})`)} 100%)`;
            case 'radial':
            case 'center':
                return `radial-gradient(circle at center, transparent 0%, ${fogColor.replace(')', `,${fogOpacity})`)} 100%)`;
            default:
                return 'none';
        }
    };

    return (
        <div style={{ position: 'relative' }}>
            {/* Content */}
            <div
                style={{
                    opacity,
                    transform: getTransform(),
                    filter: blur > 0.5 ? `blur(${blur}px)` : 'none',
                    transition: 'filter 0.1s ease-out',
                }}
            >
                {children}
            </div>

            {/* Fog overlay */}
            {fog && progress < 1 && (
                <div
                    style={{
                        position: 'absolute',
                        inset: -20,
                        background: getFogGradient(),
                        pointerEvents: 'none',
                    }}
                />
            )}
        </div>
    );
};

interface LayeredInfoRevealProps {
    layers: Array<{
        content: React.ReactNode;
        depth: number; // 0 = front (visible first), 1 = back (visible last)
        label?: string;
    }>;
    /** Base delay before any reveal */
    delay?: number;
    /** Stagger between layers */
    stagger?: number;
    /** Current zoom level (1 = normal) */
    zoomLevel?: number;
    /** Zoom threshold for each layer depth */
    zoomThresholds?: number[];
}

/**
 * Layered information reveal that responds to zoom.
 * Different layers of information become visible at different zoom levels.
 */
export const LayeredInfoReveal: React.FC<LayeredInfoRevealProps> = ({
    layers,
    delay = 0,
    stagger = 15,
    zoomLevel = 1,
    zoomThresholds = [1, 1.2, 1.4, 1.6],
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Sort layers by depth
    const sortedLayers = useMemo(
        () => [...layers].sort((a, b) => a.depth - b.depth),
        [layers]
    );

    return (
        <div style={{ position: 'relative' }}>
            {sortedLayers.map((layer, i) => {
                // Calculate visibility based on zoom
                const threshold = zoomThresholds[Math.min(i, zoomThresholds.length - 1)];
                const zoomBasedVisibility = zoomLevel >= threshold ? 1 : 0;

                // Time-based reveal
                const layerDelay = delay + i * stagger;
                const timeReveal = spring({
                    frame: frame - layerDelay,
                    fps,
                    config: { damping: 12, stiffness: 100 },
                });

                // Combined visibility
                const visibility = Math.max(zoomBasedVisibility * timeReveal, 0);

                // Blur for unrevealed layers
                const blur = interpolate(visibility, [0, 0.5, 1], [8, 3, 0]);

                if (visibility < 0.01) return null;

                return (
                    <div
                        key={i}
                        style={{
                            position: i === 0 ? 'relative' : 'absolute',
                            inset: i === 0 ? undefined : 0,
                            opacity: visibility,
                            filter: blur > 0.5 ? `blur(${blur}px)` : 'none',
                            transform: `scale(${interpolate(visibility, [0, 1], [0.95, 1])})`,
                            zIndex: sortedLayers.length - i,
                        }}
                    >
                        {layer.label && visibility > 0.5 && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: -25,
                                    left: 0,
                                    fontSize: 11,
                                    fontWeight: 600,
                                    color: theme.accent.cyan,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    opacity: interpolate(visibility, [0.5, 1], [0, 1]),
                                }}
                            >
                                {layer.label}
                            </div>
                        )}
                        {layer.content}
                    </div>
                );
            })}
        </div>
    );
};

interface MetricHierarchyProps {
    /** Primary value (always visible) */
    primary: {
        label: string;
        value: string | number;
        color?: string;
    };
    /** Supporting metrics (revealed on zoom) */
    supporting?: ReadonlyArray<{
        label: string;
        value: string | number;
        color?: string;
    }>;
    /** Detail metrics (revealed on deeper zoom) */
    details?: ReadonlyArray<{
        label: string;
        value: string | number;
    }>;
    /** Current zoom level */
    zoomLevel?: number;
    /** Base delay */
    delay?: number;
}

/**
 * Hierarchical metric display that reveals more detail as you zoom in.
 */
export const MetricHierarchy: React.FC<MetricHierarchyProps> = ({
    primary,
    supporting = [],
    details = [],
    zoomLevel = 1,
    delay = 0,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Primary is always visible
    const primaryReveal = spring({
        frame: frame - delay,
        fps,
        config: { damping: 12, stiffness: 120 },
    });

    // Supporting visible at zoom > 1.2
    const supportingVisible = zoomLevel >= 1.15;
    const supportingReveal = spring({
        frame: supportingVisible ? frame - delay - 10 : -100,
        fps,
        config: { damping: 12, stiffness: 100 },
    });

    // Details visible at zoom > 1.4
    const detailsVisible = zoomLevel >= 1.35;
    const detailsReveal = spring({
        frame: detailsVisible ? frame - delay - 20 : -100,
        fps,
        config: { damping: 12, stiffness: 80 },
    });

    return (
        <div style={{ fontFamily: theme.typography.fontUi }}>
            {/* Primary metric */}
            <div
                style={{
                    opacity: primaryReveal,
                    transform: `scale(${interpolate(primaryReveal, [0, 1], [0.9, 1])})`,
                }}
            >
                <div
                    style={{
                        fontSize: 14,
                        color: 'rgba(255,255,255,0.6)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginBottom: 4,
                    }}
                >
                    {primary.label}
                </div>
                <div
                    style={{
                        fontSize: 42,
                        fontWeight: 700,
                        color: primary.color ?? theme.accent.cyan,
                        textShadow: `0 0 30px ${primary.color ?? theme.accent.cyan}66`,
                    }}
                >
                    {primary.value}
                </div>
            </div>

            {/* Supporting metrics */}
            {supporting.length > 0 && (
                <div
                    style={{
                        display: 'flex',
                        gap: 20,
                        marginTop: 16,
                        opacity: supportingReveal,
                        transform: `translateY(${interpolate(supportingReveal, [0, 1], [10, 0])}px)`,
                        filter: supportingReveal < 0.5 ? `blur(${(1 - supportingReveal) * 5}px)` : 'none',
                    }}
                >
                    {supporting.map((metric, i) => (
                        <div key={i}>
                            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{metric.label}</div>
                            <div
                                style={{
                                    fontSize: 20,
                                    fontWeight: 600,
                                    color: metric.color ?? 'white',
                                }}
                            >
                                {metric.value}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Detail metrics */}
            {details.length > 0 && (
                <div
                    style={{
                        marginTop: 12,
                        padding: '12px 0',
                        borderTop: '1px solid rgba(255,255,255,0.1)',
                        opacity: detailsReveal,
                        transform: `translateY(${interpolate(detailsReveal, [0, 1], [15, 0])}px)`,
                        filter: detailsReveal < 0.5 ? `blur(${(1 - detailsReveal) * 8}px)` : 'none',
                    }}
                >
                    {details.map((detail, i) => (
                        <div
                            key={i}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                fontSize: 13,
                                color: 'rgba(255,255,255,0.6)',
                                marginBottom: 6,
                            }}
                        >
                            <span>{detail.label}</span>
                            <span style={{ color: 'rgba(255,255,255,0.8)' }}>{detail.value}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

interface FogRevealTextProps {
    text: string;
    /** Start frame */
    startAt: number;
    /** Character reveal speed */
    speed?: number;
    /** Fog density */
    fogDensity?: number;
    /** Text style */
    style?: React.CSSProperties;
}

/**
 * Text that emerges from fog character by character.
 */
export const FogRevealText: React.FC<FogRevealTextProps> = ({
    text,
    startAt,
    speed = 2,
    fogDensity = 0.8,
    style,
}) => {
    const frame = useCurrentFrame();

    const elapsed = Math.max(0, frame - startAt);

    return (
        <span style={{ position: 'relative', ...style }}>
            {text.split('').map((char, i) => {
                const charProgress = Math.max(0, Math.min(1, (elapsed - i * speed) / 10));
                const clampedDensity = Math.max(0.1, Math.min(1.5, fogDensity));
                const blur = interpolate(
                    charProgress,
                    [0, 0.5, 1],
                    [8 * clampedDensity, 3 * clampedDensity, 0]
                );
                const opacity = interpolate(charProgress, [0, 1], [0, 1]);

                return (
                    <span
                        key={i}
                        style={{
                            opacity,
                            filter: blur > 0.5 ? `blur(${blur}px)` : 'none',
                            display: 'inline-block',
                            transition: 'filter 0.05s ease-out',
                        }}
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                );
            })}
        </span>
    );
};
