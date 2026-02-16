import { z } from 'zod'

export const DataTableColumnSchema = z.object({
  key: z.string(),
  label: z.string(),
  sortable: z.boolean().default(false),
  width: z.string().optional(),
  align: z.enum(['left', 'center', 'right']).default('left'),
})

export const DataTablePropsSchema = z.object({
  columns: z.array(DataTableColumnSchema),
  rows: z.array(z.record(z.any())),
  onRowClick: z.function().args(z.any()).returns(z.void()).optional(),
  emptyMessage: z.string().default('No data available'),
  className: z.string().optional(),
})

export type DataTableColumn = z.input<typeof DataTableColumnSchema>
export type DataTableProps = z.input<typeof DataTablePropsSchema>
