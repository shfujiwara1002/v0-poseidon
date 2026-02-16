import React from 'react';
import { VisualHexMesh } from './VisualHexMesh';
import { VisualCircuit } from './VisualCircuit';
import { VisualHoloGlobe } from './VisualHoloGlobe';
import { VisualParticleField } from './VisualParticleField';
import { VisualDataFlow } from './VisualDataFlow';
import { VisualWaveform } from './VisualWaveform';
import { ShapeGrid } from '../ShapeGrid';

interface Tier3Layer {
  visual: 'hexmesh' | 'circuit' | 'globe' | 'particles' | 'dataflow' | 'waveform' | 'grid';
  color: string;
  opacity: number;
  blendMode?: React.CSSProperties['mixBlendMode'];
  scale?: number;       // HexMesh only
  density?: number;     // Circuit only
  radius?: number;      // Globe only
  position?: 'full' | 'left' | 'right' | 'center'; // Globe only
  count?: number;       // Particles only (default: 60)
  nodes?: number;       // DataFlow only (default: 8)
  flowDirection?: 'horizontal' | 'vertical' | 'radial'; // DataFlow only
  amplitude?: number;   // Waveform only (default: 40)
  frequency?: number;   // Waveform only (default: 3)
  waves?: number;       // Waveform only (default: 3)
  size?: number;        // Grid only (default: 100)
  // Enhanced props
  filterType?: string;       // SVG filter id override
  fillThreshold?: number;    // HexMesh: lower = more filled (default 0.85)
  minSize?: number;          // Particles min dot size (default 1)
  maxSize?: number;          // Particles max dot size (default 3)
  glowRatio?: number;        // Particles glow fraction (default 0.2)
  waveHeight?: number;       // Waveform height in px (default 200)
  wavePosition?: 'bottom' | 'top'; // Waveform anchor (default 'bottom')
}

interface Tier3BackgroundProps {
  layers: ReadonlyArray<Tier3Layer>;
}

/**
 * SlideFrame content area (margin 140px/100px) の中から
 * AbsoluteFill 全域 (1920x1080) に tier3 ビジュアルを展開する。
 *
 * HighFidelityDemo.tsx の "escape hatch" パターンを汎用化。
 * - left: -140, top: -100 で margin を打ち消す
 * - width: 1920, height: 1080 で全画面カバー
 * - pointerEvents: 'none', zIndex: 0 でコンテンツの下に配置
 */
export const Tier3Background: React.FC<Tier3BackgroundProps> = ({ layers }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: -140,
        top: -100,
        width: 1920,
        height: 1080,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {layers.map((layer, i) => {
        if (layer.visual === 'globe') {
          const r = layer.radius ?? 250;
          const w = r * 2 + 200;
          const h = r * 2 + 200;
          const positionStyle: React.CSSProperties =
            layer.position === 'right'
              ? { position: 'absolute', right: 100, top: '50%', transform: 'translateY(-50%)' }
              : layer.position === 'left'
                ? { position: 'absolute', left: 100, top: '50%', transform: 'translateY(-50%)' }
                : { position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' };

          return (
            <div key={i} style={{ ...positionStyle, opacity: layer.opacity }}>
              <VisualHoloGlobe width={w} height={h} radius={r} color={layer.color} />
            </div>
          );
        }

        // Particles — full bleed
        if (layer.visual === 'particles') {
          return (
            <div key={i} style={{ position: 'absolute', inset: 0, opacity: layer.opacity, mixBlendMode: layer.blendMode ?? 'normal' }}>
              <VisualParticleField width={1920} height={1080} count={layer.count ?? 60} color={layer.color} minSize={layer.minSize} maxSize={layer.maxSize} glowRatio={layer.glowRatio} filterType={layer.filterType} />
            </div>
          );
        }

        // DataFlow — full bleed
        if (layer.visual === 'dataflow') {
          return (
            <div key={i} style={{ position: 'absolute', inset: 0, opacity: layer.opacity, mixBlendMode: layer.blendMode ?? 'normal' }}>
              <VisualDataFlow width={1920} height={1080} nodes={layer.nodes ?? 8} color={layer.color} flowDirection={layer.flowDirection ?? 'horizontal'} />
            </div>
          );
        }

        // Waveform — full bleed
        if (layer.visual === 'waveform') {
          const wH = layer.waveHeight ?? 200;
          const pos = layer.wavePosition ?? 'bottom';
          const posStyle: React.CSSProperties = pos === 'top'
            ? { position: 'absolute', top: 0, transform: 'scaleY(-1)' }
            : { position: 'absolute', bottom: 0 };
          return (
            <div key={i} style={{ position: 'absolute', inset: 0, opacity: layer.opacity, mixBlendMode: layer.blendMode ?? 'normal' }}>
              <VisualWaveform width={1920} height={wH} color={layer.color} waves={layer.waves ?? 3} amplitude={layer.amplitude ?? 40} frequency={layer.frequency ?? 3} filterType={layer.filterType} style={posStyle} />
            </div>
          );
        }

        // Grid — full bleed
        if (layer.visual === 'grid') {
          return (
            <div key={i} style={{ position: 'absolute', inset: 0, opacity: layer.opacity, mixBlendMode: layer.blendMode ?? 'normal' }}>
              <ShapeGrid width={1920} height={1080} spacing={layer.size ?? 100} color={layer.color} opacity={1} />
            </div>
          );
        }

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: layer.opacity,
              mixBlendMode: layer.blendMode ?? 'normal',
            }}
          >
            {layer.visual === 'hexmesh' && (
              <VisualHexMesh
                width={1920}
                height={1080}
                scale={layer.scale ?? 50}
                color={layer.color}
                filterType={layer.filterType}
                fillThreshold={layer.fillThreshold}
              />
            )}
            {layer.visual === 'circuit' && (
              <VisualCircuit
                width={1920}
                height={1080}
                density={layer.density ?? 20}
                color={layer.color}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
