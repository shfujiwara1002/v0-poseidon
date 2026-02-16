# Poseidon Design System v2: GenAI-Native Architecture

> **MIT CTO Program Capstone — Technical Differentiation Document**
> A design system where GenAI is a first-class citizen in the development pipeline.

---

## Executive Summary

従来のデザインシステムは「人間の開発者がコンポーネントを組み合わせる」前提で設計されている。Poseidon Design System v2は、**AIがZod型付きコンポーネントカタログから高品質UIを生成し、品質ゲートが機械的に品質を保証する**パラダイムを構築する。

**設計方針**:
- 動くデモが最優先
- AIはコード生成時（開発時）に活用。ランタイムAI依存は排除
- 品質ゲートを拡充・強制し、誰が（AIが）書いても一定品質を保証
- Effect Presetで視覚的バリエーションを即座に切り替え可能

**研究的価値**: Zod-Schema-Driven Component Catalog + Enforced Quality Gates + Effect Preset Systemという組み合わせは、v0（コード生成）やA2UI（ランタイムプロトコル）とは異なるアプローチであり、MIT Capstoneの差別化要素となる。

---

## 1. Architecture Overview

```
┌──────────────────────────────────────────────────────────────┐
│                    POSEIDON DESIGN SYSTEM v2                  │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ① Token Foundation          ② Component Catalog             │
│  ┌──────────────────┐       ┌──────────────────────┐        │
│  │ W3C DTCG Format  │       │ Radix + Custom       │        │
│  │ CSS Custom Props  │       │ Zod-typed Props      │        │
│  │ OKLCH Colors     │       │ Storybook Documented  │        │
│  │ Tailwind v4      │       │ AI-Composable API     │        │
│  └────────┬─────────┘       └──────────┬───────────┘        │
│           │                            │                     │
│  ┌────────▼────────────────────────────▼───────────┐        │
│  │         ③ Component Registry (Zod)               │        │
│  │   Zod schemas for every component's props         │        │
│  │   AI-readable catalog (what's available + rules)  │        │
│  │   Validates generated code at build time           │        │
│  └──────────────────────┬──────────────────────────┘        │
│                         │                                    │
│  ┌──────────────────────▼──────────────────────────┐        │
│  │         ④ Quality Gate Engine                    │        │
│  │   ESLint (22 rules) │ TypeScript strict          │        │
│  │   Zod prop validation │ Token compliance          │        │
│  │   A11y audit │ Component line limit               │        │
│  │   Effect preset enforcement │ Storybook coverage  │        │
│  └──────────────────────┬──────────────────────────┘        │
│                         │                                    │
│  ┌──────────────────────▼──────────────────────────┐        │
│  │         ⑤ Effect Preset System                   │        │
│  │   5 switchable visual themes via CSS variables    │        │
│  │   minimal │ glass │ neon │ aurora │ terminal      │        │
│  │   Runtime toggle, Storybook comparison            │        │
│  └─────────────────────────────────────────────────┘        │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  ⑥ Storybook 8  │  ⑦ AI Code Generation (Claude Code)      │
└──────────────────────────────────────────────────────────────┘
```

### v1 → v2 で何が変わるか

| 観点 | v1 (現在) | v2 (提案) |
|------|----------|----------|
| **トークン** | 8,178行のTSオブジェクト | W3C DTCG JSON → 自動生成（CSS/TS/Storybook） |
| **コンポーネント** | 576ファイル、型なしprops混在 | 36コンポーネント、全てZodスキーマ付き |
| **品質保証** | 9 ESLintルール、テスト0件 | 22 ESLintルール + Storybook stories全コンポーネント |
| **視覚効果** | ハードコード | 5プリセット切り替え |
| **AI活用** | なし | Claude Codeがカタログ+スキーマを参照してコード生成 |
| **CSS** | Tailwind 3 + sRGB | Tailwind 4 + OKLCH |
| **ドキュメント** | CLAUDE.md のみ | Storybook自動ドキュメント |

---

## 2. Tech Stack

