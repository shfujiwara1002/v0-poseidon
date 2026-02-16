/**
 * Poseidon Product Intro Video Configuration
 * 45-second promotional video following Apple WWDC style
 */

export type VideoLayoutMode = 'landscape' | 'portrait';

export const VIDEO_FPS = 30;
export const VIDEO_BPM = 120;
export const VIDEO_DURATION_SECONDS = 45;
export const VIDEO_DURATION_FRAMES = VIDEO_FPS * VIDEO_DURATION_SECONDS; // 1350

// Beat calculation: 120 BPM @ 30fps = 15 frames per beat
export const FRAMES_PER_BEAT = (60 / VIDEO_BPM) * VIDEO_FPS; // 15

export const VIDEO_SIZES = {
  landscape: { width: 1920, height: 1080 },
  portrait: { width: 1080, height: 1920 },
} as const;

export const VIDEO_SAFE_AREA = {
  landscape: { paddingX: 120, paddingY: 80, scale: 1 },
  portrait: { paddingX: 72, paddingY: 140, scale: 0.9 },
} as const;

export const DEFAULT_AUDIO = {
  musicSrc: 'audio/synthwave-ambient.mp3',
  sfxWhooshSrc: 'audio/whoosh.wav',
  sfxHitSrc: 'audio/hit.ogg',
} as const;

/**
 * Shot timing configuration
 * Total: 45 seconds (1350 frames)
 *
 * Shot 1: Logo Reveal (0-5s) - Brand introduction
 * Shot 2: Problem (5-11s) - $24B coordination gap
 * Shot 3: Dashboard (11-18s) - Unified AI backbone
 * Shot 4: PROTECT (18-25s) - Fraud detection engine
 * Shot 5: GOVERN (25-32s) - Compliance as architecture
 * Shot 6: Engines (32-37s) - 4-engine integration
 * Shot 7: Outro (37-45s) - CTA and tagline
 */
export const SHOTS = {
  shot1: { start: 0, duration: VIDEO_FPS * 5 },           // 0-150 (5s)
  shot2: { start: 150, duration: VIDEO_FPS * 6 },         // 150-330 (6s)
  shot3: { start: 330, duration: VIDEO_FPS * 7 },         // 330-540 (7s)
  shot4: { start: 540, duration: VIDEO_FPS * 7 },         // 540-750 (7s)
  shot5: { start: 750, duration: VIDEO_FPS * 7 },         // 750-960 (7s)
  shot6: { start: 960, duration: VIDEO_FPS * 5 },         // 960-1110 (5s)
  shot7: { start: 1110, duration: VIDEO_FPS * 8 },        // 1110-1350 (8s)
} as const;

export type ShotKey = keyof typeof SHOTS;

/**
 * Flash transition timing (synced to beats)
 */
export const FLASH_TRANSITIONS = {
  logoReveal: { at: SHOTS.shot1.start + 15, duration: 8, intensity: 0.4 },
  dashboardHighlight: { at: SHOTS.shot3.start + 50, duration: 6, intensity: 0.2 },
  protectAlert: { at: SHOTS.shot4.start + 55, duration: 6, intensity: 0.2 },
  finalImpact: { at: SHOTS.shot7.start + 10, duration: 10, intensity: 0.3 },
} as const;

/**
 * Spring physics configurations
 */
export const SPRING_CONFIGS = {
  snappy: { damping: 12, mass: 0.5, stiffness: 100 },
  cinematic: { damping: 12, mass: 0.8, stiffness: 180 },
  gentle: { damping: 20, mass: 1, stiffness: 100 },
  overshoot: { damping: 12, mass: 0.8, stiffness: 150 },
} as const;

/**
 * Beat map for audio sync (updated for 45s duration)
 */
export const BEAT_MAP = {
  // Shot 1: Logo (0-150)
  logoSpark: 15,        // Beat 1
  logoFull: 75,         // Beat 5
  taglineReveal: 105,   // Beat 7

  // Shot 2: Problem (150-330)
  problemEntry: 150,    // Beat 10
  statisticHit: 195,    // Beat 13

  // Shot 3: Dashboard (330-540)
  dashboardEntry: 330,  // Beat 22
  enginePills: 390,     // Beat 26

  // Shot 4: PROTECT (540-750)
  protectEntry: 540,    // Beat 36
  alertTrigger: 600,    // Beat 40
  confidenceReveal: 675,// Beat 45

  // Shot 5: GOVERN (750-960)
  governEntry: 750,     // Beat 50
  auditLogStart: 810,   // Beat 54
  complianceBadges: 885,// Beat 59

  // Shot 6: Engines (960-1110)
  enginesEntry: 960,    // Beat 64
  engineGrid: 1020,     // Beat 68

  // Shot 7: Outro (1110-1350)
  outroEntry: 1110,     // Beat 74
  taglinePart1: 1170,   // Beat 78
  taglinePart2: 1230,   // Beat 82
  finalFade: 1320,      // Beat 88
} as const;

export interface VideoConfig {
  fps: number;
  bpm: number;
  durationSeconds: number;
  durationFrames: number;
  shots: typeof SHOTS;
}

export const VIDEO_CONFIG: VideoConfig = {
  fps: VIDEO_FPS,
  bpm: VIDEO_BPM,
  durationSeconds: VIDEO_DURATION_SECONDS,
  durationFrames: VIDEO_DURATION_FRAMES,
  shots: SHOTS,
};
