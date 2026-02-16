import React from 'react';
import { SlideFrame } from './shared/SlideFrame';
import { copy } from './shared/copy';
import { theme } from './shared/theme';
import { Tier3Background } from './shared/visuals/tier3/Tier3Background';
import { GlassCard } from './shared/GlassCard';
import { VisualGlowingChart } from './shared/visuals/VisualGlowingChart';
import { backgroundPresets } from './shared/backgroundPresets';
import { SlideHeader } from './shared/SlideHeader';

export const Slide09Technology: React.FC = () => {
    return (
        <SlideFrame>
            <Tier3Background layers={backgroundPresets.cyan} />

            {/* -- HEADER -- */}
            <SlideHeader
                badge={copy.slide09.badge}
                title={copy.slide09.title}
                subtitle={copy.slide09.subtitle}
                subtitleHighlight={copy.slide09.subtitleHighlight}
            />

            {/* -- CONTENT -- */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: theme.spacing.space10, flex: 1 }}>

                {/* Left: Tech Stack & Arch */}
                <GlassCard style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>
                    <div>
                        <div style={{ fontFamily: theme.typography.fontHeader, fontSize: theme.typographyScale.cardTitle, marginBottom: 16, color: theme.accent.cyan }}>
                            Architecture
                        </div>
                        <div style={{ fontFamily: theme.typography.fontUi, fontSize: theme.typographyScale.body, lineHeight: 1.5, color: 'rgba(255,255,255,0.9)' }}>
                            {copy.slide09.architecture}
                        </div>
                    </div>

                    <div style={{ borderTop: `1px solid ${theme.glass.glassBorderSubtle}`, paddingTop: 24 }}>
                        <div style={{ fontFamily: theme.typography.fontHeader, fontSize: theme.typographyScale.cardTitle, marginBottom: 16, color: theme.accent.cyan }}>
                            Tech Stack
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                            {copy.slide09.techStack.map((item, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ fontFamily: theme.typography.fontMono, fontSize: theme.typographyScale.meta, color: 'white' }}>{item.name}</div>
                                    <div style={{ fontFamily: theme.typography.fontUi, fontSize: theme.typographyScale.label, color: 'rgba(255,255,255,0.5)' }}>{item.purpose}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </GlassCard>

                {/* Right: Stats & Design System detail */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.space8 }}>
                    <GlassCard variant="blue" style={{ flex: 1, padding: 32 }}>
                        <div style={{ fontFamily: theme.typography.fontHeader, fontSize: theme.typographyScale.cardTitle, marginBottom: 16, color: theme.accent.blue }}>
                            Quality Metrics
                        </div>
                        <div style={{ display: 'flex', gap: theme.spacing.space6 }}>
                            <div style={{ flex: 1 }}>
                                <VisualGlowingChart
                                    width={500}
                                    height={250}
                                    dataPoints={[
                                        { x: 0.1, y: 0.3, color: theme.accent.teal, label: 'Start' },
                                        { x: 0.3, y: 0.5, color: theme.accent.cyan },
                                        { x: 0.5, y: 0.8, color: theme.accent.violet },
                                        { x: 0.7, y: 0.9, color: theme.accent.gold },
                                        { x: 0.9, y: 0.96, color: theme.accent.cyan, label: '96/100' }
                                    ]}
                                    bands={[
                                        { startY: 0.3, endY: 0.96, color: theme.accent.cyan }
                                    ]}
                                    gridLines={4}
                                />
                            </div>
                        </div>
                    </GlassCard>
                    <GlassCard style={{ flex: 0.5, padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ fontFamily: theme.typography.fontMono, fontSize: theme.typographyScale.body, color: theme.accent.cyan, textAlign: 'center' }}>
                            96/100 Design System Audit Score
                        </div>
                    </GlassCard>
                </div>

            </div>
        </SlideFrame>
    );
};
