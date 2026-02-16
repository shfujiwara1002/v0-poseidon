import React, { useMemo } from 'react';
import { useCurrentFrame, interpolate, random } from 'remotion';
import { theme } from '../theme';

interface WindFieldParticlesProps {
    /** Number of particles */
    count?: number;
    /** Wind direction (degrees) */
    windDirection?: number;
    /** Wind speed */
    windSpeed?: number;
    /** Turbulence amount */
    turbulence?: number;
    /** Particle colors */
    colors?: string[];
    /** Size range [min, max] */
    sizeRange?: [number, number];
    /** Enable glow effect */
    glow?: boolean;
    /** Respond to camera movement */
    reactToCamera?: boolean;
    /** Current camera offset */
    cameraOffset?: { x: number; y: number };
}

/**
 * Physics-based particles that respond to wind and camera movement.
 * Creates organic, flowing particle effects.
 */
export const WindFieldParticles: React.FC<WindFieldParticlesProps> = ({
    count = 60,
    windDirection = 45,
    windSpeed = 1,
    turbulence = 0.5,
    colors = [theme.accent.cyan, theme.accent.violet, '#ffffff'],
    sizeRange = [2, 6],
    glow = true,
    reactToCamera = true,
    cameraOffset = { x: 0, y: 0 },
}) => {
    const frame = useCurrentFrame();

    // Generate particles with consistent random values
    const particles = useMemo(() => {
        return Array.from({ length: count }, (_, i) => {
            const seed = i * 12345;
            return {
                id: i,
                baseX: random(seed) * 100,
                baseY: random(seed + 1) * 100,
                phase: random(seed + 2) * Math.PI * 2,
                speed: 0.3 + random(seed + 3) * 0.7,
                size: sizeRange[0] + random(seed + 4) * (sizeRange[1] - sizeRange[0]),
                color: colors[Math.floor(random(seed + 5) * colors.length)],
                opacity: 0.3 + random(seed + 6) * 0.5,
                turbulenceOffset: random(seed + 7) * 100,
            };
        });
    }, [count, colors, sizeRange]);

    // Convert wind direction to radians
    const windRad = (windDirection * Math.PI) / 180;
    const windX = Math.cos(windRad) * windSpeed;
    const windY = Math.sin(windRad) * windSpeed;

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                overflow: 'hidden',
                pointerEvents: 'none',
            }}
        >
            {particles.map((p) => {
                // Base movement from wind
                const baseMove = frame * p.speed * 0.5;

                // Turbulence using multiple sine waves
                const turbX =
                    Math.sin((frame + p.turbulenceOffset) / 30 + p.phase) * turbulence * 20 +
                    Math.sin((frame + p.turbulenceOffset) / 50 + p.phase * 2) * turbulence * 10;
                const turbY =
                    Math.cos((frame + p.turbulenceOffset) / 35 + p.phase) * turbulence * 15 +
                    Math.cos((frame + p.turbulenceOffset) / 45 + p.phase * 1.5) * turbulence * 8;

                // Camera reaction (particles move opposite to camera for parallax)
                const cameraReactX = reactToCamera ? -cameraOffset.x * (1 + p.speed) * 0.3 : 0;
                const cameraReactY = reactToCamera ? -cameraOffset.y * (1 + p.speed) * 0.3 : 0;

                // Calculate final position with wrapping
                let x = (p.baseX + baseMove * windX + turbX + cameraReactX) % 120;
                let y = (p.baseY + baseMove * windY + turbY + cameraReactY) % 120;
                if (x < -10) x += 120;
                if (y < -10) y += 120;

                // Pulsing opacity
                const pulseOpacity = p.opacity * (0.7 + Math.sin(frame / 20 + p.phase) * 0.3);

                return (
                    <div
                        key={p.id}
                        style={{
                            position: 'absolute',
                            left: `${x}%`,
                            top: `${y}%`,
                            width: p.size,
                            height: p.size,
                            borderRadius: '50%',
                            backgroundColor: p.color,
                            opacity: pulseOpacity,
                            boxShadow: glow ? `0 0 ${p.size * 2}px ${p.color}` : undefined,
                            transform: 'translate(-50%, -50%)',
                        }}
                    />
                );
            })}
        </div>
    );
};

