# Poseidon.AI Video Generation Prompt Template

This template provides a comprehensive framework for generating high-quality promotional videos using the Remotion-based video framework in this repository. Following Apple WWDC, Google I/O, and Microsoft Build-style production techniques.

---

## Deep Research Summary: Product Video Best Practices

### 1. Apple/Google/Microsoft Style Characteristics

| Aspect | Technique | Implementation in This Repo |
|--------|-----------|----------------------------|
| **Typography** | Snappy reveal with scale/blur | `AnimatedText` with `variant="snap"` |
| **Glow Effects** | 6-layer neon text shadows | `theme.neon.cyan.deep`, `CinematicText` |
| **Depth** | Glass morphism + parallax | `GlassCard`, `Camera3D`, `ParallaxLayer` |
| **Motion** | Spring physics with overshoot | `SPRING_CONFIGS.snappy`, `SPRING_CONFIGS.overshoot` |
| **Focus** | Shallow depth of field | `CinematicFocus`, `DepthOfField` |
| **Transitions** | Cinematic zoom/fade | `ShotTransition`, `FlashTransition` |
| **Backgrounds** | Multi-layer composited | 6-layer `Tier3Background` system |

### 2. MIT Quality Standards (Based on Research)

- **Segment Length**: 4-6 seconds per shot (this repo uses 4-5 second shots)
- **Visual Clarity**: High contrast text with neon glow for readability
- **Motion Pacing**: Beat-synced animations at 120 BPM
- **Information Density**: One key message per shot

---

## Template Structure

### Required Metadata

```typescript
// Video Configuration
const VIDEO_CONFIG = {
  fps: 30,                    // Frame rate
  duration: 30,               // Total seconds
  aspectRatio: '16:9',        // or '9:16' for mobile
  bpm: 120,                   // Audio sync tempo
  resolution: {
    landscape: { width: 1920, height: 1080 },
    portrait: { width: 1080, height: 1920 }
  }
};
```

---

## Shot-by-Shot Prompt Template

### [SHOT 1] Logo Reveal (0-4 seconds)

**Purpose**: Brand introduction with maximum visual impact

**Prompt Format**:
```
Create a cinematic logo reveal shot with the following specifications:

VISUAL ELEMENTS:
- Logo: [Logo component/image path]
- Animation: 3D rotation reveal (perspective 1000px, rotateY -40° to 0°)
- Scale: 0.5 → 1.0 with spring physics (damping: 10, stiffness: 60)

EFFECTS:
- BloomEffect: intensity 0.8, pulseFrequency 25, rays 8
- LensFlare: position center, streakLength 500, color cyan
- SparkBurst: triggerAt frame 20, count 30, spread 200px
- CinematicFocus: radius 400px, blur 10px, vignette enabled

TYPOGRAPHY:
- Brand name: CinematicText, size 60px, glow cyan
- Tagline: fontUi, size 26px, opacity fade-in from frame 50

BACKGROUND:
- Preset: cyan (hexmesh + circuit + waveform + grid + dataflow + particles)

TRANSITION:
- Enter: zoom-through (15 frames)
- Exit: zoom-through (12 frames)
```

---

### [SHOT 2] Problem Statement (4-8 seconds)

**Purpose**: Establish pain point or market opportunity

**Prompt Format**:
```
Create a problem statement shot with emotional impact:

VISUAL ELEMENTS:
- Layout: Centered text hierarchy
- Primary metric or statistic (optional)

TYPOGRAPHY:
- Headline: AnimatedText, variant "snap", mode "word", stagger 4 frames
- Subtext: fade-in with 20-frame delay
- Color scheme: red/amber for warning, cyan for neutral

EFFECTS:
- ProgressiveReveal: direction "center", fog intensity 0.3
- Subtle pulse on key words (GlowPulse)

BACKGROUND:
- Preset: warningSoft or red (for problems)
- Preset: cyan (for opportunities)

DATA VISUALIZATION (optional):
- ChartLine with downward trend (for problems)
- Animated statistics with counter effect

TRANSITION:
- Enter: fade-blur (12 frames)
- Exit: zoom-out (10 frames)
```

