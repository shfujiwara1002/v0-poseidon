# MIT Demo Content Strategy

> Screen curation, user journey design, and content priorities for the MIT CTO Program Capstone demo site.
>
> **Group 7 | March 2026 | Poseidon.AI**

---

## 1. Context & Constraints

### Distribution model
The web prototype is distributed via **QR code on Slide 09** of the final presentation. Audience: MIT faculty, CTO Program peers, and industry evaluators.

### Audience behavior
- ~30 seconds of attention before forming an impression
- Will browse **3-5 screens** max; rarely more
- Already heard the 8-10 minute pitch covering 4-engine architecture, business model, and roadmap
- Expects **demonstration**, not re-explanation

### Primary goal
> "期待以上の成熟度のWebサイトを作り込んできた、素晴らしい"
>
> The site must feel impressively mature and production-ready — far beyond what's expected of a capstone project.

### What MIT evaluators look for
1. **Integration depth** — All CTO program modules (ML, GenAI, architecture, compliance, business) visible in one product
2. **Governance by design** — Architecturally embedded, not a checkbox
3. **Technical sophistication** — Real data flows, not static mockups
4. **Polish** — Consistent visual language, no broken states, smooth interactions
5. **Business viability** — The product feels like something real users would pay for

### What the demo must prove in 30 seconds
1. This is a **real product** (not slides) — interactive, navigable, data-rich
2. The 4-engine architecture **works together** — data flows from Protect → Grow → Execute → Govern
3. **Governance is visible everywhere** — audit trails, explainability, compliance badges
4. The UX is **calmer and more mature** than typical fintech — "trusted sentience" aesthetic

---

## 2. Design Principles

| Principle | Description |
|-----------|-------------|
| **Demonstrate, don't explain** | The site shows a working product. Tooltips and proof lines do the teaching — not marketing copy. |
| **One clear exit per screen** | Every Tier 1 screen has a primary CTA that leads to the next engine in the loop. |
| **Governance everywhere** | GovernContractSet footer, ProofLine evidence, AuditLinkChip — on every screen. |
| **Information density = credibility** | Dense, well-organized data feels professional. Sparse screens feel like mockups. |
| **Mobile-first confidence** | QR code → phone. Every screen must work at 375px. |

---

## 3. Screen Architecture (3-Tier Model)

### Tier 1: "Golden Path" — 5 screens every visitor WILL see

These must be **flawless**. They form the natural QR-code visitor flow.

| # | Screen | Route | Purpose | Time |
|---|--------|-------|---------|------|
| 1 | **Landing** | `/` | First impression. "This is a real product." Trust metrics, engine overview, one CTA. | 5-10s |
| 2 | **Dashboard** | `/dashboard` | Command center. All 4 engines working together. Trust pulse, forecast, actions, alerts. | 15-30s |
| 3 | **Protect** | `/protect` | AI threat detection with SHAP explainability and proposed actions. | 10-20s |
| 4 | **Execute** | `/execute` | Action queue with human approval, savings realized, consent-first flow. | 10-20s |
| 5 | **Govern** | `/govern` | Full audit trail, compliance scores, transparency controls. | 10-20s |

**Why this path**: Mirrors the presentation's demo flow (Slide 07). Demonstrates the full Protect → Execute → Govern loop. Every screen shows GOVERN footers proving auditability.

### Tier 2: "Explorer Path" — 7 screens for curious visitors

Natural second-click destinations from Tier 1 pages.

