import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { theme } from '../../shared/theme';
import { LogoIcon } from '../../LogoIcon';
import { BloomEffect, LensFlare } from '../../shared/effects/BloomEffect';
import { ShotTransition } from '../../shared/animation/ShotTransition';
import { CinematicText } from '../../shared/animation/AnimatedText';
import { CinematicFocus, SparkBurst, PulsingElement } from '../../shared/cinematic';
import { getVideoLayoutStyles, type VideoLayoutMode } from '../layout/VideoLayout';
import { SHOTS, VIDEO_BPM } from '../config';

interface Shot01LogoProps {
  layout?: VideoLayoutMode;
}

export const Shot01Logo: React.FC<Shot01LogoProps> = ({ layout = 'landscape' }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { safeArea, scaledSafeArea } = getVideoLayoutStyles(layout);
  const containerStyle = layout === 'portrait' ? scaledSafeArea : safeArea;

  const logoReveal = spring({ frame, fps, config: { damping: 10, stiffness: 60 } });
  const scale = interpolate(logoReveal, [0, 1], [0.5, 1]);
  const opacity = interpolate(logoReveal, [0, 0.3, 1], [0, 1, 1]);
  const rotateY = interpolate(logoReveal, [0, 1], [-40, 0]);

  const taglineOpacity = interpolate(frame, [50, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <ShotTransition durationInFrames={SHOTS.shot1.duration} enterType="zoom-through" exitType="zoom-through" enterDuration={15} exitDuration={12}>
      <CinematicFocus focusTarget={{ x: 50, y: 45 }} focusRadius={400} blurAmount={10} delay={0} vignette>
        <AbsoluteFill
          style={{
            ...containerStyle,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 48,
          }}
        >
          <LensFlare x={50} y={45} color={theme.accent.cyan} intensity={0.9} streakLength={500} delay={10} />

          <SparkBurst x={50} y={45} triggerAt={20} count={30} color={theme.accent.cyan} spread={200} />

          <PulsingElement bpm={VIDEO_BPM} scaleRange={[1, 1.02]} glow glowColor={theme.accent.cyan}>
            <BloomEffect color={theme.accent.cyan} intensity={0.8} pulseFrequency={25} rays={8} raySpread={360} revealDelay={5}>
              <div
                style={{
                  width: 420,
                  height: 420,
                  opacity,
                  transform: `perspective(1000px) rotateY(${rotateY}deg) scale(${scale})`,
                }}
              >
                <LogoIcon variant="trident-only" background="transparent" showShield showParticles />
              </div>
            </BloomEffect>
          </PulsingElement>

          <div style={{ opacity: taglineOpacity, textAlign: 'center' }}>
            <CinematicText delay={55} size={60} glowColor={theme.accent.cyan}>
              Poseidon
            </CinematicText>
            <div
              style={{
                fontFamily: theme.typography.fontUi,
                fontSize: 26,
                color: 'rgba(255,255,255,0.7)',
                marginTop: 14,
                opacity: taglineOpacity,
              }}
            >
              Trusted AI for Your Money
            </div>
          </div>
        </AbsoluteFill>
      </CinematicFocus>
    </ShotTransition>
  );
};
