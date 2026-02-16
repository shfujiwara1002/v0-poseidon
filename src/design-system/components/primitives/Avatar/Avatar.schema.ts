import { z } from 'zod'

export const AvatarPropsSchema = z.object({
  size: z.enum(['sm', 'md', 'lg']).default('md'),
  src: z.string().optional(),
  fallback: z.string().max(2).default('??'),
  engine: z.enum(['protect', 'grow', 'execute', 'govern']).optional(),
  className: z.string().optional(),
})

export type AvatarProps = z.input<typeof AvatarPropsSchema>
