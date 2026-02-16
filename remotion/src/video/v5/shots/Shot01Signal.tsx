import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { LogoIcon } from '../../../LogoIcon';
import { theme } from '../../../shared/theme';
import { CinematicText, AnimatedText } from '../../../shared/animation/AnimatedText';
import { BloomEffect, LensFlare } from '../../../shared/effects/BloomEffect';
import { PulsingElement, SparkBurst } from '../../../shared/cinematic';
import { ShotTransition } from '../../../shared/animation/ShotTransition';
import { copy } from '../../../shared/copy';
import { getVideoLayoutStyles, type VideoLayoutMode } from '../../layout/VideoLayout';
import { V5_SHOTS, V5_VIDEO_BPM } from '../config';

interface Shot01SignalProps {
  layout?: VideoLayoutMode;
}

export const Shot01Signal: React.FC<Shot01SignalProps> = ({ layout = 'landscape' }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { safeArea, scaledSafeArea } = getVideoLayoutStyles(layout);
  const containerStyle = layout === 'portrait' ? scaledSafeArea : safeArea;

  const reveal = spring({ frame, fps, config: { damping: 10, stiffness: 70 } });
  const logoScale = interpolate(reveal, [0, 1], [0.6, 1]);
  const logoOpacity = interpolate(reveal, [0, 0.25, 1], [0, 1, 1]);

  return (
    <ShotTransition
      durationInFrames={V5_SHOTS.shot1.duration}
      enterType="zoom-through"
      exitType="fade"
      enterDuration={14}
      exitDuration={12}
    >
      <AbsoluteFill
        style={{
          ...containerStyle,
          alignItems: 'center',
          justifyContent: 'center',
          gap: 36,
        }}
      >
        <LensFlare x={50} y={38} color={theme.accent.cyan} intensity={0.8} streakLength={520} delay={6} />
        <SparkBurst x={50} y={40} triggerAt={14} count={28} color={theme.accent.cyan} spread={220} />

        <PulsingElement bpm={V5_VIDEO_BPM} scaleRange={[1, 1.03]} glow glowColor={theme.accent.cyan}>
          <BloomEffect color={theme.accent.cyan} intensity={0.85} pulseFrequency={24} rays={10} raySpread={360}>
            <div
              style={{
                width: 360,
                height: 360,
                opacity: logoOpacity,
                transform: `scale(${logoScale})`,
              }}
            >
              <LogoIcon variant="trident-only" background="transparent" showShield showParticles />
            </div>
          </BloomEffect>
        </PulsingElement>

        <div style={{ textAlign: 'center' }}>
          <CinematicText delay={18} size={58} glowColor={theme.accent.cyan}>
            {copy.videoV5.shot1.headline}
          </CinematicText>
          <AnimatedText
            delay={32}
            mode="word"
            stagger={4}
            style={{
              fontSize: 24,
              color: 'rgba(255,255,255,0.7)',
              fontFamily: theme.typography.fontUi,
              marginTop: 12,
            }}
          >
            {copy.videoV5.shot1.subhead}
          </AnimatedText>
        </div>
      </AbsoluteFill>
    </ShotTransition>
  );
};
