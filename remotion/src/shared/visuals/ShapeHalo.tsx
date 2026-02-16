import React from 'react';
import { theme } from '../theme';

interface ShapeHaloProps {
    size?: number;
    color?: string;
    opacity?: number;
    style?: React.CSSProperties;
}

export const ShapeHalo: React.FC<ShapeHaloProps> = ({
    size = 600,
    color = theme.accent.cyan,
    opacity = 0.2,
    style
}) => {
    return (
        <div style={{
            width: size,
            height: size,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
            opacity: opacity,
            filter: 'blur(40px)',
            pointerEvents: 'none',
            ...style
        }} />
    );
};
