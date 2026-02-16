# Poseidon.AI v0 Screen Prompts

> Aligned with `docs/mit-demo-content-strategy.md`. Organized by tier priority.
> Each prompt references existing Poseidon components by name for direct post-v0 mapping.

---

## v0 Custom Instructions (apply globally)

```
## Design System Rules
- Dark theme ONLY. Background: #0A1628 (navy). Never use white/light backgrounds.
- Card component: Use glass-morphism effect (backdrop-blur-xl + bg-white/5 + border border-white/10)
- Color palette:
  - Protect engine: teal #14B8A6 / #00D9B5
  - Grow engine: purple #8B5CF6
  - Execute engine: gold #F59E0B / #EAB308
  - Govern engine: blue #3B82F6
  - Text primary: #FFFFFF, secondary: #CBD5E1, muted: #A5B4C6
  - Status: success #10B981, warning #F59E0B, error #EF4444
- Typography: Inter font. Headings bold, body normal.
- Spacing: 4px base unit. Cards use p-4 md:p-6 with rounded-2xl.
- Shadows: 0 4px 16px rgba(0,0,0,0.2) for cards.
- Icons: Always wrap in a colored circle background (bg-{color}/10 rounded-full p-2).
- Animation: Use framer-motion. Stagger children with 0.08s delay. FadeUp (y:20->0, opacity:0->1).
- Mobile-first responsive design with md: breakpoints.
- Use shadcn/ui primitives (Button, Badge, Tabs, etc.)
- Charts: Use Recharts with dark theme (grid #253852, tick #6B7280, tooltip bg #0F1D32)

## Key Domain Components (reference these names in output)
- ScoreRing: Animated circular progress indicator (score/maxScore, size sm|md|lg, color prop)
- CategoryScoreBar: Horizontal bar chart for category breakdown (categories array, iconAccent)
- ContributionChart: Recharts bar chart with target reference line (data, targetMonthly, accentColor)
- MilestonesTimeline: Vertical timeline with status indicators (milestones array, accentColor)
- NetWorthHero: Large hero display of net worth with trend + glow (total, change, trend, glowColor)
- TransactionTable: Paginated table with sorting + mobile card view (columns, data, pageSize)
- ProofLine: Claim + evidence + source attribution row (claim, evidence, source, basis)
- DefinitionLine: Metric definition showing formula/unit/period/threshold
- GovernContractSet: Governance footer with auditId, modelVersion, explanationVersion
- GovernVerifiedBadge: Verified badge with audit trail reference
- PageShell: Page layout with hero/KPI/primaryFeed/decisionRail slots
- ForecastBandChart: SVG forecast with confidence bands (data, historicalCount)
- RiskScoreDial: Arc gauge showing risk score 0-1 with band labels
- ActionQueueCard: Action card with approve/decline/defer controls
- DashboardInsightsPanel: Morning/evening AI briefing panel
- EngineHealthStrip: Horizontal row of 4 engine status chips
- AlertsHub: Prioritized alert list with severity and engine tags
- ActivityTimeline: Vertical cross-engine activity timeline
- SHAPWaterfallChart: SHAP feature importance waterfall (features, baseValue)
```

---

## Conversion Checklist (v0 → Poseidon)

After generating each screen in v0:

1. **Colors**: Replace hardcoded hex → CSS variables (`var(--bg)`, `var(--accent-teal)`, `var(--engine-grow)`, etc.)
2. **Layout**: Wrap in `<PageShell>` with correct `slug`, `heroVariant`, `contract`
3. **Proof**: Add `<ProofLine>` under every data section — claim + evidence + source + basis
4. **Definitions**: Add `<DefinitionLine>` for computed metrics — metric + formula + unit + period + threshold
5. **Govern**: Add `<GovernContractSet>` at bottom of engine pages — auditId + modelVersion + explanationVersion
6. **Tables**: Replace any custom tables with `<TransactionTable>` — columns + data + pageSize
7. **Score rings**: Replace circular progress → `<ScoreRing>` — score + maxScore + label + size + color
8. **Category bars**: Replace horizontal bar charts → `<CategoryScoreBar>` — categories array
9. **Timelines**: Replace vertical timelines → `<MilestonesTimeline>` — milestones + accentColor
10. **Animation**: Replace Framer Motion → `useReducedMotionSafe()` + design tokens
11. **Routing**: Replace `<Link href=...>` → `<Link to=...>` from `src/router`
12. **Types**: Add TypeScript interfaces for all props

---

## Screen Inventory (aligned with MIT Demo Content Strategy)

### Tier 1: Golden Path (HIGH priority — must be flawless)

| # | Screen | Route | Engine | Priority |
|---|--------|-------|--------|----------|
| 1 | Dashboard | `/dashboard` | Core | **HIGH** |
| 2 | Landing | `/` | Core | **HIGH** |
| 3 | Protect | `/protect` | Protect | **HIGH** |
| 4 | Execute | `/execute` | Execute | **HIGH** |
| 5 | Govern | `/govern` | Govern | **HIGH** |

### Tier 2: Explorer Path (MEDIUM priority — should look good)

| # | Screen | Route | Engine | Priority |
|---|--------|-------|--------|----------|
| 6 | Grow | `/grow` | Grow | **MEDIUM** |
| 7 | Alert Detail | `/protect/alert-detail` | Protect | **MEDIUM** |
| 8 | Execution History | `/execute/history` | Execute | **MEDIUM** |
| 9 | Audit Ledger | `/govern/audit` | Govern | **MEDIUM** |
| 10 | Settings | `/settings` | Settings | **MEDIUM** |
| 11 | Goal Detail | `/grow/goal` | Grow | **MEDIUM** |
| 12 | Scenarios | `/grow/scenarios` | Grow | **MEDIUM** |

### Tier 3: Completeness (LOW priority — functional is sufficient)

| # | Screen | Route | Engine | Priority |
|---|--------|-------|--------|----------|
| 13 | Alerts Hub | `/dashboard/alerts` | Core | **LOW** |
| 14 | Approval Queue | `/execute/approval` | Execute | **LOW** |
| 15 | Trust Config | `/govern/trust` | Govern | **LOW** |
| 16 | AI Settings | `/settings/ai` | Settings | **LOW** |
| 17 | Help Center | `/help` | System | **LOW** |
| 18 | Onboarding | `/onboarding/connect` | System | **LOW** |

### Keep but low priority

| # | Screen | Route | Engine | Priority |
|---|--------|-------|--------|----------|
| 19 | Insights Feed | `/dashboard/insights` | Core | Low |
| 20 | Activity Timeline | `/dashboard/timeline` | Core | Low |
| 21 | Notifications | `/dashboard/notifications` | Core | Low |
| 22 | Dispute Flow | `/protect/dispute` | Protect | Low |
| 23 | Recommendations | `/grow/recommendations` | Grow | Low |
| 24 | Audit Detail | `/govern/audit-detail` | Govern | Low |
| 25 | Data Rights | `/settings/rights` | Settings | Low |

### Deprioritized (merge content upward — no standalone prompts)

| Screen | Route | Action |
|--------|-------|--------|
| Registry | `/govern/registry` | Merge into `/govern` |
| Oversight | `/govern/oversight` | Merge into `/govern` |
| Policy & Models | `/govern/policy` | Merge into `/govern` |
| Integrations | `/settings/integrations` | Low demo value |

---

## Prompts

---

### TIER 1: GOLDEN PATH

---

### 1. Dashboard (`/dashboard`) — HIGH PRIORITY

