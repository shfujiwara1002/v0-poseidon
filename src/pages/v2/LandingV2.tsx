/**
 * Landing page — v2 Design System reference implementation.
 *
 * Demonstrates: Surface, SectionHeader, Button, Badge, StatCard,
 * IconContainer, RingProgress, SparkLine, GlowBorder,
 * AuroraGradient, GridOverlay, PulsingOrb, NeuralBackground,
 * GlassPanel, TypewriterText, ConfidenceRing, Progress, Separator
 */
import {
  Surface, SectionHeader, Button, Badge,
  StatCard, IconContainer, RingProgress, SparkLine,
  GlowBorder, AuroraGradient, GridOverlay, PulsingOrb,
  NeuralBackground, GlassPanel, TypewriterText, ConfidenceRing,
  Progress, Separator, DesignSystemProvider,
} from '@/design-system'
import { Link } from '../../router'

const engines = [
  { key: 'protect' as const, title: 'Protect', desc: 'Risk alerts with explainable cause and clear owner actions.', icon: '🛡️' },
  { key: 'grow' as const, title: 'Grow', desc: 'Forecasts with confidence bands and decision-ready drivers.', icon: '📈' },
  { key: 'execute' as const, title: 'Execute', desc: 'Human-approved queue with fail-closed rollback controls.', icon: '⚡' },
  { key: 'govern' as const, title: 'Govern', desc: 'Audit ledger, policy compliance, and transparent oversight.', icon: '⚖️' },
]

const trustMetrics = [
  { label: 'Confidence', value: '0.92', engine: 'protect' as const },
  { label: 'Coverage', value: '98%', engine: 'grow' as const },
  { label: 'Latency', value: '12m', engine: 'execute' as const },
  { label: 'Readiness', value: '91%', engine: 'govern' as const },
]

const sparkData = [88, 89, 90, 91, 92, 92]

export function LandingV2() {
  return (
    <DesignSystemProvider effectPreset="aurora">
      <div className="min-h-screen bg-[#0B1221] text-slate-100 relative overflow-hidden">
        {/* Background */}
        <NeuralBackground engine="protect" density="sparse" className="opacity-20" />
        <AuroraGradient engine="grow" intensity="subtle" />

        <div className="relative z-10">
          {/* Hero */}
          <section className="relative px-6 py-20 md:py-32 text-center">
            <GridOverlay opacity={0.02} />
            <div className="relative z-10 max-w-4xl mx-auto space-y-8">
              <div className="flex justify-center">
                <PulsingOrb engine="protect" size={120} />
              </div>
              <Badge variant="engine" engine="protect" glow>Poseidon.AI</Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                <TypewriterText
                  text="Safer, satisfying money decisions — in one place."
                  speed={25}
                />
              </h1>
              <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
                Four AI engines — Protect, Grow, Execute, Govern — working together so you stay in control.
              </p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <Link to="/signup">
                  <Button variant="primary" size="lg" engine="protect">Start free →</Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="outline" size="lg">Open dashboard</Button>
                </Link>
              </div>

              {/* Trust strip */}
              <div className="flex items-center justify-center gap-3 text-sm text-slate-500">
                <ConfidenceRing value={92} size="sm" engine="protect" />
                <span>Composite confidence 0.92</span>
                <span>|</span>
                <span>98% coverage</span>
              </div>
            </div>
          </section>

          {/* Engine cards */}
          <section className="px-6 py-16 max-w-6xl mx-auto">
            <SectionHeader
              title="Mission surfaces"
              subtitle="Four engines working together for safer financial decisions."
              className="text-center mb-10"
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {engines.map((e) => (
                <GlowBorder key={e.key} engine={e.key} intensity="subtle">
                  <Surface variant="glass" padding="lg" engine={e.key} className="h-full">
                    <IconContainer engine={e.key} glow size="lg" className="mb-4">
                      {e.icon}
                    </IconContainer>
                    <h3 className="text-lg font-semibold mb-2">{e.title}</h3>
                    <p className="text-sm text-slate-400 mb-4">{e.desc}</p>
                    <Link to={`/${e.key}`}>
                      <Button variant="ghost" engine={e.key} size="sm">
                        Open {e.title} →
                      </Button>
                    </Link>
                  </Surface>
                </GlowBorder>
              ))}
            </div>
          </section>

          {/* Trust Pulse */}
          <section className="px-6 py-16 max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <SectionHeader
                  title="Live Trust Pulse"
                  subtitle="Real-time cross-engine health metrics."
                  engine="govern"
                />
                <div className="mt-6 grid grid-cols-2 gap-4">
                  {trustMetrics.map((m) => (
                    <StatCard key={m.label} title={m.label} value={m.value} engine={m.engine} />
                  ))}
                </div>
              </div>
              <GlassPanel blur="lg" opacity={0.06} className="rounded-2xl p-8">
                <div className="flex justify-center mb-6">
                  <RingProgress value={92} label="Trust" sublabel="All engines" engine="protect" size={140} />
                </div>
                <Separator className="my-4" />
                <div className="space-y-3">
                  {[
                    { label: 'Healthy systems', value: 88, engine: 'protect' as const },
                    { label: 'Action readiness', value: 81, engine: 'execute' as const },
                    { label: 'Govern coverage', value: 94, engine: 'govern' as const },
                  ].map((m) => (
                    <div key={m.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-400">{m.label}</span>
                        <span>{m.value}%</span>
                      </div>
                      <Progress value={m.value} engine={m.engine} size="sm" />
                    </div>
                  ))}
                </div>
              </GlassPanel>
            </div>
          </section>

          {/* Activation */}
          <section className="px-6 py-16 max-w-4xl mx-auto text-center">
            <SectionHeader
              title="Get started in 3 steps"
              subtitle="Full command center access in minutes."
              className="text-center mb-10"
            />
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { step: '01', title: 'Sign up', desc: 'Create your account in seconds.' },
                { step: '02', title: 'Onboard', desc: 'Connect your data sources.' },
                { step: '03', title: 'Activate', desc: 'Unlock all four engine surfaces.' },
              ].map((s) => (
                <Surface key={s.step} variant="glass" padding="lg">
                  <div className="text-3xl font-bold text-slate-600 mb-2">{s.step}</div>
                  <h3 className="text-lg font-semibold mb-1">{s.title}</h3>
                  <p className="text-sm text-slate-400">{s.desc}</p>
                </Surface>
              ))}
            </div>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link to="/signup">
                <Button variant="primary" size="lg" engine="protect">Create account</Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="ghost" size="lg">Explore demo</Button>
              </Link>
            </div>
          </section>

          {/* Footer */}
          <footer className="px-6 py-10 border-t border-white/5 text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
              <span>Audit-ready defaults</span>
              <span>•</span>
              <span>Model + policy visible</span>
              <span>•</span>
              <span>Human review always available</span>
            </div>
            <div className="mt-3 flex items-center justify-center gap-2">
              <SparkLine data={sparkData} engine="protect" width={48} height={16} />
              <span className="text-xs text-slate-500">Trust trending stable</span>
            </div>
          </footer>
        </div>
      </div>
    </DesignSystemProvider>
  )
}

export default LandingV2