---

### [SHOT 3] Solution Overview / Demo (8-13 seconds)

**Purpose**: Showcase product interface or key capability

**Prompt Format**:
```
Create a product demonstration shot:

VISUAL ELEMENTS:
- DeviceFrame: desktop or mobile mockup
- Live UI components (AnimatedChart, AnimatedList, AnimatedProgress)
- Dashboard or app screen

LAYOUT:
- landscape: 65/35 split (device left, text right)
- portrait: stacked (device top, text bottom)

TYPOGRAPHY:
- Section header: CinematicText, size 48px
- Feature bullets: AnimatedText with stagger reveal

EFFECTS:
- Camera3D: subtle drift (amplitude 0.3)
- FloatingParticles: count 30, opacity 0.1
- Light sweep across device frame

BACKGROUND:
- Preset: teal (action/demo theme)
- VisualHoloGlobe (optional for global reach messaging)

INTERACTIVE ELEMENTS:
- Cursor movements (simulated)
- Button highlights
- Data populating in real-time

TRANSITION:
- Enter: slide-in from left (20 frames)
- Exit: depth fade (15 frames)
```

---

### [SHOT 4] Key Feature #1 (13-18 seconds)

**Purpose**: Deep dive into primary value proposition

**Prompt Format**:
```
Create a feature spotlight shot:

VISUAL ELEMENTS:
- Icon: relevant SlideIcon with iconGlow effect
- Feature visualization (chart, diagram, or animation)

LAYOUT:
- Icon + headline top
- Supporting visual center
- Bullet points or metrics bottom

TYPOGRAPHY:
- Feature name: CinematicText, size 56px, glow [feature color]
- Description: AnimatedText, variant "fade-up"
- Metrics: Large numeric display with tabular-nums

EFFECTS:
- BloomEffect on icon: intensity 0.6, rays 6
- EnginePill indicator (Protect/Grow/Execute/Govern)
- ComplianceBadge or WarningBadge as appropriate

CHART OPTIONS:
- ChartLine: for trends/performance
- ChartBar: for comparisons
- ChartRadar: for multi-dimensional analysis
- VisualGlowingChart: for scatter/distribution

BACKGROUND:
- Color matched to feature theme:
  - Protect → cyan
  - Grow → violet
  - Execute → teal
  - Govern → blue

TRANSITION:
- FlashTransition: intensity 0.2
- Enter: scale-up (15 frames)
- Exit: dissolve (12 frames)
```

---

### [SHOT 5] Key Feature #2 / Differentiation (18-23 seconds)

**Purpose**: Competitive advantage or secondary feature

**Prompt Format**:
```
Create a differentiation or secondary feature shot:

VISUAL ELEMENTS:
- ComparisonTable: side-by-side comparison
- OR secondary feature visualization

LAYOUT:
- Full-width comparison table
- OR split layout like Shot 4

TYPOGRAPHY:
- Comparison headers: bold, contrasting colors
- "Us" column: cyan glow
- "Others" column: muted/gray

EFFECTS:
- GlassCard containers for table cells
- Animated checkmarks/icons appearing
- Subtle LightSweep across winning column

BACKGROUND:
- Preset: differentiationGold (for business positioning)
- Preset: violet (for innovation/differentiation)

COMPARISON ELEMENTS:
- Checkmarks for positive attributes
- X marks or empty cells for missing features
- Highlight animations on key advantages

TRANSITION:
- Enter: stagger reveal by column
- Exit: fade-out (15 frames)
```

---

### [SHOT 6] Proof / Engines Overview (23-26 seconds)

**Purpose**: Build credibility with social proof or architecture

