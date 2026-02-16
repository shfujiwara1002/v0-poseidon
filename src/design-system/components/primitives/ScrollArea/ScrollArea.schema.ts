import { z } from 'zod'

export const ScrollAreaPropsSchema = z.object({
  maxHeight: z.string().optional(),
  className: z.string().optional(),
  children: z.any(),
})

export type ScrollAreaProps = z.input<typeof ScrollAreaPropsSchema>
