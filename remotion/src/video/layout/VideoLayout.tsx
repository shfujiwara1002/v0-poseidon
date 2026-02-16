import React from 'react';
import { VIDEO_SAFE_AREA, type VideoLayoutMode } from '../config';

export interface VideoLayoutStyles {
  full: React.CSSProperties;
  safeArea: React.CSSProperties;
  scaledSafeArea: React.CSSProperties;
  scale: number;
}

export const getVideoLayoutStyles = (layout: VideoLayoutMode = 'landscape'): VideoLayoutStyles => {
  const { paddingX, paddingY, scale } = VIDEO_SAFE_AREA[layout];

  const base: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    padding: `${paddingY}px ${paddingX}px`,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
  };

  const scaled: React.CSSProperties = scale === 1
    ? base
    : {
        ...base,
        transform: `scale(${scale})`,
        transformOrigin: 'top center',
      };

  return {
    full: { position: 'absolute', inset: 0 },
    safeArea: base,
    scaledSafeArea: scaled,
    scale,
  };
};

export const VideoLayout: React.FC<{
  layout?: VideoLayoutMode;
  children: (styles: VideoLayoutStyles) => React.ReactNode;
}> = ({ layout = 'landscape', children }) => {
  return <>{children(getVideoLayoutStyles(layout))}</>;
};

export type { VideoLayoutMode } from '../config';
