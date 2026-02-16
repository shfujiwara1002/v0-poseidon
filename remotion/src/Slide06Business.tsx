import React from 'react';
import { SlideFrame } from './shared/SlideFrame';
import { copy } from './shared/copy';
import { theme } from './shared/theme';
import { Tier3Background } from './shared/visuals/tier3/Tier3Background';
import { GlassCard } from './shared/GlassCard';
import { backgroundPresets } from './shared/backgroundPresets';
import { SlideHeader } from './shared/SlideHeader';
import { buildMicroGlow } from './shared/colorUtils';
import { slideLayouts } from './shared/slideLayouts';
import { authorityDarkGlassStyle } from './shared/authorityDarkGlassStyle';

type RoadmapPhase = {
  id: string;
  label: string;
  period: string;
  pillar: string;
  title: string;
  bullets: ReadonlyArray<string>;
  color: string;
};

type CardVariant = 'teal' | 'violet' | 'gold' | 'blue';

const CARD_VARIANTS: ReadonlyArray<CardVariant> = ['teal', 'violet', 'gold', 'blue'];
const PILLAR_BADGE_DARK_STYLE: React.CSSProperties = {
  background: 'linear-gradient(135deg, rgba(3,10,22,0.96), rgba(3,10,22,0.90))',
  boxShadow: '0 10px 24px rgba(0,0,0,0.55)',
};

interface Slide06BusinessProps {
  debug?: boolean;
  debugGrid?: boolean;
  debugIds?: boolean;
}

export const Slide06Business: React.FC<Slide06BusinessProps> = ({ debug = false, debugGrid, debugIds }) => {
  const layout = slideLayouts.slide06;
  const phases = copy.slide06.phases as ReadonlyArray<RoadmapPhase>;
  const phase5 = copy.slide06.phase5;

  return (
    <SlideFrame debug={debug} debugGrid={debugGrid} debugIds={debugIds}>
      <Tier3Background layers={backgroundPresets.authorityBlueCircuit} />

      <SlideHeader
        badge={copy.slide06.badge}
        title={copy.slide06.title}
        subtitle={copy.slide06.subtitle}
        subtitleHighlight={copy.slide06.subtitleHighlight}
        debugId="slide06.header"
        debugBadgeId="slide06.header.badge"
        debugTitleId="slide06.header.title"
        debugSubtitleId="slide06.header.subtitle"
      />

      {/* Connection Rail - horizontal line linking 4 phases */}
      <svg
        width="100%"
        height="8"
        style={{ marginBottom: -4, overflow: 'visible' }}
        data-debug-id="slide06.rail"
      >
        {phases.map((phase, i) => {
          const total = phases.length;
          const segStart = `${(i / total) * 100 + 100 / (total * 2) - 2}%`;
          const segEnd = `${((i + 1) / total) * 100 + 100 / (total * 2) - 2}%`;
          if (i >= total - 1) return null;
          return (
            <line
              key={`rail-${phase.id}`}
              x1={segStart}
              y1="4"
              x2={segEnd}
              y2="4"
              stroke={phase.color}
              strokeWidth={2}
              opacity={0.28}
            />
          );
        })}
        {phases.map((phase, i) => {
          const total = phases.length;
          const cx = `${(i / total) * 100 + 100 / (total * 2)}%`;
          return (
            <circle
              key={`node-${phase.id}`}
              cx={cx}
              cy="4"
              r="3"
              fill={phase.color}
              opacity={0.45}
            />
          );
        })}
      </svg>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${layout.columns}, 1fr)`,
          gap: layout.gridGap,
          flex: 1,
          alignItems: 'stretch',
        }}
        data-debug-id="slide06.body"
      >
        {phases.map((phase, index) => {
          const variant = CARD_VARIANTS[index] ?? 'teal';
          const isLastPhase = index === phases.length - 1;

          const phaseCard = (
            <div style={{ position: 'relative', flex: isLastPhase ? 1 : undefined, height: isLastPhase ? undefined : '100%' }} data-debug-id={`slide06.phase.${phase.id}`}>
              <div style={{
                  position: 'absolute',
                  top: layout.pillarOffsetTop,
                  right: layout.pillarOffsetRight,
                  zIndex: 3,
              }}>
                <div
                  style={{
                    borderRadius: 999,
                    padding: '8px 22px 7px',
                    ...PILLAR_BADGE_DARK_STYLE,
                    border: `1px solid ${phase.color}`,
                    color: phase.color,
                    fontFamily: theme.typography.fontMono,
                    fontSize: layout.badgeSize,
                    fontWeight: 700,
                    letterSpacing: '0.03em',
                  }}
                >
                  {phase.pillar}
                </div>
              </div>

              <GlassCard
                variant={variant}
                tone="dark"
                liquidGlass="off"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: theme.spacing.space6,
                  padding: layout.cardPadding,
                  height: '100%',
                  minHeight: isLastPhase ? undefined : layout.cardMinHeight,
                  ...authorityDarkGlassStyle,
                }}
              >
                <div
                  style={{
                    fontFamily: theme.typography.fontHeader,
                    fontSize: layout.phaseLabelSize,
                    fontWeight: 700,
                    color: phase.color,
                  }}
                >
                  {phase.label}
                </div>

                <div
                  style={{
                    fontFamily: theme.typography.fontMono,
                    fontSize: layout.periodSize,
                    color: 'rgba(255,255,255,0.5)',
                  }}
                >
                  {phase.period}
                </div>

                <div
                  style={{
                    fontFamily: theme.typography.fontHeader,
                    fontSize: layout.titleSize,
                    fontWeight: 700,
                    color: 'rgba(255,255,255,0.8)',
                    lineHeight: 1.15,
                  }}
                >
                  {phase.title}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: layout.bulletGap }}>
                  {phase.bullets.map((bullet, bulletIndex) => (
                    <div
                      key={bullet}
                      style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}
                      data-debug-id={`slide06.phase.${phase.id}.bullet.${bulletIndex + 1}`}
                    >
                      <div
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: phase.color,
                          marginTop: 10,
                          boxShadow: buildMicroGlow(phase.color),
                        }}
                      />
                      <div
                        style={{
                          fontFamily: theme.typography.fontUi,
                          fontSize: layout.bulletSize,
                          color: 'rgba(255,255,255,0.8)',
                          lineHeight: 1.4,
                        }}
                      >
                        {bullet}
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          );

          // Wrap Phase 4 column with Phase 5 below it
          if (isLastPhase) {
            return (
              <div key={phase.id} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {phaseCard}
                <GlassCard
                  variant="teal"
                  tone="dark"
                  liquidGlass="off"
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 16,
                    padding: '16px 24px',
                    ...authorityDarkGlassStyle,
                  }}
                  data-debug-id="slide06.phase.phase-5"
                >
                  <div
                    style={{
                      fontFamily: theme.typography.fontHeader,
                      fontSize: 26,
                      fontWeight: 700,
                      color: phase5.color,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {phase5.label}
                  </div>
                  <div
                    style={{
                      width: 1,
                      height: 24,
                      background: `${phase5.color}44`,
                      flexShrink: 0,
                    }}
                  />
                  <div
                    style={{
                      fontFamily: theme.typography.fontHeader,
                      fontSize: 24,
                      fontWeight: 600,
                      color: phase5.color,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {phase5.title}
                  </div>
                </GlassCard>
              </div>
            );
          }

          return <React.Fragment key={phase.id}>{phaseCard}</React.Fragment>;
        })}
      </div>
    </SlideFrame>
  );
};
