import React from 'react';
import { useCurrentFrame, spring, useVideoConfig } from 'remotion';
import { theme } from '../theme';

interface TrackedAnnotationProps {
    /** Annotation text */
    text: string;
    /** Target position (percentage) */
    target: { x: number; y: number };
    /** Optional label/category */
    label?: string;
    /** Annotation color */
    color?: string;
    /** Delay before appearing */
    delay?: number;
    /** Position relative to target */
    position?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
    /** Distance from target */
    distance?: number;
    /** Enable connector line */
    connector?: boolean;
    /** Enable pulse effect */
    pulse?: boolean;
    /** Counter-rotate to stay horizontal when parent rotates */
    counterRotation?: number;
}

/**
 * Annotation that tracks a target point and stays readable.
 * Maintains horizontal orientation even when the UI is tilted in 3D space.
 */
export const TrackedAnnotation: React.FC<TrackedAnnotationProps> = ({
    text,
    target,
    label,
    color = theme.accent.cyan,
    delay = 0,
    position = 'auto',
    distance = 80,
    connector = true,
    pulse = true,
    counterRotation = 0,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const reveal = spring({
        frame: frame - delay,
        fps,
        config: { damping: 12, stiffness: 100 },
    });

    // Calculate annotation position based on target
    const getOffset = () => {
        switch (position) {
            case 'top':
                return { x: 0, y: -distance };
            case 'bottom':
                return { x: 0, y: distance };
            case 'left':
                return { x: -distance, y: 0 };
            case 'right':
                return { x: distance, y: 0 };
            case 'auto':
            default:
                // Prefer top-right if target is in lower-left quadrant, etc.
                const xDir = target.x < 50 ? 1 : -1;
                const yDir = target.y > 50 ? -1 : 1;
                return { x: distance * 0.7 * xDir, y: distance * 0.7 * yDir };
        }
    };

    const offset = getOffset();

    // Pulse animation
    const pulseScale = pulse
        ? 1 + Math.sin((frame - delay) / 15) * 0.05
        : 1;

    if (reveal < 0.01) return null;

    return (
        <div
            style={{
                position: 'absolute',
                left: `${target.x}%`,
                top: `${target.y}%`,
                pointerEvents: 'none',
                zIndex: 1000,
            }}
        >
            {/* Target dot */}
            <div
                style={{
                    position: 'absolute',
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: color,
                    transform: `translate(-50%, -50%) scale(${reveal * pulseScale})`,
                    boxShadow: `0 0 ${10 * pulseScale}px ${color}, 0 0 ${20 * pulseScale}px ${color}66`,
                }}
            />

            {/* Connector line */}
            {connector && (
                <svg
                    style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        width: Math.abs(offset.x) + 20,
                        height: Math.abs(offset.y) + 20,
                        transform: `translate(${offset.x < 0 ? offset.x : -10}px, ${offset.y < 0 ? offset.y : -10}px)`,
                        overflow: 'visible',
                        opacity: reveal,
                    }}
                >
                    <line
                        x1={offset.x < 0 ? Math.abs(offset.x) + 10 : 10}
                        y1={offset.y < 0 ? Math.abs(offset.y) + 10 : 10}
                        x2={offset.x < 0 ? 10 : offset.x + 10}
                        y2={offset.y < 0 ? 10 : offset.y + 10}
                        stroke={color}
                        strokeWidth={2}
                        strokeDasharray={`${reveal * 100}% 100%`}
                        opacity={0.6}
                    />
                </svg>
            )}

            {/* Annotation box */}
            <div
                style={{
                    position: 'absolute',
                    left: offset.x,
                    top: offset.y,
                    transform: `translate(-50%, -50%) rotate(${counterRotation}deg) scale(${reveal})`,
                    transformOrigin: 'center center',
                    opacity: reveal,
                }}
            >
                <div
                    style={{
                        background: 'rgba(0,0,0,0.85)',
                        backdropFilter: 'blur(10px)',
                        border: `1px solid ${color}66`,
                        borderRadius: 8,
                        padding: '8px 14px',
                        boxShadow: `0 0 20px ${color}33, 0 4px 15px rgba(0,0,0,0.4)`,
                    }}
                >
                    {label && (
                        <div
                            style={{
                                fontSize: 10,
                                fontWeight: 600,
                                color: color,
                                textTransform: 'uppercase',
                                letterSpacing: '0.08em',
                                marginBottom: 4,
                                fontFamily: theme.typography.fontUi,
                            }}
                        >
                            {label}
                        </div>
                    )}
                    <div
                        style={{
                            fontSize: 14,
                            fontWeight: 500,
                            color: 'white',
                            whiteSpace: 'nowrap',
                            fontFamily: theme.typography.fontUi,
                        }}
                    >
                        {text}
                    </div>
                </div>
            </div>
        </div>
    );
};

interface AnnotationGroupProps {
    annotations: Array<{
        id: string;
        text: string;
        target: { x: number; y: number };
        label?: string;
        color?: string;
    }>;
    /** Base delay before first annotation */
    delay?: number;
    /** Stagger between annotations */
    stagger?: number;
    /** Counter-rotation for 3D scenes */
    counterRotation?: number;
    /** Show all annotations sequentially */
    sequential?: boolean;
}

