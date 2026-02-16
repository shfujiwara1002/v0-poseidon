import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { SkeletonProps } from './Skeleton.schema'

/* -- Variant shape classes ------------------------------------------------ */
const variantClasses: Record<string, string> = {
  line:   'h-4 w-full rounded',
  circle: 'rounded-full',
  rect:   'rounded-lg',
}

/* -- Skeleton ------------------------------------------------------------- */
export function Skeleton({
  variant = 'line',
  width,
  height,
  className,
}: SkeletonProps) {
  const style: React.CSSProperties = {}
  if (width) style.width = width
  if (height) style.height = height

  return (
    <div
      role="status"
      aria-label="Loading"
      className={twMerge(
        clsx('animate-pulse bg-white/5', variantClasses[variant]),
        className,
      )}
      style={Object.keys(style).length > 0 ? style : undefined}
    />
  )
}

Skeleton.displayName = 'Skeleton'
