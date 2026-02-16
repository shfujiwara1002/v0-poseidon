import { z } from 'zod'

export const SparkLinePropsSchema = z.object({
  data: z.array(z.number()),
  width: z.number().default(80),
  height: z.number().default(24),
  engine: z.enum(['protect', 'grow', 'execute', 'govern']).optional(),
  showArea: z.boolean().default(false),
  className: z.string().optional(),
})

export type SparkLineProps = z.input<typeof SparkLinePropsSchema>