```
Create a fintech AI command center dashboard for "Poseidon.AI".
Dark navy theme (#0A1628). Glass-morphism cards (backdrop-blur-xl bg-white/5 border border-white/10). All four engine accent colors used.

Layout:
1. HERO SECTION (maps to → PageShell heroVariant="command"):
   - Kicker badge "Dashboard" in muted text (#A5B4C6) with a LayoutDashboard icon in a teal circle
   - Large headline: "Good morning. System confidence: 0.92 across 4 engines." in white bold text
   - Subline: "One unresolved alert. Three actions queued. Cash buffer at 14 days." in secondary text (#CBD5E1)
   - AI insight banner (maps to → DashboardInsightsPanel): glass card with Sparkles icon, text "Top recommendation: Consolidate 3 overlapping subscriptions — projected save $140/mo (92% confidence)", with a "Review in Execute" CTA button
   - Proof line (maps to → ProofLine): small muted row showing "Composite confidence 0.92 | Protect 0.94 | Grow 0.89 | Execute 0.91 | Govern 0.97" with an info tooltip icon

2. KPI GRID (maps to → PageShellKPIGrid with 4 StatCards):
   - Card 1 (maps to → StatCard + Sparkline): "Net position" label, "$847k" value in white, "+8.2%" delta in green (#10B981), tiny sparkline (Recharts AreaChart 60x24px, teal fill)
   - Card 2 (maps to → StatCard + Sparkline): "Cash flow" label, "+$4.1k" value, "+12%" delta in green, sparkline (cyan #00F0FF fill)
   - Card 3 (maps to → StatCard + Sparkline): "Risk" label, "Low" value, "Down from Med" delta in green, sparkline (blue #3B82F6 fill)
   - Card 4 (maps to → StatCard + Sparkline): "Alerts" label, "2" value, "-3 resolved" in green, sparkline (amber #F59E0B fill)

3. ENGINE HEALTH STRIP (maps to → EngineHealthStrip):
   Horizontal row of 4 small engine status chips. Each shows:
   - Colored dot (teal/violet/amber/blue) + engine name + status text + confidence score
   - Example: [teal dot] Protect | 0 threats in 24h | 0.94
   - Clickable, one selected/highlighted with subtle glow ring

4. TWO-COLUMN CONTENT (stacks on mobile):
   LEFT — PRIMARY FEED (2/3 width, maps to → PageShell primaryFeed):
   - Trust Pulse section (maps to → ScoreRing size="lg"): Section header "System trust" with message "Composite confidence across all four engines." Below is a circular score ring (92/100) with 4 colored arc segments (teal/violet/amber/blue). Below ring: 4 sub-scores in a row (Protect 94, Grow 89, Execute 91, Govern 97) each with trend arrows. Updated timestamp "2 hours ago".
   - AI Insight panel (maps to → ExplainableInsightPanel): Glass card titled "Top recommendation rationale". Summary text, then 3 horizontal SHAP factor bars (teal fill): "Cost overlap 0.82", "Usage frequency 0.45", "Contract flexibility 0.71". Confidence ring 92%. Audit link chip "GV-2026-0212-DASH-REC".
   - Forecast chart (maps to → ForecastBandChart): Section header "Cash flow forecast". Recharts AreaChart (400x260px) with dark grid (#253852), historical data as solid teal line, forecast as dashed line with gradient confidence band (teal/10 fill). X-axis dates, Y-axis dollar values.
   - Alerts hub (maps to → AlertsHub): Section with badge count "2 active". List of 2 alert cards each with severity badge (Critical/Warning), merchant name, amount, timestamp, and action buttons.

   RIGHT — DECISION RAIL (1/3 width, maps to → PageShell decisionRail):
   - Net worth hero (maps to → NetWorthHero): Large "$847,200" display with "+$12,400 (+1.5%)" trend in green, upward arrow icon, "vs last month" period label, subtle purple glow effect (glowColor="var(--engine-grow)").
   - Risk gauge (maps to → RiskScoreDial): Circular dial showing 0.12 score, "Low" band, green zone highlighted. Trend arrow pointing down with "-0.05" delta.
   - Next best actions (maps to → MissionActionList): 3 action items, each with colored urgency dot (red/amber/green), title, description, and "Execute" ghost button.
   - Activity timeline (maps to → ActivityTimeline): Vertical timeline with 5 entries, each having a colored engine dot, timestamp, and action description. Most recent at top.

5. GOVERN FOOTER (maps to → GovernContractSet + GovernVerifiedBadge):
   Full-width bar at bottom with GovernVerifiedBadge (Shield icon + "Verified"), AuditLinkChip linking to /govern/audit, auditId "GV-2026-0215-DASH", and "Request human review" CTA.

Use Recharts for all charts, framer-motion for stagger animations (0.08s delay between cards), lucide-react icons (LayoutDashboard, Shield, TrendingUp, Zap, Scale, AlertTriangle, Activity, Sparkles, ChevronRight, ExternalLink, DollarSign), shadcn/ui Button and Badge. Mobile: hero stacks, KPIs become 2x2, columns stack vertically.
```

---

### 2. Landing (`/`) — HIGH PRIORITY

```
Create a fintech SaaS landing page for "Poseidon.AI — Trusted Financial Sentience".
Dark navy theme (#0A1628). Glass-morphism cards. Must feel like a real production SaaS product.

Layout:
1. HERO SECTION (maps to → PageShell heroVariant="minimal"):
   - Top bar: Poseidon.AI logo (left), nav links "Product | Pricing | Trust" (center), "Sign in" ghost button + "Get started" primary button (right)
   - Large centered headline: "Safer, satisfying money decisions — in one place." in white bold 48px
   - Subline: "Four AI engines. One trusted system. Every decision auditable." in #CBD5E1 20px
   - Primary CTA: "Open Dashboard" large button (teal #14B8A6 bg, white text, rounded-xl, px-8 py-4)
   - Secondary CTA: "Watch demo" ghost button with PlayCircle icon
   - Trust signal row: 3 inline badges — "Bank-grade security" with Lock icon, "GDPR compliant" with Shield icon, "100% auditable" with ScrollText icon

2. LIVE TRUST METRICS (maps to → StatCard row with Sparklines):
   - Horizontal row of 4 glass metric cards (auto-grid, 1x4 desktop, 2x2 mobile):
   - "System Confidence" 0.92 with micro-sparkline (teal)
   - "Decisions Audited" 1,247 with upward sparkline (blue)
   - "Threats Blocked" 23 with sparkline (amber)
   - "Response Time" <200ms with flat sparkline (green)
   - Each card: label in muted text, large value in white, sparkline beneath

3. FOUR ENGINE CARDS (maps to → AdaptiveCardGrid with 4 GlassCards):
   4 glass cards in a row (stack 2x2 on mobile). Each engine card:
   - Engine icon in colored circle (bg-{color}/10 p-3 rounded-full) — Shield (teal), TrendingUp (violet), Zap (amber), Scale (blue)
   - Engine name: "Protect" / "Grow" / "Execute" / "Govern" in white bold 20px
   - One-liner: "Real-time threat detection with explainable AI" / "Forecast-driven growth with Monte Carlo bands" / "Consent-first automation with reversible actions" / "Full audit trail for every decision"
   - Confidence badge: "0.94" in colored pill
   - Hover effect: card lifts with shadow, border glows in engine color
   - Click: navigates to engine page

4. GOVERNANCE PROOF SECTION:
   - Section header: "Governance by design, not by checkbox" in white bold
   - Three proof columns:
     - "Explainable" — SHAP icon + "Every AI decision includes feature attribution"
     - "Auditable" — ScrollText icon + "1,247 decisions with full audit trails"
     - "Reversible" — RotateCcw icon + "One-click rollback on any automated action"
   - ProofLine (maps to → ProofLine): "System uptime 99.97% | Last audit: 4m ago | Model version: v3.2.1"

5. SOCIAL PROOF FOOTER:
   - MIT CTO Program badge with shield icon
   - "Built by Group 7 | MIT Sloan CTO Program 2026" in muted text
   - Privacy policy + Terms links

Use framer-motion for scroll-triggered entrance animations (fadeUp + stagger). Icons: Shield, TrendingUp, Zap, Scale, Lock, ScrollText, PlayCircle, RotateCcw, ChevronRight, Activity. Mobile: single column, hero text left-aligned, engine cards 2x2.
```

