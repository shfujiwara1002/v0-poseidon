# Compound Components

Source: `src/components/PageShell/`, `src/components/Card/`, `src/components/Section/`, `src/components/Grid/`, `src/components/Button.tsx`

---

## Pattern

The Poseidon design system uses the **Compound Component** pattern throughout its UI layer. The technique combines two React primitives:

1. **React Context** -- A parent component creates a context provider, exposing shared state (tone, variant, layout mode) to all descendants. Child sub-components consume the context via a custom hook (`useCard()`, `useSection()`, `usePageShell()`), inheriting configuration without prop drilling.

2. **`Object.assign` for `Component.SubComponent` API** -- The root component function (or `forwardRef`) is assigned its sub-components as static properties using `Object.assign(RootComponent, { Header, Content, ... })`. This yields the familiar dot-notation JSX syntax (`<Card.Header>`, `<Section.DataRows>`) while keeping the root importable as a single symbol.

```tsx
// Canonical pattern (from Card.tsx)
const CardRoot = forwardRef<HTMLElement, CardProps>(({ variant, tone, children, ...props }, ref) => (
  <CardContext.Provider value={{ tone, variant }}>
    <Tag ref={ref} className={cn(cardCva({ variant, tone }))} {...props}>
      {children}
    </Tag>
  </CardContext.Provider>
));

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Content: CardContent,
  Footer: CardFooter,
  Actions: CardActions,
  Meta: CardMeta,
});
```

All compound components in this system follow the same structure: a `forwardRef` root that wraps children in a context provider, plus `forwardRef` sub-components that consume the context and merge classes via `cn()` (a `clsx`/`twMerge` utility).

---

## PageShell

Source: `src/components/PageShell/PageShell.tsx`

PageShell is the top-level layout scaffold. It wraps every screen, providing the nav, hero zone, KPI grid, main feed, decision rail, and footer. Unlike Card/Section/Grid, PageShell does not use `Object.assign` -- its sub-components are separate named exports composed internally by the root component.

### PageShellBaseProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `slug` | `string` | -- (required) | URL-safe screen identifier, used for CSS scoping (`engine-page--{slug}`) and slot-guard error messages |
| `contract` | `ScreenContract` | -- (required) | The screen contract object; its `id` is set as `data-screen-contract` and `requiredSlots` are validated by SlotGuard |
| `primaryFeed` | `React.ReactNode` | -- (required) | Main content area, rendered in `<main data-slot="primary_feed">` |
| `decisionRail` | `React.ReactNode` | `undefined` | Right-hand sidebar content, rendered in `<aside data-slot="decision_rail">`. Hidden when `fullWidth` is `true` |
| `rail` | `React.ReactNode` | `undefined` | Optional horizontal strip between hero and main content (`command-grid-strip`) |
| `governControls` | `React.ReactNode` | `undefined` | Footer slot content. Falls back to `<GovernFooter />` if omitted |
| `fullWidth` | `boolean` | `false` | When `true`, hides the decision rail aside and adds `engine-command--full-width` class |
| `layout` | `ShellLayout` | `'engine'` | `'dashboard'` or `'engine'` -- selects CSS class prefix for all layout zones |
| `semanticMode` | `SemanticMode` | `'state-first'` | `'state-first'` or `'engine-first'` -- set as `data-semantic-mode` attribute |

### PageShellProps (Discriminated Union)

`PageShellProps` is a discriminated union on `heroVariant`. Each variant constrains the `hero` prop shape:

| Union Member | `heroVariant` | `hero.proofLine` | Notes |
|---|---|---|---|
| `CommandPageShellProps` | `'command'` (default) | **Required** `{ claim, evidence, source }` | Default variant when `heroVariant` is omitted |
| `FocusedPageShellProps` | `'focused'` | **Required** `{ claim, evidence, source }` | |
| `AnalyticalPageShellProps` | `'analytical'` | **Required** `{ claim, evidence, source }` | |
| `EditorialPageShellProps` | `'editorial'` | Optional | Proof line is not mandatory |
| `MinimalPageShellProps` | `'minimal'` | Optional | Proof line is not mandatory |

