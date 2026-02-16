import React from 'react';
import { staticFile } from 'remotion';
import { theme } from '../theme';
import {
  DiagramAnnotationSpec,
  DiagramEdgeSeverity,
  DiagramEdgeSpec,
  DiagramNodeSpec,
  DiagramSpec,
  Rect,
  ZoneBadge,
  fracturedTopologySpec,
} from './diagramSpec';

type Point = {
  x: number;
  y: number;
};

interface VisualFracturedConnectionProps {
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  mode?: 'presentation' | 'diagnostic';
  /** Typography density: 'full' (default) or 'compact' for embedded use */
  density?: 'full' | 'compact';
  showLegend?: boolean;
  showAnnotations?: boolean;
  showMicroStats?: boolean;
  showZoneBadges?: boolean;
  spec?: DiagramSpec;
  debug?: boolean;
  debugGrid?: boolean;
  debugIds?: boolean;
}

/* ── geometry helpers ─────────────────────────────── */

const centerOf = (rect: Rect): Point => ({
  x: rect.x + rect.width / 2,
  y: rect.y + rect.height / 2,
});

const rectEdgeTowardsPoint = (rect: Rect, target: Point, inset = 0): Point => {
  const c = centerOf(rect);
  const dx = target.x - c.x;
  const dy = target.y - c.y;
  const safeDx = Math.abs(dx) < 0.0001 ? 0.0001 : dx;
  const safeDy = Math.abs(dy) < 0.0001 ? 0.0001 : dy;
  const sx = (rect.width / 2 - inset) / Math.abs(safeDx);
  const sy = (rect.height / 2 - inset) / Math.abs(safeDy);
  const scale = Math.min(sx, sy);
  return { x: c.x + dx * scale, y: c.y + dy * scale };
};

const lerpPoint = (a: Point, b: Point, t: number): Point => ({
  x: a.x + (b.x - a.x) * t,
  y: a.y + (b.y - a.y) * t,
});

const curvedPath = (start: Point, end: Point, bend = 0): string => {
  const mid = lerpPoint(start, end, 0.5);
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const length = Math.max(Math.hypot(dx, dy), 1);
  const nx = -dy / length;
  const ny = dx / length;
  const control = { x: mid.x + nx * bend, y: mid.y + ny * bend };
  return `M ${start.x} ${start.y} Q ${control.x} ${control.y} ${end.x} ${end.y}`;
};

const quadBezierPoint = (start: Point, control: Point, end: Point, t: number): Point => {
  const u = 1 - t;
  return {
    x: u * u * start.x + 2 * u * t * control.x + t * t * end.x,
    y: u * u * start.y + 2 * u * t * control.y + t * t * end.y,
  };
};

const getControlPoint = (start: Point, end: Point, bend: number): Point => {
  const mid = lerpPoint(start, end, 0.5);
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const length = Math.max(Math.hypot(dx, dy), 1);
  return { x: mid.x + (-dy / length) * bend, y: mid.y + (dx / length) * bend };
};

const severityStroke = (severity: DiagramEdgeSeverity, kind: 'data' | 'action'): number => {
  if (kind === 'data') return 1.5;
  if (severity === 'high') return 3.2;
  if (severity === 'medium') return 2.8;
  return 2;
};

const nodeRect = (node: DiagramNodeSpec): Rect => node.rect;

const annotationTone = (annotation: DiagramAnnotationSpec) => {
  if (annotation.tone === 'neutral') {
    return { fill: 'rgba(255,255,255,0.08)', stroke: 'rgba(255,255,255,0.3)', text: 'rgba(255,255,255,0.78)' };
  }
  return { fill: 'rgba(239,68,68,0.14)', stroke: 'rgba(239,68,68,0.46)', text: '#fca5a5' };
};

/* ── helper: compute break center for an edge ─────── */

