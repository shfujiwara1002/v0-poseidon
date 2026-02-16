/**
 * Shot 01: Logo Reveal
 * Duration: 5 seconds (0-150 frames)
 * Purpose: Brand introduction with clean, simple visual
 *
 * "This is not a budgeting app. This is your AI-powered Financial Guardian."
 */

import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { theme } from '../../../shared/theme';
import { LogoIcon } from '../../../LogoIcon';
import { ShotTransition } from '../../../shared/animation/ShotTransition';
import { CinematicText } from '../../../shared/animation/AnimatedText';
import { getVideoLayoutStyles, type VideoLayoutMode } from '../../layout/VideoLayout';
import { SHOTS } from '../config';
import { poseidonIntroCopy } from '../copy';

interface Shot01LogoProps {
  layout?: VideoLayoutMode;
}

export const Shot01Logo: React.FC<Shot01LogoProps> = ({ layout = 'landscape' }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { safeArea, scaledSafeArea } = getVideoLayoutStyles(layout);
  const containerStyle = layout === 'portrait' ? scaledSafeArea : safeArea;

  // Logo reveal animation with spring physics
  const logoReveal = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 50 },
  });

  // Simple scale and opacity animation
  const scale = interpolate(logoReveal, [0, 1], [0.8, 1]);
  const opacity = interpolate(logoReveal, [0, 0.3, 1], [0, 1, 1]);

  // Tagline fade-in (starts at frame 60 for longer shot)
  const taglineOpacity = interpolate(
    frame,
    [60, 90],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const copy = poseidonIntroCopy.shot1;

  return (
    <ShotTransition
      durationInFrames={SHOTS.shot1.duration}
      enterType="fade"
      exitType="fade"
      enterDuration={20}
      exitDuration={16}
    >
      <AbsoluteFill
        style={{
          ...containerStyle,
          alignItems: 'center',
          justifyContent: 'center',
          gap: 48,
        }}
      >
        {/* Logo - simple, no effects */}
        <div
          style={{
            width: 380,
            height: 380,
            opacity,
            transform: `scale(${scale})`,
          }}
        >
          <LogoIcon
            variant="trident-only"
            background="transparent"
            showShield={false}
            showParticles={false}
          />
        </div>

        {/* Brand name and tagline */}
        <div style={{ opacity: taglineOpacity, textAlign: 'center' }}>
          <CinematicText
            delay={65}
            size={60}
            glowColor={theme.accent.cyan}
          >
            {copy.brandName}
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
            {copy.tagline}
          </div>
        </div>
      </AbsoluteFill>
    </ShotTransition>
  );
};