---

### 3. Protect (`/protect`) — HIGH PRIORITY

```
Create a fintech AI threat protection engine page for "Poseidon.AI".
Dark navy theme (#0A1628). Glass-morphism cards. Teal (#14B8A6) as primary accent.

Layout:
1. HERO SECTION (maps to → PageShell heroVariant="focused"):
   - Kicker badge: "Protect" in teal circle with Shield icon
   - Headline: "3 active signals. Confidence 0.94. No action required." in white bold
   - Subline: "Continuous monitoring across all accounts. Last scan: 4 minutes ago." in #CBD5E1
   - AI insight banner: glass card with Sparkles icon, "Unusual pattern detected at MerchantX — $4,200 charge deviates 3.2x from category average."
   - ProofLine (maps to → ProofLine): "3 signals detected | Confidence 0.94 | Model: FraudDetectionV3.2 | Basis: 180-day behavioral analysis"

2. KPI GRID (maps to → PageShellKPIGrid):
   - "Active signals" = 3 (amber), "Blocked today" = 1 (green), "False positive rate" = 2.1% (green), "Coverage" = 100% (green)

3. TWO-COLUMN CONTENT:
   LEFT — PRIMARY FEED (maps to → PageShell primaryFeed):
   - Threat table (maps to → TransactionTable): Full-width table with columns: Severity (badge — Critical red / Warning amber / Info blue), Signal (title + merchant), Amount (dollar), Confidence (inline ScoreRing mini), Time, Actions (View button). 3 rows of signal data. Sortable columns. Mobile: switches to card view.
   - Per-signal detail (expanded row): SHAP factors panel (maps to → FactorsDropdown) showing 3 horizontal bars: "Merchant history 0.82", "Amount deviation 0.71", "Geographic mismatch 0.65". Model metadata: "FraudDetection v3.2 | Trained on 180d | Accuracy 97.2%"
   - DefinitionLine (maps to → DefinitionLine): "Risk Score = weighted_sum(signal_confidence × severity_factor) | Unit: 0-1 | Period: rolling 24h | Threshold: >0.7 triggers alert"
   - Quick actions (maps to → MissionActionList): 3 items — "Freeze card" (urgent, red dot), "Investigate MerchantX" (normal, amber dot), "Update alert rules" (low, green dot)

   RIGHT — DECISION RAIL (maps to → PageShell decisionRail):
   - ScoreRing (maps to → ScoreRing size="lg"): Large 94/100 ring in teal with label "Risk Score" and statusText "Low — monitoring"
   - CategoryScoreBar (maps to → CategoryScoreBar): 4 horizontal bars — "Transaction patterns" 92, "Merchant risk" 87, "Geographic" 95, "Behavioral" 91 — each with teal fill proportional to score
   - MilestonesTimeline (maps to → MilestonesTimeline accentColor="var(--accent-teal)"): 4 milestones — "Signal detected" (completed, 14:28), "Analysis complete" (completed, 14:29), "Alert raised" (completed, 14:30), "Resolution pending" (current, pulsing)
   - Evidence summary (maps to → MissionEvidencePanel): "AI identified 3 correlated signals across 2 accounts in the last 6 hours"

4. GOVERN FOOTER (maps to → GovernContractSet):
   auditId "GV-2026-0215-PRT-SIG", modelVersion "FraudDetection v3.2", explanationVersion "SHAP v2.1"

Use Recharts for inline score rings, framer-motion stagger 0.08s. Icons: Shield, AlertTriangle, AlertCircle, Eye, Sparkles, Brain, Lock, CreditCard, MapPin, Clock, ChevronDown, ExternalLink. Mobile: columns stack, table becomes card list.
```

---

### 4. Execute (`/execute`) — HIGH PRIORITY

```
Create a fintech AI execution engine page for "Poseidon.AI".
Dark navy theme (#0A1628). Glass-morphism cards. Gold (#F59E0B) as primary accent.

Layout:
1. HERO SECTION (maps to → PageShell heroVariant="analytical"):
   - Kicker badge: "Execute" in gold circle with Zap icon
   - Headline: "5 actions queued. $847 in projected savings this month." in white bold
   - Subline: "Human approval required before every action. All actions reversible within 24h." in #CBD5E1
   - AI insight: glass card with Sparkles icon, "Approving the top 3 actions would save an estimated $412/mo with 91% confidence."
   - ProofLine (maps to → ProofLine): "5 pending | 128 completed | 0 failed | Rollback coverage: 100% | Basis: Execute engine v2.4"

2. KPI GRID (maps to → PageShellKPIGrid):
   - "Queued actions" = 5 (gold), "Monthly savings" = $847 (green), "Success rate" = 98.4% (green), "Avg confidence" = 0.91 (green)

3. TWO-COLUMN CONTENT:
   LEFT — PRIMARY FEED (maps to → PageShell primaryFeed):
   - Action queue (maps to → 3 ActionQueueCards stacked): Each card shows:
     - Priority stripe (left border: red for urgent, amber for normal)
     - Header: action type badge + urgency badge + timestamp
     - Title: "Negotiate Comcast bill — projected save $45/mo" in white bold
     - Description: 2 lines explaining the action in #CBD5E1
     - Impact preview: "If approved: -$45/mo on internet bill" (green), "Reversible within 24h" with RotateCcw icon
     - Inline ScoreRing (maps to → ScoreRing size="sm"): confidence 0.93 in gold
     - Action buttons: "Approve" (green bg), "Decline" (red ghost), "Defer 24h" (ghost)
     - ProofLine (maps to → ProofLine): "Source: BillNegotiator v2.1 | Evidence: 3 comparable plan offers | Audit: GV-2026-0215-EXE-001"
   - Auto-save rules section (maps to → AutoSaveRuleCard with MissionToggle): 2 toggle rules:
     - "Round-up spare change to savings" — toggle ON, cap $50/mo
     - "Auto-pay minimum balances" — toggle ON, cap $500/mo
   - ActionOutcomePreview (maps to → ActionOutcomePreview): "Projected monthly impact" chart showing cumulative savings

   RIGHT — DECISION RAIL (maps to → PageShell decisionRail):
   - ScoreRing (maps to → ScoreRing size="lg"): 98/100 "Success rate" in gold with statusText "Excellent"
   - ContributionChart (maps to → ContributionChart accentColor="var(--engine-execute)"): Bar chart showing monthly savings by action type over 6 months. targetMonthly=$500 reference line.
   - MilestonesTimeline (maps to → MilestonesTimeline accentColor="var(--accent-gold)"): 5 milestones — "Q4 savings target set" (completed), "First auto-save" (completed), "$500/mo milestone" (completed), "$847/mo current" (current), "$1,000/mo target" (upcoming)

4. GOVERN FOOTER (maps to → GovernContractSet):
   auditId "GV-2026-0215-EXE", modelVersion "Execute v2.4", explanationVersion "SHAP v2.1"

Use Recharts for ContributionChart, framer-motion for card stagger. Icons: Zap, CheckCircle, XCircle, RotateCcw, Clock, DollarSign, Sparkles, BarChart3, ArrowUpRight, Shield, ExternalLink. Mobile: columns stack, action buttons become full-width row.
```