| # | Screen | Route | Reached from | Purpose |
|---|--------|-------|--------------|---------|
| 6 | **Grow** | `/grow` | Dashboard sidebar / nav | Forecast + goal tracking — completes the 4-engine picture |
| 7 | **Alert Detail** | `/protect/alert-detail` | Protect → click alert | SHAP explainability deep-dive — proves AI transparency |
| 8 | **Execution History** | `/execute/history` | Execute → "View history" | TransactionTable showing audit-linked actions |
| 9 | **Audit Ledger** | `/govern/audit` | Govern → "View audit log" | 1,247 auditable entries — governance at scale |
| 10 | **Settings** | `/settings` | Nav | User control: notification prefs, security, AI tuning |
| 11 | **Goal Detail** | `/grow/goal` | Grow → goal card | Rich visual: ScoreRing + ContributionChart + timeline |
| 12 | **Scenarios** | `/grow/scenarios` | Grow → "Plan scenarios" | What-if simulator — proves ML forecasting depth |

### Tier 3: "Completeness" — 6 screens that prove product breadth

Exist to make the product feel complete, not to be primary destinations.

| # | Screen | Route | Purpose |
|---|--------|-------|---------|
| 13 | **Alerts Hub** | `/dashboard/alerts` | All alerts in one feed |
| 14 | **Approval Queue** | `/execute/approval` | Consent-first flow detail |
| 15 | **Trust Config** | `/govern/trust` | Trust slider configuration |
| 16 | **AI Settings** | `/settings/ai` | AI tunability controls |
| 17 | **Help** | `/help` | Support infrastructure |
| 18 | **Onboarding** | `/onboarding/connect` | First-time experience |

### Keep but low priority

| Screen | Route | Rationale |
|--------|-------|-----------|
| Insights Feed | `/dashboard/insights` | DashboardInsightsPanel already on Dashboard |
| Activity Timeline | `/dashboard/timeline` | ActivityTimeline on Dashboard sidebar |
| Notifications | `/dashboard/notifications` | Not a differentiator |
| Dispute Flow | `/protect/dispute` | Shows multi-step workflow maturity |
| Recommendations | `/grow/recommendations` | AI recommendation with explainability |
| Audit Detail | `/govern/audit-detail` | Single decision deep-dive |
| Data Rights | `/settings/rights` | GDPR compliance demonstration |

### Deprioritize (merge content upward)

| Screen | Route | Recommendation |
|--------|-------|----------------|
| Registry | `/govern/registry` | Merge key content into `/govern` |
| Oversight Queue | `/govern/oversight` | Merge key content into `/govern` |
| Policy & Models | `/govern/policy` | Merge key content into `/govern` |
| Integrations | `/settings/integrations` | Low demo value |

### Auth & public pages (no changes needed)

| Screen | Route |
|--------|-------|
| Trust & Security | `/trust` |
| Pricing | `/pricing` |
| Signup | `/signup` |
| Login | `/login` |
| Recovery | `/recovery` |

**Total active screens: ~28** (reduced from 36+)

---

## 4. Visitor Journey Map

```
QR Code Scan (Slide 09)
    |
    v
[1] Landing (/)
    "Safer satisfying money decisions, in one place."
    See 4 engine cards, trust pulse metrics
    CTA: "Open Dashboard" (primary) or click any engine
    |
    v
[2] Dashboard (/dashboard)
    Command center: trust index 0.92, threat level Low,
    cash flow forecast, 3 queued actions, alerts feed
    Natural exits:
      click alert       --> Protect
      click action      --> Execute
      click forecast    --> Grow
      click audit badge --> Govern
    |
    v (most likely: click the active alert)
[3] Protect (/protect)
    Active threat detection: 3 signals, ScoreRing,
    SHAP explainability, "Block & Investigate" CTA
    Natural exits:
      click alert detail --> /protect/alert-detail
      click action queue --> Execute
    |
    v
[4] Execute (/execute)
    Action queue: 5 pending actions, savings calculator,
    approve/decline buttons, auto-save rules
    Natural exits:
      "View history" --> /execute/history (TransactionTable)
      audit link     --> Govern
    |
    v
[5] Govern (/govern)
    Compliance 96%, CategoryScoreBar breakdown,
    privacy controls, audit log summary
    Natural exits:
      "View full audit" --> /govern/audit (1,247 entries)
      nav               --> Dashboard (loop complete)
```

