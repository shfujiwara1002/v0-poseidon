import type { Rule } from 'eslint'

/**
 * Patterns matching hardcoded color values that should use design tokens instead.
 *
 *  - Hex: #RGB, #RRGGBB, #RRGGBBAA  (3, 6, or 8 hex digits)
 *  - Functional: rgb(), rgba(), hsl(), hsla()
 *
 * Exempt values: #000, #000000, #fff, #ffffff, transparent
 */

const HEX_PATTERN = /^#(?:[0-9a-fA-F]{3}){1,2}(?:[0-9a-fA-F]{2})?$/

const FUNCTIONAL_COLOR_PATTERN = /^(?:rgb|rgba|hsl|hsla)\s*\(/i

const EXEMPT_VALUES = new Set([
  '#000',
  '#000000',
  '#fff',
  '#ffffff',
  '#FFF',
  '#FFFFFF',
  'transparent',
])

function isHardcodedColor(value: string): boolean {
  const trimmed = value.trim()
  if (EXEMPT_VALUES.has(trimmed)) return false
  if (HEX_PATTERN.test(trimmed)) return true
  if (FUNCTIONAL_COLOR_PATTERN.test(trimmed)) return true
  return false
}

/**
 * Check if a string contains an embedded hardcoded color (for template literals
 * and className strings that may contain inline Tailwind arbitrary values like
 * `bg-[#1a2b3c]` or compound style strings).
 */
const EMBEDDED_HEX_PATTERN = /#(?:[0-9a-fA-F]{3}){1,2}(?:[0-9a-fA-F]{2})?/g
const EMBEDDED_FUNCTIONAL_PATTERN = /(?:rgb|rgba|hsl|hsla)\s*\([^)]*\)/gi

function containsHardcodedColor(value: string): boolean {
  const hexMatches = value.match(EMBEDDED_HEX_PATTERN)
  if (hexMatches) {
    for (const match of hexMatches) {
      if (!EXEMPT_VALUES.has(match)) return true
    }
  }
  if (EMBEDDED_FUNCTIONAL_PATTERN.test(value)) return true
  return false
}

export const noHardcodedColors: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Disallow hardcoded color values in JSX. Use design tokens from base.tokens.json instead.',
      recommended: true,
    },
    messages: {
      hardcodedColor:
        'Avoid hardcoded color "{{value}}". Use a design token (e.g. var(--color-accent-cyan), var(--color-text-primary)) or a Tailwind token class instead.',
      hardcodedColorInString:
        'String contains a hardcoded color value. Use design tokens from base.tokens.json instead.',
    },
    schema: [],
  },

  create(context) {
    /**
     * Check whether a node is inside a JSX context (attribute value, style
     * object property, className, etc.).
     */
    function isInJSXContext(node: Rule.Node): boolean {
      let current: Rule.Node | null = node as Rule.Node
      while (current) {
        if (current.type === 'JSXAttribute') return true
        if (current.type === 'JSXExpressionContainer') return true
        // Style object passed to JSX
        if (
          current.type === 'Property' &&
          current.parent?.type === 'ObjectExpression'
        ) {
          let grandparent: Rule.Node | null = current.parent.parent as Rule.Node
          while (grandparent) {
            if (grandparent.type === 'JSXExpressionContainer') return true
            grandparent = grandparent.parent as Rule.Node | null
          }
        }
        current = current.parent as Rule.Node | null
      }
      return false
    }

    return {
      // Detect string literals with hardcoded colors in JSX attributes
      Literal(node) {
        if (typeof node.value !== 'string') return
        if (!isInJSXContext(node as Rule.Node)) return

        const value = node.value

        // Direct color value (e.g. style={{ color: '#ff0000' }})
        if (isHardcodedColor(value)) {
          context.report({
            node,
            messageId: 'hardcodedColor',
            data: { value },
          })
          return
        }

        // Embedded colors in className strings or compound values
        if (containsHardcodedColor(value)) {
          context.report({
            node,
            messageId: 'hardcodedColorInString',
          })
        }
      },

      // Detect template literals with hardcoded colors in JSX context
      TemplateLiteral(node) {
        if (!isInJSXContext(node as Rule.Node)) return

        for (const quasi of node.quasis) {
          const raw = quasi.value.raw
          if (containsHardcodedColor(raw)) {
            context.report({
              node,
              messageId: 'hardcodedColorInString',
            })
            return
          }
        }
      },
    }
  },
}
