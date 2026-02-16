import { z } from 'zod'

export const DSBarChartPropsSchema = z.object({
  data: z.array(z.record(z.any())),
  dataKey: z.string(),
  xKey: z.string().default('name'),
  engine: z.enum(['protect', 'grow', 'execute', 'govern']).optional(),
  height: z.number().default(200),
  horizontal: z.boolean().default(false),
  className: z.string().optional(),
})

export type DSBarChartProps = z.input<typeof DSBarChartPropsSchema>
