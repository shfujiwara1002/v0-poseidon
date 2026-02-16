import React from 'react';
import { Audio, Sequence, staticFile, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { createSFXEvents, type SFXType } from '../shared/cinematic';
import { DEFAULT_AUDIO, SHOTS } from './config';

interface SFXSequenceEvent {
  type: SFXType;
  at: number;
  volume?: number;
}

const DEFAULT_SFX_LIBRARY: Record<SFXType, { file: string; volume: number; playbackRate?: number }> = {
  'zoom-in': { file: DEFAULT_AUDIO.sfxWhooshSrc, volume: 0.5, playbackRate: 1.2 },
  'zoom-out': { file: DEFAULT_AUDIO.sfxWhooshSrc, volume: 0.4, playbackRate: 0.8 },
  'whoosh': { file: DEFAULT_AUDIO.sfxWhooshSrc, volume: 0.6 },
  'pop': { file: DEFAULT_AUDIO.sfxHitSrc, volume: 0.4, playbackRate: 1.3 },
  'click': { file: DEFAULT_AUDIO.sfxHitSrc, volume: 0.3, playbackRate: 1.5 },
  'slide': { file: DEFAULT_AUDIO.sfxWhooshSrc, volume: 0.3, playbackRate: 1.1 },
  'reveal': { file: DEFAULT_AUDIO.sfxWhooshSrc, volume: 0.35, playbackRate: 0.9 },
  'success': { file: DEFAULT_AUDIO.sfxHitSrc, volume: 0.5 },
  'alert': { file: DEFAULT_AUDIO.sfxHitSrc, volume: 0.6, playbackRate: 0.7 },
  'hit': { file: DEFAULT_AUDIO.sfxHitSrc, volume: 0.7 },
  'sparkle': { file: DEFAULT_AUDIO.sfxHitSrc, volume: 0.25, playbackRate: 1.8 },
};

const WHOOSH_TYPES: SFXType[] = ['zoom-in', 'zoom-out', 'whoosh', 'slide', 'reveal'];

const resolveSfxConfig = (
  type: SFXType,
  sfxWhooshSrc: string,
  sfxHitSrc: string
) => {
  const base = DEFAULT_SFX_LIBRARY[type];
  const file = WHOOSH_TYPES.includes(type) ? sfxWhooshSrc : sfxHitSrc;
  return { ...base, file };
};

export interface VideoAudioProps {
  musicSrc?: string;
  sfxWhooshSrc?: string;
  sfxHitSrc?: string;
  enableAudio?: boolean;
  sfxVolume?: number;
}

export const buildSfxEvents = (): SFXSequenceEvent[] => {
  return [
    ...createSFXEvents.zoomSequence(SHOTS.shot3.start + 20, 40, 50),
    ...createSFXEvents.zoomSequence(SHOTS.shot4.start + 20, 40, 50),
    ...createSFXEvents.zoomSequence(SHOTS.shot5.start + 20, 40, 50),
    ...createSFXEvents.cardReveal(SHOTS.shot6.start + 20, 4, 10),
    ...createSFXEvents.transition(SHOTS.shot2.start),
    ...createSFXEvents.transition(SHOTS.shot3.start),
    ...createSFXEvents.transition(SHOTS.shot4.start),
    ...createSFXEvents.transition(SHOTS.shot5.start),
    ...createSFXEvents.transition(SHOTS.shot6.start),
    ...createSFXEvents.transition(SHOTS.shot7.start, 'hard'),
    ...createSFXEvents.highlight(SHOTS.shot1.start + 20),
    ...createSFXEvents.highlight(SHOTS.shot7.start + 15),
  ];
};

export const VideoAudio: React.FC<VideoAudioProps> = ({
  musicSrc = DEFAULT_AUDIO.musicSrc,
  sfxWhooshSrc = DEFAULT_AUDIO.sfxWhooshSrc,
  sfxHitSrc = DEFAULT_AUDIO.sfxHitSrc,
  enableAudio = true,
  sfxVolume = 0.6,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const musicVolume = interpolate(
    frame,
    [0, 30, durationInFrames - 60, durationInFrames],
    [0, 0.8, 0.8, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const events = buildSfxEvents();

  if (!enableAudio) return null;

  return (
    <>
      {musicSrc && <Audio src={staticFile(musicSrc)} volume={musicVolume} />}
      {events.map((event, index) => {
        const config = resolveSfxConfig(event.type, sfxWhooshSrc, sfxHitSrc);
        const volume = (event.volume ?? config.volume) * sfxVolume;
        return (
          <Sequence key={`${event.type}-${event.at}-${index}`} from={event.at} durationInFrames={30}>
            <Audio
              src={staticFile(config.file)}
              volume={volume}
              playbackRate={config.playbackRate ?? 1}
            />
          </Sequence>
        );
      })}
    </>
  );
};
