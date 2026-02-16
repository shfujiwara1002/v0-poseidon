import React from 'react';
import {
    AbsoluteFill,
    Sequence,
    interpolate,
    useCurrentFrame,
    spring,
    useVideoConfig,
    Audio,
    staticFile,
} from 'remotion';
import { theme } from './shared/theme';
import { LogoIcon } from './LogoIcon';

// Import effects
import { LightSweep } from './shared/effects/LightSweep';
import { BloomEffect, LensFlare } from './shared/effects/BloomEffect';
import { FloatingParticles, DustMotes } from './shared/effects/FloatingParticles';

// Import animations
import { ShotTransition, FlashTransition } from './shared/animation/ShotTransition';
import { CinematicText, AnimatedText } from './shared/animation/AnimatedText';
import { CameraEasing } from './shared/camera/CameraController';

// Import dynamic screens with camera control
import { DynamicDashboard } from './shared/screens/DynamicDashboard';
import { DynamicProtect } from './shared/screens/DynamicProtect';
import { DynamicGovern } from './shared/screens/DynamicGovern';

// Import live UI components
import { PulsingButton, AnimatedEnginePill, AnimatedCardReveal } from './shared/live-ui/AnimatedUI';
import { GlowPulse } from './shared/effects/GlowPulse';

const FPS = 30;

// Shot timings (30 seconds = 900 frames)
const SHOT_1_START = 0;           // Logo intro
const SHOT_1_DURATION = 4 * FPS;  // 0-4s (120 frames)

const SHOT_2_START = 120;         // Problem statement
const SHOT_2_DURATION = 4 * FPS;  // 4-8s (120 frames)

const SHOT_3_START = 240;         // Dashboard overview
const SHOT_3_DURATION = 5 * FPS;  // 8-13s (150 frames)

const SHOT_4_START = 390;         // Protect - Explainability
const SHOT_4_DURATION = 5 * FPS;  // 13-18s (150 frames)

const SHOT_5_START = 540;         // Govern - Audit Trail
const SHOT_5_DURATION = 5 * FPS;  // 18-23s (150 frames)

const SHOT_6_START = 690;         // Four Engines
const SHOT_6_DURATION = 3 * FPS;  // 23-26s (90 frames)

const SHOT_7_START = 780;         // CTA / Outro
const SHOT_7_DURATION = 4 * FPS;  // 26-30s (120 frames)

export interface VideoMasterWWDCv3Props {
    musicSrc?: string;
    sfxWhooshSrc?: string;
    sfxHitSrc?: string;
    enableAudio?: boolean;
}

// Enhanced WWDC-style animated gradient background
const WWDCBackgroundV3: React.FC = () => {
    const frame = useCurrentFrame();

    const rotation = interpolate(frame, [0, 900], [0, 360], { extrapolateRight: 'extend' });
    const pulseA = Math.sin(frame / 40) * 0.15 + 0.85;
    const pulseB = Math.cos(frame / 35) * 0.12 + 0.88;
    const driftX = Math.sin(frame / 80) * 40;
    const driftY = Math.cos(frame / 90) * 30;

    return (
        <AbsoluteFill style={{ background: '#000' }}>
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse 150% 100% at 50% 20%, #0a0a1a 0%, #000 100%)',
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    width: 1400,
                    height: 1400,
                    left: '50%',
                    top: '50%',
                    transform: `translate(-50%, -50%) translate(${driftX}px, ${driftY}px) rotate(${rotation}deg)`,
                    background: `
                        radial-gradient(ellipse 60% 50% at 30% 30%, rgba(138,43,226,${0.5 * pulseA}) 0%, transparent 60%),
                        radial-gradient(ellipse 50% 60% at 70% 40%, rgba(0,191,255,${0.45 * pulseB}) 0%, transparent 55%),
                        radial-gradient(ellipse 45% 55% at 50% 70%, rgba(255,107,107,${0.3 * pulseA}) 0%, transparent 50%),
                        radial-gradient(ellipse 55% 45% at 25% 65%, rgba(0,240,255,${0.4 * pulseB}) 0%, transparent 55%)
                    `,
                    filter: 'blur(80px)',
                }}
            />
            <FloatingParticles
                count={80}
                colors={[theme.accent.cyan, theme.accent.violet, '#ffffff', theme.accent.teal]}
                sizeRange={[2, 7]}
                speed={0.8}
                glow={true}
                depthBlur={true}
                opacityRange={[0.15, 0.5]}
            />
            <DustMotes count={120} opacity={0.12} speed={0.4} />
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 30%, rgba(0,0,0,0.75) 100%)',
                }}
            />
        </AbsoluteFill>
    );
};

