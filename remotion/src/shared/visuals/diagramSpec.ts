import { theme } from '../theme';

export type DiagramZoneId = 'institution' | 'burden';
export type DiagramNodeRole = 'institution' | 'consumer';
export type DiagramEdgeKind = 'available-data' | 'broken-action';
export type DiagramEdgeSeverity = 'low' | 'medium' | 'high';

export type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type ZoneSpec = {
  id: DiagramZoneId;
  label: string;
  sublabel?: string;
  rect: Rect;
  style: {
    rx: number;
    fill: string;
    stroke: string;
    strokeWidth: number;
    strokeDasharray?: string;
    labelColor: string;
  };
};

export type DiagramNodeSpec = {
  id: string;
  label: string;
  subtitle?: string;
  role: DiagramNodeRole;
  zoneId: DiagramZoneId;
  rect: Rect;
  accent: string;
  /** Icon file base name (e.g. 'vault' → icon-vault.svg) */
  icon?: string;
};

export type DiagramEdgeBreakSpec = {
  centerT?: number;
  gapT?: number;
  crossSize?: number;
};

export type DiagramEdgeLabelSpec = {
  text: string;
  position: 'near-source' | 'midpoint' | 'near-target' | 'at-break';
};

export type DiagramEdgeSpec = {
  id: string;
  from: string;
  to: string;
  kind: DiagramEdgeKind;
  severity: DiagramEdgeSeverity;
  label?: string;
  edgeLabel?: DiagramEdgeLabelSpec;
  bend?: number;
  break?: DiagramEdgeBreakSpec;
  /** Micro-stat displayed near the break point */
  microStat?: string;
};

export type DiagramAnnotationSpec = {
  id: string;
  label: string;
  rect: Rect;
  tone?: 'warning' | 'neutral';
  /** Edge to visually anchor this annotation to */
  edgeId?: string;
};

export type LegendItemSpec = {
  id: string;
  label: string;
  kind: DiagramEdgeKind;
};

export type LegendSpec = {
  rect: Rect;
  title: string;
  items: LegendItemSpec[];
};

export type ZoneBadge = {
  text: string;
  tone: 'success' | 'danger';
  rect: Rect;
};

export type DiagramSpec = {
  canvas: { width: number; height: number };
  zones: {
    institution: ZoneSpec;
    burden: ZoneSpec;
  };
  nodes: DiagramNodeSpec[];
  edges: DiagramEdgeSpec[];
  annotations: DiagramAnnotationSpec[];
  legend: LegendSpec;
  /** Summary badges at canvas edges */
  zoneBadges?: ZoneBadge[];
};

const canvas = { width: 900, height: 500 };
const institutionZoneRect: Rect = {
  x: 20,
  y: 54,
  width: 860,
  height: 412,
};
const burdenZoneRect: Rect = {
  x: 244,
  y: 140,
  width: 412,
  height: 228,
};
const institutionNodeWidth = 168;
const institutionNodeHeight = 68;

