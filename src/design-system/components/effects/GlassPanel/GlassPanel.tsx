import type { ReactNode } from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { GlassPanelProps } from './GlassPanel.schema'

const blurMap: Record<string, string> = { sm: 'backdrop-blur-sm', md: 'backdrop-blur-md', lg: 'backdrop-blur-xl' }
const engineBorder: Record<string, string> = { protect: 'border-green-500/10', grow: 'border-violet-500/10', execute: 'border-amber-500/10', govern: 'border-blue-500/10' }

export function GlassPanel({ blur = 'md', opacity = 0.06, engine, className, children }: GlassPanelProps) {
  return (
    <div className={twMerge(clsx('rounded-xl border p-4', blurMap[blur], engine ? engineBorder[engine] : 'border-white/[0.08]'), className)} style={{ backgroundColor: `rgba(255,255,255,${opacity})` }}>
      {children as ReactNode}
    </div>
  )
}
GlassPanel.displayName = 'GlassPanel'
