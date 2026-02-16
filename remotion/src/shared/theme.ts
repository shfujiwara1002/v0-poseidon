/**
 * Poseidon design tokens (single source of truth).
 * Remotion consumes this directly; web/prototype tokens are generated from it.
 */

// Pre-computed neon text-shadow strings tuned for a calmer premium finish.
const neonCyanStandard = '0 0 1px rgba(0,240,255,0.50), 0 0 4px rgba(0,240,255,0.36), 0 0 11px rgba(0,240,255,0.22), 0 0 20px rgba(0,240,255,0.12), 0 0 34px rgba(0,240,255,0.05)';
const neonCyanDeep = '0 0 1px rgba(0,240,255,0.58), 0 0 5px rgba(0,240,255,0.42), 0 0 12px rgba(0,240,255,0.28), 0 0 24px rgba(0,240,255,0.17), 0 0 40px rgba(0,240,255,0.08)';
const neonVioletStandard = '0 0 1px rgba(139,92,246,0.50), 0 0 4px rgba(139,92,246,0.36), 0 0 11px rgba(139,92,246,0.22), 0 0 20px rgba(139,92,246,0.12), 0 0 34px rgba(139,92,246,0.05)';
const neonVioletDeep = '0 0 1px rgba(139,92,246,0.58), 0 0 5px rgba(139,92,246,0.42), 0 0 12px rgba(139,92,246,0.28), 0 0 24px rgba(139,92,246,0.17), 0 0 40px rgba(139,92,246,0.08)';
const neonAmberStandard = '0 0 1px rgba(245,158,11,0.50), 0 0 4px rgba(245,158,11,0.36), 0 0 11px rgba(245,158,11,0.22), 0 0 20px rgba(245,158,11,0.12), 0 0 34px rgba(245,158,11,0.05)';
const neonAmberDeep = '0 0 1px rgba(245,158,11,0.58), 0 0 5px rgba(245,158,11,0.42), 0 0 12px rgba(245,158,11,0.28), 0 0 24px rgba(245,158,11,0.17), 0 0 40px rgba(245,158,11,0.08)';
const neonBlueStandard = '0 0 1px rgba(59,130,246,0.50), 0 0 4px rgba(59,130,246,0.36), 0 0 11px rgba(59,130,246,0.22), 0 0 20px rgba(59,130,246,0.12), 0 0 34px rgba(59,130,246,0.05)';
const neonBlueDeep = '0 0 1px rgba(59,130,246,0.58), 0 0 5px rgba(59,130,246,0.42), 0 0 12px rgba(59,130,246,0.28), 0 0 24px rgba(59,130,246,0.17), 0 0 40px rgba(59,130,246,0.08)';
const neonRedStandard = '0 0 1px rgba(239,68,68,0.50), 0 0 4px rgba(239,68,68,0.36), 0 0 11px rgba(239,68,68,0.22), 0 0 20px rgba(239,68,68,0.12), 0 0 34px rgba(239,68,68,0.05)';
const neonRedDeep = '0 0 1px rgba(239,68,68,0.58), 0 0 5px rgba(239,68,68,0.42), 0 0 12px rgba(239,68,68,0.28), 0 0 24px rgba(239,68,68,0.17), 0 0 40px rgba(239,68,68,0.08)';
const neonTealStandard = '0 0 1px rgba(20,184,166,0.50), 0 0 4px rgba(20,184,166,0.36), 0 0 11px rgba(20,184,166,0.22), 0 0 20px rgba(20,184,166,0.12), 0 0 34px rgba(20,184,166,0.05)';
const neonTealDeep = '0 0 1px rgba(20,184,166,0.58), 0 0 5px rgba(20,184,166,0.42), 0 0 12px rgba(20,184,166,0.28), 0 0 24px rgba(20,184,166,0.17), 0 0 40px rgba(20,184,166,0.08)';

