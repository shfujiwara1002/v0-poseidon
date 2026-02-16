import { VIDEO_BPM, VIDEO_FPS } from '../config';

export const V5_VIDEO_FPS = VIDEO_FPS;
export const V5_VIDEO_BPM = VIDEO_BPM;
export const V5_VIDEO_DURATION_SECONDS = 30;
export const V5_VIDEO_DURATION_FRAMES = V5_VIDEO_FPS * V5_VIDEO_DURATION_SECONDS;

export const V5_SHOTS = {
  shot1: { start: 0, duration: V5_VIDEO_FPS * 5 },
  shot2: { start: 150, duration: V5_VIDEO_FPS * 5 },
  shot3: { start: 300, duration: V5_VIDEO_FPS * 5 },
  shot4: { start: 450, duration: V5_VIDEO_FPS * 5 },
  shot5: { start: 600, duration: V5_VIDEO_FPS * 5 },
  shot6: { start: 750, duration: V5_VIDEO_FPS * 5 },
} as const;

export type V5ShotKey = keyof typeof V5_SHOTS;
