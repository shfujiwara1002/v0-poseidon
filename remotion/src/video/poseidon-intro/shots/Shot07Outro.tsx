/**
 * Shot 07: CTA / Outro
 * Duration: 8 seconds (1110-1350 frames)
 * Purpose: Memorable close with tagline and call-to-action
 *
 * "Your money works while you sleep. But you always understand why."
 */

import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { theme } from '../../../shared/theme';
import { ShotTransition } from '../../../shared/animation/ShotTransition';
import { CinematicText, AnimatedText } from '../../../shared/animation/AnimatedText';
import { PulsingButton } from '../../../shared/live-ui/AnimatedUI';
import { LogoIcon } from '../../../LogoIcon';
import { FloatingParticles } from '../../../shared/effects/FloatingParticles';
import { getVideoLayoutStyles, type VideoLayoutMode } from '../../layout/VideoLayout';
import { SHOTS } from '../config';
import { poseidonIntroCopy } from '../copy';

interface Shot07OutroProps {
  layout?: VideoLayoutMode;
}

export const Shot07Outro: React.FC<Shot07OutroProps> = ({ layout = 'landscape' }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { safeArea, scaledSafeArea } = getVideoLayoutStyles(layout);
  const containerStyle = layout === 'portrait' ? scaledSafeArea : safeArea;

  const copy = poseidonIntroCopy.shot7;

  // Logo reveal animation
  const logoReveal = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 50 },
  });

  // Fade out in final 20 frames
  const fadeOut = interpolate(
    frame,
    [SHOTS.shot7.duration - 20, SHOTS.shot7.duration],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <ShotTransition
      durationInFrames={SHOTS.shot7.duration}
      enterType="fade"
      exitType="fade"
      enterDuration={20}
      exitDuration={25}
    >
      <AbsoluteFill
        style={{
          ...containerStyle,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 32,
          opacity: fadeOut,
        }}
      >
        {/* Floating particles - minimal */}
        <FloatingParticles
          count={15}
          colors={[theme.accent.cyan, theme.accent.violet, theme.accent.teal]}
          sizeRange={[2, 3]}
          speed={0.15}
          glow
          opacityRange={[0.08, 0.18]}
        />

        {/* Logo - simple, no effects */}
        <div
          style={{
            width: 240,
            height: 240,
            opacity: logoReveal,
            transform: `scale(${interpolate(logoReveal, [0, 1], [0.85, 1])})`,
          }}
        >
          <LogoIcon
            variant="trident-only"
            background="transparent"
            showShield={false}
            showParticles={false}
          />
        </div>

        {/* Brand name */}
        <CinematicText delay={20} size={52} glowColor={theme.accent.cyan}>
          Poseidon
        </CinematicText>

        {/* Tagline part 1 */}
        <AnimatedText
          mode="word"
          delay={40}
          stagger={4}
          variant="snap"
          style={{
            fontSize: 28,
            color: 'rgba(255,255,255,0.9)',
            fontFamily: theme.typography.fontUi,
            textAlign: 'center',
          }}
        >
          {copy.taglinePart1}
        </AnimatedText>

        {/* Tagline part 2 - emphasized */}
        <AnimatedText
          mode="word"
          delay={70}
          stagger={3}
          variant="fade-up"
          glowColor={theme.accent.amber}
          style={{
            fontSize: 24,
            color: theme.accent.amber,
            fontFamily: theme.typography.fontUi,
            textAlign: 'center',
            fontWeight: 600,
          }}
        >
          {copy.taglinePart2}
        </AnimatedText>

        {/* Spacer */}
        <div style={{ height: 8 }} />

        {/* CTA Button */}
        <PulsingButton
          color={theme.accent.cyan}
          delay={100}
          style={{
            padding: '20px 48px',
            fontSize: 22,
          }}
        >
          {copy.cta}
        </PulsingButton>

        {/* URL */}
        <AnimatedText
          delay={120}
          style={{
            fontSize: 18,
            color: 'rgba(255,255,255,0.5)',
            fontFamily: theme.typography.fontMono,
            letterSpacing: '0.05em',
          }}
        >
          {copy.url}
        </AnimatedText>
      </AbsoluteFill>
    </ShotTransition>
  );
};
