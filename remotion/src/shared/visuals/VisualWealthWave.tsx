import React from 'react';
import { theme } from '../theme';

interface VisualWealthWaveProps {
    width?: number;
    height?: number;
    color?: string;
    style?: React.CSSProperties;
}

export const VisualWealthWave: React.FC<VisualWealthWaveProps> = ({
    width = 400,
    height = 200,
    color = theme.semantic.growth,
    style
}) => {
    return (
        <svg width={width} height={height} viewBox="0 0 400 200" fill="none" style={style}>
            <defs>
                <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity="0.5" />
                    <stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>
            </defs>
            <path d="M0 150 C 100 150, 100 50, 200 50 C 300 50, 300 100, 400 20" stroke={color} strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M0 150 C 100 150, 100 50, 200 50 C 300 50, 300 100, 400 20 L 400 200 L 0 200 Z" fill="url(#waveGradient)" stroke="none" />
        </svg>
    );
};
