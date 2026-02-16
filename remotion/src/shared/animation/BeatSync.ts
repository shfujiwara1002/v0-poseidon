/**
 * Beat synchronization utility for Poseidon videos.
 * Standardized at 120 BPM (2 beats per second).
 */

export const BEAT_IN_FRAMES = 15; // @30fps, 1 beat = 0.5s = 15 frames
export const MEASURE_IN_FRAMES = BEAT_IN_FRAMES * 4; // 4/4 time

/**
 * Returns the frame count for a given number of beats.
 */
export const beats = (count: number) => count * BEAT_IN_FRAMES;

/**
 * Common beat-aligned timing markers for a 30s video.
 * These act as a "rhythm guide" for shot transitions and SFX hits.
 */
export const BEAT_MAP = {
    // Intro (0-4s)
    introStart: 0,
    logoHit: beats(2),        // 1.0s
    introTagline: beats(4),   // 2.0s

    // Transition 1 (4s)
    shot2Entry: beats(8),     // 4.0s

    // High energy section (4s - 14s)
    alert1: beats(10),        // 5.0s
    alert2: beats(12),        // 6.0s

    // Transition 2 (9s)
    shot3Entry: beats(18),    // 9.0s
    approvalHit: beats(20),   // 10.0s

    // Engines Build (14s - 20s)
    shot4Entry: beats(28),    // 14.0s
    engine1: beats(30),
    engine2: beats(32),
    engine3: beats(34),
    engine4: beats(36),

    // Audit Trail (20s - 26s)
    shot5Entry: beats(40),    // 20.0s
    auditStep1: beats(42),
    auditStep2: beats(44),
    auditStep3: beats(46),

    // Finale (26s - 30s)
    shot6Entry: beats(52),    // 26.0s
    finaleLogo: beats(54),
    ctaReveal: beats(56),
};

/**
 * Returns a value between 0 and 1 that pulses with the beat.
 */
export const useBeatPulse = (frame: number, frequency = 1) => {
    const phase = (frame % (BEAT_IN_FRAMES / frequency)) / (BEAT_IN_FRAMES / frequency);
    return Math.sin(phase * Math.PI);
};

/**
 * Get the frame number for a given beat at specified BPM.
 */
export const frameAtBeat = (beat: number, bpm = 120, fps = 30): number => {
    const secondsPerBeat = 60 / bpm;
    return Math.round(beat * secondsPerBeat * fps);
};

/**
 * Get the beat number for a given frame at specified BPM.
 */
export const beatAtFrame = (frame: number, bpm = 120, fps = 30): number => {
    const secondsPerBeat = 60 / bpm;
    const seconds = frame / fps;
    return seconds / secondsPerBeat;
};

/**
 * Check if the current frame is on a beat (within tolerance).
 */
export const isOnBeat = (frame: number, bpm = 120, fps = 30, toleranceFrames = 2): boolean => {
    const beat = beatAtFrame(frame, bpm, fps);
    const fractionalBeat = beat - Math.floor(beat);
    const tolerance = toleranceFrames / (fps * 60 / bpm);
    return fractionalBeat < tolerance || fractionalBeat > (1 - tolerance);
};
