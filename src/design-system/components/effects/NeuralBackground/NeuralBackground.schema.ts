import { z } from 'zod'

export const NeuralBackgroundPropsSchema = z.object({
  density: z.enum(['sparse', 'medium', 'dense']).default('medium'),
  engine: z.enum(['protect', 'grow', 'execute', 'govern']).optional(),
  className: z.string().optional(),
})

export type NeuralBackgroundProps = z.input<typeof NeuralBackgroundPropsSchema>
