/**
 * V4 Background Presets
 *
 * Enhanced Tier3 background configurations for each slide.
 * Each slide has a unique visual identity aligned with its theme color.
 */

import { theme } from './theme';

export interface Tier3Layer {
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
  // Enhanced props
  filterType?: string;       // SVG filter id: 'neon-glow' | 'strong-bloom' | 'pulse-glow'
  fillThreshold?: number;    // HexMesh: lower = more filled hexes (default 0.85)
  minSize?: number;          // Particles: min dot size (default 1)
  maxSize?: number;          // Particles: max dot size (default 3)
  glowRatio?: number;        // Particles: fraction that glow (default 0.2)
  waveHeight?: number;       // Waveform: render height in px (default 200)
  wavePosition?: 'bottom' | 'top'; // Waveform: anchor position (default 'bottom')
}

export const v4Presets: Record<string, ReadonlyArray<Tier3Layer>> = {
  // ── Only 3 visual types: HexMesh C (Two-Tone), Particles C (Dual-Color Bloom), Waveform B (Dual-Horizon) ──
  // Distribution: Particles ×4 (01, 06, 08, 09) | HexMesh ×1 (02) | Waveform ×4 (03, 04, 05, 07)

  // Slide 01: Title — Particles constellation (cyan + violet + amber)
  slide01Title: [
    { visual: 'particles', opacity: 0.18, count: 100, color: theme.accent.cyan, glowRatio: 0.24, filterType: 'neon-glow' },
    { visual: 'particles', opacity: 0.13, count: 56, color: theme.accent.violet },
    { visual: 'particles', opacity: 0.10, count: 34, color: theme.accent.amber, glowRatio: 0.18, filterType: 'neon-glow', blendMode: 'screen' },
  ],

  // Slide 02: Problem — Two-Tone HexMesh (red + amber) fractured coordination
  slide02Problem: [
    { visual: 'hexmesh', opacity: 0.18, scale: 50, color: theme.accent.red, fillThreshold: 0.74, filterType: 'pulse-glow' },
    { visual: 'hexmesh', opacity: 0.11, scale: 35, color: theme.accent.amber, fillThreshold: 0.84, filterType: 'neon-glow' },
    { visual: 'particles', opacity: 0.10, count: 52, color: theme.accent.red, maxSize: 4 },
    { visual: 'particles', opacity: 0.08, count: 30, color: theme.accent.amber, glowRatio: 0.16, filterType: 'neon-glow', blendMode: 'screen' },
  ],

  // Slide 03: Why Now — Dual-Horizon Waveform (teal↑ + violet↓) converging forces
  slide03WhyNow: [
    { visual: 'waveform', opacity: 0.20, waves: 3, amplitude: 28, frequency: 2.5, color: theme.accent.teal, waveHeight: 180, wavePosition: 'top', filterType: 'neon-glow' },
    { visual: 'waveform', opacity: 0.17, waves: 4, amplitude: 32, frequency: 2, color: theme.accent.violet, waveHeight: 160, wavePosition: 'bottom', filterType: 'neon-glow' },
    { visual: 'particles', opacity: 0.13, count: 55, color: theme.accent.teal },
    { visual: 'particles', opacity: 0.10, count: 35, color: theme.accent.amber, glowRatio: 0.16, filterType: 'neon-glow', blendMode: 'screen' },
  ],

  // Slide 04: Solution — Dual-Horizon Waveform (blue↑ + teal↓) systematic architecture
  slide04Solution: [
    { visual: 'waveform', opacity: 0.19, waves: 3, amplitude: 26, frequency: 2, color: theme.accent.blue, waveHeight: 170, wavePosition: 'top', filterType: 'neon-glow' },
    { visual: 'waveform', opacity: 0.16, waves: 4, amplitude: 30, frequency: 2.5, color: theme.accent.teal, waveHeight: 150, wavePosition: 'bottom', filterType: 'neon-glow' },
    { visual: 'particles', opacity: 0.13, count: 55, color: theme.accent.blue },
    { visual: 'particles', opacity: 0.10, count: 35, color: theme.accent.violet, glowRatio: 0.14, filterType: 'neon-glow', blendMode: 'screen' },
  ],

  // Slide 05: Differentiation — Dual-Horizon Waveform (teal↑ + gold↓) competitive edge
  slide05Differentiation: [
    { visual: 'waveform', opacity: 0.21, waves: 3, amplitude: 30, frequency: 2.5, color: theme.accent.teal, waveHeight: 180, wavePosition: 'top', filterType: 'neon-glow' },
    { visual: 'waveform', opacity: 0.18, waves: 4, amplitude: 35, frequency: 2, color: theme.accent.gold, waveHeight: 160, wavePosition: 'bottom', filterType: 'neon-glow' },
    { visual: 'particles', opacity: 0.13, count: 55, color: theme.accent.teal },
    { visual: 'particles', opacity: 0.10, count: 40, color: theme.accent.amber, glowRatio: 0.16, filterType: 'neon-glow', blendMode: 'screen' },
  ],

  // Slide 06: Roadmap — Dual-Horizon Waveform (violet↑ + blue↓) phased progression
  slide06Business: [
    { visual: 'waveform', opacity: 0.20, waves: 3, amplitude: 28, frequency: 2.5, color: theme.accent.violet, waveHeight: 180, wavePosition: 'top', filterType: 'neon-glow' },
    { visual: 'waveform', opacity: 0.17, waves: 4, amplitude: 32, frequency: 2, color: theme.accent.blue, waveHeight: 160, wavePosition: 'bottom', filterType: 'neon-glow' },
    { visual: 'particles', opacity: 0.13, count: 55, color: theme.accent.violet },
    { visual: 'particles', opacity: 0.10, count: 35, color: theme.accent.amber, glowRatio: 0.15, filterType: 'neon-glow', blendMode: 'screen' },
  ],

  // Slide 07: Demo — Dual-Horizon Waveform (cyan↑ + teal↓) interactive energy
  slide07Demo: [
    { visual: 'waveform', opacity: 0.20, waves: 3, amplitude: 25, frequency: 3, color: theme.accent.cyan, waveHeight: 170, wavePosition: 'top', filterType: 'neon-glow' },
    { visual: 'waveform', opacity: 0.17, waves: 3, amplitude: 30, frequency: 2.5, color: theme.accent.teal, waveHeight: 150, wavePosition: 'bottom', filterType: 'neon-glow' },
    { visual: 'particles', opacity: 0.14, count: 60, color: theme.accent.cyan },
    { visual: 'particles', opacity: 0.10, count: 40, color: theme.accent.teal, glowRatio: 0.16, filterType: 'neon-glow', blendMode: 'screen' },
  ],

  // Slide 07 (new): Capital-efficient unit economics
  slide07FinModel: [
    { visual: 'waveform', opacity: 0.20, waves: 3, amplitude: 26, frequency: 2.4, color: theme.accent.violet, waveHeight: 170, wavePosition: 'top', filterType: 'neon-glow' },
    { visual: 'waveform', opacity: 0.16, waves: 4, amplitude: 30, frequency: 2.1, color: theme.accent.teal, waveHeight: 150, wavePosition: 'bottom', filterType: 'neon-glow' },
    { visual: 'particles', opacity: 0.12, count: 54, color: theme.accent.violet },
    { visual: 'particles', opacity: 0.09, count: 34, color: theme.accent.teal, glowRatio: 0.16, filterType: 'neon-glow', blendMode: 'screen' },
  ],

  // Slide 08: Summary — Dual-Horizon Waveform (cyan↑ + violet↓) harmonious unity
  slide08Summary: [
    { visual: 'waveform', opacity: 0.19, waves: 3, amplitude: 26, frequency: 2, color: theme.accent.cyan, waveHeight: 170, wavePosition: 'top', filterType: 'neon-glow' },
    { visual: 'waveform', opacity: 0.16, waves: 4, amplitude: 30, frequency: 2.5, color: theme.accent.violet, waveHeight: 150, wavePosition: 'bottom', filterType: 'neon-glow' },
    { visual: 'particles', opacity: 0.13, count: 55, color: theme.accent.cyan },
    { visual: 'particles', opacity: 0.09, count: 35, color: theme.accent.amber, glowRatio: 0.14, filterType: 'neon-glow', blendMode: 'screen' },
  ],

  // Slide 09: Epilogue — Dual-Horizon Waveform (amber↑ + cyan↓) warm bookend
  slide09Epilogue: [
    { visual: 'waveform', opacity: 0.20, waves: 3, amplitude: 28, frequency: 2.5, color: theme.accent.amber, waveHeight: 180, wavePosition: 'top', filterType: 'neon-glow' },
    { visual: 'waveform', opacity: 0.17, waves: 4, amplitude: 32, frequency: 2, color: theme.accent.cyan, waveHeight: 160, wavePosition: 'bottom', filterType: 'neon-glow' },
    { visual: 'particles', opacity: 0.13, count: 55, color: theme.accent.amber },
    { visual: 'particles', opacity: 0.09, count: 35, color: theme.accent.violet, glowRatio: 0.14, filterType: 'neon-glow', blendMode: 'screen' },
  ],

  // Slide 10: Appendix — calm transition canvas
  slide10Appendix: [
    { visual: 'waveform', opacity: 0.16, waves: 3, amplitude: 26, frequency: 2.2, color: theme.accent.blue, waveHeight: 180, wavePosition: 'top', filterType: 'neon-glow' },
    { visual: 'waveform', opacity: 0.13, waves: 3, amplitude: 30, frequency: 2.6, color: theme.accent.violet, waveHeight: 160, wavePosition: 'bottom', filterType: 'neon-glow' },
    { visual: 'particles', opacity: 0.09, count: 42, color: theme.accent.blue },
  ],

  // Slide 11: Unit Economics — violet + teal data narrative
  slide11FinModel: [
    { visual: 'waveform', opacity: 0.20, waves: 3, amplitude: 30, frequency: 2.4, color: theme.accent.violet, waveHeight: 180, wavePosition: 'top', filterType: 'neon-glow' },
    { visual: 'waveform', opacity: 0.16, waves: 4, amplitude: 32, frequency: 2.1, color: theme.accent.teal, waveHeight: 150, wavePosition: 'bottom', filterType: 'neon-glow' },
    { visual: 'particles', opacity: 0.12, count: 58, color: theme.accent.violet },
    { visual: 'particles', opacity: 0.09, count: 34, color: theme.accent.teal, glowRatio: 0.16, filterType: 'neon-glow', blendMode: 'screen' },
  ],

  // ── Effect Samples (for A/B testing) ──

  sampleHexmesh: [
    { visual: 'hexmesh', opacity: 0.50, scale: 40, color: theme.accent.cyan },
    { visual: 'particles', opacity: 0.20, count: 60, color: theme.accent.cyan },
  ],

  sampleCircuit: [
    { visual: 'circuit', opacity: 0.50, density: 60, color: theme.accent.teal },
    { visual: 'particles', opacity: 0.20, count: 60, color: theme.accent.teal },
  ],

  sampleGlobe: [
    { visual: 'globe', opacity: 0.60, radius: 320, position: 'center', color: theme.accent.cyan },
    { visual: 'particles', opacity: 0.22, count: 70, color: theme.accent.violet },
  ],

  sampleParticles: [
    { visual: 'particles', opacity: 0.45, count: 120, color: theme.accent.cyan },
    { visual: 'particles', opacity: 0.30, count: 80, color: theme.accent.violet, blendMode: 'screen' },
  ],

  sampleDataflow: [
    { visual: 'dataflow', opacity: 0.55, nodes: 16, flowDirection: 'radial', color: theme.accent.cyan },
    { visual: 'particles', opacity: 0.20, count: 60, color: theme.accent.violet },
  ],

  sampleWaveform: [
    { visual: 'waveform', opacity: 0.50, waves: 5, amplitude: 45, frequency: 3.0, color: theme.accent.amber },
    { visual: 'particles', opacity: 0.22, count: 70, color: theme.accent.gold },
  ],

  sampleGrid: [
    { visual: 'grid', opacity: 0.40, size: 80, color: theme.accent.blue },
    { visual: 'particles', opacity: 0.22, count: 70, color: theme.accent.blue },
  ],

  // ── Enhanced Variants ──

  // Hexmesh A: Dual-Scale Depth — large faint + small bright
  enhHexA: [
    { visual: 'hexmesh', opacity: 0.18, scale: 70, color: theme.accent.cyan },
    { visual: 'hexmesh', opacity: 0.45, scale: 28, color: theme.accent.cyan, filterType: 'strong-bloom', fillThreshold: 0.75 },
    { visual: 'particles', opacity: 0.18, count: 50, color: theme.accent.violet },
  ],

  // Hexmesh B: Bloom Mesh — dense fills + strong bloom
  enhHexB: [
    { visual: 'hexmesh', opacity: 0.55, scale: 40, color: theme.accent.cyan, filterType: 'strong-bloom', fillThreshold: 0.6 },
    { visual: 'particles', opacity: 0.22, count: 70, color: theme.accent.cyan, glowRatio: 0.4, filterType: 'strong-bloom' },
  ],

  // Hexmesh C: Two-Tone — cyan + violet chromatic layers
  enhHexC: [
    { visual: 'hexmesh', opacity: 0.35, scale: 45, color: theme.accent.cyan, fillThreshold: 0.75 },
    { visual: 'hexmesh', opacity: 0.30, scale: 45, color: theme.accent.violet, fillThreshold: 0.80, blendMode: 'screen' },
    { visual: 'particles', opacity: 0.18, count: 60, color: theme.accent.violet },
  ],

  // Particles A: Dense Constellation — high count, large dots, more glow
  enhPartA: [
    { visual: 'particles', opacity: 0.50, count: 150, color: theme.accent.cyan, minSize: 1, maxSize: 5, glowRatio: 0.4, filterType: 'strong-bloom' },
    { visual: 'particles', opacity: 0.30, count: 80, color: theme.accent.violet, minSize: 1, maxSize: 3, glowRatio: 0.3 },
  ],

  // Particles B: Depth Field — large blurred foreground + tiny sharp background
  enhPartB: [
    { visual: 'particles', opacity: 0.18, count: 25, color: theme.accent.cyan, minSize: 5, maxSize: 10, glowRatio: 0.8, filterType: 'soft-halo', blendMode: 'screen' },
    { visual: 'particles', opacity: 0.40, count: 120, color: theme.accent.cyan, minSize: 1, maxSize: 2, glowRatio: 0.15 },
    { visual: 'particles', opacity: 0.25, count: 60, color: theme.accent.violet, minSize: 1, maxSize: 2, glowRatio: 0.1 },
  ],

  // Particles C: Dual-Color Bloom — warm + cool with strong glow
  enhPartC: [
    { visual: 'particles', opacity: 0.45, count: 100, color: theme.accent.cyan, minSize: 1, maxSize: 4, glowRatio: 0.5, filterType: 'strong-bloom' },
    { visual: 'particles', opacity: 0.35, count: 80, color: theme.accent.amber, minSize: 1, maxSize: 4, glowRatio: 0.4, filterType: 'strong-bloom', blendMode: 'screen' },
  ],

  // Waveform A: Tall Wave — 400px height, big amplitude, strong bloom
  enhWaveA: [
    { visual: 'waveform', opacity: 0.55, waves: 5, amplitude: 65, frequency: 2.5, color: theme.accent.amber, waveHeight: 400, filterType: 'strong-bloom' },
    { visual: 'particles', opacity: 0.20, count: 60, color: theme.accent.gold },
  ],

  // Waveform B: Dual Horizon — top + bottom enclosure
  enhWaveB: [
    { visual: 'waveform', opacity: 0.45, waves: 4, amplitude: 50, frequency: 2.8, color: theme.accent.cyan, waveHeight: 300, wavePosition: 'bottom', filterType: 'strong-bloom' },
    { visual: 'waveform', opacity: 0.30, waves: 3, amplitude: 35, frequency: 2.0, color: theme.accent.violet, waveHeight: 250, wavePosition: 'top' },
    { visual: 'particles', opacity: 0.18, count: 50, color: theme.accent.cyan },
  ],

  // Waveform C: Multi-Color — amber bottom + violet overlay via screen blend
  enhWaveC: [
    { visual: 'waveform', opacity: 0.50, waves: 5, amplitude: 50, frequency: 3.0, color: theme.accent.amber, waveHeight: 350, filterType: 'strong-bloom' },
    { visual: 'waveform', opacity: 0.35, waves: 4, amplitude: 40, frequency: 2.2, color: theme.accent.violet, waveHeight: 300, blendMode: 'screen' },
    { visual: 'particles', opacity: 0.20, count: 65, color: theme.accent.gold },
  ],
};

// Re-export original presets for backward compatibility
export { backgroundPresets } from './backgroundPresets';
