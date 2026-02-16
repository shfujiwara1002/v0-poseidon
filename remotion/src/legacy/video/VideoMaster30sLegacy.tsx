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
import { SlideFrame } from './shared/SlideFrame';
import { Tier3Background } from './shared/visuals/tier3/Tier3Background';
import { GlassCard } from './shared/GlassCard';
import { WarningBadge } from './shared/WarningBadge';
import { ComplianceBadge } from './shared/ComplianceBadge';
import { EnginePill } from './shared/EnginePill';
import { TimelineHorizontal } from './shared/TimelineHorizontal';
import { LogoIcon } from './LogoIcon';
import { VisualFracturedConnection } from './shared/visuals/VisualFracturedConnection';
import { APPLE_EASING, SPRING_CONFIGS, stagger } from './shared/animation/MotionUtils';
import { BEAT_MAP } from './shared/animation/BeatSync';
import { AnimatedText } from './shared/animation/AnimatedText';
import { ParticleField } from './shared/effects/ParticleField';
import { GlowPulse } from './shared/effects/GlowPulse';
import { Camera3D, ParallaxLayer } from './shared/animation/Camera3D';
import { DeviceFrame } from './shared/visuals/DeviceFrame';

const FPS = 30;

// Align shot durations to the beat grid
const SHOT_1_START = BEAT_MAP.introStart;
const SHOT_1_DURATION = BEAT_MAP.shot2Entry - BEAT_MAP.introStart;
const SHOT_2_START = BEAT_MAP.shot2Entry;
const SHOT_2_DURATION = BEAT_MAP.shot3Entry - BEAT_MAP.shot2Entry;
const SHOT_3_START = BEAT_MAP.shot3Entry;
const SHOT_3_DURATION = BEAT_MAP.shot4Entry - BEAT_MAP.shot3Entry;
const SHOT_4_START = BEAT_MAP.shot4Entry;
const SHOT_4_DURATION = BEAT_MAP.shot5Entry - BEAT_MAP.shot4Entry;
const SHOT_5_START = BEAT_MAP.shot5Entry;
const SHOT_5_DURATION = BEAT_MAP.shot6Entry - BEAT_MAP.shot5Entry;
const SHOT_6_START = BEAT_MAP.shot6Entry;
const SHOT_6_DURATION = (30 * FPS) - BEAT_MAP.shot6Entry;

export interface VideoMaster30sProps {
  musicSrc?: string;
  sfxWhooshSrc?: string;
  sfxHitSrc?: string;
  enableAudio?: boolean;
}

const ShotWrap: React.FC<{
  durationInFrames: number;
  children: React.ReactNode;
  scaleFrom?: number;
  scaleTo?: number;
  driftX?: number;
  driftY?: number;
}> = ({ durationInFrames, children, scaleFrom = 1.05, scaleTo = 1, driftX = 0, driftY = 0 }) => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });
  const fadeOut = interpolate(frame, [durationInFrames - 10, durationInFrames], [1, 0], { extrapolateLeft: 'clamp' });
  const opacity = Math.min(fadeIn, fadeOut);

  const scale = interpolate(frame, [0, durationInFrames], [scaleFrom, scaleTo], {
    easing: APPLE_EASING,
  });
  const blurValue = interpolate(frame, [0, 8, durationInFrames - 8, durationInFrames], [10, 0, 0, 10]);
  const x = interpolate(frame, [0, durationInFrames], [driftX, 0], { easing: APPLE_EASING });
  const y = interpolate(frame, [0, durationInFrames], [driftY, 0], { easing: APPLE_EASING });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        opacity,
        filter: `blur(${blurValue}px)`,
        transform: `translate(${x}px, ${y}px) scale(${scale})`,
        transformOrigin: 'center center',
      }}
    >
      {children}
    </div>
  );
};