const computeBreakCenter = (
  edge: DiagramEdgeSpec,
  nodeById: Record<string, DiagramNodeSpec>,
  canvasWidth: number,
): Point | null => {
  const from = nodeById[edge.from];
  const to = nodeById[edge.to];
  if (!from || !to) return null;
  const start = rectEdgeTowardsPoint(from.rect, centerOf(to.rect), 10);
  const end = rectEdgeTowardsPoint(to.rect, centerOf(from.rect), 10);
  const defaultBend = to.rect.x < canvasWidth / 2 ? -22 : 22;
  const bend = edge.bend ?? defaultBend;
  const control = getControlPoint(start, end, bend);
  const centerT = edge.break?.centerT ?? 0.44;
  return quadBezierPoint(start, control, end, centerT);
};

/* ── icon path helper ─────────────────────────────── */

const iconSrc = (name: string): string => {
  const base = name.endsWith('.svg') ? name.slice(0, -4) : name;
  const fileName = base.startsWith('icon-') ? `${base}.svg` : `icon-${base}.svg`;
  return staticFile(`assets/svg/icons/${fileName}`);
};

/* ── component ────────────────────────────────────── */

export const VisualFracturedConnection: React.FC<VisualFracturedConnectionProps> = ({
  width,
  height,
  style,
  mode = 'presentation',
  density = 'full',
  showLegend = true,
  showAnnotations = true,
  showMicroStats = true,
  showZoneBadges = true,
  spec,
  debug = false,
  debugGrid = true,
  debugIds = true,
}) => {
  const compact = density === 'compact';
  const resolvedSpec = spec ?? fracturedTopologySpec;
  const canvas = resolvedSpec.canvas;
  const renderWidth = width ?? canvas.width;
  const renderHeight = height ?? canvas.height;
  const institutionZone = resolvedSpec.zones.institution;
  const burdenZone = resolvedSpec.zones.burden;

  const nodes = resolvedSpec.nodes;
  const nodeById = Object.fromEntries(nodes.map((node) => [node.id, node])) as Record<string, DiagramNodeSpec>;
  const institutionNodes = nodes.filter((node) => node.role === 'institution');
  const consumerNodes = nodes.filter((node) => node.role === 'consumer');

  const availableDataEdges = resolvedSpec.edges.filter((edge) => edge.kind === 'available-data');
  const brokenActionEdges = resolvedSpec.edges.filter((edge) => edge.kind === 'broken-action');
  const annotations = resolvedSpec.annotations;

  const debugTextStyle: React.CSSProperties = {
    fontFamily: theme.typography.fontMono,
    fontSize: 9,
    fill: 'rgba(255,255,255,0.6)',
  };

  const burdenCenter = centerOf(burdenZone.rect);

  /* ── pre-compute break centers for annotations ──── */
  const edgeBreakCenters: Record<string, Point> = {};
  for (const edge of brokenActionEdges) {
    const pt = computeBreakCenter(edge, nodeById, canvas.width);
    if (pt) edgeBreakCenters[edge.id] = pt;
  }

  return (
    <svg width={renderWidth} height={renderHeight} viewBox={`0 0 ${canvas.width} ${canvas.height}`} style={style}>
      {/* ──── defs ──────────────────────────────────── */}
      <defs>
        <radialGradient id="map-bg-gradient" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="rgba(20,28,44,0.6)" />
          <stop offset="100%" stopColor="rgba(8,10,18,0.22)" />
        </radialGradient>
        <marker id="arrow-cyan" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
          <path d="M0,0 L9,4.5 L0,9 z" fill={theme.accent.cyan} fillOpacity={0.5} />
        </marker>
        {/* soft glow for break points */}
        <filter id="diagram-soft-glow" x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="2.6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* stronger glow for break symbols */}
        <filter id="break-glow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0.2  0 0 0 0 0  0 0 0 0 0  0 0 0 1.2 0"
            result="reddened"
          />
          <feMerge>
            <feMergeNode in="reddened" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* radial focal glow for YOU node */}
        <radialGradient id="you-focal-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(0,240,255,0.08)" />
          <stop offset="60%" stopColor="rgba(0,240,255,0.03)" />
          <stop offset="100%" stopColor="rgba(0,240,255,0)" />
        </radialGradient>
        {/* glass surface for nodes */}
        <filter id="node-glass" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="1.2" in="SourceAlpha" result="blur" />
          <feOffset dx="0" dy="1" in="blur" result="offset" />
          <feMerge>
            <feMergeNode in="offset" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* text glow for edge labels */}
        <filter id="text-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ──── debug grid ───────────────────────────── */}
      {debug && debugGrid && (
        <g>
          {Array.from({ length: Math.floor(canvas.width / 40) + 1 }, (_, i) => (
            <line key={`gx-${i}`} x1={i * 40} y1={0} x2={i * 40} y2={canvas.height} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
          ))}
          {Array.from({ length: Math.floor(canvas.height / 40) + 1 }, (_, i) => (
            <line key={`gy-${i}`} x1={0} y1={i * 40} x2={canvas.width} y2={i * 40} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
          ))}
        </g>
      )}

      {/* ──── Layer 0: zone badges (solved / broken) ─ */}
      {showZoneBadges && resolvedSpec.zoneBadges?.map((badge: ZoneBadge) => {
        const isSuccess = badge.tone === 'success';
        const bgColor = isSuccess ? 'rgba(20,184,166,0.10)' : 'rgba(239,68,68,0.12)';
        const borderColor = isSuccess ? 'rgba(20,184,166,0.45)' : 'rgba(239,68,68,0.50)';
        const textColor = isSuccess ? 'rgba(94,234,212,0.9)' : '#fca5a5';
        return (
          <g key={badge.text}>
            <rect
              x={badge.rect.x}
              y={badge.rect.y}
              width={badge.rect.width}
              height={badge.rect.height}
              rx={badge.rect.height / 2}
              fill={bgColor}
              stroke={borderColor}
              strokeWidth={1}
            />
            <text
              x={badge.rect.x + badge.rect.width / 2}
              y={badge.rect.y + badge.rect.height - 6}
              textAnchor="middle"
              style={{
                fontFamily: theme.typography.fontMono,
                fontSize: 9,
                letterSpacing: '0.08em',
                fill: textColor,
              }}
            >
              {badge.text}
            </text>
          </g>
        );
      })}

      {/* ──── Layer A: zones + structure ────────────── */}
      <rect
        x={institutionZone.rect.x}
        y={institutionZone.rect.y}
        width={institutionZone.rect.width}
        height={institutionZone.rect.height}
        rx={institutionZone.style.rx}
        fill={institutionZone.style.fill}
        stroke={institutionZone.style.stroke}
        strokeWidth={institutionZone.style.strokeWidth}
        strokeDasharray={institutionZone.style.strokeDasharray}
      />
      <rect
        x={burdenZone.rect.x}
        y={burdenZone.rect.y}
        width={burdenZone.rect.width}
        height={burdenZone.rect.height}
        rx={burdenZone.style.rx}
        fill={burdenZone.style.fill}
        stroke={burdenZone.style.stroke}
        strokeWidth={burdenZone.style.strokeWidth}
        strokeDasharray={burdenZone.style.strokeDasharray}
      />

      {/* burden zone pulsing ring */}
      <circle
        cx={burdenCenter.x}
        cy={burdenCenter.y}
        r={Math.min(burdenZone.rect.width, burdenZone.rect.height) / 2 + 10}
        fill="none"
        stroke="rgba(239,68,68,0.30)"
        strokeWidth={1}
        strokeDasharray="6 9"
      />

      {/* zone labels — institution label at top-right inside zone */}
      <text
        x={institutionZone.rect.x + institutionZone.rect.width - 14}
        y={institutionZone.rect.y + 18}
        textAnchor="end"
        style={{
          fontFamily: theme.typography.fontMono,
          fontSize: 10,
          letterSpacing: '0.10em',
          fill: institutionZone.style.labelColor,
          opacity: 0.55,
        }}
      >
        {institutionZone.label}
      </text>
      {/* burden zone: primary label ("Your Job") + sublabel — top-right inside zone */}
      <text
        x={burdenZone.rect.x + burdenZone.rect.width - 12}
        y={burdenZone.rect.y + 16}
        textAnchor="end"
        style={{
          fontFamily: theme.typography.fontHeader,
          fontSize: 13,
          fontWeight: 600,
          fill: burdenZone.style.labelColor,
          opacity: 0.75,
        }}
      >
        {burdenZone.label}
      </text>
      {burdenZone.sublabel && (
        <text
          x={burdenZone.rect.x + burdenZone.rect.width - 12}
          y={burdenZone.rect.y + 29}
          textAnchor="end"
          style={{
            fontFamily: theme.typography.fontMono,
            fontSize: 9,
            letterSpacing: '0.06em',
            fill: 'rgba(255,255,255,0.40)',
          }}
        >
          {burdenZone.sublabel}
        </text>
      )}

      {mode === 'diagnostic' && (
        <>
          <line
            x1={canvas.width / 2}
            y1={institutionZone.rect.y}
            x2={canvas.width / 2}
            y2={institutionZone.rect.y + institutionZone.rect.height}
            stroke="rgba(148,163,184,0.22)"
            strokeWidth={1}
            strokeDasharray="4 8"
          />
          <line
            x1={institutionZone.rect.x}
            y1={canvas.height / 2}
            x2={institutionZone.rect.x + institutionZone.rect.width}
            y2={canvas.height / 2}
            stroke="rgba(148,163,184,0.22)"
            strokeWidth={1}
            strokeDasharray="4 8"
          />
        </>
      )}

      {/* ──── Layer 0.5: YOU focal glow ────────────── */}
      {consumerNodes.map((node) => (
        <ellipse
          key={`focal-${node.id}`}
          cx={node.rect.x + node.rect.width / 2}
          cy={node.rect.y + node.rect.height / 2}
          rx={200}
          ry={160}
          fill="url(#you-focal-glow)"
        />
      ))}

      {/* ──── Layer B: data edges (thin, faded — no labels, legend suffices) */}
      {availableDataEdges.map((edge) => {
        const from = nodeById[edge.from];
        const to = nodeById[edge.to];
        if (!from || !to) return null;
        const fromRect = nodeRect(from);
        const toRect = nodeRect(to);
        const start = rectEdgeTowardsPoint(fromRect, centerOf(toRect), 8);
        const end = rectEdgeTowardsPoint(toRect, centerOf(fromRect), 10);
        const defaultBend = fromRect.x < canvas.width / 2 ? 14 : -14;
        const path = curvedPath(start, end, edge.bend ?? defaultBend);

        return (
          <path
            key={edge.id}
            d={path}
            fill="none"
            stroke={theme.accent.cyan}
            strokeWidth={severityStroke(edge.severity, 'data')}
            strokeDasharray="5 7"
            opacity={0.45}
            markerEnd="url(#arrow-cyan)"
          />
        );
      })}

      {/* ──── Layer B: broken action edges (thick, hot) */}
      {brokenActionEdges.map((edge) => {
        const from = nodeById[edge.from];
        const to = nodeById[edge.to];
        if (!from || !to) return null;
        const fromRect = nodeRect(from);
        const toRect = nodeRect(to);
        const start = rectEdgeTowardsPoint(fromRect, centerOf(toRect), 10);
        const end = rectEdgeTowardsPoint(toRect, centerOf(fromRect), 10);
        const breakSpec = edge.break ?? {};
        const centerT = breakSpec.centerT ?? 0.44;
        const approachT = breakSpec.gapT ?? 0.88;
        const defaultBend = toRect.x < canvas.width / 2 ? -22 : 22;
        const bend = edge.bend ?? defaultBend;
        const control = getControlPoint(start, end, bend);
        const breakCenter = quadBezierPoint(start, control, end, centerT);
        const approachPt = quadBezierPoint(start, control, end, centerT * approachT);
        const resumeT = centerT + (1 - approachT) * centerT * 0.5;
        const resumePt = quadBezierPoint(start, control, end, Math.min(resumeT + 0.12, 0.55));
        const crossSize = breakSpec.crossSize ?? 6;
        const ringRadius = crossSize + 3;

        /* micro-stat placement: push outward from diagram center */
        const isTargetLeft = toRect.x < canvas.width / 2;
        const isTargetTop = toRect.y < canvas.height / 2;
        const statDx = isTargetLeft ? -18 : 18;
        const statDy = isTargetTop ? -18 : 18;
        const statAnchor = isTargetLeft ? 'end' as const : 'start' as const;

        return (
          <g key={edge.id}>
            {/* approach segment: solid amber, strong */}
            <path
              d={curvedPath(start, approachPt, bend)}
              fill="none"
              stroke={theme.accent.amber}
              strokeWidth={severityStroke(edge.severity, 'action')}
              opacity={0.85}
            />
            {/* trailing segment: faded */}
            <path
              d={curvedPath(resumePt, end, bend * 0.6)}
              fill="none"
              stroke={theme.accent.amber}
              strokeWidth={severityStroke(edge.severity, 'action') - 1}
              opacity={0.28}
            />
            {/* break symbol: ring + cross */}
            <circle
              cx={breakCenter.x}
              cy={breakCenter.y}
              r={ringRadius}
              fill="rgba(239,68,68,0.20)"
              stroke={theme.accent.red}
              strokeWidth={2.2}
              filter="url(#break-glow)"
            />
            <line
              x1={breakCenter.x - crossSize}
              y1={breakCenter.y - crossSize}
              x2={breakCenter.x + crossSize}
              y2={breakCenter.y + crossSize}
              stroke={theme.accent.red}
              strokeWidth={2.4}
              strokeLinecap="round"
            />
            <line
              x1={breakCenter.x - crossSize}
              y1={breakCenter.y + crossSize}
              x2={breakCenter.x + crossSize}
              y2={breakCenter.y - crossSize}
              stroke={theme.accent.red}
              strokeWidth={2.4}
              strokeLinecap="round"
            />

            {/* micro-stat near break — the single label per edge */}
            {showMicroStats && edge.microStat && (
              <text
                x={breakCenter.x + statDx}
                y={breakCenter.y + statDy}
                textAnchor={statAnchor}
                style={{
                  fontFamily: theme.typography.fontMono,
                  fontSize: compact ? 10 : 12,
                  fontWeight: 700,
                  fill: theme.accent.red,
                  letterSpacing: '0.02em',
                }}
              >
                {edge.microStat}
              </text>
            )}
          </g>
        );
      })}

      {/* ──── Layer C: institution nodes ────────────── */}
      {institutionNodes.map((node) => {
        const iconSize = 22;
        const iconX = node.rect.x + 10;
        const iconY = node.rect.y + (node.rect.height - iconSize) / 2;
        const textX = node.icon ? node.rect.x + 38 : node.rect.x + 34;
        return (
          <g key={node.id} filter="url(#node-glass)">
            {/* node background */}
            <rect
              x={node.rect.x}
              y={node.rect.y}
              width={node.rect.width}
              height={node.rect.height}
              rx={14}
              fill="rgba(5,14,24,0.88)"
              stroke={node.accent}
              strokeWidth={2}
            />
            {/* glass overlay */}
            <rect
              x={node.rect.x}
              y={node.rect.y}
              width={node.rect.width}
              height={node.rect.height / 2}
              rx={14}
              fill="rgba(255,255,255,0.04)"
            />

            {/* icon */}
            {node.icon && (
              <image
                href={iconSrc(node.icon)}
                x={iconX}
                y={iconY}
                width={iconSize}
                height={iconSize}
              />
            )}
            {/* indicator dot (if no icon) */}
            {!node.icon && (
              <circle cx={node.rect.x + 18} cy={node.rect.y + node.rect.height / 2} r={5} fill={node.accent} />
            )}

            <text
              x={textX}
              y={node.rect.y + 30}
              style={{
                fontFamily: theme.typography.fontHeader,
                fontSize: 20,
                fontWeight: 600,
                fill: 'rgba(255,255,255,0.94)',
              }}
            >
              {node.label}
            </text>
            <text
              x={textX}
              y={node.rect.y + 48}
              style={{
                fontFamily: theme.typography.fontMono,
                fontSize: 10,
                letterSpacing: '0.06em',
                fill: 'rgba(148,163,184,0.72)',
              }}
            >
              {node.subtitle ?? 'data visible'}
            </text>
          </g>
        );
      })}

      {/* ──── Layer C: consumer (YOU) node ──────────── */}
      {consumerNodes.map((node) => (
        <g key={node.id}>
          <rect
            x={node.rect.x}
            y={node.rect.y}
            width={node.rect.width}
            height={node.rect.height}
            rx={18}
            fill="rgba(0,24,32,0.52)"
            stroke="rgba(0,240,255,0.8)"
            strokeWidth={2}
          />
          {/* glass highlight on top half */}
          <rect
            x={node.rect.x + 1}
            y={node.rect.y + 1}
            width={node.rect.width - 2}
            height={node.rect.height / 2}
            rx={17}
            fill="rgba(255,255,255,0.04)"
          />
          <text
            x={node.rect.x + node.rect.width / 2}
            y={node.rect.y + 56}
            textAnchor="middle"
            style={{
              fontFamily: theme.typography.fontHeader,
              fontSize: 48,
              fontWeight: 700,
              fill: theme.accent.cyan,
            }}
            filter="url(#text-glow)"
          >
            {node.label}
          </text>
          {node.subtitle && (
            <text
              x={node.rect.x + node.rect.width / 2}
              y={node.rect.y + 78}
              textAnchor="middle"
              style={{
                fontFamily: theme.typography.fontMono,
                fontSize: 12,
                letterSpacing: '0.09em',
                fill: 'rgba(255,255,255,0.72)',
              }}
            >
              {node.subtitle}
            </text>
          )}
        </g>
      ))}

      {/* ──── Layer D: annotations (edge-anchored) ─── */}
      {showAnnotations &&
        annotations.map((annotation) => {
          const tone = annotationTone(annotation);
          let anchorPoint: Point | null = null;
          if (annotation.edgeId && edgeBreakCenters[annotation.edgeId]) {
            anchorPoint = edgeBreakCenters[annotation.edgeId];
          }

          /* Position: offset from break center — push outward avoiding nodes and micro-stats */
          let ax: number;
          let ay: number;
          if (anchorPoint) {
            const isLeft = anchorPoint.x < canvas.width / 2;
            const isTop = anchorPoint.y < canvas.height / 2;

            /* For top breaks: push annotation above; for bottom: push below */
            ax = isLeft
              ? anchorPoint.x - annotation.rect.width - 48
              : anchorPoint.x + 48;
            ay = isTop
              ? anchorPoint.y - 34
              : anchorPoint.y + 16;

            /* Avoid overlapping with institution nodes by checking proximity */
            for (const node of nodes) {
              if (node.role !== 'institution') continue;
              const nr = node.rect;
              const overlapX = ax < nr.x + nr.width + 6 && ax + annotation.rect.width > nr.x - 6;
              const overlapY = ay < nr.y + nr.height + 6 && ay + annotation.rect.height > nr.y - 6;
              if (overlapX && overlapY) {
                /* push annotation vertically away from the node center */
                if (ay + annotation.rect.height / 2 < nr.y + nr.height / 2) {
                  ay = nr.y - annotation.rect.height - 8;
                } else {
                  ay = nr.y + nr.height + 8;
                }
              }
            }

            /* clamp to canvas bounds */
            ax = Math.max(8, Math.min(ax, canvas.width - annotation.rect.width - 8));
            ay = Math.max(54, Math.min(ay, canvas.height - annotation.rect.height - 30));
          } else {
            ax = annotation.rect.x;
            ay = annotation.rect.y;
          }

          return (
            <g key={annotation.id}>
              {/* hairline from annotation to anchor */}
              {anchorPoint && (
                <line
                  x1={ax + annotation.rect.width / 2}
                  y1={ay + annotation.rect.height / 2}
                  x2={anchorPoint.x}
                  y2={anchorPoint.y}
                  stroke={tone.stroke}
                  strokeWidth={1}
                  strokeDasharray="3 4"
                  opacity={0.35}
                />
              )}
              <rect
                x={ax}
                y={ay}
                width={annotation.rect.width}
                height={annotation.rect.height}
                rx={annotation.rect.height / 2}
                fill={tone.fill}
                stroke={tone.stroke}
                strokeWidth={1}
              />
              <text
                x={ax + annotation.rect.width / 2}
                y={ay + annotation.rect.height - 7}
                textAnchor="middle"
                style={{
                  fontFamily: theme.typography.fontMono,
                  fontSize: compact ? 10 : 11,
                  letterSpacing: '0.05em',
                  fill: tone.text,
                }}
              >
                {annotation.label}
              </text>
            </g>
          );
        })}

      {/* ──── Layer E: minimal legend (footnote) ───── */}
      {showLegend && (
        <g>
          {resolvedSpec.legend.items.map((item, index) => {
            const itemX = resolvedSpec.legend.rect.x + index * 120;
            const lineY = resolvedSpec.legend.rect.y + 14;
            if (item.kind === 'available-data') {
              return (
                <g key={item.id}>
                  <line
                    x1={itemX}
                    y1={lineY}
                    x2={itemX + 28}
                    y2={lineY}
                    stroke={theme.accent.cyan}
                    strokeWidth={1.5}
                    strokeDasharray="5 5"
                    opacity={0.5}
                  />
                  <text
                    x={itemX + 34}
                    y={lineY + 3}
                    style={{
                      fontFamily: theme.typography.fontMono,
                      fontSize: 10,
                      fill: 'rgba(255,255,255,0.55)',
                    }}
                  >
                    {item.label}
                  </text>
                </g>
              );
            }
            return (
              <g key={item.id}>
                <line
                  x1={itemX}
                  y1={lineY}
                  x2={itemX + 20}
                  y2={lineY}
                  stroke={theme.accent.amber}
                  strokeWidth={2.5}
                />
                <circle
                  cx={itemX + 25}
                  cy={lineY}
                  r={4}
                  fill="rgba(239,68,68,0.2)"
                  stroke={theme.accent.red}
                  strokeWidth={1.2}
                />
                <text
                  x={itemX + 34}
                  y={lineY + 3}
                  style={{
                    fontFamily: theme.typography.fontMono,
                    fontSize: 10,
                    fill: 'rgba(255,255,255,0.55)',
                  }}
                >
                  {item.label}
                </text>
              </g>
            );
          })}
        </g>
      )}

      {/* ──── debug overlays ───────────────────────── */}
      {debug && debugIds && (
        <g>
          {nodes.map((node) => (
            <g key={`debug-node-${node.id}`}>
              <rect
                x={node.rect.x}
                y={node.rect.y}
                width={node.rect.width}
                height={node.rect.height}
                fill="none"
                stroke="rgba(255,255,255,0.24)"
                strokeWidth={1}
                strokeDasharray="4 4"
              />
              <text x={node.rect.x + 6} y={node.rect.y + 12} style={debugTextStyle}>
                {node.id}
              </text>
            </g>
          ))}
          {annotations.map((annotation) => {
            const ax = annotation.edgeId && edgeBreakCenters[annotation.edgeId]
              ? edgeBreakCenters[annotation.edgeId].x
              : annotation.rect.x;
            const ay = annotation.edgeId && edgeBreakCenters[annotation.edgeId]
              ? edgeBreakCenters[annotation.edgeId].y
              : annotation.rect.y;
            return (
              <g key={`debug-annotation-${annotation.id}`}>
                <circle cx={ax} cy={ay} r={3} fill="magenta" />
                <text x={ax + 6} y={ay - 4} style={debugTextStyle}>
                  {annotation.id}
                </text>
              </g>
            );
          })}
          {resolvedSpec.edges.map((edge) => {
            const from = nodeById[edge.from];
            const to = nodeById[edge.to];
            if (!from || !to) return null;
            const start = rectEdgeTowardsPoint(from.rect, centerOf(to.rect), 10);
            const end = rectEdgeTowardsPoint(to.rect, centerOf(from.rect), 10);
            const t = edge.kind === 'broken-action' ? edge.break?.centerT ?? 0.44 : 0.5;
            const labelPoint = lerpPoint(start, end, t);
            return (
              <text key={`debug-edge-${edge.id}`} x={labelPoint.x + 4} y={labelPoint.y - 4} style={debugTextStyle}>
                {edge.id}
              </text>
            );
          })}
        </g>
      )}
    </svg>
  );
};
