import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ProgressProps } from './Progress.schema'

/* -- Engine fill colors ------------------------------------------------ */
const engineFillColors: Record<string, string> = {
  protect: 'bg-green-500',
  grow:    'bg-violet-500',
  execute: 'bg-amber-500',
  govern:  'bg-blue-500',
}

const engineStrokeColors: Record<string, string> = {
  protect: 'stroke-green-500',
  grow:    'stroke-violet-500',
  execute: 'stroke-amber-500',
  govern:  'stroke-blue-500',
}

/* -- Size tokens ------------------------------------------------------- */
const trackHeights: Record<string, string> = {
  sm: 'h-1.5',
  md: 'h-2',
  lg: 'h-3',
}

const circularSizes: Record<string, number> = { sm: 32, md: 48, lg: 64 }
const strokeWidths: Record<string, number> = { sm: 3, md: 4, lg: 5 }

/* -- Linear bar -------------------------------------------------------- */
function LinearProgress({
  value,
  size = 'md',
  engine,
  showLabel,
  className,
}: ProgressProps) {
  const fillColor = engine ? engineFillColors[engine] : 'bg-cyan-500'

  return (
    <div className={twMerge('flex flex-col gap-1', className)}>
      {showLabel && (
        <span className="text-xs font-medium text-white/60 tabular-nums self-end">
          {Math.round(value)}%
        </span>
      )}
      <div
        className={clsx('w-full rounded-full bg-white/10', trackHeights[size])}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={clsx('h-full rounded-full transition-all duration-300', fillColor)}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

/* -- Circular ring ----------------------------------------------------- */
function CircularProgress({
  value,
  size = 'md',
  engine,
  showLabel,
  className,
}: ProgressProps) {
  const dim = circularSizes[size]
  const sw = strokeWidths[size]
  const r = (dim - sw) / 2
  const circumference = 2 * Math.PI * r
  const offset = circumference - (value / 100) * circumference
  const strokeColor = engine ? engineStrokeColors[engine] : 'stroke-cyan-500'

  return (
    <div
      className={twMerge('relative inline-flex items-center justify-center', className)}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <svg width={dim} height={dim} className="-rotate-90">
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={r}
          fill="none"
          strokeWidth={sw}
          className="stroke-white/10"
        />
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={r}
          fill="none"
          strokeWidth={sw}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={clsx(strokeColor, 'transition-[stroke-dashoffset] duration-300')}
        />
      </svg>
      {showLabel && (
        <span className="absolute text-xs font-medium text-white/70 tabular-nums">
          {Math.round(value)}%
        </span>
      )}
    </div>
  )
}

/* -- Progress ---------------------------------------------------------- */
export function Progress({
  value,
  variant = 'linear',
  size = 'md',
  engine,
  showLabel = false,
  className,
}: ProgressProps) {
  const Comp = variant === 'circular' ? CircularProgress : LinearProgress
  return <Comp value={value} variant={variant} size={size} engine={engine} showLabel={showLabel} className={className} />
}

Progress.displayName = 'Progress'