// Shot 1: Logo Reveal
const Shot1LogoReveal: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, durationInFrames } = useVideoConfig();

    const logoReveal = spring({
        frame,
        fps,
        config: { damping: 10, stiffness: 60 },
    });

    const scale = interpolate(logoReveal, [0, 1], [0.5, 1]);
    const opacity = interpolate(logoReveal, [0, 0.3, 1], [0, 1, 1]);
    const rotateY = interpolate(logoReveal, [0, 1], [-40, 0]);

    const taglineOpacity = interpolate(frame, [50, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    return (
        <ShotTransition
            durationInFrames={durationInFrames}
            enterType="zoom-through"
            exitType="zoom-through"
            enterDuration={15}
            exitDuration={12}
        >
            <AbsoluteFill
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 48,
                }}
            >
                <LensFlare x={50} y={45} color={theme.accent.cyan} intensity={0.9} streakLength={500} delay={10} />
                <BloomEffect
                    color={theme.accent.cyan}
                    intensity={0.8}
                    pulseFrequency={25}
                    rays={8}
                    raySpread={360}
                    revealDelay={5}
                >
                    <div
                        style={{
                            width: 420,
                            height: 420,
                            opacity,
                            transform: `perspective(1000px) rotateY(${rotateY}deg) scale(${scale})`,
                        }}
                    >
                        <LogoIcon variant="trident-only" background="transparent" showShield showParticles />
                    </div>
                </BloomEffect>
                <div
                    style={{
                        opacity: taglineOpacity,
                        textAlign: 'center',
                    }}
                >
                    <CinematicText delay={55} size={60} glowColor={theme.accent.cyan}>
                        Poseidon
                    </CinematicText>
                    <div
                        style={{
                            fontFamily: theme.typography.fontUi,
                            fontSize: 26,
                            color: 'rgba(255,255,255,0.7)',
                            marginTop: 14,
                            opacity: taglineOpacity,
                        }}
                    >
                        Trusted AI for Your Money
                    </div>
                </div>
            </AbsoluteFill>
        </ShotTransition>
    );
};

// Shot 2: The Problem
const Shot2Problem: React.FC = () => {
    const { durationInFrames } = useVideoConfig();

    return (
        <ShotTransition
            durationInFrames={durationInFrames}
            enterType="push"
            exitType="push"
            enterDuration={14}
            exitDuration={12}
        >
            <AbsoluteFill
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 80,
                }}
            >
                <LightSweep duration={durationInFrames} color="#ff6b6b" intensity={0.25} layers={2} />
                <AnimatedText
                    mode="word"
                    delay={0}
                    stagger={4}
                    variant="glow-reveal"
                    glowColor="#ff6b6b"
                    style={{
                        fontSize: 28,
                        fontWeight: 500,
                        color: 'rgba(255,100,100,0.9)',
                        fontFamily: theme.typography.fontUi,
                        marginBottom: 24,
                    }}
                >
                    THE PROBLEM
                </AnimatedText>
                <AnimatedText
                    mode="word"
                    delay={12}
                    stagger={5}
                    variant="snap"
                    style={{
                        fontSize: 64,
                        fontWeight: 700,
                        color: '#fff',
                        fontFamily: theme.typography.fontHeader,
                        textAlign: 'center',
                        maxWidth: 1000,
                        lineHeight: 1.2,
                        textShadow: '0 0 40px rgba(255,255,255,0.3)',
                    }}
                >
                    Black-box AI cannot be trusted.
                </AnimatedText>
                <div style={{ height: 48 }} />
                <GlowPulse color="#ff6b6b" intensity={0.7} frequency={20}>
                    <div
                        style={{
                            padding: '32px 48px',
                            background: 'rgba(239,68,68,0.12)',
                            border: '1px solid rgba(239,68,68,0.35)',
                            borderRadius: 24,
                            backdropFilter: 'blur(20px)',
                        }}
                    >
                        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
                            <div
                                style={{
                                    width: 64,
                                    height: 64,
                                    borderRadius: 16,
                                    background: 'rgba(239,68,68,0.25)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: 32,
                                }}
                            >
                                ⚠️
                            </div>
                            <div>
                                <div style={{ fontSize: 26, fontWeight: 600, color: '#fff', fontFamily: theme.typography.fontUi }}>
                                    No explanation. No audit. No trust.
                                </div>
                                <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.6)', marginTop: 6, fontFamily: theme.typography.fontUi }}>
                                    Financial AI needs transparency.
                                </div>
                            </div>
                        </div>
                    </div>
                </GlowPulse>
            </AbsoluteFill>
        </ShotTransition>
    );
};

