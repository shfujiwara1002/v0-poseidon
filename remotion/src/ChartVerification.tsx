import { AbsoluteFill } from 'remotion';
import { ChartLine } from './shared/charts/ChartLine';
import { ChartBar } from './shared/charts/ChartBar';
import { ChartPie } from './shared/charts/ChartPie';
import { ChartRadar } from './shared/charts/ChartRadar';
import { ChartTimeline } from './shared/charts/ChartTimeline';
import { ChartFunnel } from './shared/charts/ChartFunnel';
import { theme } from './shared/theme';

export const ChartVerification: React.FC = () => {
    return (
        <AbsoluteFill style={{ backgroundColor: theme.background.deepNavy, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: 40, gap: 40 }}>
            {/* 1. CHART LINE */}
            <div style={{ border: '1px solid white', padding: 20 }}>
                <h2 style={{ color: 'white', fontFamily: theme.typography.fontUi, marginTop: 0 }}>Line Chart (Neon)</h2>
                <ChartLine
                    data={[10, 45, 30, 80, 55, 90, 70]}
                    width={400}
                    height={200}
                    smooth
                    showConfidenceBand
                    confidenceUpper={[15, 55, 40, 90, 65, 95, 80]}
                    confidenceLower={[5, 35, 20, 70, 45, 80, 60]}
                    confidenceColor={theme.accent.cyan}
                    showDotGrid
                />
            </div>

            {/* 2. CHART BAR */}
            <div style={{ border: '1px solid white', padding: 20 }}>
                <h2 style={{ color: 'white', fontFamily: theme.typography.fontUi, marginTop: 0 }}>Bar Chart (Pillars)</h2>
                <ChartBar
                    data={[
                        { label: 'Q1', value: 120, color: theme.accent.cyan },
                        { label: 'Q2', value: 200, color: theme.accent.violet },
                        { label: 'Q3', value: 150, color: theme.accent.teal },
                        { label: 'Q4', value: 320, color: theme.accent.teal },
                    ]}
                    width={400}
                    height={200}
                    showScanlines
                    showReflection
                />
            </div>

            {/* 3. CHART PIE */}
            <div style={{ border: '1px solid white', padding: 20 }}>
                <h2 style={{ color: 'white', fontFamily: theme.typography.fontUi, marginTop: 0 }}>Donut (Holographic)</h2>
                <ChartPie
                    data={[
                        { label: 'Cloud', value: 40, color: theme.accent.cyan },
                        { label: 'Edge', value: 30, color: theme.accent.violet },
                        { label: 'On-Prem', value: 20, color: theme.accent.teal },
                    ]}
                    size={220}
                    innerRadius={0.65}
                    centerValue="90%"
                    centerLabel="Total Coverage"
                />
            </div>

            {/* 4. CHART RADAR */}
            <div style={{ border: '1px solid white', padding: 20 }}>
                <h2 style={{ color: 'white', fontFamily: theme.typography.fontUi, marginTop: 0 }}>Radar (Governance)</h2>
                <ChartRadar
                    axes={[
                        { label: 'Security', value: 95, maxValue: 100 },
                        { label: 'Privacy', value: 90, maxValue: 100 },
                        { label: 'Compliance', value: 100, maxValue: 100 },
                        { label: 'Speed', value: 85, maxValue: 100 },
                        { label: 'Cost', value: 92, maxValue: 100 },
                    ]}
                    width={300}
                    height={300}
                    fillColor={theme.accent.cyan}
                    strokeColor={theme.accent.cyan}
                />
            </div>

            {/* 5. CHART TIMELINE */}
            <div style={{ border: '1px solid white', padding: 20, gridColumn: 'span 2' }}>
                <h2 style={{ color: 'white', fontFamily: theme.typography.fontUi, marginTop: 0 }}>Timeline (Roadmap)</h2>
                <ChartTimeline
                    phases={[
                        { label: 'Phase 1', value: 'Foundation', color: theme.accent.cyan, progress: 1 },
                        { label: 'Phase 2', value: 'Integration', color: theme.accent.violet, progress: 1 },
                        { label: 'Phase 3', value: 'Scaling', color: theme.accent.teal, progress: 0.5 },
                        { label: 'Phase 4', value: 'Global', color: theme.accent.red, progress: 0 },
                    ]}
                    width={800}
                    height={150}
                />
            </div>

            {/* 6. CHART FUNNEL */}
            <div style={{ border: '1px solid white', padding: 20 }}>
                <h2 style={{ color: 'white', fontFamily: theme.typography.fontUi, marginTop: 0 }}>Funnel (Conversion)</h2>
                <ChartFunnel
                    stages={[
                        { label: 'Leads', value: 5000, color: theme.accent.cyan },
                        { label: 'Qualified', value: 2500, color: theme.accent.teal },
                        { label: 'Closed', value: 1200, color: theme.accent.teal },
                    ]}
                    width={300}
                    height={250}
                />
            </div>
        </AbsoluteFill>
    );
};
