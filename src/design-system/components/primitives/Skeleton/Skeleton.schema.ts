import { z } from 'zod'

export const SkeletonPropsSchema = z.object({
  variant: z.enum(['line', 'circle', 'rect']).default('line'),
  width: z.string().optional(),
  height: z.string().optional(),
  className: z.string().optional(),
})

export type SkeletonProps = z.input<typeof SkeletonPropsSchema>
