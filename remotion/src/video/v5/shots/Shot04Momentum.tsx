import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { ShotTransition } from '../../../shared/animation/ShotTransition';
import { AnimatedProgressBar, AnimatedStat } from '../../../shared/live-ui/AnimatedProgress';
import { AnimatedCardReveal, AnimatedEnginePill, PulsingButton } from '../../../shared/live-ui/AnimatedUI';
import { GlassRefraction } from '../../../shared/cinematic';
import { theme } from '../../../shared/theme';
import { copy } from '../../../shared/copy';
import { getVideoLayoutStyles, type VideoLayoutMode } from '../../layout/VideoLayout';
import { V5_SHOTS } from '../config';

interface Shot04MomentumProps {
  layout?: VideoLayoutMode;
}

export const Shot04Momentum: React.FC<Shot04MomentumProps> = ({ layout = 'landscape' }) => {
  const frame = useCurrentFrame();
  const { safeArea, scaledSafeArea } = getVideoLayoutStyles(layout);
  const containerStyle = layout === 'portrait' ? scaledSafeArea : safeArea;

  return (
    <ShotTransition durationInFrames={V5_SHOTS.shot4.duration} enterType="blur-zoom" exitType="zoom-through" enterDuration={12} exitDuration={10}>
      <AbsoluteFill style={{ ...containerStyle, color: 'white', fontFamily: theme.typography.fontUi }}>
        <AnimatedCardReveal delay={5}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <div style={{ fontSize: 28, fontWeight: 600 }}>{copy.videoV5.shot4.headline}</div>
            <AnimatedEnginePill engine="Execute" delay={10} active />
          </div>
        </AnimatedCardReveal>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24, height: 'calc(100% - 60px)' }}>
          <AnimatedCardReveal delay={10} direction="up">
            <GlassRefraction intensity={0.5} glowColor={theme.accent.teal} borderRadius={20}>
              <div style={{ padding: 24 }}>
                <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>{copy.videoV5.shot4.panelTitle}</div>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, marginBottom: 18 }}>
                  {copy.videoV5.shot4.panelBody}
                </div>
                {copy.videoV5.shot4.metrics.map((metric, index) => (
                  <div key={metric.label} style={{ marginBottom: 16 }}>
                    <AnimatedStat
                      label={metric.label}
                      value={metric.value}
                      subtext={metric.subtext}
                      color={metric.color}
                      delay={20 + index * 6}
                    />
                    <AnimatedProgressBar
                      value={metric.progress}
                      delay={26 + index * 6}
                      color={metric.color}
                      height={8}
                    />
                  </div>
                ))}
              </div>
            </GlassRefraction>
          </AnimatedCardReveal>

          <AnimatedCardReveal delay={16} direction="right">
            <GlassRefraction intensity={0.45} glowColor={theme.accent.violet} borderRadius={20}>
              <div style={{ padding: 20 }}>
                <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>{copy.videoV5.shot4.sideTitle}</div>
                <div style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, fontSize: 14 }}>
                  {copy.videoV5.shot4.sideBody}
                </div>
                <div style={{ marginTop: 18 }}>
                  <PulsingButton color={theme.accent.cyan} delay={55}>
                    {copy.videoV5.shot4.sideCta}
                  </PulsingButton>
                </div>
                <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
                  {copy.videoV5.shot4.badges.map((badge) => (
                    <div
                      key={badge}
                      style={{
                        padding: '6px 12px',
                        borderRadius: 10,
                        border: '1px solid rgba(255,255,255,0.2)',
                        fontSize: 12,
                        color: 'rgba(255,255,255,0.7)',
                      }}
                    >
                      {badge}
                    </div>
                  ))}
                </div>
              </div>
            </GlassRefraction>
          </AnimatedCardReveal>
        </div>

        {frame > 120 && (
          <div style={{ position: 'absolute', right: 0, bottom: 0, fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
            {copy.videoV5.shot4.footer}
          </div>
        )}
      </AbsoluteFill>
    </ShotTransition>
  );
};
