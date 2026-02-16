import React from 'react';
import { SlideFrame } from './shared/SlideFrame';
import { copy } from './shared/copy';
import { theme } from './shared/theme';
import { Tier3Background } from './shared/visuals/tier3/Tier3Background';
import { GlassCard } from './shared/GlassCard';
import { ComplianceBadge } from './shared/ComplianceBadge';
import { ChartBar } from './shared/charts/ChartBar';
import { backgroundPresets } from './shared/backgroundPresets';
import { SlideHeader } from './shared/SlideHeader';

export const Slide08Roadmap: React.FC = () => {
    return (
        <SlideFrame>
            <Tier3Background layers={backgroundPresets.cyan} />

            {/* -- HEADER -- */}
            <SlideHeader
                badge={copy.slide08.badge}
                title={copy.slide08.title}
                subtitle={copy.slide08.subtitle}
                subtitleHighlight={copy.slide08.subtitleHighlight}
            />

            {/* -- CONTENT: 4 Columns -- */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: theme.spacing.space6, flex: 1 }}>
                {copy.slide08.phases.map((phase, i) => (
                    <GlassCard
                        key={i}
                        variant={i === 0 ? 'blue' : i === 1 ? 'violet' : i === 2 ? 'blue' : 'gold'}
                        style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24 }}
                    >
                        <div style={{
                            fontFamily: theme.typography.fontMono,
                            fontSize: theme.typographyScale.meta,
                            color: 'rgba(255,255,255,0.5)',
                            letterSpacing: 1
                        }}>
                            {phase.label}
                        </div>

                        <div style={{
                            fontFamily: theme.typography.fontHeader,
                            fontSize: theme.typographyScale.cardTitle,
                            fontWeight: 700,
                            color: i === 0 ? theme.accent.cyan : i === 1 ? theme.accent.violet : i === 2 ? theme.accent.blue : theme.accent.gold
                        }}>
                            {phase.title}
                        </div>

                        {'badge' in phase && phase.badge && (
                            <ComplianceBadge style={{ alignSelf: 'flex-start' }}>
                                {phase.badge}
                            </ComplianceBadge>
                        )}

                        <div style={{
                            fontFamily: theme.typography.fontUi,
                            fontSize: theme.typographyScale.body,
                            color: 'rgba(255,255,255,0.7)',
                            lineHeight: 1.4
                        }}>
                            {phase.desc}
                        </div>

                        <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: `1px solid ${theme.glass.glassBorderSubtle}`, display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {phase.bullets.map((bullet, j) => (
                                <div key={j} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'white', marginTop: 8 }} />
                                    <div style={{ fontFamily: theme.typography.fontUi, fontSize: theme.typographyScale.body, color: 'rgba(255,255,255,0.8)' }}>
                                        {bullet}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </GlassCard>
                ))}
            </div>
            {/* -- CHART SECTION -- */}
            <div style={{ marginTop: theme.spacing.space6, display: 'flex', justifyContent: 'center' }}>
                <GlassCard style={{ padding: '20px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ fontFamily: theme.typography.fontHeader, fontSize: theme.typographyScale.meta, color: theme.accent.cyan, marginBottom: 10 }}>User Growth Targets</div>
                    <ChartBar
                        data={[
                            { value: 1000, label: 'Phase 1', color: theme.accent.cyan },
                            { value: 10000, label: 'Phase 2', color: theme.accent.cyan },
                            { value: 100000, label: 'Phase 3', color: theme.accent.cyan },
                        ]}
                        width={600}
                        height={120}
                        color={theme.accent.cyan}
                    />
                </GlassCard>
            </div>
        </SlideFrame>
    );
};
