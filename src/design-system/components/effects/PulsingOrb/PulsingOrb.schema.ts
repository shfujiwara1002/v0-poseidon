import { z } from 'zod'

export const PulsingOrbPropsSchema = z.object({
  size: z.number().default(200),
  engine: z.enum(['protect', 'grow', 'execute', 'govern']).optional(),
  className: z.string().optional(),
})

export type PulsingOrbProps = z.input<typeof PulsingOrbPropsSchema>
