import { z } from 'zod'

export const FactorBarPropsSchema = z.object({
  label: z.string(),
  value: z.number().min(-100).max(100),
  engine: z.enum(['protect', 'grow', 'execute', 'govern']).optional(),
  className: z.string().optional(),
})

export type FactorBarProps = z.input<typeof FactorBarPropsSchema>