// Sharper neon variant for crisp edges without billboard-like bloom.
const neonCyanSharper = '0 0 1px rgba(0,240,255,0.46), 0 0 3px rgba(0,240,255,0.32), 0 0 7px rgba(0,240,255,0.20), 0 0 14px rgba(0,240,255,0.11), 0 0 24px rgba(0,240,255,0.05)';
const neonVioletSharper = '0 0 1px rgba(139,92,246,0.46), 0 0 3px rgba(139,92,246,0.32), 0 0 7px rgba(139,92,246,0.20), 0 0 14px rgba(139,92,246,0.11), 0 0 24px rgba(139,92,246,0.05)';
const neonAmberSharper = '0 0 1px rgba(245,158,11,0.46), 0 0 3px rgba(245,158,11,0.32), 0 0 7px rgba(245,158,11,0.20), 0 0 14px rgba(245,158,11,0.11), 0 0 24px rgba(245,158,11,0.05)';
const neonBlueSharper = '0 0 1px rgba(59,130,246,0.46), 0 0 3px rgba(59,130,246,0.32), 0 0 7px rgba(59,130,246,0.20), 0 0 14px rgba(59,130,246,0.11), 0 0 24px rgba(59,130,246,0.05)';
const neonRedSharper = '0 0 1px rgba(239,68,68,0.46), 0 0 3px rgba(239,68,68,0.32), 0 0 7px rgba(239,68,68,0.20), 0 0 14px rgba(239,68,68,0.11), 0 0 24px rgba(239,68,68,0.05)';
const neonTealSharper = '0 0 1px rgba(20,184,166,0.46), 0 0 3px rgba(20,184,166,0.32), 0 0 7px rgba(20,184,166,0.20), 0 0 14px rgba(20,184,166,0.11), 0 0 24px rgba(20,184,166,0.05)';

// Icon glow: 3-layer drop-shadow() chains — reduced ~2 levels
const iconGlowDefault = 'drop-shadow(0 0 3px rgba(255,255,255,0.14)) drop-shadow(0 0 8px rgba(0,240,255,0.20)) drop-shadow(0 0 16px rgba(0,240,255,0.10))';
const iconGlowTeal = 'drop-shadow(0 0 3px rgba(255,255,255,0.14)) drop-shadow(0 0 8px rgba(20,184,166,0.24)) drop-shadow(0 0 16px rgba(20,184,166,0.12))';
const iconGlowAmber = 'drop-shadow(0 0 3px rgba(255,255,255,0.14)) drop-shadow(0 0 8px rgba(245,158,11,0.24)) drop-shadow(0 0 16px rgba(245,158,11,0.12))';
const iconGlowViolet = 'drop-shadow(0 0 3px rgba(255,255,255,0.14)) drop-shadow(0 0 8px rgba(139,92,246,0.24)) drop-shadow(0 0 16px rgba(139,92,246,0.12))';
const iconGlowBlue = 'drop-shadow(0 0 3px rgba(255,255,255,0.14)) drop-shadow(0 0 8px rgba(59,130,246,0.24)) drop-shadow(0 0 16px rgba(59,130,246,0.12))';
const iconGlowRed = 'drop-shadow(0 0 3px rgba(255,255,255,0.14)) drop-shadow(0 0 8px rgba(239,68,68,0.24)) drop-shadow(0 0 16px rgba(239,68,68,0.12))';

