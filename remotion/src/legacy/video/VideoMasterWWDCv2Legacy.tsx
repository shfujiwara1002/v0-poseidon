import React from 'react';
import {
    AbsoluteFill,
    Sequence,
    interpolate,
    useCurrentFrame,
    Easing,
    spring,
    useVideoConfig,
    Audio,
    staticFile,
} from 'remotion';
import { theme } from './shared/theme';
import { LogoIcon } from './LogoIcon';

// Import all effects
import { LightSweep, CardShine } from './shared/effects/LightSweep';
import { BloomEffect, LensFlare } from './shared/effects/BloomEffect';
import { FloatingParticles, DustMotes } from './shared/effects/FloatingParticles';
import { GlowPulse } from './shared/effects/GlowPulse';

// Import animation utilities
import { ShotTransition, FlashTransition } from './shared/animation/ShotTransition';
import { CinematicText, AnimatedText } from './shared/animation/AnimatedText';
import { BEAT_MAP, useBeatPulse } from './shared/animation/BeatSync';
import { SPRING_CONFIGS } from './shared/animation/MotionUtils';

const FPS = 30;

// Shot timings aligned to beats
const SHOT_1_START = 0;
const SHOT_1_DURATION = Math.round(4 * FPS);
const SHOT_2_START = SHOT_1_START + SHOT_1_DURATION;
const SHOT_2_DURATION = Math.round(4.5 * FPS);
const SHOT_3_START = SHOT_2_START + SHOT_2_DURATION;
const SHOT_3_DURATION = Math.round(4.5 * FPS);
const SHOT_4_START = SHOT_3_START + SHOT_3_DURATION;
const SHOT_4_DURATION = 5 * FPS;
const SHOT_5_START = SHOT_4_START + SHOT_4_DURATION;
const SHOT_5_DURATION = 5 * FPS;
const SHOT_6_START = SHOT_5_START + SHOT_5_DURATION;
const SHOT_6_DURATION = Math.round(7 * FPS);

export interface VideoMasterWWDCv2Props {
    musicSrc?: string;
    sfxWhooshSrc?: string;
    sfxHitSrc?: string;
    enableAudio?: boolean;
}

// Enhanced WWDC-style animated gradient background
const WWDCBackgroundV2: React.FC = () => {
    const frame = useCurrentFrame();

    const rotation = interpolate(frame, [0, 900], [0, 360], { extrapolateRight: 'extend' });
    const pulseA = Math.sin(frame / 40) * 0.15 + 0.85;
    const pulseB = Math.cos(frame / 35) * 0.12 + 0.88;
    const driftX = Math.sin(frame / 80) * 40;
    const driftY = Math.cos(frame / 90) * 30;

    // Beat-synced intensity boost
    const beatPulse = useBeatPulse(frame, 2);
    const intensityBoost = 1 + beatPulse * 0.15;

    return (
        <AbsoluteFill style={{ background: '#000' }}>
            {/* Base dark gradient */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse 150% 100% at 50% 20%, #0a0a1a 0%, #000 100%)',
                }}
            />

            {/* Primary color orbs - more vibrant */}
            <div
                style={{
                    position: 'absolute',
                    width: 1400,
                    height: 1400,
                    left: '50%',
                    top: '50%',
                    transform: `translate(-50%, -50%) translate(${driftX}px, ${driftY}px) rotate(${rotation}deg)`,
                    background: `
                        radial-gradient(ellipse 60% 50% at 30% 30%, rgba(138,43,226,${0.5 * pulseA * intensityBoost}) 0%, transparent 60%),
                        radial-gradient(ellipse 50% 60% at 70% 40%, rgba(0,191,255,${0.45 * pulseB * intensityBoost}) 0%, transparent 55%),
                        radial-gradient(ellipse 45% 55% at 50% 70%, rgba(255,107,107,${0.3 * pulseA}) 0%, transparent 50%),
                        radial-gradient(ellipse 55% 45% at 25% 65%, rgba(0,240,255,${0.4 * pulseB * intensityBoost}) 0%, transparent 55%)
                    `,
                    filter: 'blur(80px)',
                }}
            />

            {/* Secondary layer with faster rotation */}
            <div
                style={{
                    position: 'absolute',
                    width: 1000,
                    height: 1000,
                    left: '50%',
                    top: '50%',
                    transform: `translate(-50%, -50%) rotate(${-rotation * 0.7}deg)`,
                    background: `
                        radial-gradient(ellipse 70% 50% at 60% 50%, rgba(139,92,246,${0.25 * pulseA}) 0%, transparent 50%),
                        radial-gradient(ellipse 50% 70% at 40% 50%, rgba(20,184,166,${0.22 * pulseB}) 0%, transparent 50%)
                    `,
                    filter: 'blur(60px)',
                }}
            />

            {/* Floating particles */}
            <FloatingParticles
                count={80}
                colors={[theme.accent.cyan, theme.accent.violet, '#ffffff', theme.accent.teal]}
                sizeRange={[2, 7]}
                speed={0.8}
                glow={true}
                depthBlur={true}
                opacityRange={[0.15, 0.5]}
            />

            {/* Subtle dust motes */}
            <DustMotes count={120} opacity={0.12} speed={0.4} />

            {/* Vignette */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 30%, rgba(0,0,0,0.75) 100%)',
                }}
            />

            {/* Subtle film grain */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.025,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
            />
        </AbsoluteFill>
    );
};

