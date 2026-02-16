import { useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import type { SparkLineProps } from './SparkLine.schema'

const engineColor: Record<string, string> = { protect: '#22c55e', grow: '#8b5cf6', execute: '#f59e0b', govern: '#3b82f6' }

export function SparkLine({ data, width = 80, height = 24, engine, showArea = false, className }: SparkLineProps) {
  const path = useMemo(() => {
    if (data.length < 2) return ''
    const min = Math.min(...data), max = Math.max(...data), range = max - min || 1
    const stepX = width / (data.length - 1), pad = 2, h = height - pad * 2
    return data.map((v, i) => { const x = i * stepX, y = pad + h - ((v - min) / range) * h; return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}` }).join(' ')
  }, [data, width, height])
  const color = engine ? engineColor[engine] : '#06b6d4'
  if (data.length < 2) return null
  return (
    <svg width={width} height={height} className={twMerge('inline-block', className)} aria-hidden>
      {showArea && <path d={`${path} L${width},${height} L0,${height} Z`} fill={color} fillOpacity={0.1} />}
      <path d={path} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
SparkLine.displayName = 'SparkLine'