**Key principle**: Every screen has ONE clear exit to the next engine. The visitor naturally flows through the 4-engine loop without needing a guide.

---

## 5. Per-Screen Content Specification (Tier 1)

### Screen 1: Landing (`/`)

**Goal**: "This is real. This is impressive."

| Section | Content | Component |
|---------|---------|-----------|
| Hero | Product name + tagline + one-liner value prop | PageShell hero (command variant) |
| Trust metrics | Confidence, coverage, latency — proves system is "running" | KPI strip |
| Engine cards | 4 cards with one-sentence descriptions and links | AdaptiveCardGrid |
| CTA | "Open Dashboard" (primary) | entry-btn--primary |
| Social proof | MIT CTO Program badge, Group 7 attribution | Footer section |

**Critical**: Must feel like a real SaaS landing page, not a school project.

### Screen 2: Dashboard (`/dashboard`)

**Goal**: "All 4 engines are working together."

| Section | Content | Component |
|---------|---------|-----------|
| Trust pulse | Composite confidence 0.92 from all engines | TrustIndexCard |
| AI insight | Top recommendation with SHAP factors | ExplainableInsightPanel |
| Forecast | 30-day cash flow with Monte Carlo bands | ForecastBandChart |
| Alerts | 2 unresolved alerts | AlertsHub |
| Actions | 3 ranked by projected impact | MissionActionList |
| Engine strip | All 4 engines with status indicators | EngineHealthStrip |
| Risk gauge | Threat level: Low (0.12) | RiskScoreDial |
| Wellness | Financial health snapshot | WellnessCard |
| Activity | Cross-engine activity timeline | ActivityTimeline |
| Governance | Audit ID + verified badge | GovernContractSet + GovernVerifiedBadge |

**Critical**: Information density must feel professional, not academic.

### Screen 3: Protect (`/protect`)

**Goal**: "The AI detected a real threat and can explain why."

| Section | Content | Component |
|---------|---------|-----------|
| Threat table | 3 active signals with severity/confidence | SignalRow / TransactionTable |
| Risk visual | Composite risk score ring | ScoreRing |
| Evidence | "3 signals detected, Confidence 0.94, Model FraudDetectionV3.2" | ProofLine |
| Quick actions | Freeze, Investigate, Escalate | MissionActionList |
| Scoring formula | Explains the threat scoring methodology | DefinitionLine |
| Factors | SHAP-style contribution breakdown | FactorsDropdown |
| Governance | Audit trail footer | GovernContractSet |

**Critical**: The explainability (SHAP factors) differentiates from every competitor.

### Screen 4: Execute (`/execute`)

**Goal**: "Human approval before every action. Reversible."

| Section | Content | Component |
|---------|---------|-----------|
| Action queue | Bill negotiations, auto-saves, subscription cancels | ActionQueueCard / MissionDataRows |
| Per-action detail | Confidence, projected savings, approve/decline | ActionQueueItem |
| Auto-save rules | Toggleable automation with caps | AutoSaveRuleCard / MissionToggle |
| Success rate | Execution success visualization | ScoreRing |
| Savings proof | Total realized + rollback coverage | ProofLine |
| Outcome preview | What happens if approved | ActionOutcomePreview |
| Governance | Audit trail footer | GovernContractSet |

**Critical**: The consent-first UX must be visible — buttons, not auto-actions.

### Screen 5: Govern (`/govern`)

**Goal**: "Every decision auditable. Full compliance."

| Section | Content | Component |
|---------|---------|-----------|
| Compliance score | 96/100 composite ring | ScoreRing |
| Category breakdown | Data Privacy 98, Fair Lending 94, AML/KYC 92, Consumer Protection 100 | CategoryScoreBar |
| Privacy controls | Data sharing, consent toggles | PrivacyControlCard |
| Audit summary | 1,247 decisions with link to full ledger | AuditLedgerTable preview |
| Verification | Govern verified badge + human review CTA | GovernVerifiedBadge + HumanReviewCTA |
| Governance | Full contract set | GovernContractSet |

