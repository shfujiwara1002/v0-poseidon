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
import { ShapeHalo } from './shared/visuals/ShapeHalo';
import { authorityDarkGlassStyle } from './shared/authorityDarkGlassStyle';

const ENGINE_COLORS = [theme.semantic.threat, theme.semantic.growth, theme.accent.amber, theme.accent.cyan] as const;
const ENGINE_VARIANTS = ['red', 'violet', 'gold', 'blue'] as const;

interface Slide04SolutionProps {
    debug?: boolean;
    debugGrid?: boolean;
    debugIds?: boolean;
}

export const Slide04Solution: React.FC<Slide04SolutionProps> = ({ debug = false, debugGrid, debugIds }) => {
    const layout = slideLayouts.slide04;
    const engines = copy.slide04.engines;

    return (
        <SlideFrame debug={debug} debugGrid={debugGrid} debugIds={debugIds}>
            <Tier3Background layers={backgroundPresets.blue} />

            {/* -- HEADER -- */}
            <SlideHeader
                badge={copy.slide04.badge}
                title={copy.slide04.title}
                subtitle={copy.slide04.subtitle}
                subtitleHighlight={copy.slide04.subtitleHighlight}
                debugId="slide04.header"
                debugBadgeId="slide04.header.badge"
                debugTitleId="slide04.header.title"
                debugSubtitleId="slide04.header.subtitle"
            />

            {/* -- CONTENT: Slide03 pattern -- */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                gap: theme.spacing.space5,
                minHeight: 0,
                paddingBottom: 56,
            }} data-debug-id="slide04.body">
                {/* Top Row: Protect, Grow, Execute */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${layout.columns}, 1fr)`,
                    gap: theme.spacing.space5,
                    flex: '0 0 auto',
                    minHeight: 0,
                }}>
                    {engines.slice(0, 3).map((engine, i) => {
                        const iconNames = ['shield', 'wave', 'gear'] as const;
                        const iconGlows = ['red', 'violet', 'amber'] as const;
                        return (
                        <GlassCard
                            key={engine.id}
                            variant={ENGINE_VARIANTS[i]}
                            tone="dark"
                            liquidGlass="off"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: theme.spacing.space4,
                                padding: '20px 22px',
                                minHeight: 260,
                                ...authorityDarkGlassStyle,
                            }}
                            debugId={`slide04.engine.${engine.id}`}
                        >
                            <SlideIcon name={iconNames[i]} glowColor={iconGlows[i]} size={28} />
                            <div style={{
                                fontFamily: theme.typography.fontMono,
                                fontSize: theme.typographyScale.meta,
                                color: 'rgba(255,255,255,0.5)',
                                letterSpacing: 1,
                            }}>
                                {engine.name}
                            </div>

                            <div style={{
                                fontFamily: theme.typography.fontHeader,
                                fontSize: 48,
                                fontWeight: 700,
                                color: ENGINE_COLORS[i],
                            }}>
                                {engine.capability}
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {engine.bullets.map((bullet) => {
                                    const bulletColor = ENGINE_COLORS[i];
                                    return (
                                        <div
                                            key={bullet.id}
                                            style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}
                                            data-debug-id={`slide04.engine.${engine.id}.bullet.${bullet.id}`}
                                        >
                                            <div style={{
                                                width: 6, height: 6, borderRadius: '50%',
                                                background: bulletColor,
                                                marginTop: 10,
                                                boxShadow: buildMicroGlow(bulletColor),
                                            }} />
                                            <div style={{
                                                fontFamily: theme.typography.fontUi,
                                                fontSize: 18,
                                                color: 'rgba(255,255,255,0.8)',
                                                lineHeight: 1.35,
                                            }}>
                                {bullet.text}
                            </div>
                        </div>
                    );
                })}
            </div>
        </GlassCard>
        );
    })}
</div>

{/* Bottom: Govern - full width with ShapeHalo backdrop */}
<div style={{ position: 'relative' }}>
    <ShapeHalo size={600} opacity={0.10} color={theme.accent.blue} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 0 }} />
<GlassCard
    variant="blue"
    tone="dark"
    liquidGlass="off"
    style={{
        padding: '16px 20px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: theme.spacing.space5,
        alignItems: 'flex-start',
        ...authorityDarkGlassStyle,
    }}
    debugId={`slide04.engine.${engines[3].id}`}
>
    <SlideIcon name="govern-core" glowColor="blue" size={28} />
    <div style={{
        fontFamily: theme.typography.fontHeader,
        fontSize: 52,
        fontWeight: 700,
        color: ENGINE_COLORS[3],
        minWidth: 140,
    }}>
        {engines[3].name}
    </div>
    <div style={{
        fontFamily: theme.typography.fontUi,
        fontSize: 22,
        color: 'rgba(255,255,255,0.8)',
        lineHeight: 1.3,
        flex: 1,
        minWidth: 300,
    }}>
        {engines[3].capability}
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 14, width: '100%' }}>
        {engines[3].bullets.map((bullet) => {
            const bulletColor = ENGINE_COLORS[3];
            return (
                <div
                    key={bullet.id}
                    style={{ display: 'flex', gap: 10, alignItems: 'flex-start', flex: 1 }}
                    data-debug-id={`slide04.engine.${engines[3].id}.bullet.${bullet.id}`}
                >
                    <div style={{
                        width: 6, height: 6, borderRadius: '50%',
                        background: bulletColor,
                                        marginTop: 10,
                                        flexShrink: 0,
                                        boxShadow: buildMicroGlow(bulletColor),
                                    }} />
                                    <div style={{
                                        fontFamily: theme.typography.fontUi,
                                        fontSize: 18,
                                        color: 'rgba(255,255,255,0.8)',
                                        lineHeight: 1.35,
                                    }}>
                                    {bullet.text}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </GlassCard>
                </div>
            </div>
        </SlideFrame>
    );
};