### Core (変更なし)
| Layer | Choice | Rationale |
|-------|--------|-----------|
| **Runtime** | **React 19** | React Compiler（自動memo）、`use`フック |
| **Language** | **TypeScript 5.8+** | strict mode必須 |
| **Build** | **Vite 6** | 高速、Tailwind v4プラグイン対応 |
| **Routing** | **Wouter** | 軽量、十分 |

### Styling & Tokens
| Layer | Choice | Rationale |
|-------|--------|-----------|
| **CSS** | **Tailwind CSS v4** | CSS-first `@theme`、OKLCH、5x高速ビルド |
| **Token Format** | **W3C DTCG** | 業界標準JSON、Style Dictionary v4で自動変換 |
| **Token Build** | **Style Dictionary v4** | 1ソース → CSS vars + TS types + Storybook docs |
| **Class Merge** | **clsx + tw-merge** | 実績あり |

### Component Layer
| Layer | Choice | Rationale |
|-------|--------|-----------|
| **Primitives** | **Radix UI** (unified package) | アクセシビリティ、ヘッドレス |
| **Icons** | **Lucide React** | 1500+アイコン |
| **Animation** | **Framer Motion 12** | React 19対応 |
| **Charts** | **Recharts** | 安定、十分 |
| **Validation** | **Zod** | 全コンポーネントpropsの型定義 |

### Quality & DevEx
| Layer | Choice | Rationale |
|-------|--------|-----------|
| **Component Dev** | **Storybook 8** | カタログ、a11y、visual regression |
| **Linting** | **ESLint + 22 custom rules** | デザインシステムルールの強制 |
| **Visual Testing** | **Chromatic** (optional) | コミットごとのスナップショット比較 |

### AI活用方式（開発時コード生成）
| Layer | Choice | Rationale |
|-------|--------|-----------|
| **コード生成** | **Claude Code** | スキーマ+カタログを参照して正しいコードを生成 |
| **品質検証** | **ESLint + TypeScript** | 生成コードを自動検証 |
| **ランタイムAI** | **不要** | API遅延・コスト・オフライン問題を排除 |

**AI活用フロー**:
```
開発者がClaude Codeに指示
    ↓
Claude Codeがレジストリ（Zodスキーマ+カタログ）を参照
    ↓
Zodスキーマに準拠したコンポーネントコードを生成
    ↓
ESLint 22ルール + TypeScript strictで自動検証
    ↓
Storybook storiesで視覚確認
    ↓
コミット（pre-commit hookで品質ゲート通過を強制）
```

---

## 3. Token Foundation (Layer ①)

### W3C DTCG Format (Single Source of Truth)

```
design-system/
├── tokens/
│   ├── base.tokens.json          # Primitives (colors, spacing, radii)
│   ├── semantic.tokens.json      # Role-based (surface, text, border)
│   ├── engine.tokens.json        # Engine-specific (protect, grow, execute, govern)
│   ├── motion.tokens.json        # Animation (duration, easing, springs)
│   ├── ai.tokens.json            # AI component tokens (glow, confidence rings)
│   └── effect-presets.tokens.json # Visual effect presets
├── style-dictionary.config.ts    # Build config
└── build/
    ├── css/variables.css          # → CSS Custom Properties
    ├── ts/tokens.ts               # → TypeScript constants (type-safe)
    ├── tailwind/theme.css         # → Tailwind @theme block
    └── storybook/tokens.json      # → Storybook token display
```

### Token Example (W3C DTCG)

