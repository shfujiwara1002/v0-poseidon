import { z } from 'zod'

export const AIThinkingPropsSchema = z.object({
  label: z.string().default('Analyzing...'),
  engine: z.enum(['protect', 'grow', 'execute', 'govern']).optional(),
  size: z.enum(['sm', 'md']).default('md'),
  className: z.string().optional(),
})

export type AIThinkingProps = z.input<typeof AIThinkingPropsSchema>
