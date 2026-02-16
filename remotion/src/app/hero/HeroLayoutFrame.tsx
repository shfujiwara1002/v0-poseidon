import React from 'react';
import { AbsoluteFill } from 'remotion';
import { GlassCard } from '../../shared/GlassCard';
import { SlideIcon } from '../../shared/SlideIcon';
import { theme } from '../../shared/theme';

interface HeroLayoutFrameProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  variant?: 'web' | 'mobile';
  engine?: 'Dashboard' | 'Protect' | 'Grow' | 'Execute' | 'Govern' | 'Settings';
}

const navItems = [
  { key: 'Dashboard', label: 'Dashboard', icon: 'data-grid' },
  { key: 'Protect', label: 'Protect', icon: 'shield' },
  { key: 'Grow', label: 'Grow', icon: 'wave' },
  { key: 'Execute', label: 'Execute', icon: 'signal-beam' },
  { key: 'Govern', label: 'Govern', icon: 'govern-core' },
  { key: 'Settings', label: 'Settings', icon: 'gear' },
];

const topNavItems = [
  { key: 'Landing', label: 'Landing' },
  { key: 'Dashboard', label: 'Dashboard' },
  { key: 'Protect', label: 'Protect' },
  { key: 'Grow', label: 'Grow' },
  { key: 'Execute', label: 'Execute' },
  { key: 'Govern', label: 'Govern' },
  { key: 'Settings', label: 'Settings' },
];

const engineAccentMap: Record<NonNullable<HeroLayoutFrameProps['engine']>, string> = {
  Dashboard: theme.accent.cyan,
  Protect: theme.accent.teal,
  Grow: theme.accent.violet,
  Execute: theme.accent.amber,
  Govern: theme.accent.blue,
  Settings: theme.accent.blue,
};

const engineSecondaryMap: Record<NonNullable<HeroLayoutFrameProps['engine']>, string> = {
  Dashboard: theme.accent.blue,
  Protect: theme.accent.emerald,
  Grow: theme.accent.teal,
  Execute: theme.accent.gold,
  Govern: theme.accent.cyan,
  Settings: theme.accent.violet,
};

