import React from 'react';
import { theme } from './theme';

/**
 * Background layer configuration type
 */
export type BackgroundLayer = {
  visual: 'hexmesh' | 'circuit' | 'globe' | 'particles' | 'dataflow' | 'waveform' | 'grid';
  color: string;
  opacity: number;
  blendMode?: React.CSSProperties['mixBlendMode'];
  scale?: number;
  density?: number;
  waves?: number;
  amplitude?: number;
  frequency?: number;
  size?: number;
  count?: number;
  nodes?: number;
  flowDirection?: 'horizontal' | 'vertical' | 'radial';
  position?: 'full' | 'left' | 'right' | 'center';
  radius?: number;
};

/**
 * Creates an enhanced 6-layer background configuration with consistent depth and expressiveness
 *
 * @param primaryColor - Main theme color for hexmesh and waveform
 * @param secondaryColor - Complementary color for circuit and grid
 * @returns Array of 6 background layers
 */
export function createEnhancedBackground(
  primaryColor: string,
  secondaryColor: string
): BackgroundLayer[] {
  return [
    // Layer 1: Hexmesh - Base structural pattern (Foundation)
    {
      visual: 'hexmesh',
      color: primaryColor,
      opacity: 0.22,
      scale: 45
    },

    // Layer 2: Circuit - Technical detail pattern (Detail)
    {
      visual: 'circuit',
      color: secondaryColor,
      opacity: 0.16,
      blendMode: 'screen',
      density: 24
    },

    // Layer 3: Waveform - Dynamic wave motion (Motion)
    {
      visual: 'waveform',
      color: primaryColor,
      opacity: 0.12,
      waves: 4,
      amplitude: 30,
      frequency: 1.8
    },

    // Layer 4: Grid - Structural grid overlay (Structure)
    {
      visual: 'grid',
      color: secondaryColor,
      opacity: 0.08,
      size: 80
    },

    // Layer 5: DataFlow - Intelligence paths (Intelligence)
    {
      visual: 'dataflow',
      color: primaryColor,
      opacity: 0.10,
      nodes: 6,
      flowDirection: 'horizontal'
    },

    // Layer 6: Particles - Floating particle effects (Ambience)
    {
      visual: 'particles',
      color: 'white',
      opacity: 0.15,
      count: 50
    },
  ];
}

/**
 * Predefined background presets for different slide themes
 */
/**
 * Predefined background presets for different slide themes
 */