```json
{
  "color": {
    "engine": {
      "protect": {
        "$value": "oklch(0.82 0.18 172)",
        "$type": "color",
        "$description": "Protect engine primary — Teal"
      },
      "grow": {
        "$value": "oklch(0.58 0.22 285)",
        "$type": "color",
        "$description": "Grow engine primary — Purple"
      },
      "execute": {
        "$value": "oklch(0.78 0.16 85)",
        "$type": "color",
        "$description": "Execute engine primary — Gold"
      },
      "govern": {
        "$value": "oklch(0.62 0.18 250)",
        "$type": "color",
        "$description": "Govern engine primary — Blue"
      }
    },
    "bg": {
      "deepest": {
        "$value": "oklch(0.13 0.01 260)",
        "$type": "color"
      },
      "base": {
        "$value": "oklch(0.15 0.01 260)",
        "$type": "color"
      },
      "elevated-1": {
        "$value": "oklch(0.18 0.01 260)",
        "$type": "color"
      },
      "elevated-2": {
        "$value": "oklch(0.21 0.01 260)",
        "$type": "color"
      }
    },
    "text": {
      "primary": {
        "$value": "oklch(0.98 0 0)",
        "$type": "color"
      },
      "secondary": {
        "$value": "oklch(0.82 0.01 250)",
        "$type": "color"
      },
      "muted": {
        "$value": "oklch(0.7 0.02 250)",
        "$type": "color"
      }
    }
  },
  "spacing": {
    "base": {
      "$value": "0.25rem",
      "$type": "dimension",
      "$description": "4px base unit"
    }
  },
  "radius": {
    "sm": { "$value": "0.5rem", "$type": "dimension" },
    "md": { "$value": "0.75rem", "$type": "dimension" },
    "lg": { "$value": "1rem", "$type": "dimension" },
    "xl": { "$value": "1.25rem", "$type": "dimension" }
  },
  "duration": {
    "instant": { "$value": "100ms", "$type": "duration" },
    "fast": { "$value": "150ms", "$type": "duration" },
    "normal": { "$value": "250ms", "$type": "duration" },
    "slow": { "$value": "350ms", "$type": "duration" }
  }
}
```

### Tailwind v4 Generated Theme

```css
/* Generated from tokens via Style Dictionary — DO NOT EDIT */
@import "tailwindcss";

@theme {
  --color-engine-protect: oklch(0.82 0.18 172);
  --color-engine-grow: oklch(0.58 0.22 285);
  --color-engine-execute: oklch(0.78 0.16 85);
  --color-engine-govern: oklch(0.62 0.18 250);

  --color-bg-deepest: oklch(0.13 0.01 260);
  --color-bg-base: oklch(0.15 0.01 260);
  --color-bg-elevated-1: oklch(0.18 0.01 260);
  --color-bg-elevated-2: oklch(0.21 0.01 260);

  --color-text-primary: oklch(0.98 0 0);
  --color-text-secondary: oklch(0.82 0.01 250);
  --color-text-muted: oklch(0.7 0.02 250);

  --duration-instant: 100ms;
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 350ms;

  --spacing: 0.25rem;

  --radius-sm: 0.5rem;
  --radius-md: 0.75rem;
  --radius-lg: 1rem;
  --radius-xl: 1.25rem;

  --shadow-card: 0 4px 16px oklch(0 0 0 / 0.2);
  --shadow-glow-protect: 0 0 20px oklch(0.82 0.18 172 / 0.12);
}
```

---

## 4. Component Catalog (Layer ②)

### Design Principles

1. **Zod-typed props** — 全コンポーネントにZodスキーマ必須。AIが正しいpropsを生成できる
2. **Self-contained** — 暗黙の依存なし。props + tokensで完結
3. **Declarative variants** — `variant` propで外観切り替え。カスタムCSS禁止
4. **150行制限** — 超えたら分割

### Core Components (36)