const ShotLayout: React.FC<{
  headline: string;
  align?: 'left' | 'center';
  children: React.ReactNode;
}> = ({ headline, align = 'left', children }) => {
  return (
    <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr', gap: 28, height: '100%' }}>
      <div style={{ maxWidth: 1100 }}>
        <AnimatedText
          mode="word"
          delay={5}
          stagger={4}
          style={{
            fontFamily: theme.typography.fontHeader,
            fontSize: theme.typography.text5xl,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: theme.text.primary,
            textShadow: theme.textShadowNeon,
            lineHeight: 1.1,
            justifyContent: align === 'center' ? 'center' : 'flex-start',
          }}
        >
          {headline}
        </AnimatedText>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: align === 'center' ? 'center' : 'flex-start',
          height: '100%',
        }}
      >
        {children}
      </div>
    </div>
  );
};

const LogoLockup: React.FC<{ variant: 'trident' | 'wordmark'; delay?: number }> = ({ variant, delay = 0 }) => {
  const isWordmark = variant === 'wordmark';
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const reveal = spring({ frame: frame - delay, fps, config: SPRING_CONFIGS.overshoot });
  const pulse = Math.sin(frame / 15) * 0.015;

  return (
    <GlowPulse color={theme.accent.cyan} intensity={0.6} frequency={20}>
      <div
        style={{
          width: isWordmark ? 1000 : 580,
          height: isWordmark ? 400 : 580,
          position: 'relative',
          opacity: reveal,
          transform: `scale(${reveal * (1 + pulse)})`,
        }}
      >
        <LogoIcon
          variant={isWordmark ? 'wordmark' : 'trident-only'}
          background="transparent"
          showShield={!isWordmark}
          showParticles={!isWordmark}
          showWordmark={isWordmark}
        />
      </div>
    </GlowPulse>
  );
};

const LightSweep: React.FC<{ durationInFrames: number; opacity?: number }> = ({ durationInFrames, opacity = 0.35 }) => {
  const frame = useCurrentFrame();

  // Primary slow sweep
  const progress1 = interpolate(frame, [0, durationInFrames], [-0.4, 1.4], {
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });

  // Secondary faster sweep
  const progress2 = interpolate(frame, [0, durationInFrames], [-0.8, 1.8], {
    easing: Easing.bezier(0.2, 0, 0.1, 1),
  });

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translateX(${progress1 * 100}%)`,
          opacity,
          mixBlendMode: 'screen',
          background: 'linear-gradient(110deg, transparent 0%, rgba(255,255,255,0.2) 48%, rgba(0,240,255,0.4) 50%, rgba(255,255,255,0.2) 52%, transparent 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translateX(${progress2 * 100}%)`,
          opacity: opacity * 0.5,
          mixBlendMode: 'screen',
          background: 'linear-gradient(110deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)',
        }}
      />
    </div>
  );
};

