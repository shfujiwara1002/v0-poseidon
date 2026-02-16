import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export type EffectPreset = 'minimal' | 'glass' | 'neon' | 'aurora' | 'terminal'

export const EFFECT_PRESETS: readonly EffectPreset[] = ['minimal', 'glass', 'neon', 'aurora', 'terminal'] as const

export const EFFECT_PRESET_META: Record<EffectPreset, { label: string; description: string }> = {
  minimal:  { label: 'Minimal',  description: 'Clean professional — no blur, no glow' },
  glass:    { label: 'Glass',    description: 'iOS-inspired frosted glass' },
  neon:     { label: 'Neon',     description: 'Poseidon signature glow style' },
  aurora:   { label: 'Aurora',   description: 'Maximum visual impact with stagger' },
  terminal: { label: 'Terminal', description: 'Bloomberg-style dense data' },
}

interface EffectContextValue {
  preset: EffectPreset
  setPreset: (p: EffectPreset) => void
}

const EffectContext = createContext<EffectContextValue>({
  preset: 'neon',
  setPreset: () => {},
})

export function EffectProvider({
  preset: initialPreset = 'neon',
  children,
}: {
  preset?: EffectPreset
  children: ReactNode
}) {
  const [preset, setPreset] = useState<EffectPreset>(initialPreset)

  useEffect(() => {
    document.documentElement.dataset.effectPreset = preset
  }, [preset])

  return (
    <EffectContext.Provider value={{ preset, setPreset }}>
      {children}
    </EffectContext.Provider>
  )
}

export const useEffectPreset = () => useContext(EffectContext)
