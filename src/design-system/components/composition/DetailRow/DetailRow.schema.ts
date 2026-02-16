import { z } from 'zod'

export const DetailRowPropsSchema = z.object({
  label: z.string(),
  value: z.union([z.string(), z.number()]),
  icon: z.any().optional(),
  engine: z.enum(['protect', 'grow', 'execute', 'govern']).optional(),
  className: z.string().optional(),
})

export type DetailRowProps = z.input<typeof DetailRowPropsSchema>