---

### 5. Govern (`/govern`) — HIGH PRIORITY

```
Create a fintech AI governance engine page for "Poseidon.AI".
Dark navy theme (#0A1628). Glass-morphism cards. Blue (#3B82F6) as primary accent.

Layout:
1. HERO SECTION (maps to → PageShell heroVariant="analytical"):
   - Kicker badge: "Govern" in blue circle with Scale icon
   - Headline: "1,247 decisions audited. Compliance score: 96/100." in white bold
   - Subline: "Every AI decision explainable, auditable, and reversible. Zero compliance violations." in #CBD5E1
   - AI insight: glass card with Brain icon, "All 4 engines within compliance bounds. Data Privacy score improved +2 points this week."
   - ProofLine (maps to → ProofLine): "1,247 audited | 0 violations | Last audit: 4m ago | Model: GovernanceEngine v1.8 | Basis: GDPR + Fair Lending Act"

2. KPI GRID (maps to → PageShellKPIGrid):
   - "Compliance" = 96/100 (green), "Decisions audited" = 1,247 (blue), "Override rate" = 3.2% (green), "Response time" = <200ms (green)

3. TWO-COLUMN CONTENT:
   LEFT — PRIMARY FEED (maps to → PageShell primaryFeed):
   - Compliance ScoreRing (maps to → ScoreRing size="lg"): Large 96/100 ring in blue with label "Compliance Score" and statusText "Excellent — no violations"
   - CategoryScoreBar (maps to → CategoryScoreBar): 4 horizontal bars with blue fill:
     - "Data Privacy" 98/100
     - "Fair Lending" 94/100
     - "AML / KYC" 92/100
     - "Consumer Protection" 100/100
     Each bar shows the score label on left, filled bar proportional to score, number on right.
   - Audit log preview (maps to → TransactionTable): Table with 5 recent audit entries. Columns: Audit ID (monospace blue link, e.g. "GV-2026-0215-001"), Decision ("Blocked transaction"), Engine (colored badge "Protect"), Confidence (0.94 inline ring), Reviewer ("AI" or "Human" badge), Time ("4m ago"). "View full audit ledger" link below.
   - Privacy controls (maps to → MissionToggle rows): 3 toggle rows:
     - "Share anonymized data for model improvement" — ON
     - "Allow cross-engine data sharing" — ON
     - "Third-party data enrichment" — OFF
   - DefinitionLine (maps to → DefinitionLine): "Compliance Score = mean(category_scores) weighted by regulatory priority | Unit: 0-100 | Period: rolling 30d | Threshold: <80 triggers review"

   RIGHT — DECISION RAIL (maps to → PageShell decisionRail):
   - GovernVerifiedBadge (maps to → GovernVerifiedBadge): Large shield icon with "All Systems Verified" text, auditId, modelVersion
   - Audit summary card: "1,247 decisions" large number, "100% with audit trail" green badge, "4m ago" last entry timestamp, "View ledger →" link to /govern/audit
   - MilestonesTimeline (maps to → MilestonesTimeline accentColor="var(--accent-blue)"): 4 milestones:
     - "Governance engine deployed" (completed, Jan 15)
     - "1,000 decisions audited" (completed, Feb 1)
     - "Zero-violation streak: 30d" (current, Feb 15)
     - "SOC 2 audit target" (upcoming, Mar 15)
   - Human review CTA (maps to → HumanReviewCTA): "Request human review of any AI decision" button

4. GOVERN FOOTER (maps to → GovernContractSet):
   auditId "GV-2026-0215-GOV", modelVersion "Governance v1.8", explanationVersion "SHAP v2.1"

Use Recharts for inline rings, framer-motion stagger. Icons: Scale, Shield, ShieldCheck, ScrollText, Eye, Lock, UserCheck, Bot, AlertTriangle, BarChart3, ExternalLink. Mobile: columns stack, category bars full-width.
```

---

### TIER 2: EXPLORER PATH

---

### 6. Grow (`/grow`) — MEDIUM PRIORITY

```
Create a fintech AI growth engine page for "Poseidon.AI".
Dark navy theme (#0A1628). Glass-morphism cards. Violet (#8B5CF6) as primary accent.

Layout:
1. HERO SECTION (maps to → PageShell heroVariant="focused"):
   - Kicker: "Grow" with TrendingUp icon in violet circle
   - Headline: "Net worth trajectory: +8.2% this quarter. 3 goals on track." in white bold
   - Subline: "Monte Carlo forecast with 10,000 simulations. Updated every 6 hours." in #CBD5E1
   - AI insight: "Increasing monthly savings by $200 would accelerate emergency fund goal by 2.3 months."
   - ProofLine: "Forecast confidence 0.89 | Simulations: 10,000 | Model: GrowthForecast v3.2 | Basis: 180-day pattern analysis"

2. KPI GRID: "Net worth" = $847k (+8.2%), "Monthly savings" = $2.1k (+12%), "Goals on track" = 3/4 (green), "Forecast confidence" = 0.89

3. PRIMARY FEED:
   - NetWorthHero (maps to → NetWorthHero): Large "$847,200" with "+$12,400 (+1.5%)" trend, violet glow
   - Forecast chart (maps to → ForecastBandChart): 30-day forecast with historical data, confidence bands in violet
   - Goal cards (maps to → 3 GlassCards in AdaptiveCardGrid): Each shows goal name, ScoreRing progress, target amount, projected completion date
   - ContributionChart (maps to → ContributionChart accentColor="var(--engine-grow)"): Monthly contribution bars with $200 target line

4. DECISION RAIL:
   - ScoreRing (maps to → ScoreRing): Financial health 78/100 in violet
   - CategoryScoreBar (maps to → CategoryScoreBar): "Savings" 85, "Debt ratio" 72, "Income growth" 81, "Investment" 74
   - MilestonesTimeline (maps to → MilestonesTimeline accentColor="var(--accent-violet)"): Goal milestones with completion dates

5. GOVERN FOOTER (maps to → GovernContractSet): auditId, modelVersion "GrowthForecast v3.2"

Icons: TrendingUp, DollarSign, Target, Sparkles, BarChart3. Mobile: columns stack.
```

---

### 7. Alert Detail (`/protect/alert-detail`) — MEDIUM PRIORITY

```
Create a fintech AI alert detail page for "Poseidon.AI".
Dark navy theme (#0A1628). Glass-morphism cards. Teal (#14B8A6) accent.

Layout:
1. HERO (maps to → PageShell heroVariant="focused"):
   - BackButton → /protect
   - Kicker: "Protect / Alert Detail" with AlertTriangle icon
   - Headline: "Suspicious transaction — MerchantX $4,200" in white bold
   - Status badge: "Under investigation" (amber)
   - ProofLine: "Signal confidence 0.94 | Model: FraudDetection v3.2 | Reported: 14:28 UTC"

2. TRANSACTION DETAIL CARD:
   - Glass card with teal left border showing: Merchant, Amount, Date, Card ending, Category, Status badge
   - ScoreRing (maps to → ScoreRing): Large 94/100 "Threat confidence" in teal

3. SHAP EXPLANATION (maps to → SHAPWaterfallChart):
   - Full-width waterfall chart: "Merchant history" +0.82, "Amount deviation" +0.71, "Geographic mismatch" +0.65, "Time pattern" -0.12, "Account age" -0.08
   - Base value 0.50 → Prediction 0.94
   - Each bar labeled with natural language explanation

4. CATEGORY BREAKDOWN (maps to → CategoryScoreBar):
   - "Transaction patterns" 92, "Merchant risk" 87, "Geographic signals" 95, "Behavioral match" 91

5. DECISION TIMELINE (maps to → MilestonesTimeline accentColor="var(--accent-teal)"):
   - "Signal detected" (completed, 14:28), "Analysis complete" (completed, 14:29), "Alert raised" (completed, 14:30), "User notified" (completed, 14:31), "Resolution" (pending)

6. ACTIONS: "Block card" (primary teal), "Dispute transaction →" link to /protect/dispute, "Mark as safe" (ghost)

7. GOVERN FOOTER (maps to → GovernContractSet)

Icons: AlertTriangle, Shield, CreditCard, MapPin, Clock, Brain, Eye, ChevronLeft. Mobile: single column.
```

