import React from 'react';
import { staticFile } from 'remotion';
import { theme } from '../theme';

interface IconTridentProps {
    /** Rendered pixel size (width = height). Default 400. */
    size?: number;
    /** Primary accent color for neon glow. Default cyan. */
    color?: string;
    /** Enable neon drop-shadow glow. Default true. */
    neon?: boolean;
    /** Additional CSS on the root element. */
    style?: React.CSSProperties;
}

const LOGO_SRC = staticFile('assets/png/newlogo.png');

/**
 * Poseidon logo — renders the AI-generated trident PNG
 * with optional neon drop-shadow glow.
 */
export const IconTrident: React.FC<IconTridentProps> = ({
    size = 400,
    color = theme.accent.cyan,
    neon = true,
    style,
}) => {
    return (
        <img
            src={LOGO_SRC}
            width={size}
            height={size}
            alt="Poseidon.AI Trident"
            style={{
                display: 'block',
                objectFit: 'contain',
                filter: neon ? `drop-shadow(0 0 14px ${color}) drop-shadow(0 0 28px ${color})` : 'none',
                ...style,
            }}
        />
    );
};
