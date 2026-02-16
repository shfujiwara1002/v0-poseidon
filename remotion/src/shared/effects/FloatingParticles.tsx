import React, { useMemo } from 'react';
import { random, useCurrentFrame, interpolate } from 'remotion';

interface FloatingParticlesProps {
    /** Number of particles (default: 60) */
    count?: number;
    /** Array of colors to use */
    colors?: string[];
    /** Size range [min, max] in pixels */
    sizeRange?: [number, number];
    /** Movement speed multiplier (default: 1) */
    speed?: number;
    /** Enable depth-based blur (default: true) */
    depthBlur?: boolean;
    /** Drift direction */
    drift?: { x: number; y: number };
    /** Enable glow effect (default: true) */
    glow?: boolean;
    /** Opacity range [min, max] */
    opacityRange?: [number, number];
    /** Seed for randomization */
    seed?: number;
}

/**
 * Elegant floating particles for background ambience.
 * Creates a sense of depth and constant subtle motion.
 */
export const FloatingParticles: React.FC<FloatingParticlesProps> = ({
    count = 60,
    colors = ['#00f0ff', '#8b5cf6', '#ffffff'],
    sizeRange = [2, 6],
    speed = 1,
    depthBlur = true,
    drift = { x: 30, y: 15 },
    glow = true,
    opacityRange = [0.2, 0.6],
    seed = 42,
}) => {
    const frame = useCurrentFrame();

    const particles = useMemo(() => {
        return Array.from({ length: count }).map((_, i) => {
            const baseSeed = seed + i;
            return {
                x: random(baseSeed * 13) * 100,
                y: random(baseSeed * 17) * 100,
                size: sizeRange[0] + random(baseSeed * 19) * (sizeRange[1] - sizeRange[0]),
                color: colors[Math.floor(random(baseSeed * 23) * colors.length)],
                speed: (0.3 + random(baseSeed * 29) * 0.7) * speed,
                opacity: opacityRange[0] + random(baseSeed * 31) * (opacityRange[1] - opacityRange[0]),
                depth: random(baseSeed * 37), // 0 = far, 1 = near
                phaseOffset: random(baseSeed * 41) * Math.PI * 2,
                wobbleSpeed: 0.5 + random(baseSeed * 43) * 1.5,
            };
        });
    }, [count, colors, sizeRange, speed, opacityRange, seed]);

    return (
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
            {particles.map((p, i) => {
                // Drift movement
                const driftX = (drift.x * (frame / 60)) * p.speed;
                const driftY = (drift.y * (frame / 60)) * p.speed;

                // Gentle wobble
                const wobbleX = Math.sin(frame / 60 * p.wobbleSpeed + p.phaseOffset) * 10;
                const wobbleY = Math.cos(frame / 60 * p.wobbleSpeed + p.phaseOffset) * 8;

                // Position with wrap-around
                const left = ((p.x + driftX + wobbleX) % 120) - 10;
                const top = ((p.y + driftY + wobbleY) % 120) - 10;

                // Pulsing opacity
                const pulse = (Math.sin(frame / 40 + p.phaseOffset) + 1) / 2;
                const currentOpacity = p.opacity * (0.7 + pulse * 0.3);

                // Depth-based scaling and blur
                const depthScale = 0.4 + p.depth * 0.6;
                const blurAmount = depthBlur ? (1 - p.depth) * 2 : 0;

                return (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            left: `${left}%`,
                            top: `${top}%`,
                            width: p.size * depthScale,
                            height: p.size * depthScale,
                            backgroundColor: p.color,
                            borderRadius: '50%',
                            opacity: currentOpacity * (0.5 + p.depth * 0.5),
                            filter: glow
                                ? `blur(${blurAmount}px) drop-shadow(0 0 ${4 + p.depth * 4}px ${p.color})`
                                : `blur(${blurAmount}px)`,
                            transform: `scale(${depthScale})`,
                        }}
                    />
                );
            })}
        </div>
    );
};

/**
 * Subtle dust motes for atmospheric effect.
 * Very small, very subtle particles that add life to static scenes.
 */
export const DustMotes: React.FC<{
    count?: number;
    color?: string;
    opacity?: number;
    speed?: number;
}> = ({
    count = 100,
    color = '#ffffff',
    opacity = 0.15,
    speed = 0.5,
}) => {
    const frame = useCurrentFrame();

    const motes = useMemo(() => {
        return Array.from({ length: count }).map((_, i) => ({
            x: random(i * 7) * 100,
            y: random(i * 11) * 100,
            size: 0.5 + random(i * 13) * 1.5,
            speed: (0.2 + random(i * 17) * 0.8) * speed,
            phase: random(i * 19) * Math.PI * 2,
        }));
    }, [count, speed]);

    return (
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
            {motes.map((m, i) => {
                // Very slow drift upward with gentle sway
                const y = (m.y - (frame / 120) * m.speed * 10) % 110;
                const x = m.x + Math.sin(frame / 90 + m.phase) * 5;

                // Twinkling effect
                const twinkle = (Math.sin(frame / 30 + m.phase) + 1) / 2;
                const currentOpacity = opacity * (0.3 + twinkle * 0.7);

                return (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            left: `${x}%`,
                            top: `${y}%`,
                            width: m.size,
                            height: m.size,
                            backgroundColor: color,
                            borderRadius: '50%',
                            opacity: currentOpacity,
                        }}
                    />
                );
            })}
        </div>
    );
};

/**
 * Rising ember/spark particles for dramatic moments.
 */
export const RisingEmbers: React.FC<{
    count?: number;
    colors?: string[];
    intensity?: number;
}> = ({
    count = 30,
    colors = ['#ff6b6b', '#ffa500', '#ffff00'],
    intensity = 1,
}) => {
    const frame = useCurrentFrame();

    const embers = useMemo(() => {
        return Array.from({ length: count }).map((_, i) => ({
            x: random(i * 3) * 100,
            startY: 100 + random(i * 5) * 20,
            size: 1 + random(i * 7) * 3,
            color: colors[Math.floor(random(i * 11) * colors.length)],
            speed: 1 + random(i * 13) * 2,
            sway: 20 + random(i * 17) * 30,
            phase: random(i * 19) * Math.PI * 2,
            lifespan: 60 + random(i * 23) * 120,
        }));
    }, [count, colors]);

    return (
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
            {embers.map((e, i) => {
                // Rising motion
                const age = frame % e.lifespan;
                const progress = age / e.lifespan;
                const y = e.startY - progress * 120;

                // Swaying motion
                const x = e.x + Math.sin(frame / 20 + e.phase) * e.sway * progress;

                // Fade out as it rises
                const fadeOut = interpolate(progress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

                // Size variation (shrinks as it fades)
                const currentSize = e.size * (1 - progress * 0.5);

                return (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            left: `${x}%`,
                            top: `${y}%`,
                            width: currentSize,
                            height: currentSize,
                            backgroundColor: e.color,
                            borderRadius: '50%',
                            opacity: fadeOut * intensity,
                            filter: `blur(0.5px) drop-shadow(0 0 ${3 + currentSize}px ${e.color})`,
                        }}
                    />
                );
            })}
        </div>
    );
};
