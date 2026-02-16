import React from 'react';
import { theme } from '../theme';

// ── Trident geometry (from IconTrident, widened 1.6× for letterform weight) ──
// Original IconTrident: 24-unit-wide prongs in 400×400 viewBox
// Widened to 38 units to match Inter 700 stem weight when rendered at cap-height
const CENTER_PRONG = 'M184,52 L200,36 L216,52 L219,168 L181,168 Z';
const LEFT_PRONG = 'M100,80 L116,64 L132,80 L135,168 L97,168 Z';
const RIGHT_PRONG = 'M268,80 L284,64 L300,80 L303,168 L265,168 Z';
// Cross-guard: slightly thicker than original to match heavier prongs
const CROSS_GUARD =
    'M90,168 C90,160 96,156 104,156 L296,156 C304,156 310,160 310,168' +
    ' L310,198 C310,206 304,210 296,210 L104,210 C96,210 90,206 90,198 Z';
// Shaft: widened to match prong body width
const SHAFT =
    'M181,206 L219,206 L219,346 C219,354 210,362 200,362 C190,362 181,354 181,346 Z';

const ALL_PATHS = [CENTER_PRONG, LEFT_PRONG, RIGHT_PRONG, CROSS_GUARD, SHAFT];
const PRONG_PATHS = [CENTER_PRONG, LEFT_PRONG, RIGHT_PRONG];
const TIP_CHEVRONS = [
    'M184,52 L200,36 L216,52',
    'M100,80 L116,64 L132,80',
    'M268,80 L284,64 L300,80',
];
const TIP_DOTS: [number, number, number][] = [
    [200, 38, 4.5],
    [116, 66, 3.8],
    [284, 66, 3.8],
];
const JUNCTION_DOTS: [number, number, number][] = [
    [116, 168, 3.5],
    [200, 168, 4],
    [284, 168, 3.5],
];

// Cropped viewBox: tight around trident content with small margin
const VB_X = 72, VB_Y = 14, VB_W = 256, VB_H = 370;
// Guard top ≈ y=156, shaft bottom ≈ y=362 → in viewBox coords
const GUARD_Y = 156 - VB_Y;   // 142 from viewBox top
const SHAFT_Y = 362 - VB_Y;   // 348 from viewBox top
const GUARD_TO_SHAFT = SHAFT_Y - GUARD_Y; // 206 viewBox units

interface IconTritonWordmarkProps {
    fontSize?: number;
    color?: string;
    accentColor?: string;
    neon?: boolean;
    style?: React.CSSProperties;
}

/**
 * Poseidon Trident Lettermark — v7 (filled geometry).
 *
 * Uses IconTrident's proven geometry but rendered as solid filled shapes
 * (1.6× wider prongs) to match Inter 700 stroke weight.
 * Cropped viewBox removes hex shield — just the trident letterform.
 *
 * 5 rendering layers: glow halo, solid fills, specular sheen,
 * neon edge accents, energy dots.
 */
