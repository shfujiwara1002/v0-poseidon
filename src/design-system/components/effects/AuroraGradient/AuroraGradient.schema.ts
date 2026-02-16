import { z } from 'zod'

export const AuroraGradientPropsSchema = z.object({
  engine: z.enum(['protect', 'grow', 'execute', 'govern']).optional(),
  intensity: z.enum(['subtle', 'medium', 'vivid']).default('subtle'),
  className: z.string().optional(),
})

export type AuroraGradientProps = z.input<typeof AuroraGradientPropsSchema>
