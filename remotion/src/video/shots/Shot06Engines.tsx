import React from 'react';
import { AbsoluteFill } from 'remotion';
import { ShotTransition } from '../../shared/animation/ShotTransition';
import { LightSweep } from '../../shared/effects/LightSweep';
import { CinematicText } from '../../shared/animation/AnimatedText';
import { GlassRefraction, PulsingElement } from '../../shared/cinematic';
import { AnimatedCardReveal } from '../../shared/live-ui/AnimatedUI';
import { theme } from '../../shared/theme';
import { getVideoLayoutStyles, type VideoLayoutMode } from '../layout/VideoLayout';
import { SHOTS, VIDEO_BPM } from '../config';

interface Shot06EnginesProps {
  layout?: VideoLayoutMode;
}

export const Shot06Engines: React.FC<Shot06EnginesProps> = ({ layout = 'landscape' }) => {
  const { safeArea, scaledSafeArea } = getVideoLayoutStyles(layout);
  const containerStyle = layout === 'portrait' ? scaledSafeArea : safeArea;

  const engines = [
    { name: 'Protect', icon: '🛡️', color: theme.accent.red, desc: 'Fraud detection' },
    { name: 'Grow', icon: '📈', color: theme.accent.violet, desc: 'Smart investing' },
    { name: 'Execute', icon: '⚡', color: theme.accent.cyan, desc: 'Transactions' },
    { name: 'Govern', icon: '⚖️', color: theme.accent.amber, desc: 'Compliance' },
  ];

  return (
    <ShotTransition durationInFrames={SHOTS.shot6.duration} enterType="zoom-through" exitType="fade" enterDuration={12} exitDuration={10}>
      <AbsoluteFill
        style={{
          ...containerStyle,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <LightSweep duration={SHOTS.shot6.duration} color="#ffffff" intensity={0.2} layers={3} />

        <CinematicText delay={0} size={48} glowColor={theme.accent.cyan}>
          Four AI Engines. One Platform.
        </CinematicText>

        <div style={{ height: 48 }} />

        <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', justifyContent: 'center' }}>
          {engines.map((engine, i) => (
            <AnimatedCardReveal key={engine.name} delay={20 + i * 10} direction={i % 2 === 0 ? 'left' : 'right'}>
              <PulsingElement bpm={VIDEO_BPM} beatDivision={2} scaleRange={[1, 1.03]} glow glowColor={engine.color}>
                <GlassRefraction intensity={0.5} glowColor={engine.color} borderRadius={20}>
                  <div style={{ width: 180, padding: '24px 20px', textAlign: 'center' }}>
                    <div style={{ fontSize: 40, marginBottom: 10 }}>{engine.icon}</div>
                    <div style={{ fontSize: 20, fontWeight: 700, color: engine.color, textShadow: `0 0 20px ${engine.color}88` }}>
                      {engine.name}
                    </div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 6 }}>{engine.desc}</div>
                  </div>
                </GlassRefraction>
              </PulsingElement>
            </AnimatedCardReveal>
          ))}
        </div>
      </AbsoluteFill>
    </ShotTransition>
  );
};
