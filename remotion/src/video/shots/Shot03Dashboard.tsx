import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { theme } from '../../shared/theme';
import { ShotTransition } from '../../shared/animation/ShotTransition';
import { CameraController, CameraEasing } from '../../shared/camera/CameraController';
import { CinematicFocus, MetricHierarchy, TrackedAnnotation } from '../../shared/cinematic';
import { AnimatedChartLine } from '../../shared/live-ui/AnimatedChart';
import { AnimatedEnginePill, AnimatedCardReveal, PulsingButton, BlinkingBadge } from '../../shared/live-ui/AnimatedUI';
import { GlassRefraction } from '../../shared/cinematic';
import { getVideoLayoutStyles, type VideoLayoutMode } from '../layout/VideoLayout';
import { SHOTS } from '../config';

interface Shot03DashboardProps {
  layout?: VideoLayoutMode;
}

export const Shot03Dashboard: React.FC<Shot03DashboardProps> = ({ layout = 'landscape' }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { safeArea, scaledSafeArea } = getVideoLayoutStyles(layout);
  const containerStyle = layout === 'portrait' ? scaledSafeArea : safeArea;

  const zoomProgress = spring({ frame: frame - 20, fps, config: { damping: 15, stiffness: 60 } });
  const currentZoom = interpolate(zoomProgress, [0, 1], [0.6, 1.15]);

  const chartData = [1200, 1320, 1180, 1460, 1550, 1480, 1620];

  return (
    <ShotTransition durationInFrames={SHOTS.shot3.duration} enterType="zoom-through" exitType="push" enterDuration={12} exitDuration={10}>
      <CameraController
        keyframes={[
          { frame: 0, scale: 0.6, x: 0, y: 0 },
          { frame: 20, scale: 0.6, x: 0, y: 0 },
          { frame: 60, scale: 1.15, x: 12, y: -8, easing: CameraEasing.zoomIn },
          { frame: 110, scale: 1.15, x: 12, y: -8 },
          { frame: 140, scale: 0.65, x: 0, y: 0, easing: CameraEasing.zoomOut },
        ]}
      >
        <CinematicFocus focusTarget={{ x: 55, y: 40 }} focusRadius={350} blurAmount={8} delay={50} vignette>
          <AbsoluteFill style={{ background: theme.backgroundGradient, color: 'white', fontFamily: theme.typography.fontUi }}>
            <div style={{ ...containerStyle, display: 'block' }}>
              <AnimatedCardReveal delay={5}>
                <div style={{ fontSize: 28, fontWeight: 600, marginBottom: 20 }}>Dashboard: Unified Financial Command</div>
              </AnimatedCardReveal>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, height: 'calc(100% - 60px)' }}>
                <AnimatedCardReveal delay={10} direction="up">
                  <GlassRefraction intensity={0.5} glowColor={theme.accent.cyan} borderRadius={20}>
                    <div style={{ padding: 24 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                        <div style={{ fontSize: 22, fontWeight: 600 }}>System Pulse</div>
                        <BlinkingBadge color={theme.accent.teal} delay={25}>GOVERN-VERIFIED</BlinkingBadge>
                      </div>

                      <MetricHierarchy
                        primary={{ label: 'Net Worth', value: '$142k', color: theme.accent.cyan }}
                        supporting={[
                          { label: 'Cash Flow', value: '+$1,240', color: theme.accent.teal },
                          { label: 'Alerts', value: '2', color: theme.accent.red },
                        ]}
                        details={[
                          { label: 'Monthly Growth', value: '+2.4%' },
                          { label: 'Savings Rate', value: '23%' },
                        ]}
                        zoomLevel={currentZoom}
                        delay={30}
                      />

                      <div style={{ marginTop: 20 }}>
                        <AnimatedChartLine
                          data={chartData}
                          width={550}
                          height={140}
                          color={theme.accent.cyan}
                          delay={40}
                          drawDuration={50}
                          showDotGrid
                        />
                      </div>

                      <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                        <AnimatedEnginePill engine="Protect" delay={85} active />
                        <AnimatedEnginePill engine="Grow" delay={90} active />
                        <AnimatedEnginePill engine="Execute" delay={95} active />
                        <AnimatedEnginePill engine="Govern" delay={100} active />
                      </div>
                    </div>
                  </GlassRefraction>
                </AnimatedCardReveal>

                <AnimatedCardReveal delay={15} direction="right">
                  <GlassRefraction intensity={0.4} glowColor={theme.accent.violet} borderRadius={20}>
                    <div style={{ padding: 20 }}>
                      <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>AI Insight</div>
                      <div style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.5, fontSize: 14 }}>
                        Subscriptions increased 8% this month. Triton recommends consolidating services.
                      </div>
                      <div style={{ marginTop: 16 }}>
                        <PulsingButton color={theme.accent.teal} delay={60}>
                          Review Plan
                        </PulsingButton>
                      </div>
                    </div>
                  </GlassRefraction>
                </AnimatedCardReveal>
              </div>
            </div>
          </AbsoluteFill>
        </CinematicFocus>
      </CameraController>

      <TrackedAnnotation
        text="Real-time financial pulse"
        target={{ x: 35, y: 35 }}
        label="SYSTEM PULSE"
        color={theme.accent.cyan}
        delay={70}
        position="top"
      />
    </ShotTransition>
  );
};