const Shot2FragmentedAlerts: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const reveal = spring({ frame: frame - 15, fps, config: SPRING_CONFIGS.snappy });

  return (
    <ShotLayout headline="Speed alone does not create trust.">
      <div style={{ width: '100%', opacity: reveal, transform: `scale(${0.95 + reveal * 0.05})` }}>
        <GlassCard style={{ padding: 24, width: '100%', position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <WarningBadge>UNVERIFIED</WarningBadge>
            <div style={{ color: theme.text.muted, fontSize: 18 }}>Multiple alerts. No clear reason.</div>
          </div>
          <div style={{ marginTop: 16, position: 'relative' }}>
            <VisualFracturedConnection width={900} height={360} showLegend={false} showAnnotations={false} />
          </div>
          <LightSweep durationInFrames={SHOT_2_DURATION} opacity={0.3} />
        </GlassCard>
      </div>
    </ShotLayout>
  );
}

const Shot3Explainability: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cardReveal = spring({ frame: frame - 10, fps, config: SPRING_CONFIGS.snappy });
  const buttonReveal = spring({ frame: frame - 25, fps, config: SPRING_CONFIGS.overshoot });

  return (
    <ShotLayout headline="Shows the reason. Waits for approval.">
      <div style={{ width: '100%', maxWidth: 980, opacity: cardReveal, transform: `scale(${0.98 + cardReveal * 0.02})` }}>
        <GlassCard style={{ padding: 28, width: '100%', position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 24, fontWeight: 700 }}>Explainability</div>
            <ComplianceBadge>GOVERN‑VERIFIED</ComplianceBadge>
          </div>
          <div style={{ marginTop: 12, color: theme.text.muted, fontSize: 20, lineHeight: 1.5 }}>
            Location mismatch · New merchant type · Unusual time
          </div>
          <div style={{ marginTop: 24, display: 'flex', gap: 16, opacity: buttonReveal, transform: `translateY(${(1 - buttonReveal) * 10}px)` }}>
            <div
              style={{
                padding: '12px 24px',
                borderRadius: 14,
                background: theme.accent.teal,
                color: '#001018',
                fontWeight: 700,
                fontSize: 20,
                boxShadow: '0 0 30px rgba(20,184,166,0.45)',
              }}
            >
              Approve
            </div>
            <div
              style={{
                padding: '12px 24px',
                borderRadius: 14,
                border: '2px solid rgba(255,255,255,0.3)',
                color: 'white',
                fontWeight: 600,
                fontSize: 20,
              }}
            >
              Review
            </div>
          </div>
          <div style={{ marginTop: 20, color: theme.text.muted2, fontSize: 16, fontStyle: 'italic' }}>
            Confidence 0.94 · Model v2.8 (Validated)
          </div>
          <LightSweep durationInFrames={SHOT_3_DURATION} opacity={0.4} />
        </GlassCard>
      </div>
    </ShotLayout>
  );
}

const Shot4EnginePills: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const engines: Array<'Protect' | 'Grow' | 'Execute' | 'Govern'> = ['Protect', 'Grow', 'Execute', 'Govern'];

  return (
    <ShotLayout headline="Protect / Grow / Execute / Govern" align="center">
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
        {engines.map((engine, index) => {
          const sFrame = stagger(frame, index, 8);
          const reveal = spring({
            frame: sFrame,
            fps,
            config: SPRING_CONFIGS.overshoot,
          });
          return (
            <div
              key={engine}
              style={{
                opacity: reveal,
                transform: `translateY(${(1 - reveal) * 15}px) scale(${0.9 + reveal * 0.1})`,
                boxShadow: reveal > 0.6 ? `0 0 30px ${theme.accent.cyan}44` : 'none',
                borderRadius: 999,
              }}
            >
              <EnginePill status={engine} active={reveal > 0.8} />
            </div>
          );
        })}
      </div>
    </ShotLayout>
  );
};



