import type React from 'react'
import { z } from 'zod'

export const InputPropsSchema = z.object({
  label: z.string().optional(),
  error: z.string().optional(),
  hint: z.string().optional(),
  leftIcon: z.any().optional(),
  rightIcon: z.any().optional(),
  fullWidth: z.boolean().default(true),
  className: z.string().optional(),
})

export type InputProps = z.input<typeof InputPropsSchema> & React.InputHTMLAttributes<HTMLInputElement>
