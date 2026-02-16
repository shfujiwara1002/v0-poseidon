import { z } from 'zod'

export const HeatMapCellSchema = z.object({ x: z.number(), y: z.number(), value: z.number() })

export const HeatMapPropsSchema = z.object({
  cells: z.array(HeatMapCellSchema),
  rows: z.number(),
  cols: z.number(),
  cellSize: z.number().default(24),
  gap: z.number().default(2),
  engine: z.enum(['protect', 'grow', 'execute', 'govern']).optional(),
  className: z.string().optional(),
})

export type HeatMapCell = z.input<typeof HeatMapCellSchema>
export type HeatMapProps = z.input<typeof HeatMapPropsSchema>
