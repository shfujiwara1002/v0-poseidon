import { z } from 'zod'

export const IconContainerPropsSchema = z.object({
  size: z.enum(['sm', 'md', 'lg']).default('md'),
  engine: z.enum(['protect', 'grow', 'execute', 'govern']).optional(),
  glow: z.boolean().default(false),
  className: z.string().optional(),
  children: z.any(),
})

export type IconContainerProps = z.input<typeof IconContainerPropsSchema>
