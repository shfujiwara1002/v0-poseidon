import React from 'react';
import { useCurrentFrame } from 'remotion';

interface GlowPulseProps {
    children: React.ReactNode;
    color?: string;
    intensity?: number;
    frequency?: number; // Hz (approx)
    style?: React.CSSProperties;
}

/**
 * Higher-order component that wraps children with a rhythmic glowing bloom.
 */
export const GlowPulse: React.FC<GlowPulseProps> = ({
    children,
    color = '#00f0ff',
    intensity = 1,
    frequency = 30, // Default pulse logic uses frame / 30
    style,
}) => {
    const frame = useCurrentFrame();

    // Oscillate between 0.4 and 1.2
    const pulse = 0.8 + Math.sin(frame / frequency) * 0.4 * intensity;

    return (
        <div
            style={{
                display: 'inline-block',
                filter: `drop-shadow(0 0 ${20 * pulse}px ${color}${Math.round(60 * pulse).toString(16).padStart(2, '0')})`,
                ...style,
            }}
        >
            {children}
        </div>
    );
};