---

### 8. Execution History (`/execute/history`) — MEDIUM PRIORITY

```
Create a fintech execution history page for "Poseidon.AI".
Dark navy theme (#0A1628). Glass-morphism cards. Gold (#F59E0B) accent.

Layout:
1. HERO (maps to → PageShell heroVariant="analytical"):
   - Kicker: "Execute / History" with History icon
   - Headline: "142 actions executed. $4,280 saved this quarter." in white bold
   - Stats: "128 completed" (green), "8 failed" (red), "6 rolled back" (amber)
   - ProofLine: "98.4% success rate | Avg confidence 0.91 | All actions audit-linked"

2. FILTER BAR: Search input, status tabs (All/Completed/Failed/Rolled back), engine filter pills, date range selector, "Export CSV" button

3. HISTORY TABLE (maps to → TransactionTable):
   - Columns: Action (title, sortable), Status (badge — Completed green / Failed red / Rolled back amber, sortable), Savings (dollar amount), When (relative timestamp, sortable)
   - 12 rows of execution data including: "Negotiated Comcast bill" ($45/mo saved, Completed), "Cancelled unused Hulu" ($15/mo, Completed), "Auto-saved round-ups" ($127, Completed), "Blocked suspicious charge" ($4,200, Completed), "Investment rebalance" (Failed — market closed)
   - Expandable rows showing: execution timeline, impact breakdown, SHAP evidence link, audit trail link
   - Pagination: "Showing 1-12 of 142"
   - Mobile: switches to card layout automatically

4. DECISION RAIL:
   - ScoreRing (maps to → ScoreRing): 98/100 "Success rate" in gold
   - ContributionChart (maps to → ContributionChart accentColor="var(--engine-execute)"): Monthly savings contribution bars
   - MilestonesTimeline (maps to → MilestonesTimeline accentColor="var(--accent-gold)"): Key execution milestones — "First action", "100 actions", "$1k saved", "$4.2k saved" (current)

5. GOVERN FOOTER (maps to → GovernContractSet)

Icons: History, CheckCircle, XCircle, RotateCcw, Search, Download, Eye, ExternalLink. Mobile: table → card list.
```

---

### 9. Audit Ledger (`/govern/audit`) — MEDIUM PRIORITY

```
Create a fintech audit ledger page for "Poseidon.AI".
Dark navy theme (#0A1628). Glass-morphism cards. Blue (#3B82F6) accent.

Layout:
1. HERO (maps to → PageShell heroVariant="analytical"):
   - Kicker: "Govern / Audit Ledger" with ScrollText icon
   - Headline: "1,247 decisions audited. 100% coverage." in white bold
   - Stats: "1,247 entries" (blue), "100% audited" (green), "Last entry: 4m ago" (muted)
   - ProofLine: "Full audit trail for every AI decision | Immutable log | Exportable for SOC 2 review"

2. FILTER BAR: Date range selector, engine filter with counts (Protect 520, Grow 310, Execute 285, Govern 132), decision type dropdown, confidence range slider, search, "Export" + "Print" buttons

3. AUDIT TABLE (maps to → TransactionTable):
   - Columns: Audit ID (monospace blue link, sortable), Engine (colored badge, sortable), Decision (title text), Confidence (inline ScoreRing mini, sortable), Reviewer ("AI" / "Human" badge), Time (relative, sortable)
   - 25 rows of audit data. Expandable rows showing SHAP waterfall preview + full explanation text.
   - Pagination: "Showing 1-25 of 1,247"

4. DECISION RAIL:
   - ScoreRing (maps to → ScoreRing): 96/100 "Compliance" in blue
   - CategoryScoreBar (maps to → CategoryScoreBar): "Protect decisions" 520, "Grow decisions" 310, "Execute decisions" 285, "Govern decisions" 132
   - Decision distribution (Recharts PieChart): 4 engine segments with counts
   - "Average confidence" stat card: 0.92

5. GOVERN FOOTER (maps to → GovernContractSet)

Icons: ScrollText, Search, Download, Printer, Filter, Eye, ExternalLink. Mobile: table → card list.
```

---

### 10. Settings (`/settings`) — MEDIUM PRIORITY

```
Create a fintech settings page for "Poseidon.AI".
Dark navy theme (#0A1628). Glass-morphism cards. Mixed engine accents.

Layout:
1. HERO (maps to → PageShell heroVariant="editorial"):
   - Kicker: "Settings" with Settings icon
   - Headline: "Account & preferences" in white bold
   - Subline: "Manage notifications, security, and AI behavior." in #CBD5E1

2. SETTINGS SECTIONS (maps to → Section compound component):
   - Profile section: Name, email, avatar, "Edit profile" button
   - Notification preferences: Per-engine toggle rows (Protect alerts ON, Grow insights ON, Execute actions ON, Govern reviews ON), email digest frequency dropdown
   - Security: Two-factor authentication toggle, session management, password change link
   - Quick links: "AI Configuration →" (/settings/ai), "Data Rights →" (/settings/rights), "Connected Accounts →" (/settings/integrations)

3. ProofLine: "Account created Jan 15, 2026 | 2FA enabled | Last login: 2h ago"

4. GOVERN FOOTER (maps to → GovernContractSet)

Icons: Settings, Bell, Lock, User, Shield, ChevronRight. Mobile: full-width sections.
```

---

### 11. Goal Detail (`/grow/goal`) — MEDIUM PRIORITY

```
Create a fintech goal detail page for "Poseidon.AI".
Dark navy theme (#0A1628). Glass-morphism cards. Violet (#8B5CF6) accent.

Layout:
1. HERO (maps to → PageShell heroVariant="focused"):
   - BackButton → /grow
   - Kicker: "Grow / Goal" with Target icon
   - Headline: "Emergency Fund — $12,000 target" in white bold
   - Status: "On track — 68% complete" in green
   - ProofLine: "Projected completion: May 2026 | Confidence 0.87 | Model: GoalTracker v2.1"

2. PRIMARY FEED:
   - ScoreRing (maps to → ScoreRing size="lg"): 68/100 "Progress" in violet with statusText "$8,160 of $12,000"
   - ContributionChart (maps to → ContributionChart accentColor="var(--engine-grow)"): 12-month bar chart showing monthly contributions. targetMonthly=$500 reference line. Bars show actual contribution amounts. Recent months filled, future months projected (lighter fill).
   - Forecast section (maps to → ForecastBandChart): Projected savings trajectory with confidence band. Crossing the $12,000 line in May 2026.
   - DefinitionLine: "Progress = sum(contributions) / target | Unit: % | Period: cumulative | Threshold: 100% = goal met"

3. DECISION RAIL:
   - CategoryScoreBar (maps to → CategoryScoreBar): "Savings rate" 85, "Consistency" 78, "Growth rate" 72
   - MilestonesTimeline (maps to → MilestonesTimeline accentColor="var(--accent-violet)"): "Goal created" (completed, Jan), "$2k saved" (completed, Jan), "$5k saved" (completed, Feb), "$8k saved" (current), "$12k target" (upcoming, May)
   - AI recommendation card: "Increasing monthly contribution by $100 would accelerate completion by 3 weeks."

4. GOVERN FOOTER (maps to → GovernContractSet)

Icons: Target, TrendingUp, DollarSign, Calendar, Sparkles, ChevronLeft. Mobile: single column.
```