export const backgroundPresets = {
  // Cyan theme - Default/Technology
  cyan: createEnhancedBackground(theme.accent.cyan, theme.accent.blue),

  // Blue theme - Trust/Compliance
  blue: createEnhancedBackground(theme.accent.blue, theme.accent.cyan),

  // Violet theme - Differentiation
  violet: createEnhancedBackground(theme.accent.violet, theme.accent.cyan),

  // Gold theme - Business/Economics
  gold: createEnhancedBackground(theme.accent.gold, theme.accent.amber),

  // Warm gold theme tuned for readability on differentiation tables
  differentiationGold: [
    {
      visual: 'hexmesh',
      color: theme.accent.gold,
      opacity: 0.16,
      scale: 48
    },
    {
      visual: 'circuit',
      color: theme.accent.amber,
      opacity: 0.12,
      blendMode: 'screen',
      density: 22
    },
    {
      visual: 'waveform',
      color: theme.accent.gold,
      opacity: 0.08,
      waves: 3,
      amplitude: 26,
      frequency: 1.6
    },
    {
      visual: 'grid',
      color: theme.accent.amber,
      opacity: 0.06,
      size: 88
    },
    {
      visual: 'dataflow',
      color: theme.accent.gold,
      opacity: 0.08,
      nodes: 5,
      flowDirection: 'horizontal'
    },
    {
      visual: 'particles',
      color: 'white',
      opacity: 0.1,
      count: 40
    },
  ],

  // Red theme - Problems/Warnings
  red: createEnhancedBackground(theme.accent.red, theme.accent.red),

  // Soft warning theme - Subtle amber/red signal
  warningSoft: [
    {
      visual: 'hexmesh',
      color: theme.accent.red,
      opacity: 0.2,
      scale: 50
    },
    {
      visual: 'circuit',
      color: theme.accent.amber,
      opacity: 0.14,
      blendMode: 'screen',
      density: 22
    },
    {
      visual: 'waveform',
      color: theme.accent.red,
      opacity: 0.1,
      waves: 3,
      amplitude: 28,
      frequency: 1.7
    },
    {
      visual: 'grid',
      color: theme.accent.amber,
      opacity: 0.07,
      size: 92
    },
    {
      visual: 'dataflow',
      color: theme.accent.red,
      opacity: 0.09,
      nodes: 6,
      flowDirection: 'horizontal'
    },
    {
      visual: 'particles',
      color: 'white',
      opacity: 0.13,
      count: 45
    },
  ],

  // Teal theme - Demo/Action
  teal: createEnhancedBackground(theme.accent.teal, theme.accent.cyan),

  // Authority Blue Circuit - Precision/Execution (Slide 06: Business/Roadmap)
  // Circuit-dominant design conveying technical rigor and business planning precision
  authorityBlueCircuit: [
    {
      visual: 'circuit',
      color: theme.accent.blue,
      opacity: 0.12,
      blendMode: 'screen',
      density: 24
    },
    {
      visual: 'hexmesh',
      color: theme.accent.blue,
      opacity: 0.1,
      scale: 50
    },
    {
      visual: 'grid',
      color: theme.accent.cyan,
      opacity: 0.04,
      size: 90
    },
    {
      visual: 'waveform',
      color: theme.accent.blue,
      opacity: 0.05,
      waves: 3,
      amplitude: 24,
      frequency: 1.5
    },
    {
      visual: 'dataflow',
      color: theme.accent.blue,
      opacity: 0.05,
      nodes: 5,
      flowDirection: 'horizontal'
    },
    {
      visual: 'particles',
      color: 'white',
      opacity: 0.05,
      count: 30
    },
  ],

  // Authority Violet Circuit - Precision + Strategy (Slide 06 retheme)
  authorityVioletCircuit: [
    {
      visual: 'circuit',
      color: theme.accent.violet,
      opacity: 0.13,
      blendMode: 'screen',
      density: 24
    },
    {
      visual: 'hexmesh',
      color: theme.accent.violet,
      opacity: 0.1,
      scale: 50
    },
    {
      visual: 'grid',
      color: theme.accent.cyan,
      opacity: 0.04,
      size: 90
    },
    {
      visual: 'waveform',
      color: theme.accent.violet,
      opacity: 0.06,
      waves: 3,
      amplitude: 24,
      frequency: 1.5
    },
    {
      visual: 'dataflow',
      color: theme.accent.violet,
      opacity: 0.06,
      nodes: 5,
      flowDirection: 'horizontal'
    },
    {
      visual: 'particles',
      color: 'white',
      opacity: 0.06,
      count: 30
    },
  ],

  // Rainbow Cycle - Color-cycle style static background (Slide 08 retheme)
  rainbowCycle: [
    {
      visual: 'hexmesh',
      color: theme.accent.cyan,
      opacity: 0.2,
      scale: 46
    },
    {
      visual: 'circuit',
      color: theme.accent.violet,
      opacity: 0.14,
      blendMode: 'screen',
      density: 24
    },
    {
      visual: 'waveform',
      color: theme.accent.amber,
      opacity: 0.1,
      waves: 4,
      amplitude: 28,
      frequency: 1.7
    },
    {
      visual: 'grid',
      color: theme.accent.teal,
      opacity: 0.07,
      size: 86
    },
    {
      visual: 'dataflow',
      color: theme.accent.blue,
      opacity: 0.09,
      nodes: 6,
      flowDirection: 'horizontal'
    },
    {
      visual: 'particles',
      color: 'white',
      opacity: 0.12,
      count: 46
    },
  ],

  // Authority Epilogue - Closing/Trust (Slide 09: Epilogue)
  // Globe-anchored teal/cyan creating quiet confidence for closing
  authorityEpilogue: [
    {
      visual: 'globe',
      color: theme.accent.teal,
      opacity: 0.18,
      radius: 300
    },
    {
      visual: 'hexmesh',
      color: theme.accent.cyan,
      opacity: 0.14,
      scale: 48
    },
    {
      visual: 'waveform',
      color: theme.accent.teal,
      opacity: 0.08,
      waves: 3,
      amplitude: 22,
      frequency: 1.4
    },
    {
      visual: 'grid',
      color: theme.accent.cyan,
      opacity: 0.05,
      size: 96
    },
    {
      visual: 'dataflow',
      color: theme.accent.teal,
      opacity: 0.06,
      nodes: 4,
      flowDirection: 'radial'
    },
    {
      visual: 'particles',
      color: 'white',
      opacity: 0.10,
      count: 35
    },
  ],

  // Authority Epilogue Rainbow - Closing trust + celebratory spectrum (Slide 09 retheme)
  authorityEpilogueRainbow: [
    {
      visual: 'globe',
      color: theme.accent.cyan,
      opacity: 0.18,
      radius: 300
    },
    {
      visual: 'hexmesh',
      color: theme.accent.violet,
      opacity: 0.14,
      scale: 48
    },
    {
      visual: 'waveform',
      color: theme.accent.amber,
      opacity: 0.08,
      waves: 3,
      amplitude: 22,
      frequency: 1.4
    },
    {
      visual: 'grid',
      color: theme.accent.teal,
      opacity: 0.05,
      size: 96
    },
    {
      visual: 'dataflow',
      color: theme.accent.blue,
      opacity: 0.07,
      nodes: 4,
      flowDirection: 'radial'
    },
    {
      visual: 'particles',
      color: 'white',
      opacity: 0.1,
      count: 35
    },
  ],
} as const;
