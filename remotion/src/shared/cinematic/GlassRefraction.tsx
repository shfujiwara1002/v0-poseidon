import React, { useMemo } from 'react';
import { useCurrentFrame } from 'remotion';
import { theme } from '../theme';

interface GlassRefractionProps {
    children: React.ReactNode;
    /** Refraction intensity (0-1) */
    intensity?: number;
    /** Enable chromatic aberration effect */
    chromaticAberration?: boolean;
    /** Aberration amount in pixels */
    aberrationAmount?: number;
    /** Enable inner glow */
    innerGlow?: boolean;
    /** Glow color */
    glowColor?: string;
    /** Enable edge highlight */
    edgeHighlight?: boolean;
    /** Border radius */
    borderRadius?: number;
    /** Enable frosted glass effect */
    frosted?: boolean;
    /** Frosted blur amount */
    frostedBlur?: number;
}

/**
 * Advanced glass card with subsurface scattering and refraction effects.
 * Creates a premium, translucent look with light diffusion.
 */
export const GlassRefraction: React.FC<GlassRefractionProps> = ({
    children,
    intensity = 0.5,
    chromaticAberration = true,
    aberrationAmount = 2,
    innerGlow = true,
    glowColor = theme.accent.cyan,
    edgeHighlight = true,
    borderRadius = 24,
    frosted = true,
    frostedBlur = 20,
}) => {
    const frame = useCurrentFrame();

    // Subtle animation for the refraction effect
    const shimmer = Math.sin(frame / 30) * 0.5 + 0.5;
    const lightAngle = (frame / 2) % 360;

    // Generate unique ID for filters
    const filterId = useMemo(() => `glass-${Math.random().toString(36).substr(2, 9)}`, []);

    return (
        <div
            style={{
                position: 'relative',
                borderRadius,
                overflow: 'hidden',
            }}
        >
            {/* SVG filters for advanced effects */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <defs>
                    {/* Chromatic aberration filter */}
                    {chromaticAberration && (
                        <filter id={`${filterId}-aberration`}>
                            <feOffset in="SourceGraphic" dx={aberrationAmount * intensity} dy={0} result="red" />
                            <feOffset in="SourceGraphic" dx={0} dy={0} result="green" />
                            <feOffset in="SourceGraphic" dx={-aberrationAmount * intensity} dy={0} result="blue" />
                            <feColorMatrix
                                in="red"
                                type="matrix"
                                values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
                                result="red-only"
                            />
                            <feColorMatrix
                                in="green"
                                type="matrix"
                                values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
                                result="green-only"
                            />
                            <feColorMatrix
                                in="blue"
                                type="matrix"
                                values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
                                result="blue-only"
                            />
                            <feBlend in="red-only" in2="green-only" mode="screen" result="rg" />
                            <feBlend in="rg" in2="blue-only" mode="screen" />
                        </filter>
                    )}

                    {/* Glass blur filter */}
                    <filter id={`${filterId}-glass`}>
                        <feGaussianBlur stdDeviation={frostedBlur * intensity} />
                    </filter>

                    {/* Subsurface scattering simulation */}
                    <filter id={`${filterId}-sss`}>
                        <feGaussianBlur in="SourceAlpha" stdDeviation="8" result="blur" />
                        <feColorMatrix
                            in="blur"
                            type="matrix"
                            values={`0 0 0 0 ${parseInt(glowColor.slice(1, 3), 16) / 255 * 0.3}
                                     0 0 0 0 ${parseInt(glowColor.slice(3, 5), 16) / 255 * 0.3}
                                     0 0 0 0 ${parseInt(glowColor.slice(5, 7), 16) / 255 * 0.3}
                                     0 0 0 0.5 0`}
                            result="glow"
                        />
                        <feMerge>
                            <feMergeNode in="glow" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
            </svg>

            {/* Background blur layer (frosted glass) */}
            {frosted && (
                <div
                    style={{
                        position: 'absolute',
                        inset: -frostedBlur,
                        backdropFilter: `blur(${frostedBlur}px) saturate(1.2)`,
                        WebkitBackdropFilter: `blur(${frostedBlur}px) saturate(1.2)`,
                        borderRadius: borderRadius + frostedBlur,
                    }}
                />
            )}

            {/* Main glass container */}
            <div
                style={{
                    position: 'relative',
                    background: `linear-gradient(135deg,
                        rgba(255,255,255,${0.08 + shimmer * 0.04}) 0%,
                        rgba(255,255,255,${0.04 + shimmer * 0.02}) 50%,
                        rgba(255,255,255,${0.06 + shimmer * 0.03}) 100%
                    )`,
                    borderRadius,
                    border: `1px solid rgba(255,255,255,${0.15 + shimmer * 0.1})`,
                    boxShadow: `
                        inset 0 1px 1px rgba(255,255,255,${0.15 + shimmer * 0.1}),
                        inset 0 -1px 1px rgba(0,0,0,0.1),
                        0 8px 32px rgba(0,0,0,0.3),
                        0 2px 8px rgba(0,0,0,0.2)
                    `,
                    filter: innerGlow ? `url(#${filterId}-sss)` : undefined,
                }}
            >
                {/* Edge highlight */}
                {edgeHighlight && (
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius,
                            background: `linear-gradient(${lightAngle}deg,
                                transparent 0%,
                                rgba(255,255,255,${0.1 * intensity}) 45%,
                                rgba(255,255,255,${0.2 * intensity}) 50%,
                                rgba(255,255,255,${0.1 * intensity}) 55%,
                                transparent 100%
                            )`,
                            pointerEvents: 'none',
                        }}
                    />
                )}

                {/* Refraction distortion overlay */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius,
                        background: `radial-gradient(
                            ellipse 80% 60% at ${50 + Math.sin(frame / 40) * 10}% ${40 + Math.cos(frame / 50) * 10}%,
                            rgba(255,255,255,${0.05 * intensity}) 0%,
                            transparent 70%
                        )`,
                        pointerEvents: 'none',
                    }}
                />

                {/* Content */}
                <div
                    style={{
                        position: 'relative',
                        filter: chromaticAberration && intensity > 0.3
                            ? `url(#${filterId}-aberration)`
                            : undefined,
                    }}
                >
                    {children}
                </div>

                {/* Bottom reflection */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '30%',
                        borderRadius: `0 0 ${borderRadius}px ${borderRadius}px`,
                        background: `linear-gradient(to top,
                            rgba(255,255,255,${0.03 * intensity}) 0%,
                            transparent 100%
                        )`,
                        pointerEvents: 'none',
                    }}
                />
            </div>
        </div>
    );
};