```
design-system/components/
├── primitives/          # 10 base components
│   ├── Surface.tsx      # Card/container (glass | elevated | inset)
│   ├── Button.tsx       # Primary | secondary | ghost | danger
│   ├── Badge.tsx        # Status, engine-colored
│   ├── Input.tsx        # Text input with validation states
│   ├── Toggle.tsx       # Switch toggle
│   ├── Progress.tsx     # Linear + circular
│   ├── Avatar.tsx       # User avatar + group
│   ├── Skeleton.tsx     # Loading placeholder
│   ├── Separator.tsx    # Divider
│   └── ScrollArea.tsx   # Custom scrollbar
│
├── composition/         # 10 composed components
│   ├── IconContainer.tsx    # Engine-themed icon wrapper
│   ├── SectionHeader.tsx    # Section title + action
│   ├── DetailRow.tsx        # Key-value pair with icon
│   ├── StatCard.tsx         # Metric display with sparkline
│   ├── DataTable.tsx        # Sortable, filterable table
│   ├── NavigationLink.tsx   # Premium link with transitions
│   ├── Modal.tsx            # Dialog overlay
│   ├── BottomSheet.tsx      # Mobile-first sheet
│   ├── Toast.tsx            # Notification toast
│   └── CommandPalette.tsx   # Cmd+K search
│
├── ai/                  # 5 AI-specific components
│   ├── AIInsightBanner.tsx  # GenAI explanation (replaces AIInsightBannerPro)
│   ├── AIThinking.tsx       # AI processing indicator
│   ├── ConfidenceRing.tsx   # AI confidence visualization
│   ├── FactorBar.tsx        # SHAP-style feature attribution
│   └── TypewriterText.tsx   # Animated text reveal
│
├── data-viz/            # 5 chart components
│   ├── SparkLine.tsx        # Inline trend chart
│   ├── AreaChart.tsx        # Time series
│   ├── BarChart.tsx         # Categorical comparison
│   ├── RingProgress.tsx     # Circular progress with label
│   └── HeatMap.tsx          # Density visualization
│
└── effects/             # 6 visual effect components
    ├── GlassPanel.tsx       # Glass-morphism container
    ├── GlowBorder.tsx       # Animated gradient border
    ├── NeuralBackground.tsx # Particle neural net background
    ├── PulsingOrb.tsx       # Breathing glow effect
    ├── AuroraGradient.tsx   # Northern lights gradient
    └── GridOverlay.tsx      # Surveillance/tech grid
```

### Component File Structure (per component)

```
Surface/
├── Surface.tsx            # Implementation (≤150 lines)
├── Surface.schema.ts      # Zod schema for props
├── Surface.stories.tsx    # Storybook stories
└── index.ts               # Re-export
```

### Zod Schema Example

```typescript
// Surface.schema.ts
import { z } from 'zod'

export const SurfacePropsSchema = z.object({
  variant: z.enum(['glass', 'elevated', 'inset', 'transparent']).default('glass'),
  engine: z.enum(['protect', 'grow', 'execute', 'govern']).optional(),
  glow: z.boolean().default(false),
  interactive: z.boolean().default(false),
  padding: z.enum(['none', 'sm', 'md', 'lg']).default('md'),
  className: z.string().optional(),
  children: z.any(),
})

export type SurfaceProps = z.infer<typeof SurfacePropsSchema>
```

---

## 5. Component Registry (Layer ③)

AI（Claude Code）がコード生成時に参照するカタログ。ランタイムレンダラーではなく、開発時の「コンポーネント辞書」。

```typescript
// design-system/registry/catalog.ts
// This file is auto-generated from component schemas.
// Claude Code reads this to understand available components.

export const componentCatalog = {
  Surface: {
    description: 'Card/container with glass-morphism support',
    category: 'primitive',
    schema: 'SurfacePropsSchema',
    variants: ['glass', 'elevated', 'inset', 'transparent'],
    engines: true, // Supports engine prop
    usage: '<Surface variant="glass" engine="protect" padding="md">...</Surface>',
  },
  StatCard: {
    description: 'Metric display with optional sparkline and trend indicator',
    category: 'composition',
    schema: 'StatCardPropsSchema',
    engines: true,
    usage: '<StatCard title="Fraud Alerts" value={12} engine="protect" icon="Shield" />',
  },
  AIInsightBanner: {
    description: 'GenAI explanation display. MUST be first child after header.',
    category: 'ai',
    schema: 'AIInsightBannerPropsSchema',
    engines: true,
    rules: ['Must be positioned at top of widget (XAI rule)'],
    usage: '<AIInsightBanner message="..." engine="protect" confidence={87} />',
  },
  // ... 33 more components
} as const
```

---

## 6. Quality Gate Engine (Layer ④)

### Build-Time Quality Gates

