import React from 'react';
import { AbsoluteFill } from 'remotion';
import { ShotTransition } from '../../../shared/animation/ShotTransition';
import { CameraController, CameraEasing } from '../../../shared/camera/CameraController';
import { AnimatedAuditLog } from '../../../shared/live-ui/AnimatedList';
import { AnimatedCardReveal, AnimatedEnginePill } from '../../../shared/live-ui/AnimatedUI';
import { GlassRefraction, TrackedAnnotation } from '../../../shared/cinematic';
import { theme } from '../../../shared/theme';
import { copy } from '../../../shared/copy';
import { getVideoLayoutStyles, type VideoLayoutMode } from '../../layout/VideoLayout';
import { V5_SHOTS } from '../config';

interface Shot05AssuranceProps {
  layout?: VideoLayoutMode;
}

export const Shot05Assurance: React.FC<Shot05AssuranceProps> = ({ layout = 'landscape' }) => {
  const { safeArea, scaledSafeArea } = getVideoLayoutStyles(layout);
  const containerStyle = layout === 'portrait' ? scaledSafeArea : safeArea;

  return (
    <ShotTransition durationInFrames={V5_SHOTS.shot5.duration} enterType="push" exitType="fade" enterDuration={12} exitDuration={10}>
      <CameraController
        keyframes={[
          { frame: 0, scale: 0.7, x: 0, y: 0 },
          { frame: 45, scale: 1.1, x: -10, y: 8, easing: CameraEasing.zoomIn },
          { frame: 120, scale: 1.1, x: -10, y: 8 },
          { frame: 140, scale: 0.75, x: 0, y: 0, easing: CameraEasing.zoomOut },
        ]}
      >
        <AbsoluteFill style={{ background: theme.backgroundGradient, color: 'white', fontFamily: theme.typography.fontUi }}>
          <div style={{ ...containerStyle, display: 'block' }}>
            <AnimatedCardReveal delay={6}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                <div style={{ fontSize: 26, fontWeight: 600 }}>{copy.videoV5.shot5.headline}</div>
                <AnimatedEnginePill engine="Govern" delay={10} active />
              </div>
            </AnimatedCardReveal>

            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24, height: 'calc(100% - 60px)' }}>
              <AnimatedCardReveal delay={10} direction="up">
                <GlassRefraction intensity={0.5} glowColor={theme.accent.amber} borderRadius={20}>
                  <div style={{ padding: 20 }}>
                    <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>
                      {copy.videoV5.shot5.panelTitle}
                    </div>
                    <AnimatedAuditLog entries={copy.videoV5.shot5.auditEntries} delay={35} stagger={15} />
                  </div>
                </GlassRefraction>
              </AnimatedCardReveal>

              <AnimatedCardReveal delay={16} direction="right">
                <GlassRefraction intensity={0.45} glowColor={theme.accent.cyan} borderRadius={20}>
                  <div style={{ padding: 20 }}>
                    <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>
                      {copy.videoV5.shot5.sideTitle}
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, fontSize: 14 }}>
                      {copy.videoV5.shot5.sideBody}
                    </div>
                  </div>
                </GlassRefraction>
              </AnimatedCardReveal>
            </div>
          </div>
        </AbsoluteFill>
      </CameraController>

      <TrackedAnnotation
        text={copy.videoV5.shot5.annotation.text}
        target={copy.videoV5.shot5.annotation.target}
        label={copy.videoV5.shot5.annotation.label}
        color={theme.accent.amber}
        delay={75}
        position="left"
      />
    </ShotTransition>
  );
};
