/**
 * Shot 02: Problem Statement
 * Duration: 6 seconds (150-330 frames)
 * Purpose: Establish pain point - $24B coordination gap
 *
 * "Consumers are forced to be their own financial integrators."
 */

import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { theme } from '../../../shared/theme';
import { ShotTransition } from '../../../shared/animation/ShotTransition';
import { AnimatedText, CinematicText } from '../../../shared/animation/AnimatedText';
import { GlassRefraction } from '../../../shared/cinematic';
import { BlinkingBadge } from '../../../shared/live-ui/AnimatedUI';
import { getVideoLayoutStyles, type VideoLayoutMode } from '../../layout/VideoLayout';
import { SHOTS } from '../config';
import { poseidonIntroCopy } from '../copy';

interface Shot02ProblemProps {
  layout?: VideoLayoutMode;
}

export const Shot02Problem: React.FC<Shot02ProblemProps> = ({ layout = 'landscape' }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { safeArea, scaledSafeArea } = getVideoLayoutStyles(layout);
  const containerStyle = layout === 'portrait' ? scaledSafeArea : safeArea;

  const copy = poseidonIntroCopy.shot2;

  // Statistic counter animation
  const statReveal = spring({
    frame: frame - 40,
    fps,
    config: { damping: 18, stiffness: 60 },
  });

  const statScale = interpolate(statReveal, [0, 1], [1.1, 1]);
  const statOpacity = interpolate(statReveal, [0, 0.3, 1], [0, 1, 1]);

  return (
    <ShotTransition
      durationInFrames={SHOTS.shot2.duration}
      enterType="fade"
      exitType="fade"
      enterDuration={18}
      exitDuration={14}
    >
      <AbsoluteFill
        style={{
          ...containerStyle,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 24,
        }}
      >

        {/* Section label */}
        <AnimatedText
          mode="word"
          delay={0}
          stagger={4}
          variant="glow-reveal"
          glowColor={theme.accent.red}
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: 'rgba(255,100,100,0.9)',
            fontFamily: theme.typography.fontUi,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          THE PROBLEM
        </AnimatedText>

        {/* Main headline */}
        <AnimatedText
          mode="word"
          delay={12}
          stagger={4}
          variant="snap"
          style={{
            fontSize: layout === 'portrait' ? 42 : 52,
            fontWeight: 700,
            color: '#fff',
            fontFamily: theme.typography.fontHeader,
            textAlign: 'center',
            maxWidth: 1000,
            lineHeight: 1.25,
          }}
        >
          {copy.headline}
        </AnimatedText>

        {/* Statistic card - muted for comfort */}
        <div style={{ marginTop: 32 }}>
          <GlassRefraction
            intensity={0.25}
            glowColor={theme.accent.amber}
            borderRadius={24}
          >
            <div
              style={{
                padding: '40px 64px',
                textAlign: 'center',
                opacity: statOpacity,
                transform: `scale(${statScale})`,
              }}
            >
              {/* Big statistic */}
              <CinematicText
                delay={40}
                size={96}
                glowColor={theme.accent.red}
              >
                {copy.statistic}
              </CinematicText>

              {/* Statistic label */}
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.8)',
                  fontFamily: theme.typography.fontUi,
                  marginTop: 8,
                }}
              >
                {copy.statisticLabel}
              </div>

              {/* Alert badge */}
              <div style={{ marginTop: 20 }}>
                <BlinkingBadge color={theme.accent.red} delay={60}>
                  COORDINATION FAILURE
                </BlinkingBadge>
              </div>
            </div>
          </GlassRefraction>
        </div>

        {/* Subtext */}
        <AnimatedText
          mode="word"
          delay={80}
          stagger={3}
          variant="fade-up"
          style={{
            fontSize: 22,
            color: 'rgba(255,255,255,0.6)',
            fontFamily: theme.typography.fontUi,
            marginTop: 24,
          }}
        >
          {copy.subtext}
        </AnimatedText>
      </AbsoluteFill>
    </ShotTransition>
  );
};
