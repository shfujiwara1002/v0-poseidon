import { z } from 'zod'

export const BottomSheetPropsSchema = z.object({
  open: z.boolean(),
  onClose: z.function().returns(z.void()),
  title: z.string().optional(),
  children: z.any(),
  className: z.string().optional(),
})

export type BottomSheetProps = z.input<typeof BottomSheetPropsSchema>
