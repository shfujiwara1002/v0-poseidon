import { z } from 'zod'

export const StatCardPropsSchema = z.object({
  title: z.string(),
  value: z.union([z.string(), z.number()]),
  change: z.number().optional(),
  icon: z.any().optional(),
  engine: z.enum(['protect', 'grow', 'execute', 'govern']).optional(),
  sparkline: z.any().optional(),
  className: z.string().optional(),
})

export type StatCardProps = z.input<typeof StatCardPropsSchema>
