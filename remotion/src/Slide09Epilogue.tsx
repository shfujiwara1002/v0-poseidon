import React from 'react';
import { SlideFrame } from './shared/SlideFrame';
import { copy } from './shared/copy';
import { theme } from './shared/theme';
import { Tier3Background } from './shared/visuals/tier3/Tier3Background';
import { TeamCard } from './shared/TeamCard';
import { NeonText } from './shared/NeonText';
import { backgroundPresets } from './shared/backgroundPresets';
import { staticFile } from 'remotion';
import { QrDockCard } from './shared/QrDockCard';
import { GlassCard } from './shared/GlassCard';
import { slideLayouts } from './shared/slideLayouts';
import { BloomEffect } from './shared/effects/BloomEffect';
import { GlowPulse } from './shared/effects/GlowPulse';
import { authorityDarkGlassStyle } from './shared/authorityDarkGlassStyle';

interface Slide09EpilogueProps {
    debug?: boolean;
    debugGrid?: boolean;
    debugIds?: boolean;
}

export const Slide09Epilogue: React.FC<Slide09EpilogueProps> = ({ debug = false, debugGrid, debugIds }) => {
    const layout = slideLayouts.slide09;
    const content = copy.slide09;

    return (
        <SlideFrame debug={debug} debugGrid={debugGrid} debugIds={debugIds}>
            <Tier3Background layers={backgroundPresets.authorityEpilogue} />

            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                textAlign: 'center',
                gap: theme.spacing.space6,
                paddingTop: theme.spacing.space4,
                paddingBottom: theme.spacing.space4,
            }} data-debug-id="slide09.body">
                {/* Header */}
                <div style={{ flexShrink: 0 }} data-debug-id="slide09.header">
                    <div style={{
                        fontFamily: theme.typography.fontMono,
                        fontSize: theme.typographyScale.label,
                        color: 'rgba(255,255,255,0.5)',
                        marginBottom: theme.spacing.space4,
                    }} data-debug-id="slide09.header.eyebrow">
                        {content.eyebrow}
                    </div>
                    <h1 style={{
                        fontFamily: theme.typography.fontHeader,
                        fontSize: theme.typographyScale.title,
                        fontWeight: 700,
                        color: 'white',
                        margin: 0,
                        textShadow: theme.textCrisp,
                    }} data-debug-id="slide09.header.title">
                        {content.titleLead}{' '}
                        <BloomEffect intensity={0.22} rays={0} color={theme.accent.cyan}>
                            <NeonText color="cyan">{content.titleHighlight}</NeonText>
                        </BloomEffect>
                        {content.titleTail}
                    </h1>
                </div>

                {/* Team */}
                <GlassCard
                    tone="dark"
                    style={{
                        width: '100%',
                        maxWidth: layout.teamMaxWidth,
                        justifyContent: 'center',
                        alignItems: 'stretch',
                        padding: '18px 24px',
                        flexShrink: 0,
                        ...authorityDarkGlassStyle,
                    }}
                    liquidGlass="off"
                    debugId="slide09.team"
                >
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
                            gap: theme.spacing.space5,
                            width: '100%',
                        }}
                    >
                        {content.team.map((member) => (
                            <TeamCard
                                key={member.id}
                                name={member.name}
                                initials={member.initials}
                                tone="dark"
                                liquidGlass="off"
                                cardStyle={authorityDarkGlassStyle}
                                style={{ width: '100%' }}
                                debugId={`slide09.team.${member.id}`}
                            />
                        ))}
                    </div>
                </GlassCard>

                {/* Footer / CTA */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: theme.spacing.space5, flexShrink: 0 }} data-debug-id="slide09.footer">
                    <GlowPulse color={theme.accent.cyan} intensity={0.35} frequency={120}>
                        <QrDockCard
                            url={content.cta.url}
                            label={content.cta.label}
                            title="Scan to open prototype"
                            size="compact"
                            tone="dark"
                            liquidGlass="off"
                            cardStyle={authorityDarkGlassStyle}
                            debugId="slide09.cta.qr"
                        />
                    </GlowPulse>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }} data-debug-id="slide09.brand">
                        <img
                            src={staticFile('assets/png/logo-trident-only.png')}
                            alt="Poseidon Logo"
                            style={{ height: layout.logoHeight, width: 'auto' }}
                            data-debug-id="slide09.brand.logo"
                        />
                        <div style={{
                            fontFamily: theme.typography.fontHeader,
                            fontSize: theme.typographyScale.body,
                            color: 'white',
                        }} data-debug-id="slide09.brand.name">
                            Poseidon
                        </div>
                    </div>
                </div>

            </div>
        </SlideFrame>
    );
};
