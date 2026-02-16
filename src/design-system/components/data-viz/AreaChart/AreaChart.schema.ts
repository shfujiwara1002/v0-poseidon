import { z } from 'zod'

export const DSAreaChartPropsSchema = z.object({
  data: z.array(z.record(z.any())),
  dataKey: z.string(),
  xKey: z.string().default('name'),
  engine: z.enum(['protect', 'grow', 'execute', 'govern']).optional(),
  height: z.number().default(200),
  showGrid: z.boolean().default(true),
  className: z.string().optional(),
})

export type DSAreaChartProps = z.input<typeof DSAreaChartPropsSchema>
