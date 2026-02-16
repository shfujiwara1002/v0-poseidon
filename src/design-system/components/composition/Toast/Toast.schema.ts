import { z } from 'zod'

export const DSToastPropsSchema = z.object({
  variant: z.enum(['info', 'success', 'warning', 'error']).default('info'),
  message: z.string(),
  action: z.any().optional(),
  engine: z.enum(['protect', 'grow', 'execute', 'govern']).optional(),
  onDismiss: z.function().returns(z.void()).optional(),
  className: z.string().optional(),
})

export type DSToastProps = z.input<typeof DSToastPropsSchema>
