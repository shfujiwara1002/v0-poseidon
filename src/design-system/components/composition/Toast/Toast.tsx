import type { ReactNode } from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { DSToastProps } from './Toast.schema'

const variantStyles: Record<string, { border: string; icon: string }> = {
  info: { border: 'border-cyan-500/30', icon: '\u2139' },
  success: { border: 'border-green-500/30', icon: '\u2713' },
  warning: { border: 'border-amber-500/30', icon: '\u26A0' },
  error: { border: 'border-red-500/30', icon: '\u2715' },
}
const variantIconColor: Record<string, string> = {
  info: 'text-cyan-400', success: 'text-green-400', warning: 'text-amber-400', error: 'text-red-400',
}

export function DSToast({ variant = 'info', message, action, onDismiss, className }: DSToastProps) {
  const style = variantStyles[variant]
  return (
    <div role="alert" className={twMerge(clsx('flex items-center gap-3 px-4 py-3 rounded-lg', 'border bg-[var(--ds-surface-bg)] [backdrop-filter:var(--ds-backdrop-filter)]', 'shadow-[var(--ds-surface-shadow)]', style.border), className)}>
      <span className={clsx('shrink-0 text-sm', variantIconColor[variant])}>{style.icon}</span>
      <span className="text-sm text-white/80 flex-1">{message}</span>
      {action && <div className="shrink-0">{action as ReactNode}</div>}
      {onDismiss && (
        <button onClick={onDismiss} className="shrink-0 text-white/30 hover:text-white/60 transition-colors" aria-label="Dismiss">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        </button>
      )}
    </div>
  )
}
DSToast.displayName = 'DSToast'
