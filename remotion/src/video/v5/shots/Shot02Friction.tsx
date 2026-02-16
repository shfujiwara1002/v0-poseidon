import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { ShotTransition } from '../../../shared/animation/ShotTransition';
import { AnimatedText } from '../../../shared/animation/AnimatedText';
import { LightSweep } from '../../../shared/effects/LightSweep';
import { GlassRefraction } from '../../../shared/cinematic';
import { GlowPulse } from '../../../shared/effects/GlowPulse';
import { BlinkingBadge, ShakeElement } from '../../../shared/live-ui/AnimatedUI';
import { theme } from '../../../shared/theme';
import { copy } from '../../../shared/copy';
import { getVideoLayoutStyles, type VideoLayoutMode } from '../../layout/VideoLayout';
import { V5_SHOTS } from '../config';

interface Shot02FrictionProps {
  layout?: VideoLayoutMode;
}

export const Shot02Friction: React.FC<Shot02FrictionProps> = ({ layout = 'landscape' }) => {
  const frame = useCurrentFrame();
  const { safeArea, scaledSafeArea } = getVideoLayoutStyles(layout);
  const containerStyle = layout === 'portrait' ? scaledSafeArea : safeArea;

  return (
    <ShotTransition durationInFrames={V5_SHOTS.shot2.duration} enterType="push" exitType="push" enterDuration={12} exitDuration={10}>
      <AbsoluteFill
        style={{
          ...containerStyle,
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
        }}
      >
        <LightSweep duration={V5_SHOTS.shot2.duration} color="#ff6b6b" intensity={0.2} layers={2} />

        <AnimatedText
          mode="word"
          delay={0}
          stagger={4}
          variant="glow-reveal"
          glowColor={theme.accent.red}
          style={{
            fontSize: 26,
            fontWeight: 600,
            color: 'rgba(255,100,100,0.9)',
            fontFamily: theme.typography.fontUi,
          }}
        >
          {copy.videoV5.shot2.eyebrow}
        </AnimatedText>

        <AnimatedText
          mode="word"
          delay={10}
          stagger={5}
          variant="snap"
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: '#fff',
            fontFamily: theme.typography.fontHeader,
            textAlign: 'center',
            maxWidth: 960,
            lineHeight: 1.1,
          }}
        >
          {copy.videoV5.shot2.headline}
        </AnimatedText>

        <GlowPulse color={theme.accent.red} intensity={0.6} frequency={18}>
          <ShakeElement active={frame > 30 && frame < 90} intensity={3}>
            <GlassRefraction intensity={0.55} glowColor={theme.accent.red} borderRadius={22}>
              <div style={{ padding: '24px 36px', display: 'flex', gap: 20, alignItems: 'center' }}>
                <div style={{ fontSize: 32 }}>⚠️</div>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 600, color: '#fff', fontFamily: theme.typography.fontUi }}>
                    {copy.videoV5.shot2.cardTitle}
                  </div>
                  <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.65)', marginTop: 6, fontFamily: theme.typography.fontUi }}>
                    {copy.videoV5.shot2.cardBody}
                  </div>
                  <div style={{ marginTop: 12 }}>
                    <BlinkingBadge color={theme.accent.red} delay={0}>
                      {copy.videoV5.shot2.badge}
                    </BlinkingBadge>
                  </div>
                </div>
              </div>
            </GlassRefraction>
          </ShakeElement>
        </GlowPulse>
      </AbsoluteFill>
    </ShotTransition>
  );
};
