import { forwardRef, type ReactNode } from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ButtonProps } from './Button.schema'

/* ── Engine gradient map (oklch-based for P3 gamut) ────────────── */
const engineGradient: Record<string, string> = {
  protect:  'bg-gradient-to-r from-[oklch(0.70_0.18_155)] to-[oklch(0.78_0.16_160)]',
  grow:     'bg-gradient-to-r from-[oklch(0.58_0.22_285)] to-[oklch(0.66_0.18_290)]',
  execute:  'bg-gradient-to-r from-[oklch(0.80_0.16_95)]  to-[oklch(0.86_0.14_100)]',
  govern:   'bg-gradient-to-r from-[oklch(0.62_0.18_250)] to-[oklch(0.70_0.16_255)]',
  default:  'bg-gradient-to-r from-[oklch(0.85_0.18_195)] to-[oklch(0.88_0.14_195)]',
}

const engineAccent: Record<string, string> = {
  protect:  'border-green-500/60 text-green-400',
  grow:     'border-violet-500/60 text-violet-400',
  execute:  'border-amber-500/60 text-amber-400',
  govern:   'border-blue-500/60 text-blue-400',
  default:  'border-cyan-400/60 text-cyan-300',
}

/* ── Size tokens ───────────────────────────────────────────────── */
const sizeMap: Record<string, string> = {
  sm: 'h-8 min-h-[44px] px-3 text-sm gap-1.5',
  md: 'h-10 min-h-[44px] px-4 text-sm gap-2',
  lg: 'h-12 min-h-[44px] px-6 text-base gap-2.5',
}

/* ── Spinner ───────────────────────────────────────────────────── */
function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  )
}

/* ── Button ────────────────────────────────────────────────────── */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    engine,
    loading = false,
    fullWidth = false,
    icon,
    iconPosition = 'left',
    className,
    children,
    disabled,
    type = 'button',
    ...rest
  },
  ref,
) {
  const key = engine ?? 'default'
  const isDisabled = disabled || loading

  const variantClass: Record<string, string> = {
    primary:   clsx(engineGradient[key], 'text-gray-950 font-semibold hover:brightness-110'),
    secondary: clsx('bg-transparent border', engineAccent[key], 'hover:bg-white/5'),
    ghost:     clsx('bg-transparent border-none', engineAccent[key], 'hover:bg-white/5'),
    danger:    'bg-red-600 text-white hover:bg-red-500',
    outline:   'bg-transparent border border-white/20 text-white hover:bg-white/5',
  }

  const classes = twMerge(
    clsx(
      /* base */
      'inline-flex items-center justify-center rounded-lg font-medium',
      'transition-all duration-150 select-none',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950',
      /* variant + size */
      variantClass[variant],
      sizeMap[size],
      /* state */
      fullWidth && 'w-full',
      isDisabled && 'pointer-events-none opacity-50',
    ),
    className,
  )

  const iconEl = loading ? <Spinner /> : (icon as ReactNode)
  const hasIcon = !!iconEl

  return (
    <button ref={ref} type={type} disabled={isDisabled} className={classes} {...rest}>
      {hasIcon && iconPosition === 'left' && iconEl}
      {children}
      {hasIcon && iconPosition === 'right' && iconEl}
    </button>
  )
})
