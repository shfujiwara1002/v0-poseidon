import type { ReactNode } from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { GlowBorderProps } from './GlowBorder.schema'

const engineGradient: Record<string, string> = {
  protect: 'from-green-500/40 via-green-300/20 to-green-500/40', grow: 'from-violet-500/40 via-violet-300/20 to-violet-500/40',
  execute: 'from-amber-500/40 via-amber-300/20 to-amber-500/40', govern: 'from-blue-500/40 via-blue-300/20 to-blue-500/40',
}
const intensitySpread: Record<string, string> = { subtle: 'blur-sm', medium: 'blur-md', strong: 'blur-lg' }

export function GlowBorder({ engine, intensity = 'medium', animate = true, className, children }: GlowBorderProps) {
  const gradient = engine ? engineGradient[engine] : 'from-cyan-500/40 via-cyan-300/20 to-cyan-500/40'
  return (
    <div className={twMerge('relative rounded-xl', className)}>
      <div className={clsx('absolute -inset-px rounded-xl bg-gradient-to-r opacity-60', gradient, intensitySpread[intensity], animate && 'animate-pulse')} aria-hidden />
      <div className="relative rounded-xl bg-[var(--ds-surface-bg,rgba(0,0,0,0.6))] border border-white/[0.08]">{children as ReactNode}</div>
    </div>
  )
}
GlowBorder.displayName = 'GlowBorder'