**Critical**: Must feel like bank-grade compliance infrastructure, not a checkbox.

---

## 6. v0 Design Prompt Priorities

Based on the tiered architecture, visual design effort should focus on:

### HIGH Priority (Tier 1 — must be visually flawless)

| Screen | Status | Notes |
|--------|--------|-------|
| `/dashboard` | Partially done | Needs NetWorthHero integration, visual polish |
| `/` (Landing) | Exists | May need visual refinement |
| `/protect` | Exists | Verify ScoreRing + SHAP display |
| `/execute` | Exists | Verify action queue UX |
| `/govern` | Exists | Verify CategoryScoreBar integration |

### MEDIUM Priority (Tier 2 — should look good)

| Screen | Status | Notes |
|--------|--------|-------|
| `/protect/alert-detail` | Exists | Rich mock data, SHAP deep-dive |
| `/execute/history` | Enhanced | TransactionTable + MilestonesTimeline just integrated |
| `/grow/scenarios` | Enhanced | ContributionChart just integrated |
| `/grow` | Exists | Core forecast + goals |
| `/settings` | Enhanced | Notification/security toggles |

### LOW Priority (Tier 3 — functional is sufficient)

- `/govern/trust`, `/settings/ai`, `/help`, `/onboarding/connect`
- Auth pages (exist, functional)

### CUT from v0 prompt list

- `/govern/registry` — merge key content into `/govern`
- `/govern/oversight` — merge key content into `/govern`
- `/govern/policy` — merge key content into `/govern`
- `/settings/integrations` — low demo value
- `/dashboard/notifications` — low demo value

---

## 7. Navigation Design Rules

### Rule 1: Every Tier 1 screen has a primary exit
```
Landing  --> Dashboard  (CTA button)
Dashboard --> Protect   (click alert)
Protect   --> Execute   (click action queue)
Execute   --> Govern    (audit link)
Govern    --> Dashboard (nav / loop complete)
```

### Rule 2: Tier 2 screens are one click from Tier 1
Each Tier 2 screen is reachable from its parent Tier 1 screen via a visible link/button.

### Rule 3: Bottom nav always available
The BottomNav (mobile) and AppNav (desktop) provide constant access to all 5 Tier 1 screens.

### Rule 4: GovernContractSet on every screen
Every screen in Tiers 1-2 includes a GovernContractSet footer with audit ID, model version, and explanation version.

---

## 8. Content Density Guidelines

### Information hierarchy per screen
1. **Hero section**: One-line kicker + headline + 4 KPIs with sparklines
2. **Primary feed**: 2-4 content cards with ProofLine evidence
3. **Decision rail**: 2-3 sidebar cards with supporting data
4. **Footer**: GovernContractSet + optional GovernVerifiedBadge

### Data realism
- All mock data should use consistent, plausible numbers
- Dollar amounts in the hundreds-to-thousands range (personal finance)
- Confidence scores between 0.80-0.97 (realistic ML range)
- Dates within the last 30 days
- Audit IDs follow format: `GV-YYYY-MMDD-XXX`

### Tone
- Headlines: Assertive, present-tense, evidence-backed
- Proof lines: Claim + evidence + source + basis
- CTAs: Action-oriented, specific ("Send to Execute", not "Learn more")

---

## 9. Implementation Checklist

- [ ] Write this document to `docs/mit-demo-content-strategy.md`
- [ ] Verify all Tier 1 screens build without errors
- [ ] Ensure navigation flow: Landing → Dashboard → Protect → Execute → Govern
- [ ] Add navigation hints on each Tier 1 screen to guide the flow
- [ ] Visual audit at 375px (mobile) and 1440px (desktop)
- [ ] Run `npm run build` and `npm run test:run`
- [ ] Manual walkthrough: QR → Landing → Dashboard → Protect → Execute → Govern in under 2 minutes
