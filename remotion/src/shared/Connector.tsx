import React from 'react';

interface ConnectorProps {
  /** Direction of the connector line. Default 'vertical'. */
  direction?: 'vertical' | 'horizontal';
  /** Length in pixels or '100%' to fill parent. Default '100%'. */
  length?: number | '100%';
  /** Thickness of the line in pixels. Default 4. */
  width?: number;
  /** Start color (or solid color if toColor is omitted). */
  color: string;
  /** End color for gradient. Defaults to same as color (solid). */
  toColor?: string;
  /** Opacity of the line. Default 0.9. */
  opacity?: number;
  /** Add glow boxShadow around the line. Default false. */
  glow?: boolean;
  /** Render as dashed line instead of solid. Default false. */
  dashed?: boolean;
  /** Override styles. */
  style?: React.CSSProperties;
}

export const Connector: React.FC<ConnectorProps> = ({
  direction = 'vertical',
  length = '100%',
  width = 4,
  color,
  toColor,
  opacity = 0.9,
  glow = false,
  dashed = false,
  style,
}) => {
  const isVertical = direction === 'vertical';
  const endColor = toColor ?? color;
  const gradientDir = isVertical ? '180deg' : '90deg';
  const size = typeof length === 'number' ? `${length}px` : length;

  /* Dashed mode: uses a border instead of background fill */
  if (dashed) {
    const borderStyle = `${width}px dashed ${color}`;
    return (
      <div
        style={{
          width: isVertical ? 0 : size,
          height: isVertical ? size : 0,
          ...(isVertical
            ? { borderLeft: borderStyle }
            : { borderTop: borderStyle }),
          opacity,
          flexShrink: 0,
          ...(glow
            ? { boxShadow: `0 0 12px ${color}44, 0 0 24px ${endColor}33` }
            : {}),
          ...style,
        }}
      />
    );
  }

  return (
    <div
      style={{
        width: isVertical ? width : size,
        height: isVertical ? size : width,
        background:
          color === endColor
            ? color
            : `linear-gradient(${gradientDir}, ${color} 0%, ${endColor} 100%)`,
        borderRadius: width / 2,
        opacity,
        flexShrink: 0,
        ...(glow
          ? { boxShadow: `0 0 12px ${color}44, 0 0 24px ${endColor}33` }
          : {}),
        ...style,
      }}
    />
  );
};
