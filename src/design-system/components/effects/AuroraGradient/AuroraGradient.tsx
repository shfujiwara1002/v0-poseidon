import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { AuroraGradientProps } from './AuroraGradient.schema'

const engineColors: Record<string, string> = {
  protect: 'from-green-900/40 via-emerald-800/20 to-transparent', grow: 'from-violet-900/40 via-purple-800/20 to-transparent',
  execute: 'from-amber-900/40 via-orange-800/20 to-transparent', govern: 'from-blue-900/40 via-indigo-800/20 to-transparent',
}
const intensityOpacity: Record<string, string> = { subtle: 'opacity-30', medium: 'opacity-50', vivid: 'opacity-70' }

export function AuroraGradient({ engine, intensity = 'subtle', className }: AuroraGradientProps) {
  const gradient = engine ? engineColors[engine] : 'from-cyan-900/40 via-teal-800/20 to-transparent'
  return <div className={twMerge(clsx('absolute inset-0 pointer-events-none bg-gradient-to-br', gradient, intensityOpacity[intensity]), className)} aria-hidden />
}
AuroraGradient.displayName = 'AuroraGradient'
