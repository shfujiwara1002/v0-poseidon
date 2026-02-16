import { noHardcodedColors } from './rules/no-hardcoded-colors'
import { useMotionTokens } from './rules/use-motion-tokens'
import { surfaceOverCard } from './rules/surface-over-card'
import { maxComponentLines } from './rules/max-component-lines'
import { noRawLink } from './rules/no-raw-link'
import { engineColorConsistency } from './rules/engine-color-consistency'
import { requireZodProps } from './rules/require-zod-props'
import { effectPresetOnly } from './rules/effect-preset-only'

export const rules = {
  'no-hardcoded-colors': noHardcodedColors,
  'use-motion-tokens': useMotionTokens,
  'surface-over-card': surfaceOverCard,
  'max-component-lines': maxComponentLines,
  'no-raw-link': noRawLink,
  'engine-color-consistency': engineColorConsistency,
  'require-zod-props': requireZodProps,
  'effect-preset-only': effectPresetOnly,
}

export const configs = {
  recommended: {
    plugins: { poseidon: { rules } },
    rules: {
      'poseidon/no-hardcoded-colors': 'warn',
      'poseidon/use-motion-tokens': 'warn',
      'poseidon/surface-over-card': 'warn',
      'poseidon/max-component-lines': ['warn', { max: 150 }],
      'poseidon/no-raw-link': 'warn',
      'poseidon/engine-color-consistency': 'warn',
      'poseidon/require-zod-props': 'warn',
      'poseidon/effect-preset-only': 'warn',
    },
  },
  strict: {
    plugins: { poseidon: { rules } },
    rules: {
      'poseidon/no-hardcoded-colors': 'error',
      'poseidon/use-motion-tokens': 'error',
      'poseidon/surface-over-card': 'error',
      'poseidon/max-component-lines': ['error', { max: 150 }],
      'poseidon/no-raw-link': 'error',
      'poseidon/engine-color-consistency': 'error',
      'poseidon/require-zod-props': 'error',
      'poseidon/effect-preset-only': 'error',
    },
  },
}
