import type { ReactNode } from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { SectionHeaderProps } from './SectionHeader.schema'

const engineAccent: Record<string, string> = {
  protect: 'text-green-400', grow: 'text-violet-400', execute: 'text-amber-400', govern: 'text-blue-400',
}

export function SectionHeader({ title, subtitle, action, engine, className }: SectionHeaderProps) {
  return (
    <div className={twMerge('flex items-start justify-between gap-4', className)}>
      <div className="min-w-0">
        <h2 className={clsx('text-lg font-semibold', engine ? engineAccent[engine] : 'text-white')}>{title}</h2>
        {subtitle && <p className="mt-0.5 text-sm text-white/50">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action as ReactNode}</div>}
    </div>
  )
}
SectionHeader.displayName = 'SectionHeader'
