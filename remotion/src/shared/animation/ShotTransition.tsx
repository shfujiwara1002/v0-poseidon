import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';

type TransitionType = 'fade' | 'zoom-through' | 'push' | 'morph' | 'flash' | 'blur-zoom';

interface TransitionState {
    scale: number;
    opacity: number;
    blur: number;
    translateZ: number;
    rotateX?: number;
    flash?: number;
}

interface ShotTransitionProps {
    children: React.ReactNode;
    /** Duration of the shot in frames */
    durationInFrames: number;
    /** Transition type for entering */
    enterType?: TransitionType;
    /** Transition type for exiting */
    exitType?: TransitionType;
    /** Duration of enter transition in frames (default: 12) */
    enterDuration?: number;
    /** Duration of exit transition in frames (default: 12) */
    exitDuration?: number;
    /** Custom easing for transitions */
    easing?: (t: number) => number;
}

/**
 * Wrapper component that applies cinematic transitions to shots.
 * Supports multiple Apple-style transition types.
 */
export const ShotTransition: React.FC<ShotTransitionProps> = ({
    children,
    durationInFrames,
    enterType = 'fade',
    exitType = 'fade',
    enterDuration = 12,
    exitDuration = 12,
    easing = Easing.bezier(0.4, 0, 0.2, 1),
}) => {
    const frame = useCurrentFrame();

    // Calculate transition progress
    const enterProgress = interpolate(
        frame,
        [0, enterDuration],
        [0, 1],
        { extrapolateRight: 'clamp', easing }
    );

    const exitProgress = interpolate(
        frame,
        [durationInFrames - exitDuration, durationInFrames],
        [0, 1],
        { extrapolateLeft: 'clamp', easing }
    );

    // Get transform and opacity based on transition type
    const getEnterTransform = (type: TransitionType, progress: number): TransitionState => {
        switch (type) {
            case 'zoom-through':
                return {
                    scale: interpolate(progress, [0, 1], [0.7, 1]),
                    opacity: interpolate(progress, [0, 0.4, 1], [0, 1, 1]),
                    blur: interpolate(progress, [0, 0.5, 1], [15, 5, 0]),
                    translateZ: interpolate(progress, [0, 1], [-200, 0]),
                };
            case 'push':
                return {
                    scale: interpolate(progress, [0, 1], [1.1, 1]),
                    opacity: interpolate(progress, [0, 0.3, 1], [0, 1, 1]),
                    blur: interpolate(progress, [0, 0.6, 1], [8, 2, 0]),
                    translateZ: interpolate(progress, [0, 1], [100, 0]),
                    rotateX: interpolate(progress, [0, 1], [-5, 0]),
                };
            case 'morph':
                return {
                    scale: interpolate(progress, [0, 1], [0.9, 1]),
                    opacity: interpolate(progress, [0, 0.5, 1], [0, 0.8, 1]),
                    blur: interpolate(progress, [0, 1], [5, 0]),
                    translateZ: 0,
                };
            case 'flash':
                return {
                    scale: 1,
                    opacity: 1,
                    blur: 0,
                    translateZ: 0,
                    flash: interpolate(progress, [0, 0.15, 0.4, 1], [1, 1, 0, 0]),
                };
            case 'blur-zoom':
                return {
                    scale: interpolate(progress, [0, 1], [1.2, 1]),
                    opacity: interpolate(progress, [0, 0.3, 1], [0, 1, 1]),
                    blur: interpolate(progress, [0, 1], [20, 0]),
                    translateZ: 0,
                };
            case 'fade':
            default:
                return {
                    scale: 1,
                    opacity: progress,
                    blur: interpolate(progress, [0, 1], [3, 0]),
                    translateZ: 0,
                };
        }
    };

    const getExitTransform = (type: TransitionType, progress: number): TransitionState => {
        switch (type) {
            case 'zoom-through':
                return {
                    scale: interpolate(progress, [0, 1], [1, 1.3]),
                    opacity: interpolate(progress, [0, 0.6, 1], [1, 1, 0]),
                    blur: interpolate(progress, [0, 0.5, 1], [0, 5, 15]),
                    translateZ: interpolate(progress, [0, 1], [0, 200]),
                };
            case 'push':
                return {
                    scale: interpolate(progress, [0, 1], [1, 0.9]),
                    opacity: interpolate(progress, [0, 0.7, 1], [1, 1, 0]),
                    blur: interpolate(progress, [0, 0.4, 1], [0, 2, 8]),
                    translateZ: interpolate(progress, [0, 1], [0, -100]),
                    rotateX: interpolate(progress, [0, 1], [0, 5]),
                };
            case 'morph':
                return {
                    scale: interpolate(progress, [0, 1], [1, 1.1]),
                    opacity: interpolate(progress, [0, 0.5, 1], [1, 0.8, 0]),
                    blur: interpolate(progress, [0, 1], [0, 5]),
                    translateZ: 0,
                };
            case 'flash':
                return {
                    scale: 1,
                    opacity: 1,
                    blur: 0,
                    translateZ: 0,
                    flash: interpolate(progress, [0, 0.6, 0.85, 1], [0, 0, 1, 1]),
                };
            case 'blur-zoom':
                return {
                    scale: interpolate(progress, [0, 1], [1, 0.8]),
                    opacity: interpolate(progress, [0, 0.7, 1], [1, 1, 0]),
                    blur: interpolate(progress, [0, 1], [0, 20]),
                    translateZ: 0,
                };
            case 'fade':
            default:
                return {
                    scale: 1,
                    opacity: 1 - progress,
                    blur: interpolate(progress, [0, 1], [0, 3]),
                    translateZ: 0,
                };
        }
    };

    const enter = getEnterTransform(enterType, enterProgress);
    const exit = getExitTransform(exitType, exitProgress);

    // Combine enter and exit transforms
    const isEntering = frame < enterDuration;
    const isExiting = frame > durationInFrames - exitDuration;

    let finalOpacity = 1;
    let finalScale = 1;
    let finalBlur = 0;
    let finalTranslateZ = 0;
    let finalRotateX = 0;
    let flashOpacity = 0;

    if (isEntering) {
        finalOpacity = enter.opacity;
        finalScale = enter.scale;
        finalBlur = enter.blur;
        finalTranslateZ = enter.translateZ;
        finalRotateX = enter.rotateX ?? 0;
        flashOpacity = enter.flash ?? 0;
    } else if (isExiting) {
        finalOpacity = exit.opacity;
        finalScale = exit.scale;
        finalBlur = exit.blur;
        finalTranslateZ = exit.translateZ;
        finalRotateX = exit.rotateX ?? 0;
        flashOpacity = exit.flash ?? 0;
    }

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                position: 'relative',
            }}
        >
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    opacity: finalOpacity,
                    filter: `blur(${finalBlur}px)`,
                    transform: `perspective(1200px) translateZ(${finalTranslateZ}px) rotateX(${finalRotateX}deg) scale(${finalScale})`,
                    transformOrigin: 'center center',
                }}
            >
                {children}
            </div>

            {/* Flash overlay */}
            {flashOpacity > 0 && (
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: '#ffffff',
                        opacity: flashOpacity,
                        pointerEvents: 'none',
                    }}
                />
            )}
        </div>
    );
};

