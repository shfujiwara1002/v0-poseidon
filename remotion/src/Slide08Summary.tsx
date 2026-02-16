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
import { ShapeHalo } from './shared/visuals/ShapeHalo';
import { SlideIcon } from './shared/SlideIcon';
import { authorityDarkGlassStyle } from './shared/authorityDarkGlassStyle';

type SummaryPillar = {
  id: string;
  index: string;
  title: string;
  body: string;
  color: string;
};

interface Slide08SummaryProps {
  debug?: boolean;
  debugGrid?: boolean;
  debugIds?: boolean;
}

const splitBodyLines = (text: string): string[] => {
  if (text.includes('|')) {
    return text.split('|').map((part) => part.trim()).filter(Boolean);
  }
  return text
    .split('.')
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => `${part}.`);
};

export const Slide08Summary: React.FC<Slide08SummaryProps> = ({ debug = false, debugGrid, debugIds }) => {
  const layout = slideLayouts.slide08;
  const pillars = copy.slide08.pillars as ReadonlyArray<SummaryPillar>;

  return (
    <SlideFrame debug={debug} debugGrid={debugGrid} debugIds={debugIds}>
      <Tier3Background layers={backgroundPresets.violet} />

      <SlideHeader
        badge={copy.slide08.summaryLabel}
        title={copy.slide08.title}
        debugId="slide08.header"
        debugBadgeId="slide08.header.badge"
        debugTitleId="slide08.header.title"
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.space8, flex: 1 }} data-debug-id="slide08.body">
        <div style={{ position: 'relative' }}>
          <ShapeHalo size={700} opacity={0.14} color={theme.accent.cyan} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 0 }} />
        <GlassCard
          tone="dark"
          liquidGlass="off"
          style={{
            position: 'relative',
            padding: layout.visionPadding,
            borderRadius: 18,
            border: '1px solid rgba(148,163,184,0.24)',
            zIndex: 1,
            ...authorityDarkGlassStyle,
          }}
          debugId="slide08.vision"
        >
          <div
            style={{
              fontFamily: theme.typography.fontMono,
              fontSize: theme.typographyScale.meta,
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: '0.02em',
              marginBottom: 14,
            }}
          >
            {copy.slide08.visionLabel}
          </div>
          <div
            style={{
              fontFamily: theme.typography.fontUi,
              fontSize: theme.typographyScale.bodyStrong,
              fontWeight: 500,
              color: 'rgba(255,255,255,0.9)',
              lineHeight: 1.35,
            }}
          >
            <span
              style={{
                color: '#34D399',
                fontWeight: 700,
                textShadow: '0 0 6px rgba(52,211,153,0.8), 0 0 16px rgba(52,211,153,0.6), 0 0 32px rgba(52,211,153,0.45)',
              }}
            >
              {copy.slide08.visionHighlight}
            </span>{' '}
            <span>{copy.slide08.visionBody}</span>
          </div>
        </GlassCard>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${layout.columns}, 1fr)`,
            gap: theme.spacing.space8,
            flex: 1,
          }}
        >
          {pillars.map((pillar, index) => {
            const iconNames = ['shield', 'insight-lamp', 'horizon-spectrum'] as const;
            const iconGlows = ['teal', 'amber', 'violet'] as const;
            return (
            <GlassCard
              key={pillar.id}
              variant={index === 0 ? 'teal' : index === 1 ? 'gold' : 'violet'}
              tone="dark"
              liquidGlass="off"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing.space6,
                padding: layout.pillarPadding,
                ...authorityDarkGlassStyle,
              }}
              debugId={`slide08.pillar.${pillar.id}`}
            >
              <SlideIcon name={iconNames[index]} glowColor={iconGlows[index]} size={28} />
              <div
                style={{
                  fontFamily: theme.typography.fontMono,
                  fontSize: theme.typographyScale.meta,
                  color: 'rgba(255,255,255,0.5)',
                  letterSpacing: 1,
                }}
              >
                {pillar.index.padStart(2, '0')}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minHeight: 140 }}>
                <div
                  style={{
                    fontFamily: theme.typography.fontHeader,
                    fontSize: theme.typographyScale.cardTitle,
                    fontWeight: 700,
                    color: pillar.color,
                    lineHeight: 1.08,
                  }}
                >
                  {pillar.title}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {splitBodyLines(pillar.body).map((line, lineIndex) => (
                    <div
                      key={line}
                      style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}
                      data-debug-id={`slide08.pillar.${pillar.id}.line.${lineIndex + 1}`}
                    >
                      <div
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: pillar.color,
                          marginTop: 10,
                          flexShrink: 0,
                          boxShadow: buildMicroGlow(pillar.color),
                        }}
                      />
                      <div
                        style={{
                          fontFamily: theme.typography.fontUi,
                          fontSize: theme.typographyScale.body,
                          color: 'rgba(255,255,255,0.8)',
                          lineHeight: 1.4,
                        }}
                      >
                        {line}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
            );
          })}
        </div>
      </div>
    </SlideFrame>
  );
};
