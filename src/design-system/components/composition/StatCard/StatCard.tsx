import type { ReactNode } from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Surface } from '../../primitives/Surface'
import { IconContainer } from '../IconContainer'
import type { StatCardProps } from './StatCard.schema'

export function StatCard({ title, value, change, icon, engine, sparkline, className }: StatCardProps) {
  const changeColor = change && change > 0 ? 'text-green-400' : change && change < 0 ? 'text-red-400' : 'text-white/50'
  const changePrefix = change && change > 0 ? '+' : ''

  return (
    <Surface variant="glass" engine={engine} padding="md" className={twMerge('flex flex-col gap-3', className)}>
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="text-xs font-medium text-white/50 uppercase tracking-wider truncate">{title}</p>
          <p className="mt-1 text-2xl font-bold text-white tabular-nums">{value}</p>
        </div>
        {icon && <IconContainer engine={engine} size="md">{icon as ReactNode}</IconContainer>}
      </div>
      <div className="flex items-center justify-between gap-3">
        {change !== undefined && <span className={clsx('text-xs font-medium tabular-nums', changeColor)}>{changePrefix}{change}%</span>}
        {sparkline && <div className="flex-1 min-w-0">{sparkline as ReactNode}</div>}
      </div>
    </Surface>
  )
}
StatCard.displayName = 'StatCard'