```
Developer / Claude Code generates code
    │
    ├── Gate 1: TypeScript strict
    │   └── No `any`, no unused vars, strict null checks
    │
    ├── Gate 2: ESLint (22 custom rules)
    │   └── Token compliance, component rules, a11y
    │
    ├── Gate 3: Zod Prop Validation
    │   └── All component props match their schema
    │
    ├── Gate 4: Component Structure
    │   ├── ≤150 lines per file
    │   ├── Storybook story exists
    │   └── Zod schema exists
    │
    ├── Gate 5: Design Token Compliance
    │   ├── No hardcoded colors
    │   ├── No inline animation values
    │   └── Effect presets only (no custom effects)
    │
    ├── Gate 6: Composition Rules
    │   ├── AIInsightBanner first after header
    │   ├── Engine color consistency
    │   └── NavigationLink (no raw Link)
    │
    └── Gate 7: Accessibility
        ├── All interactive elements have aria labels
        └── Color contrast meets WCAG AA
```

### ESLint Rules (22 total)

**Token & Style (6 rules)**:
1. `no-hardcoded-colors` — Hex/rgb/hsl禁止、トークンのみ
2. `use-motion-tokens` — インラインduration/spring禁止
3. `no-inline-animation` — アニメーション値はトークンから
4. `effect-preset-only` — エフェクトはプリセットシステム経由
5. `token-import-only` — トークン内部からのimport禁止
6. `engine-color-consistency` — エンジン色の混在禁止

**Component Structure (6 rules)**:
7. `surface-over-card` — Surfaceコンポーネント使用を強制
8. `icon-layer-compliance` — IconContainer使用を強制
9. `no-raw-button` — Buttonコンポーネント使用を推奨
10. `no-raw-link` — NavigationLink使用を強制
11. `max-component-lines` — 150行制限
12. `no-deprecated-component` — v1コンポーネント使用禁止

**AI & XAI (3 rules)**:
13. `ai-insight-banner-required` — GenAIコンテンツにAIInsightBanner必須
14. `xai-message-positioning` — AI表示は必ずウィジェット上部
15. `hero-component-pattern` — Heroコンポーネントの構造規則

**Architecture (4 rules)**:
16. `engine-page-layout` — ページレイアウト構造の強制
17. `require-zod-props` — エクスポートコンポーネントにZodスキーマ必須
18. `registry-required` — 新コンポーネントはレジストリ登録必須
19. `storybook-story-required` — 全コンポーネントにstoryファイル必須

**Accessibility (3 rules)**:
20. `a11y-labels-required` — インタラクティブ要素にaria-label必須
21. `a11y-color-contrast` — コントラスト比検証
22. `a11y-focus-visible` — focus-visible スタイル必須

### npm scripts

```bash
# Individual checks
npm run check              # TypeScript type checking
npm run lint               # ESLint 22 rules (max-warnings 100)
npm run lint:strict        # ESLint 22 rules (max-warnings 0)
npm run check:tokens       # Token compliance scan
npm run check:icons        # Icon layer compliance
npm run check:structure    # Component file structure (lines, schema, story)

# Combined
npm run quality            # All gates: check + lint:strict + check:tokens + check:icons + check:structure
npm run quality:report     # Generate HTML compliance report

# Storybook
npm run storybook          # Start Storybook dev server
npm run storybook:build    # Build static Storybook
npm run storybook:test     # Run Storybook interaction tests
```

---

## 7. Effect Preset System (Layer ⑤)

### 5 Visual Presets

| Preset | Surface | Glow | Glass | Animation | Border | Use Case |
|--------|---------|------|-------|-----------|--------|----------|
| **minimal** | elevated | off | off | fade | solid | Clean professional |
| **glass** | glass | off | on | fadeUp | glass | iOS-inspired |
| **neon** | glass | on | on | fadeUp | glow | Current Poseidon style |
| **aurora** | glass | on | on | stagger | aurora | Maximum visual impact |
| **terminal** | inset | off | off | none | solid | Bloomberg-style dense |

### Implementation

