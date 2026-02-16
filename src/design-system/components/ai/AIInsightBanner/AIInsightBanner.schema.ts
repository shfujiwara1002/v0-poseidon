import { z } from 'zod'

export const AIInsightBannerPropsSchema = z.object({
  title: z.string(),
  description: z.string(),
  confidence: z.number().min(0).max(100).optional(),
  engine: z.enum(['protect', 'grow', 'execute', 'govern']).optional(),
  action: z.any().optional(),
  className: z.string().optional(),
})

export type AIInsightBannerProps = z.input<typeof AIInsightBannerPropsSchema>
