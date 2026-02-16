import type { ReactNode } from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { IconContainerProps } from './IconContainer.schema'

const sizeClasses: Record<string, string> = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
}
const engineBg: Record<string, string> = {
  protect: 'bg-green-500/15 text-green-400',
  grow: 'bg-violet-500/15 text-violet-400',
  execute: 'bg-amber-500/15 text-amber-400',
  govern: 'bg-blue-500/15 text-blue-400',
}
const engineGlow: Record<string, string> = {
  protect: 'shadow-[0_0_var(--ds-glow-spread)_rgba(34,197,94,var(--ds-glow-opacity))]',
  grow: 'shadow-[0_0_var(--ds-glow-spread)_rgba(139,92,246,var(--ds-glow-opacity))]',
  execute: 'shadow-[0_0_var(--ds-glow-spread)_rgba(245,158,11,var(--ds-glow-opacity))]',
  govern: 'shadow-[0_0_var(--ds-glow-spread)_rgba(59,130,246,var(--ds-glow-opacity))]',
}

export function IconContainer({ size = 'md', engine, glow = false, className, children }: IconContainerProps) {
  return (
    <div className={twMerge(clsx('inline-flex items-center justify-center rounded-lg shrink-0', sizeClasses[size], engine ? engineBg[engine] : 'bg-white/10 text-white/60', glow && engine && engineGlow[engine]), className)}>
      {children as ReactNode}
    </div>
  )
}
IconContainer.displayName = 'IconContainer'
