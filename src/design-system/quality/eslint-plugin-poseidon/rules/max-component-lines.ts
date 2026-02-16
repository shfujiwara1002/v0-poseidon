import type { Rule } from 'eslint'

/**
 * Enforces a maximum line count for component files within the design system.
 *
 * Only applies to files under `design-system/components/`. This helps keep
 * primitive components small, composable, and easy to review.
 *
 * Configurable via the `max` option (default: 150 lines).
 */

const DS_COMPONENT_PATH_PATTERN = /design-system\/components\//

export const maxComponentLines: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Enforce a maximum line count for design-system component files to keep them small and composable.',
      recommended: true,
    },
    messages: {
      tooManyLines:
        'Design system component file has {{actual}} lines, exceeding the maximum of {{max}}. ' +
        'Consider extracting sub-components or moving logic into hooks.',
    },
    schema: [
      {
        type: 'object',
        properties: {
          max: {
            type: 'integer',
            minimum: 1,
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create(context) {
    const options = context.options[0] as { max?: number } | undefined
    const maxLines = options?.max ?? 150

    return {
      Program(node) {
        const filename = context.filename ?? context.getFilename()
        if (!DS_COMPONENT_PATH_PATTERN.test(filename)) return

        const sourceCode = context.sourceCode ?? context.getSourceCode()
        const lineCount = sourceCode.lines.length

        if (lineCount > maxLines) {
          context.report({
            node,
            messageId: 'tooManyLines',
            data: {
              actual: String(lineCount),
              max: String(maxLines),
            },
          })
        }
      },
    }
  },
}
