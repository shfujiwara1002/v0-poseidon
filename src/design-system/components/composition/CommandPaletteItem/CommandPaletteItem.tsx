import type { ReactNode } from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { CommandPaletteItemProps } from './CommandPaletteItem.schema'

const engineActive: Record<string, string> = {
  protect: 'bg-green-500/10 border-green-500/20', grow: 'bg-violet-500/10 border-violet-500/20',
  execute: 'bg-amber-500/10 border-amber-500/20', govern: 'bg-blue-500/10 border-blue-500/20',
}

export function CommandPaletteItem({ label, description, icon, shortcut, engine, onSelect, active = false, className }: CommandPaletteItemProps) {
  return (
    <button type="button" onClick={onSelect} className={twMerge(clsx('flex w-full items-center gap-3 rounded-lg px-3 py-2.5', 'border border-transparent transition-colors text-left', active ? engine ? engineActive[engine] : 'bg-white/[0.06] border-white/[0.08]' : 'hover:bg-white/[0.04]'), className)}>
      {icon && <span className="shrink-0 text-white/40">{icon as ReactNode}</span>}
      <div className="flex flex-col gap-0.5 min-w-0 flex-1">
        <span className="text-sm text-white truncate">{label}</span>
        {description && <span className="text-xs text-white/40 truncate">{description}</span>}
      </div>
      {shortcut && <kbd className="shrink-0 text-[10px] font-mono text-white/30 bg-white/[0.06] rounded px-1.5 py-0.5">{shortcut}</kbd>}
    </button>
  )
}
CommandPaletteItem.displayName = 'CommandPaletteItem'
