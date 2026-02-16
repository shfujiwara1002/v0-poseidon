import type { ReactNode } from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { BadgeProps } from './Badge.schema'

/* -- Engine color map (oklch-based for P3 gamut) ----------------------- */
const engineColors: Record<string, { bg: string; text: string; glow: string }> = {
  protect: { bg: 'bg-green-500/10', text: 'text-green-400', glow: 'oklch(0.70 0.18 155)' },
  grow:    { bg: 'bg-violet-500/10', text: 'text-violet-400', glow: 'oklch(0.58 0.22 285)' },
  execute: { bg: 'bg-amber-500/10', text: 'text-amber-400', glow: 'oklch(0.80 0.16 95)' },
  govern:  { bg: 'bg-blue-500/10', text: 'text-blue-400', glow: 'oklch(0.62 0.18 250)' },
}

/* -- Variant classes --------------------------------------------------- */
const variantClasses: Record<string, string> = {
  default: 'bg-white/10 text-white/80 border border-white/10',
  success: 'bg-green-500/10 text-green-400',
  warning: 'bg-amber-500/10 text-amber-400',
  danger:  'bg-red-500/10 text-red-400',
  info:    'bg-blue-500/10 text-blue-400',
}

/* -- Size tokens ------------------------------------------------------- */
const sizeClasses: Record<string, string> = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-xs px-2.5 py-0.5',
}

/* -- Badge ------------------------------------------------------------- */
export function Badge({
  variant = 'default',
  engine,
  size = 'md',
  glow = false,
  className,
  children,
}: BadgeProps) {
  const isEngine = variant === 'engine' && engine
  const engineCfg = isEngine ? engineColors[engine] : null

  const glowShadow =
    glow && engineCfg
      ? `0 0 var(--ds-glow-spread, 12px) ${engineCfg.glow}`
      : glow && variant !== 'engine'
        ? '0 0 var(--ds-glow-spread, 12px) oklch(0.85 0.18 195 / var(--ds-glow-opacity, 0.4))'
        : undefined

  const classes = twMerge(
    clsx(
      'inline-flex items-center rounded-full font-medium select-none',
      sizeClasses[size],
      isEngine ? clsx(engineCfg!.bg, engineCfg!.text) : variantClasses[variant],
    ),
    className,
  )

  return (
    <span
      className={classes}
      style={glowShadow ? { boxShadow: glowShadow } : undefined}
    >
      {children as ReactNode}
    </span>
  )
}

Badge.displayName = 'Badge'
