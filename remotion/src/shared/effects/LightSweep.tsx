import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';

interface LightSweepProps {
    /** Duration in frames */
    duration: number;
    /** Angle of the sweep in degrees (default: 110) */
    angle?: number;
    /** Primary color of the light (default: white) */
    color?: string;
    /** Intensity 0-1 (default: 0.4) */
    intensity?: number;
    /** Number of light layers (1-3, default: 2) */
    layers?: number;
    /** Delay before animation starts */
    delay?: number;
    /** Loop the animation */
    loop?: boolean;
    /** Reverse direction */
    reverse?: boolean;
}

/**
 * Apple-style light sweep effect that travels across the screen or element.
 * Creates a cinematic highlight effect commonly seen in WWDC presentations.
 */
export const LightSweep: React.FC<LightSweepProps> = ({
    duration,
    angle = 110,
    color = '#ffffff',
    intensity = 0.4,
    layers = 2,
    delay = 0,
    loop = false,
    reverse = false,
}) => {
    const frame = useCurrentFrame();
    const effectiveFrame = Math.max(0, frame - delay);

    // Handle looping
    const animFrame = loop ? effectiveFrame % duration : Math.min(effectiveFrame, duration);

    // Primary sweep progress
    const progress1 = interpolate(
        animFrame,
        [0, duration],
        reverse ? [1.4, -0.4] : [-0.4, 1.4],
        { easing: Easing.bezier(0.4, 0, 0.2, 1) }
    );

    // Secondary faster sweep (if multiple layers)
    const progress2 = layers >= 2 ? interpolate(
        animFrame,
        [0, duration],
        reverse ? [1.8, -0.8] : [-0.8, 1.8],
        { easing: Easing.bezier(0.2, 0, 0.1, 1) }
    ) : 0;

    // Tertiary subtle sweep (if 3 layers)
    const progress3 = layers >= 3 ? interpolate(
        animFrame,
        [0, duration],
        reverse ? [1.2, -0.2] : [-0.2, 1.2],
        { easing: Easing.bezier(0.6, 0, 0.3, 1) }
    ) : 0;

    // Parse color for gradient
    const hexToRgba = (hex: string, alpha: number) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r},${g},${b},${alpha})`;
    };

    const colorRgba = (alpha: number) => {
        if (color.startsWith('#')) {
            return hexToRgba(color, alpha);
        }
        return color;
    };

    return (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
            {/* Primary sweep - bright center line */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    transform: `translateX(${progress1 * 100}%)`,
                    opacity: intensity,
                    mixBlendMode: 'screen',
                    background: `linear-gradient(${angle}deg,
                        transparent 0%,
                        ${colorRgba(0.1)} 45%,
                        ${colorRgba(0.4)} 49%,
                        ${colorRgba(0.8)} 50%,
                        ${colorRgba(0.4)} 51%,
                        ${colorRgba(0.1)} 55%,
                        transparent 100%
                    )`,
                }}
            />

            {/* Secondary sweep - wider, softer */}
            {layers >= 2 && (
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        transform: `translateX(${progress2 * 100}%)`,
                        opacity: intensity * 0.4,
                        mixBlendMode: 'screen',
                        background: `linear-gradient(${angle}deg,
                            transparent 0%,
                            ${colorRgba(0.3)} 40%,
                            ${colorRgba(0.6)} 50%,
                            ${colorRgba(0.3)} 60%,
                            transparent 100%
                        )`,
                    }}
                />
            )}

            {/* Tertiary sweep - subtle ambient */}
            {layers >= 3 && (
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        transform: `translateX(${progress3 * 100}%)`,
                        opacity: intensity * 0.2,
                        mixBlendMode: 'screen',
                        background: `linear-gradient(${angle}deg,
                            transparent 0%,
                            ${colorRgba(0.2)} 30%,
                            ${colorRgba(0.4)} 50%,
                            ${colorRgba(0.2)} 70%,
                            transparent 100%
                        )`,
                    }}
                />
            )}
        </div>
    );
};

/**
 * Card-specific light sweep for glass cards and panels.
 */
export const CardShine: React.FC<{
    duration: number;
    delay?: number;
    color?: string;
}> = ({ duration, delay = 0, color = '#00f0ff' }) => {
    const frame = useCurrentFrame();
    const effectiveFrame = Math.max(0, frame - delay);

    const progress = interpolate(
        effectiveFrame,
        [0, duration],
        [-0.5, 1.5],
        { easing: Easing.bezier(0.4, 0, 0.2, 1), extrapolateRight: 'clamp' }
    );

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                overflow: 'hidden',
                borderRadius: 'inherit',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    transform: `translateX(${progress * 100}%) rotate(25deg)`,
                    background: `linear-gradient(90deg,
                        transparent 0%,
                        transparent 40%,
                        ${color}22 45%,
                        ${color}44 50%,
                        ${color}22 55%,
                        transparent 60%,
                        transparent 100%
                    )`,
                    mixBlendMode: 'screen',
                }}
            />
        </div>
    );
};
