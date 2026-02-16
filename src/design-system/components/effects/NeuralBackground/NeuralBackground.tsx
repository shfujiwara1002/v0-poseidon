import { useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import type { NeuralBackgroundProps } from './NeuralBackground.schema'

const engineColor: Record<string, string> = { protect: 'rgba(34,197,94,', grow: 'rgba(139,92,246,', execute: 'rgba(245,158,11,', govern: 'rgba(59,130,246,' }
const densityCount: Record<string, number> = { sparse: 8, medium: 16, dense: 24 }
function seededRandom(seed: number) { const x = Math.sin(seed) * 10000; return x - Math.floor(x) }

export function NeuralBackground({ density = 'medium', engine, className }: NeuralBackgroundProps) {
  const base = engine ? engineColor[engine] : 'rgba(6,182,212,', count = densityCount[density]
  const nodes = useMemo(() => Array.from({ length: count }, (_, i) => ({ cx: seededRandom(i * 7 + 1) * 100, cy: seededRandom(i * 13 + 3) * 100, r: seededRandom(i * 19 + 5) * 1.5 + 0.5, opacity: seededRandom(i * 23 + 7) * 0.3 + 0.1 })), [count])
  const lines = useMemo(() => {
    const result: { x1: number; y1: number; x2: number; y2: number; opacity: number }[] = []
    for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].cx - nodes[j].cx, dy = nodes[i].cy - nodes[j].cy, d = Math.sqrt(dx * dx + dy * dy)
      if (d < 30) result.push({ x1: nodes[i].cx, y1: nodes[i].cy, x2: nodes[j].cx, y2: nodes[j].cy, opacity: (1 - d / 30) * 0.15 })
    }
    return result
  }, [nodes])

  return (
    <svg className={twMerge('absolute inset-0 w-full h-full pointer-events-none', className)} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
      {lines.map((l, i) => <line key={`l${i}`} x1={`${l.x1}%`} y1={`${l.y1}%`} x2={`${l.x2}%`} y2={`${l.y2}%`} stroke={`${base}${l.opacity.toFixed(2)})`} strokeWidth={0.3} />)}
      {nodes.map((n, i) => <circle key={`n${i}`} cx={`${n.cx}%`} cy={`${n.cy}%`} r={n.r} fill={`${base}${n.opacity.toFixed(2)})`} />)}
    </svg>
  )
}
NeuralBackground.displayName = 'NeuralBackground'
