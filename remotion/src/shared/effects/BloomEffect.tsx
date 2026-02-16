import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

interface BloomEffectProps {
    children: React.ReactNode;
    /** Primary glow color */
    color?: string;
    /** Intensity 0-1 (default: 0.6) */
    intensity?: number;
    /** Pulse frequency in frames (default: 30) */
    pulseFrequency?: number;
    /** Number of light rays (0 to disable, default: 0) */
    rays?: number;
    /** Ray spread angle in degrees (default: 360) */
    raySpread?: number;
    /** Animate rays rotation */
    rotateRays?: boolean;
    /** Initial reveal animation delay */
    revealDelay?: number;
}

/**
 * Bloom effect wrapper that adds a radiant glow and optional light rays.
 * Perfect for logos, CTAs, and key visual elements.
 */
export const BloomEffect: React.FC<BloomEffectProps> = ({
    children,
    color = '#00f0ff',
    intensity = 0.6,
    pulseFrequency = 30,
    rays = 0,
    raySpread = 360,
    rotateRays = true,
    revealDelay = 0,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Reveal animation
    const reveal = revealDelay > 0
        ? spring({ frame: frame - revealDelay, fps, config: { damping: 12, stiffness: 100 } })
        : 1;

    // Pulsing intensity
    const pulse = 0.7 + Math.sin(frame / pulseFrequency) * 0.3;
    const currentIntensity = intensity * pulse * reveal;

    // Ray rotation
    const rayRotation = rotateRays ? (frame / 120) * 360 : 0;

    // Generate radial gradient for bloom
    const bloomSize = 40 + currentIntensity * 40;

    return (
        <div
            style={{
                position: 'relative',
                display: 'inline-block',
            }}
        >
            {/* Outer bloom glow */}
            <div
                style={{
                    position: 'absolute',
                    inset: `-${bloomSize}px`,
                    background: `radial-gradient(ellipse 50% 50% at 50% 50%,
                        ${color}${Math.round(currentIntensity * 60).toString(16).padStart(2, '0')} 0%,
                        ${color}${Math.round(currentIntensity * 30).toString(16).padStart(2, '0')} 30%,
                        transparent 70%
                    )`,
                    filter: `blur(${20 * currentIntensity}px)`,
                    pointerEvents: 'none',
                }}
            />

            {/* Inner intense glow */}
            <div
                style={{
                    position: 'absolute',
                    inset: `-${bloomSize * 0.3}px`,
                    background: `radial-gradient(ellipse 60% 60% at 50% 50%,
                        ${color}${Math.round(currentIntensity * 80).toString(16).padStart(2, '0')} 0%,
                        transparent 60%
                    )`,
                    filter: `blur(${10 * currentIntensity}px)`,
                    pointerEvents: 'none',
                }}
            />

            {/* Light rays */}
            {rays > 0 && (
                <div
                    style={{
                        position: 'absolute',
                        inset: `-${bloomSize * 2}px`,
                        transform: `rotate(${rayRotation}deg)`,
                        pointerEvents: 'none',
                    }}
                >
                    {Array.from({ length: rays }).map((_, i) => {
                        const angle = (raySpread / rays) * i;
                        const rayIntensity = currentIntensity * (0.5 + Math.sin(frame / 20 + i) * 0.3);

                        return (
                            <div
                                key={i}
                                style={{
                                    position: 'absolute',
                                    left: '50%',
                                    top: '50%',
                                    width: '200%',
                                    height: 2 + rayIntensity * 3,
                                    background: `linear-gradient(90deg,
                                        ${color}${Math.round(rayIntensity * 80).toString(16).padStart(2, '0')} 0%,
                                        ${color}${Math.round(rayIntensity * 40).toString(16).padStart(2, '0')} 30%,
                                        transparent 100%
                                    )`,
                                    transformOrigin: 'left center',
                                    transform: `rotate(${angle}deg)`,
                                    filter: `blur(${1 + rayIntensity}px)`,
                                }}
                            />
                        );
                    })}
                </div>
            )}

            {/* Children content */}
            <div style={{ position: 'relative', zIndex: 1 }}>
                {children}
            </div>
        </div>
    );
};

/**
 * Lens flare effect for dramatic reveals and transitions.
 */
export const LensFlare: React.FC<{
    /** Position as percentage (0-100) */
    x?: number;
    y?: number;
    /** Primary color */
    color?: string;
    /** Intensity 0-1 */
    intensity?: number;
    /** Horizontal streak length */
    streakLength?: number;
    /** Animation delay */
    delay?: number;
}> = ({
    x = 50,
    y = 50,
    color = '#00f0ff',
    intensity = 0.8,
    streakLength = 400,
    delay = 0,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const reveal = spring({
        frame: frame - delay,
        fps,
        config: { damping: 15, stiffness: 80 },
    });

    const pulse = 0.8 + Math.sin(frame / 25) * 0.2;
    const effectiveIntensity = intensity * reveal * pulse;

    // Streak animation
    const streakWidth = interpolate(
        reveal,
        [0, 1],
        [0, streakLength],
        { extrapolateRight: 'clamp' }
    );

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                overflow: 'hidden',
            }}
        >
            {/* Central bright spot */}
            <div
                style={{
                    position: 'absolute',
                    left: `${x}%`,
                    top: `${y}%`,
                    width: 20 * effectiveIntensity,
                    height: 20 * effectiveIntensity,
                    transform: 'translate(-50%, -50%)',
                    background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
                    filter: `blur(${5 * effectiveIntensity}px)`,
                }}
            />

            {/* Horizontal anamorphic streak */}
            <div
                style={{
                    position: 'absolute',
                    left: `${x}%`,
                    top: `${y}%`,
                    width: streakWidth,
                    height: 4 * effectiveIntensity,
                    transform: 'translate(-50%, -50%)',
                    background: `linear-gradient(90deg,
                        transparent 0%,
                        ${color}${Math.round(effectiveIntensity * 60).toString(16).padStart(2, '0')} 20%,
                        ${color}${Math.round(effectiveIntensity * 100).toString(16).padStart(2, '0')} 50%,
                        ${color}${Math.round(effectiveIntensity * 60).toString(16).padStart(2, '0')} 80%,
                        transparent 100%
                    )`,
                    filter: `blur(${2 * effectiveIntensity}px)`,
                }}
            />

            {/* Secondary smaller streak (offset) */}
            <div
                style={{
                    position: 'absolute',
                    left: `${x}%`,
                    top: `${y}%`,
                    width: streakWidth * 0.6,
                    height: 2 * effectiveIntensity,
                    transform: `translate(-50%, calc(-50% + ${10 * effectiveIntensity}px))`,
                    background: `linear-gradient(90deg,
                        transparent 0%,
                        ${color}44 30%,
                        ${color}88 50%,
                        ${color}44 70%,
                        transparent 100%
                    )`,
                    filter: `blur(${3 * effectiveIntensity}px)`,
                    opacity: effectiveIntensity * 0.6,
                }}
            />

            {/* Circular halo */}
            <div
                style={{
                    position: 'absolute',
                    left: `${x}%`,
                    top: `${y}%`,
                    width: 120 * effectiveIntensity,
                    height: 120 * effectiveIntensity,
                    transform: 'translate(-50%, -50%)',
                    borderRadius: '50%',
                    background: `radial-gradient(circle,
                        transparent 40%,
                        ${color}22 50%,
                        transparent 60%
                    )`,
                    filter: `blur(${8 * effectiveIntensity}px)`,
                }}
            />
        </div>
    );
};
