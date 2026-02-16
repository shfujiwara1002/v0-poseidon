# Design Tokens

> **Source of Truth:** `src/styles/system/tokens.css` (CSS custom properties — SSoT)
> **TypeScript wrappers:** `src/shared/theme.ts`, `src/design-system/theme.ts`
> **Theme overrides:** `src/styles/themes.css`

All runtime values resolve from CSS custom properties. TypeScript modules re-export `var(--*)` references for type-safe consumption in JSX / CVA variants.

**Total**: ~198 CSS custom properties across typography, colors, effects, layout, motion, and z-index.

---

## Typography

### Font Families

| Token | Value | Category |
|---|---|---|
| `--font-display` | `'Space Grotesk', system-ui, sans-serif` | Display / headings |
| `--font-body` | `'Inter', 'Noto Sans JP', system-ui, sans-serif` | Body text / UI |
| `--font-mono` | `'JetBrains Mono', 'Noto Sans JP', ui-monospace, monospace` | Code / data |

### Fluid Size Scale (11 steps)

| Token | Value | Category |
|---|---|---|
| `--font-size-display` | `clamp(1.75rem, 5vw, 3.8rem)` | Display |
| `--font-size-h1` | `clamp(1.5rem, 4vw, 2.5rem)` | Heading 1 |
| `--font-size-h2` | `clamp(1.25rem, 3vw, 2rem)` | Heading 2 |
| `--font-size-h3` | `clamp(1.1rem, 2.5vw, 1.5rem)` | Heading 3 |
| `--font-size-body-lg` | `clamp(1.0625rem, 1.2vw + 0.75rem, 1.3125rem)` | Body large |
| `--font-size-body` | `clamp(0.9375rem, 1vw + 0.75rem, 1.1875rem)` | Body |
| `--font-size-body-sm` | `16px` | Body small |
| `--font-size-caption` | `15px` | Caption |
| `--font-size-label` | `14px` | Label |
| `--font-size-small` | `13px` | Small |
| `--font-size-badge` | `13px` | Badge |

### UI Precision Sizes (16 steps)

| Token | Value | Category |
|---|---|---|
| `--font-size-ui-11` | `11px` | UI precision |
| `--font-size-ui-11-5` | `11.5px` | UI precision |
| `--font-size-ui-11-8` | `11.8px` | UI precision |
| `--font-size-ui-12` | `12px` | UI precision |
| `--font-size-ui-12-8` | `12.8px` | UI precision |
| `--font-size-ui-13-8` | `13.8px` | UI precision |
| `--font-size-ui-14-4` | `14.4px` | UI precision |
| `--font-size-ui-15-2` | `15.2px` | UI precision |
| `--font-size-ui-16` | `16px` | UI precision |
| `--font-size-ui-16-8` | `16.8px` | UI precision |
| `--font-size-ui-17-6` | `17.6px` | UI precision |
| `--font-size-ui-20` | `20px` | UI precision |
| `--font-size-ui-20-8` | `20.8px` | UI precision |
| `--font-size-ui-21-6` | `21.6px` | UI precision |
| `--font-size-ui-22-4` | `22.4px` | UI precision |
| `--font-size-ui-25-6` | `25.6px` | UI precision |

### Font Weights

| Token | Value | Category |
|---|---|---|
| `--font-weight-normal` | `400` | Normal |
| `--font-weight-medium` | `500` | Medium |
| `--font-weight-semibold` | `600` | Semibold |
| `--font-weight-bold` | `700` | Bold |

### Line Heights

| Token | Value | Category |
|---|---|---|
| `--line-height-tight` | `1.1` | Headings |
| `--line-height-body` | `1.5` | Body text |
| `--line-height-relaxed` | `1.65` | Relaxed / long-form |

---

## Colors -- Background

| Token | Value |
|---|---|
| `--bg` | `#0B1221` |
| `--bg-deep` | `#020410` |
| `--bg-surface` | `#1E293B` |

---

## Colors -- Glass System