const Shot5AuditTrail: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const reveal = spring({ frame: frame - 12, fps, config: SPRING_CONFIGS.snappy });

  return (
    <ShotLayout headline="Every decision is visible.">
      <div style={{ display: 'flex', gap: 60, width: '100%', alignItems: 'center' }}>
        <div style={{ flex: 1.2, opacity: reveal, transform: `translateX(${(1 - reveal) * -20}px)` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <div style={{ fontSize: 24, fontWeight: 700 }}>Decision Log</div>
            <ComplianceBadge>GOVERN‑VERIFIED</ComplianceBadge>
          </div>
          <TimelineHorizontal
            segments={[
              { label: 'Scan', time: '0ms', color: theme.accent.red, active: true },
              { label: 'Explain', time: '12ms', color: theme.accent.teal },
              { label: 'Verify', time: 'Human', color: theme.accent.amber },
              { label: 'Resolve', time: 'Audit', color: theme.accent.cyan },
            ]}
          />
        </div>
        <div style={{ flex: 1, opacity: reveal, transform: `translateX(${(1 - reveal) * 20}px) perspective(1000px) rotateY(-8deg)` }}>
          <DeviceFrame device="macbook" style={{ width: 620, height: 380 }}>
            <div style={{ padding: 24, color: '#fff', fontFamily: theme.typography.fontUi }}>
              <div style={{ fontSize: 20, fontWeight: 700, borderBottom: '1px solid #333', paddingBottom: 12, marginBottom: 20 }}>Poseidon Desktop</div>
              <div style={{ height: 120, background: 'rgba(255,255,255,0.03)', borderRadius: 8, border: '1px solid #222' }} />
              <div style={{ marginTop: 20, display: 'flex', gap: 12 }}>
                <div style={{ flex: 1, height: 90, background: 'rgba(0,240,255,0.05)', borderRadius: 8, border: '1px solid rgba(0,240,255,0.1)' }} />
                <div style={{ flex: 1, height: 90, background: 'rgba(20,184,166,0.05)', borderRadius: 8, border: '1px solid rgba(20,184,166,0.1)' }} />
              </div>
            </div>
          </DeviceFrame>
        </div>
      </div>
    </ShotLayout>
  );
}

const Shot6Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const reveal = spring({ frame, fps, config: SPRING_CONFIGS.overshoot });

  return (
    <ShotLayout headline="Trusted AI — for your money." align="center">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40, width: '100%' }}>
        <LogoLockup variant="wordmark" delay={10} />

        <div style={{ display: 'flex', gap: 80, alignItems: 'flex-end', opacity: reveal, transform: `translateY(${(1 - reveal) * 30}px)` }}>
          <DeviceFrame device="iphone" style={{ width: 200, height: 420, transform: 'rotate(-6deg) translateY(30px)' }}>
            <div style={{ padding: 20, color: '#fff', fontSize: 14 }}>
              <div style={{ fontWeight: 700, marginBottom: 15 }}>Mobile App</div>
              <div style={{ height: 50, background: 'rgba(0,240,255,0.12)', borderRadius: 8, marginBottom: 10, border: '1px solid rgba(0,240,255,0.2)' }} />
              <div style={{ height: 50, background: 'rgba(255,255,255,0.05)', borderRadius: 8 }} />
            </div>
          </DeviceFrame>

          <div style={{ paddingBottom: 60 }}>
            <div
              style={{
                padding: '18px 44px',
                borderRadius: 999,
                background: `linear-gradient(135deg, ${theme.accent.cyan}, ${theme.accent.teal})`,
                color: '#001018',
                fontWeight: 800,
                fontSize: 26,
                boxShadow: `0 20px 60px ${theme.accent.cyan}44, 0 0 40px ${theme.accent.cyan}66`,
                cursor: 'pointer',
              }}
            >
              Get Early Access
            </div>
          </div>

          <DeviceFrame device="iphone" style={{ width: 200, height: 420, transform: 'rotate(6deg) translateY(30px)' }}>
            <div style={{ padding: 20, color: '#fff', fontSize: 14 }}>
              <div style={{ fontWeight: 700, marginBottom: 15 }}>Secure Pay</div>
              <div style={{ height: 50, background: 'rgba(168,85,247,0.1)', borderRadius: 8, marginBottom: 10, border: '1px solid rgba(168,85,247,0.2)' }} />
              <div style={{ height: 50, background: 'rgba(255,255,255,0.05)', borderRadius: 8 }} />
            </div>
          </DeviceFrame>
        </div>
      </div>
    </ShotLayout>
  );
}

const AnimatedTier3: React.FC = () => {
  // ... (omitted same)
  const frame = useCurrentFrame();
  const scale = 1.1 + Math.sin(frame / 120) * 0.05;

  return (
    <ParallaxLayer depth={-200} style={{ transform: `scale(${scale})` }}>
      <Tier3Background
        layers={[
          { visual: 'hexmesh', color: theme.accent.cyan, opacity: 0.18, scale: 50 },
          { visual: 'circuit', color: theme.accent.violet, opacity: 0.15, density: 25, blendMode: 'screen' },
        ]}
      />
      <ParticleField
        count={70}
        colors={[theme.accent.cyan, theme.accent.violet, '#ffffff']}
        drift={{ x: 40, y: 20 }}
      />
    </ParallaxLayer>
  );
};