---

### 12. Scenarios (`/grow/scenarios`) — MEDIUM PRIORITY

```
Create a what-if scenario simulator page for "Poseidon.AI".
Dark navy theme (#0A1628). Glass-morphism cards. Violet (#8B5CF6) accent.

Layout:
1. HERO (maps to → PageShell heroVariant="focused"):
   - Kicker: "Grow / Scenarios" with FlaskConical icon
   - Headline: "Model financial outcomes under different assumptions." in white bold
   - AI insight: "Based on your patterns, a +$500/mo savings scenario extends your runway by 4.2 days."
   - ProofLine: "10,000 Monte Carlo simulations | Confidence 0.91 | Model: ScenarioEngine v1.4"

2. SCENARIO CONTROLS (left column):
   - Scenario name input, income adjustment slider (-50% to +100%), expense adjustment slider (-50% to +50%), one-time event field, forecast horizon pills (30d / 90d / 1yr)
   - "Run Scenario" primary button (violet), "Reset" ghost button
   - Saved scenarios list: 3 scenario cards with name, parameters, projected outcome

3. FORECAST CHART (maps to → ForecastBandChart):
   - Large chart: baseline (white line), Scenario A overlay (violet dashed + band), historical/forecast split
   - Recharts AreaChart, dark grid, tooltip with values

4. RESULTS COMPARISON:
   - Side-by-side cards: "Baseline" vs "Scenario A" showing projected balance, delta, runway change, confidence
   - ContributionChart (maps to → ContributionChart): Monthly impact projection with target line

5. AI RECOMMENDATION:
   - "Scenario A is achievable with 82% probability." + "Send to Execute" button
   - ProofLine: "Evidence: historical spending patterns | Source: ScenarioEngine v1.4"

6. GOVERN FOOTER (maps to → GovernContractSet)

Icons: FlaskConical, Sliders, TrendingUp, Brain, Sparkles, Save, Play, Download. Mobile: controls above chart.
```

---

### TIER 3: COMPLETENESS

---

### 13. Alerts Hub (`/dashboard/alerts`) — LOW PRIORITY

```
Create an alerts management hub page for "Poseidon.AI".
Dark navy theme (#0A1628). Glass-morphism cards. Multi-engine colors.

Layout:
1. HERO (maps to → PageShell heroVariant="editorial"):
   - Headline: "Alerts Hub" with Bell icon
   - AI insight: "3 alerts share a common root cause: vendor payment anomaly."
   - ProofLine: "12 active | 35 resolved this week | Avg resolution: 2.4h"

2. FILTER BAR: Engine filter (4 toggle chips with counts), severity filter (Critical/Warning/Info), date range, search

3. ALERT LIST (maps to → TransactionTable or AlertsHub expanded):
   - Each row: severity badge, engine badge, title, confidence pill, timestamp, status dot (unread/resolved/in-progress), action buttons (View/Dismiss)
   - Expandable: SHAP factors + evidence inline
   - Batch actions bar when checkboxes selected

4. GOVERN FOOTER (maps to → GovernContractSet)

Icons: Bell, AlertTriangle, Shield, TrendingUp, Zap, Scale, Search, Filter, Check, X. Mobile: cards full-width.
```

---

### 14. Approval Queue (`/execute/approval`) — LOW PRIORITY

```
Create an action approval queue page for "Poseidon.AI".
Dark navy theme (#0A1628). Glass-morphism cards. Gold (#F59E0B) accent.

Layout:
1. HERO (maps to → PageShell heroVariant="analytical"):
   - Headline: "Approval Queue" with ClipboardCheck icon
   - Urgency banner: "2 actions expire within 24 hours."
   - Stats: "5 pending" (amber), "3 approved today" (green), "1 deferred" (blue)
   - ProofLine: "Consent-first: no action executes without explicit approval"

2. QUEUE (maps to → ActionQueueCard list):
   - Each card: urgency stripe, engine badge, title, description, evidence panel (expandable with ScoreRing + SHAP factors), impact preview ("If approved" green / "If declined" amber), reversibility indicator, action buttons (Approve/Decline/Defer/More info)
   - ProofLine per card

3. DECISION RAIL:
   - ScoreRing (maps to → ScoreRing): "Queue health" composite
   - MilestonesTimeline (maps to → MilestonesTimeline): Approval activity milestones
   - Completed actions section (collapsed)

4. GOVERN FOOTER (maps to → GovernContractSet)

Icons: ClipboardCheck, AlertTriangle, Check, X, Clock, RotateCcw, HelpCircle. Mobile: full-width cards.
```

---

### 15. Trust Config (`/govern/trust`) — LOW PRIORITY

```
Create a trust controls dashboard for "Poseidon.AI".
Dark navy theme (#0A1628). Glass-morphism cards. Blue (#3B82F6) accent.

Layout:
1. HERO (maps to → PageShell heroVariant="analytical"):
   - Headline: "Trust Dashboard" with ShieldCheck icon
   - Description: "Per-engine trust scores, threshold configuration, and auto-approval settings."

2. GLOBAL TRUST (maps to → ScoreRing size="lg"): "System Trust Score" 92/100 with 4 colored segments
   - CategoryScoreBar (maps to → CategoryScoreBar): Per-engine trust — Protect 94, Grow 89, Execute 91, Govern 97

3. PER-ENGINE CARDS: 4 glass cards (2x2). Each with engine-colored accent, trust score ScoreRing, risk tolerance slider, auto-approval threshold slider, toggles

4. ACTION BAR: "Save changes" (primary), "Reset to defaults" (ghost)

5. GOVERN FOOTER (maps to → GovernContractSet)

Icons: ShieldCheck, Shield, TrendingUp, Zap, Scale, Settings, Save. Mobile: cards stack.
```

---

### 16. AI Settings (`/settings/ai`) — LOW PRIORITY

```
Create an AI configuration settings page for "Poseidon.AI".
Dark navy theme (#0A1628). Glass-morphism cards. Mixed engine accents.

Layout:
1. HERO (maps to → PageShell heroVariant="editorial"):
   - Headline: "AI Configuration" with Brain icon
   - Description: "Control autonomy levels, explanation preferences, and model behavior."

2. GLOBAL AUTONOMY: Master slider 0-100 with 5 stops (Manual/Guided/Balanced/Delegated/Autonomous)

3. PER-ENGINE CARDS: 4 glass cards (2x2) with ScoreRing showing current autonomy level, toggles for automated actions, confirmation thresholds

4. EXPLANATION PREFERENCES: Verbosity radio (Minimal/Standard/Detailed/Technical), toggle for confidence scores, SHAP factors, audit links

5. SAVE BAR: Save/Discard/Reset

6. GOVERN FOOTER (maps to → GovernContractSet)

Icons: Brain, Sliders, Bot, Shield, TrendingUp, Zap, Scale, Lock. Mobile: cards stack.
```

---

### 17. Help Center (`/help`) — LOW PRIORITY

