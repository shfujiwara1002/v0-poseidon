import { z } from 'zod'

export const GlowBorderPropsSchema = z.object({
  engine: z.enum(['protect', 'grow', 'execute', 'govern']).optional(),
  intensity: z.enum(['subtle', 'medium', 'strong']).default('medium'),
  animate: z.boolean().default(true),
  className: z.string().optional(),
  children: z.any(),
})

export type GlowBorderProps = z.input<typeof GlowBorderPropsSchema>
