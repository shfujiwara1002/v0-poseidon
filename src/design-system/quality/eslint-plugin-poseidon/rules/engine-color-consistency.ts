import type { Rule } from 'eslint'

/**
 * Ensures that a single component does not mix colors from different Poseidon
 * engine namespaces.
 *
 * The four engines (protect, grow, execute, govern) each have a dedicated
 * color identity. Mixing engine colors within one component (e.g. using
 * protect-teal and grow-violet together) creates visual inconsistency.
 *
 * Detects usage through:
 *  - `engine="protect"` JSX props
 *  - CSS token references: var(--engine-protect), var(--state-healthy)
 *  - Tailwind classes: text-engine-protect, bg-engine-grow
 *  - Glow utility classes: ds-glow-protect, icon-glow-teal
 */

const ENGINE_NAMES = ['protect', 'grow', 'execute', 'govern'] as const
type EngineName = (typeof ENGINE_NAMES)[number]

/** Maps state token aliases to their engine */
const STATE_TO_ENGINE: Record<string, EngineName> = {
  healthy: 'protect',
  warning: 'execute',
  primary: 'govern',
}

/** Maps glow class names to their engine */
const GLOW_CLASS_TO_ENGINE: Record<string, EngineName> = {
  'icon-glow-teal': 'protect',
  'icon-glow-violet': 'grow',
  'icon-glow-amber': 'execute',
  'icon-glow-blue': 'govern',
  'ds-glow-protect': 'protect',
  'ds-glow-grow': 'grow',
  'ds-glow-execute': 'execute',
  'ds-glow-govern': 'govern',
}

/** Pattern to extract engine name from CSS custom properties */
const ENGINE_VAR_PATTERN = /var\(--engine-(protect|grow|execute|govern)/g

/** Pattern to extract state name from CSS custom properties */
const STATE_VAR_PATTERN = /var\(--state-(healthy|warning|primary)/g

/** Pattern to extract engine name from Tailwind utility classes */
const ENGINE_CLASS_PATTERN = /(?:text|bg|border|ring|shadow)-engine-(protect|grow|execute|govern)/g

/** Pattern to extract glow class names */
const GLOW_CLASS_PATTERN = /(?:icon-glow-(?:teal|violet|amber|blue)|ds-glow-(?:protect|grow|execute|govern))/g

function extractEnginesFromString(value: string): Set<EngineName> {
  const engines = new Set<EngineName>()

  let match: RegExpExecArray | null

  // Engine CSS variables
  ENGINE_VAR_PATTERN.lastIndex = 0
  while ((match = ENGINE_VAR_PATTERN.exec(value)) !== null) {
    engines.add(match[1] as EngineName)
  }

  // State-mapped CSS variables
  STATE_VAR_PATTERN.lastIndex = 0
  while ((match = STATE_VAR_PATTERN.exec(value)) !== null) {
    const mapped = STATE_TO_ENGINE[match[1]]
    if (mapped) engines.add(mapped)
  }

  // Tailwind engine classes
  ENGINE_CLASS_PATTERN.lastIndex = 0
  while ((match = ENGINE_CLASS_PATTERN.exec(value)) !== null) {
    engines.add(match[1] as EngineName)
  }

  // Glow utility classes
  GLOW_CLASS_PATTERN.lastIndex = 0
  while ((match = GLOW_CLASS_PATTERN.exec(value)) !== null) {
    const mapped = GLOW_CLASS_TO_ENGINE[match[0]]
    if (mapped) engines.add(mapped)
  }

  return engines
}

export const engineColorConsistency: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow mixing engine color namespaces within a single component. A component should consistently use colors from one engine.',
      recommended: true,
    },
    messages: {
      mixedEngines:
        'Component mixes engine colors: {{engines}}. Each component should use a single engine color namespace (protect, grow, execute, or govern) or accept the engine as a prop.',
    },
    schema: [],
  },

  create(context) {
    // Accumulate all engine references found in the current file
    const engineOccurrences: Array<{ engine: EngineName; node: Rule.Node }> = []

    function recordEnginesFromValue(value: string, node: Rule.Node) {
      const engines = extractEnginesFromString(value)
      for (const engine of engines) {
        engineOccurrences.push({ engine, node })
      }
    }

    return {
      // Track engine="protect" JSX attributes
      JSXAttribute(node) {
        if (
          node.name.type !== 'JSXIdentifier' ||
          node.name.name !== 'engine'
        ) {
          return
        }

        if (
          node.value?.type === 'Literal' &&
          typeof node.value.value === 'string'
        ) {
          const val = node.value.value.toLowerCase() as EngineName
          if (ENGINE_NAMES.includes(val)) {
            engineOccurrences.push({ engine: val, node: node as unknown as Rule.Node })
          }
        }
      },

      // Track string literals that reference engine colors
      Literal(node) {
        if (typeof node.value !== 'string') return
        recordEnginesFromValue(node.value, node as Rule.Node)
      },

      // Track template literals
      TemplateLiteral(node) {
        for (const quasi of node.quasis) {
          recordEnginesFromValue(quasi.value.raw, node as Rule.Node)
        }
      },

      // At end of file, check if multiple distinct engines are used
      'Program:exit'(node) {
        const uniqueEngines = new Set(engineOccurrences.map((o) => o.engine))

        if (uniqueEngines.size > 1) {
          // Report on the first occurrence that introduces a second engine
          const firstEngine = engineOccurrences[0].engine
          const conflicting = engineOccurrences.find(
            (o) => o.engine !== firstEngine,
          )

          if (conflicting) {
            context.report({
              node: conflicting.node,
              messageId: 'mixedEngines',
              data: {
                engines: Array.from(uniqueEngines).sort().join(', '),
              },
            })
          }
        }
      },
    }
  },
}