```
Create a help center page for "Poseidon.AI".
Dark navy theme (#0A1628). Glass-morphism cards. Blue (#3B82F6) accent.

Layout:
1. HERO (maps to → PageShell heroVariant="editorial"):
   - Large centered search bar with SearchIcon
   - Headline: "Help Center" in white bold

2. QUICK LINKS: 4 glass cards — "Getting Started" (Rocket), "Engine Guides" (Cpu), "AI & Trust" (Brain), "Account & Security" (Shield)

3. FAQ ACCORDION: 8 questions with expandable answers + "Was this helpful?" feedback

4. DOCUMENTATION LINKS (maps to → AdaptiveCardGrid): 6 link cards — API Reference, Engine Docs, Governance Policies, Security Whitepaper, Data Dictionary, Release Notes

5. CONTACT FORM: Subject, category dropdown, priority radio, description textarea, "Submit ticket" button

6. GOVERN FOOTER (maps to → GovernContractSet)

Icons: HelpCircle, Search, Rocket, Cpu, Brain, Shield, BookOpen, Code2, Headphones. Mobile: single column.
```

---

### 18. Onboarding (`/onboarding/connect`) — LOW PRIORITY

```
Create a fintech onboarding flow for "Poseidon.AI".
Dark navy theme (#0A1628). Glass-morphism cards. Teal (#14B8A6) accent.

Layout:
1. PROGRESS STEPPER: 4 steps — "Connect accounts" (active), "Set preferences", "Configure AI", "Review & go"

2. ACCOUNT CONNECTION:
   - "Connect your first account" headline
   - 4 connection type cards: Bank (Building2 icon), Credit Card (CreditCard), Investment (TrendingUp), Wallet (Wallet)
   - Security note: "Bank-grade encryption. Read-only access. Disconnect anytime." with Lock icon
   - Plaid integration placeholder

3. CONNECTED ACCOUNTS: List of connected accounts with status badges, sync indicators

4. BOTTOM NAV: "Skip for now" (ghost), "Continue" (primary teal)

Icons: Link2, Building2, CreditCard, TrendingUp, Wallet, Lock, CheckCircle, ChevronRight. Mobile: full-width.
```

---

### KEEP BUT LOW PRIORITY

---

### 19. Insights Feed (`/dashboard/insights`)

```
Create an AI insights feed page for "Poseidon.AI".
Dark navy theme (#0A1628). Glass-morphism cards. Violet (#8B5CF6) AI accent.

Layout:
1. HERO (maps to → PageShell heroVariant="editorial"):
   - Headline: "AI Insights" with Brain icon. Stats: "12 insights today | 4 actionable | Avg confidence 0.89"

2. FILTERS: Tab group (All/Actionable/Informational/Warnings), engine filter pills, sort dropdown

3. INSIGHT CARDS (maps to → DashboardInsightsPanel style): Each card with engine-colored top border, engine badge, category badge, timestamp, title, body, confidence bar, impact estimate, action buttons ("Send to Execute", "Dismiss"), ProofLine
   - Expanded: SHAPWaterfallChart + evidence + model metadata + audit link

4. GOVERN FOOTER (maps to → GovernContractSet)

Icons: Brain, Sparkles, Lightbulb, TrendingUp, ArrowRight, ThumbsUp, ThumbsDown, BarChart3. Mobile: single column.
```

---

### 20. Activity Timeline (`/dashboard/timeline`)

```
Create an activity timeline page for "Poseidon.AI".
Dark navy theme (#0A1628). Glass-morphism cards. Multi-engine accents.

Layout:
1. HERO (maps to → PageShell heroVariant="editorial"):
   - Headline: "Activity Timeline" with Activity icon. Live indicator: green pulsing dot + "Live"

2. FILTERS: Date range, engine checkboxes, event type pills, search

3. VERTICAL TIMELINE (maps to → MilestonesTimeline extended or ActivityTimeline):
   - Central vertical line with engine-colored event dots
   - Each event: timestamp, glass card with engine badge, event type badge, title, description, confidence pill, audit link
   - Day separators: "Today", "Yesterday", etc.

4. SIDEBAR: Today's summary (event counts by engine), most active engine, audit coverage progress bar

5. GOVERN FOOTER (maps to → GovernContractSet)

Icons: Activity, Clock, CheckCircle, AlertTriangle, Zap, Shield, TrendingUp, Scale, Search, Calendar. Mobile: single column.
```

---

### 21. Notifications (`/dashboard/notifications`)

```
Create a notification center for "Poseidon.AI".
Dark navy theme (#0A1628). Glass-morphism cards.

Layout:
1. HERO (maps to → PageShell heroVariant="editorial"):
   - Headline: "Notifications" with Bell icon. "7 unread" badge. "Mark all read" button.

2. CATEGORY TABS: All (23), Security (5, teal), Growth (8, violet), Actions (6, gold), System (4, gray)

3. NOTIFICATION LIST: Each item with unread dot, engine icon, title, body line, timestamp, action link, three-dot menu. Grouped notifications from same source.

4. PREFERENCES SECTION: Per-category toggles (push + email), frequency selector

5. GOVERN FOOTER (maps to → GovernContractSet)

Icons: Bell, BellOff, Shield, TrendingUp, Zap, Settings, MoreHorizontal, Check. Mobile: full-width list.
```

---

### 22. Dispute Flow (`/protect/dispute`)

```
Create a multi-step dispute wizard for "Poseidon.AI".
Dark navy theme (#0A1628). Glass-morphism cards. Teal (#14B8A6) accent.

Layout:
1. HERO (maps to → PageShell heroVariant="focused"):
   - Headline: "Dispute Transaction" with ShieldAlert icon. Breadcrumb: Protect / Dispute.

2. PROGRESS STEPPER: 4 steps — Review Transaction, Evidence & Documents, AI Dispute Letter, Submit & Track

3. STEP 1 — REVIEW: Transaction detail card + AI analysis with ScoreRing (maps to → ScoreRing) confidence 0.94 + SHAP factor bars (maps to → SHAPWaterfallChart or FactorsDropdown)

4. STEP 2 — EVIDENCE: Upload zone, uploaded files list, AI-suggested evidence card

5. STEP 3 — AI LETTER: Generated dispute letter preview, "Regenerate" + "Edit manually" controls

6. STEP 4 — SUBMIT: Review summary, submit button, success state with MilestonesTimeline (maps to → MilestonesTimeline) tracking

7. GOVERN FOOTER (maps to → GovernContractSet)

Icons: ShieldAlert, CheckCircle, FileText, Sparkles, Send, Upload, Brain, RefreshCw, Download. Mobile: stepper vertical.
```

---

### 23. Recommendations (`/grow/recommendations`)

```
Create an AI growth recommendations page for "Poseidon.AI".
Dark navy theme (#0A1628). Glass-morphism cards. Violet (#8B5CF6) accent.

Layout:
1. HERO (maps to → PageShell heroVariant="focused"):
   - Headline: "Growth Recommendations" with Lightbulb icon. Stats: "8 recommendations | 3 high-impact | Est. total: +$840/mo"

2. FILTERS: Sort pills (Highest impact / Highest confidence / Easiest), category pills (All/Savings/Income/Debt/Investment)

3. RECOMMENDATION CARDS: Each card with rank number, category badge, difficulty badge, title, description, 3 impact metrics (Monthly +$140, Annual +$1,680, Confidence ScoreRing 92%), expandable SHAP factors, action row ("Implement now", "Send to Execute")
   - ContributionChart (maps to → ContributionChart accentColor="var(--engine-grow)"): Cumulative monthly impact visualization
   - ProofLine per card

4. GOVERN FOOTER (maps to → GovernContractSet)

Icons: Lightbulb, Sparkles, TrendingUp, DollarSign, Brain, BarChart3, Send. Mobile: single column.
```

---

### 24. Audit Detail (`/govern/audit-detail`)

