import React, { useMemo } from 'react';
import { random, useCurrentFrame, useVideoConfig } from 'remotion';
import { theme } from '../../theme';
import { ChartGlowDefs } from '../../charts/ChartGlowDefs';

interface VisualCircuitProps {
    width?: number;
    height?: number;
    color?: string;
    density?: number;
    style?: React.CSSProperties;
}

export const VisualCircuit: React.FC<VisualCircuitProps> = ({
    width = 800,
    height = 450,
    color = theme.accent.cyan,
    density = 20,
    style,
}) => {
    const frame = useCurrentFrame();
    const { fps: _fps } = useVideoConfig();

    const paths = useMemo(() => {
        const p: string[] = [];
        const count = density;

        for (let i = 0; i < count; i++) {
            const seed = i * 123;
            const startX = random(seed) * width;
            const startY = random(seed + 1) * height;

            // Generate a "Manhattan" path (90 degree turns)
            const segments = Math.floor(random(seed + 2) * 3) + 2;
            let currentX = startX;
            let currentY = startY;
            let d = `M ${startX} ${startY}`;

            for (let j = 0; j < segments; j++) {
                const isHorizontal = j % 2 === 0;
                const length = (random(seed + j * 10) - 0.5) * 200; // -100 to 100 length

                if (isHorizontal) {
                    currentX += length;
                } else {
                    currentY += length;
                }
                d += ` L ${currentX} ${currentY}`;
            }
            p.push(d);
        }
        return p;
    }, [width, height, density]);

    return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={style}>
            <ChartGlowDefs />

            {/* Background faint circuit traces */}
            {paths.map((d, i) => (
                <path
                    key={`bg-${i}`}
                    d={d}
                    stroke={color}
                    strokeWidth="1"
                    opacity="0.1"
                    fill="none"
                />
            ))}

            {/* Glowing pulses traveling along paths */}
            {paths.map((d, i) => {
                const duration = 60 + random(i) * 60; // 1-2 seconds
                const offset = random(i + 10) * duration;
                const progress = ((frame + offset) % duration) / duration;

                // Fade in/out at ends
                const opacity = Math.sin(progress * Math.PI) * 0.8;

                return (
                    <g key={`pulse-${i}`}>
                        <path
                            d={d}
                            stroke={color}
                            strokeWidth="2"
                            strokeDasharray={`${width} ${width}`}
                            strokeDashoffset={width * (1 - progress * 2)} // Move dash
                            opacity={opacity}
                            filter="url(#neon-glow)"
                            fill="none"
                            style={{ mask: 'url(#mask-fade)' }} // Optional refimement
                        />
                        {/* Leading Dot */}
                        {/* Calculating exact position along path is complex in pure SVG/React without DOM measurement. 
                             Approximation: Use simple circles at junctions or random flicker nodes instead for performance 
                             if exact path following is too expensive. 
                             For Tier 3, let's use randomly placed glowing nodes that pulse.
                         */}
                    </g>
                );
            })}

            {/* Static Nodes (Chips/Joints) */}
            {Array.from({ length: 10 }).map((_, i) => {
                const x = random(i * 55) * width;
                const y = random(i * 66) * height;
                const pulsate = (Math.sin(frame / 10 + i) + 1) / 2; // 0 to 1

                return (
                    <g key={`node-${i}`}>
                        <circle cx={x} cy={y} r={4} fill={color} opacity={0.3} />
                        <circle cx={x} cy={y} r={2} fill="white" opacity={0.8 + pulsate * 0.2} filter="url(#neon-glow)" />
                        <circle cx={x} cy={y} r={8 * pulsate} stroke={color} strokeWidth="1" opacity={1 - pulsate} fill="none" />
                    </g>
                )
            })}
        </svg>
    );
};
