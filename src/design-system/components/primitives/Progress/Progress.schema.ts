import { z } from 'zod'

export const ProgressPropsSchema = z.object({
  value: z.number().min(0).max(100),
  variant: z.enum(['linear', 'circular']).default('linear'),
  size: z.enum(['sm', 'md', 'lg']).default('md'),
  engine: z.enum(['protect', 'grow', 'execute', 'govern']).optional(),
  showLabel: z.boolean().default(false),
  className: z.string().optional(),
})

export type ProgressProps = z.input<typeof ProgressPropsSchema>
