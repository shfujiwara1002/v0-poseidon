import React from 'react';
import { AbsoluteFill } from 'remotion';
import { theme } from './shared/theme';

/**
 * ChartSpecDemo — stubbed out.
 * The original required ../../charts/remotion/chart-remotion which lives
 * outside this repository.  This placeholder keeps the Remotion bundle
 * compilable without the external charts package.
 */
export const ChartSpecDemo: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: theme.backgroundGradient,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: theme.typography.fontUi,
        color: 'rgba(255,255,255,0.5)',
        fontSize: 24,
      }}
    >
      ChartSpecDemo — chart-remotion module not available
    </AbsoluteFill>
  );
};
