import { z } from 'zod'

export const SurfacePropsSchema = z.object({
  variant: z.enum(['glass', 'elevated', 'inset', 'transparent']).default('glass'),
  engine: z.enum(['protect', 'grow', 'execute', 'govern']).optional(),
  glow: z.boolean().default(false),
  interactive: z.boolean().default(false),
  padding: z.enum(['none', 'sm', 'md', 'lg']).default('md'),
  as: z.enum(['div', 'article', 'section', 'aside', 'main']).default('div'),
  className: z.string().optional(),
  children: z.any(),
})

export type SurfaceProps = z.input<typeof SurfacePropsSchema>
