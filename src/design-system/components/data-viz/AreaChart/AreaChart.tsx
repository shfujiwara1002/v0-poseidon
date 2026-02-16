import { ResponsiveContainer, AreaChart as RechartsArea, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { twMerge } from 'tailwind-merge'
import type { DSAreaChartProps } from './AreaChart.schema'

const engineColor: Record<string, string> = { protect: '#22c55e', grow: '#8b5cf6', execute: '#f59e0b', govern: '#3b82f6' }

export function DSAreaChart({ data, dataKey, xKey = 'name', engine, height = 200, showGrid = true, className }: DSAreaChartProps) {
  const color = engine ? engineColor[engine] : '#06b6d4'
  return (
    <div className={twMerge('w-full', className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsArea data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />}
          <XAxis dataKey={xKey} tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.4)' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.4)' }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12, color: '#fff' }} />
          <defs><linearGradient id={`area-${dataKey}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity={0.3} /><stop offset="100%" stopColor={color} stopOpacity={0} /></linearGradient></defs>
          <Area type="monotone" dataKey={dataKey} stroke={color} fill={`url(#area-${dataKey})`} strokeWidth={2} />
        </RechartsArea>
      </ResponsiveContainer>
    </div>
  )
}
DSAreaChart.displayName = 'DSAreaChart'
