import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

interface DepthOfFieldProps {
    children: React.ReactNode;
    /** Focus distance from camera (0 = closest, 1 = furthest) */
    focusDepth?: number;
    /** Blur amount for out-of-focus areas */
    blurAmount?: number;
    /** Enable reactive focus based on zoom */
    reactiveToZoom?: boolean;
    /** Current camera scale (for reactive mode) */
    cameraScale?: number;
}

/**
 * Reactive Depth of Field effect.
 * Creates cinematic blur on out-of-focus layers based on camera zoom.
 */
export const DepthOfField: React.FC<DepthOfFieldProps> = ({
    children,
    blurAmount = 12,
    reactiveToZoom = true,
    cameraScale = 1,
}) => {
    const effectiveBlur = reactiveToZoom
        ? blurAmount * Math.max(0, (cameraScale - 1) * 1.5)
        : blurAmount;

    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                filter: effectiveBlur > 0.5 ? `blur(${effectiveBlur}px)` : 'none',
                transition: 'filter 0.1s ease-out',
            }}
        >
            {children}
        </div>
    );
};

interface DepthLayerProps {
    children: React.ReactNode;
    /** Depth of this layer (0 = front, 1 = back) */
    depth: number;
    /** Current focus depth from parent */
    focusDepth?: number;
    /** Maximum blur amount */
    maxBlur?: number;
    /** Whether this layer is currently in focus */
    inFocus?: boolean;
    /** Delay before focus transition */
    focusDelay?: number;
}

/**
 * Individual depth layer that blurs based on distance from focus plane.
 */
export const DepthLayer: React.FC<DepthLayerProps> = ({
    children,
    depth,
    focusDepth = 0.5,
    maxBlur = 15,
    inFocus = false,
    focusDelay = 0,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Calculate distance from focus plane
    const distanceFromFocus = Math.abs(depth - focusDepth);

    // Animate blur transition
    const targetBlur = inFocus ? 0 : distanceFromFocus * maxBlur;
    const blurTransition = spring({
        frame: frame - focusDelay,
        fps,
        config: { damping: 15, stiffness: 80 },
    });

    const currentBlur = interpolate(blurTransition, [0, 1], [maxBlur * 0.5, targetBlur]);

    // Scale slightly based on depth for parallax effect
    const depthScale = 1 + (depth - 0.5) * 0.05;

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                filter: currentBlur > 0.5 ? `blur(${currentBlur}px)` : 'none',
                transform: `scale(${depthScale})`,
                transformOrigin: 'center center',
                transition: 'filter 0.1s ease-out',
            }}
        >
            {children}
        </div>
    );
};

interface FocusTransitionProps {
    children: React.ReactNode;
    /** When to start the focus transition (frame number) */
    focusAt: number;
    /** Duration of focus pull */
    duration?: number;
    /** Blur before focus */
    blurBefore?: number;
    /** Blur after focus */
    blurAfter?: number;
    /** Optional scale change during focus */
    scaleOnFocus?: number;
}

/**
 * Focus pull/rack focus effect.
 * Transitions from blurred to sharp (or vice versa) at a specific frame.
 */
