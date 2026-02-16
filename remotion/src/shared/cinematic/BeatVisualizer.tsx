import React, { useMemo } from 'react';
import { useCurrentFrame, interpolate, useVideoConfig, random } from 'remotion';
import { theme } from '../theme';

interface BeatSyncedGridProps {
    /** Grid cell size */
    cellSize?: number;
    /** Grid color */
    color?: string;
    /** Base opacity */
    baseOpacity?: number;
    /** Pulse intensity on beat */
    pulseIntensity?: number;
    /** BPM for sync */
    bpm?: number;
    /** Enable 3D perspective */
    perspective?: boolean;
}

/**
 * Grid that pulses in sync with the music beat.
 * Creates a rhythmic foundation for the video.
 */
export const BeatSyncedGrid: React.FC<BeatSyncedGridProps> = ({
    cellSize = 60,
    color = theme.accent.cyan,
    baseOpacity = 0.1,
    pulseIntensity = 0.3,
    bpm = 120,
    perspective = true,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Calculate beat pulse
    const framesPerBeat = (60 / bpm) * fps;
    const beatPhase = (frame % framesPerBeat) / framesPerBeat;

    // Sharp attack, smooth decay
    const pulse = Math.pow(1 - beatPhase, 3);

    const currentOpacity = baseOpacity + pulse * pulseIntensity;

    // Grid pattern as SVG
    const gridId = useMemo(() => `beat-grid-${Math.random().toString(36).substr(2, 9)}`, []);

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                overflow: 'hidden',
                opacity: currentOpacity,
                transform: perspective ? 'perspective(1000px) rotateX(60deg)' : undefined,
                transformOrigin: 'center bottom',
            }}
        >
            <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
                <defs>
                    <pattern
                        id={gridId}
                        width={cellSize}
                        height={cellSize}
                        patternUnits="userSpaceOnUse"
                    >
                        <path
                            d={`M ${cellSize} 0 L 0 0 0 ${cellSize}`}
                            fill="none"
                            stroke={color}
                            strokeWidth={1 + pulse * 1.5}
                            strokeOpacity={0.4 + pulse * 0.6}
                        />
                    </pattern>
                </defs>
                <rect width="100%" height="200%" fill={`url(#${gridId})`} />
            </svg>

            {/* Glow overlay on beat */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: `radial-gradient(ellipse at 50% 100%, ${color}${Math.floor(pulse * 30).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
                }}
            />
        </div>
    );
};

interface BeatSyncedBorderProps {
    children: React.ReactNode;
    /** Border color */
    color?: string;
    /** Base border width */
    baseWidth?: number;
    /** Pulse width increase */
    pulseWidth?: number;
    /** Border radius */
    borderRadius?: number;
    /** Glow on beat */
    glow?: boolean;
    /** BPM */
    bpm?: number;
}

/**
 * Border that pulses with the beat.
 */
export const BeatSyncedBorder: React.FC<BeatSyncedBorderProps> = ({
    children,
    color = theme.accent.cyan,
    baseWidth = 1,
    pulseWidth = 2,
    borderRadius = 12,
    glow = true,
    bpm = 120,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const framesPerBeat = (60 / bpm) * fps;
    const beatPhase = (frame % framesPerBeat) / framesPerBeat;
    const pulse = Math.pow(1 - beatPhase, 4);

    const currentWidth = baseWidth + pulse * pulseWidth;
    const glowIntensity = pulse * 20;

    return (
        <div
            style={{
                position: 'relative',
                borderRadius,
                border: `${currentWidth}px solid ${color}`,
                boxShadow: glow ? `0 0 ${glowIntensity}px ${color}66, inset 0 0 ${glowIntensity * 0.5}px ${color}33` : undefined,
                transition: 'border-width 0.05s ease-out',
            }}
        >
            {children}
        </div>
    );
};

interface PulsingElementProps {
    children: React.ReactNode;
    /** Pulse scale range */
    scaleRange?: [number, number];
    /** BPM */
    bpm?: number;
    /** Pulse on every N beats */
    beatDivision?: number;
    /** Add glow effect */
    glow?: boolean;
    /** Glow color */
    glowColor?: string;
}

/**
 * Element that scales/pulses with the beat.
 */
export const PulsingElement: React.FC<PulsingElementProps> = ({
    children,
    scaleRange = [1, 1.05],
    bpm = 120,
    beatDivision = 1,
    glow = false,
    glowColor = theme.accent.cyan,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const framesPerBeat = (60 / bpm) * fps * beatDivision;
    const beatPhase = (frame % framesPerBeat) / framesPerBeat;
    const pulse = Math.pow(1 - beatPhase, 3);

    const scale = interpolate(pulse, [0, 1], scaleRange);
    const glowIntensity = pulse * 15;

    return (
        <div
            style={{
                transform: `scale(${scale})`,
                filter: glow ? `drop-shadow(0 0 ${glowIntensity}px ${glowColor})` : undefined,
                transition: 'transform 0.05s ease-out',
            }}
        >
            {children}
        </div>
    );
};

interface BeatWaveformProps {
    /** Number of bars */
    bars?: number;
    /** Bar color */
    color?: string;
    /** Max bar height */
    maxHeight?: number;
    /** Bar width */
    barWidth?: number;
    /** Gap between bars */
    gap?: number;
    /** BPM */
    bpm?: number;
}

/**
 * Audio waveform visualization that syncs with the beat.
 */
export const BeatWaveform: React.FC<BeatWaveformProps> = ({
    bars = 32,
    color = theme.accent.cyan,
    maxHeight = 60,
    barWidth = 4,
    gap = 2,
    bpm = 120,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const framesPerBeat = (60 / bpm) * fps;
    const beatPhase = (frame % framesPerBeat) / framesPerBeat;
    const pulse = Math.pow(1 - beatPhase, 2);

    // Generate bar heights with randomness + beat influence
    const barHeights = useMemo(() => {
        return Array.from({ length: bars }, (_, i) => {
            const baseHeight = random(`waveform-${i}`) * 0.6 + 0.2;
            return baseHeight;
        });
    }, [bars]);

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                gap,
                height: maxHeight,
            }}
        >
            {barHeights.map((baseHeight, i) => {
                // Add beat influence with position-based phase shift
                const phaseShift = i / bars;
                const adjustedPhase = ((frame / framesPerBeat) + phaseShift) % 1;
                const localPulse = Math.pow(1 - adjustedPhase, 3);

                const height = baseHeight * maxHeight * (0.3 + localPulse * 0.7 + pulse * 0.3);

                return (
                    <div
                        key={i}
                        style={{
                            width: barWidth,
                            height,
                            backgroundColor: color,
                            borderRadius: barWidth / 2,
                            boxShadow: `0 0 ${localPulse * 10}px ${color}`,
                            transition: 'height 0.05s ease-out',
                        }}
                    />
                );
            })}
        </div>
    );
};

interface BeatRippleProps {
    /** Center X position (%) */
    x?: number;
    /** Center Y position (%) */
    y?: number;
    /** Ripple color */
    color?: string;
    /** Max ripple size */
    maxSize?: number;
    /** BPM */
    bpm?: number;
    /** Number of concurrent ripples */
    layers?: number;
}

/**
 * Ripple effect that emanates from a point on each beat.
 */
export const BeatRipple: React.FC<BeatRippleProps> = ({
    x = 50,
    y = 50,
    color = theme.accent.cyan,
    maxSize = 500,
    bpm = 120,
    layers = 3,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const framesPerBeat = (60 / bpm) * fps;

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                overflow: 'hidden',
            }}
        >
            {Array.from({ length: layers }, (_, i) => {
                // Offset each layer by a fraction of the beat
                const offset = i * (framesPerBeat / layers);
                const layerPhase = ((frame + offset) % framesPerBeat) / framesPerBeat;

                const size = layerPhase * maxSize;
                const opacity = (1 - layerPhase) * 0.3;

                return (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            left: `${x}%`,
                            top: `${y}%`,
                            width: size,
                            height: size,
                            borderRadius: '50%',
                            border: `2px solid ${color}`,
                            opacity,
                            transform: 'translate(-50%, -50%)',
                        }}
                    />
                );
            })}
        </div>
    );
};

interface BeatFlashProps {
    /** Flash color */
    color?: string;
    /** Flash intensity */
    intensity?: number;
    /** BPM */
    bpm?: number;
    /** Flash on every N beats */
    beatDivision?: number;
}

/**
 * Subtle flash overlay on the beat.
 */
export const BeatFlash: React.FC<BeatFlashProps> = ({
    color = '#ffffff',
    intensity = 0.1,
    bpm = 120,
    beatDivision = 4,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const framesPerBeat = (60 / bpm) * fps * beatDivision;
    const beatPhase = (frame % framesPerBeat) / framesPerBeat;

    // Very sharp attack
    const flash = beatPhase < 0.1 ? Math.pow(1 - beatPhase / 0.1, 2) : 0;

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: color,
                opacity: flash * intensity,
                pointerEvents: 'none',
            }}
        />
    );
};
