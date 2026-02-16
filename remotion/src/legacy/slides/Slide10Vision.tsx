import React from 'react';
import { SlideFrame } from './shared/SlideFrame';
import { copy } from './shared/copy';
import { theme } from './shared/theme';
import { Tier3Background } from './shared/visuals/tier3/Tier3Background';
import { NeonText } from './shared/NeonText';
import { EnginePill } from './shared/EnginePill';
import { backgroundPresets } from './shared/backgroundPresets';

export const Slide10Vision: React.FC = () => {
    return (
        <SlideFrame>
            <Tier3Background layers={backgroundPresets.cyan} />

            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                gap: theme.spacing.space8,
                maxWidth: 1200,
                margin: '0 auto'
            }}>
                <h1 style={{
                    fontFamily: theme.typography.fontHeader,
                    fontSize: 80,
                    fontWeight: 700,
                    color: 'white',
                    lineHeight: 1.2,
                }}>
                    AI is not the protagonist.<br />
                    <NeonText color="cyan">You are.</NeonText>
                </h1>

                <h2 style={{
                    fontFamily: theme.typography.fontUi,
                    fontSize: 42,
                    fontWeight: 400,
                    color: 'rgba(255,255,255,0.9)',
                    maxWidth: 1000,
                    lineHeight: 1.4,
                }}>
                    {copy.slide10.supporting}
                </h2>

                <div style={{ display: 'flex', gap: theme.spacing.space4, marginTop: theme.spacing.space8 }}>
                    <EnginePill status="Protect" />
                    <EnginePill status="Grow" />
                    <EnginePill status="Execute" />
                    <EnginePill status="Govern" />
                </div>
            </div>
        </SlideFrame>
    );
};
