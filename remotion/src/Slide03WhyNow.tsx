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
import { SlideIcon } from './shared/SlideIcon';
import { authorityDarkGlassStyle } from './shared/authorityDarkGlassStyle';

interface Slide03WhyNowProps {
    debug?: boolean;
    debugGrid?: boolean;
    debugIds?: boolean;
}

export const Slide03WhyNow: React.FC<Slide03WhyNowProps> = ({ debug = false, debugGrid, debugIds }) => {
    const layout = slideLayouts.slide03;

    return (
        <SlideFrame debug={debug} debugGrid={debugGrid} debugIds={debugIds}>
            <Tier3Background layers={backgroundPresets.teal} />

            {/* -- HEADER -- */}
            <SlideHeader
                badge={copy.slide03.badge}
                title={copy.slide03.title}
                subtitle={copy.slide03.subtitle}
                subtitleHighlight={copy.slide03.subtitleHighlight}
                debugId="slide03.header"
                debugBadgeId="slide03.header.badge"
                debugTitleId="slide03.header.title"
                debugSubtitleId="slide03.header.subtitle"
            />

            {/* -- CONTENT -- */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                gap: theme.spacing.space8
            }} data-debug-id="slide03.body">
                {/* 3 Columns */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${layout.columns}, 1fr)`,
                    gap: theme.spacing.space8,
                    flex: 1,
                }}>
                    {copy.slide03.forces.map((force, i) => {
                        const iconNames = ['data-grid', 'ai-brain', 'signal-beam'] as const;
                        const iconGlows = ['teal', 'violet', 'amber'] as const;
                        return (
                        <GlassCard
                            key={force.id}
                            variant={i === 0 ? 'teal' : i === 1 ? 'violet' : 'gold'}
                            tone="dark"
                            liquidGlass="off"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: theme.spacing.space6,
                                padding: layout.cardPadding,
                                ...authorityDarkGlassStyle,
                            }}
                            debugId={`slide03.force.${force.id}`}
                        >
                            <SlideIcon name={iconNames[i]} glowColor={iconGlows[i]} size={28} />
                            <div style={{
                                fontFamily: theme.typography.fontMono,
                                fontSize: theme.typographyScale.meta,
                                color: 'rgba(255,255,255,0.5)',
                                letterSpacing: 1,
                            }}>
                                {force.meta}
                            </div>

                            <div style={{
                                fontFamily: theme.typography.fontHeader,
                                fontSize: theme.typographyScale.cardTitle,
                                fontWeight: 700,
                                color: i === 0 ? theme.accent.teal : i === 1 ? theme.accent.violet : theme.accent.gold,
                            }}>
                                {force.label}
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                {force.bullets.map((bullet) => {
                                    const label = bullet.text;
                                    const indent = 'indent' in bullet ? bullet.indent : false;
                                    const bulletColor = i === 0 ? theme.accent.teal : i === 1 ? theme.accent.violet : theme.accent.gold;
                                    return (
                                        <div
                                            key={bullet.id}
                                            style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginLeft: indent ? 24 : 0 }}
                                            data-debug-id={`slide03.force.${force.id}.bullet.${bullet.id}`}
                                        >
                                            <div style={{
                                                width: 6, height: 6, borderRadius: '50%',
                                                background: bulletColor,
                                                marginTop: 10,
                                                boxShadow: buildMicroGlow(bulletColor),
                                            }} />
                                            <div style={{
                                                fontFamily: theme.typography.fontUi,
                                                fontSize: indent ? theme.typographyScale.bodyStrong : theme.typographyScale.body,
                                                color: 'rgba(255,255,255,0.8)',
                                                lineHeight: 1.5,
                                            }}>
                                                {label}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </GlassCard>
                        );
                    })}
                </div>

            </div>
        </SlideFrame>
    );
};
