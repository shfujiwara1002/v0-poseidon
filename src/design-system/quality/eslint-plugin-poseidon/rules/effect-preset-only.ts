import type { Rule } from 'eslint'

/**
 * Detects direct use of CSS properties that should be managed by the effect
 * preset system:
 *
 *  - `backdropFilter` / `WebkitBackdropFilter` with blur values
 *  - `boxShadow` with blur/spread values (except simple offset-only shadows)
 *  - `filter` with blur()
 *
 * These properties are controlled by the effect preset CSS custom properties
 * (--ds-backdrop-filter, --ds-surface-shadow, --ds-glass-inset, etc.) so that
 * switching between minimal/glass/neon/aurora/terminal presets works consistently.
 *
 * Developers should use:
 *  - Surface component (which reads presets automatically)
 *  - var(--ds-backdrop-filter), var(--ds-surface-shadow), var(--ds-glass-inset)
 *  - Effect utility classes from effect-presets.css
 */

const EFFECT_PROP_NAMES = new Set([
  'backdropFilter',
  'WebkitBackdropFilter',
  'webkitBackdropFilter',
  'boxShadow',
  'MozBoxShadow',
  'WebkitBoxShadow',
])

/** Matches blur() function calls in filter/backdrop-filter values */
const BLUR_PATTERN = /blur\s*\(/i

/** Matches box-shadow values that include blur radius (more than just x y color) */
const BOX_SHADOW_BLUR_PATTERN = /\d+px\s+\d+px\s+\d+px/

/**
 * Check if a value is using a CSS custom property (which is allowed since it
 * goes through the preset system).
 */
function usesCustomProperty(value: string): boolean {
  return value.includes('var(--ds-') || value.includes('var(--effect-')
}

function isDirectEffectValue(propName: string, value: string): boolean {
  if (usesCustomProperty(value)) return false

  if (propName === 'backdropFilter' || propName === 'WebkitBackdropFilter' || propName === 'webkitBackdropFilter') {
    return BLUR_PATTERN.test(value)
  }

  if (propName === 'boxShadow' || propName === 'MozBoxShadow' || propName === 'WebkitBoxShadow') {
    return BOX_SHADOW_BLUR_PATTERN.test(value)
  }

  return false
}

export const effectPresetOnly: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Disallow direct use of backdrop-filter, box-shadow with blur, and similar effect properties. Use the effect preset system CSS variables instead.',
      recommended: true,
    },
    messages: {
      usePreset:
        'Avoid direct "{{prop}}" with hardcoded values. Use the effect preset system: ' +
        'var(--ds-backdrop-filter), var(--ds-surface-shadow), or var(--ds-glass-inset). ' +
        'Alternatively, use the <Surface> component which applies presets automatically.',
      usePresetFilter:
        'Avoid direct "filter: blur()" in styles. Use var(--ds-backdrop-filter) or the <Surface> component ' +
        'which applies the current effect preset automatically.',
    },
    schema: [],
  },

  create(context) {
    function isInJSXContext(node: Rule.Node): boolean {
      let current: Rule.Node | null = node
      while (current) {
        if (current.type === 'JSXAttribute') return true
        if (current.type === 'JSXExpressionContainer') return true
        current = current.parent as Rule.Node | null
      }
      return false
    }

    return {
      // Style object properties: { backdropFilter: "blur(12px)" }
      Property(node) {
        if (!isInJSXContext(node as Rule.Node)) return

        if (node.key.type !== 'Identifier' && node.key.type !== 'Literal') return

        const propName =
          node.key.type === 'Identifier'
            ? node.key.name
            : String(node.key.value)

        // Check for effect properties
        if (EFFECT_PROP_NAMES.has(propName)) {
          // String literal value
          if (node.value.type === 'Literal' && typeof node.value.value === 'string') {
            if (isDirectEffectValue(propName, node.value.value)) {
              context.report({
                node: node.value,
                messageId: 'usePreset',
                data: { prop: propName },
              })
            }
          }

          // Template literal value
          if (node.value.type === 'TemplateLiteral') {
            const rawParts = node.value.quasis.map((q) => q.value.raw).join('')
            if (isDirectEffectValue(propName, rawParts)) {
              context.report({
                node: node.value,
                messageId: 'usePreset',
                data: { prop: propName },
              })
            }
          }
        }

        // Special case: filter property with blur()
        if (propName === 'filter') {
          if (node.value.type === 'Literal' && typeof node.value.value === 'string') {
            if (BLUR_PATTERN.test(node.value.value) && !usesCustomProperty(node.value.value)) {
              context.report({
                node: node.value,
                messageId: 'usePresetFilter',
              })
            }
          }
          if (node.value.type === 'TemplateLiteral') {
            const rawParts = node.value.quasis.map((q) => q.value.raw).join('')
            if (BLUR_PATTERN.test(rawParts) && !usesCustomProperty(rawParts)) {
              context.report({
                node: node.value,
                messageId: 'usePresetFilter',
              })
            }
          }
        }
      },
    }
  },
}
