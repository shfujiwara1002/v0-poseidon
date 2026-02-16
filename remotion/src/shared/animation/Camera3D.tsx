import React from 'react';
import { useCurrentFrame } from 'remotion';

interface Camera3DProps {
    children: React.ReactNode;
    perspective?: number;
    driftX?: number;
    driftY?: number;
    rotateScale?: number;
    style?: React.CSSProperties;
}

/**
 * 3D Camera wrapper for creating depth and parallax effects.
 * Adds a subtle, cinematic procedural drift to all children.
 */
export const Camera3D: React.FC<Camera3DProps> = ({
    children,
    perspective = 1000,
    driftX = 20,
    driftY = 15,
    rotateScale = 1,
    style,
}) => {
    const frame = useCurrentFrame();

    // Procedural camera drift (cinematic handheld feel)
    const tx = Math.sin(frame / 45) * driftX;
    const ty = Math.cos(frame / 60) * driftY;
    const rx = Math.sin(frame / 90) * 2 * rotateScale;
    const ry = Math.cos(frame / 75) * 3 * rotateScale;

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                perspective: `${perspective}px`,
                perspectiveOrigin: '50% 50%',
                overflow: 'visible',
                ...style,
            }}
        >
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    transformStyle: 'preserve-3d',
                    transform: `translate3d(${tx}px, ${ty}px, 0) rotateX(${rx}deg) rotateY(${ry}deg)`,
                }}
            >
                {children}
            </div>
        </div>
    );
};

interface ParallaxLayerProps {
    children: React.ReactNode;
    depth: number; // Positive = further back, Negative = closer
    style?: React.CSSProperties;
}

/**
 * Helper component for Camera3D to position elements at different Z-depths.
 */
export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({ children, depth, style }) => {
    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                transform: `translateZ(${depth}px)`,
                transformStyle: 'preserve-3d',
                pointerEvents: 'none',
                ...style,
            }}
        >
            {children}
        </div>
    );
};
