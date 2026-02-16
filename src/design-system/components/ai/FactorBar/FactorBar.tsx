import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { FactorBarProps } from './FactorBar.schema'

const engineFill: Record<string, string> = {
  protect: 'bg-green-500', grow: 'bg-violet-500', execute: 'bg-amber-500', govern: 'bg-blue-500',
}

export function FactorBar({ label, value, engine, className }: FactorBarProps) {
  const isPositive = value >= 0, absValue = Math.abs(value)
  const fill = engine ? engineFill[engine] : isPositive ? 'bg-green-500' : 'bg-red-500'
  return (
    <div className={twMerge('flex items-center gap-3', className)}>
      <span className="text-xs text-white/60 w-24 truncate shrink-0 text-right">{label}</span>
      <div className="flex-1 h-2 flex items-center">
        <div className="w-full h-full bg-white/[0.06] rounded-full relative overflow-hidden">
          <div className="absolute inset-y-0 left-1/2 w-px bg-white/10" />
          <div className={clsx('absolute inset-y-0 rounded-full transition-all duration-300', fill, isPositive ? 'left-1/2' : 'right-1/2')} style={{ width: `${absValue / 2}%` }} />
        </div>
      </div>
      <span className={clsx('text-xs font-medium tabular-nums w-10 shrink-0', isPositive ? 'text-green-400' : 'text-red-400')}>{isPositive ? '+' : ''}{value}</span>
    </div>
  )
}
FactorBar.displayName = 'FactorBar'
