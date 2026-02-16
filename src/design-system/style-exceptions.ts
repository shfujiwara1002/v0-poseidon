export type StyleExceptionKind =
  | 'css-var-injection'
  | 'svg-or-chart-prop'
  | 'library-required-inline-style';

export interface StyleExceptionRule {
  file: string;
  kind: StyleExceptionKind;
  reason: string;
}

export const STYLE_EXCEPTION_RULES: StyleExceptionRule[] = [
  {
    file: 'src/components/ProofLine.tsx',
    kind: 'css-var-injection',
    reason: 'Proof accent color is a slot-level CSS variable.',
  },
  {
    file: 'src/components/SavingsGoalCard.tsx',
    kind: 'css-var-injection',
    reason: 'Progress fill is driven by CSS variable percentage.',
  },
  {
    file: 'src/components/Sparkline.tsx',
    kind: 'svg-or-chart-prop',
    reason: 'Chart width and height are passed through runtime numeric props.',
  },
  {
    file: 'src/components/CashFlowChart.tsx',
    kind: 'svg-or-chart-prop',
    reason: 'Recharts tooltip and axis styles require object props for controlled rendering.',
  },
  {
    file: 'src/components/EngineHealthStrip.tsx',
    kind: 'css-var-injection',
    reason: 'Engine confidence progress width is injected via CSS variable.',
  },
  {
    file: 'src/components/DataRightsPanel.tsx',
    kind: 'css-var-injection',
    reason: 'Dynamic toggle/progress styling via CSS variable.',
  },
  {
    file: 'src/components/RiskScoreDial.tsx',
    kind: 'svg-or-chart-prop',
    reason: 'SVG arc rotation and stroke-dasharray require runtime numeric props.',
  },
  {
    file: 'src/components/FactorsDropdown.tsx',
    kind: 'css-var-injection',
    reason: 'Factor contribution bar width driven by CSS variable percentage.',
  },
  {
    file: 'src/components/ForecastBandChart.tsx',
    kind: 'svg-or-chart-prop',
    reason: 'Recharts area/line styles require object props for band rendering.',
  },
  {
    file: 'src/components/TrustIndexCard.tsx',
    kind: 'css-var-injection',
    reason: 'Trust score gauge and trend indicator driven by CSS variable.',
  },
  {
    file: 'src/components/PolicyModelCards.tsx',
    kind: 'css-var-injection',
    reason: 'Model status indicator colors injected via CSS variable.',
  },
  {
    file: 'src/components/OversightQueueTable.tsx',
    kind: 'css-var-injection',
    reason: 'Queue priority and status indicator colors via CSS variable.',
  },
  {
    file: 'src/components/AuditLedgerTable.tsx',
    kind: 'css-var-injection',
    reason: 'Audit severity indicator colors via CSS variable.',
  },
  {
    file: 'src/pages/Notifications.tsx',
    kind: 'css-var-injection',
    reason: 'Notification badge count position via CSS variable.',
  },
  {
    file: 'src/pages/AlertsHub.tsx',
    kind: 'css-var-injection',
    reason: 'Alert severity color indicator via CSS variable.',
  },
  {
    file: 'src/pages/ActivityTimelinePage.tsx',
    kind: 'css-var-injection',
    reason: 'Timeline connector height via CSS variable.',
  },
] as const;

export const STYLE_EXCEPTION_FILES = new Set(
  STYLE_EXCEPTION_RULES.map((rule) => rule.file),
);

export const COLOR_LITERAL_EXCEPTION_FILES = new Set([
  'src/styles/system/tokens.css',
]);