| Token | Value |
|---|---|
| `--glass-bg` | `rgba(8,12,24,0.62)` |
| `--glass-bg-strong` | `rgba(8,12,24,0.72)` |
| `--glass-bg-soft` | `rgba(10,16,28,0.6)` |
| `--glass-bg-subtle` | `rgba(255, 255, 255, 0.04)` |
| `--glass-border` | `rgba(255,255,255,0.08)` |
| `--glass-border-strong` | `rgba(255,255,255,0.16)` |
| `--glass-shadow` | `0 24px 70px rgba(0,0,0,0.62), 0 0 28px rgba(0,240,255,0.12)` |
| `--glass-inset` | `inset 0 1px 0 0 rgba(255,255,255,0.26), inset 0 -1px 0 0 rgba(255,255,255,0.1), inset 0 0 20px rgba(255,255,255,0.06)` |
| `--glass-edge` | `inset 0 0 0 1px rgba(255,255,255,0.18), inset 0 -16px 30px rgba(0,0,0,0.35)` |
| `--glass-backdrop` | `blur(44px) saturate(1.55) brightness(1.08)` |
| `--glass-backdrop-mobile` | `blur(20px) saturate(1.3) brightness(1.05)` |

---

## Colors -- Text

| Token | Value |
|---|---|
| `--text` | `#f8fafc` |
| `--muted` | `rgba(255,255,255,0.72)` |
| `--muted-2` | `rgba(255,255,255,0.62)` |
| `--text-on-accent` | `#04141a` |

---

## Colors -- Accents

| Token | Value | Hex |
|---|---|---|
| `--accent-cyan` | `#00F0FF` | `#00F0FF` |
| `--accent-teal` | `#14B8A6` | `#14B8A6` |
| `--accent-violet` | `#8B5CF6` | `#8B5CF6` |
| `--accent-amber` | `#F59E0B` | `#F59E0B` |
| `--accent-blue` | `#3B82F6` | `#3B82F6` |
| `--accent-red` | `#EF4444` | `#EF4444` |
| `--accent-gold` | `#EAB308` | `#EAB308` |
| `--accent-teal-bg` | `rgba(21, 225, 194, 0.12)` | -- |
| `--accent-teal-border` | `rgba(21, 225, 194, 0.25)` | -- |

---

## Colors -- State Semantics

| Token | Value | RGB Variant |
|---|---|---|
| `--state-healthy` | `#14B8A6` | `--state-healthy-rgb: 20, 184, 166` |
| `--state-active` | `#00F0FF` | `--state-active-rgb: 0, 240, 255` |
| `--state-primary` | `#3B82F6` | `--state-primary-rgb: 59, 130, 246` |
| `--state-warning` | `#F59E0B` | `--state-warning-rgb: 245, 158, 11` |
| `--state-critical` | `#EF4444` | `--state-critical-rgb: 239, 68, 68` |

---

## Colors -- Engine Themes

| Token | Value | Engine |
|---|---|---|
| `--engine-dashboard` | `#00F0FF` | Dashboard (cyan) |
| `--engine-protect` | `#22C55E` | Protect (green) |
| `--engine-grow` | `#8B5CF6` | Grow (violet) |
| `--engine-execute` | `#EAB308` | Execute (gold) |
| `--engine-govern` | `#3B82F6` | Govern (blue) |

---

## Effects -- Neon Shadows

### Mobile (3 layers -- lighter GPU load)

| Token | Tier | Color |
|---|---|---|
| `--neon-cyan-mobile` | mobile | `rgba(0,240,255,*)` -- `0 0 4px 0.8, 0 0 12px 0.5, 0 0 24px 0.2` |
| `--neon-teal-mobile` | mobile | `rgba(20,184,166,*)` -- `0 0 4px 0.8, 0 0 12px 0.5, 0 0 24px 0.2` |
| `--neon-violet-mobile` | mobile | `rgba(139,92,246,*)` -- `0 0 4px 0.8, 0 0 12px 0.5, 0 0 24px 0.2` |
| `--neon-amber-mobile` | mobile | `rgba(245,158,11,*)` -- `0 0 4px 0.8, 0 0 12px 0.5, 0 0 24px 0.2` |
| `--neon-blue-mobile` | mobile | `rgba(59,130,246,*)` -- `0 0 4px 0.8, 0 0 12px 0.5, 0 0 24px 0.2` |
| `--neon-red-mobile` | mobile | `rgba(239,68,68,*)` -- `0 0 4px 0.8, 0 0 12px 0.5, 0 0 24px 0.2` |

### Desktop (6 layers -- full effect)