// Shot 1: Logo Reveal with Bloom
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

    // Tagline timing
    const taglineOpacity = interpolate(frame, [50, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const taglineY = interpolate(frame, [50, 75], [25, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

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
                {/* Lens flare effect */}
                <LensFlare x={50} y={45} color={theme.accent.cyan} intensity={0.9} streakLength={500} delay={10} />

                {/* Logo with bloom */}
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
                        <LogoIcon
                            variant="trident-only"
                            background="transparent"
                            showShield
                            showParticles
                        />
                    </div>
                </BloomEffect>

                {/* Tagline */}
                <div
                    style={{
                        opacity: taglineOpacity,
                        transform: `translateY(${taglineY}px)`,
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
                {/* Global light sweep */}
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
                    Speed alone does not create trust.
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
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        <CardShine duration={durationInFrames} delay={30} color="#ff6b6b" />
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
                                    Black-box AI decisions
                                </div>
                                <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.6)', marginTop: 6, fontFamily: theme.typography.fontUi }}>
                                    No explanation. No audit trail. No trust.
                                </div>
                            </div>
                        </div>
                    </div>
                </GlowPulse>
            </AbsoluteFill>
        </ShotTransition>
    );
};

// Shot 3: The Solution
const Shot3Solution: React.FC = () => {
    const { durationInFrames } = useVideoConfig();

    return (
        <ShotTransition
            durationInFrames={durationInFrames}
            enterType="zoom-through"
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
                <LightSweep duration={durationInFrames} color={theme.accent.teal} intensity={0.3} layers={2} />

                <AnimatedText
                    mode="word"
                    delay={0}
                    stagger={4}
                    variant="glow-reveal"
                    glowColor={theme.accent.teal}
                    style={{
                        fontSize: 28,
                        fontWeight: 500,
                        color: theme.accent.teal,
                        fontFamily: theme.typography.fontUi,
                        marginBottom: 24,
                    }}
                >
                    THE SOLUTION
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
                        textShadow: `0 0 40px ${theme.accent.teal}44`,
                    }}
                >
                    AI that explains every decision.
                </AnimatedText>

                <div style={{ height: 48 }} />

                <BloomEffect color={theme.accent.teal} intensity={0.5} pulseFrequency={30}>
                    <div
                        style={{
                            padding: '32px 48px',
                            background: 'rgba(20,184,166,0.12)',
                            border: '1px solid rgba(20,184,166,0.35)',
                            borderRadius: 24,
                            backdropFilter: 'blur(20px)',
                            display: 'flex',
                            gap: 24,
                            alignItems: 'center',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        <CardShine duration={durationInFrames} delay={35} color={theme.accent.teal} />
                        <div
                            style={{
                                width: 64,
                                height: 64,
                                borderRadius: 16,
                                background: 'rgba(20,184,166,0.25)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 32,
                                color: theme.accent.teal,
                            }}
                        >
                            ✓
                        </div>
                        <div>
                            <div style={{ fontSize: 26, fontWeight: 600, color: '#fff', fontFamily: theme.typography.fontUi }}>
                                Explainable. Auditable. Trusted.
                            </div>
                            <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.6)', marginTop: 6, fontFamily: theme.typography.fontUi }}>
                                Human-in-the-loop governance for every transaction.
                            </div>
                        </div>
                    </div>
                </BloomEffect>
            </AbsoluteFill>
        </ShotTransition>
    );
};

// Shot 4: Four Engines
const Shot4Engines: React.FC = () => {
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
            enterType="blur-zoom"
            exitType="fade"
            enterDuration={15}
            exitDuration={12}
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

                <AnimatedText
                    mode="word"
                    delay={0}
                    stagger={3}
                    style={{
                        fontSize: 28,
                        fontWeight: 500,
                        color: 'rgba(255,255,255,0.6)',
                        fontFamily: theme.typography.fontUi,
                        marginBottom: 20,
                    }}
                >
                    FOUR AI ENGINES
                </AnimatedText>

                <CinematicText delay={8} size={56} glowColor={theme.accent.cyan}>
                    Protect / Grow / Execute / Govern
                </CinematicText>

                <div style={{ height: 48 }} />

                <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', justifyContent: 'center' }}>
                    {engines.map((engine, i) => {
                        const cardDelay = 35 + i * 10;
                        const cardReveal = spring({
                            frame: frame - cardDelay,
                            fps,
                            config: SPRING_CONFIGS.overshoot,
                        });

                        const fromLeft = i % 2 === 0;
                        const slideX = interpolate(cardReveal, [0, 1], [fromLeft ? -100 : 100, 0]);
                        const rotateY = interpolate(cardReveal, [0, 1], [fromLeft ? -20 : 20, 0]);

                        return (
                            <GlowPulse key={engine.name} color={engine.color} intensity={0.6} frequency={25 + i * 3}>
                                <div
                                    style={{
                                        width: 210,
                                        padding: '30px 26px',
                                        background: `${engine.color}15`,
                                        border: `1px solid ${engine.color}55`,
                                        borderRadius: 22,
                                        backdropFilter: 'blur(16px)',
                                        textAlign: 'center',
                                        opacity: cardReveal,
                                        transform: `perspective(800px) translateX(${slideX}px) rotateY(${rotateY}deg) scale(${interpolate(cardReveal, [0, 1], [0.8, 1])})`,
                                        position: 'relative',
                                        overflow: 'hidden',
                                    }}
                                >
                                    <CardShine duration={60} delay={cardDelay + 20} color={engine.color} />
                                    <div style={{ fontSize: 44, marginBottom: 14 }}>{engine.icon}</div>
                                    <div
                                        style={{
                                            fontSize: 24,
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
                                            fontSize: 14,
                                            color: 'rgba(255,255,255,0.6)',
                                            marginTop: 10,
                                            fontFamily: theme.typography.fontUi,
                                        }}
                                    >
                                        {engine.desc}
                                    </div>
                                </div>
                            </GlowPulse>
                        );
                    })}
                </div>
            </AbsoluteFill>
        </ShotTransition>
    );
};

// Shot 5: Key Features
const Shot5Features: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, durationInFrames } = useVideoConfig();

    const features = [
        { label: 'Real-time Explainability', color: theme.accent.cyan },
        { label: 'Human Approval Loop', color: theme.accent.amber },
        { label: 'Immutable Audit Trail', color: theme.accent.violet },
        { label: 'Regulatory Compliance', color: theme.accent.teal },
    ];

    return (
        <ShotTransition
            durationInFrames={durationInFrames}
            enterType="push"
            exitType="zoom-through"
            enterDuration={14}
            exitDuration={12}
        >
            <AbsoluteFill
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 44,
                }}
            >
                <LightSweep duration={durationInFrames} color={theme.accent.cyan} intensity={0.25} layers={2} />

                <CinematicText delay={0} size={52} glowColor={theme.accent.cyan}>
                    Built for Trust
                </CinematicText>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 22, justifyContent: 'center', maxWidth: 950 }}>
                    {features.map((f, i) => {
                        const pillDelay = 25 + i * 12;
                        const pillReveal = spring({
                            frame: frame - pillDelay,
                            fps,
                            config: { damping: 10, stiffness: 180 },
                        });

                        const glowIntensity = 0.5 + Math.sin((frame - pillDelay) / 18) * 0.25;

                        return (
                            <div
                                key={f.label}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 12,
                                    padding: '16px 32px',
                                    borderRadius: 999,
                                    background: `${f.color}22`,
                                    border: `1px solid ${f.color}88`,
                                    boxShadow: `0 0 ${25 * glowIntensity}px ${f.color}66, 0 0 ${50 * glowIntensity}px ${f.color}33, inset 0 0 25px ${f.color}22`,
                                    opacity: pillReveal,
                                    transform: `scale(${interpolate(pillReveal, [0, 1], [0.6, 1])}) translateY(${interpolate(pillReveal, [0, 1], [20, 0])}px)`,
                                    fontFamily: theme.typography.fontUi,
                                    fontSize: 22,
                                    fontWeight: 600,
                                    color: '#fff',
                                    textShadow: `0 0 12px ${f.color}`,
                                }}
                            >
                                {f.label}
                            </div>
                        );
                    })}
                </div>
            </AbsoluteFill>
        </ShotTransition>
    );
};

