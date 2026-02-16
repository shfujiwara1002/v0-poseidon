import React from 'react';
import { SlideFrame } from './shared/SlideFrame';
import { copy } from './shared/copy';
import { theme } from './shared/theme';
import { Tier3Background } from './shared/visuals/tier3/Tier3Background';
import { EnginePill } from './shared/EnginePill';
import { NeonText } from './shared/NeonText';
import { backgroundPresets } from './shared/backgroundPresets';
import { staticFile } from 'remotion';
import { GlassCard } from './shared/GlassCard';
import { slideLayouts } from './shared/slideLayouts';
import { ShapeOrbit } from './shared/visuals/ShapeOrbit';
import { BloomEffect } from './shared/effects/BloomEffect';
import { DustMotes } from './shared/effects/FloatingParticles';

interface Slide01TitleProps {
    debug?: boolean;
    debugGrid?: boolean;
    debugIds?: boolean;
}

export const Slide01Title: React.FC<Slide01TitleProps> = ({ debug = false, debugGrid, debugIds }) => {
    const layout = slideLayouts.slide01;

    return (
        <SlideFrame debug={debug} debugGrid={debugGrid} debugIds={debugIds}>
            {/* -- TIER3 BACKGROUND -- */}
            <Tier3Background layers={backgroundPresets.blue} />
            <DustMotes count={40} opacity={0.08} />

            {/* -- CENTERED CONTENT -- */}
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                gap: theme.spacing.space8,
            }} data-debug-id="slide01.content">

                {/* Logo with ShapeOrbit backdrop and BloomEffect */}
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: theme.spacing.space6 }}>
                    <ShapeOrbit size={520} rings={4} color={theme.accent.cyan} style={{ position: 'absolute', opacity: 0.18 }} />
                    <BloomEffect intensity={0.28} rays={0} color={theme.accent.cyan}>
                        <img
                            src={staticFile('assets/png/logo-trident-only.png')}
                            alt="Poseidon Logo"
                            data-debug-id="slide01.logo"
                            style={{ height: layout.logoHeight, width: 'auto' }}
                        />
                    </BloomEffect>
                </div>

                {/* Text Stack */}
                <div style={{ maxWidth: layout.maxWidth }} data-debug-id="slide01.text">
                    <h1 style={{
                        fontFamily: theme.typography.fontHeader,
                        fontSize: layout.titleSize, // Hero Title for Slide 01
                        fontWeight: 700,
                        color: 'white',
                        margin: 0,
                        textShadow: theme.textCrisp,
                        letterSpacing: -2,
                        lineHeight: 1.1,
                    }} data-debug-id="slide01.title">
                        {copy.slide01.title}
                    </h1>

                    <h2 style={{
                        fontFamily: theme.typography.fontUi,
                        fontSize: theme.typographyScale.subtitle,
                        fontWeight: 400,
                        marginTop: theme.spacing.space4,
                        marginBottom: theme.spacing.space2,
                    }} data-debug-id="slide01.subtitle">
                        <NeonText color="cyan">
                            {copy.slide01.subtitle}
                        </NeonText>
                    </h2>

                    <div style={{
                        fontFamily: theme.typography.fontUi,
                        fontSize: theme.typographyScale.body,
                        color: theme.accent.cyan,
                        marginTop: theme.spacing.space4,
                        opacity: 0.8,
                    }} data-debug-id="slide01.body">
                        {copy.slide01.body}
                    </div>

                </div>

                {/* Engine Strip */}
                <GlassCard
                    tone="dark"
                    style={{
                        display: 'flex',
                        gap: theme.spacing.space4,
                        marginTop: theme.spacing.space8,
                        padding: layout.engineStripPadding,
                        justifyContent: 'center',
                    }}
                    liquidGlass="subtle"
                    debugId="slide01.engines"
                >
                    <EnginePill status="Protect" />
                    <EnginePill status="Grow" />
                    <EnginePill status="Execute" />
                    <EnginePill status="Govern" />
                </GlassCard>

            </div>
        </SlideFrame>
    );
};