| Token | Tier | Color |
|---|---|---|
| `--neon-cyan` | desktop | `rgba(0,240,255,*)` -- `2px/6px/15px/30px/50px/80px` |
| `--neon-teal` | desktop | `rgba(20,184,166,*)` -- `2px/6px/15px/30px/50px/80px` |
| `--neon-violet` | desktop | `rgba(139,92,246,*)` -- `2px/6px/15px/30px/50px/80px` |
| `--neon-amber` | desktop | `rgba(245,158,11,*)` -- `2px/6px/15px/30px/50px/80px` |
| `--neon-blue` | desktop | `rgba(59,130,246,*)` -- `2px/6px/15px/30px/50px/80px` |
| `--neon-red` | desktop | `rgba(239,68,68,*)` -- `2px/6px/15px/30px/50px/80px` |

### Deep (7 layers -- extended glow radius)

| Token | Tier | Color |
|---|---|---|
| `--neon-cyan-deep` | deep | `rgba(0,240,255,*)` -- `2px/6px/15px/30px/50px/80px/120px` |
| `--neon-teal-deep` | deep | `rgba(20,184,166,*)` -- `2px/6px/15px/30px/50px/80px/120px` |
| `--neon-violet-deep` | deep | `rgba(139,92,246,*)` -- `2px/6px/15px/30px/50px/80px/120px` |
| `--neon-amber-deep` | deep | `rgba(245,158,11,*)` -- `2px/6px/15px/30px/50px/80px/120px` |
| `--neon-blue-deep` | deep | `rgba(59,130,246,*)` -- `2px/6px/15px/30px/50px/80px/120px` |
| `--neon-red-deep` | deep | `rgba(239,68,68,*)` -- `2px/6px/15px/30px/50px/80px/120px` |

### Sharper (5 layers -- tighter focus)

| Token | Tier | Color |
|---|---|---|
| `--neon-cyan-sharper` | sharper | `rgba(0,240,255,*)` -- `1px/3px/8px/16px/28px` |
| `--neon-teal-sharper` | sharper | `rgba(20,184,166,*)` -- `1px/3px/8px/16px/28px` |
| `--neon-violet-sharper` | sharper | `rgba(139,92,246,*)` -- `1px/3px/8px/16px/28px` |
| `--neon-amber-sharper` | sharper | `rgba(245,158,11,*)` -- `1px/3px/8px/16px/28px` |
| `--neon-blue-sharper` | sharper | `rgba(59,130,246,*)` -- `1px/3px/8px/16px/28px` |
| `--neon-red-sharper` | sharper | `rgba(239,68,68,*)` -- `1px/3px/8px/16px/28px` |

---

## Effects -- Icon Glow

| Token | Color |
|---|---|
| `--icon-glow-default` | `drop-shadow(0 0 6px rgba(255,255,255,0.35)) drop-shadow(0 0 14px rgba(0,240,255,0.45)) drop-shadow(0 0 28px rgba(0,240,255,0.35))` |
| `--icon-glow-teal` | `drop-shadow(0 0 6px rgba(255,255,255,0.35)) drop-shadow(0 0 14px rgba(20,184,166,0.55)) drop-shadow(0 0 28px rgba(20,184,166,0.4))` |
| `--icon-glow-amber` | `drop-shadow(0 0 6px rgba(255,255,255,0.35)) drop-shadow(0 0 14px rgba(245,158,11,0.55)) drop-shadow(0 0 28px rgba(245,158,11,0.4))` |
| `--icon-glow-violet` | `drop-shadow(0 0 6px rgba(255,255,255,0.35)) drop-shadow(0 0 14px rgba(139,92,246,0.55)) drop-shadow(0 0 28px rgba(139,92,246,0.4))` |
| `--icon-glow-blue` | `drop-shadow(0 0 6px rgba(255,255,255,0.35)) drop-shadow(0 0 14px rgba(59,130,246,0.55)) drop-shadow(0 0 28px rgba(59,130,246,0.4))` |
| `--icon-glow-red` | `drop-shadow(0 0 6px rgba(255,255,255,0.35)) drop-shadow(0 0 14px rgba(239,68,68,0.55)) drop-shadow(0 0 28px rgba(239,68,68,0.4))` |

---

## Effects -- Text Gradients

