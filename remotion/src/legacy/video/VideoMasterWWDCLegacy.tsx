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

const FPS = 30;

// Shot timings - faster pacing like WWDC
const SHOT_1_START = 0;
const SHOT_1_DURATION = Math.round(3.5 * FPS); // Logo reveal
const SHOT_2_START = SHOT_1_START + SHOT_1_DURATION;
const SHOT_2_DURATION = Math.round(4.5 * FPS); // Problem
const SHOT_3_START = SHOT_2_START + SHOT_2_DURATION;
const SHOT_3_DURATION = Math.round(4.5 * FPS); // Solution
const SHOT_4_START = SHOT_3_START + SHOT_3_DURATION;
const SHOT_4_DURATION = 5 * FPS; // 4 Engines
const SHOT_5_START = SHOT_4_START + SHOT_4_DURATION;
const SHOT_5_DURATION = 5 * FPS; // Features
const SHOT_6_START = SHOT_5_START + SHOT_5_DURATION;
const SHOT_6_DURATION = Math.round(7.5 * FPS); // Outro with CTA

export interface VideoMasterWWDCProps {
  musicSrc?: string;
  enableAudio?: boolean;
}

// WWDC-style animated gradient background
const WWDCBackground: React.FC = () => {
  const frame = useCurrentFrame();

  // Slow rotation of gradient
  const rotation = interpolate(frame, [0, 900], [0, 360], {
    extrapolateRight: 'extend',
  });

  // Pulsing glow intensity
  const pulseA = Math.sin(frame / 40) * 0.15 + 0.85;
  const pulseB = Math.cos(frame / 35) * 0.12 + 0.88;

  // Subtle drift
  const driftX = Math.sin(frame / 80) * 30;
  const driftY = Math.cos(frame / 90) * 20;

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

      {/* WWDC-style color orbs */}
      <div
        style={{
          position: 'absolute',
          width: 1200,
          height: 1200,
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%) translate(${driftX}px, ${driftY}px) rotate(${rotation}deg)`,
          background: `
            radial-gradient(ellipse 60% 50% at 30% 30%, rgba(138,43,226,${0.4 * pulseA}) 0%, transparent 60%),
            radial-gradient(ellipse 50% 60% at 70% 40%, rgba(0,191,255,${0.35 * pulseB}) 0%, transparent 55%),
            radial-gradient(ellipse 45% 55% at 50% 70%, rgba(255,107,107,${0.25 * pulseA}) 0%, transparent 50%),
            radial-gradient(ellipse 55% 45% at 25% 65%, rgba(0,240,255,${0.3 * pulseB}) 0%, transparent 55%)
          `,
          filter: 'blur(80px)',
        }}
      />

      {/* Secondary faster rotating layer */}
      <div
        style={{
          position: 'absolute',
          width: 800,
          height: 800,
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%) rotate(${-rotation * 0.7}deg)`,
          background: `
            radial-gradient(ellipse 70% 50% at 60% 50%, rgba(139,92,246,${0.2 * pulseA}) 0%, transparent 50%),
            radial-gradient(ellipse 50% 70% at 40% 50%, rgba(20,184,166,${0.18 * pulseB}) 0%, transparent 50%)
          `,
          filter: 'blur(60px)',
        }}
      />

      {/* Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 30%, rgba(0,0,0,0.7) 100%)',
        }}
      />

      {/* Film grain overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </AbsoluteFill>
  );
};

// Snap-in text animation (WWDC style)
const SnapText: React.FC<{
  children: string;
  delay?: number;
  size?: number;
  weight?: number;
  color?: string;
  glow?: boolean;
  splitWords?: boolean;
}> = ({ children, delay = 0, size = 72, weight = 700, color = '#fff', glow = true, splitWords = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (splitWords) {
    const words = children.split(' ');
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25em', justifyContent: 'center' }}>
        {words.map((word, i) => (
          <SnapText key={i} delay={delay + i * 3} size={size} weight={weight} color={color} glow={glow}>
            {word}
          </SnapText>
        ))}
      </div>
    );
  }

  const animProgress = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 12,
      stiffness: 180,
      mass: 0.8,
    },
  });

  const scale = interpolate(animProgress, [0, 1], [1.3, 1]);
  const opacity = interpolate(animProgress, [0, 0.3, 1], [0, 1, 1], { extrapolateRight: 'clamp' });
  const y = interpolate(animProgress, [0, 1], [40, 0]);
  const blur = interpolate(animProgress, [0, 0.5, 1], [8, 2, 0], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        display: 'inline-block',
        fontFamily: theme.typography.fontHeader,
        fontSize: size,
        fontWeight: weight,
        color,
        opacity,
        transform: `translateY(${y}px) scale(${scale})`,
        filter: `blur(${blur}px)`,
        textShadow: glow ? `0 0 40px ${color}66, 0 0 80px ${color}33` : 'none',
        letterSpacing: '-0.02em',
      }}
    >
      {children}
    </div>
  );
};

// Flying card component (3D perspective)
const FlyingCard: React.FC<{
  children: React.ReactNode;
  delay?: number;
  fromDirection?: 'left' | 'right' | 'bottom' | 'top';
  rotateAmount?: number;
}> = ({ children, delay = 0, fromDirection = 'bottom', rotateAmount = 15 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 120, mass: 1 },
  });

  const directions = {
    left: { x: -400, y: 0, rotateY: -rotateAmount },
    right: { x: 400, y: 0, rotateY: rotateAmount },
    bottom: { x: 0, y: 200, rotateX: rotateAmount },
    top: { x: 0, y: -200, rotateX: -rotateAmount },
  };

  const dir = directions[fromDirection];
  const x = interpolate(progress, [0, 1], [dir.x, 0]);
  const y = interpolate(progress, [0, 1], [dir.y, 0]);
  const rotateX = interpolate(progress, [0, 1], [dir.rotateX || 0, 0]);
  const rotateY = interpolate(progress, [0, 1], [dir.rotateY || 0, 0]);
  const opacity = interpolate(progress, [0, 0.3, 1], [0, 1, 1], { extrapolateRight: 'clamp' });
  const scale = interpolate(progress, [0, 1], [0.8, 1]);

  return (
    <div
      style={{
        opacity,
        transform: `perspective(1200px) translate(${x}px, ${y}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  );
};

// Glowing pill/badge
const GlowPill: React.FC<{
  label: string;
  icon?: React.ReactNode;
  color: string;
  delay?: number;
  size?: 'sm' | 'md' | 'lg';
}> = ({ label, icon, color, delay = 0, size = 'md' }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 10, stiffness: 200 },
  });

  const scale = interpolate(progress, [0, 1], [0.5, 1]);
  const opacity = interpolate(progress, [0, 0.5, 1], [0, 1, 1]);

  // Continuous glow pulse
  const glowIntensity = 0.5 + Math.sin((frame - delay) / 15) * 0.2;

  const sizes = {
    sm: { padding: '8px 16px', fontSize: 16, gap: 6 },
    md: { padding: '12px 24px', fontSize: 20, gap: 10 },
    lg: { padding: '16px 32px', fontSize: 24, gap: 12 },
  };

  const s = sizes[size];

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: s.gap,
        padding: s.padding,
        borderRadius: 999,
        background: `${color}22`,
        border: `1px solid ${color}88`,
        boxShadow: `0 0 ${20 * glowIntensity}px ${color}66, 0 0 ${40 * glowIntensity}px ${color}33, inset 0 0 20px ${color}22`,
        opacity,
        transform: `scale(${scale})`,
        fontFamily: theme.typography.fontUi,
        fontSize: s.fontSize,
        fontWeight: 600,
        color: '#fff',
        textShadow: `0 0 10px ${color}`,
      }}
    >
      {icon}
      {label}
    </div>
  );
};

// Shot 1: Logo Reveal
const Shot1LogoReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const logoProgress = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  const scale = interpolate(logoProgress, [0, 1], [0.6, 1]);
  const opacity = interpolate(logoProgress, [0, 0.3, 1], [0, 1, 1]);
  const rotateY = interpolate(logoProgress, [0, 1], [-30, 0]);

  // Tagline fade in
  const taglineOpacity = interpolate(frame, [45, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const taglineY = interpolate(frame, [45, 70], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Exit animation
  const exitProgress = interpolate(frame, [durationInFrames - 15, durationInFrames], [0, 1], { extrapolateLeft: 'clamp' });
  const exitScale = interpolate(exitProgress, [0, 1], [1, 1.2]);
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0]);

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 40,
        opacity: exitOpacity,
        transform: `scale(${exitScale})`,
      }}
    >
      <div
        style={{
          width: 400,
          height: 400,
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

      <div
        style={{
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: theme.typography.fontHeader,
            fontSize: 56,
            fontWeight: 700,
            color: '#fff',
            textShadow: '0 0 40px rgba(0,240,255,0.5), 0 0 80px rgba(0,240,255,0.3)',
            letterSpacing: '-0.02em',
          }}
        >
          Poseidon
        </div>
        <div
          style={{
            fontFamily: theme.typography.fontUi,
            fontSize: 24,
            color: 'rgba(255,255,255,0.7)',
            marginTop: 12,
          }}
        >
          Trusted AI for Your Money
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Shot 2: The Problem
const Shot2Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Exit
  const exitOpacity = interpolate(frame, [durationInFrames - 12, durationInFrames], [1, 0], { extrapolateLeft: 'clamp' });
  const exitScale = interpolate(frame, [durationInFrames - 12, durationInFrames], [1, 0.95], { extrapolateLeft: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 80,
        opacity: exitOpacity,
        transform: `scale(${exitScale})`,
      }}
    >
      <SnapText delay={0} size={28} weight={500} color="rgba(255,100,100,0.9)" glow={false}>
        THE PROBLEM
      </SnapText>

      <div style={{ height: 24 }} />

      <SnapText delay={8} size={64} splitWords>
        Speed alone does not create trust.
      </SnapText>

      <div style={{ height: 48 }} />

      <FlyingCard delay={25} fromDirection="bottom">
        <div
          style={{
            padding: '32px 48px',
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.3)',
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
                background: 'rgba(239,68,68,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 32,
              }}
            >
              ⚠️
            </div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 600, color: '#fff', fontFamily: theme.typography.fontUi }}>
                Black-box AI decisions
              </div>
              <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.6)', marginTop: 4, fontFamily: theme.typography.fontUi }}>
                No explanation. No audit trail. No trust.
              </div>
            </div>
          </div>
        </div>
      </FlyingCard>
    </AbsoluteFill>
  );
};

// Shot 3: The Solution
const Shot3Solution: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const exitOpacity = interpolate(frame, [durationInFrames - 12, durationInFrames], [1, 0], { extrapolateLeft: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 80,
        opacity: exitOpacity,
      }}
    >
      <SnapText delay={0} size={28} weight={500} color={theme.accent.teal} glow={false}>
        THE SOLUTION
      </SnapText>

      <div style={{ height: 24 }} />

      <SnapText delay={8} size={64} splitWords>
        AI that explains every decision.
      </SnapText>

      <div style={{ height: 48 }} />

      <FlyingCard delay={25} fromDirection="bottom">
        <div
          style={{
            padding: '32px 48px',
            background: 'rgba(20,184,166,0.1)',
            border: '1px solid rgba(20,184,166,0.3)',
            borderRadius: 24,
            backdropFilter: 'blur(20px)',
            display: 'flex',
            gap: 24,
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: 'rgba(20,184,166,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 32,
            }}
          >
            ✓
          </div>
          <div>
            <div style={{ fontSize: 24, fontWeight: 600, color: '#fff', fontFamily: theme.typography.fontUi }}>
              Explainable. Auditable. Trusted.
            </div>
            <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.6)', marginTop: 4, fontFamily: theme.typography.fontUi }}>
              Human-in-the-loop governance for every transaction.
            </div>
          </div>
        </div>
      </FlyingCard>
    </AbsoluteFill>
  );
};

// Shot 4: Four Engines
const Shot4Engines: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const engines = [
    { name: 'Protect', icon: '🛡️', color: theme.accent.red, desc: 'Fraud & threat detection' },
    { name: 'Grow', icon: '📈', color: theme.accent.violet, desc: 'Intelligent investing' },
    { name: 'Execute', icon: '⚡', color: theme.accent.cyan, desc: 'Smart transactions' },
    { name: 'Govern', icon: '⚖️', color: theme.accent.amber, desc: 'Compliance & audit' },
  ];

  const exitOpacity = interpolate(frame, [durationInFrames - 12, durationInFrames], [1, 0], { extrapolateLeft: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 60,
        opacity: exitOpacity,
      }}
    >
      <SnapText delay={0} size={28} weight={500} color="rgba(255,255,255,0.6)" glow={false}>
        FOUR AI ENGINES
      </SnapText>

      <div style={{ height: 24 }} />

      <SnapText delay={6} size={56}>
        Protect / Grow / Execute / Govern
      </SnapText>

      <div style={{ height: 48 }} />

      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
        {engines.map((engine, i) => (
          <FlyingCard key={engine.name} delay={30 + i * 8} fromDirection={i % 2 === 0 ? 'left' : 'right'}>
            <div
              style={{
                width: 200,
                padding: '28px 24px',
                background: `${engine.color}11`,
                border: `1px solid ${engine.color}44`,
                borderRadius: 20,
                backdropFilter: 'blur(16px)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 12 }}>{engine.icon}</div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: engine.color,
                  fontFamily: theme.typography.fontHeader,
                  textShadow: `0 0 20px ${engine.color}66`,
                }}
              >
                {engine.name}
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: 'rgba(255,255,255,0.6)',
                  marginTop: 8,
                  fontFamily: theme.typography.fontUi,
                }}
              >
                {engine.desc}
              </div>
            </div>
          </FlyingCard>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// Shot 5: Key Features
const Shot5Features: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const features = [
    { label: 'Real-time Explainability', color: theme.accent.cyan },
    { label: 'Human Approval Loop', color: theme.accent.amber },
    { label: 'Immutable Audit Trail', color: theme.accent.violet },
    { label: 'Regulatory Compliance', color: theme.accent.teal },
  ];

  const exitOpacity = interpolate(frame, [durationInFrames - 12, durationInFrames], [1, 0], { extrapolateLeft: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 40,
        opacity: exitOpacity,
      }}
    >
      <SnapText delay={0} size={48}>
        Built for Trust
      </SnapText>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'center', maxWidth: 900 }}>
        {features.map((f, i) => (
          <GlowPill key={f.label} label={f.label} color={f.color} delay={20 + i * 10} size="lg" />
        ))}
      </div>
    </AbsoluteFill>
  );
};

// Shot 6: CTA / Outro
const Shot6Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo animation
  const logoProgress = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  const logoScale = interpolate(logoProgress, [0, 1], [0.8, 1]);
  const logoOpacity = interpolate(logoProgress, [0, 0.5, 1], [0, 1, 1]);

  // CTA pulse
  const ctaPulse = Math.sin(frame / 20) * 0.05 + 1;

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 36,
      }}
    >
      <div
        style={{
          width: 280,
          height: 280,
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
        }}
      >
        <LogoIcon
          variant="trident-only"
          background="transparent"
          showShield
          showParticles
        />
      </div>

      <SnapText delay={15} size={52}>
        Poseidon
      </SnapText>

      <SnapText delay={25} size={28} weight={400} color="rgba(255,255,255,0.7)">
        Trusted AI for Your Money
      </SnapText>

      <div style={{ height: 20 }} />

      <FlyingCard delay={40} fromDirection="bottom">
        <div
          style={{
            padding: '20px 48px',
            background: `linear-gradient(135deg, ${theme.accent.cyan} 0%, ${theme.accent.teal} 100%)`,
            borderRadius: 999,
            transform: `scale(${ctaPulse})`,
            boxShadow: `0 0 40px ${theme.accent.cyan}66, 0 0 80px ${theme.accent.cyan}33`,
          }}
        >
          <span
            style={{
              fontFamily: theme.typography.fontHeader,
              fontSize: 24,
              fontWeight: 700,
              color: '#000',
              letterSpacing: '-0.01em',
            }}
          >
            Get Early Access
          </span>
        </div>
      </FlyingCard>

      <SnapText delay={55} size={18} weight={400} color="rgba(255,255,255,0.5)">
        poseidon.ai
      </SnapText>
    </AbsoluteFill>
  );
};

export const VideoMasterWWDC: React.FC<VideoMasterWWDCProps> = ({
  musicSrc,
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
      <WWDCBackground />

      {enableAudio && musicSrc && (
        <Audio src={staticFile(musicSrc)} volume={musicVolume} />
      )}

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
