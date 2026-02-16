import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

interface SpotlightProps {
    /** X position in percentage (0-100) */
    x: number;
    /** Y position in percentage (0-100) */
    y: number;
    /** Spotlight radius in pixels */
    radius?: number;
    /** Darkness of the surrounding area (0-1) */
    intensity?: number;
    /** Feather/blur amount at the edge */
    feather?: number;
    /** Delay before spotlight appears */
    delay?: number;
    /** Optional color tint for the spotlight */
    tintColor?: string;
    /** Enable breathing/pulsing effect */
    pulse?: boolean;
    /** Pulse frequency */
    pulseFrequency?: number;
}

/**
 * Spotlight effect that darkens everything except the target area.
 * Perfect for drawing attention to specific UI elements.
 */
export const Spotlight: React.FC<SpotlightProps> = ({
    x,
    y,
    radius = 200,
    intensity = 0.85,
    feather = 80,
    delay = 0,
    tintColor,
    pulse = false,
    pulseFrequency = 30,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Fade in animation
    const fadeProgress = spring({
        frame: frame - delay,
        fps,
        config: { damping: 15, stiffness: 80 },
    });

    const currentIntensity = interpolate(fadeProgress, [0, 1], [0, intensity]);

    // Optional pulse effect
    const pulseAmount = pulse
        ? Math.sin((frame - delay) / pulseFrequency * Math.PI * 2) * 0.1 + 1
        : 1;

    const currentRadius = radius * pulseAmount;

    // Create radial gradient mask
    const gradient = tintColor
        ? `radial-gradient(circle at ${x}% ${y}%, transparent ${currentRadius - feather}px, ${tintColor}33 ${currentRadius}px, rgba(0,0,0,${currentIntensity}) ${currentRadius + feather}px)`
        : `radial-gradient(circle at ${x}% ${y}%, transparent ${currentRadius - feather}px, rgba(0,0,0,${currentIntensity}) ${currentRadius + feather}px)`;

    if (frame < delay) return null;

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                background: gradient,
                pointerEvents: 'none',
                zIndex: 100,
            }}
        />
    );
};

interface MultiSpotlightProps {
    spots: Array<{
        x: number;
        y: number;
        radius?: number;
        delay?: number;
    }>;
    intensity?: number;
    feather?: number;
}

/**
 * Multiple spotlight effect for highlighting several areas at once.
 */
export const MultiSpotlight: React.FC<MultiSpotlightProps> = ({
    spots,
    intensity = 0.85,
    feather = 60,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Build SVG mask with multiple circles
    const maskId = `multi-spotlight-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 100 }}>
            <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
                <defs>
                    <filter id={`${maskId}-blur`}>
                        <feGaussianBlur stdDeviation={feather / 2} />
                    </filter>
                    <mask id={maskId}>
                        <rect width="100%" height="100%" fill="white" />
                        {spots.map((spot, i) => {
                            const spotDelay = spot.delay ?? i * 10;
                            const reveal = spring({
                                frame: frame - spotDelay,
                                fps,
                                config: { damping: 12, stiffness: 100 },
                            });
                            const r = (spot.radius ?? 150) * reveal;

                            return (
                                <circle
                                    key={i}
                                    cx={`${spot.x}%`}
                                    cy={`${spot.y}%`}
                                    r={r}
                                    fill="black"
                                    filter={`url(#${maskId}-blur)`}
                                />
                            );
                        })}
                    </mask>
                </defs>
                <rect
                    width="100%"
                    height="100%"
                    fill={`rgba(0,0,0,${intensity})`}
                    mask={`url(#${maskId})`}
                />
            </svg>
        </div>
    );
};

interface HighlightBoxProps {
    /** Left position in percentage */
    left: number;
    /** Top position in percentage */
    top: number;
    /** Width in percentage */
    width: number;
    /** Height in percentage */
    height: number;
    /** Border color */
    color?: string;
    /** Border thickness */
    borderWidth?: number;
    /** Corner radius */
    borderRadius?: number;
    /** Delay before appearing */
    delay?: number;
    /** Enable pulsing glow */
    pulse?: boolean;
    /** Add label text */
    label?: string;
    /** Label position */
    labelPosition?: 'top' | 'bottom' | 'left' | 'right';
}

