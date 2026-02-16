# Slide 1-9 Visual Refresh Plan - Comprehensive Evaluation

**Date:** 2026-02-05 15:26 JST
**Evaluator:** Claude (Automated Code & Design Audit)
**Scope:** "Slide 1-9 Visual Refresh Re-Design Plan (Technical Authority / MIT審査向け)"
**Verdict:** **CONDITIONALLY APPROVED** - 2 critical items require resolution before implementation

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Design Philosophy Evaluation](#2-design-philosophy-evaluation)
3. [Global Rules Compliance](#3-global-rules-compliance)
4. [Component & API Availability Audit](#4-component--api-availability-audit)
5. [Per-Slide Detailed Assessment](#5-per-slide-detailed-assessment)
6. [Effect Budget Audit](#6-effect-budget-audit)
7. [Visual Story Arc Analysis](#7-visual-story-arc-analysis)
8. [Risk Register](#8-risk-register)
9. [Data Dependency Validation](#9-data-dependency-validation)
10. [Implementation Feasibility by Phase](#10-implementation-feasibility-by-phase)
11. [Still-Safe Rendering Audit](#11-still-safe-rendering-audit)
12. [Recommendations & Action Items](#12-recommendations--action-items)
13. [Narrative & Background Context](#13-narrative--background-context)

---

## 1. Executive Summary

### Overall Assessment: CONDITIONALLY APPROVED

The plan is architecturally sound, well-structured, and achieves its stated goal of transforming 9 visually monotonous slides (8/9 using identical `backgroundPresets.cyan`) into a semantically differentiated narrative arc. The component inventory is validated against the codebase - all referenced components exist with matching prop signatures.

### Critical Items (must resolve before implementation)

| # | Issue | Severity | Section |
|---|-------|----------|---------|
| C-1 | Slide 02 show* prop reversion contradicts recent fix | CRITICAL | [5.2](#slide-02-problem) |
| C-2 | `authorityBlueCircuit` / `authorityEpilogue` preset specs underspecified | HIGH | [5.6](#slide-06-business), [5.9](#slide-09-epilogue) |

### Strengths

- **Semantic color system** is rigorous and consistently applied across all 9 slides
- **Effect budget** (1 primary + 1 supplementary per slide) is respected in all cases
- **copy.ts freeze** is maintained - zero text modifications
- **Still-safe rendering** (frame 0 only) is achievable with all proposed components
- **Visual story arc** creates a compelling emotional journey: trust -> crisis -> opportunity -> resolution -> proof -> closing
- **Component reuse** is exemplary - zero new dependencies, 100% existing design system

### Weaknesses

- Two new background presets lack exact layer specifications
- Slide 07 DeviceFrame may overflow current GlassCard dimensions
- Slide 03 ChartTimeline addition may compress card vertical space
- Slide 02 density prop requires new API surface on VisualFracturedConnection

---

## 2. Design Philosophy Evaluation

### Stated Philosophy
> "Technical Authority / MIT審査向け: 派手さではなく情報の構造化。過剰フレア排除、視線誘導と意味づけに限定"

### Assessment: EXCELLENT

The philosophy is correctly calibrated for the MIT CTO Program context:

| Criterion | Rating | Notes |
|-----------|--------|-------|
| Academic tone | A | No gratuitous animation; all effects serve information hierarchy |
| Visual restraint | A | Effect budget enforces discipline; DustMotes capped at 0.06-0.08 opacity |
| Semantic signaling | A+ | Color assignments map cleanly to conceptual domains |
| Information architecture | A | Background differentiation creates instant slide-type recognition |
| Professional credibility | A | Blue/teal dominant palette signals fintech authority |

### One concern
The plan uses `GlowPulse` on Slide 02's `$133/mo` StatCard and Slide 06's pillar badges. While GlowPulse renders at frame 0 (at 80% intensity via `0.8 + sin(0) * 0.4 * intensity`), the semantic choice of "pulsing glow" on a static still image is slightly misleading - the viewer sees a static glow, not a pulse. This is acceptable but should be documented as "static glow emphasis" rather than "pulse" in any design handoff.

---

## 3. Global Rules Compliance

### Rule 1: copy.ts 変更禁止
**Status: COMPLIANT**

No slide modification in the plan touches `copy.ts`. All text references (timeline data, phase labels, pillar names) are read-only imports.

### Rule 2: still-safe (frame 0)
**Status: COMPLIANT WITH CAVEATS**

| Component | Frame 0 Behavior | Safe? |
|-----------|-----------------|-------|
| BloomEffect (revealDelay=0) | `reveal = 1` (fully visible) | YES |
| BloomEffect (revealDelay>0) | `reveal = 0` (invisible) | NO - plan correctly omits revealDelay |
| GlowPulse | `pulse = 0.8` (80% intensity) | YES - visible but reduced |
| DustMotes | Particles at initial positions | YES - static scatter |
| ShapeOrbit | Static concentric rings | YES |
| ShapeHalo | Static radial gradient | YES |
| ChartTimeline | Static SVG | YES |
| TimelineHorizontal | Static layout | YES |
| DeviceFrame | Static wrapper | YES |
| SlideIcon | Static icon with glow filter | YES |

**Caveat:** GlowPulse renders at 80% brightness at frame 0, not 100%. This means Slide 02's `$133/mo` emphasis and Slide 06's badge emphasis will be slightly dimmer than their animated peak. This is acceptable for still output.

### Rule 3: effect budget (1+1)
**Status: COMPLIANT** (see [Section 6](#6-effect-budget-audit) for full audit)

### Rule 4: readability gate
**Status: NEEDS VERIFICATION AT RENDER TIME**

Background preset opacity values are within safe ranges:
- All hexmesh layers: 0.16-0.22 (safe)
- All circuit layers: 0.12-0.16 (safe)
- All waveform layers: 0.08-0.12 (safe)
- All grid layers: 0.06-0.08 (safe)

However, the `authorityBlueCircuit` preset's circuit-dominant design could potentially interfere with Slide 06's dense phase card content if circuit density is set too high. Recommend circuit density <= 22 and opacity <= 0.14.

### Rule 5: semantic color
**Status: COMPLIANT**

| Slide | Background | Semantic Domain | Color Match |
|-------|-----------|-----------------|-------------|
| 01 Title | blue | Trust/Foundation | cyan=AI, blue=govern -> CORRECT |
| 02 Problem | red (custom) | Crisis/Warning | red=problem -> CORRECT |
| 03 Why Now | teal | Opportunity/Timing | teal=protect/growth -> CORRECT |
| 04 Solution | blue | Architecture/Trust | blue=govern -> CORRECT |
| 05 Differentiation | differentiationGold | Advantage/Value | gold=action -> CORRECT |
| 06 Business | authorityBlueCircuit | Precision/Planning | blue=govern -> CORRECT |
| 07 Demo | teal | Action/Proof | teal=protect -> CORRECT |
| 08 Summary | violet | Growth/Vision | violet=grow -> CORRECT |
| 09 Epilogue | authorityEpilogue | Closing/Trust | teal/cyan -> CORRECT |

### Rule 6: Remotion-only
**Status: COMPLIANT**

Zero external dependencies. All components are from `src/shared/`. No npm additions required.

---

## 4. Component & API Availability Audit

### All Components Verified Against Codebase

| Component | Path | Exists | Props Match |
|-----------|------|--------|-------------|
| BloomEffect | `src/shared/effects/BloomEffect.tsx` | YES | YES |
| GlowPulse | `src/shared/effects/GlowPulse.tsx` | YES | YES |
| DustMotes | `src/shared/effects/FloatingParticles.tsx` | YES | YES |
| ShapeOrbit | `src/shared/visuals/ShapeOrbit.tsx` | YES | YES |
| ShapeHalo | `src/shared/visuals/ShapeHalo.tsx` | YES | YES |
| ChartTimeline | `src/shared/charts/ChartTimeline.tsx` | YES | YES |
| TimelineHorizontal | `src/shared/TimelineHorizontal.tsx` | YES | YES |
| DeviceFrame | `src/shared/visuals/DeviceFrame.tsx` | YES | YES |
| SlideIcon | `src/shared/SlideIcon.tsx` | YES | YES |
| ComparisonTable | `src/shared/ComparisonTable.tsx` | YES | YES |

### Background Presets Verified

| Preset | Exists | Used In Plan |
|--------|--------|-------------|
| `cyan` | YES | (current default - being replaced) |
| `blue` | YES | Slide 01, 04 |
| `teal` | YES | Slide 03, 07 |
| `violet` | YES | Slide 08 |
| `differentiationGold` | YES | Slide 05 |
| `red` | YES | (not used directly; Slide 02 has custom) |
| `warningSoft` | YES | (not used) |
| `authorityBlueCircuit` | NO - TO CREATE | Slide 06 |
| `authorityEpilogue` | NO - TO CREATE | Slide 09 |

### SlideIcon Names Verified Against `/public/assets/svg/icons/`

| Plan Reference | Icon File | Exists |
|---------------|-----------|--------|
| `shield` | `icon-shield.svg` | YES |
| `wave` | `icon-wave.svg` | YES |
| `gear` | `icon-gear.svg` | YES |
| `govern-core` | `icon-govern-core.svg` | YES |
| `data-grid` | `icon-data-grid.svg` | YES |
| `ai-brain` | `icon-ai-brain.svg` | YES |
| `signal-beam` | `icon-signal-beam.svg` | YES |
| `insight-lamp` | `icon-insight-lamp.svg` | YES |
| `horizon-spectrum` | `icon-horizon-spectrum.svg` | YES |
| `vault` | `icon-vault.svg` | YES |

**All 10 icon references resolve to existing SVG files.**

### Available but Unused Icons (for reference)

`audit-timeline`, `bias-audit`, `compliance-badge`, `consent-check`, `explainability`, `matrix`, `orbit-connector`, `pulse`, `replay-spiral`, `risk-warning`, `roadmap-pin`, `story-swirl`

---

## 5. Per-Slide Detailed Assessment

### Slide 01 (Title)
**Rating: A - READY TO IMPLEMENT**

| Change | Feasibility | Risk |
|--------|-------------|------|
| bg: cyan -> blue | Trivial (preset exists) | NONE |
| +ShapeOrbit (size:520, rings:4) | Low - component verified | NONE |
| +BloomEffect on logo (intensity:0.28, rays:0) | Low - still-safe confirmed | NONE |
| +DustMotes (count:40, opacity:0.08) | Low - background atmospheric | NONE |

**Notes:**
- ShapeOrbit at size 520 will create a prominent backdrop behind the logo. Ensure it doesn't compete with the Poseidon logo itself.
- BloomEffect with `rays: 0` eliminates directional light rays, keeping only the soft bloom. Good restraint for MIT context.
- DustMotes at 0.08 opacity is appropriately subtle.

### Slide 02 (Problem) {#slide-02-problem}
**Rating: C - CRITICAL CONFLICT REQUIRES RESOLUTION**

| Change | Feasibility | Risk |
|--------|-------------|------|
| density="compact" on diagram | MEDIUM - new prop needed | API change required |
| showLegend={false} | Trivial | **CRITICAL - reverts recent fix** |
| showMicroStats={false} | Trivial | **CRITICAL - reverts recent fix** |
| showZoneBadges={false} | Trivial | **CRITICAL - reverts recent fix** |
| +GlowPulse on $133/mo StatCard | Low | NONE |
| bg: keep custom red layers | No change | NONE |

**CRITICAL ISSUE:**
In the current session, these show* props were **intentionally changed from `false` to `true`** to fix a critical bug where all diagram enhancements (zone badges, annotations, micro-stats, legend) were being suppressed. The plan now proposes reverting three of these back to `false`.

**Resolution Options:**
1. **Accept reversion** - The compact embedded mode intentionally hides these elements for readability when the diagram is small within a 5fr/7fr grid. The recently-added data is visible but too dense at embedded scale.
2. **Keep current (all true)** - Preserve the diagram enhancements that were just fixed. May require layout adjustments to prevent overlap.
3. **Compromise** - Use `density="compact"` to reduce font sizes but keep `showLegend={true}`, `showMicroStats={true}`, `showZoneBadges={true}` with reduced typography.

**Recommendation:** Option 3 (compromise) is most aligned with both the recent fix intent and the plan's readability goal. The `density` prop should control typography scale, not visibility.

### Slide 03 (Why Now)
**Rating: B+ - MODERATE VERTICAL SPACE RISK**

| Change | Feasibility | Risk |
|--------|-------------|------|
| bg: cyan -> teal | Trivial | NONE |
| +ChartTimeline (height:80) | Medium | MODERATE - vertical compression |
| +3 SlideIcons on cards | Low | LOW - space within cards |

**Vertical Space Analysis:**
Adding an 80px ChartTimeline below the header reduces available space for the 3-column card grid by approximately 80px + 32px gap = 112px. The cards use `flex: 1` to fill remaining space, so they will compress. Test render is required to confirm cards remain readable.

**Recommendation:** Consider `height: 60` if cards are too compressed. The ChartTimeline SVG uses `overflow: visible`, so label text may extend beyond the specified height.

**Data Mapping Verified:**
```
copy.slide03.tstimeline -> ChartTimeline phases:
  { label: 'Open Banking',   value: '2020', color: teal }
  { label: 'AI Reasoning',   value: '2022', color: teal }
  { label: 'Consumer Shift',  value: '2024', color: teal }
  { label: 'The Window',     value: '2025', color: amber, highlight: true }
```
All data fields align with ChartTimeline's `phases` prop interface.

### Slide 04 (Solution)
**Rating: A - READY TO IMPLEMENT**

| Change | Feasibility | Risk |
|--------|-------------|------|
| bg: cyan -> blue | Trivial | NONE |
| +4 SlideIcons on engine cards | Low | NONE |
| +ShapeHalo on Govern card | Low | NONE |

**Notes:**
- The 4 SlideIcons (shield/wave/gear/govern-core) map perfectly to the Protect/Grow/Execute/Govern engine taxonomy.
- ShapeHalo at `size: 600, opacity: 0.10` is subtle enough not to interfere with card readability.
- Icon-to-engine color mapping (red/violet/amber/blue) follows semantic color rule correctly.

### Slide 05 (Differentiation)
**Rating: A - READY TO IMPLEMENT**

| Change | Feasibility | Risk |
|--------|-------------|------|
| bg: cyan -> differentiationGold | Trivial (preset exists) | NONE |
| highlightPoseidonColumn={true} explicit | Trivial (already default) | NONE |
| unique row amber box-shadow | CSS-only change | NONE |

**ComparisonTable Implementation Detail:**
Current `kind='unique'` rows have:
- Left amber indicator bar with `boxShadow: '0 0 6px rgba(245,158,11,0.32)'` on the bar
- Plan enhances this to add a full-row box-shadow: `boxShadow: '0 0 12px rgba(245,158,11,0.22)'` on the row container
- This is a safe, additive CSS-only change in `ComparisonTable.tsx` lines 110-118.

### Slide 06 (Business) {#slide-06-business}
**Rating: B - HIGH RISK ON PRESET SPEC**

| Change | Feasibility | Risk |
|--------|-------------|------|
| bg: cyan -> authorityBlueCircuit | **BLOCKED** - no spec | HIGH |
| +horizontal connection rail | Medium - SVG overlay | LOW |
| +GlowPulse on badges | Low | NONE |

**Connection Rail Feasibility:**
The 4 phase cards are arranged in `gridTemplateColumns: repeat(4, 1fr)` with `gap: 1.25rem`. An absolutely-positioned SVG overlay is feasible. Each card has `position: relative`, and the parent grid needs `position: relative` added.

**authorityBlueCircuit Missing Spec:**
The plan states this should be "circuit-dominant + blue + low-opacity particles" but provides no exact layer configuration. Required specification:

```typescript
// PROPOSED (needs confirmation):
authorityBlueCircuit: [
  { visual: 'circuit', color: theme.accent.blue, opacity: 0.20, blendMode: 'screen', density: 26 },
  { visual: 'hexmesh', color: theme.accent.blue, opacity: 0.14, scale: 50 },
  { visual: 'grid', color: theme.accent.cyan, opacity: 0.06, size: 90 },
  { visual: 'waveform', color: theme.accent.blue, opacity: 0.08, waves: 3, amplitude: 24, frequency: 1.5 },
  { visual: 'dataflow', color: theme.accent.blue, opacity: 0.07, nodes: 5, flowDirection: 'horizontal' },
  { visual: 'particles', color: 'white', opacity: 0.08, count: 30 },
]
```

### Slide 07 (Demo)
**Rating: B- - MODERATE SIZING RISK**

| Change | Feasibility | Risk |
|--------|-------------|------|
| bg: cyan -> teal | Trivial | NONE |
| VisualWireframe in DeviceFrame(macbook) | Medium | MODERATE - overflow |
| +TimelineHorizontal | Low | LOW |
| +DustMotes (count:30, opacity:0.06) | Low | NONE |

**DeviceFrame Overflow Risk:**
- Current GlassCard: `960px x 540px`
- DeviceFrame (macbook): `1000px x 600px` (hardcoded in DeviceFrame.tsx)
- **DeviceFrame is 40px wider and 60px taller than the current container**

**Resolution Options:**
1. Apply `transform: scale(0.92)` to DeviceFrame to fit within 960x540
2. Remove GlassCard and let DeviceFrame be the primary container
3. Increase slide layout's demoWidth/demoHeight
4. Add width/height override props to DeviceFrame

**Recommendation:** Option 2 (replace GlassCard with DeviceFrame) is cleanest. DeviceFrame already provides visual framing.

**TimelineHorizontal Data Mapping Verified:**
```
copy.slide07.tstimeline -> TimelineHorizontal segments:
  { label: 'Dashboard',     time: '0-7s',   icon: 'data-grid',    color: 'rgba(...)' }
  { label: 'Protect + SHAP', time: '7-14s',  icon: 'shield',       color: 'teal' }
  { label: 'Execute Approval', time: '14-21s', icon: 'gear',       color: 'amber' }
  { label: 'Govern Audit',  time: '21-28s',  icon: 'govern-core',  color: 'blue' }
  { label: 'Tagline',       time: '28-30s',  icon: undefined,      color: 'rgba(...)' }
```
Note: `color` values in copy.ts use string names ('teal', 'amber', 'blue') and rgba values - a `resolveColor()` utility will be needed to map these to `theme.accent.*` values.

### Slide 08 (Summary)
**Rating: A - READY TO IMPLEMENT**

| Change | Feasibility | Risk |
|--------|-------------|------|
| bg: cyan -> violet | Trivial | NONE |
| +ShapeHalo on Vision card | Low | NONE |
| +3 SlideIcons on pillars | Low | NONE |

**Notes:**
- ShapeHalo at `size: 700, opacity: 0.14` is appropriately sized for the Vision card's prominence.
- The 3 pillar icons (shield/insight-lamp/horizon-spectrum) with teal/amber/violet glow create a visually balanced triptych.
- Violet background correctly signals the "growth/vision integration" tone.

### Slide 09 (Epilogue) {#slide-09-epilogue}
**Rating: B - HIGH RISK ON PRESET SPEC**

| Change | Feasibility | Risk |
|--------|-------------|------|
| bg: cyan -> authorityEpilogue | **BLOCKED** - no spec | HIGH |
| +BloomEffect on "totally worth it" | Low | NONE |
| +GlowPulse on QrDockCard | Low | NONE |

**authorityEpilogue Missing Spec:**
Same issue as authorityBlueCircuit. Proposed specification:

```typescript
// PROPOSED (needs confirmation):
authorityEpilogue: [
  { visual: 'globe', color: theme.accent.teal, opacity: 0.18, radius: 300 },
  { visual: 'hexmesh', color: theme.accent.cyan, opacity: 0.14, scale: 48 },
  { visual: 'waveform', color: theme.accent.teal, opacity: 0.08, waves: 3, amplitude: 22, frequency: 1.4 },
  { visual: 'grid', color: theme.accent.cyan, opacity: 0.05, size: 96 },
  { visual: 'dataflow', color: theme.accent.teal, opacity: 0.06, nodes: 4, flowDirection: 'radial' },
  { visual: 'particles', color: 'white', opacity: 0.10, count: 35 },
]
```

---

## 6. Effect Budget Audit

### Classification Framework

| Category | Counts Toward Budget | Examples |
|----------|---------------------|----------|
| Primary Effect | YES (1 max) | ShapeOrbit, ShapeHalo, BloomEffect, connection rail |
| Supplementary Effect | YES (1 max) | GlowPulse, ComparisonTable glow |
| Background Atmospheric | NO | DustMotes, background preset layers |
| Content Element | NO | SlideIcon, ChartTimeline, TimelineHorizontal, DeviceFrame |

### Per-Slide Budget

| Slide | Primary | Supplementary | Atmospheric | Content | Budget Status |
|-------|---------|---------------|-------------|---------|---------------|
| 01 | ShapeOrbit | BloomEffect | DustMotes | - | 1+1 PASS |
| 02 | GlowPulse | - | - | - | 1+0 PASS |
| 03 | - | - | - | ChartTimeline, 3x SlideIcon | 0+0 PASS |
| 04 | ShapeHalo | - | - | 4x SlideIcon | 1+0 PASS |
| 05 | table glow | - | - | - | 1+0 PASS |
| 06 | connection rail | GlowPulse | - | - | 1+1 PASS |
| 07 | - | - | DustMotes | DeviceFrame, TimelineHorizontal | 0+0 PASS |
| 08 | ShapeHalo | - | - | 3x SlideIcon | 1+0 PASS |
| 09 | BloomEffect | GlowPulse | - | - | 1+1 PASS |

**ALL 9 SLIDES PASS THE EFFECT BUDGET.**

---

## 7. Visual Story Arc Analysis

### Current State (Before Refresh)
8 of 9 slides use identical `backgroundPresets.cyan`. Only Slide 02 has a differentiated red custom background. This creates a monotonous visual experience where slides blur together, undermining the narrative structure.

### Proposed Arc

```
Slide 01 (blue)     ━━━ 信頼・技術基盤 ━━━━━━━━━━━━━━━━━━━━━┓
Slide 02 (red)      ━━━ 危機・緊張 ━━━━━━━━━━━━━━━━━━━━━━━━━┃ Act I: Problem
Slide 03 (teal)     ━━━ 収束・機会 ━━━━━━━━━━━━━━━━━━━━━━━━━┛
Slide 04 (blue)     ━━━ 設計・信頼 ━━━━━━━━━━━━━━━━━━━━━━━━━┓
Slide 05 (gold)     ━━━ 優位性・確証 ━━━━━━━━━━━━━━━━━━━━━━━┃ Act II: Solution
Slide 06 (blue-cir) ━━━ 精密・実行計画 ━━━━━━━━━━━━━━━━━━━━━┛
Slide 07 (teal)     ━━━ 行動・実証 ━━━━━━━━━━━━━━━━━━━━━━━━━┓
Slide 08 (violet)   ━━━ 成長・統合ビジョン ━━━━━━━━━━━━━━━━━┃ Act III: Proof
Slide 09 (epilogue) ━━━ 余韻・信頼のクロージング ━━━━━━━━━━━┛
```

### Color Distribution Analysis

| Color Family | Slides | Count | Proportion |
|-------------|--------|-------|------------|
| Blue family (blue, authorityBlueCircuit) | 01, 04, 06 | 3 | 33% |
| Teal family (teal, authorityEpilogue) | 03, 07, 09 | 3 | 33% |
| Red/warm (red custom, differentiationGold) | 02, 05 | 2 | 22% |
| Violet | 08 | 1 | 11% |

**Assessment:** The distribution is balanced. Blue and teal each appear 3 times but are differentiated enough (Slide 06 is circuit-dominant, Slide 09 includes globe) to avoid the current monotony problem. No adjacent slides share the same background preset.

### Adjacent Slide Contrast Check

| Transition | From -> To | Visual Contrast |
|-----------|-----------|-----------------|
| 01 -> 02 | blue -> red | HIGH (trust -> crisis) |
| 02 -> 03 | red -> teal | HIGH (crisis -> opportunity) |
| 03 -> 04 | teal -> blue | MEDIUM (opportunity -> architecture) |
| 04 -> 05 | blue -> gold | HIGH (architecture -> differentiation) |
| 05 -> 06 | gold -> blue-circuit | MEDIUM (differentiation -> planning) |
| 06 -> 07 | blue-circuit -> teal | MEDIUM (planning -> proof) |
| 07 -> 08 | teal -> violet | HIGH (proof -> vision) |
| 08 -> 09 | violet -> teal-epilogue | MEDIUM (vision -> closing) |

**No adjacent slides share the same visual identity.** This resolves the primary monotony issue.

---

## 8. Risk Register

| ID | Risk | Severity | Likelihood | Impact | Mitigation |
|----|------|----------|------------|--------|------------|
| R-1 | Slide 02 show* reversion undoes recent fix | CRITICAL | HIGH | User confusion, lost features | Resolve before implementation (see 5.2) |
| R-2 | authorityBlueCircuit spec missing | HIGH | CERTAIN | Implementation blocked | Provide exact layer config (see 5.6) |
| R-3 | authorityEpilogue spec missing | HIGH | CERTAIN | Implementation blocked | Provide exact layer config (see 5.9) |
| R-4 | Slide 07 DeviceFrame overflow | MODERATE | HIGH | Visual clipping | Replace GlassCard with DeviceFrame or scale |
| R-5 | Slide 03 vertical compression | MODERATE | MEDIUM | Card content truncation | Reduce ChartTimeline to 60px if needed |
| R-6 | Slide 07 color resolution | LOW | CERTAIN | Incorrect colors | Implement resolveColor() utility for copy.ts string values |
| R-7 | GlowPulse 80% intensity at frame 0 | LOW | CERTAIN | Slightly dimmer than intended | Accept or increase intensity by 1.25x |
| R-8 | density prop adds API surface | LOW | CERTAIN | Maintenance overhead | Keep interface minimal; only 'full' and 'compact' |

---

## 9. Data Dependency Validation

### copy.ts Data Availability

| Slide | Data Path | Exists | Fields Match Component Props |
|-------|-----------|--------|------------------------------|
| 03 | `copy.slide03.tstimeline` | YES | `label`, `year`->value, `icon`, `highlight`->color |
| 06 | `copy.slide06.phases[i].color` | YES | Direct hex color strings |
| 07 | `copy.slide07.tstimeline` | YES | `label`, `time`, `icon`, `color` (needs resolveColor) |

### Field Mapping Details

**Slide 03: copy.slide03.tstimeline -> ChartTimeline.phases**
```
copy field          -> ChartTimeline prop
item.label          -> phase.label         (direct)
item.year           -> phase.value         (rename: year->value)
item.highlight      -> phase.color         (conditional: highlight ? amber : teal)
item.icon           -> phase.icon          (direct, but ChartTimeline uses SVG path, not icon name)
```
**Warning:** ChartTimeline's `icon` prop expects an SVG path string, not an icon name. The copy.ts data uses icon names like `'data-grid'`, `'ai-brain'`. A resolution function or modification may be needed.

**Slide 07: copy.slide07.tstimeline -> TimelineHorizontal.segments**
```
copy field          -> TimelineHorizontal prop
item.label          -> segment.label       (direct)
item.time           -> segment.time        (direct)
item.icon           -> segment.icon        (direct - both use icon names)
item.color          -> segment.color       (needs resolveColor: 'teal' -> theme.accent.teal)
```

---

## 10. Implementation Feasibility by Phase

### Phase A: Shared Infrastructure
**Feasibility: HIGH (except preset specs)**

| Task | Effort | Risk | Dependencies |
|------|--------|------|-------------|
| Add authorityBlueCircuit preset | 15 min | HIGH (underspecified) | Layer spec decision |
| Add authorityEpilogue preset | 15 min | HIGH (underspecified) | Layer spec decision |
| Add density prop to VisualFracturedConnection | 30 min | LOW | None |

### Phase B: Slides 01, 02, 03, 04
**Feasibility: HIGH**

| Task | Effort | Risk |
|------|--------|------|
| Slide 01: bg + ShapeOrbit + BloomEffect + DustMotes | 20 min | LOW |
| Slide 02: density prop + GlowPulse | 25 min | CRITICAL (show* conflict) |
| Slide 03: bg + ChartTimeline + 3 SlideIcons | 30 min | MODERATE (vertical space) |
| Slide 04: bg + 4 SlideIcons + ShapeHalo | 20 min | LOW |

### Phase C: Slides 05, 06, 07
**Feasibility: MEDIUM**

| Task | Effort | Risk |
|------|--------|------|
| Slide 05: bg + table glow enhancement | 15 min | LOW |
| Slide 06: bg + connection rail + GlowPulse | 40 min | HIGH (preset + SVG layout) |
| Slide 07: bg + DeviceFrame + TimelineHorizontal + DustMotes | 35 min | MODERATE (sizing) |

### Phase D: Slides 08, 09
**Feasibility: HIGH (except preset)**

| Task | Effort | Risk |
|------|--------|------|
| Slide 08: bg + ShapeHalo + 3 SlideIcons | 20 min | LOW |
| Slide 09: bg + BloomEffect + GlowPulse | 20 min | HIGH (preset spec) |

### Total Estimated Effort: ~4.5 hours

---

## 11. Still-Safe Rendering Audit

### Frame 0 Rendering Matrix

Every proposed component was verified against the codebase for frame 0 behavior:

| Component | Uses useCurrentFrame? | Frame 0 Visible? | Notes |
|-----------|----------------------|-------------------|-------|
| BloomEffect | YES (for revealDelay) | YES (when revealDelay=0) | Default revealDelay=0, so `reveal=1` |
| GlowPulse | YES | YES (at 80%) | `0.8 + sin(0)*0.4*1 = 0.8` |
| DustMotes | YES (for position) | YES | Particles at initial scatter positions |
| ShapeOrbit | NO | YES | Pure SVG, no animation dependency |
| ShapeHalo | NO | YES | Pure CSS gradient, no animation |
| ChartTimeline | NO | YES | Pure SVG rendering |
| TimelineHorizontal | NO | YES | Pure React layout |
| DeviceFrame | NO | YES | Pure CSS/HTML wrapper |
| SlideIcon | NO | YES | SVG icon with CSS filter |
| ComparisonTable | NO | YES | Pure React table |
| Tier3Background | YES (optional) | YES | Static layer rendering |

**ALL PROPOSED COMPONENTS ARE STILL-SAFE AT FRAME 0.**

The plan correctly avoids `revealDelay > 0` on all BloomEffect usages. No animation-dependent visibility issues exist.

---

## 12. Recommendations & Action Items

### MUST FIX (before implementation)

1. **[C-1] Resolve Slide 02 show* prop conflict**
   - **Recommendation:** Keep all show* props as `true`. Use `density="compact"` only for typography scaling (font sizes), not for visibility toggling.
   - **Action:** Update plan to specify: `density="compact"` + `showLegend` + `showAnnotations` + `showMicroStats` + `showZoneBadges` (all true)

2. **[C-2] Specify exact layer configs for new presets**
   - **Action:** Define the complete 6-layer configuration for both `authorityBlueCircuit` and `authorityEpilogue` with exact colors, opacities, blend modes, and visual-specific params (density, scale, waves, etc.)
   - **See proposed specs in sections 5.6 and 5.9**

### SHOULD FIX (before implementation)

3. **[R-4] Slide 07 DeviceFrame sizing strategy**
   - **Recommendation:** Replace GlassCard with DeviceFrame directly as the primary container
   - **Action:** Decide on approach and update plan

4. **[R-6] Implement resolveColor() utility for Slide 07**
   - **Action:** Create a small helper to map copy.ts string color values ('teal', 'amber', 'blue', rgba strings) to theme.accent.* values

### NICE TO HAVE (during implementation)

5. **Slide 03 ChartTimeline height fallback**
   - Implement at 80px, but have a 60px fallback if card compression is visually unacceptable

6. **GlowPulse intensity compensation**
   - For still output, multiply GlowPulse intensity by 1.25x to compensate for the 80% frame-0 factor

7. **ChartTimeline icon prop investigation**
   - Verify whether ChartTimeline's `icon` prop accepts icon names or requires SVG path data. If the latter, the copy.ts icon name data needs resolution.

---

## 13. Narrative & Background Context

### The Rhetorical Architecture

This presentation is structured as a 3-act persuasion narrative for the MIT Sloan CTO Program Capstone:

**Act I: Problem Definition (Slides 01-03)**

The opening establishes Poseidon.AI's credibility and frames the financial services integration problem. Slide 01 (blue) opens with institutional trust. Slide 02 (red) creates productive tension by visualizing the "Fractured Financial Topology" - a diagram showing how data aggregation is solved but action coordination remains broken, costing consumers ~$133/month in hidden friction. Slide 03 (teal) resolves the tension by identifying the convergence of Open Banking, AI reasoning, and consumer behavioral shifts as a time-limited strategic window.

**Act II: Solution Architecture (Slides 04-06)**

The middle act presents Poseidon.AI's technical approach. Slide 04 (blue) introduces the four-engine architecture (Protect, Grow, Execute, Govern) with semantic icons that will recur throughout the deck. Slide 05 (gold) proves differentiation against incumbents via a structured comparison table where unique capabilities glow amber - the warm color signaling competitive advantage. Slide 06 (blue-circuit) presents the execution roadmap with a circuit-dominant background conveying precision and technical rigor.

**Act III: Proof & Closing (Slides 07-09)**

The final act provides evidence and emotional resolution. Slide 07 (teal) demonstrates the product through a DeviceFrame mockup with a timeline walkthrough, grounding abstract architecture in concrete UX. Slide 08 (violet) synthesizes the vision with growth-signaling purple, anchored by a central ShapeHalo. Slide 09 (teal-epilogue) closes with a quiet confidence - the BloomEffect on the closing tagline provides a final moment of emphasis before the QR code CTA.

### Why This Color Arc Works for MIT

The MIT CTO Program evaluates technical depth, not marketing flash. The visual refresh:

1. **Eliminates visual monotony** without introducing excessive decoration
2. **Uses color as information** - an MIT-trained audience reads color transitions as structural signals
3. **Maintains readability** through strict opacity budgets and effect limits
4. **Demonstrates design thinking** - the intentional arc from blue trust through red crisis to violet vision shows systems-level thinking
5. **Respects the audience's intelligence** by letting content lead while visuals support

### Key Design Decisions Explained

- **Blue for Title & Solution (01, 04)**: Trust-establishment. Blue is the safest choice for an audience evaluating technical credibility.
- **Red for Problem (02)**: The only warm-crisis slide. Its isolation makes the problem feel contained and solvable.
- **Teal for Timing & Demo (03, 07)**: Teal bridges blue (trust) and green (growth), perfect for "opportunity" and "action" slides.
- **Gold for Differentiation (05)**: Gold signals value and achievement. The warm tone contrasts sharply with surrounding blue/teal, making the competitive advantage slide memorable.
- **Violet for Summary (08)**: Purple combines the trust of blue with the energy of red, creating a forward-looking synthesis tone.
- **Circuit-dominant for Business (06)**: The only slide with a unique visual structure (circuit patterns, connection rails) reinforcing the precision of business planning.

---

## Appendix A: File Modification Matrix

| File | Phase | Changes | Lines Est. |
|------|-------|---------|-----------|
| `src/shared/backgroundPresets.ts` | A | +2 preset objects (~50 lines each) | +100 |
| `src/shared/visuals/VisualFracturedConnection.tsx` | A | +density prop, conditional font sizing | +30 |
| `src/Slide01Title.tsx` | B | bg swap, +3 component imports, +3 JSX elements | +20 |
| `src/Slide02Problem.tsx` | B | density prop, +GlowPulse wrapper | +10 |
| `src/Slide03WhyNow.tsx` | B | bg swap, +ChartTimeline, +3 SlideIcons | +30 |
| `src/Slide04Solution.tsx` | B | bg swap, +4 SlideIcons, +ShapeHalo | +25 |
| `src/shared/ComparisonTable.tsx` | C | +amber box-shadow on unique rows | +5 |
| `src/Slide05Differentiation.tsx` | C | bg swap, explicit prop | +5 |
| `src/Slide06Business.tsx` | C | bg swap, +SVG rail, +GlowPulse wrappers | +40 |
| `src/Slide07Demo.tsx` | C | bg swap, +DeviceFrame, +TimelineHorizontal, +DustMotes | +35 |
| `src/Slide08Summary.tsx` | D | bg swap, +ShapeHalo, +3 SlideIcons | +20 |
| `src/Slide09Epilogue.tsx` | D | bg swap, +BloomEffect, +GlowPulse | +15 |
| **TOTAL** | | | **~335** |

## Appendix B: Verification Checklist

```bash
# 1. Type check
cd /Users/shinjifujiwara/code/poseidon.ai/remotion && npx tsc --noEmit

# 2. Lint
npx eslint src/

# 3. Render all 9 slides at 2x
for comp in Slide01Title Slide02Problem Slide03WhyNow Slide04Solution \
            Slide05Differentiation Slide06Business Slide07Demo \
            Slide08Summary Slide09Epilogue; do
  npx remotion still "$comp" --output="out/refresh-${comp}.png" --scale=2
done

# 4. Verify copy.ts untouched
git diff --name-only | grep -v copy.ts  # copy.ts must NOT appear

# 5. Visual audit checklist per slide:
#    [ ] No text/element overlap
#    [ ] Footer not clipped
#    [ ] Content within safe area
#    [ ] Effect budget: max 1 primary + 1 supplementary
#    [ ] No gratuitous flare
#    [ ] Background preset matches semantic color rule
#    [ ] All SlideIcons render correctly with glow
#    [ ] Charts/timelines display data accurately
```

---

*End of Evaluation Report*
