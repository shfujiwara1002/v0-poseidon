import type { ReactNode } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ModalProps } from './Modal.schema'

const sizeMap: Record<string, string> = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl' }

export function Modal({ open, onClose, title, size = 'md', children, className }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-in fade-in" />
        <Dialog.Content className={twMerge(clsx('fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2', 'w-[calc(100%-2rem)]', sizeMap[size], 'rounded-xl border border-[var(--ds-surface-border)]', 'bg-[var(--ds-surface-bg)] [backdrop-filter:var(--ds-backdrop-filter)]', 'shadow-[var(--ds-surface-shadow)] p-6 animate-in fade-in zoom-in-95'), className)}>
          {title && <Dialog.Title className="text-lg font-semibold text-white mb-4">{title}</Dialog.Title>}
          {children as ReactNode}
          <Dialog.Close className="absolute top-4 right-4 text-white/40 hover:text-white/70 transition-colors" aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
Modal.displayName = 'Modal'
