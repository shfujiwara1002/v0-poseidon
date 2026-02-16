import React from 'react';
import {
    spring,
    useCurrentFrame,
    useVideoConfig,
    interpolate,
} from 'remotion';
import { SPRING_CONFIGS } from './MotionUtils';

type AnimationVariant = 'snap' | 'fade-up' | 'typewriter' | 'wave' | 'glow-reveal';

interface AnimatedTextProps {
    children: string;
    mode?: 'word' | 'char' | 'line';
    delay?: number;
    stagger?: number;
    style?: React.CSSProperties;
    className?: string;
    /** Animation variant (default: snap) */
    variant?: AnimationVariant;
    /** Glow color for glow-reveal variant */
    glowColor?: string;
    /** Wave amplitude for wave variant */
    waveAmplitude?: number;
}

/**
 * Apple-style snappy typography component.
 * Animates text reveals with spring physics and subtle scale/tilt.
 */
export const AnimatedText: React.FC<AnimatedTextProps> = ({
    children,
    mode = 'word',
    delay = 0,
    stagger = 3,
    style,
    className,
    variant = 'snap',
    glowColor = '#00f0ff',
    waveAmplitude = 10,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const items = mode === 'word' ? children.split(' ') : children.split('');

    return (
        <div
            className={className}
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                whiteSpace: 'pre-wrap',
                ...style,
            }}
        >
            {items.map((item, i) => {
                const itemDelay = delay + i * stagger;
                const reveal = spring({
                    frame: frame - itemDelay,
                    fps,
                    config: SPRING_CONFIGS.snappy,
                });

                // Get animation values based on variant
                const getAnimationStyle = () => {
                    switch (variant) {
                        case 'fade-up':
                            return {
                                opacity: interpolate(reveal, [0, 1], [0, 1]),
                                transform: `translateY(${interpolate(reveal, [0, 1], [30, 0])}px)`,
                                filter: `blur(${interpolate(reveal, [0, 1], [4, 0])}px)`,
                            };

                        case 'typewriter':
                            const typeProgress = interpolate(reveal, [0, 0.3, 1], [0, 1, 1]);
                            return {
                                opacity: typeProgress > 0.5 ? 1 : 0,
                                transform: 'none',
                                filter: 'none',
                            };

                        case 'wave':
                            const waveOffset = Math.sin((frame - itemDelay) / 10 + i * 0.5) * waveAmplitude;
                            const waveOpacity = interpolate(reveal, [0, 0.5, 1], [0, 1, 1]);
                            return {
                                opacity: waveOpacity,
                                transform: `translateY(${waveOffset * (1 - reveal) + interpolate(reveal, [0, 1], [20, 0])}px)`,
                                filter: `blur(${interpolate(reveal, [0, 1], [5, 0])}px)`,
                            };

                        case 'glow-reveal':
                            const glowIntensity = interpolate(reveal, [0, 0.5, 1], [0, 1, 0.3]);
                            return {
                                opacity: interpolate(reveal, [0, 0.3, 1], [0, 1, 1]),
                                transform: `translateY(${interpolate(reveal, [0, 1], [20, 0])}px) scale(${interpolate(reveal, [0, 1], [1.2, 1])})`,
                                filter: `blur(${interpolate(reveal, [0, 1], [8, 0])}px) drop-shadow(0 0 ${20 * glowIntensity}px ${glowColor})`,
                                textShadow: `0 0 ${30 * glowIntensity}px ${glowColor}`,
                            };

                        case 'snap':
                        default:
                            return {
                                opacity: interpolate(reveal, [0, 0.5, 1], [0, 1, 1]),
                                transform: `translateY(${interpolate(reveal, [0, 1], [15, 0])}px) scale(${interpolate(reveal, [0, 1], [1.1, 1])})`,
                                filter: `blur(${interpolate(reveal, [0, 1], [8, 0])}px)`,
                            };
                    }
                };

                const animStyle = getAnimationStyle();

                return (
                    <span
                        key={`${item}-${i}`}
                        style={{
                            display: 'inline-block',
                            marginRight: mode === 'word' ? '0.25em' : '0',
                            ...animStyle,
                        }}
                    >
                        {item === ' ' ? '\u00A0' : item}
                    </span>
                );
            })}
        </div>
    );
};

/**
 * Cinematic headline text with dramatic reveal.
 * Perfect for shot titles and hero text.
 */
export const CinematicText: React.FC<{
    children: string;
    delay?: number;
    color?: string;
    glowColor?: string;
    size?: number;
    weight?: number;
    style?: React.CSSProperties;
}> = ({
    children,
    delay = 0,
    color = '#ffffff',
    glowColor = '#00f0ff',
    size = 64,
    weight = 700,
    style,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const reveal = spring({
        frame: frame - delay,
        fps,
        config: { damping: 12, stiffness: 100, mass: 0.8 },
    });

    const scale = interpolate(reveal, [0, 1], [1.3, 1]);
    const y = interpolate(reveal, [0, 1], [40, 0]);
    const opacity = interpolate(reveal, [0, 0.3, 1], [0, 1, 1]);
    const blur = interpolate(reveal, [0, 0.5, 1], [12, 4, 0]);
    const glowIntensity = interpolate(reveal, [0, 0.5, 1], [0, 1, 0.5]);

    return (
        <div
            style={{
                fontSize: size,
                fontWeight: weight,
                color,
                opacity,
                transform: `translateY(${y}px) scale(${scale})`,
                filter: `blur(${blur}px)`,
                textShadow: `0 0 ${40 * glowIntensity}px ${glowColor}, 0 0 ${80 * glowIntensity}px ${glowColor}44`,
                letterSpacing: '-0.02em',
                ...style,
            }}
        >
            {children}
        </div>
    );
};

/**
 * Typewriter effect with cursor.
 */
export const TypewriterText: React.FC<{
    children: string;
    delay?: number;
    speed?: number;
    showCursor?: boolean;
    cursorColor?: string;
    style?: React.CSSProperties;
}> = ({
    children,
    delay = 0,
    speed = 2,
    showCursor = true,
    cursorColor = '#00f0ff',
    style,
}) => {
    const frame = useCurrentFrame();

    const effectiveFrame = Math.max(0, frame - delay);
    const visibleChars = Math.floor(effectiveFrame / speed);
    const displayText = children.slice(0, visibleChars);

    // Cursor blink
    const cursorVisible = Math.floor(frame / 15) % 2 === 0;

    return (
        <span style={style}>
            {displayText}
            {showCursor && visibleChars < children.length && (
                <span
                    style={{
                        color: cursorColor,
                        opacity: cursorVisible ? 1 : 0,
                        marginLeft: 2,
                    }}
                >
                    |
                </span>
            )}
        </span>
    );
};