interface SparkBurstProps {
    /** X position (%) */
    x: number;
    /** Y position (%) */
    y: number;
    /** Number of sparks */
    count?: number;
    /** Trigger frame */
    triggerAt: number;
    /** Burst duration in frames */
    duration?: number;
    /** Spark color */
    color?: string;
    /** Spread radius */
    spread?: number;
    /** Gravity strength */
    gravity?: number;
}

/**
 * Spark burst effect that emanates from a point.
 * Triggered at a specific frame, with physics-based movement.
 */
export const SparkBurst: React.FC<SparkBurstProps> = ({
    x,
    y,
    count = 20,
    triggerAt,
    duration = 30,
    color = theme.accent.cyan,
    spread = 150,
    gravity = 0.5,
}) => {
    const frame = useCurrentFrame();

    // Generate sparks
    const sparks = useMemo(() => {
        return Array.from({ length: count }, (_, i) => {
            const seed = i * 54321;
            const angle = random(seed) * Math.PI * 2;
            const speed = 2 + random(seed + 1) * 5;
            return {
                id: i,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 2, // Initial upward bias
                size: 2 + random(seed + 2) * 3,
                delay: Math.floor(random(seed + 3) * 5),
                drag: 0.95 + random(seed + 4) * 0.04,
            };
        });
    }, [count]);

    // Don't render before trigger
    if (frame < triggerAt) return null;

    const elapsed = frame - triggerAt;

    // Fade out over duration
    const fadeOut = interpolate(elapsed, [0, duration], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    if (fadeOut <= 0) return null;

    return (
        <div
            style={{
                position: 'absolute',
                left: `${x}%`,
                top: `${y}%`,
                pointerEvents: 'none',
            }}
        >
            {sparks.map((spark) => {
                const t = Math.max(0, elapsed - spark.delay);

                // Physics simulation
                let px = 0;
                let py = 0;
                let vx = spark.vx;
                let vy = spark.vy;

                for (let i = 0; i < t; i++) {
                    px += vx;
                    py += vy;
                    vx *= spark.drag;
                    vy *= spark.drag;
                    vy += gravity * 0.1; // Gravity
                }

                // Clamp to spread
                const dist = Math.sqrt(px * px + py * py);
                if (dist > spread) {
                    px = (px / dist) * spread;
                    py = (py / dist) * spread;
                }

                // Individual fade
                const sparkFade = interpolate(t, [0, duration - 5], [1, 0], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                });

                if (sparkFade <= 0) return null;

                return (
                    <div
                        key={spark.id}
                        style={{
                            position: 'absolute',
                            left: px,
                            top: py,
                            width: spark.size * sparkFade,
                            height: spark.size * sparkFade,
                            borderRadius: '50%',
                            backgroundColor: color,
                            opacity: sparkFade * fadeOut,
                            boxShadow: `0 0 ${spark.size * 3}px ${color}`,
                            transform: 'translate(-50%, -50%)',
                        }}
                    />
                );
            })}
        </div>
    );
};

interface TrailingGlowProps {
    /** Element to follow (position in %) */
    target: { x: number; y: number };
    /** Number of trail segments */
    segments?: number;
    /** Trail color */
    color?: string;
    /** Trail length */
    length?: number;
    /** Enable when moving */
    active?: boolean;
}

/**
 * Trailing glow effect that follows a moving element.
 * Creates a comet-tail-like effect.
 */