export const VideoMaster30s: React.FC<VideoMaster30sProps> = ({
  musicSrc = "audio/poseidon-beat.wav",
  sfxWhooshSrc = "audio/whoosh.wav",
  sfxHitSrc = "audio/hit.ogg",
  enableAudio = true,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const musicVolume = interpolate(frame, [0, 15, durationInFrames - 30, durationInFrames], [0, 1, 1, 0], {
    easing: APPLE_EASING,
  });

  return (
    <SlideFrame showFooter={false}>
      <Camera3D driftX={30} driftY={20} rotateScale={0.8}>
        <AnimatedTier3 />
        <AbsoluteFill style={{ position: 'relative', zIndex: 1, overflow: 'hidden' }}>
          {enableAudio && musicSrc ? (
            <Audio src={staticFile(musicSrc)} volume={musicVolume} />
          ) : null}

          {enableAudio && sfxWhooshSrc && (
            <>
              <Sequence from={SHOT_2_START} durationInFrames={15}><Audio src={staticFile(sfxWhooshSrc)} volume={0.8} /></Sequence>
              <Sequence from={SHOT_3_START} durationInFrames={15}><Audio src={staticFile(sfxWhooshSrc)} volume={0.6} /></Sequence>
              <Sequence from={SHOT_4_START} durationInFrames={15}><Audio src={staticFile(sfxWhooshSrc)} volume={0.7} /></Sequence>
              <Sequence from={SHOT_6_START} durationInFrames={15}><Audio src={staticFile(sfxWhooshSrc)} volume={0.9} /></Sequence>
            </>
          )}

          {enableAudio && sfxHitSrc && (
            <>
              <Sequence from={SHOT_4_START + 8} durationInFrames={10}><Audio src={staticFile(sfxHitSrc)} volume={0.5} /></Sequence>
              <Sequence from={SHOT_1_START + 15} durationInFrames={10}><Audio src={staticFile(sfxHitSrc)} volume={0.6} /></Sequence>
            </>
          )}

          <Sequence from={SHOT_1_START} durationInFrames={SHOT_1_DURATION}>
            <ShotWrap durationInFrames={SHOT_1_DURATION} scaleFrom={1.1} scaleTo={1}>
              <ShotLayout headline="Your money deserves AI that can explain itself." align="center">
                <LogoLockup variant="trident" delay={BEAT_MAP.logoHit} />
              </ShotLayout>
            </ShotWrap>
          </Sequence>

          <Sequence from={SHOT_2_START} durationInFrames={SHOT_2_DURATION}>
            <ShotWrap durationInFrames={SHOT_2_DURATION} scaleFrom={1.08}>
              <Shot2FragmentedAlerts />
            </ShotWrap>
          </Sequence>

          <Sequence from={SHOT_3_START} durationInFrames={SHOT_3_DURATION}>
            <ShotWrap durationInFrames={SHOT_3_DURATION} scaleFrom={1.06}>
              <Shot3Explainability />
            </ShotWrap>
          </Sequence>

          <Sequence from={SHOT_4_START} durationInFrames={SHOT_4_DURATION}>
            <ShotWrap durationInFrames={SHOT_4_DURATION} scaleFrom={1.05}>
              <Shot4EnginePills />
            </ShotWrap>
          </Sequence>

          <Sequence from={SHOT_5_START} durationInFrames={SHOT_5_DURATION}>
            <ShotWrap durationInFrames={SHOT_5_DURATION} scaleFrom={1.05}>
              <Shot5AuditTrail />
            </ShotWrap>
          </Sequence>

          <Sequence from={SHOT_6_START} durationInFrames={SHOT_6_DURATION}>
            <ShotWrap durationInFrames={SHOT_6_DURATION} scaleFrom={1.04}>
              <ShotLayout headline="Trusted AI — for your money." align="center">
                <LogoLockup variant="wordmark" delay={15} />
              </ShotLayout>
            </ShotWrap>
          </Sequence>
        </AbsoluteFill>
      </Camera3D>
    </SlideFrame>
  );
};
