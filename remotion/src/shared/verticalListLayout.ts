import type { CSSProperties } from 'react';
import type { VerticalListLayoutMode } from './layoutModes';

type VerticalListLayoutOptions = {
  mode?: VerticalListLayoutMode;
  itemCount: number;
  stackGapPx: number;
  fillHeight?: boolean;
  centerMarginPx?: number;
};

export const getVerticalListContainerStyle = ({
  mode = 'stack',
  itemCount,
  stackGapPx,
  fillHeight = false,
  centerMarginPx = 8,
}: VerticalListLayoutOptions): CSSProperties => {
  const shouldDistribute = mode === 'distributeY' && itemCount >= 2;

  return {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: shouldDistribute ? 'center' : 'flex-start',
    gap: stackGapPx,
    ...(shouldDistribute
      ? {
          paddingTop: centerMarginPx,
          paddingBottom: centerMarginPx,
          boxSizing: 'border-box',
        }
      : {}),
    ...(fillHeight
      ? {
          flex: 1,
          minHeight: 0,
        }
      : {}),
  };
};