| Token | Value |
|---|---|
| `--text-gradient-cyan` | `linear-gradient(90deg, #bffcff 0%, #00f0ff 100%)` |
| `--text-gradient-teal` | `linear-gradient(90deg, #5eead4 0%, #15e1c2 100%)` |
| `--text-gradient-violet` | `linear-gradient(90deg, #d7b7ff 0%, #8b5cf6 100%)` |
| `--text-gradient-amber` | `linear-gradient(90deg, #ffe0a1 0%, #f59e0b 100%)` |
| `--text-gradient-blue` | `linear-gradient(90deg, #b8d6ff 0%, #58a6ff 100%)` |
| `--text-shadow-neon` | `0 0 12px rgba(255,255,255,0.4)` |

---

## Effects -- Badge & Warning

| Token | Value |
|---|---|
| `--badge-bg` | `rgba(0,240,255,0.12)` |
| `--badge-border` | `1px solid rgba(0,240,255,0.6)` |
| `--badge-text` | `#e6fbff` |
| `--badge-shadow` | `0 0 8px rgba(0,240,255,0.4)` |
| `--badge-box` | `0 0 12px rgba(0,240,255,0.55), 0 0 28px rgba(0,240,255,0.45), 0 0 52px rgba(0,240,255,0.3), inset 0 0 14px rgba(0,240,255,0.22)` |
| `--warning-bg` | `rgba(239,68,68,0.15)` |
| `--warning-border` | `1px solid rgba(239,68,68,0.4)` |
| `--warning-text` | `#ff6b6b` |
| `--warning-shadow` | `0 0 10px rgba(239,68,68,0.6)` |
| `--warning-box` | `0 0 12px rgba(239,68,68,0.5), 0 0 24px rgba(239,68,68,0.35), inset 0 0 10px rgba(239,68,68,0.2)` |

---

## Interactive States

| Token | Value |
|---|---|
| `--state-hover-bg` | `rgba(255,255,255,0.06)` |
| `--state-active-bg` | `rgba(255,255,255,0.12)` |
| `--state-focus-ring` | `0 0 0 2px rgba(0,240,255,0.6)` |
| `--state-disabled-text` | `rgba(255,255,255,0.4)` |
| `--state-error-border` | `rgba(239,68,68,0.6)` |
| `--state-success-border` | `rgba(21,225,194,0.6)` |
| `--state-loading-bg` | `rgba(255,255,255,0.04)` |

---

## Border Radius

| Token | Value |
|---|---|
| `--radius-lg` | `24px` |
| `--radius-md` | `16px` |
| `--radius-sm` | `12px` |

---

## Spacing

| Token | Value |
|---|---|
| `--page-padding` | `16px` (mobile default) |
| `--space-1` | `4px` |
| `--space-2` | `8px` |
| `--space-3` | `12px` |
| `--space-4` | `16px` |
| `--space-5` | `20px` |
| `--space-6` | `24px` |
| `--space-8` | `32px` |
| `--space-10` | `40px` |
| `--space-12` | `48px` |
| `--space-14` | `56px` |

---

## Layout

| Token | Value |
|---|---|
| `--container-max` | `1600px` |
| `--content-max` | `1240px` |
| `--grid-gap` | `24px` |
| `--section-gap` | `24px` (mobile default) |
| `--card-padding` | `12px` (mobile default) |
| `--touch-min` | `44px` |
| `--nav-bottom-height` | `56px` |
| `--safe-bottom` | `env(safe-area-inset-bottom, 0px)` |

---

## Motion

| Token | Value |
|---|---|
| `--motion-duration-fast` | `120ms` |
| `--motion-duration-base` | `200ms` |
| `--motion-duration-slow` | `320ms` |
| `--motion-easing-standard` | `cubic-bezier(0.2, 0.8, 0.2, 1)` |
| `--motion-easing-emphasized` | `cubic-bezier(0.2, 0, 0, 1)` |

---

## Z-Index Scale

