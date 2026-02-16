import { z } from 'zod'

export const GridOverlayPropsSchema = z.object({
  cellSize: z.number().default(40),
  opacity: z.number().min(0).max(1).default(0.04),
  engine: z.enum(['protect', 'grow', 'execute', 'govern']).optional(),
  className: z.string().optional(),
})

export type GridOverlayProps = z.input<typeof GridOverlayPropsSchema>