// Shot 3: Dashboard Overview with Camera Movement
const Shot3DashboardDemo: React.FC = () => {
    const { durationInFrames } = useVideoConfig();

    return (
        <ShotTransition
            durationInFrames={durationInFrames}
            enterType="zoom-through"
            exitType="push"
            enterDuration={12}
            exitDuration={10}
        >
            <DynamicDashboard
                delay={0}
                cameraKeyframes={[
                    { frame: 0, scale: 0.6, x: 0, y: 0 },
                    { frame: 20, scale: 0.6, x: 0, y: 0 },
                    { frame: 50, scale: 1.05, x: 12, y: -8, easing: CameraEasing.zoomIn },  // Zoom to System Pulse
                    { frame: 100, scale: 1.05, x: 12, y: -8 },
                    { frame: 130, scale: 0.65, x: 0, y: 0, easing: CameraEasing.zoomOut },
                ]}
                highlights={[
                    { id: 'chart', left: 18, top: 32, width: 38, height: 25, label: 'Real-time Insights', delay: 70 },
                ]}
            />
        </ShotTransition>
    );
};

// Shot 4: Protect Engine - Explainability Focus
const Shot4ProtectDemo: React.FC = () => {
    const { durationInFrames } = useVideoConfig();

    return (
        <ShotTransition
            durationInFrames={durationInFrames}
            enterType="push"
            exitType="blur-zoom"
            enterDuration={12}
            exitDuration={10}
        >
            <DynamicProtect
                delay={0}
                cameraKeyframes={[
                    { frame: 0, scale: 0.6, x: 0, y: 0 },
                    { frame: 20, scale: 0.6, x: 0, y: 0 },
                    { frame: 55, scale: 1.25, x: 22, y: 5, easing: CameraEasing.zoomIn },  // Zoom to Explainability
                    { frame: 105, scale: 1.25, x: 22, y: 5 },
                    { frame: 135, scale: 0.65, x: 0, y: 0, easing: CameraEasing.zoomOut },
                ]}
                showSpotlight={true}
                spotlightTarget={{ x: 78, y: 50 }}
            />
        </ShotTransition>
    );
};

// Shot 5: Govern Engine - Audit Trail Focus
const Shot5GovernDemo: React.FC = () => {
    const { durationInFrames } = useVideoConfig();

    return (
        <ShotTransition
            durationInFrames={durationInFrames}
            enterType="blur-zoom"
            exitType="zoom-through"
            enterDuration={12}
            exitDuration={10}
        >
            <DynamicGovern
                delay={0}
                cameraKeyframes={[
                    { frame: 0, scale: 0.6, x: 0, y: 0 },
                    { frame: 20, scale: 0.6, x: 0, y: 0 },
                    { frame: 55, scale: 1.1, x: -8, y: 12, easing: CameraEasing.zoomIn },  // Zoom to Audit Ledger
                    { frame: 105, scale: 1.1, x: -8, y: 12 },
                    { frame: 135, scale: 0.65, x: 0, y: 0, easing: CameraEasing.zoomOut },
                ]}
                highlightAuditLog={true}
            />
        </ShotTransition>
    );
};

