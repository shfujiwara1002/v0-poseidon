import React from 'react';
import { theme } from '../theme';

export const ChartGlowDefs: React.FC = () => (
  <defs>
    {/* ==================================================================================
            FILTERS
           ================================================================================== */}

    {/* 1. Neon Glow (Standard) - Medium radius for main lines */}
    <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
      <feColorMatrix in="blur" type="matrix" values="
                0 0 0 0 0
                0 0 0 0 1
                0 0 0 0 1
                0 0 0 1 0" result="cyan-blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    {/* 2. Small Neon Glow - Tighter radius for data points and text */}
    <filter id="neon-glow-small" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    {/* 3. Strong Bloom - Multi-layer blur for hero elements/highlights */}
    <filter id="strong-bloom" x="-100%" y="-100%" width="300%" height="300%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur1" />
      <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur2" />
      <feMerge>
        <feMergeNode in="blur2" />
        <feMergeNode in="blur1" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    {/* 4. Pulse Glow - Animated-feel glow (stdDeviation=3) */}
    <filter id="pulse-glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
      <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0  0 0 0 0 0.94  0 0 0 0 1  0 0 0 0.8 0" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    {/* 5. Data Trail - Motion blur effect for trailing indicators */}
    <filter id="data-trail" x="-10%" y="-10%" width="130%" height="120%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="0 3" result="trail" />
      <feMerge>
        <feMergeNode in="trail" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    {/* 6. Soft Halo - Large radius glow for hero backgrounds */}
    <filter id="soft-halo" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="halo" />
      <feColorMatrix in="halo" type="saturate" values="2" />
      <feMerge>
        <feMergeNode in="halo" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    {/* 7. Chromatic Aberration - Red/Blue shift for liquid glass edge */}
    <filter id="chromatic-shift" x="-10%" y="-10%" width="120%" height="120%">
      <feOffset in="SourceGraphic" dx="1.5" dy="0" result="red-shift" />
      <feColorMatrix in="red-shift" type="matrix" values="
            1 0 0 0 0
            0 0 0 0 0
            0 0 0 0 0
            0 0 0 0.3 0" result="red" />
      <feOffset in="SourceGraphic" dx="-1.5" dy="0" result="blue-shift" />
      <feColorMatrix in="blue-shift" type="matrix" values="
            0 0 0 0 0
            0 0 0 0 0
            0 0 1 0 0
            0 0 0 0.3 0" result="blue" />
      <feMerge>
        <feMergeNode in="red" />
        <feMergeNode in="blue" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    {/* 8. Frost Overlay - Noise texture for glass backgrounds */}
    <filter id="frost-overlay">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.1 0" />
    </filter>

    {/* 9. Neon Blur - Just the blur component (for underlying lines) */}
    <filter id="neon-blur" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
    </filter>


    {/* ==================================================================================
            PATTERNS
           ================================================================================== */}

    {/* Hologram Scanlines - Horizontal lines */}
    <pattern id="holo-scanlines" width="4" height="4" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="4" y2="0" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
    </pattern>

    {/* Dot Grid - Premium grid replacement */}
    <pattern id="chart-dot-grid" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="10" cy="10" r="0.5" fill="rgba(255,255,255,0.15)" />
    </pattern>


    {/* ==================================================================================
            GRADIENTS
           ================================================================================== */}

    {/* Line Gradient - Cyan highlight */}
    <linearGradient id="chart-line-gradient" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor={theme.accent.cyan} stopOpacity="0.6" />
      <stop offset="50%" stopColor={theme.accent.cyan} stopOpacity="1" />
      <stop offset="100%" stopColor="white" stopOpacity="1" />
    </linearGradient>

    {/* Area Gradient - Vertical fade for fills */}
    <linearGradient id="chart-area-gradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor={theme.accent.cyan} stopOpacity="0.4" />
      <stop offset="100%" stopColor={theme.accent.cyan} stopOpacity="0" />
    </linearGradient>

    {/* Confidence Gradient - For uncertainty bands */}
    <linearGradient id="confidence-gradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor={theme.accent.cyan} stopOpacity="0.25" />
      <stop offset="50%" stopColor={theme.accent.cyan} stopOpacity="0.08" />
      <stop offset="100%" stopColor={theme.accent.cyan} stopOpacity="0" />
    </linearGradient>

    {/* Bar Reflection Gradient - Downward fade for mirror effect */}
    <linearGradient id="bar-reflection-gradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="white" stopOpacity="0.15" />
      <stop offset="100%" stopColor="white" stopOpacity="0" />
    </linearGradient>

    {/* Radial Heat - For pie/donut centers */}
    <radialGradient id="radial-heat" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor={theme.accent.cyan} stopOpacity="0.3" />
      <stop offset="100%" stopColor={theme.accent.cyan} stopOpacity="0" />
    </radialGradient>

    {/* Chart Fade Gradient - For top edges of areas */}
    <linearGradient id="chart-fade-gradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="white" stopOpacity="0.3" />
      <stop offset="100%" stopColor="white" stopOpacity="0" />
    </linearGradient>
  </defs>
);
