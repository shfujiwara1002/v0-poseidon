import { ResponsiveContainer, BarChart as RechartsBar, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { twMerge } from 'tailwind-merge'
import type { DSBarChartProps } from './BarChart.schema'

const engineColor: Record<string, string> = { protect: '#22c55e', grow: '#8b5cf6', execute: '#f59e0b', govern: '#3b82f6' }

export function DSBarChart({ data, dataKey, xKey = 'name', engine, height = 200, horizontal = false, className }: DSBarChartProps) {
  const color = engine ? engineColor[engine] : '#06b6d4'
  return (
    <div className={twMerge('w-full', className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBar data={data} layout={horizontal ? 'vertical' : 'horizontal'} margin={{ top: 4, right: 4, bottom: 0, left: horizontal ? 40 : -20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
          {horizontal ? (<><XAxis type="number" tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.4)' }} axisLine={false} tickLine={false} /><YAxis type="category" dataKey={xKey} tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.4)' }} axisLine={false} tickLine={false} /></>) : (<><XAxis dataKey={xKey} tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.4)' }} axisLine={false} tickLine={false} /><YAxis tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.4)' }} axisLine={false} tickLine={false} /></>)}
          <Tooltip contentStyle={{ background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12, color: '#fff' }} />
          <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} />
        </RechartsBar>
      </ResponsiveContainer>
    </div>
  )
}
DSBarChart.displayName = 'DSBarChart'
