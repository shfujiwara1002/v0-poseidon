import { forwardRef, useId, type ReactNode } from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { InputProps } from './Input.schema'

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    error,
    hint,
    leftIcon,
    rightIcon,
    fullWidth = true,
    className,
    id: idProp,
    ...rest
  },
  ref,
) {
  const autoId = useId()
  const id = idProp ?? autoId
  const hasError = !!error

  return (
    <div className={clsx('flex flex-col gap-1.5', fullWidth && 'w-full')}>
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-white/70"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
            {leftIcon as ReactNode}
          </span>
        )}

        <input
          ref={ref}
          id={id}
          className={twMerge(
            clsx(
              'h-10 w-full rounded-lg bg-white/5 px-3 text-sm text-white placeholder:text-white/30',
              'border transition-colors duration-150',
              'focus:outline-none focus:ring-0',
              hasError
                ? 'border-red-500/60 focus:border-red-400'
                : 'border-white/10 focus:border-cyan-400/70',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
            ),
            className,
          )}
          aria-invalid={hasError || undefined}
          aria-describedby={
            hasError ? `${id}-error` : hint ? `${id}-hint` : undefined
          }
          {...rest}
        />

        {rightIcon && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40">
            {rightIcon as ReactNode}
          </span>
        )}
      </div>

      {hasError && (
        <p id={`${id}-error`} className="text-xs text-red-400" role="alert">
          {error}
        </p>
      )}
      {!hasError && hint && (
        <p id={`${id}-hint`} className="text-xs text-white/40">
          {hint}
        </p>
      )}
    </div>
  )
})