interface LiquidGlassProps {
    children: React.ReactNode;
    /** Wobble intensity */
    wobbleIntensity?: number;
    /** Wobble speed */
    wobbleSpeed?: number;
    /** Base blur */
    blur?: number;
    /** Border radius */
    borderRadius?: number;
    /** Tint color */
    tintColor?: string;
}

/**
 * Liquid glass effect with organic wobble animation.
 * Creates a fluid, living glass surface.
 */
export const LiquidGlass: React.FC<LiquidGlassProps> = ({
    children,
    wobbleIntensity = 1,
    wobbleSpeed = 1,
    blur = 16,
    borderRadius = 24,
    tintColor = theme.accent.cyan,
}) => {
    const frame = useCurrentFrame();

    // Multiple sine waves for organic movement
    const wobble1 = Math.sin(frame / (30 / wobbleSpeed)) * wobbleIntensity;
    const wobble2 = Math.sin(frame / (45 / wobbleSpeed) + 1) * wobbleIntensity * 0.7;
    const wobble3 = Math.cos(frame / (35 / wobbleSpeed) + 2) * wobbleIntensity * 0.5;

    const borderRadiusAdjust = {
        topLeft: borderRadius + wobble1,
        topRight: borderRadius - wobble2,
        bottomRight: borderRadius + wobble3,
        bottomLeft: borderRadius - wobble1 + wobble2,
    };

    return (
        <div
            style={{
                position: 'relative',
                borderRadius: `${borderRadiusAdjust.topLeft}px ${borderRadiusAdjust.topRight}px ${borderRadiusAdjust.bottomRight}px ${borderRadiusAdjust.bottomLeft}px`,
                overflow: 'hidden',
                transition: 'border-radius 0.1s ease-out',
            }}
        >
            {/* Backdrop blur */}
            <div
                style={{
                    position: 'absolute',
                    inset: -blur,
                    backdropFilter: `blur(${blur}px)`,
                    WebkitBackdropFilter: `blur(${blur}px)`,
                }}
            />

            {/* Glass surface */}
            <div
                style={{
                    position: 'relative',
                    background: `linear-gradient(
                        ${135 + wobble1 * 5}deg,
                        rgba(255,255,255,0.1) 0%,
                        ${tintColor}08 50%,
                        rgba(255,255,255,0.05) 100%
                    )`,
                    border: '1px solid rgba(255,255,255,0.15)',
                    boxShadow: `
                        inset 0 ${1 + wobble2}px 2px rgba(255,255,255,0.2),
                        0 8px 32px rgba(0,0,0,0.25)
                    `,
                }}
            >
                {children}
            </div>

            {/* Caustic light pattern */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: `radial-gradient(
                        ellipse ${60 + wobble1 * 5}% ${40 + wobble2 * 5}% at ${50 + wobble3 * 10}% ${30 + wobble1 * 5}%,
                        ${tintColor}15 0%,
                        transparent 70%
                    )`,
                    pointerEvents: 'none',
                    mixBlendMode: 'overlay',
                }}
            />
        </div>
    );
};

interface PrismRefractionProps {
    children: React.ReactNode;
    /** Enable rainbow edge effect */
    rainbowEdge?: boolean;
    /** Rainbow intensity */
    rainbowIntensity?: number;
    /** Animation speed */
    speed?: number;
}

/**
 * Prism refraction effect with rainbow light dispersion on edges.
 */
export const PrismRefraction: React.FC<PrismRefractionProps> = ({
    children,
    rainbowEdge = true,
    rainbowIntensity = 0.5,
    speed = 1,
}) => {
    const frame = useCurrentFrame();
    const angle = (frame * speed) % 360;

    return (
        <div style={{ position: 'relative' }}>
            {children}

            {/* Rainbow dispersion overlay */}
            {rainbowEdge && (
                <div
                    style={{
                        position: 'absolute',
                        inset: -2,
                        borderRadius: 'inherit',
                        background: `linear-gradient(${angle}deg,
                            rgba(255,0,0,${rainbowIntensity}) 0%,
                            rgba(255,127,0,${rainbowIntensity}) 14%,
                            rgba(255,255,0,${rainbowIntensity}) 28%,
                            rgba(0,255,0,${rainbowIntensity}) 42%,
                            rgba(0,0,255,${rainbowIntensity}) 57%,
                            rgba(75,0,130,${rainbowIntensity}) 71%,
                            rgba(148,0,211,${rainbowIntensity}) 85%,
                            rgba(255,0,0,${rainbowIntensity}) 100%
                        )`,
                        filter: 'blur(4px)',
                        opacity: 0.3,
                        pointerEvents: 'none',
                        mixBlendMode: 'overlay',
                        zIndex: -1,
                    }}
                />
            )}
        </div>
    );
};
