import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ToggleProps } from './Toggle.schema'

/* -- Engine active-track colors ---------------------------------------- */
const engineTrackColors: Record<string, string> = {
  protect: 'bg-green-500',
  grow:    'bg-violet-500',
  execute: 'bg-amber-500',
  govern:  'bg-blue-500',
}

export function Toggle({
  checked = false,
  onChange,
  label,
  disabled = false,
  engine,
  className,
}: ToggleProps) {
  const trackColor = checked
    ? (engine ? engineTrackColors[engine] : 'bg-cyan-500')
    : 'bg-white/10'

  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(!checked)
    }
  }

  const toggle = (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label && !label ? undefined : label}
      disabled={disabled}
      onClick={handleClick}
      className={twMerge(
        clsx(
          'relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full',
          'transition-colors duration-200 ease-in-out',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950',
          trackColor,
          disabled && 'cursor-not-allowed opacity-50',
        ),
        !label ? className : undefined,
      )}
    >
      <span
        className={clsx(
          'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm',
          'transition-transform duration-200 ease-in-out',
          checked ? 'translate-x-[22px]' : 'translate-x-0.5',
        )}
      />
    </button>
  )

  if (!label) return toggle

  return (
    <label
      className={twMerge(
        clsx(
          'inline-flex items-center gap-2.5 select-none',
          disabled && 'cursor-not-allowed opacity-50',
        ),
        className,
      )}
    >
      {toggle}
      <span className="text-sm text-white/70">{label}</span>
    </label>
  )
}

Toggle.displayName = 'Toggle'