| Token | Value | Purpose |
|---|---|---|
| `--z-base` | `0` | Default stacking context |
| `--z-card-overlay` | `2` | Card hover / overlay content |
| `--z-sticky-nav` | `100` | Sticky top navigation |
| `--z-bottom-nav` | `150` | Bottom tab bar |
| `--z-overlay` | `200` | Overlay backdrop |
| `--z-modal` | `210` | Modal dialog |
| `--z-drawer` | `220` | Side drawer panel |
| `--z-dropdown` | `230` | Dropdown / popover |
| `--z-mobile-backdrop` | `240` | Mobile nav backdrop |
| `--z-mobile-nav` | `250` | Mobile nav panel |
| `--z-agent-control` | `450` | AI agent control layer |
| `--z-toast` | `500` | Toast notifications |
| `--z-command-palette` | `600` | Command palette |
| `--z-celebration` | `700` | Celebration / confetti overlay |
| `--z-skip-link` | `10000` | Skip-to-content link (a11y) |

> **Note:** Breakpoint custom properties (`--bp-sm` through `--bp-xl`) are declared for reference but cannot be used in `@media` queries. Media queries use hard-coded pixel values.

| Breakpoint Token | Value |
|---|---|
| `--bp-sm` | `640px` |
| `--bp-md` | `768px` |
| `--bp-lg` | `1024px` |
| `--bp-xl` | `1280px` |

---

## Responsive Overrides

| Breakpoint | Tokens Modified | New Values |
|---|---|---|
| `640px` (`sm`) | `--page-padding`, `--section-gap`, `--card-padding` | `20px`, `32px`, `16px` |
| `1024px` (`lg`) | `--page-padding`, `--section-gap`, `--card-padding` | `24px`, `40px`, `20px` |
| `1280px` (`xl`) | `--page-padding` | `32px` |

---

## Container Queries

Container-type `inline-size` is applied to `.engine-card`, `.poseidon-grid`, `[data-slot="primary_feed"]`, `[data-slot="decision_rail"]`, and `[data-slot="rail"]`.

| Container Breakpoint | Utility Class | Effect |
|---|---|---|
| `320px` | `.cq\:visible-xs` | `display: block` |
| `640px` | `.cq\:grid-cols-2` | `grid-template-columns: repeat(2, minmax(0, 1fr))` |
| `800px` | `.cq\:grid-cols-3` | `grid-template-columns: repeat(3, minmax(0, 1fr))` |
| `1024px` | `.cq\:grid-cols-4` | `grid-template-columns: repeat(4, minmax(0, 1fr))` |

---

## Theme Overrides

### Dark Theme (Default)

Selectors: `:root`, `[data-theme="dark"]`, `.dark`

| Token | Value |
|---|---|
| `--color-bg-primary` | `#020410` |
| `--color-bg-secondary` | `#0a0e1a` |
| `--color-bg-tertiary` | `rgba(255, 255, 255, 0.03)` |
| `--color-text-primary` | `#ffffff` |
| `--color-text-secondary` | `#a0aec0` |
| `--color-text-tertiary` | `#718096` |
| `--color-border` | `rgba(255, 255, 255, 0.1)` |
| `--color-border-hover` | `rgba(255, 255, 255, 0.2)` |
| `--color-glass-bg` | `rgba(255, 255, 255, 0.03)` |
| `--color-glass-border` | `rgba(255, 255, 255, 0.08)` |
| `--gradient-bg` | `linear-gradient(to bottom, #020410, #0a0e1a)` |

### Light Theme Overrides

Selectors: `[data-theme="light"]`, `.light`

| Token | Dark Value | Light Override |
|---|---|---|
| `--color-bg-primary` | `#020410` | `#f7fafc` |
| `--color-bg-secondary` | `#0a0e1a` | `#ffffff` |
| `--color-bg-tertiary` | `rgba(255, 255, 255, 0.03)` | `rgba(0, 0, 0, 0.02)` |
| `--color-text-primary` | `#ffffff` | `#1a202c` |
| `--color-text-secondary` | `#a0aec0` | `#4a5568` |
| `--color-text-tertiary` | `#718096` | `#718096` |
| `--color-border` | `rgba(255, 255, 255, 0.1)` | `rgba(0, 0, 0, 0.1)` |
| `--color-border-hover` | `rgba(255, 255, 255, 0.2)` | `rgba(0, 0, 0, 0.2)` |
| `--color-glass-bg` | `rgba(255, 255, 255, 0.03)` | `rgba(255, 255, 255, 0.8)` |
| `--color-glass-border` | `rgba(255, 255, 255, 0.08)` | `rgba(0, 0, 0, 0.1)` |
| `--gradient-bg` | `linear-gradient(to bottom, #020410, #0a0e1a)` | `linear-gradient(to bottom, #f7fafc, #edf2f7)` |