/**
 * Group of annotations that appear in sequence.
 */
export const AnnotationGroup: React.FC<AnnotationGroupProps> = ({
    annotations,
    delay = 0,
    stagger = 10,
    counterRotation = 0,
    sequential = true,
}) => {
    return (
        <>
            {annotations.map((annotation, i) => (
                <TrackedAnnotation
                    key={annotation.id}
                    text={annotation.text}
                    target={annotation.target}
                    label={annotation.label}
                    color={annotation.color}
                    delay={sequential ? delay + i * stagger : delay}
                    counterRotation={counterRotation}
                />
            ))}
        </>
    );
};

interface FloatingLabelProps {
    children: React.ReactNode;
    /** Label text */
    label: string;
    /** Label position */
    position?: 'top' | 'bottom' | 'left' | 'right';
    /** Label color */
    color?: string;
    /** Delay before appearing */
    delay?: number;
    /** Enable floating animation */
    float?: boolean;
}

/**
 * Label that floats around an element, always staying readable.
 */
export const FloatingLabel: React.FC<FloatingLabelProps> = ({
    children,
    label,
    position = 'top',
    color = theme.accent.cyan,
    delay = 0,
    float = true,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const reveal = spring({
        frame: frame - delay,
        fps,
        config: { damping: 12, stiffness: 120 },
    });

    // Floating animation
    const floatY = float ? Math.sin((frame - delay) / 20) * 3 : 0;
    const floatX = float ? Math.cos((frame - delay) / 25) * 2 : 0;

    const getLabelStyle = (): React.CSSProperties => {
        const base: React.CSSProperties = {
            position: 'absolute',
            fontSize: 12,
            fontWeight: 600,
            color: color,
            whiteSpace: 'nowrap',
            fontFamily: theme.typography.fontUi,
            opacity: reveal,
            textShadow: `0 0 10px ${color}`,
            transform: `translate(${floatX}px, ${floatY}px)`,
        };

        switch (position) {
            case 'top':
                return {
                    ...base,
                    bottom: '100%',
                    left: '50%',
                    transform: `translateX(-50%) translateY(${-8 + floatY}px)`,
                };
            case 'bottom':
                return {
                    ...base,
                    top: '100%',
                    left: '50%',
                    transform: `translateX(-50%) translateY(${8 + floatY}px)`,
                };
            case 'left':
                return {
                    ...base,
                    right: '100%',
                    top: '50%',
                    transform: `translateY(-50%) translateX(${-8 + floatX}px)`,
                };
            case 'right':
                return {
                    ...base,
                    left: '100%',
                    top: '50%',
                    transform: `translateY(-50%) translateX(${8 + floatX}px)`,
                };
            default:
                return base;
        }
    };

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            {children}
            <div style={getLabelStyle()}>{label}</div>
        </div>
    );
};

interface DataCalloutProps {
    /** Main value */
    value: string | number;
    /** Value label */
    label: string;
    /** Trend direction */
    trend?: 'up' | 'down' | 'neutral';
    /** Trend value */
    trendValue?: string;
    /** Callout color */
    color?: string;
    /** Delay before appearing */
    delay?: number;
    /** Position as percentage */
    position: { x: number; y: number };
}

/**
 * Data callout that can be positioned anywhere on the screen.
 * Perfect for highlighting metrics in context.
 */
export const DataCallout: React.FC<DataCalloutProps> = ({
    value,
    label,
    trend,
    trendValue,
    color = theme.accent.cyan,
    delay = 0,
    position,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const reveal = spring({
        frame: frame - delay,
        fps,
        config: { damping: 10, stiffness: 100 },
    });

    const trendColors = {
        up: theme.accent.teal,
        down: theme.accent.red,
        neutral: 'rgba(255,255,255,0.5)',
    };

    const trendIcons = {
        up: '↑',
        down: '↓',
        neutral: '→',
    };

    return (
        <div
            style={{
                position: 'absolute',
                left: `${position.x}%`,
                top: `${position.y}%`,
                transform: `translate(-50%, -50%) scale(${reveal})`,
                opacity: reveal,
                pointerEvents: 'none',
                zIndex: 1000,
            }}
        >
            <div
                style={{
                    background: 'rgba(0,0,0,0.9)',
                    backdropFilter: 'blur(12px)',
                    border: `2px solid ${color}`,
                    borderRadius: 12,
                    padding: '14px 20px',
                    textAlign: 'center',
                    boxShadow: `0 0 30px ${color}44, 0 8px 25px rgba(0,0,0,0.5)`,
                }}
            >
                <div
                    style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: 'rgba(255,255,255,0.6)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        marginBottom: 6,
                        fontFamily: theme.typography.fontUi,
                    }}
                >
                    {label}
                </div>
                <div
                    style={{
                        fontSize: 28,
                        fontWeight: 700,
                        color: color,
                        fontFamily: theme.typography.fontHeader,
                        textShadow: `0 0 20px ${color}88`,
                    }}
                >
                    {value}
                </div>
                {trend && trendValue && (
                    <div
                        style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: trendColors[trend],
                            marginTop: 6,
                            fontFamily: theme.typography.fontUi,
                        }}
                    >
                        {trendIcons[trend]} {trendValue}
                    </div>
                )}
            </div>
        </div>
    );
};
