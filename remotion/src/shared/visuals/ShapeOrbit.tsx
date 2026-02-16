import React from 'react';
import { theme } from '../theme';

interface ShapeOrbitProps {
    size?: number;
    color?: string;
    rings?: number;
    style?: React.CSSProperties;
}

export const ShapeOrbit: React.FC<ShapeOrbitProps> = ({
    size = 400,
    color = theme.accent.cyan,
    rings = 3,
    style
}) => {
    return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" style={style}>
            {Array.from({ length: rings }).map((_, i) => {
                const radius = 48 - (i * (40 / rings));
                const opacity = 0.6 - (i * 0.15);
                return (
                    <circle
                        key={i}
                        cx="50"
                        cy="50"
                        r={radius}
                        stroke={color}
                        strokeWidth="0.5"
                        strokeOpacity={opacity}
                        fill="none"
                        strokeDasharray={i % 2 === 0 ? "none" : "4 2"}
                    />
                );
            })}
        </svg>
    );
};