export const FocusTransition: React.FC<FocusTransitionProps> = ({
    children,
    focusAt,
    duration: _duration = 20,
    blurBefore = 12,
    blurAfter = 0,
    scaleOnFocus = 1,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Focus transition progress
    const focusProgress = spring({
        frame: frame - focusAt,
        fps,
        config: { damping: 12, stiffness: 100 },
    });

    const blur = interpolate(focusProgress, [0, 1], [blurBefore, blurAfter]);
    const scale = interpolate(focusProgress, [0, 1], [1, scaleOnFocus]);

    // Brightness boost when coming into focus
    const brightness = interpolate(focusProgress, [0, 0.5, 1], [0.9, 1.1, 1]);

    return (
        <div
            style={{
                filter: blur > 0.5 ? `blur(${blur}px) brightness(${brightness})` : `brightness(${brightness})`,
                transform: `scale(${scale})`,
                transformOrigin: 'center center',
                willChange: 'filter, transform',
            }}
        >
            {children}
        </div>
    );
};

interface CinematicFocusProps {
    children: React.ReactNode;
    /** Target element ID or coordinates to focus on */
    focusTarget?: { x: number; y: number };
    /** Radius of the focus area */
    focusRadius?: number;
    /** Blur amount for unfocused areas */
    blurAmount?: number;
    /** Feather amount for the focus edge */
    feather?: number;
    /** Delay before focus effect starts */
    delay?: number;
    /** Enable vignette effect */
    vignette?: boolean;
}

/**
 * Cinematic focus effect with radial blur gradient.
 * Creates a natural depth-of-field look centered on a target.
 */
export const CinematicFocus: React.FC<CinematicFocusProps> = ({
    children,
    focusTarget = { x: 50, y: 50 },
    focusRadius = 300,
    blurAmount = 8,
    feather = 150,
    delay = 0,
    vignette = true,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const reveal = spring({
        frame: frame - delay,
        fps,
        config: { damping: 15, stiffness: 80 },
    });

    const effectiveBlur = blurAmount * reveal;
    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            {/* Sharp layer (visible through mask) */}
            <div style={{ position: 'absolute', inset: 0 }}>
                {children}
            </div>

            {/* Blurred layer with mask */}
            {effectiveBlur > 0.5 && (
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        filter: `blur(${effectiveBlur}px)`,
                        maskImage: `radial-gradient(circle at ${focusTarget.x}% ${focusTarget.y}%, transparent ${focusRadius - feather}px, black ${focusRadius + feather}px)`,
                        WebkitMaskImage: `radial-gradient(circle at ${focusTarget.x}% ${focusTarget.y}%, transparent ${focusRadius - feather}px, black ${focusRadius + feather}px)`,
                        pointerEvents: 'none',
                    }}
                >
                    {children}
                </div>
            )}

            {/* Vignette overlay */}
            {vignette && (
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: `radial-gradient(circle at ${focusTarget.x}% ${focusTarget.y}%, transparent 30%, rgba(0,0,0,${0.4 * reveal}) 100%)`,
                        pointerEvents: 'none',
                    }}
                />
            )}
        </div>
    );
};

interface TiltShiftProps {
    children: React.ReactNode;
    /** Position of the focus strip (0-100, vertical %) */
    focusPosition?: number;
    /** Height of the focus strip in pixels */
    focusHeight?: number;
    /** Blur amount for out-of-focus areas */
    blurAmount?: number;
    /** Feather amount */
    feather?: number;
    /** Angle of the tilt-shift effect */
    angle?: number;
}

/**
 * Tilt-shift miniature effect.
 * Creates a horizontal strip of focus with blurred top and bottom.
 */
export const TiltShift: React.FC<TiltShiftProps> = ({
    children,
    focusPosition = 50,
    focusHeight = 200,
    blurAmount = 10,
    feather = 100,
    angle = 0,
}) => {
    const frame = useCurrentFrame();

    // Subtle animation of the focus strip
    const drift = Math.sin(frame / 120) * 2;

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            {/* Sharp layer */}
            <div style={{ position: 'absolute', inset: 0 }}>
                {children}
            </div>

            {/* Blurred layer with linear gradient mask */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    filter: `blur(${blurAmount}px)`,
                    maskImage: `linear-gradient(${angle}deg,
                        black 0%,
                        black ${focusPosition - focusHeight / 2 - feather + drift}%,
                        transparent ${focusPosition - focusHeight / 2 + drift}%,
                        transparent ${focusPosition + focusHeight / 2 + drift}%,
                        black ${focusPosition + focusHeight / 2 + feather + drift}%,
                        black 100%
                    )`,
                    WebkitMaskImage: `linear-gradient(${angle}deg,
                        black 0%,
                        black ${focusPosition - focusHeight / 2 - feather + drift}%,
                        transparent ${focusPosition - focusHeight / 2 + drift}%,
                        transparent ${focusPosition + focusHeight / 2 + drift}%,
                        black ${focusPosition + focusHeight / 2 + feather + drift}%,
                        black 100%
                    )`,
                    pointerEvents: 'none',
                }}
            >
                {children}
            </div>
        </div>
    );
};
