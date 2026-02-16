import { twMerge } from 'tailwind-merge'
import type { GridOverlayProps } from './GridOverlay.schema'

const engineColor: Record<string, string> = { protect: '34,197,94', grow: '139,92,246', execute: '245,158,11', govern: '59,130,246' }

export function GridOverlay({ cellSize = 40, opacity = 0.04, engine, className }: GridOverlayProps) {
  const rgb = engine ? engineColor[engine] : '255,255,255', color = `rgba(${rgb},${opacity})`
  return <div className={twMerge('absolute inset-0 pointer-events-none', className)} style={{ backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`, backgroundSize: `${cellSize}px ${cellSize}px` }} aria-hidden />
}
GridOverlay.displayName = 'GridOverlay'
