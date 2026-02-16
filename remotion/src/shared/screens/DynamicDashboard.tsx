import React from 'react';
import { AbsoluteFill } from 'remotion';
import { GlassCard } from '../GlassCard';
import { SlideIcon } from '../SlideIcon';
import { theme } from '../theme';
import { CameraController, CameraKeyframe, CameraEasing } from '../camera/CameraController';
import { HighlightBox } from '../camera/Spotlight';
import { AnimatedChartLine } from '../live-ui/AnimatedChart';
import { AnimatedStat } from '../live-ui/AnimatedProgress';
import { AnimatedEnginePill, AnimatedCardReveal } from '../live-ui/AnimatedUI';
import { ActivityFeedItem } from '../live-ui/AnimatedList';
import { remotionCoreScreenContracts } from '../screen-contracts';

interface DynamicDashboardProps {
    /** Camera keyframes for movement */
    cameraKeyframes?: CameraKeyframe[];
    /** Delay before animations start */
    delay?: number;
    /** Areas to highlight */
    highlights?: Array<{
        id: string;
        left: number;
        top: number;
        width: number;
        height: number;
        label?: string;
        delay: number;
    }>;
}

/**
 * Dynamic Dashboard screen with live animations and camera control.
 * This wraps the existing Dashboard layout but adds:
 * - Camera zoom/pan capabilities
 * - Live chart drawing
 * - Animated stats
 * - Engine pill activation sequence
 * - Spotlight highlights
 */
