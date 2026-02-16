import { z } from 'zod'

export const ConfidenceRingPropsSchema = z.object({
  value: z.number().min(0).max(100),
  label: z.string().optional(),
  size: z.enum(['sm', 'md', 'lg']).default('md'),
  engine: z.enum(['protect', 'grow', 'execute', 'govern']).optional(),
  className: z.string().optional(),
})

export type ConfidenceRingProps = z.input<typeof ConfidenceRingPropsSchema>
