import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { AIThinkingProps } from './AIThinking.schema'

const dotColor: Record<string, string> = {
  protect: 'bg-green-400', grow: 'bg-violet-400', execute: 'bg-amber-400', govern: 'bg-blue-400',
}

export function AIThinking({ label = 'Analyzing...', engine, size = 'md', className }: AIThinkingProps) {
  const dotSize = size === 'sm' ? 'w-1 h-1' : 'w-1.5 h-1.5'
  const color = engine ? dotColor[engine] : 'bg-cyan-400'
  return (
    <div className={twMerge(clsx('inline-flex items-center', size === 'sm' ? 'gap-1.5' : 'gap-2'), className)} role="status" aria-label={label}>
      <div className="flex items-center gap-1">
        {[0, 1, 2].map((i) => <span key={i} className={clsx(dotSize, color, 'rounded-full animate-pulse')} style={{ animationDelay: `${i * 200}ms` }} />)}
      </div>
      <span className={clsx('text-white/50', size === 'sm' ? 'text-xs' : 'text-sm')}>{label}</span>
    </div>
  )
}
AIThinking.displayName = 'AIThinking'
