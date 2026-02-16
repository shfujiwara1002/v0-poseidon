import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { theme } from '../../shared/theme';
import { ShotTransition } from '../../shared/animation/ShotTransition';
import { CameraController, CameraEasing } from '../../shared/camera/CameraController';
import { CinematicFocus, DataCallout, SparkBurst } from '../../shared/cinematic';
import { AnimatedFactorBars, AnimatedStat } from '../../shared/live-ui/AnimatedProgress';
import { AnimatedEnginePill, AnimatedCardReveal, BlinkingBadge, PulsingButton, ShakeElement } from '../../shared/live-ui/AnimatedUI';
import { GlassRefraction } from '../../shared/cinematic';
import { SlideIcon } from '../../shared/SlideIcon';
import { getVideoLayoutStyles, type VideoLayoutMode } from '../layout/VideoLayout';
import { SHOTS } from '../config';

interface Shot04ProtectProps {
  layout?: VideoLayoutMode;
}

export const Shot04Protect: React.FC<Shot04ProtectProps> = ({ layout = 'landscape' }) => {
  const frame = useCurrentFrame();
  const { safeArea, scaledSafeArea } = getVideoLayoutStyles(layout);
  const containerStyle = layout === 'portrait' ? scaledSafeArea : safeArea;


  const factors = [
    { label: 'Location mismatch', value: 0.86, color: theme.accent.red },
    { label: 'New merchant type', value: 0.72, color: theme.accent.amber },
    { label: 'Unusual time', value: 0.58, color: theme.accent.cyan },
  ];

  return (
    <ShotTransition durationInFrames={SHOTS.shot4.duration} enterType="push" exitType="blur-zoom" enterDuration={12} exitDuration={10}>
      <CameraController
        keyframes={[
          { frame: 0, scale: 0.6, x: 0, y: 0 },
          { frame: 20, scale: 0.6, x: 0, y: 0 },
          { frame: 60, scale: 1.25, x: 20, y: 5, easing: CameraEasing.zoomIn },
          { frame: 110, scale: 1.25, x: 20, y: 5 },
          { frame: 140, scale: 0.65, x: 0, y: 0, easing: CameraEasing.zoomOut },
        ]}
      >
        <CinematicFocus focusTarget={{ x: 72, y: 50 }} focusRadius={300} blurAmount={10} delay={55} vignette>
          <AbsoluteFill style={{ background: theme.backgroundGradient, color: 'white', fontFamily: theme.typography.fontUi }}>
            <div style={{ ...containerStyle, display: 'block' }}>
              <AnimatedCardReveal delay={5}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                  <div style={{ fontSize: 28, fontWeight: 600 }}>Protect: Real-Time Threat Detection</div>
                  <BlinkingBadge color={theme.accent.red} delay={10}>1 ALERT</BlinkingBadge>
                </div>
              </AnimatedCardReveal>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24, height: 'calc(100% - 60px)' }}>
                <AnimatedCardReveal delay={10} direction="up">
                  <ShakeElement active={frame > 15 && frame < 35} intensity={2}>
                    <GlassRefraction intensity={0.5} glowColor={theme.accent.red} borderRadius={20}>
                      <div style={{ padding: 24 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                          <BlinkingBadge color={theme.accent.red} delay={20}>HIGH RISK</BlinkingBadge>
                          <AnimatedEnginePill engine="Protect" delay={25} active />
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                          <SlideIcon name="shield" size={32} glowColor="red" />
                          <div>
                            <div style={{ fontSize: 20, fontWeight: 600 }}>Possible unauthorized transfer</div>
                            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>Today · 02:14 AM</div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
                          <AnimatedStat label="Amount" value="$1,240" subtext="Unauthorized" color={theme.accent.red} delay={30} />
                          <AnimatedStat label="Risk Score" value="92" subtext="High" color={theme.accent.teal} delay={35} />
                          <AnimatedStat label="Confidence" value="0.86" color={theme.accent.cyan} delay={40} />
                        </div>
                      </div>
                    </GlassRefraction>
                  </ShakeElement>
                </AnimatedCardReveal>

                <AnimatedCardReveal delay={15} direction="right">
                  <GlassRefraction intensity={0.6} glowColor={theme.accent.cyan} borderRadius={20}>
                    <div style={{ padding: 24 }}>
                      <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>Explainability + Actions</div>
                      <div style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.5, marginBottom: 20, fontSize: 14 }}>
                        We flag anomalies in milliseconds and surface the top factors.
                      </div>

                      <AnimatedFactorBars factors={factors} delay={55} stagger={12} width={280} />

                      <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
                        <PulsingButton color={theme.accent.teal} delay={95}>Approve</PulsingButton>
                      </div>
                    </div>
                  </GlassRefraction>
                </AnimatedCardReveal>
              </div>
            </div>
          </AbsoluteFill>
        </CinematicFocus>
      </CameraController>

      <DataCallout value="0.86" label="Confidence" trend="up" trendValue="High" color={theme.accent.cyan} delay={80} position={{ x: 78, y: 55 }} />

      <SparkBurst x={75} y={50} triggerAt={60} count={20} color={theme.accent.cyan} spread={150} />
    </ShotTransition>
  );
};
