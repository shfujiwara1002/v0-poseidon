import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { LightSweep } from '../../shared/effects/LightSweep';
import { ShotTransition } from '../../shared/animation/ShotTransition';
import { AnimatedText } from '../../shared/animation/AnimatedText';
import { GlowPulse } from '../../shared/effects/GlowPulse';
import { GlassRefraction } from '../../shared/cinematic';
import { theme } from '../../shared/theme';
import { getVideoLayoutStyles, type VideoLayoutMode } from '../layout/VideoLayout';
import { SHOTS } from '../config';
import { BlinkingBadge, ShakeElement } from '../../shared/live-ui/AnimatedUI';

interface Shot02ProblemProps {
  layout?: VideoLayoutMode;
}

export const Shot02Problem: React.FC<Shot02ProblemProps> = ({ layout = 'landscape' }) => {
  const frame = useCurrentFrame();
  const { safeArea, scaledSafeArea } = getVideoLayoutStyles(layout);
  const containerStyle = layout === 'portrait' ? scaledSafeArea : safeArea;

  return (
    <ShotTransition durationInFrames={SHOTS.shot2.duration} enterType="push" exitType="push" enterDuration={14} exitDuration={12}>
      <AbsoluteFill
        style={{
          ...containerStyle,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <LightSweep duration={SHOTS.shot2.duration} color="#ff6b6b" intensity={0.25} layers={2} />
        <AnimatedText
          mode="word"
          delay={0}
          stagger={4}
          variant="glow-reveal"
          glowColor="#ff6b6b"
          style={{
            fontSize: 28,
            fontWeight: 500,
            color: 'rgba(255,100,100,0.9)',
            fontFamily: theme.typography.fontUi,
            marginBottom: 24,
          }}
        >
          THE PROBLEM
        </AnimatedText>
        <AnimatedText
          mode="word"
          delay={12}
          stagger={5}
          variant="snap"
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: '#fff',
            fontFamily: theme.typography.fontHeader,
            textAlign: 'center',
            maxWidth: 1000,
            lineHeight: 1.2,
          }}
        >
          Black-box AI cannot be trusted.
        </AnimatedText>
        <div style={{ height: 48 }} />
        <GlowPulse color="#ff6b6b" intensity={0.7} frequency={20}>
          <ShakeElement active={frame > 45 && frame < 90} intensity={3}>
            <GlassRefraction intensity={0.6} glowColor="#ff6b6b" borderRadius={24}>
              <div style={{ padding: '32px 48px', display: 'flex', gap: 24, alignItems: 'center' }}>
                <div style={{ width: 64, height: 64, borderRadius: 16, background: 'rgba(239,68,68,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>
                  ⚠️
                </div>
                <div>
                  <div style={{ fontSize: 26, fontWeight: 600, color: '#fff', fontFamily: theme.typography.fontUi }}>
                    No explanation. No audit. No trust.
                  </div>
                  <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.6)', marginTop: 6, fontFamily: theme.typography.fontUi }}>
                    Financial AI needs transparency.
                  </div>
                  <div style={{ marginTop: 14 }}>
                    <BlinkingBadge color={theme.accent.red} delay={0}>ALERT</BlinkingBadge>
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
