import { z } from 'zod'

export const RingProgressPropsSchema = z.object({
  value: z.number().min(0).max(100),
  label: z.string().optional(),
  sublabel: z.string().optional(),
  size: z.number().default(120),
  strokeWidth: z.number().default(8),
  engine: z.enum(['protect', 'grow', 'execute', 'govern']).optional(),
  className: z.string().optional(),
})

export type RingProgressProps = z.input<typeof RingProgressPropsSchema>