export const theme = {
  background: {
    deepNavy: '#020410',
    abyss: '#000000',
    navy: '#0B1221',
    surface: '#1E293B',
  },
  /** Base radial gradient for slide artboard (slides.css .slide-artboard) */
  backgroundGradient: 'radial-gradient(ellipse 120% 80% at 50% 0%, #0f172a 0%, #020410 50%, #000000 100%)',
  /** Legacy linear fallback if needed */
  backgroundGradientLinear: 'linear-gradient(to bottom, #020410 0%, #000000 100%)',
  accent: {
    cyan: '#33F3FF',      // 20% brighter than #00F0FF
    cyanSoft: '#40E8F0',
    amber: '#F7AD39',     // 20% brighter than #F59E0B
    violet: '#A585F8',    // 20% brighter than #8B5CF6
    teal: '#4AC7BC',      // 20% brighter than #14B8A6
    gold: '#EEC53A',      // 20% brighter than #EAB308
    blue: '#699BF8',      // 20% brighter than #3B82F6
    red: '#F26D6D',       // 20% brighter than #EF4444
    emerald: '#34D399',   // fresh green for differentiation
    pink: '#F472B6',      // rose accent for alerts/consumer
    lime: '#A3E635',      // bright green for growth/success
  },
  semantic: {
    ai: '#00F0FF',
    human: '#F59E0B',
    growth: '#8B5CF6',
    threat: '#EF4444',
  },
  typography: {
    // 2-font system: Inter for all text, JetBrains Mono for data/numbers
    fontHeader: "'Inter', 'Noto Sans JP', system-ui, sans-serif",
    fontUi: "'Inter', 'Noto Sans JP', system-ui, sans-serif",
    fontMono: "'JetBrains Mono', 'Noto Sans JP', ui-monospace, monospace",
    fallbackCjk: "'Noto Sans JP', sans-serif",
    numericFeatureSettings: '"tnum" 1, "lnum" 1',
    numericVariant: 'tabular-nums lining-nums',
    // Legacy rem-based sizes (deprecated, use typographyScale instead)
    textXs: '0.75rem',
    textSm: '0.875rem',
    textBase: '1rem',
    textLg: '1.125rem',
    textXl: '1.25rem', // 20px
    text2xl: '1.5rem', // 24px
    text3xl: '2rem', // 32px
    text4xl: '2.5rem', // 40px
    text5xl: '3rem', // 48px
    text6xl: '4rem', // 64px
    text7xl: '4.5rem', // 72px
    text8xl: '5rem', // 80px
    text9xl: '6rem', // 96px
  },
  readability: {
    minBodyOpacity: 0.8,
    minSecondaryOpacity: 0.6,
    minMetaOpacity: 0.5,
  },
  // Unified 6-tier font size system (px-based for precise control)
  typographyScale: {
    // Primary 6-tier system
    sizeXL: 96,      // Hero - Main slide titles
    sizeL: 54,       // Title - Section headings, large numbers
    sizeM: 36,       // Heading - Card titles, subheadings
    sizeS: 26,       // Body - Body text, labels
    sizeXS: 20,      // Caption - Footnotes, metadata
    sizeXXS: 16,     // Footer - Ultra-small text for disclaimers
    // Legacy aliases (map to new system for backward compatibility)
    badge: 20,       // → sizeXS
    title: 96,       // → sizeXL
    subtitle: 54,    // → sizeL
    meta: 20,        // → sizeXS
    cardTitle: 36,   // → sizeM
    body: 26,        // → sizeS
    bodyStrong: 36,  // → sizeM (for emphasis)
    label: 20,       // → sizeXS
    footnote: 16,    // → sizeXXS (reduced from 20 for footer)
  },
  /** Aurora background (slides.css .slide-artboard::before) */
  aurora: {
    baseGradient: 'radial-gradient(ellipse 120% 80% at 50% 0%, #0f172a 0%, #020410 50%, #000000 100%)',
    layers: [
      'linear-gradient(160deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 42%, rgba(255,255,255,0.04) 100%)',
      'radial-gradient(55% 45% at 12% 10%, rgba(0,240,255,0.15) 0%, rgba(0,240,255,0) 70%)',
      'radial-gradient(50% 45% at 88% 8%, rgba(139,92,246,0.13) 0%, rgba(139,92,246,0) 70%)',
      'radial-gradient(50% 60% at 50% 35%, rgba(20,184,166,0.12) 0%, rgba(20,184,166,0) 70%)',
      'radial-gradient(40% 50% at 72% 72%, rgba(245,158,11,0.10) 0%, rgba(245,158,11,0) 70%)',
      'conic-gradient(from 210deg at 50% 30%, rgba(0,240,255,0.025), rgba(139,92,246,0.025), rgba(0,0,0,0))',
    ].join(', '),
    auroraOpacity: 0.44,
    auroraBlur: 11,
  },
  /** Vignette + grain (slides.css .slide-artboard::after) */
  vignette: {
    topVignette: 'radial-gradient(120% 120% at 50% 8%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.45) 62%, rgba(0,0,0,0.78) 100%)',
    bottomVignette: 'radial-gradient(140% 140% at 50% 100%, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.85) 70%)',
    grainPattern: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.032) 0, rgba(255,255,255,0.032) 1px, transparent 1px)',
    grainSize: '3px 3px',
    vignetteOpacity: 0.57,
  },
  glass: {
    glassBorder: 'rgba(255,255,255,0.12)',
    glassBorderSubtle: 'rgba(255,255,255,0.08)',
    glassBg: 'rgba(8,12,24,0.20)',
    glassBgStrong: 'rgba(8,12,24,0.32)',
    glassBgSoft: 'rgba(10,16,28,0.16)',
    glassGlow: 'rgba(0,240,255,0.03)',
    glassBlur: 26,
    glassBlurStrong: 44,
    /** tokens.css: --poseidon-glass-backdrop */
    glassBackdrop: 'blur(15px) saturate(1.18) brightness(1.01)',
    /** tokens.css: --poseidon-glass-backdrop-strong */
    glassBackdropStrong: 'blur(20px) saturate(1.22) brightness(1.00)',
    /** Diagonal overlay (tokens.css --poseidon-glass-overlay) */
    glassOverlay: 'linear-gradient(135deg, rgba(255,255,255,0.018) 0%, rgba(255,255,255,0.007) 38%, rgba(255,255,255,0.002) 100%)',
    /** Sheen radial (components.css:12-18) */
    glassSheen: 'radial-gradient(120% 120% at 0% 0%, rgba(255,255,255,0.015) 0%, rgba(255,255,255,0.004) 45%, rgba(255,255,255,0) 70%)',
    /** Rim-light screen blend (components.css:20-28) */
    glassRimLight: 'linear-gradient(120deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.06) 36%, rgba(255,255,255,0.00) 100%)',
    glassShadow: '0 26px 72px rgba(0,0,0,0.64), 0 6px 20px rgba(0,0,0,0.28)',
    glassShadowAmber: '0 26px 72px rgba(0,0,0,0.58), 0 8px 24px rgba(0,0,0,0.30)',
    glassInsetHighlight: 'inset 0 1px 0 0 rgba(255,255,255,0.20), inset 0 -1px 0 0 rgba(255,255,255,0.05), inset 0 0 22px rgba(255,255,255,0.016)',
    glassEdge: 'inset 0 0 0 1px rgba(255,255,255,0.10), inset 0 -18px 34px rgba(0,0,0,0.34)',
  },
  glassPremium: {
    border: 'rgba(255,255,255,0.20)',
    borderSubtle: 'rgba(255,255,255,0.12)',
    bg: 'rgba(7,12,22,0.40)',
    bgGradient:
      'linear-gradient(165deg, rgba(18,28,44,0.50) 0%, rgba(8,14,24,0.44) 55%, rgba(4,8,16,0.56) 100%)',
    overlay:
      'linear-gradient(140deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 36%, rgba(255,255,255,0.00) 68%)',
    backdrop: 'blur(13px) saturate(1.06) brightness(1.00)',
    sheen:
      'radial-gradient(130% 120% at 8% 0%, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.04) 40%, rgba(255,255,255,0) 72%)',
    rimLight:
      'linear-gradient(122deg, rgba(255,255,255,0.26) 0%, rgba(255,255,255,0.08) 38%, rgba(255,255,255,0.00) 100%)',
    shadow: '0 30px 90px rgba(0,0,0,0.60), 0 8px 28px rgba(0,0,0,0.34)',
    insetHighlight:
      'inset 0 1px 0 rgba(255,255,255,0.24), inset 0 -1px 0 rgba(255,255,255,0.08), inset 0 -24px 44px rgba(0,0,0,0.34)',
    edge: 'inset 0 0 0 1px rgba(255,255,255,0.12), inset 0 -18px 36px rgba(0,0,0,0.34)',
    innerPanelBg: 'rgba(255,255,255,0.045)',
    innerPanelBorder: 'rgba(255,255,255,0.16)',
  },
  /** Neon text-shadow (base.css .text-neon / .text-neon--deep / .text-neon--sharper) */
  neon: {
    cyan: { standard: neonCyanStandard, deep: neonCyanDeep, sharper: neonCyanSharper },
    violet: { standard: neonVioletStandard, deep: neonVioletDeep, sharper: neonVioletSharper },
    amber: { standard: neonAmberStandard, deep: neonAmberDeep, sharper: neonAmberSharper },
    blue: { standard: neonBlueStandard, deep: neonBlueDeep, sharper: neonBlueSharper },
    red: { standard: neonRedStandard, deep: neonRedDeep, sharper: neonRedSharper },
    teal: { standard: neonTealStandard, deep: neonTealDeep, sharper: neonTealSharper },
  },
  /** Icon glow filter (base.css .icon-glow-*) */
  iconGlow: {
    default: iconGlowDefault,
    teal: iconGlowTeal,
    amber: iconGlowAmber,
    violet: iconGlowViolet,
    blue: iconGlowBlue,
    red: iconGlowRed,
  },
  /** Gradient text + accompanying shadows (base.css .text-gradient-*) */
  gradientText: {
    cyan: 'linear-gradient(90deg, #bffcff 0%, #00f0ff 100%)',
    teal: 'linear-gradient(90deg, #5eead4 0%, #15e1c2 100%)',
    violet: 'linear-gradient(90deg, #d7b7ff 0%, #8b5cf6 100%)',
    amber: 'linear-gradient(90deg, #ffe0a1 0%, #f59e0b 100%)',
    blue: 'linear-gradient(90deg, #b8d6ff 0%, #58a6ff 100%)',
    rainbow: 'linear-gradient(90deg, #00f0ff 0%, #8b5cf6 35%, #f59e0b 70%, #14b8a6 100%)',
  },
  text: {
    primary: '#f8fafc',
    muted: 'rgba(255,255,255,0.72)',
    muted2: 'rgba(255,255,255,0.6)',
    tertiary: 'rgba(191,209,234,0.84)',
    accent: '#9edcff',
  },
  uiV3Premium: {
    navigationContract: {
      primaryNav: 'topbar',
      secondaryNav: 'sidebar',
      inScreenNav: 'tabs',
      mobileNav: 'bottom-nav',
    },
    shapeTextContract: {
      chipMinHeight: 32,
      chipMaxCharsDesktop: 26,
      chipMaxCharsMobile: 18,
      chipWrapPolicy: 'truncate',
    },
    colorHierarchy: {
      textPrimary: '#F3F8FF',
      textSecondary: 'rgba(214,227,245,0.92)',
      textTertiary: 'rgba(178,197,222,0.84)',
      meta: 'rgba(146,166,194,0.82)',
    },
    engineAccent: {
      protect: '#25C9D8',
      grow: '#2CC487',
      execute: '#E9A34A',
      govern: '#5A84FF',
    },
    surfaceTiers: {
      canvas:
        'radial-gradient(62% 46% at 12% 0%, rgba(82,215,198,0.22) 0%, transparent 72%), radial-gradient(66% 48% at 100% 0%, rgba(79,149,255,0.2) 0%, transparent 74%), linear-gradient(180deg, #17314f 0%, #0f2440 66%, #0a1a30 100%)',
      card: 'linear-gradient(160deg, rgba(14,30,52,0.84), rgba(9,20,37,0.9))',
      focus:
        'radial-gradient(130% 180% at 100% 0%, rgba(79,149,255,0.2), transparent 62%), linear-gradient(180deg, rgba(8,19,36,0.96), rgba(6,14,28,0.98))',
    },
  },
  textGlowSoft: '0 0 8px rgba(255,255,255,0.12)',
  textGlowStrong: '0 0 8px rgba(255,255,255,0.18), 0 0 20px rgba(255,255,255,0.12)',
  textCrisp: '0 1px 2px rgba(0,0,0,0.5)',
  /** Gradient text glow (base.css .text-gradient) */
  gradientTextShadow: '0 0 10px rgba(0,240,255,0.12), 0 0 20px rgba(0,240,255,0.06)',
  textShadowNeon: '0 0 10px rgba(255,255,255,0.18)',
  /** Compliance badge (components.css:287-303) */
  complianceBadge: {
    background: 'rgba(0,240,255,0.12)',
    border: '1px solid rgba(0,240,255,0.35)',
    color: '#e6fbff',
    boxShadow: '0 8px 24px rgba(0,0,0,0.34), 0 0 14px rgba(0,240,255,0.18), inset 0 0 12px rgba(0,240,255,0.08)',
    textShadow: '0 0 7px rgba(0,240,255,0.18)',
  },
  /** Warning badge (components.css:347-363) */
  warningBadge: {
    background: 'rgba(239,68,68,0.15)',
    border: '1px solid rgba(239,68,68,0.25)',
    color: '#ff6b6b',
    boxShadow: '0 8px 24px rgba(0,0,0,0.34), 0 0 14px rgba(239,68,68,0.18), inset 0 0 10px rgba(239,68,68,0.08)',
    textShadow: '0 0 7px rgba(239,68,68,0.22)',
  },
  state: {
    hoverBg: 'rgba(255,255,255,0.06)',
    activeBg: 'rgba(255,255,255,0.12)',
    focusRing: '0 0 0 2px rgba(0,240,255,0.6)',
    disabledText: 'rgba(255,255,255,0.4)',
    errorBorder: 'rgba(239,68,68,0.6)',
    successBorder: 'rgba(21,225,194,0.6)',
    loadingBg: 'rgba(255,255,255,0.04)',
  },
  motion: {
    duration: {
      fast: '120ms',
      base: '200ms',
      slow: '320ms',
    },
    easing: {
      standard: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
      emphasized: 'cubic-bezier(0.2, 0, 0, 1)',
    },
  },
  radius: {
    lg: '24px',
    md: '16px',
    sm: '12px',
  },
  surface: {
    canvas: '#020410',
    base: '#0B1221',
    panel: '#1E293B',
    glass: 'rgba(8,12,24,0.14)',
    glassStrong: 'rgba(8,12,24,0.24)',
    glassSoft: 'rgba(10,16,28,0.10)',
  },
  breakpoints: {
    sm: 600,
    md: 900,
    lg: 1100,
    xl: 1280,
  },
  layout: {
    containerMax: '1600px',
    contentMax: '1240px',
    gridGap: '24px',
    sectionGap: '32px',
  },
  chart: {
    line: {
      primary: '#00F0FF',
      secondary: '#8B5CF6',
      neutral: '#CBD5F5',
      tertiary: '#14B8A6',
    },
    fill: {
      primary: 'rgba(0,240,255,0.35)',
      secondary: 'rgba(139,92,246,0.3)',
      neutral: 'rgba(203,213,245,0.25)',
    },
    grid: {
      light: 'rgba(255,255,255,0.1)',
      mid: 'rgba(255,255,255,0.2)',
      strong: 'rgba(255,255,255,0.3)',
    },
    stroke: {
      default: '1.5px',
      thin: '1px',
      heavy: '2px',
    },
    glow: {
      soft: '0 0 24px rgba(0,240,255,0.12)',
      strong: '0 0 32px rgba(0,240,255,0.2)',
    },
  },
  spacing: {
    space1: '0.25rem',
    space2: '0.5rem',
    space3: '0.75rem',
    space4: '1rem',
    space5: '1.25rem',
    space6: '1.5rem',
    space8: '2rem',
    space10: '2.5rem',
    space12: '3rem',
    space16: '4rem',
    space20: '5rem',
    space24: '6rem',
    marginX: '140px',
    marginY: '100px',
  },
  /** Standardised z-index scale for layering elements. */
  zIndex: {
    background: 0,   // decorative visuals (ShapeOrbit, ShapeHalo, etc.)
    content: 1,      // card content, SlideFrame content area
    connector: 2,    // connection lines between cards
    overlay: 3,      // floating cards (Govern), badges, tooltips
    legend: 5,       // chart legends
    debug: 9999,     // SlideDebug overlays
  },
} as const;

/**
 * Build a restrained neon text shadow from a hex accent color.
 * Useful when bright titles need subtle glow without overpowering body content.
 */
export const weakNeonTextShadow = (hex: string): string => {
  const normalized = hex.startsWith('#') ? hex : `#${hex}`;
  const parsed = /^#([0-9a-f]{6})$/i.exec(normalized);
  if (!parsed) {
    return '0 0 4px rgba(255,255,255,0.18), 0 0 10px rgba(255,255,255,0.08)';
  }
  const value = parsed[1];
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `0 0 4px rgba(${r},${g},${b},0.18), 0 0 10px rgba(${r},${g},${b},0.08)`;
};

export type Theme = typeof theme;
