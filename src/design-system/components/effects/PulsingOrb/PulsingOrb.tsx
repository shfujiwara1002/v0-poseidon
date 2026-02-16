import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { PulsingOrbProps } from './PulsingOrb.schema'

const engineGradient: Record<string, string> = {
  protect: 'from-green-500/30 to-green-900/0', grow: 'from-violet-500/30 to-violet-900/0',
  execute: 'from-amber-500/30 to-amber-900/0', govern: 'from-blue-500/30 to-blue-900/0',
}

export function PulsingOrb({ size = 200, engine, className }: PulsingOrbProps) {
  const gradient = engine ? engineGradient[engine] : 'from-cyan-500/30 to-cyan-900/0'
  return <div className={twMerge(clsx('rounded-full bg-gradient-radial blur-3xl animate-pulse pointer-events-none', gradient), className)} style={{ width: size, height: size }} aria-hidden />
}
PulsingOrb.displayName = 'PulsingOrb'
