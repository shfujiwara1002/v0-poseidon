import React from 'react';
import { AbsoluteFill } from 'remotion';
import { ShotTransition } from '../../../shared/animation/ShotTransition';
import { CameraController, CameraEasing } from '../../../shared/camera/CameraController';
import { AnimatedChartLine } from '../../../shared/live-ui/AnimatedChart';
import { AnimatedCardReveal, AnimatedEnginePill, PulsingButton } from '../../../shared/live-ui/AnimatedUI';
import { MetricHierarchy, TrackedAnnotation } from '../../../shared/cinematic';
import { GlassRefraction } from '../../../shared/cinematic';
import { theme } from '../../../shared/theme';
import { copy } from '../../../shared/copy';
import { getVideoLayoutStyles, type VideoLayoutMode } from '../../layout/VideoLayout';
import { V5_SHOTS } from '../config';

interface Shot03ClarityProps {
  layout?: VideoLayoutMode;
}

export const Shot03Clarity: React.FC<Shot03ClarityProps> = ({ layout = 'landscape' }) => {
  const { safeArea, scaledSafeArea } = getVideoLayoutStyles(layout);
  const containerStyle = layout === 'portrait' ? scaledSafeArea : safeArea;

  const chartData = [1280, 1320, 1405, 1490, 1580, 1710, 1820];

  return (
    <ShotTransition durationInFrames={V5_SHOTS.shot3.duration} enterType="zoom-through" exitType="push" enterDuration={12} exitDuration={10}>
      <CameraController
        keyframes={[
          { frame: 0, scale: 0.7, x: 0, y: 0 },
          { frame: 40, scale: 1.1, x: 12, y: -8, easing: CameraEasing.zoomIn },
          { frame: 110, scale: 1.1, x: 12, y: -8 },
          { frame: 140, scale: 0.72, x: 0, y: 0, easing: CameraEasing.zoomOut },
        ]}
      >
        <AbsoluteFill style={{ background: theme.backgroundGradient, color: 'white', fontFamily: theme.typography.fontUi }}>
          <div style={{ ...containerStyle, display: 'block' }}>
            <AnimatedCardReveal delay={5}>
              <div style={{ fontSize: 26, fontWeight: 600, marginBottom: 18 }}>
                {copy.videoV5.shot3.headline}
              </div>
            </AnimatedCardReveal>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, height: 'calc(100% - 60px)' }}>
              <AnimatedCardReveal delay={10} direction="up">
                <GlassRefraction intensity={0.5} glowColor={theme.accent.cyan} borderRadius={20}>
                  <div style={{ padding: 24 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                      <div style={{ fontSize: 20, fontWeight: 600 }}>{copy.videoV5.shot3.panelTitle}</div>
                      <AnimatedEnginePill engine="Govern" delay={24} active />
                    </div>

                    <MetricHierarchy
                      primary={{ label: copy.videoV5.shot3.primary.label, value: copy.videoV5.shot3.primary.value, color: theme.accent.cyan }}
                      supporting={copy.videoV5.shot3.supporting.map((item) => ({
                        label: item.label,
                        value: item.value,
                        color: theme.accent.teal,
                      }))}
                      details={copy.videoV5.shot3.details}
                      zoomLevel={1.1}
                      delay={25}
                    />

                    <div style={{ marginTop: 20 }}>
                      <AnimatedChartLine
                        data={chartData}
                        width={560}
                        height={140}
                        color={theme.accent.cyan}
                        delay={35}
                        drawDuration={50}
                        showDotGrid
                      />
                    </div>
                  </div>
                </GlassRefraction>
              </AnimatedCardReveal>

              <AnimatedCardReveal delay={16} direction="right">
                <GlassRefraction intensity={0.45} glowColor={theme.accent.violet} borderRadius={20}>
                  <div style={{ padding: 20 }}>
                    <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>
                      {copy.videoV5.shot3.sideTitle}
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, fontSize: 14 }}>
                      {copy.videoV5.shot3.sideBody}
                    </div>
                    <div style={{ marginTop: 18 }}>
                      <PulsingButton color={theme.accent.teal} delay={55}>
                        {copy.videoV5.shot3.sideCta}
                      </PulsingButton>
                    </div>
                  </div>
                </GlassRefraction>
              </AnimatedCardReveal>
            </div>
          </div>
        </AbsoluteFill>
      </CameraController>

      <TrackedAnnotation
        text={copy.videoV5.shot3.annotation.text}
        target={copy.videoV5.shot3.annotation.target}
        label={copy.videoV5.shot3.annotation.label}
        color={theme.accent.cyan}
        delay={70}
        position="top"
      />
    </ShotTransition>
  );
};
