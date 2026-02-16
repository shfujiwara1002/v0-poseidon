import { z } from 'zod'

export const ModalPropsSchema = z.object({
  open: z.boolean(),
  onClose: z.function().returns(z.void()),
  title: z.string().optional(),
  size: z.enum(['sm', 'md', 'lg']).default('md'),
  children: z.any(),
  className: z.string().optional(),
})

export type ModalProps = z.input<typeof ModalPropsSchema>