export const TrailingGlow: React.FC<TrailingGlowProps> = ({
    target,
    segments = 10,
    color = theme.accent.cyan,
    length = 50,
    active = true,
}) => {
    const frame = useCurrentFrame();

    if (!active) return null;

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
            }}
        >
            {Array.from({ length: segments }, (_, i) => {
                const progress = i / segments;
                const delay = progress * 5;
                const size = interpolate(progress, [0, 1], [15, 3]);
                const opacity = interpolate(progress, [0, 1], [0.8, 0.1]);

                // Offset based on segment index (trailing behind)
                const offsetX = Math.sin((frame - delay * 3) / 10) * 5 * progress;
                const offsetY = Math.cos((frame - delay * 3) / 12) * 3 * progress;

                return (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            left: `calc(${target.x}% - ${length * progress}px + ${offsetX}px)`,
                            top: `calc(${target.y}% + ${offsetY}px)`,
                            width: size,
                            height: size,
                            borderRadius: '50%',
                            backgroundColor: color,
                            opacity,
                            boxShadow: `0 0 ${size}px ${color}`,
                            transform: 'translate(-50%, -50%)',
                        }}
                    />
                );
            })}
        </div>
    );
};

interface AttractorParticlesProps {
    /** Attractor point (%) */
    attractor: { x: number; y: number };
    /** Number of particles */
    count?: number;
    /** Attraction strength */
    strength?: number;
    /** Particle color */
    color?: string;
    /** Orbit radius */
    orbitRadius?: number;
}

/**
 * Particles that orbit around an attractor point.
 * Creates a gravitational-like swirling effect.
 */
export const AttractorParticles: React.FC<AttractorParticlesProps> = ({
    attractor,
    count = 30,
    strength = 0.5,
    color = theme.accent.cyan,
    orbitRadius = 100,
}) => {
    const frame = useCurrentFrame();

    const particles = useMemo(() => {
        return Array.from({ length: count }, (_, i) => {
            const seed = i * 98765;
            const angle = random(seed) * Math.PI * 2;
            const distance = orbitRadius * (0.3 + random(seed + 1) * 0.7);
            return {
                id: i,
                angle,
                distance,
                speed: 0.5 + random(seed + 2) * 1,
                size: 2 + random(seed + 3) * 3,
                opacity: 0.4 + random(seed + 4) * 0.4,
            };
        });
    }, [count, orbitRadius]);

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
            }}
        >
            {particles.map((p) => {
                // Orbital motion
                const currentAngle = p.angle + (frame * p.speed * strength * 0.02);
                const x = attractor.x + Math.cos(currentAngle) * (p.distance / 10);
                const y = attractor.y + Math.sin(currentAngle) * (p.distance / 10);

                // Distance-based size (closer = larger)
                const distFactor = 1 - (p.distance / orbitRadius) * 0.3;

                return (
                    <div
                        key={p.id}
                        style={{
                            position: 'absolute',
                            left: `${x}%`,
                            top: `${y}%`,
                            width: p.size * distFactor,
                            height: p.size * distFactor,
                            borderRadius: '50%',
                            backgroundColor: color,
                            opacity: p.opacity * distFactor,
                            boxShadow: `0 0 ${p.size * 2}px ${color}`,
                            transform: 'translate(-50%, -50%)',
                        }}
                    />
                );
            })}
        </div>
    );
};

interface ElementGlowTrailProps {
    children: React.ReactNode;
    /** Enable trail effect */
    active?: boolean;
    /** Trail color */
    color?: string;
    /** Trail length */
    trailLength?: number;
}

/**
 * Wrapper that adds a glowing trail to moving elements.
 */
export const ElementGlowTrail: React.FC<ElementGlowTrailProps> = ({
    children,
    active = true,
    color = theme.accent.cyan,
    trailLength = 5,
}) => {
    return (
        <div style={{ position: 'relative' }}>
            {/* Trail layers */}
            {active &&
                Array.from({ length: trailLength }, (_, i) => {
                    const opacity = interpolate(i, [0, trailLength], [0.3, 0.05]);
                    const blur = (i + 1) * 2;
                    const scale = 1 + i * 0.02;

                    return (
                        <div
                            key={i}
                            style={{
                                position: 'absolute',
                                inset: 0,
                                opacity,
                                filter: `blur(${blur}px)`,
                                transform: `scale(${scale}) translateX(${-i * 3}px)`,
                                pointerEvents: 'none',
                            }}
                        >
                            <div
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    background: color,
                                    borderRadius: 'inherit',
                                }}
                            />
                        </div>
                    );
                })}

            {/* Main content */}
            <div style={{ position: 'relative' }}>{children}</div>
        </div>
    );
};