```
Create a single audit decision detail page for "Poseidon.AI".
Dark navy theme (#0A1628). Glass-morphism cards. Blue (#3B82F6) accent.

Layout:
1. HERO (maps to → PageShell heroVariant="analytical"):
   - BackButton → /govern/audit. Audit ID badge (monospace). Status badge. Timestamp.

2. DECISION SUMMARY: Glass card with blue left border. Metadata (decision type, engine, trigger, confidence, reviewer, processing time, reversibility). ScoreRing (maps to → ScoreRing) confidence ring.

3. SHAP EXPLANATION (maps to → SHAPWaterfallChart): Full waterfall chart — positive factors blue right, negative red left. Natural language per factor.

4. MODEL METADATA: Version, training data, last retrained, accuracy, FP rate

5. DECISION TIMELINE (maps to → MilestonesTimeline accentColor="var(--accent-blue)"): 5 steps from "Signal detected" to "Audit logged"

6. HUMAN FEEDBACK: "Was this decision correct?" — Correct/Incorrect/Uncertain buttons + comment textarea

7. RELATED DECISIONS (maps to → TransactionTable compact): 3 related audit entries

8. GOVERN FOOTER (maps to → GovernContractSet)

Icons: ArrowLeft, ScrollText, Shield, Bot, User, RotateCcw, ThumbsUp, ThumbsDown. Mobile: single column.
```

---

### 25. Data Rights (`/settings/rights`)

```
Create a data rights and privacy page for "Poseidon.AI".
Dark navy theme (#0A1628). Glass-morphism cards. Blue (#3B82F6) accent.

Layout:
1. HERO (maps to → PageShell heroVariant="editorial"):
   - Headline: "Your Data Rights" with Shield icon. GDPR + CCPA compliance badges.

2. DATA RIGHTS ACTIONS: 3 glass cards — Export (Download icon), Restrict Processing (PauseCircle), Delete Data (Trash2, red). Each with description + action button.

3. ACTIVE REQUESTS (maps to → TransactionTable): Pending/completed data rights requests with status badges

4. DATA INVENTORY: Accordion with stored data categories, record counts, retention periods

5. CONSENT MANAGEMENT: Toggle rows for data processing, AI improvement, cross-engine sharing

6. GOVERN FOOTER (maps to → GovernContractSet)

Icons: Shield, Download, PauseCircle, Trash2, Lock, FileText, Database, Eye. Mobile: cards stack.
```

---

## Appendix: Component Reference

### Core Layout Components

| Component | Purpose | Key Props |
|-----------|---------|-----------|
| `PageShell` | Page layout with hero/KPI/feed/rail | `slug`, `heroVariant`, `contract`, `primaryFeed`, `decisionRail` |
| `AppShell` | Application shell with nav | `children`, `variant`, `showBottomNav` |
| `GlassCard` | Frosted glass card | `variant` (teal/violet/amber/blue), `tone`, `shine` |
| `Card` | Compound card with Header/Content/Footer | `variant`, `tone`, `as` |
| `Section` | Compound section | `variant`, `tone` |
| `Grid` | Responsive grid | `columns`, `gap` |
| `AdaptiveCardGrid` | Auto-responsive card grid | `children` |

### Data Visualization Components

| Component | Purpose | Key Props |
|-----------|---------|-----------|
| `ScoreRing` | Animated circular progress | `score`, `maxScore`, `label`, `size` (sm/md/lg), `color` |
| `CategoryScoreBar` | Horizontal bar chart breakdown | `categories`, `iconAccent` |
| `ContributionChart` | Monthly bar chart with target line | `data`, `targetMonthly`, `accentColor` |
| `MilestonesTimeline` | Vertical milestone timeline | `milestones`, `accentColor` |
| `NetWorthHero` | Large net worth display with glow | `total`, `change`, `trend`, `glowColor` |
| `TransactionTable` | Paginated sortable table | `columns`, `data`, `pageSize`, `loading` |
| `ForecastBandChart` | SVG forecast with confidence bands | `data`, `historicalCount` |
| `RiskScoreDial` | Arc gauge risk score | `score`, `band`, `trend`, `trendDelta` |
| `SHAPWaterfallChart` | Feature importance waterfall | `features`, `baseValue`, `prediction` |
| `Sparkline` | Compact trend line | `data`, `width`, `height`, `color` |
| `CashFlowChart` | Area chart with confidence bands | `data`, `height` |
| `StatCard` | Stat display with sparkline | `label`, `value`, `meta`, `sparkline`, `accent` |

### Evidence & Governance Components

| Component | Purpose | Key Props |
|-----------|---------|-----------|
| `ProofLine` | Claim + evidence + source | `claim`, `evidence`, `source`, `basis`, `sourceType` |
| `DefinitionLine` | Metric definition | `metric`, `formula`, `unit`, `period`, `threshold` |
| `GovernContractSet` | Governance footer | `auditId`, `modelVersion`, `explanationVersion` |
| `GovernVerifiedBadge` | Verified badge | `auditId`, `modelVersion`, `explanationVersion` |
| `AuditLinkChip` | Link to audit detail | `auditId` |
| `HumanReviewCTA` | Request human review | `onClick` |
| `FactorsDropdown` | SHAP factors expandable | `factors` |

### Action Components

| Component | Purpose | Key Props |
|-----------|---------|-----------|
| `ActionQueueCard` | Action with approve/decline/defer | `action`, `onApprove`, `onDecline`, `onDefer` |
| `ActionOutcomePreview` | Projected action outcome | (contextual) |
| `AutoSaveRuleCard` | Auto-save rule with toggle | (contextual) |
| `MissionActionList` | Ranked action list | `items` |
| `MissionDataRows` | Row-based data display | `items` |
| `MissionEvidencePanel` | Evidence summary | `title`, `summary`, `meta`, `tone` |

### Dashboard & Feed Components

| Component | Purpose | Key Props |
|-----------|---------|-----------|
| `DashboardInsightsPanel` | AI briefing panel | `variant` (morning/evening), `headingOverride` |
| `EngineHealthStrip` | 4 engine status chips | (contextual) |
| `AlertsHub` | Alert list with severity | (contextual) |
| `ActivityTimeline` | Cross-engine timeline | (contextual) |
| `DashboardStats` | Auto-refresh stat grid | (contextual) |

### Shared Design Patterns

**Glass Card Pattern:**
```
className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
```

**Stagger Animation Pattern:**
```tsx
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};
```

---

## Engine Color Quick Reference

| Engine | Primary | CSS Variable | Ring/Glow | Badge BG |
|--------|---------|--------------|-----------|----------|
| Protect | #14B8A6 | `var(--accent-teal)` | #14B8A6/20 | #14B8A6/10 |
| Grow | #8B5CF6 | `var(--accent-violet)` | #8B5CF6/20 | #8B5CF6/10 |
| Execute | #F59E0B | `var(--accent-gold)` | #F59E0B/20 | #F59E0B/10 |
| Govern | #3B82F6 | `var(--accent-blue)` | #3B82F6/20 | #3B82F6/10 |

## Hero Variant Mapping

| Variant | Used by | Character |
|---------|---------|-----------|
| `command` | Dashboard | Wide, authoritative overview |
| `focused` | Protect, Grow, Goal Detail, Dispute, Scenarios, Recommendations | Action-oriented, single mission |
| `analytical` | Execute, Govern, Audit pages, Approval, History, Trust | Data-heavy, evidence-driven |
| `editorial` | Settings, Help, Notifications, Insights, Timeline, AI Settings, Rights | Configuration, informational |
| `minimal` | Landing, Auth, Pricing | Clean, uncluttered |

## PageShell Slot Reference

| Prop | Purpose |
|------|---------|
| `primaryFeed` | Main content column (left/full) |
| `decisionRail` | Side panel for context/actions (right) |
| `layout="engine"` | Two-column engine layout |
| `fullWidth` | Single-column full-width layout |
