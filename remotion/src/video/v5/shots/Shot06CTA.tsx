import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { ShotTransition } from '../../../shared/animation/ShotTransition';
import { LightSweep } from '../../../shared/effects/LightSweep';
import { BloomEffect, LensFlare } from '../../../shared/effects/BloomEffect';
import { CinematicText, AnimatedText } from '../../../shared/animation/AnimatedText';
import { PulsingButton } from '../../../shared/live-ui/AnimatedUI';
import { PulsingElement, SparkBurst } from '../../../shared/cinematic';
import { LogoIcon } from '../../../LogoIcon';
import { theme } from '../../../shared/theme';
import { copy } from '../../../shared/copy';
import { getVideoLayoutStyles, type VideoLayoutMode } from '../../layout/VideoLayout';
import { V5_SHOTS, V5_VIDEO_BPM } from '../config';

interface Shot06CTAProps {
  layout?: VideoLayoutMode;
}

export const Shot06CTA: React.FC<Shot06CTAProps> = ({ layout = 'landscape' }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { safeArea, scaledSafeArea } = getVideoLayoutStyles(layout);
  const containerStyle = layout === 'portrait' ? scaledSafeArea : safeArea;

  const logoReveal = spring({ frame, fps, config: { damping: 12, stiffness: 70 } });

  return (
    <ShotTransition durationInFrames={V5_SHOTS.shot6.duration} enterType="zoom-through" exitType="fade" enterDuration={16} exitDuration={18}>
      <AbsoluteFill
        style={{
          ...containerStyle,
          alignItems: 'center',
          justifyContent: 'center',
          gap: 32,
        }}
      >
        <LensFlare x={50} y={38} color={theme.accent.cyan} intensity={0.7} streakLength={600} delay={4} />
        <LensFlare x={48} y={42} color={theme.accent.violet} intensity={0.4} streakLength={380} delay={8} />
        <LightSweep duration={V5_SHOTS.shot6.duration} color={theme.accent.cyan} intensity={0.3} layers={3} />

        <SparkBurst x={50} y={40} triggerAt={12} count={36} color={theme.accent.cyan} spread={240} />

        <PulsingElement bpm={V5_VIDEO_BPM} scaleRange={[1, 1.02]} glow glowColor={theme.accent.cyan}>
          <BloomEffect color={theme.accent.cyan} intensity={0.9} pulseFrequency={22} rays={12} raySpread={360} rotateRays>
            <div
              style={{
                width: 280,
                height: 280,
                opacity: logoReveal,
                transform: `scale(${interpolate(logoReveal, [0, 1], [0.7, 1])})`,
              }}
            >
              <LogoIcon variant="trident-only" background="transparent" showShield showParticles />
            </div>
          </BloomEffect>
        </PulsingElement>

        <CinematicText delay={16} size={54} glowColor={theme.accent.cyan}>
          {copy.videoV5.shot6.headline}
        </CinematicText>

        <AnimatedText
          mode="word"
          delay={30}
          stagger={4}
          style={{ fontSize: 24, color: 'rgba(255,255,255,0.7)', fontFamily: theme.typography.fontUi }}
        >
          {copy.videoV5.shot6.subhead}
        </AnimatedText>

        <PulsingButton color={theme.accent.cyan} delay={45} style={{ padding: '20px 48px', fontSize: 22 }}>
          {copy.videoV5.shot6.cta}
        </PulsingButton>

        <AnimatedText delay={62} style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', fontFamily: theme.typography.fontUi }}>
          {copy.videoV5.shot6.footer}
        </AnimatedText>
      </AbsoluteFill>
    </ShotTransition>
  );
};
