import React from 'react';
import { theme } from '../theme';
import { ChartGlowDefs } from './ChartGlowDefs';

interface ChartLineProps {
    data: number[];
    width?: number;
    height?: number;
    color?: string;
    strokeWidth?: number;
    showArea?: boolean;
    showGrid?: boolean;
    highlightLastPoint?: boolean;
    calloutLabel?: string;
    smooth?: boolean;              // NEW: Catmull-Rom curve
    smoothTension?: number;        // NEW: 0.1-0.6 (default 0.3)
    showConfidenceBand?: boolean;   // NEW
    confidenceUpper?: number[];     // NEW: upper bound data
    confidenceLower?: number[];     // NEW: lower bound data
    confidenceColor?: string;       // NEW: band fill color
    showDotGrid?: boolean;          // NEW: premium dot-grid
    showAxisLabels?: boolean;       // NEW
    xLabels?: string[];             // NEW: ["Q1","Q2","Q3","Q4"]
    xPadding?: number;              // NEW: horizontal inset to prevent edge clipping
    xLabelFontSize?: number;        // NEW
    xLabelYOffset?: number;         // NEW
    secondaryData?: number[];       // NEW: overlay second series
    secondaryColor?: string;        // NEW
    showZeroLine?: boolean;         // Draw dashed line at y=0
    zeroLineColor?: string;
    showDataPoints?: boolean;       // Show circles at each data point (default true)
    style?: React.CSSProperties;
}

/** Returns actual SVG pixel height including axis labels. */
export function getChartTotalHeight(opts: {
    height: number;
    showAxisLabels?: boolean;
    xLabels?: string[];
    xLabelYOffset?: number;
    xLabelFontSize?: number;
}): number {
    const labelExtra = (opts.showAxisLabels && opts.xLabels)
        ? (opts.xLabelYOffset ?? 20) + (opts.xLabelFontSize ?? 24)
        : 0;
    const bottomBuffer = (opts.showAxisLabels && opts.xLabels) ? 6 : 0;
    return opts.height + labelExtra + bottomBuffer;
}

// Catmull-Rom spline interpolation helper
const getCatmullRomPath = (points: { x: number, y: number }[], tension: number = 0.3): string => {
    if (points.length < 2) return "";

    let path = `M ${points[0].x},${points[0].y}`;

    // Loop through points
    for (let i = 0; i < points.length - 1; i++) {
        const p0 = i > 0 ? points[i - 1] : points[0];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = i < points.length - 2 ? points[i + 2] : p2;

        const cp1x = p1.x + (p2.x - p0.x) / 6 * tension;
        const cp1y = p1.y + (p2.y - p0.y) / 6 * tension;
        const cp2x = p2.x - (p3.x - p1.x) / 6 * tension;
        const cp2y = p2.y - (p3.y - p1.y) / 6 * tension;

        path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
    }

    return path;
};

