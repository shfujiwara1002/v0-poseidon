import React, { useMemo } from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';

export interface CameraKeyframe {
    /** Frame number for this keyframe */
    frame: number;
    /** Scale factor (1 = 100%, 2 = 200% zoom in) */
    scale: number;
    /** X offset in percentage (-50 to 50, 0 = center) */
    x: number;
    /** Y offset in percentage (-50 to 50, 0 = center) */
    y: number;
    /** Rotation in degrees */
    rotation?: number;
    /** Easing function for transition TO this keyframe */
    easing?: (t: number) => number;
}

interface CameraControllerProps {
    children: React.ReactNode;
    /** Array of keyframes defining camera movement */
    keyframes: CameraKeyframe[];
    /** Enable 3D perspective effect */
    perspective?: boolean;
    /** Perspective distance in pixels */
    perspectiveDistance?: number;
    /** Additional transform origin */
    transformOrigin?: string;
}

/**
 * Camera controller that enables smooth zoom, pan, and rotation
 * of its children based on keyframe definitions.
 *
 * Usage:
 * ```tsx
 * <CameraController
 *   keyframes={[
 *     { frame: 0, scale: 0.6, x: 0, y: 0 },           // Start wide
 *     { frame: 60, scale: 1.2, x: 10, y: -15 },      // Zoom to feature
 *     { frame: 120, scale: 1.5, x: -20, y: 20 },     // Pan to another area
 *   ]}
 * >
 *   <YourUIComponent />
 * </CameraController>
 * ```
 */
export const CameraController: React.FC<CameraControllerProps> = ({
    children,
    keyframes,
    perspective = true,
    perspectiveDistance = 1200,
    transformOrigin = 'center center',
}) => {
    const frame = useCurrentFrame();

    // Sort keyframes by frame number
    const sortedKeyframes = useMemo(
        () => [...keyframes].sort((a, b) => a.frame - b.frame),
        [keyframes]
    );

    // Find current and next keyframe
    const { current, next, progress } = useMemo(() => {
        let currentIdx = 0;
        for (let i = 0; i < sortedKeyframes.length - 1; i++) {
            if (frame >= sortedKeyframes[i].frame && frame < sortedKeyframes[i + 1].frame) {
                currentIdx = i;
                break;
            }
            if (frame >= sortedKeyframes[sortedKeyframes.length - 1].frame) {
                currentIdx = sortedKeyframes.length - 1;
            }
        }

        const current = sortedKeyframes[currentIdx];
        const next = sortedKeyframes[Math.min(currentIdx + 1, sortedKeyframes.length - 1)];

        // Calculate progress between keyframes
        let prog = 0;
        if (current !== next) {
            const duration = next.frame - current.frame;
            const elapsed = frame - current.frame;
            prog = Math.max(0, Math.min(1, elapsed / duration));

            // Apply easing if specified on next keyframe
            if (next.easing) {
                prog = next.easing(prog);
            }
        }

        return { current, next, progress: prog };
    }, [frame, sortedKeyframes]);

    // Interpolate camera values
    const scale = interpolate(progress, [0, 1], [current.scale, next.scale]);
    const x = interpolate(progress, [0, 1], [current.x, next.x]);
    const y = interpolate(progress, [0, 1], [current.y, next.y]);
    const rotation = interpolate(
        progress,
        [0, 1],
        [current.rotation ?? 0, next.rotation ?? 0]
    );

    // Convert x/y percentages to transform values
    // Positive x = move content left (camera moves right)
    // Positive y = move content up (camera moves down)
    const translateX = -x;
    const translateY = -y;

    const transform = [
        `scale(${scale})`,
        `translate(${translateX}%, ${translateY}%)`,
        rotation !== 0 ? `rotate(${rotation}deg)` : '',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                overflow: 'hidden',
                perspective: perspective ? perspectiveDistance : undefined,
            }}
        >
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    transform,
                    transformOrigin,
                    willChange: 'transform',
                }}
            >
                {children}
            </div>
        </div>
    );
};

/**
 * Common camera easing presets
 */
export const CameraEasing = {
    /** Smooth ease in-out (default for most movements) */
    smooth: Easing.bezier(0.4, 0, 0.2, 1),
    /** Quick start, slow end (good for zoom in) */
    zoomIn: Easing.bezier(0.16, 1, 0.3, 1),
    /** Slow start, quick end (good for zoom out) */
    zoomOut: Easing.bezier(0.7, 0, 0.84, 0),
    /** Dramatic slow motion */
    dramatic: Easing.bezier(0.22, 1, 0.36, 1),
    /** Snappy movement */
    snappy: Easing.bezier(0.34, 1.56, 0.64, 1),
    /** Linear (constant speed) */
    linear: (t: number) => t,
};

/**
 * Helper to create Ken Burns effect keyframes
 */
export const createKenBurnsKeyframes = (
    startFrame: number,
    endFrame: number,
    options?: {
        startScale?: number;
        endScale?: number;
        panDirection?: 'left' | 'right' | 'up' | 'down' | 'diagonal';
        panAmount?: number;
    }
): CameraKeyframe[] => {
    const {
        startScale = 1,
        endScale = 1.15,
        panDirection = 'right',
        panAmount = 10,
    } = options ?? {};

    let startX = 0, startY = 0, endX = 0, endY = 0;

    switch (panDirection) {
        case 'left':
            startX = panAmount;
            endX = -panAmount;
            break;
        case 'right':
            startX = -panAmount;
            endX = panAmount;
            break;
        case 'up':
            startY = panAmount;
            endY = -panAmount;
            break;
        case 'down':
            startY = -panAmount;
            endY = panAmount;
            break;
        case 'diagonal':
            startX = -panAmount;
            startY = -panAmount;
            endX = panAmount;
            endY = panAmount;
            break;
    }

    return [
        { frame: startFrame, scale: startScale, x: startX, y: startY },
        { frame: endFrame, scale: endScale, x: endX, y: endY, easing: CameraEasing.smooth },
    ];
};

/**
 * Helper to create zoom-to-feature keyframes
 */
export const createZoomToFeatureKeyframes = (
    startFrame: number,
    holdFrame: number,
    endFrame: number,
    targetX: number,
    targetY: number,
    zoomScale: number = 1.5,
    options?: {
        startScale?: number;
        endScale?: number;
    }
): CameraKeyframe[] => {
    const { startScale = 0.8, endScale = 0.8 } = options ?? {};

    return [
        { frame: startFrame, scale: startScale, x: 0, y: 0 },
        { frame: holdFrame, scale: zoomScale, x: targetX, y: targetY, easing: CameraEasing.zoomIn },
        { frame: endFrame, scale: endScale, x: 0, y: 0, easing: CameraEasing.zoomOut },
    ];
};
