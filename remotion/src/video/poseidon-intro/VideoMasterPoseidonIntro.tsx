/**
 * Poseidon Product Intro - Master Video Composition
 *
 * 45-second promotional video following Apple WWDC / Google I/O style
 * 7 shots showcasing the unified AI backbone for financial coordination
 *
 * Shot Structure:
 * 1. Logo Reveal (0-5s) - Brand introduction
 * 2. Problem (5-11s) - $24B coordination gap
 * 3. Dashboard (11-18s) - Unified AI backbone
 * 4. PROTECT (18-25s) - Fraud detection engine
 * 5. GOVERN (25-32s) - Compliance as architecture
 * 6. Engines (32-37s) - 4-engine integration
 * 7. Outro (37-45s) - CTA and tagline
 */

import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { CinematicBackground } from '../backgrounds/CinematicBackground';
import { VideoAudio, type VideoAudioProps } from '../audio';
import { SHOTS } from './config';
import { Shot01Logo } from './shots/Shot01Logo';
import { Shot02Problem } from './shots/Shot02Problem';
import { Shot03Dashboard } from './shots/Shot03Dashboard';
import { Shot04Protect } from './shots/Shot04Protect';
import { Shot05Govern } from './shots/Shot05Govern';
import { Shot06Engines } from './shots/Shot06Engines';
import { Shot07Outro } from './shots/Shot07Outro';
import type { VideoLayoutMode } from '../layout/VideoLayout';

export interface VideoMasterPoseidonIntroProps extends VideoAudioProps {
  layout?: VideoLayoutMode;
  useTier3?: boolean;
}

export const VideoMasterPoseidonIntro: React.FC<VideoMasterPoseidonIntroProps> = ({
  layout = 'landscape',
  useTier3 = true,
  ...audioProps
}) => {
  return (
    <AbsoluteFill>
      {/* Cinematic background with Tier3 effects */}
      <CinematicBackground useTier3={useTier3} />

      {/* Audio track */}
      <VideoAudio {...audioProps} />

      {/* Shot 1: Logo Reveal (0-5s) */}
      <Sequence from={SHOTS.shot1.start} durationInFrames={SHOTS.shot1.duration}>
        <Shot01Logo layout={layout} />
      </Sequence>

      {/* Shot 2: Problem Statement (5-11s) */}
      <Sequence from={SHOTS.shot2.start} durationInFrames={SHOTS.shot2.duration}>
        <Shot02Problem layout={layout} />
      </Sequence>

      {/* Shot 3: Dashboard / Solution Overview (11-18s) */}
      <Sequence from={SHOTS.shot3.start} durationInFrames={SHOTS.shot3.duration}>
        <Shot03Dashboard layout={layout} />
      </Sequence>

      {/* Shot 4: PROTECT Engine (18-25s) */}
      <Sequence from={SHOTS.shot4.start} durationInFrames={SHOTS.shot4.duration}>
        <Shot04Protect layout={layout} />
      </Sequence>

      {/* Shot 5: GOVERN Engine (25-32s) */}
      <Sequence from={SHOTS.shot5.start} durationInFrames={SHOTS.shot5.duration}>
        <Shot05Govern layout={layout} />
      </Sequence>

      {/* Shot 6: 4-Engine Integration (32-37s) */}
      <Sequence from={SHOTS.shot6.start} durationInFrames={SHOTS.shot6.duration}>
        <Shot06Engines layout={layout} />
      </Sequence>

      {/* Shot 7: CTA / Outro (37-45s) */}
      <Sequence from={SHOTS.shot7.start} durationInFrames={SHOTS.shot7.duration}>
        <Shot07Outro layout={layout} />
      </Sequence>
    </AbsoluteFill>
  );
};

export default VideoMasterPoseidonIntro;
