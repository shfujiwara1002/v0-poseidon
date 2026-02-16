import React from 'react';
import { theme } from '../theme';

interface ShapeGridProps {
    width?: number;
    height?: number;
    color?: string;
    opacity?: number;
    spacing?: number;
    style?: React.CSSProperties;
}

export const ShapeGrid: React.FC<ShapeGridProps> = ({
    width = 1920,
    height = 1080,
    color = theme.accent.cyan,
    opacity = 0.1,
    spacing = 100,
    style
}) => {
    return (
        <svg width={width} height={height} style={{ position: 'absolute', top: 0, left: 0, ...style }}>
            <defs>
                <pattern id={`grid-pattern-${spacing}`} width={spacing} height={spacing} patternUnits="userSpaceOnUse">
                    <path d={`M ${spacing} 0 L 0 0 0 ${spacing}`} fill="none" stroke={color} strokeWidth="1" strokeOpacity={opacity} />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#grid-pattern-${spacing})`} />
        </svg>
    );
};
