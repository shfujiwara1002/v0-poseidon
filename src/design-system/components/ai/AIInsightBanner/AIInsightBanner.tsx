import type { ReactNode } from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Surface } from '../../primitives/Surface'
import type { AIInsightBannerProps } from './AIInsightBanner.schema'

const engineIcon: Record<string, string> = {
  protect: 'text-green-400', grow: 'text-violet-400', execute: 'text-amber-400', govern: 'text-blue-400',
}

export function AIInsightBanner({ title, description, confidence, engine, action, className }: AIInsightBannerProps) {
  return (
    <Surface variant="glass" engine={engine} glow padding="md" className={twMerge('flex gap-4', className)}>
      <div className={clsx('shrink-0 text-lg', engine ? engineIcon[engine] : 'text-cyan-400')}>{'\u2728'}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white">{title}</p>
            <p className="mt-1 text-xs text-white/60 leading-relaxed">{description}</p>
          </div>
          {confidence !== undefined && <span className="shrink-0 text-xs font-medium text-white/50 tabular-nums">{confidence}% conf.</span>}
        </div>
        {action && <div className="mt-3">{action as ReactNode}</div>}
      </div>
    </Surface>
  )
}
AIInsightBanner.displayName = 'AIInsightBanner'
