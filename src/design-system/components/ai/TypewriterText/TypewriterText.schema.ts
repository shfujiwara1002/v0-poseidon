import { z } from 'zod'

export const TypewriterTextPropsSchema = z.object({
  text: z.string(),
  speed: z.number().default(30),
  delay: z.number().default(0),
  onComplete: z.function().returns(z.void()).optional(),
  className: z.string().optional(),
})

export type TypewriterTextProps = z.input<typeof TypewriterTextPropsSchema>
