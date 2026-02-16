import { z } from 'zod'

export const GlassPanelPropsSchema = z.object({
  blur: z.enum(['sm', 'md', 'lg']).default('md'),
  opacity: z.number().min(0).max(1).default(0.06),
  engine: z.enum(['protect', 'grow', 'execute', 'govern']).optional(),
  className: z.string().optional(),
  children: z.any(),
})

export type GlassPanelProps = z.input<typeof GlassPanelPropsSchema>
