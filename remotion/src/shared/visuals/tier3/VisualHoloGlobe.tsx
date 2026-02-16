import React, { useMemo } from 'react';
import { useCurrentFrame } from 'remotion';
import { theme } from '../../theme';
import { ChartGlowDefs } from '../../charts/ChartGlowDefs';

interface VisualHoloGlobeProps {
    width?: number;
    height?: number;
    color?: string;
    radius?: number;
    style?: React.CSSProperties;
}

export const VisualHoloGlobe: React.FC<VisualHoloGlobeProps> = ({
    width = 600,
    height = 600,
    color = theme.accent.cyan,
    radius = 200,
    style,
}) => {
    const frame = useCurrentFrame();
    const cx = width / 2;
    const cy = height / 2;

    // Project 3D point (x,y,z) to 2D (x,y)
    // Simple orthographic projection
    const project = (lat: number, lon: number, rotation: number) => {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lon + rotation) * (Math.PI / 180);

        const x = radius * Math.sin(phi) * Math.cos(theta);
        const z = radius * Math.sin(phi) * Math.sin(theta);
        const y = radius * Math.cos(phi);

        return { x: cx + x, y: cy + y, z }; // z used for depth sorting/opacity
    };

    const rotation = frame * 1; // 1 degree per frame

    // Precompute Grid Lines
    // Latitudes (Horizontal rings)
    const latLines = useMemo(() => {
        const lines = [];
        for (let lat = -80; lat <= 80; lat += 20) {
            lines.push(lat);
        }
        return lines;
    }, []);

    // Longitudes (Vertical lines)
    const lonLines = useMemo(() => {
        const lines = [];
        for (let lon = 0; lon < 360; lon += 20) {
            lines.push(lon);
        }
        return lines;
    }, []);

    // Render Paths
    const renderLatLine = (lat: number) => {
        let path = "";
        let _visible = false;

        for (let lon = 0; lon <= 360; lon += 5) {
            const p = project(lat, lon, rotation);
            if (p.z > 0) _visible = true; // Front facing

            if (lon === 0) path += `M ${p.x} ${p.y}`;
            else path += ` L ${p.x} ${p.y}`;
        }

        // Split front/back for opacity
        // Simplified: Just draw full loops but change opacity based on z? 
        // Hard to splits paths SVG-wise perfectly without segmenting.
        // Alternative: Draw back hemisphere first, then front.
        return path;
    };

    const _getVisibility = (lat: number, lon: number) => {
        const p = project(lat, lon, rotation);
        return p.z;
    }

    return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={style}>
            <ChartGlowDefs />

            {/* Draw Back Hemisphere (Low Opacity) */}
            {/* This is a simplification; handling occlusion perfectly in 2D SVG is hard */}

            <g opacity="0.1">
                <circle cx={cx} cy={cy} r={radius} fill={theme.glass.glassBg} stroke="none" />
            </g>

            {/* Latitude Rings */}
            {latLines.map(lat => (
                <path
                    key={`lat-${lat}`}
                    d={renderLatLine(lat)}
                    stroke={color}
                    strokeWidth="1"
                    fill="none"
                    opacity="0.3"
                />
            ))}

            {/* Longitude Lines */}
            {lonLines.map(lon => {
                const _path = "";
                const _segments: string[] = [];
                let currentSegment = "";
                let _wasFront = false;

                // Segment line into front and back parts for "hiding" back
                for (let lat = -90; lat <= 90; lat += 5) {
                    const p = project(lat, lon, rotation);
                    const isFront = p.z > 0;

                    if (lat === -90) {
                        currentSegment = `M ${p.x} ${p.y}`;
                        _wasFront = isFront;
                    } else {
                        // If z-polarity changes, we could split, but simplistic approach:
                        // Just draw opacity based on avg z
                        currentSegment += ` L ${p.x} ${p.y}`;
                    }
                }

                // Opacity based on Z at equator
                const centerP = project(0, lon, rotation);
                const opacity = centerP.z > 0 ? 0.8 : 0.15;

                return <path key={`lon-${lon}`} d={currentSegment} stroke={color} strokeWidth="1" fill="none" opacity={opacity} />
            })}

            {/* Glowing Data Points / Cities */}
            {[{ lat: 40, lon: -74 }, { lat: 51, lon: 0 }, { lat: 35, lon: 139 }, { lat: 1, lon: 103 }].map((city, i) => {
                const p = project(city.lat, city.lon, rotation);
                const isFront = p.z > 0;
                if (!isFront) return null;

                return (
                    <g key={i}>
                        <circle cx={p.x} cy={p.y} r={4} fill="white" filter="url(#neon-glow)" />
                        <circle cx={p.x} cy={p.y} r={8} stroke={color} fill="none" opacity={0.5}>
                            <animate attributeName="r" values="4;12" dur="2s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.8;0" dur="2s" repeatCount="indefinite" />
                        </circle>
                    </g>
                )
            })}

            {/* Outer Halo */}
            <circle cx={cx} cy={cy} r={radius * 1.05} stroke={color} strokeWidth="2" opacity="0.3" strokeDasharray="10 10" />
        </svg>
    );
};
