/**
 * Shot 05: GOVERN Engine
 * Duration: 7 seconds (750-960 frames)
 * Purpose: Demonstrate trust & transparency - Compliance as Architecture
 *
 * "This isn't compliance as an afterthought. This is compliance as architecture."
 */

import React from 'react';
import { AbsoluteFill } from 'remotion';
import { theme } from '../../../shared/theme';
import { ShotTransition } from '../../../shared/animation/ShotTransition';
import { AnimatedAuditLog } from '../../../shared/live-ui/AnimatedList';
import { AnimatedEnginePill, AnimatedCardReveal, BlinkingBadge } from '../../../shared/live-ui/AnimatedUI';
import { AnimatedStat } from '../../../shared/live-ui/AnimatedProgress';
import { GlassRefraction } from '../../../shared/cinematic';
import { CinematicText, AnimatedText } from '../../../shared/animation/AnimatedText';
import { SlideIcon } from '../../../shared/SlideIcon';
import { getVideoLayoutStyles, type VideoLayoutMode } from '../../layout/VideoLayout';
import { SHOTS } from '../config';
import { poseidonIntroCopy } from '../copy';

interface Shot05GovernProps {
  layout?: VideoLayoutMode;
}

export const Shot05Govern: React.FC<Shot05GovernProps> = ({ layout = 'landscape' }) => {
  const { safeArea, scaledSafeArea } = getVideoLayoutStyles(layout);
  const containerStyle = layout === 'portrait' ? scaledSafeArea : safeArea;

  const copy = poseidonIntroCopy.shot5;

  // Convert audit entries to expected format
  const auditEntries = copy.auditEntries.map((entry, i) => ({
    id: `G-${String(i + 1).padStart(4, '0')}`,
    engine: 'Govern' as const,
    action: entry.action,
    time: entry.time,
    status: entry.status === 'complete' ? 'Verified' : 'Pending',
  }));

  return (
    <ShotTransition
      durationInFrames={SHOTS.shot5.duration}
      enterType="fade"
      exitType="fade"
      enterDuration={16}
      exitDuration={14}
    >
      <AbsoluteFill
        style={{
          background: theme.backgroundGradient,
          color: 'white',
          fontFamily: theme.typography.fontUi,
        }}
      >
        <div style={{ ...containerStyle, display: 'block' }}>
          {/* Header */}
          <AnimatedCardReveal delay={10}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                marginBottom: 24,
              }}
            >
              <SlideIcon name="governance" size={40} glowColor="blue" />
              <CinematicText delay={5} size={48} glowColor={theme.accent.blue}>
                {copy.engineName}
              </CinematicText>
              <AnimatedEnginePill engine="Govern" delay={15} active />
            </div>
          </AnimatedCardReveal>

          {/* Key phrase */}
          <AnimatedCardReveal delay={20}>
            <div style={{ marginBottom: 32, textAlign: 'center' }}>
              <AnimatedText
                mode="word"
                delay={25}
                stagger={4}
                variant="fade-up"
                glowColor={theme.accent.cyan}
                style={{
                  fontSize: 36,
                  fontWeight: 700,
                  color: '#fff',
                  fontFamily: theme.typography.fontHeader,
                }}
              >
                {copy.keyPhrase}
              </AnimatedText>
              <AnimatedText
                mode="word"
                delay={50}
                stagger={3}
                variant="snap"
                style={{
                  fontSize: 28,
                  fontWeight: 600,
                  color: theme.accent.amber,
                  fontFamily: theme.typography.fontHeader,
                  marginTop: 8,
                  textShadow: `0 0 20px ${theme.accent.amber}44`,
                }}
              >
                {`— ${copy.keyPhraseHighlight}`}
              </AnimatedText>
            </div>
          </AnimatedCardReveal>

          {/* Main grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: layout === 'portrait' ? '1fr' : '1.4fr 1fr',
              gap: 24,
              height: 'calc(100% - 180px)',
            }}
          >
            {/* Left: Stats and Audit Log */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Stats row - muted */}
              <AnimatedCardReveal delay={40} direction="up">
                <GlassRefraction
                  intensity={0.25}
                  glowColor={theme.accent.cyan}
                  borderRadius={20}
                >
                  <div style={{ padding: 20 }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 16,
                      }}
                    >
                      <div style={{ fontSize: 18, fontWeight: 600 }}>
                        Transparency Metrics
                      </div>
                      <BlinkingBadge color={theme.accent.blue} delay={50}>
                        REAL-TIME
                      </BlinkingBadge>
                    </div>
                    <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                      {copy.stats.map((stat, i) => (
                        <AnimatedStat
                          key={stat.label}
                          label={stat.label}
                          value={stat.value}
                          color={i === 0 ? theme.accent.cyan : i === 1 ? theme.accent.teal : theme.accent.blue}
                          delay={55 + i * 10}
                        />
                      ))}
                    </div>
                  </div>
                </GlassRefraction>
              </AnimatedCardReveal>

              {/* Audit log - muted */}
              <AnimatedCardReveal delay={55} direction="up">
                <GlassRefraction
                  intensity={0.25}
                  glowColor={theme.accent.amber}
                  borderRadius={20}
                >
                  <div style={{ padding: 20 }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 12,
                      }}
                    >
                      <div style={{ fontSize: 18, fontWeight: 600 }}>
                        Immutable Audit Trail
                      </div>
                      <div
                        style={{
                          fontSize: 10,
                          color: 'rgba(255,255,255,0.5)',
                          fontFamily: theme.typography.fontMono,
                        }}
                      >
                        SHA-256 CHAINED
                      </div>
                    </div>
                    <AnimatedAuditLog
                      entries={auditEntries}
                      delay={75}
                      stagger={15}
                    />
                  </div>
                </GlassRefraction>
              </AnimatedCardReveal>
            </div>

            {/* Right: Compliance badges - muted */}
            <AnimatedCardReveal delay={65} direction="right">
              <GlassRefraction
                intensity={0.2}
                glowColor={theme.accent.violet}
                borderRadius={20}
              >
                <div style={{ padding: 20 }}>
                  <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>
                    Compliance Ready
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 12,
                    }}
                  >
                    {copy.complianceBadges.map((badge, i) => (
                      <AnimatedCardReveal key={badge} delay={90 + i * 12}>
                        <div
                          style={{
                            padding: '12px 16px',
                            borderRadius: 12,
                            background: `${theme.accent.cyan}15`,
                            border: `1px solid ${theme.accent.cyan}44`,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                          }}
                        >
                          <div
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              background: theme.accent.cyan,
                              boxShadow: `0 0 8px ${theme.accent.cyan}`,
                            }}
                          />
                          <span
                            style={{
                              fontSize: 14,
                              fontWeight: 600,
                              color: theme.accent.cyan,
                            }}
                          >
                            {badge}
                          </span>
                          <span
                            style={{
                              marginLeft: 'auto',
                              fontSize: 12,
                              color: theme.accent.teal,
                            }}
                          >
                            ✓ Compliant
                          </span>
                        </div>
                      </AnimatedCardReveal>
                    ))}
                  </div>

                  {/* Retention info */}
                  <div
                    style={{
                      marginTop: 20,
                      padding: 12,
                      borderRadius: 8,
                      background: 'rgba(255,255,255,0.05)',
                      fontSize: 12,
                      color: 'rgba(255,255,255,0.6)',
                      textAlign: 'center',
                    }}
                  >
                    10-Year Retention • Tamper-Evident • Full Lineage
                  </div>
                </div>
              </GlassRefraction>
            </AnimatedCardReveal>
          </div>
        </div>
      </AbsoluteFill>
    </ShotTransition>
  );
};