### HeroConfig

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `kicker` | `string` | Yes | Small label above the headline |
| `headline` | `string` | Yes | Primary hero heading |
| `subline` | `string` | Yes | Secondary text below the headline |
| `proofLine` | `{ claim: string; evidence: string; source: string }` | No | Evidence statement; required by command/focused/analytical variants |
| `heroAction` | `{ label: string; text: string; cta?: { label: string; to: string } }` | No | Call-to-action block in the hero |
| `freshness` | `Date` | Yes | Data freshness timestamp |
| `kpis` | `KPIConfig[]` | Yes | Array of KPI cards to render in the KPI grid (0-6 items) |
| `description` | `string` | No | Extended description text |
| `statSummary` | `string` | No | Summary stat text |
| `showProofLine` | `boolean` | No | Toggle proof-line visibility |
| `showTransitionCue` | `boolean` | No | Toggle transition cue visibility |

### KPIConfig

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `label` | `string` | Yes | KPI label text (also used as React key) |
| `value` | `string` | Yes | Formatted display value |
| `delta` | `string` | No | Change indicator (e.g. `"+12%"`) |
| `definition` | `string` | Yes | Tooltip/accessible definition of the metric |
| `accent` | `AccentColor` | No | One of `'cyan' \| 'teal' \| 'violet' \| 'amber' \| 'blue' \| 'red'` |
| `sparklineData` | `Array<{ value: number }>` | No | Data points for inline sparkline chart |
| `sparklineColor` | `string` | No | CSS color for the sparkline stroke |

### Hero Variants

| Variant | Component | proofLine | Typical Use |
|---------|-----------|-----------|-------------|
| `command` | `HeroCommand` | Required | Default -- full command-center hero with proof statement |
| `focused` | `HeroFocused` | Required | Single-entity focus view with evidence |
| `analytical` | `HeroAnalytical` | Required | Data-heavy analytical view with charts |
| `editorial` | `HeroEditorial` | Optional | Narrative/editorial content, softer layout |
| `minimal` | `HeroMinimal` | Optional | Reduced chrome, minimal hero zone |

The hero variant is resolved in `PageShellHero` via a `VARIANT_MAP: Record<HeroVariant, React.ComponentType>` lookup. Each variant component reads hero data from context via `usePageShell()`.

### Layout Modes

| Mode | CSS Prefix | Grid Classes | Description |
|------|------------|--------------|-------------|
| `dashboard` | `dashboard-` | `dashboard-command`, `dashboard-pulse`, `dashboard-main-col`, `dashboard-side-col` | Wide dashboard grid optimized for monitoring |
| `engine` | `engine-` | `engine-command`, `engine-pulse`, `engine-main-col`, `engine-side-col` | Engine-style layout for workflow screens |

When `fullWidth` is true and layout is `engine`, the root class becomes `engine-command engine-command--full-width`.

### Semantic Modes

| Mode | `data-semantic-mode` | Description |
|------|---------------------|-------------|
| `state-first` | `state-first` | Default. State/status information leads the visual hierarchy |
| `engine-first` | `engine-first` | Engine/action controls lead the visual hierarchy |

### Sub-Components

#### `PageShellHero`

Source: `src/components/PageShell/PageShellHero.tsx`

| Prop | Type | Description |
|------|------|-------------|
| `variant` | `HeroVariant` | Selects which hero variant component to render |

Internally maps `variant` to one of five components (`HeroCommand`, `HeroFocused`, `HeroAnalytical`, `HeroEditorial`, `HeroMinimal`) and renders it. Each variant component reads hero data from `usePageShell()`.

#### `PageShellKPIGrid`

Source: `src/components/PageShell/PageShellKPIGrid.tsx`

No external props. Reads `hero.kpis` and `layout` from `usePageShell()` context.

Auto-layout logic:

| KPI Count | Grid Layout Class | Behavior |
|-----------|------------------|----------|
| 0 | `kpi-layout--0` | Hidden (`aria-hidden="true"`) |
| 1-2 | `kpi-layout--1-2` | Single row |
| 3 | `kpi-layout--3` | 3-column row |
| 4 | `kpi-layout--4` | 2x2 grid |
| 5 | `kpi-layout--5` | 3-col + 2-col rows |
| 6 | `kpi-layout--6` | 3x2 grid |

Renders a `<KPIContractCard>` for each entry in `kpis`, passing all `KPIConfig` fields as props.

#### `PageShellSlotGuard`

