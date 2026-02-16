import React from 'react';
import { theme } from './shared/theme';
import { SlideFrame } from './shared/SlideFrame';
import { GlassCard } from './shared/GlassCard';
import { VisualCircuit } from './shared/visuals/tier3/VisualCircuit';
import { VisualHexMesh } from './shared/visuals/tier3/VisualHexMesh';
import { VisualHoloGlobe } from './shared/visuals/tier3/VisualHoloGlobe';
import { ChartLine } from './shared/charts/ChartLine';

const CONTENT_OFFSET_X = 120;
const CONTENT_OFFSET_Y = 80;

export const HighFidelityDemo: React.FC = () => {
    return (
        <SlideFrame showFooter={false}>
            {/* Wrapper fills content area; tier3 visuals extend to full frame */}
            <div
                style={{
                    position: 'absolute',
                    left: -CONTENT_OFFSET_X,
                    top: -CONTENT_OFFSET_Y,
                    width: 1920,
                    height: 1080,
                    flex: 1,
                }}
            >
                {/* Layer 1: Hex Mesh (below card) */}
                <div style={{ position: 'absolute', inset: 0, opacity: 0.3 }}>
                    <VisualHexMesh width={1920} height={1080} scale={60} color={theme.accent.violet} />
                </div>

                {/* Layer 2: Circuit overlay */}
                <div style={{ position: 'absolute', inset: 0, opacity: 0.4, mixBlendMode: 'screen' }}>
                    <VisualCircuit width={1920} height={1080} density={30} color={theme.accent.cyan} />
                </div>

                {/* Layer 3: Globe on right */}
                <div
                    style={{
                        position: 'absolute',
                        right: 100,
                        top: '50%',
                        transform: 'translateY(-50%)',
                    }}
                >
                    <VisualHoloGlobe width={800} height={800} radius={350} color={theme.accent.cyan} />
                </div>

                {/* Layer 4: Fintech data card (GlassCard with liquid glass) */}
                <div
                    style={{
                        position: 'absolute',
                        left: 150,
                        top: 300,
                        width: 800,
                    }}
                >
                    <GlassCard liquidGlass style={{ padding: 40 }}>
                        <h1
                            style={{
                                fontFamily: theme.typography.fontHeader,
                                fontSize: 64,
                                marginBottom: 10,
                                color: 'white',
                                textShadow: theme.neon.cyan.standard,
                            }}
                        >
                            FINTECH
                        </h1>
                        <p
                            style={{
                                fontFamily: theme.typography.fontUi,
                                fontSize: 24,
                                marginBottom: 40,
                                color: theme.accent.cyan,
                                textShadow: theme.neon.cyan.standard,
                            }}
                        >
                            GLOBAL INTELLIGENCE NETWORK
                        </p>
                        <ChartLine
                            data={[10, 25, 20, 45, 40, 70, 65, 90, 85, 100]}
                            width={700}
                            height={300}
                            color={theme.accent.cyan}
                            showArea
                            showGrid
                            calloutLabel="+100.0%"
                        />
                    </GlassCard>
                </div>
            </div>
        </SlideFrame>
    );
};