```css
/* effect-presets.css — Generated from tokens */

/* Default: neon */
:root {
  --surface-bg: oklch(0.18 0.01 260 / 0.6);
  --surface-border: oklch(1 0 0 / 0.08);
  --surface-blur: 12px;
  --glow-opacity: 0.12;
  --animation-entry: fadeUp;
}

[data-effect-preset="minimal"] {
  --surface-bg: oklch(0.18 0.01 260);
  --surface-border: oklch(1 0 0 / 0.12);
  --surface-blur: 0px;
  --glow-opacity: 0;
  --animation-entry: fade;
}

[data-effect-preset="glass"] {
  --surface-bg: oklch(0.18 0.01 260 / 0.4);
  --surface-border: oklch(1 0 0 / 0.06);
  --surface-blur: 16px;
  --glow-opacity: 0;
  --animation-entry: fadeUp;
}

[data-effect-preset="aurora"] {
  --surface-bg: oklch(0.18 0.01 260 / 0.5);
  --surface-border: oklch(1 0 0 / 0.1);
  --surface-blur: 20px;
  --glow-opacity: 0.15;
  --animation-entry: stagger;
}

[data-effect-preset="terminal"] {
  --surface-bg: oklch(0.12 0.01 260);
  --surface-border: oklch(1 0 0 / 0.15);
  --surface-blur: 0px;
  --glow-opacity: 0;
  --animation-entry: none;
}
```

### React Provider

```typescript
// design-system/providers/EffectProvider.tsx
import { createContext, useContext, useEffect, type ReactNode } from 'react'

export type EffectPreset = 'minimal' | 'glass' | 'neon' | 'aurora' | 'terminal'

const EffectContext = createContext<{
  preset: EffectPreset
  setPreset: (p: EffectPreset) => void
}>({ preset: 'neon', setPreset: () => {} })

export function EffectProvider({
  preset: initialPreset = 'neon',
  children,
}: {
  preset?: EffectPreset
  children: ReactNode
}) {
  const [preset, setPreset] = useState<EffectPreset>(initialPreset)

  useEffect(() => {
    document.documentElement.dataset.effectPreset = preset
  }, [preset])

  return (
    <EffectContext.Provider value={{ preset, setPreset }}>
      {children}
    </EffectContext.Provider>
  )
}

export const useEffectPreset = () => useContext(EffectContext)
```

### Storybook Integration

Storybookのツールバーにプリセット切り替えボタンを追加。全コンポーネントを各プリセットで即座にプレビュー可能。

---

## 8. Storybook Configuration

### Structure

```
design-system/.storybook/
├── main.ts                    # Storybook config
├── preview.ts                 # Global decorators (EffectProvider, tokens)
├── poseidon-theme.ts          # Custom dark theme matching Poseidon
└── manager.ts                 # Sidebar organization
```

### Addons

```typescript
// .storybook/main.ts
export default {
  addons: [
    '@storybook/addon-essentials',     // Controls, docs, viewport
    '@storybook/addon-a11y',           // WCAG compliance per story
    'storybook-addon-performance',     // Render performance
  ],
}
```

### Global Decorator (Effect Preset Toggle)

```typescript
// .storybook/preview.ts
export const decorators = [
  (Story, context) => {
    const preset = context.globals.effectPreset || 'neon'
    return (
      <EffectProvider preset={preset}>
        <div className="bg-bg-base text-text-primary p-8 min-h-screen">
          <Story />
        </div>
      </EffectProvider>
    )
  },
]

export const globalTypes = {
  effectPreset: {
    description: 'Visual effect preset',
    toolbar: {
      title: 'Effect',
      items: ['minimal', 'glass', 'neon', 'aurora', 'terminal'],
      dynamicTitle: true,
    },
  },
}
```

---

## 9. Directory Structure

