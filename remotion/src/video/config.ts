export type VideoLayoutMode = 'landscape' | 'portrait';

export const VIDEO_FPS = 30;
export const VIDEO_BPM = 120;
export const VIDEO_DURATION_SECONDS = 30;
export const VIDEO_DURATION_FRAMES = VIDEO_FPS * VIDEO_DURATION_SECONDS;

export const VIDEO_SIZES = {
  landscape: { width: 1920, height: 1080 },
  portrait: { width: 1080, height: 1920 },
} as const;

export const VIDEO_SAFE_AREA = {
  landscape: { paddingX: 120, paddingY: 80, scale: 1 },
  portrait: { paddingX: 72, paddingY: 140, scale: 0.9 },
} as const;

export const DEFAULT_AUDIO = {
  musicSrc: 'audio/poseidon-beat.wav',
  sfxWhooshSrc: 'audio/whoosh.wav',
  sfxHitSrc: 'audio/hit.ogg',
} as const;

export const SHOTS = {
  shot1: { start: 0, duration: VIDEO_FPS * 4 },
  shot2: { start: 120, duration: VIDEO_FPS * 4 },
  shot3: { start: 240, duration: VIDEO_FPS * 5 },
  shot4: { start: 390, duration: VIDEO_FPS * 5 },
  shot5: { start: 540, duration: VIDEO_FPS * 5 },
  shot6: { start: 690, duration: VIDEO_FPS * 3 },
  shot7: { start: 780, duration: VIDEO_FPS * 4 },
} as const;

export type ShotKey = keyof typeof SHOTS;

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
