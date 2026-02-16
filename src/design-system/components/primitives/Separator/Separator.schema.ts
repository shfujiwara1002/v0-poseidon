import { z } from 'zod'

export const SeparatorPropsSchema = z.object({
  orientation: z.enum(['horizontal', 'vertical']).default('horizontal'),
  className: z.string().optional(),
})

export type SeparatorProps = z.input<typeof SeparatorPropsSchema>
