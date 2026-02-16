import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { ShotTransition } from '../../shared/animation/ShotTransition';
import { LightSweep } from '../../shared/effects/LightSweep';
import { BloomEffect, LensFlare } from '../../shared/effects/BloomEffect';
import { CinematicText, AnimatedText } from '../../shared/animation/AnimatedText';
import { PulsingButton } from '../../shared/live-ui/AnimatedUI';
import { PulsingElement, SparkBurst } from '../../shared/cinematic';
import { LogoIcon } from '../../LogoIcon';
import { theme } from '../../shared/theme';
import { getVideoLayoutStyles, type VideoLayoutMode } from '../layout/VideoLayout';
import { SHOTS, VIDEO_BPM } from '../config';

interface Shot07OutroProps {
  layout?: VideoLayoutMode;
}

export const Shot07Outro: React.FC<Shot07OutroProps> = ({ layout = 'landscape' }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { safeArea, scaledSafeArea } = getVideoLayoutStyles(layout);
  const containerStyle = layout === 'portrait' ? scaledSafeArea : safeArea;

  const logoReveal = spring({ frame, fps, config: { damping: 12, stiffness: 70 } });

  return (
    <ShotTransition durationInFrames={SHOTS.shot7.duration} enterType="zoom-through" exitType="fade" enterDuration={16} exitDuration={20}>
      <AbsoluteFill
        style={{
          ...containerStyle,
          alignItems: 'center',
          justifyContent: 'center',
          gap: 40,
        }}
      >
        <LensFlare x={50} y={40} color={theme.accent.cyan} intensity={0.7} streakLength={600} delay={5} />
        <LensFlare x={48} y={42} color={theme.accent.violet} intensity={0.4} streakLength={400} delay={10} />
        <LightSweep duration={SHOTS.shot7.duration} color={theme.accent.cyan} intensity={0.35} layers={3} />

        <SparkBurst x={50} y={42} triggerAt={15} count={40} color={theme.accent.cyan} spread={250} />

        <PulsingElement bpm={VIDEO_BPM} scaleRange={[1, 1.02]} glow glowColor={theme.accent.cyan}>
          <BloomEffect color={theme.accent.cyan} intensity={0.9} pulseFrequency={22} rays={12} raySpread={360} rotateRays>
            <div style={{ width: 300, height: 300, opacity: logoReveal, transform: `scale(${interpolate(logoReveal, [0, 1], [0.7, 1])})` }}>
              <LogoIcon variant="trident-only" background="transparent" showShield showParticles />
            </div>
          </BloomEffect>
        </PulsingElement>

        <CinematicText delay={18} size={56} glowColor={theme.accent.cyan}>
          Poseidon
        </CinematicText>

        <AnimatedText mode="word" delay={30} stagger={4} style={{ fontSize: 26, color: 'rgba(255,255,255,0.7)', fontFamily: theme.typography.fontUi }}>
          Trusted AI for Your Money
        </AnimatedText>

        <div style={{ height: 16 }} />

        <PulsingButton color={theme.accent.cyan} delay={45} style={{ padding: '22px 52px', fontSize: 24 }}>
          Get Early Access
        </PulsingButton>

        <AnimatedText delay={65} style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', fontFamily: theme.typography.fontUi }}>
          poseidon.ai
        </AnimatedText>
      </AbsoluteFill>
    </ShotTransition>
  );
};
