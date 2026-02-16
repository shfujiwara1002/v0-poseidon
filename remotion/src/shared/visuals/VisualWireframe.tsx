import React from 'react';
import { theme } from '../theme';

interface VisualWireframeProps {
    width?: number;
    height?: number;
    color?: string;
    style?: React.CSSProperties;
}

export const VisualWireframe: React.FC<VisualWireframeProps> = ({
    width = 300,
    height = 200,
    color = theme.accent.blue,
    style
}) => {
    return (
        <div style={{
            width,
            height,
            background: 'rgba(255,255,255,0.05)',
            border: `1px solid ${color}`,
            borderRadius: 8,
            display: 'flex',
            flexDirection: 'column',
            padding: 10,
            gap: 8,
            ...style
        }}>
            {/* Header */}
            <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: color, opacity: 0.5 }} />
                <div style={{ width: '40%', height: 6, background: color, opacity: 0.3, borderRadius: 3 }} />
            </div>
            {/* Body */}
            <div style={{ display: 'flex', gap: 8, flex: 1 }}>
                <div style={{ width: '30%', height: '100%', background: color, opacity: 0.1, borderRadius: 4 }} />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
                    <div style={{ width: '100%', height: 30, background: color, opacity: 0.1, borderRadius: 4 }} />
                    <div style={{ width: '100%', height: 30, background: color, opacity: 0.1, borderRadius: 4 }} />
                    <div style={{ width: '70%', height: 30, background: color, opacity: 0.1, borderRadius: 4 }} />
                </div>
            </div>
        </div>
    );
};