export const fracturedTopologySpec: DiagramSpec = {
  canvas,
  zones: {
    institution: {
      id: 'institution',
      label: 'Institution Silos',
      rect: institutionZoneRect,
      style: {
        rx: 18,
        fill: 'url(#map-bg-gradient)',
        stroke: 'rgba(148,163,184,0.38)',
        strokeWidth: 2,
        labelColor: 'rgba(255,255,255,0.72)',
      },
    },
    burden: {
      id: 'burden',
      label: 'Integration Burden',
      sublabel: 'manual coordination',
      rect: burdenZoneRect,
      style: {
        rx: 18,
        fill: 'rgba(4,22,30,0.26)',
        stroke: 'rgba(239,68,68,0.55)',
        strokeWidth: 2,
        strokeDasharray: '9 8',
        labelColor: theme.accent.red,
      },
    },
  },
  nodes: [
    {
      id: 'bank',
      label: 'Bank',
      subtitle: 'data visible',
      role: 'institution',
      zoneId: 'institution',
      icon: 'vault',
      rect: {
        x: 46,
        y: 100,
        width: institutionNodeWidth,
        height: institutionNodeHeight,
      },
      accent: theme.accent.blue,
    },
    {
      id: 'card',
      label: 'Card',
      subtitle: 'data visible',
      role: 'institution',
      zoneId: 'institution',
      icon: 'signal-beam',
      rect: {
        x: 686,
        y: 100,
        width: institutionNodeWidth,
        height: institutionNodeHeight,
      },
      accent: theme.accent.blue,
    },
    {
      id: 'invest',
      label: 'Invest',
      subtitle: 'data visible',
      role: 'institution',
      zoneId: 'institution',
      icon: 'horizon-spectrum',
      rect: {
        x: 46,
        y: 334,
        width: institutionNodeWidth,
        height: institutionNodeHeight,
      },
      accent: theme.accent.violet,
    },
    {
      id: 'cu',
      label: 'Credit Union',
      subtitle: 'data visible',
      role: 'institution',
      zoneId: 'institution',
      icon: 'shield',
      rect: {
        x: 686,
        y: 334,
        width: institutionNodeWidth,
        height: institutionNodeHeight,
      },
      accent: theme.accent.teal,
    },
    {
      id: 'you',
      label: 'YOU',
      subtitle: 'the integrator',
      role: 'consumer',
      zoneId: 'burden',
      rect: {
        x: 338,
        y: 200,
        width: 224,
        height: 108,
      },
      accent: theme.accent.cyan,
    },
  ],
  edges: [
    {
      id: 'edge-bank-data',
      from: 'bank',
      to: 'you',
      kind: 'available-data',
      severity: 'medium',
      label: 'data visibility',
    },
    {
      id: 'edge-card-data',
      from: 'card',
      to: 'you',
      kind: 'available-data',
      severity: 'medium',
      label: 'data visibility',
    },
    {
      id: 'edge-invest-data',
      from: 'invest',
      to: 'you',
      kind: 'available-data',
      severity: 'medium',
      label: 'data visibility',
    },
    {
      id: 'edge-cu-data',
      from: 'cu',
      to: 'you',
      kind: 'available-data',
      severity: 'medium',
      label: 'data visibility',
    },
    {
      id: 'edge-bank-action',
      from: 'you',
      to: 'bank',
      kind: 'broken-action',
      severity: 'high',
      label: 'action blocked',
      microStat: '~$15/mo',
      break: {
        centerT: 0.55,
        gapT: 0.85,
        crossSize: 7,
      },
    },
    {
      id: 'edge-card-action',
      from: 'you',
      to: 'card',
      kind: 'broken-action',
      severity: 'high',
      label: 'action blocked',
      microStat: '~$50/mo',
      break: {
        centerT: 0.55,
        gapT: 0.85,
        crossSize: 7,
      },
    },
    {
      id: 'edge-invest-action',
      from: 'you',
      to: 'invest',
      kind: 'broken-action',
      severity: 'high',
      label: 'action blocked',
      microStat: '~$38/mo',
      break: {
        centerT: 0.55,
        gapT: 0.85,
        crossSize: 7,
      },
    },
    {
      id: 'edge-cu-action',
      from: 'you',
      to: 'cu',
      kind: 'broken-action',
      severity: 'high',
      label: 'action blocked',
      microStat: '~$30/mo',
      break: {
        centerT: 0.55,
        gapT: 0.85,
        crossSize: 7,
      },
    },
  ],
  annotations: [
    {
      id: 'context-loss',
      label: 'context loss',
      edgeId: 'edge-bank-action',
      rect: {
        x: 0,
        y: 0,
        width: 94,
        height: 22,
      },
      tone: 'warning',
    },
    {
      id: 'handoff-delay',
      label: 'handoff delay',
      edgeId: 'edge-card-action',
      rect: {
        x: 0,
        y: 0,
        width: 110,
        height: 22,
      },
      tone: 'warning',
    },
    {
      id: 'fee-risk',
      label: 'fee risk',
      edgeId: 'edge-cu-action',
      rect: {
        x: 0,
        y: 0,
        width: 78,
        height: 22,
      },
      tone: 'warning',
    },
  ],
  legend: {
    rect: {
      x: 680,
      y: 456,
      width: 210,
      height: 22,
    },
    title: '',
    items: [
      { id: 'legend-data', label: 'data flow', kind: 'available-data' },
      { id: 'legend-action', label: 'broken action', kind: 'broken-action' },
    ],
  },
  zoneBadges: [
    {
      text: '✓ DATA AGGREGATION SOLVED',
      tone: 'success',
      rect: { x: 30, y: 40, width: 210, height: 22 },
    },
    {
      text: '✗ ACTION COORDINATION BROKEN',
      tone: 'danger',
      rect: { x: 30, y: 454, width: 244, height: 22 },
    },
  ],
};
