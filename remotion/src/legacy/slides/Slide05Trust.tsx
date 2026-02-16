import React from 'react';
import { staticFile } from 'remotion';
import { Tier3Background } from './shared/visuals/tier3/Tier3Background';
import { SlideFrame } from './shared/SlideFrame';
import { copy } from './shared/copy';
import { theme } from './shared/theme';
import { GlassCard } from './shared/GlassCard';
import { SlideIcon } from './shared/SlideIcon';
import { ComplianceBadge } from './shared/ComplianceBadge';
import { backgroundPresets } from './shared/backgroundPresets';
import { SlideHeader } from './shared/SlideHeader';

export const Slide05Trust: React.FC = () => {
    const points = copy.slide05.points;
    // Fallback if badges is missing in copy for some reason, though it shouldn't be
    const badges = copy.slide05.badges ?? ['GDPR', 'SOC 2', 'EU AI Act', 'ISO 27001'];

    return (
        <SlideFrame>
            {/* -- TIER3: Blue trust atmosphere -- */}
            <Tier3Background layers={backgroundPresets.blue} />

            {/* -- HEADER -- */}
            <SlideHeader
                badge={copy.slide05.badge}
                title={copy.slide05.title}
                subtitle={copy.slide05.subtitle}
                subtitleHighlight={copy.slide05.subtitleHighlight}
            />

            {/* -- CONTENT: 2-column layout -- */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: theme.spacing.space10,
                flex: 1,
            }}>
                {/* Left: 2x2 trust point cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: theme.spacing.space4,
                }}>
                    {points.map((point, i) => (
                        <GlassCard
                            key={i}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                gap: 10,
                                padding: 24,
                            }}
                        >
                            <SlideIcon name={point.icon ?? 'insight-lamp'} size={32} glowColor="cyan" />
                            <div style={{
                                fontFamily: theme.typography.fontHeader,
                                fontSize: theme.typographyScale.cardTitle,
                                fontWeight: 600,
                                color: theme.accent.cyan,
                            }}>
                                {point.title}
                            </div>
                            {point.desc && (
                                <div style={{
                                    fontFamily: theme.typography.fontUi,
                                    fontSize: theme.typographyScale.body,
                                    color: 'rgba(255,255,255,0.75)',
                                    lineHeight: 1.5,
                                }}>
                                    {point.desc}
                                </div>
                            )}
                        </GlassCard>
                    ))}
                </div>

                {/* Right: Compliance architecture showcase */}
                <GlassCard
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        gap: 28,
                        border: `1px solid ${theme.accent.cyan}`,
                        padding: 32,
                    }}
                >
                    <img
                        src={staticFile('assets/svg/icons/icon-govern-core.svg')}
                        alt=""
                        width={100}
                        height={100}
                        style={{ objectFit: 'contain', filter: theme.iconGlow.default }}
                    />
                    <div style={{
                        fontFamily: theme.typography.fontMono,
                        fontSize: theme.typographyScale.label,
                        letterSpacing: 2,
                        color: theme.accent.cyan,
                    }}>
                        COMPLIANCE ARCHITECTURE
                    </div>
                    {/* v4.0: Added explanatory text */}
                    <div style={{
                        fontFamily: theme.typography.fontUi,
                        fontSize: theme.typographyScale.body,
                        color: 'rgba(255,255,255,0.7)',
                        textAlign: 'center',
                        maxWidth: 400,
                        lineHeight: 1.5,
                    }}>
                        {copy.slide05.complianceDesc || 'Trust is not a feature — it is the foundation. Every decision is explainable, auditable, and fair.'}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
                        {badges.map((b) => (
                            <ComplianceBadge key={b} style={{ padding: '6px 16px' }}>
                                {b}
                            </ComplianceBadge>
                        ))}
                    </div>
                </GlassCard>
            </div>
        </SlideFrame>
    );
};