/**
 * Highlight box that draws attention to a specific rectangular area.
 * Includes animated border and optional label.
 */
export const HighlightBox: React.FC<HighlightBoxProps> = ({
    left,
    top,
    width,
    height,
    color = '#00f0ff',
    borderWidth = 3,
    borderRadius = 12,
    delay = 0,
    pulse = true,
    label,
    labelPosition = 'top',
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const reveal = spring({
        frame: frame - delay,
        fps,
        config: { damping: 10, stiffness: 120 },
    });

    const glowIntensity = pulse
        ? Math.sin((frame - delay) / 15 * Math.PI) * 0.5 + 0.5
        : 1;

    if (frame < delay) return null;

    // Label positioning
    const labelStyles: React.CSSProperties = {
        position: 'absolute',
        fontFamily: 'Inter, sans-serif',
        fontSize: 14,
        fontWeight: 600,
        color: color,
        whiteSpace: 'nowrap',
        textShadow: `0 0 10px ${color}`,
        opacity: reveal,
    };

    switch (labelPosition) {
        case 'top':
            labelStyles.bottom = '100%';
            labelStyles.left = '50%';
            labelStyles.transform = 'translateX(-50%)';
            labelStyles.marginBottom = 8;
            break;
        case 'bottom':
            labelStyles.top = '100%';
            labelStyles.left = '50%';
            labelStyles.transform = 'translateX(-50%)';
            labelStyles.marginTop = 8;
            break;
        case 'left':
            labelStyles.right = '100%';
            labelStyles.top = '50%';
            labelStyles.transform = 'translateY(-50%)';
            labelStyles.marginRight = 8;
            break;
        case 'right':
            labelStyles.left = '100%';
            labelStyles.top = '50%';
            labelStyles.transform = 'translateY(-50%)';
            labelStyles.marginLeft = 8;
            break;
    }

    return (
        <div
            style={{
                position: 'absolute',
                left: `${left}%`,
                top: `${top}%`,
                width: `${width}%`,
                height: `${height}%`,
                border: `${borderWidth}px solid ${color}`,
                borderRadius,
                boxShadow: `
                    0 0 ${20 * glowIntensity}px ${color}66,
                    0 0 ${40 * glowIntensity}px ${color}33,
                    inset 0 0 ${20 * glowIntensity}px ${color}22
                `,
                opacity: reveal,
                transform: `scale(${interpolate(reveal, [0, 1], [1.1, 1])})`,
                pointerEvents: 'none',
                zIndex: 100,
            }}
        >
            {label && <div style={labelStyles}>{label}</div>}
        </div>
    );
};

/**
 * Animated pointer/arrow that points to a specific location.
 */
export const PointerArrow: React.FC<{
    x: number;
    y: number;
    angle?: number;
    color?: string;
    size?: number;
    delay?: number;
    label?: string;
}> = ({
    x,
    y,
    angle = -45,
    color = '#00f0ff',
    size = 40,
    delay = 0,
    label,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const reveal = spring({
        frame: frame - delay,
        fps,
        config: { damping: 8, stiffness: 150 },
    });

    // Bouncing animation
    const bounce = Math.sin((frame - delay) / 12 * Math.PI * 2) * 5;

    if (frame < delay) return null;

    return (
        <div
            style={{
                position: 'absolute',
                left: `${x}%`,
                top: `${y}%`,
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(${bounce}px)`,
                opacity: reveal,
                pointerEvents: 'none',
                zIndex: 100,
            }}
        >
            {/* Arrow shape */}
            <div
                style={{
                    width: 0,
                    height: 0,
                    borderLeft: `${size / 2}px solid transparent`,
                    borderRight: `${size / 2}px solid transparent`,
                    borderTop: `${size}px solid ${color}`,
                    filter: `drop-shadow(0 0 10px ${color})`,
                }}
            />
            {label && (
                <div
                    style={{
                        position: 'absolute',
                        top: -size - 10,
                        left: '50%',
                        transform: `translateX(-50%) rotate(${-angle}deg)`,
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 14,
                        fontWeight: 600,
                        color: color,
                        whiteSpace: 'nowrap',
                        textShadow: `0 0 10px ${color}`,
                    }}
                >
                    {label}
                </div>
            )}
        </div>
    );
};