export const HeroLayoutFrame: React.FC<HeroLayoutFrameProps> = ({
  title,
  subtitle,
  children,
  variant = 'web',
  engine,
}) => {
  const activeAccent = engine ? engineAccentMap[engine] : theme.accent.cyan;
  const activeSecondary = engine ? engineSecondaryMap[engine] : theme.accent.teal;

  if (variant === 'mobile') {
    return (
      <AbsoluteFill
        style={{
          background: [
            `radial-gradient(80% 42% at 0% 0%, ${activeSecondary}22 0%, transparent 70%)`,
            `radial-gradient(84% 46% at 100% 0%, ${activeAccent}26 0%, transparent 72%)`,
            theme.backgroundGradient,
          ].join(', '),
          color: 'white',
          fontFamily: theme.typography.fontUi,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 40,
            left: 40,
            right: 40,
            bottom: 40,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            alignItems: 'stretch',
          }}
        >
          <GlassCard
            tone="dark"
            style={{
              padding: '14px 16px',
              border: '1px solid rgba(255,255,255,0.18)',
              display: 'grid',
              gap: 10,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 700, letterSpacing: '0.01em' }}>
                <SlideIcon name="vault" size={16} glowColor="cyan" variant="simple" />
                Poseidon.AI
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.78)' }}>Sign in</span>
                <span
                  style={{
                    height: 30,
                    borderRadius: 999,
                    padding: '0 12px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    fontWeight: 600,
                    color: '#052236',
                    background: `linear-gradient(140deg, ${activeSecondary}, ${activeAccent})`,
                    boxShadow: `0 0 16px ${activeAccent}44`,
                  }}
                >
                  Start free
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {topNavItems.map((item) => {
                const isActive = engine ? item.key === engine : item.key === 'Dashboard';
                return (
                  <div
                    key={item.key}
                    style={{
                      minHeight: 30,
                      borderRadius: 999,
                      padding: '0 10px',
                      fontSize: 12,
                      display: 'inline-flex',
                      alignItems: 'center',
                      border: `1px solid ${isActive ? activeAccent : 'rgba(255,255,255,0.16)'}`,
                      color: isActive ? '#f4fbff' : 'rgba(231,239,255,0.76)',
                      background: isActive ? `${activeAccent}26` : 'rgba(9,18,34,0.64)',
                    }}
                  >
                    {item.label}
                  </div>
                );
              })}
            </div>
          </GlassCard>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 2 }}>
            <div style={{ fontSize: 34, fontWeight: 650, letterSpacing: '-0.02em', lineHeight: 1.04 }}>{title}</div>
            {subtitle && <div style={{ fontSize: 18, color: 'rgba(223,234,251,0.82)' }}>{subtitle}</div>}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}
          >
            <div style={{ width: '100%', maxWidth: 520, display: 'flex', justifyContent: 'center' }}>
              {children}
            </div>
          </div>
          <GlassCard
            tone="dark"
            style={{
              padding: '8px 10px',
              border: '1px solid rgba(255,255,255,0.16)',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: 6 }}>
              {navItems.slice(0, 5).map((item) => {
                const active = engine === item.key;
                return (
                  <div
                    key={item.key}
                    style={{
                      minHeight: 44,
                      borderRadius: 10,
                      border: `1px solid ${active ? activeAccent : 'rgba(255,255,255,0.14)'}`,
                      background: active ? `${activeAccent}22` : 'rgba(8,16,30,0.72)',
                      color: active ? '#f4f9ff' : 'rgba(221,233,249,0.78)',
                      display: 'grid',
                      justifyItems: 'center',
                      alignContent: 'center',
                      gap: 4,
                      fontSize: 10,
                    }}
                  >
                    <SlideIcon name={item.icon} size={12} glowColor={active ? 'cyan' : 'blue'} variant="simple" />
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </div>
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill
      style={{
        background: [
          `radial-gradient(70% 42% at 0% 0%, ${activeSecondary}22 0%, transparent 68%)`,
          `radial-gradient(72% 44% at 100% 0%, ${activeAccent}28 0%, transparent 70%)`,
          theme.backgroundGradient,
        ].join(', '),
        color: 'white',
        fontFamily: theme.typography.fontUi,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: theme.spacing.marginY,
          left: theme.spacing.marginX,
          right: theme.spacing.marginX,
          bottom: theme.spacing.marginY,
          display: 'grid',
          gridTemplateColumns: '240px 1fr',
          gridTemplateRows: '64px 1fr',
          gap: 20,
        }}
      >
        <GlassCard
          tone="dark"
          style={{
            gridRow: '1 / span 2',
            padding: 18,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <SlideIcon name="vault" size={20} glowColor="cyan" variant="simple" />
            <div style={{ fontWeight: 700, letterSpacing: '0.02em' }}>Poseidon</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {navItems.map((item) => {
              const active = engine === item.key;
              const accent = active ? activeAccent : 'rgba(255,255,255,0.35)';
              const glowColor =
                engine === 'Execute'
                  ? 'amber'
                  : engine === 'Grow'
                    ? 'violet'
                    : engine === 'Govern' || engine === 'Settings'
                      ? 'blue'
                      : engine === 'Protect'
                        ? 'teal'
                        : 'cyan';

              return (
                <div
                  key={item.key}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '10px 12px',
                    borderRadius: 12,
                    background: active ? 'rgba(255,255,255,0.08)' : 'transparent',
                    border: active ? `1px solid ${accent}` : '1px solid transparent',
                    color: active ? 'white' : 'rgba(255,255,255,0.6)',
                  }}
                >
                  <SlideIcon
                    name={item.icon}
                    size={16}
                    glowColor={active ? glowColor : 'white'}
                    variant="simple"
                  />
                  <span style={{ fontSize: 14, fontWeight: active ? 600 : 500 }}>{item.label}</span>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 'auto', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
            Govern Verified UI
          </div>
        </GlassCard>

        <GlassCard
          tone="dark"
          style={{
            gridColumn: 2,
            height: 76,
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 14,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', minWidth: 0 }}>
            {topNavItems.map((item) => {
              const isActive = engine ? item.key === engine : item.key === 'Dashboard';
              return (
                <div
                  key={item.key}
                  style={{
                    minHeight: 32,
                    borderRadius: 999,
                    border: `1px solid ${isActive ? activeAccent : 'rgba(255,255,255,0.16)'}`,
                    background: isActive ? `${activeAccent}26` : 'rgba(10,18,34,0.68)',
                    color: isActive ? '#f4fbff' : 'rgba(228,238,252,0.76)',
                    fontSize: 12,
                    padding: '0 12px',
                    display: 'inline-flex',
                    alignItems: 'center',
                  }}
                >
                  {item.label}
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ fontSize: 14, color: 'rgba(228,236,250,0.85)' }}>Sign in</div>
            <div
              style={{
                minWidth: 94,
                height: 38,
                borderRadius: 999,
                background: `linear-gradient(145deg, ${activeSecondary}, ${activeAccent})`,
                color: '#072335',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
                fontWeight: 650,
                boxShadow: `0 0 20px ${activeAccent}44`,
              }}
            >
              Start free
            </div>
          </div>
        </GlassCard>

        <div
          style={{
            gridColumn: 2,
            gridRow: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            minHeight: 0,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontSize: 30, fontWeight: 600 }}>{title}</div>
            {subtitle && <div style={{ fontSize: 16, opacity: 0.7 }}>{subtitle}</div>}
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
              gap: 20,
              alignItems: 'stretch',
              flex: 1,
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
