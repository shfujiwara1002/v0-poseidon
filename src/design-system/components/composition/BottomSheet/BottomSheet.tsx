import type { ReactNode } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { twMerge } from 'tailwind-merge'
import type { BottomSheetProps } from './BottomSheet.schema'

export function BottomSheet({ open, onClose, title, children, className }: BottomSheetProps) {
  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-in fade-in" />
        <Dialog.Content className={twMerge('fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] rounded-t-2xl', 'border-t border-[var(--ds-surface-border)]', 'bg-[var(--ds-surface-bg)] [backdrop-filter:var(--ds-backdrop-filter)]', 'shadow-[var(--ds-surface-shadow)] p-6 pt-3 animate-in slide-in-from-bottom overflow-y-auto', className)}>
          <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/20" aria-hidden />
          {title && <Dialog.Title className="text-lg font-semibold text-white mb-4">{title}</Dialog.Title>}
          {children as ReactNode}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
BottomSheet.displayName = 'BottomSheet'
