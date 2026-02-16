import React from 'react';
import { GlassCard } from '../../shared/GlassCard';
import { SlideIcon } from '../../shared/SlideIcon';
import { theme } from '../../shared/theme';

type EngineKey = 'Protect' | 'Grow' | 'Execute' | 'Govern';

type Engine = {
  name: string;
  capability: string;
  bullets: ReadonlyArray<string>;
};

type EngineColorMap = Record<EngineKey, string>;

type ProtectGrowExecuteClusterProps = {
  engines: ReadonlyArray<Engine>;
  governEngine: Engine;
  engineColorMap: EngineColorMap;
};

const iconMap: Record<Exclude<EngineKey, 'Govern'>, { icon: string; glowColor: 'blue' }> = {
  Protect: { icon: 'shield', glowColor: 'blue' },
  Grow: { icon: 'wave', glowColor: 'blue' },
  Execute: { icon: 'gear', glowColor: 'blue' },
};

const regulationCoverage = [
  { label: 'ECOA / Reg B', color: theme.accent.teal },
  { label: 'EU AI Act', color: theme.accent.violet },
  { label: 'GDPR Art 22', color: theme.accent.amber },
  { label: 'CCPA', color: theme.accent.cyan },
  { label: 'Colorado SB 24-205', color: theme.accent.blue },
] as const;

export const ProtectGrowExecuteCluster: React.FC<ProtectGrowExecuteClusterProps> = ({
  engines,
  governEngine,
  engineColorMap,
}) => {
  return (
    <GlassCard
      liquidGlass
      tone="dark"
      style={{
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: theme.spacing.space5,
        }}
      >
        {engines.map((engine) => {
          const name = engine.name as Exclude<EngineKey, 'Govern'>;
          const iconConfig = iconMap[name];
          return (
            <GlassCard
              key={engine.name}
              variant="blue"
              tone="dark"
              style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 20 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div
                  style={{
                    fontFamily: theme.typography.fontUi,
                    fontSize: 46,
                    fontWeight: 700,
                    color: engineColorMap[name],
                  }}
                >
                  {engine.name}
                </div>
                <SlideIcon
                  name={iconConfig.icon}
                  size={32}
                  glowColor={iconConfig.glowColor}
                />
              </div>
              <div
                style={{
                  fontFamily: theme.typography.fontUi,
                  fontSize: 21,
                  color: 'rgba(255,255,255,0.8)',
                  fontStyle: 'italic',
                  lineHeight: 1.3,
                }}
              >
                {engine.capability}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
                {engine.bullets.map((bullet, index) => (
                  <div key={index} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <div
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: '50%',
                        background: 'white',
                        marginTop: 8,
                        opacity: 0.5,
                      }}
                    />
                    <div
                      style={{
                        fontFamily: theme.typography.fontUi,
                        fontSize: 20,
                        color: 'rgba(255,255,255,0.7)',
                        lineHeight: 1.32,
                      }}
                    >
                      {bullet}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          );
        })}
      </div>

      <div
        style={{
          borderTop: `1px solid ${theme.glass.glassBorderSubtle}`,
          paddingTop: 12,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              fontFamily: theme.typography.fontHeader,
              fontSize: 50,
              fontWeight: 700,
              color: engineColorMap.Govern,
            }}
          >
            {governEngine.name}
          </div>
        </div>
        <div
          style={{
            fontFamily: theme.typography.fontUi,
            fontSize: 24,
            color: 'rgba(255,255,255,0.9)',
            lineHeight: 1.22,
          }}
        >
          {governEngine.capability}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr',
            gap: 12,
            marginTop: 0,
          }}
        >
          <div
            style={{
              background: 'linear-gradient(145deg, rgba(7,14,30,0.8), rgba(6,24,42,0.55))',
              border: `1px solid ${theme.glass.glassBorder}`,
              borderRadius: 14,
              padding: '12px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <div
              style={{
                fontFamily: theme.typography.fontUi,
                fontSize: 14,
                fontWeight: 600,
                color: 'rgba(255,255,255,0.72)',
                letterSpacing: '0.05em',
              }}
            >
              GOVERNANCE IMPACT
            </div>

            {governEngine.bullets.map((bullet, index) => {
              const icons = ['consent-check', 'explainability', 'audit-timeline'] as const;
              return (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '10px 12px',
                    borderRadius: 10,
                    border: `1px solid ${theme.glass.glassBorderSubtle}`,
                    background: 'linear-gradient(130deg, rgba(14,22,40,0.64), rgba(8,20,36,0.52))',
                  }}
                >
                  <SlideIcon name={icons[index]} size={20} glowColor="cyan" />
                  <div
                    style={{
                      fontFamily: theme.typography.fontUi,
                      fontSize: 20,
                      color: 'rgba(255,255,255,0.84)',
                      lineHeight: 1.24,
                    }}
                  >
                    {bullet}
                  </div>
                </div>
              );
            })}
          </div>

          <div
            style={{
              background: 'linear-gradient(145deg, rgba(7,14,30,0.82), rgba(8,28,44,0.56))',
              border: `1px solid ${theme.glass.glassBorder}`,
              borderRadius: 14,
              padding: '12px 13px',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 10,
              }}
            >
              <div
                style={{
                  fontFamily: theme.typography.fontUi,
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.74)',
                  letterSpacing: '0.05em',
                }}
              >
                REGULATORY COVERAGE
              </div>
              <div
                style={{
                  padding: '4px 10px',
                  borderRadius: 999,
                  border: `1px solid rgba(16,185,129,0.55)`,
                  background: 'rgba(16,185,129,0.12)',
                  color: '#34d399',
                  fontFamily: theme.typography.fontUi,
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                5 / 5 Compliant
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {regulationCoverage.map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 10,
                    padding: '8px 10px',
                    borderRadius: 10,
                    border: `1px solid ${theme.glass.glassBorderSubtle}`,
                    background: 'linear-gradient(128deg, rgba(12,24,40,0.56), rgba(8,16,30,0.5))',
                  }}
                >
                  <div
                    style={{
                      fontFamily: theme.typography.fontUi,
                      fontSize: 15,
                      color: item.color,
                      fontWeight: 700,
                      lineHeight: 1.2,
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      color: '#34d399',
                      fontFamily: theme.typography.fontUi,
                      fontSize: 13,
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: '#10b981',
                        boxShadow: '0 0 10px rgba(16,185,129,0.65)',
                      }}
                    />
                    Compliant
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 2,
                borderRadius: 999,
                border: `1px solid ${theme.glass.glassBorderSubtle}`,
                padding: 2,
                background: 'rgba(8,18,32,0.55)',
              }}
            >
              <div
                style={{
                  width: '100%',
                  borderRadius: 999,
                  background: 'linear-gradient(90deg, rgba(20,184,166,0.9), rgba(59,130,246,0.9))',
                  color: '#d1fae5',
                  textAlign: 'center',
                  fontFamily: theme.typography.fontUi,
                  fontSize: 12,
                  fontWeight: 700,
                  lineHeight: 1.7,
                }}
              >
                Coverage 100%
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
