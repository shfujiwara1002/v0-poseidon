import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { GlassCard } from '../GlassCard';
import { SlideIcon } from '../SlideIcon';
import { theme } from '../theme';
import { CameraController, CameraKeyframe, CameraEasing } from '../camera/CameraController';
import { Spotlight } from '../camera/Spotlight';
import { AnimatedFactorBars, AnimatedStat } from '../live-ui/AnimatedProgress';
import { BlinkingBadge, AnimatedEnginePill, AnimatedCardReveal, PulsingButton, ShakeElement } from '../live-ui/AnimatedUI';
import { remotionCoreScreenContracts } from '../screen-contracts';

interface DynamicProtectProps {
    cameraKeyframes?: CameraKeyframe[];
    delay?: number;
    showSpotlight?: boolean;
    spotlightTarget?: { x: number; y: number };
}

/**
 * Dynamic Protect screen showing threat detection with explainability.
 * Key focus: Risk factors, explainability panel, approval buttons.
 */
export const DynamicProtect: React.FC<DynamicProtectProps> = ({
    cameraKeyframes = [
        { frame: 0, scale: 0.65, x: 0, y: 0 },
        { frame: 25, scale: 0.65, x: 0, y: 0 },
        { frame: 60, scale: 1.3, x: 25, y: 5, easing: CameraEasing.zoomIn },   // Zoom to explainability panel
        { frame: 110, scale: 1.3, x: 25, y: 5 },
        { frame: 150, scale: 0.7, x: 0, y: 0, easing: CameraEasing.zoomOut },
    ],
    delay = 0,
    showSpotlight = false,
    spotlightTarget = { x: 75, y: 50 },
}) => {
    const protectContract = remotionCoreScreenContracts['S-V3-PRT01'];

    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Risk factors for explainability
    const factors = [
        { label: 'Location mismatch', value: 0.86, color: theme.accent.red },
        { label: 'New merchant type', value: 0.72, color: theme.accent.amber },
        { label: 'Unusual time', value: 0.58, color: theme.accent.cyan },
    ];

    // Navigation items
    const navItems = [
        { key: 'Dashboard', icon: 'data-grid', active: false },
        { key: 'Protect', icon: 'shield', active: true },
        { key: 'Grow', icon: 'wave', active: false },
        { key: 'Execute', icon: 'signal-beam', active: false },
        { key: 'Govern', icon: 'govern-core', active: false },
    ];

    const detailRow = (label: string, value: string, rowDelay: number) => {
        const reveal = spring({
            frame: frame - rowDelay,
            fps,
            config: { damping: 12, stiffness: 100 },
        });

        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: 15,
                    opacity: reveal,
                    transform: `translateX(${interpolate(reveal, [0, 1], [-15, 0])}px)`,
                }}
            >
                <span style={{ color: 'rgba(255,255,255,0.6)' }}>{label}</span>
                <span style={{ color: 'white', fontWeight: 600 }}>{value}</span>
            </div>
        );
    };

    return (
        <AbsoluteFill style={{ background: '#000' }}>
            <CameraController keyframes={cameraKeyframes}>
                <AbsoluteFill
                    style={{
                        background: theme.backgroundGradient,
                        color: 'white',
                        fontFamily: theme.typography.fontUi,
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: theme.spacing.marginY,
                            left: theme.spacing.marginX,
                            right: theme.spacing.marginX,
                            bottom: theme.spacing.marginY,
                            display: 'grid',
                            gridTemplateColumns: '240px 1fr',
                            gridTemplateRows: '64px 1fr',
                            gap: 20,
                        }}
                    >
                        {/* Sidebar */}
                        <AnimatedCardReveal delay={delay} direction="left">
                            <GlassCard
                                tone="dark"
                                style={{
                                    gridRow: '1 / span 2',
                                    padding: 18,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 16,
                                    height: '100%',
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                                    <SlideIcon name="vault" size={20} glowColor="cyan" variant="simple" />
                                    <div style={{ fontWeight: 700, letterSpacing: '0.02em' }}>Poseidon</div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                    {navItems.map((item, i) => (
                                        <AnimatedCardReveal key={item.key} delay={delay + 10 + i * 5} direction="left">
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 10,
                                                    padding: '10px 12px',
                                                    borderRadius: 12,
                                                    background: item.active ? 'rgba(255,255,255,0.08)' : 'transparent',
                                                    border: item.active ? `1px solid ${theme.accent.teal}` : '1px solid transparent',
                                                    color: item.active ? 'white' : 'rgba(255,255,255,0.6)',
                                                }}
                                            >
                                                <SlideIcon
                                                    name={item.icon}
                                                    size={16}
                                                    glowColor={item.active ? 'teal' : 'white'}
                                                    variant="simple"
                                                />
                                                <span style={{ fontSize: 14, fontWeight: item.active ? 600 : 500 }}>
                                                    {item.key}
                                                </span>
                                            </div>
                                        </AnimatedCardReveal>
                                    ))}
                                </div>
                            </GlassCard>
                        </AnimatedCardReveal>

                        {/* Top bar */}
                        <AnimatedCardReveal delay={delay + 5} direction="down">
                            <GlassCard
                                tone="dark"
                                style={{
                                    gridColumn: 2,
                                    height: 64,
                                    padding: '12px 16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                    <BlinkingBadge color={theme.accent.red} delay={delay + 15}>
                                        1 ALERT
                                    </BlinkingBadge>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <div style={{ width: 8, height: 8, borderRadius: 999, background: theme.accent.teal }} />
                                    <div
                                        style={{
                                            width: 34,
                                            height: 34,
                                            borderRadius: '50%',
                                            background: 'rgba(255,255,255,0.12)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: 14,
                                            fontWeight: 600,
                                        }}
                                    >
                                        KA
                                    </div>
                                </div>
                            </GlassCard>
                        </AnimatedCardReveal>

                        {/* Main content */}
                        <div
                            style={{
                                gridColumn: 2,
                                gridRow: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 16,
                            }}
                        >
                            {/* Title */}
                            <AnimatedCardReveal delay={delay + 8}>
                                <div style={{ fontSize: 30, fontWeight: 600 }}>Protect: Real-Time Threat Detection</div>
                                <div style={{ fontSize: 16, opacity: 0.7, marginTop: 4 }}>
                                    {protectContract.oneScreenMessage}
                                </div>
                                <div style={{ fontSize: 13, opacity: 0.55, marginTop: 6 }}>
                                    Next: {protectContract.transitionCue}
                                </div>
                            </AnimatedCardReveal>

                            {/* Content grid */}
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
                                    gap: 20,
                                    flex: 1,
                                }}
                            >
                                {/* Alert card */}
                                <div style={{ gridColumn: 'span 7', display: 'flex', flexDirection: 'column', gap: 16 }}>
                                    <AnimatedCardReveal delay={delay + 15} direction="up">
                                        <ShakeElement active={frame > delay + 20 && frame < delay + 40} intensity={2}>
                                            <GlassCard variant="teal" style={{ minHeight: 400, padding: 24 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                                                    <BlinkingBadge color={theme.accent.red} delay={delay + 20}>
                                                        HIGH RISK
                                                    </BlinkingBadge>
                                                    <AnimatedEnginePill engine="Protect" delay={delay + 25} active />
                                                </div>

                                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                                                    <SlideIcon name="shield" size={34} glowColor="red" />
                                                    <div>
                                                        <div style={{ fontSize: 22, fontWeight: 600 }}>Possible unauthorized transfer</div>
                                                        <div style={{ color: 'rgba(255,255,255,0.6)' }}>Today · 02:14 AM</div>
                                                    </div>
                                                </div>

                                                {/* Animated stats */}
                                                <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
                                                    <AnimatedStat label="Amount" value="$1,240" subtext="Unauthorized" color={theme.accent.red} delay={delay + 30} />
                                                    <AnimatedStat label="Risk Score" value="92" subtext="High" color={theme.accent.teal} delay={delay + 35} />
                                                    <AnimatedStat label="Confidence" value="0.86" subtext="Model v2.4" color={theme.accent.cyan} delay={delay + 40} />
                                                </div>

                                                {/* Transaction details */}
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                                    {detailRow('Merchant', 'QuickCash Transfer', delay + 45)}
                                                    {detailRow('Channel', 'P2P Instant', delay + 48)}
                                                    {detailRow('Account', 'Checking · 2041', delay + 51)}
                                                </div>

                                                {/* Similar activity */}
                                                <div style={{ marginTop: 18, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                                                    <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>Similar activity</div>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                                        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>QuickCash · $120 · 7 days ago</div>
                                                        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>Venmo · $75 · 12 days ago</div>
                                                    </div>
                                                </div>
                                            </GlassCard>
                                        </ShakeElement>
                                    </AnimatedCardReveal>
                                </div>

                                {/* Explainability panel - KEY FOCUS AREA */}
                                <div style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', gap: 16 }}>
                                    <AnimatedCardReveal delay={delay + 20} direction="right">
                                        <GlassCard style={{ minHeight: 400, padding: 24 }}>
                                            <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>
                                                Explainability + Actions
                                            </div>
                                            <div style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.5, marginBottom: 20 }}>
                                                We flag anomalies in milliseconds and surface the top factors before you decide.
                                            </div>

                                            {/* Animated factor bars */}
                                            <AnimatedFactorBars factors={factors} delay={delay + 60} stagger={12} width={300} />

                                            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 16 }}>
                                                Confidence 0.86 · Based on last 90 days · Model v2.4
                                            </div>

                                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 14 }}>
                                                <div
                                                    style={{
                                                        padding: '4px 10px',
                                                        borderRadius: 6,
                                                        background: 'rgba(20,184,166,0.15)',
                                                        border: '1px solid rgba(20,184,166,0.5)',
                                                        fontSize: 11,
                                                        fontWeight: 600,
                                                        color: theme.accent.teal,
                                                    }}
                                                >
                                                    GOVERN‑VERIFIED
                                                </div>
                                                <span style={{ color: theme.accent.cyan, fontSize: 14 }}>Audit ID G‑PF‑0192</span>
                                            </div>

                                            {/* Action buttons */}
                                            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 20 }}>
                                                <PulsingButton color={theme.accent.teal} delay={delay + 100}>
                                                    Approve
                                                </PulsingButton>
                                                <AnimatedCardReveal delay={delay + 105}>
                                                    <div
                                                        style={{
                                                            padding: '14px 24px',
                                                            borderRadius: 10,
                                                            border: '1px solid rgba(255,255,255,0.3)',
                                                            color: 'white',
                                                            fontWeight: 600,
                                                        }}
                                                    >
                                                        Dismiss as Fraud
                                                    </div>
                                                </AnimatedCardReveal>
                                            </div>
                                        </GlassCard>
                                    </AnimatedCardReveal>
                                </div>
                            </div>
                        </div>
                    </div>
                </AbsoluteFill>
            </CameraController>

            {/* Spotlight effect */}
            {showSpotlight && (
                <Spotlight
                    x={spotlightTarget.x}
                    y={spotlightTarget.y}
                    radius={250}
                    intensity={0.8}
                    feather={100}
                    delay={delay + 55}
                    pulse
                    tintColor={theme.accent.cyan}
                />
            )}
        </AbsoluteFill>
    );
};