export const DynamicDashboard: React.FC<DynamicDashboardProps> = ({
    cameraKeyframes = [
        { frame: 0, scale: 0.65, x: 0, y: 0 },
        { frame: 30, scale: 0.65, x: 0, y: 0, easing: CameraEasing.smooth },
        { frame: 60, scale: 1.1, x: 15, y: -10, easing: CameraEasing.zoomIn },  // Zoom to System Pulse
        { frame: 120, scale: 1.1, x: 15, y: -10 },
        { frame: 150, scale: 0.7, x: 0, y: 0, easing: CameraEasing.zoomOut },
    ],
    delay = 0,
    highlights = [],
}) => {
    const dashboardContract = remotionCoreScreenContracts['S-V3-CORE01'];

    // Chart data
    const chartData = [1200, 1320, 1180, 1460, 1550, 1480, 1620];
    const upperBand = chartData.map((v) => v + 220);
    const lowerBand = chartData.map((v) => v - 220);

    // Navigation items
    const navItems = [
        { key: 'Dashboard', icon: 'data-grid', active: true },
        { key: 'Protect', icon: 'shield', active: false },
        { key: 'Grow', icon: 'wave', active: false },
        { key: 'Execute', icon: 'signal-beam', active: false },
        { key: 'Govern', icon: 'govern-core', active: false },
    ];

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
                                                    border: item.active ? `1px solid ${theme.accent.cyan}` : '1px solid transparent',
                                                    color: item.active ? 'white' : 'rgba(255,255,255,0.6)',
                                                }}
                                            >
                                                <SlideIcon
                                                    name={item.icon}
                                                    size={16}
                                                    glowColor={item.active ? 'cyan' : 'white'}
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
                                <div
                                    style={{
                                        flex: 1,
                                        maxWidth: 520,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 10,
                                        padding: '8px 12px',
                                        borderRadius: 12,
                                        background: 'rgba(255,255,255,0.06)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        color: 'rgba(255,255,255,0.6)',
                                        fontSize: 14,
                                    }}
                                >
                                    Search alerts, accounts, models
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>Today 09:24</div>
                                    <div style={{ width: 8, height: 8, borderRadius: 999, background: theme.accent.cyan }} />
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
                                <div style={{ fontSize: 30, fontWeight: 600 }}>Dashboard: Unified Financial Command</div>
                                <div style={{ fontSize: 16, opacity: 0.7, marginTop: 4 }}>
                                    {dashboardContract.oneScreenMessage}
                                </div>
                                <div style={{ fontSize: 13, opacity: 0.55, marginTop: 6 }}>
                                    Next: {dashboardContract.transitionCue}
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
                                {/* System Pulse card */}
                                <div style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: 16 }}>
                                    <AnimatedCardReveal delay={delay + 15} direction="up">
                                        <GlassCard style={{ minHeight: 340, padding: 22 }}>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    marginBottom: 14,
                                                }}
                                            >
                                                <div style={{ fontSize: 20, fontWeight: 600 }}>System Pulse</div>
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
                                                    GOVERN-VERIFIED
                                                </div>
                                            </div>

                                            {/* Animated stats */}
                                            <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                                                <AnimatedStat label="Net Worth" value="$142k" subtext="+2.4% MoM" color={theme.accent.cyan} delay={delay + 25} />
                                                <AnimatedStat label="Cash Flow" value="+$1,240" subtext="30-day" color={theme.accent.teal} delay={delay + 30} />
                                                <AnimatedStat label="Alerts" value="2" subtext="High priority" color={theme.accent.red} delay={delay + 35} />
                                            </div>

                                            {/* Animated chart */}
                                            <AnimatedChartLine
                                                data={chartData}
                                                confidenceUpper={upperBand}
                                                confidenceLower={lowerBand}
                                                showConfidenceBand
                                                showDotGrid
                                                width={650}
                                                height={160}
                                                color={theme.accent.cyan}
                                                delay={delay + 40}
                                                drawDuration={60}
                                            />

                                            {/* Engine pills */}
                                            <div style={{ display: 'flex', gap: 10, marginTop: 14, flexWrap: 'wrap' }}>
                                                <AnimatedEnginePill engine="Protect" delay={delay + 90} active />
                                                <AnimatedEnginePill engine="Grow" delay={delay + 96} active />
                                                <AnimatedEnginePill engine="Execute" delay={delay + 102} active />
                                                <AnimatedEnginePill engine="Govern" delay={delay + 108} active />
                                            </div>
                                        </GlassCard>
                                    </AnimatedCardReveal>
                                </div>

                                {/* AI Insight card */}
                                <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: 16 }}>
                                    <AnimatedCardReveal delay={delay + 20} direction="right">
                                        <GlassCard style={{ minHeight: 340, padding: 20 }}>
                                            <div style={{ fontSize: 18, fontWeight: 600 }}>AI Insight</div>
                                            <div style={{ color: 'rgba(255,255,255,0.75)', marginTop: 10, lineHeight: 1.5 }}>
                                                Subscriptions increased 8% this month. Triton recommends consolidating two services to restore your cash buffer.
                                            </div>
                                            <div style={{ marginTop: 14, color: theme.accent.cyan, fontSize: 14 }}>
                                                Audit ID G-DB-014 · Confidence 0.88
                                            </div>
                                            <div style={{ display: 'flex', gap: 10, marginTop: 18, flexWrap: 'wrap' }}>
                                                <div
                                                    style={{
                                                        padding: '10px 16px',
                                                        borderRadius: 10,
                                                        background: theme.accent.teal,
                                                        color: '#001018',
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    Review Plan
                                                </div>
                                                <div
                                                    style={{
                                                        padding: '10px 16px',
                                                        borderRadius: 10,
                                                        border: '1px solid rgba(255,255,255,0.3)',
                                                        color: 'white',
                                                    }}
                                                >
                                                    View Details
                                                </div>
                                            </div>
                                        </GlassCard>
                                    </AnimatedCardReveal>
                                </div>

                                {/* Bottom cards */}
                                <div style={{ gridColumn: 'span 12', display: 'flex', gap: 20 }}>
                                    <AnimatedCardReveal delay={delay + 50} direction="up">
                                        <GlassCard style={{ flex: 1, padding: 18 }}>
                                            <div style={{ fontSize: 16, fontWeight: 600 }}>Recent Activity</div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 }}>
                                                <ActivityFeedItem time="02:14" message="Protect flagged unauthorized transfer" color={theme.accent.red} delay={delay + 55} />
                                                <ActivityFeedItem time="08:32" message="Grow forecast updated · Confidence 0.79" color={theme.accent.violet} delay={delay + 60} />
                                                <ActivityFeedItem time="09:05" message="Execute negotiated Comcast bill" color={theme.accent.cyan} delay={delay + 65} />
                                            </div>
                                        </GlassCard>
                                    </AnimatedCardReveal>
                                    <AnimatedCardReveal delay={delay + 55} direction="up">
                                        <GlassCard style={{ flex: 1, padding: 18 }}>
                                            <div style={{ fontSize: 16, fontWeight: 600 }}>Action Queue</div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 10, color: 'rgba(255,255,255,0.7)' }}>
                                                <div>2 high-priority approvals</div>
                                                <div>3 automation proposals</div>
                                                <div>Audit coverage 98%</div>
                                            </div>
                                        </GlassCard>
                                    </AnimatedCardReveal>
                                    <AnimatedCardReveal delay={delay + 60} direction="up">
                                        <GlassCard style={{ flex: 1, padding: 18 }}>
                                            <div style={{ fontSize: 16, fontWeight: 600 }}>Upcoming Bills</div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 10, color: 'rgba(255,255,255,0.7)' }}>
                                                <div>$620 due next 7 days</div>
                                                <div>Subscriptions up 8%</div>
                                                <div>Buffer impact: -$120</div>
                                            </div>
                                        </GlassCard>
                                    </AnimatedCardReveal>
                                </div>
                            </div>
                        </div>
                    </div>
                </AbsoluteFill>
            </CameraController>

            {/* Highlights overlay */}
            {highlights.map((h) => (
                <HighlightBox
                    key={h.id}
                    left={h.left}
                    top={h.top}
                    width={h.width}
                    height={h.height}
                    label={h.label}
                    delay={h.delay}
                    color={theme.accent.cyan}
                />
            ))}
        </AbsoluteFill>
    );
};
