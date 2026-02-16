import type { ReactNode } from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { DetailRowProps } from './DetailRow.schema'

const engineValue: Record<string, string> = {
  protect: 'text-green-400', grow: 'text-violet-400', execute: 'text-amber-400', govern: 'text-blue-400',
}

export function DetailRow({ label, value, icon, engine, className }: DetailRowProps) {
  return (
    <div className={twMerge('flex items-center justify-between gap-4 py-2', className)}>
      <div className="flex items-center gap-2 min-w-0">
        {icon && <span className="shrink-0 text-white/40">{icon as ReactNode}</span>}
        <span className="text-sm text-white/60 truncate">{label}</span>
      </div>
      <span className={clsx('text-sm font-medium tabular-nums shrink-0', engine ? engineValue[engine] : 'text-white')}>{value}</span>
    </div>
  )
}
DetailRow.displayName = 'DetailRow'
