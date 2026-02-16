import React from 'react';
import { SlideFrame } from './shared/SlideFrame';
import { copy } from './shared/copy';
import { theme } from './shared/theme';
import { Tier3Background } from './shared/visuals/tier3/Tier3Background';
import { backgroundPresets } from './shared/backgroundPresets';
import { SlideHeader } from './shared/SlideHeader';
import { VisualWireframe } from './shared/visuals/VisualWireframe';
import { slideLayouts } from './shared/slideLayouts';
import { DeviceFrame } from './shared/visuals/DeviceFrame';
import { DustMotes } from './shared/effects/FloatingParticles';

interface Slide07DemoProps {
    debug?: boolean;
    debugGrid?: boolean;
    debugIds?: boolean;
}

export const Slide07Demo: React.FC<Slide07DemoProps> = ({ debug = false, debugGrid, debugIds }) => {
    const layout = slideLayouts.slide07;

    return (
        <SlideFrame debug={debug} debugGrid={debugGrid} debugIds={debugIds}>
            <Tier3Background layers={backgroundPresets.teal} />
            <DustMotes count={30} opacity={0.06} />

            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: theme.spacing.space6,
            }} data-debug-id="slide07.body">
                <div style={{ width: '100%', maxWidth: layout.headerMaxWidth, textAlign: 'center' }} data-debug-id="slide07.header">
                    <SlideHeader
                        title={copy.slide07.title}
                        subtitle={copy.slide07.subtitle}
                        badge={copy.slide07.caption}
                        subtitleStyle={{ textAlign: 'center' }}
                        debugId="slide07.header.inner"
                        debugBadgeId="slide07.header.badge"
                        debugTitleId="slide07.header.title"
                        debugSubtitleId="slide07.header.subtitle"
                    />
                </div>

                {/* Demo in DeviceFrame */}
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', minHeight: 0 }}>
                    <DeviceFrame
                        device="macbook"
                        style={{
                            width: layout.demoWidth,
                            height: layout.demoHeight,
                        }}
                    >
                        <div
                            style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 8,
                                boxSizing: 'border-box',
                            }}
                        >
                            <VisualWireframe
                                width={layout.wireframeWidth}
                                height={layout.wireframeHeight}
                                color={theme.accent.cyan}
                            />
                        </div>
                    </DeviceFrame>
                </div>

            </div>
        </SlideFrame>
    );
};