**Prompt Format**:
```
Create a proof/architecture shot:

VISUAL ELEMENTS:
- Engine pills in grid layout (4 engines)
- OR customer logos / testimonials
- OR key metrics display

LAYOUT:
- 2x2 grid for engines
- OR horizontal logo strip
- OR centered metrics

TYPOGRAPHY:
- Engine names: EnginePill components
- Metrics: Large numbers with TypewriterText effect
- Labels: Small caps, muted color

EFFECTS:
- Staggered reveal of engines/logos
- PulsingElement: bpm-synced subtle scale
- ShapeOrbit: decorative orbital rings

ENGINES (Poseidon specific):
- Protect: cyan, IconShield
- Grow: violet, IconGrowth
- Execute: teal, IconWallet
- Govern: blue, IconGovernance

BACKGROUND:
- Preset: cyan (technology credibility)
- VisualCircuit or VisualDataFlow (architecture feel)

TRANSITION:
- Enter: stagger from center (5-frame intervals)
- Exit: quick fade (8 frames)
```

---

### [SHOT 7] Call to Action / Outro (26-30 seconds)

**Purpose**: Drive action with memorable close

**Prompt Format**:
```
Create a compelling call-to-action outro:

VISUAL ELEMENTS:
- Logo (smaller than Shot 1)
- QR code (QrDockCard component)
- Website/contact info
- Tagline

LAYOUT:
- Centered vertical stack
- Logo → QR → URL → Tagline

TYPOGRAPHY:
- CTA text: CinematicText, strong glow
- URL: fontMono, high contrast
- Final tagline: Elegant fade-in

EFFECTS:
- BloomEffect on logo: full intensity
- LensFlare: dramatic final reveal
- FlashTransition: intensity 0.3 at shot start
- Particle burst on final beat

BACKGROUND:
- Full 6-layer enhanced background
- Vignette intensified for focus

AUDIO SYNC:
- Peak visual effect on final beat drop
- Fade to black in final 15 frames

TRANSITION:
- Enter: dramatic zoom-through
- Exit: fade to black with bloom persistence
```

---

## Component Reference Quick Guide

### Animation Components

| Component | Use Case | Key Props |
|-----------|----------|-----------|
| `AnimatedText` | Text reveals | `variant`, `mode`, `delay`, `stagger` |
| `CinematicText` | Hero headlines | `size`, `glowColor`, `delay` |
| `TypewriterText` | Code/data typing | `speed`, `showCursor` |
| `ShotTransition` | Shot enter/exit | `enterType`, `exitType`, `duration` |
| `FlashTransition` | Impact moments | `at`, `intensity`, `duration` |

### Effect Components

| Component | Use Case | Key Props |
|-----------|----------|-----------|
| `BloomEffect` | Logo/icon glow | `intensity`, `rays`, `pulseFrequency` |
| `LensFlare` | Dramatic reveals | `x`, `y`, `streakLength`, `intensity` |
| `FloatingParticles` | Ambient depth | `count`, `color`, `opacity` |
| `GlowPulse` | Attention grabber | `color`, `intensity` |
| `LightSweep` | Surface highlights | `direction`, `speed` |
| `CinematicFocus` | Depth of field | `focusTarget`, `blurAmount`, `vignette` |
| `ProgressiveReveal` | Fog/mist reveal | `direction`, `intensity` |

### Visual Components

| Component | Use Case | Key Props |
|-----------|----------|-----------|
| `GlassCard` | Content containers | `variant`, `blur`, `glow` |
| `DeviceFrame` | Product mockups | `type`, `content` |
| `EnginePill` | Feature badges | `type`, `active` |
| `ComplianceBadge` | Trust indicators | `label` |
| `ShapeOrbit` | Decorative rings | `radius`, `dashed` |
| `VisualHoloGlobe` | Global reach | `cities`, `rotation` |

### Chart Components

| Component | Use Case | Key Props |
|-----------|----------|-----------|
| `ChartLine` | Trends/performance | `data`, `smooth`, `confidenceBands` |
| `ChartBar` | Comparisons | `data`, `horizontal` |
| `ChartPie` | Composition | `data`, `donut` |
| `ChartRadar` | Multi-dimensional | `data`, `axes` |
| `ChartFunnel` | Conversion flows | `stages` |
| `VisualGlowingChart` | Scatter plots | `points`, `grid`, `glow` |

### Background Presets

