import React from 'react';
import { Audio, staticFile, Sequence } from 'remotion';

/**
 * SFX Types for different UI interactions
 */
export type SFXType =
    | 'zoom-in'      // Camera zooming in
    | 'zoom-out'     // Camera zooming out
    | 'whoosh'       // Fast transition
    | 'pop'          // Card/element appearing
    | 'click'        // Button interaction
    | 'slide'        // Sliding animation
    | 'reveal'       // Information reveal
    | 'success'      // Positive action
    | 'alert'        // Warning/attention
    | 'hit'          // Impact/emphasis
    | 'sparkle';     // Magical/highlight effect

/**
 * SFX configuration for each type
 */
interface SFXConfig {
    file: string;
    volume: number;
    playbackRate?: number;
}

const SFX_LIBRARY: Record<SFXType, SFXConfig> = {
    'zoom-in': { file: 'audio/whoosh.wav', volume: 0.5, playbackRate: 1.2 },
    'zoom-out': { file: 'audio/whoosh.wav', volume: 0.4, playbackRate: 0.8 },
    'whoosh': { file: 'audio/whoosh.wav', volume: 0.6 },
    'pop': { file: 'audio/hit.ogg', volume: 0.4, playbackRate: 1.3 },
    'click': { file: 'audio/hit.ogg', volume: 0.3, playbackRate: 1.5 },
    'slide': { file: 'audio/whoosh.wav', volume: 0.3, playbackRate: 1.1 },
    'reveal': { file: 'audio/whoosh.wav', volume: 0.35, playbackRate: 0.9 },
    'success': { file: 'audio/hit.ogg', volume: 0.5 },
    'alert': { file: 'audio/hit.ogg', volume: 0.6, playbackRate: 0.7 },
    'hit': { file: 'audio/hit.ogg', volume: 0.7 },
    'sparkle': { file: 'audio/hit.ogg', volume: 0.25, playbackRate: 1.8 },
};

interface HapticSFXProps {
    /** Type of sound effect */
    type: SFXType;
    /** Frame at which to play the sound */
    at: number;
    /** Duration of the audio clip in frames */
    duration?: number;
    /** Volume override (0-1) */
    volume?: number;
    /** Enable the sound */
    enabled?: boolean;
}

/**
 * Frame-synchronized haptic sound effect.
 * Plays a UI sound at a specific frame for precise audio-visual sync.
 */
export const HapticSFX: React.FC<HapticSFXProps> = ({
    type,
    at,
    duration = 30,
    volume,
    enabled = true,
}) => {
    const config = SFX_LIBRARY[type];
    const effectiveVolume = volume ?? config.volume;

    if (!enabled) return null;

    return (
        <Sequence from={at} durationInFrames={duration}>
            <Audio
                src={staticFile(config.file)}
                volume={effectiveVolume}
                playbackRate={config.playbackRate ?? 1}
            />
        </Sequence>
    );
};

interface SFXSequenceEvent {
    type: SFXType;
    at: number;
    volume?: number;
}

interface SFXSequenceProps {
    /** Array of sound events */
    events: SFXSequenceEvent[];
    /** Enable all sounds */
    enabled?: boolean;
    /** Global volume multiplier */
    globalVolume?: number;
}

/**
 * Sequence multiple sound effects together.
 */
export const SFXSequence: React.FC<SFXSequenceProps> = ({
    events,
    enabled = true,
    globalVolume = 1,
}) => {
    if (!enabled) return null;

    return (
        <>
            {events.map((event, i) => (
                <HapticSFX
                    key={`${event.type}-${event.at}-${i}`}
                    type={event.type}
                    at={event.at}
                    volume={(event.volume ?? SFX_LIBRARY[event.type].volume) * globalVolume}
                    enabled={enabled}
                />
            ))}
        </>
    );
};

/**
 * Helper to create SFX events for common patterns
 */
export const createSFXEvents = {
    /**
     * Create zoom sequence with appropriate sounds
     */
    zoomSequence: (startFrame: number, zoomInDuration: number, holdDuration: number): SFXSequenceEvent[] => [
        { type: 'zoom-in', at: startFrame },
        { type: 'reveal', at: startFrame + Math.floor(zoomInDuration * 0.5) },
        { type: 'zoom-out', at: startFrame + zoomInDuration + holdDuration },
    ],

    /**
     * Create card reveal sequence
     */
    cardReveal: (startFrame: number, count: number, stagger: number = 8): SFXSequenceEvent[] =>
        Array.from({ length: count }, (_, i) => ({
            type: 'pop' as SFXType,
            at: startFrame + i * stagger,
            volume: 0.3 - i * 0.03, // Decreasing volume for staggered items
        })),

    /**
     * Create transition sound
     */
    transition: (frame: number, intensity: 'soft' | 'medium' | 'hard' = 'medium'): SFXSequenceEvent[] => {
        const volumes = { soft: 0.3, medium: 0.5, hard: 0.7 };
        return [
            { type: 'whoosh', at: frame, volume: volumes[intensity] },
            { type: 'hit', at: frame + 5, volume: volumes[intensity] * 0.5 },
        ];
    },

    /**
     * Create highlight/attention sound
     */
    highlight: (frame: number): SFXSequenceEvent[] => [
        { type: 'sparkle', at: frame },
        { type: 'reveal', at: frame + 3, volume: 0.2 },
    ],
};

interface BeatSyncedSFXProps {
    /** BPM of the music */
    bpm?: number;
    /** Starting frame */
    startFrame?: number;
    /** Number of beats to generate */
    beats?: number;
    /** SFX type to play on each beat */
    sfxType?: SFXType;
    /** Play every N beats (1 = every beat, 2 = every other beat, etc.) */
    beatDivision?: number;
    /** Volume */
    volume?: number;
    /** Enable */
    enabled?: boolean;
}

/**
 * SFX that plays in sync with music beats.
 */
export const BeatSyncedSFX: React.FC<BeatSyncedSFXProps> = ({
    bpm = 120,
    startFrame = 0,
    beats = 60,
    sfxType = 'click',
    beatDivision = 4,
    volume = 0.15,
    enabled = true,
}) => {
    const fps = 30;
    const framesPerBeat = (60 / bpm) * fps;

    if (!enabled) return null;

    const events: SFXSequenceEvent[] = [];
    for (let i = 0; i < beats; i++) {
        if (i % beatDivision === 0) {
            events.push({
                type: sfxType,
                at: startFrame + Math.floor(i * framesPerBeat),
                volume,
            });
        }
    }

    return <SFXSequence events={events} enabled={enabled} />;
};

/**
 * Hook to get frame timing for SFX
 */
export const useSFXTiming = (bpm: number = 120, fps: number = 30) => {
    const framesPerBeat = (60 / bpm) * fps;

    return {
        framesPerBeat,
        frameAtBeat: (beat: number) => Math.floor(beat * framesPerBeat),
        beatAtFrame: (frame: number) => frame / framesPerBeat,
    };
};
