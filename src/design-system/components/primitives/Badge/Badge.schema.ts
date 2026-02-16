import { z } from 'zod'

export const BadgePropsSchema = z.object({
  variant: z.enum(['default', 'success', 'warning', 'danger', 'info', 'engine']).default('default'),
  engine: z.enum(['protect', 'grow', 'execute', 'govern']).optional(),
  size: z.enum(['sm', 'md']).default('md'),
  glow: z.boolean().default(false),
  className: z.string().optional(),
  children: z.any(),
})

export type BadgeProps = z.input<typeof BadgePropsSchema>