| Preset | Theme | Use For |
|--------|-------|---------|
| `cyan` | Technology | Default, AI features |
| `blue` | Trust | Compliance, security |
| `violet` | Innovation | Differentiation, growth |
| `gold` | Business | Economics, ROI |
| `teal` | Action | Demo, execution |
| `red` | Warning | Problems, threats |
| `warningSoft` | Concern | Subtle problems |
| `differentiationGold` | Comparison | Tables, positioning |

---

## Color Semantic Guide

| Color | Hex | Meaning | Usage |
|-------|-----|---------|-------|
| Cyan | `#00F0FF` | AI/Technology | Primary accent, AI features |
| Amber | `#F59E0B` | Human/Warning | User elements, caution |
| Violet | `#8B5CF6` | Growth | Investment, scaling |
| Teal | `#14B8A6` | Action | CTAs, execution |
| Gold | `#EAB308` | Business | Revenue, economics |
| Blue | `#3B82F6` | Trust | Compliance, governance |
| Red | `#EF4444` | Threat | Problems, risks |

---

## Spring Physics Configurations

```typescript
const SPRING_CONFIGS = {
  snappy: { damping: 12, mass: 0.5, stiffness: 100 },   // Quick UI reveals
  gentle: { damping: 20, mass: 1, stiffness: 100 },     // Background motion
  overshoot: { damping: 12, mass: 0.8, stiffness: 150 } // Playful bounce
};
```

---

## Audio Sync Guidelines

- **BPM**: 120 (default)
- **Beat interval**: 15 frames (at 30fps)
- **Major transitions**: On beat 1 of measures
- **Flash transitions**: Align with snare/impact hits
- **Text reveals**: Start 2-3 frames before beat
- **Final shot**: Sync logo reveal with final beat drop

---

## Example Full Video Prompt

```
Create a 30-second promotional video for [PRODUCT NAME]:

OVERALL:
- Style: Apple WWDC keynote aesthetic
- Tone: Professional, innovative, trustworthy
- Music: 120 BPM electronic/cinematic

SHOT 1 (0:00-0:04): LOGO REVEAL
[Insert Shot 1 template details]

SHOT 2 (0:04-0:08): PROBLEM
Headline: "[Problem statement]"
Statistic: "[XX%] of [target audience] face [problem]"
Mood: Urgent but not alarming

SHOT 3 (0:08-0:13): SOLUTION DEMO
Show: Dashboard with [key features]
Highlight: [Primary value proposition]

SHOT 4 (0:13-0:18): FEATURE - [FEATURE NAME]
Icon: [Icon type]
Metric: "[XX]% improvement"
Visual: [Chart type showing impact]

SHOT 5 (0:18-0:23): DIFFERENTIATION
Compare: [Product] vs [Competitors]
Highlight: [3 key advantages]

SHOT 6 (0:23-0:26): CREDIBILITY
Show: [Engine overview / Customer logos / Metrics]

SHOT 7 (0:26-0:30): CTA
Tagline: "[Memorable closing statement]"
Action: "Visit [URL]" with QR code
```

---

## Production Checklist

- [ ] All text passes contrast requirements (WCAG AA minimum)
- [ ] Animations complete within shot duration
- [ ] No overlapping transitions between shots
- [ ] Audio peaks align with visual impacts
- [ ] Logo appears in first 3 seconds
- [ ] CTA visible for minimum 4 seconds
- [ ] All fonts loaded (Space Grotesk, Inter, JetBrains Mono, Noto Sans JP)
- [ ] Background presets match content theme
- [ ] Mobile (portrait) version tested if needed

---

## Export Settings

```bash
# High quality MP4
npx remotion render VideoMasterWWDCv4 out/video.mp4 --codec=h264 --crf=18

# 4K still frame (for thumbnails)
npx remotion still VideoMasterWWDCv4 out/thumbnail.png --frame=45 --scale=2

# Mobile vertical version
npx remotion render VideoVertical9x16 out/video-mobile.mp4 --codec=h264 --crf=18
```

---

*This template is designed to work with the Poseidon.AI Remotion framework. Adapt component names and props as needed for your specific implementation.*