export const ChartLine: React.FC<ChartLineProps> = ({
    data,
    width = 400,
    height = 200,
    color = theme.accent.cyan,
    strokeWidth = 3,
    showArea = true,
    showGrid = true,
    highlightLastPoint = true,
    calloutLabel,
    smooth = true,
    smoothTension = 0.35,
    showConfidenceBand = false,
    confidenceUpper,
    confidenceLower,
    confidenceColor,
    showDotGrid = false,
    showAxisLabels = false,
    xLabels,
    xPadding = 0,
    xLabelFontSize = 24,
    xLabelYOffset = 20,
    secondaryData,
    secondaryColor = theme.accent.violet,
    showZeroLine = false,
    zeroLineColor = 'rgba(255,255,255,0.3)',
    showDataPoints = true,
    style
}) => {
    if (data.length < 2) return null;

    // determine scaling based on primary and optional secondary data
    const allValues = [...data, ...(secondaryData || []), ...(confidenceUpper || []), ...(confidenceLower || [])];
    const max = Math.max(...allValues);
    const min = Math.min(...allValues);
    const range = max - min || 1;

    // Add 10% padding so line doesn't hug top/bottom perfectly
    const paddedRange = range * 1.2;
    const paddedMin = min - (range * 0.1);

    const drawableWidth = Math.max(1, width - xPadding * 2);
    const mapPoint = (val: number, idx: number, total: number) => ({
        x: xPadding + (idx / (total - 1)) * drawableWidth,
        y: height - ((val - paddedMin) / paddedRange) * height
    });

    // Calculate main points
    const pointsArray = data.map((d, i) => mapPoint(d, i, data.length));

    // Generate Path (Smooth or Polyline)
    const linePath = smooth
        ? getCatmullRomPath(pointsArray, smoothTension)
        : pointsArray.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(' ');

    // Area Path
    const firstX = pointsArray[0]?.x ?? 0;
    const lastX = pointsArray[pointsArray.length - 1]?.x ?? width;
    const areaPath = `
        ${linePath}
        L ${lastX},${height}
        L ${firstX},${height}
        Z
    `;

    // Secondary Data
    let secondaryPoints: { x: number, y: number }[] = [];
    let secondaryPath = "";
    if (secondaryData && secondaryData.length > 0) {
        secondaryPoints = secondaryData.map((d, i) => mapPoint(d, i, secondaryData.length));
        secondaryPath = smooth
            ? getCatmullRomPath(secondaryPoints, smoothTension)
            : secondaryPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(' ');
    }

    // Confidence Band
    let bandPath = "";
    if (showConfidenceBand && confidenceUpper && confidenceLower && confidenceUpper.length === data.length) {
        const upperPoints = confidenceUpper.map((d, i) => mapPoint(d, i, confidenceUpper.length));
        const lowerPoints = confidenceLower.map((d, i) => mapPoint(d, i, confidenceLower.length));

        // Forward along upper, backward along lower
        // We need to reverse lower points for the return trip
        const lowerPointsReversed = [...lowerPoints].reverse();
        // For smooth, getting a reversed path is tricky with the helper, simplifcation: just L to normalized points
        // Creating a single closed path: Move to first upper, curve to last upper, line to last lower, curve to first lower, Z

        // Robust Implementation: Construct path manualy
        // 1. Upper Curve
        let d = getCatmullRomPath(upperPoints, smoothTension);

        // 2. Line to last lower
        const lastLower = lowerPoints[lowerPoints.length - 1];
        d += ` L ${lastLower.x},${lastLower.y}`;

        // 3. Lower Curve (Backwards) - simple polyline back for safety or re-calc smooth
        // A simple way to get a smooth bottom is to generate the curve normally then reverse the commands? 
        // Or just map points in reverse order? Catmull rom on reversed points works.
        // remove original M, change to L?
        // Actually, just append the L points for now to ensure robustness, or better:
        // Use SVG area generator logic. 

        // For now, let's just trace back using polyline to avoid spline artifacts on reverse
        lowerPointsReversed.forEach((p) => {
            d += ` L ${p.x},${p.y}`;
        });
        d += " Z";
        bandPath = d;
    }

    // Extend SVG bounds to include axis labels so they aren't clipped by overflow:hidden parents
    const svgHeight = getChartTotalHeight({ height, showAxisLabels, xLabels, xLabelYOffset, xLabelFontSize });

    return (
        <svg width={width} height={svgHeight} viewBox={`0 0 ${width} ${svgHeight}`} fill="none" style={{ overflow: 'visible', ...style }}>
            <ChartGlowDefs />

            {/* Grid */}
            {showDotGrid ? (
                <rect x="0" y="0" width={width} height={height} fill="url(#chart-dot-grid)" opacity="0.5" />
            ) : showGrid ? (
                <g>
                    {[0, 0.25, 0.5, 0.75, 1].map(ratio => {
                        const y = height * ratio;
                        return (
                            <line key={`h-${ratio}`} x1="0" y1={y} x2={width} y2={y} stroke={theme.glass.glassBorder} strokeWidth="1" strokeOpacity={ratio === 1 ? "0.3" : "0.1"} />
                        );
                    })}
                </g>
            ) : null}

            {/* Zero Line (break-even reference for J-curves) */}
            {showZeroLine && min < 0 && max > 0 && (() => {
                const zeroY = height - ((0 - paddedMin) / paddedRange) * height;
                return (
                    <line
                        x1={0} y1={zeroY} x2={width} y2={zeroY}
                        stroke={zeroLineColor}
                        strokeWidth="1"
                        strokeDasharray="6 4"
                    />
                );
            })()}

            {/* Confidence Band */}
            {showConfidenceBand && bandPath && (
                <path d={bandPath} fill={confidenceColor || color} fillOpacity="0.15" stroke="none" />
            )}

            {/* Area Fill */}
            {showArea && (
                <g>
                    {/* Gradient fill */}
                    <path d={areaPath} fill={color} fillOpacity="0.08" />
                    {/* Scanline overlay */}
                    <path d={areaPath} fill="url(#holo-scanlines)" opacity="0.04" />
                </g>
            )}

            {/* Secondary Line */}
            {secondaryData && (
                <path d={secondaryPath} stroke={secondaryColor} strokeWidth={strokeWidth} strokeOpacity="0.6" strokeLinecap="round" strokeLinejoin="round" fill="none" filter="url(#neon-glow-small)" />
            )}

            {/* Main Line — glow bloom behind */}
            <path d={linePath} stroke={color} strokeWidth={strokeWidth * 3} strokeOpacity="0.18" fill="none" strokeLinecap="round" strokeLinejoin="round" filter="url(#neon-blur)" />
            {/* Main Line — sharp stroke on top */}
            <path d={linePath} stroke={color} strokeWidth={strokeWidth} strokeOpacity="0.9" fill="none" strokeLinecap="round" strokeLinejoin="round" />

            {/* Data Points */}
            {pointsArray.map((p, i) => {
                const isLast = i === pointsArray.length - 1;
                return (
                    <g key={i}>
                        {showDataPoints && (
                            <circle cx={p.x} cy={p.y} r={isLast ? 5 : 2.5} fill={color} stroke="white" strokeWidth={isLast ? 1.5 : 0.5} filter={isLast ? "url(#strong-bloom)" : "url(#neon-glow-small)"} />
                        )}

                        {/* Callout Label */}
                        {isLast && highlightLastPoint && showDataPoints && (
                            <g>
                                <rect x={p.x - 35} y={p.y - 35} width={70} height={24} rx={4} fill="rgba(2,4,16,0.8)" stroke={color} strokeWidth="1" />
                                <text
                                    x={p.x}
                                    y={p.y - 18}
                                    fill="white"
                                    fontFamily={theme.typography.fontMono}
                                    fontSize="24"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    filter="url(#neon-glow-small)"
                                    style={{
                                        fontVariantNumeric: theme.typography.numericVariant,
                                        fontFeatureSettings: theme.typography.numericFeatureSettings,
                                    }}
                                >
                                    {calloutLabel || data[i]}
                                </text>
                            </g>
                        )}

                        {/* Axis Labels (X) */}
                        {showAxisLabels && xLabels && xLabels[i] && (
                            <text
                                x={p.x}
                                y={height + xLabelYOffset}
                                fill="white"
                                fillOpacity="0.6"
                                fontFamily={theme.typography.fontMono}
                                fontSize={xLabelFontSize}
                                textAnchor="middle"
                                style={{
                                    fontVariantNumeric: theme.typography.numericVariant,
                                    fontFeatureSettings: theme.typography.numericFeatureSettings,
                                }}
                            >
                                {xLabels[i]}
                            </text>
                        )}
                    </g>
                );
            })}
        </svg>
    );
};
