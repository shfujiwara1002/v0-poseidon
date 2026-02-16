import { forwardRef, useState } from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { AvatarProps } from './Avatar.schema'

/* -- Size tokens --------------------------------------------------------- */
const sizeMap: Record<string, { container: string; text: string }> = {
  sm: { container: 'h-8 w-8', text: 'text-xs' },
  md: { container: 'h-10 w-10', text: 'text-sm' },
  lg: { container: 'h-14 w-14', text: 'text-lg' },
}

/* -- Engine border colors ------------------------------------------------ */
const engineBorderColors: Record<string, string> = {
  protect: 'ring-green-500/60',
  grow:    'ring-violet-500/60',
  execute: 'ring-amber-500/60',
  govern:  'ring-blue-500/60',
}

/* -- Fallback background colors (deterministic from initials) ------------ */
const fallbackBgColors = [
  'bg-cyan-600/40',
  'bg-violet-600/40',
  'bg-amber-600/40',
  'bg-green-600/40',
  'bg-blue-600/40',
  'bg-rose-600/40',
]

function getFallbackBg(fallback: string): string {
  const code = (fallback.charCodeAt(0) ?? 0) + (fallback.charCodeAt(1) ?? 0)
  return fallbackBgColors[code % fallbackBgColors.length]
}

/* -- Avatar -------------------------------------------------------------- */
export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { size = 'md', src, fallback = '??', engine, className },
  ref,
) {
  const [imgError, setImgError] = useState(false)
  const showImage = src && !imgError
  const sizeTokens = sizeMap[size]

  return (
    <span
      ref={ref}
      className={twMerge(
        clsx(
          'relative inline-flex shrink-0 items-center justify-center rounded-full overflow-hidden',
          'select-none',
          sizeTokens.container,
          !showImage && getFallbackBg(fallback),
          engine && clsx('ring-2', engineBorderColors[engine]),
        ),
        className,
      )}
    >
      {showImage ? (
        <img
          src={src}
          alt={fallback}
          className="h-full w-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className={clsx('font-medium text-white/80 uppercase', sizeTokens.text)}>
          {fallback.slice(0, 2)}
        </span>
      )}
    </span>
  )
})

Avatar.displayName = 'Avatar'
