import React from 'react';
import { GlassCard } from './GlassCard';
import { theme } from './theme';

const avatarGradients = [
  `linear-gradient(135deg, ${theme.accent.cyan}, ${theme.accent.violet})`,
  `linear-gradient(135deg, ${theme.accent.teal}, ${theme.accent.gold})`,
  `linear-gradient(135deg, ${theme.accent.violet}, ${theme.accent.blue})`,
  `linear-gradient(135deg, ${theme.accent.amber}, ${theme.accent.cyan})`,
];

interface TeamCardProps {
  name: string;
  initials: string;
  gradientIndex?: number;
  style?: React.CSSProperties;
  cardStyle?: React.CSSProperties;
  tone?: 'default' | 'dark';
  liquidGlass?: boolean | 'off' | 'subtle' | 'standard' | 'premium';
  glassQuality?: 'baseline' | 'premium';
  debugId?: string;
}

export const TeamCard: React.FC<TeamCardProps> = ({
  name,
  initials,
  gradientIndex = 0,
  style,
  cardStyle,
  tone = 'default',
  liquidGlass = 'subtle',
  glassQuality = 'baseline',
  debugId,
}) => {
  const gradient = avatarGradients[gradientIndex % avatarGradients.length];

  return (
    <GlassCard
      debugId={debugId}
      tone={tone}
      liquidGlass={liquidGlass}
      glassQuality={glassQuality}
      style={{
        padding: 20,
        width: 260,
        display: 'flex',
        flexDirection: 'column',
        ...cardStyle,
        ...style,
      }}
    >
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
        {/* Avatar with outer glow ring */}
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            padding: 4,
            background: gradient,
            boxShadow: `0 0 24px rgba(0,240,255,0.3), 0 0 48px rgba(139,92,246,0.2)`,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: theme.background.deepNavy,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: theme.typography.fontHeader,
              fontSize: 32,
              fontWeight: 700,
              textTransform: 'uppercase',
              color: 'white',
              textShadow: theme.neon.cyan.sharper,
            }}
          >
            {initials}
          </div>
        </div>
        <div
          style={{
            width: '100%',
            fontFamily: theme.typography.fontHeader,
            fontSize: 26,
            fontWeight: 600,
            color: 'white',
            textAlign: 'center',
          }}
        >
          {name}
        </div>
      </div>
    </GlassCard>
  );
};