/**
 * Flash transition overlay - can be used independently
 */
export const FlashTransition: React.FC<{
    /** Trigger frame */
    at: number;
    /** Duration in frames */
    duration?: number;
    /** Flash color */
    color?: string;
    /** Intensity 0-1 */
    intensity?: number;
}> = ({ at, duration = 10, color = '#ffffff', intensity = 1 }) => {
    const frame = useCurrentFrame();

    const progress = interpolate(
        frame,
        [at, at + duration * 0.3, at + duration],
        [0, 1, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    if (progress === 0) return null;

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: color,
                opacity: progress * intensity,
                pointerEvents: 'none',
                zIndex: 1000,
            }}
        />
    );
};

/**
 * Zoom-through transition that can wrap content
 */
export const ZoomThrough: React.FC<{
    children: React.ReactNode;
    direction: 'in' | 'out';
    progress: number;
}> = ({ children, direction, progress }) => {
    const scale = direction === 'in'
        ? interpolate(progress, [0, 1], [0.7, 1])
        : interpolate(progress, [0, 1], [1, 1.3]);

    const opacity = direction === 'in'
        ? interpolate(progress, [0, 0.4, 1], [0, 1, 1])
        : interpolate(progress, [0, 0.6, 1], [1, 1, 0]);

    const blur = direction === 'in'
        ? interpolate(progress, [0, 0.5, 1], [15, 5, 0])
        : interpolate(progress, [0, 0.5, 1], [0, 5, 15]);

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                opacity,
                filter: `blur(${blur}px)`,
                transform: `scale(${scale})`,
                transformOrigin: 'center center',
            }}
        >
            {children}
        </div>
    );
};