// Shot 6: Four Engines Summary
const Shot6EnginesSummary: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, durationInFrames } = useVideoConfig();

    const engines = [
        { name: 'Protect', icon: '🛡️', color: theme.accent.red, desc: 'Fraud & threat detection' },
        { name: 'Grow', icon: '📈', color: theme.accent.violet, desc: 'Intelligent investing' },
        { name: 'Execute', icon: '⚡', color: theme.accent.cyan, desc: 'Smart transactions' },
        { name: 'Govern', icon: '⚖️', color: theme.accent.amber, desc: 'Compliance & audit' },
    ];

    return (
        <ShotTransition
            durationInFrames={durationInFrames}
            enterType="zoom-through"
            exitType="fade"
            enterDuration={12}
            exitDuration={10}
        >
            <AbsoluteFill
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 60,
                }}
            >
                <LightSweep duration={durationInFrames} color="#ffffff" intensity={0.2} layers={3} />
                <CinematicText delay={0} size={52} glowColor={theme.accent.cyan}>
                    Four AI Engines. One Trusted Platform.
                </CinematicText>
                <div style={{ height: 48 }} />
                <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', justifyContent: 'center' }}>
                    {engines.map((engine, i) => (
                        <AnimatedCardReveal key={engine.name} delay={20 + i * 12} direction={i % 2 === 0 ? 'left' : 'right'}>
                            <GlowPulse color={engine.color} intensity={0.6} frequency={25 + i * 3}>
                                <div
                                    style={{
                                        width: 200,
                                        padding: '28px 24px',
                                        background: `${engine.color}15`,
                                        border: `1px solid ${engine.color}55`,
                                        borderRadius: 20,
                                        backdropFilter: 'blur(16px)',
                                        textAlign: 'center',
                                    }}
                                >
                                    <div style={{ fontSize: 44, marginBottom: 12 }}>{engine.icon}</div>
                                    <div
                                        style={{
                                            fontSize: 22,
                                            fontWeight: 700,
                                            color: engine.color,
                                            fontFamily: theme.typography.fontHeader,
                                            textShadow: `0 0 25px ${engine.color}88`,
                                        }}
                                    >
                                        {engine.name}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: 13,
                                            color: 'rgba(255,255,255,0.6)',
                                            marginTop: 8,
                                            fontFamily: theme.typography.fontUi,
                                        }}
                                    >
                                        {engine.desc}
                                    </div>
                                </div>
                            </GlowPulse>
                        </AnimatedCardReveal>
                    ))}
                </div>
            </AbsoluteFill>
        </ShotTransition>
    );
};

// Shot 7: CTA / Outro
const Shot7Outro: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, durationInFrames } = useVideoConfig();

    const logoReveal = spring({
        frame,
        fps,
        config: { damping: 12, stiffness: 70 },
    });

    return (
        <ShotTransition
            durationInFrames={durationInFrames}
            enterType="zoom-through"
            exitType="fade"
            enterDuration={16}
            exitDuration={20}
        >
            <AbsoluteFill
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 40,
                }}
            >
                <LensFlare x={50} y={40} color={theme.accent.cyan} intensity={0.7} streakLength={600} delay={5} />
                <LensFlare x={48} y={42} color={theme.accent.violet} intensity={0.4} streakLength={400} delay={10} />
                <LightSweep duration={durationInFrames} color={theme.accent.cyan} intensity={0.35} layers={3} />
                <BloomEffect
                    color={theme.accent.cyan}
                    intensity={0.9}
                    pulseFrequency={22}
                    rays={12}
                    raySpread={360}
                    rotateRays
                >
                    <div
                        style={{
                            width: 300,
                            height: 300,
                            opacity: logoReveal,
                            transform: `scale(${interpolate(logoReveal, [0, 1], [0.7, 1])})`,
                        }}
                    >
                        <LogoIcon variant="trident-only" background="transparent" showShield showParticles />
                    </div>
                </BloomEffect>
                <CinematicText delay={18} size={56} glowColor={theme.accent.cyan}>
                    Poseidon
                </CinematicText>
                <AnimatedText
                    mode="word"
                    delay={30}
                    stagger={4}
                    style={{
                        fontSize: 26,
                        fontWeight: 400,
                        color: 'rgba(255,255,255,0.7)',
                        fontFamily: theme.typography.fontUi,
                    }}
                >
                    Trusted AI for Your Money
                </AnimatedText>
                <div style={{ height: 16 }} />
                <PulsingButton color={theme.accent.cyan} delay={45} style={{ padding: '22px 52px', fontSize: 24 }}>
                    Get Early Access
                </PulsingButton>
                <AnimatedText
                    delay={65}
                    style={{
                        fontSize: 18,
                        fontWeight: 400,
                        color: 'rgba(255,255,255,0.5)',
                        fontFamily: theme.typography.fontUi,
                    }}
                >
                    poseidon.ai
                </AnimatedText>
            </AbsoluteFill>
        </ShotTransition>
    );
};