export const IconTritonWordmark: React.FC<IconTritonWordmarkProps> = ({
    fontSize = 96,
    color = '#FFFFFF',
    accentColor = theme.accent.cyan,
    neon = true,
    style,
}) => {
    const uid = React.useId().replace(/:/g, '');
    const id = (name: string) => `tw-${name}-${uid}`;

    // Scale trident 1.35× larger than cap-height mapping for visual dominance
    const capHeight = fontSize * 0.727;
    const scale = (capHeight * 1.45) / GUARD_TO_SHAFT;
    const svgW = VB_W * scale;
    const svgH = VB_H * scale;

    // Empty space in viewBox before/after the guard
    const guardLeftPad = (90 - VB_X) * scale;
    const guardRightPad = ((VB_X + VB_W) - 310) * scale;
    // Empty space below shaft + descent compensation to align shaft with baseline
    const bottomPad = ((VB_Y + VB_H) - 362) * scale;
    const descentOffset = fontSize * 0.12; // raise trident to baseline (not descender)

    return (
        <div
            style={{
                display: 'inline-flex',
                alignItems: 'flex-end',
                lineHeight: 1,
                ...style,
            }}
        >
            {/* ── Trident "T" — filled geometry ─── */}
            <svg
                viewBox={`${VB_X} ${VB_Y} ${VB_W} ${VB_H}`}
                width={svgW}
                height={svgH}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    display: 'block',
                    overflow: 'visible',
                    // Crop viewBox padding to tighten with text
                    marginLeft: -guardLeftPad * 0.7,
                    marginRight: -guardRightPad * 0.85 - fontSize * 0.05,
                    marginBottom: -bottomPad + descentOffset,
                    // Outer drop-shadow glow
                    filter: neon
                        ? `drop-shadow(0 0 4px rgba(255,255,255,0.2)) drop-shadow(0 0 10px ${accentColor}50) drop-shadow(0 0 22px ${accentColor}35)`
                        : 'none',
                }}
            >
                <defs>
                    {/* 4-stage neon blur for edge strokes */}
                    <filter id={id('neon')} x="-60%" y="-60%" width="220%" height="220%" colorInterpolationFilters="sRGB">
                        <feGaussianBlur in="SourceGraphic" stdDeviation={1.5} result="b0" />
                        <feGaussianBlur in="SourceGraphic" stdDeviation={4} result="b1" />
                        <feGaussianBlur in="SourceGraphic" stdDeviation={10} result="b2" />
                        <feGaussianBlur in="SourceGraphic" stdDeviation={20} result="b3" />
                        <feMerge>
                            <feMergeNode in="b3" />
                            <feMergeNode in="b2" />
                            <feMergeNode in="b1" />
                            <feMergeNode in="b0" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    {/* Center prong gradient: white body → cyan tip */}
                    <linearGradient id={id('pg')} x1="0.5" y1="1" x2="0.5" y2="0">
                        <stop offset="0%" stopColor={color} />
                        <stop offset="42%" stopColor={color} />
                        <stop offset="70%" stopColor={accentColor} stopOpacity={0.85} />
                        <stop offset="100%" stopColor={accentColor} />
                    </linearGradient>
                    {/* Left prong: white → teal tip (PROTECT) */}
                    <linearGradient id={id('pgL')} x1="0.5" y1="1" x2="0.5" y2="0">
                        <stop offset="0%" stopColor={color} />
                        <stop offset="42%" stopColor={color} />
                        <stop offset="70%" stopColor={theme.accent.teal} stopOpacity={0.85} />
                        <stop offset="100%" stopColor={theme.accent.teal} />
                    </linearGradient>
                    {/* Right prong: white → violet tip (GROW) */}
                    <linearGradient id={id('pgR')} x1="0.5" y1="1" x2="0.5" y2="0">
                        <stop offset="0%" stopColor={color} />
                        <stop offset="42%" stopColor={color} />
                        <stop offset="70%" stopColor={theme.accent.violet} stopOpacity={0.85} />
                        <stop offset="100%" stopColor={theme.accent.violet} />
                    </linearGradient>

                    {/* Clip path for sheen overlay */}
                    <clipPath id={id('clip')}>
                        {ALL_PATHS.map((d, i) => <path key={i} d={d} />)}
                    </clipPath>
                    {/* Specular sheen */}
                    <radialGradient id={id('sheen')} cx="0.28" cy="0.15" r="0.55" fx="0.25" fy="0.12">
                        <stop offset="0%" stopColor="#FFF" stopOpacity={0.22} />
                        <stop offset="40%" stopColor="#FFF" stopOpacity={0.06} />
                        <stop offset="100%" stopColor="#FFF" stopOpacity={0} />
                    </radialGradient>
                </defs>

                {/* ── Layer 0: Neon glow halo (behind fills) ── */}
                {neon && (
                    <g filter={`url(#${id('neon')})`} opacity={0.4}>
                        {PRONG_PATHS.map((d, i) => <path key={i} d={d} fill={accentColor} />)}
                    </g>
                )}

                {/* ── Layer 1: Solid fills ── */}
                {/* Guard + shaft: solid white */}
                <path d={CROSS_GUARD} fill={color} opacity={0.95} />
                <path d={SHAFT} fill={color} opacity={0.95} />
                {/* Prongs: per-engine color gradient (white body → colored tip) */}
                <path d={CENTER_PRONG} fill={`url(#${id('pg')})`} />
                <path d={LEFT_PRONG} fill={`url(#${id('pgL')})`} />
                <path d={RIGHT_PRONG} fill={`url(#${id('pgR')})`} />

                {/* ── Layer 2: Specular sheen ── */}
                <rect x={0} y={0} width={400} height={400}
                    fill={`url(#${id('sheen')})`}
                    clipPath={`url(#${id('clip')})`}
                    opacity={0.4}
                />

                {/* ── Layer 3: Neon edge accents ── */}
                {neon && (
                    <g filter={`url(#${id('neon')})`} opacity={0.5}>
                        {ALL_PATHS.map((d, i) => (
                            <path key={i} d={d} stroke={accentColor} strokeWidth={1.2}
                                fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        ))}
                    </g>
                )}

                {/* ── Layer 4: Tip highlights + energy dots ── */}
                <g opacity={0.6}>
                    {TIP_CHEVRONS.map((d, i) => (
                        <path key={i} d={d} stroke="#FFF" strokeWidth={2}
                            fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    ))}
                </g>
                <g fill={accentColor}>
                    {TIP_DOTS.map(([cx, cy, r], i) => (
                        <circle key={i} cx={cx} cy={cy} r={r} opacity={0.9} />
                    ))}
                </g>
                <g fill={accentColor} opacity={0.25}>
                    {JUNCTION_DOTS.map(([cx, cy, r], i) => (
                        <circle key={i} cx={cx} cy={cy} r={r} />
                    ))}
                </g>
            </svg>

            {/* ── "RITON" ─── */}
            <span
                style={{
                    fontFamily: theme.typography.fontHeader,
                    fontSize,
                    fontWeight: 700,
                    color,
                    letterSpacing: -fontSize * 0.02,
                    textShadow: neon ? theme.textCrisp : 'none',
                }}
            >
                RITON
            </span>

            {/* ── ".AI" accent ─── */}
            <span
                style={{
                    fontFamily: theme.typography.fontHeader,
                    fontSize,
                    fontWeight: 700,
                    color: accentColor,
                    letterSpacing: -fontSize * 0.02,
                    textShadow: neon
                        ? `${theme.textCrisp}, 0 0 14px ${accentColor}60, 0 0 28px ${accentColor}30`
                        : 'none',
                }}
            >
                .AI
            </span>
        </div>
    );
};
