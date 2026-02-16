/**
 * Dashboard page — v2 Design System reference implementation.
 *
 * Demonstrates: Surface, SectionHeader, StatCard, DetailRow, Badge,
 * Button, DataTable, SparkLine, RingProgress, ConfidenceRing,
 * AIInsightBanner, FactorBar, DSAreaChart,
 * AuroraGradient, GridOverlay, GlowBorder, NeuralBackground
 */
import { useState } from 'react'
import {
  Surface, SectionHeader, StatCard, DetailRow, Badge, Button,
  DataTable, SparkLine, RingProgress, ConfidenceRing,
  AIInsightBanner, FactorBar, DSAreaChart, Separator,
  AuroraGradient, GridOverlay, GlowBorder, NeuralBackground,
  DesignSystemProvider, ScrollArea,
} from '@/design-system'

const trustScores = [
  { engine: 'protect' as const, label: 'Protect', score: 94, trend: 'stable' },
  { engine: 'grow' as const, label: 'Grow', score: 89, trend: 'up' },
  { engine: 'execute' as const, label: 'Execute', score: 91, trend: 'stable' },
  { engine: 'govern' as const, label: 'Govern', score: 97, trend: 'up' },
]

const forecastData = Array.from({ length: 12 }, (_, i) => ({
  name: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
  value: 400 + Math.round(Math.sin(i * 0.5) * 200 + i * 30),
}))

const actionColumns = [
  { key: 'action', label: 'Action', sortable: true },
  { key: 'engine', label: 'Engine' },
  { key: 'impact', label: 'Impact', sortable: true },
  { key: 'confidence', label: 'Confidence', sortable: true },
]
const actionRows = [
  { action: 'Consolidate subscriptions', engine: 'Execute', impact: '$140/mo', confidence: '92%' },
  { action: 'Adjust cash buffer', engine: 'Protect', impact: '+7 days', confidence: '88%' },
  { action: 'Review vendor risk', engine: 'Govern', impact: 'Risk ↓', confidence: '94%' },
  { action: 'Rebalance portfolio', engine: 'Grow', impact: '+2.3%', confidence: '85%' },
]

const insightFactors = [
  { label: 'Cost overlap', value: 0.82 },
  { label: 'Usage frequency', value: -0.45 },
  { label: 'Contract flexibility', value: 0.71 },
  { label: 'Vendor risk', value: -0.28 },
]

const sparkData = [10, 25, 15, 30, 22, 35, 28, 40, 32, 45]