// Main component
export const VideoMasterWWDCv3: React.FC<VideoMasterWWDCv3Props> = ({
    musicSrc = 'audio/poseidon-beat.wav',
    sfxWhooshSrc = 'audio/whoosh.wav',
    sfxHitSrc = 'audio/hit.ogg',
    enableAudio = true,
}) => {
    const frame = useCurrentFrame();
    const { durationInFrames } = useVideoConfig();

    const musicVolume = interpolate(
        frame,
        [0, 30, durationInFrames - 60, durationInFrames],
        [0, 0.85, 0.85, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    return (
        <AbsoluteFill>
            <WWDCBackgroundV3 />

            {/* Audio */}
            {enableAudio && musicSrc && (
                <Audio src={staticFile(musicSrc)} volume={musicVolume} />
            )}

            {/* SFX on transitions */}
            {enableAudio && sfxWhooshSrc && (
                <>
                    <Sequence from={SHOT_2_START} durationInFrames={20}>
                        <Audio src={staticFile(sfxWhooshSrc)} volume={0.7} />
                    </Sequence>
                    <Sequence from={SHOT_3_START} durationInFrames={20}>
                        <Audio src={staticFile(sfxWhooshSrc)} volume={0.6} />
                    </Sequence>
                    <Sequence from={SHOT_4_START} durationInFrames={20}>
                        <Audio src={staticFile(sfxWhooshSrc)} volume={0.7} />
                    </Sequence>
                    <Sequence from={SHOT_5_START} durationInFrames={20}>
                        <Audio src={staticFile(sfxWhooshSrc)} volume={0.65} />
                    </Sequence>
                    <Sequence from={SHOT_6_START} durationInFrames={20}>
                        <Audio src={staticFile(sfxWhooshSrc)} volume={0.6} />
                    </Sequence>
                    <Sequence from={SHOT_7_START} durationInFrames={20}>
                        <Audio src={staticFile(sfxWhooshSrc)} volume={0.8} />
                    </Sequence>
                </>
            )}

            {/* Hit SFX on key moments */}
            {enableAudio && sfxHitSrc && (
                <>
                    <Sequence from={SHOT_1_START + 20} durationInFrames={15}>
                        <Audio src={staticFile(sfxHitSrc)} volume={0.6} />
                    </Sequence>
                    <Sequence from={SHOT_3_START + 50} durationInFrames={15}>
                        <Audio src={staticFile(sfxHitSrc)} volume={0.4} />
                    </Sequence>
                    <Sequence from={SHOT_4_START + 55} durationInFrames={15}>
                        <Audio src={staticFile(sfxHitSrc)} volume={0.5} />
                    </Sequence>
                    <Sequence from={SHOT_5_START + 55} durationInFrames={15}>
                        <Audio src={staticFile(sfxHitSrc)} volume={0.45} />
                    </Sequence>
                </>
            )}

            {/* Flash transitions */}
            <FlashTransition at={SHOT_1_START + 15} duration={8} intensity={0.4} />
            <FlashTransition at={SHOT_3_START + 48} duration={6} intensity={0.2} />
            <FlashTransition at={SHOT_7_START + 10} duration={10} intensity={0.3} />

            {/* Shots */}
            <Sequence from={SHOT_1_START} durationInFrames={SHOT_1_DURATION}>
                <Shot1LogoReveal />
            </Sequence>

            <Sequence from={SHOT_2_START} durationInFrames={SHOT_2_DURATION}>
                <Shot2Problem />
            </Sequence>

            <Sequence from={SHOT_3_START} durationInFrames={SHOT_3_DURATION}>
                <Shot3DashboardDemo />
            </Sequence>

            <Sequence from={SHOT_4_START} durationInFrames={SHOT_4_DURATION}>
                <Shot4ProtectDemo />
            </Sequence>

            <Sequence from={SHOT_5_START} durationInFrames={SHOT_5_DURATION}>
                <Shot5GovernDemo />
            </Sequence>

            <Sequence from={SHOT_6_START} durationInFrames={SHOT_6_DURATION}>
                <Shot6EnginesSummary />
            </Sequence>

            <Sequence from={SHOT_7_START} durationInFrames={SHOT_7_DURATION}>
                <Shot7Outro />
            </Sequence>
        </AbsoluteFill>
    );
};