// Shot 6: CTA / Outro
const Shot6Outro: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, durationInFrames } = useVideoConfig();

    const logoReveal = spring({
        frame,
        fps,
        config: { damping: 12, stiffness: 70 },
    });

    const ctaPulse = Math.sin(frame / 18) * 0.06 + 1;

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
                {/* Multiple lens flares for impact */}
                <LensFlare x={50} y={40} color={theme.accent.cyan} intensity={0.7} streakLength={600} delay={5} />
                <LensFlare x={48} y={42} color={theme.accent.violet} intensity={0.4} streakLength={400} delay={10} />

                <LightSweep duration={durationInFrames} color={theme.accent.cyan} intensity={0.35} layers={3} />

                {/* Logo with intense bloom */}
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
                        <LogoIcon
                            variant="trident-only"
                            background="transparent"
                            showShield
                            showParticles
                        />
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

                {/* CTA Button with bloom */}
                <BloomEffect color={theme.accent.cyan} intensity={0.7} pulseFrequency={20}>
                    <div
                        style={{
                            padding: '22px 52px',
                            background: `linear-gradient(135deg, ${theme.accent.cyan} 0%, ${theme.accent.teal} 100%)`,
                            borderRadius: 999,
                            transform: `scale(${ctaPulse})`,
                            boxShadow: `0 0 50px ${theme.accent.cyan}66, 0 0 100px ${theme.accent.cyan}33`,
                            opacity: interpolate(frame, [45, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
                        }}
                    >
                        <span
                            style={{
                                fontFamily: theme.typography.fontHeader,
                                fontSize: 26,
                                fontWeight: 700,
                                color: '#000',
                                letterSpacing: '-0.01em',
                            }}
                        >
                            Get Early Access
                        </span>
                    </div>
                </BloomEffect>

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
export const VideoMasterWWDCv2: React.FC<VideoMasterWWDCv2Props> = ({
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
        [0, 0.9, 0.9, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    return (
        <AbsoluteFill>
            <WWDCBackgroundV2 />

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
                    <Sequence from={SHOT_6_START} durationInFrames={20}>
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
                    <Sequence from={SHOT_4_START + 40} durationInFrames={15}>
                        <Audio src={staticFile(sfxHitSrc)} volume={0.5} />
                    </Sequence>
                </>
            )}

            {/* Flash transitions */}
            <FlashTransition at={SHOT_1_START + 15} duration={8} intensity={0.4} />
            <FlashTransition at={SHOT_6_START + 10} duration={10} intensity={0.3} />

            {/* Shots */}
            <Sequence from={SHOT_1_START} durationInFrames={SHOT_1_DURATION}>
                <Shot1LogoReveal />
            </Sequence>

            <Sequence from={SHOT_2_START} durationInFrames={SHOT_2_DURATION}>
                <Shot2Problem />
            </Sequence>

            <Sequence from={SHOT_3_START} durationInFrames={SHOT_3_DURATION}>
                <Shot3Solution />
            </Sequence>

            <Sequence from={SHOT_4_START} durationInFrames={SHOT_4_DURATION}>
                <Shot4Engines />
            </Sequence>

            <Sequence from={SHOT_5_START} durationInFrames={SHOT_5_DURATION}>
                <Shot5Features />
            </Sequence>

            <Sequence from={SHOT_6_START} durationInFrames={SHOT_6_DURATION}>
                <Shot6Outro />
            </Sequence>
        </AbsoluteFill>
    );
};
