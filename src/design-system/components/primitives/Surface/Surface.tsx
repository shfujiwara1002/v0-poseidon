import { forwardRef } from 'react'
import { cn } from '../../../../lib/utils'
import type { SurfaceProps } from './Surface.schema'

const ENGINE_GLOW_COLORS = {
  protect: 'oklch(0.70 0.18 155)',
  grow: 'oklch(0.58 0.22 285)',
  execute: 'oklch(0.80 0.16 95)',
  govern: 'oklch(0.62 0.18 250)',
} as const

const PADDING_MAP = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
} as const

export const Surface = forwardRef<HTMLElement, SurfaceProps>(
  (
    {
      variant = 'glass',
      engine,
      glow = false,
      interactive = false,
      padding = 'md',
      as: Tag = 'div',
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const glowColor = glow && engine ? ENGINE_GLOW_COLORS[engine] : null

    const glowShadow = glowColor
      ? `0 0 var(--ds-glow-spread) ${glowColor}`
      : undefined

    const variantClasses = cn(
      // Base shared styles
      'rounded-[var(--ds-border-radius-surface)] transition-all duration-200',

      // Glass variant
      variant === 'glass' && [
        'border border-[var(--ds-surface-border)]',
        'bg-[var(--ds-surface-bg)]',
        '[backdrop-filter:var(--ds-backdrop-filter)]',
        '[box-shadow:var(--ds-glass-inset),var(--ds-surface-shadow)]',
      ],

      // Elevated variant
      variant === 'elevated' && [
        'border border-[var(--ds-surface-border)]',
        'bg-[oklch(0.20_0.02_250)]',
        'shadow-[var(--ds-surface-shadow)]',
      ],

      // Inset variant
      variant === 'inset' && [
        'border border-[var(--ds-surface-border)]',
        'bg-[oklch(0.14_0.02_250_/_0.8)]',
        'shadow-[inset_0_2px_4px_oklch(0_0_0_/_0.2)]',
      ],

      // Transparent variant — no background or border
      variant === 'transparent' && '',

      // Padding
      PADDING_MAP[padding],

      // Interactive states
      interactive && [
        'cursor-pointer',
        'hover:brightness-110 hover:border-[oklch(1_0_0_/_0.14)]',
        'active:scale-[0.985] active:brightness-95',
      ],
    )

    return (
      <Tag
        ref={ref as React.Ref<never>}
        className={cn(variantClasses, className)}
        style={glowShadow ? { boxShadow: glowShadow } : undefined}
        {...rest}
      >
        {children}
      </Tag>
    )
  },
)

Surface.displayName = 'Surface'
