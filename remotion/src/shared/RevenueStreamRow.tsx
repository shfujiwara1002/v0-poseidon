import React from 'react';
import { GlassCard } from './GlassCard';
import { SlideIcon } from './SlideIcon';
import { theme } from './theme';

export interface RevenueStream {
  title: string;
  desc: string;
  icon: string;
  opacity?: number;
}

interface RevenueStreamRowProps {
  streams: RevenueStream[];
  style?: React.CSSProperties;
}

export const RevenueStreamRow: React.FC<RevenueStreamRowProps> = ({ streams, style }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        ...style,
      }}
    >
      {streams.map((stream) => (
        <GlassCard
          key={stream.title}
          style={{
            padding: 16,
            opacity: stream.opacity ?? 1,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: 12,
          }}
        >
          <SlideIcon name={stream.icon} size={28} glowColor="cyan" />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div
              style={{
                fontFamily: theme.typography.fontHeader,
                fontSize: theme.typographyScale.cardTitle,
                fontWeight: 700,
                color: 'white',
              }}
            >
              {stream.title}
            </div>
            <div
              style={{
                fontFamily: theme.typography.fontUi,
                fontSize: theme.typographyScale.label,
                color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.4,
              }}
            >
              {stream.desc}
            </div>
          </div>
        </GlassCard>
      ))}
    </div>
  );
};
