import { z } from 'zod'

export const SectionHeaderPropsSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  action: z.any().optional(),
  engine: z.enum(['protect', 'grow', 'execute', 'govern']).optional(),
  className: z.string().optional(),
})

export type SectionHeaderProps = z.input<typeof SectionHeaderPropsSchema>
