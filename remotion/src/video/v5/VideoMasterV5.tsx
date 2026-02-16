import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { CinematicBackground } from '../backgrounds/CinematicBackground';
import { VideoAudio, type VideoAudioProps } from '../audio';
import { FlashTransition } from '../../shared/animation/ShotTransition';
import { V5_SHOTS } from './config';
import { Shot01Signal } from './shots/Shot01Signal';
import { Shot02Friction } from './shots/Shot02Friction';
import { Shot03Clarity } from './shots/Shot03Clarity';
import { Shot04Momentum } from './shots/Shot04Momentum';
import { Shot05Assurance } from './shots/Shot05Assurance';
import { Shot06CTA } from './shots/Shot06CTA';
import type { VideoLayoutMode } from '../layout/VideoLayout';

export interface VideoMasterV5Props extends VideoAudioProps {
  layout?: VideoLayoutMode;
  useTier3?: boolean;
}

export const VideoMasterV5: React.FC<VideoMasterV5Props> = ({
  layout = 'landscape',
  useTier3 = true,
  ...audioProps
}) => {
  return (
    <AbsoluteFill>
      <CinematicBackground useTier3={useTier3} />
      <VideoAudio {...audioProps} />

      <FlashTransition at={V5_SHOTS.shot1.start + 18} duration={10} intensity={0.25} />
      <FlashTransition at={V5_SHOTS.shot3.start + 20} duration={8} intensity={0.2} />
      <FlashTransition at={V5_SHOTS.shot6.start + 12} duration={12} intensity={0.3} />

      <Sequence from={V5_SHOTS.shot1.start} durationInFrames={V5_SHOTS.shot1.duration}>
        <Shot01Signal layout={layout} />
      </Sequence>

      <Sequence from={V5_SHOTS.shot2.start} durationInFrames={V5_SHOTS.shot2.duration}>
        <Shot02Friction layout={layout} />
      </Sequence>

      <Sequence from={V5_SHOTS.shot3.start} durationInFrames={V5_SHOTS.shot3.duration}>
        <Shot03Clarity layout={layout} />
      </Sequence>

      <Sequence from={V5_SHOTS.shot4.start} durationInFrames={V5_SHOTS.shot4.duration}>
        <Shot04Momentum layout={layout} />
      </Sequence>

      <Sequence from={V5_SHOTS.shot5.start} durationInFrames={V5_SHOTS.shot5.duration}>
        <Shot05Assurance layout={layout} />
      </Sequence>

      <Sequence from={V5_SHOTS.shot6.start} durationInFrames={V5_SHOTS.shot6.duration}>
        <Shot06CTA layout={layout} />
      </Sequence>
    </AbsoluteFill>
  );
};