```
Poseidon.Ai/
├── design-system/                    # ★ Standalone design system
│   ├── tokens/
│   │   ├── base.tokens.json          # W3C DTCG primitives
│   │   ├── semantic.tokens.json      # Semantic mappings
│   │   ├── engine.tokens.json        # Engine-specific
│   │   ├── motion.tokens.json        # Animation
│   │   └── effect-presets.tokens.json # Visual effects
│   │
│   ├── components/
│   │   ├── primitives/               # 10 base components
│   │   │   ├── Surface/
│   │   │   │   ├── Surface.tsx
│   │   │   │   ├── Surface.schema.ts
│   │   │   │   ├── Surface.stories.tsx
│   │   │   │   └── index.ts
│   │   │   └── ...
│   │   ├── composition/              # 10 composed components
│   │   ├── ai/                       # 5 AI components
│   │   ├── data-viz/                 # 5 chart components
│   │   └── effects/                  # 6 visual effect components
│   │
│   ├── registry/
│   │   ├── catalog.ts                # AI-readable component catalog
│   │   └── schemas.ts                # Re-exported Zod schemas
│   │
│   ├── quality/
│   │   ├── eslint-plugin-poseidon/   # 22 custom ESLint rules
│   │   ├── check-tokens.ts           # Token compliance scanner
│   │   ├── check-structure.ts        # Component structure validator
│   │   └── compliance-report.ts      # HTML report generator
│   │
│   ├── providers/
│   │   ├── DesignSystemProvider.tsx   # Root provider
│   │   └── EffectProvider.tsx         # Effect preset context
│   │
│   ├── css/
│   │   ├── theme.css                 # Generated Tailwind @theme
│   │   └── effect-presets.css        # Preset CSS variables
│   │
│   ├── .storybook/                   # Storybook config
│   ├── style-dictionary.config.ts    # Token build pipeline
│   └── package.json
│
├── client/                           # Application (consumes design-system)
│   └── src/
│       ├── pages/
│       ├── features/
│       └── ...
│
├── server/                           # Backend
└── shared/                           # Shared types
```

---

## 10. Migration Strategy

### Phase 1: Foundation
- Token system: W3C DTCG files + Style Dictionary build pipeline
- Tailwind v4 setup (CSS-first `@theme`)
- Storybook 8 with Poseidon dark theme + effect preset toolbar
- ESLint plugin skeleton (22 rule stubs)

### Phase 2: Core Components
- 10 primitive components (Surface, Button, Badge, Input, etc.)
- Each with: Zod schema + Storybook story + 5 effect preset variants
- Effect preset system (CSS variables + EffectProvider)

### Phase 3: Composition & AI Components
- 10 composition components (StatCard, DataTable, NavigationLink, etc.)
- 5 AI components (AIInsightBanner, ConfidenceRing, etc.)
- Component registry catalog (AI-readable)

### Phase 4: Data Viz & Effects
- 5 chart components
- 6 visual effect components
- Quality gate engine (all 22 ESLint rules active)

### Phase 5: Application Migration
- Dashboard page (showcase all presets)
- Engine hub pages
- Progressive migration of remaining pages

---

## 11. Research Contribution

> **Thesis**: A Zod-schema-driven component catalog with enforced quality gates enables AI code generation that reliably produces MIT Capstone-quality UI, while an effect preset system allows rapid visual experimentation without code changes.

**Contributions:**
1. **Schema-Driven Component Catalog** — ZodスキーマによりコンポーネントのAPI契約を機械可読に定義
2. **22-Rule Quality Gate System** — AI生成コードの品質を機械的に保証する多層ゲート
3. **Effect Preset Architecture** — CSS変数ベースで5つの視覚テーマを即座に切り替え
4. **W3C DTCG Token Pipeline** — 業界標準トークンからCSS/TS/Storybookを自動生成

**既存アプローチとの差別化:**
| Approach | Method | Poseidon v2 |
|----------|--------|-------------|
| v0 (Vercel) | ランタイムでコード生成 | 開発時にスキーマ準拠コード生成 |
| A2UI (Google) | ランタイムJSONプロトコル | ビルドタイム品質検証 |
| Ghost (Airbnb) | モバイルSDUI | Web-first + Effect Preset |
| Shadcn/ui | コピペコンポーネント | Zodスキーマ + 品質ゲート付き |