export function DashboardV2() {
  const [selectedEngine, setSelectedEngine] = useState<'protect' | 'grow' | 'execute' | 'govern'>('protect')

  return (
    <DesignSystemProvider effectPreset="neon">
      <div className="min-h-screen bg-[#0B1221] text-slate-100 relative overflow-hidden">
        {/* Background effects */}
        <NeuralBackground engine={selectedEngine} density="sparse" className="opacity-30" />
        <AuroraGradient engine={selectedEngine} intensity="subtle" />

        <div className="relative z-10 p-6 md:p-10">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Hero section */}
            <div className="relative">
              <GridOverlay engine={selectedEngine} opacity={0.03} />
              <div className="relative z-10">
                <SectionHeader
                  title="Dashboard"
                  subtitle="System confidence 0.92 across 4 engines. One unresolved alert. Three actions queued."
                  engine={selectedEngine}
                />
              </div>
            </div>

            {/* KPI strip */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Net position" value="$847k" change={8.2}
                engine="grow" icon={<SparkLine data={sparkData} engine="grow" width={60} height={24} />}
              />
              <StatCard title="Cash flow" value="+$4.1k" change={12} engine="execute" />
              <StatCard title="Risk level" value="Low" change={-15} engine="protect" />
              <StatCard title="Alerts" value="2" change={-3} engine="govern" />
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Trust pulse */}
                <Surface variant="glass" padding="lg" engine={selectedEngine}>
                  <SectionHeader title="System trust" subtitle="Composite confidence across all four engines." />
                  <Separator className="my-4" />
                  <div className="flex items-center gap-6 flex-wrap">
                    <RingProgress value={92} label="Trust" sublabel="Composite" engine={selectedEngine} size={120} />
                    <div className="flex-1 grid grid-cols-2 gap-3">
                      {trustScores.map((t) => (
                        <button
                          key={t.engine}
                          onClick={() => setSelectedEngine(t.engine)}
                          className={`text-left p-3 rounded-lg transition-colors ${selectedEngine === t.engine ? 'bg-white/10' : 'hover:bg-white/5'}`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <ConfidenceRing value={t.score} size="sm" engine={t.engine} />
                            <span className="text-sm font-medium">{t.label}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold">{t.score}</span>
                            <Badge variant={t.trend === 'up' ? 'success' : 'info'} size="sm">
                              {t.trend === 'up' ? '↑' : '→'}
                            </Badge>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </Surface>

                {/* AI Insight */}
                <AIInsightBanner
                  title="Top recommendation rationale"
                  description="Consolidate 3 overlapping subscriptions. Combined monthly cost: $287. Deduplicated target: $147."
                  engine="execute"
                  confidence={92}
                  action={
                    <div className="space-y-2 mt-3">
                      {insightFactors.map((f) => (
                        <FactorBar key={f.label} label={f.label} value={f.value} />
                      ))}
                    </div>
                  }
                />

                {/* Forecast chart */}
                <Surface variant="glass" padding="lg" engine="grow">
                  <SectionHeader
                    title={`${selectedEngine.charAt(0).toUpperCase() + selectedEngine.slice(1)} forecast`}
                    subtitle="Cash flow projection driven by engine signals."
                    engine="grow"
                  />
                  <Separator className="my-4" />
                  <DSAreaChart data={forecastData} dataKey="value" xKey="name" engine="grow" height={280} />
                </Surface>

                {/* Action queue */}
                <GlowBorder engine="execute" intensity="subtle">
                  <Surface variant="glass" padding="lg">
                    <SectionHeader title="Next best actions" subtitle="Ranked by projected impact across all engines." />
                    <Separator className="my-4" />
                    <DataTable columns={actionColumns} rows={actionRows} />
                    <div className="mt-4 flex gap-3">
                      <Button variant="primary" engine="execute">Review in Execute</Button>
                      <Button variant="ghost">Audit trail</Button>
                    </div>
                  </Surface>
                </GlowBorder>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Risk gauge */}
                <Surface variant="glass" padding="md" engine="protect">
                  <SectionHeader title="Threat level" />
                  <div className="flex justify-center py-4">
                    <RingProgress value={12} label="Risk" sublabel="Low" engine="protect" size={100} />
                  </div>
                  <div className="space-y-2">
                    <DetailRow label="Critical signals" value="0" engine="protect" />
                    <DetailRow label="Medium (resolved)" value="1" />
                    <DetailRow label="Trend" value="Declining" engine="protect" />
                  </div>
                </Surface>

                {/* Engine details */}
                <Surface variant="elevated" padding="md">
                  <SectionHeader title="Engine health" />
                  <Separator className="my-3" />
                  <ScrollArea maxHeight="240px">
                    <div className="space-y-3">
                      {trustScores.map((t) => (
                        <div key={t.engine} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <ConfidenceRing value={t.score} size="sm" engine={t.engine} />
                            <span className="text-sm">{t.label}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <SparkLine data={sparkData} engine={t.engine} width={48} height={16} />
                            <Badge variant="engine" engine={t.engine} size="sm">{t.score}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </Surface>

                {/* Govern footer */}
                <Surface variant="inset" padding="md">
                  <SectionHeader title="Governance" />
                  <Separator className="my-3" />
                  <div className="space-y-2 text-xs">
                    <DetailRow label="Audit ID" value="GV-2026-0212" />
                    <DetailRow label="Model" value="v3.2" engine="govern" />
                    <DetailRow label="XAI version" value="xai-2.1" />
                  </div>
                  <div className="mt-3">
                    <Button variant="ghost" size="sm" engine="govern" fullWidth>View audit ledger</Button>
                  </div>
                </Surface>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DesignSystemProvider>
  )
}

export default DashboardV2
