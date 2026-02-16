import React, { useMemo } from 'react';
import { random, useCurrentFrame } from 'remotion';
import { theme } from '../theme';

interface ParticleFieldProps {
    count?: number;
    colors?: string[];
    drift?: { x: number; y: number };
    glow?: boolean;
    depth?: boolean;
}

/**
 * High-end procedural particle field with drift and depth-of-field simulation.
 */
export const ParticleField: React.FC<ParticleFieldProps> = ({
    count = 80,
    colors = [theme.accent.cyan, theme.accent.violet, '#ffffff'],
    drift = { x: 50, y: 30 },
    glow = true,
    depth = true,
}) => {
    const frame = useCurrentFrame();

    const particles = useMemo(() => {
        return Array.from({ length: count }).map((_, i) => ({
            x: random(i * 13) * 100,
            y: random(i * 17) * 100,
            size: 1 + random(i * 19) * (depth ? 4 : 2),
            color: colors[Math.floor(random(i * 23) * colors.length)],
            speed: 0.5 + random(i * 29) * 1.5,
            opacity: 0.1 + random(i * 31) * 0.4,
            depthFactor: depth ? 0.2 + random(i * 37) * 0.8 : 1,
        }));
    }, [count, colors, depth]);

    return (
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
            {particles.map((p, i) => {
                // Calculate drift based on speed and depth
                const moveX = (drift.x * (frame / 60)) * p.speed * p.depthFactor;
                const moveY = (drift.y * (frame / 60)) * p.speed * p.depthFactor;

                // Wrap around logic (simplified for absolute positioning)
                const left = (p.x + moveX) % 110 - 5;
                const top = (p.y + moveY) % 110 - 5;

                // Pulsing opacity
                const pulse = (Math.sin(frame / 30 + i) + 1) / 2;
                const currentOpacity = p.opacity * (0.8 + pulse * 0.2);

                return (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            left: `${left}%`,
                            top: `${top}%`,
                            width: p.size,
                            height: p.size,
                            backgroundColor: p.color,
                            borderRadius: '50%',
                            opacity: currentOpacity,
                            filter: glow && p.depthFactor > 0.6 ? `blur(${1 / p.depthFactor}px) drop-shadow(0 0 8px ${p.color})` : depth ? `blur(${2 * (1 - p.depthFactor)}px)` : undefined,
                            transform: `scale(${p.depthFactor})`,
                        }}
                    />
                );
            })}
        </div>
    );
};
