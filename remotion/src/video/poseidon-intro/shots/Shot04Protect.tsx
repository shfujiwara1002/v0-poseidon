/**
 * Shot 04: PROTECT Engine
 * Duration: 7 seconds (540-750 frames)
 * Purpose: Demonstrate personalized fraud detection - 99.7% accuracy
 *
 * "Personalized ML on YOUR behavior—not generic rules."
 */

import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { theme } from '../../../shared/theme';
import { ShotTransition } from '../../../shared/animation/ShotTransition';
import { AnimatedFactorBars, AnimatedStat } from '../../../shared/live-ui/AnimatedProgress';
import { AnimatedEnginePill, AnimatedCardReveal, BlinkingBadge } from '../../../shared/live-ui/AnimatedUI';
import { GlassRefraction } from '../../../shared/cinematic';
import { CinematicText, AnimatedText } from '../../../shared/animation/AnimatedText';
import { SlideIcon } from '../../../shared/SlideIcon';
import { getVideoLayoutStyles, type VideoLayoutMode } from '../../layout/VideoLayout';
import { SHOTS } from '../config';
import { poseidonIntroCopy } from '../copy';

// Mutable copy of anomaly factors for AnimatedFactorBars
const anomalyFactors = [
  { label: 'Location: 2,400 miles from home', value: 0.85, color: '#EF4444' },
  { label: 'Category: First in 6 months', value: 0.72, color: '#F59E0B' },
  { label: 'Time: 3:42 AM local', value: 0.68, color: '#EF4444' },
];

interface Shot04ProtectProps {
  layout?: VideoLayoutMode;
}

export const Shot04Protect: React.FC<Shot04ProtectProps> = ({ layout = 'landscape' }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { safeArea, scaledSafeArea } = getVideoLayoutStyles(layout);
  const containerStyle = layout === 'portrait' ? scaledSafeArea : safeArea;

  const copy = poseidonIntroCopy.shot4;

  // Confidence ring animation - slower for longer shot
  const confidenceReveal = spring({
    frame: frame - 80,
    fps,
    config: { damping: 15, stiffness: 60 },
  });

  const confidenceProgress = interpolate(confidenceReveal, [0, 1], [0, 94]);

  return (
    <ShotTransition
      durationInFrames={SHOTS.shot4.duration}
      enterType="fade"
      exitType="fade"
      enterDuration={16}
      exitDuration={14}
    >
      <AbsoluteFill
        style={{
          background: theme.backgroundGradient,
          color: 'white',
          fontFamily: theme.typography.fontUi,
        }}
      >
        <div style={{ ...containerStyle, display: 'block' }}>
          {/* Header with engine name */}
          <AnimatedCardReveal delay={10}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                marginBottom: 24,
              }}
            >
              <SlideIcon name="shield" size={40} glowColor="teal" />
              <CinematicText delay={5} size={48} glowColor={theme.accent.teal}>
                {copy.engineName}
              </CinematicText>
              <AnimatedEnginePill engine="Protect" delay={15} active />
            </div>
          </AnimatedCardReveal>

          {/* Main grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: layout === 'portrait' ? '1fr' : '1.2fr 1fr',
              gap: 24,
              height: 'calc(100% - 80px)',
            }}
          >
            {/* Left: Transaction alert card - muted colors for comfort */}
            <AnimatedCardReveal delay={20} direction="up">
              <GlassRefraction
                intensity={0.25}
                glowColor={theme.accent.teal}
                borderRadius={20}
              >
                <div style={{ padding: 24 }}>
                  {/* Alert header */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: 20,
                    }}
                  >
                    <BlinkingBadge color={theme.accent.red} delay={25}>
                      ANOMALY DETECTED
                    </BlinkingBadge>
                  </div>

                  {/* Transaction details - muted background */}
                  <div
                    style={{
                      background: 'rgba(239,68,68,0.05)',
                      borderRadius: 12,
                      padding: 16,
                      marginBottom: 20,
                      border: '1px solid rgba(239,68,68,0.15)',
                    }}
                  >
                    <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>
                      Transaction
                    </div>
                    <div
                      style={{
                        fontSize: 28,
                        fontWeight: 700,
                        color: theme.accent.red,
                        marginTop: 4,
                      }}
                    >
                      {copy.transactionAmount}
                    </div>
                    <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)', marginTop: 4 }}>
                      {copy.transactionMerchant}
                    </div>
                  </div>

                  {/* Key stats */}
                  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                    <AnimatedStat
                      label="Accuracy"
                      value={copy.stat}
                      subtext={copy.statLabel}
                      color={theme.accent.teal}
                      delay={50}
                    />
                    <AnimatedStat
                      label="Latency"
                      value="<100ms"
                      subtext="Detection"
                      color={theme.accent.cyan}
                      delay={60}
                    />
                  </div>
                </div>
              </GlassRefraction>
            </AnimatedCardReveal>

            {/* Right: SHAP explanation - muted */}
            <AnimatedCardReveal delay={35} direction="right">
              <GlassRefraction
                intensity={0.25}
                glowColor={theme.accent.cyan}
                borderRadius={20}
              >
                <div style={{ padding: 24 }}>
                  <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>
                    Why Flagged?
                  </div>
                  <AnimatedText
                    mode="word"
                    delay={40}
                    stagger={2}
                    variant="fade-up"
                    style={{
                      fontSize: 14,
                      color: 'rgba(255,255,255,0.7)',
                      marginBottom: 20,
                    }}
                  >
                    {copy.description}
                  </AnimatedText>

                  {/* Factor bars */}
                  <AnimatedFactorBars
                    factors={anomalyFactors}
                    delay={70}
                    stagger={15}
                    width={layout === 'portrait' ? 280 : 320}
                  />

                  {/* Confidence indicator */}
                  <div
                    style={{
                      marginTop: 24,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                    }}
                  >
                    {/* Confidence ring - muted glow */}
                    <div
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        background: `conic-gradient(
                          ${theme.accent.amber} ${confidenceProgress * 3.6}deg,
                          rgba(255,255,255,0.08) ${confidenceProgress * 3.6}deg
                        )`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: `0 0 12px ${theme.accent.amber}22`,
                      }}
                    >
                      <div
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: '50%',
                          background: theme.background.deepNavy,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 18,
                          fontWeight: 700,
                          color: theme.accent.amber,
                        }}
                      >
                        {Math.round(confidenceProgress)}%
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 600 }}>
                        {copy.confidence} Confidence
                      </div>
                      <div
                        style={{
                          fontSize: 14,
                          color: theme.accent.red,
                          fontWeight: 600,
                        }}
                      >
                        {copy.confidenceLabel}
                      </div>
                    </div>
                  </div>
                </div>
              </GlassRefraction>
            </AnimatedCardReveal>
          </div>
        </div>
      </AbsoluteFill>
    </ShotTransition>
  );
};
