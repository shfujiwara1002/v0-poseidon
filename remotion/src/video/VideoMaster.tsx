import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { CinematicBackground } from './backgrounds/CinematicBackground';
import { VideoAudio, type VideoAudioProps } from './audio';
import { FlashTransition } from '../shared/animation/ShotTransition';
import { SHOTS } from './config';
import { Shot01Logo } from './shots/Shot01Logo';
import { Shot02Problem } from './shots/Shot02Problem';
import { Shot03Dashboard } from './shots/Shot03Dashboard';
import { Shot04Protect } from './shots/Shot04Protect';
import { Shot05Govern } from './shots/Shot05Govern';
import { Shot06Engines } from './shots/Shot06Engines';
import { Shot07Outro } from './shots/Shot07Outro';
import type { VideoLayoutMode } from './layout/VideoLayout';

export interface VideoMasterProps extends VideoAudioProps {
  layout?: VideoLayoutMode;
  useTier3?: boolean;
}

export const VideoMaster: React.FC<VideoMasterProps> = ({
  layout = 'landscape',
  useTier3 = true,
  ...audioProps
}) => {
  return (
    <AbsoluteFill>
      <CinematicBackground useTier3={useTier3} />
      <VideoAudio {...audioProps} />

      <FlashTransition at={SHOTS.shot1.start + 15} duration={8} intensity={0.4} />
      <FlashTransition at={SHOTS.shot3.start + 50} duration={6} intensity={0.2} />
      <FlashTransition at={SHOTS.shot4.start + 55} duration={6} intensity={0.2} />
      <FlashTransition at={SHOTS.shot7.start + 10} duration={10} intensity={0.3} />

      <Sequence from={SHOTS.shot1.start} durationInFrames={SHOTS.shot1.duration}>
        <Shot01Logo layout={layout} />
      </Sequence>

      <Sequence from={SHOTS.shot2.start} durationInFrames={SHOTS.shot2.duration}>
        <Shot02Problem layout={layout} />
      </Sequence>

      <Sequence from={SHOTS.shot3.start} durationInFrames={SHOTS.shot3.duration}>
        <Shot03Dashboard layout={layout} />
      </Sequence>

      <Sequence from={SHOTS.shot4.start} durationInFrames={SHOTS.shot4.duration}>
        <Shot04Protect layout={layout} />
      </Sequence>

      <Sequence from={SHOTS.shot5.start} durationInFrames={SHOTS.shot5.duration}>
        <Shot05Govern layout={layout} />
      </Sequence>

      <Sequence from={SHOTS.shot6.start} durationInFrames={SHOTS.shot6.duration}>
        <Shot06Engines layout={layout} />
      </Sequence>

      <Sequence from={SHOTS.shot7.start} durationInFrames={SHOTS.shot7.duration}>
        <Shot07Outro layout={layout} />
      </Sequence>
    </AbsoluteFill>
  );
};