Source: `src/components/PageShell/PageShellSlotGuard.tsx`

No external props. Renders nothing visible (a hidden `<div>` with `display: none`). Side-effect-only validator that runs in development mode (`import.meta.env.PROD` check).

Behavior:
- Reads `contract.requiredSlots` and `slug` from `usePageShell()`
- Walks up to the `.entry-screen` ancestor and checks for `[data-slot="..."]` elements
- **Interactive slots** (`consent_scope`, `action_preview`, `factors_dropdown`, `decision_rail`): `console.error` if missing or empty (no text content and no interactive child elements)
- **Non-interactive slots**: `console.warn` if missing

### Context: `usePageShell()`

```tsx
interface PageShellContextValue {
  slug: string;
  contract: ScreenContract;
  hero: HeroConfig;
  heroVariant: HeroVariant;
  layout: ShellLayout;
  fullWidth: boolean;
}
```

Throws `Error('usePageShell must be used within <PageShell>')` when called outside the provider.

---

## Card

Source: `src/components/Card/Card.tsx`

### CardProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `CardVariant` | `'default'` | Visual variant; determines CVA class mapping |
| `tone` | `CardTone` | `'neutral'` | Semantic color tone; used in compound variants and propagated via context |
| `as` | `'article' \| 'div' \| 'section'` | `'article'` | Polymorphic root element tag |
| `className` | `string` | `undefined` | Additional CSS classes merged via `cn()` |
| `children` | `React.ReactNode` | -- | Card content (typically sub-components) |
| ...rest | `React.HTMLAttributes<HTMLElement>` | -- | All standard HTML attributes are forwarded |

### CardTone

```ts
type CardTone = 'healthy' | 'warning' | 'critical' | 'primary' | 'neutral';
```

| Value | Description |
|-------|-------------|
| `healthy` | Positive/success state |
| `warning` | Warning/caution state |
| `critical` | Error/critical state |
| `primary` | Default brand accent |
| `neutral` | No semantic coloring (default) |

### CardVariant (11 variants)

```ts
type CardVariant =
  | 'default' | 'alert' | 'action' | 'insight' | 'audit'
  | 'rule' | 'control' | 'metric' | 'stat' | 'kpi' | 'glass';
```

| Variant | CVA Class | Description |
|---------|-----------|-------------|
| `default` | _(none)_ | Base card with `engine-card` only |
| `alert` | `signal-evidence-card` | Alert/signal evidence card |
| `action` | `action-queue-card` | Action queue card (has compound variants) |
| `insight` | `subscription-leak-card` | Insight/subscription card |
| `audit` | `audit-log-card` | Audit log entry card |
| `rule` | `rule-card` | Rule definition card |
| `control` | `privacy-control-card` | Privacy control card |
| `metric` | _(none)_ | Generic metric card |
| `stat` | `stat-card stat-card--md` | Statistics card |
| `kpi` | `stat-card stat-card--md kpi-contract-card` | KPI contract card |
| `glass` | _(none)_ | Glassmorphism card |

### CVA Base Class and Compound Variants

Base class: `engine-card`

| Compound Variant | Condition | Additional Class |
|-----------------|-----------|-----------------|
| `action` + `critical` | `variant: 'action', tone: 'critical'` | `action-queue-card--critical` |
| `action` + `warning` | `variant: 'action', tone: 'warning'` | `action-queue-card--warning` |
| `action` + `primary` | `variant: 'action', tone: 'primary'` | `action-queue-card--primary` |
| `action` + `healthy` | `variant: 'action', tone: 'healthy'` | `action-queue-card--healthy` |

Default variants: `variant: 'default'`, `tone: 'neutral'`.

### Sub-Components

All sub-components are `forwardRef` components that accept standard HTML attributes plus any additional typed props.

#### `Card.Header`

| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | Merged via `cn()` |
| `children` | `React.ReactNode` | Header content |
| ...rest | `React.HTMLAttributes<HTMLElement>` | Forwarded to `<header>` |

Ref type: `HTMLElement`

#### `Card.Content`

| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | Merged via `cn()` |
| `children` | `React.ReactNode` | Body content |
| ...rest | `React.HTMLAttributes<HTMLDivElement>` | Forwarded to `<div>` |

Ref type: `HTMLDivElement`

#### `Card.Footer`

| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | Merged via `cn()` |
| `children` | `React.ReactNode` | Footer content |
| ...rest | `React.HTMLAttributes<HTMLElement>` | Forwarded to `<footer>` |

Ref type: `HTMLElement`

#### `Card.Actions`

| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | Merged with base class `mission-dual-actions` via `cn()` |
| `children` | `React.ReactNode` | Action buttons |
| ...rest | `React.HTMLAttributes<HTMLDivElement>` | Forwarded to `<div>` |

Ref type: `HTMLDivElement`. Base class: `mission-dual-actions`.

#### `Card.Meta`

| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | Merged via `cn()` |
| `children` | `React.ReactNode` | Metadata content |
| ...rest | `React.HTMLAttributes<HTMLDivElement>` | Forwarded to `<div>` |

Ref type: `HTMLDivElement`

### Context: `useCard()`

```tsx
interface CardContextValue {
  tone: CardTone;
  variant: CardVariant;
}
```

Default context (when no provider): `{ tone: 'neutral', variant: 'default' }`. Does not throw when used outside a Card -- returns the default value.

---

## Section

Source: `src/components/Section/Section.tsx`

### SectionProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'detail' \| 'dashboard' \| 'settings'` | `'default'` | Section visual variant |
| `tone` | `MissionTone` | `'primary'` | Semantic tone propagated via context to child sub-components |
| `as` | `'section' \| 'div' \| 'article'` | `'section'` | Polymorphic root element tag |
| `className` | `string` | `undefined` | Additional CSS classes merged via `cn()` |
| `children` | `React.ReactNode` | -- | Section content |
| ...rest | `React.HTMLAttributes<HTMLElement>` | -- | Forwarded to root element |

`MissionTone` is defined as: `'primary' | 'healthy' | 'warning' | 'critical' | 'neutral'`

### Section Variants (4 values)

| Variant | CVA Class | Description |
|---------|-----------|-------------|
| `default` | _(none)_ | Base section, no additional class |
| `detail` | `mission-detail-section` | Detail/drill-down section |
| `dashboard` | `dashboard-section` | Dashboard-specific section layout |
| `settings` | `settings-section` | Settings/configuration section |

### Sub-Components (8)

#### `Section.Header`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | Yes | Section heading text |
| `message` | `string` | No | Explanatory paragraph below the title |
| `contextCue` | `string` | No | Small context cue label |
| `icon` | `React.ReactNode` | No | Leading icon element |
| `right` | `React.ReactNode` | No | Right-aligned content (actions, badges) |
| `className` | `string` | No | Merged via `cn()` |
| ...rest | `React.HTMLAttributes<HTMLElement>` | -- | Forwarded to `<header>` |

Renders `data-widget="MissionSectionHeader"`. Base class: `mission-section-header`.

#### `Section.DataRows`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `items` | `DataRowItem[]` | Yes | Array of row data objects |
| `className` | `string` | No | Merged via `cn()` |
| ...rest | `React.HTMLAttributes<HTMLDivElement>` | -- | Forwarded to `<div>` |

Base class: `mission-data-rows`. Each row inherits `tone` from `SectionContext` if `item.tone` is not set. Rows with a `meta` value render a `<MissionStatusChip>`.

#### `Section.ActionList`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `items` | `ActionListItem[]` | Yes | Array of action items |
| `className` | `string` | No | Merged via `cn()` |
| ...rest | `React.HTMLAttributes<HTMLUListElement>` | -- | Forwarded to `<ul>` |

Renders `data-widget="MissionActionList"`. Base class: `dashboard-action-list`. Inherits tone from context.

#### `Section.MetricTiles`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `items` | `MetricTileItem[]` | Yes | Array of metric tile data |
| `className` | `string` | No | Merged via `cn()` |
| ...rest | `React.HTMLAttributes<HTMLDivElement>` | -- | Forwarded to `<div>` |

Base class: `mission-metric-tiles`. Each tile falls back to `tone: 'primary'` if `item.tone` is not set.

#### `Section.Evidence`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | Yes | Evidence panel heading |
| `summary` | `string` | Yes | Evidence body text |
| `meta` | `string` | No | Status chip label |
| `tone` | `MissionTone` | No | Overrides section-level tone |
| `className` | `string` | No | Merged via `cn()` |
| ...rest | `React.HTMLAttributes<HTMLElement>` | -- | Forwarded to `<section>` |

