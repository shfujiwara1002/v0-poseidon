/**
 * Shot 06: 4-Engine Integration
 * Duration: 5 seconds (960-1110 frames)
 * Purpose: Show all 4 engines working together as unified intelligence
 *
 * "Four Engines. One Unified Intelligence."
 */

import React from 'react';
import { AbsoluteFill } from 'remotion';
import { theme } from '../../../shared/theme';
import { ShotTransition } from '../../../shared/animation/ShotTransition';
import { CinematicText, AnimatedText } from '../../../shared/animation/AnimatedText';
import { GlassRefraction } from '../../../shared/cinematic';
import { AnimatedCardReveal } from '../../../shared/live-ui/AnimatedUI';
import { SlideIcon, type IconGlowColor } from '../../../shared/SlideIcon';
import { FloatingParticles } from '../../../shared/effects/FloatingParticles';
import { getVideoLayoutStyles, type VideoLayoutMode } from '../../layout/VideoLayout';
import { SHOTS } from '../config';
import { poseidonIntroCopy } from '../copy';

interface Shot06EnginesProps {
  layout?: VideoLayoutMode;
}

export const Shot06Engines: React.FC<Shot06EnginesProps> = ({ layout = 'landscape' }) => {
  const { safeArea, scaledSafeArea } = getVideoLayoutStyles(layout);
  const containerStyle = layout === 'portrait' ? scaledSafeArea : safeArea;

  const copy = poseidonIntroCopy.shot6;

  // Engine icons mapping
  const engineIcons: Record<string, string> = {
    PROTECT: 'shield',
    GROW: 'growth',
    EXECUTE: 'wallet',
    GOVERN: 'governance',
  };

  // Engine glow colors (must match IconGlowColor type)
  const engineGlowMap: Record<string, IconGlowColor> = {
    PROTECT: 'teal',
    GROW: 'violet',
    EXECUTE: 'amber',
    GOVERN: 'blue',
  };

  return (
    <ShotTransition
      durationInFrames={SHOTS.shot6.duration}
      enterType="fade"
      exitType="fade"
      enterDuration={16}
      exitDuration={14}
    >
      <AbsoluteFill
        style={{
          ...containerStyle,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 32,
        }}
      >
        {/* Floating particles - reduced */}
        <FloatingParticles
          count={20}
          colors={[
            theme.accent.teal,
            theme.accent.violet,
            theme.accent.gold,
            theme.accent.blue,
          ]}
          sizeRange={[2, 4]}
          speed={0.25}
          glow
          opacityRange={[0.1, 0.25]}
        />

        {/* Headline */}
        <CinematicText delay={5} size={48} glowColor={theme.accent.cyan}>
          {copy.headline}
        </CinematicText>

        {/* Engine grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: layout === 'portrait' ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            gap: layout === 'portrait' ? 16 : 24,
            marginTop: 16,
          }}
        >
          {copy.engines.map((engine, i) => (
            <AnimatedCardReveal
              key={engine.name}
              delay={25 + i * 12}
              direction={i % 2 === 0 ? 'up' : 'down'}
            >
              <GlassRefraction
                intensity={0.25}
                glowColor={engine.color}
                borderRadius={20}
              >
                <div
                  style={{
                    width: layout === 'portrait' ? 150 : 200,
                    padding: '24px 16px',
                    textAlign: 'center',
                  }}
                >
                  {/* Engine icon */}
                  <div style={{ marginBottom: 12 }}>
                    <SlideIcon
                      name={engineIcons[engine.name] || 'brain'}
                      size={48}
                      glowColor={engineGlowMap[engine.name] || 'cyan'}
                    />
                  </div>

                  {/* Engine name */}
                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      color: engine.color,
                      textShadow: `0 0 15px ${engine.color}66`,
                      fontFamily: theme.typography.fontHeader,
                    }}
                  >
                    {engine.name}
                  </div>

                  {/* Label */}
                  <div
                    style={{
                      fontSize: 12,
                      color: 'rgba(255,255,255,0.7)',
                      marginTop: 6,
                    }}
                  >
                    {engine.label}
                  </div>

                  {/* Metric */}
                  <div
                    style={{
                      fontSize: 11,
                      color: engine.color,
                      marginTop: 8,
                      fontFamily: theme.typography.fontMono,
                      opacity: 0.9,
                    }}
                  >
                    {engine.metric}
                  </div>
                </div>
              </GlassRefraction>
            </AnimatedCardReveal>
          ))}
        </div>

        {/* Core formula */}
        <div style={{ marginTop: 24 }}>
          <AnimatedText
            mode="word"
            delay={80}
            stagger={3}
            variant="fade-up"
            style={{
              fontSize: 18,
              color: 'rgba(255,255,255,0.7)',
              fontFamily: theme.typography.fontMono,
              textAlign: 'center',
              maxWidth: 700,
            }}
          >
            {copy.coreFormula}
          </AnimatedText>
        </div>
      </AbsoluteFill>
    </ShotTransition>
  );
};
