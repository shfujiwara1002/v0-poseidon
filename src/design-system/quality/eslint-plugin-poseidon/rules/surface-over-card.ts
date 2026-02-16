import type { Rule } from 'eslint'

/**
 * Detects usage of the legacy v1 "Card" and "GlassCard" JSX elements and
 * suggests migrating to the v2 Surface component.
 *
 * The Surface component is the canonical container in the Poseidon Design
 * System v2, supporting all effect presets and engine color theming.
 */

const LEGACY_CARD_NAMES = new Set(['Card', 'GlassCard'])

export const surfaceOverCard: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Prefer the design-system Surface component over legacy Card / GlassCard components.',
      recommended: true,
    },
    messages: {
      useSurface:
        'Use <Surface> from design-system/components/primitives instead of <{{name}}>. ' +
        'Surface supports all effect presets (minimal, glass, neon, aurora, terminal) ' +
        'and engine color theming.',
    },
    schema: [],
  },

  create(context) {
    return {
      JSXOpeningElement(node) {
        const nameNode = node.name

        // Handle simple identifiers: <Card>, <GlassCard>
        if (nameNode.type === 'JSXIdentifier' && LEGACY_CARD_NAMES.has(nameNode.name)) {
          context.report({
            node,
            messageId: 'useSurface',
            data: { name: nameNode.name },
          })
          return
        }

        // Handle member expressions: <Foo.Card>, <Foo.GlassCard>
        if (
          nameNode.type === 'JSXMemberExpression' &&
          nameNode.property.type === 'JSXIdentifier' &&
          LEGACY_CARD_NAMES.has(nameNode.property.name)
        ) {
          context.report({
            node,
            messageId: 'useSurface',
            data: { name: nameNode.property.name },
          })
        }
      },
    }
  },
}