Light-mode also adds `backdrop-filter: blur(20px) saturate(180%)` on `[style*="backdrop-filter"]` elements and remaps utility classes `.text-white`, `.text-gray-400`, `.text-gray-300` to themed `--color-text-*` tokens.

---

## TypeScript Wrappers

### `src/design-system/theme.ts`

Typed token registries consumed by CVA variants and component logic.

| Export | Type | Keys |
|---|---|---|
| `ENGINE_COLORS` | `Record<EngineColor, {token, hex, label}>` | `protect`, `grow`, `execute`, `govern` |
| `STATE_COLORS` | `Record<StateColor, {token, hex}>` | `healthy`, `warning`, `critical`, `primary`, `neutral` |
| `ACCENT_COLORS` | `Record<AccentColor, {token, hex}>` | `cyan`, `teal`, `violet`, `amber`, `blue`, `red`, `gold` |
| `SURFACE_TOKENS` | `Record<string, string>` | `primary`, `secondary`, `elevated` |
| `TEXT_TOKENS` | `Record<string, string>` | `primary`, `secondary`, `tertiary` |
| `SPACING` | `Record<number, string>` | `1`..`12` (4px..48px) |
| `RADIUS` | `Record<string, string>` | `sm` (12px), `md` (16px), `lg` (24px) |
| `MOTION` | `{duration, easing}` | `fast`/`base`/`slow`, `standard`/`emphasized` |
| `BREAKPOINTS` | `Record<string, number>` | `sm` (640), `md` (768), `lg` (1024), `xl` (1280) |

### `src/shared/theme.ts`

Unified theme object (`export const theme`) with the following shape:

```ts
theme.colors.background   // { deepNavy, navy, surface, abyss }
theme.colors.accent        // { cyan, cyanSoft, teal, violet, amber, gold, blue, red }
theme.colors.semantic      // { ai, human, growth, threat }
theme.colors.engine        // { dashboard, protect, grow, execute, govern }
theme.colors.text          // { primary, muted, muted2, onAccent }
theme.colors.glass         // { bg, bgStrong, bgSoft, bgSubtle, border, borderStrong, glow }
theme.colors.state         // { hoverBg, activeBg, disabledText, errorBorder, successBorder, loadingBg }
theme.colors.info          // flat alias -> var(--accent-blue)
theme.colors.success       // flat alias -> var(--accent-teal)
theme.colors.error         // flat alias -> var(--accent-red)
theme.colors.warning       // flat alias -> var(--accent-amber)
theme.colors.neutral       // flat alias -> var(--muted)
theme.typography           // { fontHeader, fontUi, fontMono, scale, weight, lineHeight, numericFeatures }
theme.effects.neon         // sharper (desktop) + mobile variants
theme.effects.iconGlow     // { default, teal, amber, violet, blue, red }
theme.effects.glass        // { shadow, shadowAmber, insetHighlight, edge, backdrop, backdropMobile }
theme.effects.gradient     // { text: {cyan,teal,violet,amber,blue,rainbow}, background }
theme.effects.textShadow   // { soft, strong, crisp, neon, gradientGlow }
theme.effects.focus        // var(--state-focus-ring)
theme.radius               // { lg, md, sm }
theme.spacing              // { space1..space14, space16, space20, space24 }
theme.layout               // { containerMax, contentMax, gridGap, sectionGap, touchMin, navBottomHeight, pagePadding }
theme.motion               // { duration: {fast,base,slow}, easing: {standard,emphasized} }
theme.breakpoints          // { sm:640, md:768, lg:1024, xl:1280 }
theme.zIndex               // { base:0 .. skipLink:10000 }
```

The `theme` export is typed as `const` (literal types). Exported type: `export type Theme = typeof theme`.

---

## Cross-References

- [04-engine-semantics.md](04-engine-semantics.md) — engine color usage rules
- [03-variant-system.md](03-variant-system.md) — CVA variant maps that consume these tokens
- [10-accessibility.md](10-accessibility.md) — colorblind palette overrides
- [15-performance-budgets.md](15-performance-budgets.md) — motion token constraints, contrast budget enforcement
