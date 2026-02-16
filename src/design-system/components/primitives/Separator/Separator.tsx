import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { SeparatorProps } from './Separator.schema'

export function Separator({
  orientation = 'horizontal',
  className,
}: SeparatorProps) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={twMerge(
        clsx(
          'shrink-0 bg-white/[0.08]',
          orientation === 'horizontal' ? 'h-px w-full' : 'w-px h-full',
        ),
        className,
      )}
    />
  )
}

Separator.displayName = 'Separator'
