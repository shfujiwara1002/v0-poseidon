import React from 'react';
import { AbsoluteFill } from 'remotion';
import { theme } from '../../shared/theme';
import { ShotTransition } from '../../shared/animation/ShotTransition';
import { CameraController, CameraEasing } from '../../shared/camera/CameraController';
import { CinematicFocus, TrackedAnnotation, MetricHierarchy } from '../../shared/cinematic';
import { AnimatedAuditLog } from '../../shared/live-ui/AnimatedList';
import { AnimatedEnginePill, AnimatedCardReveal, BlinkingBadge } from '../../shared/live-ui/AnimatedUI';
import { GlassRefraction } from '../../shared/cinematic';
import { getVideoLayoutStyles, type VideoLayoutMode } from '../layout/VideoLayout';
import { SHOTS } from '../config';

interface Shot05GovernProps {
  layout?: VideoLayoutMode;
}

export const Shot05Govern: React.FC<Shot05GovernProps> = ({ layout = 'landscape' }) => {
  const { safeArea, scaledSafeArea } = getVideoLayoutStyles(layout);
  const containerStyle = layout === 'portrait' ? scaledSafeArea : safeArea;

  const auditEntries = [
    { id: 'G‑PF‑0192', engine: 'Protect' as const, action: 'Flag unauthorized transfer', time: '02:14', status: 'Open' },
    { id: 'G‑GR‑0821', engine: 'Grow' as const, action: 'Update forecast drivers', time: '08:32', status: 'Reviewed' },
    { id: 'G‑EX‑0417', engine: 'Execute' as const, action: 'Approve bill negotiation', time: '09:05', status: 'Approved' },
  ];

  return (
    <ShotTransition durationInFrames={SHOTS.shot5.duration} enterType="blur-zoom" exitType="zoom-through" enterDuration={12} exitDuration={10}>
      <CameraController
        keyframes={[
          { frame: 0, scale: 0.6, x: 0, y: 0 },
          { frame: 20, scale: 0.6, x: 0, y: 0 },
          { frame: 60, scale: 1.1, x: -8, y: 10, easing: CameraEasing.zoomIn },
          { frame: 110, scale: 1.1, x: -8, y: 10 },
          { frame: 140, scale: 0.65, x: 0, y: 0, easing: CameraEasing.zoomOut },
        ]}
      >
        <CinematicFocus focusTarget={{ x: 40, y: 60 }} focusRadius={350} blurAmount={8} delay={50} vignette>
          <AbsoluteFill style={{ background: theme.backgroundGradient, color: 'white', fontFamily: theme.typography.fontUi }}>
            <div style={{ ...containerStyle, display: 'block' }}>
              <AnimatedCardReveal delay={5}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                  <div style={{ fontSize: 28, fontWeight: 600 }}>Govern 2.0: Trust by Design</div>
                  <AnimatedEnginePill engine="Govern" delay={10} active />
                </div>
              </AnimatedCardReveal>

              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 24, height: 'calc(100% - 60px)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <AnimatedCardReveal delay={10} direction="up">
                    <GlassRefraction intensity={0.5} glowColor={theme.accent.amber} borderRadius={20}>
                      <div style={{ padding: 20 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                          <div style={{ fontSize: 18, fontWeight: 600 }}>Trust Index</div>
                          <BlinkingBadge color={theme.accent.amber} delay={20}>GOVERN</BlinkingBadge>
                        </div>
                        <MetricHierarchy
                          primary={{ label: 'Score', value: '92', color: theme.accent.cyan }}
                          supporting={[
                            { label: 'Transparency', value: '96%', color: theme.accent.teal },
                            { label: 'Coverage', value: '98%', color: theme.accent.blue },
                          ]}
                          zoomLevel={1}
                          delay={25}
                        />
                      </div>
                    </GlassRefraction>
                  </AnimatedCardReveal>

                  <AnimatedCardReveal delay={15} direction="up">
                    <GlassRefraction intensity={0.5} glowColor={theme.accent.cyan} borderRadius={20}>
                      <div style={{ padding: 20 }}>
                        <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>Audit Ledger</div>
                        <AnimatedAuditLog entries={auditEntries} delay={55} stagger={15} />
                      </div>
                    </GlassRefraction>
                  </AnimatedCardReveal>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <AnimatedCardReveal delay={20} direction="right">
                    <GlassRefraction intensity={0.4} glowColor={theme.accent.violet} borderRadius={20}>
                      <div style={{ padding: 18 }}>
                        <div style={{ fontSize: 16, fontWeight: 600 }}>Policy Compliance</div>
                        <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
                          <AnimatedCardReveal delay={85}>
                            <div style={{ padding: '6px 12px', borderRadius: 8, background: `${theme.accent.cyan}22`, border: `1px solid ${theme.accent.cyan}55`, fontSize: 12, fontWeight: 600, color: theme.accent.cyan }}>EU AI Act</div>
                          </AnimatedCardReveal>
                          <AnimatedCardReveal delay={92}>
                            <div style={{ padding: '6px 12px', borderRadius: 8, background: `${theme.accent.amber}22`, border: `1px solid ${theme.accent.amber}55`, fontSize: 12, fontWeight: 600, color: theme.accent.amber }}>CFPB</div>
                          </AnimatedCardReveal>
                        </div>
                      </div>
                    </GlassRefraction>
                  </AnimatedCardReveal>
                </div>
              </div>
            </div>
          </AbsoluteFill>
        </CinematicFocus>
      </CameraController>

      <TrackedAnnotation
        text="Immutable audit trail"
        target={{ x: 35, y: 65 }}
        label="AUDIT LEDGER"
        color={theme.accent.amber}
        delay={70}
        position="left"
      />
    </ShotTransition>
  );
};