Base class: `mission-evidence-panel`. Falls back to `SectionContext.tone` if own `tone` prop is omitted.

#### `Section.EmptyState`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | Yes | Empty state heading |
| `description` | `string` | Yes | Explanatory text |
| `action` | `React.ReactNode` | No | Optional CTA element |
| `className` | `string` | No | Merged via `cn()` |
| ...rest | `React.HTMLAttributes<HTMLElement>` | -- | Forwarded to `<article>` |

Base class: `mission-empty-state`. Does not consume section context.

#### `Section.MetadataStrip`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `items` | `React.ReactNode[]` | Yes | Array of metadata chip elements |
| `compact` | `boolean` | No (default `false`) | Adds `entry-chip-row--compact` class |
| `className` | `string` | No | Merged via `cn()` |
| ...rest | `React.HTMLAttributes<HTMLDivElement>` | -- | Forwarded to `<div>` |

Renders `data-widget="MissionMetadataStrip"`. Base class: `entry-chip-row`.

#### `Section.Actions`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | No | Merged via `cn()` |
| `children` | `React.ReactNode` | -- | Action button content |
| ...rest | `React.HTMLAttributes<HTMLDivElement>` | -- | Forwarded to `<div>` |

Base class: `mission-dual-actions`.

### Key Interfaces

#### DataRowItem

