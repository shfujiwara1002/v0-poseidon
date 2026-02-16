import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ConfidenceRingProps } from './ConfidenceRing.schema'

const engineStroke: Record<string, string> = {
  protect: 'stroke-green-500', grow: 'stroke-violet-500', execute: 'stroke-amber-500', govern: 'stroke-blue-500',
}
const sizes: Record<string, number> = { sm: 40, md: 56, lg: 80 }
const strokes: Record<string, number> = { sm: 3, md: 4, lg: 5 }

function confidenceColor(v: number): string {
  if (v >= 80) return 'stroke-green-500'
  if (v >= 60) return 'stroke-amber-500'
  return 'stroke-red-500'
}

export function ConfidenceRing({ value, label, size = 'md', engine, className }: ConfidenceRingProps) {
  const dim = sizes[size], sw = strokes[size], r = (dim - sw) / 2
  const circumference = 2 * Math.PI * r, offset = circumference - (value / 100) * circumference
  const stroke = engine ? engineStroke[engine] : confidenceColor(value)
  return (
    <div className={twMerge('relative inline-flex flex-col items-center gap-1', className)} role="meter" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-label={label || `${value}% confidence`}>
      <svg width={dim} height={dim} className="-rotate-90">
        <circle cx={dim / 2} cy={dim / 2} r={r} fill="none" strokeWidth={sw} className="stroke-white/10" />
        <circle cx={dim / 2} cy={dim / 2} r={r} fill="none" strokeWidth={sw} strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} className={clsx(stroke, 'transition-[stroke-dashoffset] duration-500')} />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white tabular-nums">{Math.round(value)}%</span>
      {label && <span className="text-[10px] text-white/40">{label}</span>}
    </div>
  )
}
ConfidenceRing.displayName = 'ConfidenceRing'
