import { z } from 'zod'

export const NavigationLinkPropsSchema = z.object({
  href: z.string(),
  label: z.string(),
  description: z.string().optional(),
  icon: z.any().optional(),
  engine: z.enum(['protect', 'grow', 'execute', 'govern']).optional(),
  external: z.boolean().default(false),
  className: z.string().optional(),
})

export type NavigationLinkProps = z.input<typeof NavigationLinkPropsSchema>
