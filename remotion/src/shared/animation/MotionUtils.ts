import { Easing } from 'remotion';

/**
 * Apple-style easing: fast start, slow settling.
 * Equivalent to cubic-bezier(0.2, 0.8, 0.2, 1)
 */
export const APPLE_EASING = Easing.bezier(0.2, 0.8, 0.2, 1);

/**
 * Spring configurations for common Apple UI patterns
 */
export const SPRING_CONFIGS = {
    // Snappy for UI reveals
    snappy: {
        damping: 12,
        mass: 0.5,
        stiffness: 100,
    },
    // Smooth and gentle for background elements
    gentle: {
        damping: 20,
        mass: 1,
        stiffness: 100,
    },
    // Playful with slight overshoot
    overshoot: {
        damping: 12,
        mass: 0.8,
        stiffness: 150,
    },
};

/**
 * Helper to create staggered delays based on index
 * @param frame Current frame
 * @param index Child index
 * @param staggerFrames Frame offset per index
 */
export const stagger = (frame: number, index: number, staggerFrames: number) => {
    return Math.max(0, frame - index * staggerFrames);
};

/**
 * Rhythmic timing constants (assuming 30fps)
 */
export const BEAT_120BPM = 15; // Frames per beat at 120BPM
export const MEASURE_4_4 = BEAT_120BPM * 4;
