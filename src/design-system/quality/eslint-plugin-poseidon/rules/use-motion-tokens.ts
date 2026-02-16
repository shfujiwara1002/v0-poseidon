import type { Rule } from 'eslint'

/**
 * Detects hardcoded animation durations in JSX props and style objects.
 *
 * Flags patterns like:
 *  - `duration: 200`  / `duration: 0.3`
 *  - `transition: "all 0.3s"`
 *  - `animationDuration: "200ms"`
 *  - `transitionDuration: "0.3s"`
 *
 * Developers should use --motion-duration-* tokens or motion.tokens.json
 * preset values instead.
 */

const DURATION_PROP_NAMES = new Set([
  'duration',
  'animationDuration',
  'transitionDuration',
])

const TRANSITION_PROP_NAMES = new Set([
  'transition',
  'animation',
])

/** Matches typical inline duration strings like "200ms", "0.3s", "all 0.3s ease" */
const INLINE_DURATION_PATTERN = /\b\d+(?:\.\d+)?(?:ms|s)\b/

/** Matches numeric duration values (ms assumed when > 1, seconds when <= 1) */
function isNumericDuration(value: unknown): boolean {
  return typeof value === 'number' && value > 0
}

export const useMotionTokens: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Disallow hardcoded animation/transition durations. Use motion tokens from motion.tokens.json or --motion-duration-* CSS custom properties.',
      recommended: true,
    },
    messages: {
      hardcodedDuration:
        'Avoid hardcoded duration "{{value}}" in "{{prop}}". Use a motion token (e.g. --motion-duration-fast, motion.preset.fade) from motion.tokens.json instead.',
      hardcodedTransition:
        'Avoid hardcoded timing in "{{prop}}". Use motion tokens from motion.tokens.json for durations and easing values.',
    },
    schema: [],
  },

  create(context) {
    function isInJSXStyleObject(node: Rule.Node): boolean {
      let current: Rule.Node | null = node
      while (current) {
        if (current.type === 'JSXAttribute') return true
        if (current.type === 'JSXExpressionContainer') return true
        current = current.parent as Rule.Node | null
      }
      return false
    }

    return {
      // Detect style object properties like { duration: 200 } or { transitionDuration: "0.3s" }
      Property(node) {
        if (!isInJSXStyleObject(node as Rule.Node)) return
        if (node.key.type !== 'Identifier' && node.key.type !== 'Literal') return

        const propName =
          node.key.type === 'Identifier'
            ? node.key.name
            : String(node.key.value)

        // Check for duration-related properties with numeric values
        if (DURATION_PROP_NAMES.has(propName)) {
          if (node.value.type === 'Literal') {
            const val = node.value.value
            if (isNumericDuration(val)) {
              context.report({
                node: node.value,
                messageId: 'hardcodedDuration',
                data: { value: String(val), prop: propName },
              })
              return
            }
            if (typeof val === 'string' && INLINE_DURATION_PATTERN.test(val)) {
              context.report({
                node: node.value,
                messageId: 'hardcodedDuration',
                data: { value: val, prop: propName },
              })
              return
            }
          }
        }

        // Check for transition/animation properties with inline timing
        if (TRANSITION_PROP_NAMES.has(propName)) {
          if (node.value.type === 'Literal' && typeof node.value.value === 'string') {
            if (INLINE_DURATION_PATTERN.test(node.value.value)) {
              context.report({
                node: node.value,
                messageId: 'hardcodedTransition',
                data: { prop: propName },
              })
            }
          }
          if (node.value.type === 'TemplateLiteral') {
            for (const quasi of node.value.quasis) {
              if (INLINE_DURATION_PATTERN.test(quasi.value.raw)) {
                context.report({
                  node: node.value,
                  messageId: 'hardcodedTransition',
                  data: { prop: propName },
                })
                return
              }
            }
          }
        }
      },

      // Detect JSX attributes like transition="all 0.3s ease"
      JSXAttribute(node) {
        if (!node.name || node.name.type !== 'JSXIdentifier') return
        const attrName = node.name.name

        if (
          !TRANSITION_PROP_NAMES.has(attrName) &&
          !DURATION_PROP_NAMES.has(attrName)
        ) {
          return
        }

        if (node.value?.type === 'Literal' && typeof node.value.value === 'string') {
          const val = node.value.value
          if (INLINE_DURATION_PATTERN.test(val)) {
            context.report({
              node: node.value,
              messageId: 'hardcodedTransition',
              data: { prop: attrName },
            })
          }
        }
      },
    }
  },
}