```ts
interface DataRowItem {
  id: string;
  title: string;
  value?: string;
  detail?: string;
  meta?: string;
  tone?: MissionTone;
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | Yes | Unique row identifier (used as React key) |
| `title` | `string` | Yes | Primary row text |
| `value` | `string` | No | Right-side value display |
| `detail` | `string` | No | Secondary detail text |
| `meta` | `string` | No | Status chip label (triggers `<MissionStatusChip>`) |
| `tone` | `MissionTone` | No | Per-row tone override (falls back to section tone) |

#### ActionListItem

```ts
interface ActionListItem {
  title: string;
  meta?: string;
  tone?: MissionTone;
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | `string` | Yes | Action item text |
| `meta` | `string` | No | Status chip label |
| `tone` | `MissionTone` | No | Per-item tone override |

#### MetricTileItem

```ts
interface MetricTileItem {
  id: string;
  label: string;
  value: string;
  meta?: string;
  tone?: MissionTone;
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | Yes | Unique tile identifier |
| `label` | `string` | Yes | Metric label (rendered as `<small>`) |
| `value` | `string` | Yes | Metric value (rendered as `<strong>`) |
| `meta` | `string` | No | Additional metadata text |
| `tone` | `MissionTone` | No | Per-tile tone (defaults to `'primary'`) |

### Context: `useSection()`

```tsx
interface SectionContextValue {
  tone: MissionTone;
}
```

Default context (when no provider): `{ tone: 'primary' }`. Does not throw when used outside a Section.

---

## Grid

Source: `src/components/Grid/Grid.tsx`

### GridProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `1 \| 2 \| 3 \| 4 \| 'auto'` | `'auto'` | Fixed column count or `'auto'` for responsive `auto-fit` |
| `gap` | `'none' \| 'compact' \| 'normal' \| 'spacious'` | `'normal'` | Gap spacing between grid items |
| `className` | `string` | `undefined` | Additional CSS classes merged via `cn()` |
| `children` | `React.ReactNode` | -- | Grid items |
| ...rest | `React.HTMLAttributes<HTMLDivElement>` | -- | Forwarded to `<div>` |

Ref type: `HTMLDivElement`

### Columns

| Value | CVA Class | Description |
|-------|-----------|-------------|
| `1` | `poseidon-grid--1` | Single column |
| `2` | `poseidon-grid--2` | Two columns |
| `3` | `poseidon-grid--3` | Three columns |
| `4` | `poseidon-grid--4` | Four columns |
| `auto` | `poseidon-grid--auto` | Responsive auto-fit (default) |

### Gap

| Value | CVA Class | Description |
|-------|-----------|-------------|
| `none` | `poseidon-grid--gap-none` | No gap |
| `compact` | `poseidon-grid--gap-compact` | Tight spacing |
| `normal` | _(none -- inherits base)_ | Standard spacing (default) |
| `spacious` | `poseidon-grid--gap-spacious` | Wide spacing |

Base class: `poseidon-grid`

### Grid.Item

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `span` | `1 \| 2 \| 3 \| 4 \| 'full'` | `undefined` | Number of columns to span |
| `className` | `string` | `undefined` | Additional CSS classes merged via `cn()` |
| `children` | `React.ReactNode` | -- | Item content |
| ...rest | `React.HTMLAttributes<HTMLDivElement>` | -- | Forwarded to `<div>` |

Ref type: `HTMLDivElement`

| Span Value | Class Applied |
|------------|--------------|
| `1` | `poseidon-grid-item--span-1` |
| `2` | `poseidon-grid-item--span-2` |
| `3` | `poseidon-grid-item--span-3` |
| `4` | `poseidon-grid-item--span-4` |
| `'full'` | `poseidon-grid-item--full` |
| `undefined` | _(no span class)_ |

---

## Button

Source: `src/components/Button.tsx`

### ButtonProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'ghost' \| 'soft'` | `'ghost'` | Visual variant |
| `size` | `'md' \| 'lg'` | `'md'` | Button size |
| `to` | `string` | `undefined` | Internal route path -- renders as `<Link>` |
| `href` | `string` | `undefined` | External URL -- renders as `<a>` |
| `loading` | `boolean` | `undefined` | Loading state; shows spinner overlay |
| `disabled` | `boolean` | `undefined` | Disabled state |
| `className` | `string` | `undefined` | Additional CSS classes |
| `children` | `React.ReactNode` | -- (required) | Button label content |
| ...rest | `React.ButtonHTMLAttributes<HTMLButtonElement>` | -- | Forwarded to `<button>` when rendering as button |

The component is wrapped in `React.memo`.

### Variants (3)

| Variant | Tailwind Classes |
|---------|-----------------|
| `ghost` | `border-white/10 bg-white/[0.02] text-white/70 hover:border-white/30 hover:text-white hover:bg-white/[0.06]` |
| `primary` | `bg-gradient-to-br from-[#1ae3c7] to-[#00c6ff] text-[#04141a] font-semibold shadow-[0_12px_32px_rgba(0,198,255,0.2)] hover:shadow-[0_16px_40px_rgba(0,198,255,0.35)]` |
| `soft` | `bg-accent-teal/10 border-accent-teal/30 text-white hover:bg-accent-teal/20 hover:shadow-[0_0_16px_rgba(21,225,194,0.12)]` |

### Sizes (2)

| Size | Tailwind Classes |
|------|-----------------|
| `md` | `px-4 py-2.5 text-base` |
| `lg` | `px-6 py-3.5 text-lg` |

### Base Classes (all variants)

```
inline-flex items-center gap-2 rounded-full border border-transparent
transition-all duration-fast ease-standard cursor-pointer no-underline min-h-[44px] relative
```

### Link/href Polymorphism

The rendered element depends on the `to`, `href`, `disabled`, and `loading` props:

| Condition | Rendered Element | Notes |
|-----------|-----------------|-------|
| `to` is set, not disabled, not loading | `<Link to={to}>` | Internal router navigation |
| `href` is set, not disabled, not loading | `<a href={href}>` | External link |
| Otherwise | `<button type="button">` | Standard button with `disabled` and `aria-busy` attributes |

### Loading State Behavior

When `loading` is `true`:

1. Children text becomes invisible (`text-transparent` class)
2. A centered spinner overlay is rendered (`absolute inset-0`) with a spinning border element
3. `aria-busy` is set on the button
4. The button is functionally disabled (`disabled={disabled || loading}`)
5. Hover/active transforms are suppressed
6. If `to` or `href` is set, the component falls through to `<button>` instead of rendering a link
7. Disabled styling is applied: `text-white/40 cursor-not-allowed border-white/10 bg-white/[0.02] pointer-events-none`

### Focus Styling

```
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/60
```

---

## Cross-References

- [03-variant-system.md](03-variant-system.md) -- CVA definitions for Card (`cardCva`), Section (`sectionCva`), Grid (`gridCva`), and their compound variants
- [05-screen-contracts.md](05-screen-contracts.md) -- How `PageShell` consumes `ScreenContract` objects: `contract.id` sets `data-screen-contract`, `contract.requiredSlots` drives `PageShellSlotGuard` validation
