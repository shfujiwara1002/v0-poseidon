import React from 'react';

interface IconPoseidonWordmarkProps {
    fontSize?: number;
    fontFamily?: string;
    fontWeight?: number;
    color?: string;
    letterSpacing?: string;
    style?: React.CSSProperties;
}

export const IconPoseidonWordmark: React.FC<IconPoseidonWordmarkProps> = ({
    fontSize = 72,
    fontFamily = "'Outfit', system-ui, sans-serif",
    fontWeight = 300,
    color = '#FFFFFF',
    letterSpacing = '0.15em',
    style,
}) => {
    return (
        <span
            style={{
                fontFamily,
                fontSize,
                fontWeight,
                color,
                letterSpacing,
                lineHeight: 1,
                whiteSpace: 'nowrap',
                ...style,
            }}
        >
            Poseidon
        </span>
    );
};
