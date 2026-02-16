/**
 * Settings page — v2 Design System reference implementation.
 *
 * Demonstrates: Surface, SectionHeader, DetailRow, Toggle, Badge,
 * Button, StatCard, Separator, ScrollArea, GlassPanel
 */
import { useState } from 'react'
import {
  Surface, SectionHeader, DetailRow, Toggle, Badge,
  Button, StatCard, Separator, ScrollArea, Input,
  Modal, NavigationLink, DSToast, GlassPanel,
  DesignSystemProvider,
} from '@/design-system'

const policyItems = [
  { id: 'p1', label: 'Two-factor authentication', value: true },
  { id: 'p2', label: 'Biometric unlock', value: false },
  { id: 'p3', label: 'Auto-lock after 5 min', value: true },
  { id: 'p4', label: 'Transaction notifications', value: true },
  { id: 'p5', label: 'Anomaly alerts', value: true },
  { id: 'p6', label: 'Weekly digest email', value: false },
]

const quickNav = [
  { label: 'AI Delegation', href: '/settings/ai', engine: 'grow' as const },
  { label: 'Integrations', href: '/settings/integrations', engine: 'execute' as const },
  { label: 'Data Rights', href: '/settings/rights', engine: 'govern' as const },
  { label: 'Security', href: '/settings/security', engine: 'protect' as const },
]

export function SettingsV2() {
  const [policies, setPolicies] = useState(policyItems)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [toast, setToast] = useState<{ variant: 'success' | 'info'; message: string } | null>(null)

  const togglePolicy = (id: string) => {
    setPolicies((prev) => prev.map((p) => (p.id === id ? { ...p, value: !p.value } : p)))
    setToast({ variant: 'success', message: 'Setting updated' })
    setTimeout(() => setToast(null), 3000)
  }

  const activeCount = policies.filter((p) => p.value).length

  return (
    <DesignSystemProvider effectPreset="neon">
      <div className="min-h-screen bg-[#0B1221] text-slate-100 p-6 md:p-10">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Header */}
          <SectionHeader
            title="Settings"
            subtitle="Policies, team access, and AI controls."
            engine="govern"
          />

          {/* KPI strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard title="Active policies" value={String(activeCount)} change={2} engine="govern" />
            <StatCard title="Team seats" value="8" engine="protect" />
            <StatCard title="Alerts muted" value="2" change={-1} engine="execute" />
            <StatCard title="Backup freq" value="Daily" engine="grow" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Main column */}
            <div className="md:col-span-2 space-y-6">
              {/* Preferences */}
              <Surface variant="glass" padding="lg" engine="govern">
                <SectionHeader title="Preferences" subtitle="Toggle policies on or off." />
                <Separator className="my-4" />
                <ScrollArea maxHeight="320px">
                  <div className="space-y-3">
                    {policies.map((p) => (
                      <div key={p.id} className="flex items-center justify-between">
                        <span className="text-sm text-slate-300">{p.label}</span>
                        <Toggle
                          checked={p.value}
                          onChange={() => togglePolicy(p.id)}
                          engine="govern"
                          label={p.label}
                        />
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="mt-4 flex items-center gap-2">
                  <Badge variant="engine" engine="govern">{activeCount} active</Badge>
                  <Badge variant="info">{policies.length - activeCount} inactive</Badge>
                </div>
              </Surface>

              {/* Profile */}
              <Surface variant="glass" padding="lg">
                <SectionHeader title="Profile" subtitle="Account information" />
                <Separator className="my-4" />
                <div className="grid md:grid-cols-2 gap-4">
                  <Input label="Display name" placeholder="Your name" />
                  <Input label="Email" placeholder="you@example.com" type="email" />
                </div>
                <div className="mt-4 flex gap-3">
                  <Button variant="primary" engine="govern">Save changes</Button>
                  <Button variant="ghost" onClick={() => setConfirmOpen(true)}>Reset defaults</Button>
                </div>
              </Surface>

              {/* Details */}
              <Surface variant="glass" padding="lg">
                <SectionHeader title="Configuration health" />
                <Separator className="my-4" />
                <div className="space-y-2">
                  <DetailRow label="Configured policies" value={`${activeCount}/${policies.length}`} engine="govern" />
                  <DetailRow label="Last audit" value="2 hours ago" engine="protect" />
                  <DetailRow label="Model version" value="v3.2" />
                  <DetailRow label="Backup status" value="Healthy" engine="grow" />
                </div>
              </Surface>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <GlassPanel blur="lg" opacity={0.08} className="rounded-xl p-5">
                <SectionHeader title="Quick navigation" />
                <nav className="mt-3 flex flex-col gap-1">
                  {quickNav.map((n) => (
                    <NavigationLink key={n.href} href={n.href} engine={n.engine} label={n.label} />
                  ))}
                </nav>
              </GlassPanel>

              <Surface variant="elevated" padding="md">
                <SectionHeader title="Audit log" subtitle="Recent changes tracked." />
                <Separator className="my-3" />
                <div className="space-y-2 text-xs text-slate-400">
                  <DetailRow label="2FA enabled" value="Today, 09:14" />
                  <DetailRow label="Email updated" value="Yesterday" />
                  <DetailRow label="Policy added" value="Feb 12" />
                </div>
              </Surface>
            </div>
          </div>

          {/* Modal */}
          <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)} title="Reset to defaults?">
            <p className="text-sm text-slate-400 mb-4">This will revert all policies to their recommended defaults.</p>
            <div className="flex gap-3 justify-end">
              <Button variant="ghost" onClick={() => setConfirmOpen(false)}>Cancel</Button>
              <Button variant="danger" onClick={() => { setPolicies(policyItems); setConfirmOpen(false) }}>Reset</Button>
            </div>
          </Modal>

          {/* Toast */}
          {toast && (
            <div className="fixed bottom-6 right-6 z-50">
              <DSToast variant={toast.variant} message={toast.message} onDismiss={() => setToast(null)} />
            </div>
          )}
        </div>
      </div>
    </DesignSystemProvider>
  )
}

export default SettingsV2
