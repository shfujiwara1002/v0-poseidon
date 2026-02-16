import type { ReactNode } from 'react'
import { EffectProvider, type EffectPreset } from './EffectProvider'

interface DesignSystemProviderProps {
  effectPreset?: EffectPreset
  children: ReactNode
}

export function DesignSystemProvider({
  effectPreset = 'neon',
  children,
}: DesignSystemProviderProps) {
  return (
    <EffectProvider preset={effectPreset}>
      {children}
    </EffectProvider>
  )
}
