import React from 'react';
import { GlassCard } from './GlassCard';
import { SlideIcon } from './SlideIcon';
import { theme } from './theme';

export interface TimelineSegment {
  label: string;
  time: string;
  icon?: string;
  color: string;
  active?: boolean;
}

interface TimelineHorizontalProps {
  segments: TimelineSegment[];
  style?: React.CSSProperties;
}

export const TimelineHorizontal: React.FC<TimelineHorizontalProps> = ({ segments, style }) => {
  return (
    <GlassCard
      style={{
        padding: '16px 24px',
        width: '100%',
        ...style,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: 12,
          width: '100%',
        }}
      >
        {segments.map((segment, index) => (
          <div
            key={`${segment.label}-${index}`}
            style={{
              flex: 1,
              padding: '16px 12px 14px',
              borderTop: `4px solid ${segment.color}`,
              borderRadius: 12,
              background: 'rgba(255,255,255,0.02)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
              opacity: segment.active ? 1 : 0.72,
              minHeight: 120,
            }}
          >
            {segment.icon && (
              <SlideIcon name={segment.icon} size={28} glowColor="cyan" />
            )}
            <div
              style={{
                fontFamily: theme.typography.fontHeader,
                fontSize: 24,
                fontWeight: 600,
                textTransform: 'uppercase',
                color: 'white',
              }}
            >
              {segment.label}
            </div>
            <div
              style={{
                fontFamily: theme.typography.fontMono,
                fontSize: 24,
                letterSpacing: '0.15em',
                color: 'rgba(255,255,255,0.6)',
              }}
            >
              {segment.time}
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
