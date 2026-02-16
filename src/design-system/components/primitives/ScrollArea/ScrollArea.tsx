import { forwardRef, type ReactNode } from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ScrollAreaProps } from './ScrollArea.schema'

/**
 * Custom scrollbar styles are applied via the `ds-scroll` utility class.
 * The styles use thin scrollbar widths with a dark track and lighter thumb
 * for consistency with the Poseidon dark UI.
 */
export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(function ScrollArea(
  { maxHeight, className, children },
  ref,
) {
  return (
    <div
      ref={ref}
      className={twMerge(
        clsx(
          'overflow-auto',
          /* Thin scrollbar for Webkit */
          '[&::-webkit-scrollbar]:w-1.5',
          '[&::-webkit-scrollbar-track]:bg-white/[0.03] [&::-webkit-scrollbar-track]:rounded-full',
          '[&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full',
          '[&::-webkit-scrollbar-thumb]:hover:bg-white/20',
          /* Firefox */
          'scrollbar-thin scrollbar-color-[oklch(1_0_0_/_0.1)_oklch(1_0_0_/_0.03)]',
        ),
        className,
      )}
      style={maxHeight ? { maxHeight } : undefined}
    >
      {children as ReactNode}
    </div>
  )
})

ScrollArea.displayName = 'ScrollArea'
