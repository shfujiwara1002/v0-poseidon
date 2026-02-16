import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { RingProgressProps } from './RingProgress.schema'

const engineStroke: Record<string, string> = { protect: 'stroke-green-500', grow: 'stroke-violet-500', execute: 'stroke-amber-500', govern: 'stroke-blue-500' }

export function RingProgress({ value, label, sublabel, size = 120, strokeWidth = 8, engine, className }: RingProgressProps) {
  const r = (size - strokeWidth) / 2, circumference = 2 * Math.PI * r, offset = circumference - (value / 100) * circumference
  const stroke = engine ? engineStroke[engine] : 'stroke-cyan-500'
  return (
    <div className={twMerge('relative inline-flex flex-col items-center', className)}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={strokeWidth} className="stroke-white/[0.06]" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} className={clsx(stroke, 'transition-[stroke-dashoffset] duration-700')} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-bold text-white tabular-nums">{Math.round(value)}%</span>
        {label && <span className="text-[10px] text-white/50 mt-0.5">{label}</span>}
      </div>
      {sublabel && <span className="mt-2 text-xs text-white/40">{sublabel}</span>}
    </div>
  )
}
RingProgress.displayName = 'RingProgress'
