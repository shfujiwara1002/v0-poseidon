import { useState, useCallback } from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Surface } from '../../primitives/Surface'
import type { DataTableProps } from './DataTable.schema'

type SortState = { key: string; dir: 'asc' | 'desc' } | null

export function DataTable({ columns, rows, onRowClick, emptyMessage = 'No data available', className }: DataTableProps) {
  const [sort, setSort] = useState<SortState>(null)
  const handleSort = useCallback((key: string) => {
    setSort((prev) => prev?.key === key ? { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' })
  }, [])
  const sorted = sort ? [...rows].sort((a, b) => { const av = a[sort.key], bv = b[sort.key]; const cmp = av < bv ? -1 : av > bv ? 1 : 0; return sort.dir === 'asc' ? cmp : -cmp }) : rows

  return (
    <Surface variant="glass" padding="none" className={twMerge('overflow-hidden', className)}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.06]">
              {columns.map((col) => (
                <th key={col.key} style={col.width ? { width: col.width } : undefined}
                  className={clsx('px-4 py-3 font-medium text-white/50 text-xs uppercase tracking-wider', col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left', col.sortable && 'cursor-pointer select-none hover:text-white/70')}
                  onClick={() => col.sortable && handleSort(col.key)}>
                  {col.label}{sort?.key === col.key && <span className="ml-1">{sort.dir === 'asc' ? '\u2191' : '\u2193'}</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr><td colSpan={columns.length} className="px-4 py-8 text-center text-white/30">{emptyMessage}</td></tr>
            ) : sorted.map((row, i) => (
              <tr key={i} onClick={() => onRowClick?.(row)} className={clsx('border-b border-white/[0.04] transition-colors', onRowClick && 'cursor-pointer hover:bg-white/[0.03]')}>
                {columns.map((col) => (
                  <td key={col.key} className={clsx('px-4 py-3 text-white/80', col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left')}>{row[col.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Surface>
  )
}
DataTable.displayName = 'DataTable'
