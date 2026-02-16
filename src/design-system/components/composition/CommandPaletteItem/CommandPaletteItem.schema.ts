import { z } from 'zod'

export const CommandPaletteItemPropsSchema = z.object({
  label: z.string(),
  description: z.string().optional(),
  icon: z.any().optional(),
  shortcut: z.string().optional(),
  engine: z.enum(['protect', 'grow', 'execute', 'govern']).optional(),
  onSelect: z.function().returns(z.void()).optional(),
  active: z.boolean().default(false),
  className: z.string().optional(),
})

export type CommandPaletteItemProps = z.input<typeof CommandPaletteItemPropsSchema>
