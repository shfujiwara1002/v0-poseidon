import { useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import type { HeatMapProps } from './HeatMap.schema'

const engineBaseColor: Record<string, [number, number, number]> = { protect: [34, 197, 94], grow: [139, 92, 246], execute: [245, 158, 11], govern: [59, 130, 246] }
const defaultColor: [number, number, number] = [6, 182, 212]

export function HeatMap({ cells, rows, cols, cellSize = 24, gap = 2, engine, className }: HeatMapProps) {
  const lookup = useMemo(() => {
    const map: Record<string, number> = {}; let max = 1
    for (const c of cells) { map[`${c.x}-${c.y}`] = c.value; if (c.value > max) max = c.value }
    return { map, max }
  }, [cells])
  const base = engine ? engineBaseColor[engine] : defaultColor
  const w = cols * (cellSize + gap) - gap, h = rows * (cellSize + gap) - gap
  return (
    <svg width={w} height={h} className={twMerge('inline-block', className)} aria-hidden>
      {Array.from({ length: rows }, (_, y) => Array.from({ length: cols }, (_, x) => {
        const val = lookup.map[`${x}-${y}`] ?? 0, opacity = val / lookup.max
        return <rect key={`${x}-${y}`} x={x * (cellSize + gap)} y={y * (cellSize + gap)} width={cellSize} height={cellSize} rx={3} fill={`rgba(${base[0]},${base[1]},${base[2]},${(opacity * 0.8 + 0.05).toFixed(2)})`} />
      }))}
    </svg>
  )
}
HeatMap.displayName = 'HeatMap'
