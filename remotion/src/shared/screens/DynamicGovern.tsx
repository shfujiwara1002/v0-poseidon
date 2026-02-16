import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { GlassCard } from '../GlassCard';
import { SlideIcon } from '../SlideIcon';
import { theme } from '../theme';
import { CameraController, CameraKeyframe, CameraEasing } from '../camera/CameraController';
import { HighlightBox } from '../camera/Spotlight';
import { AnimatedProgressBar, AnimatedCounter } from '../live-ui/AnimatedProgress';
import { AnimatedAuditLog } from '../live-ui/AnimatedList';
import { AnimatedEnginePill, AnimatedCardReveal } from '../live-ui/AnimatedUI';

interface DynamicGovernProps {
    cameraKeyframes?: CameraKeyframe[];
    delay?: number;
    highlightAuditLog?: boolean;
}

/**
 * Dynamic Govern screen showing audit trail and trust metrics.
 * Key focus: Trust Index, Audit Ledger, Explainability Registry.
 */
export const DynamicGovern: React.FC<DynamicGovernProps> = ({
    cameraKeyframes = [
        { frame: 0, scale: 0.65, x: 0, y: 0 },
        { frame: 25, scale: 0.65, x: 0, y: 0 },
        { frame: 60, scale: 1.15, x: -10, y: 15, easing: CameraEasing.zoomIn },   // Zoom to Audit Ledger
        { frame: 110, scale: 1.15, x: -10, y: 15 },
        { frame: 150, scale: 0.7, x: 0, y: 0, easing: CameraEasing.zoomOut },
    ],
    delay = 0,
    highlightAuditLog = false,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Navigation items
    const navItems = [
        { key: 'Dashboard', icon: 'data-grid', active: false },
        { key: 'Protect', icon: 'shield', active: false },
        { key: 'Grow', icon: 'wave', active: false },
        { key: 'Execute', icon: 'signal-beam', active: false },
        { key: 'Govern', icon: 'govern-core', active: true },
    ];

    // Audit entries
    const auditEntries = [
        { id: 'G‑PF‑0192', engine: 'Protect' as const, action: 'Flag unauthorized transfer', time: '02:14', status: 'Open' },
        { id: 'G‑GR‑0821', engine: 'Grow' as const, action: 'Update forecast drivers', time: '08:32', status: 'Reviewed' },
        { id: 'G‑EX‑0417', engine: 'Execute' as const, action: 'Approve bill negotiation', time: '09:05', status: 'Approved' },
        { id: 'G‑GV‑1103', engine: 'Govern' as const, action: 'Model card updated', time: '09:18', status: 'Logged' },
    ];

    // Metric bar
    const metricBar = (label: string, value: number, color: string, barDelay: number) => {
        const reveal = spring({
            frame: frame - barDelay,
            fps,
            config: { damping: 12, stiffness: 100 },
        });

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6,
                    flex: 1,
                    opacity: reveal,
                    transform: `translateY(${interpolate(reveal, [0, 1], [10, 0])}px)`,
                }}
            >
                <div style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>
                    {label}
                </div>
                <div style={{ fontSize: 20, fontWeight: 700, color }}>
                    <AnimatedCounter value={value} delay={barDelay} duration={40} />
                </div>
                <div style={{ height: 6, borderRadius: 999, background: 'rgba(255,255,255,0.12)' }}>
                    <div
                        style={{
                            height: 6,
                            width: `${interpolate(frame - barDelay - 10, [0, 35], [0, value], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}%`,
                            borderRadius: 999,
                            background: color,
                            boxShadow: `0 0 10px ${color}66`,
                        }}
                    />
                </div>
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
                                                    border: item.active ? `1px solid ${theme.accent.amber}` : '1px solid transparent',
                                                    color: item.active ? 'white' : 'rgba(255,255,255,0.6)',
                                                }}
                                            >
                                                <SlideIcon
                                                    name={item.icon}
                                                    size={16}
                                                    glowColor={item.active ? 'amber' : 'white'}
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
                                    <AnimatedEnginePill engine="Govern" delay={delay + 12} active />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>Audit Mode</div>
                                    <div style={{ width: 8, height: 8, borderRadius: 999, background: theme.accent.amber }} />
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
                                <div style={{ fontSize: 30, fontWeight: 600 }}>Govern 2.0: Trust by Design</div>
                                <div style={{ fontSize: 16, opacity: 0.7, marginTop: 4 }}>
                                    Every decision is explainable, reviewable, and logged.
                                </div>
                            </AnimatedCardReveal>

                            {/* Content grid */}
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
                                    gap: 16,
                                    flex: 1,
                                }}
                            >
                                {/* Trust Index */}
                                <div style={{ gridColumn: 'span 7', display: 'flex', flexDirection: 'column', gap: 16 }}>
                                    <AnimatedCardReveal delay={delay + 15} direction="up">
                                        <GlassCard variant="blue" style={{ padding: 22 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                                                <div style={{ fontSize: 20, fontWeight: 600 }}>Trust Index</div>
                                                <div
                                                    style={{
                                                        padding: '4px 10px',
                                                        borderRadius: 6,
                                                        background: 'rgba(245,158,11,0.15)',
                                                        border: '1px solid rgba(245,158,11,0.5)',
                                                        fontSize: 11,
                                                        fontWeight: 600,
                                                        color: theme.accent.amber,
                                                    }}
                                                >
                                                    GOVERN
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12 }}>
                                                <div style={{ fontSize: 38, fontWeight: 700, color: theme.accent.cyan }}>
                                                    <AnimatedCounter value={92} delay={delay + 25} duration={50} fontSize={38} color={theme.accent.cyan} />
                                                </div>
                                                <div style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 6 }}>/100 · stable</div>
                                            </div>
                                            <div style={{ color: 'rgba(255,255,255,0.6)', marginTop: 8 }}>
                                                No material drift detected in the last 24h.
                                            </div>
                                            <div style={{ display: 'flex', gap: 16, marginTop: 14 }}>
                                                {metricBar('Transparency', 96, theme.accent.cyan, delay + 35)}
                                                {metricBar('Oversight', 88, theme.accent.blue, delay + 40)}
                                                {metricBar('Audit Coverage', 98, theme.accent.teal, delay + 45)}
                                            </div>
                                        </GlassCard>
                                    </AnimatedCardReveal>

                                    {/* Audit Ledger - KEY FOCUS */}
                                    <AnimatedCardReveal delay={delay + 25} direction="up">
                                        <GlassCard style={{ padding: 20 }}>
                                            <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Audit Ledger</div>
                                            <AnimatedAuditLog entries={auditEntries} delay={delay + 60} stagger={15} />
                                        </GlassCard>
                                    </AnimatedCardReveal>
                                </div>

                                {/* Right column */}
                                <div style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', gap: 16 }}>
                                    <AnimatedCardReveal delay={delay + 20} direction="right">
                                        <GlassCard style={{ padding: 20 }}>
                                            <div style={{ fontSize: 18, fontWeight: 600 }}>Audit Detail</div>
                                            <div style={{ color: 'rgba(255,255,255,0.7)', marginTop: 6 }}>G‑PF‑0192 · Protect · High risk</div>
                                            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 10 }}>
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
                                                <span style={{ color: theme.accent.cyan, fontSize: 13 }}>Confidence 0.86</span>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 14 }}>
                                                <AnimatedProgressBar label="Policy mismatch" value={0.82} color={theme.accent.blue} delay={delay + 70} showPercentage />
                                                <AnimatedProgressBar label="Consent absent" value={0.68} color={theme.accent.cyan} delay={delay + 78} showPercentage />
                                                <AnimatedProgressBar label="Risk threshold exceeded" value={0.54} color={theme.accent.teal} delay={delay + 86} showPercentage />
                                            </div>
                                        </GlassCard>
                                    </AnimatedCardReveal>

                                    <AnimatedCardReveal delay={delay + 30} direction="right">
                                        <GlassCard style={{ padding: 18 }}>
                                            <div style={{ fontSize: 16, fontWeight: 600 }}>Human Oversight</div>
                                            <div style={{ color: 'rgba(255,255,255,0.7)', marginTop: 6 }}>3 pending · SLA 24h</div>
                                            <div style={{ color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>1 high‑risk review due in 3h</div>
                                        </GlassCard>
                                    </AnimatedCardReveal>

                                    <AnimatedCardReveal delay={delay + 35} direction="right">
                                        <GlassCard style={{ padding: 18 }}>
                                            <div style={{ fontSize: 16, fontWeight: 600 }}>Policy & Model Cards</div>
                                            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 10 }}>
                                                {[
                                                    { label: 'EU AI Act', color: theme.accent.cyan },
                                                    { label: 'CFPB', color: theme.accent.amber },
                                                    { label: 'NIST RMF', color: theme.accent.violet },
                                                ].map((badge, i) => (
                                                    <AnimatedCardReveal key={badge.label} delay={delay + 90 + i * 8}>
                                                        <div
                                                            style={{
                                                                padding: '4px 10px',
                                                                borderRadius: 6,
                                                                background: `${badge.color}15`,
                                                                border: `1px solid ${badge.color}55`,
                                                                fontSize: 11,
                                                                fontWeight: 600,
                                                                color: badge.color,
                                                            }}
                                                        >
                                                            {badge.label}
                                                        </div>
                                                    </AnimatedCardReveal>
                                                ))}
                                            </div>
                                            <div style={{ color: 'rgba(255,255,255,0.7)', marginTop: 12 }}>Risk‑Detect‑v4 · 99.2% precision</div>
                                        </GlassCard>
                                    </AnimatedCardReveal>
                                </div>
                            </div>
                        </div>
                    </div>
                </AbsoluteFill>
            </CameraController>

            {/* Highlight on audit log */}
            {highlightAuditLog && (
                <HighlightBox
                    left={17}
                    top={52}
                    width={42}
                    height={35}
                    color={theme.accent.amber}
                    delay={delay + 55}
                    label="Immutable Audit Trail"
                />
            )}
        </AbsoluteFill>
    );
};
