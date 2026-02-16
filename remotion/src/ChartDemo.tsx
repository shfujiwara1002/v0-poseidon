import React from 'react';
import { AbsoluteFill } from 'remotion';
import { theme } from './shared/theme';
import { ChartLine } from './shared/charts/ChartLine';
import { ChartBar } from './shared/charts/ChartBar';
import { ChartPie } from './shared/charts/ChartPie';
import { GlassCard } from './shared/GlassCard';
import { VisualGlowingChart } from './shared/visuals/VisualGlowingChart';

export const ChartDemo: React.FC = () => {
  const lineData = [10, 40, 30, 70, 50, 90, 80];
  const barData = [65, 45, 80, 50, 75];
  const barLabels = ['Q1', 'Q2', 'Q3', 'Q4', 'Q1'];
  const pieData = [
    { value: 30, label: 'Tech', color: theme.accent.cyan },
    { value: 45, label: 'Ops', color: theme.accent.violet },
    { value: 25, label: 'Gov', color: theme.accent.amber },
  ];

  return (
    <AbsoluteFill
      style={{
        background: theme.backgroundGradient,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 60,
        flexWrap: 'wrap',
        padding: 60
      }}
    >
      <GlassCard style={{ padding: 40, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ fontFamily: theme.typography.fontUi, color: 'white', marginBottom: 20 }}>Growth Trend</h2>
        <ChartLine data={lineData} width={500} height={300} />
      </GlassCard>

      <GlassCard style={{ padding: 40, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ fontFamily: theme.typography.fontUi, color: 'white', marginBottom: 20 }}>Revenue Mix</h2>
        <ChartBar
          data={barData.map((d, i) => ({ value: d, label: barLabels[i] || '', color: '#00F0FF' }))}
          width={500}
          height={300}
        />
      </GlassCard>

      <GlassCard style={{ padding: 40, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ fontFamily: theme.typography.fontUi, color: 'white', marginBottom: 20 }}>Allocation</h2>
        <ChartPie data={pieData} size={300} />
        <div style={{ display: 'flex', gap: 20, marginTop: 20 }}>
          {pieData.map(d => (
            <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: d.color }} />
              <span style={{ fontFamily: theme.typography.fontUi, color: 'rgba(255,255,255,0.7)' }}>{d.label}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard style={{ padding: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', width: 900 }}>
        <h2 style={{ fontFamily: theme.typography.fontUi, color: 'white', marginBottom: 20 }}>Future Projections (Neon)</h2>
        <VisualGlowingChart
          width={800}
          height={300}
          dataPoints={[
            { x: 0.1, y: 0.2, color: theme.accent.cyan },
            { x: 0.3, y: 0.4, color: theme.accent.violet },
            { x: 0.5, y: 0.6, color: theme.accent.cyan, label: "Inflection" },
            { x: 0.7, y: 0.75, color: theme.accent.violet },
            { x: 0.9, y: 0.9, color: theme.accent.cyan }
          ]}
          bands={[
            { startY: 0.2, endY: 0.8, color: theme.accent.cyan },
            { startY: 0.1, endY: 0.6, color: theme.semantic.growth }
          ]}
        />
      </GlassCard>
    </AbsoluteFill>
  );
};
