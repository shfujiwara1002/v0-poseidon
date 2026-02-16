/**
 * Shot 03: Solution Overview / Dashboard
 * Duration: 7 seconds (330-540 frames)
 * Purpose: Showcase unified AI backbone - 4 engines working together
 *
 * "Detect. Forecast. Act. Explain."
 */

import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { theme } from '../../../shared/theme';
import { ShotTransition } from '../../../shared/animation/ShotTransition';
import { MetricHierarchy } from '../../../shared/cinematic';
import { AnimatedChartLine } from '../../../shared/live-ui/AnimatedChart';
import { AnimatedEnginePill, AnimatedCardReveal, BlinkingBadge } from '../../../shared/live-ui/AnimatedUI';
import { GlassRefraction } from '../../../shared/cinematic';
import { CinematicText, AnimatedText } from '../../../shared/animation/AnimatedText';
import { FloatingParticles } from '../../../shared/effects/FloatingParticles';
import { getVideoLayoutStyles, type VideoLayoutMode } from '../../layout/VideoLayout';
import { SHOTS } from '../config';
import { poseidonIntroCopy } from '../copy';

interface Shot03DashboardProps {
  layout?: VideoLayoutMode;
}

export const Shot03Dashboard: React.FC<Shot03DashboardProps> = ({ layout = 'landscape' }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { safeArea, scaledSafeArea } = getVideoLayoutStyles(layout);
  const containerStyle = layout === 'portrait' ? scaledSafeArea : safeArea;

  const copy = poseidonIntroCopy.shot3;

  // Camera zoom progress - simplified
  const zoomProgress = spring({
    frame: frame - 30,
    fps,
    config: { damping: 18, stiffness: 50 },
  });
  const currentZoom = interpolate(zoomProgress, [0, 1], [0.9, 1.0]);

  // Sample chart data (7-day forecast)
  const chartData = [1200, 1320, 1180, 1460, 1550, 1480, 1620];

  // Flow text colors mapping to engines
  const flowColors = [
    theme.accent.teal,   // Detect - PROTECT
    theme.accent.violet, // Forecast - GROW
    theme.accent.gold,   // Act - EXECUTE
    theme.accent.blue,   // Explain - GOVERN
  ];

  return (
    <ShotTransition
      durationInFrames={SHOTS.shot3.duration}
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
        {/* Floating particles - reduced */}
        <FloatingParticles
          count={15}
          colors={[theme.accent.cyan, theme.accent.violet]}
          sizeRange={[2, 4]}
          speed={0.2}
          glow
          opacityRange={[0.08, 0.2]}
        />

            <div style={{ ...containerStyle, display: 'block' }}>
              {/* Section header */}
              <AnimatedCardReveal delay={5}>
                <div style={{ marginBottom: 20 }}>
                  <CinematicText delay={0} size={42} glowColor={theme.accent.cyan}>
                    {copy.headline}
                  </CinematicText>
                </div>
              </AnimatedCardReveal>

              {/* Flow text: Detect. Forecast. Act. Explain. */}
              <AnimatedCardReveal delay={15}>
                <div
                  style={{
                    display: 'flex',
                    gap: 24,
                    marginBottom: 32,
                    justifyContent: 'center',
                  }}
                >
                  {copy.flowText.map((word, i) => (
                    <AnimatedText
                      key={word}
                      mode="char"
                      delay={20 + i * 8}
                      stagger={2}
                      variant="glow-reveal"
                      glowColor={flowColors[i]}
                      style={{
                        fontSize: 32,
                        fontWeight: 700,
                        color: flowColors[i],
                        fontFamily: theme.typography.fontHeader,
                        textShadow: `0 0 30px ${flowColors[i]}88`,
                      }}
                    >
                      {`${word}.`}
                    </AnimatedText>
                  ))}
                </div>
              </AnimatedCardReveal>

              {/* Dashboard grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: layout === 'portrait' ? '1fr' : '2fr 1fr',
                  gap: 24,
                  height: 'calc(100% - 160px)',
                }}
              >
                {/* Main panel - System Pulse - muted */}
                <AnimatedCardReveal delay={25} direction="up">
                  <GlassRefraction
                    intensity={0.3}
                    glowColor={theme.accent.cyan}
                    borderRadius={20}
                  >
                    <div style={{ padding: 24 }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: 16,
                        }}
                      >
                        <div style={{ fontSize: 20, fontWeight: 600 }}>
                          Unified Financial Command
                        </div>
                        <BlinkingBadge color={theme.accent.teal} delay={35}>
                          AI-COORDINATED
                        </BlinkingBadge>
                      </div>

                      {/* Metrics */}
                      <MetricHierarchy
                        primary={{
                          label: 'Net Worth',
                          value: '$142,680',
                          color: theme.accent.cyan,
                        }}
                        supporting={[
                          { label: '7-Day Forecast', value: '+$1,240', color: theme.accent.violet },
                          { label: 'Alerts', value: '0', color: theme.accent.teal },
                        ]}
                        details={[
                          { label: 'Monthly Growth', value: '+2.4%' },
                          { label: 'Savings Rate', value: '23%' },
                        ]}
                        zoomLevel={currentZoom}
                        delay={40}
                      />

                      {/* Chart */}
                      <div style={{ marginTop: 20 }}>
                        <AnimatedChartLine
                          data={chartData}
                          width={layout === 'portrait' ? 400 : 550}
                          height={120}
                          color={theme.accent.cyan}
                          delay={50}
                          drawDuration={50}
                          showDotGrid
                          showConfidenceBand
                          glow
                        />
                      </div>

                      {/* Engine pills */}
                      <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                        <AnimatedEnginePill engine="Protect" delay={100} active />
                        <AnimatedEnginePill engine="Grow" delay={110} active />
                        <AnimatedEnginePill engine="Execute" delay={120} active />
                        <AnimatedEnginePill engine="Govern" delay={130} active />
                      </div>
                    </div>
                  </GlassRefraction>
                </AnimatedCardReveal>

                {/* Side panel - Feature bullets - muted */}
                <AnimatedCardReveal delay={35} direction="right">
                  <GlassRefraction
                    intensity={0.25}
                    glowColor={theme.accent.violet}
                    borderRadius={20}
                  >
                    <div style={{ padding: 20 }}>
                      <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>
                        Key Capabilities
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 12,
                        }}
                      >
                        {copy.bullets.map((bullet, i) => (
                          <AnimatedText
                            key={bullet}
                            mode="word"
                            delay={60 + i * 10}
                            stagger={2}
                            variant="fade-up"
                            style={{
                              fontSize: 14,
                              color: 'rgba(255,255,255,0.8)',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 8,
                            }}
                          >
                            {`● ${bullet}`}
                          </AnimatedText>
                        ))}
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
