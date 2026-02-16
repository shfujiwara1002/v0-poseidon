import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { theme } from '../../shared/theme';
import { Tier3Background } from '../../shared/visuals/tier3/Tier3Background';
import { FloatingParticles, DustMotes } from '../../shared/effects/FloatingParticles';
import { BeatSyncedGrid, BeatFlash } from '../../shared/cinematic';
import { VIDEO_BPM } from '../config';

interface Tier3Layer {
  visual: 'hexmesh' | 'circuit' | 'globe' | 'particles' | 'dataflow' | 'waveform' | 'grid';
  color: string;
  opacity: number;
  blendMode?: React.CSSProperties['mixBlendMode'];
  scale?: number;
  density?: number;
  radius?: number;
  position?: 'full' | 'left' | 'right' | 'center';
  count?: number;
  nodes?: number;
  flowDirection?: 'horizontal' | 'vertical' | 'radial';
  amplitude?: number;
  frequency?: number;
  waves?: number;
  size?: number;
}

const DEFAULT_TIER3_LAYERS: Tier3Layer[] = [
  { visual: 'hexmesh', color: theme.accent.cyan, opacity: 0.18, scale: 55 },
  { visual: 'circuit', color: theme.accent.violet, opacity: 0.14, density: 24, blendMode: 'screen' },
];

export interface CinematicBackgroundProps {
  useTier3?: boolean;
  tier3Layers?: Tier3Layer[];
  tier3Opacity?: number;
}

export const CinematicBackground: React.FC<CinematicBackgroundProps> = ({
  useTier3 = true,
  tier3Layers,
  tier3Opacity = 0.12,
}) => {
  const frame = useCurrentFrame();

  const rotation = interpolate(frame, [0, 900], [0, 360]);
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

      <BeatSyncedGrid
        cellSize={80}
        color={theme.accent.cyan}
        baseOpacity={0.03}
        pulseIntensity={0.08}
        bpm={VIDEO_BPM}
        perspective
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
            radial-gradient(ellipse 45% 55% at 50% 70%, rgba(255,107,107,${0.3 * pulseA}) 0%, transparent 50%)
          `,
          filter: 'blur(80px)',
        }}
      />

      {useTier3 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: tier3Opacity,
            mixBlendMode: 'screen',
          }}
        >
          <Tier3Background layers={tier3Layers ?? DEFAULT_TIER3_LAYERS} />
        </div>
      )}

      <FloatingParticles
        count={80}
        colors={[theme.accent.cyan, theme.accent.violet, '#ffffff', theme.accent.teal]}
        sizeRange={[2, 7]}
        speed={0.8}
        glow
        depthBlur
        opacityRange={[0.15, 0.5]}
      />

      <DustMotes count={100} opacity={0.1} speed={0.3} />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 30%, rgba(0,0,0,0.75) 100%)',
        }}
      />

      <BeatFlash color="#ffffff" intensity={0.05} bpm={VIDEO_BPM} beatDivision={4} />
    </AbsoluteFill>
  );
};
